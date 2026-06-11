import type { Testimonial, AttributedTestimonial } from "../../../lib/types.js";
import { escapeHtml, type Lang } from "../../skills-sheet-page-1.js";

type AnyTestimonial = Testimonial | AttributedTestimonial;

export function renderTestimonialFeatured(t: AnyTestimonial, lang: Lang): string {
  const quote = lang === "es" && t.quoteEs ? t.quoteEs : t.quote;
  const company = t.company ? ` · ${escapeHtml(t.company)}` : "";
  const badgeLabel = t.source === "verified"
    ? (lang === "en" ? "Verified" : "Verificado")
    : (lang === "en" ? "Attributed" : "Atribuido");
  const badgeClass = t.source === "verified"
    ? "lp-quote__badge lp-quote__badge--verified"
    : "lp-quote__badge lp-quote__badge--attributed";

  return `<figure class="lp-quote">
  <blockquote class="lp-quote__text">
    <span class="lp-quote__mark" aria-hidden="true">"</span>
    ${escapeHtml(quote)}
  </blockquote>
  <figcaption class="lp-quote__attr">
    <span class="lp-quote__author">${escapeHtml(t.author)}</span>
    <span class="lp-quote__role">${escapeHtml(t.role)}${company}</span>
    <span class="${badgeClass}">${escapeHtml(badgeLabel)}</span>
  </figcaption>
</figure>`;
}
