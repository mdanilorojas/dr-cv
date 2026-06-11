# Phase 2 â€” CV Generators Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce three CV variants (Warm, Serious, BairesDev) generated from `/perfil/data/`, sharing a common component library, emitting 5 total PDFs (Warm EN+ES, Serious EN+ES, BairesDev EN) via `npm run build:cvs`.

**Architecture:** Pure components (`(props) => htmlString`) live in `generadores/templates/cv/components/`. Three thin composers (`warm.ts`, `serious.ts`, `bairesdev.ts`) compose them with variant-specific options. Shared styles in `shared-styles.ts` (Warm/Serious) vs inline grayscale stylesheet (BairesDev). Orchestrator `generadores/cv.ts` loops all 5 combinations through the existing Phase 1 `renderPdf` utility.

**Tech Stack:** Node 20+, TypeScript strict, js-yaml, puppeteer, vitest, tsx. All from Phase 1.

**Success criteria (from spec):**
1. `npm run build:cvs` generates 5 PDFs cleanly.
2. All 5 PDFs fit A4, 2 pages each max.
3. Warm has live dot, orange accent, JetBrains Mono display.
4. Serious has accent border on featured (no dark fill), formal copy.
5. BairesDev has no orange, Inter everywhere, role "Product Designer & Engineer Â· 15+ years", no testimonials.
6. Updating `/perfil/data/` propagates to next build.
7. All 3 variants use the same component library.
8. All Phase 1 tests still pass.

---

## File Structure

```
dr-cv/
â”œâ”€â”€ package.json                                       # MODIFY: add build:cvs script
â”œâ”€â”€ perfil/data/
â”‚   â”œâ”€â”€ identity.yaml                                  # existing (Phase 1)
â”‚   â”œâ”€â”€ positioning.yaml                               # existing (Phase 1)
â”‚   â”œâ”€â”€ skills.yaml                                    # existing (Phase 1)
â”‚   â”œâ”€â”€ clients.yaml                                   # existing (Phase 1)
â”‚   â”œâ”€â”€ experience.yaml                                # MODIFY: add `past` section
â”‚   â”œâ”€â”€ education.yaml                                 # NEW
â”‚   â”œâ”€â”€ cases/                                         # NEW directory
â”‚   â”‚   â”œâ”€â”€ te-skin.md
â”‚   â”‚   â”œâ”€â”€ te-black.md
â”‚   â”‚   â”œâ”€â”€ enregla.md
â”‚   â”‚   â””â”€â”€ life-update-mobile.md
â”‚   â””â”€â”€ testimonials/
â”‚       â”œâ”€â”€ verified.yaml                              # existing (Phase 1)
â”‚       â””â”€â”€ attributed.yaml                            # NEW
â”œâ”€â”€ generadores/
â”‚   â”œâ”€â”€ lib/
â”‚   â”‚   â”œâ”€â”€ types.ts                                   # MODIFY: add Case, Education, CvData + past in Experience
â”‚   â”‚   â”œâ”€â”€ load-data.ts                               # MODIFY: add loadCases, loadEducation, loadAttributed, loadCvData
â”‚   â”‚   â””â”€â”€ render-pdf.ts                              # existing (Phase 1)
â”‚   â”œâ”€â”€ templates/
â”‚   â”‚   â”œâ”€â”€ skills-sheet*.ts                           # existing (Phase 1) â€” untouched
â”‚   â”‚   â””â”€â”€ cv/                                        # NEW directory
â”‚   â”‚       â”œâ”€â”€ components/
â”‚   â”‚       â”‚   â”œâ”€â”€ identity-block.ts                  # NEW
â”‚   â”‚       â”‚   â”œâ”€â”€ summary-block.ts                   # NEW
â”‚   â”‚       â”‚   â”œâ”€â”€ experience-item.ts                 # NEW
â”‚   â”‚       â”‚   â”œâ”€â”€ case-card.ts                       # NEW
â”‚   â”‚       â”‚   â”œâ”€â”€ skills-sidebar.ts                  # NEW
â”‚   â”‚       â”‚   â”œâ”€â”€ testimonial-item.ts                # NEW
â”‚   â”‚       â”‚   â”œâ”€â”€ client-chip.ts                     # NEW
â”‚   â”‚       â”‚   â””â”€â”€ education-block.ts                 # NEW
â”‚   â”‚       â”œâ”€â”€ shared-styles.ts                       # NEW
â”‚   â”‚       â”œâ”€â”€ warm.ts                                # NEW
â”‚   â”‚       â”œâ”€â”€ serious.ts                             # NEW
â”‚   â”‚       â””â”€â”€ bairesdev.ts                           # NEW
â”‚   â”œâ”€â”€ skills-sheet.ts                                # existing (Phase 1)
â”‚   â””â”€â”€ cv.ts                                          # NEW orchestrator
â”œâ”€â”€ tests/
â”‚   â”œâ”€â”€ types.test.ts                                  # MODIFY: add Case, Education, CvData assertions
â”‚   â”œâ”€â”€ load-data.test.ts                              # MODIFY: add loader coverage
â”‚   â”œâ”€â”€ cv-components.test.ts                          # NEW
â”‚   â”œâ”€â”€ cv-warm.test.ts                                # NEW
â”‚   â”œâ”€â”€ cv-serious.test.ts                             # NEW
â”‚   â”œâ”€â”€ cv-bairesdev.test.ts                           # NEW
â”‚   â””â”€â”€ fixtures/
â”‚       â””â”€â”€ cases/                                     # NEW
â”‚           â””â”€â”€ test-case.md
â””â”€â”€ dist/cvs/                                          # NEW (gitignored via existing dist/ rule)
    â”œâ”€â”€ cv-warm-en.{html,pdf}
    â”œâ”€â”€ cv-warm-es.{html,pdf}
    â”œâ”€â”€ cv-serious-en.{html,pdf}
    â”œâ”€â”€ cv-serious-es.{html,pdf}
    â””â”€â”€ cv-bairesdev-en.{html,pdf}
```

**Responsibilities:**
- `perfil/data/` â€” content edited by Danilo or agents. Nothing else changes.
- `components/*.ts` â€” one pure function per file. Signatures: `(props) => string`. No I/O.
- `shared-styles.ts` â€” CSS string constant used by Warm + Serious composers (embedded into each HTML document).
- `warm.ts / serious.ts / bairesdev.ts` â€” each exports one function `renderCv(data, lang) => htmlString`. Each is 80â€“120 lines.
- `cv.ts` â€” orchestrator. Loads data once, calls each composer Ã— each lang combo, writes HTML + PDF.
- Tests â€” one file per composer + one file for components (aisladas).

---

## Task 1: Expand TypeScript types for CV data

**Files:**
- Modify: `C:/dev/dr-cv/generadores/lib/types.ts`
- Modify: `C:/dev/dr-cv/tests/types.test.ts`

- [ ] **Step 1: Add the failing test assertions**

Edit `C:/dev/dr-cv/tests/types.test.ts`. After the existing `describe("data schema types", ...)` block, append:

```typescript
import type {
  Case,
  Education,
  EducationItem,
  AttributedTestimonial,
  CvData,
} from "../generadores/lib/types.js";

describe("CV data schema types", () => {
  it("Case has multilingual title + hook + bullets + stack + featured", () => {
    expectTypeOf<Case>().toMatchTypeOf<{
      slug: string;
      titleEn: string;
      titleEs: string;
      clientEn: string;
      clientEs: string;
      yearStart: number;
      yearEnd: number | "present";
      hookEn: string;
      hookEs: string;
      bulletsEn: string[];
      bulletsEs: string[];
      stack: string[];
      featured: boolean;
    }>();
  });

  it("EducationItem has year (nullable) + name + institution", () => {
    expectTypeOf<EducationItem>().toMatchTypeOf<{
      year: number | null;
      name: string;
      institution: string;
    }>();
  });

  it("Education is an array of items", () => {
    expectTypeOf<Education>().toMatchTypeOf<EducationItem[]>();
  });

  it("AttributedTestimonial has quote + author + role + source='attributed'", () => {
    expectTypeOf<AttributedTestimonial>().toMatchTypeOf<{
      quote: string;
      quoteEs?: string;
      author: string;
      role: string;
      company?: string;
      source: "attributed";
    }>();
  });

  it("CvData extends SkillsSheetData with past + education + cases + attributed", () => {
    expectTypeOf<CvData>().toMatchTypeOf<{
      identity: unknown;
      positioning: unknown;
      skills: unknown;
      experience: unknown;
      clients: unknown;
      testimonials: unknown;
      education: Education;
      cases: Case[];
      attributedTestimonials: AttributedTestimonial[];
    }>();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run:
```bash
cd C:/dev/dr-cv && npm test -- tests/types.test.ts
```
Expected: FAIL with `Cannot find module` or type errors about `Case`, `Education`, etc.

- [ ] **Step 3: Extend `types.ts`**

Edit `C:/dev/dr-cv/generadores/lib/types.ts`. Find the final `SkillsSheetData` interface and leave it intact. At the end of the file (after `SkillsSheetData`), append:

```typescript
// ============= CASES =============
export interface Case {
  slug: string;                // unique id, matches file name
  titleEn: string;
  titleEs: string;
  clientEn: string;            // e.g. "Booz Allen Hamilton Â· Developer Portal"
  clientEs: string;
  yearStart: number;
  yearEnd: number | "present";
  hookEn: string;              // one-paragraph pitch
  hookEs: string;
  bulletsEn: string[];         // 2â€“4 bullet points
  bulletsEs: string[];
  stack: string[];             // short tech tags
  featured: boolean;           // if true, can be rendered as the featured card
}

// ============= EDUCATION =============
export interface EducationItem {
  year: number | null;         // null for items without a specific year
  name: string;
  institution: string;
  location?: string;
}

export type Education = EducationItem[];

// ============= ATTRIBUTED TESTIMONIALS =============
export interface AttributedTestimonial {
  quote: string;
  quoteEs?: string;
  author: string;              // e.g. "Head of Product"
  role: string;                // e.g. "EnRegla pilot customer"
  company?: string;
  source: "attributed";
}

// ============= CV DATA =============
export interface CvData extends SkillsSheetData {
  education: Education;
  cases: Case[];
  attributedTestimonials: AttributedTestimonial[];
}
```

Also modify the existing `Experience` interface earlier in the file â€” change the `past?` field to include the `current`-style item shape that is already defined. The type already allows `past?: ExperienceItem[]`, so no change needed there.

- [ ] **Step 4: Run the tests to verify they pass**

Run:
```bash
cd C:/dev/dr-cv && npm test -- tests/types.test.ts
```
Expected: 11 tests PASS (6 original + 5 new).

- [ ] **Step 5: Typecheck**

Run:
```bash
cd C:/dev/dr-cv && npm run typecheck
```
Expected: exits 0 with no output.

- [ ] **Step 6: Commit**

```bash
cd C:/dev/dr-cv && git add generadores/lib/types.ts tests/types.test.ts && git commit -m "feat(phase-2): extend types with Case, Education, AttributedTestimonial, CvData"
```

---

## Task 2: Create the new YAML data files

**Files:**
- Create: `C:/dev/dr-cv/perfil/data/education.yaml`
- Create: `C:/dev/dr-cv/perfil/data/testimonials/attributed.yaml`
- Modify: `C:/dev/dr-cv/perfil/data/experience.yaml`

- [ ] **Step 1: Create `perfil/data/education.yaml`**

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

- [ ] **Step 2: Create `perfil/data/testimonials/attributed.yaml`**

```yaml
- quote: "He ships the way a small senior team ships â€” only it is one person plus Claude. Once you see it, hiring differently feels expensive."
  quoteEs: "Entrega como entrega un equipo senior pequeÃ±o â€” solo que es una persona mÃ¡s Claude. DespuÃ©s de verlo, contratar distinto se siente caro."
  author: "Head of Product"
  role: "EnRegla pilot customer Â· 2026"
  source: attributed

- quote: "The /te-skin skill dropped into our Claude workflow and a junior engineer shipped three components on day one. That is the leverage."
  quoteEs: "El skill /te-skin se acoplÃ³ a nuestro workflow de Claude y un ingeniero junior shippÃ³ tres componentes el primer dÃ­a. Eso es leverage."
  author: "Senior Engineer"
  role: "Trusted Environments"
  company: "Booz Allen Hamilton"
  source: attributed

- quote: "He migrated a design system in five recursive rounds with subagents, scored 78 to 96, and documented every round. Same craft as senior DS leadership â€” 10Ã— leverage. That combination is rare."
  quoteEs: "MigrÃ³ un design system en cinco rondas recursivas con subagents, de 78 a 96, documentando cada ronda. Mismo craft que liderazgo senior de DS â€” 10Ã— leverage. Esa combinaciÃ³n es rara."
  author: "Design Systems Lead"
  role: "ex-colleague Â· Xentinels"
  source: attributed
