import type { CvData } from "../../lib/types.js";
import { escapeHtml } from "../skills-sheet-page-1.js";
import { renderIdentityBlock } from "./components/identity-block.js";
import { renderSkillsSidebar } from "./components/skills-sidebar.js";
import { renderExperienceItem } from "./components/experience-item.js";
import { renderCaseCard } from "./components/case-card.js";
import { renderEducationBlock } from "./components/education-block.js";

const BAIRESDEV_TOKENS = `
:root {
  --ink:         #111111;
  --ink-body:    #2b2b2b;
  --ink-muted:   #6b6b6b;
  --ink-subtle:  #9a9a9a;
  --ink-inverse: #ffffff;

  --line:        #e1e1e1;
  --line-strong: #9a9a9a;
  --line-soft:   #efefef;

  --bg-paper:    #ffffff;
  --bg-card:     #ffffff;
  --bg-section:  #f7f7f7;
  --bg-chip:     #f3f3f3;
  --bg-ink:      #111111;

  --accent:      #111111;
  --accent-deep: #111111;
  --accent-ink:  #ffffff;

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

/* ============== identity ============== */
.cv-identity {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: end;
  gap: 10mm;
  padding-bottom: 6mm;
  border-bottom: 1px solid var(--ink);
  margin-bottom: 6mm;
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
.cv-identity__name-accent { color: inherit; font-weight: 400; }
.cv-identity__role {
  font-family: var(--font-mono);
  font-size: 8.5pt;
  letter-spacing: 0.02em;
  color: var(--ink);
  margin-bottom: 2mm;
}
.cv-identity__availability {
  font-family: var(--font-mono);
  font-size: 7.5pt;
  letter-spacing: 0.04em;
  color: var(--ink-muted);
  text-transform: uppercase;
}
.cv-identity__contact {
  text-align: right;
  font-family: var(--font-mono);
  font-size: 7.5pt;
  line-height: 1.7;
  letter-spacing: 0.02em;
  color: var(--ink-body);
}

/* ============== summary ============== */
.cv-summary { margin-bottom: 6mm; grid-column: 2 / -1; }
.cv-summary__eyebrow {
  font-family: var(--font-mono);
  font-size: 7pt;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink-muted);
  margin-bottom: 3mm;
}
.cv-summary__eyebrow::before {
  content: "// ";
  color: var(--ink-subtle);
}
.cv-summary__thesis {
  font-family: var(--font-display);
  font-size: 13pt;
  letter-spacing: -0.02em;
  line-height: 1.3;
  color: var(--ink);
  margin: 0 0 3mm 0;
  font-weight: 500;
}
.cv-summary__tagline {
  display: none; /* bairesdev keeps summary tight */
}

/* ============== skills sidebar ============== */
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
.cv-skills__heading::before {
  content: "// ";
  color: var(--ink-subtle);
  font-weight: 400;
}
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
  background: var(--bg-card);
  color: var(--ink-body);
  letter-spacing: 0.01em;
}
.cv-skill--learning {
  border-style: dashed;
  border-color: var(--line-strong);
  color: var(--ink-muted);
}

/* ============== main + right column ============== */
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
.cv-section__heading::before {
  content: "// ";
  color: var(--ink-subtle);
  font-weight: 400;
}

/* ============== experience ============== */
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
}
.cv-xp__dates {
  font-family: var(--font-mono);
  font-size: 7.5pt;
  color: var(--ink-muted);
  letter-spacing: 0.04em;
}
.cv-xp__role {
  font-family: var(--font-mono);
  font-size: 8pt;
  color: var(--ink);
  margin-bottom: 2mm;
  letter-spacing: 0.01em;
}
.cv-xp__badge { display: none; }
.cv-xp__description {
  font-size: 9pt;
  line-height: 1.5;
  color: var(--ink-body);
  margin: 0 0 2mm 0;
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

/* ============== case card ============== */
.cv-case {
  border: 1px solid var(--line);
  border-radius: 4px;
  padding: 4mm 5mm;
  margin-bottom: 3mm;
  page-break-inside: avoid;
  background: var(--bg-card);
}
.cv-case__meta {
  display: flex; justify-content: space-between; align-items: baseline;
  font-family: var(--font-mono);
  font-size: 6.8pt;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-muted);
  margin-bottom: 2mm;
}
.cv-case__client { color: var(--ink); font-weight: 500; }
.cv-case__title {
  font-family: var(--font-display);
  font-size: 11.5pt;
  letter-spacing: -0.02em;
  line-height: 1.2;
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
  list-style: none; margin: 0 0 3mm 0; padding: 0;
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
.cv-case__stack { display: flex; flex-wrap: wrap; gap: 3px; }
.cv-case__stack-pill {
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

/* ============== education ============== */
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
.cv-edu__heading::before {
  content: "// ";
  color: var(--ink-subtle);
  font-weight: 400;
}
.cv-edu__list { list-style: none; margin: 0; padding: 0; }
.cv-edu__item {
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 5mm;
  row-gap: 0.5mm;
  padding: 1.8mm 0;
  border-top: 1px solid var(--line-soft);
}
.cv-edu__item:first-child { border-top: 0; }
.cv-edu__year {
  font-family: var(--font-mono);
  font-size: 7pt;
  color: var(--ink-muted);
  letter-spacing: 0.04em;
  min-width: 10mm;
  grid-row: 1 / span 2;
  align-self: start;
  padding-top: 1px;
}
.cv-edu__name {
  font-family: var(--font-display);
  font-size: 9pt;
  font-weight: 500;
  letter-spacing: -0.015em;
  color: var(--ink);
}
.cv-edu__inst {
  grid-column: 2;
  font-family: var(--font-mono);
  font-size: 7pt;
  color: var(--ink-muted);
  letter-spacing: 0.03em;
}

/* ============== references block ============== */
.cv-references {
  font-size: 9pt;
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
  font-size: 8pt;
  color: var(--ink);
  letter-spacing: 0.02em;
  padding-left: 12px;
  position: relative;
}
.cv-references__list li::before {
  content: "›";
  position: absolute; left: 0;
  color: var(--ink-subtle);
}
`;

function renderSummaryBairesdev(thesisEn: string): string {
  return `
<section class="cv-summary cv-summary--bairesdev">
  <div class="cv-summary__eyebrow">Professional Summary</div>
  <h2 class="cv-summary__thesis">${escapeHtml(thesisEn)}</h2>
</section>`;
}

export function renderBairesdevCv(data: CvData): string {
  const lang = "en" as const;
  const title = escapeHtml(`${data.identity.name} — CV`);

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
    ${renderSummaryBairesdev(data.positioning.thesis.en)}

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
      <p class="cv-references">Senior references available on request from:</p>
      <ul class="cv-references__list">
        <li>Booz Allen Hamilton · Design Engineering</li>
        <li>Banco Pichincha · Digital Products</li>
        <li>Mondelēz Latin America · DesignOps</li>
        <li>Xentinels · DesignOps Lead</li>
      </ul>
    </section>
  </div>
</article>

</body>
</html>`;
}
