# Serie "reels-inmobiliarios-serie" — verify final: 2/4 GO, 2/4 NO-GO por defecto real (2026-08-21, root cause ya fijo)

> [!warning] Veredicto de la serie: **NO-GO** — pendiente 1 re-render puntual, no un rehaul
> Los 4 videos fueron renderizados por `devops-aetherlogik-homelab` (HEAD `d7cdcaa`; gate `npx remotion compositions` paso, `tsc` 0, `hf lint` 0/0). El verify final INDEPENDIENTE de `video-producer` (ffprobe propio, LUFS medido propio, BPM medido propio por autocorrelacion, `coherence_guard` formal, escaneo HSV de paleta, y recorte+zoom 4x de cada banda de texto) confirma que **2 de 4 reels pasan limpio** (`veintiun-veces-mas-probable`, `como-empiezas-sin-perder-leads`) y **2 de 4 tienen un defecto REAL de layout** en su escena `brand_close` (`lo-que-ya-puedes-automatizar`, `cuando-entra-el-humano`): el texto del CTA se pega al borde izquierdo del frame sin margen cuando envuelve a 2 lineas. La causa raiz es un bug LATENTE del componente compartido `BrandClose.tsx` (usado por las 4 series), ya arreglado en el fork (commit `706d449`) en esta misma sesion. **Falta un unico paso: que devops re-renderice esos 2 reels** (mismos assets/props, componente ya corregido) y que `video-producer` re-verifique solo la escena `brand_close` de ambos.

Cuarta serie consecutiva de la linea `reels-del-blog`. Fuente del blog:
`ia-para-agentes-inmobiliarios-seguimiento-leads.md` (D:\aetherlogik-astro).

## Los 4 videos — links + veredicto final

| # | Reel | R2 | Duracion | Runtime | Veredicto |
|---|---|---|---|---|---|
| 1 | 21 veces mas probable (gancho) | `agency/reels-inmobiliarios-serie/veintiun-veces-mas-probable-v1.mp4` | 30.0s exacto | Remotion (atelier), 1 hero i2v | **GO** |
| 2 | Lo que ya puedes automatizar | `agency/reels-inmobiliarios-serie/lo-que-ya-puedes-automatizar-v1.mp4` | 46.0s exacto | HIBRIDO Remotion + HyperFrames | **NO-GO** (brand_close, ver abajo) |
| 3 | Cuando entra el humano | `agency/reels-inmobiliarios-serie/cuando-entra-el-humano-v1.mp4` | 45.0s exacto | Remotion (atelier), 1 hero i2v | **NO-GO** (brand_close, ver abajo) |
| 4 | Como empiezas sin perder leads (cierre) | `agency/reels-inmobiliarios-serie/como-empiezas-sin-perder-leads-v1.mp4` | 45.0s exacto | Remotion (atelier) | **GO** |

Todos servidos desde `https://media.aetherlogik.com/<ruta de arriba>`, todos
`curl 200`, descargados y auditados byte-a-byte por `video-producer` de forma
independiente (no solo el reporte de devops).

## El defecto — como se encontro y por que es real

A resolucion de frame completo el CTA de `brand_close` se lee sin problema
(el texto es 100% legible en los 4 reels). El defecto solo aparece al
**recortar y ampliar 4x la banda exacta del texto** — ahi se ve que en los
reels 1 y 4 el CTA queda en 1 linea, centrado, con margen simetrico visible;
en los reels 2 y 3 el CTA (mas largo) envuelve a 2 lineas y AMBAS quedan
pegadas al borde izquierdo del frame, sin margen alguno.

**Causa raiz** (confirmada leyendo `BrandClose.tsx`, no adivinada): el
`<div>` del `tagline` tenia `textAlign:"center"` + `maxWidth:"80%"`; el
`<div>` del `url`, inmediatamente debajo, NO tenia ninguno de los dos. Con
un CTA corto que cabe en 1 linea, el div se encoge a su contenido y el
`alignItems:"center"` del contenedor padre lo centra *por accidente* — pero
en cuanto el texto necesita wrap, el div sin `maxWidth` crece al 100% del
contenedor, pierde ese centrado accidental, y cae al `text-align:left`
default de un div, pegado al borde. **Es un bug del componente compartido,
no de un reel puntual** — muy probablemente afecta CTAs largos ya
renderizados de las 3 series anteriores que nadie verifico con recorte+zoom.

**Fix aplicado** (commit `706d449`, este branch): se agrego
`textAlign:"center"` + `maxWidth:"82%"` al div del `url`, exactamente el
mismo patron que ya tenia `tagline`. Aditivo, no rompe ninguna otra prop ni
reel existente. Registrado como **P-13** en `Video-problemas.md` (con
recomendacion de auditoria retroactiva puntual de las 3 series anteriores).

