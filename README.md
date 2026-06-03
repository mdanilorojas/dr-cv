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

## Phase 3 · Landing page v11 — shipped

```bash
npm run build:landing-v11
npx http-server dist/landing-v11 -p 5174    # serve locally
```

Produces:
- `dist/landing-v11/index.html` (English)
- `dist/landing-v11/es/index.html` (Spanish)
- `dist/landing-v11/work/<slug>/index.html` — case detail pages (EN)
- `dist/landing-v11/es/work/<slug>/index.html` — case detail pages (ES)

Edit any file under `/data/*.yaml` or `/data/landing.yaml`, rebuild, and the output reflects the change.

---

## Structure

Ver `CLAUDE.md` para la política completa. Resumen:

```
dr-cv/
├── productos/               # qué sale de aquí, organizado por deliverable
│   ├── cv/                  # CVs PDF (warm / serious / bairesdev × EN/ES)
│   ├── skills-sheet/        # skills sheet 2 páginas A4
│   ├── landing/             # landing v11 (danilorojas.design)
│   └── social/              # LinkedIn, contenido hecho a mano
│
├── data/                    # single source of truth (YAML + cases MD)
├── design-system/           # tokens CSS por variante
├── generators/              # code: data → HTML/PDF
│   ├── lib/                 # types, loader, renderers
│   └── templates/           # pure functions: (data, lang) → html
├── tests/                   # vitest suites
├── assets/                  # photo, animations (copiados a dist/ en build)
├── dist/                    # outputs generados
│
├── pruebas/                 # TODO lo exploratorio vive aquí
│   ├── superpowers/         # specs, plans, visuals (brainstorming artifacts)
│   ├── landing-exploration/ # variantes descartadas de la landing
│   ├── prompts/             # feedback guardado del usuario
│   └── audits/              # auditorías internas
│
└── referencias/             # inspiración externa (Huly, hiring, visual)
```

---

## Commands

| Command | What it does |
|---|---|
| `npm install` | Install deps (Node 20+, TS, vitest, puppeteer, js-yaml) |
| `npm run build:skills-sheet` | Regenerate `dist/skills-sheet-{en,es}.{html,pdf}` |
| `npm run build:cvs` | Regenerate 5 CV PDFs in `dist/cvs/` |
| `npm run build:landing-v11` | Regenerate `dist/landing-v11/` (landing + case details, EN+ES) |
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
