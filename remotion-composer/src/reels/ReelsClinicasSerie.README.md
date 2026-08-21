# Serie "reels-clinicas-serie" — pre-produccion + WIREADO completos, pendiente de render (2026-08-21)

> [!danger] CORRECCION 2026-08-21 (post-bloqueo verificado por devops)
> El handoff original de esta rama decia "pre-produccion COMPLETA" pero **NO
> incluia el registro de las 4 composiciones en `Root.tsx` ni sus props
> JSON** — devops intento renderizar y obtuvo `Error: Could not find
> composition with ID ElCicloQueTeCuestaHoras` (root cause verificado con un
> render real, ver `Server-pve1-bitacora-2026-08-21-openmontage-render-reels-clinicas-serie.md`).
> Corregido en el commit `e6d86f4` (las 4 `<Composition>` + sus imports en
> `Root.tsx`). Los 4 props JSON los creo devops en el mismo bloqueo (HEAD
> `f6615b7`, `public/demo-props/*.json`) leyendo las interfaces reales de
> cada `.tsx` — revisados abajo, coinciden con el diseño. Ver **P-12** en
> `Video-problemas.md`: la definicion de "listo" de una composicion incluye
> su registro en `Root.tsx` + su props JSON — la prueba es que
> `npx remotion compositions` la liste, no que el `.tsx` exista.

> [!warning] Esta serie NO esta renderizada. La mision explicita "NO renderizas" —
> este documento es el handoff tecnico completo a `devops-aetherlogik-homelab`
> para que corra el render + finishing + verify. `video-producer` corre el
> verify (ffprobe + frame-sampling + loudnorm/BPM medido) DESPUES de recibir
> los MP4 reales, no antes.

Continuacion de la formula ganadora GO-4/4 de `aetherlogik/reels-chatbot-serie`
(ver `ReelsChatbotSerie.README.md`). Esta rama (`aetherlogik/reels-clinicas-serie`)
parte de esa rama (HEAD `4c4501d`) para heredar `ChatThreadScene.tsx`,
`CapabilitySceneKit.tsx`, `theme.ts`, `KineticHeadline`/`StatReveal`/
`TagRevealList`/`BrandClose`/`FilmGrade`/`EmberThread` y el resto del catalogo
brand-safe. Fuente del blog: `automatizar-citas-clinica-miami.md` (D:\aetherlogik-astro).

## Estructura elegida — 4 reels (1 gancho + 3 didacticos), y por que

Se evaluo 3 vs 4 reels (la mision deja la decision abierta). Se eligieron **4**,
mismo patron que la serie chatbot (GO 4/4), porque el post tiene 4 bloques de
contenido claramente distintos y cada uno sostiene su propio reel sin relleno:
(1) el ciclo manual + costo oculto → gancho puro; (2) los 3 pilares de la
automatizacion real → un didactico de mecanismo; (3) el caso real de la red de
medicina estetica (3 cifras propias) → un didactico de resultados, con su
propia identidad narrativa (no se mezcla con (2) porque diluiria ambos); (4) lo
que cambia en la operacion diaria + el benchmark externo (Klara) + CTA final →
el cierre de serie. Fusionar (2)+(3) o (3)+(4) habria forzado 2 asuntos
distintos (mecanismo interno vs. resultado externo verificado) en el mismo
video, contra la doctrina de "una idea por reel" de los didacticos.

## Los 4 videos — assets archivados + composicion wireada + render pendiente

| # | Reel | Duracion picture | Runtime | Escenas i2v | `Root.tsx` |
|---|---|---|---|---|---|
| 1 | `ElCicloQueTeCuestaHoras` (gancho) | 30.0s (720f) | Remotion (atelier) | 1 (cold_open_hero) | wireada `e6d86f4` |
| 2 | `AsiFuncionaLaAutomatizacionReal` | 47.0s (1128f) | Remotion 100% (atelier) | 0 | wireada `e6d86f4` |
| 3 | `CasoRealMedicinaEstetica` | 45.0s (1080f) | Remotion 100% (atelier) | 1 (cold_open_hero) | wireada `e6d86f4` |
| 4 | `LoQueCambiaEnTuClinica` | 47.0s (1128f) | HIBRIDO Remotion + HyperFrames (atelier) | 0 | wireada `e6d86f4` |

