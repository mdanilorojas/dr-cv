import type { Experience, ExperienceItem } from "../../../lib/types.js";
import { escapeHtml, type Lang } from "../../skills-sheet-page-1.js";

function formatSpan(item: ExperienceItem, lang: Lang): string {
  const end = item.endYear === "present"
    ? (lang === "en" ? "Present" : "presente")
    : String(item.endYear);
  return `${item.startYear} — ${end}`;
}

function renderRow(item: ExperienceItem, lang: Lang): string {
  const desc = lang === "en" ? item.descriptionEn : item.descriptionEs;
  const isCurrent = item.endYear === "present";
  return `<li class="lp-timeline__row${isCurrent ? " lp-timeline__row--current" : ""}">
  <div class="lp-timeline__marker" aria-hidden="true"></div>
  <div class="lp-timeline__years">${escapeHtml(formatSpan(item, lang))}</div>
  <div class="lp-timeline__body">
    <div class="lp-timeline__company">${escapeHtml(item.company)}</div>
    <div class="lp-timeline__role">${escapeHtml(item.role)}</div>
    <p class="lp-timeline__desc">${escapeHtml(desc)}</p>
  </div>
</li>`;
}

export function renderTimeline(experience: Experience, lang: Lang): string {
  const items = [...experience.current, ...(experience.past ?? [])]
    .sort((a, b) => {
      const ae = a.endYear === "present" ? 9999 : a.endYear;
      const be = b.endYear === "present" ? 9999 : b.endYear;
      return be - ae;
    })
    .map((it) => renderRow(it, lang))
    .join("\n");
  return `<ol class="lp-timeline">
${items}
</ol>`;
}
