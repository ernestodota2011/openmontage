# Art Direction — "Tres mensajes de anoche" (piloto de la serie blog→reel, 2026-08-20)

## Por qué existe este reel
Es el PILOTO de una serie: convertir los tutoriales del blog de aetherlogik.com
en reels. Este primer reel es el **gancho** de la serie del post
`chatbot-whatsapp-para-negocios.md` — no intenta enseñar el tutorial completo,
vende la serie apuntando de vuelta al blog. Si funciona, se replica el mismo
molde para los demás tutoriales.

## Directriz de Ernesto (literal)
"No quiero videos con animaciones de los años 80; quiero animaciones nuevas,
explosivas, didácticas." Traducción operativa: tipografía cinética, UI de
WhatsApp animada como recurso DIDÁCTICO (no decorativo), cortes rítmicos,
0% Ken Burns/slideshow/stock genérico. Carril **atelier**, no templated.

## El principio: un mundo, una pantalla, el problema y la posibilidad
El reel tiene dos mitades sobre la MISMA pantalla de teléfono:
1. **El problema** (cold open + hilo de WhatsApp que se enfría + dato de los
   5 minutos).
2. **Lo posible** (el mismo hilo, resuelto por el bot en segundos).

No hay saltos de locación gratuitos — el cold open (dormitorio) entrega el
teléfono, y de ahí en más la "cámara" nunca sale de esa pantalla hasta el
cierre de marca. Esto es la aplicación directa del lever de coherencia
"cadena continua" (un mundo, el tiempo/estado cambia, no la escenografía).

## Mezcla asset-generado vs motion-autorado (decisión explícita)
Por la nota de realismo de la skill `aetherlogik-video`: los modelos
generativos de video hacen bien lo cinemático/atmosférico, pero la UI de
WhatsApp animada y la tipografía cinética salen mejor autoradas en Remotion.
Aquí:
- **Generado (fal, i2v real):** SOLO el cold open (persona dormida, brillo del
  celular, la mano que despierta y alcanza el teléfono). Es el único plano
  que necesita atmósfera/emoción fotorreal.
- **Autorado (Remotion, `ChatThreadScene.tsx` nuevo):** los 3 beats de la
  interfaz de chat (mensajes que llegan, el punch del mensaje perdido, la
  respuesta del bot con typing indicator + tarjeta de cita) + la tipografía
  cinética del dato + el cierre de marca.

## El signature device — un hilo de chat propio, NO un clon de WhatsApp
`ChatThreadScene.tsx` es deliberadamente **no** un mockup literal de
WhatsApp: nada de verde `#25D366` ni ticks azules. `brand_palette_guard`
rechaza cualquier matiz saturado fuera de la banda ember (ver
`lib/brand_palette_guard.py::classify_color`) — un verde de WhatsApp real
sería un `off_brand_color` CRÍTICO, no solo una preferencia estética. En su
lugar: burbujas neutras (`#141414`, sin color saturado), borde ember en el
lado del negocio, ticks/typing-indicator en ember. Es más distintivo que un
screenshot genérico y es exactamente el "signature device" que exige el modo
atelier — nuestra propia visualización de chat, reusable en el resto de la
serie.

## Excepción documentada al boxless — burbujas de chat
Una burbuja de chat necesita fondo sólido + esquinas redondeadas para leerse
como burbuja; eso dispara la advertencia `card_boxless` de
`brand_palette_guard` (severidad `warning`, NO `critical` — el guard mismo
distingue "esto es plástico/AI-slop" de "esto es un card"). Es una excepción
de **UI chrome**, acotada a las 3 burbujas y la tarjeta de cita — el resto de
la composición (headline, brand close, EmberThread) sigue 100% boxless. Ver
decisión d-006 en `TresMensajesDeAnoche.decision_log.json`.

