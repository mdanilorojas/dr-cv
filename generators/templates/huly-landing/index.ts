import type {
  LandingData,
  Positioning,
  Identity,
  Case,
  Experience,
  ExperienceItem,
  Testimonial,
  AttributedTestimonial,
  Landing,
} from "../../lib/types.js";
import { escapeHtml, type Lang } from "../skills-sheet-page-1.js";
import { HULY_STYLES } from "./huly-styles.js";
import { HULY_SCRIPT } from "./huly-script.js";

/* ============== helpers ============== */

function splitName(name: string): { first: string; last: string } {
  const parts = name.trim().split(/\s+/);
  return { first: parts.slice(0, -1).join(" "), last: parts.slice(-1)[0] ?? "" };
}

function yearRange(
  startYear: number,
  endYear: number | "present",
  lang: Lang,
): string {
  if (endYear === "present") return `${startYear} — ${lang === "en" ? "Present" : "presente"}`;
  if (startYear === endYear) return String(startYear);
  return `${startYear} — ${endYear}`;
}

/* ============== nav ============== */

function renderNav(identity: Identity, landing: Landing, lang: Lang): string {
  const workLabel = lang === "en" ? "Work" : "Trabajo";
  const methodLabel = lang === "en" ? "Method" : "Método";
  const aboutLabel = lang === "en" ? "About" : "Sobre mí";
  const contactLabel = lang === "en" ? "Contact" : "Contacto";
  const cta = lang === "en" ? landing.cta.en : landing.cta.es;
  const langHref = lang === "en" ? "/es/" : "/";
  const langLabel = lang === "en" ? "ES" : "EN";
  const langAria = lang === "en" ? "Ver en español" : "View in English";
  const navAria = lang === "en" ? "Main navigation" : "Navegación principal";

  return `<nav class="hl-nav" aria-label="${escapeHtml(navAria)}">
  <div class="hl-nav__inner">
    <a href="#top" class="hl-nav__brand">
      ${escapeHtml(identity.name)}<span class="hl-nav__brand-accent"> · dr</span>
    </a>
    <div class="hl-nav__links">
      <a class="hl-nav__link" href="#work">${escapeHtml(workLabel)}</a>
      <a class="hl-nav__link" href="#method">${escapeHtml(methodLabel)}</a>
      <a class="hl-nav__link" href="#about">${escapeHtml(aboutLabel)}</a>
      <a class="hl-nav__link" href="#contact">${escapeHtml(contactLabel)}</a>
      <a class="hl-nav__lang" href="${langHref}" hreflang="${lang === "en" ? "es" : "en"}" aria-label="${escapeHtml(langAria)}">${langLabel}</a>
      <a class="hl-nav__cta" href="#contact">${escapeHtml(cta)}</a>
    </div>
  </div>
</nav>`;
}

/* ============== hero ============== */

function renderHero(
  identity: Identity,
  positioning: Positioning,
  landing: Landing,
  lang: Lang,
): string {
  const { first, last } = splitName(identity.name);
  const eyebrow = lang === "en"
    ? "Agentic Designer · Product Engineer · 15 years shipping"
    : "Diseñador Agéntico · Product Engineer · 15 años entregando";
  const cta = lang === "en" ? landing.cta.en : landing.cta.es;
  const ctaGhost = lang === "en" ? "See the work" : "Ver el trabajo";

  // Huly-style compressed hero copy (4-5 word headline).
  const headline = lang === "en"
    ? "Agentic Designer shipping real products."
    : "Diseñador Agéntico entregando productos reales.";

  return `<section id="top" class="hl-section hl-section--hero" aria-label="Hero">
  <div class="hl-hero__bg" aria-hidden="true">
    <div class="hl-hero__aurora"></div>
    <div class="hl-hero__mask"></div>
  </div>
  <div class="hl-container">
    <div class="hl-hero__grid">
      <div>
        <div class="hl-section__eyebrow">${escapeHtml(eyebrow)}</div>
        <h1 class="hl-hero__name">${escapeHtml(headline)}</h1>
        <p class="hl-hero__sub">${escapeHtml(lang === "en" ? positioning.thesis.en : positioning.thesis.es)}</p>
        <div class="hl-hero__actions">
          <div class="hl-cta">
            <div class="hl-cta__aura" aria-hidden="true"></div>
            <a class="hl-cta__pill" href="#contact">
              ${escapeHtml(cta)}
              <span class="hl-cta__arrow" aria-hidden="true">→</span>
            </a>
          </div>
          <a class="hl-cta--ghost" href="#work">
            ${escapeHtml(ctaGhost)}
          </a>
          <span class="hl-hero__live">
            <span class="hl-live-dot" aria-hidden="true"></span>
            ${escapeHtml(identity.availability)}
          </span>
        </div>
      </div>
    </div>
  </div>
  <div class="hl-hero__fade" aria-hidden="true"></div>
</section>`;
}

