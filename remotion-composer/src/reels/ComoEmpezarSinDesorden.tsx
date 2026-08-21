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
 * ComoEmpezarSinDesorden - reel 4/4 (cierre) de la serie reels-abogados-serie.
 * Fuente: seccion 'Como empezar sin desorden' del post (los 5 pasos) +
 * mencion de la vertical /para-legal. Sigue el patron de cierre GO'd en
 * LoQueCambiaEnTuClinica.tsx (serie clinicas): series_recap que amarra
 * los 4 reels + brand_close con la URL final de conversion (no la del
 * siguiente reel, porque este ES el ultimo).
 *
 * Sin escena i2v en este reel (100% Remotion atelier, sin HyperFrames) -
 * el presupuesto de hero i2v de la serie se agoto en reels 1 y 3; el
 * bloque denso de datos ya vive en HyperFrames en el reel 2 (mismo patron
 * de reparto de recursos generativos que la serie clinicas).
 *
 * Frame plan @24fps: cold_open 96f (4.0s) + steps_list 360f (15.0s) +
 * caveat 144f (6.0s) + vertical_mention 144f (6.0s) + series_recap 120f
 * (5.0s) + brand_close 216f (9.0s) = 1080f = 45.000s exacto
 * (tail_padding_seconds: 0 en props).
 *
 * Ver ComoEmpezarSinDesorden.art-direction.md, .decision_log.json,
 * .scene_plan.json y .gates.json (auto-score pre-render).
 */
export interface ComoEmpezarSinDesordenProps {
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

export const COMO_EMPEZAR_SIN_DESORDEN_TOTAL_FRAMES = S1 + S2 + S3 + S4 + S5 + S6; // 1080

const START1 = 0;
const START2 = START1 + S1; // 96
const START3 = START2 + S2; // 456
const START4 = START3 + S3; // 600
const START5 = START4 + S4; // 744
const START6 = START5 + S5; // 864

function musicVolume(frame: number): number {
  // Se retira levemente durante la segunda mitad de steps_list (mas
  // intimo bajo el checklist), sube antes de vertical_mention.
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
  { label: "1", value: "Audita tu tiempo una semana" },
  { label: "2", value: "Elige un flujo unico" },
  { label: "3", value: "Disena con un especialista" },
  { label: "4", value: "Prueba con un caso piloto" },
  { label: "5", value: "Documenta y ajusta" },
];

export const ComoEmpezarSinDesorden: React.FC<ComoEmpezarSinDesordenProps> = ({
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

      {/* Scene 1 - cold_open. Tipografia cinetica, sin costo de asset. */}
      <Sequence from={START1} durationInFrames={S1} name="cold_open">
        <KineticHeadline
          lines={["La peor forma", "de automatizar:", "hacerlo todo a la vez."]}
          accentWord="vez"
          fontSize={48}
          position="center"
        />
      </Sequence>

      {/* Scene 2 - steps_list. Cascada de 5 QualifyTag (los 5 pasos del post). */}
      <Sequence from={START2} durationInFrames={S2} name="steps_list">
        <TagRevealList tags={STEPS_TAGS} staggerFrames={56} />
        <HeadlineOverlay text="Como empezar sin desorden" position="bottom" scrim fontSize={26} />
      </Sequence>

      {/* Scene 3 - caveat. Fiel al post: no compres software generico. */}
      <Sequence from={START3} durationInFrames={S3} name="caveat">
        <KineticHeadline
          lines={["No compres software generico", "y esperes que se adapte.", "Disena para tu flujo real."]}
          accentWord="real"
          fontSize={40}
          position="center"
        />
      </Sequence>

      {/* Scene 4 - vertical_mention. Presenta la vertical /para-legal. */}
      <Sequence from={START4} durationInFrames={S4} name="vertical_mention">
        <KineticHeadline
          lines={["Automatizacion para", "despachos de abogados,", "sin agregar complejidad."]}
          accentWord="abogados"
          fontSize={44}
          position="center"
        />
      </Sequence>

      {/* Scene 5 - series_recap. Amarra los 4 reels de la serie. */}
      <Sequence from={START5} durationInFrames={S5} name="series_recap">
        <FilmGrade vignette={0.3} grainOpacity={0.08}>
          <KineticHeadline
            lines={["Un tercio de tu dia.", "Lo que ya puedes delegar.", "Lo que la IA no puede hacer.", "Esto."]}
            accentWord="Esto."
            fontSize={48}
            position="center"
            revealSeconds={0.5}
            staggerSeconds={0.55}
          />
        </FilmGrade>
      </Sequence>

      {/* Scene 6 - brand_close. CTA final de la serie completa. */}
      <Sequence from={START6} durationInFrames={S6} name="brand_close">
        <FilmGrade vignette={0.35} grainOpacity={0.1}>
          <BrandClose
            wordmark="AetherLogik"
            tagline="Automatizacion real para despachos de abogados."
            url="aetherlogik.com/para-legal . agenda tu llamada de diagnostico gratuita ->"
            logoSrc={logoSrc}
            accentColor={BRAND.accent}
            backgroundColor={BRAND.bg}
          />
        </FilmGrade>
      </Sequence>
    </AbsoluteFill>
  );
};
