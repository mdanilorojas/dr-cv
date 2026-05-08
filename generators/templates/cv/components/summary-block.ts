import type { Positioning } from "../../../lib/types.js";
import { escapeHtml, type Lang } from "../../skills-sheet-page-1.js";
import type { CvVariant } from "./identity-block.js";

export interface SummaryBlockOptions {
  variant: CvVariant;
  lang: Lang;
}

function eyebrowLabel(variant: CvVariant, lang: Lang): string {
  if (variant === "warm") {
    return lang === "en" ? "hello · summary" : "hola · resumen";
  }
  return lang === "en" ? "Professional Summary" : "Resumen Profesional";
}

export function renderSummaryBlock(p: Positioning, options: SummaryBlockOptions): string {
  const thesis = options.lang === "en" ? p.thesis.en : p.thesis.es;
  const tagline = options.lang === "en" ? p.tagline.en : p.tagline.es;
  const eyebrow = eyebrowLabel(options.variant, options.lang);

  return `
<section class="cv-summary cv-summary--${options.variant}">
  <div class="cv-summary__eyebrow">${escapeHtml(eyebrow)}</div>
  <h2 class="cv-summary__thesis">${escapeHtml(thesis)}</h2>
  <p class="cv-summary__tagline">${escapeHtml(tagline)}</p>
</section>`;
}
