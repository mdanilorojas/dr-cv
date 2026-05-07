import { readFileSync, existsSync } from "node:fs";
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
  return {
    byLayer: validateAxis(obj.byLayer, "byLayer"),
    byOutcome: validateAxis(obj.byOutcome, "byOutcome"),
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

function validatePositioning(raw: unknown): Positioning {
  const o = requireObject(raw, "positioning");
  const th = requireObject(o.thesis, "positioning.thesis");
  const tg = requireObject(o.tagline, "positioning.tagline");
  return {
    thesis: {
      en: requireString(th.en, "positioning.thesis.en"),
      es: requireString(th.es, "positioning.thesis.es"),
    },
    tagline: {
      en: requireString(tg.en, "positioning.tagline.en"),
      es: requireString(tg.es, "positioning.tagline.es"),
    },
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