Todos 9:16, 1080x1920, 24fps, `tail_padding_seconds: 0` en los props de cada
composicion (duracion exacta, sin el padding fantasma de +1s ya resuelto en
`Root.tsx`).

## Directriz de Ernesto — musica movida, BPM declarado por reel

Regla dura de la mision: 120-140 BPM, drive ritmico, nada de ambient. BPM
declarado (en el prompt de `fal-ai/elevenlabs/music` y en cada `.decision_log.json`):

| Reel | BPM declarado | Energia declarada |
|---|---|---|
| 1 | 124 | urgente-pero-esperanzador |
| 2 | 128 | confiado y tranquilizador |
| 3 | 126 | orgulloso y creible, build a 2/3 |
| 4 | 122 | calmado, build final hacia el CTA |

⚠️ **El BPM real solo se puede medir sobre el audio FINAL mezclado**
(autocorrelacion del envelope de energia, metodo de la serie anterior —
midio 127.9/125.3/122.7 BPM contra 128/126/122 declarados, <1 BPM de margen).
Esta sesion NO midio BPM real porque NO hubo render/mezcla — queda declarado
como **NO VERIFICABLE hasta el post-render verify**, honesto en cada `gates.json`.

## Manifiesto de assets — ARCHIVADOS a R2 por devops (ya no fal.media temporal)

✅ Los 12 assets generativos + el clip HyperFrames del reel 4 ya estan
archivados en R2 (`agency/reels-clinicas-serie/...`), verificados por devops
con tamaño exacto + `curl -sSI` 200 (ver la bitacora del 2026-08-21). Los 4
`public/demo-props/*.json` (HEAD `f6615b7`) ya apuntan a
`https://media.aetherlogik.com/agency/reels-clinicas-serie/...`, no a las
URLs `v3b.fal.media` originales (esas expiran; se dejan abajo solo como
referencia historica del costo/modelo, NO usar para renderizar).

**Props JSON verificados contra el diseño de cada `.tsx`** (releidos los 4
archivos que devops creo en `public/demo-props/`): las claves coinciden
EXACTO con las interfaces de props de cada composicion
(`ElCicloQueTeCuestaHorasProps`/`AsiFuncionaLaAutomatizacionRealProps`/
`CasoRealMedicinaEsteticaProps`/`LoQueCambiaEnTuClinicaProps`), `tail_padding_seconds:0`
en los 4, y las rutas de asset coinciden con el manifiesto de archivado de la
bitacora (incluida la decision de compartir `shared/sfx-whoosh.mp3` entre
reels 1+2 y `shared/sfx-confirm-ding.mp3` entre reels 2+3, correcta — son el
mismo asset fal.media, no hacia falta duplicarlo). **Sin discrepancias
encontradas** — los 4 props quedan aprobados tal como los dejo devops.

| Asset (fal.media original, SOLO referencia — NO USAR PARA RENDERIZAR) | Reel | Modelo | Tamaño | Costo |
|---|---|---|---|---|
| hero still | 1 | nano-banana-pro (2K jpeg) | 2,886,897 B | $0.15 |
| hero i2v (5s) | 1 | kling-video/o1 | 3,355,707 B | $0.56 |
| music (38s→30.0s) | 1 | elevenlabs/music | 607,757 B | $0.38 |
| sfx whoosh (compartido 1+2) | 1/2 | elevenlabs/sound-effects/v2 | 17,180 B | $0.002 |
| music (58s→47.0s) | 2 | elevenlabs/music | 927,078 B | $0.58 |
| sfx chip | 2 | elevenlabs/sound-effects/v2 | 17,180 B | $0.002 |
| sfx confirm ding (compartido 2+3) | 2/3 | elevenlabs/sound-effects/v2 | 17,180 B | $0.002 |
| hero still | 3 | nano-banana-pro (2K jpeg) | 1,413,773 B | $0.15 |
| hero i2v (5s) | 3 | kling-video/o1 | 8,024,813 B | $0.56 |
| music (52s→45.0s) | 3 | elevenlabs/music | 833,037 B | $0.52 |
| music (52s→47.0s) | 4 | elevenlabs/music | 831,365 B | $0.52 |
| sfx riser | 4 | elevenlabs/sound-effects/v2 | 24,703 B | $0.003 |
| clip HyperFrames (checklist, 20.0s) | 4 | hf render (`que-cambia-en-tu-clinica`) | 416,967 B | $0 (CPU, sin costo de API) |

