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
import { StatReveal } from "../components/StatReveal";
import { BrandClose } from "../components/BrandClose";
import { FilmGrade } from "../components/FilmGrade";

/**
 * LoQueRecibesDespues — reel 3/4 (caso real, Marino HVAC) de la serie
 * reels-consultoria-serie. Segunda y ULTIMA escena i2v del presupuesto
 * de la serie (reel 1 tuvo la primera — doctrina: maximo 1 hero por
 * reel, ver decision_log d-002).
 *
 * La cifra "$4,400/mes" + "nueve horas libres por semana" es LITERAL del
 * post ("cuando trabajamos con Marino HVAC en Miami... Alain perdia
 * aproximadamente nueve horas por semana... Tras implementar, Alain
 * recupero aproximadamente $4,400 mensuales... y libero las nueve horas
 * semanales") — atribuida en el MISMO frame como "estimacion de
 * AetherLogik a partir de los datos del cliente" (regla dura, coincide
 * EXACTO con el mismo caso ya usado en reels-hvac-serie/
 * LosNumerosDeMarinoHVAC.tsx y reels-ia-miami-serie/
 * TresNegociosTresResultados.tsx — mismo cliente, mismo caso, cifra
 * ancla identica, sin inventar variante).
 *
 * Frame plan @24fps: cold_open_hero 120f (5.0s) + que_recibes 144f
 * (6.0s) + stat_reveal_marino 216f (9.0s) + honesty_beat 144f (6.0s) +
 * brand_close 192f (8.0s) = 816f = 34.000s exacto
 * (tail_padding_seconds: 0 en props).
 *
 * Ver LoQueRecibesDespues.art-direction.md, .decision_log.json,
 * .scene_plan.json y .gates.json.
 */
export interface LoQueRecibesDespuesProps {
  heroVideoSrc: string;
  musicSrc: string;
  logoSrc: string;
  sfxChimeSrc?: string;
  [key: string]: unknown;
}

const S1 = 120;
const S2 = 144;
const S3 = 216;
const S4 = 144;
const S5 = 192;

export const LO_QUE_RECIBES_DESPUES_TOTAL_FRAMES = S1 + S2 + S3 + S4 + S5; // 816

const START1 = 0;
const START2 = START1 + S1; // 120
const START3 = START2 + S2; // 264
const START4 = START3 + S3; // 480
const START5 = START4 + S4; // 624

function musicVolume(frame: number): number {
  const duckStart = START3 - 10;
  const duckEnd = START3 + 16;
  if (frame < duckStart) return 1.0;
  if (frame < duckEnd) return interpolate(frame, [duckStart, duckEnd], [1.0, 0.6], { extrapolateRight: "clamp" });
  return interpolate(frame, [duckEnd, duckEnd + 60], [0.6, 1.0], { extrapolateRight: "clamp" });
}

export const LoQueRecibesDespues: React.FC<LoQueRecibesDespuesProps> = ({
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
          <Audio src={sfxChimeSrc} volume={0.5} />
        </Sequence>
      )}

      {/* Scene 1 — cold_open_hero. UNICA (2a y ultima del presupuesto de
          la serie) escena i2v: dueno de HVAC en Miami, luz golden-hour,
          revisando una factura correcta en tablet, alivio. */}
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
      </Sequence>

      {/* Scene 2 — que_recibes. Fiel al post ("no te quedas solo con
          notas mentales... recibes un documento que explica exactamente
          que se puede hacer, como funcionaria, y que resultados podrias
          esperar"). */}
      <Sequence from={START2} durationInFrames={S2} name="que_recibes">
        <KineticHeadline
          lines={["No te quedas con notas.", "Recibes un plan: que automatizar,", "como funciona, que esperar."]}
          accentWord="plan:"
          fontSize={34}
          position="center"
        />
      </Sequence>

      {/* Scene 3 — stat_reveal_marino. Caso real, cifra literal del
          post, atribuida en el mismo frame. */}
      <Sequence from={START3} durationInFrames={S3} name="stat_reveal_marino">
        <StatReveal stat="$4,400/mes" label="recuperados en facturacion, mas 9 horas libres por semana" accentColor={BRAND.accent} position="center" />
        <HeadlineOverlay text="Marino HVAC, Miami . estimacion de AetherLogik a partir de los datos del cliente." position="bottom" scrim fontSize={19} />
      </Sequence>

      {/* Scene 4 — honesty_beat. Fiel al post ("Si durante el
          diagnostico determinamos que la automatizacion no seria
          efectiva para tu caso especifico, tambien te lo decimos
          claramente"). */}
      <Sequence from={START4} durationInFrames={S4} name="honesty_beat">
        <KineticHeadline
          lines={["Y si no hay un buen fit,", "te lo decimos directamente."]}
          fontSize={38}
          position="center"
        />
      </Sequence>

      {/* Scene 5 — brand_close. CTA al reel 4 (cierre real de la serie). */}
      <Sequence from={START5} durationInFrames={S5} name="brand_close">
        <FilmGrade vignette={0.35} grainOpacity={0.1}>
          <BrandClose
            wordmark="AetherLogik"
            tagline="El diagnostico gratuito de IA para tu negocio."
            url="aetherlogik.com/blog . por que es gratis, y como agendarlo, en el proximo video ->"
            logoSrc={logoSrc}
            accentColor={BRAND.accent}
            backgroundColor={BRAND.bg}
          />
        </FilmGrade>
      </Sequence>
    </AbsoluteFill>
  );
};
