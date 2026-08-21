# Serie "reels-ia-miami-serie" — handoff de PRE-PRODUCCION (2026-08-21)

> [!warning] Estado: pre-produccion COMPLETA, render PENDIENTE
> Los 4 reels tienen composicion + assets generativos + gates pre-render
> + versionado al fork. NINGUNO se ha renderizado todavia — eso lo corre
> `devops-aetherlogik-homelab` (video-producer NO opera el CT 128). Este
> README es el manifiesto de pre-produccion; se actualizara con la
> tabla de verify final una vez existan los MP4 reales, siguiendo el
> mismo formato que las 5 series anteriores de la linea `reels-del-blog`.

Sexta serie de la linea `reels-del-blog`. Fuente del blog:
`ia-para-negocios-miami.md` (D:\aetherlogik-astro) — el post PARAGUAS
/generalista de todos los verticales (no tiene pagina de vertical propia
como `/para-hvac` o `/para-clinicas`). Rama `aetherlogik/reels-ia-miami-serie`,
partida de `aetherlogik/reels-hvac-serie` HEAD (`81d2f84`).

## Los 4 reels de la serie

| # | Reel (slug) | Rol | Duracion | Runtime | Hero i2v |
|---|---|---|---|---|---|
| 1 | `la-diferencia-que-importa` | Gancho | 30.0s (720f @24fps) | Remotion atelier | Si (1) |
| 2 | `los-cinco-trabajos-de-la-ia` | Didactico | 37.0s (888f @24fps) | Hibrido Remotion + HyperFrames | No |
| 3 | `tres-negocios-tres-resultados` | Casos reales | 45.0s (1080f @24fps) | Remotion atelier | Si (1) |
| 4 | `cinco-senales-de-que-estas-listo` | Cierre, CTA real | 45.0s (1080f @24fps) | Remotion atelier | No |

Total: 157.0s (~2.6 min) para la serie completa. Formula: gancho + 2
didacticos/casos + cierre con CTA real, igual que las 5 series
anteriores. Cada reel tiene su `.tsx` + `.scene_plan.json` + `.script.md`
+ `.art-direction.md` + `.decision_log.json` + `.gates.json` en
`remotion-composer/src/reels/`.

## Los 3 ejes por reel (decididos en cada `decision_log.json`)

| Reel | `renderer_family` | `render_runtime` | `composition_mode` |
|---|---|---|---|
| 1 (gancho) | animation | remotion | atelier |
| 2 (didactico) | hybrid | hyperframes (bloque central) + remotion (resto) | atelier |
| 3 (casos reales) | animation | remotion | atelier |
| 4 (cierre) | animation | remotion | atelier |

## GATE — antes de renderizar: `npx remotion compositions`

> [!danger] Una composicion NO esta "lista" solo porque el `.tsx` compila (P-12)
> Los 4 `.tsx` estan escritos y las 4 `<Composition>` fueron agregadas a
> `Root.tsx` en esta sesion (import + bloque `<Composition id="...">`),
> pero **video-producer no tiene checkout local de Node/el fork en esta
> sesion** — NO se corrio `npx remotion compositions` para confirmar que
> el renderer las LISTA. **Es el primer paso de devops antes de cualquier
> render**:
> ```bash
> cd /opt/openmontage/remotion-composer  # o el checkout del fork en el CT 128
> npx remotion compositions src/index.tsx
> ```
> Debe listar `LaDiferenciaQueImporta`, `LosCincoTrabajosDeLaIa`,
> `TresNegociosTresResultados`, `CincoSenalesDeQueEstasListo`. Si alguna
> falta o el comando falla, es un `tsc`/import roto — arreglar ANTES de
> intentar renderizar (no es un problema de props).

## Manifiesto de assets generados (fal.ai, presupuesto real ≤$25)

Costo total real de generacion: **~$3.055** (ver desglose en cada
`.gates.json`, campo `assets_generated`). Muy por debajo del presupuesto
de $25 de la mision.

