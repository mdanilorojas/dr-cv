# v11 Horizon Timeline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the Horizon Timeline section in v11 landing â€” a three-column "Earned / Investing / Next horizon" block placed below the hero+proof strip, reframing the page from "what I am" to "where I'm investing my hours".

**Architecture:** Data-driven from new `perfil/data/horizon.yaml`. One new render function `renderHorizon()` in `v11-landing/index.ts`, one CSS block appended to `v11-styles.ts`, two type additions, a loader function, and `id` attributes added to 3 existing case `<article>` elements so chips can link to them. No new tokens, fonts, or runtime JS. Pure static HTML + CSS.

**Tech Stack:** TypeScript 5.3, Node â‰¥20, `js-yaml` 4.x, Vitest 1.2 for tests, `tsx` for running generadores. No frontend framework; runtime is vanilla.

**Spec:** `docs/superpowers/specs/2026-05-10-v11-horizon-timeline-design.md` (companion HTML: `.html` sibling)

---

## File map

| File | Action | Responsibility |
|---|---|---|
| `generadores/lib/types.ts` | Modify | Add `HorizonColumn`, `HorizonChip`, `HorizonSection` types. Extend `LandingData` with `horizon: HorizonSection`. |
| `generadores/lib/load-data.ts` | Modify | Add `validateHorizon()` + `loadHorizon()` functions. Wire into `loadLandingData()`. |
| `perfil/data/horizon.yaml` | Create | Bilingual source of truth for the section. |
| `generadores/templates/v11-landing/index.ts` | Modify | Add `renderHorizon(data, lang)` function. Inject call between `renderProof()` and `renderNotebook()`. Add `id="case-<slug>"` attribute to `renderCase()`'s `<article>`. |
| `generadores/templates/v11-landing/v11-styles.ts` | Modify | Append `.v11-horizon*` CSS block. |
| `tests/v11-horizon.test.ts` | Create | 7 tests per spec Â§8. |

## Spec-to-code mapping

Chip targets as they will actually appear in the rendered HTML:

| Chip (EN) | `href` | Target in HTML |
|---|---|---|
| Agent orchestration | `#case-enregla` | `<article id="case-enregla">` added to renderCase |
| MCP servers | `#case-enregla` | same article (MCP is a beat inside the EnRegla case) |
| Design-system-as-skill | `#case-te-skin` | `<article id="case-te-skin">` added |
| Recursive critic loops | `#case-te-black` | `<article id="case-te-black">` added |
| Taste as rubric | `#method` | already exists on the method section (no change needed) |
| Team-scale agent tooling | `https://github.com/mdanilorojas/dr-cv` | external |
| Audited agent workflows | `https://github.com/mdanilorojas/dr-cv` | external (same repo, separate framing) |
| Eval-driven UI | *(no href)* | `bet` chip â€” dashed border + badge |

Note: the spec's Â§7.3.1 mentioned a `#case-enregla-mcp` anchor and a `#skills-audit` anchor. Neither is needed in the implementation â€” both collapse into existing targets (the EnRegla case article and the github repo respectively). Deviation is intentional and keeps the "files untouched" rule tighter.

---

## Conventions you must follow

- **Class naming:** `v11-horizon*` (BEM-like, matching existing `v11-*` prefix in `v11-styles.ts`).
- **Escaping:** every user-visible string passes through `escapeHtml()` (imported from `../skills-sheet-page-1.js` â€” already in scope in `v11-landing/index.ts`).
- **Bilingual strings:** the data shape for text fields is `{ en: string; es: string }`. Never use `labelEn`/`labelEs` style here â€” follow the `horizon.yaml` schema exactly.
- **Tokens only:** use existing CSS custom properties from `design-system/tokens-web.css`. Do NOT introduce new tokens.
- **Commit style:** follow recent v11 commit style â€” `feat(v11): <subject>` or `test(v11): <subject>`. Co-author line is required:
  ```
  Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
  ```
- **Absolute paths:** all file paths in this plan are relative to repo root `C:\dev\dr-cv\`.

---

## Task 1: Add Horizon types

**Files:**
- Modify: `generadores/lib/types.ts` (append near the end, just before `LandingData`)

- [ ] **Step 1: Add types**

Append these interfaces **before** the `LandingData` interface (which is the last type in the file, at line 175):

```typescript
// ============= HORIZON =============
export interface HorizonChip {
  label: { en: string; es: string };
  href?: string;           // if present â†’ <a>; if absent â†’ <span>
  kind?: "evidence" | "bet"; // used by the `horizon` column
}

export interface HorizonColumn {
  id: string;              // stable id: "earned" | "investing" | "horizon"
  stage: { en: string; es: string };
  heading: { en: string; es: string };
  body: { en: string; es: string };
  emphasis?: boolean;      // true for the "investing" column
  chips: HorizonChip[];
}

