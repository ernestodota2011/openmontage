# Art-direction — "Como se construye + cuando NO tiene sentido" (reel 4/4)

## Paleta y tipografia
Mismo playbook ember-only de toda la serie. La composicion HyperFrames
replica los tokens EXACTOS de `theme.ts` (`--bg:#0A0A0A`,
`--accent:#FF6B1A`, `--text:#F5F5F5`, `--muted:#9AA0A6`,
`cubic-bezier(0.16,1,0.3,1)`) para que el clip compuesto no se note como
un motor distinto — misma disciplina que exige el guard de marca, ahora
aplicada a un segundo runtime.

## Signature device (nuevo, unico de este reel: roadmap + checklist)
Un track vertical de 3 nodos que se iluminan en secuencia (Fase 1/2/3),
seguido de un checklist boxless de 3 renglones para "cuando NO tiene
sentido". Ningun otro reel de la serie usa una estructura de roadmap — es
el unico device compartido entre los DOS bloques de este reel (proceso Y
honestidad viven en la MISMA gramatica visual, reforzando que son una sola
idea: el proceso incluye decir que no).

## Por que HyperFrames aqui y en ningun otro reel de la serie
Se evaluaron los 2 runtimes candidatos explicitamente (regla dura del
AGENT_GUIDE: "Present Both Composition Runtimes"):
- **Remotion**: el catalogo existente no tiene NINGUN componente de
  roadmap/timeline de fases (KPIGrid es para metricas numericas,
  ComparisonCard es para dos columnas, ninguno modela una secuencia
  narrativa de 3 pasos con nodos que se iluminan). Construirlo en Remotion
  habria significado escribir practicamente el mismo layout en
  React+spring en vez de HTML+CSS — sin ninguna ventaja real, dado que el
  contenido es 100% declarativo (texto + estados on/off), el caso de uso
  de libro de HyperFrames.
- **HyperFrames**: exactamente el caso que la skill aetherlogik-hyperframes
  senala como suyo ("mockup de app, dashboards, graficos/diagramas
  didacticos"). CSS puro (`data-no-timeline`, sin GSAP) es suficiente para
  esta composicion — no hace falta el poder de un timeline de GSAP para 6
  reveals secuenciales con delays fijos.
**Decision:** HyperFrames para ESTE bloque unicamente. El resto del reel
(cold_open_hook, human_line, brand_close) se queda en Remotion, igual que
toda la serie — fragmentar el pipeline de render a mas de un runtime por
reel solo se justifica cuando el contenido lo pide, no por default.

## Distinctness review
¿Podria ser el video de cualquier otro producto? El roadmap cita las 3
fases EXACTAS del post (Captura basica / Calificacion / Integracion) y el
checklist cita los 3 casos EXACTOS de "cuando no tiene sentido" — no es un
roadmap generico. ¿Reutiliza un look ya hecho? No: es el unico reel de la
serie (y de toda la produccion hasta hoy) que usa HyperFrames.
