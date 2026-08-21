import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BRAND, SPRINGS } from "../theme";

export interface QualifyTag {
  label: string;
  value: string;
}

/**
 * TagRevealList — boxless, ember-only reveal of qualification tags. Built
 * for CasoMarinoHVAC (reel 3 of the chatbot-whatsapp-para-negocios series)
 * to dramatize the STEPS the bot verifies per the blog's own Marino HVAC
 * bullets (servicio / zona / urgencia / siguiente paso) — deliberately NO
 * fabricated numbers or percentages: the post gives no numeric outcome for
 * this case, so none is shown here (see CasoMarinoHVAC.decision_log.json
 * d-002, the anti-claims audit for this scene).
 *
 * Each row: label in muted gray, value in near-white, and a thin ember
 * vertical tick that grows to the left of the row on entry (same
 * "border-draw" idea as the stock CalloutBox but WITHOUT its off-brand
 * white fill/boxShadow — fully boxless, near-black background only, no new
 * accent color introduced). Added 2026-08-20.
 */
export const TagRevealList: React.FC<{ tags: QualifyTag[]; staggerFrames?: number }> = ({
  tags,
  staggerFrames = 22,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ background: BRAND.bg, justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 30, width: "80%" }}>
        {tags.map((tag, i) => {
          const start = i * staggerFrames;
          const s = spring({ frame: frame - start, fps, config: SPRINGS.premium });
          const opacity = interpolate(frame - start, [0, 10], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const tickHeight = interpolate(s, [0, 1], [0, 100]);
          return (
            <div key={tag.label} style={{ display: "flex", alignItems: "stretch", gap: 18, opacity }}>
              <div
                style={{
                  width: 3,
                  background: BRAND.accent,
                  height: `${tickHeight}%`,
                  alignSelf: "center",
                  minHeight: 2,
                }}
              />
              <div>
                <div
                  style={{
                    fontSize: 20,
                    color: BRAND.muted,
                    fontFamily: "Inter, system-ui, sans-serif",
                    letterSpacing: "0.03em",
                  }}
                >
                  {tag.label}
                </div>
                <div
                  style={{
                    fontSize: 32,
                    color: BRAND.text,
                    fontFamily: "Inter, system-ui, sans-serif",
                    fontWeight: 600,
                    marginTop: 2,
                  }}
                >
                  {tag.value}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
