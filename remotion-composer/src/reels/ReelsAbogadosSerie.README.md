# Serie "reels-abogados-serie" — handoff de pre-produccion a devops (2026-08-21)

> [!info] Estado: PRE-PRODUCCION COMPLETA, NO renderizada en esta sesion.
> Los 4 reels tienen composicion TSX + registro en `Root.tsx` + props JSON
> + assets reales generados (fal.media, expiran ~24h) + scene_plan/gates/
> decision_log/art-direction/script por reel. Falta: render Remotion x4 +
> render HyperFrames x1 (reel 2) + finishing FFmpeg + subida a R2 +
> verify post-render de `video-producer`.

Tercera serie de la linea `reels-del-blog`, continuando la formula
ganadora GO-4/4 de `aetherlogik/reels-chatbot-serie` y
`aetherlogik/reels-clinicas-serie` (ver sus README en este mismo
directorio). Esta rama (`aetherlogik/reels-abogados-serie`) parte de
`aetherlogik/reels-clinicas-serie` HEAD (`0812933`) para heredar
`KineticHeadline`/`HeadlineOverlay`/`StatReveal`/`TagRevealList`/
`BrandClose`/`FilmGrade`/`EmberThread` + `theme.ts` intactos (misma
marca, tercer blog). Fuente del blog:
`automatizacion-despachos-abogados-ia.md` (D:\aetherlogik-astro).

## Por que 4 reels (estructura y su razon)

El post tiene 4 secciones H2 sustantivas + FAQs: "Por que automatizar",
"Tareas que ya se pueden delegar" (6 categorias), "Lo que la IA no puede
hacer" (4 limites), "Como empezar sin desorden" (5 pasos). Eso mapea 1:1
a gancho + 3 didacticos (mismo N=4 que las 2 series anteriores):

| # | Reel | Rol | Duracion | Runtime |
|---|---|---|---|---|
| 1 | Un tercio de tu dia | Gancho: la cifra de Clio/ABA + el problema | 30.0s exacto | Remotion (atelier), 1 hero i2v |
| 2 | Lo que ya puedes delegar | Didactico: las 6 categorias delegables | 46.0s exacto | HIBRIDO Remotion + HyperFrames |
| 3 | Lo que la IA no puede hacer | Didactico: los 4 limites + credibilidad | 45.0s exacto | Remotion (atelier), 1 hero i2v |
| 4 | Como empezar sin desorden | Cierre/CTA: los 5 pasos + /para-legal | 45.0s exacto | Remotion (atelier) |

Cada reel gancho/didactico cierra apuntando al **siguiente reel de la
serie** (no venta directa); el reel 4 (ultimo) cierra con el CTA de
conversion real del post (`/para-legal` + llamada de diagnostico
`cal.com/aetherlogik/discovery`). El presupuesto de "1 hero i2v maximo
por reel" se reparte en 2 de los 4 reels (1 y 3) por diseno deliberado
(ver `LoQueYaPuedesDelegar.decision_log.json` d-002) — el bloque denso de
datos de la serie vive en HyperFrames, en el reel 2 (checklist de 5
items, `tareas-legales-delegables`).

## Directriz de Ernesto — musica movida (BPM declarado por reel)

| Reel | BPM declarado | Mood |
|---|---|---|
| 1 | 126 | tenso-pero-esperanzador |
| 2 | 132 | energia de checklist, la mas alta de la serie (reel mas denso) |
| 3 | 120 | serio-pero-confiable (extremo bajo permitido de la banda) |
| 4 | 128 | motivador/optimista |

Los 4 dentro de la banda 120-140 exigida por la directriz dura de la
mision, four-on-the-floor con drive audible, cero ambient — mismos
prompts de estilo que las 2 series anteriores (corporate-tech
instrumental). El BPM medido post-render (autocorrelacion, mismo metodo
de la serie clinicas) queda pendiente hasta que devops entregue el
render.

## Manifiesto de assets generados (URLs fal.media, EXPIRAN ~24h desde 2026-08-21)

> [!danger] devops debe ARCHIVAR estas URLs a R2 (`agency/reels-abogados-serie/<reel>/`) ANTES de renderizar — `video-producer` no tiene ni debe adquirir credenciales de R2 (ver skill `aetherlogik-video`, gotcha P-07).

