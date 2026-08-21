import {
  AbsoluteFill,
  Audio,
  OffthreadVideo,
  Sequence,
  interpolate,
} from "remotion";
import { BRAND } from "../theme";
import { EmberThread } from "../components/EmberThread";
import { KineticHeadline } from "../components/KineticHeadline";
import { HeadlineOverlay } from "../components/HeadlineOverlay";
import { StatReveal } from "../components/StatReveal";
import { TagRevealList, QualifyTag } from "../components/TagRevealList";
import { BrandClose } from "../components/BrandClose";
import { FilmGrade } from "../components/FilmGrade";

/**
 * LosNumerosDeMarinoHVAC — reel 3/4 (caso real) de la serie
 * reels-hvac-serie. NOMBRE DELIBERADAMENTE DISTINTO de "CasoMarinoHVAC"
 * (el reel YA existente en el fork, de reels-chatbot-serie — ese cubre el
 * angulo del asistente de WhatsApp; este reel cubre el angulo de
 * FACTURACION, con cifras distintas y exclusivas de esa seccion del
 * post). Nombre calcado del H2 del post: "Caso real: los numeros de
 * Marino HVAC".
 *
 * TODAS las cifras de este reel son las del post, con atribucion COMPLETA
 * en el MISMO frame donde aparecen (regla dura de la mision): $50/trabajo,
 * 88 facturas/mes, $4,400/mes, 36 horas/mes, "menos de dos meses" de
 * retorno — y el footnote del post ("estas cifras son estimaciones
 * nuestras a partir de los datos del cliente") se preserva tal cual, en
 * el mismo frame que la cifra de $4,400.
 *
 * Hibrido: UN solo hero real i2v (cold_open_hero — Alain Marino con su
 * factura digital, Miami de dia, contraste deliberado con el reel 1
 * nocturno) + el resto es 100% motion-autorado (StatReveal + TagRevealList
 * + tipografia cinetica), misma disciplina que las 4 series anteriores.
 *
 * Frame plan @24fps: cold_open_hero 120f (5.0s) + EmberThread bridge 12f
 * (0.5s) + before_after 108f (4.5s) + stat_reveal 240f (10.0s) +
 * outcome_reveal 264f (11.0s) + EmberThread bridge 12f (0.5s) +
 * quote_line 144f (6.0s) + brand_close 180f (7.5s) = 1080f = 45.000s
 * exacto (tail_padding_seconds: 0).
 *
 * Ver LosNumerosDeMarinoHVAC.art-direction.md, .decision_log.json,
 * .scene_plan.json y .gates.json.
 */
