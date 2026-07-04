"""Brand palette guard — anti-AI-slop gate for AetherLogik video.

Companion to `lib/slideshow_risk.py`: instead of scoring "does this feel like a
slideshow?", it answers "does this composition break the AetherLogik brand?".
The #1 tell of AI-generated video is a lavender / violet / cyan accent plus
glows; this guard scans the declared colors and styles of a production artifact
(scene_plan props, edit_decisions theme, HyperFrames css_vars / raw CSS) and
FAILS the compose stage on brand violations.

Brand law (see `styles/aetherlogik-ember.yaml` → `brand_guard`):
  - accent is ONLY ember (#ff6b1a) over near-black (#0a0a0a); text near-white
  - FORBIDDEN: cyan / violet / lavender / neon-blue and glows/bloom
  - boxless: no cards (bg + border-radius) around text

Verdict:
  "pass"   — no violations
  "revise" — only warnings (boxless / soft-glow)
  "fail"   — at least one critical violation (forbidden color or hard glow)

It's advisory like the other gates: the reviewer (`skills/meta/reviewer.md`)
raises a CRITICAL finding on "fail" in the compose stage. An intentional
off-brand color (e.g. a client's own palette) is legal only via an explicit
`allowed_overrides` entry recorded in the decision_log.
"""

from __future__ import annotations

import colorsys
import re
from typing import Any

# ---------------------------------------------------------------------------
# Defaults (overridden by a playbook's `brand_guard` block via load_guard_config)
# ---------------------------------------------------------------------------

DEFAULT_GUARD_CONFIG: dict[str, Any] = {
    "accent_hex": "#ff6b1a",
    "background_hex": "#0a0a0a",
    # Known AI-slop hexes + the navy that leaked into reel v1.
    "forbidden_hex": ["#22d3ee", "#a78bfa", "#00ffff", "#0ff", "#0f172a", "#1e40af", "#2563eb"],
    # Saturated colors are only allowed in these hue bands (degrees) — warm ember/orange.
    "allowed_hue_ranges": [[0, 55], [330, 360]],
    # At/below this HSV saturation a color counts as neutral (black/white/gray) and is allowed.
    "neutral_saturation_max": 0.18,
    "allow_glow": False,
    "glow_blur_threshold_px": 12,
    "boxless": True,
}

_HEX_RE = re.compile(r"#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b")
_BLUR_RE = re.compile(r"blur\(\s*([0-9]+(?:\.[0-9]+)?)\s*px", re.IGNORECASE)
_GLOW_WORD_RE = re.compile(r"\b(glow|bloom|halo)\b", re.IGNORECASE)
_SHADOW_KEYS = {"box-shadow", "boxshadow", "box_shadow", "textshadow", "text-shadow", "text_shadow"}
_RADIUS_KEYS = {"radius", "border-radius", "borderradius", "border_radius", "borderRadius"}
_BG_KEYS = {"bg", "background", "background-color", "backgroundcolor", "background_color", "fill"}
# Config keys we must NOT scan (they legitimately list forbidden colors, etc.).
_SKIP_KEYS = {"brand_guard", "forbidden_hex", "allowed_overrides", "negative_prompt",
              "image_negative_prompt", "i2v_negative_prompt"}


def load_guard_config(playbook: dict[str, Any] | None) -> dict[str, Any]:
    """Merge a playbook's `brand_guard` block over the defaults."""
    cfg = dict(DEFAULT_GUARD_CONFIG)
    if playbook and isinstance(playbook.get("brand_guard"), dict):
        cfg.update({k: v for k, v in playbook["brand_guard"].items() if v is not None})
    cfg["_forbidden_norm"] = {_norm_hex(h) for h in cfg.get("forbidden_hex", []) if _norm_hex(h)}
    return cfg


# ---------------------------------------------------------------------------
# Color helpers
# ---------------------------------------------------------------------------

def _norm_hex(value: str) -> str | None:
    """Normalize a hex string to lowercase #rrggbb (drops alpha). None if invalid."""
    if not isinstance(value, str):
        return None
    v = value.strip().lower()
    if not v.startswith("#"):
        return None
    v = v[1:]
    if len(v) in (3, 4):  # #rgb / #rgba
        v = "".join(c * 2 for c in v[:3])
    elif len(v) in (6, 8):  # #rrggbb / #rrggbbaa
        v = v[:6]
    else:
        return None
    if not re.fullmatch(r"[0-9a-f]{6}", v):
        return None
    return "#" + v


def _hsv(hex6: str) -> tuple[float, float, float]:
    """(_hue_deg, saturation, value) for a normalized #rrggbb string."""
    r = int(hex6[1:3], 16) / 255.0
    g = int(hex6[3:5], 16) / 255.0
    b = int(hex6[5:7], 16) / 255.0
    h, s, v = colorsys.rgb_to_hsv(r, g, b)
    return h * 360.0, s, v


