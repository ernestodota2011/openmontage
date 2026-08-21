# Serie "reels-ia-miami-serie" — verify final: **GO 4/4** (2026-08-21)

> [!tip] Veredicto de la serie: **GO** — los 4 reels listos para Drive/publicacion
> Los 4 videos fueron renderizados por `devops-aetherlogik-homelab` (HEAD `3ffcbc7`; gate `npx remotion compositions` paso; `tsc` 0; `hf lint` 0/0, bloque HyperFrames en 31.4s de render). El verify final INDEPENDIENTE de `video-producer` (descarga propia de R2 + `ffmpeg`/`ffprobe`/python locales, sin confiar en el reporte de devops) confirma **4/4 GO** — primera serie de la linea `reels-del-blog` en cerrar sin ninguna iteracion de audio: el brief de finishing con `TP=-2.0` DESDE LA PRIMERA PASADA (P-15 aplicado preventivamente) funciono en los 4 reels, sin necesitar re-mux.

Sexta serie de la linea `reels-del-blog`. Fuente del blog: `ia-para-negocios-miami.md`
(D:\aetherlogik-astro) — el post PARAGUAS/generalista de todos los verticales.

## Los 4 videos canonicos — link final para Drive

| # | Reel | Objeto R2 canonico | Duracion | LUFS | True Peak |
|---|---|---|---|---|---|
| 1 | La diferencia que importa (gancho) | `agency/reels-ia-miami-serie/la-diferencia-que-importa-v1.mp4` | 30.0s | -14.06 | -1.96 dBTP |
| 2 | Los cinco trabajos de la IA (didactico) | `agency/reels-ia-miami-serie/los-cinco-trabajos-de-la-ia-v1.mp4` | 37.0s | -13.96 | -1.91 dBTP |
| 3 | Tres negocios, tres resultados (casos reales) | `agency/reels-ia-miami-serie/tres-negocios-tres-resultados-v1.mp4` | 45.0s | -14.00 | -1.77 dBTP |
| 4 | Cinco senales de que estas listo (cierre, CTA real) | `agency/reels-ia-miami-serie/cinco-senales-de-que-estas-listo-v1.mp4` | 45.0s | -13.93 | -1.94 dBTP |

Todos servidos desde `https://media.aetherlogik.com/<ruta de arriba>`, `curl 200`,
descargados y auditados byte-a-byte por `video-producer` de forma INDEPENDIENTE
(ffprobe + loudnorm + astats + BPM por autocorrelacion + frames extraidos y
mirados). **Los 4 quedan en `-v1` — ninguno tuvo defecto, primera vez en la
linea `reels-del-blog` sin ningun ciclo de fix.**

## Verify independiente — detalle por reel

### Tecnico (ffprobe, re-medido)
Los 4: h264, 1080x1920, 24fps, aac 48000Hz estereo. Duraciones EXACTAS a los
frame plans de pre-produccion (720f/24=30.0s, 888f/24=37.0s, 1080f/24=45.0s x2).

### Audio (LUFS/TP, re-medido — coincide EXACTO con lo reportado por devops)

| Reel | LUFS devops | LUFS medido | TP devops | TP medido | TP `astats` (corroboracion) | BPM declarado | BPM medido |
|---|---|---|---|---|---|---|---|
| 1 | -14.06 | **-14.06** | -1.96 | **-1.96** | -1.971 dB | 128 | 127.7 |
| 2 | -13.96 | **-13.96** | -1.91 | **-1.91** | -1.959 dB | 130 | 130.4 |
| 3 | -14.00 | **-14.00** | -1.77 | **-1.77** | -1.769 dB | 126 | 125.0 |
| 4 | -13.93 | **-13.93** | -1.94 | **-1.94** | -1.964 dB | 132 | 133.3 |

Coincidencia exacta a 2 decimales en LUFS y TP en los 4 reels; el BPM medido
por autocorrelacion (metodo propio, numpy puro — scipy no disponible en esta
sesion, se sustituyo el pasabajos Butterworth por una media movil FIR, mismo
criterio conceptual) cae dentro de ±1.3 BPM del declarado en los 4, banda ya
aceptada en el resto de la linea.

### Coherencia entre planos (los 2 heroes i2v — reels 1 y 3)
- **Reel 1** (`cold_open_hero`, 1.0s/4.0s): mismo personaje, misma
  oficina/escritorio/lampara/ventana, luz tungsteno consistente, push-in leve
  entre frames, sin drift. Pass.
- **Reel 3** (`cold_open_hero`, 1.0s/4.0s): misma mujer, misma
  puerta/fachada/palmeras de Miami, luz golden-hour consistente, push-in leve
  entre frames, sin drift. Pass.

### Paleta (escaneo programatico HSV region+control)
0.0% cian/violeta en todos los frames muestreados salvo los 2 heroes del reel
3 (0.7% RAW, tonos de cielo/sombra naturales de la foto, mean_sat=0.33/
mean_val~0.20 — muy por debajo del umbral de "neon", 0 pixeles con
saturacion+valor de acento introducido en ambos frames). Sin cards, sin glow,
sin lavanda/violeta en ningun frame. Pass en los 4 reels.

