# Phase 1 — Skills Sheet Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce a 2-page A4 PDF "skills sheet" for Danilo Rojas, generated from structured data in `/data/skills.yaml` + supporting YAML files, using a Node.js generator that emits HTML → PDF.

**Architecture:** Single source of truth (`/data/*.yaml`) → TypeScript generator (`generators/skills-sheet.ts`) → templated HTML (using lit-html templates) → rendered to PDF via `puppeteer` headless Chromium. The visual design reuses `docs/superpowers/visuals/2026-05-07-light-system/design-tokens.css` (already built, Huly-derived light mode). A npm script `build:skills-sheet` regenerates everything with one command.

**Tech Stack:**
- Node.js 20+ with TypeScript
- `js-yaml` for YAML parsing
- `lit-html` (tiny, template-literal based) for HTML templating — no React/build-step overhead
- `puppeteer` for HTML → PDF via headless Chromium
- Vitest for tests
- Existing CSS tokens at `docs/superpowers/visuals/2026-05-07-light-system/design-tokens.css` (copied to `design-system/tokens.css` as the canonical location)

**Success criteria (from spec):**
1. `/data/skills.yaml` exists with full dual-taxonomy structure (by-layer + by-outcome, mastered + learning).
2. `npm run build:skills-sheet` generates `dist/skills-sheet.html` + `dist/skills-sheet.pdf` cleanly — no hand-edits.
3. PDF passes print test, fits exactly 2 pp A4.
4. Any update to `/data/*.yaml` is reflected on next generation.
5. "Mastered" vs "Learning" visible with visual distinction; no false claims detectable.

---

## File Structure

Before starting, here is the complete file layout this plan produces:

```
dr-cv/
├── package.json                                  # npm config, scripts, deps — NEW
├── tsconfig.json                                 # TS config — NEW
├── .gitignore                                    # add node_modules, dist/ — MODIFY
├── data/
│   ├── identity.yaml                             # NEW
│   ├── positioning.yaml                          # NEW
│   ├── skills.yaml                               # NEW (core of Phase 1)
│   ├── experience.yaml                           # NEW (for "Current work" section)
│   ├── clients.yaml                              # NEW (for "Past clients" chips)
│   └── testimonials/
│       └── verified.yaml                         # NEW (Sheppard + Giraldez)
├── design-system/
│   └── tokens.css                                # COPY from docs/superpowers/visuals/2026-05-07-light-system/design-tokens.css
├── generators/
│   ├── lib/
│   │   ├── load-data.ts                          # NEW — YAML loader
│   │   ├── types.ts                              # NEW — TypeScript types
│   │   └── render-pdf.ts                         # NEW — puppeteer wrapper
│   ├── templates/
│   │   ├── skills-sheet.ts                       # NEW — lit-html template, returns HTML string
│   │   └── skills-sheet-page-1.ts                # NEW — page 1 block
│   │   └── skills-sheet-page-2.ts                # NEW — page 2 block
│   └── skills-sheet.ts                           # NEW — main entry point
├── tests/
│   ├── load-data.test.ts                         # NEW
│   ├── types.test.ts                             # NEW
│   ├── templates.test.ts                         # NEW
│   └── fixtures/
│       └── minimal-skills.yaml                   # NEW — small test fixture
└── dist/
    ├── skills-sheet.html                         # OUTPUT (generated, gitignored)
    └── skills-sheet.pdf                          # OUTPUT (generated, gitignored)
```

**Responsibilities:**
- `data/*.yaml` — content. Danilo edits these directly or via agents.
- `generators/lib/*.ts` — reusable utilities (load YAML, render PDF). Used by all future generators (CV variants, landing).
- `generators/templates/*.ts` — one template per output. Pure functions: `(data) => htmlString`. Testable without a browser.
- `generators/skills-sheet.ts` — orchestrator: load data → render template → write HTML → render PDF.
- `tests/*.test.ts` — unit tests per module. Fixtures in `tests/fixtures/` so we don't depend on real Danilo data in tests.

---

## Task 1: Bootstrap the Node.js project

**Files:**
- Create: `C:/dev/dr-cv/package.json`
- Create: `C:/dev/dr-cv/tsconfig.json`
- Create: `C:/dev/dr-cv/.gitignore`

- [ ] **Step 1: Check current directory state**

Run:
```bash
ls C:/dev/dr-cv/
```
Expected: shows `docs/` and possibly `assets/`. No `package.json` yet.

- [ ] **Step 2: Create `package.json`**

Create `C:/dev/dr-cv/package.json` with exact content:

```json
{
  "name": "dr-cv",
  "version": "0.1.0",
  "description": "Danilo Rojas — single source of truth for CV, skills sheet and landing",
  "private": true,
  "type": "module",
  "engines": {
    "node": ">=20"
  },
  "scripts": {
    "build:skills-sheet": "tsx generators/skills-sheet.ts",
    "test": "vitest run",
    "test:watch": "vitest",
    "typecheck": "tsc --noEmit"
  },
  "devDependencies": {
    "@types/js-yaml": "^4.0.9",
    "@types/node": "^20.11.0",
    "js-yaml": "^4.1.0",
    "lit-html": "^3.1.0",
    "puppeteer": "^22.0.0",
    "tsx": "^4.7.0",
    "typescript": "^5.3.0",
    "vitest": "^1.2.0"
  }
}
```

- [ ] **Step 3: Create `tsconfig.json`**

Create `C:/dev/dr-cv/tsconfig.json` with exact content:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "noEmit": true,
    "allowImportingTsExtensions": false,
    "isolatedModules": true
  },
  "include": ["generators/**/*.ts", "tests/**/*.ts"]
}
```

- [ ] **Step 4: Create `.gitignore` in project root**

Create `C:/dev/dr-cv/.gitignore` with exact content:

```
node_modules/
dist/
*.log
.DS_Store
.env
.env.local
```

- [ ] **Step 5: Install dependencies**

Run:
```bash
cd C:/dev/dr-cv && npm install
```
Expected: installs all devDependencies, creates `node_modules/` and `package-lock.json`. No errors. Takes 1–3 minutes due to puppeteer downloading Chromium.

- [ ] **Step 6: Verify TypeScript compiles (empty)**

Run:
```bash
cd C:/dev/dr-cv && npm run typecheck
```
Expected: exits 0 with no output (nothing to check yet, but config is valid).

- [ ] **Step 7: Commit**

```bash
cd C:/dev/dr-cv && git init && git add package.json tsconfig.json .gitignore && git commit -m "feat(phase-1): bootstrap Node.js + TypeScript project"
```

Expected: initial commit created. If repo already initialized, skip `git init`.

---

## Task 2: Define TypeScript types for the data schema

**Files:**
- Create: `C:/dev/dr-cv/generators/lib/types.ts`
- Test: `C:/dev/dr-cv/tests/types.test.ts`

- [ ] **Step 1: Write the failing test**

Create `C:/dev/dr-cv/tests/types.test.ts` with content:

```typescript
import { describe, it, expectTypeOf } from "vitest";
import type {
  Identity,
  Positioning,
  Skill,
  SkillGroup,
  SkillAxis,
  Skills,
  ExperienceItem,
  Experience,
  Client,
  Clients,
  Testimonial,
  Testimonials,
  SkillsSheetData,
} from "../generators/lib/types.js";

