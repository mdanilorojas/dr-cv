# Landing rebuild — aihero × dr-cv v11 merge

**Status:** spec, awaiting user review
**Date:** 2026-05-21
**Owner:** Danilo Rojas
**Visuals:** [`pruebas/superpowers/visuals/2026-05-21-aihero-merge/`](../visuals/2026-05-21-aihero-merge/index.html)
**Companion HTML:** [`2026-05-21-landing-aihero-merge-design.html`](./2026-05-21-landing-aihero-merge-design.html)

---

## 1. Why this exists

The current v11 landing (`dist/landing-v11/`) reads as AI-generated. Two specific issues, called out by the user:

1. **Density** — Hero · Proof · Horizon · Notebook · Work · Method · Contact = 7 sections before the page releases pressure. Nothing breathes.
2. **Decorations** — chips, badges, segmented progress bars, tool rails, glow accents. The decoration competes with the work for attention.

The reference is [aihero.dev](https://www.aihero.dev/): centered single column, editorial rhythm, content-first composition, restraint. The goal is to inherit that simplicity *without changing the v11 design language* (warm Huly dark, JetBrains Mono display, Inter body, single warm orange accent).

## 2. Constraints kept (non-negotiable)

- **Tokens:** `design-system/tokens-v11.css` is the source. No new tokens.
- **Typography signature:** JetBrains Mono display + Inter body stays. The v11 mono headline is what makes the site feel like Danilo's, not someone else's editorial template.
- **Single accent:** warm orange `#FF8964`, used only as punctuation (one word in headlines, one CTA, hover states). Never as a background fill, glow, or decorative chip.
- **Dark dominant:** `--v11-bg-primary` for the whole page. No paper section. No alt-band rhythm.
- **EN + ES:** language toggle lives in the nav.
- **Generator-driven:** still rendered from `data/*.yaml` + `generators/templates/v11-landing/`. No hand-crafted HTML in `dist/`.

## 3. What dies

| Element | Why it dies |
|---|---|
| Tabs SPA structure (`data/landing.yaml` `tabs:` list) | aihero is one continuous page. Tabs were where the AI-template feel started. |
| Horizon timeline section | Earned/Investing/Horizon survives in v3 only, as three quiet paragraphs. v1 and v2 cut it entirely. |
| Notebook (`v11-section--paper`) | Paper-on-dark contrast band breaks the editorial single-column feel. |
| Method section as a separate block | v3 keeps Method *replacing* Horizon; v1 and v2 fold the method into the hero copy and case beats. |
| Chips, badges, tool rail, segmented progress, glow | All flagged as decorative chrome. None survive in any iteration. |
| Wide container (80rem) | v11 fills the screen. The merge uses 720–800rem max-widths for editorial rhythm. |

## 4. What survives

- All identity copy (`data/identity.yaml`, `positioning.yaml`).
- All case content (`data/cases/*.md`) — but rendered as a vertical list, not a grid or expander.
- Real testimonials (`data/testimonials/verified.yaml`) — Giraldez in v2, Sheppard in v3.
- The thesis line: *"I ship real products — and I ship the tools agents use to help me ship them."*
- The hero photo (`assets/photo/danilo.jpg`).
- The hero byline (Designer engineer · Quito · 15 years).

## 5. Three iterations

Three polished mockups live under [`pruebas/superpowers/visuals/2026-05-21-aihero-merge/`](../visuals/2026-05-21-aihero-merge/index.html). Each is a complete page, scrollable, browser-renderable.

### v1 · Quiet

`Hero → Work → Contact`

Three blocks, lots of breath. No proof strip, no testimonial section, no notes, no method. The work is the proof. Closest to a designer's personal site. Risk: a cold visitor may not have enough signal to convert without proof or testimonial.

### v2 · Balanced **(recommended target)**

`Hero → Proof strip → Work → Testimonial → Notes → Contact`

A discrete 4-cell proof strip immediately under the hero absorbs what the old Proof and Horizon sections were trying to communicate (15+ years, 346 commits, 1.0 SaaS, 95.6 score). One real testimonial. Notes block keeps the site alive between deploys (writing-in-public hook). Best chance of converting a client without feeling AI-templated.

### v3 · Method-forward

`Hero → Method → Work → Testimonial → Contact`

For viewers who need to see the *how* before the *what*. Earned → Investing → Horizon survives — but as three quiet paragraphs in a 3-column grid, with no chips, no progress bar, no tool rail. Just stage label · heading · paragraph · tool list. The "Investing" column gets the orange top-border as the only signal of emphasis.

## 6. Architecture & file plan

### Generator

`generators/templates/v11-landing/index.ts` — current renderers split into:

- `renderHero` — keep, simplify (drop proof numbers, drop notebook byline-row)
- `renderProof` — **delete** (v1, v3); rewrite as `renderProofStrip` (v2 only)
- `renderHorizon` — **delete** (v1, v2); rewrite as `renderMethod` (v3 only)
- `renderNotebook` — **delete**
- `renderWork` — keep shape, change CSS to vertical list (no grid, no expander)
- `renderMethod` (current) — **delete**, replaced by v3's `renderMethod`
- `renderTestimonial` — keep, used by v2 and v3
- `renderNotes` — **new**, v2 only (notes data source TBD — see Open Questions)
- `renderContact` — simplify; one big email link, one sub-line
- `renderFooter` — keep

### Styles

`generators/templates/v11-landing/v11-styles.ts` — strip:

- `.v11-section--paper` (dies with Notebook)
- `.v11-horizon__*` (dies with Horizon — v3 needs new `.v11-method__*`)
- `.v11-proof-numbers__*` (dies — v2 needs new `.v11-proof__*`)
- All chip / badge / glow rules

Add:
- `.v11-container-editorial` — `max-width: 760px` (vs current 80rem). Page-wide.
- v2: `.v11-proof` (4-cell grid)
- v3: `.v11-method` (3-col grid, no chips)

### Data

`data/landing.yaml` — drop `tabs:` block (no longer used for SPA nav). Optionally add `notes:` for v2 (or import from another data source — see Open Questions).

`data/positioning.yaml` — keep. v2 proof strip reads `proofNumbers[]` directly.

`data/horizon.yaml` — kept on disk; consumed only by v3.

### Tests

`tests/v11-horizon.test.ts` — rename or replace. v1/v2: delete the horizon coverage. v3: replace with `v11-method.test.ts`.

## 7. User flow

> Single user flow: cold visitor lands → scans → contacts.

```
              ┌──────────────────────┐
              │ visitor lands on /   │
              └─────────┬────────────┘
                        │
                        ▼
              ┌──────────────────────┐
              │ HERO read           │
              │ thesis + photo +    │
              │ byline absorbed     │
              └──────┬───────────────┘
                     │ scroll
        ┌────────────┼────────────────┐
        ▼            ▼                ▼
   v1: WORK     v2: PROOF STRIP    v3: METHOD
                 + WORK              + WORK
        │            │                │
        └────────────┴────────────────┤
                     │                │
                     ▼                ▼
              ┌──────────────┐    (v2 also: Notes)
              │ TESTIMONIAL  │  → keeps reading
              │ (v2,v3)      │
              └──────┬───────┘
                     │
                     ▼
              ┌──────────────────┐
              │ CONTACT          │
              │ click email      │
              │ → mailto open    │
              └──────────────────┘
```

The companion HTML renders this as a Mermaid diagram.

## 8. Success criteria

- A visitor seeing the page for the first time should not type "AI generated" or "template" in their head.
- The hero thesis is readable in one breath, no scroll required.
- Click depth to a contact intent: ≤ 1 (the email is on the page).
- Build cost: under 200 LOC of new generator code, under 400 LOC of new CSS. The merge is a *subtraction* primarily, not an addition.
- All `data/*.yaml` content keeps rendering — no copy is orphaned without an explicit decision.
- The site builds via the existing `npm run build:landing-v11` script, no new dependencies.

## 9. Open questions (resolve before plan)

1. **Notes source.** v2 has a notes block. Do they live in a new `data/notes/*.md` directory? Or do we drop notes from v2 and recommend v1 instead?
2. **Case detail pages.** Current generator produces `/work/<slug>/` case detail pages. Do they survive (linked from each `work__item`) or do they collapse into the work list with expand-on-click?
3. **Language toggle.** Current SPA toggles in-place. New static page either reloads to `/es/` or keeps SPA-style toggle. Recommendation: static reload — it's simpler and Vercel handles it cheaply.
4. **Final iteration target.** v2 is recommended but the user has not picked yet. The plan will assume v2 unless told otherwise.

## 10. Out of scope

- Case detail page redesign (separate spec).
- CV / skills sheet generators (untouched).
- Animations / motion beyond CSS hovers.
- Light-mode variant.
