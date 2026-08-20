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
import {
  ChatThreadStack,
  ChatThreadPunch,
  ChatThreadBotReply,
  ChatMessage,
} from "../components/ChatThreadScene";

/**
 * TresMensajesDeAnoche — bespoke atelier composition, hook reel for the
 * blog->reel series (post: "chatbot-whatsapp-para-negocios"). This is the
 * SELLING reel for the series, not the tutorial itself — it hooks on the
 * 3-missed-messages problem + the HBR/InsideSales 5-minute stat, then shows
 * "lo que es posible" (bot resolves the same thread in seconds) and closes
 * pointing at the blog.
 *
 * One world (a bedroom -> the SAME phone screen for the rest of the reel),
 * one identity-locked subject (hero-frame + nano-banana-pro/edit for the
 * end-frame), first/last-frame Kling O1 chaining the cold-open motion.
 * The WhatsApp-style UI is deliberately NOT AI-generated video — per
 * aetherlogik-video's realism doctrine, screen UI/typography reads cleaner
 * hand-authored in Remotion than asked of a video model — so it's built with
 * ChatThreadScene (own on-brand chat visual language, not a literal
 * WhatsApp clone; see that file's header for why).
 *
 * Frame plan @ 24fps: cold_open 144f (6.0s) + whatsapp_stack 144f (6.0s) +
 * punch_lost_client 72f (3.0s) + stat_five_minutes 96f (4.0s) + bot_responds
 * 156f (6.5s) + brand_close 108f (4.5s) = 720f = 30.000s exact
 * (tail_padding_seconds: 0 in props — no phantom +1s, per commit dbe87d7).
 *
 * See TresMensajesDeAnoche.art-direction.md (full rationale) and
 * TresMensajesDeAnoche.decision_log.json (every decision + real gate
 * results) + TresMensajesDeAnoche.scene_plan.json (the scene_plan artifact
 * the gates were run against, verbatim).
 */
export interface TresMensajesDeAnocheProps {
  coldOpenSrc: string;
  musicSrc: string;
  logoSrc: string;
  sfxDingSrc?: string;
  sfxPunchSrc?: string;
  [key: string]: unknown; // required by the <Composition> generic (lesson from LaHoraRobada, commit b26d3552)
}

const SCENE1_FRAMES = 144; // 6.0s — cold_open_wake (real i2v, Kling O1 chained)
const SCENE2_FRAMES = 144; // 6.0s — whatsapp_stack (animation)
const SCENE3_FRAMES = 72; // 3.0s — punch_lost_client (animation)
const SCENE4_FRAMES = 96; // 4.0s — stat_five_minutes (stat_card)
const SCENE5_FRAMES = 156; // 6.5s — bot_responds (animation)
const SCENE6_FRAMES = 108; // 4.5s — brand_close (animation)

export const TRES_MENSAJES_TOTAL_FRAMES =
  SCENE1_FRAMES + SCENE2_FRAMES + SCENE3_FRAMES + SCENE4_FRAMES + SCENE5_FRAMES + SCENE6_FRAMES; // 720

const SCENE1_START = 0;
const SCENE2_START = SCENE1_START + SCENE1_FRAMES; // 144
const SCENE3_START = SCENE2_START + SCENE2_FRAMES; // 288
const SCENE4_START = SCENE3_START + SCENE3_FRAMES; // 360
const SCENE5_START = SCENE4_START + SCENE4_FRAMES; // 456
const SCENE6_START = SCENE5_START + SCENE5_FRAMES; // 612

/** Named camera for the one real video plane (cold open). Dolly-in lento,
 * eje fijo — never "anima esta foto" (coherence doctrine lever #4). */
