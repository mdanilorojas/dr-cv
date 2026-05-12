import type {
  LandingData,
  Identity,
  Positioning,
  Landing,
  Case,
  Testimonial,
  HorizonSection,
  HorizonColumn,
  HorizonChip,
} from "../../lib/types.js";
import { escapeHtml, type Lang } from "../skills-sheet-page-1.js";
import { V11_STYLES } from "./v11-styles.js";
import { V11_SCRIPT } from "./v11-script.js";

/* ============== Narrative Ship case-study beats ==============
 * Hand-authored beats per case in the Narrative Ship format
 * (Context, Problem, Approach, Ship, Outcome, Differently, Craft).
 * Keyed by case slug. These live here because they are copy,
 * not data — V11 R4 + R8 demand verbatim attribution.
 */
interface CaseBeats {
  context: { en: string; es: string };
  problem: { en: string; es: string };
  approach: { en: string; es: string };
  ship: { en: string; es: string };
  outcome: { en: string; es: string };
  differently: { en: string; es: string };
  craft: { en: string; es: string };
}

const CASE_BEATS: Record<string, CaseBeats> = {
  enregla: {
    context: {
      en: "LATAM SMB compliance. Multi-site reporting was done in spreadsheets, manually, every month. Nobody owned the data model.",
      es: "Compliance para PYMES LATAM. Los reportes multi-sede se hacían en hojas de cálculo, a mano, cada mes. Nadie era dueño del modelo de datos.",
    },
    problem: {
      en: "Existing tools priced out SMBs or required a sysadmin to deploy. Nothing shipped as a 40-day 0→1.0.",
      es: "Las herramientas existentes eran caras para PYMES o requerían un sysadmin para desplegarse. Nada shippeaba como un 40-day 0→1.0.",
    },
    approach: {
      en: "Built the SaaS as a co-author exercise with Claude Code. Supabase MCP server in the loop for SQL + migrations. Parallel subagents on UI, data model, edge functions.",
      es: "Construí el SaaS como ejercicio de co-autoría con Claude Code. Supabase MCP en el loop para SQL + migraciones. Subagentes en paralelo en UI, modelo de datos, edge functions.",
    },
    ship: {
      en: "346 commits in 40 days. 21 SQL migrations, 31 UI components, 1 edge function with cron. Live with paying pilots.",
      es: "346 commits en 40 días. 21 migraciones SQL, 31 componentes UI, 1 edge function con cron. En producción con pilotos pagados.",
    },
    outcome: {
      en: "DS migration ran 5 recursive rounds scoring 78.4 → 95.6. First pilots reporting monthly compliance in minutes instead of days.",
      es: "La migración DS corrió 5 rondas recursivas, puntuando 78.4 → 95.6. Los primeros pilotos reportan compliance mensual en minutos en lugar de días.",
    },
    differently: {
      en: "Next time I write the MCP servers before the schema. The agent kept proposing columns it couldn't write back — half the recursion was plumbing.",
      es: "La próxima vez escribo los MCP servers antes del schema. El agente seguía proponiendo columnas que no podía escribir — la mitad de la recursión fue plomería.",
    },
    craft: {
      en: "RLS on every table. Type-safe Supabase client. Dark-mode primary with per-token WCAG trail. 0 hand-edited SQL in prod.",
      es: "RLS en cada tabla. Cliente Supabase type-safe. Dark-mode primario con trazabilidad WCAG por token. 0 SQL hand-edited en prod.",
    },
  },
  "te-skin": {
    context: {
      en: "Booz Allen Hamilton / Trusted Environments — a government-facing platform. Design review was a two-week bottleneck on every ticket.",
      es: "Booz Allen Hamilton / Trusted Environments — plataforma government-facing. La revisión de diseño era un cuello de botella de dos semanas por cada ticket.",
    },
    problem: {
      en: "Designers reviewed the same WCAG + token mismatches on every PR. The DS existed as Figma — the agents couldn't reach it.",
      es: "Los diseñadores revisaban los mismos desajustes WCAG + tokens en cada PR. El DS existía en Figma — los agentes no podían alcanzarlo.",
    },
    approach: {
      en: "Packaged the DS as a Claude Code slash-command skill. Tokens + decision trees + 17 recursive review rules invokable with @te-skin.",
      es: "Empaqueté el DS como slash-command skill para Claude Code. Tokens + árboles de decisión + 17 reglas recursivas invocables con @te-skin.",
    },
    ship: {
      en: "Shipped in four weeks. Two-person agent workflow: one proposes UI, one runs recursive review. Five rounds raised the score 78.4 → 95.6.",
      es: "Shippeado en cuatro semanas. Workflow de dos agentes: uno propone UI, otro corre revisión recursiva. Cinco rondas subieron el score 78.4 → 95.6.",
    },
    outcome: {
      en: "Design review cycles dropped from 2 weeks → 36 hours. Jennifer Sheppard, Product Lead, called it \\\"work I wanted to keep reusing.\\\"",
      es: "Los ciclos de revisión cayeron de 2 semanas → 36 horas. Jennifer Sheppard, Product Lead, lo llamó \\\"work I wanted to keep reusing.\\\"",
    },
    differently: {
      en: "I would ship a public skill scaffold first. The BAH-specific tokens should have been a layer, not the base.",
      es: "Shippearía primero un scaffold público del skill. Los tokens BAH-specific deberían haber sido una capa, no la base.",
    },
    craft: {
      en: "WCAG audit trail stored per token. Dark-mode primary. Skill idempotent under re-invocation. No manual edits in the generated output.",
      es: "Trazabilidad WCAG guardada por token. Dark-mode primario. Skill idempotente bajo re-invocación. Cero edits manuales en el output generado.",
    },
  },
  "te-black": {
    context: {
      en: "Booz Allen Hamilton / Trusted Environments — operators working 12-hour shifts on dark-first consoles. Existing components washed out under mission lighting.",
      es: "Booz Allen Hamilton / Trusted Environments — operadores en turnos de 12 horas en consolas dark-first. Los componentes existentes se lavaban bajo la iluminación de misión.",
    },
    problem: {
      en: "Design system treated dark as a theme. Operators were the primary audience — it needed to be the base.",
      es: "El sistema trataba dark como tema. Los operadores eran la audiencia primaria — debía ser la base.",
    },
    approach: {
      en: "Built TE Black: dark-primary palette with per-token WCAG audit written into the token definition, not as a downstream check.",
      es: "Construí TE Black: paleta dark-primaria con auditoría WCAG por token escrita en la definición del token, no como chequeo downstream.",
    },
    ship: {
      en: "Tokens expose `wcag.normal` and `wcag.large` ratios for every ink-on-surface pair. Component library migrated in the same PR as the tokens.",
      es: "Los tokens exponen ratios `wcag.normal` y `wcag.large` para cada par ink-on-surface. La librería de componentes migrada en la misma PR que los tokens.",
    },
    outcome: {
      en: "Every contrast pair provably ≥ 4.5:1. Operators stopped reporting \\\"dim text\\\" in weekly retros. Cited in the TE design review as the reference palette.",
      es: "Cada par de contraste probablemente ≥ 4.5:1. Los operadores dejaron de reportar \\\"texto apagado\\\" en los retros semanales. Citado en la review de diseño TE como paleta de referencia.",
    },
    differently: {
      en: "I would publish the audit trail as a CI gate. Right now it's a convention; a failed ratio should fail the build.",
      es: "Publicaría la trazabilidad como un gate de CI. Ahora es una convención; una ratio fallada debería romper el build.",
    },
    craft: {
      en: "Tokens in CSS + JSON + Figma library in sync. APCA-adjacent luminance verified. No undocumented color combinations ship.",
      es: "Tokens en CSS + JSON + librería Figma sincronizados. Luminancia APCA-adjacent verificada. No se shippean combinaciones de color sin documentar.",
    },
  },
  "life-update-mobile": {
    context: {
      en: "A personal product — a tracking app that uses Gemini at runtime to summarize what I wrote this week.",
      es: "Un producto personal — una app de tracking que usa Gemini en runtime para resumir lo que escribí esta semana.",
    },
    problem: {
      en: "Every journal-AI app I'd tried either stored my text on someone else's server or refused to run without internet. I wanted local-first + LLM on demand.",
      es: "Cada app de journal-AI que había probado o guardaba mi texto en el servidor de otro o se negaba a correr sin internet. Quería local-first + LLM on demand.",
    },
    approach: {
      en: "Local SQLite store, plain-text journal. Summarization is opt-in: tap a week, send it to Gemini, cache the result.",
      es: "Almacenamiento SQLite local, journal en texto plano. La resumción es opt-in: tocas una semana, se envía a Gemini, se cachea el resultado.",
    },
    ship: {
      en: "Single binary build. No auth server. Gemini API key ships with the user, not the app.",
      es: "Build de un solo binario. Sin servidor de auth. La API key de Gemini la tiene el usuario, no la app.",
    },
    outcome: {
      en: "Shipped private for my own use. Three friends asked to install it. Weekly summaries in 4 seconds.",
      es: "Shippeado privado para uso propio. Tres amigos pidieron instalarlo. Resúmenes semanales en 4 segundos.",
    },
    differently: {
      en: "I would put the prompt on the Settings page. Right now it's hidden — advanced users want to see it and I was being overly protective.",
      es: "Pondría el prompt en la página de Settings. Ahora está oculto — los usuarios avanzados quieren verlo y yo estaba siendo sobreprotector.",
    },
    craft: {
      en: "No analytics. No telemetry. No account. Bundle under 8 MB. Works airplane-mode except the summary action.",
      es: "Sin analytics. Sin telemetría. Sin cuenta. Bundle bajo 8 MB. Funciona en modo avión excepto la acción de resumen.",
    },
  },
};

