# v11 â€” Horizon Timeline: narrative reframe

**Date:** 2026-05-10
**Author:** Danilo Rojas (with Claude)
**Target landing:** `dist/landing-v11/`
**Generator:** `generadores/v11-landing.ts`
**Status:** design ready for implementation plan

---

## 1. Problem

The current v11 landing reads as a static catalog of "what I am": Agentic Designer, tagline, proof numbers, then cases. For the target reader â€” a technical hiring manager (Head of Eng / Head of Design) â€” that framing is wrong for two reasons:

1. **The job categories are mutating.** Figma mastery and hand-coded UI â€” skills that used to define a role â€” are commoditized by agents. A senior reader knows this. A rÃ©sumÃ© built on those categories looks like a snapshot of the old world.
2. **The reader wants trajectory, not taxonomy.** A hiring manager who can hire anyone asks: "Does this person know where they're going, and is their time compounding?" Static titles and skill tags don't answer that question; movement does.

**What changes:** reframe the landing from "what I am" to "where I'm investing my hours", with evidence.

---

## 2. Target reader and success criterion

**Reader:** Head of Engineering or Head of Design at a serious product company, scanning in 5 seconds and then reading for 30 if the scan earns it.

**Success for this reader:**
- In 5 seconds: understands this person has made a deliberate shift away from commoditized craft toward orchestrated judgment.
- In 30 seconds: sees concrete evidence of each move (clickable chips â†’ real cases).
- Walks away with the phrase: *"keeps the judgment, retires the hours"* â€” or something equivalent â€” as the summary.

---

## 3. Concept â€” Horizon Timeline

A three-stage horizontal timeline, placed immediately after the hero. Each stage is one column; the middle one is visually emphasized because that is where the reader lives.

| Stage | Label (EN / ES) | Tone |
|---|---|---|
| Past | `Earned Â· 2010â€“2023` / `Ganado Â· 2010â€“2023` | archived, struck-through chips, no links |
| Present | `Investing Â· 2024â€“Now` / `Invirtiendo Â· 2024â€“Hoy` | emphasized, accent chips, all clickable to evidence |
| Future | `Next horizon Â· 12 mo` / `PrÃ³ximo horizonte Â· 12 meses` | dashed borders, rule: 2 evidence + 1 declared bet |

Rule that keeps the future credible: a chip enters the `Next horizon` column only if it is (a) already backed by a public commit / skill / repo, or (b) explicitly marked as a declared bet with no evidence yet. No wish-list chips.

---

## 4. Copy (verbatim)

### 4.1 Section frame

- **Eyebrow (mono, accent):** `Direction Â· 2026` / `DirecciÃ³n Â· 2026`
- **Section title (H2):** `Where my hours are going` / `A dÃ³nde van mis horas`

### 4.2 Column 1 â€” Earned Â· 2010â€“2023

- **H3:** The craft I mastered, now commoditized
  *El craft que dominÃ©, ahora commoditizado*
- **Body:** 15 years shipping enterprise product. I keep the judgment â€” the hours that built it no longer compound.
  *15 aÃ±os shippeando producto enterprise. Me quedo con el juicio â€” las horas que lo construyeron ya no componen.*
- **Chips (5, strikethrough, non-clickable):**
  `Figma mastery` Â· `Hand-coded UI` Â· `Design reviews` Â· `Component libraries` Â· `Style-guide PDFs`
  *`Dominio de Figma` Â· `UI a mano` Â· `Design reviews` Â· `LibrerÃ­as de componentes` Â· `PDFs de guÃ­a de estilo`*

### 4.3 Column 2 â€” Investing Â· 2024â€“Now *(emphasized)*

- **H3:** Where my hours go today
  *A dÃ³nde van mis horas hoy*
- **Body:** The frontline moved. I moved with it. Craft is now judgment + orchestration: I ship what used to take a team, and I ship the tools that make it possible.
  *La frontera se moviÃ³. Me movÃ­ con ella. El craft ahora es juicio + orquestaciÃ³n: entrego lo que antes tomaba un equipo, y entrego las herramientas que lo hacen posible.*
- **Chips (5, clickable):**

