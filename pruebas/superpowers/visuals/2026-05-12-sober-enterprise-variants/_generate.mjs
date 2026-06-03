// One-shot generator for sober-enterprise CV variants.
// Run: node docs/superpowers/visuals/2026-05-12-sober-enterprise-variants/_generate.mjs
//
// Phase 1 (original): V1 Quiet · V2 Industries First · V3 Governance & Scale · V4 Accessibility
//   Emitted at dir root. Kept identical for reference.
//
// Phase 2: V2.1 base (V2 + Danilo feedback) + 12 exploration variants across 4 axes.
//   Emitted inside v2-1/.
//
// Spec: docs/superpowers/specs/2026-05-12-sober-v2-1-and-12-explorations.md

import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ORANGE = "#FF8964";
const ORANGE_DEEP = "#E0674A";
const __dirname = dirname(fileURLToPath(import.meta.url));

// ============================================================================
// TOKENS + SHARED BASE CSS (used by both phase 1 and phase 2)
// ============================================================================

const TOKENS = `
:root {
  --ink:         #111111;
  --ink-body:    #2b2b2b;
  --ink-muted:   #5c5c5c;
  --ink-subtle:  #9a9a9a;

  --line:        #d9d9d9;
  --line-strong: #8a8a8a;
  --line-soft:   #ececec;

  --bg-paper:    #ffffff;
  --bg-chip:     #f5f5f5;

  --accent:      ${ORANGE};
  --accent-deep: ${ORANGE_DEEP};
  --accent-soft: rgba(255,137,100,0.12);

  --font-body:    "Inter", "Helvetica Neue", Arial, sans-serif;
  --font-display: "Inter", "Helvetica Neue", Arial, sans-serif;
  --font-mono:    "JetBrains Mono", "SF Mono", Menlo, Consolas, ui-monospace, monospace;

  --fs-body: 9.5pt;
  --lh-body: 1.5;

  --a4-w: 210mm;
  --a4-h: 297mm;
  --a4-pad: 16mm;
}
`;

