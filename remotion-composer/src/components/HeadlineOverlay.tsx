import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export interface HeadlineOverlayProps {
  text: string;
  color?: string;
  fontSize?: number;
  fontWeight?: number;
  /** Secondary line rendered smaller, below the main text (added 2026-07-04
   *  vertical reel v3 — beat 3 needs a big headline + a smaller line under
   *  it: "Automatización e IA, hechas para tu negocio." + "Aunque no seas
   *  técnico."). Omit for the original single-line behavior. */
  subtitle?: string;
  subtitleColor?: string;
  subtitleFontSize?: number;
  /** Vertical placement — "center" (default, original behavior) or "bottom"
   *  (added 2026-07-04 vertical reel v3 — beats over a portrait hero video
   *  read better with the line sitting low, clear of the subject). */
  position?: "center" | "bottom";
  /** Soft bottom-to-transparent black scrim behind the text so it stays
   *  legible over a moving video background regardless of the underlying
   *  frame's brightness (added 2026-07-04 vertical reel v3). Only applies
   *  when position="bottom". */
  scrim?: boolean;
}

/**
 * HeadlineOverlay — large centered headline that composites transparently on
 * top of a continuing background cut (image/video Ken Burns keeps running
 * underneath). Brand-safe by design: no hardcoded accent colors — the
 * caller passes color explicitly (added for the AetherLogik brand reel
 * pilot, 2026-07-04, because the built-in hero_title overlay hardcodes
 * cyan/violet per-character colors that violate the ember-only brand rule).
 *
 * Extended 2026-07-04 (vertical reel v3, "El socio invisible") with an
 * optional bottom placement + scrim (for text over a portrait hero video)
 * and an optional smaller subtitle line — additive, defaults preserve the
 * original single-line centered behavior used by the v1/v2 horizontal reels.
 */
export const HeadlineOverlay: React.FC<HeadlineOverlayProps> = ({
  text,
  color = "#FFFFFF",
  fontSize = 76,
  fontWeight = 700,
  subtitle,
  subtitleColor = "#D4D4D4",
  subtitleFontSize,
  position = "center",
  scrim = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = spring({ frame, fps, config: { damping: 20, stiffness: 90 } });
  const translateY = interpolate(opacity, [0, 1], [24, 0]);

  const subtitleOpacity = spring({
    frame: frame - 8,
    fps,
    config: { damping: 20, stiffness: 90 },
  });

  const isBottom = position === "bottom";

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
        <div
          style={{
            opacity,
            transform: `translateY(${translateY}px)`,
            fontSize,
            fontWeight,
            color,
            fontFamily: "Inter, system-ui, sans-serif",
            textAlign: "center",
            lineHeight: 1.25,
            maxWidth: "100%",
          }}
        >
          {text}
        </div>
        {subtitle && (
          <div
            style={{
              marginTop: 14,
              opacity: subtitleOpacity,
              fontSize: subtitleFontSize ?? Math.round(fontSize * 0.42),
              fontWeight: 500,
              color: subtitleColor,
              fontFamily: "Inter, system-ui, sans-serif",
              textAlign: "center",
              lineHeight: 1.3,
              maxWidth: "100%",
            }}
          >
            {subtitle}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
