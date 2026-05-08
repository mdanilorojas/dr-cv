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

export function renderSkillsSidebar(skills: Skills, options: SkillsSidebarOptions): string {
  const groups = skills.byLayer.groups.map(renderGroup).join("\n");
  const heading = options.lang === "en" ? "Skills" : "Habilidades";
  return `
<aside class="cv-skills cv-skills--${options.variant}">
  <h3 class="cv-skills__heading">${escapeHtml(heading)}</h3>
  ${groups}
</aside>`;
}