// Phase-1 CSS (kept from original — used only by V1–V4 renderers below)
const PHASE1_STYLES = `
*, *::before, *::after { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body {
  font-family: var(--font-body);
  font-size: var(--fs-body);
  line-height: var(--lh-body);
  color: var(--ink-body);
  background: #e8e8e8;
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

h1, h2, h3, h4 { margin: 0; color: var(--ink); font-weight: 600; }

.cv-identity {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: end;
  gap: 10mm;
  padding-bottom: 5mm;
  border-bottom: 1px solid var(--ink);
  margin-bottom: 5mm;
  position: relative;
}
.cv-identity__name { font-family: var(--font-display); font-size: 22pt; letter-spacing: -0.035em; line-height: 1; margin: 0 0 3mm 0; font-weight: 600; color: var(--ink); }
.cv-identity__role { font-family: var(--font-mono); font-size: 8.5pt; letter-spacing: 0.02em; color: var(--ink); margin-bottom: 2mm; }
.cv-identity__meta { font-family: var(--font-mono); font-size: 7.5pt; letter-spacing: 0.04em; color: var(--ink-muted); }
.cv-identity__contact { text-align: right; font-family: var(--font-mono); font-size: 7.5pt; line-height: 1.7; letter-spacing: 0.02em; color: var(--ink-body); }

.cv-summary { margin-bottom: 6mm; grid-column: 2 / -1; }
.cv-summary__eyebrow { font-family: var(--font-mono); font-size: 7pt; letter-spacing: 0.16em; text-transform: uppercase; color: var(--ink-muted); margin-bottom: 3mm; }
.cv-summary__eyebrow::before { content: "// "; color: var(--ink-subtle); }
.cv-summary__thesis { font-family: var(--font-display); font-size: 13pt; letter-spacing: -0.02em; line-height: 1.35; color: var(--ink); margin: 0 0 3mm 0; font-weight: 500; }

.cv-industries { grid-column: 1 / -1; display: flex; flex-wrap: wrap; gap: 3mm 6mm; padding: 4mm 0; margin-bottom: 5mm; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); font-family: var(--font-mono); font-size: 7.5pt; letter-spacing: 0.06em; text-transform: uppercase; color: var(--ink-muted); }
.cv-industries__label { color: var(--accent); font-weight: 600; }
.cv-industries__item { color: var(--ink); }

.cv-skills { grid-column: 1; }
.cv-skills__heading { font-family: var(--font-mono); font-size: 7.5pt; letter-spacing: 0.16em; text-transform: uppercase; color: var(--ink); margin: 0 0 4mm 0; padding-bottom: 2mm; border-bottom: 1px solid var(--ink); font-weight: 600; }
.cv-skills__heading::before { content: "// "; color: var(--ink-subtle); font-weight: 400; }
.cv-skills__group { margin-bottom: 4mm; }
.cv-skills__group-title { font-family: var(--font-mono); font-size: 7pt; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-muted); margin: 0 0 2mm 0; font-weight: 500; }
.cv-skills__list { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 3px; }
.cv-skill { font-family: var(--font-mono); font-size: 7pt; padding: 2px 6px; border-radius: 3px; border: 1px solid var(--line); background: var(--bg-paper); color: var(--ink-body); letter-spacing: 0.01em; }

.cv-clients__heading { font-family: var(--font-mono); font-size: 7.5pt; letter-spacing: 0.16em; text-transform: uppercase; color: var(--ink); margin: 0 0 3mm 0; padding-bottom: 2mm; border-bottom: 1px solid var(--ink); font-weight: 600; }
.cv-clients__heading::before { content: "// "; color: var(--ink-subtle); font-weight: 400; }
.cv-clients__list { list-style: none; margin: 0; padding: 0; }
.cv-clients__item { padding: 1.5mm 0; border-top: 1px solid var(--line-soft); font-size: 8pt; }
.cv-clients__item:first-child { border-top: 0; }
.cv-clients__name { font-weight: 500; color: var(--ink); display: block; }
.cv-clients__ind { font-family: var(--font-mono); font-size: 6.8pt; color: var(--ink-muted); letter-spacing: 0.04em; }

.cv-right { grid-column: 2; }
.cv-section { margin-bottom: 6mm; }
.cv-section__heading { font-family: var(--font-mono); font-size: 7.5pt; letter-spacing: 0.16em; text-transform: uppercase; color: var(--ink); margin: 0 0 3mm 0; padding-bottom: 2mm; border-bottom: 1px solid var(--ink); font-weight: 600; }
.cv-section__heading::before { content: "// "; color: var(--ink-subtle); font-weight: 400; }

.cv-xp { margin-bottom: 4mm; padding-bottom: 3.5mm; border-bottom: 1px solid var(--line-soft); }
.cv-xp:last-child { border-bottom: 0; padding-bottom: 0; }
.cv-xp__header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1mm; }
.cv-xp__company { font-family: var(--font-display); font-size: 10.5pt; font-weight: 600; letter-spacing: -0.015em; color: var(--ink); }
.cv-xp__dates { font-family: var(--font-mono); font-size: 7.5pt; color: var(--ink-muted); letter-spacing: 0.04em; }
.cv-xp__role { font-family: var(--font-mono); font-size: 8pt; color: var(--ink); margin-bottom: 2mm; letter-spacing: 0.01em; }
.cv-xp__description { font-size: 9pt; line-height: 1.5; color: var(--ink-body); margin: 0 0 2mm 0; }
.cv-xp__compliance { font-size: 8.5pt; line-height: 1.4; color: var(--ink-body); margin: 1mm 0 2mm 0; padding-left: 10px; position: relative; }
.cv-xp__compliance::before { content: "▸"; position: absolute; left: 0; color: var(--accent); font-weight: 700; }
.cv-xp__stack { display: flex; flex-wrap: wrap; gap: 3px; }
.cv-xp__stack-pill { font-family: var(--font-mono); font-size: 6.8pt; padding: 1px 5px; border-radius: 3px; background: var(--bg-chip); border: 1px solid var(--line); color: var(--ink-body); letter-spacing: 0.03em; text-transform: lowercase; }

.cv-case { border: 1px solid var(--line); border-radius: 4px; padding: 4mm 5mm; margin-bottom: 3mm; page-break-inside: avoid; background: var(--bg-paper); }
.cv-case__meta { display: flex; justify-content: space-between; align-items: baseline; font-family: var(--font-mono); font-size: 6.8pt; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-muted); margin-bottom: 2mm; }
.cv-case__client { color: var(--ink); font-weight: 500; }
.cv-case__title { font-family: var(--font-display); font-size: 11.5pt; letter-spacing: -0.02em; line-height: 1.25; margin: 0 0 2mm 0; font-weight: 600; color: var(--ink); }
.cv-case__hook { font-size: 9pt; line-height: 1.5; color: var(--ink-body); margin: 0 0 2mm 0; }
.cv-case__bullets { list-style: none; margin: 0 0 3mm 0; padding: 0; }
.cv-case__bullets li { font-size: 8.3pt; line-height: 1.45; padding-left: 12px; position: relative; color: var(--ink-body); margin-bottom: 1mm; }
.cv-case__bullets li::before { content: "—"; position: absolute; left: 0; top: 0; color: var(--ink-subtle); font-family: var(--font-mono); }

.cv-proof { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4mm; margin: 0 0 5mm 0; padding: 3mm 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
.cv-proof__value { font-family: var(--font-display); font-size: 22pt; font-weight: 600; letter-spacing: -0.03em; color: var(--accent); line-height: 1; }
.cv-proof__label { font-family: var(--font-mono); font-size: 6.8pt; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-muted); margin-top: 2mm; }

.cv-inventory { margin-top: 4mm; }
.cv-inventory__heading { font-family: var(--font-mono); font-size: 7.5pt; letter-spacing: 0.16em; text-transform: uppercase; color: var(--ink); margin: 0 0 3mm 0; padding-bottom: 2mm; border-bottom: 1px solid var(--ink); font-weight: 600; }
.cv-inventory__heading::before { content: "// "; color: var(--ink-subtle); font-weight: 400; }
.cv-inventory__grid { display: grid; grid-template-columns: 1fr auto 1fr auto; column-gap: 6mm; row-gap: 0.6mm; }
.cv-inventory__row { display: contents; }
.cv-inventory__skill { font-family: var(--font-body); font-size: 8pt; color: var(--ink); padding: 0.6mm 0; border-top: 1px solid var(--line-soft); }
.cv-inventory__years { font-family: var(--font-mono); font-size: 7.5pt; color: var(--ink-muted); letter-spacing: 0.04em; text-align: right; padding: 0.6mm 0; border-top: 1px solid var(--line-soft); }

.cv-edu__heading { font-family: var(--font-mono); font-size: 7.5pt; letter-spacing: 0.16em; text-transform: uppercase; color: var(--ink); margin: 0 0 3mm 0; padding-bottom: 2mm; border-bottom: 1px solid var(--ink); font-weight: 600; }
.cv-edu__heading::before { content: "// "; color: var(--ink-subtle); font-weight: 400; }
.cv-edu__list { list-style: none; margin: 0; padding: 0; }
.cv-edu__item { display: grid; grid-template-columns: auto 1fr; column-gap: 5mm; padding: 1.8mm 0; border-top: 1px solid var(--line-soft); }
.cv-edu__item:first-child { border-top: 0; }
.cv-edu__year { font-family: var(--font-mono); font-size: 7pt; color: var(--ink-muted); letter-spacing: 0.04em; grid-row: 1 / span 2; }
.cv-edu__name { font-family: var(--font-display); font-size: 9pt; font-weight: 500; color: var(--ink); }
.cv-edu__inst { grid-column: 2; font-family: var(--font-mono); font-size: 7pt; color: var(--ink-muted); }

.cv-references { font-size: 9pt; line-height: 1.55; color: var(--ink-body); margin: 0; }
.cv-references__list { list-style: none; padding: 0; margin: 2mm 0 0; display: grid; gap: 1.5mm; }
.cv-references__list li { font-family: var(--font-mono); font-size: 8pt; color: var(--ink); padding-left: 12px; position: relative; }
.cv-references__list li::before { content: "›"; position: absolute; left: 0; color: var(--accent); }

.variant-v1 .cv-identity { border-bottom-color: var(--ink); }
.variant-v1 .cv-identity::after { content: ""; position: absolute; bottom: -2px; left: 0; width: 28mm; height: 2px; background: var(--accent); }
.variant-v2 .cv-section__heading::before, .variant-v2 .cv-summary__eyebrow::before, .variant-v2 .cv-skills__heading::before, .variant-v2 .cv-clients__heading::before, .variant-v2 .cv-edu__heading::before, .variant-v2 .cv-inventory__heading::before { color: var(--accent); }
.variant-v3 .cv-summary__thesis strong { color: var(--accent); font-weight: 600; }
.variant-v4 .highlight { color: var(--accent); font-weight: 600; }
`;

// ============================================================================
// PHASE 2 — V2.1 base CSS (refined after Danilo's feedback on V2)
// ============================================================================
//
// Key differences vs phase 1:
// - Single-line role with right-aligned "15 years of experience"
// - Case cards: NO border, orange dot before company name
// - Professional Experience role: UPPERCASE mono like case meta
// - Education typography: unified mono treatment
// - Thesis 13pt → 11pt
// - 6mm gap between Enterprise Clients and Education in sidebar
// - In-progress skills group (dashed border pills)
// - Industries band uses full spellings

