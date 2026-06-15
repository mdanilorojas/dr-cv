import { readFileSync, existsSync, readdirSync } from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import type {
  Identity,
  Positioning,
  Skills,
  Experience,
  Clients,
  Testimonials,
  SkillsSheetData,
  Case,
  Education,
  AttributedTestimonial,
  CvData,
  Landing,
  LandingTab,
  LandingTabId,
  LandingVisualKind,
  LandingData,
  HorizonSection,
  HorizonColumn,
  HorizonChip,
  Note,
} from "./types.js";

export class DataLoadError extends Error {
  constructor(message: string, public readonly path?: string) {
    super(message);
    this.name = "DataLoadError";
  }
}

function loadYaml<T>(filePath: string, validate: (v: unknown) => T): T {
  if (!existsSync(filePath)) {
    throw new DataLoadError(`File not found: ${filePath}`, filePath);
  }
  let raw: unknown;
  try {
    raw = yaml.load(readFileSync(filePath, "utf8"));
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    throw new DataLoadError(`YAML parse error in ${filePath}: ${msg}`, filePath);
  }
  try {
    return validate(raw);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    throw new DataLoadError(`Schema error in ${filePath}: ${msg}`, filePath);
  }
}

function requireObject(v: unknown, ctx: string): Record<string, unknown> {
  if (v === null || typeof v !== "object" || Array.isArray(v)) {
    throw new Error(`${ctx} must be an object`);
  }
  return v as Record<string, unknown>;
}

function requireString(v: unknown, ctx: string): string {
  if (typeof v !== "string") throw new Error(`${ctx} must be a string`);
  return v;
}

function requireArray<T>(v: unknown, ctx: string, item: (x: unknown, i: number) => T): T[] {
  if (!Array.isArray(v)) throw new Error(`${ctx} must be an array`);
  return v.map((x, i) => item(x, i));
}

// ---------- validators ----------
export function validateSkills(raw: unknown): Skills {
  const obj = requireObject(raw, "skills");
  if (!("byLayer" in obj)) throw new Error("skills.byLayer is required");
  if (!("byOutcome" in obj)) throw new Error("skills.byOutcome is required");
  const validateAxis = (v: unknown, label: string) => {
    const a = requireObject(v, `skills.${label}`);
    return {
      name: requireString(a.name, `skills.${label}.name`),
      axis: requireString(a.axis, `skills.${label}.axis`),
      groups: requireArray(a.groups, `skills.${label}.groups`, (g, gi) => {
        const go = requireObject(g, `skills.${label}.groups[${gi}]`);
        return {
          title: requireString(go.title, `skills.${label}.groups[${gi}].title`),
          skills: requireArray(go.skills, `skills.${label}.groups[${gi}].skills`, (s, si) => {
            const so = requireObject(s, `skills.${label}.groups[${gi}].skills[${si}]`);
            const level = requireString(so.level, `skills.${label}.groups[${gi}].skills[${si}].level`);
            if (level !== "mastered" && level !== "learning") {
              throw new Error(`skills.${label}.groups[${gi}].skills[${si}].level must be 'mastered' or 'learning', got '${level}'`);
            }
            return {
              name: requireString(so.name, `skills.${label}.groups[${gi}].skills[${si}].name`),
              level: level as "mastered" | "learning",
              note: typeof so.note === "string" ? so.note : undefined,
            };
          }),
        };
      }),
    };
  };
  const inventoryRaw = obj.inventory;
  let inventory: Skills["inventory"] = undefined;
  if (inventoryRaw !== undefined && inventoryRaw !== null) {
    inventory = requireArray(inventoryRaw, "skills.inventory", (it, i) => {
      const io = requireObject(it, `skills.inventory[${i}]`);
      return {
        skill: requireString(io.skill, `skills.inventory[${i}].skill`),
        years: requireString(io.years, `skills.inventory[${i}].years`),
      };
    });
  }
  return {
    byLayer: validateAxis(obj.byLayer, "byLayer"),
    byOutcome: validateAxis(obj.byOutcome, "byOutcome"),
    inventory,
  };
}

function validateIdentity(raw: unknown): Identity {
  const o = requireObject(raw, "identity");
  const c = requireObject(o.contact, "identity.contact");
  return {
    name: requireString(o.name, "identity.name"),
    role: requireString(o.role, "identity.role"),
    location: requireString(o.location, "identity.location"),
    languages: requireString(o.languages, "identity.languages"),
    availability: requireString(o.availability, "identity.availability"),
    contact: {
      email: requireString(c.email, "identity.contact.email"),
      phone: typeof c.phone === "string" ? c.phone : undefined,
      linkedin: typeof c.linkedin === "string" ? c.linkedin : undefined,
      github: typeof c.github === "string" ? c.github : undefined,
      behance: typeof c.behance === "string" ? c.behance : undefined,
      site: typeof c.site === "string" ? c.site : undefined,
    },
  };
}

