"""coherence_guard.py -- CPU-only anti-drift gate for multi-plano video chains.

Extends the visual_spotcheck philosophy that brand_palette_guard cannot cover:
brand_palette_guard only reads DECLARED code/props (theme/props/CSS strings),
never the generated photography. This gate reads PIXELS -- it samples frames
across each plano of a rendered video and checks them against the reference
keyframes (KF-A/B/C, locked at pre-production time as the identity/world/
palette source of truth) to catch coarse character/world/palette drift before
a piece is called done.

Born from the "La hora robada" v1 -> v2 rework (2026-07-05): v1 passed every
existing gate (brand_palette_guard/slideshow_risk/delivery_promise/
final_review) while still reading as 4 disconnected i2v clips -- character
drift, wardrobe drift, and world drift are exactly the failure mode none of
those gates measure, because none of them look at pixels across planos.

HONEST SCOPE (read before trusting a "pass"):
  - Check 1 (palette envelope) is a per-frame channel-mean / hue-saturation
    scan. It reliably catches a frame that has gone visibly cool/blue/cyan/
    violet, or drifted off the near-black + ember brand palette. It does NOT
    understand composition, subject count, or intent.
  - Check 2 (perceptual similarity) is a coarse dHash (difference hash) +
    per-channel color-histogram correlation against the nearest reference
    keyframe. It catches GROSS drift -- wrong room, wildly different color
    world, a frame that looks like it belongs to a different shot entirely.
    It does NOT do face recognition or fine-grained facial identity
    verification -- confirming "is this really the same face, unchanged"
    at high confidence requires a face-embedding model on a GPU, which this
    CPU-only gate deliberately does not attempt (and would be dishonest to
    claim). A "pass" here means "no gross drift detected by cheap pixel
    statistics" -- NOT "verified identical identity". A human/agent
    `final_review.visual_spotcheck` is still required before shipping.

Dependencies: ffmpeg (already a pipeline dependency, used for frame
extraction), Pillow, numpy. If either Python package is missing:
    pip install pillow numpy

Manifest shape (see `_selftest` for a runnable example):
{
  "planos": [
    {"id": "plano1", "video": "/path/or/url/clip1.mp4",
     "ref_start": "/path/kf-a.jpg", "ref_end": "/path/kf-b.jpg"},
    {"id": "plano2", "video": "/path/or/url/clip2.mp4",
     "ref_start": "/path/kf-b.jpg", "ref_end": "/path/kf-c.jpg"}
  ],
  "samples_per_plano": 3,
  "guard_config": { ... optional, mirrors lib/brand_palette_guard.py ... }
}

Verdict per plano: "pass" | "flag". Global verdict: "pass" | "flag_for_review"
(never a hard "fail" -- this is advisory, same posture as the other gates;
a flag routes to a human/agent visual re-check, it does not auto-block).

CLI:
    python -m lib.coherence_guard <manifest.json>
    python -m lib.coherence_guard --selftest
"""

from __future__ import annotations

import colorsys
import json
import subprocess
import sys
import tempfile
from pathlib import Path
from typing import Any

try:
    import numpy as np
except ImportError:  # pragma: no cover
    np = None  # type: ignore[assignment]

try:
    from PIL import Image
except ImportError:  # pragma: no cover
    Image = None  # type: ignore[assignment]


# ---------------------------------------------------------------------------
# Config (mirrors lib/brand_palette_guard.py's ember/near-black brand law so
# the two gates agree on what "on brand" means)
# ---------------------------------------------------------------------------

DEFAULT_GUARD_CONFIG: dict[str, Any] = {
    "accent_hex": "#ff6b1a",
    # Allowed saturated-hue bands (degrees) -- warm ember/orange only.
    "allowed_hue_ranges": [[0, 55], [330, 360]],
    # At/below this HSV saturation, a pixel/frame-mean counts as neutral
    # (black/white/gray) and is exempt from the hue check.
    "neutral_saturation_max": 0.18,
    # Check 1: how much a frame's mean blue channel may exceed the mean red
    # channel (0-255 scale) before it counts as "cool/blue dominant".
    "cool_dominance_delta": 6,
    # Check 2: dHash (64-bit) Hamming-distance threshold -- above this vs
    # BOTH reference keyframes, a sampled frame is flagged as gross drift.
    # Calibrated loosely on purpose: a live-action video frame mid-motion
    # will never dHash-match a static reference photo tightly, even with
    # zero drift. Tighten only after collecting real pass/flag examples.
    "dhash_distance_threshold": 30,
    # Check 2: minimum histogram cosine-similarity vs the closer reference
    # keyframe. Below this, the frame shares almost no color relationship
    # with either endpoint of its own plano.
    "histogram_similarity_min": 0.55,
}


