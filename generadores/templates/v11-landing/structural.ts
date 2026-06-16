import type { LandingData, Case, HorizonColumn } from "../../lib/types.js";
import { escapeHtml, type Lang } from "../skills-sheet-page-1.js";
import { V11_COPY, sortedCases } from "./index.js";
import type { V11LandingAssets } from "./index.js";
import { FAVICON_TAG } from "./v11-styles.js";

/* ============================================================================
 * Dark "structural / blueprint" landing — data-driven, bilingual.
 * Visual spec: laboratorio/superpowers/specs/2026-06-15-structural-landing-mockup.html
 * Tailwind Play CDN for utilities (v1); self-hosted fonts; custom CSS below.
 * ========================================================================== */

export const FONT_FACES = `
@font-face{font-family:"Inter";font-style:normal;font-weight:400;font-display:swap;src:url("/assets/fonts/inter-400.woff2") format("woff2");}
@font-face{font-family:"Inter";font-style:normal;font-weight:500;font-display:swap;src:url("/assets/fonts/inter-500.woff2") format("woff2");}
@font-face{font-family:"Inter";font-style:normal;font-weight:600;font-display:swap;src:url("/assets/fonts/inter-600.woff2") format("woff2");}
@font-face{font-family:"Inter";font-style:normal;font-weight:700;font-display:swap;src:url("/assets/fonts/inter-700.woff2") format("woff2");}
@font-face{font-family:"JetBrains Mono";font-style:normal;font-weight:400;font-display:swap;src:url("/assets/fonts/jetbrains-mono-400.woff2") format("woff2");}
@font-face{font-family:"JetBrains Mono";font-style:normal;font-weight:500;font-display:swap;src:url("/assets/fonts/jetbrains-mono-500.woff2") format("woff2");}
@font-face{font-family:"Source Serif 4";font-style:normal;font-weight:400;font-display:swap;src:url("/assets/fonts/source-serif-4-400.woff2") format("woff2");}
@font-face{font-family:"Source Serif 4";font-style:normal;font-weight:600;font-display:swap;src:url("/assets/fonts/source-serif-4-600.woff2") format("woff2");}
@font-face{font-family:"Source Serif 4";font-style:italic;font-weight:400;font-display:swap;src:url("/assets/fonts/source-serif-4-400-italic.woff2") format("woff2");}
`;