const P2_STYLES = `
*, *::before, *::after { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body {
  font-family: var(--font-body);
  font-size: var(--fs-body);
  line-height: var(--lh-body);
  color: var(--ink-body);
  background: #e8e8e8;
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

h1, h2, h3, h4 { margin: 0; color: var(--ink); font-weight: 600; }

/* ===== identity: single-line role, right-aligned years ===== */
.cv-identity {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: end;
  gap: 10mm;
  padding-bottom: 5mm;
  border-bottom: 1px solid var(--ink);
  margin-bottom: 5mm;
  position: relative;
}
.cv-identity__name {
  font-family: var(--font-display);
  font-size: 22pt;
  letter-spacing: -0.035em;
  line-height: 1;
  margin: 0 0 3mm 0;
  font-weight: 600;
  color: var(--ink);
}
.cv-identity__roleline {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 10mm;
  font-family: var(--font-mono);
  font-size: 8.5pt;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--ink);
  margin-bottom: 2mm;
}
.cv-identity__role { color: var(--ink); }
.cv-identity__years { color: var(--ink-muted); font-weight: 400; }
.cv-identity__meta {
  font-family: var(--font-mono);
  font-size: 7.5pt;
  letter-spacing: 0.04em;
  color: var(--ink-muted);
}
.cv-identity__contact {
  text-align: right;
  font-family: var(--font-mono);
  font-size: 7.5pt;
  line-height: 1.7;
  letter-spacing: 0.02em;
  color: var(--ink-body);
}

/* ===== industries band (full spellings) ===== */
.cv-industries {
  grid-column: 1 / -1;
  display: flex;
  flex-wrap: wrap;
  gap: 3mm 6mm;
  padding: 4mm 0;
  margin-bottom: 5mm;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  font-family: var(--font-mono);
  font-size: 7.5pt;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ink-muted);
}
.cv-industries__label { color: var(--accent); font-weight: 600; }
.cv-industries__item { color: var(--ink); }

/* ===== summary — thesis smaller, eyebrow matches section heading ===== */
.cv-summary { margin-bottom: 6mm; grid-column: 2 / -1; }
.cv-summary__eyebrow {
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
.cv-summary__eyebrow::before { content: "// "; color: var(--accent); font-weight: 400; }
.cv-summary__thesis {
  font-family: var(--font-display);
  font-size: 11pt;           /* was 13pt */
  letter-spacing: -0.015em;
  line-height: 1.4;
  color: var(--ink);
  margin: 0 0 3mm 0;
  font-weight: 500;
}
.cv-summary__thesis .highlight { color: var(--accent); font-weight: 600; }

/* ===== sidebar skills ===== */
.cv-skills { grid-column: 1; }
.cv-skills__heading {
  font-family: var(--font-mono);
  font-size: 7.5pt;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink);
  margin: 0 0 4mm 0;
  padding-bottom: 2mm;
  border-bottom: 1px solid var(--ink);
  font-weight: 600;
}
.cv-skills__heading::before { content: "// "; color: var(--accent); font-weight: 400; }
.cv-skills__group { margin-bottom: 4mm; }
.cv-skills__group-title {
  font-family: var(--font-mono);
  font-size: 7pt;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-muted);
  margin: 0 0 2mm 0;
  font-weight: 500;
}
.cv-skills__list {
  list-style: none; margin: 0; padding: 0;
  display: flex; flex-wrap: wrap; gap: 3px;
}
.cv-skill {
  font-family: var(--font-mono);
  font-size: 7pt;
  padding: 2px 6px;
  border-radius: 3px;
  border: 1px solid var(--line);
  background: var(--bg-paper);
  color: var(--ink-body);
  letter-spacing: 0.01em;
}
.cv-skill--learning {
  border-style: dashed;
  border-color: var(--line-strong);
  color: var(--ink-muted);
}

/* ===== sidebar clients — with breathing room before education ===== */
.cv-clients { margin-top: 4mm; margin-bottom: 6mm; }
.cv-clients__heading {
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
.cv-clients__heading::before { content: "// "; color: var(--accent); font-weight: 400; }
.cv-clients__list { list-style: none; margin: 0; padding: 0; }
.cv-clients__item {
  padding: 1.5mm 0;
  border-top: 1px solid var(--line-soft);
  font-size: 8pt;
}
.cv-clients__item:first-child { border-top: 0; }
.cv-clients__name {
  font-family: var(--font-mono);
  font-size: 7.5pt;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  font-weight: 500;
  color: var(--ink);
  display: block;
}
.cv-clients__ind {
  font-family: var(--font-mono);
  font-size: 6.5pt;
  color: var(--ink-muted);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

/* ===== main column ===== */
.cv-right { grid-column: 2; }
.cv-section { margin-bottom: 6mm; }
.cv-section__heading {
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
.cv-section__heading::before { content: "// "; color: var(--accent); font-weight: 400; }

/* ===== professional experience — role UPPERCASE mono ===== */
.cv-xp {
  margin-bottom: 4mm;
  padding-bottom: 3.5mm;
  border-bottom: 1px solid var(--line-soft);
}
.cv-xp:last-child { border-bottom: 0; padding-bottom: 0; }
.cv-xp__header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 1mm;
}
.cv-xp__company {
  font-family: var(--font-display);
  font-size: 10.5pt;
  font-weight: 600;
  letter-spacing: -0.015em;
  color: var(--ink);
  display: flex;
  align-items: center;
  gap: 3mm;
}
.cv-xp__dates {
  font-family: var(--font-mono);
  font-size: 6.8pt;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-muted);
}
.cv-xp__role {
  font-family: var(--font-mono);
  font-size: 6.8pt;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink);
  margin-bottom: 2mm;
  font-weight: 500;
}
.cv-xp__description {
  font-size: 9pt;
  line-height: 1.5;
  color: var(--ink-body);
  margin: 0 0 2mm 0;
}
.cv-xp__compliance {
  font-size: 8.5pt;
  line-height: 1.4;
  color: var(--ink-body);
  margin: 1mm 0 2mm 0;
  padding-left: 10px;
  position: relative;
}
.cv-xp__compliance::before {
  content: "▸";
  position: absolute; left: 0;
  color: var(--accent);
  font-weight: 700;
}
.cv-xp__stack { display: flex; flex-wrap: wrap; gap: 3px; }
.cv-xp__stack-pill {
  font-family: var(--font-mono);
  font-size: 6.8pt;
  padding: 1px 5px;
  border-radius: 3px;
  background: var(--bg-chip);
  border: 1px solid var(--line);
  color: var(--ink-body);
  letter-spacing: 0.03em;
  text-transform: lowercase;
}

/* ===== case cards: NO border, orange dot beside company ===== */
.cv-case {
  padding: 0 0 4mm 0;
  margin-bottom: 4mm;
  border-bottom: 1px solid var(--line-soft);
  page-break-inside: avoid;
  background: transparent;
}
.cv-case:last-child { border-bottom: 0; }
.cv-case__meta {
  display: flex; justify-content: space-between; align-items: baseline;
  font-family: var(--font-mono);
  font-size: 6.8pt;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-muted);
  margin-bottom: 2mm;
}
.cv-case__client {
  color: var(--ink);
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 2mm;
}
.cv-case__dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  flex-shrink: 0;
}
.cv-case__title {
  font-family: var(--font-display);
  font-size: 11.5pt;
  letter-spacing: -0.02em;
  line-height: 1.25;
  margin: 0 0 2mm 0;
  font-weight: 600;
  color: var(--ink);
}
.cv-case__hook {
  font-size: 9pt;
  line-height: 1.5;
  color: var(--ink-body);
  margin: 0 0 2mm 0;
}
.cv-case__bullets {
  list-style: none; margin: 0 0 2mm 0; padding: 0;
}
.cv-case__bullets li {
  font-size: 8.3pt;
  line-height: 1.45;
  padding-left: 12px;
  position: relative;
  color: var(--ink-body);
  margin-bottom: 1mm;
}
.cv-case__bullets li::before {
  content: "—";
  position: absolute; left: 0; top: 0;
  color: var(--ink-subtle);
  font-family: var(--font-mono);
}

/* ===== proof numbers (axis variants) ===== */
.cv-proof {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4mm;
  margin: 0 0 6mm 0;
  padding: 4mm 0;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}
.cv-proof__value {
  font-family: var(--font-display);
  font-size: 22pt;
  font-weight: 600;
  letter-spacing: -0.03em;
  color: var(--accent);
  line-height: 1;
}
.cv-proof__label {
  font-family: var(--font-mono);
  font-size: 6.8pt;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-muted);
  margin-top: 2mm;
}

/* ===== education — unified mono typography ===== */
.cv-edu__heading {
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
.cv-edu__heading::before { content: "// "; color: var(--accent); font-weight: 400; }
.cv-edu__list { list-style: none; margin: 0; padding: 0; }
.cv-edu__item {
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 5mm;
  padding: 2mm 0;
  border-top: 1px solid var(--line-soft);
}
.cv-edu__item:first-child { border-top: 0; }
.cv-edu__year {
  font-family: var(--font-mono);
  font-size: 6.8pt;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-muted);
  grid-row: 1 / span 2;
  padding-top: 1px;
}
.cv-edu__name {
  font-family: var(--font-mono);
  font-size: 7.5pt;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  font-weight: 500;
  color: var(--ink);
}
.cv-edu__inst {
  grid-column: 2;
  font-family: var(--font-mono);
  font-size: 6.5pt;
  letter-spacing: 0.06em;
  color: var(--ink-muted);
  text-transform: uppercase;
}

/* ===== references ===== */
.cv-references {
  font-family: var(--font-mono);
  font-size: 7.5pt;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  line-height: 1.55;
  color: var(--ink-body);
  margin: 0;
}
.cv-references__list {
  list-style: none; padding: 0; margin: 2mm 0 0;
  display: grid; gap: 1.5mm;
}
.cv-references__list li {
  font-family: var(--font-mono);
  font-size: 7.5pt;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ink);
  padding-left: 12px;
  position: relative;
}
.cv-references__list li::before {
  content: "▸";
  position: absolute; left: 0;
  color: var(--accent);
  font-size: 7.5pt;
}

/* ===== inventory (phase 2 — only V3-carrier variants) ===== */
.cv-inventory { margin-top: 4mm; }
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
.cv-inventory__heading::before { content: "// "; color: var(--accent); font-weight: 400; }
.cv-inventory__grid {
  display: grid;
  grid-template-columns: 1fr auto 1fr auto;
  column-gap: 6mm;
  row-gap: 0.6mm;
}
.cv-inventory__row { display: contents; }
.cv-inventory__skill {
  font-family: var(--font-body);
  font-size: 8pt;
  color: var(--ink);
  padding: 0.6mm 0;
  border-top: 1px solid var(--line-soft);
}
.cv-inventory__years {
  font-family: var(--font-mono);
  font-size: 7.5pt;
  color: var(--ink-muted);
  letter-spacing: 0.04em;
  text-align: right;
  padding: 0.6mm 0;
  border-top: 1px solid var(--line-soft);
}

/* ===== AXIS-3 orange intensity modifiers ===== */
.orange-quiet .cv-case__dot,
.orange-quiet .cv-references__list li::before,
.orange-quiet .cv-summary__eyebrow::before,
.orange-quiet .cv-section__heading::before,
.orange-quiet .cv-skills__heading::before,
.orange-quiet .cv-clients__heading::before,
.orange-quiet .cv-edu__heading::before,
.orange-quiet .cv-industries__label {
  color: var(--ink-subtle) !important;
  background: var(--ink-subtle) !important;
}
.orange-quiet .cv-identity::after {
  content: "";
  position: absolute;
  bottom: -2px; left: 0;
  width: 28mm; height: 2px;
  background: var(--accent);
}
.orange-quiet .cv-case__dot { visibility: hidden; }

.orange-assertive .cv-case__dot { width: 8px; height: 8px; }
.orange-assertive .cv-case__bullets li::before { color: var(--accent); }
.orange-assertive .cv-industries__label { font-weight: 700; letter-spacing: 0.1em; }
.orange-assertive .cv-xp__stack-pill:first-child { border-color: var(--accent); color: var(--accent); }

/* ===== compliance bullets (content-compliance variant) ===== */
`;