def _hue_allowed(hue: float, ranges: list) -> bool:
    for lo, hi in ranges:
        if lo <= hue <= hi:
            return True
    return False


def classify_color(hex_value: str, cfg: dict[str, Any]) -> dict[str, Any] | None:
    """Return a violation dict if the color is off-brand, else None."""
    hex6 = _norm_hex(hex_value)
    if hex6 is None:
        return None
    if hex6 in cfg.get("_forbidden_norm", set()):
        return {"severity": "critical", "kind": "forbidden_color", "value": hex6,
                "reason": f"{hex6} is a hard-forbidden color (AI-slop / navy leak)"}
    hue, sat, _val = _hsv(hex6)
    if sat <= cfg["neutral_saturation_max"]:
        return None  # neutral (black/white/gray) — allowed
    if _hue_allowed(hue, cfg["allowed_hue_ranges"]):
        return None  # warm ember/orange — on brand
    return {"severity": "critical", "kind": "off_brand_color", "value": hex6,
            "reason": f"{hex6} is saturated (S={sat:.2f}) at hue {hue:.0f}° — outside the ember band; "
                      f"reads as cyan/violet/blue AI-slop"}


# ---------------------------------------------------------------------------
# Recursive scan
# ---------------------------------------------------------------------------

def _scan(node: Any, cfg: dict[str, Any], path: str, out: list[dict[str, Any]],
          allowed: set[str]) -> None:
    if isinstance(node, dict):
        for key, val in node.items():
            kl = str(key).lower()
            if kl in _SKIP_KEYS:
                continue
            child_path = f"{path}.{key}" if path else str(key)
            # Card detection: a bg + a radius on the same style dict = boxless violation.
            if isinstance(val, dict) and cfg.get("boxless", True):
                has_bg = any(_bg_is_solid(val.get(bk)) for bk in val if str(bk).lower() in _BG_KEYS)
                has_radius = any(_radius_positive(val.get(rk)) for rk in val if str(rk).lower() in _RADIUS_KEYS)
                if has_bg and has_radius:
                    out.append({"severity": "warning", "kind": "card_boxless", "value": child_path,
                                "reason": "style has a solid background AND a border-radius — a card; brand is boxless"})
            # Glow via shadow keys (the value IS a shadow, so force the shadow context).
            if kl in _SHADOW_KEYS and isinstance(val, str):
                _check_glow(val, cfg, child_path, out, is_shadow_value=True)
            _scan(val, cfg, child_path, out, allowed)
    elif isinstance(node, list):
        for i, item in enumerate(node):
            _scan(item, cfg, f"{path}[{i}]", out, allowed)
    elif isinstance(node, str):
        # Hex colors inside any string value.
        for m in _HEX_RE.findall(node):
            if _norm_hex(m) in allowed:
                continue
            v = classify_color(m, cfg)
            if v:
                out.append({**v, "location": path})
        # Glow inside CSS-ish strings.
        if not cfg.get("allow_glow", False):
            _check_glow(node, cfg, path, out)


def _check_glow(css: str, cfg: dict[str, Any], path: str, out: list[dict[str, Any]],
                is_shadow_value: bool = False) -> None:
    """Flag glows/bloom. Only fires in a real shadow/filter CSS context — a bare
    color string or prose containing the word 'glow' is NOT a violation.
    `is_shadow_value=True` when the caller already knows the string is a shadow
    value (e.g. it came from a `box-shadow` key)."""
    if cfg.get("allow_glow", False):
        return
    lower = css.lower()
    # blur() = CSS filter function; box-shadow blur is a bare `px` length instead.
    fn_blurs = [float(x) for x in _BLUR_RE.findall(css)]
    css_context = (
        is_shadow_value
        or "shadow" in lower  # box-shadow / text-shadow / drop-shadow
        or "filter:" in lower
        or bool(fn_blurs)
    )
    if not css_context:
        return
    px_blurs = [float(x) for x in re.findall(r"([0-9]+(?:\.[0-9]+)?)px", css)] if ("shadow" in lower or is_shadow_value) else []
    big_blur = any(b >= cfg["glow_blur_threshold_px"] for b in (fn_blurs + px_blurs))
    named = bool(_GLOW_WORD_RE.search(css))
    # A saturated non-warm color inside a shadow/filter = a colored glow (hard fail).
    slop_color = any(
        (c := classify_color(m, cfg)) and c["severity"] == "critical"
        for m in _HEX_RE.findall(css)
    )
    if big_blur or slop_color or named:
        sev = "critical" if (slop_color or big_blur) else "warning"
        out.append({"severity": sev, "kind": "glow", "value": css[:80], "location": path,
                    "reason": "glow/bloom/large-blur shadow detected — the #1 AI-slop tell (brand is glow-free)"})


