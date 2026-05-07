import { describe, it, expect } from "vitest";
import { renderPage1 } from "../generators/templates/skills-sheet-page-1.js";
import type { SkillsSheetData } from "../generators/lib/types.js";

const fixture: SkillsSheetData = {
  identity: {
    name: "Test Person",
    role: "Test Role",
    location: "Test City",
    languages: "EN · ES",
    availability: "Open",
    contact: { email: "test@example.com" },
  },
  positioning: {
    thesis: { en: "Test thesis EN", es: "Test thesis ES" },
    tagline: { en: "Test tagline EN", es: "Test tagline ES" },
    proofNumbers: [
      { value: "10", unit: "+", labelEn: "Test metric", labelEs: "Métrica test" },
    ],
  },
  skills: {
    byLayer: {
      name: "Layer",
      axis: "layer axis",
      groups: [
        {
          title: "Test Group",
          skills: [
            { name: "Skill A", level: "mastered" },
            { name: "Skill B", level: "learning" },
          ],
        },
      ],
    },
    byOutcome: {
      name: "Outcome",
      axis: "outcome axis",
      groups: [
        { title: "Outcome Group", skills: [{ name: "Skill C", level: "mastered" }] },
      ],
    },
  },
  experience: { current: [] },
  clients: [],
  testimonials: [],
};

describe("renderPage1", () => {
  it("includes the person name (first and last, may be split into styled spans)", () => {
    const html = renderPage1(fixture, "en");
    expect(html).toContain("Test");
    expect(html).toContain("Person");
  });

  it("uses EN thesis when lang=en", () => {
    const html = renderPage1(fixture, "en");
    expect(html).toContain("Test thesis EN");
    expect(html).not.toContain("Test thesis ES");
  });

  it("uses ES thesis when lang=es", () => {
    const html = renderPage1(fixture, "es");
    expect(html).toContain("Test thesis ES");
  });

  it("renders each proof number with value and unit", () => {
    const html = renderPage1(fixture, "en");
    expect(html).toContain("10");
    expect(html).toContain("+");
    expect(html).toContain("Test metric");
  });

  it("renders both byLayer and byOutcome axis groups", () => {
    const html = renderPage1(fixture, "en");
    expect(html).toContain("Test Group");
    expect(html).toContain("Outcome Group");
    expect(html).toContain("Skill A");
    expect(html).toContain("Skill C");
  });

  it("marks learning skills with a distinct class", () => {
    const html = renderPage1(fixture, "en");
    const skillBIdx = html.indexOf("Skill B");
    expect(skillBIdx).toBeGreaterThan(-1);
    const skillBSection = html.slice(Math.max(0, skillBIdx - 200), skillBIdx + 50);
    expect(skillBSection).toContain('class="learn"');
  });

  it("escapes HTML characters in user content", () => {
    const evil: SkillsSheetData = {
      ...fixture,
      identity: { ...fixture.identity, name: "<script>alert('x')</script>" },
    };
    const html = renderPage1(evil, "en");
    expect(html).not.toContain("<script>alert");
    expect(html).toContain("&lt;script&gt;");
  });
});
