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
}

/**
 * HeadlineOverlay — large centered headline that composites transparently on
 * top of a continuing background cut (image/video Ken Burns keeps running
 * underneath). Brand-safe by design: no hardcoded accent colors — the
 * caller passes color explicitly (added for the AetherLogik brand reel
 * pilot, 2026-07-04, because the built-in hero_title overlay hardcodes
 * cyan/violet per-character colors that violate the ember-only brand rule).
 */
export const HeadlineOverlay: React.FC<HeadlineOverlayProps> = ({
  text,
  color = "#FFFFFF",
  fontSize = 76,
  fontWeight = 700,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = spring({ frame, fps, config: { damping: 20, stiffness: 90 } });
  const translateY = interpolate(opacity, [0, 1], [24, 0]);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        background: "transparent",
        padding: "0 8%",
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
          maxWidth: "90%",
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};
