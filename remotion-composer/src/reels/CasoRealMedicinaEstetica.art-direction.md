# Art-direction — "Caso real: una red de clinicas de medicina estetica" (reel 3/4)

## Paleta y tipografia
Hereda el playbook de la serie sin modificarlo: near-black `#0A0A0A`,
superficie `#141414`, acento SOLO ember `#FF6B1A`, texto near-white
`#F5F5F5`, muted `#9AA0A6`. Inter/Space Grotesk para numeros grandes
(StatReveal usa Space Grotesk por defecto), JetBrains Mono para
timestamps. Sin cian/violeta/lavanda en ningun frame.

## Cuidado de guard: StatReveal por defecto es VIOLETA
El componente stock `StatReveal.tsx` tiene `accentColor = "#A78BFA"` por
defecto (violeta, un color prohibido por `brand_palette_guard`). Las 3
escenas de este reel que lo usan (`stat1_125h`, `stat2_66`, `stat3_99`)
**pasan `accentColor={BRAND.accent}` explicito siempre** — sin este
override, el gate habria marcado 3 findings CRITICAL. Documentado como
landing mine para el proximo reel que use StatReveal.

## Signature device (nuevo para este reel)
Este reel es el segundo (y ultimo) de la serie con una escena i2v real
(el cold_open, anonimizado: sin logos ni marcas visibles). Su signature
device narrativo es la TRILOGIA DE CIFRAS (3 StatReveal consecutivos,
un hold deliberado de 7s cada uno) — deja que cada numero respire solo,
en vez de amontonar las 3 cifras en un unico KPIGrid/bento (que la
doctrina anti-slop senala como tell de "bento de metricas sin
jerarquia").

## Por que NO se uso KPIGrid/BarChart para las 3 cifras
Se considero `KPIGrid` (charts/) para mostrar las 3 cifras juntas, pero
se descarto: un grid de 3 metricas simultaneas en un reel de 45s le resta
el peso individual a cada cifra (exactamente el patron "bento sin
jerarquia" que `site-launch-audit` senala como AI-slop de diseno). 3
StatReveal consecutivos con hold de 7s cada uno dan a cada numero su
propio momento — mas caro en tiempo de pantalla, mas premium en
percepcion.

## Aislamiento de cliente en el asset generativo
El prompt del hero i2v exigio explicitamente "no visible logos, brand
names, or clinic names anywhere" — verificado en el prompt real (ver
gates.json, assets_generated.hero_still/hero_i2v). Pendiente de
confirmacion visual final sobre pixeles reales en el verify post-render.

## Distinctness review
¿Podria ser el video de cualquier otro producto? No: las 3 cifras y los 4
items implementados son los EXACTOS del caso real del post, no
genericos. ¿Reutiliza un look que ya hicimos? TagRevealList (what_they_did)
es el mismo device del reel 3 de la serie chatbot (CasoMarinoHVAC) —
deliberado, mismo rol narrativo ("que se implemento") en ambas series;
StatReveal para 3 cifras consecutivas es un tratamiento nuevo para esta
agencia (la serie anterior no tenia cifras numericas que mostrar en su
caso real).