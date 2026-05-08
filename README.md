# dr-cv

**A system that keeps itself alive — with agents.**

One source of truth, many generated deliverables: skills sheet, CVs, landing page.

---

## What this is

`dr-cv` is my personal professional identity, structured as code.

Everything that describes me — skills, experience, cases, clients, testimonials — lives in `/data/` as YAML. A thin TypeScript generator reads that data and emits the artifacts clients actually see: a PDF skills sheet today, multiple CV variants and a landing page soon.

The thesis: I ship real products, and I ship the tools agents use to help me ship them. This repo is one of those tools.

---

## Phase 1 · Skills sheet — shipped

```bash
npm install
npm run build:skills-sheet
```

Produces:
- `dist/skills-sheet-en.html` + `.pdf` (2 A4 pages)
- `dist/skills-sheet-es.html` + `.pdf` (2 A4 pages)

## Phase 2 · CV variants — shipped

```bash
npm run build:cvs
```

Produces 5 PDFs in `dist/cvs/`:
- `cv-warm-{en,es}.pdf` — LinkedIn warm (Agentic Designer, featured-dark, 5 testimonials)
- `cv-serious-{en,es}.pdf` — LinkedIn serious (accent border, verified-only testimonials)
- `cv-bairesdev-en.pdf` — BairesDev placement (minimalist sans+mono, grayscale, no testimonials)

## Phase 3 · Landing page — shipped

```bash
npm run build:landing
npx http-server dist/landing    # serve locally
```

Produces:
- `dist/landing/index.html` (English)
- `dist/landing/es/index.html` (Spanish)

Single-file tab-SPA per language, dark-dominant Huly aesthetic. Open in any browser.

Edit any file under `/data/*.yaml` or `/data/landing.yaml`, rebuild, and the output reflects the change.

---

## Structure

```
dr-cv/
├── data/                    # single source of truth (YAML)
│   ├── identity.yaml
│   ├── positioning.yaml
│   ├── skills.yaml          # dual taxonomy: by product layer + by client outcome
│   ├── experience.yaml
│   ├── clients.yaml
│   └── testimonials/
├── design-system/
│   └── tokens.css           # Huly-inspired light-mode tokens
├── generators/
│   ├── lib/                 # types, loader, PDF renderer
│   ├── templates/           # pure functions: (data, lang) -> html
│   └── skills-sheet.ts      # orchestrator
├── tests/                   # 30 tests, vitest
├── docs/
│   ├── superpowers/
│   │   ├── specs/           # master plan spec (MD + HTML companion)
│   │   └── plans/           # phase 1 implementation plan
│   └── audits/              # GitHub audit (public); BAH audit (.gitignored)
└── dist/                    # generated outputs (gitignored)
```

---

## Commands

| Command | What it does |
|---|---|
| `npm install` | Install deps (Node 20+, TS, vitest, puppeteer, js-yaml) |
| `npm run build:skills-sheet` | Regenerate `dist/skills-sheet-{en,es}.{html,pdf}` |
| `npm run build:cvs` | Regenerate 5 CV PDFs in `dist/cvs/` |
| `npm run build:landing` | Regenerate `dist/landing/{index.html, es/index.html}` |
| `npm run build:all` | Run all three generators in sequence |
| `npm test` | Run the full test suite (158 tests) |
| `npm run typecheck` | Verify TypeScript types |

---

## Next phases

- **Phase 4+** — The "me" agent conversational interface · testimonial pipeline · auto-update agents · custom domain (`danilorojas.design`)

Each phase gets its own spec + plan before code.

---

## Positioning

**Agentic Designer · Product Engineer**

Fifteen years of delivery. Currently consulting at Booz Allen Hamilton on the Trusted Environments program. Building EnRegla, my own compliance SaaS, now with early paying pilots.

The combination is the product.