export interface HorizonSection {
  eyebrow: { en: string; es: string };
  sectionTitle: { en: string; es: string };
  columns: HorizonColumn[];
}
```

Then modify the `LandingData` interface (currently at line 175) to include `horizon`:

```typescript
export interface LandingData extends CvData {
  landing: Landing;
  horizon: HorizonSection;
}
```

- [ ] **Step 2: Typecheck**

Run: `npm run typecheck`
Expected: fails with errors in `load-data.ts` and `v11-landing/index.ts` because `horizon` is now required but not produced. That's fine â€” we fix in later tasks.

- [ ] **Step 3: Commit**

```bash
git add generadores/lib/types.ts
git commit -m "feat(v11): add HorizonSection types

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Task 2: Create horizon.yaml data file

**Files:**
- Create: `perfil/data/horizon.yaml`

- [ ] **Step 1: Write the full data file**

Create `perfil/data/horizon.yaml` with this exact content:

```yaml
eyebrow:
  en: "Direction Â· 2026"
  es: "DirecciÃ³n Â· 2026"

sectionTitle:
  en: "Where my hours are going"
  es: "A dÃ³nde van mis horas"

columns:
  - id: earned
    stage:
      en: "Earned Â· 2010â€“2023"
      es: "Ganado Â· 2010â€“2023"
    heading:
      en: "The craft I mastered, now commoditized"
      es: "El craft que dominÃ©, ahora commoditizado"
    body:
      en: "15 years shipping enterprise product. I keep the judgment â€” the hours that built it no longer compound."
      es: "15 aÃ±os shippeando producto enterprise. Me quedo con el juicio â€” las horas que lo construyeron ya no componen."
    chips:
      - label: { en: "Figma mastery",         es: "Dominio de Figma" }
      - label: { en: "Hand-coded UI",         es: "UI a mano" }
      - label: { en: "Design reviews",        es: "Design reviews" }
      - label: { en: "Component libraries",   es: "LibrerÃ­as de componentes" }
      - label: { en: "Style-guide PDFs",      es: "PDFs de guÃ­a de estilo" }

  - id: investing
    emphasis: true
    stage:
      en: "Investing Â· 2024â€“Now"
      es: "Invirtiendo Â· 2024â€“Hoy"
    heading:
      en: "Where my hours go today"
      es: "A dÃ³nde van mis horas hoy"
    body:
      en: "The frontline moved. I moved with it. Craft is now judgment + orchestration: I ship what used to take a team, and I ship the tools that make it possible."
      es: "La frontera se moviÃ³. Me movÃ­ con ella. El craft ahora es juicio + orquestaciÃ³n: entrego lo que antes tomaba un equipo, y entrego las herramientas que lo hacen posible."
    chips:
      - label: { en: "Agent orchestration",     es: "OrquestaciÃ³n de agentes" }
        href: "#case-enregla"
      - label: { en: "MCP servers",             es: "MCP servers" }
        href: "#case-enregla"
      - label: { en: "Design-system-as-skill",  es: "Design-system-as-skill" }
        href: "#case-te-skin"
      - label: { en: "Recursive critic loops",  es: "Loops de crÃ­tico recursivos" }
        href: "#case-te-black"
      - label: { en: "Taste as rubric",         es: "Taste como rÃºbrica" }
        href: "#method"

  - id: horizon
    stage:
      en: "Next horizon Â· 12 mo"
      es: "PrÃ³ximo horizonte Â· 12 meses"
    heading:
      en: "What I'm walking toward"
      es: "Hacia dÃ³nde camino"
    body:
      en: "Embedded in a serious product team, owning the seam between design judgment and agentic execution â€” at a scale where one person's leverage becomes a team's."
      es: "Embebido en un equipo de producto serio, dueÃ±o de la costura entre juicio de diseÃ±o y ejecuciÃ³n agÃ©ntica â€” a una escala donde el leverage de una persona se convierte en el del equipo."
    chips:
      - label: { en: "Team-scale agent tooling", es: "Tooling a escala de equipo" }
        href: "https://github.com/mdanilorojas/dr-cv"
        kind: evidence
      - label: { en: "Audited agent workflows",  es: "Workflows de agentes auditados" }
        href: "https://github.com/mdanilorojas/dr-cv"
        kind: evidence
      - label: { en: "Eval-driven UI",           es: "UI dirigida por evals" }
        kind: bet
```

- [ ] **Step 2: Verify yaml parses**

Run: `node -e "const y=require('js-yaml'); const fs=require('fs'); console.log(JSON.stringify(y.load(fs.readFileSync('perfil/data/horizon.yaml','utf8')),null,2).slice(0,400))"`
Expected: prints the first ~400 chars of the parsed structure with `eyebrow`, `sectionTitle`, `columns` visible.

- [ ] **Step 3: Commit**

