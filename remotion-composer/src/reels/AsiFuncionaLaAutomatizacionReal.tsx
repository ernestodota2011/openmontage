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
import { ChatThreadBotReply, ChatMessage } from "../components/ChatThreadScene";
import { QuickReplyBeat, EscalateBeat, SimpleMessage } from "../components/CapabilitySceneKit";
import { ClinicSyncBoard, ClinicLocation } from "../components/ClinicSceneKit";

/**
 * AsiFuncionaLaAutomatizacionReal — reel 2/4 de la serie reels-clinicas-serie
 * (continuacion del gancho GO-pending "El ciclo que te cuesta horas").
 * Reel didactico: los 3 pilares reales de la automatizacion de citas +
 * el punto de escalacion (seccion 'Como funciona la automatizacion real de
 * citas?' del post). 100% motion-autorado (CERO i2v/stills generativos —
 * cada beat es UI de mensajeria/agenda o tipografia cinetica), reusando
 * QuickReplyBeat/EscalateBeat (CapabilitySceneKit, GO'd) + ChatThreadBotReply
 * (ChatThreadScene, GO'd) + el nuevo ClinicSyncBoard (ClinicSceneKit.tsx),
 * para que ninguno de los 4 beats comparta el mismo device visual
 * (evita hero-component-spine / la dimension "repetition" de slideshow_risk).
 *
 * Frame plan @24fps: cold_open_hook 72f (3.0s) + pilar1_captura 204f (8.5s)
 * + pilar2_confirma 216f (9.0s) + pilar3_sincroniza 216f (9.0s) +
 * si_algo_falla 204f (8.5s) + punch_montage 96f (4.0s) + brand_close 120f
 * (5.0s) = 1128f = 47.000s exacto (tail_padding_seconds: 0 en props).
 *
 * Ver AsiFuncionaLaAutomatizacionReal.art-direction.md, .decision_log.json,
 * .scene_plan.json y .gates.json (auto-score pre-render).
 */
export interface AsiFuncionaLaAutomatizacionRealProps {
  musicSrc: string;
  logoSrc: string;
  sfxChipSrc?: string;
  sfxConfirmSrc?: string;
  sfxWhooshSrc?: string;
  [key: string]: unknown;
}

const S1 = 72;
const S2 = 204;
const S3 = 216;
const S4 = 216;
const S5 = 204;
const S6 = 96;
const S7 = 120;

export const ASI_FUNCIONA_LA_AUTOMATIZACION_REAL_TOTAL_FRAMES = S1 + S2 + S3 + S4 + S5 + S6 + S7; // 1128

const START1 = 0;
const START2 = START1 + S1; // 72
const START3 = START2 + S2; // 276
const START4 = START3 + S3; // 492
const START5 = START4 + S4; // 708
const START6 = START5 + S5; // 912
const START7 = START6 + S6; // 1008

