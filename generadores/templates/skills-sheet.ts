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