// ============================================================================
// SHARED DATA
// ============================================================================

const IDENTITY = {
  name: "Danilo Rojas",
  location: "Quito, Ecuador · EN professional · ES native",
  contact: [
    "danilorojas@hotmail.com",
    "linkedin.com/in/mdanilorojas",
    "+593 987 655 379",
  ],
};

// Industries actually represented by Danilo's client history:
//   - Department of Defense / US Army (via Booz Allen Hamilton, 2022–2026)
//   - Banking (Banco Pichincha)
//   - Pharmaceuticals (Merck, Quifatex)
//   - Consumer Goods (Mondelēz, Grupo Superior, Azzorti, Flamingo)
// Government is redundant with DoD; Energy was never a real client — both removed.
const INDUSTRIES_FULL = [
  "Department of Defense",
  "Banking",
  "Pharmaceuticals",
  "Consumer Goods",
];

const INDUSTRIES_PHASE1 = [
  "Defense",
  "Banking",
  "Pharmaceuticals",
  "Consumer goods",
  "Government",
  "Energy (adjacent via DoD)",
];

const CLIENTS = [
  { name: "Booz Allen Hamilton", ind: "DoD · Army" },
  { name: "Banco Pichincha", ind: "Banking" },
  { name: "Merck", ind: "Pharmaceuticals" },
  { name: "Mondelēz Latin America", ind: "Consumer Goods" },
  { name: "Quifatex", ind: "Pharma Distribution" },
  { name: "Grupo Superior", ind: "Consumer Goods" },
];

const SKILLS_GROUPS = [
  {
    title: "Design Systems",
    skills: ["W3C design tokens", "Figma · Style Dictionary", "Multi-theme (light + dark)", "Distributed DS governance", "Named anti-patterns"],
  },
  {
    title: "Accessibility",
    skills: ["WCAG 2.1/2.2 AA", "Section 508", "ADA compliance", "A11y audits in tokens", "Screen-reader flows"],
  },
  {
    title: "Frontend Engineering",
    skills: ["HTML · CSS", "TypeScript · React", "SharePoint SPA", "CSS Houdini", "Handoff to senior eng"],
  },
  {
    title: "Process",
    skills: ["RICE roadmapping", "Non-goals discipline", "Cross-team consulting", "Documentation", "Agile methodologies"],
  },
];

// New in phase 2 — learning-edge skills for this archetype
const IN_PROGRESS_SKILLS = {
  title: "In progress",
  skills: [
    "SAP / Oracle UX patterns",
    "Power BI dashboards",
    "Offline-first field ops",
    "Azure M365 depth",
    "Agentic workflows at enterprise scale",
  ],
  learning: true,
};

