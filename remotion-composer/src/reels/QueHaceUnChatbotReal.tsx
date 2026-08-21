import {
  AbsoluteFill,
  Audio,
  Sequence,
  interpolate,
} from "remotion";
import { BRAND } from "../theme";
import { KineticHeadline } from "../components/KineticHeadline";
import { HeadlineOverlay } from "../components/HeadlineOverlay";
import { BrandClose } from "../components/BrandClose";
import { FilmGrade } from "../components/FilmGrade";
import {
  ChatThreadStack,
  ChatThreadBotReply,
  ChatMessage,
} from "../components/ChatThreadScene";
import { QuickReplyBeat, EscalateBeat, SimpleMessage } from "../components/CapabilitySceneKit";

/**
 * QueHaceUnChatbotReal — reel 2/4 de la serie chatbot-whatsapp-para-negocios
 * (continuacion del piloto GO'd "Tres mensajes de anoche"). Reel didactico:
 * las 4 capacidades reales de un chatbot que funciona (seccion del post
 * "Que hace un chatbot real (no el de los demos)"), UI como protagonista.
 * 100% motion-autorado (CERO i2v/stills generativos — cada beat es UI de
 * chat o tipografia cinetica), reusando ChatThreadScene (piloto GO'd,
 * intacto) + los 2 devices nuevos de CapabilitySceneKit, para que ninguna
 * de las 4 capacidades comparta el mismo device visual (evita
 * hero-component-spine / la dimension "repetition" de slideshow_risk).
 *
 * Frame plan @24fps: cold_open_hook 72f (3.0s) + cap1_responde 204f (8.5s)
 * + cap2_califica 204f (8.5s) + cap3_agenda 216f (9.0s) + cap4_escala 204f
 * (8.5s) + punch_montage 84f (3.5s) + brand_close 120f (5.0s) = 1104f =
 * 46.000s exacto (tail_padding_seconds: 0 en props).
 *
 * Ver QueHaceUnChatbotReal.art-direction.md, .decision_log.json,
 * .scene_plan.json y .gates.json (auto-score pre-render).
 */
export interface QueHaceUnChatbotRealProps {
  musicSrc: string;
  logoSrc: string;
  sfxChipSrc?: string;
  sfxWhooshSrc?: string;
  [key: string]: unknown;
}

const S1 = 72;
const S2 = 204;
const S3 = 204;
const S4 = 216;
const S5 = 204;
const S6 = 84;
const S7 = 120;

export const QUE_HACE_UN_CHATBOT_REAL_TOTAL_FRAMES = S1 + S2 + S3 + S4 + S5 + S6 + S7; // 1104

const START1 = 0;
const START2 = START1 + S1; // 72
const START3 = START2 + S2; // 276
const START4 = START3 + S3; // 480
const START5 = START4 + S4; // 696
const START6 = START5 + S5; // 900
const START7 = START6 + S6; // 984

function musicVolume(frame: number): number {
  // Dos caídas sutiles: antes del beat 4 (escala — el beat mas "serio") y
  // antes del punch montage, liberando hacia el brand_close.
  const dip1 = START5 - 8;
  const dip1end = START5 + 10;
  const dip2 = START6 - 6;
  const dip2end = START6 + 8;
  if (frame < dip1) return 1.0;
  if (frame < dip1end) return interpolate(frame, [dip1, dip1end], [1.0, 0.55], { extrapolateRight: "clamp" });
  if (frame < dip2) return interpolate(frame, [dip1end, dip2], [0.55, 0.85], { extrapolateRight: "clamp" });
  if (frame < dip2end) return interpolate(frame, [dip2, dip2end], [0.85, 1.0], { extrapolateRight: "clamp" });
  return 1.0;
}

const CAP1_INCOMING: ChatMessage = { text: "¿Siguen abiertos? Necesito un presupuesto.", time: "9:14pm" };
const CAP2_MESSAGES: ChatMessage[] = [
  { text: "¿Qué servicio necesitas?", time: "9:15pm" },
  { text: "Reparación de A/C", time: "9:15pm", outgoing: true },
  { text: "¿Para cuándo lo necesitas?", time: "9:15pm" },
  { text: "Esta semana, si se puede", time: "9:16pm", outgoing: true },
];
const CAP3_THREAD: ChatMessage[] = [{ text: "¿Tienen disponibilidad esta semana?", time: "9:16pm" }];
const CAP4_INCOMING: SimpleMessage = { text: "Es un caso raro, prefiero hablar con alguien.", time: "9:18pm" };

