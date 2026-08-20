import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BRAND, EASING, SPRINGS } from "../theme";

/**
 * ChatThreadScene — stylized, on-brand chat visualization for AetherLogik
 * video. NOT a WhatsApp screenshot/clone: deliberately does not reuse
 * WhatsApp's green (#25D366) or blue-tick chrome — brand_palette_guard
 * rejects any saturated hue outside the ember band (see
 * `lib/brand_palette_guard.py::classify_color`), and cloning a third party's
 * literal UI chrome isn't a signature device anyway. Instead: near-black
 * thread, neutral-gray bubbles (bg #141414, no saturated fill), ember
 * hairline border on the business side, ember ticks/typing-dots. This IS the
 * atelier "signature device" for this reel — our own chat visual language,
 * not a generic mockup.
 *
 * Bubble shape (solid bg + border-radius) legitimately trips the
 * brand_palette_guard `card_boxless` WARNING (not a critical fail) — an
 * accepted, documented UI-chrome exception for chat authenticity. See
 * TresMensajesDeAnoche.decision_log.json, decision d-006.
 *
 * Three variants share one component (same phone screen/thread across the
 * reel — narrative continuity, not repetition of a "hero-component-spine"):
 *   - "stack": messages cascade in with timestamps.
 *   - "punch": one message is emphasized (used inside a NamedCamera punch-in
 *     Sequence by the parent composition — this component does not move the
 *     camera itself).
 *   - "bot_reply": typing indicator -> bot bubble -> ticks flip to ember ->
 *     appointment confirmation card.
 *
 * Added 2026-08-20 for "Tres mensajes de anoche" (blog->reel hook pilot).
 */

export interface ChatMessage {
  text: string;
  time: string;
  outgoing?: boolean;
}

interface BubbleProps {
  message: ChatMessage;
  enterAtFrame: number;
  emphasize?: boolean;
  /** Dim a non-target bubble during a punch beat (fixed real 2026-08-20:
   * bubble-opacity dimming is cheap and reversible, unlike layout changes,
   * and gives the eye somewhere unambiguous to land). */
  dim?: boolean;
  /** Color for the timestamp/tick line. Defaults to BRAND.muted. Callers
   * pass BRAND.accent to actually deliver the "el tick pasa a ember cuando
   * se lee" promise (fixed real 2026-08-20 — the label text used to change
   * from "enviado ✓" to "leído ✓✓" without ever changing color, so the
   * promised ember tick never rendered in the shipped pixels — caught in
   * post-render final_review frame-sampling). */
  timeColor?: string;
}

