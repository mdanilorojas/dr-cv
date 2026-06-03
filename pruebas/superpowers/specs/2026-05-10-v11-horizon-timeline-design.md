# v11 — Horizon Timeline: narrative reframe

**Date:** 2026-05-10
**Author:** Danilo Rojas (with Claude)
**Target landing:** `dist/landing-v11/`
**Generator:** `generators/v11-landing.ts`
**Status:** design ready for implementation plan

---

## 1. Problem

The current v11 landing reads as a static catalog of "what I am": Agentic Designer, tagline, proof numbers, then cases. For the target reader — a technical hiring manager (Head of Eng / Head of Design) — that framing is wrong for two reasons:

1. **The job categories are mutating.** Figma mastery and hand-coded UI — skills that used to define a role — are commoditized by agents. A senior reader knows this. A résumé built on those categories looks like a snapshot of the old world.
2. **The reader wants trajectory, not taxonomy.** A hiring manager who can hire anyone asks: "Does this person know where they're going, and is their time compounding?" Static titles and skill tags don't answer that question; movement does.

**What changes:** reframe the landing from "what I am" to "where I'm investing my hours", with evidence.

---

## 2. Target reader and success criterion

**Reader:** Head of Engineering or Head of Design at a serious product company, scanning in 5 seconds and then reading for 30 if the scan earns it.

**Success for this reader:**
- In 5 seconds: understands this person has made a deliberate shift away from commoditized craft toward orchestrated judgment.
- In 30 seconds: sees concrete evidence of each move (clickable chips → real cases).
- Walks away with the phrase: *"keeps the judgment, retires the hours"* — or something equivalent — as the summary.

---

## 3. Concept — Horizon Timeline

A three-stage horizontal timeline, placed immediately after the hero. Each stage is one column; the middle one is visually emphasized because that is where the reader lives.

| Stage | Label (EN / ES) | Tone |
|---|---|---|
| Past | `Earned · 2010–2023` / `Ganado · 2010–2023` | archived, struck-through chips, no links |
| Present | `Investing · 2024–Now` / `Invirtiendo · 2024–Hoy` | emphasized, accent chips, all clickable to evidence |
| Future | `Next horizon · 12 mo` / `Próximo horizonte · 12 meses` | dashed borders, rule: 2 evidence + 1 declared bet |

Rule that keeps the future credible: a chip enters the `Next horizon` column only if it is (a) already backed by a public commit / skill / repo, or (b) explicitly marked as a declared bet with no evidence yet. No wish-list chips.

---

## 4. Copy (verbatim)

### 4.1 Section frame

- **Eyebrow (mono, accent):** `Direction · 2026` / `Dirección · 2026`
- **Section title (H2):** `Where my hours are going` / `A dónde van mis horas`

### 4.2 Column 1 — Earned · 2010–2023

- **H3:** The craft I mastered, now commoditized
  *El craft que dominé, ahora commoditizado*
- **Body:** 15 years shipping enterprise product. I keep the judgment — the hours that built it no longer compound.
  *15 años shippeando producto enterprise. Me quedo con el juicio — las horas que lo construyeron ya no componen.*
- **Chips (5, strikethrough, non-clickable):**
  `Figma mastery` · `Hand-coded UI` · `Design reviews` · `Component libraries` · `Style-guide PDFs`
  *`Dominio de Figma` · `UI a mano` · `Design reviews` · `Librerías de componentes` · `PDFs de guía de estilo`*

### 4.3 Column 2 — Investing · 2024–Now *(emphasized)*

- **H3:** Where my hours go today
  *A dónde van mis horas hoy*
- **Body:** The frontline moved. I moved with it. Craft is now judgment + orchestration: I ship what used to take a team, and I ship the tools that make it possible.
  *La frontera se movió. Me moví con ella. El craft ahora es juicio + orquestación: entrego lo que antes tomaba un equipo, y entrego las herramientas que lo hacen posible.*
- **Chips (5, clickable):**

| Chip (EN / ES) | Links to |
|---|---|
| `Agent orchestration` / `Orquestación de agentes` | `#case-enregla` |
| `MCP servers` / `MCP servers` | `#case-enregla-mcp` |
| `Design-system-as-skill` / `Design-system-as-skill` | `#case-te-skin` |
| `Recursive critic loops` / `Loops de crítico recursivos` | `#case-te-black` |
| `Taste as rubric` / `Taste como rúbrica` | `#tab-method` |

### 4.4 Column 3 — Next horizon · 12 mo

- **H3:** What I'm walking toward
  *Hacia dónde camino*
- **Body:** Embedded in a serious product team, owning the seam between design judgment and agentic execution — at a scale where one person's leverage becomes a team's.
  *Embebido en un equipo de producto serio, dueño de la costura entre juicio de diseño y ejecución agéntica — a una escala donde el leverage de una persona se convierte en el del equipo.*