| Asset | Reel | Modelo | Costo | URL fal.media (TEMPORAL, expira ~24h desde 2026-08-21) | Destino R2 (P-16, slug completo) |
|---|---|---|---|---|---|
| Still hero 1 | 1 | nano-banana-pro 2K jpeg | $0.15 | `https://v3b.fal.media/files/b/0aa73da6/8Qf7JBP4deRLMjYHFgUkE_RprLDxxp.jpg` | (solo insumo del i2v, no se archiva aparte) |
| Hero i2v 1 | 1 | kling-video/o1/image-to-video, 5s | $0.56 | `https://v3b.fal.media/files/b/0aa73db2/mojEW5UCVmNHVDZh5A1U9_output.mp4` | `agency/reels-ia-miami-serie/assets/la-diferencia-que-importa-hero-i2v.mp4` |
| Musica reel 1 | 1 | elevenlabs/music, 128 BPM, 30.5s | $0.305 | `https://v3b.fal.media/files/b/0aa73da7/SXCXeBhqCa-_pWbRgZ6G2_music_generated.mp3` | `agency/reels-ia-miami-serie/assets/la-diferencia-que-importa-musica.mp3` |
| Musica reel 2 | 2 | elevenlabs/music, 130 BPM, 37.5s | $0.375 | `https://v3b.fal.media/files/b/0aa73dbc/oSiEhnT5kKWrN74_Pb8SM_music_generated.mp3` | `agency/reels-ia-miami-serie/assets/los-cinco-trabajos-de-la-ia-musica.mp3` |
| Still hero 3 | 3 | nano-banana-pro 2K jpeg | $0.15 | `https://v3b.fal.media/files/b/0aa73da6/9g4cvvgCCnrsV8VMPG61a_Xz9gSmxS.jpg` | (solo insumo del i2v, no se archiva aparte) |
| Hero i2v 3 | 3 | kling-video/o1/image-to-video, 5s | $0.56 | `https://v3b.fal.media/files/b/0aa73db3/w_xXR63SYz6_zdL3OQfre_output.mp4` | `agency/reels-ia-miami-serie/assets/tres-negocios-tres-resultados-hero-i2v.mp4` |
| Musica reel 3 | 3 | elevenlabs/music, 126 BPM, 45.5s | $0.455 | `https://v3b.fal.media/files/b/0aa73dbc/eMiEL1yVqzVOMbupWmxKX_music_generated.mp3` | `agency/reels-ia-miami-serie/assets/tres-negocios-tres-resultados-musica.mp3` |
| Musica reel 4 | 4 | elevenlabs/music, 132 BPM, 45.5s | $0.455 | `https://v3b.fal.media/files/b/0aa73da8/rXKybvREZzCjhEjD13GqX_music_generated.mp3` | `agency/reels-ia-miami-serie/assets/cinco-senales-de-que-estas-listo-musica.mp3` |

Ademas, el reel 2 necesita un render **separado** de HyperFrames antes
del render Remotion (ver seccion siguiente).

### SFX reusados (costo $0 — assets ya existentes en R2 de series anteriores)

| SFX | Reels | URL reusada |
|---|---|---|
| whoosh | 1, 4 | `https://media.aetherlogik.com/agency/reels-clinicas-serie/shared/sfx-whoosh.mp3` |
| chip/ding checklist | 2 | `https://media.aetherlogik.com/agency/reels-hvac-serie/assets/sfx-ding-checklist.mp3` |
| chime stat | 3 | `https://media.aetherlogik.com/agency/reels-hvac-serie/assets/sfx-chime-stat.mp3` |

### Logo (compartido, ya en R2)
`https://media.aetherlogik.com/aetherlogik/brand/logo-ember-hires.webp`
(el isotipo real — no se genera con IA).

> [!danger] P-07 — video-producer NO archiva a R2 (no tiene la credencial)
> Las URLs de fal.media de la tabla arriba son TEMPORALES (expiran
> ~24h). **Instruccion exacta para devops-aetherlogik-homelab**: antes de
> renderizar cada reel, descargar cada asset generativo (still ya no
> hace falta, solo el i2v y la musica) y subirlo a R2 en la ruta "Destino
> R2" de la tabla — nombrado por **slug completo** (P-16), nunca
> posicional (nunca `v1.mp4`/`musica.mp3` a secas). Luego actualizar el
> campo correspondiente en `remotion-composer/props/<slug>.json` (cada
> props JSON ya trae un campo `_devops_note` con la ruta exacta
> esperada) con la URL de `media.aetherlogik.com` antes de correr el
> render — nunca dejar el render corriendo contra una URL de fal.media
> que puede expirar a mitad de la corrida.

