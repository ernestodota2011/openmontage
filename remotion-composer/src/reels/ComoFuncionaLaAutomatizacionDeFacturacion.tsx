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
import { BrandClose } from "../components/BrandClose";
import { FilmGrade } from "../components/FilmGrade";

/**
 * ComoFuncionaLaAutomatizacionDeFacturacion — reel 2/4 (didactico) de la
 * serie reels-hvac-serie. Runtime HIBRIDO (los 3 ejes se presentan en el
 * proposal, ver decision_log d-001): el bloque 'factura_automatica' (5
 * items EXACTOS derivados de la seccion 'Como funciona la automatizacion
 * de facturacion' del post: GPS, fotos/codigo de barras, precios
 * cargados, factura generada sola, envio+pago inmediato) se autora en
 * HYPERFRAMES (HTML/CSS puro, `data-no-timeline` — ver
 * hyperframes-compositions/facturacion-automatica-checklist/index.html),
 * NO en Remotion — mismo patron GO'd en LoQueYaPuedesAutomatizar.tsx /
 * LoQueYaPuedesDelegar.tsx de las series anteriores. Se renderiza aparte
 * en el CT 128 (hf lint . && hf render, comando canonico de la skill
 * aetherlogik-hyperframes) y se compone aqui como UN clip MP4
 * (facturacionAutomaticaSrc).
 *
 * Sin escena i2v en este reel — el presupuesto de "1 hero i2v" de la
 * serie se reparte entre reel 1 y reel 3 (ver decision_log d-002).
 *
 * Frame plan @24fps: cold_open 96f (4.0s) + intake_beat 216f (9.0s) +
 * factura_automatica 480f (20.0s) [clip HyperFrames] + caveat 120f (5.0s)
 * + brand_close 192f (8.0s) = 1104f = 46.000s exacto
 * (tail_padding_seconds: 0 en props).
 *
 * Ver ComoFuncionaLaAutomatizacionDeFacturacion.art-direction.md,
 * .decision_log.json, .scene_plan.json y .gates.json.
 */
export interface ComoFuncionaLaAutomatizacionDeFacturacionProps {
  facturacionAutomaticaSrc: string;
  musicSrc: string;
  logoSrc: string;
  sfxChipSrc?: string;
  [key: string]: unknown;
}

const S1 = 96;
const S2 = 216;
const S3 = 480;
const S4 = 120;
const S5 = 192;

export const COMO_FUNCIONA_LA_AUTOMATIZACION_DE_FACTURACION_TOTAL_FRAMES = S1 + S2 + S3 + S4 + S5; // 1104

const START1 = 0;
const START2 = START1 + S1; // 96
const START3 = START2 + S2; // 312
const START4 = START3 + S3; // 792
const START5 = START4 + S4; // 912

function musicVolume(frame: number): number {
  // Se retira levemente durante la segunda mitad de factura_automatica
  // (mas intimo bajo el checklist denso), sube antes del caveat.
  const dipStart = START3 + 240; // mitad del bloque HyperFrames
  const dipEnd = dipStart + 20;
  const riseStart = START4 - 16;
  const riseEnd = START4;
  if (frame < dipStart) return 1.0;
  if (frame < dipEnd) return interpolate(frame, [dipStart, dipEnd], [1.0, 0.65], { extrapolateRight: "clamp" });
  if (frame < riseStart) return 0.65;
  if (frame < riseEnd) return interpolate(frame, [riseStart, riseEnd], [0.65, 1.0], { extrapolateRight: "clamp" });
  return 1.0;
}

const INTAKE_TAGS: QualifyTag[] = [
  { label: "LLEGADA", value: "Registrada automaticamente por GPS" },
  { label: "TRABAJO", value: "Fotos y codigo de barras de cada pieza" },
  { label: "PRECIOS", value: "Tarifas e inventario ya actualizados" },
  { label: "SINCRONIZACION", value: "Todo en tiempo real, sin transcribir" },
];

// Offsets (relativos a START3) de los 5 item-reveals del clip HyperFrames
// (2.0s, 5.0s, 8.5s, 12.0s, 15.5s @24fps) — usados para sincronizar el
// sfx_chip con cada nodo que se enciende.
const CHIP_OFFSETS_F = [48, 120, 204, 288, 372];

export const ComoFuncionaLaAutomatizacionDeFacturacion: React.FC<ComoFuncionaLaAutomatizacionDeFacturacionProps> = ({
  facturacionAutomaticaSrc,
  musicSrc,
  logoSrc,
  sfxChipSrc,
}) => {
  return (
    <AbsoluteFill style={{ background: BRAND.bg }}>
      <Audio src={musicSrc} volume={musicVolume} />

      {sfxChipSrc &&
        CHIP_OFFSETS_F.map((off, i) => (
          <Sequence key={i} from={START3 + off} durationInFrames={12} name={`sfx_chip_item${i + 1}`}>
            <Audio src={sfxChipSrc} volume={0.4} />
          </Sequence>
        ))}

      {/* Scene 1 — cold_open. Tipografia cinetica, sin costo de asset. */}
      <Sequence from={START1} durationInFrames={S1} name="cold_open">
        <KineticHeadline
          lines={["Asi funciona,", "paso a paso."]}
          fontSize={52}
          position="center"
        />
      </Sequence>

      {/* Scene 2 — intake_beat. Cascada de 4 QualifyTag: la fase de captura
          en el campo, fiel al post ("el sistema registra automaticamente
          la hora de llegada usando GPS... toda esta informacion se
          sincroniza en tiempo real"). */}
      <Sequence from={START2} durationInFrames={S2} name="intake_beat">
        <TagRevealList tags={INTAKE_TAGS} staggerFrames={40} />
        <HeadlineOverlay text="Todo se captura desde el campo" position="bottom" scrim fontSize={28} />
      </Sequence>

      {/* Scene 3 — factura_automatica. Clip HyperFrames, mismo patron que
          las 4 series anteriores. */}
      <Sequence from={START3} durationInFrames={S3} name="factura_automatica">
        <AbsoluteFill style={{ background: BRAND.bg }}>
          <OffthreadVideo
            src={facturacionAutomaticaSrc}
            muted
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 4 — caveat. Fiel al post: para casos especiales se puede
          exigir aprobacion manual antes del envio. */}
      <Sequence from={START4} durationInFrames={S4} name="caveat">
        <KineticHeadline
          lines={["Para casos especiales,", "puedes exigir aprobacion", "manual antes de enviar."]}
          accentWord="especiales"
          fontSize={40}
          position="center"
        />
      </Sequence>

      {/* Scene 5 — brand_close. CTA al reel 3 de la serie. */}
      <Sequence from={START5} durationInFrames={S5} name="brand_close">
        <FilmGrade vignette={0.35} grainOpacity={0.1}>
          <BrandClose
            wordmark="AetherLogik"
            tagline="Automatizacion real para empresas de HVAC."
            url="aetherlogik.com/blog . el caso real de Marino HVAC, en el proximo video ->"
            logoSrc={logoSrc}
            accentColor={BRAND.accent}
            backgroundColor={BRAND.bg}
          />
        </FilmGrade>
      </Sequence>
    </AbsoluteFill>
  );
};