- **Chips (3, rule "2 evidence + 1 bet"):**

| Chip (EN / ES) | Kind | Href / Signal |
|---|---|---|
| `Team-scale agent tooling` / `Tooling a escala de equipo` | evidence (solid border) | `https://github.com/mdanilorojas/dr-cv` |
| `Audited agent workflows` / `Workflows de agentes auditados` | evidence (solid border) | `#skills-audit` (on-page) |
| `Eval-driven UI` / `UI dirigida por evals` | bet (dashed + "bet" badge) | no href |

### 4.5 Tone rules

- First person, direct verbs: *I ship / I keep / I moved*. No "I am X".
- No role titles, no tag clouds, no taxonomy vocabulary.
- Past is archived, not negated: "keep the judgment, retire the hours."
- Future is concrete, never abstract aspiration.

---

## 5. Placement in v11

```
┌───────────────────────────────────────────┐
│ HERO                                      │ ← unchanged
│   thesis line, tagline, proof numbers     │
├───────────────────────────────────────────┤
│ HORIZON TIMELINE   ◄── NEW                │ ← first new section
│   eyebrow + H2                            │
│   [Earned] [Investing] [Next horizon]     │
├───────────────────────────────────────────┤
│ TAB NAV                                   │ ← unchanged
│   Overview / Work / Method / About /      │
│   Contact                                 │
├───────────────────────────────────────────┤
│ …rest of page…                            │ ← unchanged
└───────────────────────────────────────────┘
```

Location decision (from brainstorming): **below the current hero, as the first new section**. Not a tab, not a hero replacement.

---

## 6. User / reader flow

The flow the hiring manager takes when this section does its job:

```
Landing loads
    │
    ▼
Hero (thesis + proof numbers)
    │
    ▼
Horizon section enters viewport
    │
    ▼
Scan 5s → reads the 3 stage labels + emphasized middle column
    │
    ├─── Convinced enough? ───┐
    │                         │
    ▼                         ▼
 Reads Investing body     Scrolls past to cases
    │                         │
    ▼                         │
 Clicks a chip ───────────────┤
    │                         │
    ▼                         │
 Lands on a case study        │
    │                         │
    └────┬────────────────────┘
         ▼
   Cases / Method / About (unchanged path)
         │
         ▼
       Contact CTA
```

Key branches:
- **Scan-only reader:** leaves with the framing "this person knows where they're going" without clicking anything. Still a win if they come back.
- **Skeptical reader:** clicks a chip → lands on concrete evidence → returns with credibility established.
- **Curious-about-future reader:** reads the `Next horizon` column → sees the "bet" badge → registers honesty instead of hype.

---

## 7. Implementation scope

### 7.1 Files touched (4)

| File | Change |
|---|---|
| `generators/lib/load-data.ts` | Load `horizon.yaml` into `LandingData.horizon` |
| `generators/lib/types.ts` | Add `HorizonSection` type: `{ eyebrow, sectionTitle, columns: HorizonColumn[] }` where each column has `id`, `stage`, `heading`, `body`, `emphasis?`, `chips: HorizonChip[]` |
| `generators/templates/v11-landing/index.ts` | New `renderHorizon(data, lang)` function; injected between hero and tab-nav |
| `generators/templates/v11-landing/v11-styles.ts` | Append `.horizon-*` CSS block adapted from the mockup |

### 7.2 Files created (1)

- `data/horizon.yaml` — bilingual source of truth (schema in §7.4)

### 7.3 Files untouched

- `v11-script.ts` — pure CSS solution; chips are native `<a>`
- Hero, tabs, cases, testimonials, method, contact sections
- `design-system/tokens-v11.css` — all required tokens already exist (`--v11-accent`, `--v11-accent-soft`, `--v11-accent-line`, `--v11-line`, `--v11-line-strong`)
- Other landings (`dist/landing/`, `dist/landing-huly/`) — out of scope

### 7.3.1 Anchor prerequisites

The chips in §4 reference on-page anchors. Before implementation, the plan must **audit the current v11 output** and, for every anchor used, either (a) confirm it already exists on an existing element, or (b) add an `id` attribute to the right element (e.g., the case card, the Method tab panel). Anchor additions are the only permitted exception to §7.3's "untouched" rule — they are additive (`id="…"`) and change no other markup.

Anchors referenced:
- `#case-enregla`, `#case-enregla-mcp`, `#case-te-skin`, `#case-te-black` — likely need to be added to case-card DOM
- `#tab-method` — likely needs to be added to the Method tab panel
- `#skills-audit` — if no existing target, this chip becomes a `bet` instead of evidence

Test #7 is the enforcement — a silently missing anchor is a build failure.

### 7.4 `horizon.yaml` schema

