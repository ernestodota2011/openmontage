# Serie "reels-inmobiliarios-serie" — HANDOFF a devops, PENDIENTE de render (2026-08-21)

> [!warning] Este documento es un HANDOFF de pre-produccion, no un sign-off de serie cerrada
> A diferencia de `ReelsAbogadosSerie.README.md` / `ReelsClinicasSerie.README.md` /
> `ReelsChatbotSerie.README.md` (las 3 series anteriores, cerradas GO 4/4), esta serie
> **AUN NO se renderizo**. Este README documenta la pre-produccion completa (guiones,
> scene_plans, assets generativos reales ya generados y verificados por `video-producer`
> sobre los archivos crudos, composiciones .tsx versionadas, gates PRE-render) y deja
> instrucciones exactas para que `devops-aetherlogik-homelab` renderice, finalice y
> publique los 4 videos. El `post_render_verify` + el `coherence_guard`/`brand_palette_guard`
> sobre pixeles del MP4 COMPUESTO final lo corre `video-producer` en la sesion siguiente,
> una vez exista el artefacto real en R2.

Cuarta serie consecutiva de la linea `reels-del-blog`, misma formula
GO-4/4 de `aetherlogik/reels-chatbot-serie`, `aetherlogik/reels-clinicas-serie`
y `aetherlogik/reels-abogados-serie` (rama partida de esa ultima HEAD
`38b869c` para heredar el catalogo brand-safe intacto). Fuente del blog:
`ia-para-agentes-inmobiliarios-seguimiento-leads.md`
(D:\aetherlogik-astro\src\content\blog\).

## Estructura de los 4 reels — y por que

| # | Reel | Duracion | Runtime | Assets generativos |
|---|---|---|---|---|
| 1 | **21 veces mas probable** (gancho) | 30.0s / 720f | Remotion (atelier), 1 hero i2v | still + i2v + musica |
| 2 | **Lo que ya puedes automatizar** (didactico) | 46.0s / 1104f | HIBRIDO Remotion + HyperFrames | musica + clip HyperFrames |
| 3 | **Cuando entra el humano** (limites/credibilidad) | 45.0s / 1080f | Remotion (atelier), 1 hero i2v | still + i2v + musica |
| 4 | **Como empiezas sin perder leads** (cierre) | 45.0s / 1080f | Remotion (atelier) | musica |

Sigue la formula probada: gancho (dato + problema vivido) -> didactico
(que SI se automatiza) -> limites (credibilidad, que NO reemplaza) ->
cierre (como empezar + CTA real). Cada reel de los 3 primeros cierra
apuntando al SIGUIENTE reel de la serie; solo el reel 4 lleva el CTA de
conversion (`/para-real-estate` + diagnostico gratuito), igual que las
3 series anteriores.

## Manifiesto de assets generados (fal.ai, URLs verificadas por video-producer)

⚠️ **Las URLs de `v3b.fal.media` son TEMPORALES (~24h)** — devops debe
archivarlas a R2 (`agency/reels-inmobiliarios-serie/...`) ANTES de que
expiren; `video-producer` NO tiene ni debe adquirir credenciales de R2
(P-07 de la skill `aetherlogik-video`).

