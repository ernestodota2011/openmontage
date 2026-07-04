import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BRAND, EASING, TIMING } from "../theme";

export interface KineticHeadlineProps {
  /** Lines to reveal, top to bottom. A single string is one line. */
  lines: string | string[];
  color?: string;
  accentColor?: string;
  /** Word rendered in the accent color (ember). Case-insensitive, punctuation-insensitive. */
  accentWord?: string;
  fontSize?: number;
  fontWeight?: number;
  fontFamily?: string;
  /** Vertical placement over the underlying cut. */
  position?: "center" | "bottom";
  /** Soft bottom scrim for legibility over video (bottom placement). */
  scrim?: boolean;
  /** Per-line mask-reveal duration (seconds). */
  revealSeconds?: number;
  /** Stagger between lines (seconds). */
  staggerSeconds?: number;
}

/**
 * KineticHeadline — premium mask-reveal headline. Each line sits in an
 * overflow-hidden clip and rises from translateY(110%) to 0 with easeOutExpo
 * over ~0.8s, staggered per line (~0.1s), with a short blur-in settle. One
 * optional accent word renders in ember. Boxless (transparent, no card).
 *
 * This is the "editorial in motion" primitive from premium-craft-standards —
 * use it for hero/brand headlines INSTEAD of the built-in hero_title (which
 * slaps cyan/violet on each glyph and reads as AI-slop). Added 2026-07-04
 * (AetherLogik premium primitives).
 */
export const KineticHeadline: React.FC<KineticHeadlineProps> = ({
  lines,
  color = BRAND.text,
  accentColor = BRAND.accent,
  accentWord,
  fontSize = 76,
  fontWeight = 700,
  fontFamily = "Inter, system-ui, sans-serif",
  position = "center",
  scrim = false,
  revealSeconds = TIMING.maskRevealSeconds,
  staggerSeconds = TIMING.lineStaggerSeconds,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lineList = Array.isArray(lines) ? lines : [lines];
  const revealFrames = revealSeconds * fps;
  const staggerFrames = staggerSeconds * fps;
  const isBottom = position === "bottom";
  const accentLc = accentWord ? accentWord.toLowerCase() : null;

  const renderLine = (line: string): React.ReactNode => {
    if (!accentLc) return line;
    const words = line.split(" ");
    return words.map((word, i) => {
      const clean = word.toLowerCase().replace(/[.,;:!?¡¿"']/g, "");
      const isAccent = clean === accentLc;
      return (
        <span key={i} style={{ color: isAccent ? accentColor : "inherit" }}>
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      );
    });
  };

  return (
    <AbsoluteFill
      style={{
        justifyContent: isBottom ? "flex-end" : "center",
        alignItems: "center",
        background: "transparent",
        padding: isBottom ? "0 8% 9%" : "0 8%",
      }}
    >
      {scrim && isBottom && (
        <AbsoluteFill
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(10,10,10,0.5) 60%, rgba(10,10,10,0.72) 100%)",
          }}
        />
      )}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {lineList.map((line, i) => {
          const start = i * staggerFrames;
          const progress = interpolate(frame, [start, start + revealFrames], [0, 1], {
            easing: EASING.outExpo,
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const translateY = (1 - progress) * 110;
          const blur = (1 - progress) * 6;
          return (
            <div key={i} style={{ overflow: "hidden", padding: "0.06em 0.02em" }}>
              <div
                style={{
                  transform: `translateY(${translateY}%)`,
                  filter: blur > 0.05 ? `blur(${blur}px)` : "none",
                  fontSize,
                  fontWeight,
                  color,
                  fontFamily,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.12,
                  textAlign: "center",
                  whiteSpace: "pre-wrap",
                }}
              >
                {renderLine(line)}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
