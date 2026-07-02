import type { CvData } from "../../lib/types.js";
import { escapeHtml, type Lang } from "../skills-sheet-page-1.js";

/*
 * ATS-safe CV — versión fechada 2026-07-01.
 *
 * Cotejo: perfil/data/fact-bank.yaml (hechos) × Notion "ATS Research" (35 ciclos).
 * Reglas aplicadas del research:
 *  - Hybrid Chronological: Summary → Skills → Tools → Work Experience → Certifications → Education.
 *  - Single-column, headers estándar, contacto en el cuerpo, URLs en texto plano, sin iconos.
 *  - Verbos de ownership + métrica en ≥70% de bullets; primer bullet con patrón x→y.
 *  - Figma con sub-features nombrados; herramientas individuales (nunca "design tools").
 *  - WCAG 2.2 + Section 508 en Skills Y en un bullet de experiencia.
 *  - Fechas "YYYY – Present"; teléfono E.164; "Quito, Ecuador | Available Remotely".
 *  - Educación sin año (graduación 10+ años atrás); certificaciones aparte.
 * Regla dura: cada afirmación sale del fact-bank. Nada inventado.
 */

const t = (lang: Lang, en: string, es: string): string => (lang === "en" ? en : es);

/* v2 (2026-07-01): incorpora los 8 gaps del diagnóstico. Los items con `todo: true`
 * requieren datos reales de Danilo antes de entrar al fact-bank; se renderizan
 * resaltados en amarillo con [DATO: ...] para que la versión no sea enviable por error. */

interface AtsRow {
  dates: { en: string; es: string };
  co: string;
  context?: { en: string; es: string };
  role: { en: string; es: string };
  bullets: { en: string; es: string; todo?: boolean }[];
}