| Chip (EN / ES) | Links to |
|---|---|
| `Agent orchestration` / `OrquestaciÃ³n de agentes` | `#case-enregla` |
| `MCP servers` / `MCP servers` | `#case-enregla-mcp` |
| `Design-system-as-skill` / `Design-system-as-skill` | `#case-te-skin` |
| `Recursive critic loops` / `Loops de crÃ­tico recursivos` | `#case-te-black` |
| `Taste as rubric` / `Taste como rÃºbrica` | `#tab-method` |

### 4.4 Column 3 â€” Next horizon Â· 12 mo

- **H3:** What I'm walking toward
  *Hacia dÃ³nde camino*
- **Body:** Embedded in a serious product team, owning the seam between design judgment and agentic execution â€” at a scale where one person's leverage becomes a team's.
  *Embebido en un equipo de producto serio, dueÃ±o de la costura entre juicio de diseÃ±o y ejecuciÃ³n agÃ©ntica â€” a una escala donde el leverage de una persona se convierte en el del equipo.*
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
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ HERO                                      â”‚ â† unchanged
â”‚   thesis line, tagline, proof numbers     â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ HORIZON TIMELINE   â—„â”€â”€ NEW                â”‚ â† first new section
â”‚   eyebrow + H2                            â”‚
â”‚   [Earned] [Investing] [Next horizon]     â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ TAB NAV                                   â”‚ â† unchanged
â”‚   Overview / Work / Method / About /      â”‚
â”‚   Contact                                 â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ â€¦rest of pageâ€¦                            â”‚ â† unchanged
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

Location decision (from brainstorming): **below the current hero, as the first new section**. Not a tab, not a hero replacement.

---

## 6. User / reader flow

The flow the hiring manager takes when this section does its job:

```
Landing loads
    â”‚
    â–¼
Hero (thesis + proof numbers)
    â”‚
    â–¼
Horizon section enters viewport
    â”‚
    â–¼
Scan 5s â†’ reads the 3 stage labels + emphasized middle column
    â”‚
    â”œâ”€â”€â”€ Convinced enough? â”€â”€â”€â”
    â”‚                         â”‚
    â–¼                         â–¼
 Reads Investing body     Scrolls past to cases
    â”‚                         â”‚
    â–¼                         â”‚
 Clicks a chip â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
    â”‚                         â”‚
    â–¼                         â”‚
 Lands on a case study        â”‚
    â”‚                         â”‚
    â””â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
         â–¼
   Cases / Method / About (unchanged path)
         â”‚
         â–¼
       Contact CTA
```

Key branches:
- **Scan-only reader:** leaves with the framing "this person knows where they're going" without clicking anything. Still a win if they come back.
- **Skeptical reader:** clicks a chip â†’ lands on concrete evidence â†’ returns with credibility established.
- **Curious-about-future reader:** reads the `Next horizon` column â†’ sees the "bet" badge â†’ registers honesty instead of hype.

---

## 7. Implementation scope

### 7.1 Files touched (4)

| File | Change |
|---|---|
| `generadores/lib/load-data.ts` | Load `horizon.yaml` into `LandingData.horizon` |
| `generadores/lib/types.ts` | Add `HorizonSection` type: `{ eyebrow, sectionTitle, columns: HorizonColumn[] }` where each column has `id`, `stage`, `heading`, `body`, `emphasis?`, `chips: HorizonChip[]` |
| `generadores/templates/v11-landing/index.ts` | New `renderHorizon(data, lang)` function; injected between hero and tab-nav |
| `generadores/templates/v11-landing/v11-styles.ts` | Append `.horizon-*` CSS block adapted from the mockup |

### 7.2 Files created (1)

- `perfil/data/horizon.yaml` â€” bilingual source of truth (schema in Â§7.4)

### 7.3 Files untouched

- `v11-script.ts` â€” pure CSS solution; chips are native `<a>`
- Hero, tabs, cases, testimonials, method, contact sections
- `design-system/tokens-web.css` â€” all required tokens already exist (`--v11-accent`, `--v11-accent-soft`, `--v11-accent-line`, `--v11-line`, `--v11-line-strong`)
- Other landings (`dist/landing/`, `dist/landing-huly/`) â€” out of scope

### 7.3.1 Anchor prerequisites

The chips in Â§4 reference on-page anchors. Before implementation, the plan must **audit the current v11 output** and, for every anchor used, either (a) confirm it already exists on an existing element, or (b) add an `id` attribute to the right element (e.g., the case card, the Method tab panel). Anchor additions are the only permitted exception to Â§7.3's "untouched" rule â€” they are additive (`id="â€¦"`) and change no other markup.