```bash
git add perfil/data/horizon.yaml
git commit -m "feat(v11): add horizon.yaml â€” narrative reframe data

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Task 3: Add horizon loader + validator

**Files:**
- Modify: `generadores/lib/load-data.ts`

- [ ] **Step 1: Extend the type import**

At the top of `generadores/lib/load-data.ts`, find the existing `import type` block (lines 4-21). Replace it with this extended version that adds `HorizonSection`, `HorizonColumn`, `HorizonChip`:

```typescript
import type {
  Identity,
  Positioning,
  Skills,
  Experience,
  Clients,
  Testimonials,
  SkillsSheetData,
  Case,
  Education,
  AttributedTestimonial,
  CvData,
  Landing,
  LandingTab,
  LandingTabId,
  LandingVisualKind,
  LandingData,
  HorizonSection,
  HorizonColumn,
  HorizonChip,
} from "./types.js";
```

- [ ] **Step 2: Add validator and loader functions**

At the end of `generadores/lib/load-data.ts` (after the existing `loadLandingData` function at line 423), append:

```typescript
// ============= HORIZON VALIDATION =============
function validateBilingual(raw: unknown, ctx: string): { en: string; es: string } {
  const o = requireObject(raw, ctx);
  return {
    en: requireString(o.en, `${ctx}.en`),
    es: requireString(o.es, `${ctx}.es`),
  };
}

function validateHorizon(raw: unknown): HorizonSection {
  const o = requireObject(raw, "horizon");
  const eyebrow = validateBilingual(o.eyebrow, "horizon.eyebrow");
  const sectionTitle = validateBilingual(o.sectionTitle, "horizon.sectionTitle");
  const columns = requireArray(o.columns, "horizon.columns", (col, i): HorizonColumn => {
    const co = requireObject(col, `horizon.columns[${i}]`);
    const id = requireString(co.id, `horizon.columns[${i}].id`);
    const chips = requireArray(co.chips, `horizon.columns[${i}].chips`, (chip, ci): HorizonChip => {
      const ch = requireObject(chip, `horizon.columns[${i}].chips[${ci}]`);
      const label = validateBilingual(ch.label, `horizon.columns[${i}].chips[${ci}].label`);
      const href = typeof ch.href === "string" ? ch.href : undefined;
      let kind: "evidence" | "bet" | undefined;
      if (ch.kind === undefined) {
        kind = undefined;
      } else if (ch.kind === "evidence" || ch.kind === "bet") {
        kind = ch.kind;
      } else {
        throw new Error(
          `horizon.columns[${i}].chips[${ci}].kind must be 'evidence' or 'bet', got '${String(ch.kind)}'`,
        );
      }
      return { label, href, kind };
    });
    return {
      id,
      stage: validateBilingual(co.stage, `horizon.columns[${i}].stage`),
      heading: validateBilingual(co.heading, `horizon.columns[${i}].heading`),
      body: validateBilingual(co.body, `horizon.columns[${i}].body`),
      emphasis: typeof co.emphasis === "boolean" ? co.emphasis : undefined,
      chips,
    };
  });
  return { eyebrow, sectionTitle, columns };
}

export function loadHorizon(filePath: string): HorizonSection {
  return loadYaml(filePath, validateHorizon);
}
```

- [ ] **Step 3: Wire into `loadLandingData`**

Modify the existing `loadLandingData` function (currently ends at line 427) to also load horizon. Replace:

```typescript
export function loadLandingData(dataDir: string): LandingData {
  const cv = loadCvData(dataDir);
  const landing = loadLanding(path.join(dataDir, "landing.yaml"));
  return { ...cv, landing };
}
```

with:

```typescript
export function loadLandingData(dataDir: string): LandingData {
  const cv = loadCvData(dataDir);
  const landing = loadLanding(path.join(dataDir, "landing.yaml"));
  const horizon = loadHorizon(path.join(dataDir, "horizon.yaml"));
  return { ...cv, landing, horizon };
}
```

- [ ] **Step 4: Verify build loads the data**

Run: `npm run build:landing-v11`
Expected: succeeds through data loading (prints `[v11-landing] loaded N cases` and tokens message), then **may fail** later because `renderV11Landing` doesn't render `horizon` yet â€” that's fine. What matters: no `DataLoadError` from `horizon.yaml`.

- [ ] **Step 5: Commit**

```bash
git add generadores/lib/load-data.ts
git commit -m "feat(v11): horizon loader + validator

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Task 4: Add id attributes to case articles

Chips need stable anchors. Add `id="case-<slug>"` to each case's `<article>` element.

**Files:**
- Modify: `generadores/templates/v11-landing/index.ts` (function `renderCase`, around line 462)

- [ ] **Step 1: Locate the article opening tag**

Open `generadores/templates/v11-landing/index.ts` and find line 462:

```typescript
  return `<article class="v11-case" data-reveal>
