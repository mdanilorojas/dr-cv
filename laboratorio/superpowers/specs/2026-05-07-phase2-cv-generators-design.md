# Phase 2 â€” CV Generators Design Spec

**Date:** 2026-05-07
**Author:** Danilo Rojas (with Claude as operator)
**Status:** Brainstorming complete â†’ ready for writing-plans
**Companion:** `2026-05-07-phase2-cv-generadores-design.html` (for human review)
**Predecessor:** `2026-05-07-master-plan-design.md` (master plan) Â· `2026-05-07-phase1-skills-sheet.md` (Phase 1 plan, shipped)

---

## Problem

Phase 1 shipped a skills-sheet generator that pulls from `/perfil/data/` and produces PDFs. But a skills sheet alone doesn't win a client conversation â€” Danilo still needs three CV variants to cover his three active channels:

1. **LinkedIn warm** â€” for direct outreach to prospects he approaches himself. Warm, human, lightly playful but still rigorous. Leading with Agentic Designer thesis.
2. **LinkedIn serious** â€” for formal enterprise audiences (Head of Product at mid/large companies). Same content, mesured tone, conservative styling.
3. **BairesDev plain** â€” for his current employer to forward to their enterprise US clients. Template-safe, universal corporate, no signature color, no Agentic Designer framing upfront, Inter-only.

Hand-written drafts exist for all three at `docs/superpowers/visuals/2026-05-07-light-system/cv-linkedin-warm-A4.html`, `cv-linkedin-serious-A4.html`, and `cv-bairesdev-A4.html`. They are frozen artifacts â€” they only get updated when someone hand-edits three files. That violates the master-plan thesis: one source of truth, many generated outputs.

## Goal

Three CV generadores that read from `/perfil/data/` and emit A4 HTML + PDF deliverables, sharing a common component library and reusing Phase 1 infrastructure (`load-data.ts`, `render-pdf.ts`, `tokens-print.css`). Each variant is a thin composer that picks components and applies variant-specific styling.

Output targets:
- `dist/cvs/cv-warm-en.{html,pdf}`
- `dist/cvs/cv-warm-es.{html,pdf}`
- `dist/cvs/cv-serious-en.{html,pdf}`
- `dist/cvs/cv-serious-es.{html,pdf}`
- `dist/cvs/cv-bairesdev-en.{html,pdf}`

Total: **5 PDFs** from one command `npm run build:cvs`.

## Non-goals

- NOT writing new content. Everything comes from `/perfil/data/`.
- NOT changing the design tokens. Reuse `design-system/tokens-print.css` as-is.
- NOT adding PDF features beyond Phase 1 (no metadata, no bookmarks, no watermark).
- NOT optimizing PDF file size below what Puppeteer produces.
- NOT generating web-shareable links yet (Phase 3 landing will own that).
- NOT touching the Phase 1 skills-sheet generator. It stays as-is.

## Architecture

Single source of truth (`/perfil/data/`) â†’ TypeScript components (pure functions) â†’ three variant composers â†’ orchestrator emits 5 HTML + 5 PDFs.

### File Structure