function beatsFor(slug: string): CaseBeats | null {
  return CASE_BEATS[slug] ?? null;
}

/* ============== helpers ============== */

function splitName(name: string): { first: string; last: string } {
  const parts = name.trim().split(/\s+/);
  return { first: parts.slice(0, -1).join(" "), last: parts.slice(-1)[0] ?? "" };
}

function yearRange(startYear: number, endYear: number | "present", lang: Lang): string {
  if (endYear === "present") return `${startYear} — ${lang === "en" ? "Present" : "presente"}`;
  if (startYear === endYear) return String(startYear);
  return `${startYear} — ${endYear}`;
}

/* ============== copy (V11 R5 draft C — taste-first critic) ============== */

const COPY = {
  // Hero
  hero: {
    eyebrowEn: "Currently · Booz Allen Hamilton · Trusted Environments",
    eyebrowEs: "Actualmente · Booz Allen Hamilton · Trusted Environments",
    titleEn: "A point of view on agentic design,",
    titleEs: "Un punto de vista sobre diseño agéntico,",
    titleEmEn: "not a résumé.",
    titleEmEs: "no un currículum.",
    subEn: "Fifteen years shipping product. The last twelve months rebuilt around a Claude Code workflow I use every day. I keep the craft — agents give me the leverage.",
    subEs: "Quince años entregando producto. Los últimos doce meses reconstruidos alrededor de un workflow Claude Code que uso cada día. Yo pongo el craft — los agentes dan el apalancamiento.",
    ctaPrimaryEn: "Read the notebook",
    ctaPrimaryEs: "Ver el notebook",
    ctaGhostEn: "See the work",
    ctaGhostEs: "Ver el trabajo",
  },
  // Proof
  proofHeadingEn: "Evidence, not adjectives.",
  proofHeadingEs: "Evidencia, no adjetivos.",
  // Notebook
  notebook: {
    eyebrowEn: "Notebook · essay",
    eyebrowEs: "Notebook · ensayo",
    titleEn: "Trust is the unit of economy.",
    titleEs: "La confianza es la unidad económica.",
    tocEn: "1 · The diff is the contract  /  2 · Skills, not prompts  /  3 · What I still won't let the agent do",
    tocEs: "1 · El diff es el contrato  /  2 · Skills, no prompts  /  3 · Lo que todavía no le dejo al agente",
    bodyEn: [
      "The hardest thing about agentic design isn't the prompt engineering. It's deciding, at every junction, whether the human reviews the diff or the agent just ships it. <em>Trust is the unit of economy.</em> Every tool I build for myself starts by answering one question: what do I get to keep looking at?",
      "The teams shipping real agentic work in 2026 aren't the ones with the cleverest prompts. They're the ones that put the diff at the center. Claude Code is the prototype: every mutation proposed, reviewable, rejectable. The UX work is hiding the machinery when the trust is earned — not pretending the machinery isn't there.",
      "I didn't start my career building for agents. I spent fifteen years shipping product for humans. The combination is the work now — profile plus agents — and it's not a productivity story. It's a <em>taste</em> story. The agent will propose a hundred things; picking the six that should ship is the skill.",
    ],
    bodyEs: [
      "Lo más difícil del diseño agéntico no es la ingeniería de prompts. Es decidir, en cada unión, si el humano revisa el diff o el agente simplemente lo shipea. <em>La confianza es la unidad económica.</em> Cada herramienta que construyo para mí empieza respondiendo una pregunta: ¿qué me toca seguir mirando?",
      "Los equipos que están shipeando trabajo agéntico real en 2026 no son los que tienen los prompts más ingeniosos. Son los que ponen el diff al centro. Claude Code es el prototipo: toda mutación propuesta, revisable, rechazable. El trabajo de UX es esconder la maquinaria cuando la confianza se ganó — no pretender que la maquinaria no está ahí.",
      "No empecé mi carrera construyendo para agentes. Pasé quince años entregando producto para humanos. La combinación es el trabajo ahora — perfil más agentes — y no es una historia de productividad. Es una historia de <em>gusto</em>. El agente propondrá cien cosas; elegir las seis que deben shipearse es la skill.",
    ],
  },
  work: {
    eyebrowEn: "Selected work · 2025–2026",
    eyebrowEs: "Trabajo seleccionado · 2025–2026",
    titleEn: "Four ships. Four agent-built artifacts.",
    titleEs: "Cuatro ships. Cuatro artefactos construidos con agentes.",
    leadEn: "Everything below was built with agents at the center of the workflow. The craft floor is mine — the leverage is the combination.",
    leadEs: "Todo lo de abajo fue construido con agentes al centro del workflow. El craft floor es mío — el apalancamiento es la combinación.",
    beatsEn: {
      context: "Context",
      problem: "Problem",
      approach: "Approach",
      ship: "Ship",
      outcome: "Outcome",
      differently: "Differently",
      craft: "Craft floor",
    },
    beatsEs: {
      context: "Contexto",
      problem: "Problema",
      approach: "Aproximación",
      ship: "Ship",
      outcome: "Resultado",
      differently: "Lo cambiaría",
      craft: "Craft floor",
    },
  },
  method: {
    eyebrowEn: "Method",
    eyebrowEs: "Método",
    titleEn: "Profile plus agents. Diff as the contract.",
    titleEs: "Perfil más agentes. El diff como contrato.",
    leadEn: "I plan before I build. I review every diff. I package skills, not prompts. The agent proposes; I decide.",
    leadEs: "Planifico antes de construir. Reviso cada diff. Empaqueto skills, no prompts. El agente propone; yo decido.",
  },
  contact: {
    eyebrowEn: "Contact",
    eyebrowEs: "Contacto",
    titleEn: "Let's talk.",
    titleEs: "Hablemos.",
    leadEn: "Direct email is the fastest path. I reply within one business day. Open to Staff / Principal AI Product Designer roles.",
    leadEs: "Email directo es el camino más rápido. Respondo en un día hábil. Abierto a roles Staff / Principal AI Product Designer.",
    copyLabelEn: "Copy email",
    copyLabelEs: "Copiar email",
    copiedLabelEn: "Copied",
    copiedLabelEs: "Copiado",
    ctaEn: "Reach out",
    ctaEs: "Escribirme",
  },
};

