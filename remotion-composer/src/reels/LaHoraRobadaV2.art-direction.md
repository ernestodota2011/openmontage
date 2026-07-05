# Art Direction — "La hora robada" v2, cadena continua (2026-07-05)

## Por que existe un v2
Ernesto vio v1 y diagnostico correctamente: buena calidad de imagen, pero un
**montaje de 4 clips i2v independientes** -- personaje sin lock, vestuario
discontinuo (chaqueta tan->gris), 3 mundos sin relacion, movimiento generico.
Los gates existentes (brand_palette_guard/slideshow_risk/delivery_promise/
final_review) dieron GO sin medir NADA de eso -- meta-hallazgo que motivo
tanto este v2 como el gate nuevo `coherence_guard`. Doctrina completa:
`03_Cerebro_Tecnico/Doctrina-Video-Coherencia-SOTA-2026.md` (2 investigaciones
profundas verificadas adversarialmente).

## El principio: Approach A -- cadena continua
Un personaje, UN mundo, el TIEMPO cambia -- no la locacion. La MISMA mesa de
cocina en antes y despues. Lo que cambia es la temperatura de la luz (fria
neutra -> calida tungsteno) y quien esta presente, nunca el cuarto.

## Como se logro (las 7 palancas, aplicadas)
1. **Hero-frame primero:** KF-A (Nano Banana Pro, base) fija identidad y
   vestuario. KF-B y KF-C son ediciones de KF-A/KF-B (`nano-banana-pro/edit`)
   -- imagen > texto para el lock de personaje.
2. **First/last-frame interpolation (Kling O1):** Plano1 anima KF-A -> KF-B;
   Plano2 anima KF-B -> KF-C. El end-frame de Plano1 ES el start-frame de
   Plano2 -- cadena real, no dos clips sueltos que casualmente comparten tema.
3. **Sistema de identidad por largo:** reel corto -> reference-locked via
   edicion secuencial de imagen (no se justificaba un LoRA/entrenamiento para
   2 planos).
4. **Camara nombrada por plano:** Plano1 = dolly-in lento y constante, eje
   fijo, sin paneo. Plano2 = continuacion del mismo dolly-in pero decelerando
   (easing outQuart) hasta casi detenerse -- "la camara se asienta con la
   escena". Nunca "anima esta foto".
5. **Planeacion relacional:** los 2 planos se definieron uno respecto al otro
   (mismo espacio, arco de luz compartido, misma cadencia de camara) antes de
   generar un solo asset.
6. **Paleta 60/30/10 prependida a cada prompt de Kling O1** (60% near-black,
   30% piel/madera calidos, 10% acento -- frio neutro en Plano1, ember calido
   en Plano2) + exclusion explicita de otros colores cromaticos DENTRO del
   prompt positivo (Kling O1 no tiene `negative_prompt`). Nada se arreglo en
   post.
7. **EmberThread como puente, no como escena:** aparece UNA sola vez, 0.5s,
   cabalgando el corte fisico de archivo entre los 2 clips Kling O1 -- no es
   un salto a otro mundo, es una costura de luz sobre el mismo corte.

## Por que "luz fria" no rompe la regla de marca (cero cian/violeta)
La doctrina de marca prohibe ACENTOS saturados fuera de la banda ember. La
luz fria del Plano1 se especifico como **blanco-frio NEUTRO y desaturado**
(~5000K, tipo LED/fluorescente domestico), NUNCA azul/cian saturado --
`brand_palette_guard` permite explicitamente neutros (saturacion <= 0.18)
sin importar el matiz. Verificado con evidencia real: `coherence_guard`
corrido contra el render mide **saturacion 0.005 en el frame inicial de
Plano1** (practicamente gris/neutro, no azul) subiendo a 0.4-0.68 (banda
ember) hacia el final de cada plano -- exactamente el arco frio-neutro ->
calido-ember que se penso, medido con pixeles reales, no supuesto.

## El signature device -- EmberThread (disciplina sin cambios de v1)
Aparece UNA sola vez. Si se repitiera en cada corte seria el
"hero-component-spine" que la doctrina de atelier prohibe. Aqui su trabajo es
literalmente coser el corte de archivo entre 2 generaciones separadas de
Kling O1 -- sin el, la transicion narrativa seguiria funcionando (KF-B es
identico en ambos extremos), pero se perderia la metafora de la
"inteligencia invisible".

## Verificacion real (evidencia, no fe) -- 2026-07-05
- **coherence_guard** (nuevo, `lib/coherence_guard.py`) corrido contra el
  render real de ambos planos + los 3 keyframes de referencia: **PASS** en
  los 2 planos, 3 muestras cada uno. Ningun frame muestreado disparo el check
  de dominancia fria/azul ni el de similitud perceptual (dHash + histograma)
  contra sus keyframes. Scope honesto: caza drift GRUESO de paleta/mundo, NO
  verifica identidad facial fina (eso requiere un modelo de cara en GPU).
- **brand_palette_guard:** pass, 0 criticos, 0 warnings (sobre los props/tema
  declarados de esta composicion).
- **slideshow_risk:** promedio 0.17/5 -- "strong".
- **variation_checker:** score 0.0 -- "strong", 0 violaciones.
- **delivery_promise (motion_led):** motion_ratio 75% (3 de 4 cuts son
  movimiento real: video+animacion+video; solo BrandClose es text_card) >=
  70% requerido.
- Costo real: $2.006 (3 keyframes $0.45 + Plano1 7s Kling O1 Pro $0.784 +
  Plano2 6s Kling O1 Pro $0.672 + musica nueva Suno/PoYo $0.10) -- identico
  al estimado aprobado por Ernesto ($2.01).

## Nota de interpretacion de "atelier" (se mantiene igual que v1)
Ver `LaHoraRobada.art-direction.md` (v1) para la nota completa de
transparencia sobre por que esta composicion reutiliza `theme.ts` +
`KineticHeadline`/`EmberThread`/`BrandClose`/`FilmGrade` (infraestructura de
marca propia) sin violar el espiritu de atelier -- se mantiene identica para
v2: composicion bespoke hand-authored por plano, sin `cut.type` JSON, sin
`Explainer.tsx`.

## Relacionadas
`LaHoraRobada.tsx` (v1, sin tocar) · `LaHoraRobada.art-direction.md` (v1) ·
`lib/coherence_guard.py` (gate nuevo) ·
`03_Cerebro_Tecnico/Doctrina-Video-Coherencia-SOTA-2026.md`.
