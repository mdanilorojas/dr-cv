import type { SkillInventoryItem } from "../../../lib/types.js";
import { escapeHtml, type Lang } from "../../skills-sheet-page-1.js";

export function renderSkillsInventory(items: SkillInventoryItem[], lang: Lang): string {
  const heading = lang === "en" ? "Skills Inventory" : "Inventario de skills";
  const rows = items
    .map(
      (it) => `
        <div class="cv-inventory__row">
          <span class="cv-inventory__skill">${escapeHtml(it.skill)}</span>
          <span class="cv-inventory__years">${escapeHtml(it.years)}</span>
        </div>`,
    )
    .join("");
  return `
<section class="cv-inventory">
  <h3 class="cv-inventory__heading">${escapeHtml(heading)}</h3>
  <div class="cv-inventory__grid">${rows}
  </div>
</section>`;
}