const ROWS: AtsRow[] = [
  {
    dates: { en: "2022 – Present", es: "2022 – Presente" },
    co: "Booz Allen Hamilton",
    context: {
      en: "Federal Trusted Environments platform + Developer Portal · Army, DoD, FAA, VA",
      es: "Plataforma federal Trusted Environments + Developer Portal · Army, DoD, FAA, VA",
    },
    role: { en: "Senior Product Designer (Design-Engineering)", es: "Senior Product Designer (Design-Engineering)" },
    bullets: [
      {
        en: "Led end-to-end product design for the federal Trusted Environments platform and Developer Portal, cutting design-to-development cycle time from ~6 weeks to under 1 week by delivering production-ready React components and screens.",
        es: "Lideré el diseño de producto end-to-end de la plataforma federal Trusted Environments y su Developer Portal, reduciendo el ciclo design-to-development de ~6 semanas a menos de 1 semana al entregar componentes y pantallas React listos para producción.",
      },
      {
        en: "Architected 2 design systems on Shadcn, Radix and the BAH Brand Book; adoption scaled from 0 to 26 internal teams across a ~30,000-engineer firm, including the Vellox Reverser cybersecurity product.",
        es: "Arquitecté 2 design systems sobre Shadcn, Radix y el BAH Brand Book; la adopción escaló de 0 a 26 equipos internos en una firma de ~30,000 ingenieros, incluyendo el producto de ciberseguridad Vellox Reverser.",
      },
      {
        en: "Established accessibility compliance (WCAG 2.2, Section 508) across the design system, passing 95%+ of automated accessibility checks.",
        es: "Establecí el cumplimiento de accesibilidad (WCAG 2.2, Section 508) en todo el design system, superando el 95%+ de los checks automatizados de accesibilidad.",
      },
      {
        en: "Pioneered agentic UX research: built LLM-based persona emulators running hundreds of automated usability tests per screen, validated with moderated usability testing (5 users per feature) — 92% of participants rated the shipped improvements as better.",
        es: "Pionero en investigación UX agéntica: construí emuladores de persona basados en LLM que corrían cientos de pruebas de usabilidad automatizadas por pantalla, validadas con usability testing moderado (5 usuarios por feature) — 92% de los participantes calificó las mejoras como superiores.",
      },
      {
        en: "Designed an agent-ready dark design system consumed autonomously by other teams' AI agents to generate assets (social stories, presentations) — built before mainstream cloud design tooling existed.",
        es: "Diseñé un design system dark agent-ready que agentes de IA de otros equipos consumen de forma autónoma para generar assets (social stories, presentaciones) — construido antes de que existiera tooling de cloud design mainstream.",
      },
      {
        en: "Designed a custom MCP (Model Context Protocol) server for developers and established NPS and CSAT measurement; problem tickets decreased while feature-request engagement in Aha! increased after faster release cycles.",
        es: "Diseñé un servidor MCP (Model Context Protocol) propio para developers y establecí medición de NPS y CSAT; los tickets de problemas bajaron mientras el engagement de ideas en Aha! subió con ciclos de release más rápidos.",
      },
    ],
  },
  {
    dates: { en: "2026 – Present", es: "2026 – Presente" },
    co: "Compliance SaaS · LATAM",
    // Regla fact-bank 2026-07-02: nunca presentar como co-founder; solo Lead Product Designer.
    role: { en: "Lead Product Designer", es: "Líder de Diseño de Producto" },
    bullets: [
      {
        en: "Own discovery-to-launch design for a compliance SaaS for LATAM SMBs; shipped a validated MVP in 40 days — the product serves ~280 paying customers on a base of ~2,700 total users.",
        es: "Dueño del diseño de discovery a lanzamiento de un SaaS de compliance para PYMES LATAM; validé el MVP en 40 días — el producto atiende ~280 clientes de pago sobre una base de ~2,700 usuarios.",
      },
      {
        en: "Built a 31-component design system in Figma, used across 16 screens and implemented directly in React 19 + TypeScript on Supabase.",
        es: "Construí un design system de 31 componentes en Figma, usado en 16 pantallas e implementado directamente en React 19 + TypeScript sobre Supabase.",
      },
      // Bullet único onboarding+analytics (fusionados 2026-07-02); entrevistas moderadas NO vuelven: no ocurrió.
      {
        en: "Rebuilt a failing onboarding funnel in 3 weeks using usability testing and AI-persona feedback loops; instrumented end-to-end analytics in Mixpanel and defined the activation metric — new-user activation rose from 2.6% to 9.4%.",
        es: "Reconstruí un funnel de onboarding roto en 3 semanas usando usability testing y loops de feedback con personas IA; instrumenté analytics end-to-end en Mixpanel y definí la métrica de activación — la activación de nuevos usuarios subió de 2.6% a 9.4%.",
      },
      {
        en: "Designed and ran an A/B test on onboarding sign-up (email registration vs. Google sign-in); Google sign-in won, lifting onboarding completion by 74%.",
        es: "Diseñé y corrí un A/B test sobre el registro del onboarding (registro con email vs. acceso con Google); ganó el acceso con Google, subiendo la finalización del onboarding en 74%.",
      },
    ],
  },
  {
    dates: { en: "2016 – 2022", es: "2016 – 2022" },
    co: "Xentinels DesignOps",
    context: { en: "Clients: Merck, Mondelēz, Banco Pichincha", es: "Clientes: Merck, Mondelēz, Banco Pichincha" },
    role: { en: "Design Director / Product Manager", es: "Director de Diseño / Product Manager" },
    bullets: [
      {
        en: "Directed the DesignOps unit for Fortune 500 clients, scaling distributed multi-theme design systems and token libraries on Ant Design, Material UI and IBM Carbon, plus a custom Shadcn-based design system for Banco Pichincha.",
        es: "Dirigí la unidad de DesignOps para clientes Fortune 500, escalando design systems multi-tema distribuidos y librerías de tokens sobre Ant Design, Material UI e IBM Carbon, más un design system propio basado en Shadcn para Banco Pichincha.",
      },
      {
        en: "Led qualitative user research — 100+ user interviews, usability testing and card sorting — defining standard enterprise interaction patterns.",
        es: "Lideré investigación cualitativa de usuarios — 100+ entrevistas, usability testing y card sorting — definiendo patrones de interacción enterprise estándar.",
      },
      {
        en: "Reduced client time-to-market by 35% through an optimized design-to-engineering handoff; mentored 12 junior/mid designers.",
        es: "Reduje el time-to-market de clientes en 35% mediante un handoff diseño-ingeniería optimizado; mentoricé a 12 diseñadores junior/mid.",
      },
    ],
  },
];

