# Serie "reels-consultoria-serie" — 8ª y ÚLTIMA serie de la línea `reels-del-blog`

> [!warning] Veredicto: **NO-GO (dirigido)** — 1 solo defecto encontrado, fix ya pusheado, falta re-render de video (2026-08-21)
> Los 4 reels fueron renderizados por `devops-aetherlogik-homelab` (HEAD `ff2e7d5`; gate `npx remotion compositions`
> pasó; `tsc` 0; `hf lint` 0/0, bloque HyperFrames en 28s). El verify final INDEPENDIENTE de `video-producer`
> (descarga propia de R2 + `ffmpeg`/`ffprobe`/`python` locales, sin confiar en el reporte de devops) confirma
> **técnico/audio/coherencia/paleta/contenido/CTA todo PASS** — pero encontró **1 defecto sistémico de autoría**
> (no de devops, no del componente compartido): en los 4 reels, la palabra de acento ember (`accentWord`) nunca
> se pintó de ember porque se pasó CON puntuación pegada (`"Gratis."`, `"persona."`, `"plan:"`, `"real."`) —
> `KineticHeadline` limpia la puntuación de la palabra antes de comparar pero NO limpia el prop, así que la
> comparación nunca coincide y el highlight silenciosamente no aplica. **El fix ya está pusheado** (commit
> `1116b2e`, 4 líneas, sin puntuación) — falta que devops re-renderice el video (el audio NO cambia, ya está en
> banda). Ver `Video-problemas.md` P-19 para el detalle completo del hallazgo.

Fuente del blog: `consultoria-ia-gratuita-diagnostico-paso-a-paso.md` (D:\aetherlogik-astro) — el post del
**EMBUDO/CONVERSIÓN**: a diferencia de las 7 series anteriores (educativas), esta es la que lleva a **agendar**
el diagnóstico gratuito.

## Los 4 reels

| # | Reel (composition id) | Tipo | Duración | Música (BPM decl./medido) | CTA |
|---|---|---|---|---|---|
| 1 | `LoQueNoSabesDeTuNegocio` | Gancho | 30.0s | 128 / 127.7 | interno → reel 2 |
| 2 | `AsiSonLosTreintaMinutos` | Didáctico (proceso, HyperFrames) | 37.0s | 132 / 133.3 | interno → reel 3 |
| 3 | `LoQueRecibesDespues` | Didáctico (caso real, Marino HVAC) | 34.0s | 124 / 125.0 | interno → reel 4 |
| 4 | `PorQueEsGratisAgendaAhora` | Cierre — **CTA MÁS FUERTE de las 8 series** | 35.0s | 136 / 136.4 | **REAL: cal.com/aetherlogik/discovery** |

## Verify independiente — detalle por reel

### Técnico (ffprobe, re-medido) — 4/4 PASS
Los 4: h264, 1080×1920, 24fps, aac 48000Hz estéreo. Duraciones EXACTAS: 30.0/37.0/34.0/35.0s, `curl` 200 en los 4.

### Audio (LUFS/TP, re-medido con `loudnorm` + corroborado con `astats`) — 4/4 PASS

| Reel | LUFS medido | TP medido | TP `astats` | Veredicto TP | BPM decl. | BPM medido | Δ |
|---|---|---|---|---|---|---|---|
| 1 | -14.49 | -1.93 | -1.933 dB | pass | 128 | 127.7 | 0.3 |
| 2 | -14.03 | **-1.05** | -1.114 dB | **pass — margen más ajustado de la serie (0.05dB), CONFIRMADO ≤ -1.0 por 2 métodos** | 132 | 133.3 | 1.3 |
| 3 | -14.07 | -1.82 | -1.821 dB | pass | 124 | 125.0 | 1.0 |
| 4 | -13.63 | -1.11 | -1.336 dB | pass | 136 | 136.4 | 0.4 |

Los 4 en banda -14±0.5 LUFS, los 4 con true peak negativo y ≤ -1.0 dBTP. El reel 2 (el que el coordinador marcó
"ojo") queda confirmado dentro de banda por medición independiente, con el margen más ajustado de la serie
(0.05dB) — recomendación para futuras series del catálogo: re-mux con `TP=-2.0` desde el primer pase (doctrina
P-15) habría dado más colchón.

### Coherencia entre planos (los 2 heroes i2v — reels 1 y 3)
- **Reel 1** (`cold_open_hero`, 2.5s/4.9s): mismo personaje, mismo escritorio/lámpara/estantería/papeles, luz
  tungsteno consistente, push-in leve, sin drift. **Pass.**
