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
import { EmberThread } from "../components/EmberThread";
import { FilmGrade } from "../components/FilmGrade";

/**
 * UnTercioDeTuDia — reel 1/4 (gancho) de la serie reels-abogados-serie
 * (blog->reel de `automatizacion-despachos-abogados-ia.md`). Rama
 * `aetherlogik/reels-abogados-serie`, partida de `aetherlogik/reels-clinicas-serie`
 * HEAD (`0812933`) para heredar KineticHeadline/HeadlineOverlay/StatReveal/
 * TagRevealList/BrandClose/FilmGrade/EmberThread + theme.ts intactos (misma
 * marca, tercer blog). Sigue la formula ganadora GO-4/4 de las 2 series
 * anteriores: problema vivido + "mira lo que es posible", CTA al siguiente
 * reel de la serie (no venta directa). UNICA escena i2v de este reel (la
 * cold_open_hero) — maximo 1 hero por reel (doctrina de la skill).
 *
 * La cifra citada ("1/3") lleva su atribucion COMPLETA en el MISMO frame
 * (StatReveal + HeadlineOverlay bottom con la fuente exacta del post:
 * "Un estudio de Clio del 2023, citado por la American Bar Association") —
 * ver decision_log d-004.
 *
 * Frame plan @24fps: cold_open_hero 120f (5.0s) + stat_reveal 168f (7.0s)
 * + hidden_cost 144f (6.0s) + tease_possible 96f (4.0s) + brand_close 192f
 * (8.0s) = 720f = 30.000s exacto (tail_padding_seconds: 0 en props).
 *
 * Ver UnTercioDeTuDia.art-direction.md, .decision_log.json,
 * .scene_plan.json y .gates.json (auto-score pre-render).
 */
export interface UnTercioDeTuDiaProps {
  heroVideoSrc: string;
  musicSrc: string;
  logoSrc: string;
  sfxWhooshSrc?: string;
  [key: string]: unknown;
}

const S1 = 120;
const S2 = 168;
const S3 = 144;
const S4 = 96;
const S5 = 192;

export const UN_TERCIO_DE_TU_DIA_TOTAL_FRAMES = S1 + S2 + S3 + S4 + S5; // 720

const START1 = 0;
const START2 = START1 + S1; // 120
const START3 = START2 + S2; // 288
const START4 = START3 + S3; // 432
const START5 = START4 + S4; // 528

function musicVolume(frame: number): number {
  const dipStart = START3;
  const dipEnd = START3 + 14;
  const riseStart = START4 - 10;
  const riseEnd = START4 + 8;
  if (frame < dipStart) return 1.0;
  if (frame < dipEnd) return interpolate(frame, [dipStart, dipEnd], [1.0, 0.6], { extrapolateRight: "clamp" });
  if (frame < riseStart) return 0.6;
  if (frame < riseEnd) return interpolate(frame, [riseStart, riseEnd], [0.6, 1.0], { extrapolateRight: "clamp" });
  return 1.0;
}

export const UnTercioDeTuDia: React.FC<UnTercioDeTuDiaProps> = ({
  heroVideoSrc,
  musicSrc,
  logoSrc,
  sfxWhooshSrc,
}) => {
  return (
    <AbsoluteFill style={{ background: BRAND.bg }}>
      <Audio src={musicSrc} volume={musicVolume} />

      {sfxWhooshSrc && (
        <Sequence from={START4 + 6} durationInFrames={20} name="sfx_whoosh_tease">
          <Audio src={sfxWhooshSrc} volume={0.6} />
        </Sequence>
      )}

      {/* Scene 1 — cold_open_hero. UNICA escena i2v del reel. */}
      <Sequence from={START1} durationInFrames={S1} name="cold_open_hero">
        <AbsoluteFill style={{ background: BRAND.bg }}>
          <OffthreadVideo
            src={heroVideoSrc}
            muted
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </AbsoluteFill>
        <HeadlineOverlay text="Otra noche facturando... papeleo." position="bottom" scrim fontSize={36} />
      </Sequence>

      {/* Scene 2 — stat_reveal. Cifra + atribucion COMPLETA en el MISMO frame. */}
      <Sequence from={START2} durationInFrames={S2} name="stat_reveal">
        <StatReveal stat="1/3" label="de tu jornada, facturada" accentColor={BRAND.accent} position="center" />
        <HeadlineOverlay
          text="Estudio de Clio (2023), citado por la American Bar Association."
          subtitle="Los abogados solo facturan cerca de un tercio de su dia."
          position="bottom"
          scrim
          fontSize={24}
        />
      </Sequence>

      {/* Scene 3 — hidden_cost. A donde se va el resto del dia. */}
      <Sequence from={START3} durationInFrames={S3} name="hidden_cost">
        <KineticHeadline
          lines={["El resto se va en correos,", "papeleo, y tareas", "que ya se pueden delegar."]}
          accentWord="delegar"
          fontSize={46}
          position="center"
        />
      </Sequence>

      {/* Scene 4 — tease_possible. Bridge de marca hacia el cierre. */}
      <Sequence from={START4} durationInFrames={S4} name="tease_possible">
        <KineticHeadline
          lines={["Esto no tiene", "que seguir asi."]}
          accentWord="asi"
          fontSize={58}
          position="center"
        />
        <EmberThread backgroundColor="transparent" accentColor={BRAND.accent} sweepSeconds={S4 / 24} />
      </Sequence>

      {/* Scene 5 — brand_close. CTA al reel 2 de la serie. */}
      <Sequence from={START5} durationInFrames={S5} name="brand_close">
        <FilmGrade vignette={0.35} grainOpacity={0.1}>
          <BrandClose
            wordmark="AetherLogik"
            tagline="Automatizacion real para despachos de abogados."
            url="aetherlogik.com/blog . como funciona, en el proximo video ->"
            logoSrc={logoSrc}
            accentColor={BRAND.accent}
            backgroundColor={BRAND.bg}
          />
        </FilmGrade>
      </Sequence>
    </AbsoluteFill>
  );
};
