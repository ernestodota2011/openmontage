import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export interface BrandCloseProps {
  wordmark: string;
  tagline?: string;
  url?: string;
  logoSrc?: string; // path in public/ (staticFile-resolved) or absolute http(s) URL
  accentColor?: string;
  backgroundColor?: string;
  /** Base ("cream") color for the wordmark's non-accented part in the
   * official two-tone treatment. No exact "crema" hex is registered yet in
   * the brand identity doc — this warm-white sits in until one is (closed
   * decision 2026-07-05). */
  wordmarkColor?: string;
  /** Substring of `wordmark` to render in `accentColor` (case-insensitive,
   * first match only). Official two-tone treatment: "Aether" (wordmarkColor)
   * + "Logik" (accentColor) — defaults to "Logik" to match the AetherLogik
   * wordmark used across the fork. Ignored when `wordmarkMono` is true or
   * when the substring isn't found in `wordmark` (graceful mono fallback —
   * safe for other callers of this shared component). */
  wordmarkAccentPart?: string;
  /** Force single-color legacy rendering, skipping the two-tone split. */
  wordmarkMono?: boolean;
}

/**
 * BrandClose — closing card: logo mark (or wordmark text alone) + tagline +
 * url, centered, boxless, converging fade/scale-in on a solid brand
 * background. Added for the AetherLogik brand reel pilot (2026-07-04) —
 * none of the existing cut types support a 3-tier stacked close
 * (mark + tagline + url) without hardcoded off-brand colors.
 *
 * Wordmark two-tone treatment added 2026-07-05 (official brand decision:
 * "Aether" crema + "Logik" ember) — parametrized, not hardcoded to this
 * reel's exact string, so other callers of this shared component keep
 * working (mono fallback when `wordmarkAccentPart` isn't found, or force
 * it explicitly via `wordmarkMono`).
 *
 * FIX (2026-08-21, cherry-pick de commit 706d449 en
 * `aetherlogik/reels-inmobiliarios-serie` — auditoria retroactiva de
 * video-producer sobre los 12 reels ya publicados de esta y otras 2
 * series): el `<div>` del `url` no tenia `maxWidth` ni `textAlign:
 * "center"` (a diferencia del `tagline`, que si los tiene). Con un CTA
 * corto que cabe en 1 linea, el div se encoge al contenido y el
 * `alignItems: "center"` del AbsoluteFill padre lo centra por accidente —
 * pero en cuanto el texto es lo bastante ancho para necesitar wrap, el div
 * crece al 100% del contenedor, pierde el centrado y el texto queda
 * pegado al borde izquierdo (text-align default de un div = left), sin
 * margen. Bug de layout LATENTE del componente compartido (no de un reel
 * puntual) — confirmado en produccion: `lo-que-ya-puedes-delegar-v1.mp4`,
 * `lo-que-la-ia-no-puede-hacer-v1.mp4` y `como-empezar-sin-desorden-v1.mp4`
 * de ESTA serie lo tenian (3 de 4). Se arregla en la RAIZ (maxWidth +
 * textAlign, igual que ya hacia `tagline`) en vez de acortar el copy de
 * cada CTA como parche. Ver P-13 en `Video-problemas.md`.
 */
export const BrandClose: React.FC<BrandCloseProps> = ({
  wordmark,
  tagline,
  url,
  logoSrc,
  accentColor = "#FF6B1A",
  backgroundColor = "#0A0A0A",
  wordmarkColor = "#F5EFE0",
  wordmarkAccentPart = "Logik",
  wordmarkMono = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const markSpring = spring({ frame, fps, config: { damping: 16, stiffness: 90 } });
  const markScale = interpolate(markSpring, [0, 1], [0.9, 1]);
  const taglineOpacity = spring({ frame: frame - 10, fps, config: { damping: 20 } });
  const urlOpacity = spring({ frame: frame - 18, fps, config: { damping: 20 } });

  const resolvedLogoSrc = logoSrc
    ? logoSrc.startsWith("http://") || logoSrc.startsWith("https://")
      ? logoSrc
      : staticFile(logoSrc)
    : undefined;

  const accentIdx = wordmarkMono
    ? -1
    : wordmark.toLowerCase().indexOf(wordmarkAccentPart.toLowerCase());

  const wordmarkNode =
    accentIdx === -1 ? (
      <span style={{ color: wordmarkColor }}>{wordmark}</span>
    ) : (
      <>
        <span style={{ color: wordmarkColor }}>{wordmark.slice(0, accentIdx)}</span>
        <span style={{ color: accentColor }}>
          {wordmark.slice(accentIdx, accentIdx + wordmarkAccentPart.length)}
        </span>
        <span style={{ color: wordmarkColor }}>
          {wordmark.slice(accentIdx + wordmarkAccentPart.length)}
        </span>
      </>
    );

  return (
    <AbsoluteFill
      style={{
        background: backgroundColor,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {resolvedLogoSrc ? (
        <Img
          src={resolvedLogoSrc}
          style={{
            width: 140,
            height: 140,
            objectFit: "contain",
            opacity: markSpring,
            transform: `scale(${markScale})`,
          }}
        />
      ) : null}
      <div
        style={{
          marginTop: resolvedLogoSrc ? 28 : 0,
          opacity: markSpring,
          transform: `scale(${markScale})`,
          fontSize: 88,
          fontWeight: 800,
          fontFamily: "Inter, system-ui, sans-serif",
          letterSpacing: "-0.01em",
        }}
      >
        {wordmarkNode}
      </div>
      {tagline && (
        <div
          style={{
            marginTop: 20,
            opacity: taglineOpacity,
            fontSize: 30,
            fontWeight: 400,
            fontStyle: "italic",
            fontFamily: "Inter, system-ui, sans-serif",
            color: "#D4D4D4",
            textAlign: "center",
            maxWidth: "80%",
          }}
        >
          {tagline}
        </div>
      )}
      {url && (
        <div
          style={{
            marginTop: 22,
            opacity: urlOpacity,
            fontSize: 26,
            fontWeight: 600,
            fontFamily: "Inter, system-ui, sans-serif",
            color: accentColor,
            letterSpacing: "0.02em",
            textAlign: "center",
            maxWidth: "82%",
          }}
        >
          {url}
        </div>
      )}
    </AbsoluteFill>
  );
};