**Rutas R2 reales (las que usan los props JSON):**
`agency/reels-clinicas-serie/el-ciclo-que-te-cuesta-horas/{hero-still.jpg,hero-i2v.mp4,music.mp3}`,
`agency/reels-clinicas-serie/asi-funciona-la-automatizacion-real/{music.mp3,sfx-chip.mp3}`,
`agency/reels-clinicas-serie/caso-real-medicina-estetica/{hero-still.jpg,hero-i2v.mp4,music.mp3}`,
`agency/reels-clinicas-serie/lo-que-cambia-en-tu-clinica/{que-cambia-en-tu-clinica.mp4,music.mp3,sfx-riser.mp3}`,
`agency/reels-clinicas-serie/shared/{sfx-whoosh.mp3,sfx-confirm-ding.mp3}`.

**Costo total de assets generativos: ~$3.43 USD**, contra un techo de ~$25
declarado en la mision. Detalle linea por linea en el `assets_generated` de
cada `.gates.json` (esos siguen citando las URLs fal.media originales como
registro historico del prompt/costo — el ARCHIVO real esta en R2).

⚠️ Todos los tracks de musica se generaron con **buffer** sobre el picture
length (nunca al reves) — devops **recorta** (no loopea ni extiende) a la
duracion exacta de cada reel en el finishing.

## Gotcha nuevo descubierto esta sesion (P-11, registrado en Video-problemas.md)

`fal-ai/kling-video/o1/image-to-video` rechaza `duration` fuera de {5, 10}
segundos con 422 cuando NO se pasa `end_image_url` (caso de un hero i2v de
UN plano aislado, no de encadenado first/last-frame). Se resolvio usando
`duration:"5"` para ambos heroes de esta serie (reel 1 y reel 3) — el
frame-plan de cada `cold_open_hero` (120f = 5.0s) ya coincide exacto.

## Segundo gotcha (P-12, registrado en Video-problemas.md) — este handoff lo causo

El primer draft de este README declaraba "pre-produccion COMPLETA" sin que
ninguna de las 4 composiciones estuviera registrada en `Root.tsx` ni tuviera
props JSON — devops lo descubrio con un render real fallido, no con una
lectura de codigo. Corregido (`Root.tsx` commit `e6d86f4`; props JSON ya
existian, creados por devops en el bloqueo). Ver la seccion
**"Auto-verificacion antes del handoff"** mas abajo — se agrega a partir de
esta serie para toda serie futura.

## Auto-verificacion antes de declarar el handoff (NUEVO, por P-12)

`video-producer` NO tiene un checkout local del fork con `node_modules`
instalados en esta maquina (Windows, sin el CT) — no puede correr
`npx remotion compositions` el mismo. Por eso este paso queda declarado como
**gate de ENTRADA que devops corre PRIMERO**, antes de intentar el render de
produccion, y su resultado se pega en la bitacora de la sesion:

```bash
cd /opt/openmontage/remotion-composer && npx remotion compositions src/index.tsx
```

Si alguna composicion nueva del handoff NO aparece en esa lista, el handoff
NO estaba completo — se devuelve a `video-producer` para wirear `Root.tsx`
antes de perder tiempo en `npm install`/`tsc`/discovery de props (que SI se
corrieron en el bloqueo de esta serie y no habrian detectado el problema: un
`.tsx` sin importar en ningun lado compila limpio con `tsc`, no falla).
**La prueba de "completa" es que el render la encuentre, no que el archivo
exista.**

## Comandos de render por reel (los ejecuta devops, NO video-producer)

