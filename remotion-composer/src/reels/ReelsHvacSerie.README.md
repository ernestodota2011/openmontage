# Serie "reels-hvac-serie" — pre-producción completa, pendiente de render (2026-08-21)

> [!warning] Estado: PRE-PRODUCCIÓN COMPLETA (4 `.tsx` + `Root.tsx` wireado), render PENDIENTE
> A diferencia de un handoff "completo" a medias (ver P-12 en `Video-problemas.md`: registrar en `Root.tsx` NO es polish opcional), esta sesión SÍ registró las 4 composiciones en `Root.tsx` (commit `5864e13`) siguiendo línea por línea el patrón exacto de las 7 entradas ya existentes. ==NO se corrió `npx remotion compositions` real== (esta sesión no tiene checkout local de Node/el fork) — es el primer paso que **devops debe correr antes de cualquier otra cosa**, para confirmar por EFECTO que el wireado es correcto, no solo por lectura de código.

Quinta serie de la línea `reels-del-blog`. Fuente del blog:
`automatizar-facturacion-hvac-cuanto-pierdes.md` (D:\aetherlogik-astro).

## Estructura de la serie (4 reels)

| # | Reel (slug) | Composición Remotion | Duración exacta | Runtime | Hero i2v |
|---|---|---|---|---|---|
| 1 | `lo-que-te-cuesta-facturar-a-mano` (gancho) | `LoQueTeCuestaFacturarAMano` | 30.0s (720f @24fps) | Remotion (atelier) | Sí (único) |
| 2 | `como-funciona-la-automatizacion-de-facturacion` (didáctico) | `ComoFuncionaLaAutomatizacionDeFacturacion` | 46.0s (1104f @24fps) | HÍBRIDO Remotion + HyperFrames | No |
| 3 | `los-numeros-de-marino-hvac` (caso real) | `LosNumerosDeMarinoHVAC` | 45.0s (1080f @24fps) | Remotion (atelier) | Sí (único) |
| 4 | `lo-que-necesitas-para-automatizar` (cierre) | `LoQueNecesitasParaAutomatizar` | 45.0s (1080f @24fps) | Remotion (atelier) | No |

Total serie: 166.0s (~2:46). 2 heroes i2v (reels 1 y 3), 1 bloque HyperFrames (reel 2) — mismo patrón de reparto de recursos generativos que las 4 series anteriores.

> [!important] `LosNumerosDeMarinoHVAC` ≠ `CasoMarinoHVAC` (ya existente en el fork)
> `CasoMarinoHVAC` (de `reels-chatbot-serie`, ya en `main`) cubre el ángulo del asistente de WhatsApp, SIN cifras (ese post no las daba). `LosNumerosDeMarinoHVAC` (este reel) cubre el ángulo de FACTURACIÓN, CON las cifras exactas de esta sección del post ($50, 88, $4,400, 36 horas). Son dos composiciones/guiones distintos, deliberadamente con nombres distintos — ver `LosNumerosDeMarinoHVAC.decision_log.json` d-001.

## Fidelidad al post — regla dura verificada en los 4 reels

Toda cifra usada es la del post, sin redondear ni inventar. Las cifras
propias/genéricas del post ($30-$100/trabajo, 200+ horas/año) se citan sin
atribución externa (el post mismo las presenta directo). Las cifras del
caso Marino HVAC ($50, 88, $4,400, 36 horas, <2 meses) llevan su
atribución COMPLETA en el MISMO frame donde aparecen ("Estimación de
AetherLogik a partir de los datos del cliente", preservando el footnote
exacto del post — ver `LosNumerosDeMarinoHVAC.tsx` escena `stat_reveal`).
Cero datos del cliente más allá de lo que el post ya hace público.

## Música — movida, BPM declarado (directriz dura de la misión)

| Reel | BPM declarado | Mood |
|---|---|---|
| 1 | 130 | tenso-pero-esperanzador, four-on-the-floor |
| 2 | 124 | procedural, confiado |
| 3 | 122 | cálido pero con drive (el más bajo del rango exigido, deliberado) |
| 4 | 134 | confiado y energético para el cierre |

Los 4 dentro de la banda 120-140 exigida. **BPM no verificado por
autocorrelación en esta sesión** (esa verificación es post-render, sobre
el audio ya mezclado/mux — la hace `video-producer` en el verify final,
mismo método que las 4 series anteriores).

## Manifiesto de assets generados (fal.ai) — URLs temporales, expiran ~24h

