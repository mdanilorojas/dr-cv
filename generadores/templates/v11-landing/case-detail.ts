/**
 * Case-detail page. One HTML per case × per lang, emitted at
 *   dist/landing-v11/work/<slug>/index.html
 *   dist/landing-v11/es/work/<slug>/index.html
 *
 * The landing card shows a short pitch + CTA; this page carries the
 * seven Narrative Ship beats (Context / Problem / Approach / Ship /
 * Outcome / Differently / Craft floor) plus nav, footer, and a
 * "Back to work" link.
 *
 * No animation on the detail page — animations live on the landing.
 */
import type { Case, LandingData } from "../../lib/types.js";
import { escapeHtml, type Lang } from "../skills-sheet-page-1.js";
import { V11_STYLES, FAVICON_TAG } from "./v11-styles.js";
import { V11_SCRIPT } from "./v11-script.js";
import { pipAnimationCss } from "./animations/picture-in-picture.js";
import { renderIframeAnimation, hasIframeAnimation, iframeAnimationCss, iframeAnimationScript } from "./animations/iframe-animation.js";
import {
  beatsFor,
  renderNav,
  renderContact,
  renderFooter,
  sortedCases,
  V11_COPY,
  type V11LandingAssets,
} from "./index.js";

interface CaseDetailInput {
  data: LandingData;
  caseData: Case;
  lang: Lang;
  tokensCss: string;
  assets: V11LandingAssets;
}

export function renderCaseDetailPage(input: CaseDetailInput): string {
  const { data, caseData: c, lang, tokensCss, assets } = input;

  const title = lang === "en" ? c.titleEn : c.titleEs;
  const client = lang === "en" ? c.clientEn : c.clientEs;
  const hook = lang === "en" ? c.hookEn : c.hookEs;
  const dates = yearRange(c.yearStart, c.yearEnd, lang);
  const beats = beatsFor(c.slug);
  const labels = lang === "en" ? V11_COPY.work.beatsEn : V11_COPY.work.beatsEs;
  const backLabel = lang === "en" ? V11_COPY.work.caseBackEn : V11_COPY.work.caseBackEs;
  const nextLabel = lang === "en" ? V11_COPY.work.caseNextEn : V11_COPY.work.caseNextEs;

  const sorted = sortedCases(data.cases);
  const idx = sorted.findIndex((x) => x.slug === c.slug);
  const next = idx >= 0 && idx < sorted.length - 1 ? sorted[idx + 1] : null;

  const homeHref = lang === "en" ? "/" : "/es/";
  const altHref = lang === "en" ? `/es/work/${c.slug}/` : `/work/${c.slug}/`;
  const selfHref = lang === "en" ? `/work/${c.slug}/` : `/es/work/${c.slug}/`;

  const bullets = lang === "en" ? c.bulletsEn : c.bulletsEs;

  // Editorial sidebar labels (echoes the landing V3 case card).
  const labelClient = lang === "en" ? "Client" : "Cliente";
  const labelYears = lang === "en" ? "Years" : "Años";
  const labelStack = lang === "en" ? "Stack" : "Stack";

  const stackChips = c.stack
    .map((s) => `<span class="v11-case__chip">${escapeHtml(s)}</span>`)
    .join("");

  const metaCol = `<aside class="v11-case-detail__meta-col">
    <div class="v11-case__meta-block">
      <div class="v11-case__meta-label">${escapeHtml(labelClient)}</div>
      <div class="v11-case__meta-value v11-case__meta-value--accent">${escapeHtml(client)}</div>
    </div>
    <div class="v11-case__meta-block">
      <div class="v11-case__meta-label">${escapeHtml(labelYears)}</div>
      <div class="v11-case__meta-value">${escapeHtml(dates)}</div>
    </div>
    <div class="v11-case__meta-block">
      <div class="v11-case__meta-label">${escapeHtml(labelStack)}</div>
      <div class="v11-case__meta-chips">${stackChips}</div>
    </div>
  </aside>`;

  const beatsHtml = beats
    ? `<dl class="v11-case-detail__beats">
    <div class="v11-case-detail__beat"><dt>${escapeHtml(labels.context)}</dt><dd>${escapeHtml(beats.context[lang])}</dd></div>
    <div class="v11-case-detail__beat"><dt>${escapeHtml(labels.problem)}</dt><dd>${escapeHtml(beats.problem[lang])}</dd></div>
    <div class="v11-case-detail__beat"><dt>${escapeHtml(labels.approach)}</dt><dd>${escapeHtml(beats.approach[lang])}</dd></div>
    <div class="v11-case-detail__beat"><dt>${escapeHtml(labels.ship)}</dt><dd>${escapeHtml(beats.ship[lang])}</dd></div>
    <div class="v11-case-detail__beat"><dt>${escapeHtml(labels.outcome)}</dt><dd>${escapeHtml(beats.outcome[lang])}</dd></div>
    <div class="v11-case-detail__beat"><dt>${escapeHtml(labels.differently)}</dt><dd>${escapeHtml(beats.differently[lang])}</dd></div>
    <div class="v11-case-detail__beat"><dt>${escapeHtml(labels.craft)}</dt><dd>${escapeHtml(beats.craft[lang])}</dd></div>
  </dl>`
    : "";

  const bulletsHtml = bullets.length > 0
    ? `<ul class="v11-case-detail__bullets">${bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join("")}</ul>`
    : "";

  const nextBlock = next
    ? `<a class="v11-case-detail__next" href="${escapeHtml(homeHref)}work/${encodeURIComponent(next.slug)}/">${escapeHtml(nextLabel)} · ${escapeHtml(lang === "en" ? next.titleEn : next.titleEs)} →</a>`
    : "";

  // Detail pages live two levels deep (work/<slug>/). basePath back to dist root.
  const animBasePath = lang === "en" ? "../../" : "../../../";
  const animationHtml = hasIframeAnimation(c.slug)
    ? renderIframeAnimation({ slug: c.slug, lang, basePath: animBasePath })
    : "";
  const animationBlock = animationHtml
    ? `<div class="v11-case-detail__anim">${animationHtml}</div>`
    : "";

  const seoTitle = lang === "en"
    ? `${c.titleEn} · Danilo Rojas`
    : `${c.titleEs} · Danilo Rojas`;
  const seoDesc = lang === "en" ? c.hookEn : c.hookEs;
  const skipLabel = lang === "en" ? "Skip to content" : "Saltar al contenido";

  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(seoTitle)}</title>
