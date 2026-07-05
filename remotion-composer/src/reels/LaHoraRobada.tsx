import {
  AbsoluteFill,
  Audio,
  OffthreadVideo,
  Sequence,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { BRAND, EASING } from "../theme";
import { EmberThread } from "../components/EmberThread";
import { KineticHeadline } from "../components/KineticHeadline";
import { BrandClose } from "../components/BrandClose";
import { FilmGrade } from "../components/FilmGrade";

/**
 * LaHoraRobada — bespoke atelier composition for the AetherLogik flagship
 * brand reel "La hora robada" (2026-07-04). Hand-authored per-scene JSX
 * (no `cut.type`/`Overlay` JSON dispatcher, no `Explainer.tsx`) — see
 * `LaHoraRobada.art-direction.md` in this same folder for the per-scene
 * rationale, the signature-device discipline (EmberThread appears exactly
 * once), and the transparency note on how "atelier" is interpreted in this
 * fork.
 *
 * Frame plan @ 24fps (styles/aetherlogik-ember.yaml -> motion.fps): 408
 * frames total = 17.000s exact.
 */
export interface LaHoraRobadaProps {
  shot1Src: string;
  shot2Src: string;
  shot3Src: string;
  shot4Src: string;
  musicSrc: string;
  logoSrc: string;
  [key: string]: unknown; // required by the <Composition> generic (house convention, dbe87d7)
}

const SHOT1_FRAMES = 80; // 3.333s — ANTES-A, establishing, push-in 1.0->1.03
const SHOT2_FRAMES = 60; // 2.500s — ANTES-B, locked-off (register contrast vs shot 1)
const THREAD_FRAMES = 24; // 1.000s — EmberThread pivot, the ONLY synthetic beat
const SHOT3_FRAMES = 84; // 3.500s — DESPUES-A hero, push-in 1.0->1.08 (brand max)
const SHOT4_FRAMES = 76; // 3.167s — DESPUES-B, second subject, lateral drift
const CLOSE_FRAMES = 84; // 3.500s — BrandClose

export const LA_HORA_ROBADA_TOTAL_FRAMES =
  SHOT1_FRAMES + SHOT2_FRAMES + THREAD_FRAMES + SHOT3_FRAMES + SHOT4_FRAMES + CLOSE_FRAMES; // 408

const SHOT1_START = 0;
const SHOT2_START = SHOT1_START + SHOT1_FRAMES; // 80
const THREAD_START = SHOT2_START + SHOT2_FRAMES; // 140
const SHOT3_START = THREAD_START + THREAD_FRAMES; // 164
const SHOT4_START = SHOT3_START + SHOT3_FRAMES; // 248
const CLOSE_START = SHOT4_START + SHOT4_FRAMES; // 324

/**
 * Hand-authored push-in — principle-driven (Disney slow-in/slow-out via
 * EASING.camera), not a stock preset. Takes an explicit `durationFrames`
 * (the Sequence's LOCAL length) rather than reading `useVideoConfig()`,
 * which would return the whole composition's duration — the exact gotcha
 * `bespoke-composition.md` warns about ("drive scene-local timing from a
 * passed durationInFrames, not the global").
 */
const PushIn: React.FC<{
  src: string;
  from: number;
  to: number;
  durationFrames: number;
  children?: React.ReactNode;
}> = ({ src, from, to, durationFrames, children }) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, durationFrames], [from, to], {
    easing: EASING.camera,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: BRAND.bg }}>
      <OffthreadVideo
        src={src}
        muted
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale})`,
        }}
      />
      {children}
    </AbsoluteFill>
  );
};

/**
 * Music envelope — full ambient bed, dips near-silent for the 0.5s before
 * the pivot, releases back up exactly as Shot 3 begins (the reveal). This
 * only shapes the RELATIVE dip+release; devops' FFmpeg finishing pass layers
 * the synthesized impact/chime SFX (aevalsrc, same pattern as reel v3's
 * ember swell) and runs the final 2-pass loudnorm to -14 LUFS / -1.0 dBTP.
 */
function musicVolume(frame: number): number {
  const duckStart = SHOT2_START + 48; // 128 — 0.5s before the pivot
  const duckEnd = THREAD_START; // 140
  const releaseEnd = SHOT3_START + 12; // 176 — 0.5s swell back up
  if (frame < duckStart) return 1.0;
  if (frame < duckEnd) {
    return interpolate(frame, [duckStart, duckEnd], [1.0, 0.08], {
      extrapolateRight: "clamp",
    });
  }
  if (frame < SHOT3_START) return 0.08;
  if (frame < releaseEnd) {
    return interpolate(frame, [SHOT3_START, releaseEnd], [0.08, 1.0], {
      extrapolateRight: "clamp",
    });
  }
  return 1.0;
}

export const LaHoraRobada: React.FC<LaHoraRobadaProps> = ({
  shot1Src,
  shot2Src,
  shot3Src,
  shot4Src,
  musicSrc,
  logoSrc,
}) => {
  return (
    <AbsoluteFill style={{ background: BRAND.bg }}>
      <Audio src={musicSrc} volume={musicVolume} />

      {/* Shot 1 — ANTES-A: medium-wide, 3/4 from behind, near-imperceptible push-in. */}
      <Sequence from={SHOT1_START} durationInFrames={SHOT1_FRAMES} name="Shot1_ANTES_A">
        <FilmGrade vignette={0.45} grainOpacity={0.14}>
          <PushIn src={shot1Src} from={1.0} to={1.03} durationFrames={SHOT1_FRAMES} />
        </FilmGrade>
      </Sequence>

      {/* Shot 2 — ANTES-B: close profile, camera LOCKED (the one static beat). */}
      <Sequence from={SHOT2_START} durationInFrames={SHOT2_FRAMES} name="Shot2_ANTES_B_static">
        <FilmGrade vignette={0.45} grainOpacity={0.14}>
          <AbsoluteFill style={{ background: BRAND.bg }}>
            <OffthreadVideo
              src={shot2Src}
              muted
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </AbsoluteFill>
        </FilmGrade>
      </Sequence>

      {/* EmberThread pivot — the ONLY synthetic, non-photographic beat and the
          ONLY use of this device in the whole piece (signature device discipline). */}
      <Sequence from={THREAD_START} durationInFrames={THREAD_FRAMES} name="EmberThread_pivot">
        <EmberThread backgroundColor={BRAND.bg} accentColor={BRAND.accent} sweepSeconds={1.0} />
      </Sequence>

      {/* Shot 3 — DESPUES-A hero: frontal close-up, brand-max push-in, headline. */}
      <Sequence from={SHOT3_START} durationInFrames={SHOT3_FRAMES} name="Shot3_DESPUES_A_hero">
        <FilmGrade vignette={0.4} grainOpacity={0.12}>
          <PushIn src={shot3Src} from={1.0} to={1.08} durationFrames={SHOT3_FRAMES}>
            <KineticHeadline
              lines="Tú vuelves a estar presente."
              accentWord="presente"
              position="bottom"
              scrim
              fontSize={72}
            />
          </PushIn>
        </FilmGrade>
      </Sequence>

      {/* Shot 4 — DESPUES-B: second subject in frame, lateral drift (no push-in). */}
      <Sequence from={SHOT4_START} durationInFrames={SHOT4_FRAMES} name="Shot4_DESPUES_B_segunda_persona">
        <FilmGrade vignette={0.4} grainOpacity={0.12}>
          <AbsoluteFill style={{ background: BRAND.bg }}>
            <OffthreadVideo
              src={shot4Src}
              muted
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <KineticHeadline
              lines="La IA se encarga del resto."
              accentWord="IA"
              position="bottom"
              scrim
              fontSize={56}
            />
          </AbsoluteFill>
        </FilmGrade>
      </Sequence>

      {/* BrandClose — the only non-photographic frame: real isotype + tagline + url. */}
      <Sequence from={CLOSE_START} durationInFrames={CLOSE_FRAMES} name="BrandClose">
        <FilmGrade vignette={0.35} grainOpacity={0.1}>
          <BrandClose
            wordmark="AetherLogik"
            tagline="IA que te devuelve el tiempo."
            url="aetherlogik.com"
            logoSrc={logoSrc}
            accentColor={BRAND.accent}
            backgroundColor={BRAND.bg}
          />
        </FilmGrade>
      </Sequence>
    </AbsoluteFill>
  );
};