> [!danger] `video-producer` NO archiva a R2 (P-07) — instrucción explícita para devops
> Las URLs de abajo son `fal.media`, temporales (~24h). Antes de renderizar, **devops-aetherlogik-homelab** debe: (1) descargar cada asset, (2) verificar bytes contra el tamaño reportado abajo, (3) subir a R2 bajo `agency/reels-hvac-serie/assets/<nombre>`, (4) actualizar el `src` correspondiente en cada `props/*.json` a la URL de R2 resultante — **NUNCA** dejar un render final apuntando a una URL `fal.media` (se cae en 24h). El SFX whoosh y el logo YA están en R2 (reusados, sin archivar).

| Asset | Modelo | Tamaño reportado | URL (temporal) | Destino R2 sugerido |
|---|---|---|---|---|
| Still reel 1 (hero, 2K JPEG) | `fal-ai/nano-banana-pro` | tamaño no informado por el API (verificar al descargar) | `https://v3b.fal.media/files/b/0aa73b6c/wq3NlKzIYpc88DaYe8GJD_BTArxlzS.jpg` | `agency/reels-hvac-serie/assets/lo-que-te-cuesta-facturar-a-mano-still.jpg` |
| Hero i2v reel 1 | `fal-ai/kling-video/o1/image-to-video` (5s) | 5,962,556 bytes | `https://v3b.fal.media/files/b/0aa73b76/S7q9txG44503-E5rmwoH1_output.mp4` | `agency/reels-hvac-serie/assets/lo-que-te-cuesta-facturar-a-mano-hero-i2v.mp4` |
| Música reel 1 (130 BPM, 30.5s) | `fal-ai/elevenlabs/music` | 488,221 bytes | `https://v3b.fal.media/files/b/0aa73b82/DByStDIeqB1ihQCAmh0so_music_generated.mp3` | `agency/reels-hvac-serie/assets/lo-que-te-cuesta-facturar-a-mano-musica.mp3` |
| Música reel 2 (124 BPM, 46.5s) | `fal-ai/elevenlabs/music` | 744,430 bytes | `https://v3b.fal.media/files/b/0aa73b6e/zpGplxQj84Qx-2JLCb4U4_music_generated.mp3` | `agency/reels-hvac-serie/assets/como-funciona-la-automatizacion-de-facturacion-musica.mp3` |
| SFX ding (reel 2, checklist) | `fal-ai/elevenlabs/sound-effects/v2` | 10,493 bytes | `https://v3b.fal.media/files/b/0aa73b84/fBlv6S4NmB4YU0jtMPGWN_sound_effect.mp3` | `agency/reels-hvac-serie/assets/sfx-ding-checklist.mp3` |
| Still reel 3 (hero, 2K JPEG) | `fal-ai/nano-banana-pro` | tamaño no informado por el API (verificar al descargar) | `https://v3b.fal.media/files/b/0aa73b6d/7GyLI72S5IdwSZxacQ6U4_JmT7ebfk.jpg` | `agency/reels-hvac-serie/assets/los-numeros-de-marino-hvac-still.jpg` |
| Hero i2v reel 3 | `fal-ai/kling-video/o1/image-to-video` (5s) | 7,684,846 bytes | `https://v3b.fal.media/files/b/0aa73b76/iX1uGwnkP23fiDK9gyfeC_output.mp4` | `agency/reels-hvac-serie/assets/los-numeros-de-marino-hvac-hero-i2v.mp4` |
| Música reel 3 (122 BPM, 45.5s) | `fal-ai/elevenlabs/music` | 728,129 bytes | `https://v3b.fal.media/files/b/0aa73b6e/duwFo5oi5czg-TN8_aQNL_music_generated.mp3` | `agency/reels-hvac-serie/assets/los-numeros-de-marino-hvac-musica.mp3` |
| SFX chime (reel 3, stat/outcome) | `fal-ai/elevenlabs/sound-effects/v2` | 13,836 bytes | `https://v3b.fal.media/files/b/0aa73b84/rftRNRdToZBKz2xLwHPhf_sound_effect.mp3` | `agency/reels-hvac-serie/assets/sfx-chime-stat.mp3` |
| Música reel 4 (134 BPM, 45.5s) | `fal-ai/elevenlabs/music` | 728,129 bytes | `https://v3b.fal.media/files/b/0aa73b6e/rcFdS7eRSjEjMjrCknVpn_music_generated.mp3` | `agency/reels-hvac-serie/assets/lo-que-necesitas-para-automatizar-musica.mp3` |