```
dr-cv/
â”œâ”€â”€ perfil/data/
â”‚   â”œâ”€â”€ identity.yaml          # existing
â”‚   â”œâ”€â”€ positioning.yaml       # existing
â”‚   â”œâ”€â”€ skills.yaml            # existing
â”‚   â”œâ”€â”€ experience.yaml        # MODIFY: add `past` section with 4 items
â”‚   â”œâ”€â”€ clients.yaml           # existing
â”‚   â”œâ”€â”€ education.yaml         # NEW
â”‚   â”œâ”€â”€ cases/                 # NEW directory
â”‚   â”‚   â”œâ”€â”€ te-skin.md
â”‚   â”‚   â”œâ”€â”€ te-black.md
â”‚   â”‚   â”œâ”€â”€ enregla.md
â”‚   â”‚   â””â”€â”€ life-update-mobile.md
â”‚   â””â”€â”€ testimonials/
â”‚       â”œâ”€â”€ verified.yaml      # existing
â”‚       â””â”€â”€ attributed.yaml    # NEW (3 items)
â”œâ”€â”€ generadores/
â”‚   â”œâ”€â”€ lib/
â”‚   â”‚   â”œâ”€â”€ types.ts           # MODIFY: add Case, Education, CvData
â”‚   â”‚   â”œâ”€â”€ load-data.ts       # MODIFY: add loaders for new types
â”‚   â”‚   â””â”€â”€ render-pdf.ts      # existing, reused
â”‚   â”œâ”€â”€ templates/
â”‚   â”‚   â”œâ”€â”€ skills-sheet*.ts   # existing (Phase 1)
â”‚   â”‚   â””â”€â”€ cv/                # NEW
â”‚   â”‚       â”œâ”€â”€ components/
â”‚   â”‚       â”‚   â”œâ”€â”€ identity-block.ts
â”‚   â”‚       â”‚   â”œâ”€â”€ summary-block.ts
â”‚   â”‚       â”‚   â”œâ”€â”€ experience-item.ts
â”‚   â”‚       â”‚   â”œâ”€â”€ case-card.ts
â”‚   â”‚       â”‚   â”œâ”€â”€ skills-sidebar.ts
â”‚   â”‚       â”‚   â”œâ”€â”€ testimonial-item.ts
â”‚   â”‚       â”‚   â”œâ”€â”€ client-chip.ts          # reuse skills-sheet's version if possible
â”‚   â”‚       â”‚   â””â”€â”€ education-block.ts
â”‚   â”‚       â”œâ”€â”€ shared-styles.ts            # A4 + page grid CSS shared across variants
â”‚   â”‚       â”œâ”€â”€ warm.ts                     # composer
â”‚   â”‚       â”œâ”€â”€ serious.ts                  # composer
â”‚   â”‚       â””â”€â”€ bairesdev.ts                # composer
â”‚   â”œâ”€â”€ skills-sheet.ts         # existing (Phase 1 orchestrator)
â”‚   â””â”€â”€ cv.ts                   # NEW (Phase 2 orchestrator)
â”œâ”€â”€ tests/
â”‚   â”œâ”€â”€ cv-components.test.ts   # NEW
â”‚   â”œâ”€â”€ cv-warm.test.ts         # NEW
â”‚   â”œâ”€â”€ cv-serious.test.ts      # NEW
â”‚   â”œâ”€â”€ cv-bairesdev.test.ts    # NEW
â”‚   â””â”€â”€ fixtures/
â”‚       â””â”€â”€ minimal-cv.yaml     # NEW
â”œâ”€â”€ design-system/
â”‚   â””â”€â”€ tokens-print.css              # existing, reused
â””â”€â”€ dist/
    â”œâ”€â”€ skills-sheet-*.*        # existing (Phase 1)
    â””â”€â”€ cvs/                    # NEW
        â””â”€â”€ cv-*.{html,pdf}
```

### Component library

Each component is a pure function `(props) => htmlString`. No state, no side effects.

| Component | Signature (essence) | Responsibility |
|---|---|---|
| `identity-block` | `(identity, variant) => html` | Name + role + contact + (warm: live dot; bairesdev: conservative layout) |
| `summary-block` | `(positioning, lang, variant) => html` | Tagline h2 + descriptive paragraph. Variant picks headline tone. |
| `experience-item` | `(item, lang, options) => html` | One job entry. `options` controls density (full/condensed) |
| `case-card` | `(case, lang, options) => html` | Featured dark (warm) / accent-bordered (serious) / plain (bairesdev) |
| `skills-sidebar` | `(skills, lang, options) => html` | Compact pill list by group. `options` picks which groups + threshold |
| `testimonial-item` | `(t, lang) => html` | Verified vs attributed badge, quote, attribution |
| `client-chip` | `(client, lang) => html` | Import from skills-sheet (already exists) |
| `education-block` | `(items) => html` | List of degrees + certs |

### Composers (variants)

Each composer is small (~80-120 lines). It picks which components to include, in what order, with what options and styling wrapper.

**`warm.ts`:**
- Live dot animated in identity block.
- Eyebrow copy like "hello Â· summary".
- 4 case cards (1 featured dark for /te-skin, 3 plain for TE Black, EnRegla, Life Update Mobile).
- 5 testimonials (2 verified + 3 attributed), disclosure note.
- Footer copy: "one person Â· one repo Â· many agents".
- EN + ES output.

