# Serie "reels-hvac-serie" — verify final: **GO 4/4** (2026-08-21)

> [!tip] Veredicto de la serie: **GO** — los 4 reels listos para Drive/publicación
> Los 4 videos fueron renderizados por `devops-aetherlogik-homelab` (HEAD `cdcd483`; gate `npx remotion compositions` pasó; `tsc` 0; `hf lint` 0/0, bloque HyperFrames en 31.1s de render). El verify final INDEPENDIENTE de `video-producer` confirmó 2/4 reels limpios de entrada y 2/4 con `true peak` positivo post-AAC (clipping real) — devops re-muxeó el audio de esos 2 con más headroom (`TP=-2.0` pre-encode, técnica que yo mismo validé antes de instruirla) y el re-verify independiente del resultado confirma **4/4 GO**.

Quinta serie de la línea `reels-del-blog`. Fuente del blog:
`automatizar-facturacion-hvac-cuanto-pierdes.md` (D:\aetherlogik-astro).

## Los 4 videos canónicos — link final para Drive

| # | Reel | Objeto R2 canónico (usar ESTE, no el `-v1`) | Duración | LUFS | True Peak |
|---|---|---|---|---|---|
| 1 | Lo que te cuesta facturar a mano (gancho) | `agency/reels-hvac-serie/lo-que-te-cuesta-facturar-a-mano-v1.mp4` | 30.0s | -14.06 | -0.34 dBTP |
| 2 | Cómo funciona la automatización de facturación | `agency/reels-hvac-serie/como-funciona-la-automatizacion-de-facturacion-v1.mp4` | 46.0s | -14.02 | -1.49 dBTP |
| 3 | Los números de Marino HVAC (caso real) | `agency/reels-hvac-serie/los-numeros-de-marino-hvac-v2.mp4` | 45.0s | -14.11 | -1.71 dBTP |
| 4 | Lo que necesitas para automatizar (cierre) | `agency/reels-hvac-serie/lo-que-necesitas-para-automatizar-v2.mp4` | 45.0s | -13.57 | -1.87 dBTP |

Todos servidos desde `https://media.aetherlogik.com/<ruta de arriba>`,
`curl 200`, descargados y auditados byte-a-byte por `video-producer` de
forma independiente en cada pasada (no solo el reporte de devops). **Los
reels 1 y 2 se quedan en `-v1` (nunca tuvieron defecto — no confundir con
"desactualizados"); los reels 3 y 4 canónicos son los `-v2`.**

## Re-verify del re-mux de audio (v2) — independiente, coincide EXACTO con devops

| Reel | LUFS devops | LUFS medido | TP devops | TP medido | TP `astats` (sample peak, corroboración) |
|---|---|---|---|---|---|
| 3 (Marino HVAC) | -14.11 | **-14.11** | -1.71 dBTP | **-1.71 dBTP** | -1.751 dB |
| 4 (cierre) | -13.57 | **-13.57** | -1.87 dBTP | **-1.87 dBTP** | -1.871 dB |

Coincidencia exacta a 2 decimales en ambos, en LUFS y en true peak.
**Sanity de `-13.57` LUFS en el reel 4:** 0.43dB por encima del target
-14.0, dentro de la banda de tolerancia ±0.5 ya usada en el resto de la
serie (rango completo de los 4: -14.11 a -13.57, spread 0.54dB) y
consistente con las 4 series anteriores — **aceptable, no amerita otra
pasada**.

**Integridad de video verificada independientemente (no solo el hash MD5
que reportó devops — lo recalculé yo):** extraje el stream de video crudo
(h264, `-c:v copy`, sin re-encode) de cada `v1`/`v2` y los hasheé con MD5:

- `los-numeros-de-marino-hvac`: `v1`=`16a621f7636870b970dbb6ad5e1a4176` ·
  `v2`=`16a621f7636870b970dbb6ad5e1a4176` → **IDÉNTICO**.
- `lo-que-necesitas-para-automatizar`: `v1`=`5455d75457c67f56b2b9ffedcc09cbc4` ·
  `v2`=`5455d75457c67f56b2b9ffedcc09cbc4` → **IDÉNTICO**.

Confirma que el re-mux fue audio-only puro; el video (ya verificado
visualmente limpio en el pase anterior: coherence, paleta, `brand_close`,
atribución en el mismo frame) no se tocó.

## Decisión de limpieza — borrar los 2 `-v1` defectuosos, PURGAR CACHÉ DE CLOUDFLARE (no solo el bucket)

