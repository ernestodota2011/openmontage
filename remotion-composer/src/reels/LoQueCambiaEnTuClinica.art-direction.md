# Art-direction — "Lo que cambia en tu clinica (y el numero que lo respalda)" (reel 4/4, cierre)

## Paleta y tipografia
Hereda el playbook de la serie sin modificarlo, INCLUIDO dentro del CSS de
HyperFrames (mismos hex hardcodeados como variables: `--bg:#0A0A0A`,
`--accent:#FF6B1A`, `--text:#F5F5F5`, `--muted:#9AA0A6`) para que el clip
HyperFrames se integre sin friccion visual con el resto del catalogo
Remotion. Sin cian/violeta/lavanda en ningun frame, en ninguno de los 2
motores.

## Los 3 ejes — runtime HIBRIDO (presentado explicito, no default en silencio)
Per la regla dura de la plataforma ("Present Both Composition Runtimes"),
se evaluaron:
- **render_runtime=remotion puro**: forzar el checklist de 4 items dentro
  del catalogo Remotion existente (TagRevealList u otro). Descartado: el
  contenido es un ROADMAP/CHECKLIST operativo, no una cascada de mensajes
  ni una tarjeta de cita — TagRevealList ya se uso 2 veces en la serie
  (reels 1 y 3) para listas distintas; un tercer uso identico habria sido
  el patron "hero-component-spine" que la doctrina prohibe.
- **render_runtime=hyperframes puro**: mover TODO el reel a HyperFrames.
  Descartado: el hero i2v NO EXISTE en este reel (0 escenas i2v), pero el
  resto (cold_open, benchmark, recap, brand_close) SI reutiliza
  componentes Remotion ya GO'd (KineticHeadline, StatReveal, BrandClose) —
  reconstruirlos en HTML/CSS habria duplicado trabajo sin ganar nada.
- **ELEGIDO — render_runtime=HIBRIDO**: el bloque `checklist_operacion`
  (el mas denso de texto de la serie, 20s) se autora en HyperFrames y se
  compone como UN clip MP4 dentro del Remotion principal (mismo patron ya
  probado y GO'd en `ComoSeConstruyeSinRomperNada.tsx` de la serie
  anterior, reel 4/4 tambien).

## Contrato HyperFrames aplicado preventivamente (lecciones P-09/P-10)
La composicion `que-cambia-en-tu-clinica/index.html` se escribio aplicando
DESDE EL PRIMER DRAFT el contrato completo documentado en
`Video-problemas.md` P-10 (6 atributos no-negociables del `#stage` +
`data-no-timeline` por ser 100% CSS sin GSAP) — no se espera a que `hf
lint` nombre los errores uno por uno, se aplica el contrato completo de
una vez (la leccion explicita de P-10).

## Distinctness review
¿Podria ser el video de cualquier otro producto? No: el checklist cita
los 4 encabezados EXACTOS de la seccion 'Lo que cambia en la operacion
diaria' del post. ¿Reutiliza un look que ya hicimos? El patron
Remotion+HyperFrames hibrido es el MISMO de `ComoSeConstruyeSinRomperNada`
(deliberado, mismo motivo tecnico: bloque de texto denso), pero el
contenido del checklist es 100% especifico de este post — nada se copia
literal, solo el metodo de composicion.