## Directriz de Ernesto — musica movida, VERIFICADA con evidencia cuantitativa

Los 4 briefs declaran BPM/energia explicitos; el tempo se **midio de forma
independiente** sobre el audio final de cada reel (autocorrelacion propia:
lowpass 200Hz + envelope 20Hz + derivada semi-rectificada, banda de busqueda
80-180 BPM, script numpy/scipy reimplementado en esta sesion, mismo metodo
documentado en las 3 series anteriores):

| Reel | BPM declarado | BPM medido | Delta | Nota |
|---|---|---|---|---|
| 1 | 128 | 127.9 | 0.1 | |
| 2 | 132 | 132.2 | 0.2 | |
| 3 | 124 | 124.0 | 0.0 (exacto) | |
| 4 | 130 | 129.3 | 0.7 | |

Los 4 dentro de la banda 120-140 exigida; deltas comparables o mejores que
las 3 series anteriores.

## LUFS — verificado independiente, coincide EXACTO con el reporte de devops

| Reel | LUFS devops | LUFS medido independiente |
|---|---|---|
| 1 | -13.96 | -13.96 |
| 2 | -14.07 | -14.07 |
| 3 | -14.00 | -14.00 |
| 4 | -14.04 | -14.04 |

Coincidencia exacta a 2 decimales en los 4 (`loudnorm` una pasada de
medicion sobre el archivo final muxeado, `input_i`) — confirma que el audio
es real y el finishing se aplico tal como se declara en los 4.

## Verify visual (region+control + escaneo de paleta sobre pixeles reales)

12 frames extraidos y auditados con `ffprobe`/`ffmpeg` propios (no los de
devops) + escaneo HSV programatico (Python/PIL/numpy) region+control:
**cyan_violet% <0.4% del pixel coloreado en los 12 frames**, sin excepcion.

- **Reel 1:** hero i2v calido/integrado, coherence PASS (1.0s/4.0s); `stat_reveal`
  con "21x" + atribucion COMPLETA ("Segun datos de HBR e InsideSales." +
  subtitulo con la oracion completa) en el MISMO frame; `brand_close` limpio,
  CTA en 1 linea centrada.
- **Reel 2:** bloque HyperFrames (`seguimiento-inmobiliario-delegable`) con
  los 5 items TODOS legibles e integrados sin friccion visual con el
  catalogo Remotion; `brand_close` con el defecto de texto (ver arriba).
- **Reel 3:** hero i2v golden-hour calido, coherence PASS (1.0s/4.0s, push-in
  sutil consistente); `brand_close` con el mismo defecto de texto.
- **Reel 4:** `steps_list` legible (3/4 pasos visibles al spot-check);
  `brand_close` con el **CTA FINAL de conversion** (`/para-real-estate` +
  "agenda tu diagnostico gratuito") en 1 linea, centrado, limpio — el CTA
  que realmente importa para conversion NO tiene el defecto.

## `coherence_guard` — los 2 heroes i2v (reel 1 y reel 3)

Ambos son escena UNICA (sin multi-plano que encadenar). Verificado en 2
frames por hero (1.0s, 4.0s): mismo personaje, mismo espacio, misma paleta,
sin drift. **PASS en los 2.**

## Presupuesto final

Costo real de assets generativos de la serie completa: **~$3.08 USD**
(reel1 $1.01 + reel2 $0.46 + reel3 $1.16 + reel4 $0.45), contra un techo de
~$25 declarado en la mision. El re-render de los reels 2 y 3 no agrega costo
generativo (mismos assets, solo cambia el componente compartido).

## Handoffs pendientes

- **devops-aetherlogik-homelab**: re-renderizar `LoQueYaPuedesAutomatizar` y
  `CuandoEntraElHumano` (branch actual, componente `BrandClose.tsx` ya
  corregido en `706d449`; mismos props/assets, sin cambios de duracion ni de
  contenido) + finishing FFmpeg (misma recipe) + re-subir a R2 sobre el
  MISMO path (`lo-que-ya-puedes-automatizar-v1.mp4`,
  `cuando-entra-el-humano-v1.mp4`).
- **video-producer (siguiente pase, corto)**: re-verificar SOLO la escena
  `brand_close` de esos 2 reels (recorte+zoom del CTA, confirmar margen
  simetrico) y emitir el GO final de la serie.
