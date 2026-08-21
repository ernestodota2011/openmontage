import {
  AbsoluteFill,
  Audio,
  OffthreadVideo,
  Sequence,
  interpolate,
} from "remotion";
import { BRAND } from "../theme";
import { KineticHeadline } from "../components/KineticHeadline";
import { BrandClose } from "../components/BrandClose";
import { FilmGrade } from "../components/FilmGrade";

/**
 * LosCincoTrabajosDeLaIa — reel 2/4 (didactico) de la serie
 * reels-ia-miami-serie. El bloque 'five_jobs_checklist' (5 items EXACTOS
 * derivados de la seccion "Los 5 trabajos que la IA hace mejor que una
 * persona en Miami" del post: responder leads 24h, recordatorios
 * automaticos, facturacion sin errores, coordinacion de agenda,
 * preguntas frecuentes) se autora en HYPERFRAMES (HTML/CSS puro,
 * `data-no-timeline` — ver
 * hyperframes-compositions/los-cinco-trabajos-de-la-ia-checklist/index.html),
 * NO en Remotion — mismo patron GO'd en LoQueYaPuedesAutomatizar.tsx /
 * LoQueYaPuedesDelegar.tsx / ComoFuncionaLaAutomatizacionDeFacturacion.tsx
 * de las 4 series anteriores. Se renderiza aparte en el CT 128 (hf lint .
 * && hf render, comando canonico de la skill aetherlogik-hyperframes) y
 * se compone aqui como UN clip MP4 (fiveJobsChecklistSrc).
 *
 * Sin escena i2v en este reel — el presupuesto de "1 hero i2v" de la
 * serie se reparte entre reel 1 y reel 3 (ver decision_log d-002). Cada
 * uno de los 5 items es TEXTUAL/casi textual del post, sin inventar
 * ningun 6o trabajo ni cifra nueva.
 *
 * Frame plan @24fps: cold_open 96f (4.0s) + five_jobs_checklist 480f
 * (20.0s) [clip HyperFrames] + no_reemplaza 120f (5.0s) + brand_close
 * 192f (8.0s) = 888f = 37.000s exacto (tail_padding_seconds: 0 en props).
 *
 * Ver LosCincoTrabajosDeLaIa.art-direction.md, .decision_log.json,
 * .scene_plan.json y .gates.json.
 */
export interface LosCincoTrabajosDeLaIaProps {
  fiveJobsChecklistSrc: string;
  musicSrc: string;
  logoSrc: string;
  sfxChipSrc?: string;
  [key: string]: unknown;
}

const S1 = 96;
const S2 = 480;
const S3 = 120;
const S4 = 192;

export const LOS_CINCO_TRABAJOS_DE_LA_IA_TOTAL_FRAMES = S1 + S2 + S3 + S4; // 888

const START1 = 0;
const START2 = START1 + S1; // 96
const START3 = START2 + S2; // 576
const START4 = START3 + S3; // 696

function musicVolume(frame: number): number {
  // Se retira levemente durante la segunda mitad del checklist denso
  // (mas intimo bajo el bloque HyperFrames), sube antes del cierre.
  const dipStart = START2 + 240; // mitad del bloque HyperFrames
  const dipEnd = dipStart + 20;
  const riseStart = START3 - 16;
  const riseEnd = START3;
  if (frame < dipStart) return 1.0;
  if (frame < dipEnd) return interpolate(frame, [dipStart, dipEnd], [1.0, 0.65], { extrapolateRight: "clamp" });
  if (frame < riseStart) return 0.65;
  if (frame < riseEnd) return interpolate(frame, [riseStart, riseEnd], [0.65, 1.0], { extrapolateRight: "clamp" });
  return 1.0;
}

// Offsets (relativos a START2) de los 5 item-reveals del clip HyperFrames
// (2.0s, 5.5s, 9.0s, 12.5s, 16.0s @24fps) — usados para sincronizar el
// sfx_chip con cada nodo que se enciende.
const CHIP_OFFSETS_F = [48, 132, 216, 300, 384];

export const LosCincoTrabajosDeLaIa: React.FC<LosCincoTrabajosDeLaIaProps> = ({
  fiveJobsChecklistSrc,
  musicSrc,
  logoSrc,
  sfxChipSrc,
}) => {
  return (
    <AbsoluteFill style={{ background: BRAND.bg }}>
      <Audio src={musicSrc} volume={musicVolume} />

      {sfxChipSrc &&
        CHIP_OFFSETS_F.map((off, i) => (
          <Sequence key={i} from={START2 + off} durationInFrames={12} name={`sfx_chip_item${i + 1}`}>
            <Audio src={sfxChipSrc} volume={0.4} />
          </Sequence>
        ))}

      {/* Scene 1 — cold_open. Tipografia cinetica, sin costo de asset. */}
      <Sequence from={START1} durationInFrames={S1} name="cold_open">
        <KineticHeadline
          lines={["Cinco trabajos que", "ya no necesitas hacer tu."]}
          fontSize={48}
          position="center"
        />
      </Sequence>

      {/* Scene 2 — five_jobs_checklist. Clip HyperFrames, mismo patron
          que las 4 series anteriores. */}
      <Sequence from={START2} durationInFrames={S2} name="five_jobs_checklist">
        <AbsoluteFill style={{ background: BRAND.bg }}>
          <OffthreadVideo
            src={fiveJobsChecklistSrc}
            muted
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 3 — no_reemplaza. Fiel al post ("¿La IA reemplaza a mi
          equipo? No. Lo que reemplaza son las tareas repetitivas..."). */}
      <Sequence from={START3} durationInFrames={S3} name="no_reemplaza">
        <KineticHeadline
          lines={["No reemplaza a tu equipo.", "Libera su tiempo", "para lo que si importa."]}
          accentWord="libera"
          fontSize={40}
          position="center"
        />
      </Sequence>

      {/* Scene 4 — brand_close. CTA al reel 3 de la serie. */}
      <Sequence from={START4} durationInFrames={S4} name="brand_close">
        <FilmGrade vignette={0.35} grainOpacity={0.1}>
          <BrandClose
            wordmark="AetherLogik"
            tagline="IA para negocios reales en Miami."
            url="aetherlogik.com/blog . tres negocios reales que ya lo usan, en el proximo video ->"
            logoSrc={logoSrc}
            accentColor={BRAND.accent}
            backgroundColor={BRAND.bg}
          />
        </FilmGrade>
      </Sequence>
    </AbsoluteFill>
  );
};
