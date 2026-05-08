import type { Case } from "../../../lib/types.js";
import { escapeHtml, type Lang } from "../../skills-sheet-page-1.js";

function formatYears(c: Case, lang: Lang): string {
  if (c.yearEnd === "present") {
    return `${c.yearStart} — ${lang === "en" ? "Present" : "presente"}`;
  }
  if (c.yearStart === c.yearEnd) return String(c.yearStart);
  return `${c.yearStart} — ${c.yearEnd}`;
}

export function renderCaseExpander(c: Case, lang: Lang): string {
  const title = lang === "en" ? c.titleEn : c.titleEs;
  const client = lang === "en" ? c.clientEn : c.clientEs;
  const hook = lang === "en" ? c.hookEn : c.hookEs;
  const bullets = lang === "en" ? c.bulletsEn : c.bulletsEs;

  const readMoreLabel = lang === "en" ? "Read more" : "Ver más";
  const classes = [
    "lp-case",
    c.featured ? "lp-case--featured" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const bulletHtml = bullets
    .map((b) => `<li>${escapeHtml(b)}</li>`)
    .join("\n        ");

  const stackHtml = c.stack
    .map((s) => `<span class="lp-case__tag">${escapeHtml(s)}</span>`)
    .join(" ");

  return `<article class="${classes}">
  <button
    type="button"
    class="lp-case__header"
    data-action="toggle-case"
    aria-expanded="false"
    aria-controls="case-body-${escapeHtml(c.slug)}"
  >
    <div class="lp-case__meta">
      <span class="lp-case__client">${escapeHtml(client)}</span>
      <span class="lp-case__years">${escapeHtml(formatYears(c, lang))}</span>
    </div>
    <h3 class="lp-case__title">${escapeHtml(title)}</h3>
    <p class="lp-case__hook">${escapeHtml(hook)}</p>
    <span class="lp-case__more">
      ${escapeHtml(readMoreLabel)}
      <span class="lp-case__chevron" aria-hidden="true">+</span>
    </span>
  </button>
  <div id="case-body-${escapeHtml(c.slug)}" class="lp-case__body" hidden>
    <ul class="lp-case__bullets">
        ${bulletHtml}
    </ul>
    <div class="lp-case__stack">${stackHtml}</div>
  </div>
</article>`;
}