const EARLIER = {
  h: { en: "Earlier experience (2011 – 2017)", es: "Experiencia anterior (2011 – 2017)" },
  lines: [
    { co: "Arpatel", role: { en: "Product Manager — Retail POS and CRM product flows", es: "Product Manager — flujos de producto Retail POS y CRM" } },
    { co: "Tecniequipos", role: { en: "Senior Visual Designer / Developer", es: "Diseñador Visual Senior / Developer" } },
    { co: "Canadian Bank Note", role: { en: "Project Administrator — regional technical projects", es: "Administrador de Proyectos — proyectos técnicos regionales" } },
  ],
};

interface SkillLine { label: { en: string; es: string }; items: string; todo?: boolean; }
const SKILLS: SkillLine[] = [
  {
    label: { en: "User Research", es: "User Research" },
    items: "User Research · Usability Testing (moderated & unmoderated) · Journey Mapping · Diary Studies · Contextual Inquiry · Card Sorting · Tree Testing · First-Click Testing · NPS · CSAT",
  },
  {
    label: { en: "Product Design", es: "Diseño de Producto" },
    items: "End-to-End Product Design · Product Discovery · Problem Framing · Interaction Design · Prototyping · Design-to-Code (React, TypeScript) · Cognitive Friction Mapping",
  },
  {
    // fact-bank skills.product_analytics: evidencia real EnRegla 2026.
    label: { en: "Product Analytics & Experimentation", es: "Analytics de Producto y Experimentación" },
    items: "Mixpanel · Activation Metrics · A/B Testing · Funnel Analysis",
  },
  {
    // fact-bank skills.learning_in_progress: en formación diaria, no claim pleno.
    label: { en: "Currently developing", es: "En formación activa" },
    items: "Jobs-to-be-Done (JTBD) · North Star Metric · PostHog · Dovetail · Maze",
  },
  {
    label: { en: "Design Systems", es: "Design Systems" },
    items: "Design Tokens · Component Architecture · Figma Libraries · Storybook · Shadcn · Radix · Ant Design · Material UI · IBM Carbon",
  },
  {
    label: { en: "Accessibility", es: "Accesibilidad" },
    items: "Accessibility (WCAG 2.2) · Section 508 · Automated accessibility audits",
  },
  {
    label: { en: "AI & Agentic Design", es: "IA y Diseño Agéntico" },
    items: "Agent-ready Design Systems · LLM Persona Emulation · Agentic UX Testing · Custom MCP design · AI-augmented design workflows",
  },
];

const TOOLS = "Figma (Auto Layout, Variables, Dev Mode, Motion, Figma Make, MCP) · Miro · Storybook · Jira · Linear · GitHub · Vercel · Cursor · Claude Code";

