# Serie "reels-hvac-serie" — verify final: NO-GO (v1), pendiente re-mux de audio en 2/4 reels (2026-08-21)

> [!danger] Veredicto de la serie: **NO-GO (v1)** — pendiente 1 re-mux de audio puntual, no un rehaul
> Los 4 videos fueron renderizados por `devops-aetherlogik-homelab` (HEAD `cdcd483`; gate `npx remotion compositions` pasó; `tsc` 0; `hf lint` 0/0, bloque HyperFrames en 31.1s de render). El verify final INDEPENDIENTE de `video-producer` (descarga propia, `ffprobe`/LUFS/BPM/`coherence_guard`/paleta/beats-en-píxeles con `ffmpeg`+Python locales, sin confiar en el reporte de devops) confirma que **2 de 4 reels pasan limpio** (`lo-que-te-cuesta-facturar-a-mano`, `como-funciona-la-automatizacion-de-facturacion`) y **2 de 4 tienen `true peak` POSITIVO post-AAC** (`los-numeros-de-marino-hvac` +0.15 dBTP, `lo-que-necesitas-para-automatizar` +0.52 dBTP) — clipping real, no margen. Falta un único paso: que devops re-muxee el audio de esos 2 reels con más headroom pre-AAC (técnica ya validada por mí, ver abajo).

Quinta serie de la línea `reels-del-blog`. Fuente del blog:
`automatizar-facturacion-hvac-cuanto-pierdes.md` (D:\aetherlogik-astro).

## Los 4 videos — links + veredicto final

| # | Reel | R2 | Duración | Runtime | Veredicto |
|---|---|---|---|---|---|
| 1 | Lo que te cuesta facturar a mano (gancho) | `agency/reels-hvac-serie/lo-que-te-cuesta-facturar-a-mano-v1.mp4` | 30.0s exacto | Remotion (atelier), 1 hero i2v | **GO** |
| 2 | Cómo funciona la automatización de facturación | `agency/reels-hvac-serie/como-funciona-la-automatizacion-de-facturacion-v1.mp4` | 46.0s exacto | HÍBRIDO Remotion + HyperFrames | **GO** |
| 3 | Los números de Marino HVAC (caso real) | `agency/reels-hvac-serie/los-numeros-de-marino-hvac-v1.mp4` | 45.0s exacto | Remotion (atelier), 1 hero i2v | **NO-GO** (true peak, ver abajo) |
| 4 | Lo que necesitas para automatizar (cierre) | `agency/reels-hvac-serie/lo-que-necesitas-para-automatizar-v1.mp4` | 45.0s exacto | Remotion (atelier) | **NO-GO** (true peak, ver abajo) |

Todos servidos desde `https://media.aetherlogik.com/<ruta de arriba>`, todos
`curl 200`, descargados y auditados byte-a-byte por `video-producer` de forma
independiente (no solo el reporte de devops).

## LUFS — verificado independiente, coincide EXACTO con el reporte de devops

| Reel | LUFS devops | LUFS medido independiente |
|---|---|---|
| 1 | -14.06 | -14.06 |
| 2 | -14.02 | -14.02 |
| 3 | -14.03 | -14.03 |
| 4 | -13.95 | -13.95 |

Coincidencia exacta a 2 decimales en los 4 — confirma que el audio es real
y el finishing se aplicó tal como se declara.

## El defecto de audio — decisión del director (no se archiva como excepción)

Devops midió true peak positivo post-encode AAC en 2 reels y presentó el
contexto ("las plataformas recomprimen igual, +0.15 es marginal") junto
con 2 alternativas ya descartadas por peores resultados (forzar lineal →
-17.82 LUFS; `alimiter` sin oversampling → +1.55 dBTP). **Decisión: FIX
REQUERIDO en ambos, no una excepción documentada.**

Razonamiento: `premium-craft-standards.md` §5 fija **-1.0 dBTP** como
target duro precisamente para absorber el overshoot de inter-sample peaks
que introduce un encoder AAC — un true peak que termina **positivo**
significa que el archivo entregado clipea de verdad al decodificar, no
que le falte "un pelo" de margen. "Las plataformas recomprimen igual" no
es un argumento técnico válido: la recompresión no revierte un overshoot
ya presente en el archivo que se sube. Regla de oro de la agencia: "un
gate en rojo se arregla y se re-verifica; no se entrega."

**Validé la técnica yo mismo antes de instruirla** (no propago un
`fix_instruction` como hipótesis sin probar — P-09): tomé el audio de cada
`v1.mp4` (extracción estéreo 48kHz, no el downmix mono de un primer
intento inválido), corrí `loudnorm` 2-pasadas con **`TP=-2.0`** en vez de
`-1.0` (manteniendo `I=-14`/`LRA` medido), re-encodé a AAC, y volví a medir
el archivo resultante de forma independiente:

| Reel | TP antes (v1, medido) | TP simulado con headroom -2.0 | LUFS simulado |
|---|---|---|---|
| 3 (Marino HVAC) | **+0.15 dBTP** (clipping) | **-1.77 dBTP** | -14.00 |
| 4 (cierre) | **+0.52 dBTP** (clipping, el más severo) | **-1.81 dBTP** | -14.05 |

La técnica **funciona**: el true peak queda cómodamente negativo en ambos
y el LUFS se mantiene dentro de banda (±0.1 de -14).

## Instrucción exacta para devops (audio-only, sin re-render de video)

