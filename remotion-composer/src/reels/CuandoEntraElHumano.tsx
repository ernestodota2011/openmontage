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
 * CuandoEntraElHumano - reel 3/4 (didactico, limites) de la serie
 * reels-inmobiliarios-serie. Fuente: FAQ 'Que sucede si necesito
 * intervenir manualmente' + el cierre del post ('la IA no reemplaza tu
 * experiencia y habilidades de negociacion'). Es el reel de
 * CREDIBILIDAD de la serie - evita prometer que la IA cierra tratos por
 * si sola.
 *
 * UNICA escena i2v de este reel (cold_open_hero, junto con reel 1 de la
 * serie - ver decision_log d-002 de LoQueYaPuedesAutomatizar.tsx sobre
 * por que se reparten los 2 heroes de la serie entre reel 1 y reel 3): un
 * agente tomando personalmente una llamada / cerrando un saludo con un
 * cliente, dramatizando "cuando importa, entras tu" en imagen antes de
 * decirlo en texto. Kling O1 duration="5" EXACTO (P-11 evitado desde el
 * diseno: la escena dura 5.0s, igual que el clip generado, sin
 * discrepancia que forzar en Remotion).
 *
 * Frame plan @24fps: cold_open_hero 120f (5.0s) + limits_list 312f
 * (13.0s) + human_connection 144f (6.0s) + responsibility_beat 168f
 * (7.0s) + tease_possible 120f (5.0s) + brand_close 216f (9.0s) = 1080f
 * = 45.000s exacto (tail_padding_seconds: 0 en props).
 *
 * Ver CuandoEntraElHumano.art-direction.md, .decision_log.json,
 * .scene_plan.json y .gates.json (auto-score pre-render).
 */
export interface CuandoEntraElHumanoProps {
  heroVideoSrc: string;
  musicSrc: string;
  logoSrc: string;
  [key: string]: unknown;
}

const S1 = 120;
const S2 = 312;
const S3 = 144;
const S4 = 168;
const S5 = 120;
const S6 = 216;

export const CUANDO_ENTRA_EL_HUMANO_TOTAL_FRAMES = S1 + S2 + S3 + S4 + S5 + S6; // 1080

const START1 = 0;
const START2 = START1 + S1; // 120
const START3 = START2 + S2; // 432
const START4 = START3 + S3; // 576
const START5 = START4 + S4; // 744
const START6 = START5 + S5; // 864

function musicVolume(frame: number): number {
  const dipStart = START4;
  const dipEnd = START4 + 16;
  const riseStart = START5 - 12;
  const riseEnd = START5 + 6;
  if (frame < dipStart) return 1.0;
  if (frame < dipEnd) return interpolate(frame, [dipStart, dipEnd], [1.0, 0.6], { extrapolateRight: "clamp" });
  if (frame < riseStart) return 0.6;
  if (frame < riseEnd) return interpolate(frame, [riseStart, riseEnd], [0.6, 1.0], { extrapolateRight: "clamp" });
  return 1.0;
}

const LIMITS_TAGS: QualifyTag[] = [
  { label: "1", value: "Negociar terminos y cerrar el trato" },
  { label: "2", value: "Preguntas complejas de financiamiento" },
  { label: "3", value: "Construir la relacion de confianza" },
  { label: "4", value: "Decisiones que requieren tu criterio" },
];

export const CuandoEntraElHumano: React.FC<CuandoEntraElHumanoProps> = ({
  heroVideoSrc,
  musicSrc,
  logoSrc,
}) => {
  return (
    <AbsoluteFill style={{ background: BRAND.bg }}>
      <Audio src={musicSrc} volume={musicVolume} />

      {/* Scene 1 - cold_open_hero. UNICA escena i2v del reel. */}
      <Sequence from={START1} durationInFrames={S1} name="cold_open_hero">
        <AbsoluteFill style={{ background: BRAND.bg }}>
          <OffthreadVideo
            src={heroVideoSrc}
            muted
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </AbsoluteFill>
        <HeadlineOverlay text="Cuando importa, entras tu." position="bottom" scrim fontSize={36} />
      </Sequence>

      {/* Scene 2 - limits_list. Cascada de 4 QualifyTag, fiel al FAQ del post. */}
      <Sequence from={START2} durationInFrames={S2} name="limits_list">
        <TagRevealList tags={LIMITS_TAGS} staggerFrames={64} />
        <HeadlineOverlay text="Lo que la IA no reemplaza" position="bottom" scrim fontSize={28} />
      </Sequence>

      {/* Scene 3 - human_connection. Fiel al post: la IA escala cuando importa. */}
      <Sequence from={START3} durationInFrames={S3} name="human_connection">
        <KineticHeadline
          lines={["La IA te escala", "la conversacion", "justo cuando importa."]}
          accentWord="importa"
          fontSize={42}
          position="center"
        />
      </Sequence>

      {/* Scene 4 - responsibility_beat. El historial completo, tu decides. */}
      <Sequence from={START4} durationInFrames={S4} name="responsibility_beat">
        <KineticHeadline
          lines={["El historial completo.", "El contexto entero.", "Tu decides cuando entrar."]}
          accentWord="entrar"
          fontSize={44}
          position="center"
        />
      </Sequence>

      {/* Scene 5 - tease_possible. Bridge de marca hacia el cierre. */}
      <Sequence from={START5} durationInFrames={S5} name="tease_possible">
        <KineticHeadline
          lines={["Por eso disenamos flujos", "donde tu mantienes el control."]}
          accentWord="control"
          fontSize={50}
          position="center"
        />
        <EmberThread backgroundColor="transparent" accentColor={BRAND.accent} sweepSeconds={S5 / 24} />
      </Sequence>

      {/* Scene 6 - brand_close. CTA al reel 4 de la serie. */}
      <Sequence from={START6} durationInFrames={S6} name="brand_close">
        <FilmGrade vignette={0.35} grainOpacity={0.1}>
          <BrandClose
            wordmark="AetherLogik"
            tagline="Automatizacion real para agentes inmobiliarios."
            url="aetherlogik.com/blog . como empiezas sin perder leads, en el proximo video ->"
            logoSrc={logoSrc}
            accentColor={BRAND.accent}
            backgroundColor={BRAND.bg}
          />
        </FilmGrade>
      </Sequence>
    </AbsoluteFill>
  );
};