### Beat-pixel-check (reel 3 — los 3 casos con atribucion DIFERENCIADA)
Los 3 casos (`case_clinic` 9.5s, `case_dmp` 17.5s, `case_marino` 25.5s)
muestran cifra + label + atribucion en el MISMO frame, confirmado en pixeles
reales, y la atribucion es la CORRECTA y DIFERENCIADA por caso (no generica):
- Clinica: "Red de clinicas de EE. UU. . **cifras reportadas por la propia
  clinica**." (no es una estimacion de AetherLogik, a diferencia de los otros 2).
- DMP: "DMP Consulting Services, Houston/Katy TX . **estimacion de AetherLogik**
  a partir de los datos del cliente."
- Marino HVAC: "Marino HVAC, Miami . **estimacion de AetherLogik** a partir de
  los datos del cliente."

Pass en los 3.

### CTA real (reel 4)
`brand_close` a 40.0s, recorte+ampliacion 2x de la banda de texto (doctrina de
la skill — no se da por buena la legibilidad a resolucion de frame completo):
"cal.com/aetherlogik/discovery . agenda tu auditoria gratuita ->" legible,
centrado, margenes simetricos, coincide EXACTO con el link del cierre real del
post. Pass.

### `brand_close` centrado (los 4 reels — confirma que el fix P-13 sigue vigente)
Los 4 `brand_close` (reels 1, 2, 3 y 4) se recortaron+ampliaron 2x: texto
centrado, margenes simetricos en ambos lados, sin bleed en ninguno de los 4 —
el fix de P-13 (`maxWidth`/`textAlign` en el `<div>` del `url` de
`BrandClose.tsx`, componente COMPARTIDO) sigue vigente y no tuvo regresion en
esta sexta serie.

### Alcance declarado — lo que NO se re-verifico independientemente
`hf lint` (0/0) y el tiempo de render del bloque HyperFrames (31.4s) del reel
2 son los reportados por `devops-aetherlogik-homelab` — `video-producer` no
tiene acceso SSH al CT 128 y no corrio `hf lint` el mismo. Lo que SI se
verifico independientemente es el RESULTADO en pixeles: el frame de 14.0s del
clip HyperFrames se extrajo del MP4 final y se miro — 3/5 items visibles con
nodos ember correctos, tipografia legible, sin cian/violeta.

## Handoffs pendientes

- **Ernesto / quien suba a Drive**: usar la tabla "Los 4 videos canonicos" de
  arriba — los 4 en `-v1`, sin excepciones.
- **skill-curator**: sin gotchas nuevos de PRODUCCION en este verify (a
  diferencia de las 5 series anteriores, ninguna encontro un defecto que
  arreglar) — el unico hallazgo nuevo de la sesion fue de TOOLING
  (`check_job`/`get_job_result` del MCP `fal-ai` con 405 sin `status_url`
  explicito), ya registrado como P-17 en `Video-problemas.md` con
  `estado-curaduria: PENDIENTE`.

## 📌 Para memoria (finales)

- Primera serie de la linea `reels-del-blog` que cierra **GO 4/4 en el primer
  verify**, sin ningun ciclo de fix (ni de audio ni de layout) — evidencia de
  que la curaduria preventiva (P-13 en `BrandClose.tsx`, P-15 con
  `TP=-2.0` desde el brief inicial) esta funcionando: los defectos que
  costaron ciclos de fix en series anteriores no aparecieron porque el fix se
  horneo ANTES del render, no se descubrio despues.
- Primer post de la linea que es GENERALISTA/paraguas (no tiene vertical
  propia) y que documenta 3 casos reales en una sola seccion — el reel 3 con
  3 `StatReveal` + atribucion DIFERENCIADA por caso (reportado por el cliente
  vs estimacion nuestra) es un patron nuevo dentro de la linea, verificado en
  pixeles y correcto en los 3.
- BPM medido con un metodo propio en numpy puro (sin scipy, no disponible en
  esta sesion) — sustituir el pasabajos Butterworth/`filtfilt` por una media
  movil FIR simple dio resultados dentro de ±1.3 BPM del declarado en los 4
  reels, validando que el metodo simplificado es suficiente para este caso de
  uso (tempo de un track corporate-tech instrumental con pulso claro de
  bombo/bajo) sin necesitar la dependencia completa.
- Serie completa GO 4/4 — sexta consecutiva de la linea `reels-del-blog` que
  cierra limpia, con el mismo rigor de verificacion independiente que las 5
  anteriores.

---

## Apéndice — handoff historico de pre-produccion (ya ejecutado)

Las instrucciones originales de pre-produccion (estructura de 4 reels,
manifiesto de assets con costos reales fal.ai, la recipe de finishing con
`TP=-2.0` desde el primer pase, los comandos de render, el gate `npx remotion
compositions`) quedan preservadas en el historial de commits de este archivo
(`git log -p -- remotion-composer/src/reels/ReelsIaMiamiSerie.README.md`)
para referencia — ya no aplican como pasos pendientes.