/* ============== NAV ============== */

function renderNav(identity: Identity, lang: Lang): string {
  const workLabel = lang === "en" ? "Work" : "Trabajo";
  const notebookLabel = lang === "en" ? "Notebook" : "Notebook";
  const methodLabel = lang === "en" ? "Method" : "Método";
  const contactLabel = lang === "en" ? "Contact" : "Contacto";
  const langHref = lang === "en" ? "/es/" : "/";
  const langCode = lang === "en" ? "EN / ES" : "ES / EN";
  const langAria = lang === "en" ? "View in Spanish" : "View in English";
  const navAria = lang === "en" ? "Main navigation" : "Navegación principal";

  return `<nav class="v11-nav" aria-label="${escapeHtml(navAria)}">
  <div class="v11-nav__inner">
    <a href="#top" class="v11-nav__brand">${escapeHtml(identity.name)}<span class="v11-nav__brand-sep">·</span>dr</a>
    <div class="v11-nav__tabs">
      <a class="v11-nav__link" href="#notebook">${escapeHtml(notebookLabel)}</a>
      <a class="v11-nav__link" href="#work">${escapeHtml(workLabel)}</a>
      <a class="v11-nav__link" href="#method">${escapeHtml(methodLabel)}</a>
      <a class="v11-nav__link" href="#contact">${escapeHtml(contactLabel)}</a>
    </div>
    <a class="v11-nav__lang" href="${langHref}" hreflang="${lang === "en" ? "es" : "en"}" aria-label="${escapeHtml(langAria)}">${escapeHtml(langCode)}</a>
  </div>
</nav>`;
}

/* ============== HERO (AI Product-Tour layer) ============== */

