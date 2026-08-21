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
import { StatReveal } from "../components/StatReveal";
import { BrandClose } from "../components/BrandClose";
import { EmberThread } from "../components/EmberThread";
import { FilmGrade } from "../components/FilmGrade";

/**
 * LaDiferenciaQueImporta — reel 1/4 (gancho) de la serie
 * reels-ia-miami-serie (blog->reel de `ia-para-negocios-miami.md`, el
 * post paraguas/generalista de la linea `reels-del-blog`). Rama
 * `aetherlogik/reels-ia-miami-serie`, partida de
 * `aetherlogik/reels-hvac-serie` HEAD (`81d2f84`) para heredar
 * KineticHeadline/HeadlineOverlay/StatReveal/TagRevealList/BrandClose
 * (con el fix maxWidth/textAlign de P-13 ya aplicado)/FilmGrade/EmberThread
 * + theme.ts intactos. Sigue la formula ganadora GO-4/4 de las 5 series
 * anteriores (chatbot, clinicas, abogados, inmobiliarios, hvac): problema
 * vivido + cifra externa atribuida + distincion conceptual del post, CTA
 * al siguiente reel de la serie (no venta directa). UNICA escena i2v de
 * este reel (doctrina: maximo 1 hero por reel).
 *
 * La cifra "21 veces" es un BENCHMARK EXTERNO (MIT / InsideSales, 2007,
 * citado tal cual el post lo presenta) — no una cifra de cliente ni una
 * estimacion propia. Se atribuye en el mismo frame que aparece (regla
 * dura de la mision). Ninguna cifra de cliente (clinica/DMP/Marino HVAC)
 * aparece en este reel — esas viven exclusivamente en el reel 3.
 *
 * Frame plan @24fps: cold_open_hero 120f (5.0s) + stat_reveal 168f (7.0s)
 * + distinction 144f (6.0s) + tease_possible 96f (4.0s) + brand_close
 * 192f (8.0s) = 720f = 30.000s exacto (tail_padding_seconds: 0 en props).
 *
 * Ver LaDiferenciaQueImporta.art-direction.md, .decision_log.json,
 * .scene_plan.json y .gates.json (auto-score pre-render — SIN checkout
 * local de Node/el fork en esta sesion, declarado explicitamente en
 * gates.json).
 */
export interface LaDiferenciaQueImportaProps {
  heroVideoSrc: string;
  musicSrc: string;
  logoSrc: string;
  sfxWhooshSrc?: string;
  [key: string]: unknown;
}

const S1 = 120;
const S2 = 168;
const S3 = 144;
const S4 = 96;
const S5 = 192;

export const LA_DIFERENCIA_QUE_IMPORTA_TOTAL_FRAMES = S1 + S2 + S3 + S4 + S5; // 720

const START1 = 0;
const START2 = START1 + S1; // 120
const START3 = START2 + S2; // 288
const START4 = START3 + S3; // 432
const START5 = START4 + S4; // 528

function musicVolume(frame: number): number {
  const dipStart = START3;
  const dipEnd = START3 + 14;
  const riseStart = START4 - 10;
  const riseEnd = START4 + 8;
  if (frame < dipStart) return 1.0;
  if (frame < dipEnd) return interpolate(frame, [dipStart, dipEnd], [1.0, 0.6], { extrapolateRight: "clamp" });
  if (frame < riseStart) return 0.6;
  if (frame < riseEnd) return interpolate(frame, [riseStart, riseEnd], [0.6, 1.0], { extrapolateRight: "clamp" });
  return 1.0;
}

export const LaDiferenciaQueImporta: React.FC<LaDiferenciaQueImportaProps> = ({
  heroVideoSrc,
  musicSrc,
  logoSrc,
  sfxWhooshSrc,
}) => {
  return (
    <AbsoluteFill style={{ background: BRAND.bg }}>
      <Audio src={musicSrc} volume={musicVolume} />

      {sfxWhooshSrc && (
        <Sequence from={START4 + 6} durationInFrames={20} name="sfx_whoosh_tease">
          <Audio src={sfxWhooshSrc} volume={0.6} />
        </Sequence>
      )}

      {/* Scene 1 — cold_open_hero. UNICA escena i2v del reel: dueno de
          negocio en Miami, solo de noche, telefono con mensajes sin
          responder (fiel al abridor implicito del post: "si hay tareas
          que tu equipo hace de la misma forma... probablemente la IA ya
          puede hacer eso por ti"). */}
      <Sequence from={START1} durationInFrames={S1} name="cold_open_hero">
        <AbsoluteFill style={{ background: BRAND.bg }}>
          <OffthreadVideo
            src={heroVideoSrc}
            muted
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </AbsoluteFill>
        <HeadlineOverlay text="Otro cliente que escribio y no le contestaste a tiempo." position="bottom" scrim fontSize={32} />
      </Sequence>

      {/* Scene 2 — stat_reveal. Benchmark EXTERNO (no cliente, no
          estimacion propia), atribuido en el mismo frame — fiel a la
          seccion "Los 5 trabajos" del post: "responder en menos de 5
          minutos hace hasta 21 veces mas probable calificar ese lead que
          esperar 30 minutos". */}
      <Sequence from={START2} durationInFrames={S2} name="stat_reveal">
        <StatReveal stat="21 veces" label="mas probable calificar un lead si respondes en menos de 5 minutos" accentColor={BRAND.accent} position="center" />
        <HeadlineOverlay text="MIT / InsideSales, 2007." position="bottom" scrim fontSize={22} />
      </Sequence>

      {/* Scene 3 — distinction. La distincion conceptual central del post:
          herramienta de IA vs sistema de IA a medida. */}
      <Sequence from={START3} durationInFrames={S3} name="distinction">
        <KineticHeadline
          lines={["Una herramienta responde", "cuando tu le preguntas.", "Un sistema trabaja", "aunque tu no estes."]}
          accentWord="trabaja"
          fontSize={38}
          position="center"
        />
      </Sequence>

      {/* Scene 4 — tease_possible. Bridge de marca hacia el cierre. */}
      <Sequence from={START4} durationInFrames={S4} name="tease_possible">
        <KineticHeadline
          lines={["Esto no tiene", "que seguir asi."]}
          accentWord="asi"
          fontSize={58}
          position="center"
        />
        <EmberThread backgroundColor="transparent" accentColor={BRAND.accent} sweepSeconds={S4 / 24} />
      </Sequence>

      {/* Scene 5 — brand_close. CTA al reel 2 de la serie. */}
      <Sequence from={START5} durationInFrames={S5} name="brand_close">
        <FilmGrade vignette={0.35} grainOpacity={0.1}>
          <BrandClose
            wordmark="AetherLogik"
            tagline="IA para negocios reales en Miami."
            url="aetherlogik.com/blog . los 5 trabajos que la IA hace mejor, en el proximo video ->"
            logoSrc={logoSrc}
            accentColor={BRAND.accent}
            backgroundColor={BRAND.bg}
          />
        </FilmGrade>
      </Sequence>
    </AbsoluteFill>
  );
};
