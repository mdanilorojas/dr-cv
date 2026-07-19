import type { CvData } from "../../lib/types.js";
import { escapeHtml, type Lang } from "../skills-sheet-page-1.js";

const t = (lang: Lang, en: string, es: string): string => (lang === "en" ? en : es);

/* Curated role summaries for the single page. Focused on Senior Product Design. */
interface Row { years: string; co: string; role: { en: string; es: string }; badge?: string; desc: { en: string; es: string }; }
const ROWS: Row[] = [
  { years: "2022—NOW", co: "Booz Allen Hamilton", badge: "Army · DoD · VA · FAA",
    role: { en: "Senior Product Designer (Design-Engineering)", es: "Diseñador de Producto Principal (Design-Engineering)" },
    desc: {
      en: "Lead product designer for the federal Trusted Environments platform and Developer Portal, architecting two design systems (Shadcn, Radix, BAH Brand Book) compliant with WCAG 2.2 and Section 508 — passing 95%+ of automated accessibility checks. Pioneered agentic UX research: built LLM-based persona emulators to run moderated usability testing (5 users per feature), with 92% rating the resulting improvements better. Delivered production-ready React components, cutting the design-to-dev cycle from ~6 weeks to under 1 week. Designed a custom MCP for developers; design system scaled from 0 to 26 internal teams at Booz Allen Hamilton, including the Vellox Reverser cybersecurity product.",
      es: "Diseñador de producto principal para la plataforma federal Trusted Environments y el Developer Portal, construyendo dos design systems (Shadcn, Radix, BAH Brand Book) conformes con WCAG 2.2 y Sección 508 — superando el 95% de checks automatizados de accesibilidad. Fui pionero en investigación de UX agéntica: construí emuladores de personas basados en LLM para correr pruebas de usabilidad moderadas (5 usuarios por feature), con 92% de aprobación sobre las mejoras resultantes. Entregué componentes React listos para producción, reduciendo el ciclo design-to-dev de ~6 semanas a menos de 1 semana. Diseñé un MCP propio para developers; el design system escaló de 0 a 26 equipos internos en Booz Allen Hamilton, incluyendo el producto de ciberseguridad Vellox Reverser."
    } },
  { years: "2026—NOW", co: "Compliance SaaS · LATAM", badge: "280+ paying users",
    role: { en: "Lead Product Designer", es: "Líder de Diseño de Producto" },
    desc: {
      en: "Lead product designer for a compliance SaaS for LATAM SMBs, owning discovery-to-launch design and shipping a validated MVP in 40 days. Instrumented end-to-end product analytics in Mixpanel and redesigned the onboarding flow — lifting new-user activation from 2.6% to 9.4% in under 3 weeks. A/B tested onboarding registration (email vs. Google Sign-in); Google Sign-in won, improving onboarding completion 74%. Designed a 31-component Figma design system (Variables, Auto Layout) used across 16 screens, implemented directly in React/TypeScript; used AI-persona feedback loops to validate flows pre-engineering.",
      es: "Líder de diseño de producto para un SaaS de cumplimiento para PYMES LATAM, dueño del diseño de discovery a lanzamiento y validando el MVP en 40 días. Instrumenté analytics de producto en Mixpanel y rediseñé el flujo de onboarding — elevando la activación de nuevos usuarios de 2.6% a 9.4% en menos de 3 semanas. A/B test en el registro del onboarding (email vs. Google Sign-in): Google Sign-in ganó, mejorando la completion 74%. Diseñé un design system de 31 componentes en Figma (Variables, Auto Layout) en 16 pantallas, implementado en React/TypeScript; usé loops de feedback con personas IA para validar flujos antes de ingeniería."
    } },
  { years: "2016—2022", co: "Xentinels DesignOps",
    role: { en: "Design Director / Product Manager", es: "Director de Diseño / Product Manager" },
    desc: {
      en: "Directed the DesignOps unit, scaling distributed, multi-theme design systems (Ant Design, Material UI, IBM Carbon, and a custom Shadcn-based system for Banco Pichincha) across Fortune 500 clients (Merck, Mondelēz, Banco Pichincha). Led qualitative research (100+ interviews, usability testing, card sorting) to define enterprise interaction patterns, and mentored ~12 junior/mid designers. Streamlined design-to-engineering handoff, cutting time-to-market 35%.",
      es: "Dirigí la unidad de DesignOps, escalando design systems multi-tema distribuidos (Ant Design, Material UI, IBM Carbon, y un sistema propio basado en Shadcn para Banco Pichincha) en clientes Fortune 500 (Merck, Mondelēz, Banco Pichincha). Lideré investigación cualitativa (100+ entrevistas, pruebas de usabilidad, card sorting) para definir patrones de interacción enterprise, y mentoricé a ~12 diseñadores junior/mid. Optimicé el handoff de diseño a ingeniería, reduciendo el time-to-market en 35%."
    } },
];

