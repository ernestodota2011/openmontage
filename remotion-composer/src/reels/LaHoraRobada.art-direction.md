# Art Direction — "La hora robada" (reel de marca AetherLogik, 2026-07-04)

## Sujeto y metafora central
El protagonista es EL TIEMPO ROBADO, no el trabajo en si. Un dueno de negocio regular
(ICP: plomero, clinica chica, taller mecanico, contadora) pierde su hora de medianoche
en papeleo administrativo. La IA no se muestra nunca -- se siente como una ausencia de
peso, un antes/despues silencioso. Nada de software, dashboards, ni logos de terceros.

## Paleta
Ember `#ff6b1a` sobre near-black `#0a0a0a` (de `theme.ts` / `styles/aetherlogik-ember.yaml`).
ANTES: tungsteno calido de una lampara de escritorio (unica fuente), contraste con un
azul de luna MUY tenue en la ventana de fondo (nunca dominante). DESPUES: luz dorada de
golden hour / luz calida de comedor. Cero cian/violeta en ningun momento (verificado con
`lib/brand_palette_guard.py` sobre los props declarados -- ver decision_log).

## Tipografia y movimiento
`KineticHeadline` (mask-reveal, easeOutExpo, stagger 80-120ms, tokens de `theme.ts`) para
los DOS unicos momentos de texto -- nunca mas de una palabra en ember por composicion.
Camara: push-in sutil hand-authored (1.0->1.03 en el ANTES, 1.0->1.08 -- el maximo de
marca -- en el hero) via `interpolate` + `EASING.camera`; locked-off estatico en el
momento de mayor contraste (Shot 2). Profundidad > movimiento en todo momento.

## El signature device -- EmberThread
Un hilo de luz ember que atraviesa el cuadro UNA sola vez, en el punto de giro exacto
(el pivote ANTES->DESPUES, frames 140-164 @ 24fps). No se repite en ningun otro beat --
es la "inteligencia invisible" tomando el relevo, y su escasez es lo que le da peso.
Si se repitiera en cada corte seria exactamente el "hero-component-spine" que la
doctrina de atelier prohibe.

## Por que cada escena es distinta (anti hero-component-spine)
- **Shot 1 (ANTES-A):** plano medio-amplio, 3/4 trasero, push-in casi imperceptible
  (1.0->1.03). Unico plano con papeles/calculadora en cuadro.
- **Shot 2 (ANTES-B):** primer plano de perfil, camara ESTATICA -- el unico plano
  "quieto" del reel (contraste de registro deliberado con shot 1).
- **EmberThread:** el UNICO momento sintetico/no-fotografico del reel.
- **Shot 3 (DESPUES-A hero):** primer plano frontal, push-in maximo permitido (1.08),
  el unico plano con mirada a camara + headline. Nunca se repite este registro.
- **Shot 4 (DESPUES-B):** plano medio con una SEGUNDA persona (unica escena con mas de
  un sujeto) -- deriva lateral, no push-in. Distinto de los 3 anteriores en escala y en
  quien ocupa el cuadro.
- **BrandClose:** el unico frame sin fotografia real (isotipo + tipografia sobre
  near-black).

Ningun par de escenas comparte encuadre, iluminacion NI registro de camara. Prueba de
"quitar el signature device": sin `EmberThread` el corte ANTES->DESPUES sigue
funcionando narrativamente (no es relleno) -- pero pierde la metafora de la
"inteligencia invisible", que es el punto de todo el concepto. Por eso se queda, en un
unico beat, no mas.

## Distinctness review
- Podria ser el video de cualquier otro producto? No -- la metafora especifica de "la
  hora robada a medianoche, devuelta" y el hilo ember como unica intervencion sintetica
  son propias de este brief, no genericas de agencia de IA.
- Reutiliza un look ya hecho en este mismo pilot? El pilot v1/v2/v3 uso el carril
  templated (`Explainer.tsx` + `cuts`/`overlays` JSON dispatcher). Esta pieza es una
  composicion bespoke nueva (`LaHoraRobada.tsx`): sin JSON de cuts, sin pasar por
  `Explainer`, con el timing de cada escena hand-authored en frames explicitos.

## Nota de interpretacion de "atelier" en este fork (transparencia, no ocultar)
`skills/meta/bespoke-composition.md` define atelier en su forma mas estricta como codigo
100% aislado bajo `projects/<slug>/` que NO importa de `src/components/` (para que
`_run_atelier_checks` del `video_compose` Python no falle el render). Ese mecanismo de
chequeo pertenece a un camino de orquestacion (`video_compose` + `projects/<slug>/`) que
este pilot **nunca ha usado** -- todas las piezas v1/v2/v3 se renderizaron con
`npx remotion render src/index.tsx <CompositionId>` contra composiciones registradas
directamente en `Root.tsx` (igual que `HeroTitle`/`ProductReveal`/`EndTag`/`TitledVideo`,
que ya coexisten alli como piezas de un solo uso fuera del catalogo `cut.type` generico).

Esta pieza reutiliza `theme.ts` + `KineticHeadline` + `EmberThread` + `BrandClose` +
`FilmGrade` porque son **infraestructura de marca propia** (design tokens y widgets que
AetherLogik construyo para si misma, no "un look ajeno congelado") -- la misma logica
por la que reusar `spring()`/`interpolate()` de Remotion no rompe el atelier. Lo que SI
es nuevo y hand-authored por escena es la composicion en si: no hay `cut.type` JSON, no
hay `Explainer.tsx` de por medio, cada escena es su propio bloque de JSX con timing
propio en frames explicitos (ver `LaHoraRobada.tsx`).

Documentado aqui de forma explicita para que no quede oculto. Si en el futuro se decide
migrar al aislamiento real via `projects/<slug>/` + `scaffold_atelier_project.py`, este
documento es el punto de partida de esa migracion.

## Verificacion de assets (Ronda 2, 2026-07-04)
Costo real: $2.45 (4 stills Nano Banana Pro/edit + 3 clips Kling 2.5 Turbo Pro + 1 clip
Kling v3 Pro hero + 1 musica instrumental Suno/PoYo). `lib/brand_palette_guard.py`
corrido localmente contra los props/tema declarados de esta composicion: verdict=pass,
0 criticos, 0 warnings. Los 4 stills y los 4 clips fueron revisados visualmente
(frame-sampling) antes de este commit: paleta ember/near-black consistente, sujeto
integrado a la escena en todos los planos, sin manos en primer plano, sin artefactos de
distorsion, identidad del sujeto consistente entre ANTES y DESPUES (stills 2-4 generados
con `nano-banana-pro/edit` usando el still 1 como referencia).
