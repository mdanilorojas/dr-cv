import type { Case } from "../../../lib/types.js";
import { escapeHtml, type Lang } from "../../skills-sheet-page-1.js";
import type { CvVariant } from "./identity-block.js";

export interface CaseCardOptions {
  variant: CvVariant;
  lang: Lang;
  featured: boolean;
}

function featuredClass(variant: CvVariant, featured: boolean): string {
  if (!featured) return "";
  if (variant === "bairesdev") return ""; // bairesdev never features
  if (variant === "warm") return "cv-case--featured cv-case--dark";
  if (variant === "serious") return "cv-case--featured cv-case--accent-border";
  return "";
}

export function renderCaseCard(c: Case, options: CaseCardOptions): string {
  const title = options.lang === "en" ? c.titleEn : c.titleEs;
  const client = options.lang === "en" ? c.clientEn : c.clientEs;
  const hook = options.lang === "en" ? c.hookEn : c.hookEs;
  const bullets = options.lang === "en" ? c.bulletsEn : c.bulletsEs;

  const featuredCls = featuredClass(options.variant, options.featured);
  const classes = `cv-case cv-case--${options.variant} ${featuredCls}`.trim();

  const years = c.yearEnd === "present"
    ? `${c.yearStart} — ${options.lang === "en" ? "Present" : "presente"}`
    : c.yearStart === c.yearEnd
      ? String(c.yearStart)
      : `${c.yearStart} — ${c.yearEnd}`;

  const bulletList = bullets
    .map((b) => `<li>${escapeHtml(b)}</li>`)
    .join("\n");

  const stackList = c.stack
    .map((s) => `<span class="cv-case__stack-pill">${escapeHtml(s)}</span>`)
    .join(" ");

  return `
<article class="${classes}">
  <header class="cv-case__meta">
    <span class="cv-case__client">${escapeHtml(client)}</span>
    <span class="cv-case__years">${escapeHtml(years)}</span>
  </header>
  <h3 class="cv-case__title">${escapeHtml(title)}</h3>
  <p class="cv-case__hook">${escapeHtml(hook)}</p>
  <ul class="cv-case__bullets">
    ${bulletList}
  </ul>
  <div class="cv-case__stack">${stackList}</div>
</article>`;
}