function renderHero(identity: Identity, positioning: Positioning, lang: Lang, photoHref: string): string {
  const { first, last } = splitName(identity.name);
  const eyebrow = lang === "en" ? COPY.hero.eyebrowEn : COPY.hero.eyebrowEs;
  const title = lang === "en" ? COPY.hero.titleEn : COPY.hero.titleEs;
  const titleEm = lang === "en" ? COPY.hero.titleEmEn : COPY.hero.titleEmEs;
  const sub = lang === "en" ? COPY.hero.subEn : COPY.hero.subEs;
  const ctaPrimary = lang === "en" ? COPY.hero.ctaPrimaryEn : COPY.hero.ctaPrimaryEs;
  const ctaGhost = lang === "en" ? COPY.hero.ctaGhostEn : COPY.hero.ctaGhostEs;

  const artifactFile = lang === "en" ? "cv-serious.en.pdf" : "cv-serious.es.pdf";
  const artifactStatus = lang === "en" ? "ready" : "listo";
  const streamHead = lang === "en" ? "Regenerating EN / ES" : "Regenerando EN / ES";
  const roleCanonical = "Agentic Designer · Product Engineer";
  const artifactMeta = lang === "en" ? "generated 08 May 2026" : "generado 08 May 2026";

  const shortThesis = lang === "en"
    ? "15 years shipping. Booz Allen Hamilton (current). EnRegla (own SaaS). Claude Code power-user. 346 commits · 40 days."
    : "15 años entregando. Booz Allen Hamilton (actual). EnRegla (SaaS propio). Claude Code power-user. 346 commits · 40 días.";

  const avatarAlt = lang === "en"
    ? `Portrait of ${identity.name}`
    : `Retrato de ${identity.name}`;

  return `<section id="top" class="v11-hero" aria-label="Hero">
  <div class="v11-container">
    <div class="v11-hero__grid">
      <div>
        <div class="v11-hero__byline">
          <img class="v11-hero__avatar" src="${escapeHtml(photoHref)}" alt="${escapeHtml(avatarAlt)}" width="110" height="110" loading="eager" decoding="async">
          <div class="v11-hero__eyebrow">${escapeHtml(eyebrow)}</div>
        </div>
        <h1 class="v11-hero__title">${escapeHtml(title)} <em>${escapeHtml(titleEm)}</em></h1>
        <p class="v11-hero__sub">${escapeHtml(sub)}</p>
        <div class="v11-hero__actions">
          <a class="v11-btn v11-btn--primary" href="#notebook">
            ${escapeHtml(ctaPrimary)}
            <span class="v11-btn__arrow" aria-hidden="true">→</span>
          </a>
          <a class="v11-btn v11-btn--ghost" href="#work">
            ${escapeHtml(ctaGhost)}
            <span class="v11-btn__arrow" aria-hidden="true">→</span>
          </a>
        </div>
        <span class="v11-hero__availability">
          <span class="v11-live" aria-hidden="true"></span>
          ${escapeHtml(identity.availability)}
        </span>
      </div>

      <div>
        <div class="v11-artifact" aria-label="Generated CV artifact preview">
          <div class="v11-artifact__head">
            <span class="v11-artifact__dot" aria-hidden="true"></span>
            <span class="v11-artifact__file">${escapeHtml(artifactFile)}</span>
            <span>· ${escapeHtml(artifactMeta)}</span>
            <span class="v11-artifact__status">${escapeHtml(artifactStatus)}</span>
          </div>
          <div class="v11-artifact__body">
            <div class="v11-artifact-paper">
              <div class="v11-artifact-paper__kicker">// ${escapeHtml(roleCanonical)}</div>
              <div class="v11-artifact-paper__name">${escapeHtml(first)} <span>${escapeHtml(last)}</span></div>
              <div class="v11-artifact-paper__meta">${escapeHtml(identity.location)} · ${escapeHtml(identity.languages)}</div>
              <hr class="v11-artifact-paper__hr">
              <div class="v11-artifact-paper__body">${escapeHtml(shortThesis)}</div>
            </div>
          </div>
        </div>
        <div class="v11-stream" role="status" aria-live="polite">
          <div class="v11-stream__head">${escapeHtml(streamHead)}</div>
          <span class="v11-stream__line">npm run build:cvs</span>
          <span class="v11-stream__line">[cv] wrote dist/cvs/cv-warm-en.pdf</span>
          <span class="v11-stream__line">[cv] wrote dist/cvs/cv-serious-en.pdf<span class="v11-stream__caret" aria-hidden="true"></span></span>
        </div>
      </div>
    </div>
  </div>
</section>`;
}

/* ============== PROOF ============== */

function renderProof(positioning: Positioning, lang: Lang): string {
  const heading = lang === "en" ? COPY.proofHeadingEn : COPY.proofHeadingEs;
  const eyebrow = lang === "en" ? "// Evidence" : "// Evidencia";

  // Proof items — value · label · attribution (V11 R8 #6)
  const items = [
    {
      num: "15<em>+</em>",
      labelEn: "Years shipping product",
      labelEs: "Años shippeando producto",
      attrEn: "2010–present · LATAM + US enterprise",
      attrEs: "2010–actualidad · LATAM + US enterprise",
    },
    {
      num: "346",
      labelEn: "Commits · last 40 days",
      labelEs: "Commits · 40 últimos días",
      attrEn: "github.com/mdanilorojas · EnRegla",
      attrEs: "github.com/mdanilorojas · EnRegla",
    },
    {
      num: "1<em>.0</em>",
      labelEn: "SaaS live · paying pilots",
      labelEs: "SaaS en producción · pilotos pagados",
      attrEn: "EnRegla · 0→1.0 in 40 days with agents",
      attrEs: "EnRegla · 0→1.0 en 40 días con agentes",
    },
    {
      num: "95<em>.6</em>",
      labelEn: "DS migration score",
      labelEs: "Score migración DS",
      attrEn: "17 parts × 5 rounds · 78.4→95.6 · TE Skin",
      attrEs: "17 partes × 5 rondas · 78.4→95.6 · TE Skin",
    },
  ];

  const cards = items.map((it) => `
      <div class="v11-proof__item" role="listitem">
        <div class="v11-proof__num">${it.num}</div>
        <div class="v11-proof__label">${escapeHtml(lang === "en" ? it.labelEn : it.labelEs)}</div>
        <div class="v11-proof__attr">${escapeHtml(lang === "en" ? it.attrEn : it.attrEs)}</div>
      </div>`).join("");

  return `<section class="v11-section" aria-labelledby="proof-h">
  <div class="v11-container">
    <div class="v11-section__eyebrow">${escapeHtml(eyebrow.replace(/^\/\/ /, ""))}</div>
    <h2 id="proof-h" class="v11-h1">${escapeHtml(heading)}</h2>
    <div class="v11-proof" role="list">
${cards}
    </div>
  </div>
</section>`;
}