def load_guard_config(overrides: dict[str, Any] | None) -> dict[str, Any]:
    cfg = dict(DEFAULT_GUARD_CONFIG)
    if overrides:
        cfg.update({k: v for k, v in overrides.items() if v is not None})
    return cfg


# ---------------------------------------------------------------------------
# Frame extraction (ffmpeg subprocess -- no video-decoding library needed)
# ---------------------------------------------------------------------------

def extract_frame(video_path: str, timestamp_s: float, out_path: Path) -> None:
    """Extract a single frame at `timestamp_s` seconds via ffmpeg -ss/-frames:v."""
    cmd = [
        "ffmpeg", "-y", "-ss", f"{timestamp_s:.3f}", "-i", video_path,
        "-frames:v", "1", "-q:v", "2", str(out_path),
    ]
    subprocess.run(cmd, check=True, capture_output=True)


def probe_duration_seconds(video_path: str) -> float:
    cmd = [
        "ffprobe", "-v", "error", "-show_entries", "format=duration",
        "-of", "default=noprint_wrappers=1:nokey=1", video_path,
    ]
    out = subprocess.run(cmd, check=True, capture_output=True, text=True).stdout.strip()
    return float(out)


def sample_timestamps(duration_s: float, n: int) -> list[float]:
    """Evenly spaced sample points inside the clip, avoiding the very first/
    last few frames (encoder artifacts, fade edges)."""
    if n <= 1:
        return [duration_s / 2]
    margin = min(0.15 * duration_s, 0.4)
    span = max(duration_s - 2 * margin, 0.01)
    return [margin + span * i / (n - 1) for i in range(n)]


# ---------------------------------------------------------------------------
# Image helpers (Pillow + numpy)
# ---------------------------------------------------------------------------

def _require_deps() -> None:
    if Image is None or np is None:
        raise RuntimeError(
            "coherence_guard requires Pillow and numpy: pip install pillow numpy"
        )


def load_rgb_array(path: str):
    _require_deps()
    with Image.open(path) as im:
        return np.asarray(im.convert("RGB"), dtype=np.float64)


def mean_rgb(arr) -> tuple[float, float, float]:
    return float(arr[..., 0].mean()), float(arr[..., 1].mean()), float(arr[..., 2].mean())


def dhash(path: str, hash_size: int = 8) -> int:
    """Difference hash: resize to (hash_size+1, hash_size), compare adjacent
    pixels left-to-right, pack the booleans into an int. Robust to scaling/
    compression, not to composition changes -- exactly the "coarse" tool we
    want here."""
    _require_deps()
    with Image.open(path) as im:
        small = im.convert("L").resize((hash_size + 1, hash_size), Image.LANCZOS)
        pixels = np.asarray(small, dtype=np.int16)
    diff = pixels[:, 1:] > pixels[:, :-1]
    bits = diff.flatten()
    value = 0
    for b in bits:
        value = (value << 1) | int(b)
    return value


def hamming_distance(a: int, b: int) -> int:
    return bin(a ^ b).count("1")


def channel_histogram(arr, bins: int = 16):
    """Concatenated per-channel normalized histogram (3*bins vector)."""
    hists = []
    for c in range(3):
        h, _ = np.histogram(arr[..., c], bins=bins, range=(0, 255))
        total = h.sum()
        hists.append(h / total if total > 0 else h.astype(np.float64))
    return np.concatenate(hists)


def cosine_similarity(a, b) -> float:
    denom = (np.linalg.norm(a) * np.linalg.norm(b))
    if denom == 0:
        return 0.0
    return float(np.dot(a, b) / denom)


