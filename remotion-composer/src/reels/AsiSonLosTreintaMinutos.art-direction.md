# Art-direction — "Asi son los 30 minutos" (reel 2/4, didactico)

## Paleta y tipografia
Hereda intacto el playbook de las 7 series anteriores (`#FF6B1A`/`#0A0A0A`,
`cubic-bezier(0.16,1,0.3,1)`). El clip HyperFrames usa los MISMOS
tokens que `theme.ts`/`EASING_CSS`, sin salto de estilo entre motores.

## Signature device — la barra de tiempo segmentada
El contenido central (las 3 fases del diagnostico) es un BLOQUE DENSO Y
SECUENCIAL (regla de la mision: "proceso paso a paso -> HyperFrames")
— se autora en HTML/CSS puro (`data-no-timeline`, sin GSAP): una barra
de progreso 0-30min con 3 segmentos proporcionales a la duracion real
de cada fase (33%/50%/17% = 10/15/5 minutos) que se rellenan en
cascada, mas 3 tarjetas boxless (tick ember + minutos + titulo +
detalle) debajo, sincronizadas con el relleno. Extiende (no repite) el
patron de checklist de nodos ya GO'd 6 veces — aqui el eje es TIEMPO,
no una lista de items sueltos, asi que el device visual (barra
segmentada) es nuevo pero construido con los mismos primitivos (ember
sobre near-black, boxless, cubic-bezier de la casa).

## Por que 0 escenas i2v
El presupuesto de "2 heroes i2v por serie" se reparte entre reel 1 y
reel 3 (ver decision_log d-002). Este reel es completamente
motion-autorado.

## Distinctness review
¿Podria ser el video de cualquier otro producto? No: los 3 rangos de
minutos (0-10/10-25/25-30) y sus descripciones son literales de la
seccion "Como transcurre la sesion de 30 minutos" del post, en el mismo
orden. ¿Reutiliza un look? El principio (checklist/timeline con nodos
ember iluminandose) es familiar de la linea, pero el DEVICE (barra de
tiempo proporcional real, no una lista de items del mismo peso visual)
es nuevo — comunica explicitamente que las fases NO duran lo mismo (10
vs 15 vs 5 minutos), que una lista plana no transmitiria.