const STYLES = `
/* Tri-voz tipográfica (todo system fonts, ATS-safe): Bahnschrift = display/headings,
   Segoe UI = cuerpo humanista, Consolas = metadata (contacto, fechas, contexto). */
:root{ --ink:#1a1d21; --body:#33383d; --dim:#6a7178; --line:#c9cdd1; }
@page{ size:A4; margin:12mm 16mm; }
*{ box-sizing:border-box; margin:0; padding:0; }
body{ font-family:"Segoe UI",Arial,Helvetica,sans-serif; color:var(--body); font-size:10pt; line-height:1.5; background:#fff; }
.page{ max-width:178mm; margin:0 auto; padding:4mm 0; }
h1{ font-family:Bahnschrift,"Segoe UI",Arial,sans-serif; font-size:26pt; font-weight:600; color:var(--ink); letter-spacing:-.01em; }
.headline{ font-size:11.5pt; color:var(--dim); margin-top:3pt; font-weight:350; letter-spacing:.015em; }
.contact{ margin-top:8pt; font-family:Consolas,monospace; font-size:8pt; color:var(--dim); line-height:1.75; letter-spacing:.01em; }
/* Tracking <=.1em: mas alto rompe la extraccion de texto del PDF ("R E S U M E N") y el parseo ATS. */
h2{ font-family:Bahnschrift,"Segoe UI",Arial,sans-serif; font-size:8.5pt; font-weight:500; color:var(--dim); text-transform:uppercase; letter-spacing:.1em; border-bottom:.6pt solid var(--line); padding-bottom:4pt; margin:13pt 0 7pt; break-after:avoid; }
.summary{ font-size:10pt; }
.skline{ margin:0 0 4.5pt; }
.skline b{ color:var(--ink); font-weight:600; }
.job{ margin:0 0 11pt; }
.job-h{ display:flex; justify-content:space-between; gap:12pt; align-items:baseline; }
.job-h .co{ font-weight:600; color:var(--ink); font-size:10.5pt; }
.job-h .dates{ font-family:Consolas,monospace; font-size:8pt; color:var(--dim); white-space:nowrap; letter-spacing:.02em; }
.job .role{ font-weight:600; color:var(--ink); }
.job .ctx{ font-family:Consolas,monospace; font-size:8pt; color:var(--dim); margin:1pt 0 3pt; }
ul{ margin:4pt 0 0 13pt; }
li{ margin:0 0 3pt; break-inside:avoid; }
li::marker{ content:"–\\2002"; color:var(--dim); }
.plain{ margin:0 0 3.5pt; }
.plain b{ color:var(--ink); font-weight:600; }
/* Marcador de dato pendiente: visible en HTML y PDF para que la versión no se envíe por error. */
.todo{ background:#fff3b0; outline:2px solid #e0a800; }
`;

