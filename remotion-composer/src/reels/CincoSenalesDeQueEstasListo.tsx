import {
  AbsoluteFill,
  Audio,
  Sequence,
  interpolate,
} from "remotion";
import { BRAND } from "../theme";
import { KineticHeadline } from "../components/KineticHeadline";
import { TagRevealList, QualifyTag } from "../components/TagRevealList";
import { BrandClose } from "../components/BrandClose";
import { FilmGrade } from "../components/FilmGrade";

/**
 * CincoSenalesDeQueEstasListo — reel 4/4 (cierre) de la serie
 * reels-ia-miami-serie. Fuente: la seccion "¿Tu negocio esta listo para
 * la IA? 5 senales de que si" del post (las 5 vinetas textuales) + la
 * FAQ "¿Necesito saber de tecnologia?" + el cierre real del post
 * ("una conversacion de 30 minutos... Agenda tu auditoria gratuita").
 * Sigue el patron de cierre GO'd en ComoEmpezarSinDesorden.tsx (abogados)
 * y ComoEmpiezasSinPerderLeads.tsx (inmobiliarios): series_recap que
 * amarra los 3 reels anteriores + brand_close con la URL REAL de
 * conversion (no la del siguiente reel, porque este ES el ultimo).
 *
 * Sin escena i2v en este reel (100% Remotion atelier, sin HyperFrames) —
 * el presupuesto de hero i2v de la serie se agoto en reel 1 y reel 3; el
 * bloque denso ya vive en HyperFrames en el reel 2 (mismo patron de
 * reparto de recursos generativos que las series anteriores).
 *
 * CTA REAL (unico reel de la serie con venta directa, regla dura de la
 * mision): cal.com/aetherlogik/discovery, el link EXACTO que usa el
 * cierre del post ("Agenda tu auditoria gratuita ->").
 *
 * Frame plan @24fps: cold_open 96f (4.0s) + five_signals 504f (21.0s) +
 * faq_beat 144f (6.0s) + series_recap 120f (5.0s) + brand_close 216f
 * (9.0s) = 1080f = 45.000s exacto (tail_padding_seconds: 0 en props).
 *
 * Ver CincoSenalesDeQueEstasListo.art-direction.md, .decision_log.json,
 * .scene_plan.json y .gates.json.
 */
export interface CincoSenalesDeQueEstasListoProps {
  musicSrc: string;
  logoSrc: string;
  sfxWhooshSrc?: string;
  [key: string]: unknown;
}

const S1 = 96;
const S2 = 504;
const S3 = 144;
const S4 = 120;
const S5 = 216;

export const CINCO_SENALES_DE_QUE_ESTAS_LISTO_TOTAL_FRAMES = S1 + S2 + S3 + S4 + S5; // 1080

const START1 = 0;
const START2 = START1 + S1; // 96
const START3 = START2 + S2; // 600
const START4 = START3 + S3; // 744
const START5 = START4 + S4; // 864

function musicVolume(frame: number): number {
  const dipStart = START2 + 260;
  const dipEnd = dipStart + 18;
  const riseStart = START3 - 14;
  const riseEnd = START3;
  if (frame < dipStart) return 1.0;
  if (frame < dipEnd) return interpolate(frame, [dipStart, dipEnd], [1.0, 0.65], { extrapolateRight: "clamp" });
  if (frame < riseStart) return 0.65;
  if (frame < riseEnd) return interpolate(frame, [riseStart, riseEnd], [0.65, 1.0], { extrapolateRight: "clamp" });
  return 1.0;
}

const SIGNAL_TAGS: QualifyTag[] = [
  { label: "1", value: "Repites las mismas tareas cada semana" },
  { label: "2", value: "Pierdes leads fuera de horario" },
  { label: "3", value: "Tu equipo copia datos de un sistema a otro" },
  { label: "4", value: "Tus facturas o documentos tienen errores frecuentes" },
  { label: "5", value: "No tienes tiempo de hacer crecer el negocio" },
];

export const CincoSenalesDeQueEstasListo: React.FC<CincoSenalesDeQueEstasListoProps> = ({
  musicSrc,
  logoSrc,
  sfxWhooshSrc,
}) => {
  return (
    <AbsoluteFill style={{ background: BRAND.bg }}>
      <Audio src={musicSrc} volume={musicVolume} />

      {sfxWhooshSrc && (
        <Sequence from={START4 + 8} durationInFrames={20} name="sfx_whoosh_recap">
          <Audio src={sfxWhooshSrc} volume={0.5} />
        </Sequence>
      )}

      {/* Scene 1 — cold_open. Tipografia cinetica, sin costo de asset. */}
      <Sequence from={START1} durationInFrames={S1} name="cold_open">
        <KineticHeadline
          lines={["¿Tu negocio esta listo?", "Reconoce al menos tres."]}
          accentWord="tres"
          fontSize={44}
          position="center"
        />
      </Sequence>

      {/* Scene 2 — five_signals. Cascada de 5 QualifyTag: las 5 senales
          textuales/casi textuales del post. */}
      <Sequence from={START2} durationInFrames={S2} name="five_signals">
        <TagRevealList tags={SIGNAL_TAGS} staggerFrames={80} />
      </Sequence>

      {/* Scene 3 — faq_beat. Fiel a la FAQ del post: "¿Necesito saber de
          tecnologia? No. Ese es el trabajo de AetherLogik." */}
      <Sequence from={START3} durationInFrames={S3} name="faq_beat">
        <KineticHeadline
          lines={["¿Necesitas saber", "de tecnologia?", "No. Ese es nuestro trabajo."]}
          accentWord="No."
          fontSize={40}
          position="center"
        />
      </Sequence>

      {/* Scene 4 — series_recap. Amarra los 3 reels anteriores. */}
      <Sequence from={START4} durationInFrames={S4} name="series_recap">
        <FilmGrade vignette={0.3} grainOpacity={0.08}>
          <KineticHeadline
            lines={["21 veces mas probable.", "Cinco trabajos que ya no haces tu.", "Tres negocios reales.", "Ahora, el tuyo."]}
            accentWord="tuyo."
            fontSize={40}
            position="center"
            revealSeconds={0.5}
            staggerSeconds={0.55}
          />
        </FilmGrade>
      </Sequence>

      {/* Scene 5 — brand_close. CTA REAL de la serie completa (unico
          reel con venta directa) — el link EXACTO del cierre del post. */}
      <Sequence from={START5} durationInFrames={S5} name="brand_close">
        <FilmGrade vignette={0.35} grainOpacity={0.1}>
          <BrandClose
            wordmark="AetherLogik"
            tagline="30 minutos, sin costo, sin compromiso."
            url="cal.com/aetherlogik/discovery . agenda tu auditoria gratuita ->"
            logoSrc={logoSrc}
            accentColor={BRAND.accent}
            backgroundColor={BRAND.bg}
          />
        </FilmGrade>
      </Sequence>
    </AbsoluteFill>
  );
};