| Asset | Reel | Modelo | URL fal.media (temporal) | Tamano |
|---|---|---|---|---|
| hero still | 1 | nano-banana-pro | `https://v3b.fal.media/files/b/0aa736f3/tQtfA9yRCDTH5b-BfpTcj_3ip4H16k.jpg` | 1536x2752, no reportado por el proveedor |
| hero i2v | 1 | kling-video/o1 (5s) | `https://v3b.fal.media/files/b/0aa736ef/fPVRgJUCFBQBd9q0TGPpp_output.mp4` | 5,606,580 B |
| musica (126 BPM, 30s) | 1 | elevenlabs/music | `https://v3b.fal.media/files/b/0aa736f9/wgQV9XlRMc1USgo-zRY6u_music_generated.mp3` | 480,698 B |
| musica (132 BPM, 46s) | 2 | elevenlabs/music | `https://v3b.fal.media/files/b/0aa736e6/6J_Fq0q5Hj4xhq140JAw-_music_generated.mp3` | 735,653 B |
| checklist HyperFrames (renderizado por devops, NO fal) | 2 | hyperframes (CT 128) | pendiente — fuente en `hyperframes-compositions/tareas-legales-delegables/index.html` (este commit) | pendiente |
| hero still | 3 | nano-banana-pro | `https://v3b.fal.media/files/b/0aa736e2/EaisnYfO9W0v7D875WH-0_vuxmb3ll.jpg` | no reportado por el proveedor |
| hero i2v | 3 | kling-video/o1 (5s) | `https://v3b.fal.media/files/b/0aa73704/K3kkittlSF0e6575hq7ha_output.mp4` | 5,106,061 B |
| musica (120 BPM, 45s) | 3 | elevenlabs/music | `https://v3b.fal.media/files/b/0aa736fc/m9Hskw7txVx7g2Zz80A-C_music_generated.mp3` | 719,770 B |
| musica (128 BPM, 45s) | 4 | elevenlabs/music | `https://v3b.fal.media/files/b/0aa736e9/QlrQhiF07qCqNl7SjnbgL_music_generated.mp3` | 720,606 B |
| logo (isotipo real, permanente) | 1-4 | — (asset de marca, no generativo) | `https://media.aetherlogik.com/aetherlogik/brand/logo-ember-hires.webp` | ya en R2 |
| sfx whoosh (reusado, permanente) | 1, 2, 4 | — (reusado de la serie clinicas) | `https://media.aetherlogik.com/agency/reels-clinicas-serie/shared/sfx-whoosh.mp3` | ya en R2 |

Los props JSON (`remotion-composer/public/demo-props/*.json`, este
commit) ya apuntan a estas URLs temporales — tras archivar a R2, devops
actualiza cada props JSON con la URL permanente `media.aetherlogik.com`
(mismo patron que los commits `aeae854`..`f6615b7` de la serie clinicas).

## Presupuesto de assets generativos

| Item | Costo |
|---|---|
| 2 hero stills (nano-banana-pro, $0.15/img) | $0.30 |
| 2 hero i2v (kling-o1, $0.112/s x 5s x 2) | $1.12 |
| 4 pistas de musica (elevenlabs/music, $0.60/min) | $1.66 |
| SFX (reusado, $0) | $0.00 |
| **Total** | **$3.08** |

Contra un techo de ~$25 declarado en la mision — igual de eficiente que
las 2 series anteriores (chatbot ~$3.0x, clinicas $3.43).

## Gate de entrada para devops (P-12 de la serie clinicas — aplicado desde el inicio)

Antes de renderizar CUALQUIER reel, corre primero:

```bash
cd remotion-composer && npx remotion compositions src/index.tsx
```

Debe listar `UnTercioDeTuDia`, `LoQueYaPuedesDelegar`,
`LoQueLaIaNoPuedeHacer` y `ComoEmpezarSinDesorden` (ya wireadas en
`Root.tsx` en este mismo handoff, commit `ec6c793` — a diferencia del
primer push de la serie clinicas, aqui el registro en `Root.tsx` NO
quedo diferido). Si alguna falta, es un `.tsx` huerfano y `tsc --noEmit`
NO lo va a detectar (leccion P-12).

## Comandos de render exactos por reel