# ---------------------------------------------------------------------------
# Check 1 -- palette envelope (per-frame mean channel / hue-saturation)
# ---------------------------------------------------------------------------

def check_palette_envelope(frame_path: str, cfg: dict[str, Any]) -> dict[str, Any]:
    arr = load_rgb_array(frame_path)
    r, g, b = mean_rgb(arr)

    violations: list[str] = []

    # "B es el canal mas bajo = ember calido": for a warm/ember-lit frame the
    # mean blue channel should sit below mean red. If blue exceeds red by
    # more than the configured delta, the frame reads cool/blue-dominant.
    if b > r + cfg["cool_dominance_delta"]:
        violations.append(
            f"cool/blue-dominant mean (R={r:.0f} G={g:.0f} B={b:.0f}, "
            f"B exceeds R by {b - r:.0f})"
        )

    # Hue/saturation of the frame's mean color -- catches a saturated
    # off-ember cast even when blue isn't technically the top channel
    # (e.g. a violet frame where R and B are both high).
    h, s, _v = colorsys.rgb_to_hsv(r / 255.0, g / 255.0, b / 255.0)
    hue_deg = h * 360.0
    if s > cfg["neutral_saturation_max"]:
        in_band = any(lo <= hue_deg <= hi for lo, hi in cfg["allowed_hue_ranges"])
        if not in_band:
            violations.append(
                f"off-ember hue in mean color (hue={hue_deg:.0f} deg, sat={s:.2f})"
            )

    return {
        "verdict": "flag" if violations else "pass",
        "mean_rgb": {"r": round(r, 1), "g": round(g, 1), "b": round(b, 1)},
        "hue_deg": round(hue_deg, 1),
        "saturation": round(s, 3),
        "violations": violations,
    }


# ---------------------------------------------------------------------------
# Check 2 -- perceptual similarity vs the plano's reference keyframes
# ---------------------------------------------------------------------------

def check_similarity_to_references(
    frame_path: str, ref_start_path: str, ref_end_path: str, cfg: dict[str, Any]
) -> dict[str, Any]:
    frame_hash = dhash(frame_path)
    start_hash = dhash(ref_start_path)
    end_hash = dhash(ref_end_path)
    dist_start = hamming_distance(frame_hash, start_hash)
    dist_end = hamming_distance(frame_hash, end_hash)
    min_dist = min(dist_start, dist_end)

    frame_hist = channel_histogram(load_rgb_array(frame_path))
    start_hist = channel_histogram(load_rgb_array(ref_start_path))
    end_hist = channel_histogram(load_rgb_array(ref_end_path))
    sim_start = cosine_similarity(frame_hist, start_hist)
    sim_end = cosine_similarity(frame_hist, end_hist)
    max_sim = max(sim_start, sim_end)

    violations: list[str] = []
    if min_dist > cfg["dhash_distance_threshold"]:
        violations.append(
            f"dHash distance {min_dist}/64 exceeds threshold "
            f"{cfg['dhash_distance_threshold']} vs both reference keyframes"
        )
    if max_sim < cfg["histogram_similarity_min"]:
        violations.append(
            f"color-histogram similarity {max_sim:.2f} below threshold "
            f"{cfg['histogram_similarity_min']} vs both reference keyframes"
        )

    return {
        "verdict": "flag" if violations else "pass",
        "dhash_distance_start": dist_start,
        "dhash_distance_end": dist_end,
        "histogram_similarity_start": round(sim_start, 3),
        "histogram_similarity_end": round(sim_end, 3),
        "violations": violations,
    }


# ---------------------------------------------------------------------------
# Per-plano + global orchestration
# ---------------------------------------------------------------------------

