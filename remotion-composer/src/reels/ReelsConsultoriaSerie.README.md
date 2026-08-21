# Serie "reels-consultoria-serie" — 8ª y ÚLTIMA serie de la línea `reels-del-blog`

> [!warning] Estado: PRE-PRODUCCIÓN COMPLETA, pendiente de render (2026-08-21)
> Handoff de `video-producer` a `devops-aetherlogik-homelab`. Rama
> `aetherlogik/reels-consultoria-serie` del fork `ernestodota2011/openmontage`,
> partida de `aetherlogik/reels-ia-miami-serie` HEAD
> (`26a6dc1c0a0667a6fd40701c7d302d44c6f6c6f2`). Los 4 `.tsx` de reel
> están escritos, tipados, y **registrados en `Root.tsx`** (4 imports +
> 4 `<Composition>`, mismo patrón exacto que las 27 composiciones ya
> existentes) — pero **`video-producer` NO corrió `npx remotion
> compositions` real** (sin checkout local de Node/el fork en esta
> sesión, doctrina P-12 de `aetherlogik-video`): **primer gate a correr
> por devops**, exactamente como en las 2 series anteriores.

Fuente del blog: `consultoria-ia-gratuita-diagnostico-paso-a-paso.md`
(D:\aetherlogik-astro) — el post del **EMBUDO/CONVERSIÓN**: a
diferencia de las 7 series anteriores (educativas), esta es la que
lleva a **agendar** el diagnóstico gratuito.

## Los 4 reels

| # | Reel (composition id) | Tipo | Duración | Música (BPM declarado) | CTA |
|---|---|---|---|---|---|
| 1 | `LoQueNoSabesDeTuNegocio` | Gancho | 30.0s (720f) | 128 BPM, tenso→esperanzador | interno → reel 2 |
| 2 | `AsiSonLosTreintaMinutos` | Didáctico (proceso paso a paso, HyperFrames) | 37.0s (888f) | 132 BPM, driving/metódico | interno → reel 3 |
| 3 | `LoQueRecibesDespues` | Didáctico (caso real, Marino HVAC) | 34.0s (816f) | 124 BPM, warm/resolving | interno → reel 4 |
| 4 | `PorQueEsGratisAgendaAhora` | Cierre — **CTA MÁS FUERTE de las 8 series** | 35.0s (840f) | 136 BPM, energético/urgente-optimista | **REAL: cal.com/aetherlogik/discovery** |

Todos 24fps, 1080×1920 (9:16), `tail_padding_seconds: 0` (duración
exacta). Los frame plans exactos están comentados al tope de cada
`.tsx`.

## Manifiesto de assets generados (fal.ai, agencia BYOK)

| Asset | Reel | Modelo | Costo | URL (fal.media — TEMPORAL, ~24h) |
|---|---|---|---|---|
| still hero (2K JPEG) | 1 | `fal-ai/nano-banana-pro` | $0.15 | https://v3b.fal.media/files/b/0aa73f7e/hCtUhOuPLVf-tl28aeTxY_Un3kpx7x.jpg |
| hero i2v (5s) | 1 | `fal-ai/kling-video/o1/image-to-video` | $0.56 | https://v3b.fal.media/files/b/0aa73fa4/xnULnsPZ6iV4strpopoeZ_output.mp4 |
| música (30s, 128 BPM) | 1 | `fal-ai/elevenlabs/music` | $0.30 | https://v3b.fal.media/files/b/0aa73f7f/Dio_osLoZ3SigXNXvzlk2_music_generated.mp3 |
| música (37s, 132 BPM) | 2 | `fal-ai/elevenlabs/music` | $0.37 | https://v3b.fal.media/files/b/0aa73f93/1WYCXYJPth-Rb_HLUJ4YY_music_generated.mp3 |
| still hero (2K JPEG) | 3 | `fal-ai/nano-banana-pro` | $0.15 | https://v3b.fal.media/files/b/0aa73f7e/TyEYpKdTD4e09gyWf_8wK_YOIMNcQ6.jpg |
| hero i2v (5s) | 3 | `fal-ai/kling-video/o1/image-to-video` | $0.56 | https://v3b.fal.media/files/b/0aa73fa4/foh4k5DxwF8J6K3bT-xFB_output.mp4 |
| música (34s, 124 BPM) | 3 | `fal-ai/elevenlabs/music` | $0.34 | https://v3b.fal.media/files/b/0aa73f80/T-zG7lap1udkF_8VAuI4t_music_generated.mp3 |
| música (35s, 136 BPM) | 4 | `fal-ai/elevenlabs/music` | $0.35 | https://v3b.fal.media/files/b/0aa73f80/EosJxCvWyhU9bZWqs2M75_music_generated.mp3 |
| **Total assets** | | | **$2.78** | dentro del presupuesto de $25 |