```

- [ ] **Step 2: Add the id attribute**

Replace that single line with:

```typescript
  return `<article id="case-${escapeHtml(c.slug)}" class="v11-case" data-reveal>
```

*(The slug is already a URL-safe identifier in the YAML front matter â€” lowercase letters, hyphens. `escapeHtml` is defensive against future weird slugs and is a no-op on safe input.)*

- [ ] **Step 3: Verify the anchors appear**

Run: `npm run build:landing-v11` (may still fail if horizon render missing â€” check the *current* state of case anchors only).

Then inspect the output:

Run: `grep 'id="case-' dist/landing-v11/index.html`
Expected: 4 lines, one per case slug (enregla, te-skin, te-black, life-update-mobile).

- [ ] **Step 4: Commit**

```bash
git add generadores/templates/v11-landing/index.ts
git commit -m "feat(v11): stable case anchors for horizon chip links

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Task 5: Write failing tests for renderHorizon

**Files:**
- Create: `tests/v11-horizon.test.ts`

- [ ] **Step 1: Write the test file**

Create `tests/v11-horizon.test.ts` with this exact content:

```typescript
import { describe, it, expect, beforeAll } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import { loadLandingData } from "../generadores/lib/load-data.js";
import { renderV11Landing } from "../generadores/templates/v11-landing/index.js";

const PROJECT_ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(PROJECT_ROOT, "perfil", "data");
const TOKENS_PATH = path.join(PROJECT_ROOT, "design-system", "tokens-web.css");

let htmlEn: string;
let htmlEs: string;

beforeAll(() => {
  const data = loadLandingData(DATA_DIR);
  const tokensCss = readFileSync(TOKENS_PATH, "utf8");
  htmlEn = renderV11Landing(data, "en", tokensCss);
  htmlEs = renderV11Landing(data, "es", tokensCss);
});

describe("v11 horizon timeline â€” placement", () => {
  it("renders after hero and before notebook in EN", () => {
    const heroIdx = htmlEn.indexOf('id="top"');
    const horizonIdx = htmlEn.indexOf('class="v11-horizon"');
    const notebookIdx = htmlEn.indexOf('id="notebook"');
    expect(heroIdx).toBeGreaterThan(-1);
    expect(horizonIdx).toBeGreaterThan(heroIdx);
    expect(notebookIdx).toBeGreaterThan(horizonIdx);
  });

  it("renders after hero and before notebook in ES", () => {
    const heroIdx = htmlEs.indexOf('id="top"');
    const horizonIdx = htmlEs.indexOf('class="v11-horizon"');
    const notebookIdx = htmlEs.indexOf('id="notebook"');
    expect(heroIdx).toBeGreaterThan(-1);
    expect(horizonIdx).toBeGreaterThan(heroIdx);
    expect(notebookIdx).toBeGreaterThan(horizonIdx);
  });
});

describe("v11 horizon timeline â€” emphasized column", () => {
  it("investing column has data-emphasis=true", () => {
    const col = extractColumn(htmlEn, "investing");
    expect(col).toContain('data-emphasis="true"');
  });

  it("earned column does not have data-emphasis", () => {
    const col = extractColumn(htmlEn, "earned");
    expect(col).not.toContain('data-emphasis="true"');
  });
});

describe("v11 horizon timeline â€” investing chips are links", () => {
  it("all investing chips are <a> with non-empty href", () => {
    const col = extractColumn(htmlEn, "investing");
    const chips = extractChips(col);
    expect(chips.length).toBe(5);
    for (const chip of chips) {
      expect(chip).toMatch(/^<a [^>]*href="[^"]+"/);
    }
  });
});

describe("v11 horizon timeline â€” horizon column composition", () => {
  it("horizon column has exactly 2 evidence chips + 1 bet chip", () => {
    const col = extractColumn(htmlEn, "horizon");
    const chips = extractChips(col);
    expect(chips.length).toBe(3);
    const evidence = chips.filter((c) => c.includes('data-kind="evidence"'));
    const bets = chips.filter((c) => c.includes('data-kind="bet"'));
    expect(evidence.length).toBe(2);
    expect(bets.length).toBe(1);
  });

  it("bet chip has no href and has a visible bet badge", () => {
    const col = extractColumn(htmlEn, "horizon");
    const chips = extractChips(col);
    const bet = chips.find((c) => c.includes('data-kind="bet"'));
    expect(bet).toBeDefined();
    expect(bet!).not.toMatch(/href=/);
    expect(bet!).toContain('class="v11-horizon__bet-badge"');
  });
});

