---
status: idea — not scheduled
captured: 2026-05-11
origin: pasted accidentally into docs/superpowers/visuals/2026-05-08-shader-pieces/index.html <head>, rescued before revert
---

# Agentic-designer visual universe — deep research + 10 iterations

## The ask (Danilo, original phrasing)

> Sabes que está una mierda, la verdad. Entonces, vamos a cambiar un poco el formato.
> Quiero que investigues el internet de [best agentic designers/engineers], que hagas
> un scrapping bien chévere y de los mejores diseñadores de interfaces / ingenieros
> agentic del mundo. Quiero que extraigas el conocimiento de sus diseños y también
> todo el universo visual, ok? Como te digo, esta parte tenemos bastantes límites
> y tenemos opciones de explorar. Así que no te preocupes por los tokens, sino más
> bien lo que quisiera es que explores súper a fondo el concepto. Entonces, esta
> tarea es grande pero es simple: explorar todo el universo visual, registrarlo,
> extraer la información y presentar opciones en uno o varios de HTML. Esa es la
> tarea grande. Ahora quiero que la acabes y luego la repitas diez veces, no? La
> acabas, la vuelves a hacer, la acabas, la vuelves a hacer, pero tomas el
> conocimiento de cada uno de los pasos previos para como entrada del siguiente.
> Más de este prompt adelante, tienes si quieres hacerme preguntas. Una sola ronda
> de preguntas antes de darle a largo a las diez vueltas.

## Rough shape (for future brainstorm session)

- **Input:** the current shader-pieces visual is judged unsatisfactory.
- **Research phase:** scrape/browse the visual universes of top "agentic designer"
  profiles (portfolios, personal sites, published work). Extract both explicit
  design knowledge (tokens, type, motion, grids) and implicit tone/universe.
- **Synthesis phase:** present the knowledge as one or several browsable HTML
  documents — comparable, scannable, opinionated.
- **Loop:** repeat 10 times. Each iteration consumes the previous iteration's
  output as input, so the exploration compounds instead of restarting.
- **Gate:** one round of clarifying questions before the 10-round loop begins.

## Open questions to resolve before running this

1. Who counts as an "agentic designer"? Concrete seed list (Vercel, Linear,
   Raycast, Ellis Hamburger, Bruno Simon, Godly, Refactoring UI crowd,
   AI-native labs, …) vs. "find them yourself".
2. Token budget for research. User said "no te preocupes" but 10×{research + render}
   is multiple hundred-thousand-token order of magnitude. Set a ceiling.
3. Scrape vs. browse. Is WebFetch + manual selection enough, or does this need
   a browser with screenshots?
4. What does "iteration output feeds into next iteration" mean operationally?
   Diff from prior? Refined taxonomy? Narrower subset? Mutated hypothesis?
5. Deliverable surface. One mega-HTML with tabs vs. ten standalone HTMLs vs.
   an index + ten children.
6. Relationship to the v11 landing. Is this research that feeds a future v12,
   or is it an independent exploration parked under `docs/superpowers/visuals/`?

## Don't start this yet

This is a large, open-ended exploration. Start only after:
- Vercel deploy of v11 is live.
- Studies reorg is committed.
- User runs the clarifying-question round explicitly.