> [!danger] P-07 — `video-producer` NUNCA toca credenciales de R2
> Las URLs de arriba son **fal.media, temporales (~24h)**.
> `video-producer` NO las archivó a R2 (no tiene ni debe tener acceso a
> `~/.aetherlogik/secrets/r2.env`). **Instrucción explícita a
> `devops-aetherlogik-homelab`**: descargar los 6 assets + el clip
> HyperFrames renderizado (ver Paso 1 abajo) y subirlos a
> `agency/reels-consultoria-serie/assets/` por la vía segura ya
> establecida (config in-situ, nunca argv/`Read` de un `.env`), **ANTES
> de que expiren las URLs de fal.media**. Actualizar los 4
> `remotion-composer/props/*.json` con las URLs R2 reales tras
> archivar (mismo patrón que las 6 series anteriores).

El isotipo real (`logoSrc`) ya está en R2 en los 4 props:
`https://media.aetherlogik.com/aetherlogik/brand/logo-ember-hires.webp`
(no se genera con IA).

Sin SFX nuevos generados en esta serie (los 4 `sfx*Src` quedan como
cadena vacía en los props — opcionales por diseño en los `.tsx`, ver
`{sfxXSrc && (...)}`). Si devops quiere reforzar sync de audio, puede
reusar un SFX ya archivado de una serie anterior (p. ej.
`agency/reels-hvac-serie/assets/sfx-ding-checklist.mp3` para el reel 2,
o un `sfx-chime` archivado de `reels-ia-miami-serie`/`reels-hvac-serie`
para el reel 3) — opcional, no bloqueante.

## Paso 1 — Bloque HyperFrames del reel 2 (`asi-son-los-treinta-minutos-timeline`) — pendiente de render

Composición HTML/CSS pura (`data-no-timeline`, sin GSAP) en
`hyperframes-compositions/asi-son-los-treinta-minutos-timeline/index.html`:
barra de tiempo 0-30min con 3 segmentos proporcionales (33%/50%/17% =
10/15/5 minutos) que se rellenan en cascada + 3 tarjetas boxless (tick
ember + minutos + título + detalle) sincronizadas. Contrato de 6
atributos + `data-no-timeline` ya presente en el `#stage` desde la
autoría (verificar con `hf lint .` de todas formas, doctrina P-10).

Comando canónico (lo ejecuta devops, `aetherlogik-hyperframes`):
```bash
python scripts/ssh_helper.py --host pve1 "pct start 128"
python scripts/ssh_helper.py --host pve1 "pct exec 128 -- bash -c 'cd /ruta/al/checkout/hyperframes-compositions/asi-son-los-treinta-minutos-timeline && /usr/local/bin/hf lint . && /usr/local/bin/hf render -c index.html -o asi-son-los-treinta-minutos-timeline.mp4'"
```
(usar la ruta absoluta `/usr/local/bin/hf` — `pct exec` no hereda
`/usr/local/bin` en `$PATH` de sesión no-interactiva, gotcha ya
documentado 3 veces en la línea). Verificar `ffprobe`: `1080×1920,
h264, 24fps, duration=20.000000` exacto. Archivar a R2 en
`agency/reels-consultoria-serie/assets/asi-son-los-treinta-minutos-timeline.mp4`
y actualizar `phasesTimelineSrc` en
`remotion-composer/props/asi-son-los-treinta-minutos.json`.

## Paso 2 — Gate de entrada (ANTES de renderizar)

```bash
git fetch && git checkout aetherlogik/reels-consultoria-serie && git pull
cd remotion-composer && npm install
npx tsc --noEmit                         # debe dar exit 0
npx remotion compositions src/index.tsx  # DEBE listar las 4 composiciones nuevas — este es el gate real de "completo" (P-12)
```
Las 4 deben aparecer con `24.00fps`, `1080x1920` y las duraciones
exactas: `LoQueNoSabesDeTuNegocio` 720f (30.00s),
`AsiSonLosTreintaMinutos` 888f (37.00s), `LoQueRecibesDespues` 816f
(34.00s), `PorQueEsGratisAgendaAhora` 840f (35.00s). Si alguna no
aparece, `video-producer` **declaró explícito** en este README que NO
corrió esta verificación él mismo — el wireado de `Root.tsx` está
hecho siguiendo el patrón exacto de las 27 composiciones existentes,
pero no fue verificado por render real.

## Paso 3 — Render Remotion (los 4, ProRes HQ, SECUENCIAL — nunca en paralelo, CT 128 de 6GB)

