# Serie "reels-ia-miami-serie" — render COMPLETO por devops, verify final PENDIENTE de video-producer (2026-08-21)

> [!success] Estado: los 4 reels renderizados, finalizados y en R2 — falta el verify independiente del director
> `devops-aetherlogik-homelab` archivó los 6 assets generativos + el
> bloque HyperFrames del reel 2, renderizó los 4 masters ProRes, aplicó
> el finishing (`TP=-2.0` desde el primer pase, P-15) y subió los 4
> entregables a R2. Todos pasaron el verify técnico de devops (ffprobe +
> LUFS/TP post-hoc medidos independientemente del reporte de `loudnorm`
> + spot-check visual de frames). Falta el `final_review` completo del
> director (`video-producer`) antes del sign-off GO/NO-GO oficial — ver
> sección "Devops — render completado" abajo y la sección "Verify"
> original más adelante para lo que sigue pendiente.

Sexta serie de la linea `reels-del-blog`. Fuente del blog:
`ia-para-negocios-miami.md` (D:\aetherlogik-astro) — el post PARAGUAS
/generalista de todos los verticales (no tiene pagina de vertical propia
como `/para-hvac` o `/para-clinicas`). Rama `aetherlogik/reels-ia-miami-serie`,
partida de `aetherlogik/reels-hvac-serie` HEAD (`81d2f84`).

## Devops — render completado (4/4) — 2026-08-21

**Los 4 entregables en R2** (`curl` público 200 en los 4, verificado):

| # | Reel | Objeto R2 | Duración ffprobe | LUFS post-hoc | True Peak post-hoc |
|---|---|---|---|---|---|
| 1 | `la-diferencia-que-importa` | `agency/reels-ia-miami-serie/la-diferencia-que-importa-v1.mp4` | 30.000000s | -14.06 | -1.96 dBTP |
| 2 | `los-cinco-trabajos-de-la-ia` | `agency/reels-ia-miami-serie/los-cinco-trabajos-de-la-ia-v1.mp4` | 37.000000s | -13.96 | -1.91 dBTP |
| 3 | `tres-negocios-tres-resultados` | `agency/reels-ia-miami-serie/tres-negocios-tres-resultados-v1.mp4` | 45.000000s | -14.00 | -1.77 dBTP |
| 4 | `cinco-senales-de-que-estas-listo` | `agency/reels-ia-miami-serie/cinco-senales-de-que-estas-listo-v1.mp4` | 45.000000s | -13.93 | -1.94 dBTP |

Los 4 dentro de banda -14±0.5 LUFS y los 4 con true peak ≤ -1.0 dBTP
(criterio de la misión) — el `TP=-2.0` horneado desde el primer pase
(P-15) evitó el ciclo de re-mux que hizo falta en `reels-hvac-serie`.
Video `h264 1080x1920 24fps` los 4, audio AAC 256k/48kHz.

**Assets archivados a R2** (6 generativos + 1 bloque HyperFrames, todos
`curl` público 200, tamaño real == tamaño descargado):
`agency/reels-ia-miami-serie/assets/la-diferencia-que-importa-hero-i2v.mp4`,
`.../la-diferencia-que-importa-musica.mp3`,
`.../los-cinco-trabajos-de-la-ia-musica.mp3`,
`.../tres-negocios-tres-resultados-hero-i2v.mp4`,
`.../tres-negocios-tres-resultados-musica.mp3`,
`.../cinco-senales-de-que-estas-listo-musica.mp3`,
`.../los-cinco-trabajos-de-la-ia-checklist.mp4` (render HyperFrames,
`hf lint` 0/0, 20.0s/24fps/h264, "artifact validated" en 31.4s — sin el
impuesto de 45s, confirma `data-no-timeline` correcto desde la autoría).

**Gate `npx remotion compositions src/index.tsx`**: los 4 compositions
listados con fps/resolución/duración exactos (`LaDiferenciaQueImporta`
720f, `LosCincoTrabajosDeLaIa` 888f, `TresNegociosTresResultados` 1080f,
`CincoSenalesDeQueEstasListo` 1080f, todos 24fps 1080x1920) — `Root.tsx`
venía correctamente wireado, sin intervención necesaria. `npm install`
(up to date) + `npx tsc --noEmit` → 0 errores.