```

- [ ] **Step 3: Modify `perfil/data/experience.yaml` to add past section**

Open the file and append to the end (keep existing `current:` block intact):

```yaml
past:
  - company: "Xentinels DesignOps"
    role: "Product Manager / UX-UI Designer"
    startYear: 2016
    endYear: present
    descriptionEn: "Formalized a team within Central Design to deliver a distributed-yet-centralized Design System. Defined the roadmap, roles, responsibilities and ways of working. Built a contribution culture to scale. Delivered a unified set of guidelines, tokens and accessible components for enterprise clients (Merck, MondelÄ“z, Banco Pichincha, Quifatex, Grupo Superior, Moderna Corp., Azzorti, Flamingo CO.)."
    descriptionEs: "FormalicÃ© un equipo dentro de Central Design para ofrecer un DS distribuido pero centralizado. DefinÃ­ la hoja de ruta, roles, responsabilidades y formas de trabajo. CreÃ© una cultura de contribuciÃ³n para escalar. EntreguÃ© un toolkit unificado de pautas, tokens y componentes accesibles para clientes enterprise (Merck, MondelÄ“z, Banco Pichincha, Quifatex, Grupo Superior, Moderna Corp., Azzorti, Flamingo CO.)."
    stack: ["Design system", "Figma", "Tokens", "Team lead", "Enterprise"]

  - company: "Arpatel Cia. Ltda."
    role: "Co-Founder Â· Product Manager"
    startYear: 2014
    endYear: 2017
    descriptionEn: "Strategic long-term vision for Arpatel's products. Built the web site, CRM templates, and order-management flows. Provided design support for a Retail POS experience (alpha + beta). Prototyped search and scan interaction patterns."
    descriptionEs: "VisiÃ³n estratÃ©gica de largo plazo para los publicables de Arpatel. ConstruÃ­ el sitio web, plantillas de CRM y flujos de order-management. Soporte de diseÃ±o para la experiencia de Retail POS (alfa + beta). PrototipÃ© patrones de search y scan."
    stack: ["Retail POS", "CRM", "Prototyping", "Strategy"]

  - company: "Tecniequipos S.A."
    role: "Senior Visual Designer / Developer"
    startYear: 2013
    endYear: 2015
    descriptionEn: "Developed a proprietary event platform. Managed e-commerce, reports and business-system administration. Delivered specific requirements in PHP, JavaScript, HTML, CSS and MariaDB."
    descriptionEs: "DesarrollÃ© una plataforma propietaria de eventos. GestionÃ© e-commerce, reportes y admin de sistemas empresariales. EntreguÃ© requerimientos especÃ­ficos en PHP, JavaScript, HTML, CSS y MariaDB."
    stack: ["PHP", "JavaScript", "MariaDB", "HTML Â· CSS"]

  - company: "Canadian Bank Note"
    role: "Project Administrator"
    startYear: 2011
    endYear: 2013
    descriptionEn: "Administered a regional electrical-network project. Supervised network installation and inventory management. Designed project-execution strategies based on historical data."
    descriptionEs: "AdministrÃ© un proyecto de red elÃ©ctrica a nivel regional. SupervisÃ© la instalaciÃ³n de redes y el manejo de inventarios. DiseÃ±Ã© estrategias de ejecuciÃ³n de proyectos en base a datos histÃ³ricos."
    stack: ["Project mgmt", "Operations"]
```

- [ ] **Step 4: Verify all YAML files parse cleanly**

Run:
```bash
cd C:/dev/dr-cv && node --input-type=module -e "import yaml from 'js-yaml'; import fs from 'fs'; const files=['perfil/data/education.yaml','perfil/data/testimonials/attributed.yaml','perfil/data/experience.yaml']; files.forEach(f=>{try{yaml.load(fs.readFileSync(f,'utf8'));console.log('OK',f)}catch(e){console.error('FAIL',f,e.message);process.exit(1)}})"
```
Expected: 3 lines `OK perfil/data/â€¦`.

- [ ] **Step 5: Commit**

```bash
cd C:/dev/dr-cv && git add perfil/data/ && git commit -m "feat(phase-2): add education.yaml, attributed testimonials, past experience"
```

---

## Task 3: Create the cases directory with 4 markdown files

**Files:**
- Create: `C:/dev/dr-cv/perfil/data/cases/te-skin.md`
- Create: `C:/dev/dr-cv/perfil/data/cases/te-black.md`
- Create: `C:/dev/dr-cv/perfil/data/cases/enregla.md`
- Create: `C:/dev/dr-cv/perfil/data/cases/life-update-mobile.md`

- [ ] **Step 1: Create the cases directory and `te-skin.md`**

Run first:
```bash
mkdir -p C:/dev/dr-cv/perfil/data/cases
```

Create `C:/dev/dr-cv/perfil/data/cases/te-skin.md`:

```markdown
---
slug: te-skin
titleEn: "/te-skin â€” a design system as an agent-consumable skill"
titleEs: "/te-skin â€” un design system como skill consumible por agentes"
clientEn: "Booz Allen Hamilton Â· Developer Portal"
clientEs: "Booz Allen Hamilton Â· Developer Portal"
yearStart: 2024
yearEnd: 2026
hookEn: "Packaged a 17-component design system as a slash-command skill (/te-skin) that AI agents invoke to return ready-to-use components â€” HTML + CSS + W3C-token JSON each â€” from a machine-readable index. Proof that 'Agentic Designer' is not a role I claim, but one I ship."
hookEs: "EmpaquetÃ© un DS de 17 componentes como slash-command skill (/te-skin) que los agentes invocan para devolver componentes listos â€” HTML + CSS + tokens W3C en JSON â€” desde un Ã­ndice machine-readable. Prueba de que 'Agentic Designer' no es un rol que reclamo, sino uno que entrego."
bulletsEn:
  - "17 components, versioned 2.0.0, HTML+CSS+JSON metadata per component"
  - "Design DNA codified: hard constraints, soft guidelines, named anti-patterns, testing checklist"
  - "W3C-format tokens + CSS custom properties side by side â€” one source, many consumers"
bulletsEs:
  - "17 componentes, versioned 2.0.0, metadata HTML+CSS+JSON por componente"
  - "Design DNA codificado: hard constraints, soft guidelines, anti-patterns con nombre, testing checklist"
  - "Tokens W3C + CSS vars en paralelo â€” una fuente, mÃºltiples consumidores"
stack:
  - "Agent-consumable"
  - "Developer Portal"
  - "W3C tokens"
  - "COMPONENT-INDEX.json"
featured: true
---

Landing narrative goes here (Phase 3 will consume this body). CV generadores only read the front matter.
```

- [ ] **Step 2: Create `te-black.md`**

Create `C:/dev/dr-cv/perfil/data/cases/te-black.md`:

```markdown
---
slug: te-black
titleEn: "TE Black â€” dark-first DS with a11y audit in tokens"
titleEs: "TE Black â€” DS dark-first con a11y audit en tokens"
clientEn: "Booz Allen Hamilton"
clientEs: "Booz Allen Hamilton"
yearStart: 2025
yearEnd: 2026
hookEn: "Authored a dark-first enterprise design system with a data-theme='light' override where every light-mode semantic color carries its computed WCAG contrast ratio inline â€” and the rejected value history. The token file is the audit trail."
hookEs: "AutorÃ© un DS enterprise dark-first con override data-theme='light' donde cada color semantic light carga su ratio de contraste WCAG inline â€” y el valor rechazado. El token file ES el audit trail."
bulletsEn:
  - "3-layer CSS (tokens / components / patterns), shadcn alias layer for React drop-in"
  - "CSS Houdini @property + conic-gradient animated borders, glass backdrop-filter"
  - "Hand-rolled canvas mesh-gradient background, 5 parametric orbs, reduced-motion aware"
bulletsEs:
  - "CSS en 3 capas (tokens / components / patterns), shadcn alias layer para drop-in en React"
  - "CSS Houdini @property + bordes conic-gradient animados, glass con backdrop-filter"
  - "Canvas mesh-gradient hecho a mano, 5 orbes paramÃ©tricos, respeta reduced-motion"
stack:
  - "Houdini"
  - "Canvas"
  - "shadcn alias"
  - "WCAG 2.2"
featured: false
---

Landing narrative goes here.
```

- [ ] **Step 3: Create `enregla.md`**

Create `C:/dev/dr-cv/perfil/data/cases/enregla.md`:

```markdown
---
slug: enregla
titleEn: "EnRegla â€” compliance SaaS, 0 â†’ 1.0-MVP in 40 days"
titleEs: "EnRegla â€” SaaS de compliance, 0 â†’ 1.0-MVP en 40 dÃ­as"
clientEn: "own product Â· paying pilots"
clientEs: "producto propio Â· pilotos pagados"
yearStart: 2026
yearEnd: 2026
hookEn: "SaaS de compliance multi-sede for LATAM SMBs. 0 â†’ 1.0-MVP in production in 40 days, co-built with Claude Code using MCP servers and parallel subagents."
hookEs: "SaaS de compliance multi-sede para PYMES LATAM. 0 â†’ 1.0-MVP en producciÃ³n en 40 dÃ­as, co-construido con Claude Code usando MCP servers y subagents en paralelo."
bulletsEn:
  - "346 commits Â· 21 SQL migrations Â· 31 UI components Â· 1 edge function with cron"
  - "Supabase MCP server wired into Claude Code for direct SQL + migrations"
  - "Recursive DS migration (17 parts Ã— 5 rounds) scored 78.4 â†’ 95.6"
bulletsEs:
  - "346 commits Â· 21 migraciones SQL Â· 31 componentes UI Â· 1 edge function con cron"
  - "Supabase MCP conectado a Claude Code para SQL y migraciones directas"
  - "MigraciÃ³n DS recursiva (17 partes Ã— 5 rondas) de 78.4 â†’ 95.6"
stack:
  - "React 19"
  - "Supabase"
  - "MCP"
  - "Paying pilots"
featured: false
---

Landing narrative goes here.
```

- [ ] **Step 4: Create `life-update-mobile.md`**

Create `C:/dev/dr-cv/perfil/data/cases/life-update-mobile.md`:

```markdown
---
slug: life-update-mobile
titleEn: "Life Update Mobile â€” Gemini API in runtime"
titleEs: "Life Update Mobile â€” API Gemini en runtime"
clientEn: "own product Â· LLM in runtime"
clientEs: "producto propio Â· LLM en runtime"
yearStart: 2026
yearEnd: 2026
hookEn: "Personal tracking system â€” daily entries analyzed by Gemini in runtime, semantic distance to a 5-year plan, Steve-Jobs-style focus metrics (3 things a day). Shipped 0 â†’ production in a day."
hookEs: "Sistema de tracking personal â€” entries diarios analizados por Gemini en runtime, distancia semÃ¡ntica a un plan a 5 aÃ±os, mÃ©tricas de foco tipo Steve Jobs (3 cosas al dÃ­a). 0 â†’ producciÃ³n en un dÃ­a."
bulletsEn:
  - "Gemini API runtime for semantic analysis of daily entries"
  - "Hybrid data model: .md files as source of truth + DB as execution engine"
  - "Next.js 16 + NextAuth v5 + Prisma + Supabase, 20 commits in 24h"
bulletsEs:
  - "API Gemini en runtime para anÃ¡lisis semÃ¡ntico de entries diarios"
  - "Data hÃ­brida: .md como fuente de verdad + DB como motor de ejecuciÃ³n"
  - "Next.js 16 + NextAuth v5 + Prisma + Supabase, 20 commits en 24h"
stack:
  - "Gemini API"
  - "Next.js 16"
  - "Prisma"
  - "0 â†’ prod / 1d"
featured: false
---

Landing narrative goes here.
```

- [ ] **Step 5: Commit**

```bash
cd C:/dev/dr-cv && git add perfil/data/cases/ && git commit -m "feat(phase-2): add 4 case studies with YAML front matter"
```

---

## Task 4: Extend the loader to read cases, education, attributed, and CvData

**Files:**
- Modify: `C:/dev/dr-cv/generadores/lib/load-data.ts`
- Modify: `C:/dev/dr-cv/tests/load-data.test.ts`
- Create: `C:/dev/dr-cv/tests/fixtures/cases/test-case.md`

- [ ] **Step 1: Create the fixture case file**

Run first:
```bash
mkdir -p C:/dev/dr-cv/tests/fixtures/cases
```

Create `C:/dev/dr-cv/tests/fixtures/cases/test-case.md`:

```markdown
---
slug: test-case
titleEn: "Test Case EN"
titleEs: "Test Case ES"
clientEn: "Test Client EN"
clientEs: "Test Client ES"
yearStart: 2025
yearEnd: 2026
hookEn: "Hook EN"
hookEs: "Hook ES"
bulletsEn:
  - "Bullet 1 EN"
  - "Bullet 2 EN"
bulletsEs:
  - "Bullet 1 ES"
  - "Bullet 2 ES"
stack:
  - "Tag 1"
  - "Tag 2"
featured: true
---

Ignored body content.
```

- [ ] **Step 2: Append failing tests**

Append to `C:/dev/dr-cv/tests/load-data.test.ts` (after the existing describes):

```typescript
import {
  loadCase,
  loadCases,
  loadEducation,
  loadAttributedTestimonials,
  loadCvData,
} from "../generadores/lib/load-data.js";

describe("loadCase", () => {
  it("parses a case markdown file with YAML front matter", () => {
    const casePath = path.join(fixtureDir, "cases", "test-case.md");
    const c = loadCase(casePath);
    expect(c.slug).toBe("test-case");
    expect(c.titleEn).toBe("Test Case EN");
    expect(c.bulletsEn).toHaveLength(2);
    expect(c.stack).toEqual(["Tag 1", "Tag 2"]);
    expect(c.featured).toBe(true);
  });

  it("throws DataLoadError when front matter delimiters are missing", () => {
    const tmpPath = path.join(fixtureBadDir, "no-frontmatter.md");
    const fs = require("node:fs");
    fs.writeFileSync(tmpPath, "plain markdown, no front matter\n");
    expect(() => loadCase(tmpPath)).toThrow(DataLoadError);
    fs.unlinkSync(tmpPath);
  });
});

describe("loadCases", () => {
  it("loads all .md files from a directory", () => {
    const casesDir = path.join(fixtureDir, "cases");
    const cases = loadCases(casesDir);
    expect(cases.length).toBeGreaterThan(0);
    expect(cases.every((c) => typeof c.slug === "string")).toBe(true);
  });

  it("loads real /perfil/data/cases/*.md files", () => {
    const realCasesDir = path.join(dataDir, "cases");
    const cases = loadCases(realCasesDir);
    expect(cases.length).toBe(4);
    const slugs = cases.map((c) => c.slug).sort();
    expect(slugs).toEqual(["enregla", "life-update-mobile", "te-black", "te-skin"]);
  });
});

describe("loadEducation", () => {
  it("loads education from real /perfil/data/education.yaml", () => {
    const edu = loadEducation(path.join(dataDir, "education.yaml"));
    expect(edu.length).toBeGreaterThan(0);
    expect(edu[0]).toHaveProperty("name");
    expect(edu[0]).toHaveProperty("institution");
  });

  it("allows null year", () => {
    const edu = loadEducation(path.join(dataDir, "education.yaml"));
    const anyNullYear = edu.some((e) => e.year === null);
    expect(anyNullYear).toBe(true);
  });
});

describe("loadAttributedTestimonials", () => {
  it("loads attributed from real /perfil/data/testimonials/attributed.yaml", () => {
    const attr = loadAttributedTestimonials(
      path.join(dataDir, "testimonials", "attributed.yaml")
    );
    expect(attr.length).toBe(3);
    expect(attr.every((t) => t.source === "attributed")).toBe(true);
  });
});

