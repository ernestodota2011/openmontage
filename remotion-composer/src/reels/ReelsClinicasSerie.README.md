# Serie "reels-clinicas-serie" — pre-produccion COMPLETA, pendiente de render (2026-08-21)

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

## Los 4 videos — assets + render pendiente

| # | Reel | Duracion picture | Runtime | Escenas i2v |
|---|---|---|---|---|
| 1 | `ElCicloQueTeCuestaHoras` (gancho) | 30.0s (720f) | Remotion (atelier) | 1 (cold_open_hero) |
| 2 | `AsiFuncionaLaAutomatizacionReal` | 47.0s (1128f) | Remotion 100% (atelier) | 0 |
| 3 | `CasoRealMedicinaEstetica` | 45.0s (1080f) | Remotion 100% (atelier) | 1 (cold_open_hero) |
| 4 | `LoQueCambiaEnTuClinica` | 47.0s (1128f) | HIBRIDO Remotion + HyperFrames (atelier) | 0 |

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

## Manifiesto de assets generados (fal.ai, URLs CDN temporales — devops archiva a R2)

⚠️ Las URLs `v3b.fal.media` son temporales (expiran, no confirmado el plazo
exacto — tratar como ~24-48h por precaucion, mismo criterio que la serie
anterior). **`video-producer` NO tocó credenciales de R2** (P-07 del registro
de problemas) — devops debe archivar estas URLs con la via segura ya
establecida ANTES de que expiren.

| Asset | Reel | Modelo | URL | Tamaño | Costo |
|---|---|---|---|---|---|
| hero still | 1 | nano-banana-pro (2K jpeg) | `https://v3b.fal.media/files/b/0aa734ee/faAdWU-pquGDuPZbXcrDR_lVtQs1ry.jpg` | — | $0.15 |
| hero i2v (5s) | 1 | kling-video/o1 | `https://v3b.fal.media/files/b/0aa734ef/QEFBp0mxP6wUhkga2Vizq_output.mp4` | 3,355,707 B | $0.56 |
| music (38s→30.0s) | 1 | elevenlabs/music | `https://v3b.fal.media/files/b/0aa734f4/ITmvfENzu3dQV0iWwLQKz_music_generated.mp3` | 607,757 B | $0.38 |
| sfx whoosh | 1/2 | elevenlabs/sound-effects/v2 | `https://v3b.fal.media/files/b/0aa734fb/8OkH83AjiXGipIpsotn_n_sound_effect.mp3` | 17,180 B | $0.002 |
| music (58s→47.0s) | 2 | elevenlabs/music | `https://v3b.fal.media/files/b/0aa734e2/8B2LNpTZsS_Ixtq4_94ZU_music_generated.mp3` | 927,078 B | $0.58 |
| sfx chip | 2 | elevenlabs/sound-effects/v2 | `https://v3b.fal.media/files/b/0aa734e7/dDF8uo4yZwtzaJyMIIW5-_sound_effect.mp3` | 17,180 B | $0.002 |
| sfx confirm ding | 2/3 | elevenlabs/sound-effects/v2 | `https://v3b.fal.media/files/b/0aa734fc/0WPJvc5cuVvp6FAP6cPyu_sound_effect.mp3` | 17,180 B | $0.002 |
| hero still | 3 | nano-banana-pro (2K jpeg) | `https://v3b.fal.media/files/b/0aa734f0/lnw59ofJfXAYkQVCbQzmK_VQUFKg8k.jpg` | — | $0.15 |
| hero i2v (5s) | 3 | kling-video/o1 | `https://v3b.fal.media/files/b/0aa73503/00B4CIx-Btl5YKy387dvJ_output.mp4` | 8,024,813 B | $0.56 |
| music (52s→45.0s) | 3 | elevenlabs/music | `https://v3b.fal.media/files/b/0aa734e3/Szw-VnP7SFCov__Nwb_0-_music_generated.mp3` | 833,037 B | $0.52 |
| music (52s→47.0s) | 4 | elevenlabs/music | `https://v3b.fal.media/files/b/0aa734f9/pkKhryqS8cijNLFWtF9KC_music_generated.mp3` | 831,365 B | $0.52 |
| sfx riser | 4 | elevenlabs/sound-effects/v2 | `https://v3b.fal.media/files/b/0aa734fc/ybEsvX9mNs246fLTmbxxK_sound_effect.mp3` | 24,703 B | $0.003 |

