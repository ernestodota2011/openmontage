import {
  AbsoluteFill,
  Audio,
  OffthreadVideo,
  Sequence,
  interpolate,
} from "remotion";
import { BRAND } from "../theme";
import { KineticHeadline } from "../components/KineticHeadline";
import { HeadlineOverlay } from "../components/HeadlineOverlay";
import { BrandClose } from "../components/BrandClose";
import { FilmGrade } from "../components/FilmGrade";

/**
 * AsiSonLosTreintaMinutos — reel 2/4 (didactico, proceso paso a paso) de
 * la serie reels-consultoria-serie. El bloque `phases_timeline` (las 3
 * fases EXACTAS de la sesion — 0-10min entender el negocio, 10-25min
 * identificar oportunidades, 25-30min estimacion y proximos pasos,
 * derivadas literalmente de la seccion "Como transcurre la sesion de 30
 * minutos" del post) se autora en HYPERFRAMES (HTML/CSS puro,
 * `data-no-timeline` — ver
 * hyperframes-compositions/asi-son-los-treinta-minutos-timeline/index.html),
 * NO en Remotion — mismo patron GO'd 5 veces en las series anteriores
 * (bloques densos -> HyperFrames, ver p.ej. LosCincoTrabajosDeLaIa.tsx).
 * Se renderiza aparte en el CT 128 (hf lint . && hf render, comando
 * canonico de la skill aetherlogik-hyperframes) y se compone aqui como
 * UN clip MP4 (phasesTimelineSrc).
 *
 * Sin escena i2v en este reel — el presupuesto de "1 hero i2v" de la
 * serie se reparte entre reel 1 y reel 3 (ver decision_log d-002). Cada
 * una de las 3 fases y sus minutos son literales del post, sin inventar
 * ni redondear a otro reparto de tiempo.
 *
 * FIX (2026-08-21, verify final de video-producer, pixeles reales del
 * MP4 renderizado): `accentWord="persona."` NUNCA matcheaba (mismo
 * defecto que LoQueNoSabesDeTuNegocio.tsx — KineticHeadline compara la
 * palabra YA limpia de puntuacion contra el prop, que se paso CON
 * punto). Corregido a `accentWord="persona"`.
 *
 * Frame plan @24fps: cold_open 96f (4.0s) + phases_timeline 480f
 * (20.0s) [clip HyperFrames] + ernesto_conduce 120f (5.0s) + brand_close
 * 192f (8.0s) = 888f = 37.000s exacto (tail_padding_seconds: 0 en props).
 *
 * Ver AsiSonLosTreintaMinutos.art-direction.md, .decision_log.json,
 * .scene_plan.json y .gates.json.
 */
export interface AsiSonLosTreintaMinutosProps {
  phasesTimelineSrc: string;
  musicSrc: string;
  logoSrc: string;
  sfxChipSrc?: string;
  [key: string]: unknown;
}

const S1 = 96;
const S2 = 480;
const S3 = 120;
const S4 = 192;

export const ASI_SON_LOS_TREINTA_MINUTOS_TOTAL_FRAMES = S1 + S2 + S3 + S4; // 888

const START1 = 0;
const START2 = START1 + S1; // 96
const START3 = START2 + S2; // 576
const START4 = START3 + S3; // 696

function musicVolume(frame: number): number {
  // Se retira levemente durante la segunda mitad del bloque de fases
  // (mas intimo bajo el clip HyperFrames), sube antes del cierre.
  const dipStart = START2 + 260; // ~mitad avanzada del bloque HyperFrames
  const dipEnd = dipStart + 20;
  const riseStart = START3 - 16;
  const riseEnd = START3;
  if (frame < dipStart) return 1.0;
  if (frame < dipEnd) return interpolate(frame, [dipStart, dipEnd], [1.0, 0.65], { extrapolateRight: "clamp" });
  if (frame < riseStart) return 0.65;
  if (frame < riseEnd) return interpolate(frame, [riseStart, riseEnd], [0.65, 1.0], { extrapolateRight: "clamp" });
  return 1.0;
}

// Offsets (relativos a START2) de los 3 hitos de fase del clip
// HyperFrames (2.0s, 8.5s, 15.5s @24fps) — usados para sincronizar el
// sfx_chip con cada fase que se enciende.
const CHIP_OFFSETS_F = [48, 204, 372];

export const AsiSonLosTreintaMinutos: React.FC<AsiSonLosTreintaMinutosProps> = ({
  phasesTimelineSrc,
  musicSrc,
  logoSrc,
  sfxChipSrc,
}) => {
  return (
    <AbsoluteFill style={{ background: BRAND.bg }}>
      <Audio src={musicSrc} volume={musicVolume} />

      {sfxChipSrc &&
        CHIP_OFFSETS_F.map((off, i) => (
          <Sequence key={i} from={START2 + off} durationInFrames={12} name={`sfx_chip_fase${i + 1}`}>
            <Audio src={sfxChipSrc} volume={0.4} />
          </Sequence>
        ))}

      {/* Scene 1 — cold_open. Tipografia cinetica, sin costo de asset. */}
      <Sequence from={START1} durationInFrames={S1} name="cold_open">
        <KineticHeadline
          lines={["Asi son los 30 minutos,", "minuto a minuto."]}
          fontSize={46}
          position="center"
        />
      </Sequence>

      {/* Scene 2 — phases_timeline. Clip HyperFrames: las 3 fases
          exactas de la sesion, con su rango de minutos. */}
      <Sequence from={START2} durationInFrames={S2} name="phases_timeline">
        <AbsoluteFill style={{ background: BRAND.bg }}>
          <OffthreadVideo
            src={phasesTimelineSrc}
            muted
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 3 — ernesto_conduce. Fiel al post ("Ernesto Hernandez,
          nuestro fundador con mas de 23 anos en tecnologia, conduce
          personalmente cada diagnostico... insights reales, no
          respuestas genericas"). */}
      <Sequence from={START3} durationInFrames={S3} name="ernesto_conduce">
        <KineticHeadline
          lines={["Lo conduce Ernesto Hernandez,", "fundador, en persona.", "No un guion generico."]}
          accentWord="persona"
          fontSize={36}
          position="center"
        />
        <HeadlineOverlay text="23+ anos en tecnologia." position="bottom" fontSize={20} color={BRAND.muted} />
      </Sequence>

      {/* Scene 4 — brand_close. CTA al reel 3 de la serie. */}
      <Sequence from={START4} durationInFrames={S4} name="brand_close">
        <FilmGrade vignette={0.35} grainOpacity={0.1}>
          <BrandClose
            wordmark="AetherLogik"
            tagline="El diagnostico gratuito de IA para tu negocio."
            url="aetherlogik.com/blog . el caso real de Marino HVAC, en el proximo video ->"
            logoSrc={logoSrc}
            accentColor={BRAND.accent}
            backgroundColor={BRAND.bg}
          />
        </FilmGrade>
      </Sequence>
    </AbsoluteFill>
  );
};
