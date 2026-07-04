import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export interface BrandCloseProps {
  wordmark: string;
  tagline?: string;
  url?: string;
  logoSrc?: string; // path in public/ (staticFile-resolved) or absolute http(s) URL
  accentColor?: string;
  backgroundColor?: string;
}

/**
 * BrandClose — closing card: logo mark (or wordmark text alone) + tagline +
 * url, centered, boxless, converging fade/scale-in on a solid brand
 * background. Added for the AetherLogik brand reel pilot (2026-07-04) —
 * none of the existing cut types support a 3-tier stacked close
 * (mark + tagline + url) without hardcoded off-brand colors.
 */
export const BrandClose: React.FC<BrandCloseProps> = ({
  wordmark,
  tagline,
  url,
  logoSrc,
  accentColor = "#FF6B1A",
  backgroundColor = "#0A0A0A",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const markSpring = spring({ frame, fps, config: { damping: 16, stiffness: 90 } });
  const markScale = interpolate(markSpring, [0, 1], [0.9, 1]);
  const taglineOpacity = spring({ frame: frame - 10, fps, config: { damping: 20 } });
  const urlOpacity = spring({ frame: frame - 18, fps, config: { damping: 20 } });

  const resolvedLogoSrc = logoSrc
    ? logoSrc.startsWith("http://") || logoSrc.startsWith("https://")
      ? logoSrc
      : staticFile(logoSrc)
    : undefined;

  return (
    <AbsoluteFill
      style={{
        background: backgroundColor,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {resolvedLogoSrc ? (
        <Img
          src={resolvedLogoSrc}
          style={{
            width: 140,
            height: 140,
            objectFit: "contain",
            opacity: markSpring,
            transform: `scale(${markScale})`,
          }}
        />
      ) : null}
      <div
        style={{
          marginTop: resolvedLogoSrc ? 28 : 0,
          opacity: markSpring,
          transform: `scale(${markScale})`,
          fontSize: 88,
          fontWeight: 800,
          fontFamily: "Inter, system-ui, sans-serif",
          color: "#F5F5F5",
          letterSpacing: "-0.01em",
        }}
      >
        {wordmark}
      </div>
      {tagline && (
        <div
          style={{
            marginTop: 20,
            opacity: taglineOpacity,
            fontSize: 30,
            fontWeight: 400,
            fontStyle: "italic",
            fontFamily: "Inter, system-ui, sans-serif",
            color: "#D4D4D4",
            textAlign: "center",
            maxWidth: "80%",
          }}
        >
          {tagline}
        </div>
      )}
      {url && (
        <div
          style={{
            marginTop: 22,
            opacity: urlOpacity,
            fontSize: 26,
            fontWeight: 600,
            fontFamily: "Inter, system-ui, sans-serif",
            color: accentColor,
            letterSpacing: "0.02em",
          }}
        >
          {url}
        </div>
      )}
    </AbsoluteFill>
  );
};
