import type { LandingData, LandingTab } from "../../lib/types.js";
import { escapeHtml, type Lang } from "../skills-sheet-page-1.js";
import { renderTabNav } from "./components/tab-nav.js";
import { renderHeroBlock } from "./components/hero-block.js";
import { renderProofNumbers } from "./components/proof-numbers.js";
import { renderCaseExpander } from "./components/case-expander.js";
import { renderMethodDiagram } from "./components/method-diagram.js";
import { renderTimeline } from "./components/timeline.js";
import { renderTestimonialFeatured } from "./components/testimonial-featured.js";
import { renderSectionVisual } from "./components/section-visual.js";
import { renderContactBlock } from "./components/contact-block.js";
import { renderMeAgentDock } from "./components/me-agent-dock.js";
import { LANDING_STYLES } from "./landing-styles.js";
import { LANDING_SCRIPT } from "./landing-script.js";

interface PanelContext {
  data: LandingData;
  lang: Lang;
  tab: LandingTab;
}

function renderOverview({ data, lang, tab }: PanelContext): string {
  return `
${renderSectionVisual(tab.visual)}
${renderHeroBlock(data.identity, data.positioning, data.landing, lang)}
${renderProofNumbers(data.positioning, lang)}`;
}

function renderWork({ data, lang, tab }: PanelContext): string {
  const cases = [...data.cases].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return b.yearStart - a.yearStart;
  });
  const eyebrow = lang === "en" ? "Selected work" : "Trabajo seleccionado";
  const title = lang === "en" ? "Products shipped and tools built." : "Productos entregados y herramientas construidas.";
  const lead = lang === "en"
    ? "Four case studies across enterprise consulting, production SaaS, and agentic tooling."
    : "Cuatro casos entre consultoría enterprise, SaaS en producción y tooling agéntico.";
  return `
${renderSectionVisual(tab.visual)}
<div class="lp-panel__eyebrow">${escapeHtml(eyebrow)}</div>
<h2 class="lp-panel__title">${escapeHtml(title)}</h2>
<p class="lp-panel__lead">${escapeHtml(lead)}</p>
<div class="lp-cases">
  ${cases.map((c) => renderCaseExpander(c, lang)).join("\n  ")}
</div>`;
}

function renderMethod({ data, lang, tab }: PanelContext): string {
  const eyebrow = lang === "en" ? "How I work" : "Cómo trabajo";
  const title = lang === "en"
    ? "Profile plus agentic AI. It's a combination, not a shortcut."
    : "Perfil más IA agéntica. Es una combinación, no un atajo.";
  const lead = lang === "en"
    ? "Fifteen years of craft. Claude Code, MCP servers, subagent orchestration, and skills-lock reproducibility. The combination lets me ship work that would otherwise need a team — without losing the craft."
    : "Quince años de craft. Claude Code, MCP servers, orquestación de subagentes y skills-lock reproducible. La combinación me permite entregar trabajo que normalmente necesitaría un equipo — sin perder el craft.";
  const testimonial = data.testimonials.find((t) => t.author.includes("Giraldez"))
    ?? data.testimonials[0];
  return `
${renderSectionVisual(tab.visual)}
<div class="lp-panel__eyebrow">${escapeHtml(eyebrow)}</div>
<h2 class="lp-panel__title">${escapeHtml(title)}</h2>
<p class="lp-panel__lead">${escapeHtml(lead)}</p>
${renderMethodDiagram(lang)}
${renderProofNumbers(data.positioning, lang)}
${testimonial ? renderTestimonialFeatured(testimonial, lang) : ""}`;
}