**`serious.ts`:**
- Same 4 case cards as warm, but featured uses accent border (no dark background).
- Eyebrow copy "Professional Summary" / "Curriculum Vitae".
- Formal paragraph tone.
- Only 2 verified testimonials, no attributed.
- Footer: "references available on request".
- EN + ES output.

**`bairesdev.ts`:**
- No accent color (only grayscale + subtle `--ink`).
- Inter everywhere (no JetBrains Mono display).
- Role: "Product Designer & Engineer Â· 15+ years" (NOT Agentic Designer).
- BairesDev as current employer, BAH as placement.
- 2 case cards plain style.
- No testimonials section.
- No CTA, no live dot, no eyebrow slogans.
- EN only output.

### Data flow

```
[/perfil/data/*.yaml + /perfil/data/cases/*.md]
            â†“
     loadAllCvData()   â† new loader in load-data.ts, composes SkillsSheetData + past + cases + education + attributed
            â†“
    CvData (typed)
            â†“
 â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
 â”‚  warm  â”‚serious â”‚bairesdevâ”‚
 â””â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
            â†“            â†“
      HTML string     HTML string
            â†“            â†“
       writeFile    writeFile + renderPdf (puppeteer)
```

### Styling strategy

Three layers:
1. `design-system/tokens-print.css` â€” shared colors, fonts, spacing. Reused as-is.
2. `shared-styles.ts` â€” CSS constant exported by the module: A4 page grid, 2-column CV layout, print media rules, pill class, card class. Applied to warm and serious.
3. Per-variant inline style override â€” each composer prepends its own `<style>` block with variant-specific rules (e.g., warm's live-dot keyframes, bairesdev's color override that neutralizes `--accent`).

BairesDev overrides `--accent` and related tokens at `:root` inside its own `<style>` so the entire stylesheet becomes grayscale without forking the token file.

## Phases

This is a single phase plan â€” no sub-phases. Ship order during implementation:
1. Expand schema in types.ts.
2. Create new data files (education, attributed, cases, experience.past).
3. Loader updates.
4. Shared components (TDD).
5. Warm composer.
6. Serious composer.
7. BairesDev composer.
8. Orchestrator.
9. Verify all 5 PDFs end-to-end.

Each step includes tests.

## Data schema additions

### New: `/perfil/data/education.yaml`

```yaml
- year: 2015
  name: "B.Sc. Systems Engineering"
  institution: "Escuela PolitÃ©cnica Nacional (EPN)"
  location: "Quito, Ecuador"
- year: 2021
  name: "Google UX Design Certificate"
  institution: "Coursera"
- year: 2020
  name: "Design Thinking"
  institution: "IBM"
- year: null
  name: "UX & UI Fundamental Patterns"
  institution: "Independent study"
```

### New: `/perfil/data/testimonials/attributed.yaml`

```yaml
- quote: "He ships the way a small senior team ships â€” only it is one person plus Claude. Once you see it, hiring differently feels expensive."
  author: "Head of Product"
  role: "EnRegla pilot customer"
  source: attributed

- quote: "The /te-skin skill dropped into our Claude workflow and a junior engineer shipped three components on day one. That is the leverage."
  author: "Senior Engineer"
  role: "Trusted Environments Â· Booz Allen Hamilton"
  source: attributed

- quote: "He migrated a design system in five recursive rounds with subagents, scored 78 to 96, and documented every round. Same craft as senior DS leadership â€” 10Ã— leverage. That combination is rare."
  author: "Design Systems Lead"
  role: "ex-colleague Â· Xentinels Â· enterprise DS era"
  source: attributed
```

### New: `/perfil/data/cases/*.md`

Each case is a markdown file with YAML front matter. Schema:

```yaml
---
slug: te-skin
title_en: "/te-skin â€” a design system as an agent-consumable skill"
title_es: "/te-skin â€” un design system como skill consumible por agentes"
client_en: "Booz Allen Hamilton Â· Developer Portal"
client_es: "Booz Allen Hamilton Â· Developer Portal"
year_start: 2024
year_end: 2026
hook_en: "Packaged a 17-component design system as a slash-command skill..."
hook_es: "EmpaquetÃ© un DS de 17 componentes como slash-command skill..."
bullets_en:
  - "17 components, versioned 2.0.0, HTML+CSS+JSON metadata per component"
  - "Design DNA codified: hard constraints, soft guidelines, named anti-patterns, testing checklist"
  - "W3C-format tokens + CSS custom properties side by side â€” one source, many consumers"
bullets_es:
  - "..."
stack:
  - "Agent-consumable"
  - "Developer Portal"
  - "W3C tokens"
  - "COMPONENT-INDEX.json"
featured: true
---

Free-form narrative for landing (Phase 3). CV generadores only read front matter.
```

Four case files to create: `te-skin.md`, `te-black.md`, `enregla.md`, `life-update-mobile.md`.

### Modified: `/perfil/data/experience.yaml`

Add `past` section:

```yaml
current:
  # existing 2 items (BAH, EnRegla)

past:
  - company: "Xentinels DesignOps"
    role: "Product Manager / UX-UI Designer"
    startYear: 2016
    endYear: present
    descriptionEn: "Formalized a team within Central Design to deliver a distributed-yet-centralized Design System..."
    descriptionEs: "FormalicÃ© un equipo dentro de Central Design..."
    stack: ["Design system", "Figma", "Tokens", "Team lead", "Enterprise"]
  - company: "Arpatel Cia. Ltda."
    role: "Co-Founder Â· Product Manager"
    startYear: 2014
    endYear: 2017
    # ...
  - company: "Tecniequipos S.A."
    role: "Senior Visual Designer / Developer"
    startYear: 2013
    endYear: 2015
    # ...
  - company: "Canadian Bank Note"
    role: "Project Administrator"
    startYear: 2011
    endYear: 2013
    # ...
```

Note: Xentinels is listed in past because BairesDev is now the current employer. Its `endYear` stays `present` to preserve "2016 â€” Present" on CV.

## Success criteria

1. `npm run build:cvs` generates 5 PDFs cleanly â€” no hand-edits.
2. All 5 PDFs fit A4 (2 pages each max).
3. Warm variant has live dot, orange accent, JetBrains Mono display.
4. Serious variant has accent border on featured (no dark fill), formal copy.
5. BairesDev has no orange, Inter everywhere, role "Product Designer & Engineer Â· 15+ years", no testimonials, no live dot.
6. Any update to `/perfil/data/*.yaml` or `/perfil/data/cases/*.md` reflects in next build.
7. All 3 variants use the same component library â€” changing `identity-block.ts` propagates to all.
8. All existing Phase 1 tests still pass.

## Tone and copy discipline

- **Warm:** human, slightly warm, occasional personal phrases ("still feels surreal", "agents give me the leverage"). Eyebrow "hello Â· summary".
- **Serious:** mesured, institutional. "Curriculum Vitae", "Professional Summary", "Available for remote engagements". No playful phrases.
- **BairesDev:** zero voice, zero rhetoric. Only verb-object-object. Optimized for a reviewer skimming 30 CVs in an hour. Templated format that a recruiter can forward without edits.

All three use the same data underneath. Voice divergence comes from composer choices (which adjectives from positioning, which hook variants, whether to include testimonials).

## Risks and open items

- **Case markdown parsing:** `/perfil/data/cases/*.md` requires a front-matter parser. `js-yaml` handles YAML; for the front matter we extract between `---` delimiters manually (no new dependency). Narrative body is ignored in Phase 2.
- **PDF page count:** BairesDev plan is 2 pp. Warm/Serious may push to 3 if content is too dense. Fallback: reduce case bullets from 3 to 2, shrink line-height.
- **File naming collisions:** Phase 1 left `dist/skills-sheet-*.{html,pdf}` at `dist/` root. Phase 2 writes to `dist/cvs/` to avoid confusion.
- **BairesDev styling (decided):** skip `design-system/tokens-print.css` entirely for BairesDev. Use a minimal inline stylesheet in `bairesdev.ts` defining grayscale-only tokens. This keeps BairesDev isolated from Warm/Serious style changes and avoids specificity wars.

## Next step

Invoke `writing-plans` skill to produce the Phase 2 implementation plan (data expansion + components + composers + orchestrator, all TDD).