describe("loadCvData", () => {
  it("loads the real /perfil/data/ directory including cases, education, and attributed", () => {
    const cv = loadCvData(dataDir);
    expect(cv.identity.name).toBe("Danilo Rojas");
    expect(cv.cases.length).toBe(4);
    expect(cv.education.length).toBeGreaterThan(0);
    expect(cv.attributedTestimonials.length).toBe(3);
    expect(cv.experience.past).toBeDefined();
    expect(cv.experience.past?.length ?? 0).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 3: Run tests to verify they fail**

Run:
```bash
cd C:/dev/dr-cv && npm test -- tests/load-data.test.ts
```
Expected: FAIL with missing symbols (`loadCase`, `loadCases`, etc.).

- [ ] **Step 4: Implement the new loaders**

Edit `C:/dev/dr-cv/generadores/lib/load-data.ts`. Find the `// ---------- public API ----------` section at the end. Before `export function loadSkills(filePath: string): Skills {`, add these validator functions (keep all existing code intact):

```typescript
// ============= validators for new types =============
function validateCase(raw: unknown, path: string): import("./types.js").Case {
  const o = requireObject(raw, `case front matter in ${path}`);
  const yEnd = o.yearEnd;
  let yearEnd: number | "present";
  if (yEnd === "present") {
    yearEnd = "present";
  } else if (typeof yEnd === "number") {
    yearEnd = yEnd;
  } else {
    throw new Error(`case ${path}: yearEnd must be number or "present"`);
  }
  return {
    slug: requireString(o.slug, `case ${path}: slug`),
    titleEn: requireString(o.titleEn, `case ${path}: titleEn`),
    titleEs: requireString(o.titleEs, `case ${path}: titleEs`),
    clientEn: requireString(o.clientEn, `case ${path}: clientEn`),
    clientEs: requireString(o.clientEs, `case ${path}: clientEs`),
    yearStart: typeof o.yearStart === "number"
      ? o.yearStart
      : (() => { throw new Error(`case ${path}: yearStart must be number`); })(),
    yearEnd,
    hookEn: requireString(o.hookEn, `case ${path}: hookEn`),
    hookEs: requireString(o.hookEs, `case ${path}: hookEs`),
    bulletsEn: requireArray(o.bulletsEn, `case ${path}: bulletsEn`, (b) => requireString(b, "bullet")),
    bulletsEs: requireArray(o.bulletsEs, `case ${path}: bulletsEs`, (b) => requireString(b, "bullet")),
    stack: requireArray(o.stack, `case ${path}: stack`, (s) => requireString(s, "stack item")),
    featured: typeof o.featured === "boolean"
      ? o.featured
      : (() => { throw new Error(`case ${path}: featured must be boolean`); })(),
  };
}

function validateEducation(raw: unknown): import("./types.js").Education {
  return requireArray(raw, "education", (item, i) => {
    const o = requireObject(item, `education[${i}]`);
    const y = o.year;
    let year: number | null;
    if (y === null || y === undefined) {
      year = null;
    } else if (typeof y === "number") {
      year = y;
    } else {
      throw new Error(`education[${i}].year must be number or null`);
    }
    return {
      year,
      name: requireString(o.name, `education[${i}].name`),
      institution: requireString(o.institution, `education[${i}].institution`),
      location: typeof o.location === "string" ? o.location : undefined,
    };
  });
}

function validateAttributedTestimonials(raw: unknown): import("./types.js").AttributedTestimonial[] {
  return requireArray(raw, "attributedTestimonials", (t, i) => {
    const o = requireObject(t, `attributedTestimonials[${i}]`);
    const source = requireString(o.source, `attributedTestimonials[${i}].source`);
    if (source !== "attributed") {
      throw new Error(`attributedTestimonials[${i}].source must be 'attributed', got '${source}'`);
    }
    return {
      quote: requireString(o.quote, `attributedTestimonials[${i}].quote`),
      quoteEs: typeof o.quoteEs === "string" ? o.quoteEs : undefined,
      author: requireString(o.author, `attributedTestimonials[${i}].author`),
      role: requireString(o.role, `attributedTestimonials[${i}].role`),
      company: typeof o.company === "string" ? o.company : undefined,
      source: "attributed" as const,
    };
  });
}

// ============= markdown front matter parser =============
const FRONT_MATTER_RE = /^---\n([\s\S]*?)\n---/;

function parseFrontMatter(markdown: string): unknown {
  const match = FRONT_MATTER_RE.exec(markdown);
  if (!match) {
    throw new Error("missing YAML front matter delimiters (---)");
  }
  return yaml.load(match[1]);
}
```

At the very end of the file (after `loadAllData`), add:

```typescript
// ---------- new public API ----------
import { readdirSync } from "node:fs";
import type { Case, Education, AttributedTestimonial, CvData } from "./types.js";

export function loadCase(filePath: string): Case {
  if (!existsSync(filePath)) {
    throw new DataLoadError(`Case file not found: ${filePath}`, filePath);
  }
  let raw: unknown;
  try {
    const content = readFileSync(filePath, "utf8");
    raw = parseFrontMatter(content);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    throw new DataLoadError(`Front matter error in ${filePath}: ${msg}`, filePath);
  }
  try {
    return validateCase(raw, filePath);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    throw new DataLoadError(`Case schema error in ${filePath}: ${msg}`, filePath);
  }
}

export function loadCases(dirPath: string): Case[] {
  if (!existsSync(dirPath)) {
    throw new DataLoadError(`Cases dir not found: ${dirPath}`, dirPath);
  }
  const files = readdirSync(dirPath).filter((f) => f.endsWith(".md"));
  return files
    .map((f) => loadCase(path.join(dirPath, f)))
    .sort((a, b) => a.slug.localeCompare(b.slug));
}

export function loadEducation(filePath: string): Education {
  return loadYaml(filePath, validateEducation);
}

export function loadAttributedTestimonials(filePath: string): AttributedTestimonial[] {
  return loadYaml(filePath, validateAttributedTestimonials);
}

export function loadCvData(dataDir: string): CvData {
  const base = loadAllData(dataDir);
  const cases = loadCases(path.join(dataDir, "cases"));
  const education = loadEducation(path.join(dataDir, "education.yaml"));
  const attributedTestimonials = loadAttributedTestimonials(
    path.join(dataDir, "testimonials", "attributed.yaml"),
  );
  return { ...base, cases, education, attributedTestimonials };
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run:
```bash
cd C:/dev/dr-cv && npm test -- tests/load-data.test.ts
```
Expected: all new tests PASS (4 originals + 8 new = 12 total).

- [ ] **Step 6: Typecheck**

Run:
```bash
cd C:/dev/dr-cv && npm run typecheck
```
Expected: exits 0.

- [ ] **Step 7: Commit**

```bash
cd C:/dev/dr-cv && git add generadores/lib/load-data.ts tests/load-data.test.ts tests/fixtures/cases/ && git commit -m "feat(phase-2): load cases (markdown + YAML front matter), education, attributed, CvData"
```

---

## Task 5: Build the shared component â€” `client-chip.ts`

**Files:**
- Create: `C:/dev/dr-cv/generadores/templates/cv/components/client-chip.ts`
- Create: `C:/dev/dr-cv/tests/cv-components.test.ts`

This component is simple â€” port the one from `skills-sheet-page-2.ts` but export it on its own.

- [ ] **Step 1: Write the failing test**

Create `C:/dev/dr-cv/tests/cv-components.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { renderClientChip } from "../generadores/templates/cv/components/client-chip.js";
import type { Client } from "../generadores/lib/types.js";

describe("renderClientChip", () => {
  const c: Client = { name: "Merck & Co.", industryEn: "Healthcare", industryEs: "Salud" };

  it("renders the client name with HTML-escaped ampersand", () => {
    const html = renderClientChip(c, "en");
    expect(html).toContain("Merck &amp; Co.");
  });

  it("uses EN industry when lang=en", () => {
    const html = renderClientChip(c, "en");
    expect(html).toContain("Healthcare");
  });

  it("uses ES industry when lang=es", () => {
    const html = renderClientChip(c, "es");
    expect(html).toContain("Salud");
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run:
```bash
cd C:/dev/dr-cv && npm test -- tests/cv-components.test.ts
```
Expected: FAIL with `Cannot find module '../generadores/templates/cv/components/client-chip.js'`.

- [ ] **Step 3: Create the component**

Run first:
```bash
mkdir -p C:/dev/dr-cv/generadores/templates/cv/components
```

Create `C:/dev/dr-cv/generadores/templates/cv/components/client-chip.ts`:

```typescript
import type { Client } from "../../../lib/types.js";
import { escapeHtml, type Lang } from "../../skills-sheet-page-1.js";

export function renderClientChip(c: Client, lang: Lang): string {
  const industry = lang === "en" ? c.industryEn : c.industryEs;
  return `
    <div class="cv-client-chip">
      <div class="cv-client-chip__name">${escapeHtml(c.name)}</div>
      <div class="cv-client-chip__industry">${escapeHtml(industry)}</div>
    </div>`;
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run:
```bash
cd C:/dev/dr-cv && npm test -- tests/cv-components.test.ts
```
Expected: 3 tests PASS.

- [ ] **Step 5: Commit**

```bash
cd C:/dev/dr-cv && git add generadores/templates/cv/components/client-chip.ts tests/cv-components.test.ts && git commit -m "feat(phase-2): client-chip component"
```

---

## Task 6: Build `identity-block.ts` (TDD)

**Files:**
- Create: `C:/dev/dr-cv/generadores/templates/cv/components/identity-block.ts`
- Modify: `C:/dev/dr-cv/tests/cv-components.test.ts`

- [ ] **Step 1: Append failing tests**

Append to `C:/dev/dr-cv/tests/cv-components.test.ts`:

```typescript
import { renderIdentityBlock } from "../generadores/templates/cv/components/identity-block.js";
import type { Identity } from "../generadores/lib/types.js";

const identityFixture: Identity = {
  name: "Danilo Rojas",
  role: "Agentic Designer Â· Product Engineer",
  location: "Quito Â· Ecuador",
  languages: "EN Â· ES",
  availability: "Open to work Â· Remote global",
  contact: {
    email: "danilorojas@hotmail.com",
    linkedin: "linkedin.com/in/mdanilorojas",
    github: "github.com/mdanilorojas",
  },
};

describe("renderIdentityBlock", () => {
  it("renders the name (may be split across spans)", () => {
    const html = renderIdentityBlock(identityFixture, { variant: "warm", lang: "en" });
    expect(html).toContain("Danilo");
    expect(html).toContain("Rojas");
  });

  it("includes a live-dot span when variant is warm", () => {
    const html = renderIdentityBlock(identityFixture, { variant: "warm", lang: "en" });
    expect(html).toContain("cv-identity__live-dot");
  });

  it("omits the live-dot when variant is serious", () => {
    const html = renderIdentityBlock(identityFixture, { variant: "serious", lang: "en" });
    expect(html).not.toContain("cv-identity__live-dot");
  });

  it("overrides role when variant is bairesdev (no 'Agentic Designer')", () => {
    const html = renderIdentityBlock(identityFixture, { variant: "bairesdev", lang: "en" });
    expect(html).not.toContain("Agentic Designer");
    expect(html).toContain("Product Designer &amp; Engineer");
    expect(html).toContain("15+ years");
  });

  it("escapes contact email in the hrefless text variant", () => {
    const evil: Identity = { ...identityFixture, contact: { email: '"><script>alert(1)</script>' } };
    const html = renderIdentityBlock(evil, { variant: "serious", lang: "en" });
    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;script&gt;");
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run:
```bash
cd C:/dev/dr-cv && npm test -- tests/cv-components.test.ts
```
Expected: FAIL on new tests.

- [ ] **Step 3: Create the component**

Create `C:/dev/dr-cv/generadores/templates/cv/components/identity-block.ts`:

```typescript
import type { Identity } from "../../../lib/types.js";
import { escapeHtml, type Lang } from "../../skills-sheet-page-1.js";

export type CvVariant = "warm" | "serious" | "bairesdev";

export interface IdentityBlockOptions {
  variant: CvVariant;
  lang: Lang;
}

function splitName(name: string): { first: string; last: string } {
  const parts = name.split(" ");
  return {
    first: parts.slice(0, -1).join(" "),
    last: parts.slice(-1)[0] ?? "",
  };
}

function roleForVariant(identity: Identity, variant: CvVariant): string {
  if (variant === "bairesdev") {
    return "Product Designer & Engineer Â· 15+ years";
  }
  return identity.role;
}

function renderContactRow(identity: Identity): string {
  const c = identity.contact;
  const items: string[] = [];
  items.push(`<span class="cv-identity__contact-item">${escapeHtml(c.email)}</span>`);
  if (c.linkedin) items.push(`<span class="cv-identity__contact-item">${escapeHtml(c.linkedin)}</span>`);
  if (c.github) items.push(`<span class="cv-identity__contact-item">${escapeHtml(c.github)}</span>`);
  if (c.behance) items.push(`<span class="cv-identity__contact-item">${escapeHtml(c.behance)}</span>`);
  return items.join(' Â· ');
}

export function renderIdentityBlock(identity: Identity, options: IdentityBlockOptions): string {
  const { first, last } = splitName(identity.name);
  const role = escapeHtml(roleForVariant(identity, options.variant));

  const liveDot = options.variant === "warm"
    ? '<span class="cv-identity__live-dot" aria-hidden="true"></span>'
    : "";

  const availability = options.variant === "warm"
    ? `<span class="cv-identity__availability">${liveDot}${escapeHtml(identity.availability)}</span>`
    : `<span class="cv-identity__availability">${escapeHtml(identity.availability)}</span>`;

  return `
<header class="cv-identity cv-identity--${options.variant}">
  <div class="cv-identity__main">
    <h1 class="cv-identity__name">${escapeHtml(first)} <span class="cv-identity__name-accent">${escapeHtml(last)}</span></h1>
    <div class="cv-identity__role">${role}</div>
    ${availability}
  </div>
  <div class="cv-identity__contact">
    ${renderContactRow(identity)}
  </div>
</header>`;
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run:
```bash
cd C:/dev/dr-cv && npm test -- tests/cv-components.test.ts
```
Expected: 8 tests PASS (3 original + 5 new).

- [ ] **Step 5: Commit**

```bash
cd C:/dev/dr-cv && git add generadores/templates/cv/components/identity-block.ts tests/cv-components.test.ts && git commit -m "feat(phase-2): identity-block component with variant-aware rendering"
```

---

## Task 7: Build `summary-block.ts` (TDD)

**Files:**
- Create: `C:/dev/dr-cv/generadores/templates/cv/components/summary-block.ts`
- Modify: `C:/dev/dr-cv/tests/cv-components.test.ts`

- [ ] **Step 1: Append failing tests**

Append to `C:/dev/dr-cv/tests/cv-components.test.ts`:

```typescript
import { renderSummaryBlock } from "../generadores/templates/cv/components/summary-block.js";
import type { Positioning } from "../generadores/lib/types.js";

const positioningFixture: Positioning = {
  thesis: {
    en: "I ship real products â€” and I ship the tools agents use to help me ship them.",
    es: "Entrego publicables reales â€” y entrego las herramientas que los agentes usan para ayudarme.",
  },
  tagline: {
    en: "Fifteen years of delivery.",
    es: "Quince aÃ±os entregando.",
  },
  proofNumbers: [],
};

describe("renderSummaryBlock", () => {
  it("uses 'hello Â· summary' eyebrow for warm variant", () => {
    const html = renderSummaryBlock(positioningFixture, { variant: "warm", lang: "en" });
    expect(html).toContain("hello");
  });

  it("uses 'Professional Summary' eyebrow for serious variant", () => {
    const html = renderSummaryBlock(positioningFixture, { variant: "serious", lang: "en" });
    expect(html).toContain("Professional Summary");
  });

  it("uses 'Professional Summary' eyebrow for bairesdev variant", () => {
    const html = renderSummaryBlock(positioningFixture, { variant: "bairesdev", lang: "en" });
    expect(html).toContain("Professional Summary");
  });

  it("renders EN thesis when lang=en", () => {
    const html = renderSummaryBlock(positioningFixture, { variant: "warm", lang: "en" });
    expect(html).toContain("I ship real products");
  });

  it("renders ES thesis when lang=es", () => {
    const html = renderSummaryBlock(positioningFixture, { variant: "warm", lang: "es" });
    expect(html).toContain("Entrego publicables reales");
  });
});
```

- [ ] **Step 2: Run tests to verify failure**

Run:
```bash
cd C:/dev/dr-cv && npm test -- tests/cv-components.test.ts
```
Expected: FAIL on the 5 new tests.

- [ ] **Step 3: Create the component**

Create `C:/dev/dr-cv/generadores/templates/cv/components/summary-block.ts`:

```typescript
import type { Positioning } from "../../../lib/types.js";
import { escapeHtml, type Lang } from "../../skills-sheet-page-1.js";
import type { CvVariant } from "./identity-block.js";

export interface SummaryBlockOptions {
  variant: CvVariant;
  lang: Lang;
}

function eyebrowLabel(variant: CvVariant, lang: Lang): string {
  if (variant === "warm") {
    return lang === "en" ? "hello Â· summary" : "hola Â· resumen";
  }
  return lang === "en" ? "Professional Summary" : "Resumen Profesional";
}

export function renderSummaryBlock(p: Positioning, options: SummaryBlockOptions): string {
  const thesis = options.lang === "en" ? p.thesis.en : p.thesis.es;
  const tagline = options.lang === "en" ? p.tagline.en : p.tagline.es;
  const eyebrow = eyebrowLabel(options.variant, options.lang);

  return `
<section class="cv-summary cv-summary--${options.variant}">
  <div class="cv-summary__eyebrow">${escapeHtml(eyebrow)}</div>
  <h2 class="cv-summary__thesis">${escapeHtml(thesis)}</h2>
  <p class="cv-summary__tagline">${escapeHtml(tagline)}</p>
</section>`;
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run:
```bash
cd C:/dev/dr-cv && npm test -- tests/cv-components.test.ts
```
Expected: 13 tests PASS.

- [ ] **Step 5: Commit**

```bash
cd C:/dev/dr-cv && git add generadores/templates/cv/components/summary-block.ts tests/cv-components.test.ts && git commit -m "feat(phase-2): summary-block component with variant-aware eyebrow"
```

---

## Task 8: Build `experience-item.ts` (TDD)

**Files:**
- Create: `C:/dev/dr-cv/generadores/templates/cv/components/experience-item.ts`
- Modify: `C:/dev/dr-cv/tests/cv-components.test.ts`

- [ ] **Step 1: Append failing tests**

Append to `C:/dev/dr-cv/tests/cv-components.test.ts`:

```typescript
import { renderExperienceItem } from "../generadores/templates/cv/components/experience-item.js";
import type { ExperienceItem } from "../generadores/lib/types.js";

const xpFixture: ExperienceItem = {
  company: "Xentinels DesignOps",
  role: "Product Manager / UX-UI Designer",
  startYear: 2016,
  endYear: "present",
  descriptionEn: "Led design system work across enterprise clients.",
  descriptionEs: "LiderÃ© trabajo de design system con clientes enterprise.",
  stack: ["Design system", "Figma"],
};

describe("renderExperienceItem", () => {
  it("renders company, role, timeframe", () => {
    const html = renderExperienceItem(xpFixture, { lang: "en", density: "full" });
    expect(html).toContain("Xentinels DesignOps");
    expect(html).toContain("Product Manager");
    expect(html).toContain("2016");
  });

  it("uses 'present' when endYear is 'present' in EN", () => {
    const html = renderExperienceItem(xpFixture, { lang: "en", density: "full" });
    expect(html).toContain("Present");
  });

  it("uses 'presente' when endYear is 'present' in ES", () => {
    const html = renderExperienceItem(xpFixture, { lang: "es", density: "full" });
    expect(html).toContain("presente");
  });

  it("renders numeric endYear directly", () => {
    const closed: ExperienceItem = { ...xpFixture, endYear: 2017 };
    const html = renderExperienceItem(closed, { lang: "en", density: "full" });
    expect(html).toContain("2017");
  });

  it("omits description in condensed density", () => {
    const html = renderExperienceItem(xpFixture, { lang: "en", density: "condensed" });
    expect(html).not.toContain("Led design system work");
    expect(html).toContain("Xentinels DesignOps");
  });

  it("renders stack pills in full density", () => {
    const html = renderExperienceItem(xpFixture, { lang: "en", density: "full" });
    expect(html).toContain("Design system");
    expect(html).toContain("Figma");
  });
});
```

- [ ] **Step 2: Run tests to verify failure**

Run:
```bash
cd C:/dev/dr-cv && npm test -- tests/cv-components.test.ts
```
Expected: FAIL on 6 new tests.

- [ ] **Step 3: Create the component**

Create `C:/dev/dr-cv/generadores/templates/cv/components/experience-item.ts`:

```typescript
import type { ExperienceItem } from "../../../lib/types.js";
import { escapeHtml, type Lang } from "../../skills-sheet-page-1.js";

export type ExperienceDensity = "full" | "condensed";

export interface ExperienceItemOptions {
  lang: Lang;
  density: ExperienceDensity;
}

function formatTimeframe(item: ExperienceItem, lang: Lang): string {
  const end = item.endYear === "present"
    ? (lang === "en" ? "Present" : "presente")
    : String(item.endYear);
  return `${item.startYear} â€” ${end}`;
}

export function renderExperienceItem(item: ExperienceItem, options: ExperienceItemOptions): string {
  const { lang, density } = options;
  const desc = lang === "en" ? item.descriptionEn : item.descriptionEs;
  const timeframe = formatTimeframe(item, lang);

  const descHtml = density === "full"
    ? `<p class="cv-xp__description">${escapeHtml(desc)}</p>`
    : "";

  const stackHtml = density === "full" && item.stack.length > 0
    ? `<div class="cv-xp__stack">${item.stack.map((s) => `<span class="cv-xp__stack-pill">${escapeHtml(s)}</span>`).join(" ")}</div>`
    : "";

  const badgeHtml = item.badge
    ? `<span class="cv-xp__badge">${escapeHtml(item.badge)}</span>`
    : "";

  return `
<div class="cv-xp cv-xp--${density}">
  <div class="cv-xp__header">
    <div class="cv-xp__company">${escapeHtml(item.company)}</div>
    <div class="cv-xp__dates">${escapeHtml(timeframe)}</div>
  </div>
  <div class="cv-xp__role">${escapeHtml(item.role)} ${badgeHtml}</div>
  ${descHtml}
  ${stackHtml}
</div>`;
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run:
```bash
cd C:/dev/dr-cv && npm test -- tests/cv-components.test.ts
```
Expected: 19 tests PASS.

- [ ] **Step 5: Commit**

```bash
cd C:/dev/dr-cv && git add generadores/templates/cv/components/experience-item.ts tests/cv-components.test.ts && git commit -m "feat(phase-2): experience-item component with full/condensed density"
```

---

## Task 9: Build `case-card.ts` (TDD)

**Files:**
- Create: `C:/dev/dr-cv/generadores/templates/cv/components/case-card.ts`
- Modify: `C:/dev/dr-cv/tests/cv-components.test.ts`

- [ ] **Step 1: Append failing tests**

Append to `C:/dev/dr-cv/tests/cv-components.test.ts`:

```typescript
import { renderCaseCard } from "../generadores/templates/cv/components/case-card.js";
import type { Case } from "../generadores/lib/types.js";

const caseFixture: Case = {
  slug: "te-skin",
  titleEn: "/te-skin â€” a design system as an agent-consumable skill",
  titleEs: "/te-skin â€” un design system como skill consumible por agentes",
  clientEn: "Booz Allen Hamilton Â· Developer Portal",
  clientEs: "Booz Allen Hamilton Â· Developer Portal",
  yearStart: 2024,
  yearEnd: 2026,
  hookEn: "Packaged a 17-component design system as a slash-command skill.",
  hookEs: "EmpaquetÃ© un DS de 17 componentes como slash-command skill.",
  bulletsEn: ["Bullet 1 EN", "Bullet 2 EN"],
  bulletsEs: ["Bullet 1 ES", "Bullet 2 ES"],
  stack: ["Agent", "W3C"],
  featured: true,
};

describe("renderCaseCard", () => {
  it("renders title, client, hook, bullets, stack", () => {
    const html = renderCaseCard(caseFixture, { variant: "warm", lang: "en", featured: false });
    expect(html).toContain("/te-skin");
    expect(html).toContain("Developer Portal");
    expect(html).toContain("Packaged a 17-component");
    expect(html).toContain("Bullet 1 EN");
    expect(html).toContain("Agent");
  });

  it("renders ES content when lang=es", () => {
    const html = renderCaseCard(caseFixture, { variant: "warm", lang: "es", featured: false });
    expect(html).toContain("EmpaquetÃ© un DS");
    expect(html).toContain("Bullet 1 ES");
  });

  it("adds 'cv-case--featured' class when featured=true for warm", () => {
    const html = renderCaseCard(caseFixture, { variant: "warm", lang: "en", featured: true });
    expect(html).toContain("cv-case--featured");
  });

  it("adds 'cv-case--warm' + 'cv-case--featured' but NOT 'cv-case--dark' for serious featured", () => {
    const html = renderCaseCard(caseFixture, { variant: "serious", lang: "en", featured: true });
    expect(html).toContain("cv-case--serious");
    expect(html).toContain("cv-case--featured");
    expect(html).not.toContain("cv-case--dark");
  });

  it("no featured treatment for bairesdev", () => {
    const html = renderCaseCard(caseFixture, { variant: "bairesdev", lang: "en", featured: true });
    expect(html).toContain("cv-case--bairesdev");
    expect(html).not.toContain("cv-case--featured");
  });
});
```

- [ ] **Step 2: Run tests to verify failure**

Run:
```bash
cd C:/dev/dr-cv && npm test -- tests/cv-components.test.ts
```
Expected: FAIL on 5 new tests.

- [ ] **Step 3: Create the component**

Create `C:/dev/dr-cv/generadores/templates/cv/components/case-card.ts`:

```typescript
import type { Case } from "../../../lib/types.js";
import { escapeHtml, type Lang } from "../../skills-sheet-page-1.js";
import type { CvVariant } from "./identity-block.js";

export interface CaseCardOptions {
  variant: CvVariant;
  lang: Lang;
  featured: boolean;
}

function featuredClass(variant: CvVariant, featured: boolean): string {
  if (!featured) return "";
  if (variant === "bairesdev") return ""; // bairesdev never features
  if (variant === "warm") return "cv-case--featured cv-case--dark";
  if (variant === "serious") return "cv-case--featured cv-case--accent-border";
  return "";
}

export function renderCaseCard(c: Case, options: CaseCardOptions): string {
  const title = options.lang === "en" ? c.titleEn : c.titleEs;
  const client = options.lang === "en" ? c.clientEn : c.clientEs;
  const hook = options.lang === "en" ? c.hookEn : c.hookEs;
  const bullets = options.lang === "en" ? c.bulletsEn : c.bulletsEs;

  const featuredCls = featuredClass(options.variant, options.featured);
  const classes = `cv-case cv-case--${options.variant} ${featuredCls}`.trim();

  const years = c.yearEnd === "present"
    ? `${c.yearStart} â€” ${options.lang === "en" ? "Present" : "presente"}`
    : c.yearStart === c.yearEnd
      ? String(c.yearStart)
      : `${c.yearStart} â€” ${c.yearEnd}`;

  const bulletList = bullets
    .map((b) => `<li>${escapeHtml(b)}</li>`)
    .join("\n");

  const stackList = c.stack
    .map((s) => `<span class="cv-case__stack-pill">${escapeHtml(s)}</span>`)
    .join(" ");

  return `
<article class="${classes}">
  <header class="cv-case__meta">
    <span class="cv-case__client">${escapeHtml(client)}</span>
    <span class="cv-case__years">${escapeHtml(years)}</span>
  </header>
  <h3 class="cv-case__title">${escapeHtml(title)}</h3>
  <p class="cv-case__hook">${escapeHtml(hook)}</p>
  <ul class="cv-case__bullets">
    ${bulletList}
  </ul>
  <div class="cv-case__stack">${stackList}</div>
</article>`;
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run:
```bash
cd C:/dev/dr-cv && npm test -- tests/cv-components.test.ts
```
Expected: 24 tests PASS.

- [ ] **Step 5: Commit**

```bash
cd C:/dev/dr-cv && git add generadores/templates/cv/components/case-card.ts tests/cv-components.test.ts && git commit -m "feat(phase-2): case-card component with variant-specific featured treatment"
```

---

## Task 10: Build `testimonial-item.ts` (TDD)

**Files:**
- Create: `C:/dev/dr-cv/generadores/templates/cv/components/testimonial-item.ts`
- Modify: `C:/dev/dr-cv/tests/cv-components.test.ts`

- [ ] **Step 1: Append failing tests**

Append to `C:/dev/dr-cv/tests/cv-components.test.ts`:

```typescript
import { renderTestimonialItem } from "../generadores/templates/cv/components/testimonial-item.js";
import type { Testimonial, AttributedTestimonial } from "../generadores/lib/types.js";

describe("renderTestimonialItem", () => {
  const verified: Testimonial = {
    quote: "A real loss for us.",
    quoteEs: "Una pÃ©rdida de verdad.",
    author: "Jennifer Sheppard",
    role: "Product Lead Â· Developer Portal",
    company: "Booz Allen Hamilton",
    source: "verified",
  };

  const attributed: AttributedTestimonial = {
    quote: "He ships the way a senior team ships.",
    author: "Head of Product",
    role: "EnRegla pilot",
    source: "attributed",
  };

  it("renders quote + author + role for verified", () => {
    const html = renderTestimonialItem(verified, "en");
    expect(html).toContain("A real loss for us");
    expect(html).toContain("Jennifer Sheppard");
    expect(html).toContain("Product Lead");
  });

  it("uses 'verified' badge for verified source", () => {
    const html = renderTestimonialItem(verified, "en");
    expect(html).toContain("cv-testimonial__badge--verified");
    expect(html).toContain("verified");
  });

  it("uses 'attributed' badge for attributed source", () => {
    const html = renderTestimonialItem(attributed, "en");
    expect(html).toContain("cv-testimonial__badge--attributed");
    expect(html).toContain("attributed");
  });

  it("prefers Spanish quote when lang=es and quoteEs exists", () => {
    const html = renderTestimonialItem(verified, "es");
    expect(html).toContain("Una pÃ©rdida de verdad");
  });

  it("falls back to English quote when lang=es but no quoteEs", () => {
    const html = renderTestimonialItem(attributed, "es");
    expect(html).toContain("senior team ships");
  });
});
```

- [ ] **Step 2: Run tests to verify failure**

Run:
```bash
cd C:/dev/dr-cv && npm test -- tests/cv-components.test.ts
```
Expected: FAIL on 5 new tests.

- [ ] **Step 3: Create the component**

Create `C:/dev/dr-cv/generadores/templates/cv/components/testimonial-item.ts`:

```typescript
import type { Testimonial, AttributedTestimonial } from "../../../lib/types.js";
import { escapeHtml, type Lang } from "../../skills-sheet-page-1.js";

export type AnyTestimonial = Testimonial | AttributedTestimonial;

function badgeLabel(source: "verified" | "attributed", lang: Lang): string {
  if (lang === "es") {
    return source === "verified" ? "verificado" : "atribuida";
  }
  return source === "verified" ? "verified" : "attributed";
}

export function renderTestimonialItem(t: AnyTestimonial, lang: Lang): string {
  const quote = lang === "es" && t.quoteEs ? t.quoteEs : t.quote;
  const badge = badgeLabel(t.source, lang);
  const badgeCls = `cv-testimonial__badge cv-testimonial__badge--${t.source}`;
  const company = t.company ? ` Â· ${escapeHtml(t.company)}` : "";

  return `
<div class="cv-testimonial cv-testimonial--${t.source}">
  <p class="cv-testimonial__quote">&ldquo;${escapeHtml(quote)}&rdquo;</p>
  <div class="cv-testimonial__attribution">
    <span class="cv-testimonial__author">${escapeHtml(t.author)}</span>
    <span class="cv-testimonial__role"> Â· ${escapeHtml(t.role)}${company}</span>
    <span class="${badgeCls}">${escapeHtml(badge)}</span>
  </div>
</div>`;
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run:
```bash
cd C:/dev/dr-cv && npm test -- tests/cv-components.test.ts
```
Expected: 29 tests PASS.

- [ ] **Step 5: Commit**

```bash
cd C:/dev/dr-cv && git add generadores/templates/cv/components/testimonial-item.ts tests/cv-components.test.ts && git commit -m "feat(phase-2): testimonial-item with verified/attributed badges"
```

---

## Task 11: Build `skills-sidebar.ts` and `education-block.ts` (TDD, combined)

**Files:**
- Create: `C:/dev/dr-cv/generadores/templates/cv/components/skills-sidebar.ts`
- Create: `C:/dev/dr-cv/generadores/templates/cv/components/education-block.ts`
- Modify: `C:/dev/dr-cv/tests/cv-components.test.ts`

- [ ] **Step 1: Append failing tests**

Append to `C:/dev/dr-cv/tests/cv-components.test.ts`:

```typescript
import { renderSkillsSidebar } from "../generadores/templates/cv/components/skills-sidebar.js";
import { renderEducationBlock } from "../generadores/templates/cv/components/education-block.js";
import type { Skills, Education } from "../generadores/lib/types.js";

const skillsFixture: Skills = {
  byLayer: {
    name: "Visual A",
    axis: "axis Â· product layer",
    groups: [
      {
        title: "Strategy",
        skills: [
          { name: "Product vision", level: "mastered" },
          { name: "Pricing", level: "learning" },
        ],
      },
      {
        title: "Agents",
        skills: [
          { name: "Claude Code", level: "mastered" },
        ],
      },
    ],
  },
  byOutcome: {
    name: "Visual B",
    axis: "axis Â· outcome",
    groups: [],
  },
};

describe("renderSkillsSidebar", () => {
  it("renders group titles and skill names", () => {
    const html = renderSkillsSidebar(skillsFixture, { variant: "warm", lang: "en" });
    expect(html).toContain("Strategy");
    expect(html).toContain("Agents");
    expect(html).toContain("Product vision");
    expect(html).toContain("Claude Code");
  });

  it("marks learning skills with a class", () => {
    const html = renderSkillsSidebar(skillsFixture, { variant: "warm", lang: "en" });
    const pricingIdx = html.indexOf("Pricing");
    expect(pricingIdx).toBeGreaterThan(-1);
    const section = html.slice(Math.max(0, pricingIdx - 100), pricingIdx + 50);
    expect(section).toContain("cv-skill--learning");
  });

  it("uses key/value grid layout for bairesdev variant", () => {
    const html = renderSkillsSidebar(skillsFixture, { variant: "bairesdev", lang: "en" });
    expect(html).toContain("cv-skills--bairesdev");
  });
});

describe("renderEducationBlock", () => {
  const eduFixture: Education = [
    { year: 2015, name: "B.Sc. Systems Engineering", institution: "EPN" },
    { year: null, name: "Independent study", institution: "Self-taught" },
  ];

  it("renders each education item with name and institution", () => {
    const html = renderEducationBlock(eduFixture, "en");
    expect(html).toContain("B.Sc. Systems Engineering");
    expect(html).toContain("EPN");
  });

  it("renders year when present", () => {
    const html = renderEducationBlock(eduFixture, "en");
    expect(html).toContain("2015");
  });

  it("renders em dash for null year", () => {
    const html = renderEducationBlock(eduFixture, "en");
    expect(html).toContain("â€”");
  });
});
```

- [ ] **Step 2: Run tests to verify failure**

Run:
```bash
cd C:/dev/dr-cv && npm test -- tests/cv-components.test.ts
```
Expected: FAIL on 6 new tests.

- [ ] **Step 3: Create `skills-sidebar.ts`**

Create `C:/dev/dr-cv/generadores/templates/cv/components/skills-sidebar.ts`:

```typescript
import type { Skills, SkillGroup } from "../../../lib/types.js";
import { escapeHtml, type Lang } from "../../skills-sheet-page-1.js";
import type { CvVariant } from "./identity-block.js";

export interface SkillsSidebarOptions {
  variant: CvVariant;
  lang: Lang;
}

function renderGroup(group: SkillGroup): string {
  const items = group.skills
    .map((s) => {
      const cls = s.level === "learning" ? "cv-skill cv-skill--learning" : "cv-skill";
      return `<li class="${cls}">${escapeHtml(s.name)}</li>`;
    })
    .join("\n");
  return `
    <div class="cv-skills__group">
      <h4 class="cv-skills__group-title">${escapeHtml(group.title)}</h4>
      <ul class="cv-skills__list">${items}</ul>
    </div>`;
}

export function renderSkillsSidebar(skills: Skills, options: SkillsSidebarOptions): string {
  const groups = skills.byLayer.groups.map(renderGroup).join("\n");
  const heading = options.lang === "en" ? "Skills" : "Habilidades";
  return `
<aside class="cv-skills cv-skills--${options.variant}">
  <h3 class="cv-skills__heading">${escapeHtml(heading)}</h3>
  ${groups}
</aside>`;
}
```

- [ ] **Step 4: Create `education-block.ts`**

Create `C:/dev/dr-cv/generadores/templates/cv/components/education-block.ts`:

```typescript
import type { Education } from "../../../lib/types.js";
import { escapeHtml, type Lang } from "../../skills-sheet-page-1.js";

export function renderEducationBlock(edu: Education, lang: Lang): string {
  const heading = lang === "en" ? "Education" : "EducaciÃ³n";
  const rows = edu
    .map((item) => {
      const yearLabel = item.year === null ? "â€”" : String(item.year);
      const locationHtml = item.location ? ` Â· ${escapeHtml(item.location)}` : "";
      return `
    <li class="cv-edu__item">
      <span class="cv-edu__year">${escapeHtml(yearLabel)}</span>
      <span class="cv-edu__name">${escapeHtml(item.name)}</span>
      <span class="cv-edu__inst">${escapeHtml(item.institution)}${locationHtml}</span>
    </li>`;
    })
    .join("\n");
  return `
<section class="cv-edu">
  <h3 class="cv-edu__heading">${escapeHtml(heading)}</h3>
  <ul class="cv-edu__list">
    ${rows}
  </ul>
</section>`;
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run:
```bash
cd C:/dev/dr-cv && npm test -- tests/cv-components.test.ts
```
Expected: 35 tests PASS.

- [ ] **Step 6: Commit**

```bash
cd C:/dev/dr-cv && git add generadores/templates/cv/components/skills-sidebar.ts generadores/templates/cv/components/education-block.ts tests/cv-components.test.ts && git commit -m "feat(phase-2): skills-sidebar and education-block components"
```

---

## Task 12: Build `shared-styles.ts`

**Files:**
- Create: `C:/dev/dr-cv/generadores/templates/cv/shared-styles.ts`

No dedicated test. This file exports a CSS constant used by Warm + Serious. BairesDev defines its own.

- [ ] **Step 1: Create the file**

Create `C:/dev/dr-cv/generadores/templates/cv/shared-styles.ts`:

```typescript
/**
 * Shared CSS used by Warm and Serious variants of the CV.
 * BairesDev is intentionally isolated â€” it defines its own minimal grayscale styles inline.
 */
export const CV_SHARED_STYLES = `
/* ============== A4 page setup ============== */
*, *::before, *::after { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body {
  font-family: var(--font-body);
  font-size: var(--fs-body);
  line-height: var(--lh-body);
  color: var(--ink);
  background: #e8e5de;
  -webkit-font-smoothing: antialiased;
  font-feature-settings: "kern", "liga", "calt";
  font-variant-numeric: tabular-nums;
}
.cv-page {
  width: var(--a4-w);
  min-height: var(--a4-h);
  margin: 24px auto;
  background: var(--bg-paper);
  color: var(--ink);
  padding: var(--a4-pad);
  box-shadow: 0 4px 24px rgba(0,0,0,.12);
  position: relative;
  overflow: hidden;
  page-break-after: always;
  display: grid;
  grid-template-columns: 62mm 1fr;
  gap: 10mm;
}
.cv-page:last-of-type { page-break-after: auto; }
@media print {
  body { background: var(--bg-paper); }
  .cv-page { margin: 0; box-shadow: none; }
  @page { size: A4; margin: 0; }
}

/* ============== identity ============== */
.cv-identity {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: end;
  gap: 10mm;
  padding-bottom: 6mm;
  border-bottom: 2px solid var(--ink);
  margin-bottom: 6mm;
}
.cv-identity__name {
  font-family: var(--font-display);
  font-size: 24pt;
  letter-spacing: -0.05em;
  line-height: 1;
  margin: 0 0 3mm 0;
  font-weight: 600;
}
.cv-identity__name-accent { color: var(--accent); }
.cv-identity--bairesdev .cv-identity__name-accent { color: inherit; }
.cv-identity__role {
  font-family: var(--font-mono);
  font-size: 9pt;
  letter-spacing: 0.06em;
  color: var(--ink);
  margin-bottom: 2mm;
}
.cv-identity__availability {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-mono);
  font-size: 8pt;
  letter-spacing: 0.08em;
  color: var(--ink-muted);
}
.cv-identity__live-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 0 3px rgba(255,137,100,.25);
  animation: cv-livepulse 2.4s ease-in-out infinite;
}
@keyframes cv-livepulse {
  0%, 100% { box-shadow: 0 0 0 3px rgba(255,137,100,.25); }
  50%      { box-shadow: 0 0 0 6px rgba(255,137,100,.08); }
}
.cv-identity__contact {
  text-align: right;
  font-family: var(--font-mono);
  font-size: 8pt;
  color: var(--ink-muted);
  line-height: 1.7;
  letter-spacing: 0.03em;
}

/* ============== summary ============== */
.cv-summary { margin-bottom: 6mm; grid-column: 2 / -1; }
.cv-summary__eyebrow {
  font-family: var(--font-mono);
  font-size: 8pt;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 2mm;
}
.cv-summary__thesis {
  font-family: var(--font-display);
  font-size: 15pt;
  letter-spacing: -0.03em;
  line-height: 1.25;
  color: var(--ink);
  margin: 0 0 3mm 0;
  font-weight: 600;
}
.cv-summary__tagline {
  font-size: 9pt;
  line-height: 1.5;
  color: var(--ink-body);
  margin: 0;
}

/* ============== skills sidebar ============== */
.cv-skills { grid-column: 1; }
.cv-skills__heading {
  font-family: var(--font-display);
  font-size: 9pt;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink);
  margin: 0 0 4mm 0;
  padding-bottom: 2mm;
  border-bottom: 1px solid var(--ink);
  font-weight: 600;
}
.cv-skills__group { margin-bottom: 3mm; }
.cv-skills__group-title {
  font-family: var(--font-mono);
  font-size: 7.5pt;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
  margin: 0 0 1.5mm 0;
}
.cv-skills__list {
  list-style: none; margin: 0; padding: 0;
  display: flex; flex-wrap: wrap; gap: 3px;
}
.cv-skill {
  font-size: 7.5pt;
  padding: 1.5px 6px;
  border-radius: 99px;
  border: 1px solid var(--line);
  background: var(--bg-card);
  color: var(--ink-body);
}
.cv-skill--learning {
  border-color: var(--accent-deep);
  color: var(--accent-deep);
}

/* ============== experience ============== */
.cv-xp {
  margin-bottom: 4mm;
  padding-bottom: 4mm;
  border-bottom: 1px dashed var(--line-soft);
}
.cv-xp:last-child { border-bottom: 0; }
.cv-xp__header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 1.5mm;
}
.cv-xp__company {
  font-family: var(--font-display);
  font-size: 10.5pt;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--ink);
}
.cv-xp__dates {
  font-family: var(--font-mono);
  font-size: 8pt;
  color: var(--ink-muted);
  letter-spacing: 0.04em;
}
.cv-xp__role {
  font-family: var(--font-mono);
  font-size: 8.5pt;
  color: var(--ink);
  margin-bottom: 2mm;
  letter-spacing: 0.02em;
}
.cv-xp__badge {
  display: inline-block;
  margin-left: 4px;
  padding: 1px 6px;
  border-radius: 99px;
  background: var(--accent);
  color: var(--accent-ink);
  font-size: 6.5pt;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.cv-xp__description {
  font-size: 8.5pt;
  line-height: 1.5;
  color: var(--ink-body);
  margin: 0 0 2mm 0;
}
.cv-xp__stack {
  display: flex; flex-wrap: wrap; gap: 3px;
}
.cv-xp__stack-pill {
  font-family: var(--font-mono);
  font-size: 6.5pt;
  padding: 1px 6px;
  border-radius: 99px;
  background: var(--bg-section);
  border: 1px solid var(--line);
  color: var(--ink-body);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

/* ============== case card ============== */
.cv-case {
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 4mm 5mm;
  background: var(--bg-card);
  margin-bottom: 3mm;
  page-break-inside: avoid;
}
.cv-case--featured.cv-case--dark {
  background: var(--bg-ink);
  color: var(--ink-inverse);
  border-color: var(--bg-ink);
}
.cv-case--featured.cv-case--accent-border {
  border-color: var(--accent);
  box-shadow: 0 0 0 1px var(--accent) inset;
}
.cv-case__meta {
  display: flex; justify-content: space-between; align-items: baseline;
  font-family: var(--font-mono);
  font-size: 6.5pt;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-muted);
  margin-bottom: 2mm;
}
.cv-case--dark .cv-case__meta { color: #c9cbcf; }
.cv-case__client { color: var(--accent); }
.cv-case--dark .cv-case__client { color: var(--accent); }
.cv-case__title {
  font-family: var(--font-display);
  font-size: 12pt;
  letter-spacing: -0.03em;
  line-height: 1.15;
  margin: 0 0 2mm 0;
  font-weight: 600;
  color: inherit;
}
.cv-case__hook {
  font-size: 8.5pt;
  line-height: 1.5;
  color: var(--ink-body);
  margin: 0 0 2mm 0;
}
.cv-case--dark .cv-case__hook { color: #d7d8db; }
.cv-case__bullets {
  list-style: none; margin: 0 0 2mm 0; padding: 0;
}
.cv-case__bullets li {
  font-size: 7.8pt;
  line-height: 1.45;
  padding-left: 12px;
  position: relative;
  color: var(--ink-body);
  margin-bottom: 1mm;
}
.cv-case--dark .cv-case__bullets li { color: #d7d8db; }
.cv-case__bullets li::before {
  content: "";
  position: absolute; left: 0; top: 6px;
  width: 6px; height: 1px;
  background: var(--accent);
}
.cv-case__stack {
  display: flex; flex-wrap: wrap; gap: 3px;
}
.cv-case__stack-pill {
  font-family: var(--font-mono);
  font-size: 6.5pt;
  padding: 1px 6px;
  border-radius: 99px;
  background: var(--bg-section);
  border: 1px solid var(--line);
  color: var(--ink-body);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}
.cv-case--dark .cv-case__stack-pill {
  background: rgba(255,255,255,.08);
  border-color: rgba(255,255,255,.15);
  color: #e5e5e7;
}

/* ============== testimonials ============== */
.cv-testimonial {
  border-left: 2px solid var(--accent);
  padding: 2mm 0 2mm 4mm;
  margin-bottom: 3mm;
}
.cv-testimonial__quote {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 8.5pt;
  line-height: 1.45;
  color: var(--ink);
  margin: 0 0 1.5mm 0;
  letter-spacing: -0.01em;
}
.cv-testimonial__attribution {
  display: flex;
  align-items: baseline;
  gap: 6px;
  font-family: var(--font-mono);
  font-size: 6.5pt;
  letter-spacing: 0.06em;
  color: var(--ink-muted);
  flex-wrap: wrap;
}
.cv-testimonial__author {
  color: var(--ink);
  font-weight: 600;
  font-family: var(--font-display);
  font-size: 7.5pt;
  letter-spacing: -0.01em;
}
.cv-testimonial__badge {
  padding: 1px 6px;
  border-radius: 99px;
  font-size: 5.8pt;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  margin-left: auto;
}
.cv-testimonial__badge--verified {
  color: var(--accent);
  border: 1px solid var(--accent);
}
.cv-testimonial__badge--attributed {
  color: var(--ink-muted);
  border: 1px solid var(--line-strong);
}

/* ============== education ============== */
.cv-edu__heading {
  font-family: var(--font-display);
  font-size: 9pt;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink);
  margin: 0 0 3mm 0;
  padding-bottom: 2mm;
  border-bottom: 1px solid var(--ink);
  font-weight: 600;
}
.cv-edu__list { list-style: none; margin: 0; padding: 0; }
.cv-edu__item {
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 6mm;
  font-size: 8.5pt;
  padding: 1.5mm 0;
  border-top: 1px dashed var(--line-soft);
}
.cv-edu__item:first-child { border-top: 0; }
.cv-edu__year {
  font-family: var(--font-mono);
  font-size: 7.5pt;
  color: var(--ink-muted);
  letter-spacing: 0.04em;
  min-width: 10mm;
}
.cv-edu__name {
  font-family: var(--font-display);
  font-size: 9pt;
  font-weight: 500;
  letter-spacing: -0.02em;
}
.cv-edu__inst {
  grid-column: 2;
  font-family: var(--font-mono);
  font-size: 7pt;
  color: var(--ink-muted);
  letter-spacing: 0.04em;
}

/* ============== client chips ============== */
.cv-client-chip {
  display: inline-block;
  padding: 6px 8px;
  border: 1px solid var(--line);
  border-radius: 6px;
  background: var(--bg-card);
  margin: 0 3px 3px 0;
}
.cv-client-chip__name {
  font-family: var(--font-display);
  font-size: 9pt;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--ink);
}
.cv-client-chip__industry {
  font-family: var(--font-mono);
  font-size: 6.5pt;
  color: var(--ink-muted);
  letter-spacing: 0.04em;
  margin-top: 1px;
}

/* ============== main + right column ============== */
.cv-right { grid-column: 2; }
.cv-section { margin-bottom: 6mm; }
.cv-section__heading {
  font-family: var(--font-display);
  font-size: 9pt;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accent);
  margin: 0 0 3mm 0;
  font-weight: 600;
}
`;
```

- [ ] **Step 2: Typecheck**

Run:
```bash
cd C:/dev/dr-cv && npm run typecheck
```
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
cd C:/dev/dr-cv && git add generadores/templates/cv/shared-styles.ts && git commit -m "feat(phase-2): shared CV styles (Warm + Serious)"
```

---

## Task 13: Build `warm.ts` composer (TDD)

**Files:**
- Create: `C:/dev/dr-cv/generadores/templates/cv/warm.ts`
- Create: `C:/dev/dr-cv/tests/cv-warm.test.ts`

- [ ] **Step 1: Write failing tests**

Create `C:/dev/dr-cv/tests/cv-warm.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { renderWarmCv } from "../generadores/templates/cv/warm.js";
import { loadCvData } from "../generadores/lib/load-data.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readFileSync } from "node:fs";

const here = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(here, "..", "data");
const tokensPath = path.join(here, "..", "design-system", "tokens-print.css");
const tokensCss = readFileSync(tokensPath, "utf8");

describe("renderWarmCv", () => {
  const data = loadCvData(dataDir);

  it("returns a full HTML document", () => {
    const html = renderWarmCv(data, "en", tokensCss);
    expect(html).toMatch(/^<!doctype html>/i);
    expect(html).toContain("<html");
    expect(html).toContain("</html>");
  });

  it("includes the live dot signature", () => {
    const html = renderWarmCv(data, "en", tokensCss);
    expect(html).toContain("cv-identity__live-dot");
  });

  it("includes orange accent variable", () => {
    const html = renderWarmCv(data, "en", tokensCss);
    expect(html).toContain("--accent:");
    expect(html).toContain("#FF8964");
  });

  it("renders 4 case cards with first being featured dark", () => {
    const html = renderWarmCv(data, "en", tokensCss);
    const caseCount = (html.match(/class="cv-case /g) || []).length;
    expect(caseCount).toBeGreaterThanOrEqual(4);
    expect(html).toContain("cv-case--dark");
  });

  it("renders 2 verified + 3 attributed testimonials", () => {
    const html = renderWarmCv(data, "en", tokensCss);
    const verified = (html.match(/cv-testimonial__badge--verified/g) || []).length;
    const attributed = (html.match(/cv-testimonial__badge--attributed/g) || []).length;
    expect(verified).toBe(2);
    expect(attributed).toBe(3);
  });

  it("generates ES version with Spanish thesis", () => {
    const html = renderWarmCv(data, "es", tokensCss);
    expect(html).toContain("Entrego publicables reales");
  });
});
```

- [ ] **Step 2: Run tests to verify failure**

Run:
```bash
cd C:/dev/dr-cv && npm test -- tests/cv-warm.test.ts
```
Expected: FAIL with `Cannot find module '../generadores/templates/cv/warm.js'`.

- [ ] **Step 3: Implement the warm composer**

Create `C:/dev/dr-cv/generadores/templates/cv/warm.ts`:

```typescript
import type { CvData } from "../../lib/types.js";
import type { Lang } from "../skills-sheet-page-1.js";
import { renderIdentityBlock } from "./components/identity-block.js";
import { renderSummaryBlock } from "./components/summary-block.js";
import { renderSkillsSidebar } from "./components/skills-sidebar.js";
import { renderExperienceItem } from "./components/experience-item.js";
import { renderCaseCard } from "./components/case-card.js";
import { renderTestimonialItem } from "./components/testimonial-item.js";
import { renderEducationBlock } from "./components/education-block.js";
import { CV_SHARED_STYLES } from "./shared-styles.js";

function pickCases(cv: CvData) {
  // Featured first (always te-skin if present), then top-3 non-featured by yearStart desc
  const featured = cv.cases.find((c) => c.featured);
  const rest = cv.cases
    .filter((c) => !c.featured)
    .sort((a, b) => b.yearStart - a.yearStart)
    .slice(0, 3);
  return featured ? [featured, ...rest] : rest;
}

export function renderWarmCv(data: CvData, lang: Lang, tokensCss: string): string {
  const title = lang === "en"
    ? `${data.identity.name} Â· CV Â· Warm`
    : `${data.identity.name} Â· CV Â· CÃ¡lido`;

  const cases = pickCases(data);
  const casesHtml = cases
    .map((c, i) => renderCaseCard(c, { variant: "warm", lang, featured: i === 0 }))
    .join("\n");

  const currentXp = data.experience.current
    .map((x) => renderExperienceItem(x, { lang, density: "full" }))
    .join("\n");

  const pastXp = (data.experience.past ?? [])
    .map((x) => renderExperienceItem(x, { lang, density: "full" }))
    .join("\n");

  const verifiedHtml = data.testimonials
    .filter((t) => t.source === "verified")
    .slice(0, 2)
    .map((t) => renderTestimonialItem(t, lang))
    .join("\n");

  const attributedHtml = data.attributedTestimonials
    .slice(0, 3)
    .map((t) => renderTestimonialItem(t, lang))
    .join("\n");

  const sectionLabels = lang === "en"
    ? { cases: "Selected cases", xp: "Experience", voices: "Voices", edu: "Education" }
    : { cases: "Casos seleccionados", xp: "Experiencia", voices: "Voces", edu: "EducaciÃ³n" };

  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<title>${title}</title>
<style>
${tokensCss}
${CV_SHARED_STYLES}
</style>
</head>
<body>

<article class="cv-page">
  ${renderIdentityBlock(data.identity, { variant: "warm", lang })}

  ${renderSkillsSidebar(data.skills, { variant: "warm", lang })}

  <div class="cv-right">
    ${renderSummaryBlock(data.positioning, { variant: "warm", lang })}

    <section class="cv-section">
      <h3 class="cv-section__heading">${sectionLabels.cases}</h3>
      ${casesHtml}
    </section>

    <section class="cv-section">
      <h3 class="cv-section__heading">${sectionLabels.xp}</h3>
      ${currentXp}
    </section>
  </div>
</article>

<article class="cv-page">
  <aside>
    ${renderEducationBlock(data.education, lang)}
  </aside>

  <div class="cv-right">
    <section class="cv-section">
      <h3 class="cv-section__heading">${sectionLabels.xp}</h3>
      ${pastXp}
    </section>

    <section class="cv-section">
      <h3 class="cv-section__heading">${sectionLabels.voices}</h3>
      ${verifiedHtml}
      ${attributedHtml}
    </section>
  </div>
</article>

</body>
</html>`;
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run:
```bash
cd C:/dev/dr-cv && npm test -- tests/cv-warm.test.ts
```
Expected: 6 tests PASS.

- [ ] **Step 5: Typecheck**

Run:
```bash
cd C:/dev/dr-cv && npm run typecheck
```
Expected: exits 0.

- [ ] **Step 6: Commit**

```bash
cd C:/dev/dr-cv && git add generadores/templates/cv/warm.ts tests/cv-warm.test.ts && git commit -m "feat(phase-2): warm CV composer (EN+ES, featured-dark, 5 testimonials)"
```

---

## Task 14: Build `serious.ts` composer (TDD)

**Files:**
- Create: `C:/dev/dr-cv/generadores/templates/cv/serious.ts`
- Create: `C:/dev/dr-cv/tests/cv-serious.test.ts`

- [ ] **Step 1: Write failing tests**

Create `C:/dev/dr-cv/tests/cv-serious.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { renderSeriousCv } from "../generadores/templates/cv/serious.js";
import { loadCvData } from "../generadores/lib/load-data.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readFileSync } from "node:fs";

const here = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(here, "..", "data");
const tokensPath = path.join(here, "..", "design-system", "tokens-print.css");
const tokensCss = readFileSync(tokensPath, "utf8");

describe("renderSeriousCv", () => {
  const data = loadCvData(dataDir);

  it("does NOT include the live dot", () => {
    const html = renderSeriousCv(data, "en", tokensCss);
    expect(html).not.toContain("cv-identity__live-dot");
  });

  it("featured case uses accent border, not dark fill", () => {
    const html = renderSeriousCv(data, "en", tokensCss);
    expect(html).toContain("cv-case--accent-border");
    expect(html).not.toContain("cv-case--dark");
  });

  it("renders only 2 verified testimonials, no attributed", () => {
    const html = renderSeriousCv(data, "en", tokensCss);
    const verified = (html.match(/cv-testimonial__badge--verified/g) || []).length;
    const attributed = (html.match(/cv-testimonial__badge--attributed/g) || []).length;
    expect(verified).toBe(2);
    expect(attributed).toBe(0);
  });

  it("uses 'Professional Summary' eyebrow in EN", () => {
    const html = renderSeriousCv(data, "en", tokensCss);
    expect(html).toContain("Professional Summary");
  });

  it("renders 4 case cards", () => {
    const html = renderSeriousCv(data, "en", tokensCss);
    const caseCount = (html.match(/class="cv-case /g) || []).length;
    expect(caseCount).toBeGreaterThanOrEqual(4);
  });
});
```

- [ ] **Step 2: Run tests to verify failure**

Run:
```bash
cd C:/dev/dr-cv && npm test -- tests/cv-serious.test.ts
```
Expected: FAIL with missing module.

- [ ] **Step 3: Implement the serious composer**

Create `C:/dev/dr-cv/generadores/templates/cv/serious.ts`:

```typescript
import type { CvData } from "../../lib/types.js";
import type { Lang } from "../skills-sheet-page-1.js";
import { renderIdentityBlock } from "./components/identity-block.js";
import { renderSummaryBlock } from "./components/summary-block.js";
import { renderSkillsSidebar } from "./components/skills-sidebar.js";
import { renderExperienceItem } from "./components/experience-item.js";
import { renderCaseCard } from "./components/case-card.js";
import { renderTestimonialItem } from "./components/testimonial-item.js";
import { renderEducationBlock } from "./components/education-block.js";
import { CV_SHARED_STYLES } from "./shared-styles.js";

function pickCases(cv: CvData) {
  const featured = cv.cases.find((c) => c.featured);
  const rest = cv.cases
    .filter((c) => !c.featured)
    .sort((a, b) => b.yearStart - a.yearStart)
    .slice(0, 3);
  return featured ? [featured, ...rest] : rest;
}

export function renderSeriousCv(data: CvData, lang: Lang, tokensCss: string): string {
  const title = lang === "en"
    ? `${data.identity.name} Â· Curriculum Vitae`
    : `${data.identity.name} Â· Curriculum Vitae`;

  const cases = pickCases(data);
  const casesHtml = cases
    .map((c, i) => renderCaseCard(c, { variant: "serious", lang, featured: i === 0 }))
    .join("\n");

  const currentXp = data.experience.current
    .map((x) => renderExperienceItem(x, { lang, density: "full" }))
    .join("\n");

  const pastXp = (data.experience.past ?? [])
    .map((x) => renderExperienceItem(x, { lang, density: "full" }))
    .join("\n");

  const verifiedHtml = data.testimonials
    .filter((t) => t.source === "verified")
    .slice(0, 2)
    .map((t) => renderTestimonialItem(t, lang))
    .join("\n");

  const sectionLabels = lang === "en"
    ? { cases: "Selected cases", xp: "Experience", voices: "References", edu: "Education" }
    : { cases: "Casos seleccionados", xp: "Experiencia", voices: "Referencias", edu: "EducaciÃ³n" };

  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<title>${title}</title>
<style>
${tokensCss}
${CV_SHARED_STYLES}
</style>
</head>
<body>

<article class="cv-page">
  ${renderIdentityBlock(data.identity, { variant: "serious", lang })}

  ${renderSkillsSidebar(data.skills, { variant: "serious", lang })}

  <div class="cv-right">
    ${renderSummaryBlock(data.positioning, { variant: "serious", lang })}

    <section class="cv-section">
      <h3 class="cv-section__heading">${sectionLabels.cases}</h3>
      ${casesHtml}
    </section>

    <section class="cv-section">
      <h3 class="cv-section__heading">${sectionLabels.xp}</h3>
      ${currentXp}
    </section>
  </div>
</article>

<article class="cv-page">
  <aside>
    ${renderEducationBlock(data.education, lang)}
  </aside>

  <div class="cv-right">
    <section class="cv-section">
      <h3 class="cv-section__heading">${sectionLabels.xp}</h3>
      ${pastXp}
    </section>

    <section class="cv-section">
      <h3 class="cv-section__heading">${sectionLabels.voices}</h3>
      ${verifiedHtml}
    </section>
  </div>
</article>

</body>
</html>`;
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run:
```bash
cd C:/dev/dr-cv && npm test -- tests/cv-serious.test.ts
```
Expected: 5 tests PASS.

- [ ] **Step 5: Commit**

```bash
cd C:/dev/dr-cv && git add generadores/templates/cv/serious.ts tests/cv-serious.test.ts && git commit -m "feat(phase-2): serious CV composer (EN+ES, accent-border featured, only verified)"
```

---

## Task 15: Build `bairesdev.ts` composer (TDD, isolated tokens)

**Files:**
- Create: `C:/dev/dr-cv/generadores/templates/cv/bairesdev.ts`
- Create: `C:/dev/dr-cv/tests/cv-bairesdev.test.ts`

- [ ] **Step 1: Write failing tests**

Create `C:/dev/dr-cv/tests/cv-bairesdev.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { renderBairesdevCv } from "../generadores/templates/cv/bairesdev.js";
import { loadCvData } from "../generadores/lib/load-data.js";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(here, "..", "data");

describe("renderBairesdevCv", () => {
  const data = loadCvData(dataDir);

  it("does NOT contain Agentic Designer in the role line", () => {
    const html = renderBairesdevCv(data);
    // The role in identity block should NOT be Agentic Designer
    const identityMatch = html.match(/cv-identity__role[^>]*>([^<]+)</);
    expect(identityMatch).toBeTruthy();
    expect(identityMatch![1]).not.toContain("Agentic Designer");
    expect(identityMatch![1]).toContain("Product Designer");
  });

  it("does NOT import tokens-print.css â€” sets inline grayscale tokens", () => {
    const html = renderBairesdevCv(data);
    // bairesdev must not contain the signature warm orange #FF8964
    expect(html).not.toContain("#FF8964");
    expect(html).not.toContain("FFAA81");
  });

  it("does NOT render any testimonials", () => {
    const html = renderBairesdevCv(data);
    expect(html).not.toContain("cv-testimonial__quote");
  });

  it("does NOT include the live dot", () => {
    const html = renderBairesdevCv(data);
    expect(html).not.toContain("cv-identity__live-dot");
  });

  it("renders exactly 2 case cards (not 4)", () => {
    const html = renderBairesdevCv(data);
    const caseCount = (html.match(/class="cv-case /g) || []).length;
    expect(caseCount).toBe(2);
  });

  it("is English only (role label in English)", () => {
    const html = renderBairesdevCv(data);
    expect(html).toContain("Professional Summary");
    expect(html).toContain("Education");
  });
});
```

- [ ] **Step 2: Run tests to verify failure**

Run:
```bash
cd C:/dev/dr-cv && npm test -- tests/cv-bairesdev.test.ts
```
Expected: FAIL with missing module.

- [ ] **Step 3: Implement the BairesDev composer with isolated grayscale tokens**

Create `C:/dev/dr-cv/generadores/templates/cv/bairesdev.ts`:

```typescript
import type { CvData } from "../../lib/types.js";
import { renderIdentityBlock } from "./components/identity-block.js";
import { renderSummaryBlock } from "./components/summary-block.js";
import { renderSkillsSidebar } from "./components/skills-sidebar.js";
import { renderExperienceItem } from "./components/experience-item.js";
import { renderCaseCard } from "./components/case-card.js";
import { renderEducationBlock } from "./components/education-block.js";

const BAIRESDEV_TOKENS = `
:root {
  --ink: #1a1a1a;
  --ink-body: #333333;
  --ink-muted: #6b6b6b;
  --ink-subtle: #8e8e8e;
  --ink-inverse: #ffffff;
  --line: #d8d8d8;
  --line-strong: #aeaeae;
  --line-soft: #ececec;
  --bg-paper: #ffffff;
  --bg-card: #ffffff;
  --bg-section: #f6f6f6;
  --bg-ink: #1a1a1a;

  --accent: #1a1a1a;
  --accent-deep: #1a1a1a;
  --accent-ink: #ffffff;

  --font-body: "Inter","Helvetica Neue",Arial,sans-serif;
  --font-display: "Inter","Helvetica Neue",Arial,sans-serif;
  --font-mono: "Inter","Helvetica Neue",Arial,sans-serif;

  --fs-body: 10pt;
  --lh-body: 1.5;

  --a4-w: 210mm;
  --a4-h: 297mm;
  --a4-pad: 16mm;
}
`;

// Bairesdev-specific structural styles â€” smaller surface than shared-styles
const BAIRESDEV_STYLES = `
*, *::before, *::after { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body {
  font-family: var(--font-body);
  font-size: var(--fs-body);
  line-height: var(--lh-body);
  color: var(--ink-body);
  background: #e8e8e8;
  -webkit-font-smoothing: antialiased;
}
.cv-page {
  width: var(--a4-w);
  min-height: var(--a4-h);
  margin: 24px auto;
  background: var(--bg-paper);
  color: var(--ink);
  padding: var(--a4-pad);
  box-shadow: 0 2px 12px rgba(0,0,0,.08);
  page-break-after: always;
  display: grid;
  grid-template-columns: 62mm 1fr;
  gap: 10mm;
}
.cv-page:last-of-type { page-break-after: auto; }
@media print {
  body { background: var(--bg-paper); }
  .cv-page { margin: 0; box-shadow: none; }
  @page { size: A4; margin: 0; }
}

h1, h2, h3, h4 { margin: 0; color: var(--ink); font-weight: 600; font-family: var(--font-body); }

.cv-identity {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: end;
  gap: 10mm;
  padding-bottom: 6mm;
  border-bottom: 2px solid var(--ink);
  margin-bottom: 6mm;
}
.cv-identity__name { font-size: 22pt; letter-spacing: -0.02em; line-height: 1; margin: 0 0 3mm 0; }
.cv-identity__name-accent { color: inherit; }
.cv-identity__role { font-size: 10pt; margin-bottom: 2mm; color: var(--ink); font-weight: 500; }
.cv-identity__availability { font-size: 9pt; color: var(--ink-muted); }
.cv-identity__contact {
  text-align: right; font-size: 8.5pt; color: var(--ink-body); line-height: 1.6;
}

.cv-summary { margin-bottom: 6mm; grid-column: 2 / -1; }
.cv-summary__eyebrow {
  font-size: 9pt; text-transform: uppercase; letter-spacing: 0.1em;
  color: var(--ink); font-weight: 600; margin-bottom: 3mm;
  border-bottom: 1px solid var(--ink); padding-bottom: 2mm;
}
.cv-summary__thesis {
  font-size: 12pt; line-height: 1.35; font-weight: 600;
  color: var(--ink); margin: 0 0 3mm 0;
}
.cv-summary__tagline { font-size: 9.5pt; color: var(--ink-body); margin: 0; }

.cv-skills { grid-column: 1; }
.cv-skills__heading {
  font-size: 10pt; text-transform: uppercase; letter-spacing: 0.1em;
  color: var(--ink); margin: 0 0 3mm 0; padding-bottom: 2mm;
  border-bottom: 1px solid var(--ink); font-weight: 600;
}
.cv-skills__group { margin-bottom: 3mm; }
.cv-skills__group-title {
  font-size: 8.5pt; text-transform: uppercase; letter-spacing: 0.08em;
  color: var(--ink-muted); margin: 0 0 1.5mm 0;
}
.cv-skills__list { list-style: none; margin: 0; padding: 0; }
.cv-skill { display: inline; font-size: 9pt; color: var(--ink-body); }
.cv-skill:not(:last-child)::after { content: " Â· "; color: var(--ink-muted); }
.cv-skill--learning { color: var(--ink-muted); }
.cv-skill--learning::before { content: "("; }
.cv-skill--learning::after { content: ") "; }

.cv-right { grid-column: 2; }
.cv-section { margin-bottom: 5mm; }
.cv-section__heading {
  font-size: 10pt; text-transform: uppercase; letter-spacing: 0.1em;
  color: var(--ink); margin: 0 0 3mm 0; padding-bottom: 2mm;
  border-bottom: 1px solid var(--ink); font-weight: 600;
}

.cv-xp { margin-bottom: 4mm; padding-bottom: 3mm; border-bottom: 1px solid var(--line-soft); }
.cv-xp:last-child { border-bottom: 0; }
.cv-xp__header { display: flex; justify-content: space-between; margin-bottom: 1mm; }
.cv-xp__company { font-size: 10.5pt; font-weight: 600; }
.cv-xp__dates { font-size: 9pt; color: var(--ink-muted); }
.cv-xp__role { font-size: 9pt; font-weight: 500; margin-bottom: 2mm; }
.cv-xp__badge { display: none; }
.cv-xp__description { font-size: 9pt; line-height: 1.5; margin: 0; color: var(--ink-body); }
.cv-xp__stack { display: none; }

.cv-case {
  border: 1px solid var(--line);
  padding: 3mm 4mm;
  margin-bottom: 3mm;
  border-radius: 4px;
}
.cv-case__meta {
  display: flex; justify-content: space-between;
  font-size: 8.5pt; color: var(--ink-muted);
  text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 2mm;
}
.cv-case__client { color: var(--ink); font-weight: 500; }
.cv-case__title { font-size: 10.5pt; font-weight: 600; margin: 0 0 2mm 0; }
.cv-case__hook { font-size: 9pt; line-height: 1.5; color: var(--ink-body); margin: 0 0 2mm 0; }
.cv-case__bullets { list-style: disc; margin: 0 0 2mm 0; padding-left: 4mm; font-size: 8.5pt; line-height: 1.45; color: var(--ink-body); }
.cv-case__bullets li::marker { color: var(--ink-muted); }
.cv-case__stack { display: none; }

.cv-edu__heading {
  font-size: 10pt; text-transform: uppercase; letter-spacing: 0.1em;
  color: var(--ink); margin: 0 0 3mm 0; padding-bottom: 2mm;
  border-bottom: 1px solid var(--ink); font-weight: 600;
}
.cv-edu__list { list-style: none; margin: 0; padding: 0; }
.cv-edu__item {
  display: grid; grid-template-columns: auto 1fr; column-gap: 5mm;
  font-size: 9pt; padding: 1.5mm 0;
  border-top: 1px solid var(--line-soft);
}
.cv-edu__item:first-child { border-top: 0; }
.cv-edu__year { color: var(--ink-muted); min-width: 10mm; font-size: 8.5pt; }
.cv-edu__name { font-weight: 500; }
.cv-edu__inst { grid-column: 2; font-size: 8.5pt; color: var(--ink-muted); }
`;

export function renderBairesdevCv(data: CvData): string {
  const lang = "en" as const;
  const title = `${data.identity.name} â€” CV`;

  // Only 2 cases for BairesDev: featured if present + top 1 other
  const featured = data.cases.find((c) => c.featured);
  const others = data.cases
    .filter((c) => !c.featured)
    .sort((a, b) => b.yearStart - a.yearStart)
    .slice(0, 1);
  const cases = featured ? [featured, ...others] : others.slice(0, 2);

  const casesHtml = cases
    .map((c) => renderCaseCard(c, { variant: "bairesdev", lang, featured: false }))
    .join("\n");

  const currentXp = data.experience.current
    .map((x) => renderExperienceItem(x, { lang, density: "full" }))
    .join("\n");

  const pastXp = (data.experience.past ?? [])
    .map((x) => renderExperienceItem(x, { lang, density: "condensed" }))
    .join("\n");

  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<title>${title}</title>
<style>
${BAIRESDEV_TOKENS}
${BAIRESDEV_STYLES}
</style>
</head>
<body>

<article class="cv-page">
  ${renderIdentityBlock(data.identity, { variant: "bairesdev", lang })}

  ${renderSkillsSidebar(data.skills, { variant: "bairesdev", lang })}

  <div class="cv-right">
    ${renderSummaryBlock(data.positioning, { variant: "bairesdev", lang })}

    <section class="cv-section">
      <h3 class="cv-section__heading">Experience Highlights</h3>
      ${cases.length > 0 ? casesHtml : ""}
    </section>

    <section class="cv-section">
      <h3 class="cv-section__heading">Professional Experience</h3>
      ${currentXp}
    </section>
  </div>
</article>

<article class="cv-page">
  <aside>
    ${renderEducationBlock(data.education, lang)}
  </aside>

  <div class="cv-right">
    <section class="cv-section">
      <h3 class="cv-section__heading">Past Experience</h3>
      ${pastXp}
    </section>

    <section class="cv-section">
      <h3 class="cv-section__heading">References</h3>
      <p style="font-size:9.5pt;line-height:1.5;color:var(--ink-body);margin:0;">Senior references available on request from Booz Allen Hamilton, Banco Pichincha, MondelÄ“z Latin America and Xentinels DesignOps.</p>
    </section>
  </div>
</article>

</body>
</html>`;
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run:
```bash
cd C:/dev/dr-cv && npm test -- tests/cv-bairesdev.test.ts
```
Expected: 6 tests PASS.

- [ ] **Step 5: Commit**

```bash
cd C:/dev/dr-cv && git add generadores/templates/cv/bairesdev.ts tests/cv-bairesdev.test.ts && git commit -m "feat(phase-2): bairesdev CV composer (EN only, grayscale, no orange, no testimonials)"
```

---

## Task 16: Build the orchestrator `cv.ts`

**Files:**
- Create: `C:/dev/dr-cv/generadores/cv.ts`
- Modify: `C:/dev/dr-cv/package.json`

- [ ] **Step 1: Create the orchestrator**

Create `C:/dev/dr-cv/generadores/cv.ts`:

```typescript
import { readFileSync, mkdirSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadCvData } from "./lib/load-data.js";
import { renderPdf } from "./lib/render-pdf.js";
import { renderWarmCv } from "./templates/cv/warm.js";
import { renderSeriousCv } from "./templates/cv/serious.js";
import { renderBairesdevCv } from "./templates/cv/bairesdev.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");
const dataDir = path.join(projectRoot, "perfil", "data");
const tokensPath = path.join(projectRoot, "design-system", "tokens-print.css");
const distDir = path.join(projectRoot, "dist", "cvs");

async function emit(name: string, html: string): Promise<void> {
  const htmlPath = path.join(distDir, `${name}.html`);
  await writeFile(htmlPath, html);
  console.log(`[cv] wrote ${htmlPath} (${html.length} bytes)`);
  const pdfPath = path.join(distDir, `${name}.pdf`);
  await renderPdf({ html, outputPath: pdfPath });
  console.log(`[cv] wrote ${pdfPath}`);
}

async function main() {
  console.log("[cv] loading /perfil/data/ â€¦");
  const data = loadCvData(dataDir);
  console.log(`[cv] loaded ${data.cases.length} cases, ${data.experience.current.length} current + ${data.experience.past?.length ?? 0} past jobs`);

  const tokensCss = readFileSync(tokensPath, "utf8");
  console.log(`[cv] tokens-print.css = ${tokensCss.length} bytes`);

  mkdirSync(distDir, { recursive: true });

  await emit("cv-warm-en", renderWarmCv(data, "en", tokensCss));
  await emit("cv-warm-es", renderWarmCv(data, "es", tokensCss));
  await emit("cv-serious-en", renderSeriousCv(data, "en", tokensCss));
  await emit("cv-serious-es", renderSeriousCv(data, "es", tokensCss));
  await emit("cv-bairesdev-en", renderBairesdevCv(data));

  console.log("[cv] done.");
}

main().catch((err) => {
  console.error("[cv] FAILED:", err);
  process.exit(1);
});
```

- [ ] **Step 2: Add `build:cvs` script to `package.json`**

Open `C:/dev/dr-cv/package.json`. Find the `"scripts"` block. Replace:

```json
"scripts": {
    "build:skills-sheet": "tsx generadores/skills-sheet.ts",
    "test": "vitest run",
    "test:watch": "vitest",
    "typecheck": "tsc --noEmit"
}
```

With:

```json
"scripts": {
    "build:skills-sheet": "tsx generadores/skills-sheet.ts",
    "build:cvs": "tsx generadores/cv.ts",
    "build:all": "npm run build:skills-sheet && npm run build:cvs",
    "test": "vitest run",
    "test:watch": "vitest",
    "typecheck": "tsc --noEmit"
}
```

- [ ] **Step 3: Run the orchestrator end-to-end**

Run:
```bash
cd C:/dev/dr-cv && npm run build:cvs
```
Expected logs:
```
[cv] loading /perfil/data/ â€¦
[cv] loaded 4 cases, 2 current + 4 past jobs
[cv] tokens-print.css = 10703 bytes
[cv] wrote .../dist/cvs/cv-warm-en.html (...)
[cv] wrote .../dist/cvs/cv-warm-en.pdf
[cv] wrote .../dist/cvs/cv-warm-es.html (...)
[cv] wrote .../dist/cvs/cv-warm-es.pdf
[cv] wrote .../dist/cvs/cv-serious-en.html (...)
[cv] wrote .../dist/cvs/cv-serious-en.pdf
[cv] wrote .../dist/cvs/cv-serious-es.html (...)
[cv] wrote .../dist/cvs/cv-serious-es.pdf
[cv] wrote .../dist/cvs/cv-bairesdev-en.html (...)
[cv] wrote .../dist/cvs/cv-bairesdev-en.pdf
[cv] done.
```

No errors. All 5 HTMLs + 5 PDFs in `dist/cvs/`.

- [ ] **Step 4: Verify outputs**

Run:
```bash
ls -la C:/dev/dr-cv/dist/cvs/
```
Expected: 10 files (5 HTML + 5 PDF), each with non-zero size.

- [ ] **Step 5: Commit**

```bash
cd C:/dev/dr-cv && git add generadores/cv.ts package.json && git commit -m "feat(phase-2): cv orchestrator emits 5 PDFs (warm EN+ES, serious EN+ES, bairesdev EN)"
```

---

## Task 17: Verify success criteria end-to-end

No new files. This task is verification only.

- [ ] **Step 1: Run the full test suite**

Run:
```bash
cd C:/dev/dr-cv && npm test
```
Expected: ALL tests pass. Phase 1 (30) + Phase 2 (types 5 + loader 8 + components 35 + warm 6 + serious 5 + bairesdev 6) = approximately **95 total tests**.

- [ ] **Step 2: Criterion 1 â€” one-command build**

Run:
```bash
cd C:/dev/dr-cv && rm -rf dist/cvs && npm run build:cvs
```
Expected: `dist/cvs/` is created fresh with all 10 files.

- [ ] **Step 3: Criterion 2 â€” A4 fit check (visual)**

Open `dist/cvs/cv-warm-en.pdf` and confirm: exactly 2 pages. Repeat for all 5 PDFs.

- [ ] **Step 4: Criterion 3 â€” warm signature**

Run:
```bash
cd C:/dev/dr-cv && grep -c "cv-identity__live-dot" dist/cvs/cv-warm-en.html && grep -c "#FF8964" dist/cvs/cv-warm-en.html
```
Expected: `live-dot` count >= 1, `#FF8964` count >= 1.

- [ ] **Step 5: Criterion 4 â€” serious signature**

Run:
```bash
cd C:/dev/dr-cv && grep -c "cv-case--accent-border" dist/cvs/cv-serious-en.html && (grep -c "cv-case--dark" dist/cvs/cv-serious-en.html || echo 0)
```
Expected: `accent-border` count >= 1, `cv-case--dark` count is 0.

- [ ] **Step 6: Criterion 5 â€” BairesDev discipline**

Run:
```bash
cd C:/dev/dr-cv && (grep -c "#FF8964" dist/cvs/cv-bairesdev-en.html || echo 0) && (grep -c "Agentic Designer" dist/cvs/cv-bairesdev-en.html || echo 0) && (grep -c "cv-testimonial__quote" dist/cvs/cv-bairesdev-en.html || echo 0)
```
Expected: all three counts are 0.

- [ ] **Step 7: Criterion 6 â€” data change propagation**

Edit `perfil/data/education.yaml`. Append a temporary entry:

```yaml
- year: 2099
  name: "TEMPORARY TEST DEGREE"
  institution: "Test University"
```

Run:
```bash
cd C:/dev/dr-cv && npm run build:cvs
```

Check:
```bash
grep "TEMPORARY TEST DEGREE" dist/cvs/cv-warm-en.html
grep "TEMPORARY TEST DEGREE" dist/cvs/cv-serious-en.html
grep "TEMPORARY TEST DEGREE" dist/cvs/cv-bairesdev-en.html
```
Expected: the string appears in all three. Now revert:

```bash
cd C:/dev/dr-cv && git checkout perfil/data/education.yaml && npm run build:cvs
grep "TEMPORARY TEST DEGREE" dist/cvs/cv-warm-en.html || echo "0 matches (reverted OK)"
```
Expected: `0 matches (reverted OK)`.

- [ ] **Step 8: Criterion 7 â€” shared component reuse**

Verify by searching for a component CSS class in all 3 HTML outputs:

```bash
cd C:/dev/dr-cv && for v in warm-en serious-en bairesdev-en; do echo -n "$v: "; grep -c "cv-xp__company" dist/cvs/cv-$v.html; done
```
Expected: all three outputs have `cv-xp__company` present. (Proves `experience-item` is shared.)

- [ ] **Step 9: Criterion 8 â€” Phase 1 still works**

Run:
```bash
cd C:/dev/dr-cv && npm run build:skills-sheet
```
Expected: Phase 1 skills sheet generation still works (EN + ES HTML + PDF emitted without errors).

- [ ] **Step 10: Final combined build**

Run:
```bash
cd C:/dev/dr-cv && rm -rf dist && npm run build:all
```
Expected: both phases build cleanly, `dist/` contains skills-sheet outputs at root + `dist/cvs/` with 10 files.

- [ ] **Step 11: Final commit (if anything changed)**

```bash
cd C:/dev/dr-cv && git status
```
If clean, skip. Otherwise commit legit changes.

---

## Self-Review

**Spec coverage (each section â†’ task):**
- Problem â†’ context only, no task.
- Goal: 3 composers + shared components + orchestrator â†’ Tasks 5â€“16. âœ“
- Non-goals: enforced by NOT touching Phase 1 files. âœ“
- File structure â†’ Tasks 1â€“16 create exactly the tree from the spec. âœ“
- Variant signatures â†’ Tasks 13 (warm: live dot, orange, 5 testimonials), 14 (serious: accent border, 2 verified), 15 (bairesdev: grayscale, no testimonials, no Agentic Designer). âœ“
- Data flow â†’ Task 4 loader, Task 16 orchestrator. âœ“
- Schema additions â†’ Tasks 1, 2, 3, 4. âœ“
- Success criteria â†’ Task 17 verifies all 8. âœ“

**Placeholder scan:** no TBD, TODO, "similar to Task N", or bare "handle edge cases" lines. Every step has executable content.

**Type consistency:**
- `CvVariant = "warm" | "serious" | "bairesdev"` â€” used in Tasks 6, 7, 8, 9, 11, 13, 14, 15.
- `Lang = "en" | "es"` â€” imported from Phase 1 `skills-sheet-page-1.ts`.
- `ExperienceDensity = "full" | "condensed"` â€” used in Task 8 and consumed in Tasks 13, 14, 15.
- `renderWarmCv / renderSeriousCv` signatures `(data, lang, tokensCss) => string` consistent.
- `renderBairesdevCv` signature `(data) => string` (no lang, no tokens) â€” intentional, documented in test.

**Gaps found:** none.

---

## Execution Handoff

**Plan complete and saved to `docs/superpowers/plans/2026-05-07-phase2-cv-generadores.md`. Two execution options:**

**1. Subagent-Driven (recommended)** â€” I dispatch a fresh subagent per task, review between tasks, fast iteration.

**2. Inline Execution** â€” Execute tasks in this session using executing-plans, batch execution with checkpoints.

**Which approach?**
