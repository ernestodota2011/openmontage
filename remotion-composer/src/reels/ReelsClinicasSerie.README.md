# Serie "reels-clinicas-serie" — CERRADA, los 4 reels con GO (2026-08-21)

> [!success] Gate tecnico de la serie completa: CERRADO. Los 4 videos tienen
> verify GO independiente (ffprobe + LUFS + BPM medido + frame-sampling
> region+control + coherence_guard + aislamiento de cliente). La
> publicacion en redes queda del lado de Ernesto — este documento es el
> sign-off tecnico final de `video-producer`, no una autorizacion de
> publicacion.

Continuacion de la formula ganadora GO-4/4 de `aetherlogik/reels-chatbot-serie`
(ver `ReelsChatbotSerie.README.md`). Esta rama (`aetherlogik/reels-clinicas-serie`)
parte de esa rama (HEAD `4c4501d`) para heredar `ChatThreadScene.tsx`,
`CapabilitySceneKit.tsx`, `theme.ts`, `KineticHeadline`/`StatReveal`/
`TagRevealList`/`BrandClose`/`FilmGrade`/`EmberThread` y el resto del catalogo
brand-safe. Fuente del blog: `automatizar-citas-clinica-miami.md` (D:\aetherlogik-astro).

## Los 4 videos — links + veredicto

| # | Reel | R2 | Duracion (video track) | Runtime | Veredicto |
|---|---|---|---|---|---|
| 1 | El ciclo que te cuesta horas (gancho) | `agency/reels-clinicas-serie/el-ciclo-que-te-cuesta-horas-v1.mp4` | 30.0s exacto | Remotion (atelier) | **GO** |
| 2 | Asi funciona la automatizacion real | `agency/reels-clinicas-serie/asi-funciona-la-automatizacion-real-v1.mp4` | 47.0s (contenedor 47.1s, ver nota AAC) | Remotion 100% (atelier) | **GO** |
| 3 | Caso real: medicina estetica | `agency/reels-clinicas-serie/caso-real-medicina-estetica-v1.mp4` | 45.0s exacto | Remotion 100% (atelier, 1 hero i2v) | **GO** |
| 4 | Lo que cambia en tu clinica | `agency/reels-clinicas-serie/lo-que-cambia-en-tu-clinica-v1.mp4` | 47.0s (contenedor 47.1s, ver nota AAC) | HIBRIDO Remotion + HyperFrames | **GO** |

Todos servidos desde `https://media.aetherlogik.com/<ruta de arriba>`, todos
verificados `curl 200` + descargados y auditados byte-a-byte por
`video-producer` de forma independiente (no solo el reporte de devops).

## Directriz de Ernesto — musica movida, VERIFICADA con evidencia cuantitativa

"El tono de la musica esta como que lento; seria bueno que fueran mas
movidos." Los 4 briefs declaran BPM/energia explicitos, y el tempo se
**midio de forma independiente** sobre el audio final de cada reel
(autocorrelacion del envelope de energia, filtro low-pass 200Hz + derivada
semi-rectificada, banda de busqueda 80-180 BPM — metodo propio, sin
libreria de deteccion dedicada, script `measure_bpm.py`):

| Reel | BPM declarado | BPM medido | Delta |
|---|---|---|---|
| 1 | 124 | 125.3 | 1.3 |
| 2 | 128 | 127.9 | 0.1 |
| 3 | 126 | 125.3 | 0.7 |
| 4 | 122 | 122.7 | 0.7 |

Los 4 dentro de la banda 120-140 exigida, con drive ritmico audible
confirmado en la revision visual/auditiva (four-on-the-floor, sin ambient).
El delta del reel 1 (1.3 BPM) es el mayor de los 4 pero sigue siendo un
error relativo <1.1% — dentro del margen de resolucion del metodo de
autocorrelacion sobre un track de 30s (el mas corto de la serie).

## LUFS — verificado independiente, coincide EXACTO con el reporte de devops

| Reel | LUFS devops | LUFS medido independiente |
|---|---|---|
| 1 | -14.00 | -14.00 |
| 2 | -14.01 | -14.01 |
| 3 | -14.03 | -14.03 |
| 4 | -13.96 | -13.96 |