export interface LosNumerosDeMarinoHVACProps {
  heroVideoSrc: string;
  musicSrc: string;
  logoSrc: string;
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

export const LOS_NUMEROS_DE_MARINO_HVAC_TOTAL_FRAMES = S1 + BRIDGE_A + S2 + S3 + S4 + BRIDGE_B + S5 + S6; // 1080

const START1 = 0;
const STARTB1 = START1 + S1; // 120
const START2 = STARTB1 + BRIDGE_A; // 132
const START3 = START2 + S2; // 240
const START4 = START3 + S3; // 480
const STARTB2 = START4 + S4; // 744
const START5 = STARTB2 + BRIDGE_B; // 756
const START6 = START5 + S5; // 900

const OUTCOME_TAGS: QualifyTag[] = [
  { label: "TIEMPO", value: "36 horas liberadas al mes" },
  { label: "RETORNO", value: "La inversion se pago sola en menos de dos meses" },
  { label: "RESULTADO", value: "Facturas correctas desde la primera vez" },
];

function musicVolume(frame: number): number {
  const duckStart = START3 - 10;
  const duckEnd = START3 + 16;
  if (frame < duckStart) return 1.0;
  if (frame < duckEnd) return interpolate(frame, [duckStart, duckEnd], [1.0, 0.55], { extrapolateRight: "clamp" });
  return interpolate(frame, [duckEnd, duckEnd + 50], [0.55, 1.0], { extrapolateRight: "clamp" });
}

export const LosNumerosDeMarinoHVAC: React.FC<LosNumerosDeMarinoHVACProps> = ({
  heroVideoSrc,
  musicSrc,
  logoSrc,
  sfxChimeSrc,
}) => {
  return (
    <AbsoluteFill style={{ background: BRAND.bg }}>
      <Audio src={musicSrc} volume={musicVolume} />

      {sfxChimeSrc && (
        <Sequence from={START3 + 6} durationInFrames={30} name="sfx_chime_stat">
          <Audio src={sfxChimeSrc} volume={0.55} />
        </Sequence>
      )}
      {sfxChimeSrc && (
        <Sequence from={START4 + 6} durationInFrames={30} name="sfx_chime_outcome">
          <Audio src={sfxChimeSrc} volume={0.4} />
        </Sequence>
      )}

      {/* Scene 1 — cold_open_hero. i2v real: Alain Marino, dueno de Marino
          HVAC, con su factura digital en el telefono, Miami de dia —
          contraste deliberado con la noche/papel del reel 1. */}
      <Sequence from={START1} durationInFrames={S1} name="cold_open_hero">
        <FilmGrade vignette={0.35} grainOpacity={0.1}>
          <AbsoluteFill style={{ background: BRAND.bg }}>
            <OffthreadVideo
              src={heroVideoSrc}
              muted
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </AbsoluteFill>
        </FilmGrade>
        <HeadlineOverlay text="Alain Marino, dueno de Marino HVAC . Miami." position="bottom" scrim fontSize={26} />
      </Sequence>

      <Sequence from={STARTB1} durationInFrames={BRIDGE_A} name="EmberThread_bridge_a">
        <EmberThread backgroundColor={BRAND.bg} accentColor={BRAND.accent} sweepSeconds={0.5} />
      </Sequence>

      {/* Scene 2 — before_after. Cifra propia del caso, fiel al post. */}
      <Sequence from={START2} durationInFrames={S2} name="before_after">
        <KineticHeadline
          lines={["Antes de automatizar,", "perdia $50 por cada trabajo."]}
          accentWord="$50"
          fontSize={44}
          position="center"
        />
      </Sequence>

      {/* Scene 3 — stat_reveal. La cifra central del caso, CON ATRIBUCION
          COMPLETA EN EL MISMO FRAME (regla dura de la mision): el post
          mismo aclara "estas cifras son estimaciones nuestras a partir
          de los datos del cliente" — se preserva esa atribucion tal cual,
          en el mismo frame que la cifra. */}
      <Sequence from={START3} durationInFrames={S3} name="stat_reveal">
        <StatReveal stat="$4,400" label="perdidos al mes, en 88 facturas" accentColor={BRAND.accent} position="center" />
        <HeadlineOverlay text="Estimacion de AetherLogik a partir de los datos del cliente." position="bottom" scrim fontSize={22} />
      </Sequence>

      {/* Scene 4 — outcome_reveal. Los 3 resultados reales del caso,
          fieles al post (tiempo liberado, retorno, resultado). */}
      <Sequence from={START4} durationInFrames={S4} name="outcome_reveal">
        <TagRevealList tags={OUTCOME_TAGS} staggerFrames={60} />
      </Sequence>

      <Sequence from={STARTB2} durationInFrames={BRIDGE_B} name="EmberThread_bridge_b">
        <EmberThread backgroundColor={BRAND.bg} accentColor={BRAND.accent} sweepSeconds={0.5} />
      </Sequence>

      {/* Scene 5 — quote_line. Cita textual de Alain Marino, atribuida en
          el mismo frame (nombre publico en el post, cliente entregado). */}
      <Sequence from={START5} durationInFrames={S5} name="quote_line">
        <AbsoluteFill style={{ background: BRAND.bg }}>
          <KineticHeadline
            lines={["\"Ahora las facturas salen bien", "desde la primera vez", "y tenemos mas tiempo para los clientes.\""]}
            fontSize={36}
            position="center"
          />
          <HeadlineOverlay text="— Alain Marino, Marino HVAC" color={BRAND.muted} position="bottom" fontSize={22} />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 6 — brand_close. CTA al reel 4 (cierre) de la serie. */}
      <Sequence from={START6} durationInFrames={S6} name="brand_close">
        <FilmGrade vignette={0.35} grainOpacity={0.1}>
          <BrandClose
            wordmark="AetherLogik"
            tagline="No es magia. Es no perder lo que el trabajo ya genero."
            url="aetherlogik.com/blog . que necesitas para empezar, en el proximo video ->"
            logoSrc={logoSrc}
            accentColor={BRAND.accent}
            backgroundColor={BRAND.bg}
          />
        </FilmGrade>
      </Sequence>
    </AbsoluteFill>
  );
};
