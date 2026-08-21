import {
  AbsoluteFill,
  Audio,
  Sequence,
  interpolate,
} from "remotion";
import { BRAND } from "../theme";
import { KineticHeadline } from "../components/KineticHeadline";
import { StatReveal } from "../components/StatReveal";
import { TagRevealList } from "../components/TagRevealList";
import { BrandClose } from "../components/BrandClose";
import { FilmGrade } from "../components/FilmGrade";

/**
 * PorQueEsGratisAgendaAhora — reel 4/4 (CIERRE, CTA MAS FUERTE de la
 * serie) de la serie reels-consultoria-serie — la 8a y ULTIMA serie de
 * la linea `reels-del-blog`. A diferencia de los reels 1-3 (que
 * apuntan al proximo video), este reel VENDE directamente: es la unica
 * escena de toda la linea `reels-del-blog` cuyo brand_close final lleva
 * la URL REAL de agenda (cal.com/aetherlogik/discovery), no un CTA
 * interno de la serie — sigue el mismo patron ya usado en el reel 4 de
 * cierre de cada una de las 6 series anteriores.
 *
 * Sin escena i2v (doctrina: el presupuesto de 2 heroes de la serie ya
 * se agoto en reel 1 y reel 3 — ver decision_log d-002). Las 3
 * reassurances de TagRevealList son LITERALES de la seccion "¿Por que
 * ofrecemos el diagnostico sin costo?" y de la FAQ "¿Realmente es
 * gratuito o hay letra pequena?" del post — sin inventar una 4a razon.
 * El texto final de la agenda ("seleccionas un horario... Ernesto te
 * llama exactamente a esa hora... 30 minutos") es literal de la seccion
 * de cierre del post.
 *
 * Frame plan @24fps: cold_open 96f (4.0s) + reason 144f (6.0s) +
 * objections_beat 192f (8.0s) + cal_final 168f (7.0s) + brand_close_cta
 * 240f (10.0s) = 840f = 35.000s exacto (tail_padding_seconds: 0 en
 * props).
 *
 * Ver PorQueEsGratisAgendaAhora.art-direction.md, .decision_log.json,
 * .scene_plan.json y .gates.json.
 */
export interface PorQueEsGratisAgendaAhoraProps {
  musicSrc: string;
  logoSrc: string;
  sfxWhooshSrc?: string;
  [key: string]: unknown;
}

const S1 = 96;
const S2 = 144;
const S3 = 192;
const S4 = 168;
const S5 = 240;

export const POR_QUE_ES_GRATIS_AGENDA_AHORA_TOTAL_FRAMES = S1 + S2 + S3 + S4 + S5; // 840

const START1 = 0;
const START2 = START1 + S1; // 96
const START3 = START2 + S2; // 240
const START4 = START3 + S3; // 432
const START5 = START4 + S4; // 600

function musicVolume(frame: number): number {
  const dipStart = START3;
  const dipEnd = START3 + 14;
  const riseStart = START4 - 10;
  const riseEnd = START4 + 12;
  if (frame < dipStart) return 1.0;
  if (frame < dipEnd) return interpolate(frame, [dipStart, dipEnd], [1.0, 0.6], { extrapolateRight: "clamp" });
  if (frame < riseStart) return 0.6;
  if (frame < riseEnd) return interpolate(frame, [riseStart, riseEnd], [0.6, 1.0], { extrapolateRight: "clamp" });
  return 1.0;
}

const OBJECTION_TAGS = [
  { label: "Tarjeta de credito", value: "No se pide." },
  { label: "Compromiso", value: "Ninguno." },
  { label: "Si no hay buen fit", value: "Te lo decimos directo." },
];

export const PorQueEsGratisAgendaAhora: React.FC<PorQueEsGratisAgendaAhoraProps> = ({
  musicSrc,
  logoSrc,
  sfxWhooshSrc,
}) => {
  return (
    <AbsoluteFill style={{ background: BRAND.bg }}>
      <Audio src={musicSrc} volume={musicVolume} />

      {sfxWhooshSrc && (
        <Sequence from={START4 + 8} durationInFrames={20} name="sfx_whoosh_cal">
          <Audio src={sfxWhooshSrc} volume={0.6} />
        </Sequence>
      )}

      {/* Scene 1 — cold_open. La pregunta que cierra el ciclo de la
          serie ("¿por que ofrecemos el diagnostico sin costo?"). */}
      <Sequence from={START1} durationInFrames={S1} name="cold_open">
        <KineticHeadline
          lines={["¿Por que es gratis?"]}
          fontSize={56}
          position="center"
        />
      </Sequence>

      {/* Scene 2 — reason. La razon real, literal del post: "es nuestra
          forma de asegurar que solo trabajamos con negocios donde
          podemos generar un impacto real". */}
      <Sequence from={START2} durationInFrames={S2} name="reason">
        <KineticHeadline
          lines={["Porque solo queremos trabajar", "donde podemos generar", "un impacto real."]}
          accentWord="real."
          fontSize={36}
          position="center"
        />
      </Sequence>

      {/* Scene 3 — objections_beat. Las 3 reassurances literales del
          post, boxless, TagRevealList (patron ya GO'd en
          CasoMarinoHVAC.tsx de reels-hvac-serie). */}
      <Sequence from={START3} durationInFrames={S3} name="objections_beat">
        <FilmGrade vignette={0.3} grainOpacity={0.08}>
          <TagRevealList tags={OBJECTION_TAGS} staggerFrames={40} />
        </FilmGrade>
      </Sequence>

      {/* Scene 4 — cal_final. La mecanica exacta de la agenda, literal
          del post: "seleccionas un horario que te convenga, y Ernesto
          te llama exactamente a esa hora. La sesion dura 30 minutos." */}
      <Sequence from={START4} durationInFrames={S4} name="cal_final">
        <StatReveal stat="30 min" label="eliges un horario. Ernesto te llama exactamente a esa hora." accentColor={BRAND.accent} position="center" />
      </Sequence>

      {/* Scene 5 — brand_close_cta. CIERRE REAL de la serie — UNICO
          brand_close de toda la linea `reels-del-blog` con la URL de
          agenda real, hold mas largo (10.0s vs los 8.0s habituales) por
          ser el CTA mas fuerte de las 8 series. */}
      <Sequence from={START5} durationInFrames={S5} name="brand_close_cta">
        <FilmGrade vignette={0.35} grainOpacity={0.1}>
          <BrandClose
            wordmark="AetherLogik"
            tagline="Sin letra pequena. Sin vender humo."
            url="cal.com/aetherlogik/discovery . agenda tu diagnostico gratuito ->"
            logoSrc={logoSrc}
            accentColor={BRAND.accent}
            backgroundColor={BRAND.bg}
          />
        </FilmGrade>
      </Sequence>
    </AbsoluteFill>
  );
};
