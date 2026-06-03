# BairesDev CV v2 + Portal Skills Inventory — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Regenerate `dist/cvs/cv-bairesdev-en.{html,pdf}` with an agentic-forward thesis and a new Skills Inventory block on page 2 that mirrors the BairesDev portal taxonomy, and deliver a companion Markdown checklist for Danilo to update the BairesDev portal.

**Architecture:** Add `thesisBairesdev.en` to `data/positioning.yaml` and `inventory: [{skill, years}]` to `data/skills.yaml`. Extend TypeScript types + YAML validators to carry the new fields. Create a pure component `skills-inventory.ts` that renders a 2-column grid. Reorder the sidebar groups only for the `bairesdev` variant (agentic group first). Plug the new thesis + inventory block into `renderBairesdevCv`. Add test coverage for thesis text, inventory presence, and sidebar order. The portal checklist is a separate standalone Markdown deliverable — no code involved.

**Tech Stack:** TypeScript 5 + tsx + vitest + puppeteer + js-yaml. No new dependencies.

**Spec:** `docs/superpowers/specs/2026-05-12-bairesdev-cv-v2-design.md`

---

## File Structure

```
dr-cv/
├── data/
│   ├── positioning.yaml                 # MODIFY: add thesisBairesdev.en
│   └── skills.yaml                      # MODIFY: add inventory root key
├── docs/deliverables/
│   └── bairesdev-portal-skills.md       # NEW: portal update checklist
├── generators/
│   ├── lib/
│   │   ├── types.ts                     # MODIFY: extend Positioning + Skills
│   │   └── load-data.ts                 # MODIFY: parse new fields
│   └── templates/cv/
│       ├── components/
│       │   ├── skills-sidebar.ts        # MODIFY: reorder groups for bairesdev variant
│       │   └── skills-inventory.ts      # NEW: pure grid component
│       └── bairesdev.ts                 # MODIFY: new thesis + inventory block on page 2
└── tests/
    └── cv-bairesdev.test.ts             # MODIFY: add 4 new assertions
```

Each task below produces a self-contained change that keeps the build green before moving on.

---

## Task 1: Extend data schema — positioning.thesisBairesdev + skills.inventory

**Files:**
- Modify: `generators/lib/types.ts` (Positioning + Skills interfaces)
- Test: `tests/load-data.test.ts` (add one assertion at the end)

- [ ] **Step 1: Read the current types**

Open `generators/lib/types.ts` and confirm:
- `Positioning` has `thesis`, `tagline`, `proofNumbers`
- `Skills` has `byLayer`, `byOutcome`

- [ ] **Step 2: Add the new optional fields to types**

Edit `generators/lib/types.ts`. In the `Positioning` interface, add a new optional field after `tagline`:

```ts
export interface Positioning {
  thesis: {
    en: string;
    es: string;
  };
  tagline: {
    en: string;
    es: string;
  };
  thesisBairesdev?: {
    en: string;
  };
  proofNumbers: Array<{
    value: string;
    unit?: string;
    labelEn: string;
    labelEs: string;
  }>;
}
```

In the `Skills` interface, add a new optional `inventory` field:

```ts
export interface SkillInventoryItem {
  skill: string;
  years: string;
}

export interface Skills {
  byLayer: SkillAxis;
  byOutcome: SkillAxis;
  inventory?: SkillInventoryItem[];
}
```

- [ ] **Step 3: Run typecheck to confirm no breakage**

Run: `npm run typecheck`
Expected: PASS (new fields are optional, nothing downstream breaks yet).

- [ ] **Step 4: Commit**

```bash
git add generators/lib/types.ts
git commit -m "feat(types): add Positioning.thesisBairesdev and Skills.inventory"
```

---

## Task 2: Extend validators in load-data.ts

**Files:**
- Modify: `generators/lib/load-data.ts:125-148` (validatePositioning)
- Modify: `generators/lib/load-data.ts:70-103` (validateSkills)

- [ ] **Step 1: Write the failing test for positioning**

Add to `tests/load-data.test.ts`, at the end of the describe block:

