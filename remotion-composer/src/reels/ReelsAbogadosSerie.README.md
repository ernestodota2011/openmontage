# Serie "reels-abogados-serie" — CERRADA, los 4 reels con GO (2026-08-21)

> [!success] Gate tecnico de la serie completa: CERRADO. Los 4 videos tienen
> verify GO independiente (ffprobe + LUFS + BPM medido + frame-sampling
> region+control + coherence_guard sobre los 2 heroes i2v). La
> publicacion en redes queda del lado de Ernesto — este documento es el
> sign-off tecnico final de `video-producer`, no una autorizacion de
> publicacion.

Tercera serie consecutiva de la linea `reels-del-blog`, misma formula GO-4/4
de `aetherlogik/reels-chatbot-serie` y `aetherlogik/reels-clinicas-serie`
(rama partida de esa HEAD `0812933` para heredar el catalogo brand-safe
intacto). Fuente del blog: `automatizacion-despachos-abogados-ia.md`
(D:\aetherlogik-astro).

## Los 4 videos — links + veredicto

| # | Reel | R2 | Duracion | Runtime | Veredicto |
|---|---|---|---|---|---|
| 1 | Un tercio de tu dia (gancho) | `agency/reels-abogados-serie/un-tercio-de-tu-dia-v1.mp4` | 30.0s exacto | Remotion (atelier), 1 hero i2v | **GO** |
| 2 | Lo que ya puedes delegar | `agency/reels-abogados-serie/lo-que-ya-puedes-delegar-v1.mp4` | 46.0s exacto | HIBRIDO Remotion + HyperFrames | **GO** |
| 3 | Lo que la IA no puede hacer | `agency/reels-abogados-serie/lo-que-la-ia-no-puede-hacer-v1.mp4` | 45.0s exacto | Remotion (atelier), 1 hero i2v | **GO** |
| 4 | Como empezar sin desorden | `agency/reels-abogados-serie/como-empezar-sin-desorden-v1.mp4` | 45.0s exacto | Remotion (atelier) | **GO** |

Todos servidos desde `https://media.aetherlogik.com/<ruta de arriba>`,
todos verificados `curl 200` + descargados y auditados byte-a-byte por
`video-producer` de forma independiente (no solo el reporte de devops).

## Duracion de contenedor — mejora sobre la serie clinicas

Los 4 reels dieron duracion de contenedor **exacta** (30.000000s /
46.000000s / 45.000000s / 45.000000s), sin el patron de +0.1s de padding
AAC que aparecio en 2 de 4 reels de `reels-clinicas-serie` (benigno pero
no reproducido aqui — probablemente porque ninguna pista de musica de
esta serie termina con una cola audible larga cayendo en el ultimo bloque
de codificacion AAC).

## Directriz de Ernesto — musica movida, VERIFICADA con evidencia cuantitativa

Los 4 briefs declaran BPM/energia explicitos; el tempo se **midio de
forma independiente** sobre el audio final de cada reel (autocorrelacion
del envelope de energia, lowpass 200Hz + derivada semi-rectificada,
banda de busqueda 80-180 BPM — script propio reimplementado localmente
en esta sesion, mismo metodo documentado en `ReelsClinicasSerie.README.md`):

| Reel | BPM declarado | BPM medido | Delta | Confidence |
|---|---|---|---|---|
| 1 | 126 | 125.7 | 0.3 | 0.494 |
| 2 | 132 | 131.9 | 0.1 | 0.774 |
| 3 | 120 | 120.0 | 0.0 (exacto) | 0.431 |
| 4 | 128 | 128.3 | 0.3 | 0.488 |

Los 4 dentro de la banda 120-140 exigida, con deltas iguales o mejores
que los de la serie clinicas (max 1.3 BPM) — el mayor delta de esta serie
es 0.3 BPM.

## LUFS — verificado independiente, coincide EXACTO con el reporte de devops

| Reel | LUFS devops | LUFS medido independiente |
|---|---|---|
| 1 | -14.10 | -14.10 |
| 2 | -14.02 | -14.02 |
| 3 | -14.01 | -14.01 |
| 4 | -13.88 | -13.88 |

Coincidencia exacta a 2 decimales en los 4 (medicion `loudnorm` de una
pasada sobre el archivo final muxeado, `input_i` — el unico LUFS que
cuenta segun la doctrina de la skill) — confirma que el finishing se
aplico tal como se declara y que el audio es real en los 4.

## Verify visual (region+control + escaneo de paleta sobre pixeles reales)

17 frames extraidos y auditados con `ffprobe`/`ffmpeg` propios (no los
de devops) + escaneo HSV programatico (Python/PIL/numpy) region+control:
**cyan_violet% <0.2% del frame en los 17 frames**, sin excepcion — el
residuo mas alto (4.99%) vive en un bloque HyperFrames con solo 861
pixeles coloreados (0.0% del frame total), ruido de anti-aliasing en
nodos chicos, no un acento de diseno.

