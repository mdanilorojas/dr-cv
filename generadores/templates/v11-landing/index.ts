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
import { renderPipAnimation, pipAnimationCss } from "./animations/picture-in-picture.js";
import {
  renderIframeAnimation,
  hasIframeAnimation,
  iframeAnimationCss,
  iframeAnimationScript,
} from "./animations/iframe-animation.js";

/* ============== Narrative Ship case-study beats ==============
 * Hand-authored beats per case in the Narrative Ship format
 * (Context, Problem, Approach, Ship, Outcome, Differently, Craft).
 * Keyed by case slug. These live here because they are copy,
 * not data â€” V11 R4 + R8 demand verbatim attribution.
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
      es: "Compliance para PYMES LATAM. Los reportes multi-sede se hacÃ­an en hojas de cÃ¡lculo, a mano, cada mes. Nadie era dueÃ±o del modelo de datos.",
    },
    problem: {
      en: "Existing tools priced out SMBs or required a sysadmin to deploy. Nothing shipped as a 40-day 0â†’1.0.",
      es: "Las herramientas existentes eran caras para PYMES o requerÃ­an un sysadmin para desplegarse. Nada shippeaba como un 40-day 0â†’1.0.",
    },
    approach: {
      en: "Built the SaaS as a co-author exercise with Claude Code. Supabase MCP server in the loop for SQL + migrations. Parallel subagents on UI, data model, edge functions.",
      es: "ConstruÃ­ el SaaS como ejercicio de co-autorÃ­a con Claude Code. Supabase MCP en el loop para SQL + migraciones. Subagentes en paralelo en UI, modelo de datos, edge functions.",
    },
    ship: {
      en: "346 commits in 40 days. 21 SQL migrations, 31 UI components, 1 edge function with cron. Live with paying pilots.",
      es: "346 commits en 40 dÃ­as. 21 migraciones SQL, 31 componentes UI, 1 edge function con cron. En producciÃ³n con pilotos pagados.",
    },
    outcome: {
      en: "DS migration ran 5 recursive rounds scoring 78.4 â†’ 95.6. First pilots reporting monthly compliance in minutes instead of days.",
      es: "La migraciÃ³n DS corriÃ³ 5 rondas recursivas, puntuando 78.4 â†’ 95.6. Los primeros pilotos reportan compliance mensual en minutos en lugar de dÃ­as.",
    },
    differently: {
      en: "Next time I write the MCP servers before the schema. The agent kept proposing columns it couldn't write back â€” half the recursion was plumbing.",
      es: "La prÃ³xima vez escribo los MCP servers antes del schema. El agente seguÃ­a proponiendo columnas que no podÃ­a escribir â€” la mitad de la recursiÃ³n fue plomerÃ­a.",
    },
    craft: {
      en: "RLS on every table. Type-safe Supabase client. Dark-mode primary with per-token WCAG trail. 0 hand-edited SQL in prod.",
      es: "RLS en cada tabla. Cliente Supabase type-safe. Dark-mode primario con trazabilidad WCAG por token. 0 SQL hand-edited en prod.",
    },
  },
  "developer-portal": {
    context: {
      en: "Booz Allen Hamilton Â· Developer Portal â€” a government-facing platform where two design systems run side by side: /te-skin (the component library) and TE Black (the dark-first palette). Design review was a two-week bottleneck on every ticket and existing components washed out under 12-hour mission lighting.",
      es: "Booz Allen Hamilton Â· Developer Portal â€” plataforma government-facing donde dos design systems corren en paralelo: /te-skin (la librerÃ­a de componentes) y TE Black (la paleta dark-first). La revisiÃ³n de diseÃ±o era un cuello de botella de dos semanas y los componentes existentes se lavaban bajo iluminaciÃ³n de misiÃ³n de 12 horas.",
    },
    problem: {
      en: "Designers reviewed the same WCAG + token mismatches on every PR. The DS existed as Figma â€” the agents couldn't reach it. And dark mode was treated as a theme even though operators on the platform lived in it.",
      es: "Los diseÃ±adores revisaban los mismos desajustes WCAG + tokens en cada PR. El DS existÃ­a en Figma â€” los agentes no lo alcanzaban. Y dark era tratado como un tema, pese a que los operadores de la plataforma vivÃ­an ahÃ­.",
    },
    approach: {
      en: "Packaged the DS as a Claude Code slash-command skill (/te-skin). Tokens + decision trees + 17 recursive review rules invokable inline. In parallel, authored TE Black: dark-primary palette with the per-token WCAG audit written into the definition itself, not a downstream lint.",
      es: "EmpaquetÃ© el DS como slash-command skill para Claude Code (/te-skin). Tokens + Ã¡rboles de decisiÃ³n + 17 reglas recursivas invocables inline. En paralelo, autorÃ© TE Black: paleta dark-primaria con auditorÃ­a WCAG por token escrita en la definiciÃ³n, no en un lint downstream.",
    },
    ship: {
      en: "Shipped in four weeks. Two-agent workflow: one proposes UI, one runs recursive review. Five rounds raised the score 78.4 â†’ 95.6. Tokens expose wcag.normal and wcag.large ratios for every ink-on-surface pair; component library migrated in the same PR as the tokens.",
      es: "Shippeado en cuatro semanas. Workflow de dos agentes: uno propone UI, otro corre revisiÃ³n recursiva. Cinco rondas subieron el score 78.4 â†’ 95.6. Los tokens exponen ratios wcag.normal y wcag.large para cada par ink-on-surface; librerÃ­a migrada en la misma PR que los tokens.",
    },
    outcome: {
      en: "Design review cycles dropped from 2 weeks â†’ 36 hours. Every contrast pair provably â‰¥ 4.5:1, and operators stopped reporting dim text in weekly retros. Jennifer Sheppard, Product Lead, called it \\\"work I wanted to keep reusing.\\\"",
      es: "Los ciclos de revisiÃ³n cayeron de 2 semanas â†’ 36 horas. Cada par de contraste probadamente â‰¥ 4.5:1, y los operadores dejaron de reportar texto apagado en los retros semanales. Jennifer Sheppard, Product Lead, lo llamÃ³ \\\"work I wanted to keep reusing.\\\"",
    },
    differently: {
      en: "I would ship a public skill scaffold first and publish the audit trail as a CI gate. The client-specific tokens should have been a layer, not the base; and a failed WCAG ratio should fail the build, not rely on convention.",
      es: "ShippearÃ­a primero un scaffold pÃºblico del skill y publicarÃ­a la trazabilidad como gate de CI. Los tokens especÃ­ficos del cliente debieron ser una capa, no la base; y una ratio WCAG fallada deberÃ­a romper el build, no confiar en la convenciÃ³n.",
    },
    craft: {
      en: "WCAG audit trail stored per token. Dark-mode primary. Tokens in CSS + JSON + Figma library in sync. Skill idempotent under re-invocation. APCA-adjacent luminance verified. No manual edits in the generated output.",
      es: "Trazabilidad WCAG guardada por token. Dark-mode primario. Tokens en CSS + JSON + librerÃ­a Figma sincronizados. Skill idempotente bajo re-invocaciÃ³n. Luminancia APCA-adjacent verificada. Sin edits manuales en el output generado.",
    },
  },
  "life-update-mobile": {
    context: {
      en: "A personal product â€” a tracking app that uses Gemini at runtime to summarize what I wrote this week.",
      es: "Un producto personal â€” una app de tracking que usa Gemini en runtime para resumir lo que escribÃ­ esta semana.",
    },
    problem: {
      en: "Every journal-AI app I'd tried either stored my text on someone else's server or refused to run without internet. I wanted local-first + LLM on demand.",
      es: "Cada app de journal-AI que habÃ­a probado o guardaba mi texto en el servidor de otro o se negaba a correr sin internet. QuerÃ­a local-first + LLM on demand.",
    },
    approach: {
      en: "Local SQLite store, plain-text journal. Summarization is opt-in: tap a week, send it to Gemini, cache the result.",
      es: "Almacenamiento SQLite local, journal en texto plano. La resumciÃ³n es opt-in: tocas una semana, se envÃ­a a Gemini, se cachea el resultado.",
    },
    ship: {
      en: "Single binary build. No auth server. Gemini API key ships with the user, not the app.",
      es: "Build de un solo binario. Sin servidor de auth. La API key de Gemini la tiene el usuario, no la app.",
    },
    outcome: {
      en: "Shipped private for my own use. Three friends asked to install it. Weekly summaries in 4 seconds.",
      es: "Shippeado privado para uso propio. Tres amigos pidieron instalarlo. ResÃºmenes semanales en 4 segundos.",
    },
    differently: {
      en: "I would put the prompt on the Settings page. Right now it's hidden â€” advanced users want to see it and I was being overly protective.",
      es: "PondrÃ­a el prompt en la pÃ¡gina de Settings. Ahora estÃ¡ oculto â€” los usuarios avanzados quieren verlo y yo estaba siendo sobreprotector.",
    },
    craft: {
      en: "No analytics. No telemetry. No account. Bundle under 8 MB. Works airplane-mode except the summary action.",
      es: "Sin analytics. Sin telemetrÃ­a. Sin cuenta. Bundle bajo 8 MB. Funciona en modo aviÃ³n excepto la acciÃ³n de resumen.",
    },
  },
};

export function beatsFor(slug: string): CaseBeats | null {
  return CASE_BEATS[slug] ?? null;
}
export { COPY as V11_COPY };
export { renderNav, renderContact, renderFooter };
export type { NavOpts };

/* ============== helpers ============== */