**Finishing** (recipe premium-craft-standards.md §6, no la del ejemplo
simplificado más abajo en este README): master ProRes HQ (`--codec=prores
--prores-profile=hq --image-format=png --color-space=bt709`) →
`curves=all='0/0.045 0.75/0.78 1/0.96'` (SIN el punto intermedio
0.25/0.22 que crushea texto de UI) + `eq=saturation=0.92:contrast=1.06:
gamma=1.0` + `unsharp=5:5:0.4:5:5:0.0` + `vignette=angle=PI/5` →
`libx264 -crf 16 -preset slow -x264-params aq-mode=2:aq-strength=1.2`
(sin `noise` de FFmpeg — el grano ya está horneado en Remotion vía
`FilmGrade.tsx`). Audio: `acompressor` pre-loudnorm (bus compression)
→ `loudnorm` dinámico calibrado por mix (los 4 mixes cayeron en
`normalization_type=dynamic` — SFX cerca de 0dBTP en los masters
crudos, gotcha conocido; se midió el offset real de cada mix con una
pasada de prueba y se ajustó el `I` objetivo por reel, -15.10/-14.66/
-14.47/-14.71, hasta converger output_i dentro de ±0.1 de -14 antes del
encode final — nunca se asumió el mismo offset entre reels).

**Spot-check visual** (frames extraídos y vistos, no solo medidos):
paleta ember/near-black limpia en los 4, cero cian/violeta/glow;
`brand_close` centrado con márgenes simétricos en los 4; reel 2
(híbrido HyperFrames+Remotion) compone limpio, checklist legible pese a
CRF16; reel 3 confirma los 3 casos con cifra+label+atribución en el
MISMO frame (DMP Consulting $36,000/año, Marino HVAC $4,400/mes, quote
de Mayli Parra); reel 4 CTA final `cal.com/aetherlogik/discovery`
verificado legible a 3.5× de zoom (recorte+ampliación, doctrina de la
skill), márgenes simétricos.

**Cierre**: masters ProRes conservados en `out/` del CT 128 (no se
borró nada); credenciales R2 (`rclone.conf`, `r2-src.env`) removidas y
verificadas por efecto (`rclone listremotes` → config not found, `ls` →
No such file or directory en ambos); CT 128 devuelto a `stopped`.
Bitácora completa: `Server-pve1-bitacora-2026-08-21-openmontage-render-reels-ia-miami-serie.md`
(bóveda Obsidian).

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

## GATE — antes de renderizar: `npx remotion compositions` — PASADO (ver sección devops arriba)

## Manifiesto de assets generados (fal.ai, presupuesto real ≤$25) — ARCHIVADOS (ver sección devops arriba)

Costo total real de generacion: **~$3.055** (ver desglose en cada
`.gates.json`, campo `assets_generated`). Muy por debajo del presupuesto
de $25 de la mision.

| Asset | Reel | Modelo | Costo | Destino R2 (P-16, slug completo) |
|---|---|---|---|---|
| Still hero 1 | 1 | nano-banana-pro 2K jpeg | $0.15 | (solo insumo del i2v, no se archiva aparte) |
| Hero i2v 1 | 1 | kling-video/o1/image-to-video, 5s | $0.56 | `agency/reels-ia-miami-serie/assets/la-diferencia-que-importa-hero-i2v.mp4` |
| Musica reel 1 | 1 | elevenlabs/music, 128 BPM, 30.5s | $0.305 | `agency/reels-ia-miami-serie/assets/la-diferencia-que-importa-musica.mp3` |
| Musica reel 2 | 2 | elevenlabs/music, 130 BPM, 37.5s | $0.375 | `agency/reels-ia-miami-serie/assets/los-cinco-trabajos-de-la-ia-musica.mp3` |
| Still hero 3 | 3 | nano-banana-pro 2K jpeg | $0.15 | (solo insumo del i2v, no se archiva aparte) |
| Hero i2v 3 | 3 | kling-video/o1/image-to-video, 5s | $0.56 | `agency/reels-ia-miami-serie/assets/tres-negocios-tres-resultados-hero-i2v.mp4` |
| Musica reel 3 | 3 | elevenlabs/music, 126 BPM, 45.5s | $0.455 | `agency/reels-ia-miami-serie/assets/tres-negocios-tres-resultados-musica.mp3` |
| Musica reel 4 | 4 | elevenlabs/music, 132 BPM, 45.5s | $0.455 | `agency/reels-ia-miami-serie/assets/cinco-senales-de-que-estas-listo-musica.mp3` |

