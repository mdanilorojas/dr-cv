import type { CvData } from "../../lib/types.js";
import { escapeHtml, type Lang } from "../skills-sheet-page-1.js";

const t = (lang: Lang, en: string, es: string): string => (lang === "en" ? en : es);

/* Curated role summaries for the single page. Focused on Senior Product Design. */
interface Row { years: string; co: string; role: { en: string; es: string }; badge?: string; desc: { en: string; es: string }; }
const ROWS: Row[] = [
  { years: "2022—NOW", co: "Booz Allen Hamilton", badge: "Army · DoD · VA · FAA",
    role: { en: "Senior Product Designer (Design-Engineering)", es: "Diseñador de Producto Principal (Design-Engineering)" },
    desc: {
      en: "Lead product designer for the federal Trusted Environments platform and Developer Portal, architecting two design systems (Shadcn, Radix, BAH Brand Book) compliant with WCAG 2.2 and Section 508 — passing 95%+ of automated accessibility checks. Pioneered agentic UX research: built LLM-based persona emulators to run moderated usability testing (5 users per feature), with 92% rating the resulting improvements better. Designed a custom MCP for developers; design system scaled from 0 to 26 internal teams at Booz Allen Hamilton, including the Vellox Reverser cybersecurity product.",
      es: "Diseñador de producto principal para la plataforma federal Trusted Environments y el Developer Portal, construyendo dos design systems (Shadcn, Radix, BAH Brand Book) conformes con WCAG 2.2 y Sección 508 — superando el 95% de checks automatizados de accesibilidad. Fui pionero en investigación de UX agéntica: construí emuladores de personas basados en LLM para correr pruebas de usabilidad moderadas (5 usuarios por feature), con 92% de aprobación sobre las mejoras resultantes. Diseñé un MCP propio para developers; el design system escaló de 0 a 26 equipos internos en Booz Allen Hamilton, incluyendo el producto de ciberseguridad Vellox Reverser."
    } },
  { years: "2026—NOW", co: "Compliance SaaS · LATAM", badge: "280+ paying users",
    role: { en: "Co-founder & Lead Product Designer", es: "Co-fundador y Líder de Diseño de Producto" },
    desc: {
      en: "Co-founded a compliance SaaS for LATAM SMBs, leading discovery-to-launch design and shipping a validated MVP in 40 days. Designed a 31-component Figma design system, used across 16 screens and implemented directly in React/TypeScript. Ran AI-persona feedback loops to validate onboarding flows pre-engineering, growing the product to ~280 paying customers on a base of ~2,700 total users.",
      es: "Co-fundé un SaaS de cumplimiento para PYMES LATAM, liderando el diseño de discovery a lanzamiento y validando el MVP en 40 días. Diseñé un design system de 31 componentes en Figma, usado en 16 pantallas e implementado directamente en React/TypeScript. Corrí loops de feedback con personas IA para validar los flujos de onboarding antes de ingeniería, creciendo el producto a ~280 clientes pagando sobre una base de ~2,700 usuarios totales."
    } },
  { years: "2016—2022", co: "Xentinels DesignOps",
    role: { en: "Design Director / Product Manager", es: "Director de Diseño / Product Manager" },
    desc: {
      en: "Directed the DesignOps unit, scaling distributed, multi-theme design systems (Ant Design, Material UI, IBM Carbon, and a custom Shadcn-based system for Banco Pichincha) across Fortune 500 clients (Merck, Mondelēz, Banco Pichincha). Led qualitative research (100+ interviews, usability testing, card sorting) to define enterprise interaction patterns, and mentored ~12 junior/mid designers. Streamlined design-to-engineering handoff, cutting time-to-market 35%.",
      es: "Dirigí la unidad de DesignOps, escalando design systems multi-tema distribuidos (Ant Design, Material UI, IBM Carbon, y un sistema propio basado en Shadcn para Banco Pichincha) en clientes Fortune 500 (Merck, Mondelēz, Banco Pichincha). Lideré investigación cualitativa (100+ entrevistas, pruebas de usabilidad, card sorting) para definir patrones de interacción enterprise, y mentoricé a ~12 diseñadores junior/mid. Optimicé el handoff de diseño a ingeniería, reduciendo el time-to-market en 35%."
    } },
  { years: "2011—17", co: "Arpatel · Tecniequipos · Canadian Bank Note",
    role: { en: "Co-founder / Senior Designer-Dev / Project Admin", es: "Co-fundador / Diseñador Visual-Dev / Administrador de Proyectos" },
    desc: {
      en: "Built product design foundation through engineering and product management roles: designed retail POS and CRM flows, co-founded product ventures, and administered regional technical infrastructure projects.",
      es: "Construí bases de diseño de producto desde la ingeniería y gestión: diseñé flujos POS y CRM, co-fundé startups y administré infraestructura tecnológica regional."
    } },
];

