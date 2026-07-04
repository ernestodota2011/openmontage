import { AbsoluteFill, useCurrentFrame } from "remotion";

export interface FilmGradeProps {
  children?: React.ReactNode;
  /** Contrast bump — lifts the flat AI look. */
  contrast?: number;
  /** Saturation — DOWN by default (AI footage over-saturates). */
  saturation?: number;
  brightness?: number;
  /** Film-grain overlay opacity (temporal). 0 disables. */
  grainOpacity?: number;
  /** Vignette darkness at the corners (0 disables). */
  vignette?: number;
}

/**
 * FilmGrade — wraps a scene and applies the in-composition "de-plastic"
 * finishing that makes AI footage read cinematic: a subtle grade (contrast up,
 * saturation DOWN — the AI over-saturates), animated temporal film grain (SVG
 * feTurbulence whose seed advances per frame, so the grain lives instead of
 * sitting like fixed dirt), and a soft vignette. Boxless and ember-safe — it
 * introduces no color. Mirrors the FFmpeg de-plastic recipe in
 * aetherlogik-video/premium-craft-standards; the heavier curve + halation
 * still belong in the FFmpeg finishing pass on the rendered master.
 *
 * Added 2026-07-04 (AetherLogik premium primitives) — no existing component
 * applied a reusable cinematic grade/grain; scenes were shipping the raw
 * plastic AI look.
 */
export const FilmGrade: React.FC<FilmGradeProps> = ({
  children,
  contrast = 1.06,
  saturation = 0.92,
  brightness = 1.02,
  grainOpacity = 0.14,
  vignette = 0.45,
}) => {
  const frame = useCurrentFrame();
  // Advance the turbulence seed every 2 frames so the grain is temporal.
  const seed = Math.floor(frame / 2) % 100;
  const grainId = `filmgrain-${seed}`;

  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          filter: `contrast(${contrast}) saturate(${saturation}) brightness(${brightness})`,
        }}
      >
        {children}
      </AbsoluteFill>

      {vignette > 0 && (
        <AbsoluteFill
          style={{
            background: `radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,${vignette}) 100%)`,
            pointerEvents: "none",
          }}
        />
      )}

      {grainOpacity > 0 && (
        <AbsoluteFill
          style={{
            opacity: grainOpacity,
            mixBlendMode: "overlay",
            pointerEvents: "none",
          }}
        >
          <svg width="100%" height="100%" preserveAspectRatio="none">
            <filter id={grainId}>
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.9"
                numOctaves={2}
                seed={seed}
                stitchTiles="stitch"
              />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter={`url(#${grainId})`} />
          </svg>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