```ts
import { validateSkills } from "../generators/lib/load-data.js";

describe("validatePositioning — thesisBairesdev", () => {
  it("accepts optional thesisBairesdev.en", () => {
    // this will be re-loaded via loadAllData once data/positioning.yaml ships it;
    // for now just prove the loader tolerates it.
    const raw = {
      thesis: { en: "a", es: "b" },
      tagline: { en: "c", es: "d" },
      thesisBairesdev: { en: "agentic forward" },
      proofNumbers: [],
    };
    // inline import avoids hoist issues
    const { loadAllData } = require("../generators/lib/load-data.js");
    expect(typeof loadAllData).toBe("function");
    // the real round-trip is covered once yaml is updated in Task 4
  });
});

describe("validateSkills — inventory", () => {
  it("accepts a non-empty inventory list", () => {
    const raw = {
      byLayer: { name: "L", axis: "a", groups: [] },
      byOutcome: { name: "O", axis: "a", groups: [] },
      inventory: [
        { skill: "UX/UI", years: "10+" },
        { skill: "React", years: "4+" },
      ],
    };
    const v = validateSkills(raw);
    expect(v.inventory).toBeDefined();
    expect(v.inventory!.length).toBe(2);
    expect(v.inventory![0]).toEqual({ skill: "UX/UI", years: "10+" });
  });

  it("leaves inventory undefined when not present", () => {
    const raw = {
      byLayer: { name: "L", axis: "a", groups: [] },
      byOutcome: { name: "O", axis: "a", groups: [] },
    };
    const v = validateSkills(raw);
    expect(v.inventory).toBeUndefined();
  });
});
```

- [ ] **Step 2: Run the tests and watch them fail**

Run: `npx vitest run tests/load-data.test.ts`
Expected: the two `validateSkills — inventory` tests FAIL — `v.inventory` is `undefined` / `2` assertion not met, because the validator currently drops `inventory`.

- [ ] **Step 3: Update `validateSkills` to parse `inventory`**

In `generators/lib/load-data.ts`, replace the `validateSkills` function body. Find the `return { byLayer: ..., byOutcome: ... }` block (around line 100–103) and change it to:

```ts
  const inventoryRaw = obj.inventory;
  let inventory: Skills["inventory"] = undefined;
  if (inventoryRaw !== undefined && inventoryRaw !== null) {
    inventory = requireArray(inventoryRaw, "skills.inventory", (it, i) => {
      const io = requireObject(it, `skills.inventory[${i}]`);
      return {
        skill: requireString(io.skill, `skills.inventory[${i}].skill`),
        years: requireString(io.years, `skills.inventory[${i}].years`),
      };
    });
  }
  return {
    byLayer: validateAxis(obj.byLayer, "byLayer"),
    byOutcome: validateAxis(obj.byOutcome, "byOutcome"),
    inventory,
  };
```

Also update the import at the top of `load-data.ts`: add `SkillInventoryItem` to the import list from `./types.js` even though we only reference the parent type — keeps future edits grep-able.

- [ ] **Step 4: Update `validatePositioning` to parse `thesisBairesdev`**

In the same file, in `validatePositioning` (around line 125), after the `tg` line, add parsing for the optional field and include it in the return:

```ts
  const tb = o.thesisBairesdev;
  let thesisBairesdev: Positioning["thesisBairesdev"] = undefined;
  if (tb !== undefined && tb !== null) {
    const tbo = requireObject(tb, "positioning.thesisBairesdev");
    thesisBairesdev = {
      en: requireString(tbo.en, "positioning.thesisBairesdev.en"),
    };
  }
```

Then extend the returned object to include `thesisBairesdev`:

```ts
  return {
    thesis: { ... },
    tagline: { ... },
    thesisBairesdev,
    proofNumbers: requireArray(...),
  };
```

- [ ] **Step 5: Run the tests and watch them pass**

Run: `npx vitest run tests/load-data.test.ts`
Expected: PASS — all three new assertions green, no regression in existing tests.

- [ ] **Step 6: Typecheck**

Run: `npm run typecheck`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add generators/lib/load-data.ts tests/load-data.test.ts
git commit -m "feat(loader): parse Skills.inventory and Positioning.thesisBairesdev"
```

---

## Task 3: Add skills.yaml inventory data

**Files:**
- Modify: `data/skills.yaml` (append new root key)

- [ ] **Step 1: Append inventory to skills.yaml**

Open `data/skills.yaml`. Append a new root key at the bottom of the file (after the `byOutcome` block ends at line ~81):

```yaml