Reels 1, 2, 3 (100% Remotion):
```bash
python scripts/ssh_helper.py --host pve1 "pct start 128"
python scripts/ssh_helper.py --host pve1 "pct exec 128 -- bash -c 'cd /opt/openmontage/remotion-composer && npx remotion compositions src/index.tsx'"
python scripts/ssh_helper.py --host pve1 "pct exec 128 -- bash -c 'cd /opt/openmontage/remotion-composer && npx tsc --noEmit'"
python scripts/ssh_helper.py --host pve1 "pct exec 128 -- bash -c 'cd /opt/openmontage/remotion-composer && npx remotion render src/index.tsx ElCicloQueTeCuestaHoras out/el-ciclo-master.mov --codec=prores --prores-profile=hq --image-format=png --color-space=bt709 --props=./public/demo-props/el-ciclo-que-te-cuesta-horas.json'"
# repetir para AsiFuncionaLaAutomatizacionReal (--props=./public/demo-props/asi-funciona-la-automatizacion-real.json)
# y CasoRealMedicinaEstetica (--props=./public/demo-props/caso-real-medicina-estetica.json)
```

Reel 4 (HIBRIDO — 2 pasos: HyperFrames primero, Remotion despues; el paso
HyperFrames ya esta COMPLETO, ver bitacora):
```bash
python scripts/ssh_helper.py --host pve1 "pct start 128"
# Paso HyperFrames YA HECHO (0 errors/0 warnings, clip archivado en R2 y ya
# referenciado en public/demo-props/lo-que-cambia-en-tu-clinica.json como
# queCambiaSrc) — no repetir salvo que el clip cambie.
python scripts/ssh_helper.py --host pve1 "pct exec 128 -- bash -c 'cd /opt/openmontage/remotion-composer && npx remotion render src/index.tsx LoQueCambiaEnTuClinica out/lo-que-cambia-master.mov --codec=prores --prores-profile=hq --image-format=png --color-space=bt709 --props=./public/demo-props/lo-que-cambia-en-tu-clinica.json'"
python scripts/ssh_helper.py --host pve1 "pct stop 128"
```

Los 4 `public/demo-props/*.json` YA EXISTEN (creados por devops, verificados
arriba contra el diseño) — **nombra la fuente por ruta exacta antes de
renderizar** (P-05 del registro de problemas: no confiar en "el master" de
memoria) sigue aplicando para los `out/*.mov` que produzca este render.

## Recipe de finishing EXACTO (aplicar tal cual, no "el CRF de siempre")

1. **Curve SIN el punto `0.25/0.22`** — causa raíz de P-01 (grano) Y de P-09
   (texto de UI aplastado en la serie anterior). Usar la curva simplificada:
   `curves=all='0/0.045 0.5/0.5 0.75/0.78 1/0.96'` (mantiene el lift de negros
   sin crushear luma 60-120, donde vive TODO el texto de UI/tarjetas de esta
   serie: burbujas de chat, columnas de sede, checklist de HyperFrames).
2. **CRF 16** (dentro de banda 16-18) desde el master ProRes — reel 2 y reel 4
   de esta serie tienen MAS densidad de texto de UI pequeño que ningun reel
   de la serie anterior (3 columnas simultaneas en `pilar3_sincroniza`, 4
   filas de checklist en HyperFrames) — no bajar de CRF16.
3. **aq-mode 2**, **sin filtro `noise` de FFmpeg** (el grano vive en
   `FilmGrade.tsx`, ya horneado en Remotion — aplicar `noise` encima
   duplicaria la variable, causa raíz de P-01).
4. **Loudnorm 2 pasadas con `acompressor` antes** (threshold=-20dB, ratio=6) —
   calibrar el target interno POR MIX (I≈-16.0 si hay SFX cerca de 0dBFS,
   verificar `normalization_type` en el JSON de salida — P-02).
5. **Verify con region+control** (P-04): nunca un histograma global; recorta
   la region de texto de UI (burbujas/columnas/checklist) y compara contra un
   control de headline grande (KineticHeadline) en el MISMO reel.

## Que verifica `video-producer` una vez devops entregue los 4 MP4