describe("data schema types", () => {
  it("Skill has name, level, optional note", () => {
    expectTypeOf<Skill>().toMatchTypeOf<{
      name: string;
      level: "mastered" | "learning";
      note?: string;
    }>();
  });

  it("SkillGroup has title and list of skills", () => {
    expectTypeOf<SkillGroup>().toMatchTypeOf<{
      title: string;
      skills: Skill[];
    }>();
  });

  it("SkillAxis has name, axis label and groups", () => {
    expectTypeOf<SkillAxis>().toMatchTypeOf<{
      name: string;
      axis: string;
      groups: SkillGroup[];
    }>();
  });

  it("Skills has byLayer and byOutcome axes", () => {
    expectTypeOf<Skills>().toMatchTypeOf<{
      byLayer: SkillAxis;
      byOutcome: SkillAxis;
    }>();
  });

  it("Testimonial has quote, author, role, source", () => {
    expectTypeOf<Testimonial>().toMatchTypeOf<{
      quote: string;
      author: string;
      role: string;
      company?: string;
      source: "verified" | "attributed";
    }>();
  });

  it("SkillsSheetData composes everything", () => {
    expectTypeOf<SkillsSheetData>().toMatchTypeOf<{
      identity: Identity;
      positioning: Positioning;
      skills: Skills;
      experience: Experience;
      clients: Clients;
      testimonials: Testimonials;
    }>();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run:
```bash
cd C:/dev/dr-cv && npm test -- tests/types.test.ts
```
Expected: FAIL with `Cannot find module '../generators/lib/types.js'` — this is exactly what we want.

- [ ] **Step 3: Create the types file**

Create `C:/dev/dr-cv/generators/lib/types.ts` with content:

```typescript
// ============= IDENTITY =============
export interface Identity {
  name: string;
  role: string;          // e.g. "Agentic Designer · Product Engineer"
  location: string;      // e.g. "Quito · Ecuador"
  languages: string;     // e.g. "EN native-like · ES native"
  availability: string;  // e.g. "Open to work · Remote global"
  contact: {
    email: string;
    phone?: string;
    linkedin?: string;
    github?: string;
    behance?: string;
    site?: string;
  };
}

// ============= POSITIONING =============
export interface Positioning {
  thesis: {
    en: string;
    es: string;
  };
  tagline: {
    en: string;
    es: string;
  };
  proofNumbers: Array<{
    value: string;      // e.g. "346"
    unit?: string;      // e.g. "+" or ".0"
    labelEn: string;
    labelEs: string;
  }>;
}

// ============= SKILLS =============
export interface Skill {
  name: string;
  level: "mastered" | "learning";
  note?: string;
}

export interface SkillGroup {
  title: string;    // e.g. "Strategy"
  skills: Skill[];
}

export interface SkillAxis {
  name: string;     // e.g. "Visual A"
  axis: string;     // e.g. "axis · product layer"
  groups: SkillGroup[];
}

export interface Skills {
  byLayer: SkillAxis;
  byOutcome: SkillAxis;
}

// ============= EXPERIENCE =============
export interface ExperienceItem {
  company: string;
  role: string;
  startYear: number;
  endYear: number | "present";
  descriptionEn: string;
  descriptionEs: string;
  stack: string[];
  highlight?: boolean;       // marks if it's "current" / featured
  badge?: string;            // e.g. "paying pilots", "Army · DoD"
}

export interface Experience {
  current: ExperienceItem[];  // for "Current work" section
  past?: ExperienceItem[];    // for later phases
}

// ============= CLIENTS =============
export interface Client {
  name: string;
  industryEn: string;
  industryEs: string;
}

export type Clients = Client[];

// ============= TESTIMONIALS =============
export interface Testimonial {
  quote: string;           // English primary
  quoteEs?: string;        // optional Spanish translation
  author: string;
  role: string;            // role + project + company, short
  company?: string;
  source: "verified" | "attributed";
}

export type Testimonials = Testimonial[];

// ============= ROOT =============
export interface SkillsSheetData {
  identity: Identity;
  positioning: Positioning;
  skills: Skills;
  experience: Experience;
  clients: Clients;
  testimonials: Testimonials;
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run:
```bash
cd C:/dev/dr-cv && npm test -- tests/types.test.ts
```
Expected: PASS — all 6 type assertions succeed.

- [ ] **Step 5: Typecheck the whole project**

Run:
```bash
cd C:/dev/dr-cv && npm run typecheck
```
Expected: exits 0 with no errors.

- [ ] **Step 6: Commit**

```bash
cd C:/dev/dr-cv && git add generators/lib/types.ts tests/types.test.ts && git commit -m "feat(phase-1): define data schema types"
```

---

## Task 3: Create the YAML data files

**Files:**
- Create: `C:/dev/dr-cv/data/identity.yaml`
- Create: `C:/dev/dr-cv/data/positioning.yaml`
- Create: `C:/dev/dr-cv/data/skills.yaml`
- Create: `C:/dev/dr-cv/data/experience.yaml`
- Create: `C:/dev/dr-cv/data/clients.yaml`
- Create: `C:/dev/dr-cv/data/testimonials/verified.yaml`

- [ ] **Step 1: Create `data/identity.yaml`**

```yaml
name: Danilo Rojas
role: "Agentic Designer · Product Engineer"
location: "Quito · Ecuador"
languages: "EN professional · ES native"
availability: "Open to work · Remote global"
contact:
  email: danilorojas@hotmail.com
  phone: "+593 987 655 379"
  linkedin: linkedin.com/in/mdanilorojas
  github: github.com/mdanilorojas
  behance: behance.net/mariodanilo
  site: "danilorojas.design (soon)"
```

- [ ] **Step 2: Create `data/positioning.yaml`**

```yaml
thesis:
  en: "I ship real products — and I ship the tools agents use to help me ship them."
  es: "Entrego productos reales — y entrego las herramientas que los agentes usan para ayudarme."
tagline:
  en: "Fifteen years of delivery. Enterprise clients, production SaaS, active consulting at Booz Allen Hamilton. I keep the craft; agents give me the leverage."
  es: "Quince años entregando. Clientes enterprise, SaaS en producción, consultoría activa en Booz Allen Hamilton. Yo pongo el craft; los agentes dan el leverage."
proofNumbers:
  - value: "15"
    unit: "+"
    labelEn: "Years shipping product"
    labelEs: "Años shippeando"
  - value: "346"
    labelEn: "Commits · last 40 days"
    labelEs: "Commits · 40 días"
  - value: "1"
    unit: ".0"
    labelEn: "SaaS live in production"
    labelEs: "SaaS en producción"
  - value: "95"
    unit: ".6"
    labelEn: "DS migration score"
    labelEs: "Score migración DS"
```

- [ ] **Step 3: Create `data/skills.yaml` — the core file**

```yaml
byLayer:
  name: Visual A
  axis: "axis · product layer"
  groups:
    - title: Strategy
      skills:
        - { name: "Product vision", level: mastered }
        - { name: "Roadmapping · RICE", level: mastered }
        - { name: "GTM specs", level: mastered }
        - { name: "Multi-persona", level: mastered }
        - { name: "Pricing · packaging", level: learning }
        - { name: "MRR / CAC / LTV", level: learning }
    - title: Design
      skills:
        - { name: "Design systems", level: mastered }
        - { name: "Multi-theme (dark + light)", level: mastered }
        - { name: "W3C design tokens", level: mastered }
        - { name: "Figma · Style Dictionary", level: mastered }
        - { name: "Recursive DS review", level: mastered }
        - { name: "Interactive HTML docs", level: mastered }
        - { name: "Named anti-patterns", level: mastered }
        - { name: "Agentic UX patterns", level: learning }
        - { name: "User research n>10", level: learning }
    - title: Engineering
      skills:
        - { name: "TypeScript · React 19", level: mastered }
        - { name: "Next 16 · Vite · Tailwind", level: mastered }
        - { name: "Supabase · Prisma", level: mastered }
        - { name: "SQL · RLS · edge", level: mastered }
        - { name: "CI · Vercel · DNS", level: mastered }
        - { name: "Houdini · canvas · glass", level: mastered }
        - { name: "SharePoint SPA engineering", level: mastered }
        - { name: "Test coverage discipline", level: learning }
        - { name: "Sentry · PostHog", level: learning }
        - { name: "Distributed backend", level: learning }
    - title: Agents
      skills:
        - { name: "Claude Code · power user", level: mastered }
        - { name: "MCP servers", level: mastered }
        - { name: "Subagent orchestration", level: mastered }
        - { name: "Skills-lock · reproducible", level: mastered }
        - { name: "DS as agent-consumable skill", level: mastered }
        - { name: "Gemini API in runtime", level: mastered }
        - { name: "Evals · promptfoo", level: learning }
        - { name: "RAG in production", level: learning }

byOutcome:
  name: Visual B
  axis: "axis · client outcome"
  groups:
    - title: Discovery
      skills:
        - { name: "Problem framing", level: mastered }
        - { name: "Non-goals discipline", level: mastered }
        - { name: "Persona-driven specs", level: mastered }
        - { name: "Live user interviews", level: learning }
    - title: Build
      skills:
        - { name: "0 → prod in a day", level: mastered }
        - { name: "0 → 1.0-MVP in 40 days", level: mastered }
        - { name: "Full-stack TS + SQL", level: mastered }
        - { name: "DS migrations (17 parts)", level: mastered }
        - { name: "Functional prototypes", level: mastered }
        - { name: "LLM-native features", level: learning }
    - title: Ship
      skills:
        - { name: "Vercel · GH Actions", level: mastered }
        - { name: "Conventional commits", level: mastered }
        - { name: "Deploy · DNS · domains", level: mastered }
        - { name: "RLS + demo-mode", level: mastered }
        - { name: "SLOs · on-call", level: learning }
        - { name: "Load testing", level: learning }
    - title: Scale
      skills:
        - { name: "Enterprise clients (15 yrs)", level: mastered }
        - { name: "Design ops · distributed DS", level: mastered }
        - { name: "Cross-team consulting (BAH)", level: mastered }
        - { name: "Solo founder · agent-multiplied", level: mastered }
        - { name: "Growth loops · PLG", level: learning }
        - { name: "Team hiring", level: learning }
```

- [ ] **Step 4: Create `data/experience.yaml`**

```yaml
current:
  - company: "Booz Allen Hamilton"
    role: "Design-engineering consultant"
    startYear: 2024
    endYear: present
    highlight: true
    badge: "Army · DoD"
    descriptionEn: "Design-engineering across the Trusted Environments umbrella — landing, Developer Portal product, and PM collaboration. Two parallel DS (/te-skin as agent-consumable skill + TE Black dark-first w/ a11y audit in tokens). SharePoint SPA. Cross-team consulting to Army/DoD product teams."
    descriptionEs: "Design-engineering en Trusted Environments — landing, producto Developer Portal y colaboración PM. Dos DS paralelos (/te-skin como skill consumible por agentes + TE Black dark-first con audit a11y en tokens). SPA SharePoint. Consultoría transversal a equipos Army/DoD."
    stack: ["/te-skin", "Developer Portal", "TE Black DS", "SharePoint SPA", "Houdini", "Army · DoD"]

  - company: "EnRegla"
    role: "Founder · product · engineering"
    startYear: 2026
    endYear: present
    highlight: true
    badge: "paying pilots"
    descriptionEn: "SaaS de compliance multi-sede for LATAM SMBs. 0 → 1.0-MVP in production in 40 days. 346 commits, 21 SQL migrations, 31 UI components, 1 edge function with cron, DS migration 17-parts × 5 recursive rounds (78.4 → 95.6)."
    descriptionEs: "SaaS de compliance multi-sede para PYMES LATAM. 0 → 1.0-MVP en producción en 40 días. 346 commits, 21 migraciones SQL, 31 componentes UI, 1 edge function con cron, migración DS 17-partes × 5 rondas (78.4 → 95.6)."
    stack: ["React 19", "Supabase", "Claude Code", "MCP", "RLS"]
```

- [ ] **Step 5: Create `data/clients.yaml`**

```yaml
- name: "Merck & Co."
  industryEn: "Healthcare"
  industryEs: "Salud"
- name: "Mondelēz Intl."
  industryEn: "CPG · Foods"
  industryEs: "CPG · Alimentos"
- name: "Banco Pichincha"
  industryEn: "Banking"
  industryEs: "Banca"
- name: "Quifatex"
  industryEn: "Logistics"
  industryEs: "Logística"
- name: "Grupo Superior"
  industryEn: "Consumer"
  industryEs: "Consumer"
- name: "Moderna Corp."
  industryEn: "Pharma"
  industryEs: "Farma"
- name: "Azzorti"
  industryEn: "Retail"
  industryEs: "Retail"
- name: "Flamingo CO."
  industryEn: "Retail"
  industryEs: "Retail"
```

- [ ] **Step 6: Create `data/testimonials/verified.yaml`**

Run first:
```bash
mkdir -p C:/dev/dr-cv/data/testimonials
```

Then create `C:/dev/dr-cv/data/testimonials/verified.yaml`:

```yaml
- quote: "Danilo is doing wonderful things using AI in the right ways. He dove into the developer-portal world and delivered work I wanted to keep reusing. A real loss for us."
  quoteEs: "Danilo está haciendo cosas geniales usando AI de las maneras correctas. Se metió a fondo en el mundo de developer-portal y entregó trabajo que quería seguir reutilizando. Una pérdida de verdad para nosotros."
  author: "Jennifer Sheppard"
  role: "Product Lead · Developer Portal"
  company: "Booz Allen Hamilton"
  source: verified

- quote: "Danilo blends design, requirements, development and AI — the unicorn most companies are looking for in this changing time. A huge boon for any team."
  quoteEs: "Danilo mezcla diseño, requerimientos, desarrollo e IA — el unicornio que la mayoría de empresas está buscando en este cambio de era. Un gran aporte para cualquier equipo."
  author: "Alexander Giraldez"
  role: "Design Lead · Trusted Environments"
  company: "Booz Allen Hamilton"
  source: verified
```

- [ ] **Step 7: Verify all YAML files are well-formed**

Run:
```bash
cd C:/dev/dr-cv && node -e "const yaml=require('js-yaml'); const fs=require('fs'); ['data/identity.yaml','data/positioning.yaml','data/skills.yaml','data/experience.yaml','data/clients.yaml','data/testimonials/verified.yaml'].forEach(f=>{try{yaml.load(fs.readFileSync(f,'utf8'));console.log('OK',f)}catch(e){console.error('FAIL',f,e.message);process.exit(1)}})"
```
Expected: 6 lines of `OK data/…`. If any fails, fix syntax and retry.

- [ ] **Step 8: Commit**

```bash
cd C:/dev/dr-cv && git add data/ && git commit -m "feat(phase-1): add source-of-truth YAML data files"
```

---

## Task 4: Build the YAML loader utility

**Files:**
- Create: `C:/dev/dr-cv/generators/lib/load-data.ts`
- Test: `C:/dev/dr-cv/tests/load-data.test.ts`
- Test fixture: `C:/dev/dr-cv/tests/fixtures/minimal-skills.yaml`

- [ ] **Step 1: Create a minimal test fixture**

Run first:
```bash
mkdir -p C:/dev/dr-cv/tests/fixtures
```

Create `C:/dev/dr-cv/tests/fixtures/minimal-skills.yaml`:

```yaml
byLayer:
  name: Test A
  axis: "test axis layer"
  groups:
    - title: Strategy
      skills:
        - { name: "Test skill 1", level: mastered }
        - { name: "Test skill 2", level: learning }
byOutcome:
  name: Test B
  axis: "test axis outcome"
  groups:
    - title: Discovery
      skills:
        - { name: "Test skill 3", level: mastered }
```

- [ ] **Step 2: Write the failing test**

Create `C:/dev/dr-cv/tests/load-data.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { loadSkills, loadAllData, DataLoadError } from "../generators/lib/load-data.js";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixtureDir = path.join(__dirname, "fixtures");
const dataDir = path.join(__dirname, "..", "data");

describe("loadSkills", () => {
  it("loads and parses a minimal skills YAML file", () => {
    const skillsPath = path.join(fixtureDir, "minimal-skills.yaml");
    const skills = loadSkills(skillsPath);
    expect(skills.byLayer.name).toBe("Test A");
    expect(skills.byLayer.groups).toHaveLength(1);
    expect(skills.byLayer.groups[0].skills).toHaveLength(2);
    expect(skills.byLayer.groups[0].skills[0].level).toBe("mastered");
    expect(skills.byLayer.groups[0].skills[1].level).toBe("learning");
    expect(skills.byOutcome.groups).toHaveLength(1);
  });

  it("throws DataLoadError when file does not exist", () => {
    expect(() => loadSkills("nonexistent.yaml")).toThrow(DataLoadError);
  });

  it("throws DataLoadError when schema is violated (missing byLayer)", () => {
    const skillsPath = path.join(fixtureDir, "..", "fixtures-bad", "no-bylayer.yaml");
    expect(() => loadSkills(skillsPath)).toThrow(DataLoadError);
  });
});

describe("loadAllData", () => {
  it("loads the real /data/ directory without errors", () => {
    const data = loadAllData(dataDir);
    expect(data.identity.name).toBe("Danilo Rojas");
    expect(data.skills.byLayer.groups.length).toBeGreaterThan(0);
    expect(data.skills.byOutcome.groups.length).toBeGreaterThan(0);
    expect(data.experience.current.length).toBeGreaterThan(0);
    expect(data.clients.length).toBeGreaterThan(0);
    expect(data.testimonials.length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 3: Create the bad fixture for the failing test**

Run:
```bash
mkdir -p C:/dev/dr-cv/tests/fixtures-bad
```

Create `C:/dev/dr-cv/tests/fixtures-bad/no-bylayer.yaml`:

```yaml
byOutcome:
  name: Only outcome here
  axis: "malformed"
  groups: []
```

- [ ] **Step 4: Run the test to verify it fails**

Run:
```bash
cd C:/dev/dr-cv && npm test -- tests/load-data.test.ts
```
Expected: FAIL with `Cannot find module '../generators/lib/load-data.js'`.

- [ ] **Step 5: Implement the loader**

Create `C:/dev/dr-cv/generators/lib/load-data.ts`:

```typescript
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import type {
  Identity,
  Positioning,
  Skills,
  Experience,
  Clients,
  Testimonials,
  SkillsSheetData,
} from "./types.js";

export class DataLoadError extends Error {
  constructor(message: string, public readonly path?: string) {
    super(message);
    this.name = "DataLoadError";
  }
}

function loadYaml<T>(filePath: string, validate: (v: unknown) => T): T {
  if (!existsSync(filePath)) {
    throw new DataLoadError(`File not found: ${filePath}`, filePath);
  }
  let raw: unknown;
  try {
    raw = yaml.load(readFileSync(filePath, "utf8"));
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    throw new DataLoadError(`YAML parse error in ${filePath}: ${msg}`, filePath);
  }
  try {
    return validate(raw);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    throw new DataLoadError(`Schema error in ${filePath}: ${msg}`, filePath);
  }
}

function requireObject(v: unknown, ctx: string): Record<string, unknown> {
  if (v === null || typeof v !== "object" || Array.isArray(v)) {
    throw new Error(`${ctx} must be an object`);
  }
  return v as Record<string, unknown>;
}

function requireString(v: unknown, ctx: string): string {
  if (typeof v !== "string") throw new Error(`${ctx} must be a string`);
  return v;
}

function requireArray<T>(v: unknown, ctx: string, item: (x: unknown, i: number) => T): T[] {
  if (!Array.isArray(v)) throw new Error(`${ctx} must be an array`);
  return v.map((x, i) => item(x, i));
}

// ---------- validators ----------
export function validateSkills(raw: unknown): Skills {
  const obj = requireObject(raw, "skills");
  if (!("byLayer" in obj)) throw new Error("skills.byLayer is required");
  if (!("byOutcome" in obj)) throw new Error("skills.byOutcome is required");
  const validateAxis = (v: unknown, label: string) => {
    const a = requireObject(v, `skills.${label}`);
    return {
      name: requireString(a.name, `skills.${label}.name`),
      axis: requireString(a.axis, `skills.${label}.axis`),
      groups: requireArray(a.groups, `skills.${label}.groups`, (g, gi) => {
        const go = requireObject(g, `skills.${label}.groups[${gi}]`);
        return {
          title: requireString(go.title, `skills.${label}.groups[${gi}].title`),
          skills: requireArray(go.skills, `skills.${label}.groups[${gi}].skills`, (s, si) => {
            const so = requireObject(s, `skills.${label}.groups[${gi}].skills[${si}]`);
            const level = requireString(so.level, `skills.${label}.groups[${gi}].skills[${si}].level`);
            if (level !== "mastered" && level !== "learning") {
              throw new Error(`skills.${label}.groups[${gi}].skills[${si}].level must be 'mastered' or 'learning', got '${level}'`);
            }
            return {
              name: requireString(so.name, `skills.${label}.groups[${gi}].skills[${si}].name`),
              level: level as "mastered" | "learning",
              note: typeof so.note === "string" ? so.note : undefined,
            };
          }),
        };
      }),
    };
  };
  return {
    byLayer: validateAxis(obj.byLayer, "byLayer"),
    byOutcome: validateAxis(obj.byOutcome, "byOutcome"),
  };
}

function validateIdentity(raw: unknown): Identity {
  const o = requireObject(raw, "identity");
  const c = requireObject(o.contact, "identity.contact");
  return {
    name: requireString(o.name, "identity.name"),
    role: requireString(o.role, "identity.role"),
    location: requireString(o.location, "identity.location"),
    languages: requireString(o.languages, "identity.languages"),
    availability: requireString(o.availability, "identity.availability"),
    contact: {
      email: requireString(c.email, "identity.contact.email"),
      phone: typeof c.phone === "string" ? c.phone : undefined,
      linkedin: typeof c.linkedin === "string" ? c.linkedin : undefined,
      github: typeof c.github === "string" ? c.github : undefined,
      behance: typeof c.behance === "string" ? c.behance : undefined,
      site: typeof c.site === "string" ? c.site : undefined,
    },
  };
}

function validatePositioning(raw: unknown): Positioning {
  const o = requireObject(raw, "positioning");
  const th = requireObject(o.thesis, "positioning.thesis");
  const tg = requireObject(o.tagline, "positioning.tagline");
  return {
    thesis: {
      en: requireString(th.en, "positioning.thesis.en"),
      es: requireString(th.es, "positioning.thesis.es"),
    },
    tagline: {
      en: requireString(tg.en, "positioning.tagline.en"),
      es: requireString(tg.es, "positioning.tagline.es"),
    },
    proofNumbers: requireArray(o.proofNumbers, "positioning.proofNumbers", (p, i) => {
      const po = requireObject(p, `positioning.proofNumbers[${i}]`);
      return {
        value: requireString(po.value, `positioning.proofNumbers[${i}].value`),
        unit: typeof po.unit === "string" ? po.unit : undefined,
        labelEn: requireString(po.labelEn, `positioning.proofNumbers[${i}].labelEn`),
        labelEs: requireString(po.labelEs, `positioning.proofNumbers[${i}].labelEs`),
      };
    }),
  };
}

function validateExperience(raw: unknown): Experience {
  const o = requireObject(raw, "experience");
  const validateItems = (v: unknown, label: string) =>
    requireArray(v, label, (it, i) => {
      const io = requireObject(it, `${label}[${i}]`);
      const endYearRaw = io.endYear;
      const endYear =
        endYearRaw === "present"
          ? "present"
          : typeof endYearRaw === "number"
          ? endYearRaw
          : (() => { throw new Error(`${label}[${i}].endYear must be number or "present"`); })();
      return {
        company: requireString(io.company, `${label}[${i}].company`),
        role: requireString(io.role, `${label}[${i}].role`),
        startYear: typeof io.startYear === "number"
          ? io.startYear
          : (() => { throw new Error(`${label}[${i}].startYear must be number`); })(),
        endYear,
        descriptionEn: requireString(io.descriptionEn, `${label}[${i}].descriptionEn`),
        descriptionEs: requireString(io.descriptionEs, `${label}[${i}].descriptionEs`),
        stack: requireArray(io.stack, `${label}[${i}].stack`, (s) => requireString(s, `stack item`)),
        highlight: typeof io.highlight === "boolean" ? io.highlight : undefined,
        badge: typeof io.badge === "string" ? io.badge : undefined,
      };
    });
  return {
    current: validateItems(o.current, "experience.current"),
    past: o.past ? validateItems(o.past, "experience.past") : undefined,
  };
}

function validateClients(raw: unknown): Clients {
  return requireArray(raw, "clients", (c, i) => {
    const co = requireObject(c, `clients[${i}]`);
    return {
      name: requireString(co.name, `clients[${i}].name`),
      industryEn: requireString(co.industryEn, `clients[${i}].industryEn`),
      industryEs: requireString(co.industryEs, `clients[${i}].industryEs`),
    };
  });
}

function validateTestimonials(raw: unknown): Testimonials {
  return requireArray(raw, "testimonials", (t, i) => {
    const to = requireObject(t, `testimonials[${i}]`);
    const source = requireString(to.source, `testimonials[${i}].source`);
    if (source !== "verified" && source !== "attributed") {
      throw new Error(`testimonials[${i}].source must be 'verified' or 'attributed', got '${source}'`);
    }
    return {
      quote: requireString(to.quote, `testimonials[${i}].quote`),
      quoteEs: typeof to.quoteEs === "string" ? to.quoteEs : undefined,
      author: requireString(to.author, `testimonials[${i}].author`),
      role: requireString(to.role, `testimonials[${i}].role`),
      company: typeof to.company === "string" ? to.company : undefined,
      source: source as "verified" | "attributed",
    };
  });
}

// ---------- public API ----------
export function loadSkills(filePath: string): Skills {
  return loadYaml(filePath, validateSkills);
}

export function loadAllData(dataDir: string): SkillsSheetData {
  return {
    identity: loadYaml(path.join(dataDir, "identity.yaml"), validateIdentity),
    positioning: loadYaml(path.join(dataDir, "positioning.yaml"), validatePositioning),
    skills: loadYaml(path.join(dataDir, "skills.yaml"), validateSkills),
    experience: loadYaml(path.join(dataDir, "experience.yaml"), validateExperience),
    clients: loadYaml(path.join(dataDir, "clients.yaml"), validateClients),
    testimonials: loadYaml(path.join(dataDir, "testimonials", "verified.yaml"), validateTestimonials),
  };
}
```

- [ ] **Step 6: Run the tests to verify they pass**

Run:
```bash
cd C:/dev/dr-cv && npm test -- tests/load-data.test.ts
```
Expected: PASS — all 4 tests (3 for loadSkills + 1 for loadAllData). If `loadAllData` test fails, check that all `data/*.yaml` files from Task 3 are complete.

- [ ] **Step 7: Typecheck**

Run:
```bash
cd C:/dev/dr-cv && npm run typecheck
```
Expected: exits 0.

- [ ] **Step 8: Commit**

```bash
cd C:/dev/dr-cv && git add generators/lib/load-data.ts tests/load-data.test.ts tests/fixtures/ tests/fixtures-bad/ && git commit -m "feat(phase-1): YAML loader with schema validation"
```

---

## Task 5: Copy design tokens into the canonical location

**Files:**
- Create: `C:/dev/dr-cv/design-system/tokens.css` (copy of existing)

- [ ] **Step 1: Create the directory**

```bash
mkdir -p C:/dev/dr-cv/design-system
```

- [ ] **Step 2: Copy the existing tokens file**

Run:
```bash
cp "C:/dev/dr-cv/docs/superpowers/visuals/2026-05-07-light-system/design-tokens.css" "C:/dev/dr-cv/design-system/tokens.css"
```

- [ ] **Step 3: Verify file exists and has content**

Run:
```bash
wc -l C:/dev/dr-cv/design-system/tokens.css
```
Expected: a line count > 200 (the file is ~10KB).

- [ ] **Step 4: Commit**

```bash
cd C:/dev/dr-cv && git add design-system/ && git commit -m "feat(phase-1): establish design-system/ as canonical tokens location"
```

---

## Task 6: Build the HTML template — Page 1 only first

**Files:**
- Create: `C:/dev/dr-cv/generators/templates/skills-sheet-page-1.ts`
- Test: `C:/dev/dr-cv/tests/templates.test.ts`

- [ ] **Step 1: Write the failing test**

Create `C:/dev/dr-cv/tests/templates.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { renderPage1 } from "../generators/templates/skills-sheet-page-1.js";
import type { SkillsSheetData } from "../generators/lib/types.js";

const fixture: SkillsSheetData = {
  identity: {
    name: "Test Person",
    role: "Test Role",
    location: "Test City",
    languages: "EN · ES",
    availability: "Open",
    contact: { email: "test@example.com" },
  },
  positioning: {
    thesis: { en: "Test thesis EN", es: "Test thesis ES" },
    tagline: { en: "Test tagline EN", es: "Test tagline ES" },
    proofNumbers: [
      { value: "10", unit: "+", labelEn: "Test metric", labelEs: "Métrica test" },
    ],
  },
  skills: {
    byLayer: {
      name: "Layer",
      axis: "layer axis",
      groups: [
        {
          title: "Test Group",
          skills: [
            { name: "Skill A", level: "mastered" },
            { name: "Skill B", level: "learning" },
          ],
        },
      ],
    },
    byOutcome: {
      name: "Outcome",
      axis: "outcome axis",
      groups: [
        { title: "Outcome Group", skills: [{ name: "Skill C", level: "mastered" }] },
      ],
    },
  },
  experience: { current: [] },
  clients: [],
  testimonials: [],
};

describe("renderPage1", () => {
  it("includes the person name", () => {
    const html = renderPage1(fixture, "en");
    expect(html).toContain("Test Person");
  });

  it("uses EN thesis when lang=en", () => {
    const html = renderPage1(fixture, "en");
    expect(html).toContain("Test thesis EN");
    expect(html).not.toContain("Test thesis ES");
  });

  it("uses ES thesis when lang=es", () => {
    const html = renderPage1(fixture, "es");
    expect(html).toContain("Test thesis ES");
  });

  it("renders each proof number with value and unit", () => {
    const html = renderPage1(fixture, "en");
    expect(html).toContain("10");
    expect(html).toContain("+");
    expect(html).toContain("Test metric");
  });

  it("renders both byLayer and byOutcome axis groups", () => {
    const html = renderPage1(fixture, "en");
    expect(html).toContain("Test Group");
    expect(html).toContain("Outcome Group");
    expect(html).toContain("Skill A");
    expect(html).toContain("Skill C");
  });

  it("marks learning skills with a distinct class", () => {
    const html = renderPage1(fixture, "en");
    // learning skills get class="learn"
    expect(html).toMatch(/class="learn"[^>]*>Skill B|Skill B[^<]*<\/li>/);
    // Stronger: look for "learn" class near "Skill B"
    const skillBSection = html.slice(html.indexOf("Skill B") - 200, html.indexOf("Skill B") + 50);
    expect(skillBSection).toContain('class="learn"');
  });

  it("escapes HTML characters in user content", () => {
    const evil: SkillsSheetData = {
      ...fixture,
      identity: { ...fixture.identity, name: "<script>alert('x')</script>" },
    };
    const html = renderPage1(evil, "en");
    expect(html).not.toContain("<script>alert");
    expect(html).toContain("&lt;script&gt;");
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run:
```bash
cd C:/dev/dr-cv && npm test -- tests/templates.test.ts
```
Expected: FAIL with `Cannot find module '../generators/templates/skills-sheet-page-1.js'`.

- [ ] **Step 3: Create the template**

Run first:
```bash
mkdir -p C:/dev/dr-cv/generators/templates
```

Create `C:/dev/dr-cv/generators/templates/skills-sheet-page-1.ts`:

```typescript
import type { SkillsSheetData, Skill, SkillAxis } from "../lib/types.js";

export type Lang = "en" | "es";

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function pickLang<T extends { en: string; es: string }>(t: T, lang: Lang): string {
  return escapeHtml(t[lang]);
}

function renderSkillItem(s: Skill): string {
  const cls = s.level === "learning" ? ' class="learn"' : "";
  return `<li${cls}>${escapeHtml(s.name)}</li>`;
}

function renderAxisGroup(group: { title: string; skills: Skill[] }): string {
  const mastered = group.skills.filter((s) => s.level === "mastered").length;
  const learning = group.skills.filter((s) => s.level === "learning").length;
  const count = `${mastered} mastered · ${learning} learning`;
  return `
    <div class="group">
      <div class="group__head">
        <span class="group__title">${escapeHtml(group.title)}</span>
        <span class="group__count">${escapeHtml(count)}</span>
      </div>
      <ul class="group__list">
        ${group.skills.map(renderSkillItem).join("\n")}
      </ul>
    </div>`;
}

function renderAxis(axis: SkillAxis): string {
  return `
    <div class="ss-col">
      <header class="ss-col-head">
        <span class="name">${escapeHtml(axis.name)}</span>
        <span class="axis">${escapeHtml(axis.axis)}</span>
      </header>
      ${axis.groups.map(renderAxisGroup).join("\n")}
    </div>`;
}

export function renderPage1(data: SkillsSheetData, lang: Lang): string {
  const { identity, positioning, skills } = data;
  const availability = escapeHtml(identity.availability);

  const proof = positioning.proofNumbers
    .map((p) => {
      const valueHtml = `${escapeHtml(p.value)}${p.unit ? `<span class="accent">${escapeHtml(p.unit)}</span>` : ""}`;
      const label = lang === "en" ? p.labelEn : p.labelEs;
      return `
        <div>
          <div class="n">${valueHtml}</div>
          <div class="l">${escapeHtml(label)}</div>
        </div>`;
    })
    .join("\n");

  const lead = lang === "en"
    ? `<span>${escapeHtml(positioning.thesis.en)}</span> <span class="faint">${escapeHtml(positioning.tagline.en)}</span>`
    : `<span>${escapeHtml(positioning.thesis.es)}</span> <span class="faint">${escapeHtml(positioning.tagline.es)}</span>`;

  return `
<article class="page">
  <div class="ss">

    <header class="ss-head">
      <div>
        <span class="eyebrow">skills sheet · v1.0 · 2026.05</span>
        <h1>${escapeHtml(identity.name.split(" ").slice(0, -1).join(" "))} <span class="accent">${escapeHtml(identity.name.split(" ").slice(-1)[0] ?? "")}</span>
          <span class="tag">${escapeHtml(identity.role)}</span>
        </h1>
      </div>
      <div class="meta">
        <div>${escapeHtml(identity.location)}</div>
        <div>${escapeHtml(identity.languages)}</div>
        <div>${availability}</div>
      </div>
    </header>

    <section class="ss-intro">
      <p class="lead">${lead}</p>
      <div class="proof">
        ${proof}
      </div>
    </section>

    <section class="ss-body">
      ${renderAxis(skills.byLayer)}
      ${renderAxis(skills.byOutcome)}
    </section>

    <footer class="ss-foot">
      <div class="left">
        <span class="legend">
          <span class="dot"></span><span>${lang === "en" ? "Mastered · defensible" : "Dominada · defendible"}</span>
          <span class="dot hollow"></span><span>${lang === "en" ? "Learning · honest" : "En curso · honesta"}</span>
        </span>
      </div>
      <div class="pills">
        ${identity.contact.github ? `<span class="k">${escapeHtml(identity.contact.github)}</span>` : ""}
        <span class="k">${escapeHtml(identity.contact.email)}</span>
      </div>
    </footer>

  </div>
</article>`;
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run:
```bash
cd C:/dev/dr-cv && npm test -- tests/templates.test.ts
```
Expected: all 7 tests PASS.

- [ ] **Step 5: Commit**

```bash
cd C:/dev/dr-cv && git add generators/templates/skills-sheet-page-1.ts tests/templates.test.ts && git commit -m "feat(phase-1): Page 1 template with HTML escaping + bilingual support"
```

---

## Task 7: Build the HTML template — Page 2

**Files:**
- Create: `C:/dev/dr-cv/generators/templates/skills-sheet-page-2.ts`
- Modify: `C:/dev/dr-cv/tests/templates.test.ts` (add tests for renderPage2)

- [ ] **Step 1: Add the failing tests for Page 2**

Append to `C:/dev/dr-cv/tests/templates.test.ts`, after the last `describe` block, the following:

```typescript
import { renderPage2 } from "../generators/templates/skills-sheet-page-2.js";

describe("renderPage2", () => {
  const fullFixture: SkillsSheetData = {
    ...fixture,
    experience: {
      current: [
        {
          company: "Booz Allen Hamilton",
          role: "Consultant",
          startYear: 2024,
          endYear: "present",
          highlight: true,
          badge: "Army · DoD",
          descriptionEn: "Current BAH work EN",
          descriptionEs: "Trabajo BAH ES",
          stack: ["/te-skin", "DS"],
        },
      ],
    },
    clients: [
      { name: "Merck & Co.", industryEn: "Healthcare", industryEs: "Salud" },
    ],
    testimonials: [
      {
        quote: "Verified quote EN",
        quoteEs: "Cita verificada ES",
        author: "Test Author",
        role: "Test Role",
        company: "Test Co",
        source: "verified",
      },
    ],
  };

  it("renders current work companies", () => {
    const html = renderPage2(fullFixture, "en");
    expect(html).toContain("Booz Allen Hamilton");
  });

  it("renders experience description in the chosen language", () => {
    const enHtml = renderPage2(fullFixture, "en");
    expect(enHtml).toContain("Current BAH work EN");
    const esHtml = renderPage2(fullFixture, "es");
    expect(esHtml).toContain("Trabajo BAH ES");
  });

  it("renders stack pills", () => {
    const html = renderPage2(fullFixture, "en");
    expect(html).toContain("/te-skin");
    expect(html).toContain("DS");
  });

  it("renders client chips with localized industry", () => {
    const enHtml = renderPage2(fullFixture, "en");
    expect(enHtml).toContain("Merck & Co.");
    expect(enHtml).toContain("Healthcare");
    const esHtml = renderPage2(fullFixture, "es");
    expect(esHtml).toContain("Salud");
  });

  it("renders testimonial quote and author", () => {
    const html = renderPage2(fullFixture, "en");
    expect(html).toContain("Verified quote EN");
    expect(html).toContain("Test Author");
  });

  it("applies 'verified' badge only to verified testimonials", () => {
    const html = renderPage2(fullFixture, "en");
    expect(html).toContain("verified");
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run:
```bash
cd C:/dev/dr-cv && npm test -- tests/templates.test.ts
```
Expected: the 6 new tests FAIL with `Cannot find module '../generators/templates/skills-sheet-page-2.js'`. The page-1 tests continue to pass.

- [ ] **Step 3: Create `skills-sheet-page-2.ts`**

Create `C:/dev/dr-cv/generators/templates/skills-sheet-page-2.ts`:

```typescript
import type { SkillsSheetData, ExperienceItem, Client, Testimonial } from "../lib/types.js";
import { escapeHtml, type Lang } from "./skills-sheet-page-1.js";

function renderCurrentWorkCard(item: ExperienceItem, lang: Lang): string {
  const desc = lang === "en" ? item.descriptionEn : item.descriptionEs;
  const timeframe = item.endYear === "present"
    ? `${item.startYear} — ${lang === "en" ? "now" : "hoy"}`
    : `${item.startYear} — ${item.endYear}`;
  const badgeHtml = item.badge
    ? `<span class="pill pill--accent">${escapeHtml(item.badge)}</span>`
    : `<span class="pill pill--outline">${escapeHtml(timeframe)}</span>`;
  return `
    <div class="card">
      <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:2mm;">
        <div class="eyebrow" style="color:var(--accent)">${escapeHtml(item.role)}</div>
        ${badgeHtml}
      </div>
      <h3 style="font-size:11pt; margin-bottom:3mm;">${escapeHtml(item.company)}</h3>
      <p style="font-size:8pt; line-height:1.45; color:var(--ink-body); margin:0 0 3mm 0;">${escapeHtml(desc)}</p>
      <div style="display:flex; flex-wrap:wrap; gap:4px;">
        ${item.stack.map((t) => `<span class="pill">${escapeHtml(t)}</span>`).join("\n")}
      </div>
    </div>`;
}

function renderClientChip(c: Client, lang: Lang): string {
  const industry = lang === "en" ? c.industryEn : c.industryEs;
  return `
    <div class="card" style="padding:10px 12px;">
      <div class="mono" style="font-size:9.5pt; font-weight:600; letter-spacing:-0.02em;">${escapeHtml(c.name)}</div>
      <div style="font-size:7pt; color:var(--ink-muted); margin-top:2px;">${escapeHtml(industry)}</div>
    </div>`;
}

function renderTestimonial(t: Testimonial, lang: Lang): string {
  const quote = lang === "es" && t.quoteEs ? t.quoteEs : t.quote;
  const company = t.company ? ` · ${escapeHtml(t.company)}` : "";
  const badgeLabel = lang === "en"
    ? (t.source === "verified" ? "verified" : "attributed")
    : (t.source === "verified" ? "verificado" : "atribuida");
  return `
    <div class="voice">
      <p class="q">&ldquo;${escapeHtml(quote)}&rdquo;</p>
      <div class="who">
        <span><b>${escapeHtml(t.author)}</b> · ${escapeHtml(t.role)}${company}</span>
        <span class="verified">${escapeHtml(badgeLabel)}</span>
      </div>
    </div>`;
}

export function renderPage2(data: SkillsSheetData, lang: Lang): string {
  const { experience, clients, testimonials } = data;
  const verifiedOnly = testimonials.filter((t) => t.source === "verified").slice(0, 2);

  const currentWork = experience.current
    .map((item) => renderCurrentWorkCard(item, lang))
    .join("\n");

  const clientChips = clients.map((c) => renderClientChip(c, lang)).join("\n");

  const voices = verifiedOnly.map((t) => renderTestimonial(t, lang)).join("\n");

  const ctaTitle = lang === "en" ? "The combination is the product." : "La combinación es el producto.";
  const ctaLabel = lang === "en" ? "let's talk" : "hablemos";
  const ctaButton = lang === "en" ? "Work together" : "Trabajemos juntos";

  return `
<article class="page">
  <div class="ss">

    <header class="ss-head">
      <div>
        <span class="eyebrow">skills sheet · cont · p.2 of 2</span>
        <h1 class="tighter">${lang === "en" ? "How I work" : "Cómo trabajo"}</h1>
      </div>
      <div class="meta">
        <div>${lang === "en" ? "generated from repo" : "generado desde repo"}</div>
        <div><b>/data/skills.yaml</b></div>
      </div>
    </header>

    <section style="margin-top:4mm;">
      <div class="sec-head">
        <span class="sec-head__num">01</span>
        <span class="sec-head__title">${lang === "en" ? "Current work" : "Trabajo actual"}</span>
        <span class="sec-head__rule"></span>
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:5mm; margin-top:4mm;">
        ${currentWork}
      </div>
    </section>

    <section style="margin-top:8mm;">
      <div class="sec-head">
        <span class="sec-head__num">02</span>
        <span class="sec-head__title">${lang === "en" ? "Past clients (selected)" : "Clientes pasados (seleccionados)"}</span>
        <span class="sec-head__rule"></span>
      </div>
      <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:3mm; margin-top:4mm;">
        ${clientChips}
      </div>
    </section>

    <section style="margin-top:8mm;">
      <div class="sec-head">
        <span class="sec-head__num">03</span>
        <span class="sec-head__title">${lang === "en" ? "Voices" : "Voces"}</span>
        <span class="sec-head__rule"></span>
      </div>
      <div class="voices">
        ${voices}
      </div>
    </section>

    <section style="margin-top:auto; padding-top:8mm; display:flex; justify-content:space-between; align-items:center;">
      <div>
        <div class="eyebrow">${escapeHtml(ctaLabel)}</div>
        <h2 style="font-size:16pt; margin-top:3px; letter-spacing:-0.04em;">${escapeHtml(ctaTitle)}</h2>
      </div>
      <a class="cta" href="mailto:${escapeHtml(data.identity.contact.email)}">
        <span>${escapeHtml(ctaButton)}</span>
        <span style="transform:translateY(-1px)">→</span>
      </a>
    </section>

    <footer class="ss-foot" style="margin-top:6mm;">
      <div class="left">
        <span>${lang === "en" ? "dr-cv · skills sheet · generated from single source of truth" : "dr-cv · skills sheet · generado desde fuente única"}</span>
      </div>
      <div class="pills">
        <span class="k">Page 2 / 2</span>
      </div>
    </footer>
  </div>
</article>`;
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run:
```bash
cd C:/dev/dr-cv && npm test -- tests/templates.test.ts
```
Expected: all tests PASS (originals + 6 new ones).

- [ ] **Step 5: Commit**

```bash
cd C:/dev/dr-cv && git add generators/templates/skills-sheet-page-2.ts tests/templates.test.ts && git commit -m "feat(phase-1): Page 2 template with current work, clients, voices, CTA"
```

---

## Task 8: Build the full-page HTML wrapper template

**Files:**
- Create: `C:/dev/dr-cv/generators/templates/skills-sheet.ts`
- Modify: `C:/dev/dr-cv/tests/templates.test.ts` (add integration test)

- [ ] **Step 1: Add the integration test**

Append to `C:/dev/dr-cv/tests/templates.test.ts` at the end of the file:

```typescript
import { renderSkillsSheet } from "../generators/templates/skills-sheet.js";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const tokensPath = path.join(here, "..", "design-system", "tokens.css");
const tokensCss = readFileSync(tokensPath, "utf8");

describe("renderSkillsSheet full page", () => {
  it("returns a full HTML document with doctype, head and body", () => {
    const fullFixture: SkillsSheetData = {
      ...fixture,
      experience: { current: [] },
      clients: [],
      testimonials: [],
    };
    const html = renderSkillsSheet(fullFixture, "en", tokensCss);
    expect(html).toMatch(/^<!doctype html>/i);
    expect(html).toContain("<html");
    expect(html).toContain("</html>");
    expect(html).toContain('<style>');
  });

  it("inlines the design tokens CSS", () => {
    const html = renderSkillsSheet(fixture, "en", tokensCss);
    expect(html).toContain("--accent");
    expect(html).toContain(tokensCss.slice(0, 80));
  });

  it("contains both page articles", () => {
    const html = renderSkillsSheet(fixture, "en", tokensCss);
    const pageCount = (html.match(/<article class="page">/g) ?? []).length;
    expect(pageCount).toBe(2);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run:
```bash
cd C:/dev/dr-cv && npm test -- tests/templates.test.ts
```
Expected: 3 new tests FAIL with `Cannot find module '../generators/templates/skills-sheet.js'`.

- [ ] **Step 3: Create the wrapper template**

Create `C:/dev/dr-cv/generators/templates/skills-sheet.ts`:

```typescript
import type { SkillsSheetData } from "../lib/types.js";
import { renderPage1, type Lang } from "./skills-sheet-page-1.js";
import { renderPage2 } from "./skills-sheet-page-2.js";

const EMBEDDED_STYLES = `
/* ============== skills-sheet specific (scoped overrides of tokens) ============== */
.ss {
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  gap: 10mm;
  height: calc(297mm - 28mm);
}
.ss-head {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: flex-end;
  gap: 10mm;
  padding-bottom: 6mm;
  border-bottom: 2px solid var(--ink);
}
.ss-head h1 { font-size: 30pt; letter-spacing: -0.05em; line-height: 1; margin: 0; }
.ss-head h1 .accent { color: var(--accent); }
.ss-head h1 .tag {
  display: block; margin-top: 5px;
  font-family: var(--font-mono);
  font-size: 8pt; color: var(--ink-muted);
  letter-spacing: var(--tr-uppercase); text-transform: uppercase;
}
.ss-head .meta {
  text-align: right;
  font-family: var(--font-mono);
  font-size: 7pt; color: var(--ink-muted);
  letter-spacing: var(--tr-uppercase); text-transform: uppercase;
  line-height: 1.7;
}
.ss-head .meta b { color: var(--ink); font-weight: 500; }

.ss-intro {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 8mm;
  align-items: start;
}
.ss-intro .lead {
  font-family: var(--font-display);
  font-size: 13pt; line-height: 1.3;
  letter-spacing: -0.03em; color: var(--ink);
}
.ss-intro .lead .faint { color: var(--ink-muted); }
.ss-intro .proof {
  display: grid; grid-template-columns: 1fr 1fr; gap: 1px;
  background: var(--line); border: 1px solid var(--line);
}
.ss-intro .proof div { background: var(--bg-card); padding: 8px 10px; }
.ss-intro .proof .n {
  font-family: var(--font-display); font-size: 16pt; font-weight: 600;
  letter-spacing: -0.04em; line-height: 1; color: var(--ink);
}
.ss-intro .proof .n .accent { color: var(--accent); }
.ss-intro .proof .l {
  margin-top: 3px; font-family: var(--font-mono);
  font-size: 6.5pt; color: var(--ink-muted);
  letter-spacing: var(--tr-uppercase); text-transform: uppercase;
}

.ss-body { display: grid; grid-template-columns: 1fr 1fr; gap: 6mm; }
.ss-col { display: flex; flex-direction: column; gap: 4mm; }
.ss-col-head {
  display: flex; align-items: baseline; justify-content: space-between;
  padding-bottom: 3mm; border-bottom: 1px solid var(--ink);
}
.ss-col-head .name {
  font-family: var(--font-display); font-size: 11pt; font-weight: 600;
  letter-spacing: -0.03em;
}
.ss-col-head .axis {
  font-family: var(--font-mono); font-size: 6.5pt; color: var(--ink-muted);
  text-transform: uppercase; letter-spacing: var(--tr-uppercase);
}

.group { page-break-inside: avoid; }
.group__head {
  display: flex; align-items: baseline; justify-content: space-between;
  margin-bottom: 3px;
}
.group__title {
  font-family: var(--font-display); font-size: 8.5pt;
  letter-spacing: var(--tr-wide); text-transform: uppercase;
  font-weight: 600; color: var(--ink);
}
.group__count {
  font-family: var(--font-mono); font-size: 6.5pt; color: var(--ink-subtle);
}
.group__list {
  list-style: none; margin: 0; padding: 0;
  display: flex; flex-wrap: wrap; gap: 4px;
}
.group__list li {
  font-family: var(--font-body); font-size: 7.8pt; line-height: 1.3;
  color: var(--ink-body); display: inline-flex; align-items: center; gap: 4px;
  padding: 2px 7px; border-radius: var(--r-pill);
  border: 1px solid var(--line); background: var(--bg-card);
  letter-spacing: -0.005em;
}
.group__list li::before {
  content: ""; width: 5px; height: 5px; border-radius: 50%;
  background: var(--accent); flex: 0 0 auto;
}
.group__list li.learn::before {
  background: transparent; border: 1px solid var(--accent-deep);
}

.ss-foot {
  display: grid; grid-template-columns: 1fr auto;
  gap: 10mm; align-items: center;
  padding-top: 5mm; border-top: 1px solid var(--line);
  font-family: var(--font-mono); font-size: 7pt; color: var(--ink-muted);
  letter-spacing: var(--tr-uppercase); text-transform: uppercase;
}
.ss-foot .pills { display: inline-flex; gap: 6px; align-items: center; }
.ss-foot .pills .k {
  padding: 2px 7px; border-radius: var(--r-pill);
  border: 1px solid var(--line); background: var(--bg-card); color: var(--ink);
}
.legend {
  display: inline-flex; gap: 10px;
  font-family: var(--font-mono); font-size: 6.5pt;
  color: var(--ink-muted); text-transform: uppercase;
  letter-spacing: var(--tr-uppercase); align-items: center;
}
.legend .dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--accent); display: inline-block; margin-right: 4px;
}
.legend .dot.hollow { background: transparent; border: 1px solid var(--accent-deep); }

.voices { display: grid; grid-template-columns: 1fr 1fr; gap: 5mm; margin-top: 4mm; }
.voice {
  padding: 5mm 6mm 5mm 5mm;
  border-left: 2px solid var(--accent);
  background: var(--bg-card);
  border-radius: 0 var(--r-md) var(--r-md) 0;
}
.voice .q {
  font-family: var(--font-display); font-size: 8.5pt; line-height: 1.5;
  letter-spacing: -0.015em; color: var(--ink);
  font-style: italic; margin: 0 0 3mm 0;
}
.voice .who {
  display: flex; justify-content: space-between; align-items: baseline; gap: 4mm;
  font-family: var(--font-mono); font-size: 6.5pt;
  letter-spacing: var(--tr-wide); text-transform: uppercase; color: var(--ink-muted);
}
.voice .who b {
  color: var(--ink); font-weight: 600; letter-spacing: -0.01em; text-transform: none;
  font-family: var(--font-display); font-size: 7.8pt;
}
.voice .verified {
  font-family: var(--font-mono); font-size: 5.8pt;
  letter-spacing: var(--tr-uppercase); text-transform: uppercase;
  color: var(--accent);
  padding: 1px 6px; border: 1px solid var(--accent); border-radius: var(--r-pill);
  flex-shrink: 0;
}
`;

export function renderSkillsSheet(
  data: SkillsSheetData,
  lang: Lang,
  tokensCss: string,
): string {
  const title = lang === "en"
    ? `${data.identity.name} · Skills Sheet`
    : `${data.identity.name} · Hoja de habilidades`;

  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<title>${title}</title>
<style>
${tokensCss}
${EMBEDDED_STYLES}
</style>
</head>
<body>
${renderPage1(data, lang)}
${renderPage2(data, lang)}
</body>
</html>`;
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run:
```bash
cd C:/dev/dr-cv && npm test -- tests/templates.test.ts
```
Expected: all tests PASS (including the 3 new integration tests).

- [ ] **Step 5: Commit**

```bash
cd C:/dev/dr-cv && git add generators/templates/skills-sheet.ts tests/templates.test.ts && git commit -m "feat(phase-1): full-page wrapper that assembles pages + inlines tokens CSS"
```

---

## Task 9: Build the PDF renderer (puppeteer wrapper)

**Files:**
- Create: `C:/dev/dr-cv/generators/lib/render-pdf.ts`

No dedicated test for this file — we will validate it end-to-end in Task 10.

- [ ] **Step 1: Create the renderer**

Create `C:/dev/dr-cv/generators/lib/render-pdf.ts`:

```typescript
import { writeFile } from "node:fs/promises";
import puppeteer from "puppeteer";

export interface RenderPdfOptions {
  html: string;
  outputPath: string;
}

/**
 * Render an HTML string to a PDF file using headless Chromium.
 * Uses A4 format with zero margins because the HTML already has A4 padding.
 */
export async function renderPdf(opts: RenderPdfOptions): Promise<void> {
  const browser = await puppeteer.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.setContent(opts.html, { waitUntil: "networkidle0" });
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
      preferCSSPageSize: true,
    });
    await writeFile(opts.outputPath, pdfBuffer);
  } finally {
    await browser.close();
  }
}
```

- [ ] **Step 2: Typecheck**

Run:
```bash
cd C:/dev/dr-cv && npm run typecheck
```
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
cd C:/dev/dr-cv && git add generators/lib/render-pdf.ts && git commit -m "feat(phase-1): puppeteer PDF renderer"
```

---

## Task 10: Build the main orchestrator (`skills-sheet.ts`)

**Files:**
- Create: `C:/dev/dr-cv/generators/skills-sheet.ts`

- [ ] **Step 1: Create the orchestrator**

Create `C:/dev/dr-cv/generators/skills-sheet.ts`:

```typescript
import { readFileSync, mkdirSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadAllData } from "./lib/load-data.js";
import { renderSkillsSheet } from "./templates/skills-sheet.js";
import { renderPdf } from "./lib/render-pdf.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");
const dataDir = path.join(projectRoot, "data");
const tokensPath = path.join(projectRoot, "design-system", "tokens.css");
const distDir = path.join(projectRoot, "dist");

async function main() {
  console.log("[skills-sheet] loading data from /data/ …");
  const data = loadAllData(dataDir);
  console.log(`[skills-sheet] loaded ${data.skills.byLayer.groups.length} layer groups, ${data.skills.byOutcome.groups.length} outcome groups`);

  const tokensCss = readFileSync(tokensPath, "utf8");
  console.log(`[skills-sheet] loaded tokens.css (${tokensCss.length} bytes)`);

  mkdirSync(distDir, { recursive: true });

  // render EN first (primary)
  const htmlEn = renderSkillsSheet(data, "en", tokensCss);
  const htmlEnPath = path.join(distDir, "skills-sheet-en.html");
  await writeFile(htmlEnPath, htmlEn);
  console.log(`[skills-sheet] wrote ${htmlEnPath} (${htmlEn.length} bytes)`);

  const pdfEnPath = path.join(distDir, "skills-sheet-en.pdf");
  await renderPdf({ html: htmlEn, outputPath: pdfEnPath });
  console.log(`[skills-sheet] wrote ${pdfEnPath}`);

  // render ES
  const htmlEs = renderSkillsSheet(data, "es", tokensCss);
  const htmlEsPath = path.join(distDir, "skills-sheet-es.html");
  await writeFile(htmlEsPath, htmlEs);
  console.log(`[skills-sheet] wrote ${htmlEsPath} (${htmlEs.length} bytes)`);

  const pdfEsPath = path.join(distDir, "skills-sheet-es.pdf");
  await renderPdf({ html: htmlEs, outputPath: pdfEsPath });
  console.log(`[skills-sheet] wrote ${pdfEsPath}`);

  console.log("[skills-sheet] done.");
}

main().catch((err) => {
  console.error("[skills-sheet] FAILED:", err);
  process.exit(1);
});
```

- [ ] **Step 2: Run the generator end-to-end**

Run:
```bash
cd C:/dev/dr-cv && npm run build:skills-sheet
```
Expected:
- Logs: `loading data`, `loaded tokens.css`, `wrote dist/skills-sheet-en.html`, `wrote dist/skills-sheet-en.pdf`, same for ES, `done.`
- Exits 0 in under 30 seconds.
- Files appear in `dist/`:
  - `skills-sheet-en.html`
  - `skills-sheet-en.pdf`
  - `skills-sheet-es.html`
  - `skills-sheet-es.pdf`

- [ ] **Step 3: Verify the files exist**

Run:
```bash
ls -la C:/dev/dr-cv/dist/
```
Expected: 4 files with non-zero sizes.

- [ ] **Step 4: Open the HTML in a browser to inspect**

Run:
```bash
start C:/dev/dr-cv/dist/skills-sheet-en.html
```
(On non-Windows: `open` on macOS, `xdg-open` on Linux.)

Expected: the skills sheet renders with two A4 pages, design tokens applied (warm orange accent, JetBrains Mono display), and all content visible.

- [ ] **Step 5: Open the PDF to verify print output**

Run:
```bash
start C:/dev/dr-cv/dist/skills-sheet-en.pdf
```

Expected: 2-page PDF at A4 size, content fits, no overflow. If there's overflow, note the issue and fix in Task 11.

- [ ] **Step 6: Commit**

```bash
cd C:/dev/dr-cv && git add generators/skills-sheet.ts && git commit -m "feat(phase-1): main orchestrator generates EN + ES skills sheet (HTML + PDF)"
```

---

## Task 11: Verify success criteria end-to-end

**Files:**
- Modify: `C:/dev/dr-cv/package.json` (only if needed for script adjustment)

No new code here — this task is validation only. Do not skip it.

- [ ] **Step 1: Verify success criterion 1 — YAML structure is complete**

Run:
```bash
cd C:/dev/dr-cv && node -e "const {loadAllData}=await import('./generators/lib/load-data.ts'); const d=loadAllData('./data'); console.log('Layer groups:',d.skills.byLayer.groups.length); console.log('Outcome groups:',d.skills.byOutcome.groups.length); console.log('Layer skills total:',d.skills.byLayer.groups.reduce((a,g)=>a+g.skills.length,0)); console.log('Clients:',d.clients.length); console.log('Testimonials:',d.testimonials.length);"
```
Note: on Windows with pure Node, use `tsx` instead:
```bash
cd C:/dev/dr-cv && npx tsx -e "import {loadAllData} from './generators/lib/load-data.ts'; const d=loadAllData('./data'); console.log('Layer groups:',d.skills.byLayer.groups.length); console.log('Outcome groups:',d.skills.byOutcome.groups.length);"
```

Expected: Layer groups: 4 (Strategy, Design, Engineering, Agents). Outcome groups: 4 (Discovery, Build, Ship, Scale). Clients: 8. Testimonials: 2.

- [ ] **Step 2: Verify success criterion 2 — one-command build**

Run:
```bash
cd C:/dev/dr-cv && rm -rf dist && npm run build:skills-sheet
```
Expected: `dist/` is created fresh, all 4 output files regenerate, no errors.

- [ ] **Step 3: Verify success criterion 3 — PDF is exactly 2 pages**

Open `dist/skills-sheet-en.pdf` in a PDF reader.
Expected: page counter reads "2 pages". Manually confirm page 1 has hero + skills visuals and page 2 has current work + clients + voices + CTA.

- [ ] **Step 4: Verify success criterion 4 — data changes propagate**

Edit `C:/dev/dr-cv/data/skills.yaml` and temporarily add a new skill to the Agents group:

```yaml
    - title: Agents
      skills:
        # ... existing ...
        - { name: "TEMPORARY TEST SKILL", level: learning }
```

Run:
```bash
cd C:/dev/dr-cv && npm run build:skills-sheet
```

Open `dist/skills-sheet-en.html` in a browser and search for "TEMPORARY TEST SKILL".
Expected: it appears, with the hollow dot indicator (learning style).

Now revert the change:
```bash
cd C:/dev/dr-cv && git checkout data/skills.yaml
```

- [ ] **Step 5: Verify success criterion 5 — mastered vs learning distinction**

Inspect `dist/skills-sheet-en.html` source (view-source or editor):
Expected: skills marked `level: learning` in YAML render as `<li class="learn">…` in HTML. Mastered skills render as plain `<li>…`.

- [ ] **Step 6: Run the whole test suite**

Run:
```bash
cd C:/dev/dr-cv && npm test
```
Expected: all tests pass (types, load-data, templates).

- [ ] **Step 7: Final commit (if anything changed during verification)**

```bash
cd C:/dev/dr-cv && git status
```
If clean, skip. If anything changed legitimately during verification, commit it.

---

## Self-Review

Ran against spec sections:

- **Problem / Goal / Non-goals** — Phase 1 plan focuses on skills sheet only; other phases are deferred to future plans. Matches spec.
- **Architecture (SSoT + agents + generators)** — `data/*.yaml` + `generators/lib/*` + `generators/templates/*` + `generators/skills-sheet.ts` = the architecture. Implemented.
- **Success criteria (1–5)** — Task 11 verifies each one explicitly.
- **Positioning rules** — Tone and copy live in YAML so they can evolve without touching code. EN-first + ES toggle is honored (separate HTML+PDF per language).
- **Scrub list** — No BAH internal URLs / emails appear anywhere in data files. Clean.

**Placeholders scan:** no "TBD", "TODO", "figure out" anywhere. Every step has executable code or commands.

**Type consistency:** `Skill`, `SkillGroup`, `SkillAxis`, `Skills`, `SkillsSheetData` used consistently from Task 2 through Task 10. `renderPage1` / `renderPage2` / `renderSkillsSheet` all take `(data, lang[, tokensCss])` with consistent signatures.

**Gaps found during review:** none significant. One minor:
- Task 7 builds pages 2 but the spec allowed for eventual 1-page version. Plan assumes 2 pages. Noted; not a blocker.

Plan is ready for execution.

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-05-07-phase1-skills-sheet.md`. Two execution options:

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration.

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints.

**Which approach?**
