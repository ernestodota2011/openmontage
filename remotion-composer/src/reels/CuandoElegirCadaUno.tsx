import {
  AbsoluteFill,
  Audio,
  OffthreadVideo,
  Sequence,
  interpolate,
} from "remotion";
import { BRAND } from "../theme";
import { KineticHeadline } from "../components/KineticHeadline";
import { BrandClose } from "../components/BrandClose";
import { FilmGrade } from "../components/FilmGrade";

/**
 * CuandoElegirCadaUno — reel 3/4 (didactico) de la serie
 * reels-n8n-zapier-serie. El bloque 'when_to_choose_table' (comparativa
 * densa "ELIGE ZAPIER SI" vs "ELIGE N8N SI", 4 criterios EXACTOS de las
 * secciones "Elige Zapier si..." / "Elige n8n si..." del post) se autora
 * en HYPERFRAMES (HTML/CSS puro, data-no-timeline — ver
 * hyperframes-compositions/cuando-elegir-cada-uno-tabla/index.html), NO en
 * Remotion — mismo patron que el reel 2 de esta misma serie y las 5 series
 * anteriores. Se renderiza aparte en el CT 128 (hf lint . && hf render) y
 * se compone aqui como UN clip MP4 (whenToChooseTableSrc).
 *
 * El ejemplo de bienes raices (escena 3) es EXPLICITAMENTE el ejemplo
 * HIPOTETICO que el propio post usa ("imagina una empresa de bienes raices
 * que necesita sincronizar...") — NO es un cliente real, y no se le
 * atribuye ninguna cifra (el post tampoco da ninguna para este ejemplo).
 *
 * Frame plan @24fps: cold_open 96f (4.0s) + when_to_choose_table 600f
 * (25.0s) [clip HyperFrames] + real_estate_example 144f (6.0s) +
 * distinction_close 120f (5.0s) + brand_close 192f (8.0s) = 1152f =
 * 48.000s exacto (tail_padding_seconds: 0 en props).
 *
 * Ver CuandoElegirCadaUno.art-direction.md, .decision_log.json,
 * .scene_plan.json y .gates.json.
 */
export interface CuandoElegirCadaUnoProps {
  whenToChooseTableSrc: string;
  musicSrc: string;
  logoSrc: string;
  sfxChipSrc?: string;
  [key: string]: unknown;
}

const S1 = 96;
const S2 = 600;
const S3 = 144;
const S4 = 120;
const S5 = 192;

export const CUANDO_ELEGIR_CADA_UNO_TOTAL_FRAMES = S1 + S2 + S3 + S4 + S5; // 1152

const START1 = 0;
const START2 = START1 + S1; // 96
const START3 = START2 + S2; // 696
const START4 = START3 + S3; // 840
const START5 = START4 + S4; // 960

function musicVolume(frame: number): number {
  const dipStart = START2 + 300;
  const dipEnd = dipStart + 20;
  const riseStart = START3 - 16;
  const riseEnd = START3;
  if (frame < dipStart) return 1.0;
  if (frame < dipEnd) return interpolate(frame, [dipStart, dipEnd], [1.0, 0.65], { extrapolateRight: "clamp" });
  if (frame < riseStart) return 0.65;
  if (frame < riseEnd) return interpolate(frame, [riseStart, riseEnd], [0.65, 1.0], { extrapolateRight: "clamp" });
  return 1.0;
}

// Offsets (relativos a START2) de las 4 filas del clip HyperFrames (2.0s,
// 7.0s, 12.5s, 18.0s @24fps).
const CHIP_OFFSETS_F = [48, 168, 300, 432];

export const CuandoElegirCadaUno: React.FC<CuandoElegirCadaUnoProps> = ({
  whenToChooseTableSrc,
  musicSrc,
  logoSrc,
  sfxChipSrc,
}) => {
  return (
    <AbsoluteFill style={{ background: BRAND.bg }}>
      <Audio src={musicSrc} volume={musicVolume} />

      {sfxChipSrc &&
        CHIP_OFFSETS_F.map((off, i) => (
          <Sequence key={i} from={START2 + off} durationInFrames={12} name={`sfx_chip_row${i + 1}`}>
            <Audio src={sfxChipSrc} volume={0.35} />
          </Sequence>
        ))}

      {/* Scene 1 — cold_open. */}
      <Sequence from={START1} durationInFrames={S1} name="cold_open">
        <KineticHeadline
          lines={["Uno es mas facil", "de empezar.", "El otro, mas poderoso", "despues."]}
          fontSize={44}
          position="center"
        />
      </Sequence>

      {/* Scene 2 — when_to_choose_table. Clip HyperFrames. */}
      <Sequence from={START2} durationInFrames={S2} name="when_to_choose_table">
        <AbsoluteFill style={{ background: BRAND.bg }}>
          <OffthreadVideo
            src={whenToChooseTableSrc}
            muted
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 3 — real_estate_example. Ejemplo HIPOTETICO del post. */}
      <Sequence from={START3} durationInFrames={S3} name="real_estate_example">
        <KineticHeadline
          lines={["El post lo explica con", "una empresa de bienes raices", "que sincroniza CRM,", "listados y contabilidad."]}
          fontSize={32}
          position="center"
        />
      </Sequence>

      {/* Scene 4 — distinction_close. */}
      <Sequence from={START4} durationInFrames={S4} name="distinction_close">
        <KineticHeadline
          lines={["No existe la opcion", "correcta en abstracto.", "Existe la que es", "correcta para TU negocio."]}
          accentWord="TU"
          fontSize={38}
          position="center"
        />
      </Sequence>

      {/* Scene 5 — brand_close. CTA al reel 4 de la serie. */}
      <Sequence from={START5} durationInFrames={S5} name="brand_close">
        <FilmGrade vignette={0.35} grainOpacity={0.1}>
          <BrandClose
            wordmark="AetherLogik"
            tagline="Automatizacion honesta para negocios reales."
            url="aetherlogik.com/blog . como lo decidio un cliente real, en el proximo video ->"
            logoSrc={logoSrc}
            accentColor={BRAND.accent}
            backgroundColor={BRAND.bg}
          />
        </FilmGrade>
      </Sequence>
    </AbsoluteFill>
  );
};