const NamedCamera: React.FC<{
  src: string;
  from: number;
  to: number;
  easing: (t: number) => number;
  durationFrames: number;
}> = ({ src, from, to, easing, durationFrames }) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, durationFrames], [from, to], {
    easing,
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

const THREAD_MESSAGES: ChatMessage[] = [
  { text: "Hola, vi su anuncio de reparación de A/C. ¿Tienen disponibilidad esta semana?", time: "11:47pm" },
  { text: "¿Siguen ahí? Es un poco urgente.", time: "11:52pm" },
  { text: "Gracias, ya contratamos a otra empresa.", time: "12:15am" },
];

/** Music envelope — dip to near-silence 0.4s before the gut-punch message,
 * release into the stat beat. SFX (ding + gut-punch) are embedded above as
 * their own <Sequence>/<Audio> pairs; devops' FFmpeg finishing pass only
 * needs the final 2-pass loudnorm (-14 LUFS / -1.0 dBTP) on top of this
 * pre-mixed shape — no manual SFX sync required downstream. */
function musicVolume(frame: number): number {
  const duckStart = SCENE3_START - 10; // ~0.4s before the punch
  const duckEnd = SCENE3_START + 12;
  const releaseEnd = SCENE4_START + 12;
  if (frame < duckStart) return 1.0;
  if (frame < duckEnd) {
    return interpolate(frame, [duckStart, duckEnd], [1.0, 0.06], { extrapolateRight: "clamp" });
  }
  if (frame < SCENE4_START) return 0.06;
  if (frame < releaseEnd) {
    return interpolate(frame, [SCENE4_START, releaseEnd], [0.06, 1.0], { extrapolateRight: "clamp" });
  }
  return 1.0;
}

export const TresMensajesDeAnoche: React.FC<TresMensajesDeAnocheProps> = ({
  coldOpenSrc,
  musicSrc,
  logoSrc,
  sfxDingSrc,
  sfxPunchSrc,
}) => {
  return (
    <AbsoluteFill style={{ background: BRAND.bg }}>
      <Audio src={musicSrc} volume={musicVolume} />

      {/* SFX embebidos, sincronizados a frame exacto (no dejarlo a una
          mezcla manual de FFmpeg en devops): ding sutil al arrancar (el
          celular ya brilla en el primer frame del cold open) + el golpe
          seco exactamente en el punch-in del mensaje perdido. */}
      {sfxDingSrc && (
        <Sequence from={4} durationInFrames={40} name="sfx_notification_ding">
          <Audio src={sfxDingSrc} volume={0.7} />
        </Sequence>
      )}
      {sfxPunchSrc && (
        <Sequence from={SCENE3_START} durationInFrames={30} name="sfx_gut_punch">
          <Audio src={sfxPunchSrc} volume={0.9} />
        </Sequence>
      )}

      {/* Scene 1 — cold_open_wake. Real generated video (Kling O1, chained
          first/last frame from the two Nano Banana Pro hero-frame stills).
          hero_moment=true. */}
      <Sequence from={SCENE1_START} durationInFrames={SCENE1_FRAMES} name="cold_open_wake">
        <FilmGrade vignette={0.45} grainOpacity={0.14}>
          <NamedCamera
            src={coldOpenSrc}
            from={1.0}
            to={1.07}
            easing={EASING.camera}
            durationFrames={SCENE1_FRAMES}
          />
        </FilmGrade>
      </Sequence>

      {/* Scene 2 — whatsapp_stack. Same phone thread throughout scenes 2/3/5
          (narrative continuity, not a repeated hero-component-spine). */}
      <Sequence from={SCENE2_START} durationInFrames={SCENE2_FRAMES} name="whatsapp_stack">
        <ChatThreadStack messages={THREAD_MESSAGES} />
      </Sequence>

      {/* Scene 3 — punch_lost_client. Digital punch-in on the 3rd message;
          music ducks to near-silence right before (musicVolume above). */}
      <Sequence from={SCENE3_START} durationInFrames={SCENE3_FRAMES} name="punch_lost_client">
        <ChatThreadPunch messages={THREAD_MESSAGES} punchIndex={2} />
      </Sequence>

      {/* Scene 4 — stat_five_minutes. Kinetic mask-reveal, one ember word,
          deliberate hold (~4s). The bridge between "problema" and "posible". */}
      <Sequence from={SCENE4_START} durationInFrames={SCENE4_FRAMES} name="stat_five_minutes">
        <AbsoluteFill style={{ background: BRAND.bg }}>
          <KineticHeadline
            lines={["Contactar en los primeros", "5 minutos multiplica", "la conversión."]}
            accentWord="5"
            fontSize={64}
            position="center"
          />
          <div
            style={{
              position: "absolute",
              bottom: "12%",
              width: "100%",
              textAlign: "center",
              color: BRAND.muted,
              fontSize: 22,
              fontFamily: "Inter, system-ui, sans-serif",
              letterSpacing: "0.04em",
            }}
          >
            HARVARD BUSINESS REVIEW · INSIDESALES
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Scene 5 — bot_responds. "Mira lo que es posible": same thread,
          resuelto en segundos. The reel's central promise. */}
      <Sequence from={SCENE5_START} durationInFrames={SCENE5_FRAMES} name="bot_responds">
        <ChatThreadBotReply
          threadMessages={[THREAD_MESSAGES[0]]}
          replyText="¡Hola! Claro, cubrimos esa zona. ¿Es para hoy o esta semana? Le puedo agendar ahora mismo."
          appointment={{ service: "Revisión de A/C — técnico asignado", when: "Mañana, 9:00–11:00am" }}
        />
      </Sequence>

      {/* EmberThread — appears exactly once, as the bridge riding the file
          cut between the demo and the close (same discipline as
          LaHoraRobadaV2: not a repeated scene). */}
      <Sequence from={SCENE6_START - 12} durationInFrames={12} name="EmberThread_bridge">
        <EmberThread backgroundColor={BRAND.bg} accentColor={BRAND.accent} sweepSeconds={0.5} />
      </Sequence>

      {/* Scene 6 — brand_close. */}
      <Sequence from={SCENE6_START} durationInFrames={SCENE6_FRAMES} name="brand_close">
        <FilmGrade vignette={0.35} grainOpacity={0.1}>
          <BrandClose
            wordmark="AetherLogik"
            tagline="No pierdas otro cliente mientras duermes."
            url="aetherlogik.com/blog · lee el caso completo"
            logoSrc={logoSrc}
            accentColor={BRAND.accent}
            backgroundColor={BRAND.bg}
          />
        </FilmGrade>
      </Sequence>
    </AbsoluteFill>
  );
};