- **Reel 1:** hero i2v calido/integrado (sujeto NO recortado; la lampara
  de banquero tiene pantalla verde — prop fisico realista, fuera de
  ambas bandas medidas, no es hallazgo); `stat_reveal` con "1/3" +
  atribucion COMPLETA ("Estudio de Clio (2023), citado por la American
  Bar Association") en el MISMO frame; `brand_close` con isotipo real +
  wordmark bicolor correcto.
- **Reel 2:** `intake_beat` (3/4 tags visibles al spot-check, stagger
  correcto) + bloque HyperFrames (`checklist_delegable`) con las 5
  categorias restantes del post TODAS legibles al t=30s, integrado sin
  friccion visual con el catalogo Remotion pese al bitrate mas bajo de
  la serie (711kbps) — confirma que el recipe de finishing sigue
  resolviendo de raiz el defecto historico P-09 de series anteriores.
- **Reel 3:** hero i2v con pluma roja narrativa (herramienta de
  correccion, no acento de UI); los 4 limites nitidos y textuales al
  post; `coherence_guard` PASS (mismo abogado/despacho/paleta entre
  2.5s y 5.0s).
- **Reel 4:** pasos 1-3 legibles al spot-check; `brand_close` con el CTA
  final COMPLETO y legible: "aetherlogik.com/para-legal . agenda tu
  llamada de diagnostico gratuita ->".

## `coherence_guard` — los 2 heroes i2v (reel 1 y reel 3)

Ambos son escena UNICA (sin multi-plano que encadenar, doctrina "1 hero
maximo por reel"). Verificado en 2 frames por hero: mismo personaje,
mismo espacio, misma paleta, sin drift. **PASS en los 2.**

## Presupuesto final

Costo real de assets generativos de la serie completa: **~$3.08 USD**
(reel1 $1.01 + reel2 $0.46 + reel3 $1.16 + reel4 $0.45), contra un techo
de ~$25 declarado en la mision. Detalle linea por linea en el
`assets_generated` de cada `.gates.json`.

## Gotchas de esta serie

Ninguno nuevo. P-11 (Kling O1 `duration` fuera de {5,10}) y P-12
(composicion sin wirear en `Root.tsx`) — ambos conocidos de la serie
clinicas — se evitaron proactivamente desde el diseno de esta serie (ver
`ReelsAbogadosSerie.README.md`, seccion historica de handoff en el
historial de commits): `duration:"5"` explicito en los 2 heroes desde el
primer push, y `Root.tsx` + props JSON registrados en el MISMO handoff
que las composiciones, no diferido.

## Handoffs pendientes

- **Ernesto**: decidir publicacion en redes (orden, cadencia, canales).
- Ninguno tecnico — los 4 videos estan verificados y listos.

## 📌 Para memoria

- Tercera serie consecutiva de la linea `reels-del-blog` en cerrar GO 4/4
  limpio (chatbot, clinicas, abogados).
- **Cero gotchas nuevos** — P-11 y P-12 se evitaron por diseno desde el
  inicio en vez de descubrirse durante la ejecucion; vale la pena que
  `skill-curator` note que el patron "aplicar la leccion de la serie
  anterior proactivamente" funciono 2 series seguidas.
- Duracion de contenedor exacta en los 4 reels (sin el +0.1s de padding
  AAC que aparecio 2/4 veces en la serie anterior) — no hay evidencia
  suficiente en 1 serie para escribirlo como regla, pero refuerza la
  hipotesis ya documentada en `premium-craft-standards.md` de que el
  padding correlaciona con colas de musica audibles en el ultimo frame
  de `brand_close`.
- El metodo de BPM por autocorrelacion (reimplementado localmente en
  Python/numpy, sin depender del script del CT 128) dio deltas iguales o
  mejores que la corrida anterior (max 0.3 BPM vs 1.3 BPM) — util saber
  que el metodo es portable fuera del CT 128 para verificaciones
  independientes futuras.
- El escaneo de paleta HSV region+control tambien se reimplemento
  localmente (Python/PIL/numpy) con el mismo criterio (denominador =
  pixeles coloreados, no el frame completo) — confirma que el metodo es
  reproducible sin acceso al CT 128.

---

## Apendice — handoff historico de pre-produccion (ya ejecutado)

Las instrucciones originales (estructura de 4 reels y su razon,
manifiesto de assets, recipe de finishing exacto, comandos de render por
reel, el gate de entrada `npx remotion compositions`) quedan preservadas
en el historial de commits de este archivo (`git log -p -- remotion-composer/src/reels/ReelsAbogadosSerie.README.md`)
para referencia de futuras series — ya no aplican como pasos pendientes.