| Asset | Reel | Modelo | Params | Costo | Tamano | URL (temporal) |
|---|---|---|---|---|---|---|
| hero still | 1 | fal-ai/nano-banana-pro | 2K, 9:16, jpeg | $0.15 | 2.38MB | `https://v3b.fal.media/files/b/0aa73846/UzOPBNA_oj_ge6ttpf98m_WGRF3nwD.jpg` |
| hero i2v | 1 | fal-ai/kling-video/o1/image-to-video | duration=5, solo start_image | $0.56 | 4.50MB (h264, 1072x1928, 24fps, 5.04s) | `https://v3b.fal.media/files/b/0aa7386c/UwyaRBiEAI5DmVaeBbNHG_output.mp4` |
| musica reel 1 | 1 | fal-ai/elevenlabs/music | 128 BPM, 30s | $0.30 | 480KB (29.99s) | `https://v3b.fal.media/files/b/0aa73864/r_tZs7rKs4M43RIMow7Zv_music_generated.mp3` |
| musica reel 2 | 2 | fal-ai/elevenlabs/music | 132 BPM, 46s | $0.46 | 736KB (45.98s) | `https://v3b.fal.media/files/b/0aa73850/5-yIDLfln4gYFUZjE8xc-_music_generated.mp3` |
| hero still | 3 | fal-ai/nano-banana-pro | 2K, 9:16, jpeg | $0.15 | 2.81MB | `https://v3b.fal.media/files/b/0aa73848/Pbps1hut80AIt2ewbn0CU_sVVKZkaD.jpg` |
| hero i2v | 3 | fal-ai/kling-video/o1/image-to-video | duration=5, solo start_image | $0.56 | 10.33MB (h264, 1072x1928, 24fps, 5.04s) | `https://v3b.fal.media/files/b/0aa73859/0ZkbEQW8T7DBvjMGV9lnr_output.mp4` |
| musica reel 3 | 3 | fal-ai/elevenlabs/music | 124 BPM, 45s | $0.45 | 720KB (44.98s) | `https://v3b.fal.media/files/b/0aa73850/FwavJ2Y4XBUOHdTm6W6b5_music_generated.mp3` |
| musica reel 4 | 4 | fal-ai/elevenlabs/music | 130 BPM, 45s | $0.45 | 721KB (45.04s) | `https://v3b.fal.media/files/b/0aa73850/xFxdDMqmGUmF029S2--vN_music_generated.mp3` |
| logo (real, no generado) | todos | — | isotipo ember real | $0.00 | ya en R2 | `https://media.aetherlogik.com/aetherlogik/brand/logo-ember-hires.webp` |
| sfx whoosh (reusado) | 1, 4 | — | reusado de reels-clinicas-serie | $0.00 | ya en R2 | `https://media.aetherlogik.com/agency/reels-clinicas-serie/shared/sfx-whoosh.mp3` |

**Costo total real de la serie: $3.08 USD** (reel1 $1.01 + reel2 $0.46 +
reel3 $1.16 + reel4 $0.45), contra un techo de $25 declarado en la
mision. Detalle linea por linea en el `assets_generated` de cada
`.gates.json`.

### Verificacion de video-producer sobre los archivos crudos (antes de handoff)

- **Los 2 stills** (reel 1 y reel 3): descargados y MIRADOS — calidez
  tungsteno/dorada, cero cian/violeta, sujeto integrado a la escena (no
  recortado), sin texto de marca inventado.
- **Los 2 i2v** (reel 1 y reel 3): `ffprobe` confirmado (h264, 24fps,
  ~5.04s cada uno) + 2 frames extraidos por clip (1.0s y 4.0s) y
  MIRADOS — mismo personaje/espacio/paleta calida en ambos frames,
  movimiento sutil y motivado (mano hacia el telefono / push-in +
  saludo), sin distorsion de manos ni drift de color. `coherence_guard`
  informal: PASS en los 2.
- **Las 4 musicas**: `ffprobe` (duracion) + `ffmpeg volumedetect`
  (mean/max volume) confirmando que ninguna esta muda ni clipeada.
  BPM declarado en el brief de cada una (medicion independiente del BPM
  se hace sobre el audio FINAL mezclado, en el post_render_verify — no
  sobre el stem crudo, mismo criterio que las 3 series anteriores).

## Definicion de DONE de este handoff (P-12)

- [x] 4 composiciones `.tsx` versionadas en `remotion-composer/src/reels/`
- [x] Registradas en `remotion-composer/src/Root.tsx` (imports + `<Composition>`)
- [x] Props JSON reales por reel en `remotion-composer/props/` (URLs de fal, `tail_padding_seconds:0`)
- [x] Assets generados y verificados (ver manifiesto arriba)
- [x] `.art-direction.md` + `.script.md` + `.scene_plan.json` + `.decision_log.json` + `.gates.json` (pre-render) por reel
- [x] Composicion HyperFrames del reel 2 autorada (`hyperframes-compositions/seguimiento-inmobiliario-delegable/`)
- [ ] **PENDIENTE (devops):** render + finishing + subida a R2 (comandos abajo)
- [ ] **PENDIENTE (video-producer, sesion siguiente):** post_render_verify + coherence_guard/brand_palette_guard sobre pixeles del MP4 compuesto + sign-off GO/NO-GO

