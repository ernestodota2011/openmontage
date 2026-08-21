import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BRAND, EASING, SPRINGS } from "../theme";
import { EmberThread } from "./EmberThread";

/**
 * CapabilitySceneKit — bespoke atelier scenes for "Que hace un chatbot
 * real" (reel 2 of the chatbot-whatsapp-para-negocios blog->reel series).
 * Two capability beats (1 "responde en segundos" and 4 "escala a humano")
 * need a visual treatment that ChatThreadScene's three existing variants
 * (stack/punch/bot_reply) don't cover without repeating the exact same
 * appointment-card device already used for beat 3 — so this file adds two
 * new, purpose-built scenes that stay in the same on-brand chat visual
 * language (same bubble styling tokens from theme.ts) without importing
 * ChatThreadScene's non-exported internals. Added 2026-08-20 for the
 * reels-chatbot-serie branch (continuation of the GO'd pilot "Tres
 * mensajes de anoche").
 */

export interface SimpleMessage {
  text: string;
  time: string;
  outgoing?: boolean;
}

const MiniBubble: React.FC<{ message: SimpleMessage; enterAtFrame: number }> = ({
  message,
  enterAtFrame,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - enterAtFrame;
  const s = spring({ frame: local, fps, config: SPRINGS.premium });
  const opacity = interpolate(local, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(s, [0, 1], [24, 0]);
  return (
    <div
      style={{
        alignSelf: message.outgoing ? "flex-end" : "flex-start",
        maxWidth: "78%",
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div
        style={{
          background: BRAND.surface,
          border: message.outgoing ? `1px solid ${BRAND.accent}` : "1px solid transparent",
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
          color: message.outgoing ? BRAND.accent : BRAND.muted,
          textAlign: message.outgoing ? "right" : "left",
        }}
      >
        {message.time}
      </div>
    </div>
  );
};

/**
 * QuickReplyBeat — dramatizes "responde en segundos, no en horas" with an
 * ECU on a single exchange: the incoming message lands, a big ember
 * counter ticks up the elapsed seconds, and the reply arrives right as it
 * completes. Deliberately NOT the appointment-card flow (that belongs to
 * beat 3 "agenda o deriva" via ChatThreadBotReply) — this beat is about
 * SPEED, not scheduling, so it needed its own device to avoid repeating
 * beat 3's card (slideshow_risk repetition dimension).
 */
export const QuickReplyBeat: React.FC<{
  incoming: SimpleMessage;
  replyText: string;
  seconds: number;
}> = ({ incoming, replyText, seconds }) => {
  const frame = useCurrentFrame();
  const COUNTER_START = 22;
  // Deliberately faster than real-time (10 frames per dramatized second, not
  // 24) — a dramatized elapsed-time read for a ~1.7s beat-internal count-up,
  // not a literal stopwatch.
  const COUNTER_FRAMES = Math.round(seconds * 10);
  const REPLY_AT = COUNTER_START + COUNTER_FRAMES + 6;

  const counterProgress = interpolate(
    frame,
    [COUNTER_START, COUNTER_START + COUNTER_FRAMES],
    [0, seconds],
    { easing: EASING.outExpo, extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const counterOpacity = interpolate(frame, [COUNTER_START, COUNTER_START + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const counterHoldOpacity = interpolate(
    frame,
    [REPLY_AT - 4, REPLY_AT + 14],
    [1, 0.28],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ background: BRAND.bg, justifyContent: "center", alignItems: "center" }}>
      <div style={{ width: "84%", display: "flex", flexDirection: "column", gap: 22 }}>
        <MiniBubble message={incoming} enterAtFrame={0} />
        <div
          style={{
            alignSelf: "center",
            opacity: counterOpacity * counterHoldOpacity,
            display: "flex",
            alignItems: "baseline",
            gap: 10,
            marginTop: 8,
          }}
        >
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              color: BRAND.accent,
              fontFamily: "Inter, system-ui, sans-serif",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {counterProgress.toFixed(1)}
          </div>
          <div style={{ fontSize: 26, color: BRAND.muted, fontFamily: "Inter, system-ui, sans-serif" }}>
            segundos
          </div>
        </div>
        {frame >= REPLY_AT && (
          <MiniBubble
            message={{ text: replyText, time: "respondido ✓", outgoing: true }}
            enterAtFrame={REPLY_AT}
          />
        )}
      </div>
    </AbsoluteFill>
  );
};

/**
 * EscalateBeat — dramatizes "escala a humano sin drama, con contexto". A
 * client message that clearly needs a person, then a handoff moment (the
 * EmberThread sweep, reused here ONCE as the "invisible intelligence
 * carrying the handoff" motif — same documented use as reel 1's bridge
 * between scenes, not a repeated hero-component-spine within THIS reel,
 * where it appears exactly once), then a badge confirming the transfer
 * WITH context — the blog's exact promise ("avisa a tu equipo y mantiene
 * el contexto para que no tengan que empezar de cero").
 */
export const EscalateBeat: React.FC<{ message: SimpleMessage; agentName: string }> = ({
  message,
  agentName,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const SWEEP_AT = 40;
  const BADGE_AT = SWEEP_AT + 26;
  const badgeSpring = spring({ frame: frame - BADGE_AT, fps, config: SPRINGS.premium });
  const badgeOpacity = interpolate(badgeSpring, [0, 1], [0, 1]);
  const badgeY = interpolate(badgeSpring, [0, 1], [18, 0]);
  const messageDim = interpolate(frame, [SWEEP_AT, SWEEP_AT + 14], [1, 0.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: BRAND.bg, justifyContent: "center", alignItems: "center" }}>
      <div style={{ width: "84%", display: "flex", flexDirection: "column", gap: 24, position: "relative" }}>
        <div style={{ opacity: messageDim }}>
          <MiniBubble message={message} enterAtFrame={0} />
        </div>
        {frame >= BADGE_AT && (
          <div
            style={{
              alignSelf: "flex-start",
              opacity: badgeOpacity,
              transform: `translateY(${badgeY}px)`,
              border: `1px solid ${BRAND.accent}`,
              borderRadius: 12,
              padding: "14px 20px",
              maxWidth: "82%",
            }}
          >
            <div style={{ color: BRAND.accent, fontSize: 18, fontWeight: 700, fontFamily: "Inter, system-ui, sans-serif" }}>
              Transferido a {agentName}
            </div>
            <div style={{ color: BRAND.muted, fontSize: 20, fontFamily: "Inter, system-ui, sans-serif", marginTop: 2 }}>
              con el contexto completo de la conversación
            </div>
          </div>
        )}
      </div>
      {frame >= SWEEP_AT && frame < SWEEP_AT + 30 && (
        <AbsoluteFill>
          <EmberThread backgroundColor="transparent" accentColor={BRAND.accent} sweepSeconds={30 / fps} particleCount={0} />
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