Anchors referenced:
- `#case-enregla`, `#case-enregla-mcp`, `#case-te-skin`, `#case-te-black` â€” likely need to be added to case-card DOM
- `#tab-method` â€” likely needs to be added to the Method tab panel
- `#skills-audit` â€” if no existing target, this chip becomes a `bet` instead of evidence

Test #7 is the enforcement â€” a silently missing anchor is a build failure.

### 7.4 `horizon.yaml` schema

```yaml
eyebrow:
  en: "Direction Â· 2026"
  es: "DirecciÃ³n Â· 2026"

sectionTitle:
  en: "Where my hours are going"
  es: "A dÃ³nde van mis horas"

columns:
  - id: earned            # string, stable
    stage: { en: "...", es: "..." }
    heading: { en: "...", es: "..." }
    body: { en: "...", es: "..." }
    chips:
      - label: { en: "...", es: "..." }
        # no href â†’ rendered as <span>, strikethrough

  - id: investing
    emphasis: true        # boolean, optional â€” triggers accent treatment
    stage: { en: "...", es: "..." }
    heading: { en: "...", es: "..." }
    body: { en: "...", es: "..." }
    chips:
      - label: { en: "...", es: "..." }
        href: "#case-enregla"
        # href present â†’ rendered as <a>

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
        # no href + kind: bet â†’ dashed border + "bet" badge
```

### 7.5 Accessibility

- Non-clickable past chips: `<span>` with `aria-label="Earned, now commoditized: {label}"` so a screen reader contextualizes the strikethrough instead of reading a bare word.
- Clickable chips: native `<a href>`, keyboard-tabbable, visible focus ring using existing `--v11-accent-ring`.
- "Bet" chips: `aria-label="{label}. Declared bet, no evidence yet."` plus a visible small badge reading `bet`.
- The decorative timeline connector (`::before` line) is `aria-hidden` (decorative, no semantic meaning).
- Column emphasis is expressed in at least two channels: color (accent) + font weight or dot size â€” not color alone.

---

## 8. Tests (added to `tests/landing/v11.test.ts`)

1. **Section placement** â€” horizon section renders after the hero and before the tab-nav, in EN and ES.
2. **Emphasized column** â€” the `investing` column has `data-emphasis="true"` on its root element, and the accent dot class is applied.
3. **Investing chips are links** â€” all 5 chips in the `investing` column are `<a>` elements with non-empty `href`.
4. **Horizon column composition** â€” the `horizon` column contains exactly 2 chips with `kind="evidence"` and 1 chip with `kind="bet"`.
5. **Past chips have contextual aria-label** â€” every chip in the `earned` column has an `aria-label` that starts with "Earned" / "Ganado".
6. **HTML budget** â€” rendered output stays below the existing `400_000`-byte budget for both locales.
7. **Internal anchors resolve** â€” every `href="#..."` in the horizon section points to an `id` that exists elsewhere in the rendered HTML. (Prevents silent dead links as the data file drifts.)

---

## 9. Risks and mitigations

| Risk | Mitigation |
|---|---|
| `horizon.yaml` `href` drifts from `id` in the rest of the page | Test #7 enforces internal-anchor resolution at build time. |
| Tablet viewport (1024px) layout collapses awkwardly | Mediaquery at 920px collapses to vertical (same as mockup); verified visually during implementation. |
| Copy ages out (the 12-month horizon) | Eyebrow includes the year (`Direction Â· 2026`) â€” revisiting next year is obvious by scent. |
| Reader parses struck-through past as self-deprecation | Body copy in Column 1 explicitly reframes: *"I keep the judgment â€” the hours that built it no longer compound."* Tone stays confident, not apologetic. |
| Emphasis on Column 2 relies on accent color alone | Emphasis is multi-channel: accent color + larger dot + filled chip backgrounds; fails gracefully for color-blind readers. |

---

## 10. Out of scope

- No changes to the hero (thesis line and proof-numbers strip stay exactly as they are).
- No changes to other landings (`dist/landing/`, `dist/landing-huly/`).
- No new "Direction" tab (explicitly rejected during brainstorming).
- No deployment work â€” this ships as a local build only.
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
- [ ] Mobile â‰¤ 920px collapses to vertical without overlap
- [ ] Diff is surgical: hero, tabs, cases, testimonials, method, contact untouched
