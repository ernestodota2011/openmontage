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
import { BrandClose } from "../components/BrandClose";
import { FilmGrade } from "../components/FilmGrade";

/**
 * TresNegociosTresResultados — reel 3/4 (casos reales) de la serie
 * reels-ia-miami-serie. A diferencia de las 5 series anteriores (que
 * profundizan en UN solo caso por reel), este post paraguas presenta
 * TRES casos en la misma seccion ("Casos reales: como lo estan usando
 * empresas como la tuya") — este reel cubre los TRES, cada uno con 7-8s
 * y su atribucion EXACTA (regla dura de la mision), sin repetir las
 * cifras profundas que ya tienen su propio reel dedicado en otras series
 * de la linea (la vertical HVAC/Marino y clinicas ya tienen su reel
 * propio — aqui se cita solo la cifra ancla de cada caso, no el
 * detalle completo, y se remite explicitamente "profundiza en" en el
 * brand_close).
 *
 * Atribucion por caso (regla dura, verificada contra el post):
 * - Clinica: cifras REPORTADAS POR LA PROPIA CLINICA (no una estimacion
 *   de AetherLogik) — "Estas cifras las reporto la propia clinica."
 *   Cliente confidencial, identidad resguardada por acuerdo.
 * - DMP Consulting: cifras son ESTIMACIONES DE AETHERLOGIK a partir de
 *   los datos del cliente — "Estas cifras son estimaciones nuestras a
 *   partir de los datos del cliente." Nombre publico (Mayli Parra,
 *   autorizado).
 * - Marino HVAC: mismo tipo de atribucion que DMP (estimacion nuestra).
 *   Nombre publico (Alain Marino, autorizado). Cifra ancla ($4,400/mes)
 *   DISTINTA de la que usa LosNumerosDeMarinoHVAC.tsx (esa usa $50/trabajo
 *   + 88 facturas/mes + 36h/mes — este reel usa solo el titular
 *   $4,400/mes + 9h/semana, sin duplicar el detalle completo).
 *
 * UNICA escena i2v del reel (doctrina: maximo 1 hero por reel) — plano
 * generico de "negocios reales de Miami" de dia, NO atado a un caso
 * especifico (los 3 casos son de sectores distintos: clinica, consultoria,
 * HVAC — un hero especifico de uno solo distorsionaria el reparto).
 *
 * Frame plan @24fps: cold_open_hero 120f (5.0s) + EmberThread bridge_a
 * 12f (0.5s) + case_clinic 192f (8.0s) + case_dmp 192f (8.0s) +
 * case_marino 192f (8.0s) + EmberThread bridge_b 12f (0.5s) + quote_line
 * 168f (7.0s) + brand_close 192f (8.0s) = 1080f = 45.000s exacto
 * (tail_padding_seconds: 0 en props).
 *
 * Ver TresNegociosTresResultados.art-direction.md, .decision_log.json,
 * .scene_plan.json y .gates.json.
 */
export interface TresNegociosTresResultadosProps {
  heroVideoSrc: string;
  musicSrc: string;
  logoSrc: string;
  sfxChimeSrc?: string;
  [key: string]: unknown;
}

const S1 = 120;
const BRIDGE_A = 12;
const S2 = 192;
const S3 = 192;
const S4 = 192;
const BRIDGE_B = 12;
const S5 = 168;
const S6 = 192;

export const TRES_NEGOCIOS_TRES_RESULTADOS_TOTAL_FRAMES =
  S1 + BRIDGE_A + S2 + S3 + S4 + BRIDGE_B + S5 + S6; // 1080

const START1 = 0;
const STARTB1 = START1 + S1; // 120
const START2 = STARTB1 + BRIDGE_A; // 132
const START3 = START2 + S2; // 324
const START4 = START3 + S3; // 516
const STARTB2 = START4 + S4; // 708
const START5 = STARTB2 + BRIDGE_B; // 720
const START6 = START5 + S5; // 888

function musicVolume(frame: number): number {
  const duckStart = START2 - 10;
  const duckEnd = START2 + 16;
  if (frame < duckStart) return 1.0;
  if (frame < duckEnd) return interpolate(frame, [duckStart, duckEnd], [1.0, 0.6], { extrapolateRight: "clamp" });
  return interpolate(frame, [duckEnd, duckEnd + 60], [0.6, 1.0], { extrapolateRight: "clamp" });
}