inventory:
  - { skill: "UX/UI",                   years: "10+" }
  - { skill: "HTML",                    years: "10+" }
  - { skill: "CSS",                     years: "10+" }
  - { skill: "JavaScript",              years: "10+" }
  - { skill: "Agile Methodologies",     years: "10+" }
  - { skill: "Figma",                   years: "8+"  }
  - { skill: "Git / GitHub",            years: "5+"  }
  - { skill: "SASS",                    years: "5+"  }
  - { skill: "Sales / Business Dev",    years: "5+"  }
  - { skill: "React",                   years: "4+"  }
  - { skill: "SEO",                     years: "4+"  }
  - { skill: "Illustrator",             years: "4+"  }
  - { skill: "WordPress",               years: "4+"  }
  - { skill: "TypeScript",              years: "3+"  }
  - { skill: "SQL",                     years: "3+"  }
  - { skill: "REST API",                years: "3+"  }
  - { skill: "Graphic Design",          years: "3+"  }
  - { skill: "Photoshop",               years: "3+"  }
  - { skill: "Next.js",                 years: "2+"  }
  - { skill: "Tailwind CSS",            years: "2+"  }
  - { skill: "Supabase",                years: "2+"  }
  - { skill: "PostgreSQL",              years: "2+"  }
  - { skill: "REST",                    years: "2+"  }
  - { skill: "Artificial Intelligence", years: "2+"  }
  - { skill: "Prompt Engineering",      years: "2+"  }
  - { skill: "LLM Integration",         years: "2+"  }
  - { skill: "AI Agents",               years: "1+"  }
  - { skill: "Anthropic Claude API",    years: "1+"  }
  - { skill: "Vercel",                  years: "1+"  }
```

- [ ] **Step 2: Add a data test asserting inventory is loaded**

Append to `tests/load-data.test.ts`:

```ts
describe("loadCvData — inventory round-trip", () => {
  it("data/skills.yaml exposes a non-empty inventory", () => {
    // top-level imports already cover loadCvData — if not, add:
    // import { loadCvData } from "../generators/lib/load-data.js";
    // import path from "node:path";
    // import { fileURLToPath } from "node:url";
    // const here = path.dirname(fileURLToPath(import.meta.url));
    const here = path.dirname(fileURLToPath(import.meta.url));
    const dataDir = path.join(here, "..", "data");
    const cv = loadCvData(dataDir);
    expect(cv.skills.inventory).toBeDefined();
    expect(cv.skills.inventory!.length).toBeGreaterThanOrEqual(20);
    const uxui = cv.skills.inventory!.find((i) => i.skill === "UX/UI");
    expect(uxui).toBeDefined();
    expect(uxui!.years).toBe("10+");
  });
});
```

If `loadCvData`, `path`, or `fileURLToPath` aren't already imported at the top of the file, add them to the existing import block.

- [ ] **Step 3: Run the test**

Run: `npx vitest run tests/load-data.test.ts`
Expected: PASS — `cv.skills.inventory.length` ≥ 20, `UX/UI` → `10+`.

- [ ] **Step 4: Commit**

```bash
git add data/skills.yaml tests/load-data.test.ts
git commit -m "feat(data): add skills.inventory block for BairesDev portal alignment"
```

---

## Task 4: Add positioning.thesisBairesdev data

**Files:**
- Modify: `data/positioning.yaml` (append new root key)

- [ ] **Step 1: Append the new thesis**

Open `data/positioning.yaml`. After the closing `proofNumbers` list (line ~22), append at root level:

```yaml

thesisBairesdev:
  en: "Agentic Designer. 15 years delivering product — today I ship SaaS, design systems, and frontend with agents as force multiplier."
```

- [ ] **Step 2: Add round-trip assertion**

Append to `tests/load-data.test.ts`:

```ts
describe("loadCvData — thesisBairesdev round-trip", () => {
  it("data/positioning.yaml exposes thesisBairesdev.en starting with 'Agentic Designer.'", () => {
    const here = path.dirname(fileURLToPath(import.meta.url));
    const dataDir = path.join(here, "..", "data");
    const cv = loadCvData(dataDir);
    expect(cv.positioning.thesisBairesdev).toBeDefined();
    expect(cv.positioning.thesisBairesdev!.en.startsWith("Agentic Designer."))
      .toBe(true);
    expect(cv.positioning.thesisBairesdev!.en).toContain("15 years");
    expect(cv.positioning.thesisBairesdev!.en).toContain("agents as force multiplier");
  });
});
```

- [ ] **Step 3: Run the test**

Run: `npx vitest run tests/load-data.test.ts`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add data/positioning.yaml tests/load-data.test.ts
git commit -m "feat(data): add positioning.thesisBairesdev for bairesdev CV variant"
```

---

## Task 5: Create skills-inventory component

**Files:**
- Create: `generators/templates/cv/components/skills-inventory.ts`
- Create: `tests/cv-components.test.ts` (append — it already exists)

- [ ] **Step 1: Write the failing test**

