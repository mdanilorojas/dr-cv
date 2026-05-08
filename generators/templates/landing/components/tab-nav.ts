import type { Landing, LandingTab } from "../../../lib/types.js";
import { escapeHtml, type Lang } from "../../skills-sheet-page-1.js";

function renderTabButton(tab: LandingTab, lang: Lang): string {
  const label = lang === "en" ? tab.labelEn : tab.labelEs;
  const selected = tab.default === true ? "true" : "false";
  const tabindex = tab.default === true ? "0" : "-1";
  return `<button
    type="button"
    role="tab"
    id="tab-${tab.id}"
    aria-controls="tabpanel-${tab.id}"
    aria-selected="${selected}"
    tabindex="${tabindex}"
    data-tab="${tab.id}"
    class="lp-tab${tab.default === true ? " lp-tab--active" : ""}"
  >${escapeHtml(label)}</button>`;
}

function renderLangToggle(lang: Lang): string {
  if (lang === "en") {
    return `<a class="lp-lang" href="/es/" hreflang="es" aria-label="Ver en español">
      <span class="lp-lang__code">EN</span><span class="lp-lang__sep">/</span><span class="lp-lang__code lp-lang__code--target">ES</span>
    </a>`;
  }
  return `<a class="lp-lang" href="/" hreflang="en" aria-label="View in English">
    <span class="lp-lang__code lp-lang__code--target">EN</span><span class="lp-lang__sep">/</span><span class="lp-lang__code">ES</span>
  </a>`;
}

export function renderTabNav(landing: Landing, lang: Lang): string {
  const tabsLabel = lang === "en" ? "Primary sections" : "Secciones principales";
  const tabButtons = landing.tabs.map((t) => renderTabButton(t, lang)).join("\n");
  return `<nav class="lp-nav" aria-label="${escapeHtml(
    lang === "en" ? "Main navigation" : "Navegación principal",
  )}">
  <div class="lp-nav__inner">
    <a class="lp-nav__brand" href="#overview" data-tab="overview" aria-label="Danilo Rojas">
      <span class="lp-nav__name">Danilo Rojas</span>
      <span class="lp-nav__slash">/</span>
      <span class="lp-nav__role">Agentic Designer</span>
    </a>
    <div class="lp-nav__tabs" role="tablist" aria-label="${escapeHtml(tabsLabel)}">
      ${tabButtons}
    </div>
    ${renderLangToggle(lang)}
  </div>
</nav>`;
}