export function validatePositioning(raw: unknown): Positioning {
  const o = requireObject(raw, "positioning");
  const th = requireObject(o.thesis, "positioning.thesis");
  const tg = requireObject(o.tagline, "positioning.tagline");
  const tb = o.thesisBairesdev;
  let thesisBairesdev: Positioning["thesisBairesdev"] = undefined;
  if (tb !== undefined && tb !== null) {
    const tbo = requireObject(tb, "positioning.thesisBairesdev");
    thesisBairesdev = {
      en: requireString(tbo.en, "positioning.thesisBairesdev.en"),
    };
  }
  let heroLine: Positioning["heroLine"] = undefined;
  if (o.heroLine !== undefined && o.heroLine !== null) {
    const hl = requireObject(o.heroLine, "positioning.heroLine");
    heroLine = {
      en: requireString(hl.en, "positioning.heroLine.en"),
      es: requireString(hl.es, "positioning.heroLine.es"),
    };
  }
  const bilingualOpt = (key: "heroEmphasis" | "heroSub") => {
    const v = (o as Record<string, unknown>)[key];
    if (v === undefined || v === null) return undefined;
    const obj = requireObject(v, `positioning.${key}`);
    return {
      en: requireString(obj.en, `positioning.${key}.en`),
      es: requireString(obj.es, `positioning.${key}.es`),
    };
  };
  const heroEmphasis = bilingualOpt("heroEmphasis");
  const heroSub = bilingualOpt("heroSub");
  let trustStrip: Positioning["trustStrip"] = undefined;
  if (o.trustStrip !== undefined && o.trustStrip !== null) {
    const ts = requireObject(o.trustStrip, "positioning.trustStrip");
    trustStrip = {
      en: requireArray(ts.en, "positioning.trustStrip.en", (s, i) => requireString(s, `positioning.trustStrip.en[${i}]`)),
      es: requireArray(ts.es, "positioning.trustStrip.es", (s, i) => requireString(s, `positioning.trustStrip.es[${i}]`)),
    };
  }
  return {
    thesis: {
      en: requireString(th.en, "positioning.thesis.en"),
      es: requireString(th.es, "positioning.thesis.es"),
    },
    tagline: {
      en: requireString(tg.en, "positioning.tagline.en"),
      es: requireString(tg.es, "positioning.tagline.es"),
    },
    heroLine,
    heroEmphasis,
    heroSub,
    trustStrip,
    thesisBairesdev,
    proofNumbers: requireArray(o.proofNumbers, "positioning.proofNumbers", (p, i) => {
      const po = requireObject(p, `positioning.proofNumbers[${i}]`);
      return {
        value: requireString(po.value, `positioning.proofNumbers[${i}].value`),
        unit: typeof po.unit === "string" ? po.unit : undefined,
        labelEn: requireString(po.labelEn, `positioning.proofNumbers[${i}].labelEn`),
        labelEs: requireString(po.labelEs, `positioning.proofNumbers[${i}].labelEs`),
      };
    }),
  };
}

function validateExperience(raw: unknown): Experience {
  const o = requireObject(raw, "experience");
  const validateItems = (v: unknown, label: string) =>
    requireArray(v, label, (it, i) => {
      const io = requireObject(it, `${label}[${i}]`);
      const endYearRaw = io.endYear;
      let endYear: number | "present";
      if (endYearRaw === "present") {
        endYear = "present";
      } else if (typeof endYearRaw === "number") {
        endYear = endYearRaw;
      } else {
        throw new Error(`${label}[${i}].endYear must be number or "present"`);
      }
      return {
        company: requireString(io.company, `${label}[${i}].company`),
        role: requireString(io.role, `${label}[${i}].role`),
        startYear: typeof io.startYear === "number"
          ? io.startYear
          : (() => { throw new Error(`${label}[${i}].startYear must be number`); })(),
        endYear,
        descriptionEn: requireString(io.descriptionEn, `${label}[${i}].descriptionEn`),
        descriptionEs: requireString(io.descriptionEs, `${label}[${i}].descriptionEs`),
        stack: requireArray(io.stack, `${label}[${i}].stack`, (s) => requireString(s, `stack item`)),
        highlight: typeof io.highlight === "boolean" ? io.highlight : undefined,
        badge: typeof io.badge === "string" ? io.badge : undefined,
      };
    });
  return {
    current: validateItems(o.current, "experience.current"),
    past: o.past ? validateItems(o.past, "experience.past") : undefined,
  };
}