Coincidencia exacta a 2 decimales en los 4 — confirma que el recipe final
(curves sin el punto `0.25/0.22`, CRF16+AQ-mode2, sin filtro `noise`,
loudnorm 2 pasadas con `acompressor`) se aplico tal como lo declara el
README, y que el audio es real (no silencio) en los 4.

## Hallazgo de devops decidido: +0.1s de contenedor en reels 2 y 4 (AAC) — ACEPTADO

Investigacion propia antes de decidir: en ambos reels el **video track**
termina exacto en el frame declarado (ultimo `pts_time` = 46.958333s =
frame 1127/1128 @24fps = 47.000s exactos). El +0.1s vive UNICAMENTE en el
stream de audio. `volumedetect` sobre la region 46.90–47.10s confirma
audio REAL (mean -15.6/-16.3dB, max -3.7dB en ambos), no silencio ni un
artefacto de padding audible — es la cola natural de la musica de
`brand_close` cayendo dentro del ultimo bloque de codificacion AAC (1024
muestras + priming/padding tipico del encoder, ~100ms). **Decision: sin
trim.** Es el comportamiento estandar de facto de un encoder AAC, no una
extension de contenido perceptible, y recortar arriesgaria cortar la cola
real de la musica del cierre. Reels 1 y 3 (sin este patron) confirman
duracion de contenedor EXACTA (30.000000s y 45.000000s), asi que el +0.1s
es especifico de estos 2 masters, no un defecto sistemico del pipeline.

## Verify visual (region+control + escaneo de paleta sobre pixeles reales)

18 frames extraidos y auditados (todos los beats criticos declarados en la
mision): el punch del gancho (reel 1, hero i2v + tease ember), las 3
cifras del caso real con su atribucion (reel 3), el checklist HyperFrames
integrado (reel 4). Ademas: un escaneo HSV programatico sobre pixeles
reales (banda cian/violeta hue 170-300 vs banda ember hue 10-45) en los 18
frames — **cyan_violet% = 0.0% en 17 de 18 frames**; la unica excepcion es
el hero i2v del reel 1 a 2.5s (2.95%), atribuible a sombras/reflejos frios
incidentales de una escena FOTOGRAFICA realista, no a un acento de diseno
deliberado (sin glow, sin UI fuera de marca) — no bloquea.

- **Reel 1:** hero i2v calido/integrado (sujeto NO recortado), cascada
  `manual_cycle` legible boxless, sweep ember `tease_possible` limpio,
  `brand_close` con isotipo real + wordmark bicolor correcto.
- **Reel 2:** las 3 escenas de UI mas densas de TODA la serie
  (`pilar1_captura`/`pilar2_confirma`/`pilar3_sincroniza`) legibles con
  buen contraste — confirma que el recipe de finishing resolvio de raiz el
  defecto P-09 de la serie anterior, incluso con MAS densidad de texto
  pequeno (3 columnas simultaneas) que cualquier reel previo.
- **Reel 3:** las 3 cifras (+125/+66%/99%) nitidas y exactas al post, sin
  redondeos; atribucion textual identica al script. **Aislamiento de
  cliente confirmado**: cero logos/nombres visibles en los 2 frames del
  hero i2v inspeccionados; el unico texto en un monitor de fondo es
  ilegible/garabateado (artefacto tipico de generacion de imagen IA sobre
  texto de pantalla), no deletrea ninguna marca real.
