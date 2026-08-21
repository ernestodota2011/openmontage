# Serie "chatbot-whatsapp-para-negocios" — reels 2–4/4

Continuacion del piloto GO'd `TresMensajesDeAnoche` (reel 1/4, rama
`aetherlogik/reel-tres-mensajes-de-anoche`, GO de Ernesto 2026-08-20). Esta
rama (`aetherlogik/reels-chatbot-serie`) parte de esa rama para heredar
`ChatThreadScene.tsx`, `theme.ts` y el resto del catalogo brand-safe.

## Directriz nueva aplicada a TODA la serie
Ernesto (literal): "el tono de la musica esta como que lento; seria bueno
que fueran mas movidos". Los 3 briefs de musica de esta sesion declaran
BPM y energia explicitos (122–128 BPM, drive ritmico, percusion presente,
builds) — ver el campo `prompt_bpm_declared` en cada `.gates.json` como
evidencia. Sigue premium/de marca, nunca EDM generico.

## Los 3 reels
| Reel | Archivo | Duracion | Runtime | Assets generativos |
|---|---|---|---|---|
| 2 — Que hace un chatbot real | `QueHaceUnChatbotReal.tsx` | 46.0s / 1104f @24fps | Remotion (100%) | musica + 2 sfx, cero i2v/stills |
| 3 — Caso real: Marino HVAC | `CasoMarinoHVAC.tsx` | 45.0s / 1080f @24fps | Remotion (100%) | still 4K + still 2K (i2v input) + i2v Kling 2.5 Turbo Pro + musica + 1 sfx nuevo + 1 sfx reusado |
| 4 — Como se construye + cuando NO | `ComoSeConstruyeSinRomperNada.tsx` | 45.0s / 1080f @24fps | HIBRIDO: Remotion (bookends) + HyperFrames (bloque central, 30.0s/720f) | musica + 1 sfx, cero i2v/stills |

## Presupuesto
Total real gastado en assets de la serie: **~$2.01 USD** (reel2 $0.46 +
reel3 $1.10 + reel4 $0.45), muy por debajo del techo de ~$25 declarado en
la mision. Detalle linea por linea en el `assets_generated` de cada
`.gates.json`.

## ⚠️ Paso obligatorio ANTES de renderizar cualquier reel — archivar a R2
Los props JSON de los 3 reels (`remotion-composer/public/demo-props/*.json`)
apuntan hoy a **URLs de fal.media (CDN temporal, expiran en horas/dias)**,
NO a R2. video-producer genericó los assets via el MCP `fal-ai` pero **NO
archivó a R2 en esta sesion** — decision deliberada, no un olvido: el
hallazgo de seguridad de HOY mismo en la bitacora del piloto
(`Server-pve1-bitacora-2026-08-20-openmontage-render-tres-mensajes.md`,
seccion "Hallazgo de seguridad") fue una fuga de credencial R2 contenida
por construir un connection-string de rclone a mano; el patron SEGURO
documentado ahi (archivo de config generado in-situ, nunca argv, salida a
log) es disciplina de infra que le corresponde a devops sobre el CT, no a
video-producer improvisando boto3/rclone desde la laptop con una lectura
fresca de `~/.aetherlogik/secrets/r2.env`.

**Antes de renderizar CADA reel:**
1. Descarga los assets listados en `assets_generated` de su `.gates.json`.
2. Archivalos a R2 bajo `agency/reels-chatbot-serie/<reel>/` con la via
   segura ya establecida (config in-situ, nunca argv, salida a log).
3. Actualiza el props JSON correspondiente reemplazando las URLs de
   fal.media por las de R2.
4. Recien entonces renderiza.

## Instrucciones de render exactas (por reel, para devops)

### Reel 2 — QueHaceUnChatbotReal (100% Remotion)
```bash
pct start 128
pct exec 128 -- bash -c 'cd /opt/openmontage && git fetch origin && git checkout aetherlogik/reels-chatbot-serie && git pull'
pct exec 128 -- bash -c 'cd /opt/openmontage/remotion-composer && npm install && npx tsc --noEmit -p .'
# fuente: remotion-composer/public/demo-props/que-hace-un-chatbot-real.json (tras actualizar URLs a R2)
pct exec 128 -- bash -c 'cd /opt/openmontage/remotion-composer && npx remotion render src/index.tsx QueHaceUnChatbotReal out/que-hace-un-chatbot-real-master.mov --props=public/demo-props/que-hace-un-chatbot-real.json --codec=prores --prores-profile=hq --image-format=png --color-space=bt709'
# verificar: 1104 frames, 1080x1920, 24fps, ~46.0s exactos ANTES de encodar
```
Finishing FFmpeg: receta de-plastic estandar (curves + eq + unsharp +
vignette) SIN `noise=c0s=8:c0f=t` salvo que una escena especifica lo pida
(ninguna de este reel lo pide — no hay grano horneado via FilmGrade en las
escenas de UI), CRF en banda 17–19, loudnorm 2 pasadas con `acompressor`
ANTES (ver P-02 del registro de problemas) apuntando a -14 LUFS/-1dBTP,
verificado post-hoc sobre el archivo final.