export const TresNegociosTresResultados: React.FC<TresNegociosTresResultadosProps> = ({
  heroVideoSrc,
  musicSrc,
  logoSrc,
  sfxChimeSrc,
}) => {
  return (
    <AbsoluteFill style={{ background: BRAND.bg }}>
      <Audio src={musicSrc} volume={musicVolume} />

      {sfxChimeSrc && (
        <Sequence from={START2 + 6} durationInFrames={30} name="sfx_chime_clinic">
          <Audio src={sfxChimeSrc} volume={0.5} />
        </Sequence>
      )}
      {sfxChimeSrc && (
        <Sequence from={START3 + 6} durationInFrames={30} name="sfx_chime_dmp">
          <Audio src={sfxChimeSrc} volume={0.45} />
        </Sequence>
      )}
      {sfxChimeSrc && (
        <Sequence from={START4 + 6} durationInFrames={30} name="sfx_chime_marino">
          <Audio src={sfxChimeSrc} volume={0.45} />
        </Sequence>
      )}

      {/* Scene 1 — cold_open_hero. i2v real: negocio en Miami de dia,
          establecimiento generico (no atado a un solo caso — los 3 casos
          son de sectores distintos). */}
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
        <HeadlineOverlay text="Tres negocios reales. Tres resultados distintos." position="bottom" scrim fontSize={30} />
      </Sequence>

      <Sequence from={STARTB1} durationInFrames={BRIDGE_A} name="EmberThread_bridge_a">
        <EmberThread backgroundColor={BRAND.bg} accentColor={BRAND.accent} sweepSeconds={0.5} />
      </Sequence>

      {/* Scene 2 — case_clinic. Cifra REPORTADA POR LA PROPIA CLINICA
          (no estimacion de AetherLogik) — atribucion exacta en el mismo
          frame. */}
      <Sequence from={START2} durationInFrames={S2} name="case_clinic">
        <StatReveal stat="+125 horas" label="por semana recuperadas por el equipo de coordinacion" accentColor={BRAND.accent} position="center" />
        <HeadlineOverlay text="Red de clinicas de EE. UU. . cifras reportadas por la propia clinica." position="bottom" scrim fontSize={20} />
      </Sequence>

      {/* Scene 3 — case_dmp. Estimacion de AetherLogik a partir de datos
          del cliente, nombre publico autorizado. */}
      <Sequence from={START3} durationInFrames={S3} name="case_dmp">
        <StatReveal stat="$36,000" label="en tiempo recuperado al ano, en capacidad de trabajo" accentColor={BRAND.accent} position="center" />
        <HeadlineOverlay text="DMP Consulting Services, Houston/Katy TX . estimacion de AetherLogik a partir de los datos del cliente." position="bottom" scrim fontSize={19} />
      </Sequence>

      {/* Scene 4 — case_marino. Estimacion de AetherLogik a partir de
          datos del cliente, nombre publico autorizado. Cifra ancla
          distinta del detalle completo que ya vive en
          LosNumerosDeMarinoHVAC.tsx (serie hvac). */}
      <Sequence from={START4} durationInFrames={S4} name="case_marino">
        <StatReveal stat="$4,400/mes" label="recuperados en facturacion, mas 9 horas libres por semana" accentColor={BRAND.accent} position="center" />
        <HeadlineOverlay text="Marino HVAC, Miami . estimacion de AetherLogik a partir de los datos del cliente." position="bottom" scrim fontSize={19} />
      </Sequence>

      <Sequence from={STARTB2} durationInFrames={BRIDGE_B} name="EmberThread_bridge_b">
        <EmberThread backgroundColor={BRAND.bg} accentColor={BRAND.accent} sweepSeconds={0.5} />
      </Sequence>

      {/* Scene 5 — quote_line. Cita textual de Mayli Parra, atribuida en
          el mismo frame (nombre publico en el post, cliente entregado). */}
      <Sequence from={START5} durationInFrames={S5} name="quote_line">
        <AbsoluteFill style={{ background: BRAND.bg }}>
          <KineticHeadline
            lines={["\"La automatizacion nos permitio", "enfocarnos en lo que realmente", "importa: el trabajo con los clientes.\""]}
            fontSize={34}
            position="center"
          />
          <HeadlineOverlay text="— Mayli Parra, DMP Consulting Services" color={BRAND.muted} position="bottom" fontSize={22} />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 6 — brand_close. CTA al reel 4 (cierre) de la serie;
          remite a los tutoriales dedicados por vertical (regla de la
          mision: "puede referenciar los otros tutoriales"). */}
      <Sequence from={START6} durationInFrames={S6} name="brand_close">
        <FilmGrade vignette={0.35} grainOpacity={0.1}>
          <BrandClose
            wordmark="AetherLogik"
            tagline="Profundiza en tu sector: /para-clinicas y /para-hvac."
            url="aetherlogik.com/blog . esta listo tu negocio, en el proximo video ->"
            logoSrc={logoSrc}
            accentColor={BRAND.accent}
            backgroundColor={BRAND.bg}
          />
        </FilmGrade>
      </Sequence>
    </AbsoluteFill>
  );
};
