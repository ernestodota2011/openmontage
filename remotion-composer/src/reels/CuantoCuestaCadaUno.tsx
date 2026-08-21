import {
  AbsoluteFill,
  Audio,
  OffthreadVideo,
  Sequence,
  interpolate,
} from "remotion";
import { BRAND } from "../theme";
import { KineticHeadline } from "../components/KineticHeadline";
import { StatReveal } from "../components/StatReveal";
import { HeadlineOverlay } from "../components/HeadlineOverlay";
import { BrandClose } from "../components/BrandClose";
import { FilmGrade } from "../components/FilmGrade";

/**
 * CuantoCuestaCadaUno — reel 2/4 (didactico) de la serie
 * reels-n8n-zapier-serie. El bloque 'cost_model_table' (comparativa densa
 * de modelo de cobro: Zapier por tarea vs n8n costo fijo — 4 filas EXACTAS
 * del post: modelo, plan inicial, que pasa al crecer, que hace falta para
 * empezar) se autora en HYPERFRAMES (HTML/CSS puro, data-no-timeline — ver
 * hyperframes-compositions/cuanto-cuesta-cada-uno-tabla/index.html), NO en
 * Remotion — mismo patron GO'd en LosCincoTrabajosDeLaIa.tsx /
 * LoQueYaPuedesAutomatizar.tsx de series anteriores, aqui aplicado a una
 * tabla de DOS COLUMNAS en vez de un checklist de una columna (la mision
 * pide HyperFrames especificamente para comparativas/tablas densas). Se
 * renderiza aparte en el CT 128 (hf lint . && hf render, comando canonico
 * de la skill aetherlogik-hyperframes) y se compone aqui como UN clip MP4
 * (costModelTableSrc).
 *
 * El ejemplo de "clinica dental, 600-800 tareas/mes" (escena 3) es
 * EXPLICITAMENTE el ejemplo HIPOTETICO que el propio post usa ("imagina
 * una clinica dental que automatiza...") — NO es un cliente real de
 * AetherLogik. Se marca en pantalla como "ejemplo del post" para no
 * confundirlo con las cifras REALES de cliente que aparecen recien en el
 * reel 4 (DMP Consulting Services, con su propia atribucion).
 *
 * Frame plan @24fps: cold_open 96f (4.0s) + cost_model_table 624f (26.0s)
 * [clip HyperFrames] + clinic_example 144f (6.0s) + key_takeaway 120f
 * (5.0s) + brand_close 192f (8.0s) = 1176f = 49.000s exacto
 * (tail_padding_seconds: 0 en props).
 *
 * Ver CuantoCuestaCadaUno.art-direction.md, .decision_log.json,
 * .scene_plan.json y .gates.json.
 */
export interface CuantoCuestaCadaUnoProps {
  costModelTableSrc: string;
  musicSrc: string;
  logoSrc: string;
  sfxChipSrc?: string;
  [key: string]: unknown;
}

const S1 = 96;
const S2 = 624;
const S3 = 144;
const S4 = 120;
const S5 = 192;

export const CUANTO_CUESTA_CADA_UNO_TOTAL_FRAMES = S1 + S2 + S3 + S4 + S5; // 1176

const START1 = 0;
const START2 = START1 + S1; // 96
const START3 = START2 + S2; // 720
const START4 = START3 + S3; // 864
const START5 = START4 + S4; // 984

function musicVolume(frame: number): number {
  const dipStart = START2 + 320;
  const dipEnd = dipStart + 20;
  const riseStart = START3 - 16;
  const riseEnd = START3;
  if (frame < dipStart) return 1.0;
  if (frame < dipEnd) return interpolate(frame, [dipStart, dipEnd], [1.0, 0.65], { extrapolateRight: "clamp" });
  if (frame < riseStart) return 0.65;
  if (frame < riseEnd) return interpolate(frame, [riseStart, riseEnd], [0.65, 1.0], { extrapolateRight: "clamp" });
  return 1.0;
}

// Offsets (relativos a START2) de las 4 filas del clip HyperFrames (2.0s,
// 7.5s, 13.0s, 18.5s @24fps) — sincroniza el sfx_chip con cada fila.
const CHIP_OFFSETS_F = [48, 180, 312, 444];

export const CuantoCuestaCadaUno: React.FC<CuantoCuestaCadaUnoProps> = ({
  costModelTableSrc,
  musicSrc,
  logoSrc,
  sfxChipSrc,
}) => {
  return (
    <AbsoluteFill style={{ background: BRAND.bg }}>
      <Audio src={musicSrc} volume={musicVolume} />

      {sfxChipSrc &&
        CHIP_OFFSETS_F.map((off, i) => (
          <Sequence key={i} from={START2 + off} durationInFrames={12} name={`sfx_chip_row${i + 1}`}>
            <Audio src={sfxChipSrc} volume={0.35} />
          </Sequence>
        ))}

      {/* Scene 1 — cold_open. */}
      <Sequence from={START1} durationInFrames={S1} name="cold_open">
        <KineticHeadline
          lines={["Zapier cobra por tarea.", "n8n cobra por servidor."]}
          fontSize={44}
          position="center"
        />
      </Sequence>

      {/* Scene 2 — cost_model_table. Clip HyperFrames. */}
      <Sequence from={START2} durationInFrames={S2} name="cost_model_table">
        <AbsoluteFill style={{ background: BRAND.bg }}>
          <OffthreadVideo
            src={costModelTableSrc}
            muted
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 3 — clinic_example. Ejemplo HIPOTETICO del post, marcado
          explicitamente como tal (no es un cliente real). */}
      <Sequence from={START3} durationInFrames={S3} name="clinic_example">
        <StatReveal
          stat="600-800"
          label="tareas al mes — lo que gastaria una clinica dental automatizando citas y facturacion"
          accentColor={BRAND.accent}
          position="center"
        />
        <HeadlineOverlay text="Ejemplo del post. No es un cliente de AetherLogik." position="bottom" scrim fontSize={22} />
      </Sequence>

      {/* Scene 4 — key_takeaway. */}
      <Sequence from={START4} durationInFrames={S4} name="key_takeaway">
        <KineticHeadline
          lines={["Si tu volumen va a crecer,", "la matematica cambia."]}
          accentWord="crece"
          fontSize={40}
          position="center"
        />
      </Sequence>

      {/* Scene 5 — brand_close. CTA al reel 3 de la serie. */}
      <Sequence from={START5} durationInFrames={S5} name="brand_close">
        <FilmGrade vignette={0.35} grainOpacity={0.1}>
          <BrandClose
            wordmark="AetherLogik"
            tagline="Automatizacion honesta para negocios reales."
            url="aetherlogik.com/blog . cuando elegir cada uno, en el proximo video ->"
            logoSrc={logoSrc}
            accentColor={BRAND.accent}
            backgroundColor={BRAND.bg}
          />
        </FilmGrade>
      </Sequence>
    </AbsoluteFill>
  );
};