### Reel 3 — CasoMarinoHVAC (100% Remotion, con 1 hero i2v real)
```bash
# mismo patron: checkout de rama + npm install + tsc --noEmit
# fuente: remotion-composer/public/demo-props/caso-marino-hvac.json (tras actualizar URLs a R2)
pct exec 128 -- bash -c 'cd /opt/openmontage/remotion-composer && npx remotion render src/index.tsx CasoMarinoHVAC out/caso-marino-hvac-master.mov --props=public/demo-props/caso-marino-hvac.json --codec=prores --prores-profile=hq --image-format=png --color-space=bt709'
# verificar: 1080 frames, 1080x1920, 24fps, ~45.0s exactos
```
Finishing: la escena `cold_open_technician` (i2v real) SI se beneficia de
grano/vignette (`FilmGrade` ya la envuelve en el TSX) — aplicar la misma
disciplina CRF16–18 en banda si se preserva grano horneado (ver P-01 del
registro de problemas: nunca `noise` uniforme sobre escenas de UI de fondo
plano). Audio: mismo patron acompressor+loudnorm que reel 2.

### Reel 4 — ComoSeConstruyeSinRomperNada (HIBRIDO, 2 pasos de render)
**Paso A — HyperFrames PRIMERO (bloque process_and_honesty):**
```bash
pct start 128   # si no esta ya arriba
pct exec 128 -- bash -c 'cd /opt/openmontage && git fetch origin && git checkout aetherlogik/reels-chatbot-serie && git pull'
pct exec 128 -- bash -c 'cd /opt/openmontage/hyperframes-compositions/proceso-y-honestidad && hf lint .'
# si el lint sale limpio (o tras corregir lo que marque):
pct exec 128 -- bash -c 'cd /opt/openmontage/hyperframes-compositions/proceso-y-honestidad && hf render -c index.html -o proceso-y-honestidad.mp4 --fps 24 --duration 30'
# verificar con ffprobe: 720 frames, 1080x1920, 24fps, 30.0s exactos
# archivar a R2: agency/reels-chatbot-serie/como-se-construye-sin-romper-nada/proceso-y-honestidad.mp4
```
Si `hf render` no acepta `--fps`/`--duration` como flags (verificar con
`hf render --help` en el CT — no se supuso la sintaxis exacta), la
duracion real la fijan los `animation-delay` del CSS (ultimo evento a
25.0s + 0.7s de animacion = fin real ~29.5s; el margen hasta 30.0s es hold
final) — ajustar el flag de duracion del render a 30.0s explicitamente.

**Paso B — actualiza el props JSON con la URL de R2 del paso A:**
Edita `remotion-composer/public/demo-props/como-se-construye-sin-romper-nada.json`,
campo `processAndHonestySrc` (hoy vacio a proposito).

**Paso C — render Remotion (bookends + composicion final):**
```bash
pct exec 128 -- bash -c 'cd /opt/openmontage/remotion-composer && npm install && npx tsc --noEmit -p .'
pct exec 128 -- bash -c 'cd /opt/openmontage/remotion-composer && npx remotion render src/index.tsx ComoSeConstruyeSinRomperNada out/como-se-construye-master.mov --props=public/demo-props/como-se-construye-sin-romper-nada.json --codec=prores --prores-profile=hq --image-format=png --color-space=bt709'
# verificar: 1080 frames, 1080x1920, 24fps, 45.0s exactos
```
Finishing: mismo patron acompressor+loudnorm; SIN `noise` (sin grano
horneado en este reel — ni el bloque HyperFrames ni los bookends de
tipografia lo usan).

## Verify-gate que corre video-producer tras cada render (los 3 reels)
1. `ffprobe` — duracion/resolucion/codec h264/audio real, comparado contra
   el frame-count declarado en cada `.tsx` (1104f/1080f/1080f).
2. `coherence_guard` sobre `cold_open_technician` sola (reel 3) contra los
   2 stills de referencia.
3. Extraer >=6 frames clave por reel y MIRARLOS (ember-only, boxless,
   tipografia legible, cierre) — incluyendo AL MENOS 1 frame dentro del
   bloque HyperFrames del reel 4.
4. `final_review` completo (technical/visual/audio/promise/subtitle).
5. Solo entonces: GO/NO-GO por reel, y limpieza de iteraciones
   defectuosas en R2/CT siguiendo la misma disciplina que dejo el piloto
   (ver P-05 del registro: nombrar la fuente por ruta exacta + tamano
   esperado en cada instruccion de re-render).
