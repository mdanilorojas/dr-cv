import { describe, it, expect } from "vitest";
import {
  loadSkills,
  loadAllData,
  loadCase,
  loadCases,
  loadEducation,
  loadAttributedTestimonials,
  loadCvData,
  loadLanding,
  loadLandingData,
  DataLoadError,
  validateSkills,
  validatePositioning,
  loadNotes,
  validateNotes,
} from "../generadores/lib/load-data.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { writeFileSync, unlinkSync, mkdirSync } from "node:fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixtureDir = path.join(__dirname, "fixtures");
const fixtureBadDir = path.join(__dirname, "fixtures-bad");
const dataDir = path.join(__dirname, "..", "perfil", "data");

describe("loadSkills", () => {
  it("loads and parses a minimal skills YAML file", () => {
    const skillsPath = path.join(fixtureDir, "minimal-skills.yaml");
    const skills = loadSkills(skillsPath);
    expect(skills.byLayer.name).toBe("Test A");
    expect(skills.byLayer.groups).toHaveLength(1);
    expect(skills.byLayer.groups[0].skills).toHaveLength(2);
    expect(skills.byLayer.groups[0].skills[0].level).toBe("mastered");
    expect(skills.byLayer.groups[0].skills[1].level).toBe("learning");
    expect(skills.byOutcome.groups).toHaveLength(1);
  });

  it("throws DataLoadError when file does not exist", () => {
    expect(() => loadSkills("nonexistent.yaml")).toThrow(DataLoadError);
  });

  it("throws DataLoadError when schema is violated (missing byLayer)", () => {
    const skillsPath = path.join(fixtureBadDir, "no-bylayer.yaml");
    expect(() => loadSkills(skillsPath)).toThrow(DataLoadError);
  });
});

describe("loadAllData", () => {
  it("loads the real /perfil/data/ directory without errors", () => {
    const data = loadAllData(dataDir);
    expect(data.identity.name).toBe("Danilo Rojas");
    expect(data.skills.byLayer.groups.length).toBeGreaterThan(0);
    expect(data.skills.byOutcome.groups.length).toBeGreaterThan(0);
    expect(data.experience.current.length).toBeGreaterThan(0);
    expect(data.clients.length).toBeGreaterThan(0);
    expect(data.testimonials.length).toBeGreaterThan(0);
  });
});

describe("loadCase", () => {
  it("parses a case markdown file with YAML front matter", () => {
    const casePath = path.join(fixtureDir, "cases", "test-case.md");
    const c = loadCase(casePath);
    expect(c.slug).toBe("test-case");
    expect(c.titleEn).toBe("Test Case EN");
    expect(c.bulletsEn).toHaveLength(2);
    expect(c.stack).toEqual(["Tag 1", "Tag 2"]);
    expect(c.featured).toBe(true);
  });

  it("throws DataLoadError when front matter delimiters are missing", () => {
    mkdirSync(fixtureBadDir, { recursive: true });
    const tmpPath = path.join(fixtureBadDir, "no-frontmatter.md");
    writeFileSync(tmpPath, "plain markdown, no front matter\n");
    try {
      expect(() => loadCase(tmpPath)).toThrow(DataLoadError);
    } finally {
      unlinkSync(tmpPath);
    }
  });

  it("parses front matter with CRLF line endings (Windows editors)", () => {
    mkdirSync(fixtureBadDir, { recursive: true });
    const tmpPath = path.join(fixtureBadDir, "crlf-case.md");
    const crlfContent =
      "---\r\n" +
      "slug: crlf-case\r\n" +
      'titleEn: "CRLF EN"\r\n' +
      'titleEs: "CRLF ES"\r\n' +
      'clientEn: "X"\r\n' +
      'clientEs: "X"\r\n' +
      "yearStart: 2024\r\n" +
      "yearEnd: 2025\r\n" +
      'hookEn: "h"\r\n' +
      'hookEs: "h"\r\n' +
      "bulletsEn:\r\n  - a\r\n" +
      "bulletsEs:\r\n  - a\r\n" +
      "stack:\r\n  - t\r\n" +
      "featured: false\r\n" +
      "---\r\n" +
      "body\r\n";
    writeFileSync(tmpPath, crlfContent);
    try {
      const c = loadCase(tmpPath);
      expect(c.slug).toBe("crlf-case");
      expect(c.titleEn).toBe("CRLF EN");
    } finally {
      unlinkSync(tmpPath);
    }
  });
});

