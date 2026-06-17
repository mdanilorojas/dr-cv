# CV clean — design spec

**Date:** 2026-06-16
**Status:** approved (design), pending implementation plan
**Owner:** Danilo Rojas

## Goal

One canonical, ultra-clean, single-page A4 CV that is a faithful reflection
of the v11 landing's structural/blueprint language (light theme). It replaces
the warm / serious / bairesdev variants. Same data, one register, high bar.

## Decisions (locked)

| Question | Decision |
|---|---|
| Variants | One canonical CV. Archive warm/serious/bairesdev. |
| Length | 1 page A4. |
| Theme | Light (paper) — mirrors landing light theme. |
| Languages | EN + ES. |
| Proof-numbers row | Removed (more sober). |
| Color | Monochrome. Single accent = the ink. No orange. |
| Source of truth | `perfil/data/*` (same as landing). CV invents no data. |

## Architecture

- New template `generadores/templates/cv/clean.ts` exporting
  `renderCleanCv(data, lang, tokensCss?)`.
- `generadores/cv.ts` emits **only** `cv-clean-en` and `cv-clean-es`
  (HTML + A4 PDF through the existing `renderPdf` puppeteer pipeline).
- Palette/typography inline in the template (self-contained, mirrors the
  landing light theme). It does **not** depend on `tokens-print.css` (huly).
- Data loaded via the existing `loadCvData(dataDir)`.

### Archival

- Move `generadores/templates/cv/{warm,serious,bairesdev}.ts` (and any
  components used only by them) to `laboratorio/cv-archive/`.
- Remove their emit calls from `cv.ts`.
- Remove `dist/cvs/cv-{warm,serious,bairesdev}-*.{html,pdf}` from the build
  output. Nothing deleted destructively beyond regenerable `dist/` artifacts;
  sources are preserved under `laboratorio/cv-archive/`.

## Layout (single column, A4, ~64px margins)

1. **Header** — name (large, -0.02em), role line, `Open to work · Remote
   global` with a green status dot; mono contact block right-aligned
   (site, email, linkedin, github, location).
2. **Hairline + lead** — `I design products for **complex, regulated
   environments.**` followed by the short thesis in dim ink. Mirror of the
   hero; no number row.
3. **Experience // selected** — mono year gutter + entries:
   - 2022—NOW · Booz Allen Hamilton (badge `Army · DoD`) — design-engineering.
   - 2026—NOW · Compliance SaaS · LATAM (badge `paying pilots`) — founder.
   - 2016—NOW · Xentinels DesignOps — PM / UX-UI, distributed DS.
   - 2011—17 · Arpatel · Tecniequipos · Canadian Bank Note — condensed line.
4. **Capabilities + Education** (two columns):
   - Capabilities: 4 lines — Design systems / Engineering / Agents / Strategy
     (the `mastered` items, summarized).
   - Education: EPN B.Sc. 2015, Google UX 2021, IBM Design Thinking 2020.
5. **Footer** — mono: `Danilo Rojas — Senior Product Designer ·
   danilorojas.design`.

### Visual language

- Inter body, JetBrains Mono microlabels, optional Source Serif italic for a
  single accent line if needed.
- Hairlines (`rgba(20,22,28,.16)` / soft `.09`) for all rules and the
  experience separators; faint masked grid backdrop like the landing.
- Hierarchy by size + rules, not color. Generous whitespace. Everything must
  fit one A4 page with breathing room — edit ruthlessly.

## Content rules

- All copy derived from `perfil/data` (identity, positioning, experience,
  skills, education). Condense for one page; never invent claims.
- EN is primary; ES is the localized twin from the same fields.

## Success criteria

1. `npm run build:cvs` emits exactly `cv-clean-en` and `cv-clean-es`
   (HTML + PDF), no warm/serious/bairesdev outputs.
2. Each PDF is exactly one A4 page.
3. Visual matches the approved light direction (mockup
   `laboratorio/superpowers/visuals/2026-06-16-cv-clean-direction/`).
4. Old CV sources live under `laboratorio/cv-archive/`; `cv.ts` no longer
   references them.
5. `npm test` and `npm run typecheck` pass; CV component tests updated to the
   new template.

## Out of scope

- Register variants (sober vs AI-forward) — single register for now.
- Case-study annex / page 2.
- Dark CV output.