function validateClients(raw: unknown): Clients {
  return requireArray(raw, "clients", (c, i) => {
    const co = requireObject(c, `clients[${i}]`);
    return {
      name: requireString(co.name, `clients[${i}].name`),
      industryEn: requireString(co.industryEn, `clients[${i}].industryEn`),
      industryEs: requireString(co.industryEs, `clients[${i}].industryEs`),
    };
  });
}

function validateTestimonials(raw: unknown): Testimonials {
  return requireArray(raw, "testimonials", (t, i) => {
    const to = requireObject(t, `testimonials[${i}]`);
    const source = requireString(to.source, `testimonials[${i}].source`);
    if (source !== "verified" && source !== "attributed") {
      throw new Error(`testimonials[${i}].source must be 'verified' or 'attributed', got '${source}'`);
    }
    return {
      quote: requireString(to.quote, `testimonials[${i}].quote`),
      quoteEs: typeof to.quoteEs === "string" ? to.quoteEs : undefined,
      author: requireString(to.author, `testimonials[${i}].author`),
      role: requireString(to.role, `testimonials[${i}].role`),
      company: typeof to.company === "string" ? to.company : undefined,
      source: source as "verified" | "attributed",
    };
  });
}

// ============= validators for new types =============
function validateCase(raw: unknown, path: string): Case {
  const o = requireObject(raw, `case front matter in ${path}`);
  const yEnd = o.yearEnd;
  let yearEnd: number | "present";
  if (yEnd === "present") {
    yearEnd = "present";
  } else if (typeof yEnd === "number") {
    yearEnd = yEnd;
  } else {
    throw new Error(`case ${path}: yearEnd must be number or "present"`);
  }
  return {
    slug: requireString(o.slug, `case ${path}: slug`),
    titleEn: requireString(o.titleEn, `case ${path}: titleEn`),
    titleEs: requireString(o.titleEs, `case ${path}: titleEs`),
    clientEn: requireString(o.clientEn, `case ${path}: clientEn`),
    clientEs: requireString(o.clientEs, `case ${path}: clientEs`),
    yearStart: typeof o.yearStart === "number"
      ? o.yearStart
      : (() => { throw new Error(`case ${path}: yearStart must be number`); })(),
    yearEnd,
    hookEn: requireString(o.hookEn, `case ${path}: hookEn`),
    hookEs: requireString(o.hookEs, `case ${path}: hookEs`),
    bulletsEn: requireArray(o.bulletsEn, `case ${path}: bulletsEn`, (b) => requireString(b, "bullet")),
    bulletsEs: requireArray(o.bulletsEs, `case ${path}: bulletsEs`, (b) => requireString(b, "bullet")),
    stack: requireArray(o.stack, `case ${path}: stack`, (s) => requireString(s, "stack item")),
    featured: typeof o.featured === "boolean"
      ? o.featured
      : (() => { throw new Error(`case ${path}: featured must be boolean`); })(),
    animation: typeof o.animation === "string" ? o.animation : undefined,
  };
}

function validateEducation(raw: unknown): Education {
  return requireArray(raw, "education", (item, i) => {
    const o = requireObject(item, `education[${i}]`);
    const y = o.year;
    let year: number | null;
    if (y === null || y === undefined) {
      year = null;
    } else if (typeof y === "number") {
      year = y;
    } else {
      throw new Error(`education[${i}].year must be number or null`);
    }
    return {
      year,
      name: requireString(o.name, `education[${i}].name`),
      institution: requireString(o.institution, `education[${i}].institution`),
      location: typeof o.location === "string" ? o.location : undefined,
    };
  });
}

function validateAttributedTestimonials(raw: unknown): AttributedTestimonial[] {
  return requireArray(raw, "attributedTestimonials", (t, i) => {
    const o = requireObject(t, `attributedTestimonials[${i}]`);
    const source = requireString(o.source, `attributedTestimonials[${i}].source`);
    if (source !== "attributed") {
      throw new Error(`attributedTestimonials[${i}].source must be 'attributed', got '${source}'`);
    }
    return {
      quote: requireString(o.quote, `attributedTestimonials[${i}].quote`),
      quoteEs: typeof o.quoteEs === "string" ? o.quoteEs : undefined,
      author: requireString(o.author, `attributedTestimonials[${i}].author`),
      role: requireString(o.role, `attributedTestimonials[${i}].role`),
      company: typeof o.company === "string" ? o.company : undefined,
      source: "attributed" as const,
    };
  });
}