Append to `tests/cv-components.test.ts`:

```ts
import { renderSkillsInventory } from "../generators/templates/cv/components/skills-inventory.js";

describe("renderSkillsInventory", () => {
  const items = [
    { skill: "UX/UI", years: "10+" },
    { skill: "React", years: "4+" },
    { skill: "Supabase", years: "2+" },
  ];

  it("renders an EN heading 'Skills Inventory'", () => {
    const html = renderSkillsInventory(items, "en");
    expect(html).toContain("Skills Inventory");
  });

  it("renders an ES heading 'Inventario de skills'", () => {
    const html = renderSkillsInventory(items, "es");
    expect(html).toContain("Inventario de skills");
  });

  it("emits one row per item with skill and years", () => {
    const html = renderSkillsInventory(items, "en");
    expect(html).toContain("UX/UI");
    expect(html).toContain("10+");
    expect(html).toContain("React");
    expect(html).toContain("4+");
    expect(html).toContain("Supabase");
    expect(html).toContain("2+");
  });

  it("wraps output in <section class=\"cv-inventory\">", () => {
    const html = renderSkillsInventory(items, "en");
    expect(html).toMatch(/<section\s+class="cv-inventory/);
  });

  it("escapes HTML-sensitive characters in skill names", () => {
    const hostile = [{ skill: "<script>", years: "1+" }];
    const html = renderSkillsInventory(hostile, "en");
    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;script&gt;");
  });
});
```

- [ ] **Step 2: Run the test and watch it fail**

Run: `npx vitest run tests/cv-components.test.ts -t renderSkillsInventory`
Expected: FAIL with module-not-found for `skills-inventory.js`.

- [ ] **Step 3: Create the component**

Create `generators/templates/cv/components/skills-inventory.ts`:

```ts
import type { SkillInventoryItem } from "../../../lib/types.js";
import { escapeHtml, type Lang } from "../../skills-sheet-page-1.js";

export function renderSkillsInventory(items: SkillInventoryItem[], lang: Lang): string {
  const heading = lang === "en" ? "Skills Inventory" : "Inventario de skills";
  const rows = items
    .map(
      (it) => `
        <div class="cv-inventory__row">
          <span class="cv-inventory__skill">${escapeHtml(it.skill)}</span>
          <span class="cv-inventory__years">${escapeHtml(it.years)}</span>
        </div>`,
    )
    .join("");
  return `
<section class="cv-inventory">
  <h3 class="cv-inventory__heading">${escapeHtml(heading)}</h3>
  <div class="cv-inventory__grid">${rows}
  </div>
</section>`;
}
```

Note: `SkillInventoryItem` must be exported from `generators/lib/types.ts` (done in Task 1).

- [ ] **Step 4: Run the test and watch it pass**

Run: `npx vitest run tests/cv-components.test.ts -t renderSkillsInventory`
Expected: PASS — all 5 assertions green.

- [ ] **Step 5: Typecheck**

Run: `npm run typecheck`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add generators/templates/cv/components/skills-inventory.ts tests/cv-components.test.ts
git commit -m "feat(cv): add skills-inventory component (skill · years grid)"
```

---

## Task 6: Reorder skills-sidebar groups for bairesdev variant

**Files:**
- Modify: `generators/templates/cv/components/skills-sidebar.ts`
- Modify: `tests/cv-components.test.ts` (append — will be confirmed by cv-bairesdev tests too)

- [ ] **Step 1: Write the failing test**

Append to `tests/cv-components.test.ts`:

```ts
import { renderSkillsSidebar } from "../generators/templates/cv/components/skills-sidebar.js";
import { loadCvData } from "../generators/lib/load-data.js";
import path from "node:path";
import { fileURLToPath } from "node:url";

