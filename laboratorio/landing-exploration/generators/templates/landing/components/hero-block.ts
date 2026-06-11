import type { Identity, Positioning, Landing } from "../../../lib/types.js";
import { escapeHtml, type Lang } from "../../skills-sheet-page-1.js";

function splitName(name: string): { first: string; last: string } {
  const parts = name.trim().split(/\s+/);
  return {
    first: parts.slice(0, -1).join(" "),
    last: parts.slice(-1)[0] ?? "",
  };
}

export function renderHeroBlock(
  identity: Identity,
  positioning: Positioning,
  landing: Landing,
  lang: Lang,
): string {
  const { first, last } = splitName(identity.name);
  const thesis = lang === "en" ? positioning.thesis.en : positioning.thesis.es;
  const tagline = lang === "en" ? positioning.tagline.en : positioning.tagline.es;
  const cta = lang === "en" ? landing.cta.en : landing.cta.es;
  const eyebrowLabel = lang === "en" ? "Agentic Designer · Product Engineer" : "Diseñador Agéntico · Product Engineer";
  const availabilityLabel = escapeHtml(identity.availability);

  return `<header class="lp-hero">
  <div class="lp-hero__eyebrow">${escapeHtml(eyebrowLabel)}</div>
  <h1 class="lp-hero__name">
    <span class="lp-hero__name-first">${escapeHtml(first)}</span>
    <span class="lp-hero__name-last">${escapeHtml(last)}</span>
  </h1>
  <p class="lp-hero__thesis">${escapeHtml(thesis)}</p>
  <p class="lp-hero__tagline">${escapeHtml(tagline)}</p>
  <div class="lp-hero__actions">
    <a class="lp-btn lp-btn--primary" href="#contact" data-tab="contact">
      ${escapeHtml(cta)}
      <span class="lp-btn__arrow" aria-hidden="true">→</span>
    </a>
    <span class="lp-hero__availability">
      <span class="lp-live-dot" aria-hidden="true"></span>
      ${availabilityLabel}
    </span>
  </div>
</header>`;
}