**Reusados (ya en R2, sin costo, sin archivar de nuevo):**
- Logo: `https://media.aetherlogik.com/aetherlogik/brand/logo-ember-hires.webp`
- SFX whoosh (reels 1 y 4): `https://media.aetherlogik.com/agency/reels-clinicas-serie/shared/sfx-whoosh.mp3`

**Generado pero NO usado** (disclosure honesto — verificar realidad, no ocultar sunk cost): un SFX whoosh propio se generó al inicio de la sesión (`https://v3b.fal.media/files/b/0aa73b70/8XAkw3-ERApFb6NsmebHb_sound_effect.mp3`, $0.001) antes de decidir reusar el whoosh compartido de `reels-clinicas-serie` por consistencia con las 4 series anteriores. No requiere archivado — descártese.

## Costo total — dentro del techo de ~$25

| Reel | Costo generativo |
|---|---|
| 1 | ~$1.015 (still $0.15 + i2v $0.56 + música $0.305) |
| 2 | ~$0.466 (música $0.465 + sfx ding $0.0012) |
| 3 | ~$1.167 (still $0.15 + i2v $0.56 + música $0.455 + sfx chime $0.0016) |
| 4 | ~$0.455 (música $0.455) |
| SFX whoosh no usado | ~$0.001 |
| **Total** | **~$3.10** |

## Comando canónico — GATE DE ENTRADA (devops corre ESTO primero, antes de cualquier render)

```bash
python scripts/ssh_helper.py --host pve1 "pct start 128"
python scripts/ssh_helper.py --host pve1 "pct exec 128 -- bash -c 'cd /opt/openmontage/remotion-composer && npx remotion compositions src/index.ts'"
```

Confirmar que las 4 IDs nuevas aparecen en la lista: `LoQueTeCuestaFacturarAMano`,
`ComoFuncionaLaAutomatizacionDeFacturacion`, `LosNumerosDeMarinoHVAC`,
`LoQueNecesitasParaAutomatizar`. Si alguna falta, es un defecto de wireado
en `Root.tsx` (P-12) — NO continuar al render hasta corregirlo.

## HyperFrames — reel 2 (checklist `facturacion-automatica-checklist`)

Composición en `hyperframes-compositions/facturacion-automatica-checklist/index.html`
(viewport 1080×1920, 20.0s @24fps, 100% CSS sin GSAP → `data-no-timeline`
presente, contrato completo de 6 atributos declarado — ver
`ComoFuncionaLaAutomatizacionDeFacturacion.decision_log.json` d-004).

```bash
python scripts/ssh_helper.py --host pve1 "pct exec 128 -- bash -c 'cd /opt/openmontage/hyperframes-compositions/facturacion-automatica-checklist && hf lint . && hf render -c index.html -o out.mp4'"
```

`hf lint .` debe dar **0/0** (re-correr la herramienta, no contar
atributos agregados — P-10). El MP4 resultante (20.0s exacto, 1080×1920)
es el `facturacionAutomaticaSrc` de `props/como-funciona-la-automatizacion-de-facturacion.json`
(hoy con el placeholder `__PENDIENTE_RENDER_HYPERFRAMES_POR_DEVOPS__` —
reemplazar por la URL de R2 una vez renderizado y archivado).

## Comandos de render por reel (Remotion, tras el gate de entrada)

```bash
# Reel 1 — master ProRes + entregable H.264
npx remotion render src/index.ts LoQueTeCuestaFacturarAMano out/lo-que-te-cuesta-facturar-a-mano-master.mov \
  --props=./props/lo-que-te-cuesta-facturar-a-mano.json --codec=prores --prores-profile=hq --image-format=png --color-space=bt709

# Reel 2 (requiere facturacionAutomaticaSrc ya archivado, ver arriba)
npx remotion render src/index.ts ComoFuncionaLaAutomatizacionDeFacturacion out/como-funciona-la-automatizacion-de-facturacion-master.mov \
  --props=./props/como-funciona-la-automatizacion-de-facturacion.json --codec=prores --prores-profile=hq --image-format=png --color-space=bt709

# Reel 3
npx remotion render src/index.ts LosNumerosDeMarinoHVAC out/los-numeros-de-marino-hvac-master.mov \
  --props=./props/los-numeros-de-marino-hvac.json --codec=prores --prores-profile=hq --image-format=png --color-space=bt709

# Reel 4
npx remotion render src/index.ts LoQueNecesitasParaAutomatizar out/lo-que-necesitas-para-automatizar-master.mov \
  --props=./props/lo-que-necesitas-para-automatizar.json --codec=prores --prores-profile=hq --image-format=png --color-space=bt709
```