## Gate de entrada — corre esto PRIMERO

```bash
cd /opt/openmontage/remotion-composer   # o la ruta del checkout en el CT 128
npm install
npx remotion compositions src/index.tsx
```

Confirma que las 4 IDs nuevas aparecen en la lista: `VeintiunVecesMasProbable`,
`LoQueYaPuedesAutomatizar`, `CuandoEntraElHumano`, `ComoEmpiezasSinPerderLeads`.
Si alguna falta, el registro en `Root.tsx` tiene un error de sintaxis — no
sigas al render.

## Orden de render — reel 2 primero necesita su bloque HyperFrames

```bash
# 1) Render del bloque HyperFrames del reel 2 (ANTES que la composicion Remotion)
pct start 128
pct exec 128 -- bash -c 'cd /ruta/al/proyecto/hyperframes-compositions/seguimiento-inmobiliario-delegable && hf lint . && hf render -c index.html -o seguimiento-inmobiliario-delegable.mp4'
# copiar/subir seguimiento-inmobiliario-delegable.mp4 a un path accesible desde el
# render Remotion (p.ej. remotion-composer/public/) y usarlo como tareasDelegablesSrc
# en props/lo-que-ya-puedes-automatizar.json (hoy vacio "")
pct stop 128
```

## Comandos de render por reel (mezzanine ProRes -> H.264, ver `premium-craft-standards.md`)

```bash
# Reel 1 — VeintiunVecesMasProbable (30.0s)
npx remotion render src/index.ts VeintiunVecesMasProbable out/veintiun-veces-mas-probable-master.mov \
  --codec=prores --prores-profile=hq --image-format=png --color-space=bt709 \
  --props=props/veintiun-veces-mas-probable.json

# Reel 2 — LoQueYaPuedesAutomatizar (46.0s) — SOLO despues del paso HyperFrames de arriba
npx remotion render src/index.ts LoQueYaPuedesAutomatizar out/lo-que-ya-puedes-automatizar-master.mov \
  --codec=prores --prores-profile=hq --image-format=png --color-space=bt709 \
  --props=props/lo-que-ya-puedes-automatizar.json

# Reel 3 — CuandoEntraElHumano (45.0s)
npx remotion render src/index.ts CuandoEntraElHumano out/cuando-entra-el-humano-master.mov \
  --codec=prores --prores-profile=hq --image-format=png --color-space=bt709 \
  --props=props/cuando-entra-el-humano.json

# Reel 4 — ComoEmpiezasSinPerderLeads (45.0s)
npx remotion render src/index.ts ComoEmpiezasSinPerderLeads out/como-empiezas-sin-perder-leads-master.mov \
  --codec=prores --prores-profile=hq --image-format=png --color-space=bt709 \
  --props=props/como-empiezas-sin-perder-leads.json
```

## Recipe de finishing (FFmpeg, igual para los 4 — ver `premium-craft-standards.md` §6)

```bash
ffmpeg -i <reel>-master.mov -vf \
  "curves=all='0/0.045 0.75/0.78 1/0.96',\
  eq=saturation=0.92:contrast=1.06:gamma=1.0,\
  unsharp=5:5:0.4:5:5:0.0,\
  vignette=angle=PI/5" \
  -c:v libx264 -crf 16 -pix_fmt yuv420p -preset slow -x264-params aq-mode=2:aq-strength=1.2 -movflags +faststart \
  <reel>-graded.mp4
```

⚠️ **CRF fijo en 16** (NO 17-18) para los reels 1 y 3 — llevan grano
horneado (`FilmGrade`) + texto fino de UI en `HeadlineOverlay`/`StatReveal`.
Reel 2 lleva el bloque HyperFrames con nodos/ticks chicos — misma banda
16-18, nunca subir a ciegas (ver el gotcha de `premium-craft-standards.md`
§6 sobre texto de UI crushed).