- **skill-curator**: P-13 en `Video-problemas.md` esta PENDIENTE de
  curaduria — vale la pena que el prevention-propuesta (spot-check con
  recorte+zoom de toda banda de texto libre, no solo lectura a resolucion
  completa) se incorpore a `premium-craft-standards.md`.
- **Ernesto**: nada pendiente de su parte hasta el sign-off tecnico final.

## 📌 Para memoria

- Primera vez en la linea `reels-del-blog` que el verify final de
  `video-producer` encuentra un defecto REAL post-render (las 3 series
  anteriores cerraron GO 4/4 limpio) — y el defecto no era de ESTA serie:
  es un bug LATENTE de un componente COMPARTIDO (`BrandClose.tsx`) que
  probablemente ya esta en produccion en reels de series anteriores con CTA
  largo, sin que nadie lo detectara (el spot-check previo leia el texto a
  resolucion completa, nunca recortaba+ampliaba la banda exacta).
- El hallazgo se hizo por PROCESO, no por suerte: recorte+zoom 4x de la
  banda de texto de las 4 escenas `brand_close` como paso sistematico del
  verify, no como reaccion a algo "que se veia raro". Vale la pena que
  `premium-craft-standards.md` codifique esto como parte fija del checklist
  visual (no solo "lee el texto", tambien "mide el margen").
  
- El fix se aplico en la RAIZ (el componente compartido) en vez de acortar
  el copy de los 2 CTAs afectados — el atajo hubiera dejado el bug latente
  para el proximo CTA largo de la proxima serie. Consistente con la regla
  de oro de la agencia ("arreglar de raiz, no por el camino corto").
- BPM por autocorrelacion (numpy/scipy, reimplementado en esta sesion sin
  script del CT 128) dio deltas 0.0-0.7 BPM — consistente con el rango de
  las 3 series anteriores, confirma que el metodo es portable y reproducible
  sin acceso al CT 128.
- El escaneo de paleta HSV region+control (Python/PIL/numpy, mismo criterio:
  denominador = pixeles coloreados, no el frame completo) tambien se
  reimplemento localmente, mismo resultado limpio en los 12 frames de esta
  serie.

---

## Apendice — handoff historico de pre-produccion (ya ejecutado)

Las instrucciones originales de pre-produccion (estructura de 4 reels y su
razon, manifiesto de assets, recipe de finishing exacto, comandos de render
por reel, el gate de entrada `npx remotion compositions`) quedan preservadas
en el historial de commits de este archivo
(`git log -p -- remotion-composer/src/reels/ReelsInmobiliariosSerie.README.md`)
para referencia — ya no aplican como pasos pendientes de pre-produccion (esa
fase esta cerrada; lo pendiente hoy es el re-render puntual de 2 reels).


---

## Refresh — re-render completo, los 2 reels pendientes ya resueltos (2026-08-21)

`devops-aetherlogik-homelab` re-renderizo `LoQueYaPuedesAutomatizar` y
`CuandoEntraElHumano` sobre HEAD `de8b047` (incluye el fix `BrandClose.tsx`,
commit `706d449`), mismos props/assets, sin cambios de duracion ni contenido:

- `tsc --noEmit`: 0 errores.
- Masters ProRes renderizados en paralelo, sin incidentes de memoria (fueron
  los 2 primeros de la ronda de re-renders del dia, antes de que la ronda
  posterior de 3-en-paralelo de `reels-abogados-serie` saturara el CT 128 —
  ver el refresh de esa serie para el detalle del OOM y su recuperacion).
- Finishing FFmpeg identico (`finish_reel.py`): LUFS post-hoc -14.06
  (automatizar) / -14.01 (humano), ambos dentro de banda -14+-0.5.
- ffprobe: h264, 1080x1920, 24fps, duraciones exactas 46.0s / 45.0s.
- Spot-check visual del frame `brand_close` en ambos: CTA de 2 lineas
  centrado con margen simetrico, sin bleed al borde — el defecto original
  (texto pegado al borde izquierdo) ya no aparece.
- Subidos a R2 con naming nuevo `-v2.mp4` (NO se sobreescribio el `-v1.mp4`
  defectuoso — CF cachea por nombre, path nuevo evita servir el asset viejo
  desde el edge): `lo-que-ya-puedes-automatizar-v2.mp4`,
  `cuando-entra-el-humano-v2.mp4`, ambos verificados `curl` 200 con
  `Content-Length` igual al tamano local. Los `-v1.mp4` NO se borraron
  (limpieza pendiente de decision del director).

**Pendiente:** `video-producer` re-verifica el `brand_close` de estos 2 y
emite el GO final de la serie (los reels 1 y 4 ya tenian GO desde el verify
original).