describe("v11 horizon timeline â€” past chips aria-label", () => {
  it("every earned chip has aria-label starting with Earned (EN)", () => {
    const col = extractColumn(htmlEn, "earned");
    const chips = extractChips(col);
    expect(chips.length).toBe(5);
    for (const chip of chips) {
      const match = chip.match(/aria-label="([^"]+)"/);
      expect(match).not.toBeNull();
      expect(match![1]).toMatch(/^Earned/);
    }
  });

  it("every earned chip has aria-label starting with Ganado (ES)", () => {
    const col = extractColumn(htmlEs, "earned");
    const chips = extractChips(col);
    expect(chips.length).toBe(5);
    for (const chip of chips) {
      const match = chip.match(/aria-label="([^"]+)"/);
      expect(match).not.toBeNull();
      expect(match![1]).toMatch(/^Ganado/);
    }
  });
});

describe("v11 horizon timeline â€” HTML budget", () => {
  it("EN output stays under 400k bytes", () => {
    expect(htmlEn.length).toBeLessThan(400_000);
  });
  it("ES output stays under 400k bytes", () => {
    expect(htmlEs.length).toBeLessThan(400_000);
  });
});

describe("v11 horizon timeline â€” internal anchor resolution", () => {
  it("every on-page href in the horizon section points to an id that exists in the HTML", () => {
    const section = extractHorizonSection(htmlEn);
    const anchors = Array.from(section.matchAll(/href="(#[^"]+)"/g)).map((m) => m[1]);
    expect(anchors.length).toBeGreaterThan(0);
    for (const anchor of anchors) {
      const idStr = `id="${anchor.slice(1)}"`;
      expect(htmlEn.includes(idStr), `missing id target for ${anchor}`).toBe(true);
    }
  });
});

// ---------- helpers ----------
function extractHorizonSection(html: string): string {
  const start = html.indexOf('class="v11-horizon"');
  if (start === -1) throw new Error("v11-horizon section not found");
  const end = html.indexOf("</section>", start);
  return html.slice(start, end);
}

function extractColumn(html: string, id: string): string {
  const marker = `data-horizon-col="${id}"`;
  const start = html.indexOf(marker);
  if (start === -1) throw new Error(`column ${id} not found`);
  // Stop at the next data-horizon-col marker or the closing </section> of the horizon block.
  const nextCol = html.indexOf("data-horizon-col=", start + marker.length);
  const endSection = html.indexOf("</section>", start);
  const end = nextCol !== -1 && nextCol < endSection ? nextCol : endSection;
  return html.slice(start, end);
}

function extractChips(columnHtml: string): string[] {
  // Match <a|span class="v11-horizon__chip" ...> ... </a|span>, allowing nested elements
  // (the bet chip contains a nested <span class="v11-horizon__bet-badge">).
  // We match greedily by tag depth using a simple state machine.
  const results: string[] = [];
  const openRe = /<(a|span)\b[^>]*class="[^"]*v11-horizon__chip[^"]*"[^>]*>/g;
  let m: RegExpExecArray | null;
  while ((m = openRe.exec(columnHtml)) !== null) {
    const tag = m[1];
    const start = m.index;
    // Find matching close tag, honoring nested same-tag opens
    let depth = 1;
    let cursor = openRe.lastIndex;
    const nestedRe = new RegExp(`<${tag}\\b[^>]*>|</${tag}>`, "g");
    nestedRe.lastIndex = cursor;
    while (depth > 0) {
      const nm = nestedRe.exec(columnHtml);
      if (!nm) throw new Error("chip without closing tag");
      if (nm[0].startsWith("</")) depth -= 1;
      else depth += 1;
      cursor = nestedRe.lastIndex;
    }
    results.push(columnHtml.slice(start, cursor));
    openRe.lastIndex = cursor;
  }
  return results;
}
```

- [ ] **Step 2: Run tests and verify they fail**

Run: `npm test -- v11-horizon`
Expected: **every test fails** â€” rendered HTML does not yet include `class="v11-horizon"` or any chip markup. That's the red phase of TDD.

- [ ] **Step 3: Do NOT commit yet**

Tests stay unstaged until Task 7's implementation makes them pass. Skip to Task 6.

---

## Task 6: Add Horizon CSS

**Files:**
- Modify: `generadores/templates/v11-landing/v11-styles.ts`

- [ ] **Step 1: Append the CSS block**

Open `generadores/templates/v11-landing/v11-styles.ts`. The file exports a single template-literal string `V11_STYLES`. Find the final `;` that closes the export (the closing backtick of the template literal). **Immediately before** that closing backtick, append the following CSS block (keep it inside the template literal):

```css