### Audio — loudnorm 2 pasadas a -14 LUFS / -1 dBTP (mezclar musica + sfx ANTES de mux)

```bash
ffmpeg -i mixed.wav -af loudnorm=I=-14:TP=-1.0:LRA=11:print_format=json -f null -
# aplicar pasada 2 con los measured_* del JSON de arriba + linear=true
ffmpeg -i mixed.wav -af "loudnorm=I=-14:TP=-1.0:LRA=11:measured_I=..:measured_TP=..:measured_LRA=..:measured_thresh=..:offset=..:linear=true" \
  -ar 48000 -c:a aac -b:a 320k <reel>-audio.m4a
```

Sube a R2: `agency/reels-inmobiliarios-serie/<slug>-v1.mp4` (los 4 slugs:
`veintiun-veces-mas-probable`, `lo-que-ya-puedes-automatizar`,
`cuando-entra-el-humano`, `como-empiezas-sin-perder-leads`).

## Presupuesto

Costo real de assets generativos: **$3.08 USD**, contra un techo de
$25 declarado en la mision. Sobra amplio margen si algun asset necesita
regenerarse tras el post_render_verify.

## Gotchas de esta serie

Ninguno nuevo. Se aplicaron proactivamente desde el diseno los 3
gotchas conocidos de las series anteriores: (1) Kling O1 `duration`
fijado a `"5"` exacto (evita P-11); (2) el contrato completo de 6
atributos + `data-no-timeline` en la composicion HyperFrames desde el
primer commit (evita P-10); (3) `Root.tsx` + props JSON registrados en
el MISMO handoff que las composiciones, no diferido (evita P-12). La
CRF fija en 16 (nunca 17-18 "porque no hay grano") se declaro explicito
en este README para no repetir el hallazgo P-01/P-08 de
`premium-craft-standards.md`.

## Handoffs pendientes

- **devops-aetherlogik-homelab**: render de las 4 composiciones (orden
  arriba, reel 2 exige el paso HyperFrames primero) + finishing FFmpeg +
  archivar los 8 assets de fal.media a R2 (URLs temporales, ~24h) +
  subir los 4 MP4 finales a R2 (`agency/reels-inmobiliarios-serie/`).
- **video-producer (sesion siguiente)**: post_render_verify completo
  (ffprobe + LUFS medido independiente + BPM medido independiente +
  frame-sampling region+control + coherence_guard sobre pixeles reales
  de los 2 heroes i2v) + sign-off GO/NO-GO de la serie, mismo estandar
  que `ReelsAbogadosSerie.README.md`.
- **Ernesto**: nada pendiente de su parte hasta el sign-off tecnico.

## 📌 Para memoria

- Cuarta serie consecutiva de la linea `reels-del-blog` — primera vez
  que `video-producer` genera los assets reales via el MCP `fal-ai`
  DIRECTAMENTE en la sesion de composicion (no solo declarados/briefeados
  para otra sesion), verificando stills/i2v/musica sobre los archivos
  crudos antes del handoff — reduce el riesgo de que devops descubra un
  asset generico/con drift recien en el render final. Se descargaron y
  MIRARON los 2 stills + los 4 frames de los 2 i2v + se corrio
  `ffprobe`/`volumedetect` sobre las 4 musicas, todo con herramientas
  locales (curl + ffmpeg), sin depender del CT 128 para la verificacion
  de pre-produccion.
- La formula de reparto "1 hero i2v en el gancho + 1 hero i2v en el
  reel de limites/credibilidad, cero en los 2 reels 100%-tipograficos"
  se repite por CUARTA vez consecutiva (chatbot, clinicas, abogados,
  ahora inmobiliarios) — suficiente evidencia acumulada para
  considerarla la formula por defecto de la linea `reels-del-blog`, no
  una coincidencia por serie.
- El post de agentes inmobiliarios NO trae una lista numerada de pasos
  de implementacion (a diferencia del de abogados, que si tenia 5 pasos
  explicitos) — el reel de cierre uso 4 items en vez de 5 para no forzar
  un patron visual sobre contenido que el post no ofrece; vale la pena
  que el proximo blog de la serie NO asuma que siempre habra 5 pasos
  disponibles.