def _bg_is_solid(value: Any) -> bool:
    if not isinstance(value, str):
        return False
    v = value.strip().lower()
    return bool(v) and v not in ("transparent", "none", "inherit", "unset") and not v.startswith("rgba(0")


def _radius_positive(value: Any) -> bool:
    if isinstance(value, (int, float)):
        return value > 0
    if isinstance(value, str):
        m = re.search(r"([0-9]+(?:\.[0-9]+)?)", value)
        return bool(m) and float(m.group(1)) > 0
    return False


# ---------------------------------------------------------------------------
# Public entry point
# ---------------------------------------------------------------------------

def check_brand_palette(
    payload: Any,
    playbook: dict[str, Any] | None = None,
    guard_config: dict[str, Any] | None = None,
    allowed_overrides: list[str] | None = None,
) -> dict[str, Any]:
    """Scan a production artifact for AetherLogik brand violations.

    Args:
        payload: scene_plan (list), edit_decisions/theme (dict), css_vars (dict),
            a raw CSS/HTML string, or any nested combination.
        playbook: optional loaded playbook; its `brand_guard` block tunes the guard.
        guard_config: optional pre-built config (overrides `playbook`).
        allowed_overrides: hex strings explicitly permitted this production
            (must be justified in the decision_log).

    Returns:
        {"verdict": "pass|revise|fail", "violations": [...],
         "counts": {"critical": n, "warning": n}, "checked": bool}
    """
    cfg = guard_config or load_guard_config(playbook)
    if "_forbidden_norm" not in cfg:
        cfg = load_guard_config(playbook) if playbook else load_guard_config(None)
    allowed = {_norm_hex(h) for h in (allowed_overrides or []) if _norm_hex(h)}
    allowed.add(_norm_hex(cfg["accent_hex"]))
    allowed.add(_norm_hex(cfg["background_hex"]))

    violations: list[dict[str, Any]] = []
    _scan(payload, cfg, "", violations, allowed)

    # De-dup identical (kind, value, location).
    seen: set[tuple] = set()
    deduped: list[dict[str, Any]] = []
    for v in violations:
        key = (v["kind"], v.get("value"), v.get("location"))
        if key not in seen:
            seen.add(key)
            deduped.append(v)

    crit = sum(1 for v in deduped if v["severity"] == "critical")
    warn = sum(1 for v in deduped if v["severity"] == "warning")
    verdict = "fail" if crit else ("revise" if warn else "pass")

    return {
        "verdict": verdict,
        "violations": deduped,
        "counts": {"critical": crit, "warning": warn},
        "checked": True,
    }


# ---------------------------------------------------------------------------
# Self-test + CLI
# ---------------------------------------------------------------------------

def _selftest() -> None:
    cfg = load_guard_config(None)
    # On-brand: ember accent, near-black bg, gray text, transparent overlay → pass.
    ok = check_brand_palette(
        {"theme": {"accent": "#ff6b1a", "bg": "#0a0a0a", "text": "#f5f5f5", "muted": "#9aa0a6"},
         "overlays": {"headline": {"bg": "transparent", "text": "#f5f5f5"}}},
        guard_config=cfg)
    assert ok["verdict"] == "pass", ok

    # Slop: cyan + violet per-character + navy → fail with 3 forbidden colors.
    bad = check_brand_palette(
        {"hero_title": {"colors": ["#22d3ee", "#a78bfa"]}, "fill": "#0f172a"},
        guard_config=cfg)
    assert bad["verdict"] == "fail", bad
    assert bad["counts"]["critical"] >= 3, bad

    # Glow: large-blur bright shadow → critical.
    glow = check_brand_palette(
        {"style": {"box-shadow": "0 0 40px 10px #a78bfa"}}, guard_config=cfg)
    assert glow["verdict"] == "fail", glow

    # Card: solid bg + radius → boxless warning (revise, not fail).
    card = check_brand_palette(
        {"overlays": {"stat_card": {"bg": "#141414", "radius": 8, "text": "#f5f5f5"}}},
        guard_config=cfg)
    assert card["verdict"] == "revise", card

    # Override: a client color explicitly allowed → pass.
    ov = check_brand_palette({"accent": "#2563eb"}, guard_config=cfg,
                             allowed_overrides=["#2563eb"])
    assert ov["verdict"] == "pass", ov
    print("brand_palette_guard selftest: OK")


if __name__ == "__main__":
    import json
    import sys

    if len(sys.argv) == 2 and sys.argv[1] == "--selftest":
        _selftest()
        raise SystemExit(0)
    if len(sys.argv) < 2:
        print("usage: python -m lib.brand_palette_guard <artifact.json> [--selftest]", file=sys.stderr)
        raise SystemExit(2)
    with open(sys.argv[1], encoding="utf-8") as fh:
        data = json.load(fh)
    report = check_brand_palette(data)
    print(json.dumps(report, indent=2, ensure_ascii=False))
    raise SystemExit(0 if report["verdict"] != "fail" else 1)
