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
 * LaHoraRobadaV2 — bespoke atelier composition, "cadena continua" (Approach A,
 * Doctrina-Video-Coherencia-SOTA-2026). Rebuild of LaHoraRobada.tsx (v1) after
 * Ernesto's verdict on v1: good image quality, but read as 4 disconnected i2v
 * clips (character drift, wardrobe drift tan->grey jacket, 3 unrelated worlds,
 * no camera grammar). v2 fixes this at the GENERATION layer, not in post:
 *
 *   - ONE world (the same kitchen table), ONE locked character (hero-frame +
 *     nano-banana-pro/edit lock identity/wardrobe across all 3 keyframes).
 *   - TWO Kling O1 first/last-frame clips chained by a SHARED hinge keyframe
 *     (Plano1 end == Plano2 start) — continuous motivated motion, never a
 *     hard cut to another room. Time changes (cool->warm light, papers
 *     clearing, family arriving); the room does not.
 *   - EmberThread appears exactly ONCE, as a short bridge riding the literal
 *     file-boundary cut between the two Kling O1 outputs — not a scene.
 *   - Camera named per plano (see NamedCamera calls below), not "anima esta
 *     foto".
 *
 * v1 stays untouched at ./LaHoraRobada.tsx — this is a new, independent
 * bespoke file + Composition id, additive per the fork's fuente-sin-drift
 * rule. See `LaHoraRobadaV2.art-direction.md` for the full rationale and the
 * same atelier-interpretation transparency note as v1.
 *
 * Frame plan @ 24fps: Plano1 168f (7.0s) + EmberThread bridge 12f (0.5s) +
 * Plano2 144f (6.0s) + BrandClose 84f (3.5s) = 408f = 17.000s exact.
 */
export interface LaHoraRobadaV2Props {
  plano1Src: string;
  plano2Src: string;
  musicSrc: string;
  logoSrc: string;
  [key: string]: unknown; // required by the <Composition> generic (lesson from v1, commit b26d3552)
}

const PLANO1_FRAMES = 168; // 7.0s — antes -> transicion (dolly-in lento y constante)
const BRIDGE_FRAMES = 12; // 0.5s — EmberThread, UNICA aparicion, cabalga el corte de archivo
const PLANO2_FRAMES = 144; // 6.0s — transicion -> despues (mismo dolly-in, decelerando)
const CLOSE_FRAMES = 84; // 3.5s — BrandClose bicolor

export const LA_HORA_ROBADA_V2_TOTAL_FRAMES =
  PLANO1_FRAMES + BRIDGE_FRAMES + PLANO2_FRAMES + CLOSE_FRAMES; // 408

const PLANO1_START = 0;
const BRIDGE_START = PLANO1_START + PLANO1_FRAMES; // 168
const PLANO2_START = BRIDGE_START + BRIDGE_FRAMES; // 180
const CLOSE_START = PLANO2_START + PLANO2_FRAMES; // 324

/**
 * Hand-authored, named camera move — explicit start/end scale + easing per
 * plano (lever #4 of the coherence doctrine: never "anima esta foto").
 * `durationFrames` is the Sequence's LOCAL length, not the whole composition
 * (bespoke-composition.md gotcha, already fixed once in v1 — kept correct
 * here from the start).
 */
const NamedCamera: React.FC<{
  src: string;
  from: number;
  to: number;
  easing: (t: number) => number;
  durationFrames: number;
  children?: React.ReactNode;
}> = ({ src, from, to, easing, durationFrames, children }) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, durationFrames], [from, to], {
    easing,
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
 * Music envelope — silence 0.3-0.5s before the reveal + release exactly at
 * the EmberThread bridge (the pivot Ernesto asked to keep), now aligned to
 * the new timeline. devops' FFmpeg finishing pass layers the synthesized
 * impact/chime SFX and runs the final 2-pass loudnorm to -14 LUFS/-1.0 dBTP
 * on top of this relative dip+release shape.
 */
function musicVolume(frame: number): number {
  const duckStart = BRIDGE_START - 12; // 156 — 0.5s before the bridge
  const duckEnd = BRIDGE_START; // 168
  const releaseEnd = PLANO2_START + 12; // 192 — 0.5s swell after Plano2 begins
  if (frame < duckStart) return 1.0;
  if (frame < duckEnd) {
    return interpolate(frame, [duckStart, duckEnd], [1.0, 0.08], {
      extrapolateRight: "clamp",
    });
  }
  if (frame < PLANO2_START) return 0.08;
  if (frame < releaseEnd) {
    return interpolate(frame, [PLANO2_START, releaseEnd], [0.08, 1.0], {
      extrapolateRight: "clamp",
    });
  }
  return 1.0;
}

export const LaHoraRobadaV2: React.FC<LaHoraRobadaV2Props> = ({
  plano1Src,
  plano2Src,
  musicSrc,
  logoSrc,
}) => {
  return (
    <AbsoluteFill style={{ background: BRAND.bg }}>
      <Audio src={musicSrc} volume={musicVolume} />

      {/* Plano 1 — antes -> transicion. Camera: slow, constant dolly-in,
          fixed optical axis, no panning, uniform speed. */}
      <Sequence from={PLANO1_START} durationInFrames={PLANO1_FRAMES} name="Plano1_antes_transicion">
        <FilmGrade vignette={0.45} grainOpacity={0.14}>
          <NamedCamera
            src={plano1Src}
            from={1.0}
            to={1.06}
            easing={EASING.camera}
            durationFrames={PLANO1_FRAMES}
          />
        </FilmGrade>
      </Sequence>

      {/* EmberThread bridge — the ONLY synthetic beat, riding the literal
          file-boundary cut between the two Kling O1 clips. Not a scene. */}
      <Sequence from={BRIDGE_START} durationInFrames={BRIDGE_FRAMES} name="EmberThread_bridge">
        <EmberThread backgroundColor={BRAND.bg} accentColor={BRAND.accent} sweepSeconds={0.5} />
      </Sequence>

      {/* Plano 2 — transicion -> despues. Camera: continuation of the same
          dolly-in, decelerating (outQuart) until nearly still by the end —
          "la camara se asienta junto con la escena". Two short headline
          beats, sequenced inside this plano's own local timeline. */}
      <Sequence from={PLANO2_START} durationInFrames={PLANO2_FRAMES} name="Plano2_transicion_despues">
        <FilmGrade vignette={0.4} grainOpacity={0.12}>
          <NamedCamera
            src={plano2Src}
            from={1.06}
            to={1.09}
            easing={EASING.outQuart}
            durationFrames={PLANO2_FRAMES}
          >
            <Sequence from={0} durationInFrames={72} name="Headline1_presente">
              <KineticHeadline
                lines="Tú vuelves a estar presente."
                accentWord="presente"
                position="bottom"
                scrim
                fontSize={68}
              />
            </Sequence>
            <Sequence from={72} durationInFrames={72} name="Headline2_IA">
              <KineticHeadline
                lines="La IA se encarga del resto."
                accentWord="IA"
                position="bottom"
                scrim
                fontSize={54}
              />
            </Sequence>
          </NamedCamera>
        </FilmGrade>
      </Sequence>

      {/* BrandClose — bicolor oficial ya aprobado (commit e4aa999f), sin cambios. */}
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