// ============= markdown front matter parser =============
// Match --- fences tolerating CRLF (Windows) or LF (Unix) line endings.
const FRONT_MATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---/;

function parseFrontMatter(markdown: string): unknown {
  const match = FRONT_MATTER_RE.exec(markdown);
  if (!match) {
    throw new Error("missing YAML front matter delimiters (---)");
  }
  return yaml.load(match[1]);
}

// ---------- public API ----------
export function loadSkills(filePath: string): Skills {
  return loadYaml(filePath, validateSkills);
}

export function loadAllData(dataDir: string): SkillsSheetData {
  return {
    identity: loadYaml(path.join(dataDir, "identity.yaml"), validateIdentity),
    positioning: loadYaml(path.join(dataDir, "positioning.yaml"), validatePositioning),
    skills: loadYaml(path.join(dataDir, "skills.yaml"), validateSkills),
    experience: loadYaml(path.join(dataDir, "experience.yaml"), validateExperience),
    clients: loadYaml(path.join(dataDir, "clients.yaml"), validateClients),
    testimonials: loadYaml(path.join(dataDir, "testimonials", "verified.yaml"), validateTestimonials),
  };
}

// ---------- new public API ----------
export function loadCase(filePath: string): Case {
  if (!existsSync(filePath)) {
    throw new DataLoadError(`Case file not found: ${filePath}`, filePath);
  }
  let raw: unknown;
  try {
    const content = readFileSync(filePath, "utf8");
    raw = parseFrontMatter(content);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    throw new DataLoadError(`Front matter error in ${filePath}: ${msg}`, filePath);
  }
  try {
    return validateCase(raw, filePath);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    throw new DataLoadError(`Case schema error in ${filePath}: ${msg}`, filePath);
  }
}

export function loadCases(dirPath: string): Case[] {
  if (!existsSync(dirPath)) {
    throw new DataLoadError(`Cases dir not found: ${dirPath}`, dirPath);
  }
  const files = readdirSync(dirPath).filter((f) => f.endsWith(".md"));
  return files
    .map((f) => loadCase(path.join(dirPath, f)))
    .sort((a, b) => a.slug.localeCompare(b.slug));
}

export function loadEducation(filePath: string): Education {
  return loadYaml(filePath, validateEducation);
}

export function loadAttributedTestimonials(filePath: string): AttributedTestimonial[] {
  return loadYaml(filePath, validateAttributedTestimonials);
}

export function loadCvData(dataDir: string): CvData {
  const base = loadAllData(dataDir);
  const cases = loadCases(path.join(dataDir, "cases"));
  const education = loadEducation(path.join(dataDir, "education.yaml"));
  const attributedTestimonials = loadAttributedTestimonials(
    path.join(dataDir, "testimonials", "attributed.yaml"),
  );
  return { ...base, cases, education, attributedTestimonials };
}

// ============= LANDING VALIDATION =============
const VALID_TAB_IDS: readonly LandingTabId[] = [
  "overview",
  "work",
  "method",
  "about",
  "contact",
];
const VALID_VISUAL_KINDS: readonly LandingVisualKind[] = [
  "particles",
  "grid",
  "flow",
  "timeline",
  "signature",
];

function validateLanding(raw: unknown): Landing {
  const o = requireObject(raw, "landing");
  const tabs = requireArray(o.tabs, "landing.tabs", (t, i): LandingTab => {
    const to = requireObject(t, `landing.tabs[${i}]`);
    const id = requireString(to.id, `landing.tabs[${i}].id`);
    if (!VALID_TAB_IDS.includes(id as LandingTabId)) {
      throw new Error(
        `landing.tabs[${i}].id must be one of ${VALID_TAB_IDS.join("|")}, got '${id}'`,
      );
    }
    const visual = requireString(to.visual, `landing.tabs[${i}].visual`);
    if (!VALID_VISUAL_KINDS.includes(visual as LandingVisualKind)) {
      throw new Error(
        `landing.tabs[${i}].visual must be one of ${VALID_VISUAL_KINDS.join("|")}, got '${visual}'`,
      );
    }
    return {
      id: id as LandingTabId,
      labelEn: requireString(to.labelEn, `landing.tabs[${i}].labelEn`),
      labelEs: requireString(to.labelEs, `landing.tabs[${i}].labelEs`),
      visual: visual as LandingVisualKind,
      default: typeof to.default === "boolean" ? to.default : undefined,
    };
  });
  if (tabs.filter((t) => t.default === true).length !== 1) {
    throw new Error("landing.tabs must have exactly one entry with default: true");
  }
  const cta = requireObject(o.cta, "landing.cta");
  const seo = requireObject(o.seo, "landing.seo");
  return {
    tabs,
    cta: {
      en: requireString(cta.en, "landing.cta.en"),
      es: requireString(cta.es, "landing.cta.es"),
    },
    seo: {
      titleEn: requireString(seo.titleEn, "landing.seo.titleEn"),
      titleEs: requireString(seo.titleEs, "landing.seo.titleEs"),
      descriptionEn: requireString(seo.descriptionEn, "landing.seo.descriptionEn"),
      descriptionEs: requireString(seo.descriptionEs, "landing.seo.descriptionEs"),
    },
  };
}

