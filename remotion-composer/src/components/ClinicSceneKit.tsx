import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BRAND, EASING, SPRINGS } from "../theme";
import { EmberThread } from "./EmberThread";

/**
 * ClinicSceneKit — bespoke atelier scene(s) for the reels-clinicas-serie
 * (blog->reel de `automatizar-citas-clinica-miami.md`). ChatThreadScene y
 * CapabilitySceneKit (serie chatbot-whatsapp-para-negocios) son de UN solo
 * hilo de mensajeria — ningun device existente cubre "N sedes
 * sincronizando en simultaneo", que es literalmente el contenido del
 * pilar 3 del post ("Sincronizacion entre sedes y con el historial
 * clinico"). Este archivo agrega ClinicSyncBoard sin duplicar ni tocar
 * los componentes de la serie anterior (aditivo, per bespoke-composition:
 * "reuse engine knowledge, never creative components").
 *
 * Anadido 2026-08-21 para la rama aetherlogik/reels-clinicas-serie
 * (continuacion del gancho "El ciclo que te cuesta horas").
 */

export interface ClinicLocation {
  name: string;
  slot: string;
}

/**
 * ClinicSyncBoard — N columnas (sedes), cada una con un mini-calendario;
 * un sweep ember horizontal marca el momento de sincronizacion y cada
 * columna recibe su tick ember EN CASCADA (stagger, no simultaneo — lee
 * como una ola real, no un flash instantaneo). Cierra con un chip
 * 'expediente del paciente conectado' bajo la fila, cumpliendo la
 * promesa exacta del post ('donde es posible, conecta con el expediente
 * del paciente').
 */
export const ClinicSyncBoard: React.FC<{
  locations: ClinicLocation[];
  syncAtFrame: number;
}> = ({ locations, syncAtFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const drift = interpolate(frame, [0, 156], [1.0, 1.02], {
    easing: EASING.camera,
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: BRAND.bg,
        transform: `scale(${drift})`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ width: "88%", display: "flex", flexDirection: "column", gap: 28, position: "relative" }}>
        <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
          {locations.map((loc, i) => {
            const tickAt = syncAtFrame + i * 8; // cascada, no simultaneo
            const s = spring({ frame: frame - tickAt, fps, config: SPRINGS.premium });
            const tickOpacity = interpolate(s, [0, 1], [0, 1]);
            const tickScale = interpolate(s, [0, 1], [0.7, 1]);
            const synced = frame >= tickAt;
            return (
              <div
                key={loc.name}
                style={{
                  flex: 1,
                  background: BRAND.surface,
                  border: `1px solid ${synced ? BRAND.accent : "rgba(245,245,245,0.12)"}`,
                  borderRadius: 12,
                  padding: "16px 14px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <div style={{ color: BRAND.text, fontSize: 20, fontWeight: 600, fontFamily: "Inter, system-ui, sans-serif" }}>
                  {loc.name}
                </div>
                <div style={{ color: BRAND.muted, fontSize: 16, fontFamily: "JetBrains Mono, monospace" }}>
                  {loc.slot}
                </div>
                <div
                  style={{
                    marginTop: 4,
                    opacity: tickOpacity,
                    transform: `scale(${tickScale})`,
                    color: BRAND.accent,
                    fontSize: 20,
                    fontWeight: 700,
                    fontFamily: "Inter, system-ui, sans-serif",
                  }}
                >
                  sincronizado
                </div>
              </div>
            );
          })}
        </div>

        {frame >= syncAtFrame + 40 && (
          <div
            style={{
              alignSelf: "center",
              opacity: interpolate(frame, [syncAtFrame + 40, syncAtFrame + 54], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              border: `1px solid ${BRAND.accent}`,
              borderRadius: 999,
              padding: "8px 20px",
              color: BRAND.accent,
              fontSize: 18,
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            expediente del paciente conectado
          </div>
        )}
      </div>

      {frame >= syncAtFrame && frame < syncAtFrame + 24 && (
        <AbsoluteFill>
          <EmberThread
            backgroundColor="transparent"
            accentColor={BRAND.accent}
            sweepSeconds={24 / fps}
            particleCount={0}
          />
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