```bash
# Reel 1 — Un tercio de tu dia (30.0s @ 24fps = 720 frames)
npx remotion render src/index.tsx UnTercioDeTuDia out/un-tercio-de-tu-dia-v1.mp4 \
  --props=public/demo-props/un-tercio-de-tu-dia.json \
  --codec=h264 --crf=16 --pixel-format=yuv420p --image-format=png --x264-preset=slow

# Reel 2 — Lo que ya puedes delegar (46.0s @ 24fps = 1104 frames)
# PRIMERO renderiza el bloque HyperFrames y archiva su salida a R2, actualiza
# tareasDelegablesSrc en el props JSON, LUEGO renderiza el reel completo:
pct start 128
hf lint hyperframes-compositions/tareas-legales-delegables/index.html && \
  hf render -c hyperframes-compositions/tareas-legales-delegables/index.html \
  -o tareas-legales-delegables.mp4
pct stop 128
# (archivar tareas-legales-delegables.mp4 a R2, actualizar el props JSON)
npx remotion render src/index.tsx LoQueYaPuedesDelegar out/lo-que-ya-puedes-delegar-v1.mp4 \
  --props=public/demo-props/lo-que-ya-puedes-delegar.json \
  --codec=h264 --crf=16 --pixel-format=yuv420p --image-format=png --x264-preset=slow

# Reel 3 — Lo que la IA no puede hacer (45.0s @ 24fps = 1080 frames)
npx remotion render src/index.tsx LoQueLaIaNoPuedeHacer out/lo-que-la-ia-no-puede-hacer-v1.mp4 \
  --props=public/demo-props/lo-que-la-ia-no-puede-hacer.json \
  --codec=h264 --crf=16 --pixel-format=yuv420p --image-format=png --x264-preset=slow

# Reel 4 — Como empezar sin desorden (45.0s @ 24fps = 1080 frames)
npx remotion render src/index.tsx ComoEmpezarSinDesorden out/como-empezar-sin-desorden-v1.mp4 \
  --props=public/demo-props/como-empezar-sin-desorden.json \
  --codec=h264 --crf=16 --pixel-format=yuv420p --image-format=png --x264-preset=slow
```

Despues del render H.264 directo: finishing FFmpeg con la receta "de-plastic"
FINAL corregida (`premium-craft-standards.md` §6 — curva SIN el punto
intermedio `0.25/0.22` que crushea texto de UI, `-x264-params
aq-mode=2:aq-strength=1.2`, sin filtro `noise` adicional ya que
`FilmGrade.tsx` hornea grano en las escenas `brand_close`/`series_recap`)
y loudnorm 2-pasadas a −14 LUFS / −1 dBTP con `acompressor` antes de
normalizar (evita el fallback silencioso a modo `dynamic` documentado en
la skill). Subida a R2 en `agency/reels-abogados-serie/<slug>-v1.mp4`.

## Que falta (handoffs pendientes)

- **devops-aetherlogik-homelab**: archivar los 8 assets fal.media a R2
  (tabla de manifiesto arriba) + actualizar los 4 props JSON con las URLs
  permanentes + renderizar el bloque HyperFrames del reel 2 + renderizar
  los 4 reels + finishing FFmpeg + subir a R2.
- **video-producer** (retomar tras el render): verify post-render
  independiente (ffprobe, LUFS medido, BPM medido, frame-sampling
  region+control, `coherence_guard` sobre los 2 heroes i2v, `hf lint`
  0/0 del bloque HyperFrames) — mismo protocolo que
  `ReelsClinicasSerie.README.md`.
- **Ernesto**: ninguna decision pendiente en esta fase (pre-produccion
  cerrada); decidira publicacion en redes tras el GO del verify.

## 📌 Para memoria

- Tercera serie consecutiva de la linea `reels-del-blog`, misma formula
  (gancho + 3 didacticos, N=4) heredando el catalogo de componentes
  brand-safe sin modificarlo.
- El registro en `Root.tsx` y la creacion de los 4 props JSON se hicieron
  en el MISMO handoff que las composiciones (no diferido) — aplicando
  P-12 desde el inicio en vez de descubrirlo con un render fallido.
- Sin gotchas NUEVOS que registrar en `Video-problemas.md` en esta
  sesion: P-11 (Kling O1 duration fuera de {5,10}) se evito desde el
  inicio (`duration: "5"` explicito en ambos heroes); P-12 (composicion
  sin wirear) se evito desde el inicio (Root.tsx + props en el mismo
  handoff, gate de entrada `npx remotion compositions` documentado
  arriba para que devops lo corra primero).
