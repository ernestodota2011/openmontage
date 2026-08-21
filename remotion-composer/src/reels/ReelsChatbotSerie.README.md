# Serie "chatbot-whatsapp-para-negocios" — CERRADA, los 4 reels con GO (2026-08-21)

> [!success] Gate tecnico de la serie completa: CERRADO. Los 4 videos tienen
> verify GO (piloto + reel2 + reel3 + reel4). La publicacion en redes queda
> del lado de Ernesto — este documento es el sign-off tecnico final de
> `video-producer`, no una autorizacion de publicacion.

Continuacion del piloto GO'd `TresMensajesDeAnoche` (reel 1/4, rama
`aetherlogik/reel-tres-mensajes-de-anoche`, GO de Ernesto 2026-08-20). Esta
rama (`aetherlogik/reels-chatbot-serie`) parte de esa rama para heredar
`ChatThreadScene.tsx`, `theme.ts` y el resto del catalogo brand-safe.

## Los 4 videos — links + veredicto

| # | Reel | R2 | Duracion | Runtime | Veredicto |
|---|---|---|---|---|---|
| 1 | Tres mensajes de anoche (piloto) | `agency/tres-mensajes-de-anoche/tres-mensajes-de-anoche-v3.mp4` | 30.0s | Remotion | GO (Ernesto, 2026-08-20) |
| 2 | Que hace un chatbot real | `agency/reels-chatbot-serie/que-hace-un-chatbot-real-v2.mp4` | 46.0s | Remotion (100%) | GO (v1 NO-GO por legibilidad de encode → v2 GO) |
| 3 | Caso real: Marino HVAC | `agency/reels-chatbot-serie/caso-marino-hvac-v1.mp4` | 45.0s | Remotion (100%, 1 hero i2v real) | GO |
| 4 | Como se construye + cuando NO | `agency/reels-chatbot-serie/como-se-construye-v1.mp4` | 45.0s | HIBRIDO Remotion + HyperFrames | GO |

Todos servidos desde `https://media.aetherlogik.com/<ruta de arriba>`.

## Directriz de Ernesto aplicada y VERIFICADA en los 4 videos con evidencia cuantitativa
"El tono de la musica esta como que lento; seria bueno que fueran mas
movidos." Los 4 briefs de musica de la serie declaran BPM/energia
explicitos, y el tempo se **midio de forma independiente** sobre el audio
final de cada reel (autocorrelacion del envelope de energia, metodo propio
— sin libreria de deteccion de tempo dedicada):

| Reel | BPM declarado | BPM medido |
|---|---|---|
| 2 | 128 | 127.9 |
| 3 | 126 | 125.3 |
| 4 | 122 | 122.7 |

La directriz no solo se pidio en el prompt — se cumplio en el audio
publicado, en los 3 reels, dentro de menos de 1 BPM de margen cada vez.

## Presupuesto final
Costo real de assets generativos de la serie completa: **~$2.01 USD**
(reel2 $0.46 + reel3 $1.10 + reel4 $0.45), contra un techo de ~$25
declarado en la mision. Detalle linea por linea en el `assets_generated`
de cada `.gates.json`.

## La compuerta que atrapo 2 defectos reales antes de publicar
1. **Reel 2 v1 → NO-GO**: texto de UI (burbujas/tarjeta/insignia) crushed
   por la curva de finishing (punto `0.25/0.22` que aplastaba luma 60-120,
   justo donde vive texto pequeno). Mi primer diagnostico (bajar CRF) fue
   **incorrecto** — el CRF ya estaba en 16; devops reprodujo por efecto
   antes de aplicar mi receta y encontro la causa real. v2 → GO. Ver
   `Video-problemas.md` P-09.
2. **Reel 4 — `hf lint`**: 2 rondas de fix incompletas (arregle solo los
   errores nombrados, no el contrato completo) antes de consultar la doc
   oficial de `heygen-com/hyperframes` y agregar los 6 atributos
   no-negociables de una vez. Ver `Video-problemas.md` P-10 (con el
   contrato completo documentado para `skill-curator`).

Ninguno de los 2 se coló a publicacion — ambos se cazaron en el verify
antes del GO.

## Primer uso en produccion de HyperFrames — resultado
El bloque `process_and_honesty` del reel 4 (roadmap de 3 fases + checklist
de honestidad, 30s, el segmento con MAS texto de toda la serie) se
verifico con el mismo metodo region+control que el resto: legibilidad a la
par de los bookends Remotion (mean_top2%_luma 250.2 en el checklist vs
249.6-249.7 del control Remotion), paleta ember pura en pixeles
renderizados (91-98% de los pixeles saturados en banda ember, 0% cian/
violeta), e integracion visual sin friccion con el resto del catalogo
Remotion (misma tipografia/paleta/caracter de easing, sin salto en los
cortes de entrada/salida del bloque). `hf lint` 0/0, render 720/720 frames
en 42.5s (sin el impuesto de 45s — `data-no-timeline` funcionando).

## Handoffs pendientes
- **Ernesto**: decidir publicacion en redes (orden, cadencia, canales).
- Ninguno tecnico — los 4 videos estan verificados y listos.

## 📌 Para memoria (además de P-09/P-10 en `Video-problemas.md`)
- El contrato completo de atributos `#stage` de HyperFrames (6 atributos
  no-negociables + `data-no-timeline` condicional) queda documentado en
  `Video-problemas.md` P-10 para que `skill-curator` lo cablee a
  `aetherlogik-hyperframes`.
- La banda CRF 16-18 aplica tanto a grano horneado (P-01, piloto) como a
  texto de UI pequeño denso sobre near-black (P-08, esta serie) — pero
  ademas de eso, la curva de finishing (no solo el CRF) puede crushear la
  misma banda tonal — el diagnostico de un defecto de legibilidad de
  encode debe considerar TODO el pipeline de finishing, no solo el CRF
  (P-09).

---

## Apendice — instrucciones de render (historico, ya ejecutado por devops)

Las instrucciones originales de render (comandos exactos por reel, pasos A/B/C
del reel 4) que guiaron el trabajo de `devops-aetherlogik-homelab` para
producir los 4 archivos listados arriba quedan preservadas en el historial
de commits de este archivo (`git log -p -- remotion-composer/src/reels/ReelsChatbotSerie.README.md`)
para referencia de futuras series — ya no aplican como pasos pendientes.