/* ============== NOTEBOOK ============== */

function renderNotebook(identity: Identity, lang: Lang, photoHref: string): string {
  const eyebrow = lang === "en" ? COPY.notebook.eyebrowEn : COPY.notebook.eyebrowEs;
  const title = lang === "en" ? COPY.notebook.titleEn : COPY.notebook.titleEs;
  const toc = lang === "en" ? COPY.notebook.tocEn : COPY.notebook.tocEs;
  const paragraphs = lang === "en" ? COPY.notebook.bodyEn : COPY.notebook.bodyEs;

  const paragraphsHtml = paragraphs.map((p) => `<p>${p}</p>`).join("\n");

  const bylineByLabel = lang === "en" ? "By" : "Por";
  const bylineRole = lang === "en" ? "Agentic Designer" : "Diseñador Agéntico";
  const bylineDate = "2026-05-12";
  const avatarAlt = lang === "en"
    ? `Portrait of ${identity.name}`
    : `Retrato de ${identity.name}`;

  return `<section id="notebook" class="v11-section v11-section--paper" aria-labelledby="notebook-h">
  <div class="v11-container-narrow v11-notebook">
    <div class="v11-section__eyebrow">${escapeHtml(eyebrow)}</div>
    <h2 id="notebook-h" class="v11-h1">${escapeHtml(title)}</h2>
    <div class="v11-notebook__toc">${escapeHtml(toc)}</div>
    <figure class="v11-notebook__byline">
      <img class="v11-notebook__byline-photo" src="${escapeHtml(photoHref)}" alt="${escapeHtml(avatarAlt)}" width="52" height="52" loading="lazy" decoding="async">
      <figcaption class="v11-notebook__byline-meta">
        <span class="v11-notebook__byline-name">${escapeHtml(bylineByLabel)} <strong>${escapeHtml(identity.name)}</strong></span>
        <span class="v11-notebook__byline-sub">${escapeHtml(bylineRole)} · ${escapeHtml(bylineDate)}</span>
      </figcaption>
    </figure>
    <div class="v11-notebook__essay">
${paragraphsHtml}
    </div>
  </div>
</section>`;
}

/* ============== HORIZON TIMELINE ============== */

function renderHorizonChip(
  chip: HorizonChip,
  columnId: string,
  lang: Lang,
): string {
  const label = lang === "en" ? chip.label.en : chip.label.es;
  const labelSafe = escapeHtml(label);

  // Past column: span + aria-label contextualizing the strikethrough.
  if (columnId === "earned") {
    const ariaPrefix = lang === "en"
      ? "Earned, now commoditized:"
      : "Ganado, ahora commoditizado:";
    const aria = escapeHtml(`${ariaPrefix} ${label}`);
    return `<li><span class="v11-horizon__chip" aria-label="${aria}">${labelSafe}</span></li>`;
  }

  // Future column, bet chip: span + bet badge + aria-label "declared bet, no evidence yet".
  if (columnId === "horizon" && chip.kind === "bet") {
    const aria = lang === "en"
      ? escapeHtml(`${label}. Declared bet, no evidence yet.`)
      : escapeHtml(`${label}. Apuesta declarada, sin evidencia aún.`);
    const betLabel = lang === "en" ? "bet" : "apuesta";
    return `<li><span class="v11-horizon__chip" data-kind="bet" aria-label="${aria}">${labelSafe} <span class="v11-horizon__bet-badge">${escapeHtml(betLabel)}</span></span></li>`;
  }

  // All other cases: <a href>. Kind attribute only when defined.
  const href = chip.href ?? "#";
  const kindAttr = chip.kind ? ` data-kind="${escapeHtml(chip.kind)}"` : "";
  const isExternal = /^https?:\/\//.test(href);
  const extAttrs = isExternal ? ' target="_blank" rel="noopener"' : "";
  return `<li><a class="v11-horizon__chip"${kindAttr} href="${escapeHtml(href)}"${extAttrs}>${labelSafe}</a></li>`;
}

function renderHorizonColumn(col: HorizonColumn, lang: Lang): string {
  const stage = lang === "en" ? col.stage.en : col.stage.es;
  const heading = lang === "en" ? col.heading.en : col.heading.es;
  const body = lang === "en" ? col.body.en : col.body.es;
  const emphasisAttr = col.emphasis ? ' data-emphasis="true"' : "";
  const chips = col.chips.map((c) => renderHorizonChip(c, col.id, lang)).join("");
  return `<div class="v11-horizon__col" data-horizon-col="${escapeHtml(col.id)}"${emphasisAttr}>
    <div class="v11-horizon__stage">${escapeHtml(stage)}</div>
    <h3 class="v11-horizon__heading">${escapeHtml(heading)}</h3>
    <p class="v11-horizon__body">${escapeHtml(body)}</p>
    <ul class="v11-horizon__chips">${chips}</ul>
  </div>`;
}

