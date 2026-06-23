import { LecturaBlock } from "../lib/types.js";

export function renderLecturaPage(blocks: LecturaBlock[]): string {
  // Generate serialized block JSON to inject in client-side script
  const blocksJson = JSON.stringify(blocks);

  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Ruta de lectura · danilorojas.design</title>
<meta name="description" content="Ruta de lectura para Product Designers senior, ingenieros y especialistas en AI agents. Un artículo por día, en orden de dependencias cognitivas." />
<link rel="canonical" href="https://danilorojas.design/lectura" />
<meta name="robots" content="noindex" />
<style>
  @font-face{font-family:"Inter";font-style:normal;font-weight:400;font-display:swap;src:url("/assets/fonts/inter-400.woff2") format("woff2");}
  @font-face{font-family:"Inter";font-style:normal;font-weight:500;font-display:swap;src:url("/assets/fonts/inter-500.woff2") format("woff2");}
  @font-face{font-family:"Inter";font-style:normal;font-weight:600;font-display:swap;src:url("/assets/fonts/inter-600.woff2") format("woff2");}
  @font-face{font-family:"Inter";font-style:normal;font-weight:700;font-display:swap;src:url("/assets/fonts/inter-700.woff2") format("woff2");}
  @font-face{font-family:"JetBrains Mono";font-style:normal;font-weight:400;font-display:swap;src:url("/assets/fonts/jetbrains-mono-400.woff2") format("woff2");}
  @font-face{font-family:"JetBrains Mono";font-style:normal;font-weight:500;font-display:swap;src:url("/assets/fonts/jetbrains-mono-500.woff2") format("woff2");}
  @font-face{font-family:"Source Serif 4";font-style:normal;font-weight:400;font-display:swap;src:url("/assets/fonts/source-serif-4-400.woff2") format("woff2");}
  @font-face{font-family:"Source Serif 4";font-style:normal;font-weight:600;font-display:swap;src:url("/assets/fonts/source-serif-4-600.woff2") format("woff2");}
  @font-face{font-family:"Source Serif 4";font-style:italic;font-weight:400;font-display:swap;src:url("/assets/fonts/source-serif-4-400-italic.woff2") format("woff2");}

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
    white-space: pre-wrap;
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
const dayNum = Math.round((today - start) / 86400000) + 1;
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