**Costo total de assets generativos: ~$3.43 USD**, contra un techo de ~$25
declarado en la mision. Detalle linea por linea en el `assets_generated` de
cada `.gates.json`.

⚠️ Todos los tracks de musica se generaron con **buffer** sobre el picture
length (nunca al reves) — devops **recorta** (no loopea ni extiende) a la
duracion exacta de cada reel en el finishing.

## Gotcha nuevo descubierto esta sesion (P-11, registrado en Video-problemas.md)

`fal-ai/kling-video/o1/image-to-video` rechaza `duration` fuera de {5, 10}
segundos con 422 cuando NO se pasa `end_image_url` (caso de un hero i2v de
UN plano aislado, no de encadenado first/last-frame). Se resolvio usando
`duration:"5"` para ambos heroes de esta serie (reel 1 y reel 3) — el
frame-plan de cada `cold_open_hero` (120f = 5.0s) ya coincide exacto.

## Comandos de render por reel (los ejecuta devops, NO video-producer)

Reels 1, 2, 3 (100% Remotion):
```bash
python scripts/ssh_helper.py --host pve1 "pct start 128"
python scripts/ssh_helper.py --host pve1 "pct exec 128 -- bash -c 'cd /opt/openmontage/remotion-composer && npx tsc --noEmit'"
python scripts/ssh_helper.py --host pve1 "pct exec 128 -- bash -c 'cd /opt/openmontage/remotion-composer && npx remotion render src/index.ts ElCicloQueTeCuestaHoras out/el-ciclo-master.mov --codec=prores --prores-profile=hq --image-format=png --color-space=bt709 --props=./props/el-ciclo.json'"
# repetir para AsiFuncionaLaAutomatizacionReal y CasoRealMedicinaEstetica con sus props
```

Reel 4 (HIBRIDO — 2 pasos: HyperFrames primero, Remotion despues):
```bash
python scripts/ssh_helper.py --host pve1 "pct start 128"
python scripts/ssh_helper.py --host pve1 "pct exec 128 -- bash -c 'cd /opt/openmontage/hyperframes-compositions/que-cambia-en-tu-clinica && hf lint . && hf render -c index.html -o que-cambia-en-tu-clinica.mp4'"
# subir que-cambia-en-tu-clinica.mp4 como queCambiaSrc en los props de LoQueCambiaEnTuClinica
python scripts/ssh_helper.py --host pve1 "pct exec 128 -- bash -c 'cd /opt/openmontage/remotion-composer && npx remotion render src/index.ts LoQueCambiaEnTuClinica out/lo-que-cambia-master.mov --codec=prores --prores-profile=hq --image-format=png --color-space=bt709 --props=./props/lo-que-cambia.json'"
python scripts/ssh_helper.py --host pve1 "pct stop 128"
```

Los `props/*.json` de cada reel deben apuntar a las URLs de la tabla de
arriba (o a sus copias ya archivadas en R2, si devops archiva primero) —
**nombra la fuente por ruta exacta antes de renderizar** (P-05 del registro
de problemas: no confiar en "el master" de memoria).

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
6. `hf lint` + `hf render` logs del reel 4 (confirmar 0/0, mismo resultado
   que `proceso-y-honestidad` de la serie anterior).

Un rojo en cualquiera de estos = se enruta el arreglo (asset/composicion/
audio) y se re-verifica — la compuerta es un loop, no un sello.

## Handoffs pendientes

- **devops-aetherlogik-homelab**: correr los 4 comandos de render + el
  finishing exacto de arriba + subir a R2 (`agency/reels-clinicas-serie/`) +
  archivar las 12 URLs fal.media de la tabla de assets ANTES de que expiren.
- **video-producer** (proxima sesion): verify post-render de los 4 MP4 con
  el checklist de arriba, y actualizar este README con los veredictos
  (mismo patron GO/NO-GO que `ReelsChatbotSerie.README.md`).
- **Ernesto**: ninguno pendiente de decisión creativa — la estructura de 4
  reels y el contenido citan el post fielmente sin inventos.

## 📌 Para memoria

- P-11 (nuevo, registrado en `Video-problemas.md`): Kling O1 exige
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