function renderHorizonProgress(columns: HorizonColumn[], lang: Lang): string {
  const youAreHere = lang === "en" ? "You are here" : "Estás aquí";
  const segs = columns
    .map((col) => {
      const marker = col.emphasis
        ? `<span class="v11-horizon__marker">${escapeHtml(youAreHere)}</span>`
        : "";
      return `<div class="v11-horizon__seg v11-horizon__seg--${escapeHtml(col.id)}">${marker}</div>`;
    })
    .join("");
  return `<div class="v11-horizon__progress" aria-hidden="true">${segs}</div>`;
}

function renderHorizonTools(columns: HorizonColumn[]): string {
  const hasAnyTools = columns.some((c) => c.tools && c.tools.length > 0);
  if (!hasAnyTools) return "";
  const blocks = columns
    .map((col) => {
      const tools = col.tools ?? [];
      const parts: string[] = [];
      tools.forEach((t, idx) => {
        if (idx > 0) parts.push(`<span class="v11-horizon__arrow">→</span>`);
        parts.push(`<span class="v11-horizon__tool">${escapeHtml(t)}</span>`);
      });
      return `<div class="v11-horizon__tools-block" data-tools-for="${escapeHtml(col.id)}">${parts.join("")}</div>`;
    })
    .join("");
  return `<div class="v11-horizon__tools" aria-hidden="true">${blocks}</div>`;
}

function renderHorizon(horizon: HorizonSection, lang: Lang): string {
  const eyebrow = lang === "en" ? horizon.eyebrow.en : horizon.eyebrow.es;
  const title = lang === "en" ? horizon.sectionTitle.en : horizon.sectionTitle.es;
  const progress = renderHorizonProgress(horizon.columns, lang);
  const tools = renderHorizonTools(horizon.columns);
  const columns = horizon.columns.map((c) => renderHorizonColumn(c, lang)).join("\n");
  return `<section class="v11-horizon" aria-labelledby="horizon-h">
  <div class="v11-container">
    <div class="v11-horizon__eyebrow">${escapeHtml(eyebrow)}</div>
    <h2 id="horizon-h" class="v11-horizon__title">${escapeHtml(title)}</h2>
    ${progress}
    ${tools}
    <div class="v11-horizon__grid" role="list">
${columns}
    </div>
  </div>
</section>`;
}

/* ============== WORK ============== */

function renderCase(c: Case, lang: Lang): string {
  const title = lang === "en" ? c.titleEn : c.titleEs;
  const client = lang === "en" ? c.clientEn : c.clientEs;
  const hook = lang === "en" ? c.hookEn : c.hookEs;
  const dates = yearRange(c.yearStart, c.yearEnd, lang);
  const beats = beatsFor(c.slug);
  const labels = lang === "en" ? COPY.work.beatsEn : COPY.work.beatsEs;

  const beatsHtml = beats
    ? `
  <dl class="v11-case__beats">
    <div class="v11-case__beat"><dt>${escapeHtml(labels.context)}</dt><dd>${escapeHtml(beats.context[lang])}</dd></div>
    <div class="v11-case__beat"><dt>${escapeHtml(labels.problem)}</dt><dd>${escapeHtml(beats.problem[lang])}</dd></div>
    <div class="v11-case__beat"><dt>${escapeHtml(labels.approach)}</dt><dd>${escapeHtml(beats.approach[lang])}</dd></div>
    <div class="v11-case__beat"><dt>${escapeHtml(labels.ship)}</dt><dd>${escapeHtml(beats.ship[lang])}</dd></div>
    <div class="v11-case__beat"><dt>${escapeHtml(labels.outcome)}</dt><dd>${escapeHtml(beats.outcome[lang])}</dd></div>
    <div class="v11-case__beat"><dt>${escapeHtml(labels.differently)}</dt><dd>${escapeHtml(beats.differently[lang])}</dd></div>
    <div class="v11-case__beat"><dt>${escapeHtml(labels.craft)}</dt><dd>${escapeHtml(beats.craft[lang])}</dd></div>
  </dl>`
    : "";

  const chips = c.stack.map((s) => `<span class="v11-chip">${escapeHtml(s)}</span>`).join(" ");

  return `<article id="case-${escapeHtml(c.slug)}" class="v11-case" data-reveal>
  <div class="v11-case__head">
    <span class="v11-case__client">${escapeHtml(client)}</span>
    <span class="v11-case__dates">${escapeHtml(dates)}</span>
  </div>
  <h3 class="v11-case__title">${escapeHtml(title)}</h3>
  <p class="v11-case__hook">${escapeHtml(hook)}</p>
${beatsHtml}
  <div class="v11-case__stack">${chips}</div>
</article>`;
}

function renderWork(data: LandingData, lang: Lang): string {
  const eyebrow = lang === "en" ? COPY.work.eyebrowEn : COPY.work.eyebrowEs;
  const title = lang === "en" ? COPY.work.titleEn : COPY.work.titleEs;
  const lead = lang === "en" ? COPY.work.leadEn : COPY.work.leadEs;

  const order = ["enregla", "te-skin", "te-black", "life-update-mobile"];
  const sorted = [...data.cases].sort((a, b) => {
    const ia = order.indexOf(a.slug);
    const ib = order.indexOf(b.slug);
    if (ia !== -1 && ib !== -1) return ia - ib;
    if (ia !== -1) return -1;
    if (ib !== -1) return 1;
    return b.yearStart - a.yearStart;
  });

  const cases = sorted.map((c) => renderCase(c, lang)).join("\n");

  return `<section id="work" class="v11-section" aria-labelledby="work-h">
  <div class="v11-container">
    <div class="v11-section__eyebrow">${escapeHtml(eyebrow)}</div>
    <h2 id="work-h" class="v11-h1">${escapeHtml(title)}</h2>
    <p class="v11-lead">${escapeHtml(lead)}</p>
    <div class="v11-work">
${cases}
    </div>
  </div>
</section>`;
}

/* ============== METHOD ============== */