- **Reel 3** (`cold_open_hero`, 1.0s/4.5s): mismo personaje, mismo taller/estantería de cobre/van HVAC, luz
  golden-hour consistente, push-in leve, sin drift. **Pass.**

### Paleta (escaneo programático HSV)
0.0% cian/violeta en los 4 reels salvo el hero del reel 3 (1.57%/0.86% — tonos naturales de cielo/sombra de la
foto golden-hour, mismo patrón ya explicado y aceptado en `reels-ia-miami-serie`, muy por debajo de umbral neón).
Sin cards, sin glow, sin lavanda/violeta en ningún frame. **Pass en los 4.**

### Beat-pixel-check ($4,400 de Marino con atribución, reel 3, t=15.0s)
"$4,400/mes" + "recuperados en facturación, más 9 horas libres por semana" + "Marino HVAC, Miami . estimación de
AetherLogik a partir de los datos del cliente." — los tres en el MISMO frame, confirmado en píxeles reales
(no solo en el código). Cifra idéntica al mismo caso ya usado en `reels-hvac-serie` y `reels-ia-miami-serie`.
**Pass.**

### Barra de 30 minutos legible (reel 2, HyperFrames, t=13.0s/22.5s)
Barra de tiempo 0→30min con 3 segmentos proporcionales (33%/50%/17% = 10/15/5 min) rellenándose en cascada + 3
tarjetas con minutos+título+detalle, todo legible, literal a la sección "Cómo transcurre la sesión de 30
minutos" del post. **Pass.**

### CTA de agenda del reel 4 — MÁXIMO RIGOR (promesa comercial de la agencia)
- `objections_beat` (t=16.0s): las 3 reassurances ("Tarjeta de crédito → No se pide.", "Compromiso → Ninguno.",
  "Si no hay buen fit → Te lo decimos directo.") literales del post. **Pass.**
- `cal_final` (t=22.0s): "30 min" + "eliges un horario. Ernesto te llama exactamente a esa hora." — literal de
  la mecánica de agenda del post. **Pass.**
- `brand_close_cta` (t=31.0s, recorte+ampliación 3× de la banda de texto): "cal.com/aetherlogik/discovery .
  agenda tu diagnostico gratuito ->" — coincide EXACTO con el link real del cierre del post, centrado, márgenes
  simétricos en las 2 líneas, sin bleed. **Pass.**
- **Fidelidad del proceso completo vs. lo que el post promete**: confirmado — cada elemento mostrado en la serie
  (30 min gratis, las 3 fases con sus rangos exactos de minutos, sin tarjeta/sin compromiso, honestidad si no
  hay fit, mecánica de agenda) es literal o parafraseo directo del post, sin ningún embellecimiento. **Pass.**

### `brand_close` centrado (reels 1, 2 y 3 — confirma que el fix P-13 sigue vigente)
Los 3 `brand_close` internos se recortaron+ampliaron 3×: texto centrado, márgenes simétricos en ambos lados, sin
bleed en ninguno — el fix de P-13 (`BrandClose.tsx`, componente compartido) sigue vigente sin regresión en esta
8ª serie.

### Defecto encontrado — `accentWord` con puntuación (P-19, nuevo)
En 4/4 reels, la palabra de acento (`accentWord` de `KineticHeadline`) se pasó CON puntuación pegada al texto
tal como aparece en la línea (`"Gratis."`, `"persona."`, `"plan:"`, `"real."`) — pero el componente compara la
palabra ya limpia de puntuación contra el prop SIN limpiar, así que el highlight ember nunca se aplicó (se
renderizó en blanco/near-white como el resto del texto). Confirmado en píxeles en los 4 casos:
`reveal_30min` (reel 1, "Gratis."), `ernesto_conduce` (reel 2, "persona."), `que_recibes` (reel 3, "plan:"),
`reason` (reel 4, "real."). **NO** es una violación del `brand_palette_guard` (no aparece ningún color
prohibido), **NO** afecta ninguna cifra/claim, y **NO** toca el CTA del reel 4 en sí (`brand_close_cta` usa
`accentColor` directo sobre el `<div>` del `url`, no el mecanismo `accentWord`) — pero es un defecto real de
craft que silenciaba el acento ember justo en 4 palabras clave de la serie, incluida "Gratis." del gancho.
Fix pusheado (commit `1116b2e`, 4 props corregidos a su forma sin puntuación) — **video-producer decidió no
declarar GO con un defecto conocido y trivialmente arreglable en la ÚLTIMA serie de la línea**, siguiendo el
mismo criterio ya aplicado en P-13 (no se ship-ea un defecto de craft conocido cuando el fix es barato).

