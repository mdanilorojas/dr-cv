import type { CvData } from "../../lib/types.js";
import { escapeHtml, type Lang } from "../skills-sheet-page-1.js";

const t = (lang: Lang, en: string, es: string): string => (lang === "en" ? en : es);

/* Curated role summaries for the single page. Focused on Senior Product Design. */
interface Row { years: string; co: string; role: { en: string; es: string }; badge?: string; desc: { en: string; es: string }; }
const ROWS: Row[] = [
  { years: "2022—NOW", co: "Booz Allen Hamilton", badge: "Army · DoD · VA · FAA",
    role: { en: "Senior Product Designer (Design-Engineering)", es: "Diseñador de Producto Principal (Design-Engineering)" },
    desc: {
      en: "Led end-to-end UX/UI, user flows, and interaction models for the federal Trusted Environments platform and Developer Portal. Designed and architected two parallel WCAG 2.1 AAA accessibility-compliant design systems (/te-skin and TE Black), documenting strict usability rules and component anti-patterns. Pioneered agentic UX research: developed custom LLM-based user persona emulators to run automated usability tests, mapping cognitive friction and user journeys before development. Consulted cross-team Army/DoD product managers and engineers on secure UI pipelines, bridging design intent with production code.",
      es: "Lideré el UX/UI, flujos de usuario y modelos de interacción para la plataforma federal de Trusted Environments y el Developer Portal. Diseñé y automaticé la arquitectura de dos design systems paralelos con conformidad WCAG 2.1 AAA (/te-skin y TE Black), definiendo reglas de usabilidad y patrones de accesibilidad. Fui pionero en investigación de UX agéntica: creé emuladores de personas de usuario basados en IA para automatizar pruebas de usabilidad y detectar fricción cognitiva antes del desarrollo. Consultoría transversal a PMs y desarrolladores de proyectos Army/DoD para asegurar la fidelidad del diseño y el cumplimiento de la Sección 508."
    } },
  { years: "2026—NOW", co: "Compliance SaaS · LATAM", badge: "paying pilots",
    role: { en: "Co-founder & Lead Product Designer", es: "Co-fundador y Líder de Diseño de Producto" },
    desc: {
      en: "Co-founded and led product design from discovery to launch, translating complex regulatory requirements into a simple, self-serve SMB compliance tool. Conducted user interviews, mapped cognitive patterns, and designed the onboarding and core dashboard flows, shipping a validated MVP in 40 days. Designed a modular 31-component UI system in Figma and implemented it directly in React/TypeScript, ensuring 100% layout fidelity. Built agentic feedback loops to simulate user pathways, optimizing conversion funnels and reducing activation drop-offs.",
      es: "Co-fundador y líder de diseño de producto: traduje regulaciones complejas en flujos intuitivos de autoservicio para PYMES. Realicé entrevistas a usuarios, mapeé patrones conductuales y diseñé la experiencia de onboarding y dashboard, lanzando un MVP validado en 40 días. Diseñé un sistema modular de 31 componentes UI en Figma e implementé el código de producción en React/TypeScript para garantizar fidelidad del 100%. Integré simulaciones agénticas de usabilidad para optimizar el embudo de conversión y reducir abandonos."
    } },
  { years: "2016—2022", co: "Xentinels DesignOps",
    role: { en: "Design Director / Product Manager", es: "Director de Diseño / Product Manager" },
    desc: {
      en: "Directed the DesignOps unit, scaling distributed, multi-theme design systems and token libraries for Fortune 500 enterprise clients (Merck, Mondelēz, Banco Pichincha). Led qualitative user research (n>100 interviews, usability testing, and card sorting) to establish standard enterprise interaction patterns. Streamlined design-to-engineering handoff workflows, reducing product time-to-market by 35% and establishing a single source of UI truth.",
      es: "Dirigí la unidad de DesignOps, escalando design systems y librerías de tokens multi-tema distribuidos para clientes Fortune 500 (Merck, Mondelēz, Banco Pichincha). Lideré investigación cualitativa (n>100 entrevistas, pruebas de usabilidad y card sorting) para estandarizar patrones de interacción corporativos. Optimicé los flujos de handoff de diseño a ingeniería, reduciendo el time-to-market en un 35% y centralizando la gobernanza de UI."
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
  { label: { en: "Product & UX", es: "Producto y UX" }, detail: { en: "Research · Interaction · Cognitive · Testing", es: "Investigación UX · Interacción · Cognición · Pruebas" } },
  { label: { en: "Design Systems", es: "Design Systems" }, detail: { en: "Tokens · Figma Libraries · Component Architecture", es: "Tokens · Figma Libraries · Arquitectura de Componentes" } },
  { label: { en: "Design Engineering", es: "Design Engineering" }, detail: { en: "TypeScript · React 19 · Next.js · Prototyping", es: "TypeScript · React 19 · Next.js · Prototipado" } },
  { label: { en: "Agentic UX / AI", es: "UX Agéntica / IA" }, detail: { en: "Usability Testing · Persona Emulation · LLM UI", es: "Pruebas Agénticas · Emulación de Personas · UI con LLM" } },
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
    ? { exp: "Experience", expK: "EXP // selected", cap: "Skills", capK: "SKILLS // mastered", edu: "Education", eduK: "EDU", lead2: "Eighteen years in product, fifteen in design. Senior UX judgment, user psychology mapping, and the system design capability to align complex product architectures into frictionless user experiences — AI-augmented research as leverage." }
    : { exp: "Experiencia", expK: "EXP // selección", cap: "Habilidades", capK: "SKILLS // dominadas", edu: "Educación", eduK: "EDU", lead2: "Dieciocho años en producto, quince en diseño. Juicio UX senior, mapeo de psicología del usuario y capacidad de diseño de sistemas para alinear arquitecturas de producto complejas en experiencias sin fricción — investigación con IA como leverage." };

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