const EXPERIENCE_PHASE1 = [
  {
    company: "Booz Allen Hamilton",
    role: "Design-engineering consultant",
    dates: "2024 — Present",
    desc: "Design-engineering across the Trusted Environments umbrella at BAH serving DoD and US Army product teams. Built two parallel design systems including a dark-first system with accessibility audit encoded directly in the tokens. Delivered a SharePoint-engineered single-page application. Cross-team consulting with senior engineering and product leads.",
    compliance: "WCAG 2.1 AA tokens audited with senior engineering. SharePoint/M365 stack. Documented handoff to in-house dev teams.",
    stack: ["SharePoint SPA", "Design tokens", "WCAG 2.1", "TypeScript", "DoD"],
  },
  {
    company: "Xentinels DesignOps",
    role: "Product Manager / UX-UI Designer",
    dates: "2016 — Present",
    desc: "Formalized a team within Central Design to deliver a distributed-yet-centralized Design System. Defined roadmap, roles, responsibilities, and ways of working. Built a contribution culture to scale. Delivered a unified set of guidelines, tokens, and accessible components for enterprise clients.",
    compliance: "Governance model for distributed contributors. Accessibility baked into tokens. Clients include Merck, Mondelēz, Banco Pichincha.",
    stack: ["Design system", "Figma", "Tokens", "Governance", "Enterprise"],
  },
  {
    company: "Arpatel Cia. Ltda.",
    role: "Co-Founder · Product Manager",
    dates: "2014 — 2017",
    desc: "Strategic long-term vision for Arpatel's products. Built the corporate website, CRM templates, and order-management flows. Provided design support for a Retail POS experience (alpha + beta).",
    stack: ["Retail POS", "CRM", "Prototyping", "Strategy"],
  },
  {
    company: "Tecniequipos S.A.",
    role: "Senior Visual Designer / Developer",
    dates: "2013 — 2015",
    desc: "Developed a proprietary event platform. Managed e-commerce, reports, and business-system administration. Delivered specific requirements in PHP, JavaScript, HTML, CSS, and MariaDB.",
    stack: ["PHP", "JavaScript", "MariaDB", "HTML · CSS"],
  },
];

// Phase 2 — BAH corrected to 2022—Present
const EXPERIENCE_P2 = [
  { ...EXPERIENCE_PHASE1[0], dates: "2022 — Present" },
  EXPERIENCE_PHASE1[1],
  EXPERIENCE_PHASE1[2],
  EXPERIENCE_PHASE1[3],
];

const EDUCATION = [
  { year: "2015", name: "B.Sc. Systems Engineering", inst: "Escuela Politécnica Nacional · Quito" },
  { year: "2021", name: "Google UX Design Certificate", inst: "Coursera" },
  { year: "2020", name: "Design Thinking", inst: "IBM" },
];

const CASE_BAH_P1 = {
  client: "Booz Allen Hamilton · Trusted Environments",
  years: "2024 — 2026",
  title: "Multi-theme design system for DoD / Army product teams",
  hook: "Delivered two parallel design systems on the Trusted Environments umbrella — one dark-first with WCAG 2.1 AA audited inside the token set, one packaged as a reusable skill for downstream teams. Both deployed against SharePoint-engineered single-page applications.",
  bullets: [
    "17 components, versioned, documented with hard constraints, soft guidelines, and named anti-patterns",
    "Accessibility audit encoded in tokens so contrast and focus compliance survives component composition",
    "Handoff to senior engineering teams in DoD programs · cross-workstream collaboration with product and research",
    "SharePoint SPA engineering — enterprise stack, not hipster tooling",
  ],
};

// Phase 2 — BAH dates corrected to 2022–2026
const CASE_BAH_P2 = { ...CASE_BAH_P1, years: "2022 — 2026" };

const CASE_DS = {
  client: "Xentinels DesignOps · enterprise clients",
  years: "2016 — Present",
  title: "Distributed-yet-centralized Design System at enterprise scale",
  hook: "Formalized a team within Central Design to deliver a governed DS consumed by distributed product teams across multiple enterprise clients including Merck, Mondelēz, Banco Pichincha, and Quifatex.",
  bullets: [
    "Unified tokens, guidelines, and accessible components across 8+ client orgs over 10 years",
    "Contribution culture for distributed contributors — defined roles, RACI, and intake process",
    "Cross-industry: banking, pharma, consumer goods, pharma distribution",
    "Governance model proven at scale — consistency without central bottleneck",
  ],
};

const CASE_BANCO = {
  client: "Banco Pichincha · Digital Products",
  years: "2017 — 2021",
  title: "Regulated-banking UX · accessibility + consistency at consumer scale",
  hook: "Digital product design for a tier-1 Ecuadorian bank — consumer-facing applications operating under banking regulation and accessibility requirements. Design system contributions consumed across multiple digital surfaces.",
  bullets: [
    "Compliance-aware UX patterns for regulated financial flows",
    "Accessibility considerations integrated with engineering handoff",
    "Component library contributions consumed across multiple product teams",
  ],
};

const INVENTORY_ITEMS = [
  ["UX/UI", "15+"], ["Design Systems", "10+"], ["HTML", "10+"], ["CSS", "10+"],
  ["WCAG 2.1", "8+"], ["Figma", "8+"], ["JavaScript", "10+"], ["Section 508", "6+"],
  ["Git / GitHub", "5+"], ["SharePoint", "2+"], ["React", "4+"], ["TypeScript", "3+"],
  ["Agile methodologies", "10+"], ["Design tokens", "6+"], ["Style Dictionary", "5+"],
  ["Documentation", "15+"], ["Handoff to eng", "10+"], ["Cross-team consulting", "8+"],
  ["SEO", "4+"], ["Illustrator", "4+"], ["Photoshop", "3+"], ["WordPress", "4+"],
  ["Leadership", "10+"], ["Planning", "10+"], ["Unit Testing", "2+"], ["REST API", "3+"],
];

// ============================================================================
// PHASE 1 renderers (V1–V4 — kept identical)
// ============================================================================

function head(title) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${title}</title>
<style>
${TOKENS}
${PHASE1_STYLES}
</style>
</head>
<body>`;
}

function p1_renderIdentity(roleLine) {
  return `
<header class="cv-identity">
  <div>
    <h1 class="cv-identity__name">Danilo Rojas</h1>
    <div class="cv-identity__role">${roleLine}</div>
    <div class="cv-identity__meta">${IDENTITY.location}</div>
  </div>
  <div class="cv-identity__contact">
    ${IDENTITY.contact.join("<br>")}
  </div>
</header>`;
}

function p1_renderIndustriesBand() {
  return `
<div class="cv-industries">
  <span class="cv-industries__label">// industries served</span>
  ${INDUSTRIES_PHASE1.map((i) => `<span class="cv-industries__item">${i}</span>`).join("")}
</div>`;
}

function p1_renderSkillsSidebar() {
  return `
<aside class="cv-skills">
  <h3 class="cv-skills__heading">Skills</h3>
  ${SKILLS_GROUPS.map((g) => `
    <div class="cv-skills__group">
      <h4 class="cv-skills__group-title">${g.title}</h4>
      <ul class="cv-skills__list">
        ${g.skills.map((s) => `<li class="cv-skill">${s}</li>`).join("")}
      </ul>
    </div>`).join("")}
</aside>`;
}

function p1_renderClientsSidebar() {
  return `
<section class="cv-clients">
  <h3 class="cv-clients__heading">Enterprise clients</h3>
  <ul class="cv-clients__list">
    ${CLIENTS.map((c) => `
    <li class="cv-clients__item">
      <span class="cv-clients__name">${c.name}</span>
      <span class="cv-clients__ind">${c.ind}</span>
    </li>`).join("")}
  </ul>
</section>`;
}

function p1_renderExperience(items, opts = {}) {
  return items.map((x) => `
<div class="cv-xp">
  <div class="cv-xp__header">
    <div class="cv-xp__company">${x.company}</div>
    <div class="cv-xp__dates">${x.dates}</div>
  </div>
  <div class="cv-xp__role">${x.role}</div>
  <p class="cv-xp__description">${x.desc}</p>
  ${opts.showCompliance && x.compliance ? `<p class="cv-xp__compliance">${x.compliance}</p>` : ""}
  <div class="cv-xp__stack">${x.stack.map((s) => `<span class="cv-xp__stack-pill">${s}</span>`).join(" ")}</div>
