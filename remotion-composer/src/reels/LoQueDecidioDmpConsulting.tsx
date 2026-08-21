import {
  AbsoluteFill,
  Audio,
  Sequence,
  interpolate,
} from "remotion";
import { BRAND } from "../theme";
import { KineticHeadline } from "../components/KineticHeadline";
import { StatReveal } from "../components/StatReveal";
import { HeadlineOverlay } from "../components/HeadlineOverlay";
import { BrandClose } from "../components/BrandClose";
import { FilmGrade } from "../components/FilmGrade";

/**
 * LoQueDecidioDmpConsulting — reel 4/4 (caso real + CTA) de la serie
 * reels-n8n-zapier-serie. Unico reel de la serie con cifras de CLIENTE
 * real (DMP Consulting Services, Houston/Katy TX, nombrada explicitamente
 * en el propio post junto con la cita de su propietaria) — la atribucion
 * vive en el MISMO frame que cada cifra (regla dura de la mision). Cierra
 * con la nota honesta del post (a veces Zapier es la respuesta correcta,
 * parrafo de la empresa de limpieza — sin nombre en el post, se mantiene
 * generica aqui) y el CTA REAL de cal.com — unico reel de la serie que
 * vende (formula ganadora GO-4/4: reels 1-3 apuntan al siguiente reel,
 * solo este vende).
 *
 * CERO escenas i2v (ver decision_log de AlquilarOComprar.tsx d-001,
 * aplica a toda la serie) — el caso se dramatiza con StatReveal + quote,
 * mismo patron ya GO'd para 'TresNegociosTresResultados' de la serie
 * anterior, sin necesitar footage.
 *
 * Cifras y cita EXACTAS del post ("1,440 horas recuperadas al ano", "mas
 * de 160 citas adicionales mensuales", cita de Mayli Parra) — ninguna
 * cifra nueva inventada. El post mismo marca estas cifras como
 * "estimaciones nuestras a partir de los datos del cliente", atribucion
 * que se replica tal cual en pantalla.
 *
 * Frame plan @24fps: cold_open 120f (5.0s) + case_stat_horas 168f (7.0s)
 * + case_stat_citas 168f (7.0s) + quote 168f (7.0s) + honest_note 120f
 * (5.0s) + brand_close 192f (8.0s) = 936f = 39.000s exacto
 * (tail_padding_seconds: 0 en props).
 *
 * Ver LoQueDecidioDmpConsulting.art-direction.md, .decision_log.json,
 * .scene_plan.json y .gates.json.
 */
export interface LoQueDecidioDmpConsultingProps {
  musicSrc: string;
  logoSrc: string;
  sfxWhooshSrc?: string;
  [key: string]: unknown;
}

const S1 = 120;
const S2 = 168;
const S3 = 168;
const S4 = 168;
const S5 = 120;
const S6 = 192;

export const LO_QUE_DECIDIO_DMP_CONSULTING_TOTAL_FRAMES = S1 + S2 + S3 + S4 + S5 + S6; // 936

const START1 = 0;
const START2 = START1 + S1; // 120
const START3 = START2 + S2; // 288
const START4 = START3 + S3; // 456
const START5 = START4 + S4; // 624
const START6 = START5 + S5; // 744

const DMP_ATTRIBUTION = "DMP Consulting Services, Houston/Katy TX . estimacion de AetherLogik a partir de los datos del cliente.";

function musicVolume(frame: number): number {
  const dipStart = START4;
  const dipEnd = START4 + 14;
  const riseStart = START5 + S5 - 16;
  const riseEnd = START5 + S5;
  if (frame < dipStart) return 1.0;
  if (frame < dipEnd) return interpolate(frame, [dipStart, dipEnd], [1.0, 0.55], { extrapolateRight: "clamp" });
  if (frame < riseStart) return 0.55;
  if (frame < riseEnd) return interpolate(frame, [riseStart, riseEnd], [0.55, 1.0], { extrapolateRight: "clamp" });
  return 1.0;
}

export const LoQueDecidioDmpConsulting: React.FC<LoQueDecidioDmpConsultingProps> = ({
  musicSrc,
  logoSrc,
  sfxWhooshSrc,
}) => {
  return (
    <AbsoluteFill style={{ background: BRAND.bg }}>
      <Audio src={musicSrc} volume={musicVolume} />

      {sfxWhooshSrc && (
        <Sequence from={START6 + 4} durationInFrames={20} name="sfx_whoosh_close">
          <Audio src={sfxWhooshSrc} volume={0.5} />
        </Sequence>
      )}

      {/* Scene 1 — cold_open. */}
      <Sequence from={START1} durationInFrames={S1} name="cold_open">
        <KineticHeadline
          lines={["DMP Consulting Services", "coordinaba a 5 consultores", "bilingues a mano."]}
          fontSize={38}
          position="center"
        />
      </Sequence>

      {/* Scene 2 — case_stat_horas. Cifra + atribucion en el MISMO frame. */}
      <Sequence from={START2} durationInFrames={S2} name="case_stat_horas">
        <StatReveal stat="1,440 horas" label="recuperadas al ano al automatizar con n8n" accentColor={BRAND.accent} position="center" />
        <HeadlineOverlay text={DMP_ATTRIBUTION} position="bottom" scrim fontSize={20} />
      </Sequence>

      {/* Scene 3 — case_stat_citas. Cifra + atribucion en el MISMO frame. */}
      <Sequence from={START3} durationInFrames={S3} name="case_stat_citas">
        <StatReveal stat="+160 citas" label="adicionales cada mes, sin contratar personal" accentColor={BRAND.accent} position="center" />
        <HeadlineOverlay text={DMP_ATTRIBUTION} position="bottom" scrim fontSize={20} />
      </Sequence>

      {/* Scene 4 — quote. Cita + atribucion en el MISMO frame
          (HeadlineOverlay.subtitle, no un overlay separado). */}
      <Sequence from={START4} durationInFrames={S4} name="quote">
        <HeadlineOverlay
          text="La automatizacion nos permitio enfocarnos en lo que realmente importa: el trabajo con los clientes."
          subtitle="— Mayli Parra, DMP Consulting Services"
          subtitleFontSize={22}
          fontSize={34}
          fontWeight={600}
          position="center"
        />
      </Sequence>

      {/* Scene 5 — honest_note. Fiel al tono honesto del post (parrafo de
          la empresa de limpieza: Zapier a veces es mejor opcion; el post no
          le da nombre, se mantiene generica a proposito). */}
      <Sequence from={START5} durationInFrames={S5} name="honest_note">
        <KineticHeadline
          lines={["Para un caso simple,", "la respuesta honesta", "a veces es Zapier."]}
          accentWord="honesta"
          fontSize={40}
          position="center"
        />
      </Sequence>

      {/* Scene 6 — brand_close. CTA REAL (unico reel de la serie que
          vende — formula ganadora GO-4/4). */}
      <Sequence from={START6} durationInFrames={S6} name="brand_close">
        <FilmGrade vignette={0.35} grainOpacity={0.1}>
          <BrandClose
            wordmark="AetherLogik"
            tagline="Automatizacion honesta para negocios reales."
            url="cal.com/aetherlogik/discovery . agenda tu diagnostico gratuito ->"
            logoSrc={logoSrc}
            accentColor={BRAND.accent}
            backgroundColor={BRAND.bg}
          />
        </FilmGrade>
      </Sequence>
    </AbsoluteFill>
  );
};