interface Cap { label: { en: string; es: string }; detail: { en: string; es: string }; }
const CAPS: Cap[] = [
  { label: { en: "Product & UX", es: "Producto y UX" }, detail: { en: "User Research · Usability Testing · Journey Mapping · NPS/CSAT · Mixpanel · A/B Testing", es: "Investigación UX · Pruebas de Usabilidad · Journey Mapping · NPS/CSAT · Mixpanel · A/B Testing" } },
  { label: { en: "Design Systems", es: "Design Systems" }, detail: { en: "Figma (Auto Layout · Variables · Dev Mode) · Shadcn · Radix · Storybook · WCAG 2.2 / Section 508", es: "Figma (Auto Layout · Variables · Dev Mode) · Shadcn · Radix · Storybook · WCAG 2.2 / Sección 508" } },
  { label: { en: "Design Engineering", es: "Design Engineering" }, detail: { en: "TypeScript · React 19 · Prototyping · Supabase", es: "TypeScript · React 19 · Prototipado · Supabase" } },
  { label: { en: "Agentic UX / AI", es: "UX Agéntica / IA" }, detail: { en: "Agent-ready Design Systems · LLM Persona Emulation · Custom MCP Design", es: "Design Systems Agénticos · Emulación de Personas LLM · MCP a Medida" } },
];