/* ============== marquee ============== */

function renderMarquee(lang: Lang): string {
  const label = lang === "en"
    ? "Everything in one repo — single source of truth, agent-updated:"
    : "Todo en un repo — única fuente de verdad, actualizado por agentes:";
  const items = [
    "Skills sheet",
    "CV warm",
    "CV serious",
    "CV BairesDev",
    "Landing",
    "Case studies",
    "Agent-updatable /data/",
    "Claude Code + MCP",
    "Subagent orchestration",
    "Skills-lock reproducible",
  ];
  // Double the track so the loop is seamless.
  const one = items
    .map((t, i) => `<li class="hl-marquee__item">${escapeHtml(t)}</li>${i < items.length - 1 ? '<li class="hl-marquee__dot" aria-hidden="true">●</li>' : ""}`)
    .join("\n      ");
  const twice = `${one}\n      <li class="hl-marquee__dot" aria-hidden="true">●</li>\n      ${one}`;
  return `<div class="hl-marquee">
  <span class="hl-marquee__label">${escapeHtml(label)}</span>
  <ul class="hl-marquee__track" role="marquee">
      ${twice}
  </ul>
  <div class="hl-marquee__fade-l" aria-hidden="true"></div>
  <div class="hl-marquee__fade-r" aria-hidden="true"></div>
</div>`;
}

/* ============== proof numbers ============== */

function renderProofNumbers(positioning: Positioning, lang: Lang): string {
  const items = positioning.proofNumbers
    .map((p) => {
      const label = lang === "en" ? p.labelEn : p.labelEs;
      const unit = p.unit ? `<span class="hl-proof__unit">${escapeHtml(p.unit)}</span>` : "";
      return `<div class="hl-proof__item">
    <div class="hl-proof__num">${escapeHtml(p.value)}${unit}</div>
    <div class="hl-proof__label">${escapeHtml(label)}</div>
  </div>`;
    })
    .join("\n  ");
  return `<div class="hl-proof" role="list">${items}</div>`;
}

/* ============== work cards ============== */

function renderCaseCard(c: Case, lang: Lang): string {
  const title = lang === "en" ? c.titleEn : c.titleEs;
  const client = lang === "en" ? c.clientEn : c.clientEs;
  const hook = lang === "en" ? c.hookEn : c.hookEs;
  const bullets = lang === "en" ? c.bulletsEn : c.bulletsEs;

  const bulletsHtml = bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join("\n    ");
  const stackHtml = c.stack.map((s) => `<span class="hl-chip">${escapeHtml(s)}</span>`).join(" ");
  const cls = c.featured ? "hl-card hl-card--featured" : "hl-card";

  return `<article class="${cls}" data-reveal>
  <div>
    <div class="hl-card__meta">
      <span class="hl-card__client">${escapeHtml(client)}</span>
      <span>${escapeHtml(yearRange(c.yearStart, c.yearEnd, lang))}</span>
    </div>
    <h3 class="hl-card__title">${escapeHtml(title)}</h3>
    <p class="hl-card__hook">${escapeHtml(hook)}</p>
    <ul class="hl-card__bullets">
    ${bulletsHtml}
    </ul>
    <div class="hl-card__stack">${stackHtml}</div>
  </div>
</article>`;
}