function renderTestimonial(t: Testimonial, lang: Lang): string {
  const quote = lang === "es" && t.quoteEs ? t.quoteEs : t.quote;
  const company = t.company ? ` · ${escapeHtml(t.company)}` : "";
  const badge = lang === "en" ? "Verified" : "Verificado";
  return `<figure class="v11-quote">
  <blockquote class="v11-quote__text">${escapeHtml(quote)}</blockquote>
  <figcaption class="v11-quote__attr">
    <span class="v11-quote__author">${escapeHtml(t.author)}</span>
    <span class="v11-quote__role">${escapeHtml(t.role)}${company}</span>
    <span class="v11-quote__badge">${escapeHtml(badge)}</span>
  </figcaption>
</figure>`;
}

function renderMethod(data: LandingData, lang: Lang): string {
  const eyebrow = lang === "en" ? COPY.method.eyebrowEn : COPY.method.eyebrowEs;
  const title = lang === "en" ? COPY.method.titleEn : COPY.method.titleEs;
  const lead = lang === "en" ? COPY.method.leadEn : COPY.method.leadEs;

  const planHeadEn = "Plan · approved · dr-cv-v11";
  const planHeadEs = "Plan · aprobado · dr-cv-v11";
  const planSteps = lang === "en"
    ? [
        { body: "Load CvData + Landing config", meta: "0:12", done: true },
        { body: "Render hero + artifact viewer", meta: "0:48", done: true },
        { body: "Render 4 Narrative Ship cases", meta: "1:20", done: true },
        { body: "Emit EN + ES with hreflang", meta: "0:22", done: false },
        { body: "Run a11y + perf smoke", meta: "0:18", done: false },
      ]
    : [
        { body: "Cargar CvData + Landing config", meta: "0:12", done: true },
        { body: "Renderizar hero + artifact viewer", meta: "0:48", done: true },
        { body: "Renderizar 4 cases Narrative Ship", meta: "1:20", done: true },
        { body: "Emitir EN + ES con hreflang", meta: "0:22", done: false },
        { body: "Correr smoke a11y + perf", meta: "0:18", done: false },
      ];

  const stepsHtml = planSteps.map((s) => {
    const cls = s.done ? " v11-plan__step--done" : "";
    return `<li class="v11-plan__step${cls}"><strong>${escapeHtml(s.body)}</strong> <span class="v11-plan__meta">${escapeHtml(s.meta)}</span></li>`;
  }).join("\n");

  const giraldez = data.testimonials.find((t) => t.author.includes("Giraldez")) ?? data.testimonials[0];

  return `<section id="method" class="v11-section v11-section--alt" aria-labelledby="method-h">
  <div class="v11-container">
    <div class="v11-section__eyebrow">${escapeHtml(eyebrow)}</div>
    <h2 id="method-h" class="v11-h1">${escapeHtml(title)}</h2>
    <p class="v11-lead">${escapeHtml(lead)}</p>

    <div class="v11-method">
      <div class="v11-plan" aria-label="plan before build specimen">
        <div class="v11-plan__head">${escapeHtml(lang === "en" ? planHeadEn : planHeadEs)}</div>
        <ol class="v11-plan__list">
${stepsHtml}
        </ol>
      </div>

      <div class="v11-diff" aria-label="diff review specimen">
        <div class="v11-diff__row v11-diff__row--del"><span class="v11-diff__ln">42</span><span>- &lt;h1&gt;Agentic Designer shipping real products&lt;/h1&gt;</span></div>
        <div class="v11-diff__row v11-diff__row--add"><span class="v11-diff__ln">42</span><span>+ &lt;h1&gt;A point of view on agentic design.&lt;/h1&gt;</span></div>
        <div class="v11-diff__row"><span class="v11-diff__ln">43</span><span>&nbsp;&nbsp;&lt;p&gt;I keep the craft…&lt;/p&gt;</span></div>
        <div class="v11-diff__row v11-diff__row--add"><span class="v11-diff__ln">44</span><span>+ &lt;div data-v11-skill="@te-skin"&gt;…&lt;/div&gt;</span></div>
      </div>
    </div>

    <div style="display:flex; gap:8px; flex-wrap:wrap; margin: 0 0 32px;">
      <span class="v11-chip"><span class="v11-chip__at">@</span>dr-cv-skill</span>
      <span class="v11-chip"><span class="v11-chip__at">@</span>te-skin</span>
      <span class="v11-chip v11-chip--cool"><span class="v11-chip__at">/</span>ds-review</span>
      <span class="v11-chip v11-chip--cool"><span class="v11-chip__at">/</span>case-compose</span>
      <span class="v11-chip v11-chip--muted"><span class="v11-chip__at">@</span>mcp:supabase</span>
      <span class="v11-chip v11-chip--muted"><span class="v11-chip__at">@</span>mcp:github</span>
    </div>

    ${giraldez ? renderTestimonial(giraldez, lang) : ""}
  </div>
</section>`;
}

/* ============== CONTACT ============== */