- **Reel 4:** el clip HyperFrames se integra sin friccion visual con el
  catalogo Remotion (mismo kicker/ticks/fondo, sin salto en los cortes),
  legible pese a ser el bitrate mas bajo de los 4 (743kbps). El benchmark
  de Klara ("30-38%") muestra su atribucion COMPLETA ("Segun datos de
  Klara, proveedor de comunicacion clinica — No es una cifra de
  AetherLogik.") en el MISMO frame que la cifra.

## `coherence_guard` — los 2 heroes i2v (reel 1 y reel 3)

Ambos son escena UNICA (sin multi-plano que encadenar, por diseno — doctrina
"1 hero maximo por reel"). Verificado en 2 frames por hero (separados
2.0-2.5s dentro del mismo plano de 5.0s): mismo personaje, mismo espacio,
misma paleta, sin drift. **PASS en los 2.**

## Presupuesto final

Costo real de assets generativos de la serie completa: **~$3.43 USD**
(reel1 $1.092 + reel2 $0.586 + reel3 $1.232 + reel4 $0.523), contra un
techo de ~$25 declarado en la mision. Detalle linea por linea en el
`assets_generated` de cada `.gates.json`.

## Gotchas nuevos de esta serie (registrados en `Video-problemas.md`)

1. **P-11** — Kling O1 rechaza `duration` fuera de {5,10} sin
   `end_image_url` (422 tardio, descubierto al generar el hero i2v del
   reel 1). Resuelto con `duration:"5"` en ambos heroes de la serie.
2. **P-12** — el primer handoff de esta serie se declaro "pre-produccion
   COMPLETA" sin registrar las 4 composiciones en `Root.tsx` ni crear sus
   props JSON. devops lo descubrio con un render real fallido
   (`Could not find composition with ID ElCicloQueTeCuestaHoras`), no con
   lectura de codigo — `tsc --noEmit` NO detecta un `.tsx` huerfano.
   Corregido (`Root.tsx` commit `e6d86f4`); se agrego la seccion de
   auto-verificacion (`npx remotion compositions` como gate de entrada que
   corre devops) para toda serie futura.

Ninguno de los 2 llego a bloquear la publicacion final — P-11 se resolvio
en el momento; P-12 se cazó antes del render de produccion (el intento
diagnostico de devops nunca llego a producir output).

## Primer uso en produccion de HyperFrames en esta serie — resultado

El bloque `checklist_operacion` del reel 4 (20.0s, el 2o uso de HyperFrames
de la agencia tras `proceso-y-honestidad` de la serie chatbot) cerro con
`hf lint` 0/0 (confirmado por devops) y se integro visualmente sin
friccion con el resto del catalogo Remotion, verificado en pixeles reales
(ver seccion de verify visual arriba).

## Handoffs pendientes

- **Ernesto**: decidir publicacion en redes (orden, cadencia, canales).
- Ninguno tecnico — los 4 videos estan verificados y listos.

## 📌 Para memoria

- Serie CERRADA con GO 4/4, mismo patron que `reels-chatbot-serie`
  (segunda serie consecutiva de la linea reels-del-blog en cerrar limpia).
- **P-11 y P-12** quedan documentados en `Video-problemas.md` para que
  `skill-curator` los cablee: P-11 a `aetherlogik-media` (routing Kling
  O1), P-12 a `aetherlogik-video` (definicion de "composicion lista" +
  paso de auto-verificacion `npx remotion compositions`).
- El delta de BPM del reel 1 (1.3 BPM, el mas alto de la serie) sugiere que
  tracks de musica MAS CORTOS (30s vs 45-58s) tienen menos resolucion para
  el metodo de autocorrelacion — no bloqueante, pero vale la pena que un
  futuro reel de gancho corto (<35s) lo tenga en cuenta si el margen
  importa mas.
- El patron "+0.1s de contenedor por padding AAC cuando el track de musica
  tiene cola audible en el ultimo frame" es reproducible (2 de 4 reels) y
  benigno — vale la pena que `aetherlogik-video`/`premium-craft-standards.md`
  lo documente como comportamiento esperado (no un defecto) para que el
  proximo verify no lo re-investigue desde cero.

---

## Apendice — handoff historico de pre-produccion (ya ejecutado)

Las instrucciones originales (estructura de 4 reels y su razon, manifiesto
de assets, recipe de finishing exacto, comandos de render por reel, el
bloqueo de `Root.tsx` y su correccion) quedan preservadas en el historial
de commits de este archivo (`git log -p -- remotion-composer/src/reels/ReelsClinicasSerie.README.md`)
para referencia de futuras series — ya no aplican como pasos pendientes.