## Handoff a devops-aetherlogik-homelab — re-render dirigido (video-only)

1. `git pull` en `aetherlogik/reels-consultoria-serie` (HEAD `a60f5de` o posterior — trae el fix `1116b2e`).
2. Re-renderizar SOLO el video de los 4 reels (mismos comandos ProRes del Paso 3 original, mismos `props/*.json`
   — no cambia ningún asset ni audio):
   ```bash
   npx remotion render src/index.tsx LoQueNoSabesDeTuNegocio out/lo-que-no-sabes-de-tu-negocio-master-v2.mov --props=./props/lo-que-no-sabes-de-tu-negocio.json --codec=prores --prores-profile=hq --image-format=png --color-space=bt709
   npx remotion render src/index.tsx AsiSonLosTreintaMinutos out/asi-son-los-treinta-minutos-master-v2.mov --props=./props/asi-son-los-treinta-minutos.json --codec=prores --prores-profile=hq --image-format=png --color-space=bt709
   npx remotion render src/index.tsx LoQueRecibesDespues out/lo-que-recibes-despues-master-v2.mov --props=./props/lo-que-recibes-despues.json --codec=prores --prores-profile=hq --image-format=png --color-space=bt709
   npx remotion render src/index.tsx PorQueEsGratisAgendaAhora out/por-que-es-gratis-agenda-ahora-master-v2.mov --props=./props/por-que-es-gratis-agenda-ahora.json --codec=prores --prores-profile=hq --image-format=png --color-space=bt709
   ```
3. Finishing FFmpeg: **reusar el mismo audio ya calibrado** de cada `-v1.mp4` (extraerlo con `-c:a copy` del v1,
   NO volver a medir/mezclar loudnorm — el mix de audio no cambió) y aplicar SOLO la cadena de video (curva +
   eq + unsharp + vignette + CRF16 + aq-mode) sobre el master v2, luego mux con el audio del v1:
   ```bash
   ffmpeg -i <master-v2>.mov -i <v1>.mp4 -vf "curves=all='0/0.045 0.75/0.78 1/0.96',eq=saturation=0.92:contrast=1.06:gamma=1.0,unsharp=5:5:0.4:5:5:0.0,vignette=angle=PI/5" -map 0:v -map 1:a -c:v libx264 -crf 16 -preset slow -x264-params aq-mode=2:aq-strength=1.2 -c:a copy <slug>-v2.mp4
   ```
4. Subir a R2 en `agency/reels-consultoria-serie/<slug>-v2.mp4` (los `-v1` NO se borran hasta que
   `video-producer` confirme el v2 — mismo protocolo que P-13).
5. `video-producer` re-verifica SOLO los 4 frames afectados (14.0s/reel1, ~26s/reel2, ~9s/reel3, ~7s/reel4 —
   los timestamps exactos de `reveal_30min`/`ernesto_conduce`/`que_recibes`/`reason`) + un `ffprobe` de sanidad
   (duración/audio idénticos al v1) y emite el **GO final de la serie y de la línea completa (8/8)**.

## Costos

Assets de pre-producción: **$2.78** (2 stills + 2 i2v + 4 música). Sin costo adicional en este ciclo de fix
(no se generó ningún asset nuevo, solo texto/color).

## 📌 Para memoria (parciales — el cierre final de línea queda pendiente del v2)

- **8ª y ÚLTIMA serie de la línea `reels-del-blog`** — primera vez que el propio `video-producer` encuentra Y
  corrige un defecto de su propia autoría en el verify final (no un defecto de devops ni del componente
  compartido) — nuevo gotcha P-19 en `Video-problemas.md`: `accentWord` de `KineticHeadline` exige el prop SIN
  puntuación, aunque la palabra en el texto la lleve.
- Primera serie de la línea cuyo CTA final NO es interno — el reel 4 lleva la URL de agenda real
  (`cal.com/aetherlogik/discovery`), coherente con ser la serie del fondo de embudo — y pasó el verify de
  máximo rigor sin ningún hallazgo (el único defecto de la serie no toca el CTA).
- El bloque HyperFrames (`asi-son-los-treinta-minutos-timeline`) es el 6º de la línea, con un device nuevo
  (barra de tiempo proporcional, no lista de nodos de peso igual) — confirmado legible en píxeles.