def check_plano(plano: dict[str, Any], cfg: dict[str, Any], tmp_dir: Path) -> dict[str, Any]:
    video = plano["video"]
    ref_start = plano["ref_start"]
    ref_end = plano["ref_end"]
    n_samples = plano.get("samples", 3)

    duration = probe_duration_seconds(video)
    timestamps = sample_timestamps(duration, n_samples)

    frame_reports = []
    for i, ts in enumerate(timestamps):
        frame_path = tmp_dir / f"{plano['id']}_sample_{i}.jpg"
        extract_frame(video, ts, frame_path)
        palette = check_palette_envelope(str(frame_path), cfg)
        similarity = check_similarity_to_references(str(frame_path), ref_start, ref_end, cfg)
        frame_reports.append({
            "timestamp_s": round(ts, 2),
            "palette_envelope": palette,
            "similarity_to_references": similarity,
            "verdict": "flag" if (palette["verdict"] == "flag" or similarity["verdict"] == "flag") else "pass",
        })

    plano_verdict = "flag" if any(f["verdict"] == "flag" for f in frame_reports) else "pass"
    return {
        "plano_id": plano["id"],
        "duration_s": round(duration, 2),
        "samples": frame_reports,
        "verdict": plano_verdict,
    }


def run_coherence_guard(manifest: dict[str, Any], guard_config: dict[str, Any] | None = None) -> dict[str, Any]:
    cfg = load_guard_config(guard_config or manifest.get("guard_config"))
    planos = manifest["planos"]
    for p in planos:
        p.setdefault("samples", manifest.get("samples_per_plano", 3))

    with tempfile.TemporaryDirectory(prefix="coherence_guard_") as td:
        tmp_dir = Path(td)
        plano_reports = [check_plano(p, cfg, tmp_dir) for p in planos]

    global_verdict = "flag_for_review" if any(p["verdict"] == "flag" for p in plano_reports) else "pass"
    return {
        "verdict": global_verdict,
        "planos": plano_reports,
        "scope_note": (
            "Palette envelope + coarse dHash/histogram drift only. "
            "Does NOT verify facial identity at fine grain (needs a GPU "
            "face-embedding model). A flag or a pass both still require a "
            "human/agent visual_spotcheck before shipping."
        ),
    }


# ---------------------------------------------------------------------------
# Self-test (synthetic images, no ffmpeg/video required) + CLI
# ---------------------------------------------------------------------------

def _make_solid_jpeg(path: Path, rgb: tuple[int, int, int], size=(64, 64)) -> None:
    _require_deps()
    Image.new("RGB", size, rgb).save(path, "JPEG", quality=90)


def _selftest() -> None:
    _require_deps()
    with tempfile.TemporaryDirectory(prefix="coherence_guard_selftest_") as td:
        tmp = Path(td)
        ember = (200, 90, 30)     # warm ember-ish, on-brand
        cyan = (20, 140, 220)     # cool/cyan, off-brand

        ember_path = tmp / "ember.jpg"
        cyan_path = tmp / "cyan.jpg"
        _make_solid_jpeg(ember_path, ember)
        _make_solid_jpeg(cyan_path, cyan)

        cfg = load_guard_config(None)

        ok = check_palette_envelope(str(ember_path), cfg)
        assert ok["verdict"] == "pass", ok

        bad = check_palette_envelope(str(cyan_path), cfg)
        assert bad["verdict"] == "flag", bad

        sim_same = check_similarity_to_references(str(ember_path), str(ember_path), str(ember_path), cfg)
        assert sim_same["verdict"] == "pass", sim_same

        sim_diff = check_similarity_to_references(str(cyan_path), str(ember_path), str(ember_path), cfg)
        # A solid cyan frame vs a solid ember reference has a real color
        # relationship difference but dHash of two flat-color images is
        # trivially identical (no internal gradient) -- so this check only
        # asserts the histogram similarity path fires, not dHash.
        assert sim_diff["histogram_similarity_start"] < sim_same["histogram_similarity_start"], sim_diff

    print("coherence_guard selftest: OK")


if __name__ == "__main__":
    if len(sys.argv) == 2 and sys.argv[1] == "--selftest":
        _selftest()
        raise SystemExit(0)
    if len(sys.argv) < 2:
        print("usage: python -m lib.coherence_guard <manifest.json> [--selftest]", file=sys.stderr)
        raise SystemExit(2)
    with open(sys.argv[1], encoding="utf-8") as fh:
        manifest = json.load(fh)
    report = run_coherence_guard(manifest)
    print(json.dumps(report, indent=2, ensure_ascii=False))
    raise SystemExit(0 if report["verdict"] != "flag_for_review" else 1)