```yaml
eyebrow:
  en: "Direction · 2026"
  es: "Dirección · 2026"

sectionTitle:
  en: "Where my hours are going"
  es: "A dónde van mis horas"

columns:
  - id: earned            # string, stable
    stage: { en: "...", es: "..." }
    heading: { en: "...", es: "..." }
    body: { en: "...", es: "..." }
    chips:
      - label: { en: "...", es: "..." }
        # no href → rendered as <span>, strikethrough

  - id: investing
    emphasis: true        # boolean, optional — triggers accent treatment
    stage: { en: "...", es: "..." }
    heading: { en: "...", es: "..." }
    body: { en: "...", es: "..." }
    chips:
      - label: { en: "...", es: "..." }
        href: "#case-enregla"
        # href present → rendered as <a>

  - id: horizon
    stage: { en: "...", es: "..." }
    heading: { en: "...", es: "..." }
    body: { en: "...", es: "..." }
    chips:
      - label: { en: "...", es: "..." }
        href: "https://github.com/mdanilorojas/dr-cv"
        kind: evidence     # enum: evidence | bet, default evidence
      - label: { en: "...", es: "..." }
        kind: bet
        # no href + kind: bet → dashed border + "bet" badge
```

### 7.5 Accessibility

- Non-clickable past chips: `<span>` with `aria-label="Earned, now commoditized: {label}"` so a screen reader contextualizes the strikethrough instead of reading a bare word.
- Clickable chips: native `<a href>`, keyboard-tabbable, visible focus ring using existing `--v11-accent-ring`.
- "Bet" chips: `aria-label="{label}. Declared bet, no evidence yet."` plus a visible small badge reading `bet`.
- The decorative timeline connector (`::before` line) is `aria-hidden` (decorative, no semantic meaning).
- Column emphasis is expressed in at least two channels: color (accent) + font weight or dot size — not color alone.

---

## 8. Tests (added to `tests/landing/v11.test.ts`)

1. **Section placement** — horizon section renders after the hero and before the tab-nav, in EN and ES.
2. **Emphasized column** — the `investing` column has `data-emphasis="true"` on its root element, and the accent dot class is applied.
3. **Investing chips are links** — all 5 chips in the `investing` column are `<a>` elements with non-empty `href`.
4. **Horizon column composition** — the `horizon` column contains exactly 2 chips with `kind="evidence"` and 1 chip with `kind="bet"`.
5. **Past chips have contextual aria-label** — every chip in the `earned` column has an `aria-label` that starts with "Earned" / "Ganado".
6. **HTML budget** — rendered output stays below the existing `400_000`-byte budget for both locales.
7. **Internal anchors resolve** — every `href="#..."` in the horizon section points to an `id` that exists elsewhere in the rendered HTML. (Prevents silent dead links as the data file drifts.)

---

## 9. Risks and mitigations

| Risk | Mitigation |
|---|---|
| `horizon.yaml` `href` drifts from `id` in the rest of the page | Test #7 enforces internal-anchor resolution at build time. |
| Tablet viewport (1024px) layout collapses awkwardly | Mediaquery at 920px collapses to vertical (same as mockup); verified visually during implementation. |
| Copy ages out (the 12-month horizon) | Eyebrow includes the year (`Direction · 2026`) — revisiting next year is obvious by scent. |
| Reader parses struck-through past as self-deprecation | Body copy in Column 1 explicitly reframes: *"I keep the judgment — the hours that built it no longer compound."* Tone stays confident, not apologetic. |
| Emphasis on Column 2 relies on accent color alone | Emphasis is multi-channel: accent color + larger dot + filled chip backgrounds; fails gracefully for color-blind readers. |

---

## 10. Out of scope

- No changes to the hero (thesis line and proof-numbers strip stay exactly as they are).
- No changes to other landings (`dist/landing/`, `dist/landing-huly/`).
- No new "Direction" tab (explicitly rejected during brainstorming).
- No deployment work — this ships as a local build only.
- No new tokens, fonts, or external dependencies.

---

## 11. Definition of done

- [ ] `npm run build:landing-v11` emits EN + ES under the 400k-byte budget
- [ ] `npm test` passes (existing + 7 new tests)
- [ ] `npm run typecheck` clean
- [ ] Horizon section renders between hero and tab-nav in both locales
- [ ] Investing column visually emphasized (accent dot + chip treatment + heading weight)
- [ ] 5 past chips are non-clickable with contextual `aria-label`
- [ ] 5 investing chips are links to existing on-page anchors
- [ ] 3 horizon chips: exactly 2 evidence (solid) + 1 bet (dashed + badge)
- [ ] Mobile ≤ 920px collapses to vertical without overlap
- [ ] Diff is surgical: hero, tabs, cases, testimonials, method, contact untouched
