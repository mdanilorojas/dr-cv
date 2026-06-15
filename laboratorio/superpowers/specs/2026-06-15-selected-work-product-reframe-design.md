# Selected Work — Product-Designer reframe

**Date:** 2026-06-15
**Branch:** landing-redesign
**Status:** awaiting user approval

## Goal

The three case studies read like a developer's changelog (commit counts, SQL
migrations, MCP servers, framework stacks). Reframe them so they position Danilo
as a **senior Product Designer** who delivers design up to the design boundary —
systems, flows, research, and the *direction of the AI* — then hands engineering
a clean, spec'd build. Engineering (and their agents) build from there.

## Decisions (confirmed with user)

- **Lineup + order:** Developer Portal · Juan Valdez · Life Update. **Drop EnRegla.** Add **Juan Valdez** (new case).
- **Scope:** landing cards **and** per-case detail pages.
- **Booz role:** Senior Product Designer.
- **Juan Valdez detail level:** general (core flows + design system), no invented screens.
- **Life Update:** keep "shipped the MVP" framing, but drop commits/frameworks.

## Illustrations (unchanged, per user)

- Card abstract graphics are index-based; new order maps grid→Dev Portal,
  circle→Juan Valdez, phone→Life Update. No graphic redesign.
- Case-page demos: Dev Portal keeps picture-in-picture, Life Update keeps
  live-annotation. **Juan Valdez has no iframe demo** (none added now).
- EnRegla's demo + the `enregla` animation mapping become unused; files stay in
  assets (harmless). Nothing visual is changed.

## Open item

- **Juan Valdez year** unknown. Placeholder `2023` in data — **user to confirm.**

## Section copy (`index.ts` → `COPY.work`)

- eyebrowEn: `Selected work`
- eyebrowEs: `Trabajo seleccionado`
- titleEn: `Three products. Designed to the handoff.`
- titleEs: `Tres productos. Diseñados hasta el handoff.`
- leadEn: `Each one taken from problem to a build engineering can run with — design systems, product flows, and the AI behavior, spec'd and ready. I take the design as far as it goes; engineering takes it further.`
- leadEs: `Cada uno llevado del problema a un build con el que ingeniería puede arrancar — design systems, flujos de producto y el comportamiento de la IA, especificados y listos. Llevo el diseño hasta donde llega; ingeniería lo lleva más lejos.`

## Card 1 — Developer Portal (`developer-portal.md`)

- clientEn/Es: `Booz Allen Hamilton · Senior Product Designer`
- titleEn: `Developer Portal design system`
- titleEs: `Developer Portal — design system`
- year: 2024–2026 (keep) · featured: true · animation: developer-portal
- hookEn: `A dark-first design system for a government-facing developer platform. I defined the tokens, components, and accessibility rules so every team ships consistent, WCAG-compliant UI — packaged so engineering can pull ready-to-use components without redesigning anything.`
- hookEs: `Un design system dark-first para una plataforma de developers government-facing. Definí los tokens, componentes y reglas de accesibilidad para que cada equipo entregue UI consistente y conforme a WCAG — empaquetado para que ingeniería tome componentes listos sin rediseñar nada.`
- bulletsEn:
  1. `Dark-first design system with WCAG contrast decided and documented per token`
  2. `17 production components with states, usage rules, and named anti-patterns`
  3. `Handoff spec engineering builds from directly — design DNA, constraints, checklists`
- bulletsEs:
  1. `Design system dark-first con contraste WCAG decidido y documentado por token`
  2. `17 componentes de producción con estados, reglas de uso y anti-patterns nombrados`
  3. `Handoff spec del que ingeniería construye directo — design DNA, constraints, checklists`
- stack: `Design system · Accessibility · Component library · Design tokens`

## Card 2 — Juan Valdez (`juan-valdez.md`, NEW)

- slug: juan-valdez
- clientEn/Es: `Juan Valdez · Product / UI Designer`
- titleEn: `Juan Valdez mobile app & design system`
- titleEs: `Juan Valdez — app mobile y design system`
- year: 2023–2023 (CONFIRM) · featured: true · no animation
- hookEn: `End-to-end UI design for Juan Valdez's Colombia mobile app — the full product surface and a reusable design system. I delivered the screens, the flows, and the system, then handed engineering a clean, spec'd build.`
- hookEs: `Diseño UI end-to-end para la app mobile de Juan Valdez Colombia — toda la superficie de producto y un design system reutilizable. Entregué las pantallas, los flujos y el sistema, y le pasé a ingeniería un build limpio y especificado.`
- bulletsEn:
  1. `Complete UI design across the core mobile flows`
  2. `Reusable design system: components, type scale, color, spacing`
  3. `Brand-led product design for a national CPG / retail audience`
- bulletsEs:
  1. `Diseño UI completo de los flujos core mobile`
  2. `Design system reutilizable: componentes, escala tipográfica, color, spacing`
  3. `Diseño de producto brand-led para audiencia CPG / retail nacional`
- stack: `Mobile UI · Design system · Figma · Brand-led`

## Card 3 — Life Update (`life-update-mobile.md`)

- clientEn: `Personal product · Design + AI` / clientEs: `Producto personal · Diseño + IA`
- titleEn: `Life Update — AI focus app`
- titleEs: `Life Update — app de foco con IA`
- year: 2026 (keep) · featured: false
- hookEn: `A personal focus app: write a daily entry, get it scored against your 5-year plan in plain language — three priorities a day, nothing more. I designed the product and the AI behavior, then shipped the MVP to prove it.`
- hookEs: `Una app personal de foco: escribes una entrada diaria y se evalúa contra tu plan a 5 años en lenguaje claro — tres prioridades al día, nada más. Diseñé el producto y el comportamiento de la IA, y shippeé el MVP para probarlo.`
- bulletsEn:
  1. `Product + interaction design for AI-scored daily focus`
  2. `Designed the AI behavior: semantic distance from each entry to a long-term plan`
  3. `Shipped a working MVP to validate the concept end-to-end`
- bulletsEs:
  1. `Product + interaction design para foco diario scoreado por IA`
  2. `Diseñé el comportamiento de la IA: distancia semántica de cada entrada al plan de largo plazo`
  3. `Shippeé un MVP funcional para validar el concepto end-to-end`
- stack: `Product design · AI / LLM behavior · 0→1 MVP`

## Detail-page beats (`CASE_BEATS`)

Remove `enregla`. Add `juan-valdez`. Rewrite `developer-portal` + `life-update`
to product/design framing. Fix `â‰¥` → `≥` mojibake. Keep the Jennifer Sheppard
quote (already public). Full EN/ES beat copy drafted and applied in implementation
following the same reframe principle: each beat describes a *design* decision /
deliverable / handoff, never a commit/SQL/framework detail.

## Files changed

1. `perfil/data/cases/enregla.md` — delete
2. `perfil/data/cases/juan-valdez.md` — create
3. `perfil/data/cases/developer-portal.md` — rewrite front matter
4. `perfil/data/cases/life-update-mobile.md` — rewrite front matter
5. `generadores/templates/v11-landing/index.ts` — `sortedCases` order, `COPY.work` title/lead/eyebrow, `CASE_BEATS` (drop enregla, add juan-valdez, rewrite 2)
6. `generadores/templates/v11-landing/animations/iframe-animation.ts` — drop `enregla` mapping
7. `tests/` — adjust any EnRegla-dependent assertions; the `it.todo` brand-removal note is satisfied.

## Verification

`npm run typecheck` · `npm run build:landing-v11` · `npm test`. Card metadata,
order, and detail pages render with the new copy; no `enregla` slug emitted.