const Bubble: React.FC<BubbleProps> = ({ message, enterAtFrame, emphasize, dim, timeColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - enterAtFrame;
  const s = spring({ frame: local, fps, config: SPRINGS.premium });
  const opacity = interpolate(local, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(s, [0, 1], [24, 0]);
  const emphasisScale = emphasize
    ? interpolate(local, [0, 14], [1, 1.1], {
        easing: EASING.outExpo,
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 1;
  const dimOpacity = dim
    ? interpolate(local, [0, 14], [1, 0.32], {
        easing: EASING.outExpo,
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 1;

  return (
    <div
      style={{
        alignSelf: message.outgoing ? "flex-end" : "flex-start",
        maxWidth: "78%",
        opacity: opacity * dimOpacity,
        transform: `translateY(${translateY}px) scale(${emphasisScale})`,
      }}
    >
      <div
        style={{
          background: BRAND.surface,
          border: message.outgoing || emphasize ? `1px solid ${BRAND.accent}` : "1px solid transparent",
          borderRadius: 18,
          padding: "14px 18px",
          color: BRAND.text,
          fontSize: 30,
          fontFamily: "Inter, system-ui, sans-serif",
          lineHeight: 1.32,
        }}
      >
        {message.text}
      </div>
      <div
        style={{
          marginTop: 6,
          fontSize: 18,
          fontFamily: "JetBrains Mono, monospace",
          color: timeColor ?? BRAND.muted,
          textAlign: message.outgoing ? "right" : "left",
        }}
      >
        {message.time}
      </div>
    </div>
  );
};

const PhoneFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill style={{ background: BRAND.bg, justifyContent: "center", alignItems: "center" }}>
    <div
      style={{
        width: "84%",
        height: "62%",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        justifyContent: "flex-end",
      }}
    >
      {children}
    </div>
  </AbsoluteFill>
);

/** variant="stack" — three incoming messages cascade in, 24-frame stagger. */
export const ChatThreadStack: React.FC<{ messages: ChatMessage[] }> = ({ messages }) => {
  const frame = useCurrentFrame();
  const stagger = 24; // 1.0s at 24fps — deliberate pacing, not a rapid dump
  // Micro-drift: a very slight virtual-camera settle over the whole layer
  // (lever from premium-craft-standards — never a fully static UI card).
  const drift = interpolate(frame, [0, 144], [1.0, 1.015], {
    easing: EASING.camera,
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ transform: `scale(${drift})` }}>
      <PhoneFrame>
        {messages.map((m, i) => (
          <Bubble key={i} message={m} enterAtFrame={i * stagger} />
        ))}
      </PhoneFrame>
    </AbsoluteFill>
  );
};

/** variant="punch" — a real digital punch-in: the WHOLE layer scales up
 * fast (not just +6% on one bubble), the two non-target bubbles dim to 32%
 * opacity, and the target bubble gets an ember hairline + a stronger scale
 * bump. Fixed real 2026-08-20 (post-render final_review): the original cut
 * only nudged one bubble +6% inside an otherwise-identical frame to the
 * previous scene — in the rendered pixels it read as visually indistinguishable
 * from `whatsapp_stack`, which under-delivers the declared shot_intent
 * ("el gut-punch: el costo real de no responder rapido") on the reel's own
 * emotional fulcrum. This version composites its own camera (no external
 * NamedCamera needed) so the punch reads even as a single still frame. */
export const ChatThreadPunch: React.FC<{ messages: ChatMessage[]; punchIndex: number }> = ({
  messages,
  punchIndex,
}) => {
  const frame = useCurrentFrame();
  const layerScale = interpolate(frame, [0, 10], [1, 1.14], {
    easing: EASING.outExpo,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ transform: `scale(${layerScale})` }}>
      <PhoneFrame>
        {messages.map((m, i) => (
          <Bubble
            key={i}
            message={m}
            enterAtFrame={0}
            emphasize={i === punchIndex}
            dim={i !== punchIndex}
          />
        ))}
      </PhoneFrame>
    </AbsoluteFill>
  );
};

/** variant="bot_reply" — typing indicator -> bot bubble -> ticks flip ember
 * -> appointment confirmation card. */
export const ChatThreadBotReply: React.FC<{
  threadMessages: ChatMessage[];
  replyText: string;
  appointment: { service: string; when: string };
}> = ({ threadMessages, replyText, appointment }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const drift = interpolate(frame, [0, 156], [1.0, 1.02], {
    easing: EASING.camera,
    extrapolateRight: "clamp",
  });

  const TYPING_START = 6;
  const TYPING_FRAMES = 36; // 1.5s
  const REPLY_AT = TYPING_START + TYPING_FRAMES;
  const CARD_AT = REPLY_AT + 42; // 1.75s after the reply lands

  const showTyping = frame >= TYPING_START && frame < REPLY_AT;

  const cardSpring = spring({ frame: frame - CARD_AT, fps, config: SPRINGS.premium });
  const cardOpacity = interpolate(cardSpring, [0, 1], [0, 1]);
  const cardY = interpolate(cardSpring, [0, 1], [20, 0]);

  return (
    <AbsoluteFill style={{ transform: `scale(${drift})` }}>
      <PhoneFrame>
        {threadMessages.map((m, i) => (
          <Bubble key={i} message={m} enterAtFrame={0} />
        ))}

        {showTyping && (
          <div style={{ alignSelf: "flex-start", display: "flex", gap: 6, padding: "10px 16px" }}>
            {[0, 1, 2].map((d) => {
              const dotPhase = ((frame - TYPING_START) / 8 + d * 0.33) % 1;
              const dotOpacity = interpolate(dotPhase, [0, 0.5, 1], [0.3, 1, 0.3]);
              return (
                <div
                  key={d}
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: BRAND.muted,
                    opacity: dotOpacity,
                  }}
                />
              );
            })}
          </div>
        )}

        {frame >= REPLY_AT && (
          <Bubble
            message={{
              text: replyText,
              time: frame >= REPLY_AT + 12 ? "leído ✓✓" : "enviado ✓",
              outgoing: true,
            }}
            enterAtFrame={REPLY_AT}
            timeColor={frame >= REPLY_AT + 12 ? BRAND.accent : BRAND.muted}
          />
        )}

        {frame >= CARD_AT && (
          <div
            style={{
              alignSelf: "flex-end",
              opacity: cardOpacity,
              transform: `translateY(${cardY}px)`,
              background: BRAND.surface,
              border: `1px solid ${BRAND.accent}`,
              borderRadius: 12,
              padding: "16px 20px",
              maxWidth: "78%",
            }}
          >
            <div style={{ color: BRAND.accent, fontSize: 20, fontWeight: 700, fontFamily: "Inter, system-ui, sans-serif" }}>
              Cita confirmada
            </div>
            <div style={{ color: BRAND.text, fontSize: 24, fontFamily: "Inter, system-ui, sans-serif", marginTop: 4 }}>
              {appointment.service}
            </div>
            <div style={{ color: BRAND.muted, fontSize: 20, fontFamily: "Inter, system-ui, sans-serif", marginTop: 2 }}>
              {appointment.when}
            </div>
          </div>
        )}
      </PhoneFrame>
    </AbsoluteFill>
  );
};