/* ============== HORIZON TIMELINE ============== */
.v11-horizon {
  padding: 64px 0;
  background: var(--v11-bg-alt);
  border-bottom: 1px solid var(--v11-line);
}
.v11-horizon__eyebrow {
  font-family: var(--v11-font-mono, "JetBrains Mono", ui-monospace, monospace);
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--v11-accent);
  margin: 0 0 12px;
}
.v11-horizon__title {
  font-size: 28px;
  font-weight: 600;
  letter-spacing: -0.01em;
  margin: 0 0 40px;
  color: var(--v11-text);
}
.v11-horizon__grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0;
  position: relative;
}
.v11-horizon__grid::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 58px;
  height: 1px;
  background: linear-gradient(to right, transparent 0%, var(--v11-line-strong) 8%, var(--v11-line-strong) 92%, transparent 100%);
  pointer-events: none;
}
.v11-horizon__col {
  padding: 0 28px;
  position: relative;
}
.v11-horizon__col + .v11-horizon__col {
  border-left: 1px solid var(--v11-line);
}
.v11-horizon__stage {
  font-family: var(--v11-font-mono, "JetBrains Mono", ui-monospace, monospace);
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--v11-text-50);
  margin-bottom: 22px;
}
.v11-horizon__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--v11-bg-elevated);
  border: 1px solid var(--v11-line-strong);
  position: absolute;
  left: 28px;
  top: 54px;
}
.v11-horizon__col[data-emphasis="true"] .v11-horizon__dot {
  background: var(--v11-accent);
  border-color: var(--v11-accent);
  box-shadow: 0 0 0 4px var(--v11-accent-soft);
}
.v11-horizon__col[data-emphasis="true"] .v11-horizon__stage {
  color: var(--v11-accent);
}
.v11-horizon__heading {
  font-size: 17px;
  font-weight: 600;
  letter-spacing: -0.005em;
  margin: 18px 0 10px;
  color: var(--v11-text);
}
.v11-horizon__body {
  font-size: 14px;
  line-height: 1.55;
  color: var(--v11-text-70);
  margin: 0 0 16px;
}
.v11-horizon__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  list-style: none;
  margin: 0;
  padding: 0;
}
.v11-horizon__chip {
  font-family: var(--v11-font-mono, "JetBrains Mono", ui-monospace, monospace);
  font-size: 11px;
  padding: 4px 10px;
  border-radius: 999px;
  background: var(--v11-bg-inset);
  color: var(--v11-text-70);
  border: 1px solid var(--v11-line);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
a.v11-horizon__chip:hover,
a.v11-horizon__chip:focus-visible {
  border-color: var(--v11-accent-line);
  color: var(--v11-text);
  outline: none;
}
a.v11-horizon__chip:focus-visible {
  box-shadow: 0 0 0 3px var(--v11-accent-ring);
}
[data-horizon-col="earned"] .v11-horizon__chip {
  text-decoration: line-through;
  text-decoration-color: var(--v11-text-40);
  color: var(--v11-text-50);
  cursor: default;
}
[data-horizon-col="investing"] .v11-horizon__chip {
  background: var(--v11-accent-soft);
  color: var(--v11-text);
  border-color: var(--v11-accent-line);
}
[data-horizon-col="horizon"] .v11-horizon__chip[data-kind="bet"] {
  border-style: dashed;
  color: var(--v11-text-body);
}
.v11-horizon__bet-badge {
  font-size: 9px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--v11-signal-warn);
  font-weight: 600;
  padding: 1px 5px;
  border: 1px solid var(--v11-signal-warn);
  border-radius: 3px;
  line-height: 1;
}

@media (max-width: 920px) {
  .v11-horizon__grid {
    grid-template-columns: 1fr;
  }
  .v11-horizon__grid::before {
    display: none;
  }
  .v11-horizon__col + .v11-horizon__col {
    border-left: 0;
    border-top: 1px solid var(--v11-line);
    margin-top: 24px;
    padding-top: 24px;
  }
  .v11-horizon__dot {
    top: -6px;
    left: 0;
  }
}
```

- [ ] **Step 2: Typecheck**

Run: `npm run typecheck`
Expected: still fails in `index.ts` (horizon isn't rendered yet) but `v11-styles.ts` compiles clean.

- [ ] **Step 3: Do NOT commit yet**

CSS lands alongside the render in Task 7's commit, keeping the repo runnable at every commit.

---

## Task 7: Implement renderHorizon and wire it in

**Files:**
- Modify: `generadores/templates/v11-landing/index.ts`

- [ ] **Step 1: Extend the type import at the top of the file**

Find the existing `import type` block at the top of `generadores/templates/v11-landing/index.ts` (lines 1-8):

```typescript
import type {
  LandingData,
  Identity,
  Positioning,
  Landing,
  Case,
  Testimonial,
} from "../../lib/types.js";
```

Replace with:

```typescript
import type {
  LandingData,
  Identity,
  Positioning,
  Landing,
  Case,
  Testimonial,
  HorizonSection,
  HorizonColumn,
  HorizonChip,
} from "../../lib/types.js";
```

- [ ] **Step 2: Add the renderHorizon functions**

Scroll to just **before** the `renderCase` function (around line 437). Insert this new block (three functions together):

```typescript
/* ============== HORIZON TIMELINE ============== */

