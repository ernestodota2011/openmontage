import {
  AbsoluteFill,
  Audio,
  Sequence,
  interpolate,
} from "remotion";
import { BRAND } from "../theme";
import { KineticHeadline } from "../components/KineticHeadline";
import { HeadlineOverlay } from "../components/HeadlineOverlay";
import { TagRevealList, QualifyTag } from "../components/TagRevealList";
import { BrandClose } from "../components/BrandClose";
import { FilmGrade } from "../components/FilmGrade";

/**
 * LoQueNecesitasParaAutomatizar — reel 4/4 (cierre) de la serie
 * reels-hvac-serie. Fuente: seccion '¿Que necesitas para automatizar tu
 * facturacion?' del post (los 4 requisitos: documentar procesos,
 * dispositivos moviles, integracion con software, compromiso del equipo)
 * + la FAQ 'Cuanto tiempo toma implementar' (dos a cuatro semanas) + la
 * FAQ '¿Que pasa si el sistema falla un dia?' (vuelve temporalmente al
 * proceso manual) + el CTA final del post (/para-hvac, diagnostico
 * gratuito). Sigue el patron de cierre GO'd en
 * ComoEmpiezasSinPerderLeads.tsx (serie inmobiliarios): series_recap que
 * amarra los 4 reels + brand_close con la URL final de conversion (no la
 * del siguiente reel, porque este ES el ultimo).
 *
 * Sin escena i2v en este reel (100% Remotion atelier, sin HyperFrames) —
 * el presupuesto de hero i2v de la serie se agoto en reels 1 y 3; el
 * bloque denso de datos ya vive en HyperFrames en el reel 2 (mismo patron
 * de reparto de recursos generativos que las 3 series anteriores).
 *
 * Frame plan @24fps: cold_open 96f (4.0s) + steps_list 360f (15.0s) +
 * caveat 144f (6.0s) + vertical_mention 144f (6.0s) + series_recap 120f
 * (5.0s) + brand_close 216f (9.0s) = 1080f = 45.000s exacto
 * (tail_padding_seconds: 0 en props).
 *
 * Ver LoQueNecesitasParaAutomatizar.art-direction.md, .decision_log.json,
 * .scene_plan.json y .gates.json.
 */
export interface LoQueNecesitasParaAutomatizarProps {
  musicSrc: string;
  logoSrc: string;
  sfxWhooshSrc?: string;
  [key: string]: unknown;
}

const S1 = 96;
const S2 = 360;
const S3 = 144;
const S4 = 144;
const S5 = 120;
const S6 = 216;

export const LO_QUE_NECESITAS_PARA_AUTOMATIZAR_TOTAL_FRAMES = S1 + S2 + S3 + S4 + S5 + S6; // 1080

const START1 = 0;
const START2 = START1 + S1; // 96
const START3 = START2 + S2; // 456
const START4 = START3 + S3; // 600
const START5 = START4 + S4; // 744
const START6 = START5 + S5; // 864

function musicVolume(frame: number): number {
  const dipStart = START2 + 200;
  const dipEnd = dipStart + 18;
  const riseStart = START3 - 14;
  const riseEnd = START3;
  if (frame < dipStart) return 1.0;
  if (frame < dipEnd) return interpolate(frame, [dipStart, dipEnd], [1.0, 0.65], { extrapolateRight: "clamp" });
  if (frame < riseStart) return 0.65;
  if (frame < riseEnd) return interpolate(frame, [riseStart, riseEnd], [0.65, 1.0], { extrapolateRight: "clamp" });
  return 1.0;
}

const STEPS_TAGS: QualifyTag[] = [
  { label: "1", value: "Documentas como manejas cada tipo de trabajo hoy" },
  { label: "2", value: "Los mismos celulares que ya usan tus tecnicos" },
  { label: "3", value: "Integracion con QuickBooks, ServiceTitan o Jobber" },
  { label: "4", value: "Compromiso y capacitacion de todo el equipo" },
];

export const LoQueNecesitasParaAutomatizar: React.FC<LoQueNecesitasParaAutomatizarProps> = ({
  musicSrc,
  logoSrc,
  sfxWhooshSrc,
}) => {
  return (
    <AbsoluteFill style={{ background: BRAND.bg }}>
      <Audio src={musicSrc} volume={musicVolume} />

      {sfxWhooshSrc && (
        <Sequence from={START4 + 8} durationInFrames={20} name="sfx_whoosh_vertical">
          <Audio src={sfxWhooshSrc} volume={0.5} />
        </Sequence>
      )}

      {/* Scene 1 — cold_open. Tipografia cinetica, sin costo de asset. */}
      <Sequence from={START1} durationInFrames={S1} name="cold_open">
        <KineticHeadline
          lines={["No necesitas una", "transformacion completa."]}
          accentWord="completa"
          fontSize={50}
          position="center"
        />
      </Sequence>

      {/* Scene 2 — steps_list. Cascada de 4 QualifyTag (los 4 requisitos del post). */}
      <Sequence from={START2} durationInFrames={S2} name="steps_list">
        <TagRevealList tags={STEPS_TAGS} staggerFrames={70} />
        <HeadlineOverlay text="Dos a cuatro semanas de implementacion" position="bottom" scrim fontSize={26} />
      </Sequence>

      {/* Scene 3 — caveat. Fiel a la FAQ: si el sistema falla, se vuelve
          temporalmente al proceso manual mientras se resuelve. */}
      <Sequence from={START3} durationInFrames={S3} name="caveat">
        <KineticHeadline
          lines={["Si el sistema falla un dia,", "vuelves temporalmente", "al proceso manual."]}
          accentWord="temporalmente"
          fontSize={38}
          position="center"
        />
      </Sequence>

      {/* Scene 4 — vertical_mention. Presenta la vertical /para-hvac. */}
      <Sequence from={START4} durationInFrames={S4} name="vertical_mention">
        <KineticHeadline
          lines={["Automatizacion de facturacion", "para empresas de HVAC.", "Sin perder ni un dolar."]}
          accentWord="HVAC."
          fontSize={40}
          position="center"
        />
      </Sequence>

      {/* Scene 5 — series_recap. Amarra los 4 reels de la serie. */}
      <Sequence from={START5} durationInFrames={S5} name="series_recap">
        <FilmGrade vignette={0.3} grainOpacity={0.08}>
          <KineticHeadline
            lines={["Lo que te cuesta facturar a mano.", "Asi funciona, paso a paso.", "Los numeros de Marino HVAC.", "Esto."]}
            accentWord="Esto."
            fontSize={44}
            position="center"
            revealSeconds={0.5}
            staggerSeconds={0.55}
          />
        </FilmGrade>
      </Sequence>

      {/* Scene 6 — brand_close. CTA final de la serie completa. */}
      <Sequence from={START6} durationInFrames={S6} name="brand_close">
        <FilmGrade vignette={0.35} grainOpacity={0.1}>
          <BrandClose
            wordmark="AetherLogik"
            tagline="Automatizacion real para empresas de HVAC."
            url="aetherlogik.com/para-hvac . agenda tu diagnostico gratuito ->"
            logoSrc={logoSrc}
            accentColor={BRAND.accent}
            backgroundColor={BRAND.bg}
          />
        </FilmGrade>
      </Sequence>
    </AbsoluteFill>
  );
};
