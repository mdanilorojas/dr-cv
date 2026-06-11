import type { Client } from "../../../lib/types.js";
import { escapeHtml, type Lang } from "../../skills-sheet-page-1.js";

export function renderClientChip(c: Client, lang: Lang): string {
  const industry = lang === "en" ? c.industryEn : c.industryEs;
  return `
    <div class="cv-client-chip">
      <div class="cv-client-chip__name">${escapeHtml(c.name)}</div>
      <div class="cv-client-chip__industry">${escapeHtml(industry)}</div>
    </div>`;
}