Las URLs de fal.media originales (temporales, expiraban ~24h desde
2026-08-21) ya no aplican — reemplazadas por las URLs de R2 arriba en
los 4 `props/*.json`.

### SFX reusados (costo $0 — assets ya existentes en R2 de series anteriores)

| SFX | Reels | URL reusada |
|---|---|---|
| whoosh | 1, 4 | `https://media.aetherlogik.com/agency/reels-clinicas-serie/shared/sfx-whoosh.mp3` |
| chip/ding checklist | 2 | `https://media.aetherlogik.com/agency/reels-hvac-serie/assets/sfx-ding-checklist.mp3` |
| chime stat | 3 | `https://media.aetherlogik.com/agency/reels-hvac-serie/assets/sfx-chime-stat.mp3` |

### Logo (compartido, ya en R2)
`https://media.aetherlogik.com/aetherlogik/brand/logo-ember-hires.webp`
(el isotipo real — no se genera con IA).

## Render de HyperFrames (reel 2) — COMPLETO (ver sección devops arriba)

Composicion: `hyperframes-compositions/los-cinco-trabajos-de-la-ia-checklist/`
(HTML/CSS puro, `data-no-timeline`, 1080x1920, 20.0s @24fps).
`fiveJobsChecklistSrc` ya wireado en
`remotion-composer/props/los-cinco-trabajos-de-la-ia.json` con la URL de
R2.

## Finishing FFmpeg — recipe con TP=-2.0 DESDE EL PRIMER PASE (P-15) — APLICADA (ver sección devops arriba)

Target final: **-14 LUFS integrado / -2.0 dBTP true peak** — confirmado
en los 4 reels sin necesidad de una segunda pasada de re-mux (a
diferencia de `reels-hvac-serie`, que descubrió la necesidad de
`TP=-2.0` como fix reactivo tras el primer verify NO-GO).

## Verify (video-producer, tras el handoff de devops) — PENDIENTE

Los 4 MP4 reales ya están en R2 (ver sección devops arriba). video-producer
debe correr su verify independiente:
1. Descarga cada MP4 de R2 y corre `ffprobe` (duracion/resolucion/codec
   h264/stream de audio real, LUFS/TP con `volumedetect`+`loudnorm`
   medido independientemente — no confiar en la medición de devops).
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

- ~~**devops-aetherlogik-homelab**~~: **COMPLETO** — ver sección "Devops
  — render completado" arriba.
- **video-producer**: verify independiente de los 4 MP4 ya publicados
  (ver sección Verify arriba) → actualizar este README con el veredicto
  final GO/NO-GO.

## 📌 Para memoria (nuevo en esta serie)

- Primer post de la linea `reels-del-blog` que es GENERALISTA/paraguas
  (no tiene vertical propia) y que documenta MAS DE UN caso real en la
  misma seccion (3 casos, no 1) — de ahi el reel 3 con 3 StatReveal en
  vez del patron de 1-caso-por-reel de las 5 series anteriores.
- **Confirmado en producción real: hornear `TP=-2.0` desde el primer
  pase (P-15) evita el ciclo de re-mux reactivo** — los 4 reels de esta
  serie pasaron el verify técnico de devops en un solo pase, a
  diferencia de `reels-hvac-serie` (2 de 4 reels necesitaron un segundo
  re-mux tras el `-1.0` inicial). Evidencia a favor de consolidar
  `TP=-2.0` como default de `premium-craft-standards.md` §5, no solo
  como fix conocido.
- El offset de `loudnorm` en modo `dynamic` (SFX cerca de 0dBTP en el
  master crudo) varió reel a reel (-1.08/-0.66/-0.47/-0.71 LUFS) — se
  recalibró el `I` objetivo por mix con una pasada de prueba antes del
  encode final en los 4 casos, nunca se reusó el offset de un reel
  anterior (misma lección que `premium-craft-standards.md`: "el offset
  empírico de un mix NO se transfiere a otro mix").
- Reutilizacion cruzada de SFX entre 3 series distintas
  (reels-clinicas-serie, reels-hvac-serie) confirma que los assets de
  sonido cortos (whoosh/chime/chip) son reusables sin re-generar —
  ahorro real de presupuesto ($0 de los ~$3.06 gastados en esta serie).