const STYLES = `
:root{
  --ink:#111318; --body:#1c1e24; --dim:#6a6e78; --paper:#f6f4ef;
  --line:rgba(20,22,28,.16); --line-soft:rgba(20,22,28,.09);
  --mono:'JetBrains Mono','SFMono-Regular',ui-monospace,monospace;
}
@page{ size:A4; margin:0; }
*{ box-sizing:border-box; margin:0; padding:0; }
html,body{ background:var(--paper); }
body{ font-family:Inter,system-ui,sans-serif; color:var(--body); }
.cv-page{ width:210mm; min-height:297mm; padding:17mm 16mm; position:relative; background:var(--paper); overflow:hidden; }
.top{ display:flex; justify-content:space-between; align-items:flex-start; position:relative; z-index:1; }
.name{ font-size:30px; font-weight:500; letter-spacing:-.02em; color:var(--ink); line-height:1.05; }
.role{ margin-top:8px; font-size:12.5px; color:var(--dim); }
.years{ margin-top:6px; font-family:var(--mono); font-size:9.5px; letter-spacing:.04em; color:var(--ink); font-weight:500; }
.avail{ display:inline-flex; align-items:center; gap:6px; margin-top:10px; font-family:var(--mono); font-size:9px; letter-spacing:.14em; text-transform:uppercase; color:var(--dim); }
.contact{ font-family:var(--mono); font-size:9.5px; letter-spacing:.06em; color:var(--dim); line-height:1.9; }
.contact b{ color:var(--ink); font-weight:500; }
.contact .cline{ display:flex; align-items:center; justify-content:flex-end; gap:6px; }
.contact a{ color:inherit; text-decoration:none; }
.contact a:hover{ color:var(--ink); }
.contact svg{ width:11px; height:11px; flex:none; opacity:.65; }
.rule{ height:1px; background:var(--line); margin:24px 0; position:relative; z-index:1; }
.kicker{ font-family:var(--mono); font-size:8.5px; letter-spacing:.16em; text-transform:uppercase; color:var(--dim); margin-bottom:8px; position:relative; z-index:1; }
.lead{ font-size:18px; line-height:1.4; font-weight:300; letter-spacing:-.01em; color:var(--ink); position:relative; z-index:1; }
.lead .em{ font-weight:500; }
.lead .muted{ color:var(--dim); }
.sec{ position:relative; z-index:1; margin-top:24px; }
.sec-h{ display:flex; align-items:baseline; justify-content:space-between; border-bottom:1px solid var(--line); padding-bottom:6px; margin-bottom:12px; }
.sec-h h2{ font-size:13px; font-weight:500; color:var(--ink); letter-spacing:-.01em; }
.sec-h .k{ font-family:var(--mono); font-size:8.5px; letter-spacing:.16em; text-transform:uppercase; color:var(--dim); }
.job{ display:grid; grid-template-columns:84px 1fr; gap:16px; padding:11px 0; border-top:1px solid var(--line-soft); }
.job:first-of-type{ border-top:0; }
.job .yr{ font-family:var(--mono); font-size:9px; color:var(--dim); letter-spacing:.04em; padding-top:2px; }
.job .co{ font-size:12.5px; font-weight:600; color:var(--ink); }
.job .ro{ font-size:11px; color:var(--dim); margin-top:1px; }
.job .de{ font-size:10px; color:var(--dim); line-height:1.5; margin-top:5px; }
.badge{ font-family:var(--mono); font-size:7.5px; letter-spacing:.12em; text-transform:uppercase; border:1px solid var(--line); padding:2px 6px; color:var(--dim); margin-left:8px; vertical-align:middle; }
.skline{ display:flex; justify-content:space-between; gap:12px; font-size:10px; padding:4px 0; border-top:1px solid var(--line-soft); color:var(--dim); }
.skline b{ color:var(--ink); font-weight:500; white-space:nowrap; }
.edu{ font-size:10px; color:var(--dim); padding:4px 0; border-top:1px solid var(--line-soft); display:flex; justify-content:space-between; gap:10px; }
.edu b{ color:var(--ink); font-weight:500; }
.foot{ position:absolute; left:16mm; right:16mm; bottom:12mm; display:flex; justify-content:space-between; font-family:var(--mono); font-size:8.5px; letter-spacing:.1em; text-transform:uppercase; color:var(--dim); z-index:1; }
`;

const ICONS = {
  globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>`,
  linkedin: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM.5 8h4V24h-4V8zM8 8h3.8v2.2h.05c.53-1 1.83-2.2 3.77-2.2 4.03 0 4.78 2.65 4.78 6.1V24h-4v-7c0-1.67-.03-3.82-2.33-3.82-2.33 0-2.69 1.82-2.69 3.7V24H8V8z"/></svg>`,
  github: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
};