1. `ffprobe`: duracion exacta (30.0/47.0/45.0/47.0s), 1080x1920, h264, stream
   de audio real (no mudo).
2. Frame-sampling region+control en las escenas de texto de UI denso
   (`pilar1_captura`/`pilar2_confirma`/`pilar3_sincroniza` del reel 2;
   `checklist_operacion` del reel 4) — mismo metodo que atrapo P-09.
3. Loudnorm medido independiente + BPM medido independiente por
   autocorrelacion (confirmar 124/128/126/122 BPM dentro de ~1 BPM).
4. Revision visual: ember-only (cero cian/violeta/glow, incluido en los 2
   frames del clip i2v y en el clip HyperFrames del reel 4), boxless,
   isotipo real, cierre. Confirmar que los 2 heroes i2v (reel 1 y reel 3)
   NO muestran ningun logo/marca visible (aislamiento de cliente, reel 3).
5. `coherence_guard` sobre los 2 reels con i2v (aunque cada uno tiene solo 1
   escena i2v, sin multi-plano que encadenar — el gate corre igual como
   chequeo de paleta/similitud del unico plano).
6. `hf lint` + `hf render` logs del reel 4 (ya confirmado 0/0 por devops en
   el bloqueo, mismo resultado que `proceso-y-honestidad` de la serie
   anterior — no hace falta re-correrlo salvo que el clip cambie).

Un rojo en cualquiera de estos = se enruta el arreglo (asset/composicion/
audio) y se re-verifica — la compuerta es un loop, no un sello.

## Handoffs pendientes

- **devops-aetherlogik-homelab**: correr `npx remotion compositions` (debe
  listar las 4 composiciones nuevas — confirma el fix de `Root.tsx`), luego
  los 4 comandos de render (props ya archivados, rutas corregidas arriba) +
  el finishing exacto + subir los 4 MP4 finales a R2 (`agency/reels-clinicas-serie/`).
- **video-producer** (proxima sesion): verify post-render de los 4 MP4 con
  el checklist de arriba, y actualizar este README con los veredictos
  (mismo patron GO/NO-GO que `ReelsChatbotSerie.README.md`).
- **Ernesto**: ninguno pendiente de decisión creativa — la estructura de 4
  reels y el contenido citan el post fielmente sin inventos.

## 📌 Para memoria

- **P-12 (nuevo, registrado en `Video-problemas.md`):** pre-produccion
  "completa" sin wireado ejecutable — la definicion de "listo" de una
  composicion incluye su registro en `Root.tsx` + su props JSON; la prueba
  es que `npx remotion compositions` la liste, no que el `.tsx` exista.
  Pariente de `feedback_mecanismo_cableado_a_uno` (el archivo existe pero
  nada lo consume). `tsc --noEmit` NO detecta este defecto (un `.tsx` sin
  importar compila limpio).
- P-11 (registrado en `Video-problemas.md`): Kling O1 exige
  `duration` ∈ {5,10} sin `end_image_url` — fijar `duration:"5"` desde el
  primer intento para un hero i2v de un solo plano aislado.
- `nano-banana-pro` con `resolution:"2K"` + `output_format:"jpeg"` directo
  (sin descargar 4K y recomprimir) siguió funcionando limpio en esta serie
  (P-06 ya curada, aplicada preventivamente 2 veces más).
- `StatReveal.tsx` tiene `accentColor` default `#A78BFA` (violeta,
  PROHIBIDO) — cualquier reel futuro que lo use DEBE pasar
  `accentColor={BRAND.accent}` explícito. Vale la pena que `skill-curator`
  lo documente como landmine en `brand-and-antislop.md` junto a los
  componentes nativos de OpenMontage (mismo patrón, componente propio del
  fork en vez de nativo, pero con el mismo bug de default fuera de marca).
- `CalloutBox.tsx` (stock) tiene defaults NO ember (bg blanco, borde azul,
  texto oscuro) — evitado por completo en esta serie (se usó
  `KineticHeadline` con `color={BRAND.muted}` para texto de atribución en
  su lugar). Mismo landmine que StatReveal, mismo destino recomendado.