function splitName(name: string): { first: string; last: string } {
  const parts = name.trim().split(/\s+/);
  return { first: parts.slice(0, -1).join(" "), last: parts.slice(-1)[0] ?? "" };
}

function yearRange(startYear: number, endYear: number | "present", lang: Lang): string {
  if (endYear === "present") return `${startYear} â€” ${lang === "en" ? "Present" : "presente"}`;
  if (startYear === endYear) return String(startYear);
  return `${startYear} â€” ${endYear}`;
}

/* ============== copy (V11 R5 draft C â€” taste-first critic) ============== */

const COPY = {
  // Hero
  hero: {
    eyebrowEn: "Currently Â· Booz Allen Hamilton Â· Trusted Environments",
    eyebrowEs: "Actualmente Â· Booz Allen Hamilton Â· Trusted Environments",
    titleEn: "A point of view on agentic design,",
    titleEs: "Un punto de vista sobre diseÃ±o agÃ©ntico,",
    titleEmEn: "not a rÃ©sumÃ©.",
    titleEmEs: "no un currÃ­culum.",
    subEn: "Fifteen years shipping product. The last twelve months rebuilt around a Claude Code workflow I use every day. I keep the craft â€” agents give me the leverage.",
    subEs: "Quince aÃ±os entregando producto. Los Ãºltimos doce meses reconstruidos alrededor de un workflow Claude Code que uso cada dÃ­a. Yo pongo el craft â€” los agentes dan el apalancamiento.",
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
    eyebrowEn: "Notebook Â· essay",
    eyebrowEs: "Notebook Â· ensayo",
    titleEn: "Trust is the unit of economy.",
    titleEs: "La confianza es la unidad econÃ³mica.",
    tocEn: "1 Â· The diff is the contract  /  2 Â· Skills, not prompts  /  3 Â· What I still won't let the agent do",
    tocEs: "1 Â· El diff es el contrato  /  2 Â· Skills, no prompts  /  3 Â· Lo que todavÃ­a no le dejo al agente",
    bodyEn: [
      "The hardest thing about agentic design isn't the prompt engineering. It's deciding, at every junction, whether the human reviews the diff or the agent just ships it. <em>Trust is the unit of economy.</em> Every tool I build for myself starts by answering one question: what do I get to keep looking at?",
      "The teams shipping real agentic work in 2026 aren't the ones with the cleverest prompts. They're the ones that put the diff at the center. Claude Code is the prototype: every mutation proposed, reviewable, rejectable. The UX work is hiding the machinery when the trust is earned â€” not pretending the machinery isn't there.",
      "I didn't start my career building for agents. I spent fifteen years shipping product for humans. The combination is the work now â€” profile plus agents â€” and it's not a productivity story. It's a <em>taste</em> story. The agent will propose a hundred things; picking the six that should ship is the skill.",
    ],
    bodyEs: [
      "Lo mÃ¡s difÃ­cil del diseÃ±o agÃ©ntico no es la ingenierÃ­a de prompts. Es decidir, en cada uniÃ³n, si el humano revisa el diff o el agente simplemente lo shipea. <em>La confianza es la unidad econÃ³mica.</em> Cada herramienta que construyo para mÃ­ empieza respondiendo una pregunta: Â¿quÃ© me toca seguir mirando?",
      "Los equipos que estÃ¡n shipeando trabajo agÃ©ntico real en 2026 no son los que tienen los prompts mÃ¡s ingeniosos. Son los que ponen el diff al centro. Claude Code es el prototipo: toda mutaciÃ³n propuesta, revisable, rechazable. El trabajo de UX es esconder la generadores cuando la confianza se ganÃ³ â€” no pretender que la generadores no estÃ¡ ahÃ­.",
      "No empecÃ© mi carrera construyendo para agentes. PasÃ© quince aÃ±os entregando producto para humanos. La combinaciÃ³n es el trabajo ahora â€” perfil mÃ¡s agentes â€” y no es una historia de productividad. Es una historia de <em>gusto</em>. El agente propondrÃ¡ cien cosas; elegir las seis que deben shipearse es la skill.",
    ],
  },
  work: {
    eyebrowEn: "Selected work Â· 2025â€“2026",
    eyebrowEs: "Trabajo seleccionado Â· 2025â€“2026",
    titleEn: "Three ships. Three agent-built artifacts.",
    titleEs: "Tres ships. Tres artefactos construidos con agentes.",
    leadEn: "Everything below was built with agents at the center of the workflow. The craft floor is mine â€” the leverage is the combination.",
    leadEs: "Todo lo de abajo fue construido con agentes al centro del workflow. El craft floor es mÃ­o â€” el apalancamiento es la combinaciÃ³n.",
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
      approach: "AproximaciÃ³n",
      ship: "Ship",
      outcome: "Resultado",
      differently: "Lo cambiarÃ­a",
      craft: "Craft floor",
    },
    caseCtaEn: "How this shipped",
    caseCtaEs: "CÃ³mo se shippeÃ³",
    caseBackEn: "Back to work",
    caseBackEs: "Volver al trabajo",
    caseNextEn: "Next case",
    caseNextEs: "Siguiente caso",
  },
  method: {
    eyebrowEn: "Method",
    eyebrowEs: "MÃ©todo",
    titleEn: "Profile plus agents. Diff as the contract.",
    titleEs: "Perfil mÃ¡s agentes. El diff como contrato.",
    leadEn: "I plan before I build. I review every diff. I package skills, not prompts. The agent proposes; I decide.",
    leadEs: "Planifico antes de construir. Reviso cada diff. Empaqueto skills, no prompts. El agente propone; yo decido.",
  },
  contact: {
    eyebrowEn: "Contact",
    eyebrowEs: "Contacto",
    titleEn: "Let's talk.",
    titleEs: "Hablemos.",
    leadEn: "Direct email is the fastest path. I reply within one business day. Open to Staff / Principal AI Product Designer roles.",
    leadEs: "Email directo es el camino mÃ¡s rÃ¡pido. Respondo en un dÃ­a hÃ¡bil. Abierto a roles Staff / Principal AI Product Designer.",
    copyLabelEn: "Copy email",
    copyLabelEs: "Copiar email",
    copiedLabelEn: "Copied",
    copiedLabelEs: "Copiado",
    ctaEn: "Reach out",
    ctaEs: "Escribirme",
  },
};

