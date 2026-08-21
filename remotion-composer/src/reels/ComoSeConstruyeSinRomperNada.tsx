import {
  AbsoluteFill,
  Audio,
  OffthreadVideo,
  Sequence,
  interpolate,
} from "remotion";
import { BRAND } from "../theme";
import { EmberThread } from "../components/EmberThread";
import { KineticHeadline } from "../components/KineticHeadline";
import { BrandClose } from "../components/BrandClose";
import { FilmGrade } from "../components/FilmGrade";

/**
 * ComoSeConstruyeSinRomperNada — reel 4/4 (cierre) de la serie
 * chatbot-whatsapp-para-negocios. El proceso (Fase 1/2/3 del post) + la
 * honestidad de "cuando no tiene sentido" — eso ES la marca.
 *
 * Runtime HIBRIDO (los 3 ejes se presentan en el proposal, ver
 * ComoSeConstruyeSinRomperNada.decision_log.json d-001): el bloque
 * "process_and_honesty" (roadmap Fase 1/2/3 + checklist de 3 casos "no lo
 * recomiendo") se autora en HYPERFRAMES (HTML/CSS puro), NO en Remotion —
 * es exactamente el caso que la skill aetherlogik-hyperframes senala como
 * suyo (mockup de proceso/roadmap, no cine, no chat) y evita forzar un
 * layout de roadmap dentro del catalogo de componentes Remotion existente,
 * que no tiene ninguno parecido (KPIGrid/charts son para metricas
 * numericas, no para una secuencia narrativa de fases). Se renderiza
 * aparte en el CT 128 (`hf lint . && hf render`, comando canonico de la
 * skill) y se compone aqui como UN clip MP4 (`processAndHonestySrc`),
 * mismo patron ya usado para el hero i2v de los otros reels de la serie.
 *
 * Frame plan @24fps: cold_open_hook 96f (4.0s) [Remotion] +
 * process_and_honesty 720f (30.0s) [HyperFrames MP4, 384f build_process +
 * 336f honesty_checklist internos] + EmberThread bridge 12f (0.5s) +
 * human_line 108f (4.5s) + brand_close 144f (6.0s) = 1080f = 45.000s
 * exacto (tail_padding_seconds: 0).
 */
export interface ComoSeConstruyeSinRomperNadaProps {
  processAndHonestySrc: string;
  musicSrc: string;
  logoSrc: string;
  sfxPhaseTickSrc?: string;
  [key: string]: unknown;
}

const S1 = 96;
const S2 = 720;
const BRIDGE = 12;
const S3 = 108;
const S4 = 144;

export const COMO_SE_CONSTRUYE_TOTAL_FRAMES = S1 + S2 + BRIDGE + S3 + S4; // 1080

const START1 = 0;
const START2 = START1 + S1; // 96
const STARTB = START2 + S2; // 816
const START3 = STARTB + BRIDGE; // 828
const START4 = START3 + S3; // 936

// Los 3 nodos de fase se iluminan a 2.0s/6.0s/10.5s DENTRO de la
// composicion HyperFrames (ver proceso-y-honestidad/index.html) —
// replicados aqui en frames absolutos de ESTA composicion para el SFX de
// tick, que SI vive en el lado Remotion (HyperFrames no captura audio).
const PHASE_TICK_OFFSETS_SECONDS = [2.0, 6.0, 10.5];
const FPS = 24;

function musicVolume(frame: number): number {
  // Se retira durante la mitad "honestidad" de process_and_honesty (frames
  // START2+384..START2+720, segun el split interno de HyperFrames: 384f
  // build_process + 336f honesty_checklist) — mas intimo bajo "cuando NO
  // tiene sentido", coherente con el propio tratamiento mas esparcido de
  // esa mitad en HyperFrames (ver decision_log d-004).
  const honestyStart = START2 + 384;
  const honestyEnd = START2 + S2;
  if (frame < honestyStart) return 1.0;
  if (frame < honestyStart + 20) {
    return interpolate(frame, [honestyStart, honestyStart + 20], [1.0, 0.6], { extrapolateRight: "clamp" });
  }
  if (frame < honestyEnd - 20) return 0.6;
  return interpolate(frame, [honestyEnd - 20, honestyEnd], [0.6, 1.0], { extrapolateRight: "clamp" });
}

export const ComoSeConstruyeSinRomperNada: React.FC<ComoSeConstruyeSinRomperNadaProps> = ({
  processAndHonestySrc,
  musicSrc,
  logoSrc,
  sfxPhaseTickSrc,
}) => {
  return (
    <AbsoluteFill style={{ background: BRAND.bg }}>
      <Audio src={musicSrc} volume={musicVolume} />

      {sfxPhaseTickSrc &&
        PHASE_TICK_OFFSETS_SECONDS.map((s, i) => (
          <Sequence
            key={i}
            from={START2 + Math.round(s * FPS)}
            durationInFrames={14}
            name={`sfx_phase_tick_${i + 1}`}
          >
            <Audio src={sfxPhaseTickSrc} volume={0.5} />
          </Sequence>
        ))}

      {/* Scene 1 — cold_open_hook. Tipografia cinetica, sin costo de asset. */}
      <Sequence from={START1} durationInFrames={S1} name="cold_open_hook">
        <KineticHeadline
          lines={["No necesitas cambiar", "todo tu sistema."]}
          fontSize={60}
          position="center"
        />
      </Sequence>

      {/* Scene 2 — process_and_honesty. Clip HyperFrames (ver nota de
          archivo arriba). Compuesto como OffthreadVideo, igual patron que
          el hero i2v de los otros reels de la serie. */}
      <Sequence from={START2} durationInFrames={S2} name="process_and_honesty">
        <AbsoluteFill style={{ background: BRAND.bg }}>
          <OffthreadVideo
            src={processAndHonestySrc}
            muted
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </AbsoluteFill>
      </Sequence>

      <Sequence from={STARTB} durationInFrames={BRIDGE} name="EmberThread_bridge">
        <EmberThread backgroundColor={BRAND.bg} accentColor={BRAND.accent} sweepSeconds={0.5} />
      </Sequence>

      {/* Scene 3 — human_line. Cita del post: la claridad importa mas que el
          departamento de IT. */}
      <Sequence from={START3} durationInFrames={S3} name="human_line">
        <KineticHeadline
          lines={["No necesitas un departamento de IT.", "Necesitas claridad."]}
          accentWord="claridad"
          fontSize={50}
          position="center"
        />
      </Sequence>

      {/* Scene 4 — brand_close. CTA al diagnostico (no venta directa: el
          post cierra invitando a una llamada de diagnostico, no a comprar
          un paquete). */}
      <Sequence from={START4} durationInFrames={S4} name="brand_close">
        <FilmGrade vignette={0.35} grainOpacity={0.1}>
          <BrandClose
            wordmark="AetherLogik"
            tagline="Te decimos si no tiene sentido. Así construimos."
            url="aetherlogik.com/diagnostico · agenda tu llamada"
            logoSrc={logoSrc}
            accentColor={BRAND.accent}
            backgroundColor={BRAND.bg}
          />
        </FilmGrade>
      </Sequence>
    </AbsoluteFill>
  );
};