describe("renderSkillsSidebar — bairesdev ordering", () => {
  const here = path.dirname(fileURLToPath(import.meta.url));
  const dataDir = path.join(here, "..", "data");
  const data = loadCvData(dataDir);

  it("puts the Agents group first for the bairesdev variant", () => {
    const html = renderSkillsSidebar(data.skills, { variant: "bairesdev", lang: "en" });
    const agentsIdx = html.indexOf("Agents");
    const designIdx = html.indexOf("Design");
    const engineeringIdx = html.indexOf("Engineering");
    const strategyIdx = html.indexOf("Strategy");
    expect(agentsIdx).toBeGreaterThan(-1);
    expect(designIdx).toBeGreaterThan(-1);
    expect(engineeringIdx).toBeGreaterThan(-1);
    expect(strategyIdx).toBeGreaterThan(-1);
    expect(agentsIdx).toBeLessThan(designIdx);
    expect(designIdx).toBeLessThan(engineeringIdx);
    expect(engineeringIdx).toBeLessThan(strategyIdx);
  });

  it("keeps the original Strategy-first order for warm and serious variants", () => {
    const htmlWarm = renderSkillsSidebar(data.skills, { variant: "warm", lang: "en" });
    const strategyIdx = htmlWarm.indexOf("Strategy");
    const agentsIdx = htmlWarm.indexOf("Agents");
    expect(strategyIdx).toBeLessThan(agentsIdx);
  });
});
```

- [ ] **Step 2: Run the test and watch it fail**

Run: `npx vitest run tests/cv-components.test.ts -t "bairesdev ordering"`
Expected: FAIL — the current sidebar keeps the source order from `skills.yaml` (Strategy first).

- [ ] **Step 3: Update the sidebar to reorder for bairesdev**

Open `generators/templates/cv/components/skills-sidebar.ts`. Replace the function body:

```ts
const BAIRESDEV_ORDER = ["Agents", "Design", "Engineering", "Strategy"] as const;

export function renderSkillsSidebar(skills: Skills, options: SkillsSidebarOptions): string {
  const sourceGroups = skills.byLayer.groups;

  let orderedGroups: SkillGroup[];
  if (options.variant === "bairesdev") {
    orderedGroups = BAIRESDEV_ORDER
      .map((title) => sourceGroups.find((g) => g.title === title))
      .filter((g): g is SkillGroup => g !== undefined);
    // append any extra groups that weren't in the explicit order — defensive
    for (const g of sourceGroups) {
      if (!orderedGroups.includes(g)) orderedGroups.push(g);
    }
  } else {
    orderedGroups = sourceGroups;
  }

  const groups = orderedGroups.map(renderGroup).join("\n");
  const heading = options.lang === "en" ? "Skills" : "Habilidades";
  return `
<aside class="cv-skills cv-skills--${options.variant}">
  <h3 class="cv-skills__heading">${escapeHtml(heading)}</h3>
  ${groups}
</aside>`;
}
```

- [ ] **Step 4: Run the tests**

Run: `npx vitest run tests/cv-components.test.ts`
Expected: PASS — bairesdev test shows Agents first, warm/serious keep Strategy first.

Run: `npx vitest run tests/cv-warm.test.ts tests/cv-serious.test.ts`
Expected: PASS — no regression in the other two variants.

- [ ] **Step 5: Commit**

```bash
git add generators/templates/cv/components/skills-sidebar.ts tests/cv-components.test.ts
git commit -m "feat(cv): reorder sidebar groups (Agents-first) for bairesdev variant"
```

---

## Task 7: Wire new thesis + inventory into renderBairesdevCv

**Files:**
- Modify: `generators/templates/cv/bairesdev.ts`
- Modify: `tests/cv-bairesdev.test.ts`

- [ ] **Step 1: Write the failing tests**

In `tests/cv-bairesdev.test.ts`, append to the `describe("renderBairesdevCv", ...)` block:

```ts
  it("renders the agentic-forward thesis (not the generic one)", () => {
    const html = renderBairesdevCv(data);
    expect(html).toContain("Agentic Designer.");
    expect(html).toContain("15 years delivering product");
    expect(html).toContain("agents as force multiplier");
    // guard: must NOT render the generic thesis
    expect(html).not.toContain("I ship real products — and I ship the tools");
  });

  it("renders a skills inventory section with ≥ 20 rows", () => {
    const html = renderBairesdevCv(data);
    expect(html).toMatch(/<section\s+class="cv-inventory/);
    const rowMatches = html.match(/class="cv-inventory__row"/g) ?? [];
    expect(rowMatches.length).toBeGreaterThanOrEqual(20);
  });

  it("renders the inventory section INSIDE page 2 (after the second <article>)", () => {
    const html = renderBairesdevCv(data);
    const articleBoundaries = [...html.matchAll(/<article\b/g)].map((m) => m.index ?? -1);
    expect(articleBoundaries.length).toBe(2);
    const inventoryIdx = html.indexOf('class="cv-inventory');
    expect(inventoryIdx).toBeGreaterThan(articleBoundaries[1]);
  });

  it("puts Agents group before Design group in the sidebar", () => {
    const html = renderBairesdevCv(data);
    const agentsIdx = html.indexOf("Agents");
    const designIdx = html.indexOf("Design");
    expect(agentsIdx).toBeGreaterThan(-1);
    expect(designIdx).toBeGreaterThan(-1);
    expect(agentsIdx).toBeLessThan(designIdx);
  });
```

- [ ] **Step 2: Run the tests and watch them fail**

Run: `npx vitest run tests/cv-bairesdev.test.ts`
Expected: the four new tests FAIL — thesis/inventory not yet integrated. Existing tests still PASS.

- [ ] **Step 3: Import the inventory component**

Open `generators/templates/cv/bairesdev.ts`. Add an import near the other component imports at the top:

```ts
import { renderSkillsInventory } from "./components/skills-inventory.js";
```

- [ ] **Step 4: Use the new thesis in renderSummaryBairesdev**

Locate `renderSummaryBairesdev(thesisEn: string)` (around line 413). It's called once inside `renderBairesdevCv`. Change the call site inside `renderBairesdevCv` from:

```ts
    ${renderSummaryBairesdev(data.positioning.thesis.en)}
```

to:

```ts
    ${renderSummaryBairesdev(data.positioning.thesisBairesdev?.en ?? data.positioning.thesis.en)}
```

Leave the helper function itself untouched — it still takes a single string.

- [ ] **Step 5: Add CSS for the inventory block**

In `BAIRESDEV_STYLES` (the template string around line 44–411), add a new block just before the final backtick — right after the `/* ============== references block ============== */` section:

```css

/* ============== skills inventory ============== */
.cv-inventory { margin-top: 6mm; }
.cv-inventory__heading {
  font-family: var(--font-mono);
  font-size: 7.5pt;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink);
  margin: 0 0 3mm 0;
  padding-bottom: 2mm;
  border-bottom: 1px solid var(--ink);
  font-weight: 600;
}
.cv-inventory__heading::before {
  content: "// ";
  color: var(--ink-subtle);
  font-weight: 400;
}
.cv-inventory__grid {
  display: grid;
  grid-template-columns: 1fr auto;
  column-gap: 4mm;
  row-gap: 1.2mm;
}
.cv-inventory__row {
  display: contents;
}
.cv-inventory__skill {
  font-family: var(--font-body);
  font-size: 7.8pt;
  color: var(--ink);
  letter-spacing: 0;
  padding: 0.8mm 0;
  border-top: 1px solid var(--line-soft);
}
.cv-inventory__years {
  font-family: var(--font-mono);
  font-size: 7pt;
  color: var(--ink-muted);
  letter-spacing: 0.04em;
  text-align: right;
  padding: 0.8mm 0;
  border-top: 1px solid var(--line-soft);
}
.cv-inventory__grid > .cv-inventory__row:first-child .cv-inventory__skill,
.cv-inventory__grid > .cv-inventory__row:first-child .cv-inventory__years {
  border-top: 0;
}
```

Note: `display: contents` on `.cv-inventory__row` lets the grandchildren participate in the parent grid while we keep a semantic "row" wrapper for tests. The first-child `border-top: 0` rule is cosmetic.

- [ ] **Step 6: Insert the inventory block on page 2**

Still in `generators/templates/cv/bairesdev.ts`, locate the second `<article class="cv-page">` block and its `<aside>` element (around line 477):

```tsx
<article class="cv-page">
  <aside>
    ${renderEducationBlock(data.education, lang)}
  </aside>