function renderHorizonChip(
  chip: HorizonChip,
  columnId: string,
  lang: Lang,
): string {
  const label = lang === "en" ? chip.label.en : chip.label.es;
  const labelSafe = escapeHtml(label);

  // Past column: span + aria-label contextualizing the strikethrough.
  if (columnId === "earned") {
    const ariaPrefix = lang === "en"
      ? "Earned, now commoditized:"
      : "Ganado, ahora commoditizado:";
    const aria = escapeHtml(`${ariaPrefix} ${label}`);
    return `<li><span class="v11-horizon__chip" aria-label="${aria}">${labelSafe}</span></li>`;
  }

  // Future column, bet chip: span + bet badge + aria-label "declared bet, no evidence yet".
  if (columnId === "horizon" && chip.kind === "bet") {
    const aria = lang === "en"
      ? escapeHtml(`${label}. Declared bet, no evidence yet.`)
      : escapeHtml(`${label}. Apuesta declarada, sin evidencia aÃºn.`);
    const betLabel = lang === "en" ? "bet" : "apuesta";
    return `<li><span class="v11-horizon__chip" data-kind="bet" aria-label="${aria}">${labelSafe} <span class="v11-horizon__bet-badge">${escapeHtml(betLabel)}</span></span></li>`;
  }

  // All other cases: <a href>. Kind attribute only when defined.
  const href = chip.href ?? "#";
  const kindAttr = chip.kind ? ` data-kind="${escapeHtml(chip.kind)}"` : "";
  const isExternal = /^https?:\/\//.test(href);
  const extAttrs = isExternal ? ' target="_blank" rel="noopener"' : "";
  return `<li><a class="v11-horizon__chip"${kindAttr} href="${escapeHtml(href)}"${extAttrs}>${labelSafe}</a></li>`;
}

function renderHorizonColumn(col: HorizonColumn, lang: Lang): string {
  const stage = lang === "en" ? col.stage.en : col.stage.es;
  const heading = lang === "en" ? col.heading.en : col.heading.es;
  const body = lang === "en" ? col.body.en : col.body.es;
  const emphasisAttr = col.emphasis ? ' data-emphasis="true"' : "";
  const chips = col.chips.map((c) => renderHorizonChip(c, col.id, lang)).join("");
  return `<div class="v11-horizon__col" data-horizon-col="${escapeHtml(col.id)}"${emphasisAttr}>
    <div class="v11-horizon__dot" aria-hidden="true"></div>
    <div class="v11-horizon__stage">${escapeHtml(stage)}</div>
    <h3 class="v11-horizon__heading">${escapeHtml(heading)}</h3>
    <p class="v11-horizon__body">${escapeHtml(body)}</p>
    <ul class="v11-horizon__chips">${chips}</ul>
  </div>`;
}

function renderHorizon(horizon: HorizonSection, lang: Lang): string {
  const eyebrow = lang === "en" ? horizon.eyebrow.en : horizon.eyebrow.es;
  const title = lang === "en" ? horizon.sectionTitle.en : horizon.sectionTitle.es;
  const columns = horizon.columns.map((c) => renderHorizonColumn(c, lang)).join("\n");
  return `<section class="v11-horizon" aria-labelledby="horizon-h">
  <div class="v11-container">
    <div class="v11-horizon__eyebrow">${escapeHtml(eyebrow)}</div>
    <h2 id="horizon-h" class="v11-horizon__title">${escapeHtml(title)}</h2>
    <div class="v11-horizon__grid" role="list">
${columns}
    </div>
  </div>
</section>`;
}
```

- [ ] **Step 3: Inject the render call**

Find the main composition block (around line 711-718):

```typescript
${renderNav(data.identity, lang)}
<main id="main">
${renderHero(data.identity, data.positioning, lang)}
${renderProof(data.positioning, lang)}
${renderNotebook(lang)}
${renderWork(data, lang)}
${renderMethod(data, lang)}
${renderContact(data, lang)}
</main>
```

Replace with:

```typescript
${renderNav(data.identity, lang)}
<main id="main">
${renderHero(data.identity, data.positioning, lang)}
${renderProof(data.positioning, lang)}
${renderHorizon(data.horizon, lang)}
${renderNotebook(lang)}
${renderWork(data, lang)}
${renderMethod(data, lang)}
${renderContact(data, lang)}
</main>
```

- [ ] **Step 4: Run typecheck**

Run: `npm run typecheck`
Expected: clean (zero errors).

- [ ] **Step 5: Run the build**

Run: `npm run build:landing-v11`
Expected: succeeds. Prints `[v11-landing] wrote â€¦/dist/landing-v11/index.html (N bytes)` and the same for `es/index.html`. Both N values under 400_000.

- [ ] **Step 6: Run the tests â€” all pass**

Note: the final step numbering continues below.

Run: `npm test -- v11-horizon`
Expected: **all 11 tests pass**.

If any fail: read the failure message, fix the render output (not the test), rerun.

- [ ] **Step 7: Full test + build sanity**

Run: `npm test && npm run typecheck && npm run build:all`
Expected: every test green, typecheck clean, every artifact emitted (skills sheet PDFs, CVs, all three landings).

- [ ] **Step 8: Commit render + CSS + tests together**

```bash
git add generadores/templates/v11-landing/index.ts \
        generadores/templates/v11-landing/v11-styles.ts \
        tests/v11-horizon.test.ts
