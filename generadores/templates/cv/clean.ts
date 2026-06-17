import type { CvData } from "../../lib/types.js";
import { escapeHtml, type Lang } from "../skills-sheet-page-1.js";

const t = (lang: Lang, en: string, es: string): string => (lang === "en" ? en : es);

/* Curated one-line role summaries for the single page. Derived (condensed)
 * from perfil/data/experience.yaml descriptions — no invented claims. */
interface Row { years: string; co: string; role: { en: string; es: string }; badge?: string; desc: { en: string; es: string }; }
const ROWS: Row[] = [
  { years: "2022—NOW", co: "Booz Allen Hamilton", badge: "Army · DoD",
    role: { en: "Design-engineering consultant", es: "Consultor design-engineering" },
    desc: {
      en: "Two parallel design systems (/te-skin agent-consumable skill + TE Black, a11y audited into tokens), a Developer Portal product, and a SharePoint SPA. Cross-team consulting to Army/DoD; support for FAA, DoD & VA.",
      es: "Dos design systems paralelos (/te-skin como skill consumible por agentes + TE Black, accesibilidad auditada en los tokens), un producto Developer Portal y una SPA en SharePoint. Consultoría a equipos Army/DoD; apoyo a la FAA, el DoD y la VA.",
    } },
  { years: "2026—NOW", co: "Compliance SaaS · LATAM", badge: "paying pilots",
    role: { en: "Founder · product & design", es: "Fundador · producto y diseño" },
    desc: {
      en: "0 → 1.0 MVP in 40 days: 346 commits, 21 SQL migrations, 31 components, an edge function with cron, a 17-part design-system migration across 5 recursive review rounds (78.4 → 95.6).",
      es: "0 → 1.0 MVP en 40 días: 346 commits, 21 migraciones SQL, 31 componentes, una edge function con cron y una migración de design system de 17 partes en 5 rondas recursivas (78.4 → 95.6).",
    } },
  { years: "2016—NOW", co: "Xentinels DesignOps",
    role: { en: "Product Manager · UX/UI Designer", es: "Product Manager · Diseñador UX/UI" },
    desc: {
      en: "Formalized a Central Design team for a distributed-yet-centralized design system: roadmap, roles, contribution culture, tokens + accessible components for Merck, Mondelēz, Banco Pichincha, Quifatex, Azzorti.",
      es: "Formalicé un equipo de Central Design para un design system distribuido pero centralizado: roadmap, roles, cultura de contribución, tokens y componentes accesibles para Merck, Mondelēz, Banco Pichincha, Quifatex, Azzorti.",
    } },
  { years: "2011—17", co: "Arpatel · Tecniequipos · Canadian Bank Note",
    role: { en: "Co-founder / Senior Designer-Dev / Project Admin", es: "Co-fundador / Diseñador-Dev Senior / Admin de proyecto" },
    desc: {
      en: "Retail POS, CRM and order-management; a proprietary events platform (PHP · JS · MariaDB); regional network project administration.",
      es: "Retail POS, CRM y order-management; una plataforma propietaria de eventos (PHP · JS · MariaDB); administración de un proyecto regional de redes.",
    } },
];

interface Cap { label: { en: string; es: string }; detail: { en: string; es: string }; }
const CAPS: Cap[] = [
  { label: { en: "Design systems", es: "Design systems" }, detail: { en: "multi-theme · W3C tokens · recursive review", es: "multi-theme · tokens W3C · revisión recursiva" } },
  { label: { en: "Engineering", es: "Ingeniería" }, detail: { en: "TS · React 19 · Supabase · SQL/RLS · CI", es: "TS · React 19 · Supabase · SQL/RLS · CI" } },
  { label: { en: "Agents", es: "Agentes" }, detail: { en: "Claude Code · MCP · subagent orchestration", es: "Claude Code · MCP · orquestación de subagentes" } },
  { label: { en: "Strategy", es: "Estrategia" }, detail: { en: "product vision · roadmapping · GTM specs", es: "visión de producto · roadmapping · specs GTM" } },
];

const STYLES = `
:root{
  --ink:#111318; --body:#1c1e24; --dim:#6a6e78; --paper:#f6f4ef;
  --line:rgba(20,22,28,.16); --line-soft:rgba(20,22,28,.09); --grid:rgba(20,22,28,.05);
  --mono:'JetBrains Mono','SFMono-Regular',ui-monospace,monospace;
}
@page{ size:A4; margin:0; }
*{ box-sizing:border-box; margin:0; padding:0; }
html,body{ background:var(--paper); }
body{ font-family:Inter,system-ui,sans-serif; color:var(--body); }
.cv-page{ width:210mm; min-height:297mm; padding:17mm 16mm; position:relative; background:var(--paper); overflow:hidden; }
.cv-page::before{ content:""; position:absolute; inset:0; pointer-events:none;
  background-image:linear-gradient(to right,var(--grid) 1px,transparent 1px),linear-gradient(to bottom,var(--grid) 1px,transparent 1px);
  background-size:15mm 15mm;
  -webkit-mask-image:radial-gradient(circle at 50% 36%,#000 55%,transparent 100%); mask-image:radial-gradient(circle at 50% 36%,#000 55%,transparent 100%); }
.top{ display:flex; justify-content:space-between; align-items:flex-start; position:relative; z-index:1; }
.name{ font-size:30px; font-weight:500; letter-spacing:-.02em; color:var(--ink); line-height:1.05; }
.role{ margin-top:8px; font-size:12.5px; color:var(--dim); }
.avail{ display:inline-flex; align-items:center; gap:6px; margin-top:10px; font-family:var(--mono); font-size:9px; letter-spacing:.14em; text-transform:uppercase; color:var(--dim); }
.dot{ width:6px; height:6px; border-radius:50%; background:#10b981; box-shadow:0 0 0 2px rgba(16,185,129,.18); }
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
.grid2{ display:grid; grid-template-columns:1.3fr 1fr; gap:34px; }
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
    ? { exp: "Experience", expK: "EXP // selected", cap: "Capabilities", capK: "CAP // mastered", edu: "Education", eduK: "EDU", lead2: "Eighteen years in product, fifteen in design — senior UX judgment, enterprise compliance documentation, AI as leverage, not costume." }
    : { exp: "Experiencia", expK: "EXP // selección", cap: "Capacidades", capK: "CAP // dominadas", edu: "Educación", eduK: "EDU", lead2: "Dieciocho años en producto, quince en diseño — juicio UX senior, documentación de compliance enterprise, IA como leverage, no como disfraz." };

  const leadHead = t(lang, "I design products for", "Diseño productos para");
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
      <div class="avail"><span class="dot"></span>${escapeHtml(id.availability)}</div>
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
    <div class="sec-h"><h2>${escapeHtml(L.exp)}</h2><span class="k">${escapeHtml(L.expK)}</span></div>
    ${jobs}
  </section>

  <section class="sec grid2">
    <div>
      <div class="sec-h"><h2>${escapeHtml(L.cap)}</h2><span class="k">${escapeHtml(L.capK)}</span></div>
      ${caps}
    </div>
    <div>
      <div class="sec-h"><h2>${escapeHtml(L.edu)}</h2><span class="k">${escapeHtml(L.eduK)}</span></div>
      ${edu}
    </div>
  </section>

  <div class="foot"><span>${escapeHtml(id.name)} — ${escapeHtml(t(lang, "Senior Product Designer", "Diseñador de Producto Senior"))}</span><span>${escapeHtml(c.site ?? "danilorojas.design")}</span></div>
</article>
</body>
</html>`;
}