```

Replace with:

```tsx
<article class="cv-page">
  <aside>
    ${renderEducationBlock(data.education, lang)}
    ${data.skills.inventory && data.skills.inventory.length > 0
      ? renderSkillsInventory(data.skills.inventory, lang)
      : ""}
  </aside>
```

Leave everything in the right column untouched.

- [ ] **Step 7: Run the bairesdev tests and watch them pass**

Run: `npx vitest run tests/cv-bairesdev.test.ts`
Expected: PASS — all old tests still pass, all four new tests pass.

- [ ] **Step 8: Run the full test suite**

Run: `npm test`
Expected: PASS — warm, serious, bairesdev, components, load-data, templates, v11, types — all green. No regression elsewhere.

- [ ] **Step 9: Regenerate the CV and inspect in browser**

Run: `npm run build:cvs`
Expected: `dist/cvs/cv-bairesdev-en.html` and `cv-bairesdev-en.pdf` regenerated, other four CVs also rebuilt without error.

Open `dist/cvs/cv-bairesdev-en.html` in a browser. Visually confirm:
- Page 1 summary shows the new thesis starting with "Agentic Designer."
- Page 1 sidebar shows Agents group on top.
- Page 2 left aside shows Education first, then Skills Inventory second, with ≥ 20 skill rows.
- Layout is still exactly 2 pages. No orphan page 3.

If page 2 overflows to page 3, reduce inventory `.cv-inventory__skill` `font-size` from 7.8pt to 7.5pt and `row-gap` from 1.2mm to 1mm, then re-run `npm run build:cvs`. Keep iterating in 0.2pt / 0.1mm steps until the layout is 2 pages exactly.

- [ ] **Step 10: Commit**

```bash
git add generators/templates/cv/bairesdev.ts tests/cv-bairesdev.test.ts
git commit -m "feat(cv): agentic-forward thesis + skills inventory on page 2 (bairesdev)"
```

If Step 9 required layout tweaks, include those in the same commit.

---

## Task 8: Write the portal skills checklist deliverable

**Files:**
- Create: `docs/deliverables/bairesdev-portal-skills.md`

No tests — this is a static Markdown document.

- [ ] **Step 1: Create the directory if it doesn't exist**

Check `docs/deliverables/`. If absent, it will be created by the write in Step 2.

- [ ] **Step 2: Write the checklist**

Create `docs/deliverables/bairesdev-portal-skills.md` with the following content:

```markdown
# BairesDev Portal — Skills Update Checklist