describe("loadCases", () => {
  it("loads all .md files from a directory", () => {
    const casesDir = path.join(fixtureDir, "cases");
    const cases = loadCases(casesDir);
    expect(cases.length).toBeGreaterThan(0);
    expect(cases.every((c) => typeof c.slug === "string")).toBe(true);
  });

  it("loads real /perfil/data/cases/*.md files", () => {
    const realCasesDir = path.join(dataDir, "cases");
    const cases = loadCases(realCasesDir);
    expect(cases.length).toBe(3);
    const slugs = cases.map((c) => c.slug).sort();
    expect(slugs).toEqual(["developer-portal", "enregla", "life-update-mobile"]);
  });
});

describe("loadEducation", () => {
  it("loads education from real /perfil/data/education.yaml", () => {
    const edu = loadEducation(path.join(dataDir, "education.yaml"));
    expect(edu.length).toBeGreaterThan(0);
    expect(edu[0]).toHaveProperty("name");
    expect(edu[0]).toHaveProperty("institution");
  });

  it("allows null year", () => {
    const edu = loadEducation(path.join(dataDir, "education.yaml"));
    const anyNullYear = edu.some((e) => e.year === null);
    expect(anyNullYear).toBe(true);
  });
});

describe("loadAttributedTestimonials", () => {
  it("loads attributed from real /perfil/data/testimonials/attributed.yaml", () => {
    const attr = loadAttributedTestimonials(
      path.join(dataDir, "testimonials", "attributed.yaml")
    );
    expect(attr.length).toBeGreaterThanOrEqual(3);
    expect(attr.every((t) => t.source === "attributed")).toBe(true);
  });
});

describe("loadCvData", () => {
  it("loads the real /perfil/data/ directory including cases, education, and attributed", () => {
    const cv = loadCvData(dataDir);
    expect(cv.identity.name).toBe("Danilo Rojas");
    expect(cv.cases.length).toBe(3);
    expect(cv.education.length).toBeGreaterThan(0);
    expect(cv.attributedTestimonials.length).toBeGreaterThanOrEqual(3);
    expect(cv.experience.past).toBeDefined();
    expect(cv.experience.past?.length ?? 0).toBeGreaterThan(0);
  });
});

describe("loadLanding", () => {
  it("loads real /perfil/data/landing.yaml with 5 tabs", () => {
    const landing = loadLanding(path.join(dataDir, "landing.yaml"));
    expect(landing.tabs).toHaveLength(5);
    const ids = landing.tabs.map((t) => t.id).sort();
    expect(ids).toEqual(["about", "contact", "method", "overview", "work"]);
  });

  it("has exactly one default tab", () => {
    const landing = loadLanding(path.join(dataDir, "landing.yaml"));
    const defaults = landing.tabs.filter((t) => t.default === true);
    expect(defaults).toHaveLength(1);
    expect(defaults[0].id).toBe("overview");
  });

  it("has CTA in both EN and ES", () => {
    const landing = loadLanding(path.join(dataDir, "landing.yaml"));
    expect(landing.cta.en.length).toBeGreaterThan(0);
    expect(landing.cta.es.length).toBeGreaterThan(0);
    expect(landing.cta.en).toContain("Let");
    expect(landing.cta.es).toContain("Trabajemos");
  });

  it("has SEO in both languages", () => {
    const landing = loadLanding(path.join(dataDir, "landing.yaml"));
    expect(landing.seo.titleEn).toContain("Danilo");
    expect(landing.seo.titleEs).toContain("Danilo");
    expect(landing.seo.descriptionEn.length).toBeGreaterThan(10);
    expect(landing.seo.descriptionEs.length).toBeGreaterThan(10);
  });

  it("rejects a file with zero default tabs", () => {
    mkdirSync(fixtureBadDir, { recursive: true });
    const tmpPath = path.join(fixtureBadDir, "no-default.yaml");
    writeFileSync(
      tmpPath,
      `tabs:
  - id: overview
    labelEn: X
    labelEs: X
    visual: particles
cta:
  en: X
  es: X
seo:
  titleEn: X
  titleEs: X
  descriptionEn: X
  descriptionEs: X
`,
    );
    try {
      expect(() => loadLanding(tmpPath)).toThrow(DataLoadError);
    } finally {
      unlinkSync(tmpPath);
    }
  });
});

describe("loadLandingData", () => {
  it("combines CvData and landing config", () => {
    const ld = loadLandingData(dataDir);
    expect(ld.identity.name).toBe("Danilo Rojas");
    expect(ld.cases.length).toBe(3);
    expect(ld.landing.tabs).toHaveLength(5);
    expect(ld.landing.cta.en).toContain("Let");
  });
});