</div>`).join("");
}

function p1_renderCase(c) {
  return `
<article class="cv-case">
  <header class="cv-case__meta">
    <span class="cv-case__client">${c.client}</span>
    <span>${c.years}</span>
  </header>
  <h3 class="cv-case__title">${c.title}</h3>
  <p class="cv-case__hook">${c.hook}</p>
  <ul class="cv-case__bullets">
    ${c.bullets.map((b) => `<li>${b}</li>`).join("")}
  </ul>
</article>`;
}

function p1_renderEducation() {
  return `
<section class="cv-edu">
  <h3 class="cv-edu__heading">Education</h3>
  <ul class="cv-edu__list">
    ${EDUCATION.map((e) => `
    <li class="cv-edu__item">
      <span class="cv-edu__year">${e.year}</span>
      <span class="cv-edu__name">${e.name}</span>
      <span class="cv-edu__inst">${e.inst}</span>
    </li>`).join("")}
  </ul>
</section>`;
}

function p1_renderReferences() {
  return `
<section class="cv-section">
  <h3 class="cv-section__heading">References</h3>
  <p class="cv-references">Senior references available on request from:</p>
  <ul class="cv-references__list">
    <li>Booz Allen Hamilton · Design Engineering</li>
    <li>Banco Pichincha · Digital Products</li>
    <li>Mondelēz Latin America · DesignOps</li>
    <li>Xentinels · DesignOps Lead</li>
  </ul>
</section>`;
}

function p1_renderProofBand() {
  return `
<div class="cv-proof">
  <div class="cv-proof__item">
    <div class="cv-proof__value">15+</div>
    <div class="cv-proof__label">Years delivering product</div>
  </div>
  <div class="cv-proof__item">
    <div class="cv-proof__value">8+</div>
    <div class="cv-proof__label">Enterprise clients · regulated industries</div>
  </div>
  <div class="cv-proof__item">
    <div class="cv-proof__value">10</div>
    <div class="cv-proof__label">Years design system governance</div>
  </div>
</div>`;
}

function p1_renderInventory() {
  return `
<section class="cv-inventory">
  <h3 class="cv-inventory__heading">Skills inventory</h3>
  <div class="cv-inventory__grid">
    ${INVENTORY_ITEMS.map(([s, y]) => `
      <div class="cv-inventory__row">
        <span class="cv-inventory__skill">${s}</span>
        <span class="cv-inventory__years">${y}</span>
      </div>`).join("")}
  </div>
</section>`;
}

function renderV1() {
  const title = "Danilo Rojas — CV · V1 Quiet Enterprise";
  return `${head(title)}
<article class="cv-page variant-v1">
  ${p1_renderIdentity("Senior Product Designer · Design Systems · 15+ years")}
  ${p1_renderSkillsSidebar()}
  <div class="cv-right">
    <section class="cv-section">
      <h3 class="cv-section__heading">Selected work</h3>
      ${p1_renderCase(CASE_BAH_P1)}
      ${p1_renderCase(CASE_DS)}
    </section>
    <section class="cv-section">
      <h3 class="cv-section__heading">Professional experience</h3>
      ${p1_renderExperience(EXPERIENCE_PHASE1.slice(0, 2))}
    </section>
  </div>
</article>
<article class="cv-page variant-v1">
  <aside>
    ${p1_renderClientsSidebar()}
    ${p1_renderEducation()}
  </aside>
  <div class="cv-right">
    <section class="cv-section">
      <h3 class="cv-section__heading">Past experience</h3>
      ${p1_renderExperience(EXPERIENCE_PHASE1.slice(2))}
    </section>
    ${p1_renderReferences()}
  </div>
</article>
</body></html>`;
}

function renderV2() {
  const title = "Danilo Rojas — CV · V2 Industries First";
  return `${head(title)}
<article class="cv-page variant-v2">
  ${p1_renderIdentity("Senior Product Designer · Design Systems · Accessibility · 15+ years")}
  ${p1_renderIndustriesBand()}
  ${p1_renderSkillsSidebar()}
  <div class="cv-right">
    <section class="cv-summary">
      <div class="cv-summary__eyebrow">Professional summary</div>
      <h2 class="cv-summary__thesis">Fifteen years delivering design in regulated industries — defense, banking, pharmaceuticals, consumer goods. Design systems as governance. Accessibility as compliance. Documentation as handoff discipline.</h2>
    </section>
    <section class="cv-section">
      <h3 class="cv-section__heading">Selected work</h3>
      ${p1_renderCase(CASE_BAH_P1)}
      ${p1_renderCase(CASE_BANCO)}
    </section>
    <section class="cv-section">
      <h3 class="cv-section__heading">Professional experience</h3>
      ${p1_renderExperience(EXPERIENCE_PHASE1.slice(0, 2))}
    </section>
  </div>
</article>
<article class="cv-page variant-v2">
  <aside>
    ${p1_renderClientsSidebar()}
    ${p1_renderEducation()}
  </aside>
  <div class="cv-right">
    <section class="cv-section">
      <h3 class="cv-section__heading">Past experience</h3>
      ${p1_renderExperience(EXPERIENCE_PHASE1.slice(2))}
    </section>
    ${p1_renderReferences()}
  </div>
</article>
</body></html>`;
}

function renderV3() {
  const title = "Danilo Rojas — CV · V3 Governance & Scale";
  return `${head(title)}
<article class="cv-page variant-v3">
  ${p1_renderIdentity("Senior Product Designer · Design Systems Lead · 15+ years")}
  ${p1_renderSkillsSidebar()}
  <div class="cv-right">
    <section class="cv-summary">
      <div class="cv-summary__eyebrow">Professional summary</div>
      <h2 class="cv-summary__thesis">Ten years building and governing <strong>distributed design systems at enterprise scale</strong>. Fifteen years shipping product design across defense, banking, pharmaceuticals, and consumer goods. Consistency as a governance problem, not a style problem.</h2>
    </section>
    ${p1_renderProofBand()}
    <section class="cv-section">
      <h3 class="cv-section__heading">Selected work</h3>
      ${p1_renderCase(CASE_BAH_P1)}
      ${p1_renderCase(CASE_DS)}
    </section>
    <section class="cv-section">
      <h3 class="cv-section__heading">Professional experience</h3>
      ${p1_renderExperience(EXPERIENCE_PHASE1.slice(0, 2))}
    </section>
  </div>
</article>
<article class="cv-page variant-v3">
  <aside>
    ${p1_renderClientsSidebar()}
    ${p1_renderEducation()}
  </aside>
  <div class="cv-right">
    <section class="cv-section">
      <h3 class="cv-section__heading">Past experience</h3>
      ${p1_renderExperience(EXPERIENCE_PHASE1.slice(2))}
    </section>
    ${p1_renderReferences()}
    ${p1_renderInventory()}
  </div>
</article>
</body></html>`;
}

function renderV4() {
  const title = "Danilo Rojas — CV · V4 Accessibility Compliance";
  return `${head(title)}
