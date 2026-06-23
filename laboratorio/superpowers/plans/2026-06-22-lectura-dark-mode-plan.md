# Ruta de lectura Blueprint Dark Mode Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Compile `lectura/ruta_lectura_product_design_ai_agents.md` dynamically into a beautifully styled Dark Blueprint HTML page served at `danilorojas.design/lectura` and deployed to Vercel.

**Architecture:** A static generation workflow where a TypeScript parser extracts reading blocks, metadata, and extract texts from the markdown file at compile-time. The generator then pipes this data into a self-contained HTML template styled with the portfolio's Dark Blueprint aesthetics. The script on the client determines the current day's card dynamically based on the local system time.

**Tech Stack:** TypeScript (Node.js/ESM), Vitest, HTML5, Vanilla CSS (Dark Blueprint theme).

## Global Constraints
* The source of truth for the reading path content is `lectura/ruta_lectura_product_design_ai_agents.md`.
* The final compilation output must be placed in `dist/landing-v11/lectura/index.html`.
* The design system tokens must match the Dark Blueprint aesthetics from `generadores/templates/v11-landing/structural.ts`.
* Tests must run and pass using `npm test` (Vitest).

---

### Task 1: Create Markdown Parser for reading guide

**Files:**
- Create: `generadores/lib/parse-lectura.ts`
- Create: `tests/lectura.test.ts`

**Interfaces:**
- Consumes: The raw text of the markdown file `lectura/ruta_lectura_product_design_ai_agents.md`.
- Produces: `parseLecturaMd(mdContent: string): LecturaBlock[]`
  ```typescript
  export interface LecturaItem {
    title: string;
    url: string;
    badge: string;
    time: string;
    extract: string;
  }
  export interface LecturaBlock {
    blockTitle: string;
    items: LecturaItem[];
  }
  ```