> [!danger] Lección de hoy: borrar del bucket R2 NO borra del edge de Cloudflare
> Si alguien (Ernesto, un scheduler, un sync de Drive) tiene guardada la URL vieja `-v1.mp4` de los reels 3/4, y el objeto se borra SOLO del bucket, Cloudflare puede seguir sirviendo la copia defectuosa (clipeada) desde caché de edge hasta que expire por su cuenta — el usuario nunca ve un 404 que le avise que algo cambió, ve el audio malo servido con 200. El borrado tiene que ser bucket + purga de caché, en ese orden o combinados, nunca solo el primero.

**Instrucción para devops:**
1. Purgar caché de Cloudflare para las 2 URLs exactas (API de purge-by-URL,
   no purge-everything):
   - `https://media.aetherlogik.com/agency/reels-hvac-serie/los-numeros-de-marino-hvac-v1.mp4`
   - `https://media.aetherlogik.com/agency/reels-hvac-serie/lo-que-necesitas-para-automatizar-v1.mp4`
2. Tras confirmar la purga (verificar con `curl -I` que la respuesta ya no
   trae `cf-cache-status: HIT` de un objeto viejo, o que da 404 una vez
   borrado el objeto), borrar los 2 objetos `-v1` del bucket R2.
3. Los `-v1` de los reels 1 y 2 **NO se tocan** — nunca tuvieron defecto,
   son los canónicos de esos dos.
4. No hay pérdida de trazabilidad al borrar: el historial completo (qué
   tenía mal el audio, cuándo se detectó, cómo se arregló, los números
   antes/después) ya vive en git (`gates.json.post_render_verify` +
   `post_render_verify_v2` + este README), igual que el precedente de
   limpieza de P-13 en `reels-inmobiliarios-serie`.

## Handoffs pendientes

- **devops-aetherlogik-homelab**: purgar caché CF de las 2 URLs `-v1` de
  reels 3/4 (ver arriba) → borrar esos 2 objetos del bucket.
- **Ernesto / quien suba a Drive**: usar la tabla "Los 4 videos canónicos"
  de arriba — reels 1/2 en `-v1`, reels 3/4 en `-v2`.
- **skill-curator**: P-15 (true-peak-positivo-post-AAC, técnica de fix con
  headroom `TP=-2.0`) y P-16 (nombres genéricos de intermedios en `out/`
  compartido entre series en el CT 128 — ver `Video-problemas.md`) ambas
  PENDIENTES de curaduría, listas para incorporarse a
  `premium-craft-standards.md`/`aetherlogik-homelab-ops`.

## 📌 Para memoria (finales)

- Primera vez en la línea `reels-del-blog` que el defecto del verify final
  es de **audio** (no de layout como P-13) y primera vez que se resuelve
  en un ciclo de re-mux audio-only sin tocar video, verificado con MD5 del
  stream crudo — más barato y más seguro que un re-render completo cuando
  el video ya pasó su propio verify.
- El "downmix mono + resample" de una primera extracción de audio para
  simular el fix dio una medición de LUFS completamente distinta (-17.6
  vs -14.0 real) — recordatorio de que el método de extracción cambia la
  medición (mono downmix ≠ estéreo original para BS.1770).
- El diagnóstico de "neon vs sombra" en el escaneo de paleta (segundo
  umbral saturación+valor) evitó declarar NO-GO por un falso positivo en
  los heroes i2v.
- **Borrar del bucket no borra del edge** — toda limpieza de un asset
  público de R2/CF de aquí en adelante lleva purga de caché explícita por
  URL, no solo el DELETE del objeto (P-16 candidato adicional si se repite
  en otra serie).
- Serie completa GO 4/4 — quinta consecutiva de la línea `reels-del-blog`
  que cierra limpia (contando el ciclo de fix de esta), con el mismo rigor
  de verificación independiente que las 4 anteriores.

---

## Apéndice — handoff histórico de pre-producción y primer verify (ya ejecutados)

Las instrucciones originales de pre-producción (estructura de 4 reels,
manifiesto de assets, recipe de finishing, comandos de render, el gate
`npx remotion compositions`) y el primer verify (NO-GO v1 por true peak,
con la tabla de simulación del fix) quedan preservadas en el historial de
commits de este archivo (`git log -p -- remotion-composer/src/reels/ReelsHvacSerie.README.md`)
para referencia — ya no aplican como pasos pendientes.
