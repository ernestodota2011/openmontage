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
import { FilmGrade } from "../components/FilmGrade";

/**
 * LoQueCambiaEnTuClinica — reel 4/4 (cierre) de la serie reels-clinicas-serie.
 * Runtime HIBRIDO (los 3 ejes se presentan en el proposal, ver
 * LoQueCambiaEnTuClinica.decision_log.json d-001): el bloque
 * 'checklist_operacion' (4 items EXACTOS de 'Lo que cambia en la operacion
 * diaria' del post) se autora en HYPERFRAMES (HTML/CSS puro), NO en
 * Remotion — mismo patron ya GO'd en ComoSeConstruyeSinRomperNada.tsx de
 * la serie anterior. Se renderiza aparte en el CT 128 (`hf lint . && hf
 * render`, comando canonico de la skill aetherlogik-hyperframes) y se
 * compone aqui como UN clip MP4 (`queCambiaSrc`).
 *
 * GUARD: StatReveal.tsx tiene accentColor default "#A78BFA" (violeta,
 * PROHIBIDO) — benchmark_klara pasa accentColor={BRAND.accent} explicito.
 * La cifra de Klara lleva su atribucion COMPLETA en el MISMO frame (ver
 * decision_log d-002) via un HeadlineOverlay inferior simultaneo.
 *
 * Frame plan @24fps: cold_open 96f (4.0s) + checklist_operacion 480f
 * (20.0s) [clip HyperFrames] + benchmark_klara 240f (10.0s) + series_recap
 * 120f (5.0s) + brand_close 192f (8.0s) = 1128f = 47.000s exacto
 * (tail_padding_seconds: 0 en props).
 *
 * Ver LoQueCambiaEnTuClinica.art-direction.md, .decision_log.json,
 * .scene_plan.json y .gates.json (auto-score pre-render).
 */
export interface LoQueCambiaEnTuClinicaProps {
  queCambiaSrc: string;
  musicSrc: string;
  logoSrc: string;
  sfxRiserSrc?: string;
  [key: string]: unknown;
}

const S1 = 96;
const S2 = 480;
const S3 = 240;
const S4 = 120;
const S5 = 192;

export const LO_QUE_CAMBIA_EN_TU_CLINICA_TOTAL_FRAMES = S1 + S2 + S3 + S4 + S5; // 1128

const START1 = 0;
const START2 = START1 + S1; // 96
const START3 = START2 + S2; // 576
const START4 = START3 + S3; // 816
const START5 = START4 + S4; // 936

function musicVolume(frame: number): number {
  // Se retira levemente durante la segunda mitad de checklist_operacion
  // (mas intimo bajo el checklist denso), sube antes de benchmark_klara.
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

export const LoQueCambiaEnTuClinica: React.FC<LoQueCambiaEnTuClinicaProps> = ({
  queCambiaSrc,
  musicSrc,
  logoSrc,
  sfxRiserSrc,
}) => {
  return (
    <AbsoluteFill style={{ background: BRAND.bg }}>
      <Audio src={musicSrc} volume={musicVolume} />

      {sfxRiserSrc && (
        <Sequence from={START3 - 20} durationInFrames={30} name="sfx_riser_benchmark">
          <Audio src={sfxRiserSrc} volume={0.5} />
        </Sequence>
      )}

      {/* Scene 1 — cold_open. Tipografia cinetica, sin costo de asset. */}
      <Sequence from={START1} durationInFrames={S1} name="cold_open">
        <KineticHeadline
          lines={["Esto no cambia", "de la noche a la manana.", "Esto es lo que SI cambia."]}
          accentWord="SI"
          fontSize={50}
          position="center"
        />
      </Sequence>

      {/* Scene 2 — checklist_operacion. Clip HyperFrames, mismo patron que */}
      {/* ComoSeConstruyeSinRomperNada.tsx de la serie anterior. */}
      <Sequence from={START2} durationInFrames={S2} name="checklist_operacion">
        <AbsoluteFill style={{ background: BRAND.bg }}>
          <OffthreadVideo
            src={queCambiaSrc}
            muted
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 3 — benchmark_klara. accentColor override OBLIGATORIO + */}
      {/* atribucion completa en el MISMO frame (decision d-002). */}
      <Sequence from={START3} durationInFrames={S3} name="benchmark_klara">
        <StatReveal
          stat="30-38%"
          label="menos ausencias con recordatorios automaticos bien configurados"
          accentColor={BRAND.accent}
          position="center"
        />
        <HeadlineOverlay
          text="Segun datos de Klara, proveedor de comunicacion clinica"
          subtitle="No es una cifra de AetherLogik."
          position="bottom"
          scrim
          fontSize={24}
        />
      </Sequence>

      {/* Scene 4 — series_recap. Amarra los 4 reels de la serie. */}
      <Sequence from={START4} durationInFrames={S4} name="series_recap">
        <FilmGrade vignette={0.3} grainOpacity={0.08}>
          <KineticHeadline
            lines={["El ciclo manual.", "Como funciona.", "Un caso real.", "Esto."]}
            accentWord="Esto."
            fontSize={52}
            position="center"
            revealSeconds={0.5}
            staggerSeconds={0.55}
          />
        </FilmGrade>
      </Sequence>

      {/* Scene 5 — brand_close. CTA final de la serie completa. */}
      <Sequence from={START5} durationInFrames={S5} name="brand_close">
        <FilmGrade vignette={0.35} grainOpacity={0.1}>
          <BrandClose
            wordmark="AetherLogik"
            tagline="Automatizacion real para clinicas."
            url="aetherlogik.com/blog . calcula tu tiempo recuperado en la calculadora ->"
            logoSrc={logoSrc}
            accentColor={BRAND.accent}
            backgroundColor={BRAND.bg}
          />
        </FilmGrade>
      </Sequence>
    </AbsoluteFill>
  );
};
