import {
  AbsoluteFill,
  Audio,
  OffthreadVideo,
  Sequence,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { BRAND, EASING } from "../theme";
import { EmberThread } from "../components/EmberThread";
import { KineticHeadline } from "../components/KineticHeadline";
import { BrandClose } from "../components/BrandClose";
import { FilmGrade } from "../components/FilmGrade";
import { ChatThreadBotReply, ChatMessage } from "../components/ChatThreadScene";
import { TagRevealList } from "../components/TagRevealList";

/**
 * CasoMarinoHVAC — reel 3/4 de la serie chatbot-whatsapp-para-negocios. El
 * reel de caso real: Marino HVAC (empresa de A/C en Miami), tomado
 * verbatim de la seccion "Caso real" del post. TODAS las cifras/afirmaciones
 * usadas aqui son las propias afirmaciones cualitativas del post (CERO
 * numeros inventados — el post no da porcentaje/conteo para este caso, asi
 * que no se dramatiza ninguno; ver CasoMarinoHVAC.decision_log.json d-002,
 * la auditoria anti-claims de esta escena).
 *
 * Hibrido: UN solo hero real i2v (cold_open_technician — la realidad de
 * campo con la que abre el post) + el resto es 100% motion-autorado (chat
 * UI + tipografia cinetica + el TagRevealList boxless), misma disciplina
 * que el piloto.
 *
 * Frame plan @24fps: cold_open_technician 120f (5.0s) + EmberThread bridge
 * 12f (0.5s) + problem_context 108f (4.5s) + qualify_tags 240f (10.0s) +
 * chat_flow_demo 264f (11.0s) + EmberThread bridge 12f (0.5s) +
 * outcome_line 144f (6.0s) + brand_close 180f (7.5s) = 1080f = 45.000s
 * exacto (tail_padding_seconds: 0).
 */
export interface CasoMarinoHVACProps {
  coldOpenSrc: string;
  musicSrc: string;
  logoSrc: string;
  sfxDingSrc?: string;
  sfxChimeSrc?: string;
  [key: string]: unknown;
}

const S1 = 120;
const BRIDGE_A = 12;
const S2 = 108;
const S3 = 240;
const S4 = 264;
const BRIDGE_B = 12;
const S5 = 144;
const S6 = 180;

export const CASO_MARINO_HVAC_TOTAL_FRAMES = S1 + BRIDGE_A + S2 + S3 + S4 + BRIDGE_B + S5 + S6; // 1080

const START1 = 0;
const STARTB1 = START1 + S1; // 120
const START2 = STARTB1 + BRIDGE_A; // 132
const START3 = START2 + S2; // 240
const START4 = START3 + S3; // 480
const STARTB2 = START4 + S4; // 744
const START5 = STARTB2 + BRIDGE_B; // 756
const START6 = START5 + S5; // 900

const NamedCamera: React.FC<{ src: string; from: number; to: number; durationFrames: number }> = ({
  src,
  from,
  to,
  durationFrames,
}) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, durationFrames], [from, to], {
    easing: EASING.camera,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: BRAND.bg }}>
      <OffthreadVideo
        src={src}
        muted
        style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${scale})` }}
      />
    </AbsoluteFill>
  );
};

const QUALIFY_TAGS = [
  { label: "SERVICIO", value: "Reparación de A/C" },
  { label: "ZONA", value: "Dentro de cobertura ✓" },
  { label: "URGENCIA", value: "No es una emergencia" },
  { label: "SIGUIENTE PASO", value: "Cita ofrecida" },
];

const CHAT_THREAD: ChatMessage[] = [
  { text: "Hola, mi A/C no está enfriando bien. ¿Pueden venir esta semana?", time: "2:40pm" },
];

function musicVolume(frame: number): number {
  const duckStart = START4 - 12;
  const duckEnd = START4 + 14;
  if (frame < duckStart) return 1.0;
  if (frame < duckEnd) return interpolate(frame, [duckStart, duckEnd], [1.0, 0.5], { extrapolateRight: "clamp" });
  return interpolate(frame, [duckEnd, duckEnd + 40], [0.5, 1.0], { extrapolateRight: "clamp" });
}

export const CasoMarinoHVAC: React.FC<CasoMarinoHVACProps> = ({
  coldOpenSrc,
  musicSrc,
  logoSrc,
  sfxDingSrc,
  sfxChimeSrc,
}) => {
  return (
    <AbsoluteFill style={{ background: BRAND.bg }}>
      <Audio src={musicSrc} volume={musicVolume} />

      {sfxDingSrc && (
        <Sequence from={START3 + 6} durationInFrames={30} name="sfx_ding_qualify_start">
          <Audio src={sfxDingSrc} volume={0.55} />
        </Sequence>
      )}
      {sfxChimeSrc && (
        <Sequence from={START4 + 160} durationInFrames={30} name="sfx_chime_appointment">
          <Audio src={sfxChimeSrc} volume={0.8} />
        </Sequence>
      )}

      {/* Scene 1 — cold_open_technician. i2v real (Kling 2.5 Turbo Pro),
          hero_moment=true. La realidad del post: "sus tecnicos estan en el
          campo todo el dia". */}
      <Sequence from={START1} durationInFrames={S1} name="cold_open_technician">
        <FilmGrade vignette={0.4} grainOpacity={0.12}>
          <NamedCamera src={coldOpenSrc} from={1.0} to={1.05} durationFrames={S1} />
        </FilmGrade>
      </Sequence>

      <Sequence from={STARTB1} durationInFrames={BRIDGE_A} name="EmberThread_bridge_a">
        <EmberThread backgroundColor={BRAND.bg} accentColor={BRAND.accent} sweepSeconds={0.5} />
      </Sequence>

      {/* Scene 2 — problem_context. Bisagra cinetica, texto tomado del post. */}
      <Sequence from={START2} durationInFrames={S2} name="problem_context">
        <KineticHeadline
          lines={["Las llamadas interrumpen el trabajo.", "Los mensajes se acumulan sin responder."]}
          fontSize={48}
          position="center"
        />
      </Sequence>

      {/* Scene 3 — qualify_tags. TagRevealList: los pasos reales que el bot
          verifica (servicio, zona, urgencia), SIN cifras inventadas. */}
      <Sequence from={START3} durationInFrames={S3} name="qualify_tags">
        <TagRevealList tags={QUALIFY_TAGS} />
      </Sequence>

      {/* Scene 4 — chat_flow_demo. Reuse ChatThreadBotReply con copy
          especifica de Marino HVAC (verifica zona, ofrece cita). */}
      <Sequence from={START4} durationInFrames={S4} name="chat_flow_demo">
        <ChatThreadBotReply
          threadMessages={CHAT_THREAD}
          replyText="Sí, cubrimos esa zona. No es una emergencia, así que te puedo agendar para mañana. ¿Te sirve?"
          appointment={{ service: "Revisión de A/C — Marino HVAC", when: "Mañana, 10:00am–12:00pm" }}
        />
      </Sequence>

      <Sequence from={STARTB2} durationInFrames={BRIDGE_B} name="EmberThread_bridge_b">
        <EmberThread backgroundColor={BRAND.bg} accentColor={BRAND.accent} sweepSeconds={0.5} />
      </Sequence>

      {/* Scene 5 — outcome_line. Parafrasis fiel del resultado que describe
          el post (SIN metricas que el post no da). */}
      <Sequence from={START5} durationInFrames={S5} name="outcome_line">
        <KineticHeadline
          lines={["Los técnicos dejan de interrumpirse.", "El dueño ve qué leads entraron", "y en qué etapa están."]}
          accentWord="ve"
          fontSize={46}
          position="center"
        />
      </Sequence>

      {/* Scene 6 — brand_close. */}
      <Sequence from={START6} durationInFrames={S6} name="brand_close">
        <FilmGrade vignette={0.35} grainOpacity={0.1}>
          <BrandClose
            wordmark="AetherLogik"
            tagline="No es magia. Es no perder lo que ya te está llegando."
            url="aetherlogik.com/para-hvac · sigue la serie →"
            logoSrc={logoSrc}
            accentColor={BRAND.accent}
            backgroundColor={BRAND.bg}
          />
        </FilmGrade>
      </Sequence>
    </AbsoluteFill>
  );
};