describe("validatePositioning â€” thesisBairesdev", () => {
  it("accepts optional thesisBairesdev.en", () => {
    const raw = {
      thesis: { en: "a", es: "b" },
      tagline: { en: "c", es: "d" },
      thesisBairesdev: { en: "agentic forward" },
      proofNumbers: [],
    };
    const v = validatePositioning(raw);
    expect(v.thesisBairesdev).toBeDefined();
    expect(v.thesisBairesdev!.en).toBe("agentic forward");
  });

  it("leaves thesisBairesdev undefined when not present", () => {
    const raw = {
      thesis: { en: "a", es: "b" },
      tagline: { en: "c", es: "d" },
      proofNumbers: [],
    };
    const v = validatePositioning(raw);
    expect(v.thesisBairesdev).toBeUndefined();
  });
});

describe("validateSkills â€” inventory", () => {
  it("accepts a non-empty inventory list", () => {
    const tmpPath = path.join(fixtureBadDir, "skills-with-inventory.yaml");
    mkdirSync(fixtureBadDir, { recursive: true });
    writeFileSync(tmpPath, `byLayer:
  name: "L"
  axis: "a"
  groups: []
byOutcome:
  name: "O"
  axis: "a"
  groups: []
inventory:
  - skill: "UX/UI"
    years: "10+"
  - skill: "React"
    years: "4+"
`);
    try {
      const skills = loadSkills(tmpPath);
      expect(skills.inventory).toBeDefined();
      expect(skills.inventory!.length).toBe(2);
      expect(skills.inventory![0]).toEqual({ skill: "UX/UI", years: "10+" });
    } finally {
      unlinkSync(tmpPath);
    }
  });

  it("leaves inventory undefined when not present", () => {
    const skillsPath = path.join(fixtureDir, "minimal-skills.yaml");
    const skills = loadSkills(skillsPath);
    expect(skills.inventory).toBeUndefined();
  });
});

describe("loadCvData â€” inventory round-trip", () => {
  it("perfil/data/skills.yaml exposes a non-empty inventory", () => {
    const here = path.dirname(fileURLToPath(import.meta.url));
    const dataDir = path.join(here, "..", "perfil", "data");
    const cv = loadCvData(dataDir);
    expect(cv.skills.inventory).toBeDefined();
    expect(cv.skills.inventory!.length).toBeGreaterThanOrEqual(20);
    const uxui = cv.skills.inventory!.find((i) => i.skill === "UX/UI");
    expect(uxui).toBeDefined();
    expect(uxui!.years).toBe("10+");
  });
});

describe("loadCvData â€” thesisBairesdev round-trip", () => {
  it("perfil/data/positioning.yaml exposes thesisBairesdev.en starting with 'Senior Product Designer.'", () => {
    const here = path.dirname(fileURLToPath(import.meta.url));
    const dataDir = path.join(here, "..", "perfil", "data");
    const cv = loadCvData(dataDir);
    expect(cv.positioning.thesisBairesdev).toBeDefined();
    expect(cv.positioning.thesisBairesdev!.en.startsWith("Senior Product Designer."))
      .toBe(true);
    expect(cv.positioning.thesisBairesdev!.en).toContain("18 years");
    expect(cv.positioning.thesisBairesdev!.en).toContain("AI as leverage");
  });
});

describe("validateNotes", () => {
  it("parses a list of notes", () => {
    const notes = validateNotes([
      { slug: "a", titleEn: "T", titleEs: "T", bodyEn: "B", bodyEs: "B" },
    ]);
    expect(notes).toHaveLength(1);
    expect(notes[0].slug).toBe("a");
  });
  it("rejects a note missing a field", () => {
    expect(() => validateNotes([{ slug: "a", titleEn: "T" }])).toThrow();
  });
});

describe("validatePositioning trustStrip + heroLine", () => {
  it("accepts trustStrip and heroLine when present", () => {
    const p = validatePositioning({
      thesis: { en: "x", es: "x" },
      tagline: { en: "x", es: "x" },
      heroLine: { en: "h", es: "h" },
      trustStrip: { en: ["A", "B"], es: ["A", "B"] },
      proofNumbers: [{ value: "1", labelEn: "L", labelEs: "L" }],
    });
    expect(p.heroLine?.en).toBe("h");
    expect(p.trustStrip?.es).toEqual(["A", "B"]);
  });
  it("omits them when absent", () => {
    const p = validatePositioning({
      thesis: { en: "x", es: "x" },
      tagline: { en: "x", es: "x" },
      proofNumbers: [{ value: "1", labelEn: "L", labelEs: "L" }],
    });
    expect(p.heroLine).toBeUndefined();
    expect(p.trustStrip).toBeUndefined();
  });
});