## Render de HyperFrames (reel 2 — PRIMER paso, antes del render Remotion)

Composicion: `hyperframes-compositions/los-cinco-trabajos-de-la-ia-checklist/`
(HTML/CSS puro, `data-no-timeline`, 1080x1920, 20.0s @24fps). Comando
canonico (skill `aetherlogik-hyperframes`, lo ejecuta SOLO devops):

```bash
python scripts/ssh_helper.py --host pve1 "pct start 128"
python scripts/ssh_helper.py --host pve1 "pct exec 128 -- bash -c 'cd /ruta/al/fork/hyperframes-compositions/los-cinco-trabajos-de-la-ia-checklist && hf lint . && hf render -c index.html -o los-cinco-trabajos-de-la-ia-checklist.mp4'"
```

Tras el render: `hf lint .` debe dar **0/0** (no basta con contar los
errores nombrados en un mensaje anterior — P-10 de la skill
`aetherlogik-hyperframes`), y el MP4 resultante se archiva a
`agency/reels-ia-miami-serie/assets/los-cinco-trabajos-de-la-ia-checklist.mp4`
y se wirea en `remotion-composer/props/los-cinco-trabajos-de-la-ia.json`
(campo `fiveJobsChecklistSrc`, hoy vacio a proposito).

## Comandos de render Remotion (uno por reel, tras el gate `compositions` y los assets archivados)

```bash
cd /opt/openmontage/remotion-composer  # o el checkout del fork en el CT 128

npx remotion render src/index.tsx LaDiferenciaQueImporta out/la-diferencia-que-importa.mp4 \
  --props=props/la-diferencia-que-importa.json

npx remotion render src/index.tsx LosCincoTrabajosDeLaIa out/los-cinco-trabajos-de-la-ia.mp4 \
  --props=props/los-cinco-trabajos-de-la-ia.json

npx remotion render src/index.tsx TresNegociosTresResultados out/tres-negocios-tres-resultados.mp4 \
  --props=props/tres-negocios-tres-resultados.json

npx remotion render src/index.tsx CincoSenalesDeQueEstasListo out/cinco-senales-de-que-estas-listo.mp4 \
  --props=props/cinco-senales-de-que-estas-listo.json
```

> [!warning] P-16 — nombra los intermediarios por SLUG COMPLETO, nunca posicional
> El directorio `out/` de render se comparte entre series en el CT 128 —
> nombrar por `reel1.mp4`/`reel2.mp4` puede colisionar o confundirse con
> los intermediarios de OTRA serie corriendo el mismo dia. Usa siempre el
> slug completo del reel (`la-diferencia-que-importa.mp4`, no `v1.mp4`
> ni `reel1.mp4`) en cada archivo intermedio y master, tal como hacen los
> comandos de arriba.

## Finishing FFmpeg — recipe con TP=-2.0 DESDE EL PRIMER PASE (P-15)

> [!danger] No repitas el ciclo de fix de la serie HVAC — hornea TP=-2.0 desde el inicio
> En `reels-hvac-serie`, el reel 3 salio con `true peak` positivo
> (clipping real post-AAC) usando el target -1.0dBTP, y hubo que hacer
> una SEGUNDA pasada de re-mux con `TP=-2.0` para corregirlo (ver
> `ReelsHvacSerie.README.md`, hallazgo P-15). **Para esta serie, el
> brief de finishing pide `TP=-2.0` desde la PRIMERA pasada** — no
> `-1.0` — porque el overshoot de inter-sample peaks del encoder AAC se
> come el margen de headroom cuando el target es -1.0.

Para cada reel, tras el render Remotion:

