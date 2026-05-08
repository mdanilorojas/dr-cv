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
    ? `${data.identity.name} · Curriculum Vitae`
    : `${data.identity.name} · Curriculum Vitae`;

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
    : { cases: "Casos seleccionados", xp: "Experiencia", voices: "Referencias", edu: "Educación" };

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
