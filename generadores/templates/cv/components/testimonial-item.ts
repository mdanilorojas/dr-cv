import type { Testimonial, AttributedTestimonial } from "../../../lib/types.js";
import { escapeHtml, type Lang } from "../../skills-sheet-page-1.js";

export type AnyTestimonial = Testimonial | AttributedTestimonial;

function badgeLabel(source: "verified" | "attributed", lang: Lang): string {
  if (lang === "es") {
    return source === "verified" ? "verificado" : "atribuida";
  }
  return source === "verified" ? "verified" : "attributed";
}

export function renderTestimonialItem(t: AnyTestimonial, lang: Lang): string {
  const quote = lang === "es" && t.quoteEs ? t.quoteEs : t.quote;
  const badge = badgeLabel(t.source, lang);
  const badgeCls = `cv-testimonial__badge cv-testimonial__badge--${t.source}`;
  const company = t.company ? ` · ${escapeHtml(t.company)}` : "";

  return `
<div class="cv-testimonial cv-testimonial--${t.source}">
  <p class="cv-testimonial__quote">&ldquo;${escapeHtml(quote)}&rdquo;</p>
  <div class="cv-testimonial__attribution">
    <span class="cv-testimonial__author">${escapeHtml(t.author)}</span>
    <span class="cv-testimonial__role"> · ${escapeHtml(t.role)}${company}</span>
    <span class="${badgeCls}">${escapeHtml(badge)}</span>
  </div>
</div>`;
}