<article class="cv-page variant-v4">
  ${p1_renderIdentity("Senior Product Designer · Accessibility · Design Systems · 15+ years")}
  ${p1_renderSkillsSidebar()}
  <div class="cv-right">
    <section class="cv-summary">
      <div class="cv-summary__eyebrow">Professional summary</div>
      <h2 class="cv-summary__thesis">Fifteen years of product design where <span class="highlight">accessibility is compliance</span>, not decoration. WCAG 2.1 AA and Section 508 audited inside design tokens. Handoff to senior engineering teams with documented governance. Regulated industries: defense, banking, pharmaceuticals.</h2>
    </section>
    <section class="cv-section">
      <h3 class="cv-section__heading">Selected work</h3>
      ${p1_renderCase(CASE_BAH_P1)}
      ${p1_renderCase(CASE_BANCO)}
    </section>
    <section class="cv-section">
      <h3 class="cv-section__heading">Professional experience</h3>
      ${p1_renderExperience(EXPERIENCE_PHASE1.slice(0, 2), { showCompliance: true })}
    </section>
  </div>
</article>
<article class="cv-page variant-v4">
  <aside>
    ${p1_renderClientsSidebar()}
    ${p1_renderEducation()}
  </aside>
  <div class="cv-right">
    <section class="cv-section">
      <h3 class="cv-section__heading">Past experience</h3>
      ${p1_renderExperience(EXPERIENCE_PHASE1.slice(2))}
    </section>
    ${p1_renderReferences()}
  </div>
</article>
</body></html>`;
}

// ============================================================================
// PHASE 2 renderers
// ============================================================================

function p2_head(title, extraBodyClass = "") {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${title}</title>
<style>
${TOKENS}
${P2_STYLES}
</style>
</head>
<body class="${extraBodyClass}">`;
}

function p2_renderIdentity({ role, years = "15 years of experience" }) {
  return `
<header class="cv-identity">
  <div>
    <h1 class="cv-identity__name">Danilo Rojas</h1>
    <div class="cv-identity__roleline">
      <span class="cv-identity__role">${role}</span>
      <span class="cv-identity__years">${years}</span>
    </div>
    <div class="cv-identity__meta">${IDENTITY.location}</div>
  </div>
  <div class="cv-identity__contact">
    ${IDENTITY.contact.join("<br>")}
  </div>
</header>`;
}

function p2_renderIndustriesBand() {
  return `
<div class="cv-industries">
  <span class="cv-industries__label">// industries served</span>
  ${INDUSTRIES_FULL.map((i) => `<span class="cv-industries__item">${i}</span>`).join("")}
</div>`;
}

function p2_renderSkillsSidebar({ withInProgress = true } = {}) {
  const groups = withInProgress ? [...SKILLS_GROUPS, IN_PROGRESS_SKILLS] : SKILLS_GROUPS;
  return `
<aside class="cv-skills">
  <h3 class="cv-skills__heading">Skills</h3>
  ${groups.map((g) => `
    <div class="cv-skills__group">
      <h4 class="cv-skills__group-title">${g.title}</h4>
      <ul class="cv-skills__list">
        ${g.skills.map((s) => `<li class="cv-skill ${g.learning ? "cv-skill--learning" : ""}">${s}</li>`).join("")}
      </ul>
    </div>`).join("")}
</aside>`;
}

function p2_renderClientsSidebar() {
  return `
<section class="cv-clients">
  <h3 class="cv-clients__heading">Enterprise clients</h3>
  <ul class="cv-clients__list">
    ${CLIENTS.map((c) => `
    <li class="cv-clients__item">
      <span class="cv-clients__name">${c.name}</span>
      <span class="cv-clients__ind">${c.ind}</span>
    </li>`).join("")}
  </ul>
</section>`;
}

function p2_renderExperience(items, opts = {}) {
  return items.map((x) => `
<div class="cv-xp">
  <div class="cv-xp__header">
    <div class="cv-xp__company">${x.company}</div>
    <div class="cv-xp__dates">${x.dates}</div>
  </div>
  <div class="cv-xp__role">${x.role}</div>
  <p class="cv-xp__description">${x.desc}</p>
  ${opts.showCompliance && x.compliance ? `<p class="cv-xp__compliance">${x.compliance}</p>` : ""}
  <div class="cv-xp__stack">${x.stack.map((s) => `<span class="cv-xp__stack-pill">${s}</span>`).join(" ")}</div>
</div>`).join("");
}

function p2_renderCase(c) {
  return `
<article class="cv-case">
  <header class="cv-case__meta">
    <span class="cv-case__client"><span class="cv-case__dot" aria-hidden="true"></span>${c.client}</span>
    <span>${c.years}</span>
  </header>
  <h3 class="cv-case__title">${c.title}</h3>
  <p class="cv-case__hook">${c.hook}</p>
  <ul class="cv-case__bullets">
    ${c.bullets.map((b) => `<li>${b}</li>`).join("")}
  </ul>
</article>`;
}

function p2_renderEducation() {
  return `
<section class="cv-edu">
  <h3 class="cv-edu__heading">Education</h3>
  <ul class="cv-edu__list">
    ${EDUCATION.map((e) => `
    <li class="cv-edu__item">
      <span class="cv-edu__year">${e.year}</span>
      <span class="cv-edu__name">${e.name}</span>
      <span class="cv-edu__inst">${e.inst}</span>
    </li>`).join("")}
  </ul>
</section>`;
}

function p2_renderReferences() {
  return `
<section class="cv-section">
  <h3 class="cv-section__heading">References</h3>
  <p class="cv-references">Senior references available on request from:</p>
  <ul class="cv-references__list">
    <li>Booz Allen Hamilton · Design Engineering</li>
    <li>Banco Pichincha · Digital Products</li>
    <li>Mondelēz Latin America · DesignOps</li>
    <li>Xentinels · DesignOps Lead</li>
  </ul>
</section>`;
}

function p2_renderProofBand() {
  return `
<div class="cv-proof">
  <div class="cv-proof__item">
    <div class="cv-proof__value">15+</div>
    <div class="cv-proof__label">Years delivering product</div>
  </div>
  <div class="cv-proof__item">
    <div class="cv-proof__value">8+</div>
    <div class="cv-proof__label">Enterprise clients · regulated industries</div>
  </div>
  <div class="cv-proof__item">
    <div class="cv-proof__value">10</div>
    <div class="cv-proof__label">Years design system governance</div>
  </div>
</div>`;
}

function p2_renderInventory() {
  return `
<section class="cv-inventory">
  <h3 class="cv-inventory__heading">Skills inventory</h3>
  <div class="cv-inventory__grid">
    ${INVENTORY_ITEMS.map(([s, y]) => `
      <div class="cv-inventory__row">
        <span class="cv-inventory__skill">${s}</span>
        <span class="cv-inventory__years">${y}</span>
      </div>`).join("")}
  </div>
</section>`;
}

// ============================================================================
// PHASE 2 variant configs
// ============================================================================

