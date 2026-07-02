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
import { V11_STYLES, FAVICON_TAG } from "./v11-styles.js";
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
  "developer-portal": {
    context: {
      en: "Booz Allen Hamilton's government-facing Developer Portal ran on two design systems side by side. Design review was a two-week bottleneck on every ticket, and the existing UI washed out under the low light operators actually worked in.",
      es: "El Developer Portal government-facing de Booz Allen Hamilton corría sobre dos design systems en paralelo. La revisión de diseño era un cuello de botella de dos semanas por ticket, y la UI existente se lavaba bajo la poca luz en la que los operadores realmente trabajaban.",
    },
    problem: {
      en: "Teams re-reviewed the same accessibility and token mismatches on every release. The design system lived only in Figma, so engineering kept rebuilding it by hand. And dark mode was treated as an afterthought even though operators lived in it.",
      es: "Los equipos revisaban una y otra vez los mismos desajustes de accesibilidad y tokens en cada release. El design system vivía solo en Figma, así que ingeniería lo reconstruía a mano. Y el dark mode se trataba como un extra, pese a que los operadores vivían en él.",
    },
    approach: {
      en: "I made the system dark-first and wrote the accessibility decision into each token — every color carries the contrast ratio it passed. Then I packaged the components and rules as a spec engineering (and their agents) could consume directly, instead of interpreting a Figma file.",
      es: "Hice el sistema dark-first y escribí la decisión de accesibilidad dentro de cada token — cada color carga la ratio de contraste que aprobó. Luego empaqueté los componentes y las reglas como un spec que ingeniería (y sus agentes) podían consumir directo, en vez de interpretar un Figma.",
    },
    ship: {
      en: "A dark-first design system: 17 components with states, usage rules, and anti-patterns, plus tokens that expose their WCAG ratio for every ink-on-surface pair. Delivered as a handoff engineering builds straight from.",
      es: "Un design system dark-first: 17 componentes con estados, reglas de uso y anti-patterns, más tokens que exponen su ratio WCAG para cada par ink-on-surface. Entregado como handoff del que ingeniería construye directo.",
    },
    outcome: {
      en: "Design review dropped from two weeks to under two days. Every contrast pair provably ≥ 4.5:1, and operators stopped reporting dim text in retros. Jennifer Sheppard, the Product Lead, called it work she wanted to keep reusing.",
      es: "La revisión de diseño bajó de dos semanas a menos de dos días. Cada par de contraste probadamente ≥ 4.5:1, y los operadores dejaron de reportar texto apagado en los retros. Jennifer Sheppard, la Product Lead, lo llamó trabajo que quería seguir reutilizando.",
    },
    differently: {
      en: "I'd separate the client-specific tokens from the base as a clean layer from day one, and make a failed contrast ratio block the release instead of relying on review to catch it.",
      es: "Separaría los tokens específicos del cliente de la base como una capa limpia desde el día uno, y haría que una ratio de contraste fallida bloquee el release en vez de confiar en la revisión.",
    },
    craft: {
      en: "Accessibility decided per token, not linted after. Dark mode as the primary, not a theme. The same system in design and in code, so nothing drifts between them.",
      es: "Accesibilidad decidida por token, no linteada después. Dark mode como primario, no como tema. El mismo sistema en diseño y en código, para que nada se desincronice.",
    },
  },
  "juan-valdez": {
    context: {
      en: "Juan Valdez — Colombia's flagship coffee brand — needed its mobile app designed as a real product, not a set of disconnected screens.",
      es: "Juan Valdez — la marca insignia de café de Colombia — necesitaba su app mobile diseñada como un producto real, no como un set de pantallas sueltas.",
    },
    problem: {
      en: "The product had to feel unmistakably Juan Valdez while staying simple enough for a broad, everyday audience — and it needed a system underneath so it could grow without falling apart.",
      es: "El producto tenía que sentirse inconfundiblemente Juan Valdez sin dejar de ser simple para una audiencia amplia y cotidiana — y necesitaba un sistema debajo para crecer sin romperse.",
    },
    approach: {
      en: "I designed the full UI across the core flows and built a reusable design system — components, type scale, color, and spacing — so every screen stayed consistent and the brand carried through end to end.",
      es: "Diseñé toda la UI de los flujos core y armé un design system reutilizable — componentes, escala tipográfica, color y spacing — para que cada pantalla quedara consistente y la marca se sostuviera de punta a punta.",
    },
    ship: {
      en: "A complete, brand-led mobile UI and the design system behind it, delivered to engineering as a clean, spec'd handoff.",
      es: "Una UI mobile completa y brand-led, con el design system detrás, entregada a ingeniería como un handoff limpio y especificado.",
    },
    outcome: {
      en: "A coherent product surface engineering could build from directly, with a system that keeps new screens on-brand and consistent.",
      es: "Una superficie de producto coherente de la que ingeniería podía construir directo, con un sistema que mantiene las pantallas nuevas on-brand y consistentes.",
    },
    differently: {
      en: "I'd pair the design system with a living component doc from the start, so the handoff stays in sync as the app evolves.",
      es: "Emparejaría el design system con una doc de componentes viva desde el inicio, para que el handoff siga sincronizado a medida que la app evoluciona.",
    },
    craft: {
      en: "One system, brand-true. Type, color, and spacing decided once and reused everywhere. Screens designed to hand off, not to admire in isolation.",
      es: "Un solo sistema, fiel a la marca. Tipografía, color y spacing decididos una vez y reusados en todo. Pantallas diseñadas para entregar, no para admirar aisladas.",
    },
  },
  "life-update-mobile": {
    context: {
      en: "A personal product: a focus app that scores what you write each day against where you say you want to be in five years.",
      es: "Un producto personal: una app de foco que evalúa lo que escribes cada día contra dónde dices querer estar en cinco años.",
    },
    problem: {
      en: "Most journaling apps either bury you in features or never tell you whether today actually moved you toward what matters.",
      es: "La mayoría de las apps de journaling o te entierran en features o nunca te dicen si el día de hoy realmente te acercó a lo que importa.",
    },
    approach: {
      en: "I designed the product around one idea — three priorities a day — and designed the AI behavior: each entry is read in plain language and placed by semantic distance from a long-term plan.",
      es: "Diseñé el producto alrededor de una idea — tres prioridades al día — y diseñé el comportamiento de la IA: cada entrada se lee en lenguaje claro y se ubica por distancia semántica respecto a un plan de largo plazo.",
    },
    ship: {
      en: "A working MVP: daily entry, AI-scored focus, and a simple read on whether the week pointed at the plan.",
      es: "Un MVP funcional: entrada diaria, foco scoreado por IA, y una lectura simple de si la semana apuntó al plan.",
    },
    outcome: {
      en: "Shipped and used daily. It proved the core idea — that an AI read of a short daily entry can keep attention on a long-term plan.",
      es: "Shippeado y usado a diario. Probó la idea central — que una lectura por IA de una entrada diaria corta puede mantener la atención en un plan de largo plazo.",
    },
    differently: {
      en: "I'd surface the AI's reasoning in the UI, not hide it — people trust a focus score more when they can see why.",
      es: "Mostraría el razonamiento de la IA en la UI, no lo escondería — la gente confía más en un score de foco cuando puede ver el porqué.",
    },
    craft: {
      en: "One decision per day, not a dashboard. The AI explains in plain language. Designed so the product, not the model, is what you feel.",
      es: "Una decisión por día, no un dashboard. La IA explica en lenguaje claro. Diseñado para que sientas el producto, no el modelo.",
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
  if (endYear === "present") return `${startYear} — ${lang === "en" ? "Present" : "presente"}`;
  if (startYear === endYear) return String(startYear);
  return `${startYear} — ${endYear}`;
}

/* ============== copy (V11 R5 draft C — taste-first critic) ============== */

const COPY = {
  // Proof
  proofHeadingEn: "Evidence, not adjectives.",
  proofHeadingEs: "Evidencia, no adjetivos.",
  work: {
    eyebrowEn: "Selected work",
    eyebrowEs: "Trabajo seleccionado",
    titleEn: "Three products. Designed to the handoff.",
    titleEs: "Tres productos. Diseñados hasta el handoff.",
    leadEn: "Each one taken from problem to a build engineering can run with — design systems, product flows, and the AI behavior, spec'd and ready. I take the design as far as it goes; engineering takes it further.",
    leadEs: "Cada uno llevado del problema a un build con el que ingeniería puede arrancar — design systems, flujos de producto y el comportamiento de la IA, especificados y listos. Llevo el diseño hasta donde llega; ingeniería lo lleva más lejos.",
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
    caseCtaEn: "How this shipped",
    caseCtaEs: "Cómo se shippeó",
    caseBackEn: "Back to work",
    caseBackEs: "Volver al trabajo",
    caseNextEn: "Next case",
    caseNextEs: "Siguiente caso",
  },
  method: {
    eyebrowEn: "Method",
    eyebrowEs: "Método",
    titleEn: "How I work.",
    titleEs: "Cómo trabajo.",
    philosophyEn: "My work sits between user needs, business constraints, and execution.",
    philosophyEs: "Mi trabajo vive entre las necesidades del usuario, las restricciones del negocio y la ejecución.",
    leadEn: "I keep a running map of what I have earned, what I am investing in now, and what I am betting on next. It is how I keep improving without losing the craft floor.",
    leadEs: "Mantengo un mapa vivo de lo que he ganado, en qué estoy invirtiendo ahora y a qué le estoy apostando después. Así sigo mejorando sin perder el craft floor.",
  },
  about: {
    eyebrowEn: "About",
    eyebrowEs: "Sobre mí",
    titleEn: "A long way to the surface.",
    titleEs: "Un camino largo hasta la superficie.",
    bioEn: "I started in databases and backend, moved to frontend, then to UI, then to UX — eighteen years in product, fifteen in design. The path means I design with the whole system in mind, not just the screen. At Booz Allen Hamilton I carried that into government and compliance work for the FAA, the DoD, and the VA, where the rigor of the documentation matters as much as the interface. Today I lead the end-to-end design of a compliance SaaS for LATAM SMBs — ~280 paying customers, with new-user activation lifted from 2.6% to 9.4% by an onboarding rebuild I instrumented in Mixpanel and validated with an A/B test.",
    bioEs: "Empecé en bases de datos y backend, pasé a frontend, luego a UI, luego a UX — dieciocho años en producto, quince en diseño. El camino significa que diseño pensando en todo el sistema, no solo en la pantalla. En Booz Allen Hamilton llevé eso a trabajo de gobierno y compliance para la FAA, el DoD y el VA, donde el rigor de la documentación importa tanto como la interfaz. Hoy lidero de punta a punta el diseño de un SaaS de compliance para PYMES LATAM — ~280 clientes de pago, con la activación de nuevos usuarios subiendo de 2.6% a 9.4% tras reconstruir el onboarding, instrumentado en Mixpanel y validado con un A/B test.",
    clientsLabelEn: "Clients",
    clientsLabelEs: "Clientes",
    educationLabelEn: "Education",
    educationLabelEs: "Educación",
  },
  contact: {
    eyebrowEn: "Contact",
    eyebrowEs: "Contacto",
    titleEn: "Let's talk.",
    titleEs: "Hablemos.",
    leadEn: "Direct email is the fastest path. I reply within one business day.",
    leadEs: "Email directo es el camino más rápido. Respondo en un día hábil.",
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
  const notesLabel = lang === "en" ? "Notes" : "Notas";
  const workLabel = lang === "en" ? "Work" : "Trabajo";
  const methodLabel = lang === "en" ? "Method" : "Método";
  const aboutLabel = lang === "en" ? "About" : "Sobre mí";
  const contactLabel = lang === "en" ? "Contact" : "Contacto";
  const defaultLangHref = lang === "en" ? "/es/" : "/";
  const langHref = opts.langHrefOverride ?? defaultLangHref;
  const langCode = lang === "en" ? "EN / ES" : "ES / EN";
  const langAria = lang === "en" ? "View in Spanish" : "View in English";
  const navAria = lang === "en" ? "Main navigation" : "Navegación principal";
  const brandHref = opts.homeHref === "" ? "#top" : opts.homeHref;

  return `<nav class="v11-nav" aria-label="${escapeHtml(navAria)}">
  <div class="v11-nav__inner">
    <a href="${escapeHtml(brandHref)}" class="v11-nav__brand">${escapeHtml(identity.name)}<span class="v11-nav__brand-sep">·</span>dr</a>
    <div class="v11-nav__tabs">
      <a class="v11-nav__link" href="${escapeHtml(opts.homeHref)}#notes">${escapeHtml(notesLabel)}</a>
      <a class="v11-nav__link" href="${escapeHtml(opts.homeHref)}#work">${escapeHtml(workLabel)}</a>
      <a class="v11-nav__link" href="${escapeHtml(opts.homeHref)}#method">${escapeHtml(methodLabel)}</a>
      <a class="v11-nav__link" href="${escapeHtml(opts.homeHref)}#about">${escapeHtml(aboutLabel)}</a>
      <a class="v11-nav__link" href="${escapeHtml(opts.homeHref)}#contact">${escapeHtml(contactLabel)}</a>
    </div>
    <a class="v11-nav__lang" href="${escapeHtml(langHref)}" hreflang="${lang === "en" ? "es" : "en"}" aria-label="${escapeHtml(langAria)}">${escapeHtml(langCode)}</a>
  </div>
</nav>`;
}

/* ============== HERO (AI Product-Tour layer) ============== */

function renderHero(
  identity: Identity,
  positioning: Positioning,
  landing: Landing,
  lang: Lang,
): string {
  const heroLine = lang === "en"
    ? positioning.heroLine?.en ?? positioning.thesis.en
    : positioning.heroLine?.es ?? positioning.thesis.es;
  const cta = lang === "en" ? landing.cta.en : landing.cta.es;

  return `<section id="top" class="v11-hero" aria-label="Hero">
  <div class="v11-container">
    <div class="v11-hero__inner">
      <div class="v11-hero__kicker">${escapeHtml(identity.name)} <span aria-hidden="true">·</span> ${escapeHtml(identity.role)}</div>
      <h1 class="v11-hero__title">${escapeHtml(heroLine)}</h1>
      <div class="v11-hero__actions">
        <a class="v11-btn v11-btn--primary" href="#contact">
          ${escapeHtml(cta)}
          <span class="v11-btn__arrow" aria-hidden="true">→</span>
        </a>
      </div>
      <span class="v11-hero__availability">
        <span class="v11-live" aria-hidden="true"></span>
        ${escapeHtml(identity.availability)}
      </span>
    </div>
  </div>
</section>`;
}

/* ============== TRUST STRIP ============== */

function renderTrustStrip(positioning: Positioning, lang: Lang): string {
  const items = lang === "en" ? positioning.trustStrip?.en : positioning.trustStrip?.es;
  if (!items || items.length === 0) return "";
  const label = lang === "en" ? "Trusted by teams at" : "Trabajo para equipos en";
  const row = items
    .map((s) => `<span class="v11-trust__item">${escapeHtml(s)}</span>`)
    .join('<span class="v11-trust__sep" aria-hidden="true"> · </span>');
  return `<section class="v11-trust" aria-label="${escapeHtml(label)}">
  <div class="v11-container"><div class="v11-trust__row">${row}</div></div>
</section>`;
}

/* ============== PROOF ============== */

function renderProof(positioning: Positioning, lang: Lang): string {
  const heading = lang === "en" ? COPY.proofHeadingEn : COPY.proofHeadingEs;
  const eyebrow = lang === "en" ? "// Evidence" : "// Evidencia";

  const cards = positioning.proofNumbers.map((it) => {
    const unit = it.unit ? `<em>${escapeHtml(it.unit)}</em>` : "";
    const label = lang === "en" ? it.labelEn : it.labelEs;
    return `
      <div class="v11-proof__item" role="listitem">
        <div class="v11-proof__num">${escapeHtml(it.value)}${unit}</div>
        <div class="v11-proof__label">${escapeHtml(label)}</div>
      </div>`;
  }).join("");

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

/* ============== NOTES (POV) ============== */

function renderNotes(data: LandingData, lang: Lang): string {
  if (data.notes.length === 0) return "";
  const eyebrow = lang === "en" ? "Notes" : "Notas";
  const items = data.notes.map((n, i) => {
    const title = lang === "en" ? n.titleEn : n.titleEs;
    const body = lang === "en" ? n.bodyEn : n.bodyEs;
    const idx = String(i + 1).padStart(2, "0");
    return `<article class="v11-note" data-reveal>
    <div class="v11-note__idx">${idx}</div>
    <h3 class="v11-note__title">${escapeHtml(title)}</h3>
    <p class="v11-note__body">${escapeHtml(body)}</p>
  </article>`;
  }).join("\n");
  return `<section id="notes" class="v11-section v11-section--paper" aria-labelledby="notes-h">
  <div class="v11-container">
    <div class="v11-section__eyebrow">${escapeHtml(eyebrow)}</div>
    <h2 id="notes-h" class="v11-h1">${lang === "en" ? "The writing is evidence of judgment." : "La escritura es evidencia de juicio."}</h2>
    <div class="v11-notes">${items}</div>
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

export function sortedCases(cases: Case[]): Case[] {
  const order = ["developer-portal", "juan-valdez", "life-update-mobile"];
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

  // Labels for the editorial sidebar (V3 · Magazine)
  const labelClient = lang === "en" ? "Client" : "Cliente";
  const labelYears = lang === "en" ? "Years" : "Años";
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

  // Editorial sidebar — client / years / stack (vertical chips).
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
  <a class="v11-case__cta" href="${escapeHtml(detailHref)}">${escapeHtml(cta)}<span class="v11-case__cta-arrow" aria-hidden="true">→</span></a>
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
  const philosophy = lang === "en" ? COPY.method.philosophyEn : COPY.method.philosophyEs;
  const lead = lang === "en" ? COPY.method.leadEn : COPY.method.leadEs;

  const giraldez = data.testimonials.find((t) => t.author.includes("Giraldez")) ?? data.testimonials[0];

  return `<section id="method" class="v11-section v11-section--alt" aria-labelledby="method-h">
  <div class="v11-container">
    <div class="v11-section__eyebrow">${escapeHtml(eyebrow)}</div>
    <h2 id="method-h" class="v11-h1">${escapeHtml(title)}</h2>
    <p class="v11-lead">${escapeHtml(philosophy)}</p>
    <p class="v11-method__note">${escapeHtml(lead)}</p>

${renderHorizon(data.horizon, lang)}

    ${giraldez ? renderTestimonial(giraldez, lang) : ""}
  </div>
</section>`;
}

/* ============== ABOUT ============== */

function renderAbout(data: LandingData, lang: Lang): string {
  const eyebrow = lang === "en" ? COPY.about.eyebrowEn : COPY.about.eyebrowEs;
  const title = lang === "en" ? COPY.about.titleEn : COPY.about.titleEs;
  const bio = lang === "en" ? COPY.about.bioEn : COPY.about.bioEs;
  const clientsLabel = lang === "en" ? COPY.about.clientsLabelEn : COPY.about.clientsLabelEs;
  const educationLabel = lang === "en" ? COPY.about.educationLabelEn : COPY.about.educationLabelEs;

  const clientsRow = data.clients
    .map((c) => `<span class="v11-about__client">${escapeHtml(c.name)}</span>`)
    .join('<span class="v11-about__client-sep" aria-hidden="true"> · </span>');

  const educationItems = data.education
    .map((e) => {
      const year = e.year !== null ? ` <span class="v11-about__edu-year">· ${escapeHtml(String(e.year))}</span>` : "";
      const status = e.inProgress ? ` <span class="v11-about__edu-year">· ${lang === "en" ? "in progress" : "en curso"}</span>` : "";
      return `<li class="v11-about__edu-item"><span class="v11-about__edu-name">${escapeHtml(e.name)}</span> <span class="v11-about__edu-inst">· ${escapeHtml(e.institution)}</span>${year}${status}</li>`;
    })
    .join("\n      ");

  return `<section id="about" class="v11-section" aria-labelledby="about-h">
  <div class="v11-container">
    <div class="v11-section__eyebrow">${escapeHtml(eyebrow)}</div>
    <h2 id="about-h" class="v11-h1">${escapeHtml(title)}</h2>
    <p class="v11-lead">${escapeHtml(bio)}</p>

    <div class="v11-about__cols">
      <div class="v11-about__block">
        <div class="v11-about__label">${escapeHtml(clientsLabel)}</div>
        <div class="v11-about__clients">${clientsRow}</div>
      </div>
      <div class="v11-about__block">
        <div class="v11-about__label">${escapeHtml(educationLabel)}</div>
        <ul class="v11-about__edu">
      ${educationItems}
        </ul>
      </div>
    </div>
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
    ? `Built by ${identity.name} · source on ${identity.contact.github ?? "GitHub"} · updated 2026-06-15`
    : `Hecho por ${identity.name} · código en ${identity.contact.github ?? "GitHub"} · actualizado 2026-06-15`;
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
  const seoTitle = lang === "en" ? data.landing.seo.titleEn : data.landing.seo.titleEs;
  const seoDesc = lang === "en" ? data.landing.seo.descriptionEn : data.landing.seo.descriptionEs;
  const altLang = lang === "en" ? "es" : "en";
  const altHref = lang === "en" ? "/es/" : "/";
  const selfHref = lang === "en" ? "/" : "/es/";
  const skipLabel = lang === "en" ? "Skip to content" : "Saltar al contenido";
  const ogAlt = `${data.identity.name} — ${data.identity.role}`;

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
${FAVICON_TAG}
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
${renderHero(data.identity, data.positioning, data.landing, lang)}
${renderTrustStrip(data.positioning, lang)}
${renderProof(data.positioning, lang)}
${renderNotes(data, lang)}
${renderWork(data, lang, "")}
${renderMethod(data, lang)}
${renderAbout(data, lang)}
${renderContact(data, lang)}
</main>
${renderFooter(data.identity, lang)}
<script>${V11_SCRIPT}</script>
<script>${iframeAnimationScript}</script>
</body>
</html>`;
}