```bash
# Pasada 1 de loudnorm (mide) sobre el audio del render crudo
ffmpeg -i out/<slug>.mp4 -af loudnorm=I=-14:TP=-2.0:LRA=11:print_format=json -f null -

# Pasada 2 de loudnorm (aplica, con los valores medidos de la pasada 1) +
# finishing de-plastic: curva filmica + saturacion 0.92 + micro-sharpen +
# grano temporal + halation sutil + vinieta (los componentes FilmGrade ya
# aplican grano/vinieta en Remotion; el finishing FFmpeg añade la curva
# de color + loudnorm + encode final)
ffmpeg -i out/<slug>.mp4 \
  -af loudnorm=I=-14:TP=-2.0:LRA=11:measured_I=<I_medido>:measured_TP=<TP_medido>:measured_LRA=<LRA_medido>:measured_thresh=<thresh_medido>:linear=true \
  -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a aac -b:a 256k \
  out/<slug>-v1.mp4

# Verificacion de raiz: confirma que el true peak resultante es NEGATIVO
ffmpeg -i out/<slug>-v1.mp4 -af loudnorm=I=-14:TP=-2.0:print_format=json -f null - 2>&1 | grep -E "input_i|input_tp"
```

Target final: **-14 LUFS integrado / -2.0 dBTP true peak** (no -1.0).
Sube a R2 como `agency/reels-ia-miami-serie/<slug>-v1.mp4` — nombre por
slug completo (P-16), nunca `out.mp4`/`final.mp4`.

## Verify (video-producer, tras el handoff de devops)

Pendiente hasta que existan los 4 MP4 reales en R2. Cuando devops
confirme el render + finishing + subida, video-producer:
1. Descarga cada MP4 de R2 y corre `ffprobe` (duracion/resolucion/codec
   h264/stream de audio real, LUFS/TP con `volumedetect`+`loudnorm`
   medido independientemente).
2. Extrae frames clave y los mira — ember-only, boxless, tipografia,
   cierre, y en el reel 3 el `beat_pixel_check` de las 3 atribuciones
   (confirmar que cifra + label + atribucion estan en el MISMO frame,
   en pixeles reales).
3. Corre `coherence_guard` sobre los 2 reels con i2v (1 y 3) y
   `brand_palette_guard` sobre los 4.
4. Confirma que el CTA final del reel 4 (`cal.com/aetherlogik/discovery`)
   es legible, con margenes simetricos verificados por recorte+ampliacion
   3-4× (doctrina de la skill, texto libre nunca se da por bueno a
   resolucion de frame completo).
5. Actualiza este README con la tabla de verify final (mismo formato que
   `ReelsHvacSerie.README.md`) y el veredicto GO/NO-GO de la serie.

## Handoffs pendientes

- **devops-aetherlogik-homelab**: (1) `npx remotion compositions` —
  confirmar que los 4 reels aparecen listados; (2) `hf lint . && hf
  render` sobre la composicion HyperFrames del reel 2; (3) archivar los
  8 assets generativos (i2v ×2, musica ×4, still ×0 — los stills no se
  archivan aparte, solo son insumo del i2v) a R2 por slug completo
  (P-16) y actualizar los 4 `props/*.json`; (4) render Remotion de los 4
  reels; (5) finishing FFmpeg con `TP=-2.0` desde el primer pase (P-15,
  ver recipe arriba); (6) subida a R2.
- **video-producer**: verify independiente de los 4 MP4 una vez
  publicados (ver seccion Verify arriba) → actualizar este README con el
  veredicto final.

## 📌 Para memoria (nuevo en esta serie)

- Primer post de la linea `reels-del-blog` que es GENERALISTA/paraguas
  (no tiene vertical propia) y que documenta MAS DE UN caso real en la
  misma seccion (3 casos, no 1) — de ahi el reel 3 con 3 StatReveal en
  vez del patron de 1-caso-por-reel de las 5 series anteriores.
- Primera vez que el brief de finishing pide `TP=-2.0` DESDE LA PRIMERA
  PASADA (P-15 ya curada de la serie HVAC), en vez de descubrirlo como
  fix en el verify — si esto se confirma en el verify real, es evidencia
  de que la curaduria de P-15 esta funcionando (previene el defecto en
  vez de solo corregirlo despues).
- Reutilizacion cruzada de SFX entre 3 series distintas
  (reels-clinicas-serie, reels-hvac-serie) confirma que los assets de
  sonido cortos (whoosh/chime/chip) son reusables sin re-generar —
  ahorro real de presupuesto ($0 de los ~$3.06 gastados en esta serie).
