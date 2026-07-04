import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ParticleOverlay } from "./ParticleOverlay";

export interface EmberThreadProps {
  backgroundColor?: string;
  accentColor?: string;
  /** Duration of the traveling light-streak sweep, in seconds. */
  sweepSeconds?: number;
  particleCount?: number;
  particleIntensity?: number;
}

/**
 * EmberThread — near-black backdrop with a single traveling ember
 * light-streak that sweeps once across the frame at the start of the cut
 * (the "invisible intelligence" motif carrying the transition from the
 * previous scene into the message space), followed by a sustained faint
 * field of ember fireflies (reusing the existing ParticleOverlay) for the
 * rest of the cut. Boxless, ember-only — no other accent color introduced.
 *
 * Added 2026-07-04 for the vertical "El socio invisible" reel v3 — no
 * existing cut type produced a moving light-thread transition; the closest
 * primitive (ParticleOverlay "fireflies") is ambient-only with no directed
 * sweep, so this composes a sweep on top of it rather than duplicating it.
 */
export const EmberThread: React.FC<EmberThreadProps> = ({
  backgroundColor = "#0A0A0A",
  accentColor = "#FF6B1A",
  sweepSeconds = 1.0,
  particleCount = 16,
  particleIntensity = 0.45,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sweepFrames = sweepSeconds * fps;

  // Diagonal streak travels from off-screen bottom-left to off-screen
  // top-right once, over sweepFrames.
  const sweepLeft = interpolate(frame, [0, sweepFrames], [-25, 115], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const sweepOpacity = interpolate(
    frame,
    [0, sweepFrames * 0.18, sweepFrames * 0.82, sweepFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ background: backgroundColor, overflow: "hidden" }}>
      {/* Traveling ember streak — reads as the "invisible intelligence"
          carrying the cut from the hero footage into the message space. */}
      <div
        style={{
          position: "absolute",
          left: `${sweepLeft}%`,
          top: "-35%",
          width: "16%",
          height: "170%",
          background: `linear-gradient(180deg, transparent 0%, ${accentColor} 45%, ${accentColor} 55%, transparent 100%)`,
          opacity: sweepOpacity,
          filter: "blur(42px)",
          transform: "rotate(16deg)",
        }}
      />
      {/* Sustained ambient ember motif for the remainder of the cut. */}
      <ParticleOverlay
        type="fireflies"
        color={accentColor}
        count={particleCount}
        intensity={particleIntensity}
      />
    </AbsoluteFill>
  );
};