export const CUSTOM_CSS = `
:root {
  --mouse-x: 50%; --mouse-y: 50%;
  /* semantic color channels (R G B) consumed by Tailwind rgb(var() / <alpha-value>) */
  --c-bg: 3 3 3;
  --c-surface: 10 10 10;
  --c-line: 255 255 255;
  --c-text: 237 237 237;
  --c-dim: 138 138 138;
  --c-accent: 255 255 255;
  --c-panel: 10 10 10;
  /* raw UI literals (carry their own alpha) */
  --ui-grid: rgba(255,255,255,0.04);
  --ui-glow: rgba(255,255,255,0.04);
  --ui-border: rgba(255,255,255,0.08);
  --ui-border-hover: rgba(255,255,255,0.25);
  --ui-crosshair: #8a8a8a;
  --ui-metric: #0d0d10;
  --ui-metric-hover: #141418;
  --ui-inset: rgba(255,255,255,0.05);
  --ui-inset-hover: rgba(255,255,255,0.1);
  --ui-hint: rgba(255,255,255,.22);
  --ui-hint-hover: rgba(255,255,255,.85);
  --ui-scroll-track: #030303;
  --ui-scroll-thumb: #333333;
  --ui-scroll-thumb-hover: #555555;
}
html.light {
  --c-bg: 246 244 239;
  --c-surface: 255 255 255;
  --c-line: 17 19 24;
  --c-text: 28 30 36;
  --c-dim: 92 98 110;
  --c-accent: 17 19 24;
  --c-panel: 251 250 247;
  --ui-grid: rgba(17,19,24,0.05);
  --ui-glow: rgba(17,19,24,0.035);
  --ui-border: rgba(17,19,24,0.12);
  --ui-border-hover: rgba(17,19,24,0.30);
  --ui-crosshair: #a7a29a;
  --ui-metric: #ffffff;
  --ui-metric-hover: #f1efe9;
  --ui-inset: rgba(17,19,24,0.05);
  --ui-inset-hover: rgba(17,19,24,0.10);
  --ui-hint: rgba(17,19,24,.28);
  --ui-hint-hover: rgba(17,19,24,.9);
  --ui-scroll-track: #f6f4ef;
  --ui-scroll-thumb: #cfcabf;
  --ui-scroll-thumb-hover: #b3ad9f;
}
/* theme-toggle icon visibility: show the theme it will switch TO */
.theme-light-only{ display:none; } html.light .theme-light-only{ display:inline-flex; } html.light .theme-dark-only{ display:none; }
/* investing-phase chips: blue accent, readable in both themes */
.phase-chip-invest{ border:1px solid rgba(59,130,246,.35); color:#bfdbfe; background:rgba(30,58,138,.18); }
html.light .phase-chip-invest{ color:#1e40af; border-color:rgba(30,64,175,.30); background:rgba(59,130,246,.10); }
body { background-color: rgb(var(--c-bg)); color: rgb(var(--c-text)); -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale; transition: background-color .4s ease, color .4s ease; }
.bg-grid { position:fixed; inset:0; z-index:-1;
  background-image: linear-gradient(to right, var(--ui-grid) 1px, transparent 1px), linear-gradient(to bottom, var(--ui-grid) 1px, transparent 1px);
  background-size:80px 80px; background-position:center top;
  mask-image: radial-gradient(circle at center, black 60%, transparent 100%);
  -webkit-mask-image: radial-gradient(circle at center, black 60%, transparent 100%); }
.mouse-glow { position:fixed; inset:0; z-index:-1; pointer-events:none;
  background: radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), var(--ui-glow), transparent 40%); }
.structural-border { border:1px solid var(--ui-border); position:relative; transition:border-color .4s ease, background-color .4s ease; }
.structural-border:hover { border-color: var(--ui-border-hover); }
.crosshair { position:absolute; width:13px; height:13px; pointer-events:none; transition:transform .5s cubic-bezier(.4,0,.2,1); }
.structural-border:hover .crosshair { transform:scale(1.5) rotate(90deg); opacity:.8; }
.crosshair::before, .crosshair::after { content:''; position:absolute; background-color:var(--ui-crosshair); opacity:.5; }
.crosshair::before { top:6px; left:0; width:13px; height:1px; }
.crosshair::after { top:0; left:6px; width:1px; height:13px; }
.ch-tl{top:-7px;left:-7px;} .ch-tr{top:-7px;right:-7px;} .ch-bl{bottom:-7px;left:-7px;} .ch-br{bottom:-7px;right:-7px;}
.reveal { opacity:0; transform:translateY(20px); transition:all .8s cubic-bezier(.16,1,.3,1); }
.reveal.active { opacity:1; transform:translateY(0); }
.delay-100{transition-delay:100ms;} .delay-200{transition-delay:200ms;}
.tech-label { position:absolute; background:rgb(var(--c-bg)); padding:0 6px; font-family:'JetBrains Mono',monospace; font-size:10px; color:rgb(var(--c-dim)); letter-spacing:.1em; text-transform:uppercase; border:1px solid var(--ui-border); z-index:10; }
.metric-card { background-color:var(--ui-metric); box-shadow: inset 0 1px 0 var(--ui-inset); transition: background-color .4s ease, box-shadow .4s ease; }
.metric-card:hover { background-color:var(--ui-metric-hover); box-shadow: inset 0 1px 0 var(--ui-inset-hover); }
.status-glyph{ overflow:visible; }
.status-hint{ border-bottom:1px dashed var(--ui-hint); padding-bottom:2px; transition:border-color .35s ease; }
.group:hover .status-hint{ border-color:var(--ui-hint-hover); }
::-webkit-scrollbar{width:6px;} ::-webkit-scrollbar-track{background:var(--ui-scroll-track);} ::-webkit-scrollbar-thumb{background:var(--ui-scroll-thumb);} ::-webkit-scrollbar-thumb:hover{background:var(--ui-scroll-thumb-hover);}
@media (prefers-reduced-motion: reduce){ .reveal{transition:none;opacity:1;transform:none;} .crosshair{transition:none;} .status-glyph animateMotion, .status-glyph animate{ display:none; } }
`;

/* Runs before paint to avoid a flash of the wrong theme. Reads the saved
 * preference, falling back to the OS color-scheme. */
export const THEME_BOOT = `(function(){try{var s=localStorage.getItem('theme');if(s==='light'||(!s&&window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches)){document.documentElement.classList.add('light');}}catch(e){}})();`;

/* Mono toggle that sits next to the language switch. */
export const THEME_TOGGLE = `<button id="themeToggle" type="button" aria-label="Toggle light/dark theme" class="text-system-dim hover:text-system-accent transition-colors cursor-pointer flex items-center"><svg class="theme-dark-only" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg><svg class="theme-light-only" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg></button>`;

/* Status glyph — "accretion": particles spiral into a nucleus (compounding).
 * Grey, ~21px, brightens to white on hover. At rest only the nucleus shows;
 * particles animate ONLY while the badge (#statusBadge) is hovered — SMIL
 * begins on mouseover, ends on mouseout, so the rest state is clean (no JS). */
export const STATUS_GLYPH = `<svg class="status-glyph text-system-dim group-hover:text-system-accent transition-colors" width="21" height="21" viewBox="0 0 40 40" fill="none" aria-hidden="true">
  <circle cx="20" cy="20" r="2" fill="currentColor"/>
  <g fill="currentColor">
    <circle r="1.3" opacity="0"><animateMotion path="M 36 20 Q 28 12 20 20" dur="6.2s" begin="statusBadge.mouseover" end="statusBadge.mouseout" repeatCount="indefinite"/><animate attributeName="opacity" values=".9;0" dur="6.2s" begin="statusBadge.mouseover" end="statusBadge.mouseout" repeatCount="indefinite"/></circle>
    <circle r="1.3" opacity="0"><animateMotion path="M 20 4 Q 28 12 20 20" dur="6.2s" begin="statusBadge.mouseover-2.1s" end="statusBadge.mouseout" repeatCount="indefinite"/><animate attributeName="opacity" values=".9;0" dur="6.2s" begin="statusBadge.mouseover-2.1s" end="statusBadge.mouseout" repeatCount="indefinite"/></circle>
    <circle r="1.3" opacity="0"><animateMotion path="M 4 20 Q 12 28 20 20" dur="6.2s" begin="statusBadge.mouseover-4.1s" end="statusBadge.mouseout" repeatCount="indefinite"/><animate attributeName="opacity" values=".9;0" dur="6.2s" begin="statusBadge.mouseover-4.1s" end="statusBadge.mouseout" repeatCount="indefinite"/></circle>
  </g>
</svg>`;