function renderContact(data: LandingData, lang: Lang): string {
  const eyebrow = lang === "en" ? COPY.contact.eyebrowEn : COPY.contact.eyebrowEs;
  const title = lang === "en" ? COPY.contact.titleEn : COPY.contact.titleEs;
  const lead = lang === "en" ? COPY.contact.leadEn : COPY.contact.leadEs;
  const cta = lang === "en" ? COPY.contact.ctaEn : COPY.contact.ctaEs;
  const copyLabel = lang === "en" ? COPY.contact.copyLabelEn : COPY.contact.copyLabelEs;
  const copiedLabel = lang === "en" ? COPY.contact.copiedLabelEn : COPY.contact.copiedLabelEs;

  const c = data.identity.contact;
  const socials: Array<[string, string | undefined]> = [
    ["LinkedIn", c.linkedin],
    ["GitHub", c.github],
    ["Behance", c.behance],
  ];
  const socialHtml = socials
    .filter((s): s is [string, string] => typeof s[1] === "string")
    .map(([label, handle]) => {
      const href = handle.startsWith("http") ? handle : `https://${handle}`;
      return `<a class="v11-contact__social" href="${escapeHtml(href)}" rel="noopener" target="_blank">
      <span class="v11-contact__social-label">${escapeHtml(label)}</span>
      <span class="v11-contact__social-handle">${escapeHtml(handle)}</span>
    </a>`;
    })
    .join("\n    ");

  const sheppard = data.testimonials.find((t) => t.author.includes("Sheppard")) ?? data.testimonials[0];

  return `<section id="contact" class="v11-section v11-section--alt" aria-labelledby="contact-h">
  <div class="v11-container">
    <div class="v11-section__eyebrow">${escapeHtml(eyebrow)}</div>
    <h2 id="contact-h" class="v11-h1">${escapeHtml(title)}</h2>
    <p class="v11-lead">${escapeHtml(lead)}</p>

    <div class="v11-contact">
      <div class="v11-contact__headline">
        <span class="v11-live" aria-hidden="true"></span>
        <span>${escapeHtml(data.identity.availability)}</span>
      </div>
      <a class="v11-btn v11-btn--primary" href="mailto:${escapeHtml(c.email)}" style="align-self:flex-start">
        ${escapeHtml(cta)}
        <span class="v11-btn__arrow" aria-hidden="true">→</span>
      </a>
      <div class="v11-contact__email-row">
        <span class="v11-contact__email">${escapeHtml(c.email)}</span>
        <button type="button"
          class="v11-contact__copy"
          data-action="copy-email"
          data-email="${escapeHtml(c.email)}"
          data-copy-label="${escapeHtml(copyLabel)}"
          data-copied-label="${escapeHtml(copiedLabel)}"
        >${escapeHtml(copyLabel)}</button>
      </div>
      <div class="v11-contact__socials">
    ${socialHtml}
      </div>
    </div>

    ${sheppard ? `<div style="margin-top:48px">${renderTestimonial(sheppard, lang)}</div>` : ""}
  </div>
</section>`;
}

/* ============== FOOTER ============== */

function renderFooter(identity: Identity, lang: Lang): string {
  const text = lang === "en"
    ? `Built by ${identity.name} · source on ${identity.contact.github ?? "GitHub"} · updated 2026-05-08`
    : `Hecho por ${identity.name} · código en ${identity.contact.github ?? "GitHub"} · actualizado 2026-05-08`;
  const dsLabel = lang === "en" ? "Design System V11" : "Sistema de Diseño V11";
  return `<footer class="v11-footer">
  <div class="v11-footer__inner">
    <span>${escapeHtml(text)}</span>
    <div style="display:flex; gap:16px; flex-wrap:wrap;">
      <a href="https://github.com/mdanilorojas/dr-cv">${escapeHtml(identity.contact.github ?? "github")}</a>
      <a href="mailto:${escapeHtml(identity.contact.email)}">${escapeHtml(identity.contact.email)}</a>
      <span>${escapeHtml(dsLabel)}</span>
    </div>
  </div>
</footer>`;
}

/* ============== ROOT ============== */

export interface V11LandingAssets {
  /** Relative href from the rendered HTML file to the portrait photo. */
  photoHref: string;
  /** Absolute URL to the Open Graph image (must be absolute for og:image). */
  ogImageUrl: string;
}

export function renderV11Landing(
  data: LandingData,
  lang: Lang,
  tokensCss: string,
  assets: V11LandingAssets,
): string {
  const seoTitle = lang === "en"
    ? "Danilo Rojas — Agentic Designer · Product Engineer"
    : "Danilo Rojas — Diseñador Agéntico · Product Engineer";
  const seoDesc = lang === "en"
    ? "A point of view on agentic design, not a résumé. Fifteen years shipping product; the last year rebuilt around agents. Available for Staff / Principal AI Product Designer roles."
    : "Un punto de vista sobre diseño agéntico, no un currículum. Quince años entregando producto; el último año reconstruido alrededor de agentes. Abierto a roles Staff / Principal AI Product Designer.";
  const altLang = lang === "en" ? "es" : "en";
  const altHref = lang === "en" ? "/es/" : "/";
  const selfHref = lang === "en" ? "/" : "/es/";
  const skipLabel = lang === "en" ? "Skip to content" : "Saltar al contenido";
  const ogAlt = lang === "en"
    ? `Danilo Rojas — Agentic Designer`
    : `Danilo Rojas — Diseñador Agéntico`;

  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(seoTitle)}</title>
<meta name="description" content="${escapeHtml(seoDesc)}">
<meta property="og:title" content="${escapeHtml(seoTitle)}">
<meta property="og:description" content="${escapeHtml(seoDesc)}">
<meta property="og:type" content="website">
<meta property="og:url" content="https://danilorojas.design${selfHref}">
<meta property="og:image" content="${escapeHtml(assets.ogImageUrl)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${escapeHtml(ogAlt)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeHtml(seoTitle)}">
<meta name="twitter:description" content="${escapeHtml(seoDesc)}">
<meta name="twitter:image" content="${escapeHtml(assets.ogImageUrl)}">
<link rel="canonical" href="https://danilorojas.design${selfHref}">
<link rel="alternate" hreflang="${lang}" href="https://danilorojas.design${selfHref}">
<link rel="alternate" hreflang="${altLang}" href="https://danilorojas.design${altHref}">
<link rel="alternate" hreflang="x-default" href="https://danilorojas.design/">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&display=swap">
<style>
${tokensCss}
${V11_STYLES}
</style>
</head>
<body>
<a class="v11-skip" href="#main">${escapeHtml(skipLabel)}</a>
${renderNav(data.identity, lang)}
<main id="main">
${renderHero(data.identity, data.positioning, lang, assets.photoHref)}
${renderProof(data.positioning, lang)}
${renderHorizon(data.horizon, lang)}
${renderNotebook(data.identity, lang, assets.photoHref)}
${renderWork(data, lang)}
${renderMethod(data, lang)}
${renderContact(data, lang)}
</main>
${renderFooter(data.identity, lang)}
<script>${V11_SCRIPT}</script>
</body>
</html>`;
}