function musicVolume(frame: number): number {
  // Dos caidas sutiles: antes de si_algo_falla (el beat mas serio) y antes
  // del punch montage, liberando hacia el brand_close.
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

const PILAR1_INCOMING: SimpleMessage = { text: "Hola, quisiera una cita para un chequeo esta semana.", time: "9:14pm" };
const PILAR2_THREAD: ChatMessage[] = [{ text: "Tienen espacio esta semana para un chequeo?", time: "11:02am" }];
const PILAR3_LOCATIONS: ClinicLocation[] = [
  { name: "Sede Centro", slot: "Jue 10:00am" },
  { name: "Sede Norte", slot: "Jue 10:00am" },
  { name: "Sede Sur", slot: "Jue 10:00am" },
];
const ESCALA_INCOMING: SimpleMessage = { text: "Prefiero hablar con alguien antes de agendar.", time: "9:18pm" };

export const AsiFuncionaLaAutomatizacionReal: React.FC<AsiFuncionaLaAutomatizacionRealProps> = ({
  musicSrc,
  logoSrc,
  sfxChipSrc,
  sfxConfirmSrc,
  sfxWhooshSrc,
}) => {
  return (
    <AbsoluteFill style={{ background: BRAND.bg }}>
      <Audio src={musicSrc} volume={musicVolume} />

      {sfxChipSrc && (
        <Sequence from={START2 + 20} durationInFrames={20} name="sfx_chip_pilar1">
          <Audio src={sfxChipSrc} volume={0.5} />
        </Sequence>
      )}
      {sfxConfirmSrc && (
        <Sequence from={START3 + 90} durationInFrames={20} name="sfx_confirm_pilar2">
          <Audio src={sfxConfirmSrc} volume={0.5} />
        </Sequence>
      )}
      {sfxWhooshSrc && (
        <Sequence from={START5 + 40} durationInFrames={20} name="sfx_whoosh_escalate">
          <Audio src={sfxWhooshSrc} volume={0.7} />
        </Sequence>
      )}

      {/* Scene 1 — cold_open_hook. Puente desde el reel 1, tipografia pura. */}
      <Sequence from={START1} durationInFrames={S1} name="cold_open_hook">
        <KineticHeadline
          lines={["No es magia.", "Son 3 piezas", "que ya conoces, conectadas."]}
          fontSize={58}
          position="center"
        />
      </Sequence>

      {/* Scene 2 — pilar1_captura. Reuso justificado de QuickReplyBeat. */}
      <Sequence from={START2} durationInFrames={S2} name="pilar1_captura">
        <QuickReplyBeat
          incoming={PILAR1_INCOMING}
          replyText="Hola! Cuentame que servicio necesitas y te ayudo ahora mismo."
          seconds={4}
        />
        <HeadlineOverlay text="1 . Captura automatica desde cualquier canal" position="bottom" scrim fontSize={32} />
      </Sequence>

      {/* Scene 3 — pilar2_confirma. Reuso justificado de ChatThreadBotReply. */}
      <Sequence from={START3} durationInFrames={S3} name="pilar2_confirma">
        <ChatThreadBotReply
          threadMessages={PILAR2_THREAD}
          replyText="Claro, tengo espacio el jueves. Te confirmo?"
          appointment={{ service: "Consulta - recordatorio 24h y 2h antes", when: "Jueves, 10:00-10:30am" }}
        />
        <HeadlineOverlay text="2 . Confirmacion y recordatorio sin que nadie lo escriba" position="bottom" scrim fontSize={30} />
      </Sequence>

      {/* Scene 4 — pilar3_sincroniza. Device NUEVO: ClinicSyncBoard. */}
      <Sequence from={START4} durationInFrames={S4} name="pilar3_sincroniza">
        <ClinicSyncBoard locations={PILAR3_LOCATIONS} syncAtFrame={60} />
        <HeadlineOverlay text="3 . Sincronizacion entre sedes y con el expediente" position="bottom" scrim fontSize={30} />
      </Sequence>

      {/* Scene 5 — si_algo_falla. Reuso justificado de EscalateBeat. */}
      <Sequence from={START5} durationInFrames={S5} name="si_algo_falla">
        <EscalateBeat message={ESCALA_INCOMING} agentName="Carla" />
        <HeadlineOverlay text="Si algo se sale del guion, un humano lo resuelve" position="bottom" scrim fontSize={30} />
      </Sequence>

      {/* Scene 6 — punch_montage. Recap rapido de los 3 pilares + escalacion. */}
      <Sequence from={START6} durationInFrames={S6} name="punch_montage">
        <FilmGrade vignette={0.3} grainOpacity={0.08}>
          <KineticHeadline
            lines={["Captura.", "Confirma.", "Sincroniza.", "Escala si hace falta."]}
            accentWord="Escala"
            fontSize={50}
            position="center"
            revealSeconds={0.5}
            staggerSeconds={0.55}
          />
        </FilmGrade>
      </Sequence>

      {/* Scene 7 — brand_close. CTA al reel 3 de la serie. */}
      <Sequence from={START7} durationInFrames={S7} name="brand_close">
        <FilmGrade vignette={0.35} grainOpacity={0.1}>
          <BrandClose
            wordmark="AetherLogik"
            tagline="Asi funciona por dentro."
            url="aetherlogik.com/blog . el caso real, en el proximo video ->"
            logoSrc={logoSrc}
            accentColor={BRAND.accent}
            backgroundColor={BRAND.bg}
          />
        </FilmGrade>
      </Sequence>
    </AbsoluteFill>
  );
};