```bash
npx remotion render src/index.tsx LoQueNoSabesDeTuNegocio out/lo-que-no-sabes-de-tu-negocio-master.mov --props=./props/lo-que-no-sabes-de-tu-negocio.json --codec=prores --prores-profile=hq --image-format=png --color-space=bt709
npx remotion render src/index.tsx AsiSonLosTreintaMinutos out/asi-son-los-treinta-minutos-master.mov --props=./props/asi-son-los-treinta-minutos.json --codec=prores --prores-profile=hq --image-format=png --color-space=bt709
npx remotion render src/index.tsx LoQueRecibesDespues out/lo-que-recibes-despues-master.mov --props=./props/lo-que-recibes-despues.json --codec=prores --prores-profile=hq --image-format=png --color-space=bt709
npx remotion render src/index.tsx PorQueEsGratisAgendaAhora out/por-que-es-gratis-agenda-ahora-master.mov --props=./props/por-que-es-gratis-agenda-ahora.json --codec=prores --prores-profile=hq --image-format=png --color-space=bt709
```
(Renderizar `AsiSonLosTreintaMinutos` DESPUÉS de tener
`phasesTimelineSrc` archivado en R2 y actualizado en el props JSON —
Paso 1 antes que Paso 3 para ese reel.)

## Paso 4 — Finishing FFmpeg (recipe premium-craft-standards.md §6, TP=-2.0 desde el primer pase)

Receta exacta — CRF 16, curva SIN el punto `0.25/0.22` (crushea luma
60-120, P-01/P-08), `aq-mode=2:aq-strength=1.2`, `acompressor`
pre-`loudnorm`, **`TP=-2.0` en la pasada 2 desde el primer intento**
(P-15 — evita el ciclo de re-mux que necesitaron 2/4 reels de
`reels-hvac-serie` con `TP=-1.0`):

```bash
ffmpeg -i <master>.mov -vf "curves=all='0/0.045 0.75/0.78 1/0.96',eq=saturation=0.92:contrast=1.06:gamma=1.0,unsharp=5:5:0.4:5:5:0.0,vignette=angle=PI/5" -c:v libx264 -crf 16 -preset slow -x264-params aq-mode=2:aq-strength=1.2 -c:a copy <intermedio>.mp4
# Audio: medir loudnorm pasada 1 -> acompressor threshold=-18dB:ratio=3:attack=15:release=200:makeup=2 -> loudnorm pasada 2 con TP=-2.0, I recalibrado por el offset medido (NO asumir el mismo offset entre reels, doctrina de la casa)
```
Verificar POST-HOC (nunca confiar en el reporte del comando): LUFS en
banda -14±0.5, true peak ≤ -1.0 dBTP en el archivo FINAL entregado.

## Paso 5 — Subida a R2 + verify

Subir los 4 finales a `agency/reels-consultoria-serie/<slug>-v1.mp4`.
`video-producer` correrá el verify independiente (ffprobe + LUFS/TP
re-medidos + BPM por autocorrelación + spot-check visual con
recorte+zoom 3-4× de TODO texto libre — brand_close, atribución del
caso Marino HVAC, la URL de agenda del reel 4 — doctrina P-13) apenas
estén en R2.

## Gates pre-render (auto-score de video-producer, sin checkout local — ver `.gates.json` de cada reel)

Los 4 reels puntúan `slideshow_risk` en banda "strong" (0.45-0.5
promedio), `variation_checker` sin violaciones, `delivery_promise`
válido para su tipo declarado (`typography_led` los 4, con 1 hero i2v
en reels 1 y 3), y `anti_claims_audit` PASS en los 4 (toda cifra/frase
es literal o paráfrasis directa del post). El `brand_palette_guard` y
el `coherence_guard` reales se corren sobre el MP4 renderizado — quedan
pendientes hasta el Paso 5.

## Handoffs pendientes

- **`devops-aetherlogik-homelab`**: Pasos 1-5 completos (HyperFrames
  render del reel 2 → gate de entrada → 4 renders Remotion → finishing
  FFmpeg TP=-2.0 → R2).
- **`video-producer`** (cuando los 4 estén en R2): verify final
  independiente + `final_review` + cierre de la LÍNEA COMPLETA
  `reels-del-blog` (8/8 series).

## 📌 Para memoria

- **8ª y ÚLTIMA serie de la línea `reels-del-blog`** — cierra el ciclo
  educativo→conversión de la línea completa (chatbot-whatsapp →
  clínicas → abogados → inmobiliarios → hvac → ia-miami →
  n8n-vs-zapier [en paralelo, otra sesión] → **consultoria
  [conversión]**).
- Primera serie de la línea cuyo CTA final NO es interno — el reel 4
  lleva la URL de agenda real (`cal.com/aetherlogik/discovery`),
  coherente con ser la serie del fondo de embudo.
- El bloque HyperFrames de esta serie (`asi-son-los-treinta-minutos-timeline`)
  es el 6º de la línea, mismo patrón "bloques densos/procesos ->
  HyperFrames" pero con un DEVICE nuevo (barra de tiempo proporcional,
  no una lista de nodos de peso igual) — vale la pena registrarlo como
  variante reusable en `aetherlogik-hyperframes` si aparece otro
  proceso con fases de duración desigual.
