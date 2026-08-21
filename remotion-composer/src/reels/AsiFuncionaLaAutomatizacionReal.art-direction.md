# Art-direction — "Asi funciona la automatizacion real de citas" (reel 2/4)

## Paleta y tipografia
Hereda el playbook de la serie sin modificarlo: near-black `#0A0A0A`,
superficie `#141414`, acento SOLO ember `#FF6B1A`, texto near-white
`#F5F5F5`, muted `#9AA0A6`. Inter para UI/headlines, JetBrains Mono para
timestamps. Sin cian/violeta/lavanda en ningun frame.

## Signature device (nuevo para este reel)
Este reel es **didactico** (3 pilares + escalacion), como el reel 2 de la
serie chatbot. Mismo signature device que probo GO alli: el **par
kicker-numerado + UI variable** — cada beat abre con "N . promesa" (mismo
tratamiento tipografico) pero el CONTENIDO visual cambia completamente
beat a beat (contador / tarjeta / sincronizacion multi-sede / handoff) —
la consistencia vive en el kicker, no en el visual repetido.

## Por que NO se reuso el mismo device 4 veces
De los 4 beats de contenido, 2 REUSAN devices ya GO'd de la serie anterior
(QuickReplyBeat para pilar 1, EscalateBeat para si_algo_falla) porque el
CONTENIDO genuinamente coincide (velocidad de respuesta / escalacion a
humano son la misma semantica que en la serie chatbot). ChatThreadBotReply
(pilar 2) tambien se reusa por la misma razon: el contenido SI es una
confirmacion de cita. El pilar 3 (sincronizacion entre sedes) es un caso
genuinamente NUEVO — ningun device existente cubre 'N ubicaciones
sincronizando a la vez' (los existentes son de UN solo hilo de
mensajeria) — por eso se construyo `ClinicSyncBoard` (ClinicSceneKit.tsx).

## Distinctness review
¿Podria ser el video de cualquier otro producto? No: cada beat esta atado
a un subtitulo EXACTO del post sobre citas clinicas (nunca generico
"features del producto"). ¿Reutiliza un look que ya hicimos? El lenguaje
visual de chat (burbujas, tarjeta, escalacion) es deliberadamente el
mismo de la serie chatbot — misma marca, mismo vocabulario visual de UI —
pero el pilar 3 (sincronizacion multi-sede) es un device 100% nuevo que
ninguna otra pieza de la agencia tiene todavia.