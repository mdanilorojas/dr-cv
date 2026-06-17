import type { Skills, SkillGroup } from "../../../lib/types.js";
import { escapeHtml, type Lang } from "../../skills-sheet-page-1.js";
import type { CvVariant } from "./identity-block.js";

export interface SkillsSidebarOptions {
  variant: CvVariant;
  lang: Lang;
}

function renderGroup(group: SkillGroup): string {
  const items = group.skills
    .map((s) => {
      const cls = s.level === "learning" ? "cv-skill cv-skill--learning" : "cv-skill";
      return `<li class="${cls}">${escapeHtml(s.name)}</li>`;
    })
    .join("\n");
  return `
    <div class="cv-skills__group">
      <h4 class="cv-skills__group-title">${escapeHtml(group.title)}</h4>
      <ul class="cv-skills__list">${items}</ul>
    </div>`;
}

const BAIRESDEV_ORDER = ["Agents", "Design", "Engineering", "Strategy"] as const;

export function renderSkillsSidebar(skills: Skills, options: SkillsSidebarOptions): string {
  // CVs intentionally render only byLayer (Strategy / Design / Engineering / Agents).
  // byOutcome (Discovery / Build / Ship / Scale) is the alternate view used by the
  // skills sheet; including both in the 62mm CV sidebar would overflow A4.
  const sourceGroups = skills.byLayer.groups;

  let orderedGroups: SkillGroup[];
  if (options.variant === "bairesdev" || options.variant === "bairesdev-v2") {
    orderedGroups = BAIRESDEV_ORDER
      .map((title) => sourceGroups.find((g) => g.title === title))
      .filter((g): g is SkillGroup => g !== undefined);
    // Append any extra groups not in the explicit order (defensive)
    for (const g of sourceGroups) {
      if (!orderedGroups.includes(g)) orderedGroups.push(g);
    }
  } else {
    orderedGroups = sourceGroups;
  }

  const groups = orderedGroups.map(renderGroup).join("\n");
  const heading = options.lang === "en" ? "Skills" : "Habilidades";
  return `
<aside class="cv-skills cv-skills--${options.variant}">
  <h3 class="cv-skills__heading">${escapeHtml(heading)}</h3>
  ${groups}
</aside>`;
}
