import {
  AbsoluteFill,
  Audio,
  Sequence,
  interpolate,
} from "remotion";
import { BRAND } from "../theme";
import { KineticHeadline } from "../components/KineticHeadline";
import { SplitCompare } from "../components/SplitCompare";
import { BrandClose } from "../components/BrandClose";
import { EmberThread } from "../components/EmberThread";
import { FilmGrade } from "../components/FilmGrade";

/**
 * AlquilarOComprar — reel 1/4 (gancho) de la serie reels-n8n-zapier-serie
 * (blog->reel de `n8n-vs-zapier-pequenas-empresas.md`, D:\aetherlogik-astro).
 * Rama `aetherlogik/reels-n8n-zapier-serie`, partida de
 * `aetherlogik/reels-ia-miami-serie` HEAD (`26a6dc1`) para heredar
 * KineticHeadline/BrandClose/EmberThread/FilmGrade/theme.ts intactos + el
 * fix P-13 de BrandClose ya aplicado.
 *
 * DECISION DE PIPELINE (ver decision_log d-001): CERO escenas i2v en TODA
 * la serie. El post es una comparativa tecnica de dos herramientas de
 * software — no hay un "momento humano" que dramatizar sin inventar una
 * vineta que el post no describe. Los 4 reels son 100% atelier: tipografia
 * cinetica + comparaciones autoradas (Remotion) + 2 tablas comparativas
 * densas en HyperFrames (reels 2 y 3). 0 heroes es legitimo cuando el
 * contenido no lo pide (doctrina de la mision).
 *
 * La metafora "alquilar vs comprar" (Zapier = apartamento alquilado, n8n =
 * casa propia) es LITERAL del post ("Es como alquilar un apartamento...
 * Es como comprar una casa..."), no una invencion nuestra.
 *
 * Frame plan @24fps: cold_open 96f (4.0s) + metaphor_split 192f (8.0s) +
 * distinction 144f (6.0s) + tease_next 96f (4.0s) + brand_close 192f
 * (8.0s) = 720f = 30.000s exacto (tail_padding_seconds: 0 en props).
 *
 * Ver AlquilarOComprar.art-direction.md, .decision_log.json,
 * .scene_plan.json y .gates.json (auto-score pre-render — SIN checkout
 * local de Node/el fork en esta sesion, declarado explicitamente en
 * gates.json, mismo patron que las 6 series anteriores).
 */
export interface AlquilarOComprarProps {
  musicSrc: string;
  logoSrc: string;
  sfxWhooshSrc?: string;
  [key: string]: unknown;
}

const S1 = 96;
const S2 = 192;
const S3 = 144;
const S4 = 96;
const S5 = 192;

export const ALQUILAR_O_COMPRAR_TOTAL_FRAMES = S1 + S2 + S3 + S4 + S5; // 720

const START1 = 0;
const START2 = START1 + S1; // 96
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

export const AlquilarOComprar: React.FC<AlquilarOComprarProps> = ({
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

      {/* Scene 1 — cold_open. Pregunta directa del post, sin adornos. */}
      <Sequence from={START1} durationInFrames={S1} name="cold_open">
        <KineticHeadline
          lines={["¿Zapier o n8n?", "No es solo una", "pregunta tecnica."]}
          fontSize={52}
          position="center"
        />
      </Sequence>

      {/* Scene 2 — metaphor_split. La metafora LITERAL del post: Zapier como
          alquilar un apartamento, n8n como comprar una casa. */}
      <Sequence from={START2} durationInFrames={S2} name="metaphor_split">
        <SplitCompare
          leftLabel="Zapier"
          leftWord="Alquilar"
          leftDesc="Pagas cada mes. No mantienes nada. Sigues las reglas y precios del propietario."
          rightLabel="n8n"
          rightWord="Comprar"
          rightDesc="Tienes control total. Eres responsable del mantenimiento y la seguridad."
        />
      </Sequence>

      {/* Scene 3 — distinction. Consecuencia directa de la metafora. */}
      <Sequence from={START3} durationInFrames={S3} name="distinction">
        <KineticHeadline
          lines={["Uno vive en la nube", "de otra empresa.", "El otro vive", "en la tuya."]}
          accentWord="tuya"
          fontSize={40}
          position="center"
        />
      </Sequence>

      {/* Scene 4 — tease_next. Bridge hacia el reel 2 (costos). */}
      <Sequence from={START4} durationInFrames={S4} name="tease_next">
        <KineticHeadline
          lines={["Pero eso no responde", "la pregunta que", "de verdad importa."]}
          fontSize={38}
          position="center"
        />
        <EmberThread backgroundColor="transparent" accentColor={BRAND.accent} sweepSeconds={S4 / 24} />
      </Sequence>

      {/* Scene 5 — brand_close. CTA al reel 2 de la serie. */}
      <Sequence from={START5} durationInFrames={S5} name="brand_close">
        <FilmGrade vignette={0.35} grainOpacity={0.1}>
          <BrandClose
            wordmark="AetherLogik"
            tagline="Automatizacion honesta para negocios reales."
            url="aetherlogik.com/blog . cuanto cuesta cada uno, en el proximo video ->"
            logoSrc={logoSrc}
            accentColor={BRAND.accent}
            backgroundColor={BRAND.bg}
          />
        </FilmGrade>
      </Sequence>
    </AbsoluteFill>
  );
};
