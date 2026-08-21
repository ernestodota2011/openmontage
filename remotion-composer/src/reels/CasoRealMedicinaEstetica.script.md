# Guion — "Caso real: una red de clinicas de medicina estetica" (reel 3/4, didactico)

Fuente: `automatizar-citas-clinica-miami.md`, seccion "Caso real: red de
clinicas de medicina estetica en EE. UU.". Vertical 9:16, 45.0s @24fps
(1080 frames), espanol neutro, subtitulos integrados en tipografia/UI (sin
locucion).

| # | Escena | Duracion | Contenido en pantalla | Audio |
|---|---|---|---|---|
| 1 | `cold_open_hero` | 0.0-5.0s | i2v: coordinacion multi-sede, sincronizacion visible. Caption: "Una red de clinicas de medicina estetica en EE. UU. tenia el mismo problema — a mayor escala." | musica entra |
| 2 | `what_they_did` | 5.0-13.0s | Cascada de 4 items implementados | musica + sfx chip |
| 3 | `stat1_125h` | 13.0-20.0s | "+125" / "horas/semana recuperadas por el equipo de coordinacion" | musica + sfx confirm |
| 4 | `stat2_66` | 20.0-27.0s | "+66%" / "de capacidad de llamadas del equipo de setters" | musica + sfx confirm |
| 5 | `stat3_99` | 27.0-34.0s | "99%" / "de precision en la sincronizacion de resultados medicos entre sedes" | musica + sfx confirm |
| 6 | `attribution` | 34.0-39.0s | "Datos reportados por su equipo. Cliente de AetherLogik — identidad resguardada por acuerdo de confidencialidad." | musica baja |
| 7 | `brand_close` | 39.0-45.0s | Isotipo + "AetherLogik" + "Resultados reales, no promesas." + "aetherlogik.com/blog . que cambia en TU clinica, en el proximo video ->" | musica cierra |

## CTA
Apunta al **siguiente reel de la serie** (que cambia en tu operacion + el
benchmark), no a una venta directa.

## Aislamiento de cliente (regla dura de la mision)
El caso es de una red de medicina estetica que el post NO nombra ("no
puedo nombrarla por acuerdo de confidencialidad"). Este reel tampoco la
nombra, no usa el nombre Dermaclinic ni ningun identificador de ningun
cliente real de la agencia — aislamiento de cliente. El hero i2v se genero
SIN ningun logo/marca visible (ver decision_log d-002 y el prompt del
asset en gates.json).

## Nota de fidelidad al post y atribucion de cifras
Las 3 cifras (+125 horas/semana, +66% capacidad de setters, 99%
precision) son las 3 EXACTAS del post, mismo orden, sin redondeos ni
invenciones. La escena `attribution` reproduce la vara declarada por el
post tal cual ("Datos reportados por su equipo") — NO se agrega ninguna
cifra que el post no contenga.

## Notas de subtitulo / accesibilidad
Todo el copy vive en pantalla — se entiende 100% sin audio, cumple
`final_review.subtitle_check` sin pista de captions aparte.