function renderAbout({ data, lang, tab }: PanelContext): string {
  const eyebrow = lang === "en" ? "About" : "Sobre mí";
  const title = lang === "en"
    ? "15 years shipping. Still curious."
    : "15 años entregando. Todavía curioso.";
  const lead = lang === "en"
    ? `${data.identity.location} · ${data.identity.languages}. Currently consulting at Booz Allen Hamilton via BairesDev; running EnRegla and Life Update on the side.`
    : `${data.identity.location} · ${data.identity.languages}. Actualmente consultando en Booz Allen Hamilton vía BairesDev; corriendo EnRegla y Life Update en paralelo.`;
  return `
${renderSectionVisual(tab.visual)}
<div class="lp-panel__eyebrow">${escapeHtml(eyebrow)}</div>
<h2 class="lp-panel__title">${escapeHtml(title)}</h2>
<p class="lp-panel__lead">${escapeHtml(lead)}</p>
${renderTimeline(data.experience, lang)}`;
}

function renderContact({ data, lang, tab }: PanelContext): string {
  const eyebrow = lang === "en" ? "Contact" : "Contacto";
  const title = lang === "en" ? "Let's talk." : "Hablemos.";
  const lead = lang === "en"
    ? "Direct email is the fastest path. I reply within one business day."
    : "El email directo es el camino más rápido. Respondo en un día laboral.";
  const verified = data.testimonials.find((t) => t.author.includes("Sheppard"))
    ?? data.testimonials[0];
  return `
${renderSectionVisual(tab.visual)}
<div class="lp-panel__eyebrow">${escapeHtml(eyebrow)}</div>
<h2 class="lp-panel__title">${escapeHtml(title)}</h2>
<p class="lp-panel__lead">${escapeHtml(lead)}</p>
${renderContactBlock(data.identity, data.landing, lang)}
${verified ? renderTestimonialFeatured(verified, lang) : ""}
${renderMeAgentDock()}`;
}

const PANEL_RENDERERS: Record<string, (ctx: PanelContext) => string> = {
  overview: renderOverview,
  work: renderWork,
  method: renderMethod,
  about: renderAbout,
  contact: renderContact,
};

function renderPanel(ctx: PanelContext): string {
  const body = PANEL_RENDERERS[ctx.tab.id](ctx);
  const hidden = ctx.tab.default === true ? "" : "hidden";
  return `<section
  id="tabpanel-${ctx.tab.id}"
  class="lp-panel lp-panel--${ctx.tab.id}"
  role="tabpanel"
  aria-labelledby="tab-${ctx.tab.id}"
  tabindex="0"
  ${hidden}
>
${body}
</section>`;
}

export function renderLanding(data: LandingData, lang: Lang, tokensCss: string): string {
  const title = lang === "en" ? data.landing.seo.titleEn : data.landing.seo.titleEs;
  const description = lang === "en" ? data.landing.seo.descriptionEn : data.landing.seo.descriptionEs;
  const altHref = lang === "en" ? "/es/" : "/";
  const altLang = lang === "en" ? "es" : "en";
  const footerText = lang === "en"
    ? `Built by ${data.identity.name}. Source in ${data.identity.contact.github ?? "GitHub"}.`
    : `Hecho por ${data.identity.name}. Código en ${data.identity.contact.github ?? "GitHub"}.`;

  const panels = data.landing.tabs
    .map((tab) => renderPanel({ data, lang, tab }))
    .join("\n");

  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}">
<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:description" content="${escapeHtml(description)}">
<meta property="og:type" content="website">
<link rel="alternate" hreflang="${altLang}" href="${altHref}">
<link rel="alternate" hreflang="${lang}" href="${lang === "en" ? "/" : "/es/"}">
<style>
${tokensCss}
${LANDING_STYLES}
</style>
</head>
<body>
<div class="lp-page">
  ${renderTabNav(data.landing, lang)}
  <main class="lp-main">
${panels}
  </main>
  <footer class="lp-footer">
    <span>${escapeHtml(footerText)}</span>
    <span>${escapeHtml(data.identity.contact.email)}</span>
  </footer>
</div>
<script>${LANDING_SCRIPT}</script>
</body>
</html>`;
}