export function renderAtsCv(data: CvData, lang: Lang): string {
  const id = data.identity;
  const c = id.contact;
  const title = escapeHtml(`${id.name} · Senior Product Designer`);
  const phone = (c.phone ?? "").replace(/[^+\d]/g, "");

  const L = lang === "en"
    ? {
        headline: "Senior Product Designer",
        location: "Quito, Ecuador | Available Remotely",
        summary: "Summary",
        skills: "Skills",
        tools: "Tools",
        exp: "Work Experience",
        certs: "Certifications",
        edu: "Education",
        summaryText:
          "Senior Product Designer with 12+ years leading product discovery and end-to-end design for complex, regulated environments — federal platforms (DoD, Army, FAA, VA) and B2B SaaS. Cut design-to-development cycle time from ~6 weeks to under 1 week and scaled a design system from 0 to 26 teams at Booz Allen Hamilton. Expert in Figma (Auto Layout, Variables, Dev Mode), design systems governance, accessibility (WCAG 2.2, Section 508) and AI-augmented user research.",
      }
    : {
        headline: "Senior Product Designer",
        location: "Quito, Ecuador | Disponible en remoto",
        summary: "Resumen",
        skills: "Habilidades",
        tools: "Herramientas",
        exp: "Experiencia Laboral",
        certs: "Certificaciones",
        edu: "Educación",
        summaryText:
          "Senior Product Designer con 12+ años liderando product discovery y diseño end-to-end para entornos complejos y regulados — plataformas federales (DoD, Army, FAA, VA) y SaaS B2B. Reduje el ciclo design-to-development de ~6 semanas a menos de 1 semana y escalé un design system de 0 a 26 equipos en Booz Allen Hamilton. Experto en Figma (Auto Layout, Variables, Dev Mode), gobernanza de design systems, accesibilidad (WCAG 2.2, Section 508) e investigación de usuarios potenciada por IA.",
      };

  const skills = SKILLS.map((s) =>
    `<p class="skline${s.todo ? " todo" : ""}"><b>${escapeHtml(t(lang, s.label.en, s.label.es))}:</b> ${escapeHtml(s.items)}</p>`,
  ).join("\n  ");

  const jobs = ROWS.map((r) => `
  <div class="job">
    <div class="job-h"><span class="co">${escapeHtml(r.co)}</span><span class="dates">${escapeHtml(t(lang, r.dates.en, r.dates.es))}</span></div>
    <div class="role">${escapeHtml(t(lang, r.role.en, r.role.es))}</div>
    ${r.context ? `<div class="ctx">${escapeHtml(t(lang, r.context.en, r.context.es))}</div>` : ""}
    <ul>
      ${r.bullets.map((b) => `<li${b.todo ? ' class="todo"' : ""}>${escapeHtml(t(lang, b.en, b.es))}</li>`).join("\n      ")}
    </ul>
  </div>`).join("");

  const earlier = `
  <div class="job">
    <div class="job-h"><span class="co">${escapeHtml(t(lang, EARLIER.h.en, EARLIER.h.es))}</span></div>
    ${EARLIER.lines.map((l) => `<p class="plain"><b>${escapeHtml(l.co)}</b> — ${escapeHtml(t(lang, l.role.en, l.role.es))}</p>`).join("\n    ")}
  </div>`;

  const certs = data.education
    .filter((e) => e.year != null && e.year >= 2020)
    .map((e) => `<p class="plain"><b>${escapeHtml(e.name)}</b> — ${escapeHtml(e.institution)}, ${e.year}</p>`)
    .join("\n  ")
    + `\n  <p class="plain"><b>Certified Professional in Accessibility Core Competencies (CPACC)</b> — IAAP (${t(lang, "in progress", "en curso")})</p>`;

  /* Grados formales sin año: graduación 10+ años atrás (regla anti-sesgo de edad del research). */
  const edu = data.education
    .filter((e) => e.name.startsWith("M.A.") || e.name.startsWith("B.Sc."))
    .map((e) => `<p class="plain"><b>${escapeHtml(e.name)}</b> — ${escapeHtml(e.institution)}${e.inProgress ? ` (${t(lang, "in progress", "en curso")})` : ""}</p>`)
    .join("\n  ");

  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<title>${title}</title>
<style>${STYLES}</style>
</head>
<body>
<div class="page">
  <h1>${escapeHtml(id.name)}</h1>
  <p class="headline">${escapeHtml(L.headline)}</p>
  <p class="contact">
    ${escapeHtml(L.location)}<br>
    ${escapeHtml(phone)} | ${escapeHtml(c.email)}<br>
    ${escapeHtml(c.site ?? "danilorojas.design")} | ${escapeHtml(c.linkedin ?? "")} | ${escapeHtml(c.github ?? "")}
  </p>

  <h2>${escapeHtml(L.summary)}</h2>
  <p class="summary">${escapeHtml(L.summaryText)}</p>

  <h2>${escapeHtml(L.skills)}</h2>
  ${skills}

  <h2>${escapeHtml(L.tools)}</h2>
  <p class="skline">${escapeHtml(TOOLS)}</p>

  <h2>${escapeHtml(L.exp)}</h2>
  ${jobs}
  ${earlier}

  <h2>${escapeHtml(L.certs)}</h2>
  ${certs}

  <h2>${escapeHtml(L.edu)}</h2>
  ${edu}
</div>
</body>
</html>`;
}