export const QueHaceUnChatbotReal: React.FC<QueHaceUnChatbotRealProps> = ({
  musicSrc,
  logoSrc,
  sfxChipSrc,
  sfxWhooshSrc,
}) => {
  return (
    <AbsoluteFill style={{ background: BRAND.bg }}>
      <Audio src={musicSrc} volume={musicVolume} />

      {sfxChipSrc && (
        <>
          <Sequence from={START2 + 20} durationInFrames={20} name="sfx_chip_cap1">
            <Audio src={sfxChipSrc} volume={0.5} />
          </Sequence>
          <Sequence from={START3 + 4} durationInFrames={20} name="sfx_chip_cap2">
            <Audio src={sfxChipSrc} volume={0.4} />
          </Sequence>
        </>
      )}
      {sfxWhooshSrc && (
        <Sequence from={START5 + 40} durationInFrames={20} name="sfx_whoosh_escalate">
          <Audio src={sfxWhooshSrc} volume={0.7} />
        </Sequence>
      )}

      {/* Scene 1 — cold_open_hook. Tipografia cinetica pura, sin costo de
          asset: fija la promesa "no es el bot de la demo" en 3s. */}
      <Sequence from={START1} durationInFrames={S1} name="cold_open_hook">
        <KineticHeadline
          lines={["El chatbot de las demos", "se cae.", "Este no."]}
          accentWord="no"
          fontSize={68}
          position="center"
        />
      </Sequence>

      {/* Scene 2 — cap1_responde. QuickReplyBeat (ECU, device nuevo):
          dramatiza "responde en segundos, no en horas". */}
      <Sequence from={START2} durationInFrames={S2} name="cap1_responde">
        <QuickReplyBeat
          incoming={CAP1_INCOMING}
          replyText="¡Hola! Sí, seguimos abiertos. Te puedo dar el presupuesto ahora mismo."
          seconds={4}
        />
        <HeadlineOverlay text="1 · Responde en segundos, no en horas" position="bottom" scrim fontSize={34} />
      </Sequence>

      {/* Scene 3 — cap2_califica. ChatThreadStack (MS, cascade): la
          calificacion real — servicio + urgencia, lo basico para no perder
          tiempo en llamadas de descarte. */}
      <Sequence from={START3} durationInFrames={S3} name="cap2_califica">
        <ChatThreadStack messages={CAP2_MESSAGES} />
        <HeadlineOverlay text="2 · Pregunta lo que tu equipo necesita saber" position="bottom" scrim fontSize={34} />
      </Sequence>

      {/* Scene 4 — cap3_agenda. Reuse ChatThreadBotReply tal cual (typing ->
          reply -> tarjeta de cita): "agenda o deriva" es literalmente esa
          tarjeta — mismo device del piloto, aqui es el correcto porque el
          contenido SI es agendamiento. */}
      <Sequence from={START4} durationInFrames={S4} name="cap3_agenda">
        <ChatThreadBotReply
          threadMessages={CAP3_THREAD}
          replyText="Claro, tengo espacio el jueves. ¿Te agendo?"
          appointment={{ service: "Reparación de A/C — técnico asignado", when: "Jueves, 2:00–4:00pm" }}
        />
        <HeadlineOverlay text="3 · Agenda o deriva, sin dejarlo colgado" position="bottom" scrim fontSize={34} />
      </Sequence>

      {/* Scene 5 — cap4_escala. EscalateBeat (CU, device nuevo): handoff con
          contexto, sin que el cliente repita todo. */}
      <Sequence from={START5} durationInFrames={S5} name="cap4_escala">
        <EscalateBeat message={CAP4_INCOMING} agentName="Ana" />
        <HeadlineOverlay text="4 · Escala a humano con todo el contexto" position="bottom" scrim fontSize={34} />
      </Sequence>

      {/* Scene 6 — punch_montage. Recap rapido de las 4 promesas, construye
          anticipacion para el cierre. */}
      <Sequence from={START6} durationInFrames={S6} name="punch_montage">
        <FilmGrade vignette={0.3} grainOpacity={0.08}>
          <KineticHeadline
            lines={["En segundos.", "Calificado.", "Agendado.", "Con contexto."]}
            accentWord="Con"
            fontSize={52}
            position="center"
            revealSeconds={0.5}
            staggerSeconds={0.55}
          />
        </FilmGrade>
      </Sequence>

      {/* Scene 7 — brand_close. */}
      <Sequence from={START7} durationInFrames={S7} name="brand_close">
        <FilmGrade vignette={0.35} grainOpacity={0.1}>
          <BrandClose
            wordmark="AetherLogik"
            tagline="Así se ve un chatbot que sí funciona."
            url="aetherlogik.com/blog · el caso real: Marino HVAC →"
            logoSrc={logoSrc}
            accentColor={BRAND.accent}
            backgroundColor={BRAND.bg}
          />
        </FilmGrade>
      </Sequence>
    </AbsoluteFill>
  );
};