export const TW_CONFIG = `
tailwind.config = { darkMode:'class', theme:{ extend:{
  fontFamily:{ sans:['Inter','sans-serif'], mono:['JetBrains Mono','monospace'], serif:['Source Serif 4','serif'] },
  colors:{ system:{ bg:'rgb(var(--c-bg) / <alpha-value>)', surface:'rgb(var(--c-surface) / <alpha-value>)', line:'rgb(var(--c-line) / <alpha-value>)', text:'rgb(var(--c-text) / <alpha-value>)', dim:'rgb(var(--c-dim) / <alpha-value>)', accent:'rgb(var(--c-accent) / <alpha-value>)', panel:'rgb(var(--c-panel) / <alpha-value>)' } },
  animation:{ 'spin-slow':'spin 12s linear infinite', 'pulse-slow':'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite' }
} } }
`;

export function runtimeScript(email: string): string {
  const e = email.replace(/'/g, "\\'");
  return [
    "document.addEventListener('DOMContentLoaded',function(){",
    "var root=document.documentElement;",
    "document.addEventListener('mousemove',function(ev){root.style.setProperty('--mouse-x',ev.clientX+'px');root.style.setProperty('--mouse-y',ev.clientY+'px');});",
    "var sp=document.getElementById('scrollProgress');",
    "window.addEventListener('scroll',function(){var t=document.documentElement.scrollTop;var h=document.documentElement.scrollHeight-document.documentElement.clientHeight;sp.style.width=(t/h*100)+'%';},{passive:true});",
    "var rm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;",
    "var els=document.querySelectorAll('.reveal');",
    "if('IntersectionObserver' in window && !rm){var io=new IntersectionObserver(function(en,ob){en.forEach(function(x){if(!x.isIntersecting)return;x.target.classList.add('active');ob.unobserve(x.target);});},{threshold:0.1,rootMargin:'0px 0px -50px 0px'});els.forEach(function(el){io.observe(el);});}",
    "else{els.forEach(function(el){el.classList.add('active');});}",
    "setTimeout(function(){els.forEach(function(el){if(el.getBoundingClientRect().top<window.innerHeight)el.classList.add('active');});},100);",
    "var btn=document.getElementById('emailBtn');var msg=document.getElementById('copyMsg');",
    "if(btn){btn.addEventListener('click',function(){navigator.clipboard&&navigator.clipboard.writeText('" + e + "').then(function(){if(msg){msg.style.opacity='1';setTimeout(function(){msg.style.opacity='0';},2000);}});});}",
    "var tt=document.getElementById('themeToggle');",
    "if(tt){tt.addEventListener('click',function(){var l=document.documentElement.classList.toggle('light');try{localStorage.setItem('theme',l?'light':'dark');}catch(e){}});}",
    "});",
  ].join("\n");
}

const t = (lang: Lang, en: string, es: string): string => (lang === "en" ? en : es);

/* abstract per-card SVG graphics, cycled by index */
const CARD_GRAPHICS: string[] = [
  `<div class="w-2/3 h-2/3 grid grid-cols-3 gap-1 p-1 border border-system-line/20 group-hover:border-system-accent/30 transition-colors duration-500">
     <div class="bg-system-accent/[0.02] group-hover:bg-system-accent/15 transition-colors duration-500"></div><div class="bg-system-accent/[0.02] group-hover:bg-system-accent/[0.06] transition-colors duration-500"></div><div class="bg-system-accent/[0.02] group-hover:bg-system-accent/15 transition-colors duration-500"></div>
     <div class="bg-system-accent/[0.02] group-hover:bg-system-accent/[0.06] transition-colors duration-500"></div><div class="bg-system-accent/[0.03] group-hover:bg-system-accent/25 transition-colors duration-500"></div><div class="bg-system-accent/[0.02] group-hover:bg-system-accent/[0.06] transition-colors duration-500"></div>
     <div class="bg-system-accent/[0.02] group-hover:bg-system-accent/15 transition-colors duration-500"></div><div class="bg-system-accent/[0.02] group-hover:bg-system-accent/[0.06] transition-colors duration-500"></div><div class="bg-system-accent/[0.02] group-hover:bg-system-accent/15 transition-colors duration-500"></div>
   </div>`,
  `<div class="w-16 h-16 rounded-full border border-system-line/10 relative flex items-center justify-center group-hover:border-system-accent/30 transition-colors">
     <div class="w-2 h-2 bg-system-accent/50 rounded-full"></div>
     <div class="absolute -left-8 top-1/2 w-8 h-[1px] bg-system-line/10"></div><div class="absolute -right-8 top-1/2 w-8 h-[1px] bg-system-line/10"></div>
     <div class="absolute left-1/2 -top-8 h-8 w-[1px] bg-system-line/10"></div><div class="absolute left-1/2 -bottom-8 h-8 w-[1px] bg-system-line/10"></div>
   </div>`,
  `<div class="w-12 h-20 border border-system-line/10 rounded-sm relative flex items-center justify-center group-hover:border-system-accent/30 transition-colors">
     <div class="w-full h-[1px] bg-system-line/10 absolute top-3"></div><div class="w-4 h-4 bg-system-accent/10 rounded-full animate-pulse-slow"></div><div class="w-1/2 h-[1px] bg-system-line/10 absolute bottom-2 rounded-full"></div>
   </div>`,
];

function yr(c: Case): string {
  return c.yearEnd === "present" ? String(c.yearStart) : String(c.yearEnd);
}

function renderCaseCard(c: Case, i: number, lang: Lang, delay: string): string {
  const client = escapeHtml(t(lang, c.clientEn, c.clientEs));
  const title = escapeHtml(t(lang, c.titleEn, c.titleEs));
  const hook = escapeHtml(t(lang, c.hookEn, c.hookEs));
  const cta = escapeHtml(t(lang, V11_COPY.work.caseCtaEn, V11_COPY.work.caseCtaEs));
  return `<a href="work/${escapeHtml(c.slug)}/index.html" class="structural-border p-6 flex flex-col group reveal ${delay} bg-system-panel no-underline">
  <div class="crosshair ch-tl"></div><div class="crosshair ch-tr"></div><div class="crosshair ch-bl"></div><div class="crosshair ch-br"></div>
  <div class="h-28 md:h-auto md:aspect-video border border-system-line/10 mb-6 relative overflow-hidden flex items-center justify-center bg-system-surface">${CARD_GRAPHICS[i % CARD_GRAPHICS.length]}</div>
  <div class="flex-grow">
    <div class="font-mono text-[10px] text-system-dim uppercase mb-2 flex justify-between"><span>${client}</span><span>${escapeHtml(yr(c))}</span></div>
    <h3 class="text-lg text-system-accent font-medium mb-3">${title}</h3>
    <p class="text-sm text-system-dim mb-6 font-light leading-relaxed">${hook}</p>
  </div>
  <div class="mt-auto border-t border-system-line/10 pt-4 flex justify-between items-center group-hover:text-system-accent text-system-dim transition-colors">
    <span class="text-xs font-mono uppercase tracking-widest">${cta}</span>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
  </div>
</a>`;
}

function renderPhase(col: HorizonColumn, lang: Lang): string {
  const title = escapeHtml(t(lang, col.stage.en, col.stage.es));
  const meta = escapeHtml(t(lang, col.heading.en, col.heading.es));
  const chips = col.chips.map((ch) => escapeHtml(t(lang, ch.label.en, ch.label.es)));
  if (col.id === "investing") {
    const c = chips.map((x) => `<span class="phase-chip-invest px-3 py-1.5 text-[11px] font-mono">${x}</span>`).join("");
    return `<div class="relative pl-0 md:pl-10 group">
  <div class="hidden md:block absolute left-[4px] top-2 w-2 h-2 rounded-full bg-system-surface border border-system-dim group-hover:bg-blue-500 transition-colors group-hover:shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
  <div class="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 mb-3"><h3 class="text-lg font-medium text-system-accent min-w-[140px]">${title}</h3><span class="font-mono text-[10px] uppercase tracking-widest text-blue-400">${meta}</span></div>
  <div class="flex flex-wrap gap-2">${c}</div>
</div>`;
  }
  if (col.id === "horizon") {
    const c = chips.map((x) => `<span class="border border-system-line/30 px-3 py-1.5 text-[11px] font-mono text-system-dim bg-system-bg border-dashed">${x}</span>`).join("");
    return `<div class="relative pl-0 md:pl-10 group">
  <div class="hidden md:block absolute left-[4px] top-2 w-2 h-2 rounded-full bg-system-surface border border-system-dim border-dashed group-hover:border-system-accent transition-colors"></div>
  <div class="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 mb-3"><h3 class="text-lg font-medium text-system-dim min-w-[140px]">${title}</h3><span class="font-mono text-[10px] text-system-dim uppercase tracking-widest opacity-50">${meta}</span></div>
  <div class="flex flex-wrap gap-2">${c}</div>
</div>`;
  }
  const c = chips.map((x) => `<span class="border border-system-line/50 px-3 py-1.5 text-[11px] font-mono text-system-dim bg-system-bg">${x}</span>`).join("");
  return `<div class="relative pl-0 md:pl-10 group">
  <div class="hidden md:block absolute left-[4px] top-2 w-2 h-2 rounded-full bg-system-surface border border-system-dim group-hover:bg-system-accent transition-colors"></div>
  <div class="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 mb-3"><h3 class="text-lg font-medium text-system-accent min-w-[140px]">${title}</h3><span class="font-mono text-[10px] text-system-dim uppercase tracking-widest">${meta}</span></div>
  <div class="flex flex-wrap gap-2">${c}</div>
</div>`;
}

export function renderStructuralLanding(
  data: LandingData,
  lang: Lang,
  _tokensCss: string,
  assets: V11LandingAssets,
): string {
  const { identity, positioning, landing } = data;
  const c = identity.contact;

  const seoTitle = t(lang, landing.seo.titleEn, landing.seo.titleEs);
  const seoDesc = t(lang, landing.seo.descriptionEn, landing.seo.descriptionEs);
  const selfHref = lang === "en" ? "/" : "/es/";
  const altHref = lang === "en" ? "/es/" : "/";
  // Relative lang-toggle target. Point at the explicit index.html file (not the
  // directory) so file:// loads the page instead of showing a folder listing.
  const altRel = lang === "en" ? "es/index.html" : "../index.html";
  const altLang = lang === "en" ? "es" : "en";

  const navLinks = [
    ["#notes", t(lang, "Notes", "Notas")],
    ["#work", t(lang, "Work", "Trabajo")],
    ["#method", t(lang, "Method", "Método")],
    ["#about", t(lang, "About", "Sobre mí")],
    ["#contact", t(lang, "Contact", "Contacto")],
  ].map(([h, l]) => `<a href="${h}" class="text-system-dim hover:text-system-accent transition-colors">${escapeHtml(l)}</a>`).join("");

  const heroLine = t(lang, positioning.heroLine?.en ?? positioning.thesis.en, positioning.heroLine?.es ?? positioning.thesis.es);
  const heroEmph = positioning.heroEmphasis ? t(lang, positioning.heroEmphasis.en, positioning.heroEmphasis.es) : heroLine;
  const heroSub = positioning.heroSub ? t(lang, positioning.heroSub.en, positioning.heroSub.es) : "";
  const photoHref = assets.photoHref;

  const trust = (lang === "en" ? positioning.trustStrip?.en : positioning.trustStrip?.es) ?? [];
  // Official sites for the trust-strip orgs (keyed by both EN and ES labels).
  const TRUST_LINKS: Record<string, string> = {
    "FAA": "https://www.faa.gov/",
    "DoD": "https://www.defense.gov/",
    "VA": "https://www.va.gov/",
    "Booz Allen Hamilton": "https://www.boozallen.com/",
    "Pichincha Bank": "https://www.pichincha.com/",
    "Banco Pichincha": "https://www.pichincha.com/",
    "Rappi": "https://www.rappi.com/",
    "Juan Valdez": "https://www.juanvaldez.com/",
  };
  const trustRow = trust.map((s) => {
    const url = TRUST_LINKS[s];
    const cls = "font-mono text-[11px] text-system-dim uppercase tracking-widest hover:text-system-accent transition-colors";
    return url
      ? `<a href="${escapeHtml(url)}" target="_blank" rel="noopener" class="${cls} no-underline">${escapeHtml(s)}</a>`
      : `<span class="${cls} cursor-default">${escapeHtml(s)}</span>`;
  }).join(`<span class="text-system-line/10">·</span>`);

  const proof = positioning.proofNumbers.map((p) => {
    const unit = p.unit ? `<span class="text-system-dim">${escapeHtml(p.unit)}</span>` : "";
    const label = escapeHtml(t(lang, p.labelEn, p.labelEs));
    return `<div class="structural-border metric-card border-t-0 border-l-0 p-8 flex flex-col justify-center min-h-[160px]">
    <div class="crosshair ch-br"></div>
    <div class="text-4xl md:text-5xl font-light text-system-accent mb-2 tracking-tighter">${escapeHtml(p.value)}${unit}</div>
    <div class="font-mono text-[10px] text-system-dim uppercase tracking-wider leading-relaxed">${label}</div>
  </div>`;
  }).join("");

  const notes = data.notes.map((n, i) => {
    const idx = String(i + 1).padStart(2, "0");
    return `<article class="relative">
    <div class="absolute -left-6 md:-left-[44px] top-1 font-mono text-[10px] text-system-dim bg-system-bg px-1 py-1">${idx}</div>
    <h3 class="text-lg font-medium text-system-accent mb-4">${escapeHtml(t(lang, n.titleEn, n.titleEs))}</h3>
    <p class="text-system-dim text-sm md:text-base font-light leading-relaxed">${escapeHtml(t(lang, n.bodyEn, n.bodyEs))}</p>
  </article>`;
  }).join("");

  const cases = sortedCases(data.cases)
    .map((cs, i) => renderCaseCard(cs, i, lang, i === 1 ? "delay-100" : i === 2 ? "delay-200" : ""))
    .join("");

  const phases = data.horizon.columns.map((col) => renderPhase(col, lang)).join("");

  const clientsRow = escapeHtml(data.clients.map((cl) => cl.name).join(" · "));
  const eduRows = data.education.map((e) => {
    const right = e.year ? `${escapeHtml(e.institution)} · ${e.year}` : escapeHtml(e.institution);
    return `<li class="flex justify-between items-baseline gap-4"><span>${escapeHtml(e.name)}</span><span class="font-mono text-[10px] tracking-widest text-right">${right}</span></li>`;
  }).join("");

  const socials = ([["LinkedIn", c.linkedin], ["GitHub", c.github], ["Behance", c.behance]] as Array<[string, string | undefined]>)
    .filter((s): s is [string, string] => typeof s[1] === "string")
    .map(([label, handle]) => {
      const href = handle.startsWith("http") ? handle : `https://${handle}`;
      return `<a href="${escapeHtml(href)}" rel="noopener" target="_blank" class="hover:text-system-accent transition-colors">${escapeHtml(label)}</a>`;
    }).join("");

  const sysIterating = t(lang, "Human_Compounding", "Humano_Acumulando");
  const sysTitle = t(lang, "A human running the loop agents run — orchestrating, evaluating, compounding", "Un humano corriendo el loop que corren los agentes — orquestando, evaluando, acumulando");

  return `<!doctype html>
<html lang="${lang}" class="scroll-smooth">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(seoTitle)}</title>
<meta name="description" content="${escapeHtml(seoDesc)}">
<meta property="og:title" content="${escapeHtml(seoTitle)}">
<meta property="og:description" content="${escapeHtml(seoDesc)}">
<meta property="og:type" content="website">
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
<link rel="alternate" hreflang="x-default" href="https://danilorojas.design/">
<script>${THEME_BOOT}</script>
<script src="https://cdn.tailwindcss.com"></script>
<script>${TW_CONFIG}</script>
<style>${FONT_FACES}${CUSTOM_CSS}</style>
</head>
<body class="relative overflow-x-hidden selection:bg-system-accent selection:text-system-bg min-h-screen flex flex-col font-sans">

<div class="bg-grid"></div>
<div class="mouse-glow" id="mouseGlow"></div>

<nav class="fixed top-0 w-full z-50 border-b border-system-line/10 bg-system-bg/80 backdrop-blur-md">
  <div class="w-full flex justify-between items-center h-14 px-4 sm:px-8 max-w-[1400px] mx-auto">
    <div class="font-sans font-medium tracking-tight text-[15px] text-system-accent">${escapeHtml(identity.name)} <span class="text-system-dim font-mono ml-1">· dr</span></div>
    <div class="flex items-center h-full">
      <div class="hidden md:flex space-x-8 mr-8 font-mono text-[10px] tracking-widest uppercase">${navLinks}</div>
      <div class="flex items-center border-l border-system-line/10 h-full pl-6 space-x-4">
        ${THEME_TOGGLE}
        <a href="${altRel}" hreflang="${altLang}" class="font-mono text-[10px] tracking-widest text-system-dim cursor-pointer hover:text-system-accent">${lang === "en" ? "EN" : "ES"}<span class="text-system-dim/50">/${lang === "en" ? "ES" : "EN"}</span></a>
        <div id="statusBadge" class="flex items-center space-x-2 group cursor-help" title="${escapeHtml(sysTitle)}">
          ${STATUS_GLYPH}
          <span class="status-hint font-mono text-[10px] text-system-dim uppercase tracking-widest group-hover:text-system-accent transition-colors hidden sm:inline-block">${escapeHtml(sysIterating)}</span>
        </div>
      </div>
    </div>
  </div>
  <div class="h-[1px] bg-system-accent w-0 absolute bottom-0 left-0" id="scrollProgress"></div>
</nav>

<main class="flex-grow pt-28 pb-20 px-4 sm:px-8 relative z-10 flex flex-col items-center">

  <div class="w-full max-w-6xl relative mt-10 sm:mt-16">
    <div class="structural-border p-8 sm:p-16 md:p-24 reveal relative overflow-hidden bg-system-surface/30 backdrop-blur-sm">
      <div class="max-w-4xl relative z-10 pt-4">
        <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-system-line/10 mb-8 p-1 bg-system-surface/80 backdrop-blur-md flex items-center justify-center relative group">
          <div class="w-full h-full rounded-full bg-system-bg border border-system-line/50 overflow-hidden flex items-center justify-center relative">
            <img src="${escapeHtml(photoHref)}" alt="${escapeHtml(identity.name)}" class="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 transition-all duration-500">
          </div>
          <div class="absolute -inset-2 border border-system-line/30 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-[spin_4s_linear_infinite] transition-opacity duration-500"></div>
        </div>
        <h1 class="text-3xl sm:text-4xl md:text-6xl font-light tracking-tight leading-[1.16] mb-8 text-system-dim max-w-5xl">
          <span class="text-system-accent font-medium">${escapeHtml(t(lang, "I'm", "Soy"))} ${escapeHtml(identity.name)}.</span><br>
          ${escapeHtml(t(lang, "I design products for", "Diseño productos para"))} <span class="text-system-accent">${escapeHtml(heroEmph)}</span>
        </h1>
        ${heroSub ? `<div class="flex items-center gap-4 mb-10">
          <div class="w-8 h-[1px] bg-system-dim/50 hidden sm:block"></div>
          <p class="text-base md:text-lg text-system-dim font-sans font-light tracking-wide max-w-2xl leading-relaxed">${escapeHtml(heroSub)}</p>
        </div>` : ""}
        <div class="flex flex-col sm:flex-row sm:items-center gap-6 mt-12">
          <a href="#contact" class="group relative px-6 py-3 bg-system-accent text-system-bg font-medium text-sm tracking-wide inline-block text-center border border-system-accent hover:bg-transparent hover:text-system-accent transition-colors no-underline">${escapeHtml(t(lang, landing.cta.en, landing.cta.es))}</a>
          <div class="flex items-center space-x-2">
            <div class="w-2 h-2 rounded-full border border-green-500/50 flex items-center justify-center"><div class="w-1 h-1 bg-green-500 rounded-full animate-pulse-slow"></div></div>
            <span class="text-xs font-mono text-system-dim uppercase tracking-widest">${escapeHtml(t(lang, "Remote global", "Remoto global"))}</span>
          </div>
        </div>
      </div>
      <div class="absolute right-8 lg:right-16 top-1/2 -translate-y-1/2 opacity-[0.15] hidden lg:block pointer-events-none select-none">
        <svg width="340" height="340" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="0.25" class="animate-[spin_24s_linear_infinite]">
          <circle cx="50" cy="50" r="45" stroke-dasharray="0.5 2" />
          <circle cx="50" cy="50" r="32" />
          <circle cx="50" cy="50" r="28" stroke-dasharray="2 1" opacity="0.5" />
          <rect x="27.37" y="27.37" width="45.25" height="45.25" transform="rotate(45 50 50)" />
          <path d="M 50 2 L 50 98 M 2 50 L 98 50" stroke-dasharray="0.5 1.5" opacity="0.6" />
          <circle cx="50" cy="50" r="4" fill="currentColor" opacity="0.2"/>
          <circle cx="50" cy="5" r="1" fill="currentColor" />
          <circle cx="50" cy="95" r="1" fill="currentColor" />
          <circle cx="5" cy="50" r="1" fill="currentColor" />
          <circle cx="95" cy="50" r="1" fill="currentColor" />
        </svg>
      </div>
    </div>
    <div class="crosshair ch-tl"></div><div class="crosshair ch-tr"></div><div class="crosshair ch-bl"></div><div class="crosshair ch-br"></div>
    <div class="tech-label -top-2 left-10">PRODUCT DESIGN · AGENTIC WORKFLOWS</div>
    <div class="absolute top-0 bottom-0 left-1/4 w-[1px] bg-system-line/10 -z-10 hidden md:block"></div>
  </div>

  <section class="w-full max-w-6xl mt-12 reveal">
    <div class="py-6 border-y border-system-line/50 flex flex-wrap justify-center items-center gap-x-8 gap-y-4 px-4 bg-system-surface/10">
      <span class="font-mono font-medium text-[10px] text-system-accent uppercase tracking-widest hidden md:block mr-4">${t(lang, "Trusted by //", "Trabajan conmigo //")}</span>
      ${trustRow}
    </div>
  </section>

  <section class="w-full max-w-6xl mt-24 reveal">
    <div class="mb-8 flex items-center justify-between">
      <h2 class="text-xl md:text-2xl font-light text-system-accent">${escapeHtml(t(lang, "The math behind the craft.", "La matemática detrás del craft."))}</h2>
      <div class="h-[1px] flex-grow bg-system-line/10 mx-6 hidden md:block"></div>
      <span class="font-mono text-[10px] text-system-dim tracking-widest uppercase">DAT // Metrics</span>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 border-t border-l border-system-line/10">${proof}</div>
  </section>

  <section id="notes" class="w-full max-w-6xl mt-32 pt-16 reveal relative">
    <div class="absolute left-[7px] md:left-[40px] top-0 bottom-0 w-[1px] bg-system-line/50 -z-10"></div>
    <div class="mb-16 pl-10 md:pl-24">
      <h2 class="text-2xl md:text-4xl font-serif italic text-system-accent font-light max-w-2xl leading-tight">"${escapeHtml(t(lang, "The writing is evidence of judgment.", "La escritura es evidencia de juicio."))}"</h2>
      <div class="mt-4 font-mono text-[10px] text-system-dim tracking-widest uppercase">DOC // ${t(lang, "Philosophy", "Filosofía")}</div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 pl-10 md:pl-24 relative">${notes}</div>
  </section>

  <section id="work" class="w-full max-w-6xl mt-32 pt-16">
    <div class="flex justify-between items-end border-b border-system-line/10 pb-4 mb-12 reveal">
      <div>
        <span class="font-mono text-[10px] text-system-dim tracking-widest block mb-2 uppercase">${escapeHtml(t(lang, V11_COPY.work.eyebrowEn, V11_COPY.work.eyebrowEs))}</span>
        <h2 class="text-2xl md:text-3xl font-light text-system-accent">${escapeHtml(t(lang, V11_COPY.work.titleEn, V11_COPY.work.titleEs))}</h2>
      </div>
    </div>
    <p class="text-system-dim max-w-2xl mb-16 font-light leading-relaxed reveal delay-100">${escapeHtml(t(lang, V11_COPY.work.leadEn, V11_COPY.work.leadEs))}</p>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">${cases}</div>
  </section>

  <section id="method" class="w-full max-w-6xl mt-32 pt-16 reveal">
    <div class="border-b border-system-line/10 pb-4 mb-12">
      <span class="font-mono text-[10px] text-system-dim tracking-widest block mb-2 uppercase">${escapeHtml(t(lang, V11_COPY.method.eyebrowEn, V11_COPY.method.eyebrowEs))}</span>
      <h2 class="text-2xl md:text-3xl font-light text-system-accent">${escapeHtml(t(lang, V11_COPY.method.titleEn, V11_COPY.method.titleEs))}</h2>
    </div>
    <div class="mb-16">
      <p class="text-xl md:text-2xl text-system-accent font-light max-w-3xl mb-6 leading-relaxed">${escapeHtml(t(lang, V11_COPY.method.philosophyEn, V11_COPY.method.philosophyEs))}</p>
      <p class="text-system-dim font-light max-w-2xl leading-relaxed">${escapeHtml(t(lang, V11_COPY.method.leadEn, V11_COPY.method.leadEs))}</p>
    </div>
    <div class="space-y-8 relative">
      <div class="absolute left-[7.5px] top-2 bottom-2 w-[1px] bg-system-line/10 hidden md:block"></div>
      ${phases}
    </div>
  </section>

  <section id="about" class="w-full max-w-6xl mt-32 pt-16 reveal">
    <div class="border-b border-system-line/10 pb-4 mb-12">
      <span class="font-mono text-[10px] text-system-dim tracking-widest block mb-2 uppercase">${escapeHtml(t(lang, V11_COPY.about.eyebrowEn, V11_COPY.about.eyebrowEs))}</span>
      <h2 class="text-2xl md:text-3xl font-light text-system-accent">${escapeHtml(t(lang, V11_COPY.about.titleEn, V11_COPY.about.titleEs))}</h2>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-16">
      <div><p class="text-system-dim font-light leading-relaxed">${escapeHtml(t(lang, V11_COPY.about.bioEn, V11_COPY.about.bioEs))}</p></div>
      <div class="space-y-12">
        <div>
          <div class="font-mono text-[10px] text-system-accent uppercase tracking-widest mb-4 border-b border-system-line/50 pb-2">${escapeHtml(t(lang, V11_COPY.about.clientsLabelEn, V11_COPY.about.clientsLabelEs))}</div>
          <p class="text-sm text-system-dim font-light leading-relaxed">${clientsRow}</p>
        </div>
        <div>
          <div class="font-mono text-[10px] text-system-accent uppercase tracking-widest mb-4 border-b border-system-line/50 pb-2">${escapeHtml(t(lang, V11_COPY.about.educationLabelEn, V11_COPY.about.educationLabelEs))}</div>
          <ul class="text-sm text-system-dim font-light space-y-3">${eduRows}</ul>
        </div>
      </div>
    </div>
  </section>

  <footer id="contact" class="w-full max-w-6xl mt-32 pt-16 pb-8">
    <div class="structural-border p-8 md:p-16 reveal relative bg-system-surface">
      <div class="crosshair ch-tl"></div><div class="crosshair ch-tr"></div><div class="crosshair ch-bl"></div><div class="crosshair ch-br"></div>
      <div class="tech-label -top-2 left-10">SYS: INITIALIZE_CONNECTION</div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <span class="font-mono text-[10px] text-system-dim tracking-widest block mb-2 uppercase">${escapeHtml(t(lang, V11_COPY.contact.eyebrowEn, V11_COPY.contact.eyebrowEs))}</span>
          <h2 class="text-3xl md:text-4xl font-light mb-4 text-system-accent">${escapeHtml(t(lang, V11_COPY.contact.titleEn, V11_COPY.contact.titleEs))}</h2>
          <p class="text-system-dim font-light mb-8 max-w-md">${escapeHtml(t(lang, V11_COPY.contact.leadEn, V11_COPY.contact.leadEs))}</p>
          <div class="space-y-6">
            <button id="emailBtn" type="button" class="group relative px-6 py-3 bg-system-accent text-system-bg font-mono text-[11px] tracking-widest uppercase inline-flex items-center">
              <span class="relative z-10 mr-2">${escapeHtml(c.email)}</span>
              <svg class="relative z-10 w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            </button>
            <div id="copyMsg" class="h-4 text-[10px] font-mono text-green-500 opacity-0 transition-opacity">${escapeHtml(t(lang, "Email copied to clipboard.", "Email copiado al portapapeles."))}</div>
          </div>
        </div>
        <div class="flex flex-col justify-end">
          <div class="border border-system-line/10 p-1 bg-system-bg">
            <div class="border border-system-line/50 p-6 relative">
              <div class="font-mono text-[10px] text-system-dim mb-4 uppercase flex justify-between"><span>Terminal.exe</span><span>v11.0</span></div>
              <div class="font-mono text-xs text-system-dim space-y-2">
                <div>&gt; ${t(lang, "System diagnostics", "Diagnóstico del sistema")}... <span class="text-green-500">OK</span></div>
                <div>&gt; ${t(lang, "Loading profile", "Cargando perfil")}... <span class="text-green-500">100%</span></div>
                <div class="text-system-accent">&gt; ${escapeHtml(identity.availability)}</div>
                <div>&gt; ${t(lang, "Awaiting handshake", "Esperando handshake")}_</div>
                <div class="animate-pulse w-2 h-4 bg-system-accent mt-2 inline-block"></div>
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
<script>${runtimeScript(c.email)}</script>
</body>
</html>`;
}