export function loadLanding(filePath: string): Landing {
  return loadYaml(filePath, validateLanding);
}

export function loadLandingData(dataDir: string): LandingData {
  const cv = loadCvData(dataDir);
  const landing = loadLanding(path.join(dataDir, "landing.yaml"));
  const horizon = loadHorizon(path.join(dataDir, "horizon.yaml"));
  const notesPath = path.join(dataDir, "notes.yaml");
  const notes = existsSync(notesPath) ? loadNotes(notesPath) : [];
  return { ...cv, landing, horizon, notes };
}

// ============= HORIZON VALIDATION =============
function validateBilingual(raw: unknown, ctx: string): { en: string; es: string } {
  const o = requireObject(raw, ctx);
  return {
    en: requireString(o.en, `${ctx}.en`),
    es: requireString(o.es, `${ctx}.es`),
  };
}

function validateHorizon(raw: unknown): HorizonSection {
  const o = requireObject(raw, "horizon");
  const eyebrow = validateBilingual(o.eyebrow, "horizon.eyebrow");
  const sectionTitle = validateBilingual(o.sectionTitle, "horizon.sectionTitle");
  const columns = requireArray(o.columns, "horizon.columns", (col, i): HorizonColumn => {
    const co = requireObject(col, `horizon.columns[${i}]`);
    const id = requireString(co.id, `horizon.columns[${i}].id`);
    const chips = requireArray(co.chips, `horizon.columns[${i}].chips`, (chip, ci): HorizonChip => {
      const ch = requireObject(chip, `horizon.columns[${i}].chips[${ci}]`);
      const label = validateBilingual(ch.label, `horizon.columns[${i}].chips[${ci}].label`);
      const href = typeof ch.href === "string" ? ch.href : undefined;
      let kind: "evidence" | "bet" | undefined;
      if (ch.kind === undefined) {
        kind = undefined;
      } else if (ch.kind === "evidence" || ch.kind === "bet") {
        kind = ch.kind;
      } else {
        throw new Error(
          `horizon.columns[${i}].chips[${ci}].kind must be 'evidence' or 'bet', got '${String(ch.kind)}'`,
        );
      }
      return { label, href, kind };
    });
    let tools: string[] | undefined;
    if (co.tools !== undefined) {
      if (!Array.isArray(co.tools)) {
        throw new Error(`horizon.columns[${i}].tools must be an array of strings`);
      }
      tools = co.tools.map((t, ti) => {
        if (typeof t !== "string") {
          throw new Error(`horizon.columns[${i}].tools[${ti}] must be a string`);
        }
        return t;
      });
    }
    return {
      id,
      stage: validateBilingual(co.stage, `horizon.columns[${i}].stage`),
      heading: validateBilingual(co.heading, `horizon.columns[${i}].heading`),
      body: validateBilingual(co.body, `horizon.columns[${i}].body`),
      emphasis: typeof co.emphasis === "boolean" ? co.emphasis : undefined,
      tools,
      chips,
    };
  });
  return { eyebrow, sectionTitle, columns };
}

export function loadHorizon(filePath: string): HorizonSection {
  return loadYaml(filePath, validateHorizon);
}

// ============= NOTES VALIDATION =============
export function validateNotes(raw: unknown): Note[] {
  return requireArray(raw, "notes", (n, i) => {
    const o = requireObject(n, `notes[${i}]`);
    return {
      slug: requireString(o.slug, `notes[${i}].slug`),
      titleEn: requireString(o.titleEn, `notes[${i}].titleEn`),
      titleEs: requireString(o.titleEs, `notes[${i}].titleEs`),
      bodyEn: requireString(o.bodyEn, `notes[${i}].bodyEn`),
      bodyEs: requireString(o.bodyEs, `notes[${i}].bodyEs`),
    };
  });
}

export function loadNotes(filePath: string): Note[] {
  return loadYaml(filePath, validateNotes);
}
