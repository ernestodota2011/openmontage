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
import { BrandClose } from "../components/BrandClose";
import { FilmGrade } from "../components/FilmGrade";

/**
 * LoQueNoSabesDeTuNegocio — reel 1/4 (gancho) de la serie
 * reels-consultoria-serie (blog->reel de
 * `consultoria-ia-gratuita-diagnostico-paso-a-paso.md`, el post del
 * EMBUDO/CONVERSION — 8a y ULTIMA serie de la linea `reels-del-blog`).
 * Rama `aetherlogik/reels-consultoria-serie`, partida de
 * `aetherlogik/reels-ia-miami-serie` HEAD (`3ffcbc7` o posterior) para
 * heredar KineticHeadline/HeadlineOverlay/BrandClose (fix P-13
 * maxWidth/textAlign ya aplicado)/FilmGrade/theme.ts intactos. Sigue la
 * formula ganadora GO-4/4 de las 6 series anteriores: problema vivido +
 * promesa concreta (30 min gratis) + honestidad ("sin letra pequena") +
 * CTA al siguiente reel de la serie (no venta directa — esta serie es
 * de conversion, pero el reel 1 sigue educando/enganchando, el CTA de
 * venta fuerte vive en el reel 4).
 *
 * UNICA escena i2v de este reel (doctrina: maximo 1 hero por reel; el
 * presupuesto de 2 heroes de la serie se reparte entre reel 1 y reel 3).
 * Cero cifras/claims inventados: "30 minutos", "gratis", "sin
 * compromiso", "sin letra pequena" son literales del primer parrafo y
 * la seccion "¿Realmente es gratuito...?" del post.
 *
 * FIX (2026-08-21, verify final de video-producer, pixeles reales del
 * MP4 renderizado): `accentWord="Gratis."` NUNCA matcheaba —
 * KineticHeadline compara la palabra YA limpia de puntuacion
 * (`word.replace(/[.,;:!?¡¿"']/g, "")`) contra `accentWord.toLowerCase()`
 * SIN limpiar; al pasar el punto en el prop, "gratis" (limpio) nunca
 * es igual a "gratis." (con punto) y la palabra clave del gancho
 * ("Gratis.") se renderizaba en blanco, no en ember. Corregido a
 * `accentWord="Gratis"` (sin puntuacion) — mismo patron ya usado
 * correctamente en `accentWord="30"` de la escena anterior.
 *
 * Frame plan @24fps: cold_open_hero 120f (5.0s) + hook_question 168f
 * (7.0s) + reveal_30min 120f (5.0s) + sin_letra_pequena 120f (5.0s) +
 * brand_close 192f (8.0s) = 720f = 30.000s exacto
 * (tail_padding_seconds: 0 en props).
 *
 * Ver LoQueNoSabesDeTuNegocio.art-direction.md, .decision_log.json,
 * .scene_plan.json y .gates.json.
 */
export interface LoQueNoSabesDeTuNegocioProps {
  heroVideoSrc: string;
  musicSrc: string;
  logoSrc: string;
  sfxWhooshSrc?: string;
  [key: string]: unknown;
}

const S1 = 120;
const S2 = 168;
const S3 = 120;
const S4 = 120;
const S5 = 192;

export const LO_QUE_NO_SABES_DE_TU_NEGOCIO_TOTAL_FRAMES = S1 + S2 + S3 + S4 + S5; // 720

const START1 = 0;
const START2 = START1 + S1; // 120
const START3 = START2 + S2; // 288
const START4 = START3 + S3; // 408
const START5 = START4 + S4; // 528

function musicVolume(frame: number): number {
  const dipStart = START3;
  const dipEnd = START3 + 14;
  const riseStart = START4 + S4 - 24;
  const riseEnd = START4 + S4 - 4;
  if (frame < dipStart) return 1.0;
  if (frame < dipEnd) return interpolate(frame, [dipStart, dipEnd], [1.0, 0.62], { extrapolateRight: "clamp" });
  if (frame < riseStart) return 0.62;
  if (frame < riseEnd) return interpolate(frame, [riseStart, riseEnd], [0.62, 1.0], { extrapolateRight: "clamp" });
  return 1.0;
}

export const LoQueNoSabesDeTuNegocio: React.FC<LoQueNoSabesDeTuNegocioProps> = ({
  heroVideoSrc,
  musicSrc,
  logoSrc,
  sfxWhooshSrc,
}) => {
  return (
    <AbsoluteFill style={{ background: BRAND.bg }}>
      <Audio src={musicSrc} volume={musicVolume} />

      {sfxWhooshSrc && (
        <Sequence from={START4 + S4 - 12} durationInFrames={20} name="sfx_whoosh_reveal">
          <Audio src={sfxWhooshSrc} volume={0.6} />
        </Sequence>
      )}

      {/* Scene 1 — cold_open_hero. UNICA escena i2v del reel: dueno de
          negocio solo, de noche, mirando facturas/papeles dispersos,
          sin saber por donde empezar (fiel al parrafo de apertura del
          post: "no saben por donde empezar ni si realmente les
          serviria"). */}
      <Sequence from={START1} durationInFrames={S1} name="cold_open_hero">
        <AbsoluteFill style={{ background: BRAND.bg }}>
          <OffthreadVideo
            src={heroVideoSrc}
            muted
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </AbsoluteFill>
        <HeadlineOverlay
          text="Escuchaste que la IA puede ayudarte."
          subtitle="Pero no sabes por donde empezar."
          position="bottom"
          scrim
          fontSize={34}
        />
      </Sequence>

      {/* Scene 2 — hook_question. La pregunta que engancha, sin
          responderla todavia. */}
      <Sequence from={START2} durationInFrames={S2} name="hook_question">
        <KineticHeadline
          lines={["¿Y si en 30 minutos supieras", "exactamente que automatizar", "y cuanto tiempo recuperarias?"]}
          accentWord="30"
          fontSize={38}
          position="center"
        />
      </Sequence>

      {/* Scene 3 — reveal_30min. La promesa concreta del diagnostico
          gratuito, literal del post ("nuestro diagnostico gratuito de
          30 minutos"). */}
      <Sequence from={START3} durationInFrames={S3} name="reveal_30min">
        <KineticHeadline
          lines={["30 minutos.", "Gratis.", "Sin compromiso."]}
          accentWord="Gratis"
          fontSize={62}
          position="center"
        />
      </Sequence>

      {/* Scene 4 — sin_letra_pequena. Honestidad explicita, literal del
          post ("Sin compromisos, sin letra pequena, y sin vender
          humo"). */}
      <Sequence from={START4} durationInFrames={S4} name="sin_letra_pequena">
        <KineticHeadline
          lines={["Sin letra pequena.", "Sin vender humo."]}
          fontSize={44}
          position="center"
        />
      </Sequence>

      {/* Scene 5 — brand_close. CTA al reel 2 de la serie (interno, no
          venta directa todavia — esta serie SI puede cerrar cada reel
          apuntando a la agenda, pero el reel 1 mantiene el gancho
          educativo y remite al proximo video). */}
      <Sequence from={START5} durationInFrames={S5} name="brand_close">
        <FilmGrade vignette={0.35} grainOpacity={0.1}>
          <BrandClose
            wordmark="AetherLogik"
            tagline="El diagnostico gratuito de IA para tu negocio."
            url="aetherlogik.com/blog . asi son los 30 minutos, en el proximo video ->"
            logoSrc={logoSrc}
            accentColor={BRAND.accent}
            backgroundColor={BRAND.bg}
          />
        </FilmGrade>
      </Sequence>
    </AbsoluteFill>
  );
};