function renderWorkSection(data: LandingData, lang: Lang): string {
  const eyebrow = lang === "en" ? "Selected work" : "Trabajo seleccionado";
  const h2 = lang === "en" ? "Products shipped. Tools built." : "Productos entregados. Herramientas construidas.";
  const sub = lang === "en"
    ? "Four cases across enterprise consulting, production SaaS, and agentic tooling. The combination is the product."
    : "Cuatro casos entre consultoría enterprise, SaaS en producción y tooling agéntico. La combinación es el producto.";

  const cases = [...data.cases].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return b.yearStart - a.yearStart;
  });

  const cards = cases.map((c) => renderCaseCard(c, lang)).join("\n  ");

  return `<section id="work" class="hl-section" aria-labelledby="work-h2">
  <div class="hl-container hl-section__inner">
    <div class="hl-section__eyebrow">${escapeHtml(eyebrow)}</div>
    <h2 id="work-h2" class="hl-h2 hl-h2--gradient">${escapeHtml(h2)}</h2>
    <p class="hl-sub">${escapeHtml(sub)}</p>
    <div class="hl-cards">
      ${cards}
    </div>
  </div>
</section>`;
}

/* ============== method ============== */

function renderMethodDiagram(lang: Lang): string {
  const nodes = [
    { id: "profile", labelEn: "Profile", labelEs: "Perfil", x: 40, y: 84 },
    { id: "claude", labelEn: "Claude Code", labelEs: "Claude Code", x: 220, y: 84 },
    { id: "mcp", labelEn: "MCP servers", labelEs: "MCP servers", x: 400, y: 84 },
    { id: "sub", labelEn: "Subagents", labelEs: "Subagentes", x: 580, y: 84 },
    { id: "ship", labelEn: "Shipped work", labelEs: "Trabajo entregado", x: 400, y: 220 },
  ];
  const rects = nodes
    .map((n) => {
      const lbl = lang === "en" ? n.labelEn : n.labelEs;
      return `  <g transform="translate(${n.x}, ${n.y})">
    <rect x="0" y="0" width="140" height="44" rx="8" fill="#18191B" stroke="#FF8964"/>
    <text x="70" y="27" text-anchor="middle" fill="#ffffff" font-size="13" font-family="Inter,sans-serif" font-weight="500">${escapeHtml(lbl)}</text>
  </g>`;
    })
    .join("\n");
  const arrows = `
  <line x1="180" y1="106" x2="218" y2="106" stroke="#95979E" stroke-width="1.5" marker-end="url(#hlarr)"/>
  <line x1="360" y1="106" x2="398" y2="106" stroke="#95979E" stroke-width="1.5" marker-end="url(#hlarr)"/>
  <line x1="540" y1="106" x2="578" y2="106" stroke="#95979E" stroke-width="1.5" marker-end="url(#hlarr)"/>
  <path d="M 650 128 Q 650 200 540 220" stroke="#FF8964" stroke-width="1.6" fill="none" marker-end="url(#hlarr-orange)"/>
  <path d="M 110 128 Q 110 200 400 220" stroke="#95979E" stroke-width="1" stroke-dasharray="5 3" fill="none" marker-end="url(#hlarr)"/>
  `;
  const ariaLabel = lang === "en"
    ? "How I work diagram: Profile, Claude Code, MCP servers, Subagents, Shipped work"
    : "Diagrama de cómo trabajo: Perfil, Claude Code, MCP servers, Subagentes, Trabajo entregado";
  return `<figure class="hl-method" role="img" aria-label="${escapeHtml(ariaLabel)}">
  <svg viewBox="0 0 760 290" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="hlarr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#95979E"/></marker>
      <marker id="hlarr-orange" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#FF8964"/></marker>
    </defs>
${rects}
${arrows}
  </svg>
</figure>`;
}

function renderTestimonial(t: Testimonial | AttributedTestimonial, lang: Lang): string {
  const quote = lang === "es" && t.quoteEs ? t.quoteEs : t.quote;
  const company = t.company ? ` · ${escapeHtml(t.company)}` : "";
  const badgeText = t.source === "verified"
    ? (lang === "en" ? "Verified" : "Verificado")
    : (lang === "en" ? "Attributed" : "Atribuido");
  return `<figure class="hl-quote">
  <blockquote class="hl-quote__text">
    <span class="hl-quote__mark" aria-hidden="true">"</span>${escapeHtml(quote)}
  </blockquote>
  <figcaption class="hl-quote__attr">
    <span class="hl-quote__author">${escapeHtml(t.author)}</span>
    <span class="hl-quote__role">${escapeHtml(t.role)}${company}</span>
    <span class="hl-quote__badge">${escapeHtml(badgeText)}</span>
  </figcaption>
</figure>`;
}