export function renderCleanCv(data: CvData, lang: Lang): string {
  const id = data.identity;
  const c = id.contact;
  const title = escapeHtml(`${id.name} · Curriculum Vitae`);

  const jobs = ROWS.map((r) => `
    <div class="job">
      <div class="yr">${escapeHtml(r.years)}</div>
      <div>
        <div class="co">${escapeHtml(r.co)}${r.badge ? `<span class="badge">${escapeHtml(r.badge)}</span>` : ""}</div>
        <div class="ro">${escapeHtml(t(lang, r.role.en, r.role.es))}</div>
        <div class="de">${escapeHtml(t(lang, r.desc.en, r.desc.es))}</div>
      </div>
    </div>`).join("");

  const caps = CAPS.map((cap) =>
    `<div class="skline"><b>${escapeHtml(t(lang, cap.label.en, cap.label.es))}</b><span>${escapeHtml(t(lang, cap.detail.en, cap.detail.es))}</span></div>`,
  ).join("");

  const edu = data.education
    .slice(0, 3)
    .map((e) => `<div class="edu"><b>${escapeHtml(e.name)}</b><span>${escapeHtml(e.institution)}${e.year ? ` · ${e.year}` : ""}${e.inProgress ? ` · ${t(lang, "in progress", "en curso")}` : ""}</span></div>`)
    .join("");

  const L = lang === "en"
    ? { sum: "Summary", exp: "Experience", expK: "EXP // selected", cap: "Skills", capK: "SKILLS // mastered", edu: "Education", eduK: "EDU", lead2: "Senior UX judgment and user psychology that drives the metrics — system design to align complex architectures into frictionless experiences, with AI-augmented research as leverage." }
    : { sum: "Resumen", exp: "Experiencia", expK: "EXP // selección", cap: "Habilidades", capK: "SKILLS // dominadas", edu: "Educación", eduK: "EDU", lead2: "Juicio UX senior y psicología del usuario que dirige las métricas — diseño de sistemas para alinear arquitecturas complejas en experiencias sin fricción, con investigación potenciada por IA como leverage." };

  const leadHead = t(lang, "I design software products for", "Diseño productos de software para");
  const leadEm = t(lang, "complex, regulated environments.", "entornos complejos y regulados.");

  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<title>${title}</title>
<style>${STYLES}</style>
</head>
<body>
<article class="cv-page">
  <div class="top">
    <div>
      <div class="name">${escapeHtml(id.name)}</div>
      <div class="role">${escapeHtml(id.role)}</div>
      <div class="years">${escapeHtml(t(lang, "12+ years designing product", "12+ años diseñando producto"))}</div>
      <div class="avail">${escapeHtml(id.availability)}</div>
    </div>
    <div class="contact">
      <a class="cline" href="https://${escapeHtml(c.site ?? "danilorojas.design")}">${ICONS.globe}<b>${escapeHtml(c.site ?? "danilorojas.design")}</b></a>
      <a class="cline" href="mailto:${escapeHtml(c.email)}">${ICONS.mail}${escapeHtml(c.email)}</a>
      ${c.linkedin ? `<a class="cline" href="https://${escapeHtml(c.linkedin)}">${ICONS.linkedin}${escapeHtml(c.linkedin)}</a>` : ""}
      ${c.github ? `<a class="cline" href="https://${escapeHtml(c.github)}">${ICONS.github}${escapeHtml(c.github)}</a>` : ""}
      <span class="cline">${ICONS.pin}${escapeHtml(id.location)}</span>
    </div>
  </div>
  <div class="rule"></div>
  <div class="kicker">${escapeHtml(L.sum)}</div>
  <div class="lead">${escapeHtml(leadHead)} <span class="em">${escapeHtml(leadEm)}</span> <span class="muted">${escapeHtml(L.lead2)}</span></div>

  <section class="sec">
    <div class="sec-h"><h2>${escapeHtml(L.cap)}</h2><span class="k">${escapeHtml(L.capK)}</span></div>
    ${caps}
  </section>

  <section class="sec">
    <div class="sec-h"><h2>${escapeHtml(L.exp)}</h2><span class="k">${escapeHtml(L.expK)}</span></div>
    ${jobs}
  </section>

  <section class="sec">
    <div class="sec-h"><h2>${escapeHtml(L.edu)}</h2><span class="k">${escapeHtml(L.eduK)}</span></div>
    ${edu}
  </section>

  <div class="foot"><span>${escapeHtml(id.name)} — ${escapeHtml(t(lang, "Senior Product Designer", "Diseñador de Producto Senior"))}</span><span>${escapeHtml(c.site ?? "danilorojas.design")}</span></div>
</article>
</body>
</html>`;
}