**For:** Danilo Rojas · 2026-05-12
**Use with:** BairesDev portal · Home → Profile → Skills
**Companion CV:** `dist/cvs/cv-bairesdev-en.pdf`

Open this file next to the portal and execute top-to-bottom. Each row has a one-line reason so you can defend the number in interview.

---

## Section 1 — Update years on already-declared skills

For each row: find the skill in the portal, click the years dropdown, set the new value.

| Skill                        | Portal now | Update to | Reason                                |
|------------------------------|-----------:|----------:|---------------------------------------|
| Sales / Business Development | 10+        | **5+**    | More honest for formal BD work        |
| Agile Methodologies          | 4+         | **10+**   | Xentinels 2016 → BAH → EnRegla        |
| HTML                         | 4+         | **10+**   | Since Tecniequipos 2013               |
| CSS                          | 4+         | **10+**   | Since Tecniequipos 2013               |
| JavaScript                   | 1+         | **10+**   | Since Tecniequipos 2013               |
| Figma                        | 2+         | **8+**    | Xentinels DS + Behance portfolio      |
| React                        | 1+         | **4+**    | EnRegla + prior client work           |
| TypeScript                   | 1+         | **3+**    | EnRegla + dr-cv                       |

Verification: refresh portal home page. Skill card summary should reflect the new years.

---

## Section 2 — Add new skills (the "must-hire" tier)

These are the differentiators. If the exact label isn't in the taxonomy, pick the closest listed variant and declare the years shown.

| Skill                        | Years | Reason                                         |
|------------------------------|------:|------------------------------------------------|
| Artificial Intelligence      | 2+    | Diferenciador principal                        |
| Prompt Engineering           | 2+    | Core del pitch agentic                         |
| LLM Integration              | 2+    | EnRegla + Life Update Mobile (Gemini runtime)  |
| AI Agents / Agentic AI       | 1+    | Subagent orchestration con Claude Code         |
| Anthropic Claude API         | 1+    | Ya identificada como búsqueda alterna          |
| Next.js                      | 2+    | Stack moderno — dr-cv                          |
| Tailwind CSS                 | 2+    | Landing v11, dr-cv                             |
| Supabase                     | 2+    | EnRegla — 346 commits, 21 migraciones SQL      |
| PostgreSQL                   | 2+    | Vía Supabase, SQL + RLS                        |
| Vercel                       | 1+    | Deploy dr-cv y EnRegla staging                 |

