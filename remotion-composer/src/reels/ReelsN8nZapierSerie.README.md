# Serie "reels-n8n-zapier-serie" — handoff de pre-produccion (2026-08-21)

> [!warning] Estado: PRE-PRODUCCION COMPLETA, PENDIENTE DE RENDER
> Septima serie de la linea `reels-del-blog`. Rama `aetherlogik/reels-n8n-zapier-serie`,
> partida de `aetherlogik/reels-ia-miami-serie` HEAD `26a6dc1c0a0667a6fd40701c7d302d44c6f6c6f2`.
> `video-producer` NO tiene acceso SSH al CT 128 y NO corrio `npx remotion compositions`
> ni `hf lint` el mismo — declarado explicitamente, mismo patron de la leccion P-12
> (`Video-problemas.md`): "composicion terminada" = registrada en `Root.tsx` + props JSON,
> pero el gate real (`npx remotion compositions src/index.tsx`) lo corre `devops-aetherlogik-homelab`
> como PRIMER paso del render, no video-producer.

Fuente del blog: `n8n-vs-zapier-pequenas-empresas.md`
(`D:\aetherlogik-astro\src\content\blog\`) — post comparativo tecnico
(n8n vs Zapier), sin nichos verticales. Tema perfecto para motion
autorado de datos/tablas — **decision explicita: 0 escenas i2v en TODA
la serie** (ver `AlquilarOComprar.decision_log.json` d-001). Es la
primera serie de la linea con 0 heroes de principio a fin.

## Los 4 reels

| # | Reel | Composition id | Frames | Duracion @24fps | Runtime |
|---|---|---|---|---|---|
| 1 | Alquilar o comprar (gancho) | `AlquilarOComprar` | 720 | 30.0s | Remotion 100% (SplitCompare bespoke) |
| 2 | Cuanto cuesta cada uno (didactico) | `CuantoCuestaCadaUno` | 1176 | 49.0s | Remotion + 1 bloque HyperFrames (26.0s) |
| 3 | Cuando elegir cada uno (didactico) | `CuandoElegirCadaUno` | 1152 | 48.0s | Remotion + 1 bloque HyperFrames (25.0s) |
| 4 | Lo que decidio DMP Consulting (caso real + CTA) | `LoQueDecidioDmpConsulting` | 936 | 39.0s | Remotion 100% |

Los 3 ejes por reel (decision_log de cada uno): `renderer_family=animation`,
`render_runtime=remotion` (con `hyperframes` para 1 escena puntual en los
reels 2 y 3), `composition_mode=atelier` en los 4.

## Manifiesto de assets generados (fal.ai) — costo real

Presupuesto de la mision: **≤$25**. Costo real total: **≈$2.44** (incluida la pista v2 del reel 4, ver verify final abajo).

| Asset | Modelo | Parametros | Costo | URL fal.media (temporal, ~24h) | Tamano |
|---|---|---|---|---|---|
| Musica reel 1 | `fal-ai/elevenlabs/music` | 30000ms, 128 BPM declarado | $0.30 | `https://v3b.fal.media/files/b/0aa73f7b/-dkFNz-vR4UBMVRqvNyBR_music_generated.mp3` | 480,698 B |
| Musica reel 2 | `fal-ai/elevenlabs/music` | 49000ms, 124 BPM declarado | $0.49 | `https://v3b.fal.media/files/b/0aa73f90/W7bSq9LxtHTYhDF4gESdV_music_generated.mp3` | 783,718 B |
| Musica reel 3 | `fal-ai/elevenlabs/music` | 48000ms, 122 BPM declarado | $0.48 | `https://v3b.fal.media/files/b/0aa73f7c/Rd6IWahhkDR-1UCKE8FYt_music_generated.mp3` | 767,418 B |
| Musica reel 4 (v1, **DESCARTADA**) | `fal-ai/elevenlabs/music` | 39000ms, 118 BPM declarado | $0.39 | `https://v3b.fal.media/files/b/0aa73f90/Dhz7GxgIVEC56RAJbtJ4f_music_generated.mp3` | 624,058 B |
| Musica reel 4 (v2, **VALIDADA**) | `fal-ai/elevenlabs/music` | 39053ms, 124 BPM declarado, 125.0 medido | $0.39 | `https://v3b.fal.media/files/b/0aa740da/VI07Z2B6FKdxog-YQJGv4_music_generated.mp3` | 624,894 B |
| SFX chip (compartido reels 2+3) | `fal-ai/elevenlabs/sound-effects/v2` | 0.5s | $0.001 | `https://v3b.fal.media/files/b/0aa73f7f/MZDKqDZ7FRw7PVHZ0rJKu_sound_effect.mp3` | 8,821 B |
| SFX whoosh (compartido reels 1+4) | `fal-ai/elevenlabs/sound-effects/v2` | 0.6s | $0.0012 | `https://v3b.fal.media/files/b/0aa73f7f/OPE4Ad3Gs5427560K1WjJ_sound_effect.mp3` | 10,493 B |
| **Total** | | | **≈$2.443** | | |

**0 stills, 0 i2v** — sin costo de imagen/video generativo (decision d-001
de cada reel). Las 2 tablas HyperFrames (`hyperframes-compositions/`) las
renderiza devops en CPU en el CT 128, sin costo de API.

> [!danger] Paso 0 obligatorio ANTES de renderizar — archivar a R2 (P-07: video-producer NO toca R2)
> Los props JSON (`remotion-composer/props/*.json`) referencian rutas de R2
> que TODAVIA NO EXISTEN — `video-producer` no tiene ni debe adquirir
> credenciales de R2. `devops-aetherlogik-homelab` debe:
> 1. Descargar los 6 assets fal.media de la tabla de arriba (verificar el
>    tamano real descargado — P-14, `nano-banana-pro` no aplica aqui pero
>    la disciplina de verificar bytes SI, todos los modelos usados aqui
>    reportan `file_size` correcto).
> 2. Subirlos a R2 en las rutas EXACTAS que ya usan los props:
>    `agency/reels-n8n-zapier-serie/assets/alquilar-o-comprar-musica.mp3`,
>    `.../cuanto-cuesta-cada-uno-musica.mp3`,
>    `.../cuando-elegir-cada-uno-musica.mp3`,
>    `.../lo-que-decidio-dmp-consulting-musica.mp3`,
>    `.../shared-sfx-chip.mp3`, `.../shared-sfx-whoosh.mp3`.
> 3. Los 2 clips `.../cuanto-cuesta-cada-uno-tabla.mp4` y
>    `.../cuando-elegir-cada-uno-tabla.mp4` NO vienen de fal — salen del
>    render HyperFrames (paso siguiente) y se archivan despues.
> Las URLs fal.media expiran ~24h desde el 2026-08-21 — archivar cuanto antes.

## Paso 1 — Bloques HyperFrames (reels 2 y 3), ANTES del render Remotion

```bash
python scripts/ssh_helper.py --host pve1 "pct start 128"
python scripts/ssh_helper.py --host pve1 "pct exec 128 -- bash -c 'cd /ruta/al/checkout && /usr/local/bin/hf lint hyperframes-compositions/cuanto-cuesta-cada-uno-tabla/'"
python scripts/ssh_helper.py --host pve1 "pct exec 128 -- bash -c 'cd /ruta/al/checkout && /usr/local/bin/hf render -c hyperframes-compositions/cuanto-cuesta-cada-uno-tabla/index.html -o cuanto-cuesta-cada-uno-tabla.mp4'"
python scripts/ssh_helper.py --host pve1 "pct exec 128 -- bash -c 'cd /ruta/al/checkout && /usr/local/bin/hf lint hyperframes-compositions/cuando-elegir-cada-uno-tabla/'"
python scripts/ssh_helper.py --host pve1 "pct exec 128 -- bash -c 'cd /ruta/al/checkout && /usr/local/bin/hf render -c hyperframes-compositions/cuando-elegir-cada-uno-tabla/index.html -o cuando-elegir-cada-uno-tabla.mp4'"
```

Usa siempre `hf` (ruta absoluta `/usr/local/bin/hf` — `pct exec` no
hereda `$PATH` en sesion no-interactiva, gotcha ya documentado en
`aetherlogik-hyperframes`), nunca `hyperframes` a secas. `hf lint .` debe
dar 0/0 antes de renderizar (contrato de 6 atributos + `data-no-timeline`
ya presente en ambos `#stage` desde la autoria — verificado por lectura
del HTML, no por una corrida real de `hf lint`, declarado como tal).
Archivar ambos MP4 resultantes a las rutas R2 de sus props.

## Paso 2 — Gate de entrada (Remotion)

```bash
npx remotion compositions src/index.tsx
```

Debe listar las 4 composiciones con sus frames/fps/resolucion exactos
(tabla de arriba). `npx tsc --noEmit` debe dar exit 0.

## Paso 3 — Render (ProRes HQ master, nombre EXPLICITO por slug — P-05/P-16)

```bash
npx remotion render src/index.tsx AlquilarOComprar out/alquilar-o-comprar-master.mov --props=props/alquilar-o-comprar.json --codec=prores --prores-profile=hq --image-format=png --color-space=bt709
npx remotion render src/index.tsx CuantoCuestaCadaUno out/cuanto-cuesta-cada-uno-master.mov --props=props/cuanto-cuesta-cada-uno.json --codec=prores --prores-profile=hq --image-format=png --color-space=bt709
npx remotion render src/index.tsx CuandoElegirCadaUno out/cuando-elegir-cada-uno-master.mov --props=props/cuando-elegir-cada-uno.json --codec=prores --prores-profile=hq --image-format=png --color-space=bt709
npx remotion render src/index.tsx LoQueDecidioDmpConsulting out/lo-que-decidio-dmp-consulting-master.mov --props=props/lo-que-decidio-dmp-consulting.json --codec=prores --prores-profile=hq --image-format=png --color-space=bt709
```

Nombrar los masters SIEMPRE con el slug completo del reel (nunca
"reel1"/"reel2" — P-16: el directorio `out/` es compartido entre TODAS
las series que corren en el CT 128 y un nombre ordinal genera colisiones
entre series distintas).

**Secuencial, nunca en paralelo** — mismo aviso de OOM en 6GB de las
series anteriores.

## Paso 4 — Finishing FFmpeg (recipe de `premium-craft-standards.md` §6, TP=-2.0 desde el primer pase)

```bash
ffmpeg -i out/<slug>-master.mov -vf \
"curves=all='0/0.045 0.75/0.78 1/0.96',\
eq=saturation=0.92:contrast=1.06:gamma=1.0,\
unsharp=5:5:0.4:5:5:0.0,\
vignette=angle=PI/5" \
-c:v libx264 -crf 16 -pix_fmt yuv420p -preset slow -x264-params aq-mode=2:aq-strength=1.2 -movflags +faststart out/<slug>-video.mp4
```

Audio: `acompressor=threshold=-18dB:ratio=3:attack=15:release=200:makeup=2`
pre-loudnorm → 2-pasadas `loudnorm=I=-14:TP=-2.0:LRA=11` (==**TP=-2.0
desde la PRIMERA pasada, P-15**== — no `-1.0`; el margen extra evita el
ciclo de re-mux que si necesitaron 2/4 reels de `reels-hvac-serie`). CRF
**16** fijo (nunca subir de la banda 16-18): esta serie tiene texto fino
de UI denso en las 2 tablas HyperFrames (P-08 aplica igual que a
burbujas de chat — texto pequeno sobre near-black comprime peor que un
headline grande). Recalibrar el `I` objetivo por mix con una pasada de
prueba antes del encode final (el offset de `loudnorm` en modo `dynamic`
NO se transfiere entre mixes, ni siquiera de esta misma serie).

Mux final: video CRF16 + audio AAC 256-320kbps 48kHz.

## Paso 5 — Verify (lo corre `video-producer`, independiente)

1. `ffprobe`: h264, 1080x1920, 24fps, duracion exacta (30.0/49.0/48.0/39.0s), audio AAC real (no mudo).
2. LUFS/TP medidos POST-HOC sobre el archivo final (nunca confiar en el reporte del comando) — banda -14±0.5 LUFS, TP ≤ -1.0 dBTP.
3. BPM medido por autocorrelacion, banda ±1.5 BPM del declarado en cada `gates.json`.
4. `brand_palette_guard` sobre pixeles reales: 4 frames por reel minimo, cero cian/violeta/glow, boxless confirmado.
5. `coherence_guard`: no aplica (0 escenas i2v en toda la serie).
6. Beat-pixel-check reel 4: cada cifra ("1,440 horas", "+160 citas") + su atribucion EN EL MISMO frame; la cita de Mayli Parra + atribucion en el mismo frame; CTA final = `cal.com/aetherlogik/discovery` exacto, recorte+ampliacion 3-4x de la banda de texto (doctrina P-13 — texto libre nunca se da por bueno a resolucion de frame completo).
7. `brand_close` de los 4 reels: recorte+zoom de la banda del `url` — confirmar que el fix P-13 (`maxWidth`/`textAlign` en `BrandClose.tsx`) sigue vigente (los CTAs internos de los reels 1-3 son largos, 2 lineas — exactamente el patron que dispara el bug si alguna vez regresa).

## Gates honestos (auto-score de video-producer, pre-render — ver `<Reel>.gates.json` por reel)

Los 4 reels: `slideshow_risk` promedio 0.32-0.47 (verdict `strong`),
`variation_checker` 0.4-0.55 (`strong`), `delivery_promise` clasificado
**`data_explainer`** en los 4 (NO `motion_led` — ninguno tiene escenas de
video/animacion real mas alla de las 2 tablas HyperFrames, evita la
trampa de reclamar movimiento que no existe), `brand_palette_guard` PASS
en los 4 (sin colores nuevos, hairline ember es la unica excepcion
estructural documentada), `coherence_guard` no aplica (0 i2v),
`anti_claims_audit` PASS en los 4 (toda cifra/criterio es textual o
casi-textual del post; los 2 ejemplos hipoteticos del post —clinica
dental, bienes raices— estan marcados explicitamente como tales, nunca
presentados como clientes reales).

**`post_render_verify` de los 4 reels: PENDING** — ninguno se ha
renderizado todavia. No hay veredicto GO/NO-GO hasta completar los pasos
1-5 de arriba.

## Handoffs pendientes

- **`devops-aetherlogik-homelab`**: Pasos 0-4 de este README (archivar 6
  assets a R2 → render 2 bloques HyperFrames → gate `npx remotion
  compositions` → render Remotion de los 4 masters → finishing FFmpeg con
  TP=-2.0 desde el primer pase → subir los 4 entregables + los 2 clips
  HyperFrames a R2).
- **`video-producer`**: verify independiente completo (Paso 5) sobre los
  MP4 reales, una vez devops entregue.
- **skill-curator**: sin gotchas nuevos de PRODUCCION que registrar en
  esta sesion (pre-produccion, sin render aun) — los gotchas de tooling
  ya conocidos (P-17, `check_job`/`get_job_result` con `status_url`
  explicito) se reconfirmaron y siguen aplicando sin sorpresas nuevas.

## 📌 Para memoria

- Primera serie de la linea `reels-del-blog` con **0 escenas i2v en los 4
  reels** — validacion de que la doctrina "0 heroes es legitimo" funciona
  en la practica para contenido puramente comparativo/tecnico, sin forzar
  una vineta humana que el post no describe.
- Primera vez que una tabla comparativa de **2 columnas** se autora en
  HyperFrames (las 6 series anteriores solo usaron checklists de 1
  columna) — el layout se reusa DELIBERADAMENTE entre los reels 2 y 3 de
  esta misma serie (mismo forma de contenido: criterios de decision),
  declarado explicitamente para que no se lea como hero-component-spine.
- Componente nuevo `SplitCompare.tsx` reemplaza al `ComparisonCard.tsx`
  nativo del fork (que viola boxless/ember-only con fondo blanco, card y
  colores hardcodeados) — mismo patron de sustitucion que ya paso con
  `hero_title`/`HeadlineOverlay` en el pilot original.


## Resultado devops (2026-08-21) — 4/4 renderizados, finalizados y en R2

> [!success] Estado — LOS 4 REELS RENDERIZADOS, FINALIZADOS Y EN R2. Sin bloqueos (7ª serie de la línea `reels-del-blog`).

### Paso 0 — Archivado de 6 assets + 2 bloques HyperFrames a R2 — COMPLETO

Los 6 assets fal.media del manifiesto (4 músicas + 2 SFX) ya estaban referenciados por su
URL final correcta en los `props/*.json` desde la pre-producción — sin necesidad de
actualizar props. Descargados y verificados por tamaño exacto (6/6, sin discrepancias) y
subidos a R2 (`agency/reels-n8n-zapier-serie/assets/`, 6/6 HTTP 200).

### Paso 1 — Bloques HyperFrames (reels 2 y 3) — COMPLETO

Contrato de 6 atributos + `data-no-timeline` confirmado presente en ambos `#stage` por
lectura ANTES de lintear. `hf lint` real (no solo lectura) → **0 errors, 0 warnings** en
ambas composiciones.

| Composición | `hf lint` | Render | Frames | Duración ffprobe |
|---|---|---|---|---|
| `cuanto-cuesta-cada-uno-tabla` | 0/0 | 36.4s wall-time | 624/624 | 26.000000s |
| `cuando-elegir-cada-uno-tabla` | 0/0 | 34.5s wall-time | 600/600 | 25.000000s |

Sin el impuesto de 45s del poller (confirma `data-no-timeline` funcionando desde la
autoría). Spot-check visual de ambas tablas: legibles, boxless, hairline ember, cero
cian/violeta/glow. Archivadas a R2 (`assets/cuanto-cuesta-cada-uno-tabla.mp4` +
`assets/cuando-elegir-cada-uno-tabla.mp4`), verificado `curl` público 200 en las 2.

### Paso 2 — Gate de entrada — PASADO sin hallazgos

`git pull` confirmó HEAD `8864761`. `npm install` (up to date) + `npx tsc --noEmit` → exit
0. `npx remotion compositions src/index.tsx` listó las 4 composiciones nuevas con
fps/resolución/duración EXACTOS a la tabla de pre-producción: `AlquilarOComprar` 720f
(30.00s), `CuantoCuestaCadaUno` 1176f (49.00s), `CuandoElegirCadaUno` 1152f (48.00s),
`LoQueDecidioDmpConsulting` 936f (39.00s), las 4 a 24fps 1080x1920 — confirma que
`Root.tsx` venía correctamente wireado, sin intervención necesaria.

### Paso 3 — Render Remotion (los 4, ProRes HQ, master nombre explícito, SECUENCIAL) — COMPLETO

Los 4 corridos con `--codec=prores --prores-profile=hq --image-format=png
--color-space=bt709`, desacoplados (`nohup ... &`, log a archivo, poll síncrono —
**nunca en paralelo**, disciplina dura de la misión por el OOM de 6GB):

| Reel | Master | Tamaño | Frames | Duración ffprobe |
|---|---|---|---|---|
| `AlquilarOComprar` | `out/alquilar-o-comprar-master.mov` | 101.7 MB | 720/720 | 30.000000s |
| `CuantoCuestaCadaUno` | `out/cuanto-cuesta-cada-uno-master.mov` | 165 MB | 1176/1176 | 49.000000s |
| `CuandoElegirCadaUno` | `out/cuando-elegir-cada-uno-master.mov` | 167 MB | 1152/1152 | 48.000000s |
| `LoQueDecidioDmpConsulting` | `out/lo-que-decidio-dmp-consulting-master.mov` | 99.8 MB | 936/936 | 39.000000s |

`ffprobe` de los 4 masters: video `prores 1080x1920 24fps`, audio `pcm_s16le` — las 4
duraciones exactas a la spec.

### Paso 4 — Finishing FFmpeg (recipe de este README §"Paso 4", TP=-2.0 desde el primer pase P-15) — COMPLETO, 4/4 en banda sin re-mux

Receta exacta del README (curves sin el punto intermedio que crushea luma + eq + unsharp
+ vignette + `libx264 -crf 16 -preset slow -x264-params aq-mode=2:aq-strength=1.2`).
Audio: `acompressor` pre-loudnorm → `loudnorm` dinámico con `I` recalibrado por una
pasada de medición previa (el offset NO se transfiere entre reels, ni siquiera de la
misma serie — confirmado de nuevo):

| Reel | `I` inicial → medido | Offset | `I` recalibrado | Resultado final (post-hoc) |
|---|---|---|---|---|
| `AlquilarOComprar` | -14 → -13.29 | +0.71 | -14.71 | **-13.98 LUFS / -1.87 dBTP** |
| `CuantoCuestaCadaUno` | -14 → -13.79 | +0.21 | -14.21 | **-14.07 LUFS / -1.91 dBTP** |
| `CuandoElegirCadaUno` | -14 → -13.56 | +0.44 | -14.44 | **-13.98 LUFS / -1.78 dBTP** |
| `LoQueDecidioDmpConsulting` | -14 → -14.38 | -0.38 | -13.62 | **-14.02 LUFS / -1.99 dBTP** |

**Los 4 dentro de banda -14±0.5 LUFS y los 4 con true peak ≤ -1.0 dBTP** (criterio de la
misión) — la columna "Resultado final" es la medición POST-HOC independiente sobre el
archivo entregado (`loudnorm print_format=json` de nuevo, sin `linear=true`, leyendo
`input_i`/`input_tp` como medida real del archivo). **Sin necesidad de una segunda
pasada de re-mux** en ningún reel.

### Verificación ffprobe final — 4/4 exactos

Video: `h264 1080x1920` los 4. Duración de contenedor exacta: 30.000000 / 49.000000 /
48.000000 / 39.000000s. Audio: AAC 256k/48kHz real (no mudo, confirmado). Bitrate:
1,173,371 / 983,700 / 977,010 / 1,123,394 bps respectivamente — banda razonable para
1080×1920@24fps CRF16.

### Spot-check visual región+control (frames extraídos y vistos, no solo medidos) — GO

- **Reel 2, t=15s** (bloque HyperFrames "Como cobra cada uno"): tabla de 2 columnas
  ZAPIER/N8N legible, hairline ember vertical, boxless.
- **Reel 2, t=45s** (`brand_close`): centrado, teaser "cuando elegir cada uno, en el
  próximo video ->".
- **Reel 3, t=15s** (bloque HyperFrames "Cuando elegir cada uno"): tabla de 2 columnas
  "ELIGE ZAPIER SI"/"ELIGE N8N SI" legible.
- **Reel 3, t=44s** (`brand_close`): centrado, teaser "como lo decidió un cliente real,
  en el próximo video ->".
- **Reel 1, t=25s** (`brand_close`): centrado, teaser "cuánto cuesta cada uno, en el
  próximo video ->".
- **Reel 4, t=8s**: cifra **"1,440 horas"** + "recuperadas al año al automatizar con
  n8n" + atribución **"DMP Consulting Services, Houston/Katy TX . estimación de
  AetherLogik a partir de los datos del cliente."** en el MISMO frame.
- **Reel 4, t=15s**: cifra **"+160 citas"** + "adicionales cada mes, sin contratar
  personal" + la MISMA atribución en el MISMO frame.
- **Reel 4, t=22s**: quote **"La automatización nos permitió enfocarnos en lo que
  realmente importa: el trabajo con los clientes."** + atribución **"— Mayli Parra, DMP
  Consulting Services"** en el MISMO frame.
- **Reel 4, t=35s** (`brand_close`, cierre de la serie, CTA real): **"cal.com/
  aetherlogik/discovery . agenda tu diagnóstico gratuito ->"** — centrado, márgenes
  simétricos en las 2 líneas, sin artefactos (fix P-13 sigue vigente).
- Los 4 reels: paleta ember-only confirmada en las 9 capturas, cero cian/violeta/glow,
  boxless.

### R2 — los 4 entregables finales + los 2 bloques HyperFrames + los 6 assets generativos subidos y verificados

| Objeto R2 | Tamaño | HTTP |
|---|---|---|
| `agency/reels-n8n-zapier-serie/alquilar-o-comprar-v1.mp4` | 4,400,144 B | 200 |
| `agency/reels-n8n-zapier-serie/cuanto-cuesta-cada-uno-v1.mp4` | 6,025,167 B | 200 |
| `agency/reels-n8n-zapier-serie/cuando-elegir-cada-uno-v1.mp4` | 5,862,061 B | 200 |
| `agency/reels-n8n-zapier-serie/lo-que-decidio-dmp-consulting-v1.mp4` | 5,476,546 B | 200 |
| `agency/reels-n8n-zapier-serie/assets/cuanto-cuesta-cada-uno-tabla.mp4` | 462,083 B | 200 |
| `agency/reels-n8n-zapier-serie/assets/cuando-elegir-cada-uno-tabla.mp4` | 500,001 B | 200 |
| `agency/reels-n8n-zapier-serie/assets/*` (6 assets fal.media archivados) | ver Paso 0 | 200 x6 |

### Handoff a video-producer

Los 4 MP4 finales están en R2, técnicamente verificados (ffprobe/LUFS post-hoc/spot-check
visual región+control incluidos los 2 frames de atribución de DMP, la cita de Mayli Parra
y el CTA final a resolución de frame completo, todos legibles sin necesidad de zoom
adicional) — falta el `final_review` completo del director (promise/subtitle/
`brand_palette_guard` sobre los 4; `coherence_guard` no aplica, 0 escenas i2v en toda la
serie) antes del sign-off GO/NO-GO oficial.

## Lecciones

1. **Séptima serie consecutiva de la línea `reels-del-blog` en converger en banda de
   loudness en un solo pase de finishing** (sin re-mux) — la disciplina de recalibrar el
   `I` por mix ANTES del encode final, con `TP=-2.0` horneado desde el inicio, sigue
   rindiendo de forma consistente serie tras serie.
2. **Primera serie con 0 escenas i2v de principio a fin** — validación práctica de que
   la doctrina "0 heroes es legítimo" funciona para contenido puramente
   comparativo/técnico sin forzar una viñeta humana que el post no describe. El
   `delivery_promise` `data_explainer` (no `motion_led`) declarado por video-producer
   se sostuvo: nada en el render reclama movimiento/cinematografía que no existe.
3. **Primera tabla comparativa de 2 columnas autorada en HyperFrames** (las 6 series
   anteriores solo usaron checklists de 1 columna) — el layout se reusó
   deliberadamente entre los reels 2 y 3 de esta misma serie sin verse como
   hero-component-spine, confirmado en el spot-check visual.
4. **El README de pre-producción de esta serie ya traía la receta de finishing
   COMPLETA** (curves+eq+unsharp+vignette+aq-mode+acompressor→loudnorm con TP=-2.0),
   a diferencia de `reels-ia-miami-serie` (README con receta simplificada desactualizada
   frente a `premium-craft-standards.md`) — evidencia de que la lección de esa serie se
   propagó al handoff de pre-producción de la siguiente, cerrando el loop.

## Verify final INDEPENDIENTE de `video-producer` (2026-08-21) — veredicto de serie: **NO-GO CONDICIONAL (3/4 GO, 1/4 en fix)**

> [!warning] La serie NO cierra GO todavia. 3 de 4 reels: GO. El reel 4 tiene UN hallazgo real (BPM), ya corregido en pre-produccion, PENDIENTE de re-render por devops.

Descarga propia de los 4 `-v1.mp4` desde R2 (`curl` 200 x4) + `ffmpeg`/`ffprobe`/`python`
locales (numpy puro, sin scipy) — **sin confiar en el reporte de devops**, mismo rigor
independiente de las 6 series anteriores.

### Tecnico (ffprobe, re-medido) — 4/4 exacto
Los 4: h264, 1080x1920, 24fps, aac 48000Hz estereo. Duraciones EXACTAS: 30.0/49.0/48.0/39.0s.

### Audio (LUFS/TP, re-medido — coincide EXACTO con lo reportado por devops en los 4)

| Reel | LUFS devops | LUFS medido | TP devops | TP medido | TP `astats` | BPM declarado | **BPM medido** | Veredicto BPM |
|---|---|---|---|---|---|---|---|---|
| `AlquilarOComprar` | -13.98 | **-13.98** | -1.87 | **-1.87** | -1.914 dB | 128 | **127.7** | pass |
| `CuantoCuestaCadaUno` | -14.07 | **-14.07** | -1.91 | **-1.91** | -1.922 dB | 124 | **125.0** | pass |
| `CuandoElegirCadaUno` | -13.98 | **-13.98** | -1.78 | **-1.78** | -1.807 dB | 122 | **122.4** | pass |
| `LoQueDecidioDmpConsulting` | -14.02 | **-14.02** | -1.99 | **-1.99** | -1.986 dB | 118 | **117.6** | **FALLA — bajo el piso de 120** |

LUFS/TP coinciden EXACTOS a 2 decimales en los 4 (P-15 preventivo sigue funcionando,
7ª serie consecutiva sin re-mux por loudness). El BPM medido por autocorrelacion (numpy
puro, mismo metodo de `reels-ia-miami-serie`) coincide dentro de ±1.0 BPM del declarado
en los 4 — **el problema no es la medicion, es el numero que se declaro**: 118 BPM
(reel 4) esta bajo el piso duro de 120 de la directriz de Ernesto ("musica movida,
120-140 BPM, declarado"). El texto de la propia mision citaba una banda floja
"118-128" que video-producer copio sin cruzarla contra el piso real (120) — gap de
proceso en la PRE-PRODUCCION, no en la generacion ni en el render.

### Fix aplicado (mismo dia, antes de re-render)

Pista v2 regenerada (`fal-ai/elevenlabs/music`, prompt explicito "124 BPM, moderately
upbeat, clearly danceable pulse, not slow or ballad-like", 39053ms, +$0.39) y **medida
independientemente por video-producer ANTES de propagarla**: **125.0 BPM** — dentro de
banda. `props/lo-que-decidio-dmp-consulting.json` ya apunta a la ruta R2 versionada
`lo-que-decidio-dmp-consulting-musica-v2.mp3` (commit `8230c549`).
`LoQueDecidioDmpConsulting.gates.json` documenta el hallazgo completo (P-18).

**Por que re-render completo y no un re-mux manual del AAC**: este reel no tiene
dependencias HyperFrames ni i2v (100% Remotion) — un re-render completo desde el master
es mas simple y mas seguro que editar el AAC ya mezclado del `-v1.mp4` (evita el patron
de aplicar un fix a ciegas sobre un derivado sin reproducir la cadena completa, leccion
P-09 de esta misma linea).

### Coherencia entre planos
No aplica en los 4 reels — 0 escenas i2v en toda la serie (decision d-001).

### Paleta (escaneo programatico HSV region+control, 27 frames muestreados)
**0.0% cian/violeta en los 27 frames de los 4 reels**, sin excepcion. Sin cards, sin
glow, sin lavanda/violeta. El barrido EmberThread del reel 1 (t=20s) escanea ember=100%
en pixeles coloreados — es el streak calido intencional de la escena bridge (motivo ya
GO'd en las 6 series anteriores), no un fondo de color fuera de banda. Pass en los 4.

### Sin logos de terceros reproducidos
Las 2 tablas HyperFrames (reels 2 y 3) usan UNICAMENTE los labels tipograficos "ZAPIER"
y "N8N" en texto plano — cero imagenes de logo de ninguna de las 2 marcas. Confirmado
visualmente en las 4 filas x 2 tablas. Pass — cumple la restriccion explicita de la
mision ("los logos de n8n/Zapier son marcas ajenas — referencias tipograficas propias,
NO reproduzcas sus logos").

### Beat-pixel-check (reel 4 — cifras, cita y CTA en el MISMO frame)
- t=9s: **"1,440 horas"** + "recuperadas al ano al automatizar con n8n" + atribucion
  "DMP Consulting Services, Houston/Katy TX . estimacion de AetherLogik a partir de los
  datos del cliente." — LOS TRES en el MISMO frame.
- t=16s: **"+160 citas"** + "adicionales cada mes, sin contratar personal" + la MISMA
  atribucion — en el MISMO frame.
- t=22s: cita completa de Mayli Parra + atribucion "— Mayli Parra, DMP Consulting
  Services" — EN EL MISMO frame, texto EXACTO al del post.
- t=35s (`brand_close`, CTA real): "cal.com/aetherlogik/discovery . agenda tu
  diagnostico gratuito ->" — verificado con recorte+ampliacion 4x de la banda de texto
  (doctrina P-13, nunca a resolucion de frame completo): centrado, margenes simetricos,
  coincide EXACTO con el link de cierre del post.

Pass en los 4 puntos.

### `brand_close` de los 4 reels (confirma que el fix P-13 sigue vigente)
Los 4 (`AlquilarOComprar`, `CuantoCuestaCadaUno`, `CuandoElegirCadaUno`,
`LoQueDecidioDmpConsulting`) se inspeccionaron directamente: isotipo real +
wordmark two-tone + tagline + CTA centrado, margenes simetricos en ambos lados, sin
bleed en ninguno — los CTAs internos de los reels 1-3 son largos (2 lineas), exactamente
el patron que dispara el bug de P-13 si regresa. Sin regresion.

### Veredicto de serie

| # | Reel | Veredicto |
|---|---|---|
| 1 | `AlquilarOComprar` | **GO** |
| 2 | `CuantoCuestaCadaUno` | **GO** |
| 3 | `CuandoElegirCadaUno` | **GO** |
| 4 | `LoQueDecidioDmpConsulting` | **NO-GO CONDICIONAL** — unico hallazgo: BPM 117.6 (v1) bajo el piso de 120. Fix ya aplicado (pista v2, 125.0 BPM medido), pendiente re-render + re-verify. |

**Serie: NO-GO hasta que el reel 4 se re-renderice con la pista v2 y se re-verifique.**
Los reels 1-3 ya son entregables (`-v1.mp4`, sin excepcion) — no requieren tocarse.

## Handoffs pendientes (actualizado tras verify final)

- **`devops-aetherlogik-homelab`**: re-renderizar `LoQueDecidioDmpConsulting` con
  `props/lo-que-decidio-dmp-consulting.json` YA actualizado (musicSrc -> pista v2) ->
  finishing FFmpeg (misma recipe, TP=-2.0) -> subir como
  `agency/reels-n8n-zapier-serie/lo-que-decidio-dmp-consulting-v2.mp4` (conservar `-v1`
  para trazabilidad hasta decision de limpieza de R2, mismo patron de P-13).
- **`video-producer`** (proxima sesion): re-verify del reel 4 `-v2.mp4` (ffprobe + LUFS/TP
  + BPM medido independientemente, banda 120-140 esta vez) -> si pasa, GO de serie
  completo, actualizar tabla de "Los 4 videos canonicos" y cerrar el veredicto aqui.
- **Ernesto / quien suba a Drive**: esperar el GO completo de serie antes de publicar —
  hoy solo 3/4 reels son entregables.

## 📌 Para memoria (verify final)

- Primer hallazgo REAL de contenido (no solo tooling) en el verify final de la linea
  `reels-del-blog` desde que la disciplina de recalibrar `I`+`TP=-2.0` preventivo
  empezo a rendir — y es de un tipo NUEVO: no un defecto de render/finishing, sino un
  numero de PRE-PRODUCCION (BPM declarado) que nunca se cruzo contra el piso duro real
  de la directriz de marca. Ningun gate de la plataforma (`slideshow_risk`,
  `variation_checker`, `delivery_promise`, `brand_palette_guard`, `anti_claims_audit`)
  verifica BPM — es un gap de cobertura de gate, no solo un error puntual de esta serie.
  Registrado como P-18 en `Video-problemas.md` para que `skill-curator` lo cablee.
- El costo de la correccion fue minimo (+$0.39, una llamada) porque se detecto ANTES
  del render final del reel corregido — evidencia a favor de medir BPM independientemente
  SIEMPRE en el verify, no solo cuando alguien lo senala explicitamente.
