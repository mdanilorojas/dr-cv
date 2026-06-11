import type { Education } from "../../../lib/types.js";
import { escapeHtml, type Lang } from "../../skills-sheet-page-1.js";

export function renderEducationBlock(edu: Education, lang: Lang): string {
  const heading = lang === "en" ? "Education" : "Educación";
  const rows = edu
    .map((item) => {
      const yearLabel = item.year === null ? "—" : String(item.year);
      const locationHtml = item.location ? ` · ${escapeHtml(item.location)}` : "";
      return `
    <li class="cv-edu__item">
      <span class="cv-edu__year">${escapeHtml(yearLabel)}</span>
      <span class="cv-edu__name">${escapeHtml(item.name)}</span>
      <span class="cv-edu__inst">${escapeHtml(item.institution)}${locationHtml}</span>
    </li>`;
    })
    .join("\n");
  return `
<section class="cv-edu">
  <h3 class="cv-edu__heading">${escapeHtml(heading)}</h3>
  <ul class="cv-edu__list">
    ${rows}
  </ul>
</section>`;
}
