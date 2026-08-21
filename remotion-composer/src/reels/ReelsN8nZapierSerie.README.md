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

Presupuesto de la mision: **≤$25**. Costo real total: **≈$1.66**.

| Asset | Modelo | Parametros | Costo | URL fal.media (temporal, ~24h) | Tamano |
|---|---|---|---|---|---|
| Musica reel 1 | `fal-ai/elevenlabs/music` | 30000ms, 128 BPM declarado | $0.30 | `https://v3b.fal.media/files/b/0aa73f7b/-dkFNz-vR4UBMVRqvNyBR_music_generated.mp3` | 480,698 B |
| Musica reel 2 | `fal-ai/elevenlabs/music` | 49000ms, 124 BPM declarado | $0.49 | `https://v3b.fal.media/files/b/0aa73f90/W7bSq9LxtHTYhDF4gESdV_music_generated.mp3` | 783,718 B |
| Musica reel 3 | `fal-ai/elevenlabs/music` | 48000ms, 122 BPM declarado | $0.48 | `https://v3b.fal.media/files/b/0aa73f7c/Rd6IWahhkDR-1UCKE8FYt_music_generated.mp3` | 767,418 B |
| Musica reel 4 | `fal-ai/elevenlabs/music` | 39000ms, 118 BPM declarado | $0.39 | `https://v3b.fal.media/files/b/0aa73f90/Dhz7GxgIVEC56RAJbtJ4f_music_generated.mp3` | 624,058 B |
| SFX chip (compartido reels 2+3) | `fal-ai/elevenlabs/sound-effects/v2` | 0.5s | $0.001 | `https://v3b.fal.media/files/b/0aa73f7f/MZDKqDZ7FRw7PVHZ0rJKu_sound_effect.mp3` | 8,821 B |
| SFX whoosh (compartido reels 1+4) | `fal-ai/elevenlabs/sound-effects/v2` | 0.6s | $0.0012 | `https://v3b.fal.media/files/b/0aa73f7f/OPE4Ad3Gs5427560K1WjJ_sound_effect.mp3` | 10,493 B |
| **Total** | | | **≈$1.663** | | |

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