Para `los-numeros-de-marino-hvac` y `lo-que-necesitas-para-automatizar`:

1. Tomar el mix **PRE-AAC** original (el bus antes de tu pasada 2 de
   `loudnorm` — **NO** el `m4a`/`mp4` ya entregado, para no doble-procesar).
2. Correr `loudnorm` pasada 2 con **`TP=-2.0`** (en vez de `-1.0`),
   manteniendo `I=-14` y el `LRA` medido en tu propia pasada 1.
3. Re-encode a AAC 256kbps/48kHz.
4. Re-mux con el video **YA finalizado** vía `-c:v copy` (no re-renderizar
   Remotion, no re-aplicar el grade FFmpeg de video — el video ya pasó el
   verify visual limpio).
5. Subir como `<reel>-v2.mp4` **SIN sobreescribir** el `-v1.mp4` (mismo
   patrón P-05/P-13: nunca reintroducir el master viejo por accidente).

`video-producer` re-verifica SOLO el audio de esos 2 archivos (LUFS +
true peak independientes) tras el re-mux y emite el GO final de la serie.

## BPM — verificado independiente por autocorrelación

| Reel | BPM declarado | BPM medido | Delta |
|---|---|---|---|
| 1 | 130 | 129.3 | 0.7 |
| 2 | 124 | 124.0 | 0.0 (exacto) |
| 3 | 122 | 121.5 | 0.5 |
| 4 | 134 | 133.6 | 0.4 |

Los 4 dentro de la banda 120-140 exigida; deltas comparables a las 4
series anteriores.

## `coherence_guard` — los 2 heroes i2v (reel 1 y reel 3)

Ambos verificados en 2 frames (1.0s, 4.0s): mismo personaje, mismo espacio,
misma paleta, movimiento sutil, sin drift. **PASS en los 2.**

## Paleta HSV (region+control) — con diagnóstico de falso positivo en heroes reales

Escaneo programático en 14 frames. Las escenas motion-autoradas (`stat_reveal`,
`brand_close`, `checklist`, `steps_list`) dan **≤0.036%** de cyan/violeta —
ruido de antialiasing, dentro del precedente. Los 4 frames de heroes i2v
dieron un `raw HSV` más alto (0.56%–2.68%) que precedentes anteriores; un
segundo pase con umbral "neon" (saturación >0.45 Y valor >0.35, para
distinguir un accent visible de ruido) confirmó **0 píxeles neon en los 4**
— el `raw HSV` capturado es sombra oscura/tela gris-azulada de la
fotografía real (valor medio ~0.10–0.18, no perceptible como cian/violeta
a simple vista, confirmado visualmente). **PASS**, con la metodología
documentada para que el próximo verify use el mismo doble-umbral en vez de
solo el HSV crudo (evita un falso NO-GO por sombra de foto real).

## Beats en píxeles — la regla dura de atribución, confirmada en el MP4 real

Frame de `stat_reveal` (reel 3, 15.0s): **"$4,400" + "perdidos al mes, en
88 facturas" + "Estimación de AetherLogik a partir de los datos del
cliente."** — los tres elementos visibles en el **mismo frame**,
confirmado en píxeles reales (no solo leyendo el código). Los 4
`brand_close` (incluido el CTA final de conversión del reel 4,
`aetherlogik.com/para-hvac . agenda tu diagnóstico gratuito ->`) muestran
el texto centrado con margen simétrico en ambos lados, sin bleed al borde
— el fix de `BrandClose.tsx` (P-13) sigue sano en esta serie.

## Presupuesto final

Costo real de assets generativos: **~$3.10 USD** contra un techo de ~$25
declarado en la misión.

## Handoffs pendientes

- **devops-aetherlogik-homelab**: re-mux de audio de los reels 3 y 4 (ver
  instrucción exacta arriba) + subir como `-v2.mp4`.
- **video-producer (siguiente pase, corto)**: re-verificar SOLO el audio
  (LUFS + true peak independientes) de esos 2 archivos y emitir el GO
  final de la serie.
- **skill-curator**: P-15 nueva en `Video-problemas.md` — el gotcha de
  true-peak-positivo-post-AAC-encode y la técnica de fix validada
  (headroom `TP=-2.0` pre-encode) vale la pena incorporarse a
  `premium-craft-standards.md` §5 como regla dura, no solo como hallazgo
  puntual de esta serie.

## 📌 Para memoria

- Primera vez en la línea `reels-del-blog` que el defecto detectado en el
  verify final es de **audio** (no de layout/`brand_close` como en
  P-13) — y primera vez que el hallazgo llega ya con 2 alternativas
  descartadas por devops (contexto útil, pero no una decisión tomada por
  mí: yo validé la tercera opción con números propios antes de instruirla).
- El "downmix mono + resample" de una primera extracción de audio para
  simular el fix dio una medición de LUFS completamente distinta (-17.6
  vs -14.0 real) — recordatorio de que **el método de extracción cambia
  la medición** (mono downmix ≠ estéreo original para BS.1770); la
  simulación válida se hizo re-extrayendo estéreo a la frecuencia de
  muestreo del máster (48kHz).
- El diagnóstico de "neon vs sombra" en el escaneo de paleta (segundo
  umbral saturación+valor) evitó declarar NO-GO por un falso positivo en
  los heroes i2v — vale la pena que quede en el checklist de verify de
  `aetherlogik-video`, no solo como una nota de esta sesión.
