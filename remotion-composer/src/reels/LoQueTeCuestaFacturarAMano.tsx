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
 * LoQueTeCuestaFacturarAMano — reel 1/4 (gancho) de la serie
 * reels-hvac-serie (blog->reel de
 * `automatizar-facturacion-hvac-cuanto-pierdes.md`). Rama
 * `aetherlogik/reels-hvac-serie`, partida de
 * `aetherlogik/reels-inmobiliarios-serie` HEAD (`92d7947`) para heredar
 * KineticHeadline/HeadlineOverlay/StatReveal/TagRevealList/BrandClose
 * (con el fix maxWidth/textAlign de P-13 ya aplicado)/FilmGrade/EmberThread
 * + theme.ts intactos. Sigue la formula ganadora GO-4/4 de las 4 series
 * anteriores (chatbot, clinicas, abogados, inmobiliarios): problema
 * vivido + cifra propia del post + "esto no tiene que seguir asi", CTA
 * al siguiente reel de la serie (no venta directa). UNICA escena i2v de
 * este reel (doctrina: maximo 1 hero por reel).
 *
 * Las dos cifras de este reel ($30-$100 por trabajo, 200+ horas al ano)
 * son afirmaciones PROPIAS del post (no de un tercero) — se citan
 * directamente, sin atribucion externa, igual que el resto del cuerpo del
 * post las presenta. NINGUNA cifra de Marino HVAC aparece en este reel
 * (esas viven exclusivamente en el reel 3, con su atribucion completa en
 * el mismo frame — regla dura de la mision).
 *
 * Frame plan @24fps: cold_open_hero 120f (5.0s) + stat_reveal 168f (7.0s)
 * + hidden_cost 144f (6.0s) + tease_possible 96f (4.0s) + brand_close
 * 192f (8.0s) = 720f = 30.000s exacto (tail_padding_seconds: 0 en props).
 *
 * Ver LoQueTeCuestaFacturarAMano.art-direction.md, .decision_log.json,
 * .scene_plan.json y .gates.json (auto-score pre-render — SIN checkout
 * local de Node/el fork en esta sesion, declarado explicitamente en
 * gates.json).
 */
export interface LoQueTeCuestaFacturarAManoProps {
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

export const LO_QUE_TE_CUESTA_FACTURAR_A_MANO_TOTAL_FRAMES = S1 + S2 + S3 + S4 + S5; // 720

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

export const LoQueTeCuestaFacturarAMano: React.FC<LoQueTeCuestaFacturarAManoProps> = ({
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

      {/* Scene 1 — cold_open_hero. UNICA escena i2v del reel: dueno de HVAC
          revisando facturas a mano, tarde en la noche (fiel al abridor del
          post: "la facturacion manual te esta costando dinero"). */}
      <Sequence from={START1} durationInFrames={S1} name="cold_open_hero">
        <AbsoluteFill style={{ background: BRAND.bg }}>
          <OffthreadVideo
            src={heroVideoSrc}
            muted
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </AbsoluteFill>
        <HeadlineOverlay text="Otra noche revisando facturas a mano." position="bottom" scrim fontSize={36} />
      </Sequence>

      {/* Scene 2 — stat_reveal. Cifra PROPIA del post (no de tercero, sin
          atribucion externa necesaria — se cita tal cual el post la
          presenta). */}
      <Sequence from={START2} durationInFrames={S2} name="stat_reveal">
        <StatReveal stat="$30–$100" label="perdidos por cada trabajo con un error menor" accentColor={BRAND.accent} position="center" />
        <HeadlineOverlay text="Multiplicado por cada trabajo del mes." position="bottom" scrim fontSize={24} />
      </Sequence>

      {/* Scene 3 — hidden_cost. El costo de tiempo administrativo, fiel al
          post ("mas de doscientas horas al ano"). */}
      <Sequence from={START3} durationInFrames={S3} name="hidden_cost">
        <KineticHeadline
          lines={["Mas de 200 horas al ano.", "Corrigiendo facturas", "que ya deberian estar bien."]}
          accentWord="200"
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
            tagline="Automatizacion real para empresas de HVAC."
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