git commit -m "feat(v11): Horizon Timeline â€” narrative reframe section

Adds the three-column Earned / Investing / Next horizon section
below the hero+proof strip. Investing column is visually emphasized;
chips link to existing case anchors (enregla, te-skin, te-black) and
the method section. Horizon column follows the 2-evidence + 1-bet
rule. Pure CSS; no runtime JS; all v11 tokens reused.

Tests:
- placement (EN + ES)
- emphasized column
- investing chips are links
- horizon column composition (2 evidence + 1 bet)
- past chips have contextualizing aria-label
- HTML byte budget
- internal anchor resolution

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Task 8: Regenerate and verify the production output

**Files:**
- Modify: `dist/landing-v11/index.html`, `dist/landing-v11/es/index.html`

These are generated artifacts. The `build:landing-v11` in Task 7 already wrote them, but v11 `dist/` is part of the committed tree in this repo (see recent commit `c5f9bac` which shipped `dist/landing-v11/`). Commit the updated dist.

- [ ] **Step 1: Confirm the dist files are the regenerated ones**

Run: `git diff --stat dist/landing-v11/`
Expected: two modified files. Line counts changed (added ~40-60 lines for the new section per file).

- [ ] **Step 2: Spot-check a few strings**

Run: `grep -c "v11-horizon" dist/landing-v11/index.html`
Expected: a number â‰¥ 8 (section + columns + chips CSS class usages).

Run: `grep 'id="case-' dist/landing-v11/index.html | wc -l`
Expected: 4 (one per case article).

Run: `grep "Where my hours are going" dist/landing-v11/index.html`
Expected: one match.

Run: `grep "A dÃ³nde van mis horas" dist/landing-v11/es/index.html`
Expected: one match.

- [ ] **Step 3: Commit the regenerated artifacts**

```bash
git add dist/landing-v11/index.html dist/landing-v11/es/index.html
git commit -m "build(v11): regenerate landing with Horizon Timeline

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Task 9: Manual visual QA

The tests verify structure and content. This task verifies the visual result matches the Horizon Timeline mockup the user approved (`docs/superpowers/visuals/2026-05-10-v11-narrative-reframe/direction-comparison.html`, Direction 1).

- [ ] **Step 1: Open the EN build in a browser**

Open `dist/landing-v11/index.html` in a browser.

Tell the user: *"The Horizon Timeline is live between the hero/proof strip and the notebook section. Please open `dist/landing-v11/index.html` and `dist/landing-v11/es/index.html` in a browser and verify:*
- *The three columns render side-by-side on desktop, with a horizontal line connecting them.*
- *The middle column (Investing) has an accent-colored dot and accent-tinted chips.*
- *The first column's chips have strikethrough text.*
- *The third column's 'Eval-driven UI' chip has a dashed border and a 'bet' badge.*
- *Clicking 'Agent orchestration' jumps to the EnRegla case article below.*
- *At â‰¤920px width, the columns collapse to vertical without overlap.*"

- [ ] **Step 2: If any visual issue, fix it as a follow-up step**

If the user reports a visual bug, the fix goes in `v11-styles.ts` only (the structure is verified by tests). Do not modify the yaml or the render function unless the bug is in content.

- [ ] **Step 3: No commit here** â€” only if a visual fix is needed, it gets its own `style(v11): <subject>` commit.

---

## Definition of done (copy from spec Â§11)

- [ ] `npm run build:landing-v11` emits EN + ES under the 400k-byte budget
- [ ] `npm test` passes (existing + new tests in `tests/v11-horizon.test.ts`)
- [ ] `npm run typecheck` clean
- [ ] Horizon section renders between hero/proof and notebook in both locales
- [ ] Investing column visually emphasized (accent dot + chip treatment)
- [ ] 5 past chips are non-clickable `<span>` with contextual `aria-label`
- [ ] 5 investing chips are `<a>` links to existing on-page anchors
- [ ] 3 horizon chips: exactly 2 evidence (solid) + 1 bet (dashed + badge)
- [ ] Mobile â‰¤920px collapses to vertical without overlap
- [ ] Hero, tabs, cases, testimonials, method, contact untouched (except the single `id="case-<slug>"` addition on case articles, which is documented and additive)
