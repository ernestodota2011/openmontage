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
import { TagRevealList, QualifyTag } from "../components/TagRevealList";
import { BrandClose } from "../components/BrandClose";
import { EmberThread } from "../components/EmberThread";
import { FilmGrade } from "../components/FilmGrade";

/**
 * ElCicloQueTeCuestaHoras — reel 1/4 (gancho) de la serie
 * reels-clinicas-serie (blog->reel de `automatizar-citas-clinica-miami.md`).
 * Sigue la formula ganadora de la serie chatbot-whatsapp-para-negocios (GO
 * 4/4): problema vivido + "mira lo que es posible", CTA al siguiente reel
 * de la serie (no venta directa). UNICA escena i2v real de TODA la serie
 * clinicas (el cold_open) — el resto de los 4 reels es 100% motion
 * autorado o hibrido con HyperFrames. Cero cifras en este reel (ver
 * decision_log d-004): las cifras atribuidas viven en los reels 3 y 4.
 *
 * CORREGIDO 2026-08-21 (commit siguiente al primer push): manual_cycle
 * usaba props `items`/`kicker` que NO existen en TagRevealList (su
 * interfaz real es `tags: QualifyTag[]` con `{label, value}` y
 * `staggerFrames?`, verificado leyendo el componente real antes de
 * corregir — nunca se habia corrido tsc sobre este archivo). El fix
 * reemplaza el array de 6 strings por 6 `QualifyTag` (label = numero,
 * value = el paso del ciclo) + un `HeadlineOverlay` de caption separado
 * (TagRevealList no tiene prop `kicker`).
 *
 * Frame plan @24fps: cold_open_hero 120f (5.0s) + manual_cycle 192f (8.0s)
 * + hidden_cost 144f (6.0s) + tease_possible 96f (4.0s) + brand_close 168f
 * (7.0s) = 720f = 30.000s exacto (tail_padding_seconds: 0 en props).
 *
 * Ver ElCicloQueTeCuestaHoras.art-direction.md, .decision_log.json,
 * .scene_plan.json y .gates.json (auto-score pre-render).
 */
export interface ElCicloQueTeCuestaHorasProps {
  heroVideoSrc: string;
  musicSrc: string;
  logoSrc: string;
  sfxWhooshSrc?: string;
  [key: string]: unknown;
}

const S1 = 120;
const S2 = 192;
const S3 = 144;
const S4 = 96;
const S5 = 168;

export const EL_CICLO_QUE_TE_CUESTA_HORAS_TOTAL_FRAMES = S1 + S2 + S3 + S4 + S5; // 720

const START1 = 0;
const START2 = START1 + S1; // 120
const START3 = START2 + S2; // 312
const START4 = START3 + S3; // 456
const START5 = START4 + S4; // 552

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

const MANUAL_CYCLE_TAGS: QualifyTag[] = [
  { label: "1", value: "Llama" },
  { label: "2", value: "Revisa la agenda a mano" },
  { label: "3", value: "Confirma por telefono" },
  { label: "4", value: "Intenta recordar un dia antes" },
  { label: "5", value: "No contesta" },
  { label: "6", value: "Vuelve a empezar" },
];

export const ElCicloQueTeCuestaHoras: React.FC<ElCicloQueTeCuestaHorasProps> = ({
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

      {/* Scene 1 — cold_open_hero. UNICO i2v real de la serie clinicas. */}
      <Sequence from={START1} durationInFrames={S1} name="cold_open_hero">
        <AbsoluteFill style={{ background: BRAND.bg }}>
          <OffthreadVideo
            src={heroVideoSrc}
            muted
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </AbsoluteFill>
        <HeadlineOverlay text="El telefono no para de sonar." position="bottom" scrim fontSize={36} />
      </Sequence>

      {/* Scene 2 — manual_cycle. Cascada de 6 QualifyTag (fiel al ciclo del post) + caption. */}
      <Sequence from={START2} durationInFrames={S2} name="manual_cycle">
        <TagRevealList tags={MANUAL_CYCLE_TAGS} staggerFrames={26} />
        <HeadlineOverlay text="El ciclo de cada cita, otra vez" position="bottom" scrim fontSize={30} />
      </Sequence>

      {/* Scene 3 — hidden_cost. Sin cifras (decision d-004): solo el costo en palabras. */}
      <Sequence from={START3} durationInFrames={S3} name="hidden_cost">
        <KineticHeadline
          lines={["Cada cita perdida", "se lleva el tiempo", "que costo conseguirla."]}
          accentWord="perdida"
          fontSize={50}
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
            tagline="Automatizacion real para clinicas."
            url="aetherlogik.com/blog . como funciona, en el proximo video ->"
            logoSrc={logoSrc}
            accentColor={BRAND.accent}
            backgroundColor={BRAND.bg}
          />
        </FilmGrade>
      </Sequence>
    </AbsoluteFill>
  );
};