## Cámara nombrada por escena
- Escena 1 (cold open): dolly-in lento y constante, eje fijo, 1.0→1.07 en
  6.0s, easing `EASING.camera` (cubic-bezier general de cámara/paneo).
- Escenas 2 y 5 (UI): micro-drift de cámara virtual (1.0→1.015 / 1.0→1.02)
  sobre la capa entera — nunca una tarjeta completamente estática, sin
  simular un movimiento de cámara real que no existe.
- Escena 3 (punch): la emoción viene del punch-in del propio texto/burbuja
  (`ChatThreadPunch`), sin mover una "cámara" sobre una interfaz plana —
  honesto sobre qué es (un zoom digital de edición, técnica real de montaje).
- Escena 6 (cierre): estática, hold deliberado — el cierre siempre se
  sostiene, no se mueve (regla de "silencio final" de premium-craft).

## EmberThread — aparece UNA sola vez
Puente de 0.5s entre `bot_responds` y `brand_close` — no es su propia
escena, cabalga el corte entre el demo y el cierre (misma disciplina que
`LaHoraRobadaV2`: si se repitiera en cada beat sería el
"hero-component-spine" que atelier prohíbe).

## Nota de transparencia sobre "atelier"
Igual que `LaHoraRobada(V2).art-direction.md`: esta composición reutiliza
infraestructura de marca propia ya vetada (`theme.ts`, `KineticHeadline`,
`EmberThread`, `BrandClose`, `FilmGrade`) — eso NO es el carril templated
(no hay `cut.type` JSON genérico ni `Explainer.tsx`); es una composición
bespoke, hand-authored por escena, con UN componente nuevo (`ChatThreadScene`)
escrito específicamente para este reel y reusable en el resto de la serie.

## Verificación real hecha en esta sesión (evidencia, no fe)
- `tsc --noEmit` sobre `remotion-composer`: **0 errores** (verificado con
  `npm install` + `npx tsc --noEmit -p .`, exit code 0).
- `slideshow_risk` sobre el `scene_plan.json` de las 6 escenas: **0.0/5,
  "strong"** en las 6 dimensiones.
- `variation_checker`: **0.0, "strong", 0 violaciones**.
- `delivery_promise` (promise_type `hybrid`): **motion_ratio 83.3%** (5 de 6
  cuts son movimiento real: 1 video + 4 animation; solo el stat_card no
  cuenta) — supera incluso el piso de 70% de `motion_led`, aunque el reel se
  clasifica honestamente como `hybrid` (mezcla cinematic + UI-demo).
- `brand_palette_guard` sobre el tema + paleta del chat UI declarados:
  **verdict "revise", 0 críticos, 3 warnings** — las 3 son `card_boxless` en
  las burbujas/tarjeta de cita, la excepción documentada arriba.
- **Assets generados y verificados visualmente** (ver
  `TresMensajesDeAnoche.gates.json` → `assets_generated` +
  `cold_open_visual_verification`): 2 stills 4K (Nano Banana Pro +
  Nano Banana Pro/edit para el hero-frame lock) + 1 clip i2v real (Kling O1
  Pro, first/last-frame) verificado con ffprobe + 3 frames extraídos y
  mirados directamente — movimiento continuo y motivado, identidad/cuarto/
  iluminación consistentes, cero cian/violeta, manos bien formadas.
- **Pendientes de render** (requieren el MP4 real, CT 128 vía devops):
  `coherence_guard` (drift de personaje/mundo sobre píxeles del render
  final) y `final_review` (ffprobe + frame-sampling + audio del render
  completo) — se corren en el handoff de verify posterior al render.

## Relacionadas
`TresMensajesDeAnoche.decision_log.json` · `TresMensajesDeAnoche.scene_plan.json` ·
`TresMensajesDeAnoche.gates.json` · `ChatThreadScene.tsx` ·
`LaHoraRobadaV2.art-direction.md` (precedente de cadena continua) ·
`lib/brand_palette_guard.py` · `lib/delivery_promise.py`.