function renderMethodSection(data: LandingData, lang: Lang): string {
  const eyebrow = lang === "en" ? "How I work" : "Cómo trabajo";
  const h2 = lang === "en" ? "Profile plus agentic AI." : "Perfil más IA agéntica.";
  const sub = lang === "en"
    ? "Fifteen years of craft meets Claude Code, MCP servers, subagent orchestration, and skills-lock reproducibility. The leverage is real — the craft is mine."
    : "Quince años de craft con Claude Code, MCP servers, orquestación de subagentes y skills-lock reproducible. El apalancamiento es real — el craft es mío.";
  const giraldez = data.testimonials.find((t) => t.author.includes("Giraldez")) ?? data.testimonials[0];
  return `<section id="method" class="hl-section hl-section--dark-alt" aria-labelledby="method-h2">
  <div class="hl-container hl-section__inner">
    <div class="hl-section__eyebrow">${escapeHtml(eyebrow)}</div>
    <h2 id="method-h2" class="hl-h2 hl-h2--gradient">${escapeHtml(h2)}</h2>
    <p class="hl-sub">${escapeHtml(sub)}</p>
    ${renderMethodDiagram(lang)}
    ${renderProofNumbers(data.positioning, lang)}
    ${giraldez ? renderTestimonial(giraldez, lang) : ""}
  </div>
</section>`;
}

/* ============== about ============== */

function renderTimelineRow(item: ExperienceItem, lang: Lang): string {
  const desc = lang === "en" ? item.descriptionEn : item.descriptionEs;
  const cls = item.endYear === "present" ? "hl-timeline__row hl-timeline__row--current" : "hl-timeline__row";
  return `<li class="${cls}">
    <div class="hl-timeline__marker" aria-hidden="true"></div>
    <div class="hl-timeline__years">${escapeHtml(yearRange(item.startYear, item.endYear, lang))}</div>
    <div>
      <div class="hl-timeline__company">${escapeHtml(item.company)}</div>
      <div class="hl-timeline__role">${escapeHtml(item.role)}</div>
      <p class="hl-timeline__desc">${escapeHtml(desc)}</p>
    </div>
  </li>`;
}

function renderAboutSection(data: LandingData, lang: Lang): string {
  const eyebrow = lang === "en" ? "About" : "Sobre mí";
  const h2 = lang === "en" ? "15 years shipping. Still curious." : "15 años entregando. Todavía curioso.";
  const sub = lang === "en"
    ? `${data.identity.location} · ${data.identity.languages}. Currently consulting at Booz Allen Hamilton via BairesDev; running EnRegla and Life Update on the side.`
    : `${data.identity.location} · ${data.identity.languages}. Actualmente consultando en Booz Allen Hamilton vía BairesDev; corriendo EnRegla y Life Update en paralelo.`;

  const rows = [...data.experience.current, ...(data.experience.past ?? [])]
    .sort((a, b) => {
      const ae = a.endYear === "present" ? 9999 : a.endYear;
      const be = b.endYear === "present" ? 9999 : b.endYear;
      return be - ae;
    })
    .map((x) => renderTimelineRow(x, lang))
    .join("\n");

  return `<section id="about" class="hl-section hl-section--cream" aria-labelledby="about-h2">
  <div class="hl-lines-bg" aria-hidden="true"></div>
  <div class="hl-container hl-section__inner">
    <div class="hl-section__eyebrow">${escapeHtml(eyebrow)}</div>
    <h2 id="about-h2" class="hl-h2">${escapeHtml(h2)}</h2>
    <p class="hl-sub">${escapeHtml(sub)}</p>
    <ol class="hl-timeline">
${rows}
    </ol>
  </div>
</section>`;
}

/* ============== contact ============== */

