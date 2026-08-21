import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BRAND, EASING, SPRINGS } from "../theme";

export interface SplitCompareProps {
  leftLabel: string;
  leftWord: string;
  leftDesc: string;
  rightLabel: string;
  rightWord: string;
  rightDesc: string;
  accentColor?: string;
}

/**
 * SplitCompare — boxless two-column comparison: eyebrow label + big word +
 * short descriptor per side, separated by a single ember hairline that
 * grows vertically between them (same "structural ember line" idea already
 * established by EmberThread's sweep and TagRevealList's tick — NOT a
 * second accent color; the hairline is structure, not content). Built for
 * "AlquilarOComprar" (reel 1/4, gancho, serie reels-n8n-zapier-serie) to
 * dramatize the post's own alquilar/comprar apartment-vs-house metaphor
 * for Zapier vs n8n WITHOUT reusing the native ComparisonCard (white
 * background, drop-shadow card, hardcoded blue/green — violates boxless +
 * ember-only brand guard). Neither side is color-coded to avoid implying
 * a favorite (the post is explicitly comparative, not a sales pitch for
 * one tool) — both words render in near-white; the ONE ember element in
 * this composition is the hairline itself. Added 2026-08-21 for
 * reels-n8n-zapier-serie.
 */
export const SplitCompare: React.FC<SplitCompareProps> = ({
  leftLabel,
  leftWord,
  leftDesc,
  rightLabel,
  rightWord,
  rightDesc,
  accentColor = BRAND.accent,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const leftReveal = interpolate(frame, [0, 20], [0, 1], {
    easing: EASING.outExpo,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const hairlineGrow = spring({ frame: frame - 14, fps, config: SPRINGS.premium });
  const rightReveal = interpolate(frame, [24, 44], [0, 1], {
    easing: EASING.outExpo,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const colStyle = (reveal: number): React.CSSProperties => ({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: 14,
    opacity: reveal,
    transform: `translateY(${(1 - reveal) * 22}px)`,
  });

  return (
    <AbsoluteFill style={{ background: BRAND.bg, justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "stretch", width: "86%", gap: 0 }}>
        <div style={colStyle(leftReveal)}>
          <div style={{ fontSize: 20, letterSpacing: "0.12em", color: BRAND.muted, textTransform: "uppercase", fontFamily: "Inter, system-ui, sans-serif" }}>
            {leftLabel}
          </div>
          <div style={{ fontSize: 64, fontWeight: 800, color: BRAND.text, letterSpacing: "-0.03em", fontFamily: "Inter, system-ui, sans-serif", lineHeight: 1.05 }}>
            {leftWord}
          </div>
          <div style={{ fontSize: 24, color: BRAND.muted, fontFamily: "Inter, system-ui, sans-serif", maxWidth: "90%", lineHeight: 1.4 }}>
            {leftDesc}
          </div>
        </div>

        <div style={{ width: 40, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ width: 2, height: `${hairlineGrow * 78}%`, background: accentColor }} />
        </div>

        <div style={colStyle(rightReveal)}>
          <div style={{ fontSize: 20, letterSpacing: "0.12em", color: BRAND.muted, textTransform: "uppercase", fontFamily: "Inter, system-ui, sans-serif" }}>
            {rightLabel}
          </div>
          <div style={{ fontSize: 64, fontWeight: 800, color: BRAND.text, letterSpacing: "-0.03em", fontFamily: "Inter, system-ui, sans-serif", lineHeight: 1.05 }}>
            {rightWord}
          </div>
          <div style={{ fontSize: 24, color: BRAND.muted, fontFamily: "Inter, system-ui, sans-serif", maxWidth: "90%", lineHeight: 1.4 }}>
            {rightDesc}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