// V2.1 base — all Danilo feedback applied
function renderV2_1({
  title = "V2.1 Base (refined Industries First)",
  role = "Senior Product Designer · Agentic Design",
  thesis = "Fifteen years delivering design in regulated industries — defense, banking, pharmaceuticals, consumer goods. Design systems as governance. Accessibility as compliance. Documentation as handoff discipline.",
  bodyClass = "",
  showIndustriesBand = true,
  showProofBand = false,
  showCompliancePerRole = false,
  showInventory = false,
  cases = [CASE_BAH_P2, CASE_BANCO],
} = {}) {
  return `${p2_head(`Danilo Rojas — CV · ${title}`, bodyClass)}
<article class="cv-page">
  ${p2_renderIdentity({ role })}
  ${showIndustriesBand ? p2_renderIndustriesBand() : ""}
  ${p2_renderSkillsSidebar()}
  <div class="cv-right">
    <section class="cv-summary">
      <div class="cv-summary__eyebrow">Professional summary</div>
      <h2 class="cv-summary__thesis">${thesis}</h2>
    </section>
    ${showProofBand ? p2_renderProofBand() : ""}
    <section class="cv-section">
      <h3 class="cv-section__heading">Selected work</h3>
      ${cases.map(p2_renderCase).join("")}
    </section>
    <section class="cv-section">
      <h3 class="cv-section__heading">Professional experience</h3>
      ${p2_renderExperience(EXPERIENCE_P2.slice(0, 2), { showCompliance: showCompliancePerRole })}
    </section>
  </div>
</article>
<article class="cv-page">
  <aside>
    ${p2_renderClientsSidebar()}
    ${p2_renderEducation()}
  </aside>
  <div class="cv-right">
    <section class="cv-section">
      <h3 class="cv-section__heading">Past experience</h3>
      ${p2_renderExperience(EXPERIENCE_P2.slice(2))}
    </section>
    ${p2_renderReferences()}
    ${showInventory ? p2_renderInventory() : ""}
  </div>
</article>
</body></html>`;
}

// V2.13 two-page layout — page 2 carries clients + education sidebar and all
// remaining experience + references in the main column. Page-break-inside
// silenced on cards so overflow breaks naturally rather than clipping.
function renderV2_13ThreePage() {
  const role = "Senior Product Designer · Agentic Design";
  const thesis = "Compliance-first product design for regulated industries. WCAG 2.1 AA and Section 508 audited inside design tokens. Documented handoff to senior engineering. Fifteen years across defense, banking, and pharmaceuticals.";
  return `${p2_head("Danilo Rojas — CV · V2.13 Content · Compliance-led (2-page)")}
<style>
  /* Overrides for this variant only: allow natural breaks if content overflows */
  .cv-case { page-break-inside: auto; }
  .cv-xp { page-break-inside: auto; }
</style>

<!-- PAGE 1 · identity · industries · skills sidebar + summary + selected work -->
<article class="cv-page">
  ${p2_renderIdentity({ role })}
  ${p2_renderIndustriesBand()}
  ${p2_renderSkillsSidebar()}
  <div class="cv-right">
    <section class="cv-summary">
      <div class="cv-summary__eyebrow">Professional summary</div>
      <h2 class="cv-summary__thesis">${thesis}</h2>
    </section>
    <section class="cv-section">
      <h3 class="cv-section__heading">Selected work</h3>
      ${[CASE_BAH_P2, CASE_BANCO].map(p2_renderCase).join("")}
    </section>
  </div>
</article>

<!-- PAGE 2 · clients + education sidebar · professional + past experience + references -->
<article class="cv-page">
  <aside>
    ${p2_renderClientsSidebar()}
    ${p2_renderEducation()}
  </aside>
  <div class="cv-right">
    <section class="cv-section">
      <h3 class="cv-section__heading">Professional experience</h3>
      ${p2_renderExperience(EXPERIENCE_P2.slice(0, 2), { showCompliance: true })}
    </section>
    <section class="cv-section">
      <h3 class="cv-section__heading">Past experience</h3>
      ${p2_renderExperience(EXPERIENCE_P2.slice(2))}
    </section>
    ${p2_renderReferences()}
  </div>
</article>
</body></html>`;
}

// ============================================================================
// EMIT
// ============================================================================

const phase1Variants = [
  { file: "V1-quiet-enterprise.html", html: renderV1() },
  { file: "V2-industries-first.html", html: renderV2() },
  { file: "V3-governance-scale.html", html: renderV3() },
  { file: "V4-accessibility-compliance.html", html: renderV4() },
];

const phase2Variants = [
  // V2.1 base
  {
    file: "v2-1/V2-1-base.html",
    html: renderV2_1(),
  },
  // Axis 1: mix sensato
  {
    file: "v2-1/V2-2-mix-proof-numbers.html",
    html: renderV2_1({
      title: "V2.2 Mix · Proof numbers",
      showProofBand: true,
    }),
  },
  {
    file: "v2-1/V2-3-mix-role-alt.html",
    html: renderV2_1({
      title: "V2.3 Mix · Role alt (Agentic Delivery)",
      role: "Senior Product Designer + Agentic Delivery",
    }),
  },
  {
    file: "v2-1/V2-4-mix-orange-assertive.html",
    html: renderV2_1({
      title: "V2.4 Mix · Orange assertive",
      bodyClass: "orange-assertive",
    }),
  },
  // Axis 2: role-line
  {
    file: "v2-1/V2-5-role-senior-agentic-design.html",
    html: renderV2_1({
      title: "V2.5 Role · Senior Product Designer · Agentic Design",
      role: "Senior Product Designer · Agentic Design",
    }),
  },
  {
    file: "v2-1/V2-6-role-ds-agentic-delivery.html",
    html: renderV2_1({
      title: "V2.6 Role · Product Designer — Design Systems & Agentic Delivery",
      role: "Product Designer — Design Systems & Agentic Delivery",
    }),
  },
  {
    file: "v2-1/V2-7-role-senior-agentic-practice.html",
    html: renderV2_1({
      title: "V2.7 Role · Senior Product Designer (Agentic practice)",
      role: "Senior Product Designer (Agentic practice)",
    }),
  },
  // Axis 3: orange intensity
  {
    file: "v2-1/V2-8-orange-quiet.html",
    html: renderV2_1({
      title: "V2.8 Orange · Quiet",
      bodyClass: "orange-quiet",
    }),
  },
  {
    file: "v2-1/V2-9-orange-moderate.html",
    html: renderV2_1({
      title: "V2.9 Orange · Moderate (baseline)",
    }),
  },
  {
    file: "v2-1/V2-10-orange-assertive.html",
    html: renderV2_1({
      title: "V2.10 Orange · Assertive",
      bodyClass: "orange-assertive",
    }),
  },
  // Axis 4: content emphasis
  {
    file: "v2-1/V2-11-content-industries.html",
    html: renderV2_1({
      title: "V2.11 Content · Industries-led (baseline)",
    }),
  },
  {
    file: "v2-1/V2-12-content-numbers.html",
    html: renderV2_1({
      title: "V2.12 Content · Numbers-led",
      showIndustriesBand: false,
      showProofBand: true,
      thesis: "Fifteen years of product design. Eight enterprise clients in regulated industries. Ten years governing distributed design systems. Consistency as a governance problem, not a style problem.",
    }),
  },
  {
    file: "v2-1/V2-13-content-compliance.html",
    html: renderV2_13ThreePage(),
  },
];

for (const { file, html } of [...phase1Variants, ...phase2Variants]) {
  const out = join(__dirname, file);
  writeFileSync(out, html, "utf8");
  console.log(`wrote ${out} (${html.length} bytes)`);
}

console.log(`\ndone. ${phase1Variants.length} phase-1 + ${phase2Variants.length} phase-2 variants.`);
