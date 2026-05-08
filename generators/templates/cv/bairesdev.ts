import type { CvData } from "../../lib/types.js";
import { escapeHtml } from "../skills-sheet-page-1.js";
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

// Bairesdev-specific structural styles — smaller surface than shared-styles
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
.cv-skill:not(:last-child)::after { content: " · "; color: var(--ink-muted); }
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
  const title = escapeHtml(`${data.identity.name} — CV`);

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
      <p style="font-size:9.5pt;line-height:1.5;color:var(--ink-body);margin:0;">Senior references available on request from Booz Allen Hamilton, Banco Pichincha, Mondelēz Latin America and Xentinels DesignOps.</p>
    </section>
  </div>
</article>

</body>
</html>`;
}
