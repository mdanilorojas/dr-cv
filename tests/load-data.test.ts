import { describe, it, expect } from "vitest";
import {
  loadSkills,
  loadAllData,
  loadCase,
  loadCases,
  loadEducation,
  loadAttributedTestimonials,
  loadCvData,
  DataLoadError,
} from "../generators/lib/load-data.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { writeFileSync, unlinkSync, mkdirSync } from "node:fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixtureDir = path.join(__dirname, "fixtures");
const fixtureBadDir = path.join(__dirname, "fixtures-bad");
const dataDir = path.join(__dirname, "..", "data");

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
  it("loads the real /data/ directory without errors", () => {
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

  it("loads real /data/cases/*.md files", () => {
    const realCasesDir = path.join(dataDir, "cases");
    const cases = loadCases(realCasesDir);
    expect(cases.length).toBe(4);
    const slugs = cases.map((c) => c.slug).sort();
    expect(slugs).toEqual(["enregla", "life-update-mobile", "te-black", "te-skin"]);
  });
});

describe("loadEducation", () => {
  it("loads education from real /data/education.yaml", () => {
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
  it("loads attributed from real /data/testimonials/attributed.yaml", () => {
    const attr = loadAttributedTestimonials(
      path.join(dataDir, "testimonials", "attributed.yaml")
    );
    expect(attr.length).toBe(3);
    expect(attr.every((t) => t.source === "attributed")).toBe(true);
  });
});

describe("loadCvData", () => {
  it("loads the real /data/ directory including cases, education, and attributed", () => {
    const cv = loadCvData(dataDir);
    expect(cv.identity.name).toBe("Danilo Rojas");
    expect(cv.cases.length).toBe(4);
    expect(cv.education.length).toBeGreaterThan(0);
    expect(cv.attributedTestimonials.length).toBe(3);
    expect(cv.experience.past).toBeDefined();
    expect(cv.experience.past?.length ?? 0).toBeGreaterThan(0);
  });
});
