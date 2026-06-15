/**
 * Case-detail page — dark "structural / blueprint" design system.
 * One HTML per case × per lang, emitted at
 *   dist/landing-v11/work/<slug>/index.html
 *   dist/landing-v11/es/work/<slug>/index.html
 *
 * Reuses the landing's dark shell (FONT_FACES / CUSTOM_CSS / TW_CONFIG /
 * runtimeScript exported from structural.ts). Carries the seven Narrative
 * Ship beats (Context / Problem / Approach / Ship / Outcome / Differently /
 * Craft floor), a scope list, the picture-in-picture demo, and a
 * "Back to work" + "Next project" link.
 */
import type { Case, LandingData } from "../../lib/types.js";
import { escapeHtml, type Lang } from "../skills-sheet-page-1.js";
import { FAVICON_TAG } from "./v11-styles.js";
import { FONT_FACES, CUSTOM_CSS, TW_CONFIG, runtimeScript } from "./structural.js";
import { renderIframeAnimation, hasIframeAnimation, iframeAnimationCss, iframeAnimationScript } from "./animations/iframe-animation.js";
import {
  beatsFor,
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

const t = (lang: Lang, en: string, es: string): string => (lang === "en" ? en : es);

export function renderCaseDetailPage(input: CaseDetailInput): string {
  const { data, caseData: c, lang, assets } = input;
  const { identity } = data;
  const contact = identity.contact;

  const title = t(lang, c.titleEn, c.titleEs);
  const client = t(lang, c.clientEn, c.clientEs);
  const hook = t(lang, c.hookEn, c.hookEs);
  const dates = yearRange(c.yearStart, c.yearEnd, lang);
  const beats = beatsFor(c.slug);
  const labels = lang === "en" ? V11_COPY.work.beatsEn : V11_COPY.work.beatsEs;
  const backLabel = lang === "en" ? V11_COPY.work.caseBackEn : V11_COPY.work.caseBackEs;
  const nextLabel = lang === "en" ? V11_COPY.work.caseNextEn : V11_COPY.work.caseNextEs;
  const bullets = lang === "en" ? c.bulletsEn : c.bulletsEs;

  const sorted = sortedCases(data.cases);
  const idx = sorted.findIndex((x) => x.slug === c.slug);
  const next = idx >= 0 && idx < sorted.length - 1 ? sorted[idx + 1] : null;
  const fileNo = String((idx >= 0 ? idx : 0) + 1).padStart(2, "0");

  // Absolute paths — used ONLY in canonical/og/alternate meta tags.
  const altHref = lang === "en" ? `/es/work/${c.slug}/` : `/work/${c.slug}/`;
  const selfHref = lang === "en" ? `/work/${c.slug}/` : `/es/work/${c.slug}/`;
  // Relative paths — used for in-page navigation so links work under file:// and deploy.
  // Case pages live two levels deep (work/<slug>/ and es/work/<slug>/).
  const homeRel = "../../";
  const altRel = lang === "en" ? `../../es/work/${c.slug}/` : `../../../work/${c.slug}/`;
  const altLang = lang === "en" ? "es" : "en";

  const stackChips = c.stack
    .map((s) => `<span class="border border-system-line/50 px-3 py-1.5 text-[11px] font-mono text-system-dim bg-system-bg">${escapeHtml(s)}</span>`)
    .join("");

  // Nav links point back to the home page anchors.
  const navLinks = [
    ["#notes", t(lang, "Notes", "Notas")],
    ["#work", t(lang, "Work", "Trabajo")],
    ["#method", t(lang, "Method", "Método")],
    ["#about", t(lang, "About", "Sobre mí")],
    ["#contact", t(lang, "Contact", "Contacto")],
  ].map(([h, l]) => `<a href="${homeRel}${h}" class="text-system-dim hover:text-white transition-colors">${escapeHtml(l)}</a>`).join("");

  // Picture-in-picture demo (live two levels deep → basePath back to dist root).
  const animBasePath = lang === "en" ? "../../" : "../../../";
  const animationHtml = hasIframeAnimation(c.slug)
    ? renderIframeAnimation({ slug: c.slug, lang, basePath: animBasePath })
    : "";
  const animationBlock = animationHtml
    ? `<section class="w-full max-w-5xl mt-12 reveal">
    <div class="structural-border p-2 sm:p-4 bg-[#050505] relative">
      <div class="crosshair ch-tl"></div><div class="crosshair ch-tr"></div><div class="crosshair ch-bl"></div><div class="crosshair ch-br"></div>
      <div class="tech-label -top-2 left-10">DEMO // PICTURE_IN_PICTURE</div>
      ${animationHtml}
    </div>
  </section>`
    : "";

  const bulletsHtml = bullets.length > 0
    ? `<section class="w-full max-w-5xl mt-24 reveal">
    <div class="border-b border-system-line pb-4 mb-8 flex items-end justify-between">
      <h2 class="text-xl md:text-2xl font-light text-system-accent">${escapeHtml(t(lang, "What I owned.", "Lo que lideré."))}</h2>
      <span class="font-mono text-[10px] text-system-dim tracking-widest uppercase">SCOPE // ${fileNo}</span>
    </div>
    <ul class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">${bullets.map((b) => `<li class="flex items-start text-system-dim font-light leading-relaxed"><span class="mr-3 text-system-line">→</span>${escapeHtml(b)}</li>`).join("")}</ul>
  </section>`
    : "";

  const beatRow = (label: string, body: string): string =>
    `<div class="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 md:gap-8 py-7 border-t border-system-line first:border-t-0">
      <dt class="font-mono text-[10px] text-system-dim uppercase tracking-widest pt-1">${escapeHtml(label)}</dt>
      <dd class="text-system-dim font-light leading-relaxed max-w-2xl">${escapeHtml(body)}</dd>
    </div>`;

  const beatsHtml = beats
    ? `<section class="w-full max-w-5xl mt-24 reveal">
    <div class="border-b border-system-line pb-4 mb-8 flex items-end justify-between">
      <h2 class="text-xl md:text-2xl font-light text-system-accent">${escapeHtml(t(lang, "How this shipped.", "Cómo se entregó."))}</h2>
      <span class="font-mono text-[10px] text-system-dim tracking-widest uppercase">DOC // NARRATIVE</span>
    </div>
    <dl class="border-b border-system-line">
      ${beatRow(labels.context, beats.context[lang])}
      ${beatRow(labels.problem, beats.problem[lang])}
      ${beatRow(labels.approach, beats.approach[lang])}
      ${beatRow(labels.ship, beats.ship[lang])}
      ${beatRow(labels.outcome, beats.outcome[lang])}
      ${beatRow(labels.differently, beats.differently[lang])}
      ${beatRow(labels.craft, beats.craft[lang])}
    </dl>
  </section>`
    : "";

  const nextBlock = next
    ? `<a class="group structural-border mt-16 p-8 md:p-10 flex items-center justify-between bg-system-surface/20 no-underline reveal max-w-5xl w-full relative" href="${homeRel}work/${encodeURIComponent(next.slug)}/index.html">
    <div class="crosshair ch-tr"></div><div class="crosshair ch-br"></div>
    <div>
      <div class="font-mono text-[10px] text-system-dim uppercase tracking-widest mb-2">${escapeHtml(nextLabel)}</div>
      <div class="text-xl md:text-2xl font-light text-white">${escapeHtml(t(lang, next.titleEn, next.titleEs))}</div>
    </div>
    <svg class="w-6 h-6 text-system-dim group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
  </a>`
    : "";

  const seoTitle = `${title} · ${identity.name}`;
  const seoDesc = hook;
  const skipLabel = t(lang, "Skip to content", "Saltar al contenido");
  const sysIterating = t(lang, "Human_Compounding", "Humano_Acumulando");
  const sysTitle = t(lang, "A human running the loop agents run — orchestrating, evaluating, compounding", "Un humano corriendo el loop que corren los agentes — orquestando, evaluando, acumulando");

  const socials = ([["LinkedIn", contact.linkedin], ["GitHub", contact.github], ["Behance", contact.behance]] as Array<[string, string | undefined]>)
    .filter((s): s is [string, string] => typeof s[1] === "string")
    .map(([label, handle]) => {
      const href = handle.startsWith("http") ? handle : `https://${handle}`;
      return `<a href="${escapeHtml(href)}" rel="noopener" target="_blank" class="hover:text-white transition-colors">${escapeHtml(label)}</a>`;
    }).join("");

  return `<!doctype html>
<html lang="${lang}" class="scroll-smooth">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
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
<meta name="twitter:image" content="${escapeHtml(assets.ogImageUrl)}">
${FAVICON_TAG}
<link rel="canonical" href="https://danilorojas.design${selfHref}">
<link rel="alternate" hreflang="${lang}" href="https://danilorojas.design${selfHref}">
<link rel="alternate" hreflang="${altLang}" href="https://danilorojas.design${altHref}">
<link rel="alternate" hreflang="x-default" href="https://danilorojas.design/work/${c.slug}/">
<script src="https://cdn.tailwindcss.com"></script>
<script>${TW_CONFIG}</script>
<style>${FONT_FACES}${CUSTOM_CSS}${iframeAnimationCss}</style>
</head>
<body class="relative overflow-x-hidden selection:bg-white selection:text-black min-h-screen flex flex-col font-sans">

<a class="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-2 focus:left-2 focus:bg-white focus:text-black focus:px-3 focus:py-1 focus:text-sm" href="#main">${escapeHtml(skipLabel)}</a>
<div class="bg-grid"></div>
<div class="mouse-glow" id="mouseGlow"></div>

<nav class="fixed top-0 w-full z-50 border-b border-system-line bg-system-bg/80 backdrop-blur-md">
  <div class="w-full flex justify-between items-center h-14 px-4 sm:px-8 max-w-[1400px] mx-auto">
    <a href="${homeRel}" class="font-sans font-medium tracking-tight text-[15px] text-white no-underline">${escapeHtml(identity.name)} <span class="text-system-dim font-mono ml-1">· dr</span></a>
    <div class="flex items-center h-full">
      <div class="hidden md:flex space-x-8 mr-8 font-mono text-[10px] tracking-widest uppercase">${navLinks}</div>
      <div class="flex items-center border-l border-system-line h-full pl-6 space-x-4">
        <a href="${altRel}" hreflang="${altLang}" class="font-mono text-[10px] tracking-widest text-system-dim cursor-pointer hover:text-white">${lang === "en" ? "EN" : "ES"}<span class="text-system-dim/50">/${lang === "en" ? "ES" : "EN"}</span></a>
        <div class="flex items-center space-x-2 group cursor-help" title="${escapeHtml(sysTitle)}">
          <div class="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
          <span class="font-mono text-[10px] text-system-dim uppercase tracking-widest group-hover:text-white transition-colors hidden sm:inline-block">${escapeHtml(sysIterating)}</span>
        </div>
      </div>
    </div>
  </div>
  <div class="h-[1px] bg-white w-0 absolute bottom-0 left-0" id="scrollProgress"></div>
</nav>

<main id="main" class="flex-grow pt-28 pb-20 px-4 sm:px-8 relative z-10 flex flex-col items-center">

  <div class="w-full max-w-5xl mb-6 reveal">
    <a href="${homeRel}#work" class="font-mono text-[10px] text-system-dim uppercase tracking-widest hover:text-white transition-colors no-underline">← ${escapeHtml(backLabel)}</a>
  </div>

  <div class="w-full max-w-5xl relative reveal">
    <div class="structural-border p-8 sm:p-12 md:p-16 relative overflow-hidden bg-system-surface/30 backdrop-blur-sm">
      <div class="font-mono text-[10px] text-system-dim uppercase tracking-widest mb-6 flex flex-wrap gap-x-3 gap-y-1">
        <span class="text-white">${escapeHtml(client)}</span><span class="text-system-line">//</span><span>${escapeHtml(dates)}</span>
      </div>
      <h1 class="text-3xl sm:text-4xl md:text-6xl font-light tracking-tight leading-[1.1] text-white max-w-4xl">${escapeHtml(title)}</h1>
      <p class="mt-8 text-base md:text-lg text-system-dim font-light leading-relaxed max-w-2xl">${escapeHtml(hook)}</p>
      <div class="mt-10 flex flex-wrap gap-2">${stackChips}</div>
    </div>
    <div class="crosshair ch-tl"></div><div class="crosshair ch-tr"></div><div class="crosshair ch-bl"></div><div class="crosshair ch-br"></div>
    <div class="tech-label -top-2 left-10">PROJECT_FILE // ${fileNo}</div>
  </div>

  ${animationBlock}
  ${bulletsHtml}
  ${beatsHtml}
  ${nextBlock}

  <footer id="contact" class="w-full max-w-5xl mt-32 pt-16 pb-8">
    <div class="structural-border p-8 md:p-16 reveal relative bg-[#050505]">
      <div class="crosshair ch-tl"></div><div class="crosshair ch-tr"></div><div class="crosshair ch-bl"></div><div class="crosshair ch-br"></div>
      <div class="tech-label -top-2 left-10">SYS: INITIALIZE_CONNECTION</div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <span class="font-mono text-[10px] text-system-dim tracking-widest block mb-2 uppercase">${escapeHtml(t(lang, V11_COPY.contact.eyebrowEn, V11_COPY.contact.eyebrowEs))}</span>
          <h2 class="text-3xl md:text-4xl font-light mb-4 text-white">${escapeHtml(t(lang, V11_COPY.contact.titleEn, V11_COPY.contact.titleEs))}</h2>
          <p class="text-system-dim font-light mb-8 max-w-md">${escapeHtml(t(lang, V11_COPY.contact.leadEn, V11_COPY.contact.leadEs))}</p>
          <div class="space-y-6">
            <button id="emailBtn" type="button" class="group relative px-6 py-3 bg-white text-black font-mono text-[11px] tracking-widest uppercase inline-flex items-center">
              <span class="relative z-10 mr-2">${escapeHtml(contact.email)}</span>
              <svg class="relative z-10 w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            </button>
            <div id="copyMsg" class="h-4 text-[10px] font-mono text-green-500 opacity-0 transition-opacity">${escapeHtml(t(lang, "Email copied to clipboard.", "Email copiado al portapapeles."))}</div>
          </div>
        </div>
        <div class="flex flex-col justify-end">
          <div class="border border-system-line p-1 bg-system-bg">
            <div class="border border-system-line/50 p-6 relative">
              <div class="font-mono text-[10px] text-system-dim mb-4 uppercase flex justify-between"><span>Terminal.exe</span><span>v11.0</span></div>
              <div class="font-mono text-xs text-system-dim space-y-2">
                <div>&gt; ${t(lang, "System diagnostics", "Diagnóstico del sistema")}... <span class="text-green-500">OK</span></div>
                <div>&gt; ${t(lang, "Loading profile", "Cargando perfil")}... <span class="text-green-500">100%</span></div>
                <div class="text-white">&gt; ${escapeHtml(identity.availability)}</div>
                <div>&gt; ${t(lang, "Awaiting handshake", "Esperando handshake")}_</div>
                <div class="animate-pulse w-2 h-4 bg-white mt-2 inline-block"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-12 flex flex-col md:flex-row justify-between items-start md:items-center font-mono text-[10px] text-system-dim uppercase tracking-widest reveal delay-200 gap-4">
      <div>${t(lang, "Built by", "Hecho por")} ${escapeHtml(identity.name)} · ${t(lang, "Updated", "Actualizado")} 2026-06-15</div>
      <div class="flex space-x-6">${socials}</div>
    </div>
  </footer>

</main>
<script>${runtimeScript(contact.email)}</script>
<script>${iframeAnimationScript}</script>
</body>
</html>`;
}

function yearRange(startYear: number, endYear: number | "present", lang: Lang): string {
  if (endYear === "present") return `${startYear} — ${lang === "en" ? "Present" : "presente"}`;
  if (startYear === endYear) return String(startYear);
  return `${startYear} — ${endYear}`;
}