/* ============== NAV ============== */

interface NavOpts {
  /** Prefix to turn section anchors into links back to the landing.
   *  Empty string on the landing itself; "../../" on a case-detail page. */
  homeHref: string;
  /** Override for the lang-toggle href when the current page has a direct twin. */
  langHrefOverride?: string;
}
function renderNav(identity: Identity, lang: Lang, opts: NavOpts): string {
  const workLabel = lang === "en" ? "Work" : "Trabajo";
  const notebookLabel = lang === "en" ? "Notebook" : "Notebook";
  const methodLabel = lang === "en" ? "Method" : "MÃ©todo";
  const contactLabel = lang === "en" ? "Contact" : "Contacto";
  const defaultLangHref = lang === "en" ? "/es/" : "/";
  const langHref = opts.langHrefOverride ?? defaultLangHref;
  const langCode = lang === "en" ? "EN / ES" : "ES / EN";
  const langAria = lang === "en" ? "View in Spanish" : "View in English";
  const navAria = lang === "en" ? "Main navigation" : "NavegaciÃ³n principal";
  const brandHref = opts.homeHref === "" ? "#top" : opts.homeHref;

  return `<nav class="v11-nav" aria-label="${escapeHtml(navAria)}">
  <div class="v11-nav__inner">
    <a href="${escapeHtml(brandHref)}" class="v11-nav__brand">${escapeHtml(identity.name)}<span class="v11-nav__brand-sep">Â·</span>dr</a>
    <div class="v11-nav__tabs">
      <a class="v11-nav__link" href="${escapeHtml(opts.homeHref)}#notebook">${escapeHtml(notebookLabel)}</a>
      <a class="v11-nav__link" href="${escapeHtml(opts.homeHref)}#work">${escapeHtml(workLabel)}</a>
      <a class="v11-nav__link" href="${escapeHtml(opts.homeHref)}#method">${escapeHtml(methodLabel)}</a>
      <a class="v11-nav__link" href="${escapeHtml(opts.homeHref)}#contact">${escapeHtml(contactLabel)}</a>
    </div>
    <a class="v11-nav__lang" href="${escapeHtml(langHref)}" hreflang="${lang === "en" ? "es" : "en"}" aria-label="${escapeHtml(langAria)}">${escapeHtml(langCode)}</a>
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
  const roleCanonical = "Agentic Designer Â· Product Engineer";
  const artifactMeta = lang === "en" ? "generated 08 May 2026" : "generado 08 May 2026";

  const shortThesis = lang === "en"
    ? "15 years shipping. Booz Allen Hamilton (current). EnRegla (own SaaS). Claude Code power-user. 346 commits Â· 40 days."
    : "15 aÃ±os entregando. Booz Allen Hamilton (actual). EnRegla (SaaS propio). Claude Code power-user. 346 commits Â· 40 dÃ­as.";

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
            <span class="v11-btn__arrow" aria-hidden="true">â†’</span>
          </a>
          <a class="v11-btn v11-btn--ghost" href="#work">
            ${escapeHtml(ctaGhost)}
            <span class="v11-btn__arrow" aria-hidden="true">â†’</span>
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
            <span>Â· ${escapeHtml(artifactMeta)}</span>
            <span class="v11-artifact__status">${escapeHtml(artifactStatus)}</span>
          </div>
          <div class="v11-artifact__body">
            <div class="v11-artifact-paper">
              <div class="v11-artifact-paper__kicker">// ${escapeHtml(roleCanonical)}</div>
              <div class="v11-artifact-paper__name">${escapeHtml(first)} <span>${escapeHtml(last)}</span></div>
              <div class="v11-artifact-paper__meta">${escapeHtml(identity.location)} Â· ${escapeHtml(identity.languages)}</div>
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

  // Proof items â€” value Â· label Â· attribution (V11 R8 #6)
  const items = [
    {
      num: "15<em>+</em>",
      labelEn: "Years shipping product",
      labelEs: "AÃ±os shippeando producto",
      attrEn: "2010â€“present Â· LATAM + US enterprise",
      attrEs: "2010â€“actualidad Â· LATAM + US enterprise",
    },
    {
      num: "346",
      labelEn: "Commits Â· last 40 days",
      labelEs: "Commits Â· 40 Ãºltimos dÃ­as",
      attrEn: "github.com/mdanilorojas Â· EnRegla",
      attrEs: "github.com/mdanilorojas Â· EnRegla",
    },
    {
      num: "1<em>.0</em>",
      labelEn: "SaaS live Â· paying pilots",
      labelEs: "SaaS en producciÃ³n Â· pilotos pagados",
      attrEn: "EnRegla Â· 0â†’1.0 in 40 days with agents",
      attrEs: "EnRegla Â· 0â†’1.0 en 40 dÃ­as con agentes",
    },
    {
      num: "95<em>.6</em>",
      labelEn: "DS migration score",
      labelEs: "Score migraciÃ³n DS",
      attrEn: "17 parts Ã— 5 rounds Â· 78.4â†’95.6 Â· TE Skin",
      attrEs: "17 partes Ã— 5 rondas Â· 78.4â†’95.6 Â· TE Skin",
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
  const bylineRole = lang === "en" ? "Agentic Designer" : "DiseÃ±ador AgÃ©ntico";
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
        <span class="v11-notebook__byline-sub">${escapeHtml(bylineRole)} Â· ${escapeHtml(bylineDate)}</span>
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
      : escapeHtml(`${label}. Apuesta declarada, sin evidencia aÃºn.`);
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
  const youAreHere = lang === "en" ? "You are here" : "EstÃ¡s aquÃ­";
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
        if (idx > 0) parts.push(`<span class="v11-horizon__arrow">â†’</span>`);
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

export function sortedCases(cases: Case[]): Case[] {
  const order = ["enregla", "developer-portal", "life-update-mobile"];
  return [...cases].sort((a, b) => {
    const ia = order.indexOf(a.slug);
    const ib = order.indexOf(b.slug);
    if (ia !== -1 && ib !== -1) return ia - ib;
    if (ia !== -1) return -1;
    if (ib !== -1) return 1;
    return b.yearStart - a.yearStart;
  });
}

function renderCaseAnimation(c: Case, lang: Lang, basePath: string): string {
  // Prefer the new iframe-based gallery animations when the slug is mapped.
  if (hasIframeAnimation(c.slug)) {
    return renderIframeAnimation({ slug: c.slug, lang, basePath });
  }
  // Legacy fallback: inline PIP animation driven by the data's `animation` field.
  if (c.animation) {
    return renderPipAnimation({
      slug: c.slug,
      stillBase: `${basePath}assets/animations/${c.animation}`,
    });
  }
  return "";
}

function renderCase(c: Case, lang: Lang, basePath: string): string {
  const title = lang === "en" ? c.titleEn : c.titleEs;
  const client = lang === "en" ? c.clientEn : c.clientEs;
  const hook = lang === "en" ? c.hookEn : c.hookEs;
  const dates = yearRange(c.yearStart, c.yearEnd, lang);
  const bullets = lang === "en" ? c.bulletsEn : c.bulletsEs;
  const cta = lang === "en" ? COPY.work.caseCtaEn : COPY.work.caseCtaEs;

  // Labels for the editorial sidebar (V3 Â· Magazine)
  const labelClient = lang === "en" ? "Client" : "Cliente";
  const labelYears = lang === "en" ? "Years" : "AÃ±os";
  const labelStack = lang === "en" ? "Stack" : "Stack";

  const stackChips = c.stack
    .map((s) => `<span class="v11-case__chip">${escapeHtml(s)}</span>`)
    .join("");

  const bulletsHtml = bullets.length > 0
    ? `<ul class="v11-case__bullets">${bullets
        .slice(0, 3)
        .map((b) => `<li>${escapeHtml(b)}</li>`)
        .join("")}</ul>`
    : "";

  const animationHtml = renderCaseAnimation(c, lang, basePath);
  const hasAnim = animationHtml !== "";
  const articleClass = hasAnim ? "v11-case v11-case--has-anim" : "v11-case";

  const detailHref = `${basePath}work/${encodeURIComponent(c.slug)}/`;

  // Editorial sidebar â€” client / years / stack (vertical chips).
  const metaCol = `<aside class="v11-case__meta-col">
  <div class="v11-case__meta-block">
    <div class="v11-case__meta-label">${escapeHtml(labelClient)}</div>
    <div class="v11-case__meta-value v11-case__meta-value--accent">${escapeHtml(client)}</div>
  </div>
  <div class="v11-case__meta-block">
    <div class="v11-case__meta-label">${escapeHtml(labelYears)}</div>
    <div class="v11-case__meta-value">${escapeHtml(dates)}</div>
  </div>
  <div class="v11-case__meta-block">
    <div class="v11-case__meta-label">${escapeHtml(labelStack)}</div>
    <div class="v11-case__meta-chips">${stackChips}</div>
  </div>
</aside>`;

  // Text column (title + hook + bullets + CTA).
  const textCol = `<div class="v11-case__text">
  <h3 class="v11-case__title">${escapeHtml(title)}</h3>
  <p class="v11-case__hook">${escapeHtml(hook)}</p>
  ${bulletsHtml}
  <a class="v11-case__cta" href="${escapeHtml(detailHref)}">${escapeHtml(cta)}<span class="v11-case__cta-arrow" aria-hidden="true">â†’</span></a>
</div>`;

  // Inner content grid: text left, animation right (or full-width text if no anim).
  const contentInner = hasAnim
    ? `<div class="v11-case__content">
  ${textCol}
  <aside class="v11-case__anim">${animationHtml}</aside>
</div>`
    : `<div class="v11-case__content v11-case__content--solo">${textCol}</div>`;

  return `<article id="case-${escapeHtml(c.slug)}" class="${articleClass}" data-reveal>
${metaCol}
${contentInner}
</article>`;
}

function renderWork(data: LandingData, lang: Lang, basePath: string): string {
  const eyebrow = lang === "en" ? COPY.work.eyebrowEn : COPY.work.eyebrowEs;
  const title = lang === "en" ? COPY.work.titleEn : COPY.work.titleEs;
  const lead = lang === "en" ? COPY.work.leadEn : COPY.work.leadEs;

  const sorted = sortedCases(data.cases);
  const cases = sorted.map((c) => renderCase(c, lang, basePath)).join("\n");

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
  const company = t.company ? ` Â· ${escapeHtml(t.company)}` : "";
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

  const planHeadEn = "Plan Â· approved Â· dr-cv-v11";
  const planHeadEs = "Plan Â· aprobado Â· dr-cv-v11";
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
        <div class="v11-diff__row"><span class="v11-diff__ln">43</span><span>&nbsp;&nbsp;&lt;p&gt;I keep the craftâ€¦&lt;/p&gt;</span></div>
        <div class="v11-diff__row v11-diff__row--add"><span class="v11-diff__ln">44</span><span>+ &lt;div data-v11-skill="@te-skin"&gt;â€¦&lt;/div&gt;</span></div>
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
        <span class="v11-btn__arrow" aria-hidden="true">â†’</span>
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
    ? `Built by ${identity.name} Â· source on ${identity.contact.github ?? "GitHub"} Â· updated 2026-05-08`
    : `Hecho por ${identity.name} Â· cÃ³digo en ${identity.contact.github ?? "GitHub"} Â· actualizado 2026-05-08`;
  const dsLabel = lang === "en" ? "Design System V11" : "Sistema de DiseÃ±o V11";
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
    ? "Danilo Rojas â€” Agentic Designer Â· Product Engineer"
    : "Danilo Rojas â€” DiseÃ±ador AgÃ©ntico Â· Product Engineer";
  const seoDesc = lang === "en"
    ? "A point of view on agentic design, not a rÃ©sumÃ©. Fifteen years shipping product; the last year rebuilt around agents. Available for Staff / Principal AI Product Designer roles."
    : "Un punto de vista sobre diseÃ±o agÃ©ntico, no un currÃ­culum. Quince aÃ±os entregando producto; el Ãºltimo aÃ±o reconstruido alrededor de agentes. Abierto a roles Staff / Principal AI Product Designer.";
  const altLang = lang === "en" ? "es" : "en";
  const altHref = lang === "en" ? "/es/" : "/";
  const selfHref = lang === "en" ? "/" : "/es/";
  const skipLabel = lang === "en" ? "Skip to content" : "Saltar al contenido";
  const ogAlt = lang === "en"
    ? `Danilo Rojas â€” Agentic Designer`
    : `Danilo Rojas â€” DiseÃ±ador AgÃ©ntico`;

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
<style>
${tokensCss}
${V11_STYLES}
${pipAnimationCss}
${iframeAnimationCss}
</style>
</head>
<body>
<a class="v11-skip" href="#main">${escapeHtml(skipLabel)}</a>
${renderNav(data.identity, lang, { homeHref: "" })}
<main id="main">
${renderHero(data.identity, data.positioning, lang, assets.photoHref)}
${renderProof(data.positioning, lang)}
${renderHorizon(data.horizon, lang)}
${renderNotebook(data.identity, lang, assets.photoHref)}
${renderWork(data, lang, "")}
${renderMethod(data, lang)}
${renderContact(data, lang)}
</main>
${renderFooter(data.identity, lang)}
<script>${V11_SCRIPT}</script>
<script>${iframeAnimationScript}</script>
</body>
</html>`;
}