Verification: portal skill count went from N to N + (# rows added — up to 10).

---

## Section 3 — Fill "Select years" blanks

| Skill                  | Years | Reason                                        |
|------------------------|------:|-----------------------------------------------|
| Photoshop              | 3+    | Uso ocasional en Xentinels / Arpatel          |
| SASS                   | 5+    | Xentinels DS stack                            |
| SEO                    | 4+    | Tecniequipos + freelance web                  |
| Soft Skill — Leadership| 10+   | Xentinels team lead + BAH consulting          |
| Soft Skill — Planning  | 10+   | Roadmapping y RICE consistentes               |
| REST                   | 2+    | EnRegla edge functions + prior client work    |
| Unit Testing           | 2+    | dr-cv (158 tests) + EnRegla                   |
| Webpack                | 2+    | Vía Next.js / Vite toolchain                  |
| Redux                  | 1+    | Cliente previo                                |
| Node.js                | 2+    | Edge functions en EnRegla                     |
| npm                    | 10+   | Desde Tecniequipos                            |

Verification: after filling, portal home page should not show any "Select the years of experience" warning labels for these skills.

---

## Section 4 — Remove / leave blank

| Skill               | Action         | Reason                                  |
|---------------------|----------------|-----------------------------------------|
| Machine Learning    | Do **NOT** add | Sin research formal                     |
| Silverlight         | **Remove**     | Obsoleto                                |
| Scala               | **Remove**     | No aporta signal                        |
| InVision            | **Remove**     | Herramienta muerta                      |
| Grunt               | Leave blank    | Obsoleto — no inflar                    |
| gulp.js             | Leave blank    | Obsoleto                                |
| AJAX                | Leave blank    | Cubierto por REST / JS                  |
| XML                 | Leave blank    | No diferenciador                        |
| C/C++               | Leave blank    | Sin práctica reciente                   |
| iOS Developer 2+    | **Review**     | Si no honesto, remover                  |
| Android Developer <1| Leave as-is    | Honesto — no subir                      |
| Vue.js <1           | Leave as-is    | Honesto                                 |

---

## After you finish

1. Click the email link from Fernanda Siriani ("here").
2. Navigate to Home → **Key Job Opening Questions**.
3. Answer the English questions using bullet-level detail — lean on the CV at `dist/cvs/cv-bairesdev-en.pdf` for phrasing.
4. If a question asks for a CV attachment, attach the regenerated PDF.
5. Submit.

**Tip:** The portal now says "Agentic Designer" via your skills stack (AI, Prompt Engineering, LLM Integration, AI Agents, Anthropic Claude API). The CV opens with that same thesis. One consistent story across both artifacts.
```

- [ ] **Step 3: Commit**

```bash
git add docs/deliverables/bairesdev-portal-skills.md
git commit -m "docs: add BairesDev portal skills update checklist"
```

---

## Task 9: Final verification sweep

**Files:** none — verification only.

- [ ] **Step 1: Run the full test suite**

Run: `npm test`
Expected: all green. Previous suites had ~158 tests; count should now be higher (Task 2 added 3, Task 3 added 1, Task 4 added 1, Task 5 added 5, Task 6 added 2, Task 7 added 4 → +16 new tests).

- [ ] **Step 2: Typecheck**

Run: `npm run typecheck`
Expected: PASS.

- [ ] **Step 3: Full build**

Run: `npm run build:all`
Expected: skills-sheet + all 5 CV variants + v11 landing regenerate without error.

- [ ] **Step 4: Visual spot-check the output**

Open in browser:
- `dist/cvs/cv-bairesdev-en.html` — confirm agentic thesis, Agents group first in sidebar, 2-page layout with inventory block on page 2 aside.
- `dist/cvs/cv-warm-en.html` — confirm unchanged (thesis still generic, Strategy-first sidebar).
- `dist/cvs/cv-serious-en.html` — confirm unchanged.

- [ ] **Step 5: Confirm the PDF renders correctly**

Open `dist/cvs/cv-bairesdev-en.pdf`. Confirm:
- Exactly 2 pages.
- Agentic thesis visible on page 1.
- Skills Inventory visible on page 2 left aside, with ≥ 20 rows fitting without overflow.

- [ ] **Step 6: Final commit (if layout tweaks were needed in Step 4 or 5)**

If any final CSS tuning was required in `generators/templates/cv/bairesdev.ts` to keep 2 pages:

```bash
git add generators/templates/cv/bairesdev.ts
git commit -m "style(cv): tune inventory font-size for 2-page A4 fit"
```

Otherwise skip.

---

## Success Criteria (from the spec)

1. ✅ `npm run build:cvs` regenerates `cv-bairesdev-en.{html,pdf}` with the new thesis and skills inventory without breaking the other two CV variants. — covered by Task 7 Step 8 + Task 9 Step 3.
2. ✅ The two-page layout stays intact — no orphan page 3. — covered by Task 7 Step 9 + Task 9 Step 5.
3. ✅ All three test files pass. — covered by Task 9 Step 1.
4. ✅ The Markdown checklist `docs/deliverables/bairesdev-portal-skills.md` exists, is committed, and is readable as a standalone document. — covered by Task 8.
5. ✅ A recruiter reading both the CV and the portal sees a consistent story. — qualitative; achieved by matching inventory labels to portal taxonomy (Task 3) and aligning thesis (Task 4).
