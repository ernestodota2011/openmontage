# Guion — "Tres negocios, tres resultados" (reel 3/4, casos reales)

Fuente: `ia-para-negocios-miami.md`, seccion "Casos reales: como lo
estan usando empresas como la tuya" (los 3 casos completos: red de
clinicas confidencial, DMP Consulting Services, Marino HVAC). Vertical
9:16, 45.0s @24fps (1080 frames), espanol neutro, subtitulos integrados
en tipografia/UI (sin locucion).

| # | Escena | Duracion | Contenido en pantalla | Audio |
|---|---|---|---|---|
| 1 | `cold_open_hero` | 0.0-5.0s | i2v: negocio de Miami de dia, dueno confiado en la puerta. Caption: "Tres negocios reales. Tres resultados distintos." | musica entra |
| — | `EmberThread_bridge_a` | 5.0-5.5s | barrido ember | — |
| 2 | `case_clinic` | 5.5-13.5s | "+125 horas" / "por semana recuperadas por el equipo de coordinacion". Caption: "Red de clinicas de EE. UU. - cifras reportadas por la propia clinica." | sfx chime, musica baja |
| 3 | `case_dmp` | 13.5-21.5s | "$36,000" / "en tiempo recuperado al ano, en capacidad de trabajo". Caption: "DMP Consulting Services, Houston/Katy TX - estimacion de AetherLogik a partir de los datos del cliente." | sfx chime |
| 4 | `case_marino` | 21.5-29.5s | "$4,400/mes" / "recuperados en facturacion, mas 9 horas libres por semana". Caption: "Marino HVAC, Miami - estimacion de AetherLogik a partir de los datos del cliente." | sfx chime, musica sube |
| — | `EmberThread_bridge_b` | 29.5-30.0s | barrido ember | — |
| 5 | `quote_line` | 30.0-37.0s | "'La automatizacion nos permitio enfocarnos en lo que realmente importa: el trabajo con los clientes.'" / "— Mayli Parra, DMP Consulting Services" | musica sostiene |
| 6 | `brand_close` | 37.0-45.0s | Isotipo + "AetherLogik" + "Profundiza en tu sector: /para-clinicas y /para-hvac." + "aetherlogik.com/blog - esta listo tu negocio, en el proximo video ->" | musica cierra |

## CTA
CTA **interno de la serie** (apunta al reel 4) + referencia cruzada
explicita a los tutoriales dedicados por vertical (`/para-clinicas`,
`/para-hvac`) — regla de la mision: el post paraguas "puede referenciar
los otros tutoriales como 'profundiza en X' en los cierres".

## Nota de fidelidad al post y atribucion exacta
- **Clinica**: "+125 horas por semana", el resto de sus cifras
  (capacidad de setters +66%, sincronizacion 99%) NO se citan en este
  reel para no saturar 8s con 3 numeros — se elige la cifra ancla mas
  legible. Atribucion EXACTA del post: "Estas cifras las reporto la
  propia clinica" (NO es una estimacion de AetherLogik, a diferencia de
  los otros 2 casos).
- **DMP Consulting**: "$36,000 en tiempo recuperado" (de los
  "$1,440 horas al ano" convertidas por el propio post). Atribucion
  EXACTA: "Estas cifras son estimaciones nuestras a partir de los datos
  del cliente." Nombre publico autorizado (Mayli Parra).
- **Marino HVAC**: "$4,400 por mes" + "9 horas por semana", ambas del
  post. Atribucion EXACTA: "Estas cifras son estimaciones nuestras a
  partir de los datos del cliente." Nombre publico autorizado (Alain
  Marino). NO se repiten aqui las cifras de detalle ($50/trabajo, 88
  facturas/mes, 36h/mes) que ya tiene su PROPIO reel dedicado
  (`LosNumerosDeMarinoHVAC.tsx`, serie reels-hvac-serie) — se evita
  redundancia entre series de la misma linea.
- La cita de Mayli Parra es textual del post, con atribucion de nombre y
  empresa en el mismo frame.

## Notas de subtitulo / accesibilidad
Todo el copy vive en pantalla — se entiende 100% sin audio, cumple
`final_review.subtitle_check` sin pista de captions aparte.