function renderContactSection(data: LandingData, lang: Lang): string {
  const eyebrow = lang === "en" ? "Contact" : "Contacto";
  const h2 = lang === "en" ? "Let's talk." : "Hablemos.";
  const sub = lang === "en"
    ? "Direct email is the fastest path. I reply within one business day."
    : "El email directo es el camino más rápido. Respondo en un día laboral.";

  const c = data.identity.contact;
  const socials: Array<[string, string | undefined]> = [
    ["LinkedIn", c.linkedin],
    ["GitHub", c.github],
    ["Behance", c.behance],
  ];
  const socialHtml = socials
    .filter((s): s is [string, string] => typeof s[1] === "string")
    .map(([lbl, handle]) => {
      const href = handle.startsWith("http") ? handle : `https://${handle}`;
      return `<a class="hl-contact__social" href="${escapeHtml(href)}" rel="noopener" target="_blank">
      <span class="hl-contact__social-label">${escapeHtml(lbl)}</span>
      <span class="hl-contact__social-handle">${escapeHtml(handle)}</span>
    </a>`;
    })
    .join("\n    ");

  const copyLabel = lang === "en" ? "Copy email" : "Copiar email";
  const copiedLabel = lang === "en" ? "Copied" : "Copiado";
  const cta = lang === "en" ? data.landing.cta.en : data.landing.cta.es;
  const sheppard = data.testimonials.find((t) => t.author.includes("Sheppard")) ?? data.testimonials[0];

  return `<section id="contact" class="hl-section" aria-labelledby="contact-h2">
  <div class="hl-container hl-section__inner">
    <div class="hl-section__eyebrow">${escapeHtml(eyebrow)}</div>
    <h2 id="contact-h2" class="hl-h2 hl-h2--gradient">${escapeHtml(h2)}</h2>
    <p class="hl-sub">${escapeHtml(sub)}</p>

    <div class="hl-contact">
      <div class="hl-contact__live">
        <span class="hl-live-dot" aria-hidden="true"></span>
        <span>${escapeHtml(data.identity.availability)}</span>
      </div>
      <div class="hl-cta" style="align-self:flex-start;">
        <div class="hl-cta__aura" aria-hidden="true"></div>
        <a class="hl-cta__pill" href="mailto:${escapeHtml(c.email)}">
          ${escapeHtml(cta)}
          <span class="hl-cta__arrow" aria-hidden="true">→</span>
        </a>
      </div>
      <div class="hl-contact__email-row">
        <span class="hl-contact__email">${escapeHtml(c.email)}</span>
        <button type="button"
          class="hl-contact__copy"
          data-action="copy-email"
          data-email="${escapeHtml(c.email)}"
          data-copy-label="${escapeHtml(copyLabel)}"
          data-copied-label="${escapeHtml(copiedLabel)}"
        >${escapeHtml(copyLabel)}</button>
      </div>
      <div class="hl-contact__socials">
    ${socialHtml}
      </div>
    </div>

    ${sheppard ? renderTestimonial(sheppard, lang) : ""}
  </div>
</section>`;
}

/* ============== footer ============== */

function renderFooter(identity: Identity, lang: Lang): string {
  const text = lang === "en"
    ? `Built by ${identity.name}. Source on ${identity.contact.github ?? "GitHub"}.`
    : `Hecho por ${identity.name}. Código en ${identity.contact.github ?? "GitHub"}.`;
  return `<footer class="hl-footer">
  <div class="hl-footer__inner">
    <span>${escapeHtml(text)}</span>
    <span>${escapeHtml(identity.contact.email)}</span>
  </div>
</footer>`;
}

/* ============== root ============== */

export function renderHulyLanding(data: LandingData, lang: Lang, tokensCss: string): string {
  const title = lang === "en" ? data.landing.seo.titleEn : data.landing.seo.titleEs;
  const description = lang === "en" ? data.landing.seo.descriptionEn : data.landing.seo.descriptionEs;
  const altHref = lang === "en" ? "/es/" : "/";
  const altLang = lang === "en" ? "es" : "en";
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
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap">
<style>
${tokensCss}
${HULY_STYLES}
</style>
</head>
<body>
${renderNav(data.identity, data.landing, lang)}
<main>
${renderHero(data.identity, data.positioning, data.landing, lang)}
${renderMarquee(lang)}
${renderWorkSection(data, lang)}
${renderMethodSection(data, lang)}
${renderAboutSection(data, lang)}
${renderContactSection(data, lang)}
</main>
${renderFooter(data.identity, lang)}
<script>${HULY_SCRIPT}</script>
</body>
</html>`;
}