interface Cap { label: { en: string; es: string }; detail: { en: string; es: string }; }
const CAPS: Cap[] = [
  { label: { en: "Product & UX", es: "Producto y UX" }, detail: { en: "User Research · Usability Testing · Journey Mapping · NPS/CSAT", es: "Investigación UX · Pruebas de Usabilidad · Journey Mapping · NPS/CSAT" } },
  { label: { en: "Design Systems", es: "Design Systems" }, detail: { en: "Figma · Shadcn · Radix · Storybook · WCAG 2.2 / Section 508", es: "Figma · Shadcn · Radix · Storybook · WCAG 2.2 / Sección 508" } },
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
.avail{ display:inline-flex; align-items:center; gap:6px; margin-top:10px; font-family:var(--mono); font-size:9px; letter-spacing:.14em; text-transform:uppercase; color:var(--dim); }
.contact{ text-align:right; font-family:var(--mono); font-size:9.5px; letter-spacing:.06em; color:var(--dim); line-height:1.9; }
.contact b{ color:var(--ink); font-weight:500; }
.rule{ height:1px; background:var(--line); margin:24px 0; position:relative; z-index:1; }
.kicker{ font-family:var(--mono); font-size:8.5px; letter-spacing:.16em; text-transform:uppercase; color:var(--dim); margin-bottom:8px; position:relative; z-index:1; }
.lead{ font-size:18px; line-height:1.4; font-weight:300; letter-spacing:-.01em; color:var(--ink); max-width:60ch; position:relative; z-index:1; }
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
.job .de{ font-size:10px; color:var(--dim); line-height:1.5; margin-top:5px; max-width:64ch; }
.badge{ font-family:var(--mono); font-size:7.5px; letter-spacing:.12em; text-transform:uppercase; border:1px solid var(--line); padding:2px 6px; color:var(--dim); margin-left:8px; vertical-align:middle; }
.skline{ display:flex; justify-content:space-between; gap:12px; font-size:10px; padding:4px 0; border-top:1px solid var(--line-soft); color:var(--dim); }
.skline b{ color:var(--ink); font-weight:500; white-space:nowrap; }
.edu{ font-size:10px; color:var(--dim); padding:4px 0; border-top:1px solid var(--line-soft); display:flex; justify-content:space-between; gap:10px; }
.edu b{ color:var(--ink); font-weight:500; }
.foot{ position:absolute; left:16mm; right:16mm; bottom:12mm; display:flex; justify-content:space-between; font-family:var(--mono); font-size:8.5px; letter-spacing:.1em; text-transform:uppercase; color:var(--dim); z-index:1; }
`;

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
    .map((e) => `<div class="edu"><b>${escapeHtml(e.name)}</b><span>${escapeHtml(e.institution)}${e.year ? ` · ${e.year}` : ""}</span></div>`)
    .join("");

  const L = lang === "en"
    ? { sum: "Summary", exp: "Experience", expK: "EXP // selected", cap: "Skills", capK: "SKILLS // mastered", edu: "Education", eduK: "EDU", lead2: "Eighteen years in product, fifteen in design. Senior UX judgment, user psychology mapping, and the system design capability to align complex product architectures into frictionless user experiences — AI-augmented research as leverage." }
    : { sum: "Resumen", exp: "Experiencia", expK: "EXP // selección", cap: "Habilidades", capK: "SKILLS // dominadas", edu: "Educación", eduK: "EDU", lead2: "Dieciocho años en producto, quince en diseño. Juicio UX senior, mapeo de psicología del usuario y capacidad de diseño de sistemas para alinear arquitecturas de producto complejas en experiencias sin fricción — investigación con IA como leverage." };

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
      <div class="avail">${escapeHtml(id.availability)}</div>
    </div>
    <div class="contact">
      <div><b>${escapeHtml(c.site ?? "danilorojas.design")}</b></div>
      <div>${escapeHtml(c.email)}</div>
      <div>${escapeHtml(c.linkedin ?? "")}</div>
      <div>${escapeHtml(c.github ?? "")}</div>
      <div>${escapeHtml(id.location)}</div>
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
