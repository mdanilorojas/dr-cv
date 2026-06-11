import type { ExperienceItem } from "../../../lib/types.js";
import { escapeHtml, type Lang } from "../../skills-sheet-page-1.js";

export type ExperienceDensity = "full" | "condensed";

export interface ExperienceItemOptions {
  lang: Lang;
  density: ExperienceDensity;
}

function formatTimeframe(item: ExperienceItem, lang: Lang): string {
  const end = item.endYear === "present"
    ? (lang === "en" ? "Present" : "presente")
    : String(item.endYear);
  return `${item.startYear} — ${end}`;
}

export function renderExperienceItem(item: ExperienceItem, options: ExperienceItemOptions): string {
  const { lang, density } = options;
  const desc = lang === "en" ? item.descriptionEn : item.descriptionEs;
  const timeframe = formatTimeframe(item, lang);

  const descHtml = density === "full"
    ? `<p class="cv-xp__description">${escapeHtml(desc)}</p>`
    : "";

  const stackHtml = density === "full" && item.stack.length > 0
    ? `<div class="cv-xp__stack">${item.stack.map((s) => `<span class="cv-xp__stack-pill">${escapeHtml(s)}</span>`).join(" ")}</div>`
    : "";

  const badgeHtml = item.badge
    ? `<span class="cv-xp__badge">${escapeHtml(item.badge)}</span>`
    : "";

  return `
<div class="cv-xp cv-xp--${density}">
  <div class="cv-xp__header">
    <div class="cv-xp__company">${escapeHtml(item.company)}</div>
    <div class="cv-xp__dates">${escapeHtml(timeframe)}</div>
  </div>
  <div class="cv-xp__role">${escapeHtml(item.role)} ${badgeHtml}</div>
  ${descHtml}
  ${stackHtml}
</div>`;
}
