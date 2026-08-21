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
import { TagRevealList, QualifyTag } from "../components/TagRevealList";
import { StatReveal } from "../components/StatReveal";
import { BrandClose } from "../components/BrandClose";
import { FilmGrade } from "../components/FilmGrade";

/**
 * CasoRealMedicinaEstetica — reel 3/4 de la serie reels-clinicas-serie.
 * Caso real: red de clinicas de medicina estetica en EE. UU. (post NO la
 * nombra; este reel tampoco — aislamiento de cliente, ver decision_log
 * d-002). Un unico hero i2v anonimizado + 4 items implementados + las 3
 * cifras EXACTAS del post (sin redondeo) + atribucion.
 *
 * GUARD: StatReveal.tsx tiene accentColor default "#A78BFA" (violeta,
 * PROHIBIDO). Las 3 escenas de cifras pasan accentColor={BRAND.accent}
 * explicito siempre — ver CasoRealMedicinaEstetica.art-direction.md.
 *
 * Frame plan @24fps: cold_open_hero 120f (5.0s) + what_they_did 192f
 * (8.0s) + stat1_125h 168f (7.0s) + stat2_66 168f (7.0s) + stat3_99 168f
 * (7.0s) + attribution 120f (5.0s) + brand_close 144f (6.0s) = 1080f =
 * 45.000s exacto (tail_padding_seconds: 0 en props).
 *
 * Ver CasoRealMedicinaEstetica.art-direction.md, .decision_log.json,
 * .scene_plan.json y .gates.json (auto-score pre-render).
 */
export interface CasoRealMedicinaEsteticaProps {
  heroVideoSrc: string;
  musicSrc: string;
  logoSrc: string;
  sfxConfirmSrc?: string;
  [key: string]: unknown;
}

const S1 = 120;
const S2 = 192;
const S3 = 168;
const S4 = 168;
const S5 = 168;
const S6 = 120;
const S7 = 144;

export const CASO_REAL_MEDICINA_ESTETICA_TOTAL_FRAMES = S1 + S2 + S3 + S4 + S5 + S6 + S7; // 1080

const START1 = 0;
const START2 = START1 + S1; // 120
const START3 = START2 + S2; // 312
const START4 = START3 + S3; // 480
const START5 = START4 + S4; // 648
const START6 = START5 + S5; // 816
const START7 = START6 + S6; // 936

function musicVolume(frame: number): number {
  // Baja durante attribution (letra chica, mas intimo) y sube en brand_close.
  const dipStart = START6;
  const dipEnd = START6 + 14;
  const riseStart = START7 - 8;
  const riseEnd = START7 + 8;
  if (frame < dipStart) return 1.0;
  if (frame < dipEnd) return interpolate(frame, [dipStart, dipEnd], [1.0, 0.55], { extrapolateRight: "clamp" });
  if (frame < riseStart) return 0.55;
  if (frame < riseEnd) return interpolate(frame, [riseStart, riseEnd], [0.55, 1.0], { extrapolateRight: "clamp" });
  return 1.0;
}

const WHAT_THEY_DID_TAGS: QualifyTag[] = [
  { label: "✓", value: "Confirmacion y recordatorio automatico por WhatsApp y SMS" },
  { label: "✓", value: "Sincronizacion de citas entre todas las sedes" },
  { label: "✓", value: "Conexion entre resultados medicos y expediente del paciente" },
  { label: "✓", value: "Panel unificado para el equipo de coordinacion" },
];

export const CasoRealMedicinaEstetica: React.FC<CasoRealMedicinaEsteticaProps> = ({
  heroVideoSrc,
  musicSrc,
  logoSrc,
  sfxConfirmSrc,
}) => {
  return (
    <AbsoluteFill style={{ background: BRAND.bg }}>
      <Audio src={musicSrc} volume={musicVolume} />

      {sfxConfirmSrc && (
        <>
          <Sequence from={START3 + 20} durationInFrames={20} name="sfx_confirm_stat1">
            <Audio src={sfxConfirmSrc} volume={0.45} />
          </Sequence>
          <Sequence from={START4 + 20} durationInFrames={20} name="sfx_confirm_stat2">
            <Audio src={sfxConfirmSrc} volume={0.45} />
          </Sequence>
          <Sequence from={START5 + 20} durationInFrames={20} name="sfx_confirm_stat3">
            <Audio src={sfxConfirmSrc} volume={0.45} />
          </Sequence>
        </>
      )}

      {/* Scene 1 — cold_open_hero. UNICO i2v real de este reel, anonimizado. */}
      <Sequence from={START1} durationInFrames={S1} name="cold_open_hero">
        <AbsoluteFill style={{ background: BRAND.bg }}>
          <OffthreadVideo
            src={heroVideoSrc}
            muted
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </AbsoluteFill>
        <HeadlineOverlay
          text="Una red de clinicas de medicina estetica en EE. UU. tenia el mismo problema."
          subtitle="A mayor escala."
          position="bottom"
          scrim
          fontSize={32}
        />
      </Sequence>

      {/* Scene 2 — what_they_did. Los 4 items EXACTOS del post. */}
      <Sequence from={START2} durationInFrames={S2} name="what_they_did">
        <TagRevealList tags={WHAT_THEY_DID_TAGS} staggerFrames={32} />
        <HeadlineOverlay text="Lo que se implemento" position="bottom" scrim fontSize={28} />
      </Sequence>

      {/* Scene 3 — stat1_125h. accentColor override OBLIGATORIO (default violeta). */}
      <Sequence from={START3} durationInFrames={S3} name="stat1_125h">
        <StatReveal
          stat="+125"
          label="horas/semana recuperadas por el equipo de coordinacion"
          accentColor={BRAND.accent}
          position="center"
        />
      </Sequence>

      {/* Scene 4 — stat2_66. accentColor override OBLIGATORIO. */}
      <Sequence from={START4} durationInFrames={S4} name="stat2_66">
        <StatReveal
          stat="+66%"
          label="de capacidad de llamadas del equipo de setters"
          accentColor={BRAND.accent}
          position="center"
        />
      </Sequence>

      {/* Scene 5 — stat3_99. accentColor override OBLIGATORIO. */}
      <Sequence from={START5} durationInFrames={S5} name="stat3_99">
        <StatReveal
          stat="99%"
          label="de precision en la sincronizacion de resultados medicos entre sedes"
          accentColor={BRAND.accent}
          position="center"
        />
      </Sequence>

      {/* Scene 6 — attribution. Letra chica, muted, vara exacta del post. */}
      <Sequence from={START6} durationInFrames={S6} name="attribution">
        <KineticHeadline
          lines={["Datos reportados por su equipo.", "Cliente de AetherLogik — identidad resguardada", "por acuerdo de confidencialidad."]}
          color={BRAND.muted}
          fontSize={26}
          position="center"
        />
      </Sequence>

      {/* Scene 7 — brand_close. CTA al reel 4 de la serie. */}
      <Sequence from={START7} durationInFrames={S7} name="brand_close">
        <FilmGrade vignette={0.35} grainOpacity={0.1}>
          <BrandClose
            wordmark="AetherLogik"
            tagline="Resultados reales, no promesas."
            url="aetherlogik.com/blog . que cambia en TU clinica, en el proximo video ->"
            logoSrc={logoSrc}
            accentColor={BRAND.accent}
            backgroundColor={BRAND.bg}
          />
        </FilmGrade>
      </Sequence>
    </AbsoluteFill>
  );
};
