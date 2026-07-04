import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export interface BeatWordProps {
  text: string;
  backgroundImageSrc?: string; // path in public/ (staticFile-resolved) or absolute http(s) URL
  color?: string;
  accentColor?: string;
  fontSize?: number;
  backgroundColor?: string;
}

function resolveMaybeUrl(src?: string): string | undefined {
  if (!src) return undefined;
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  return staticFile(src);
}

/**
 * BeatWord — elevated boxless word beat: a single word/phrase on a solid
 * brand background, with the hero pipeline image very faint and blurred
 * behind it (texture, not a photo) and a thin ember line that draws itself
 * in under the word. Added for the AetherLogik brand reel pilot v2
 * (2026-07-04) — the existing text_card is flat text-on-glow; this gives
 * the 3 "beats" (Apps a medida / Automatización / IA en tu negocio) more
 * depth without adding a card/box (boxless rule stays intact).
 */
export const BeatWord: React.FC<BeatWordProps> = ({
  text,
  backgroundImageSrc,
  color = "#FFFFFF",
  accentColor = "#FF6B1A",
  fontSize = 104,
  backgroundColor = "#0A0A0A",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const wordSpring = spring({ frame, fps, config: { damping: 18, stiffness: 90 } });
  const wordTranslateY = interpolate(wordSpring, [0, 1], [16, 0]);

  // The ember underline draws in slightly after the word starts appearing.
  const lineSpring = spring({ frame: frame - 6, fps, config: { damping: 20, stiffness: 80 } });
  const lineScaleX = interpolate(lineSpring, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const resolvedBg = resolveMaybeUrl(backgroundImageSrc);

  return (
    <AbsoluteFill
      style={{
        background: backgroundColor,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {resolvedBg && (
        <Img
          src={resolvedBg}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.13,
            filter: "blur(20px)",
            transform: "scale(1.1)", // avoid the blurred edge showing at the frame border
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
            opacity: wordSpring,
            transform: `translateY(${wordTranslateY}px)`,
            fontSize,
            fontWeight: 700,
            color,
            fontFamily: "Inter, system-ui, sans-serif",
            textAlign: "center",
            letterSpacing: "-0.01em",
            maxWidth: "88%",
          }}
        >
          {text}
        </div>
        <div
          style={{
            marginTop: 20,
            height: 3,
            width: fontSize * 2.2,
            background: accentColor,
            transform: `scaleX(${lineScaleX})`,
            transformOrigin: "center",
            borderRadius: 2,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
