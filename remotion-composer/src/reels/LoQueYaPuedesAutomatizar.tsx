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
import { FilmGrade } from "../components/FilmGrade";

/**
 * LoQueYaPuedesAutomatizar - reel 2/4 (didactico) de la serie
 * reels-inmobiliarios-serie. Runtime HIBRIDO (los 3 ejes se presentan en
 * el proposal, ver decision_log d-001): el bloque 'checklist_delegable'
 * (5 items EXACTOS derivados de las secciones 'Como funciona la IA',
 * 'Por que la velocidad de respuesta es critica', 'Calificacion
 * automatica' e 'Integracion con CRM' del post) se autora en HYPERFRAMES
 * (HTML/CSS puro), NO en Remotion - mismo patron GO'd en
 * LoQueYaPuedesDelegar.tsx de la serie abogados. Se renderiza aparte en
 * el CT 128 (hf lint . && hf render, comando canonico de la skill
 * aetherlogik-hyperframes) y se compone aqui como UN clip MP4
 * (tareasDelegablesSrc).
 *
 * Sin escena i2v en este reel - el presupuesto de "1 hero i2v" de la
 * serie se reparte entre reel 1 y reel 3 (ver decision_log d-002).
 *
 * Frame plan @24fps: cold_open 96f (4.0s) + intake_beat 216f (9.0s) +
 * checklist_delegable 480f (20.0s) [clip HyperFrames] + caveat 120f
 * (5.0s) + brand_close 192f (8.0s) = 1104f = 46.000s exacto
 * (tail_padding_seconds: 0 en props).
 *
 * Ver LoQueYaPuedesAutomatizar.art-direction.md, .decision_log.json,
 * .scene_plan.json y .gates.json (auto-score pre-render).
 */
export interface LoQueYaPuedesAutomatizarProps {
  tareasDelegablesSrc: string;
  musicSrc: string;
  logoSrc: string;
  sfxWhooshSrc?: string;
  [key: string]: unknown;
}

const S1 = 96;
const S2 = 216;
const S3 = 480;
const S4 = 120;
const S5 = 192;

export const LO_QUE_YA_PUEDES_AUTOMATIZAR_TOTAL_FRAMES = S1 + S2 + S3 + S4 + S5; // 1104

const START1 = 0;
const START2 = START1 + S1; // 96
const START3 = START2 + S2; // 312
const START4 = START3 + S3; // 792
const START5 = START4 + S4; // 912

function musicVolume(frame: number): number {
  // Se retira levemente durante la segunda mitad de checklist_delegable
  // (mas intimo bajo el checklist denso), sube antes del caveat.
  const dipStart = START3 + 240; // mitad del bloque HyperFrames
  const dipEnd = dipStart + 20;
  const riseStart = START4 - 16;
  const riseEnd = START4;
  if (frame < dipStart) return 1.0;
  if (frame < dipEnd) return interpolate(frame, [dipStart, dipEnd], [1.0, 0.65], { extrapolateRight: "clamp" });
  if (frame < riseStart) return 0.65;
  if (frame < riseEnd) return interpolate(frame, [riseStart, riseEnd], [0.65, 1.0], { extrapolateRight: "clamp" });
  return 1.0;
}

const INTAKE_TAGS: QualifyTag[] = [
  { label: "Analisis", value: "Fuente, propiedad vista y formulario del lead" },
  { label: "Prioridad", value: "Nivel de urgencia y potencial de compra" },
  { label: "Canal", value: "WhatsApp, email o el que el lead prefiera" },
  { label: "Historial", value: "Cada intercambio, sincronizado a tu CRM" },
];

export const LoQueYaPuedesAutomatizar: React.FC<LoQueYaPuedesAutomatizarProps> = ({
  tareasDelegablesSrc,
  musicSrc,
  logoSrc,
  sfxWhooshSrc,
}) => {
  return (
    <AbsoluteFill style={{ background: BRAND.bg }}>
      <Audio src={musicSrc} volume={musicVolume} />

      {sfxWhooshSrc && (
        <Sequence from={START1 + 6} durationInFrames={20} name="sfx_whoosh_open">
          <Audio src={sfxWhooshSrc} volume={0.5} />
        </Sequence>
      )}

      {/* Scene 1 - cold_open. Tipografia cinetica, sin costo de asset. */}
      <Sequence from={START1} durationInFrames={S1} name="cold_open">
        <KineticHeadline
          lines={["Estas tareas", "ya se pueden", "automatizar."]}
          accentWord="automatizar"
          fontSize={52}
          position="center"
        />
      </Sequence>

      {/* Scene 2 - intake_beat. Cascada de 4 QualifyTag (fiel al post). */}
      <Sequence from={START2} durationInFrames={S2} name="intake_beat">
        <TagRevealList tags={INTAKE_TAGS} staggerFrames={40} />
        <HeadlineOverlay text="Primer contacto automatico" position="bottom" scrim fontSize={28} />
      </Sequence>

      {/* Scene 3 - checklist_delegable. Clip HyperFrames, mismo patron que */}
      {/* LoQueYaPuedesDelegar.tsx de la serie anterior. */}
      <Sequence from={START3} durationInFrames={S3} name="checklist_delegable">
        <AbsoluteFill style={{ background: BRAND.bg }}>
          <OffthreadVideo
            src={tareasDelegablesSrc}
            muted
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 4 - caveat. Fiel al post: la IA amplifica, no reemplaza. */}
      <Sequence from={START4} durationInFrames={S4} name="caveat">
        <KineticHeadline
          lines={["Esto no reemplaza", "tu experiencia.", "Amplifica tu presencia."]}
          accentWord="presencia"
          fontSize={44}
          position="center"
        />
      </Sequence>

      {/* Scene 5 - brand_close. CTA al reel 3 de la serie. */}
      <Sequence from={START5} durationInFrames={S5} name="brand_close">
        <FilmGrade vignette={0.35} grainOpacity={0.1}>
          <BrandClose
            wordmark="AetherLogik"
            tagline="Automatizacion real para agentes inmobiliarios."
            url="aetherlogik.com/blog . cuando entra el humano, en el proximo video ->"
            logoSrc={logoSrc}
            accentColor={BRAND.accent}
            backgroundColor={BRAND.bg}
          />
        </FilmGrade>
      </Sequence>
    </AbsoluteFill>
  );
};