- [ ] **Step 1: Write the failing parser test**
  Write a test that verifies the parser handles blocks, headers, URLs, badges, and extracts properly.
  Create `tests/lectura.test.ts`:
  ```typescript
  import { describe, it, expect } from "vitest";
  import { parseLecturaMd } from "../generadores/lib/parse-lectura.js";

  describe("parseLecturaMd", () => {
    it("parses blocks, items, priority badges, times, URLs and descriptions correctly", () => {
      const mockMd = `# BLOQUE 1 — Producto: juicio antes de herramientas\n\n**Objetivo:** recuperar el centro.\n\n## 1. Shape Up — Introduction\n\n**Link:** https://basecamp.com/shapeup/0.3-chapter-01  \n**Prioridad:** Must-read  \n**Tiempo:** 45–60 min\n\nShaping, riesgo, límites, ciclos.\n- Paso 1\n- Paso 2\n`;
      const result = parseLecturaMd(mockMd);
      expect(result).toHaveLength(1);
      expect(result[0].blockTitle).toBe("Bloque 1 · Producto: juicio antes de herramientas");
      expect(result[0].items).toHaveLength(1);
      expect(result[0].items[0].title).toBe("Shape Up — Introduction");
      expect(result[0].items[0].url).toBe("https://basecamp.com/shapeup/0.3-chapter-01");
      expect(result[0].items[0].badge).toBe("Must-read");
      expect(result[0].items[0].time).toBe("45–60 min");
      expect(result[0].items[0].extract).toContain("Shaping, riesgo, límites, ciclos.");
      expect(result[0].items[0].extract).toContain("<li>Paso 1</li>");
    });
  });
  ```

- [ ] **Step 2: Run test to verify it fails**
  Run: `npx vitest run tests/lectura.test.ts`
  Expected: FAIL with missing module error.

- [ ] **Step 3: Implement parse-lectura.ts**
  Create `generadores/lib/parse-lectura.ts`:
  ```typescript
  import { LecturaBlock, LecturaItem } from "./types.js";

  // Note: we can define the types inline if they are not in a separate types.ts
  export interface LecturaItem {
    title: string;
    url: string;
    badge: string;
    time: string;
    extract: string;
  }

  export interface LecturaBlock {
    blockTitle: string;
    items: LecturaItem[];
  }

  export function parseLecturaMd(mdContent: string): LecturaBlock[] {
    const blocks: LecturaBlock[] = [];
    const lines = mdContent.split(/\r?\n/);
    let currentBlock: LecturaBlock | null = null;
    let currentItem: LecturaItem | null = null;
    let extractLines: string[] = [];

    const flushItem = () => {
      if (currentItem && currentBlock) {
        // Parse markdown formatting inside extract to HTML list items or paragraphs
        let rawExtract = extractLines.join("\n").trim();
        // Simple markdown list parser
        const formatted = rawExtract
          .split("\n")
          .map(line => {
            const trimmed = line.trim();
            if (trimmed.startsWith("- ") || trimmed.startsWith("— ")) {
              return `<li>${trimmed.substring(2).trim()}</li>`;
            }
            return trimmed;
          })
          .join("\n");
        
        // Wrap groups of <li> in <ul>
        let finalExtract = formatted;
        if (finalExtract.includes("<li>")) {
          // Wrap sequential <li> blocks in <ul>
          const parts = finalExtract.split("\n");
          let inList = false;
          const processed: string[] = [];
          for (const part of parts) {
            if (part.startsWith("<li>")) {
              if (!inList) {
                processed.push("<ul>");
                inList = true;
              }
              processed.push(part);
            } else {
              if (inList) {
                processed.push("</ul>");
                inList = false;
              }
              if (part !== "") processed.push(part);
            }
          }
          if (inList) processed.push("</ul>");
          finalExtract = processed.join("\n");
        }

        currentItem.extract = finalExtract;
        currentBlock.items.push(currentItem);
      }
      currentItem = null;
      extractLines = [];
    };

    const flushBlock = () => {
      flushItem();
      if (currentBlock) {
        blocks.push(currentBlock);
      }
      currentBlock = null;
    };

    for (const line of lines) {
      const trimmed = line.trim();

      // Detect Block
      if (trimmed.startsWith("# BLOQUE") || trimmed.startsWith("# Bloque")) {
        flushBlock();
        const blockName = trimmed.replace(/^#\s*/, "").trim();
        // Standardize block formatting (e.g. replacing "BLOQUE 1 — " with "Bloque 1 · ")
        const cleanName = blockName
          .replace(/BLOQUE\s+(\d+)\s*—\s*/i, "Bloque $1 · ")
          .replace(/BLOQUE\s+(\d+)\s*-\s*/i, "Bloque $1 · ");
        currentBlock = {
          blockTitle: cleanName,
          items: []
        };
        continue;
      }

      // Detect Item
      if (trimmed.startsWith("## ") && !trimmed.toLowerCase().includes("semana")) {
        flushItem();
        if (!currentBlock) {
          currentBlock = { blockTitle: "Bloque General", items: [] };
        }
        // Extract title (remove "## 1. " or "## ")
        const titleClean = trimmed.replace(/^##\s*(?:\d+\.\s*)?/, "").trim();
        currentItem = {
          title: titleClean,
          url: "",
          badge: "",
          time: "",
          extract: ""
        };
        continue;
      }

      // Detect properties
      if (currentItem) {
        if (trimmed.startsWith("**Link:**") || trimmed.startsWith("**Link :**")) {
          currentItem.url = trimmed.replace(/^\*\*Link\s*:\*\*\s*/, "").trim();
          continue;
        }
        if (trimmed.startsWith("**Prioridad:**")) {
          currentItem.badge = trimmed.replace(/^\*\*Prioridad:\*\*\s*/, "").trim();
          continue;
        }
        if (trimmed.startsWith("**Tiempo:**")) {
          currentItem.time = trimmed.replace(/^\*\*Tiempo:\*\*\s*/, "").trim();
          continue;
        }
        
        // Accumulate details for the extract (ignoring markdown horizontal rules and metadata tags)
        if (trimmed !== "---" && !trimmed.startsWith("**") && trimmed !== "") {
          extractLines.push(trimmed);
        }
      }
    }

    flushBlock();
    return blocks;
  }
  ```

- [ ] **Step 4: Run test to verify it passes**
  Run: `npx vitest run tests/lectura.test.ts`
  Expected: PASS

- [ ] **Step 5: Commit**
  ```bash
  git add tests/lectura.test.ts generadores/lib/parse-lectura.ts
  git commit -m "feat(lectura): add markdown parser for reading list"
  ```

---

### Task 2: Create Reading Path Template (Dark Blueprint Style)

**Files:**
- Create: `generadores/templates/lectura.ts`
- Modify: `tests/lectura.test.ts`

**Interfaces:**
- Consumes: `LecturaBlock[]`
- Produces: `renderLecturaPage(blocks: LecturaBlock[]): string`

- [ ] **Step 1: Write failing template test**
  Modify `tests/lectura.test.ts` and add tests asserting the generated HTML content structure.
  ```typescript
  import { renderLecturaPage } from "../generadores/templates/lectura.js";

  describe("renderLecturaPage", () => {
    it("creates full HTML document structure with dark blueprint stylesheet and calculates dates", () => {
      const mockBlocks = [
        {
          blockTitle: "Bloque 1 · Producto",
          items: [
            {
              title: "Test Item",
              url: "https://example.com/test",
              badge: "Must-read",
              time: "60 min",
              extract: "Test extract content"
            }
          ]
        }
      ];
      const html = renderLecturaPage(mockBlocks);
      expect(html).toContain("<!doctype html>");
      expect(html).toContain("danilorojas.design/lectura");
      expect(html).toContain("Bloque 1 · Producto");
      expect(html).toContain("Test Item");
      expect(html).toContain("https://example.com/test");
      expect(html).toContain("class=\"bg-grid\"");
      expect(html).toContain("class=\"crosshair ch-tl\"");
    });
  });
  ```

- [ ] **Step 2: Run test to verify it fails**
  Run: `npx vitest run tests/lectura.test.ts`
  Expected: FAIL with template file not found or import error.

- [ ] **Step 3: Implement lectura.ts template**
  Create `generadores/templates/lectura.ts`:
  ```typescript
  import { LecturaBlock } from "../lib/parse-lectura.js";

  export function renderLecturaPage(blocks: LecturaBlock[]): string {
    // Generate serialized block JSON to inject in client-side script
    const blocksJson = JSON.stringify(blocks);

    return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Ruta de lectura · danilorojas.design</title>
<meta name="robots" content="noindex" />
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&display=swap');

  :root {
    --bg: #030303;
    --surface: #0a0a0a;
    --line: rgba(255, 255, 255, 0.08);
    --line-hover: rgba(255, 255, 255, 0.25);
    --text: #ededed;
    --dim: #8a8a92;
    --accent: #D9663F;
    --accent-hover: #C2542F;
    --ui-grid: rgba(255, 255, 255, 0.04);
    --ui-glow: rgba(255, 255, 255, 0.03);

    --font-body: 'Inter', system-ui, -apple-system, sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
    --font-serif: 'Source Serif 4', serif;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-body);
    line-height: 1.55;
    -webkit-font-smoothing: antialiased;
    padding: 0 20px 120px;
    overflow-x: hidden;
    position: relative;
  }

  .bg-grid {
    position: fixed; inset: 0; z-index: -1;
    background-image: 
      linear-gradient(to right, var(--ui-grid) 1px, transparent 1px), 
      linear-gradient(to bottom, var(--ui-grid) 1px, transparent 1px);
    background-size: 80px 80px; 
    background-position: center top;
    mask-image: radial-gradient(circle at center, black 65%, transparent 100%);
    -webkit-mask-image: radial-gradient(circle at center, black 65%, transparent 100%);
  }

  .wrap { max-width: 720px; margin: 0 auto; z-index: 1; position: relative; }
  
  header {
    padding: 56px 0 24px;
    border-bottom: 1px solid var(--line);
    margin-bottom: 8px;
  }
  .nav-breadcrumb {
    font-family: var(--font-mono);
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: var(--accent);
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .nav-breadcrumb a {
    color: var(--dim);
    text-decoration: none;
    transition: color 0.2s ease;
  }
  .nav-breadcrumb a:hover {
    color: var(--text);
  }
  header h1 { 
    font-family: var(--font-mono);
    font-size: clamp(22px, 3.5vw, 28px); 
    font-weight: 500; 
    letter-spacing: -0.02em; 
    text-transform: uppercase;
    color: var(--text);
  }
  header p { 
    color: var(--dim); 
    margin-top: 10px; 
    font-size: 15px; 
    font-family: var(--font-serif);
    font-style: italic;
  }

  .jump {
    position: sticky; top: 0; z-index: 5;
    background: rgba(3,3,3,0.85); backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    padding: 14px 0; margin-bottom: 16px;
    border-bottom: 1px solid var(--line);
    display: flex; justify-content: space-between; align-items: center;
    flex-wrap: wrap;
  }
  .jump-left { display: flex; align-items: center; gap: 12px; }
  .jump button {
    background: var(--accent); color: #fff; border: 0;
    padding: 8px 16px; border-radius: 4px; 
    font-family: var(--font-mono); font-size: 11px;
    text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;
    cursor: pointer; transition: background 0.2s ease;
  }
  .jump button:hover { background: var(--accent-hover); }
  .jump .progress { 
    font-family: var(--font-mono); color: var(--dim); font-size: 12px; 
  }

  .block-label {
    font-family: var(--font-mono);
    color: var(--dim); font-size: 11px; font-weight: 600;
    text-transform: uppercase; letter-spacing: 0.12em;
    margin: 48px 0 12px;
    display: flex; align-items: center; gap: 10px;
  }
  .block-label::after {
    content: ''; flex: 1; height: 1px; background: var(--line);
  }

  .day {
    border: 1px solid var(--line);
    background: var(--surface);
    border-radius: 0;
    padding: 24px;
    margin: 16px 0;
    position: relative;
    scroll-margin-top: 88px;
    transition: border-color 0.3s ease, background-color 0.3s ease;
  }
  .day:hover {
    border-color: var(--line-hover);
    background: #0d0d0f;
  }
  .day.past { opacity: 0.45; }
  .day.past:hover { opacity: 0.75; }
  .day.today {
    background: #090b11;
    border-color: #3b82f6;
    box-shadow: 0 0 0 1px #3b82f6;
  }

  .crosshair {
    position: absolute; width: 9px; height: 9px; pointer-events: none;
    opacity: 0.25; transition: transform 0.4s cubic-bezier(.4,0,.2,1), opacity 0.4s;
  }
  .day:hover .crosshair {
    transform: scale(1.3) rotate(90deg); opacity: 0.7;
  }
  .crosshair::before, .crosshair::after {
    content: ''; position: absolute; background-color: var(--text);
  }
  .crosshair::before { top: 4px; left: 0; width: 9px; height: 1px; }
  .crosshair::after { top: 0; left: 4px; width: 1px; height: 9px; }
  .ch-tl { top: -5px; left: -5px; }
  .ch-tr { top: -5px; right: -5px; }
  .ch-bl { bottom: -5px; left: -5px; }
  .ch-br { bottom: -5px; right: -5px; }

  .day .meta {
    display: flex; justify-content: space-between; align-items: baseline;
    gap: 12px; flex-wrap: wrap; margin-bottom: 10px;
    font-family: var(--font-mono);
  }
  .day .date { font-size: 12px; color: var(--dim); }
  .day.today .date { color: #60a5fa; font-weight: 600; }
  .day .badge {
    font-size: 10px; color: var(--dim);
    border: 1px solid var(--line); border-radius: 2px; padding: 1px 6px;
    text-transform: uppercase; letter-spacing: 0.05em;
  }
  .day .today-tag {
    font-size: 10px; font-weight: 700; color: #fff;
    background: #3b82f6; border-radius: 2px; padding: 1px 6px;
  }
  .day h2 { font-size: 18px; font-weight: 600; letter-spacing: -0.01em; color: var(--text); }
  
  .day .extract { 
    color: #c5c5cb; font-size: 14px; margin-top: 10px; 
    font-family: var(--font-body);
  }
  .day .extract ul, .day .extract ol {
    list-style: none; padding-left: 0; margin-top: 8px;
  }
  .day .extract li {
    position: relative; padding-left: 14px; margin-bottom: 4px;
  }
  .day .extract li::before {
    content: '·'; position: absolute; left: 0; color: var(--accent); font-weight: bold;
  }
  
  .day .row { display: flex; gap: 16px; align-items: center; margin-top: 16px; flex-wrap: wrap; }
  .day a.read {
    display: inline-block; background: transparent; color: var(--text);
    border: 1px solid var(--line); text-decoration: none; padding: 6px 14px; 
    border-radius: 2px; font-family: var(--font-mono); font-weight: 500; font-size: 12px;
    text-transform: uppercase; letter-spacing: 0.05em; transition: border-color 0.2s, background-color 0.2s;
  }
  .day a.read:hover {
    border-color: var(--text); background: rgba(255, 255, 255, 0.05);
  }
  .day.today a.read {
    background: #1e3a8a; color: #bfdbfe; border-color: rgba(59, 130, 246, 0.5);
  }
  .day.today a.read:hover {
    background: #2563eb; color: #ffffff; border-color: #3b82f6;
  }
  .day .time { color: var(--dim); font-size: 12px; font-family: var(--font-mono); }
  
  footer { 
    color: var(--dim); font-size: 12px; margin-top: 64px; text-align: center; 
    font-family: var(--font-mono); border-top: 1px solid var(--line); padding-top: 24px;
  }
  footer a { color: var(--dim); }
</style>
</head>
<body>
<div class="bg-grid"></div>
<div class="wrap">
  <header>
    <div class="nav-breadcrumb">
      <a href="https://danilorojas.design">danilorojas.design</a>
      <span>/</span>
      <span>lectura</span>
    </div>
    <h1>Ruta de lectura — Blueprint</h1>
    <p>Product Designer senior + ingeniería + AI agents. Un artículo por día, en orden de dependencias cognitivas.</p>
  </header>

  <div class="jump">
    <div class="jump-left">
      <button id="todayBtn">Ir a hoy</button>
      <span class="progress" id="progress"></span>
    </div>
  </div>

  <div id="list"></div>

  <footer>
    Orden basado en <em>ruta_lectura_product_design_ai_agents.md</em>. Empieza el 22 jun 2026, un día por artículo.
  </footer>
</div>

<script>
const BLOCKS = ${blocksJson};

// Inicio: 22 jun 2026 (mediodía local para evitar bordes de zona horaria).
const START = new Date(2026, 5, 22, 12, 0, 0);

const WD = ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"];
const MO = ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];

function fmt(d) {
  return \`\${WD[d.getDay()]} \${d.getDate()} \${MO[d.getMonth()]} \${d.getFullYear()}\`;
}
function startOfDay(d) { return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }

const today = startOfDay(new Date());
const start = startOfDay(START);
const list = document.getElementById("list");

let dayIdx = 0;
let todayEl = null;
let total = 0;

for (const block of BLOCKS) {
  const h = document.createElement("div");
  h.className = "block-label";
  h.textContent = block.blockTitle;
  list.appendChild(h);

  for (const item of block.items) {
    const date = new Date(start.getFullYear(), start.getMonth(), start.getDate() + dayIdx);
    const isToday = date.getTime() === today.getTime();
    const isPast = date.getTime() < today.getTime();
    total++;

    const card = document.createElement("div");
    card.className = "day" + (isToday ? " today" : isPast ? " past" : "");
    if (isToday) { card.id = "today"; todayEl = card; }

    card.innerHTML = \`
      <div class="crosshair ch-tl"></div>
      <div class="crosshair ch-tr"></div>
      <div class="crosshair ch-bl"></div>
      <div class="crosshair ch-br"></div>
      <div class="meta">
        <span class="date">Día \${dayIdx + 1} · \${fmt(date)}</span>
        \${isToday ? '<span class="today-tag">HOY</span>' : \`<span class="badge">\${item.badge}</span>\`}
      </div>
      <h2>\${item.title}</h2>
      <div class="extract">\${item.extract}</div>
      <div class="row">
        <a class="read" href="\${item.url}" target="_blank" rel="noopener">Leer \${isToday ? 'artículo hoy' : ''} →</a>
        <span class="time">\${item.time}\${isToday ? " · " + item.badge : ""}</span>
      </div>\`;
    list.appendChild(card);
    dayIdx++;
  }
}

// Progreso
const dayNum = Math.floor((today - start) / 86400000) + 1;
const prog = document.getElementById("progress");
if (dayNum < 1) prog.textContent = \`Empieza el \${fmt(start)}.\`;
else if (dayNum > total) prog.textContent = \`Ruta completa (\${total} días).\`;
else prog.textContent = \`Hoy: día \${dayNum} de \${total}.\`;

// Ir a hoy
const btn = document.getElementById("todayBtn");
function goToday() {
  if (todayEl) todayEl.scrollIntoView({ behavior: "smooth", block: "center" });
  else window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
}
btn.addEventListener("click", goToday);
window.addEventListener("load", () => setTimeout(goToday, 100));
</script>
</body>
</html>`;
  }
  ```

- [ ] **Step 4: Run tests to verify they pass**
  Run: `npx vitest run tests/lectura.test.ts`
  Expected: PASS

- [ ] **Step 5: Commit**
  ```bash
  git add generadores/templates/lectura.ts tests/lectura.test.ts
  git commit -m "feat(lectura): add reading path dark blueprint template"
  ```

---

### Task 3: Integrate Reading Path into Main Generator

**Files:**
- Modify: `generadores/v11-landing.ts`

**Interfaces:**
- Consumes: `parseLecturaMd` and `renderLecturaPage`
- Produces: Generated `dist/landing-v11/lectura/index.html` compiled from markdown.

- [ ] **Step 1: Write failing integration test**
  Add validation testing to verify build output produces the compiled HTML file under dist folder.
  In `tests/landing.test.ts`, add a check:
  ```typescript
  import { existsSync, readFileSync } from "node:fs";
  import path from "node:path";
  // Inside existing tests
  ```
  Wait, let's look at `tests/landing.test.ts` to see what is tested. Let's write the failing test.
  We will modify `tests/landing.test.ts` to assert that:
  - `dist/landing-v11/lectura/index.html` exists.
  - It contains dynamic elements parsed from `lectura/ruta_lectura_product_design_ai_agents.md`.

- [ ] **Step 2: Run test to verify it fails**
  Run: `npx vitest run tests/landing.test.ts`
  Expected: FAIL (or missing files)

- [ ] **Step 3: Modify v11-landing.ts**
  - Import `parseLecturaMd` and `renderLecturaPage`.
  - In `handTools`, remove `lectura/index.html` from copying (so it doesn't try to copy from the source manually, overwriting our built version).
  - In `main()` function:
    - Read `lectura/ruta_lectura_product_design_ai_agents.md`.
    - Run the parser on it.
    - Run the template renderer.
    - Write it to `dist/landing-v11/lectura/index.html`.
  
  Code to add:
  ```typescript
  import { parseLecturaMd } from "./lib/parse-lectura.js";
  import { renderLecturaPage } from "./templates/lectura.js";

  // In main() before exit:
  const lecturaMdPath = path.join(projectRoot, "lectura", "ruta_lectura_product_design_ai_agents.md");
  const lecturaMd = readFileSync(lecturaMdPath, "utf8");
  const parsedLectura = parseLecturaMd(lecturaMd);
  const lecturaHtml = renderLecturaPage(parsedLectura);
  await emit(path.join("lectura", "index.html"), lecturaHtml);
  ```

- [ ] **Step 4: Run build and verify tests pass**
  Run: `npm run build:landing-v11`
  Run: `npm test`
  Expected: PASS

- [ ] **Step 5: Commit**
  ```bash
  git add generadores/v11-landing.ts tests/landing.test.ts
  git commit -m "feat(lectura): compile reading path dynamically in main landing generator"
  ```

---

### Task 4: Verify Local Build and Deploy to Vercel

**Files:**
- None (deployment step)

- [ ] **Step 1: Check build artifacts**
  Run: `npm run build:all`
  Verify that the `dist/landing-v11/lectura/index.html` contains correctly compiled data.

- [ ] **Step 2: Run typecheck and tests**
  Run: `npm run typecheck`
  Run: `npm test`
  Expected: All checks PASS.

- [ ] **Step 3: Deploy to Vercel**
  Deploy `./dist/landing-v11` folder to the existing Vercel project `dr` as production.
  Run: `vercel deploy --prod --cwd c:/dev/dr-cv/dist/landing-v11`
  *Note:* Vercel CLI will link to the `dr` project if linked in the repository, or upload the static content directly. We deploy only the `dist/landing-v11` directory (the static outputs) which is the production root directory.
  If linking is requested, select:
  - Project: `dr`
  - Scope: User account
  - Directory: `./dist/landing-v11` (or current directory `c:/dev/dr-cv` with output settings).

- [ ] **Step 4: Confirm live URL**
  Visit the live route to confirm the page displays:
  URL: `https://danilorojas.design/lectura` (or the Vercel equivalent).

- [ ] **Step 5: Commit staged changes**
  ```bash
  git add .
  git commit -m "chore(deploy): build and deploy lectura blueprint dark mode"
  ```