<meta name="description" content="${escapeHtml(seoDesc)}">
<meta property="og:title" content="${escapeHtml(seoTitle)}">
<meta property="og:description" content="${escapeHtml(seoDesc)}">
<meta property="og:type" content="article">
<meta property="og:url" content="https://danilorojas.design${selfHref}">
<meta property="og:image" content="${escapeHtml(assets.ogImageUrl)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeHtml(seoTitle)}">
<meta name="twitter:description" content="${escapeHtml(seoDesc)}">
<meta name="twitter:image" content="${escapeHtml(assets.ogImageUrl)}">
${FAVICON_TAG}
<link rel="canonical" href="https://danilorojas.design${selfHref}">
<link rel="alternate" hreflang="${lang}" href="https://danilorojas.design${selfHref}">
<link rel="alternate" hreflang="${lang === "en" ? "es" : "en"}" href="https://danilorojas.design${altHref}">
<link rel="alternate" hreflang="x-default" href="https://danilorojas.design/work/${c.slug}/">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&display=swap">
<style>
${tokensCss}
${V11_STYLES}
${pipAnimationCss}
${iframeAnimationCss}
</style>
</head>
<body>
<a class="v11-skip" href="#main">${escapeHtml(skipLabel)}</a>
${renderNav(data.identity, lang, { homeHref, langHrefOverride: altHref })}
<main id="main">
  <article class="v11-case-detail">
    <div class="v11-container">
      <a class="v11-case-detail__back" href="${escapeHtml(homeHref)}#work">← ${escapeHtml(backLabel)}</a>
      <div class="v11-case-detail__grid">
        ${metaCol}
        <div class="v11-case-detail__main">
          <h1 class="v11-case-detail__title">${escapeHtml(title)}</h1>
          <p class="v11-case-detail__hook">${escapeHtml(hook)}</p>
          ${animationBlock}
          ${bulletsHtml}
          ${beatsHtml}
          ${nextBlock}
        </div>
      </div>
    </div>
  </article>
  ${renderContact(data, lang)}
</main>
${renderFooter(data.identity, lang)}
<script>${V11_SCRIPT}</script>
<script>${iframeAnimationScript}</script>
</body>
</html>`;
}

function yearRange(startYear: number, endYear: number | "present", lang: Lang): string {
  if (endYear === "present") return `${startYear} — ${lang === "en" ? "Present" : "presente"}`;
  if (startYear === endYear) return String(startYear);
  return `${startYear} — ${endYear}`;
}
