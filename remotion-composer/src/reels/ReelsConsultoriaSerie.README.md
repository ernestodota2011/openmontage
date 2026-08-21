# Serie "reels-consultoria-serie" — 8ª y ÚLTIMA serie de la línea `reels-del-blog`

> [!success] Veredicto: **GO 4/4** — re-verify final independiente sobre los `-v2.mp4` (2026-08-21)
> Los 4 reels fueron re-renderizados video-only por `devops-aetherlogik-homelab` (fix `accentWord`
> commit `1116b2e`, audio muxeado por copia de los `-v1.mp4` ya calibrados). El re-verify final
> INDEPENDIENTE de `video-producer` (descarga propia de R2 + `ffmpeg`/`ffprobe`/`python` locales,
> sin confiar en el reporte de devops) confirma:
> 1. **ffprobe de sanidad 4/4** — h264 1080×1920 24fps, AAC, duraciones exactas (30.0/37.0/34.0/35.0s).
> 2. **Los 4 frames del fix, en píxeles** — `reveal_30min` (reel 1, "Gratis.", t=14.0s), `ernesto_conduce`
>    (reel 2, "persona.", t=26.0s), `que_recibes` (reel 3, "plan:", t=9.0s), `reason` (reel 4, "real.",
>    t=7.0s): las 4 palabras se renderizan en **ember (#ff6b1a)**, no en blanco — el fix P-19 confirmado.
> 3. **CTA del reel 4 (t=31.0s), recorte+zoom 3×** — `cal.com/aetherlogik/discovery . agenda tu
>    diagnostico gratuito ->` intacto, centrado, márgenes simétricos, sin regresión.
> 4. **Sanity de audio (reel 1)** — `loudnorm` re-medido sobre el `-v2.mp4`: `-14.49 LUFS / -1.93 dBTP`,
>    **idéntico a 2 decimales al `-v1.mp4`** — confirma que el mux fue audio-only puro, sin re-mezcla.
>
> **Serie `reels-consultoria-serie`: GO 4/4. Línea `reels-del-blog`: GO 8/8 (32/32 reels).**

Fuente del blog: `consultoria-ia-gratuita-diagnostico-paso-a-paso.md` (D:\aetherlogik-astro) — el post del
**EMBUDO/CONVERSIÓN**: a diferencia de las 7 series anteriores (educativas), esta es la que lleva a **agendar**
el diagnóstico gratuito.

## Los 4 videos canónicos — link final para Drive

| # | Reel (composition id) | Tipo | Duración | Música (BPM decl./medido) | CTA | Objeto R2 canónico |
|---|---|---|---|---|---|---|
| 1 | `LoQueNoSabesDeTuNegocio` | Gancho | 30.0s | 128 / 127.7 | interno → reel 2 | `agency/reels-consultoria-serie/lo-que-no-sabes-de-tu-negocio-v2.mp4` |
| 2 | `AsiSonLosTreintaMinutos` | Didáctico (proceso, HyperFrames) | 37.0s | 132 / 133.3 | interno → reel 3 | `agency/reels-consultoria-serie/asi-son-los-treinta-minutos-v2.mp4` |
| 3 | `LoQueRecibesDespues` | Didáctico (caso real, Marino HVAC) | 34.0s | 124 / 125.0 | interno → reel 4 | `agency/reels-consultoria-serie/lo-que-recibes-despues-v2.mp4` |
| 4 | `PorQueEsGratisAgendaAhora` | Cierre — **CTA MÁS FUERTE de las 8 series** | 35.0s | 136 / 136.4 | **REAL: cal.com/aetherlogik/discovery** | `agency/reels-consultoria-serie/por-que-es-gratis-agenda-ahora-v2.mp4` |

**Los 4 canónicos son `-v2.mp4`** (los `-v1.mp4` quedaron descartados por el defecto P-19, ver limpieza abajo).

## Verify independiente ORIGINAL (v1, técnico/audio/coherencia/paleta/contenido/CTA — todo PASS salvo `accentWord`)

Ver el detalle completo del primer verify (ffprobe, LUFS/TP por 2 métodos, BPM medido, coherence_guard de
los 2 heroes i2v, escaneo HSV de paleta, beat-pixel-check de Marino HVAC, CTA de máximo rigor del reel 4,
`brand_close` centrado en los reels 1-3) en el historial de commits de este archivo
(`git log -p -- remotion-composer/src/reels/ReelsConsultoriaSerie.README.md`, commit `a60f5de`) y en el
bloque `post_render_verify` de cada `.gates.json`. Ese verify sigue vigente sin cambios — el re-verify de
esta sección solo re-confirma lo que el fix pudo haber tocado (los 4 frames del `accentWord` + el mux de
audio); no repite lo ya verificado y no modificado.

### Defecto encontrado y corregido — `accentWord` con puntuación (P-19)

En 4/4 reels, la palabra de acento (`accentWord` de `KineticHeadline`) se pasó CON puntuación pegada al texto
tal como aparece en la línea (`"Gratis."`, `"persona."`, `"plan:"`, `"real."`) — pero el componente compara la
palabra ya limpia de puntuación contra el prop SIN limpiar, así que el highlight ember nunca se aplicó (se
renderizó en blanco/near-white como el resto del texto). Fix pusheado (commit `1116b2e`, 4 props corregidos a
su forma sin puntuación). Re-renderizado video-only (mismo audio ya calibrado, muxeado por copia). Los 4
frames se re-verificaron en píxeles y confirman ember correcto — ver el bloque de arriba.

## Instrucción de limpieza para `devops-aetherlogik-homelab` — borrar los 4 `-v1.mp4` + purgar caché CF

> [!warning] Procedimiento estándar de la línea (mismo patrón ya ejecutado en P-13/P-15/P-18 de series anteriores)
> Los 4 `-v1.mp4` quedan **descartados** — su único defecto (`accentWord` sin pintar) ya está documentado en
> el `post_render_verify` de cada `.gates.json` y en `Video-problemas.md` P-19, así que no hay pérdida de
> trazabilidad al borrar los binarios.
>
> 1. Purgar caché de Cloudflare para las 4 URLs exactas (API de purge-by-URL, no purge-everything):
>    - `https://media.aetherlogik.com/agency/reels-consultoria-serie/lo-que-no-sabes-de-tu-negocio-v1.mp4`
>    - `https://media.aetherlogik.com/agency/reels-consultoria-serie/asi-son-los-treinta-minutos-v1.mp4`
>    - `https://media.aetherlogik.com/agency/reels-consultoria-serie/lo-que-recibes-despues-v1.mp4`
>    - `https://media.aetherlogik.com/agency/reels-consultoria-serie/por-que-es-gratis-agenda-ahora-v1.mp4`
> 2. Confirmar la purga (`curl -I` ya no trae `cf-cache-status: HIT` de un objeto viejo, o da 404 tras borrar).
> 3. Borrar los 4 objetos `-v1.mp4` del bucket R2 (recordatorio de la lección de `reels-hvac-serie`: **borrar del
>    bucket NO borra del edge de Cloudflare** — el orden es purga + borrado, nunca solo el segundo).
> 4. Los 4 `-v2.mp4` (canónicos) NO se tocan.

## Costos

Assets de pre-producción: **$2.78** (2 stills + 2 i2v + 4 música). Sin costo adicional en el ciclo de fix
(el fix fue texto/color, sin generación de assets nuevos).

## 📌 Para memoria

- **8ª y ÚLTIMA serie de la línea `reels-del-blog`, y la primera vez que `video-producer` encuentra Y corrige
  un defecto de su propia autoría en el verify final** (no un defecto de devops ni del componente compartido)
  — gotcha P-19 en `Video-problemas.md`: `accentWord` de `KineticHeadline` exige el prop SIN puntuación,
  aunque la palabra en el texto la lleve.
- Primera serie de la línea cuyo CTA final NO es interno — el reel 4 lleva la URL de agenda real
  (`cal.com/aetherlogik/discovery`), coherente con ser la serie del fondo de embudo — y pasó el verify de
  máximo rigor sin ningún hallazgo (el único defecto de la serie no tocó el CTA), confirmado sin regresión
  en el re-verify del `-v2.mp4`.
- El bloque HyperFrames (`asi-son-los-treinta-minutos-timeline`) es el 6º de la línea, con un device nuevo
  (barra de tiempo proporcional, no lista de nodos de peso igual) — confirmado legible en píxeles.
- **Línea `reels-del-blog` CERRADA — 8/8 series, 32/32 reels, GO final.** Ver
  `Video-Linea-Reels-Blog-Cierre.md` en la bóveda (enlazado desde `[[Video-problemas]]` y `[[video-producer]]`)
  para el resumen consolidado: fórmula ganadora, costos totales, y qué previno cada lección P-01..P-19.