## Recipe de finishing FFmpeg (idéntica a las 4 series anteriores — `premium-craft-standards.md` §6)

```bash
ffmpeg -i <reel>-master.mov -vf \
"curves=all='0/0.045 0.75/0.78 1/0.96',\
eq=saturation=0.92:contrast=1.06:gamma=1.0,\
unsharp=5:5:0.4:5:5:0.0,\
vignette=angle=PI/5" \
-c:v libx264 -crf 16 -pix_fmt yuv420p -preset slow -x264-params aq-mode=2:aq-strength=1.2 -movflags +faststart <reel>-v1.mp4
```

CRF **16** fijo (no subir): el reel 2 tiene texto fino de UI en el bloque
HyperFrames (P-08 — la banda 16-18 aplica igual de duro por texto fino que
por grano horneado). Loudnorm 2-pasadas a -14 LUFS / -1.0 dBTP sobre el
audio ya mezclado (música + sfx), midiendo `normalization_type` en el JSON
de la pasada 1 (P-02 — un mix con SFX cerca de 0dBFS puede caer a modo
`dynamic` en silencio).

## Verify-gate — pendiente, lo corre `video-producer` sobre el MP4 real

1. `ffprobe` de los 4 MP4 (duración exacta, códec h264, audio real no mudo).
2. LUFS medido POST-HOC (no el que reporta el comando `loudnorm`) + BPM por
   autocorrelación contra los declarados arriba.
3. `coherence_guard` sobre los 2 heroes i2v (reels 1 y 3, escena única —
   PASS esperado por diseño, sin multi-plano que encadenar).
4. Escaneo de paleta HSV (region+control) en frames clave: cero
   cian/violeta/lavanda.
5. Recorte+zoom 4x de la banda de texto de CADA `brand_close` (P-13 —
   confirmar que el CTA de 2 líneas queda centrado con margen simétrico,
   no pegado al borde; el fix ya vive en `BrandClose.tsx` desde
   `reels-inmobiliarios-serie` HEAD, heredado por esta rama).
6. Verificación de la atribución en el mismo frame de `stat_reveal` del
   reel 3 (no solo que el copy exista — que se lea junto a la cifra en el
   MP4 real).

## Handoffs pendientes

- **devops-aetherlogik-homelab**: (1) gate `npx remotion compositions`,
  (2) archivar los 9 assets del manifiesto a R2 + actualizar los 4
  `props/*.json` con las URLs de R2, (3) `hf lint . && hf render` del
  bloque HyperFrames del reel 2, (4) render Remotion de los 4 reels
  (master ProRes → finishing FFmpeg CRF 16 → subida a R2 `agency/reels-hvac-serie/`).
- **video-producer (siguiente pase)**: verify-gate completo sobre los 4
  MP4 reales (ver arriba), gates.json de cada reel actualizado con
  `post_render_verify`, veredicto GO/NO-GO final de la serie.
- **skill-curator**: ninguna deuda nueva detectada en esta sesión más allá
  de las ya registradas (P-01 a P-13); el checklist HyperFrames de este
  reel es el primer caso de la línea `reels-del-blog` con un bloque de 5
  items con nodos que se "encienden" en secuencia — si algún gotcha nuevo
  aparece al renderizarlo, registrarlo en `Video-problemas.md`.

## 📌 Para memoria

- Primera vez en la línea `reels-del-blog` que un reel de "caso real"
  coexiste con OTRO reel ya existente sobre el MISMO cliente (Marino HVAC)
  pero con un ángulo distinto (`CasoMarinoHVAC` = chatbot/WhatsApp,
  `LosNumerosDeMarinoHVAC` = facturación) — se resolvió con un nombre de
  composición deliberadamente distinto en vez de reusar/editar el
  existente, documentado en el decision_log del reel 3.
- El bloque HyperFrames de este reel (`facturacion-automatica-checklist`)
  declaró el contrato COMPLETO de 6 atributos + `data-no-timeline` desde
  el primer intento (no en 2 pasadas como P-10), aplicando la lección de
  esa entrada del registro de problemas directamente en la autoría.
