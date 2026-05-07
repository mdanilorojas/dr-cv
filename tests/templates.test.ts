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

import { renderPage2 } from "../generators/templates/skills-sheet-page-2.js";

describe("renderPage2", () => {
  const fullFixture: SkillsSheetData = {
    ...fixture,
    experience: {
      current: [
        {
          company: "Booz Allen Hamilton",
          role: "Consultant",
          startYear: 2024,
          endYear: "present",
          highlight: true,
          badge: "Army · DoD",
          descriptionEn: "Current BAH work EN",
          descriptionEs: "Trabajo BAH ES",
          stack: ["/te-skin", "DS"],
        },
      ],
    },
    clients: [
      { name: "Merck & Co.", industryEn: "Healthcare", industryEs: "Salud" },
    ],
    testimonials: [
      {
        quote: "Verified quote EN",
        quoteEs: "Cita verificada ES",
        author: "Test Author",
        role: "Test Role",
        company: "Test Co",
        source: "verified",
      },
    ],
  };

  it("renders current work companies", () => {
    const html = renderPage2(fullFixture, "en");
    expect(html).toContain("Booz Allen Hamilton");
  });

  it("renders experience description in the chosen language", () => {
    const enHtml = renderPage2(fullFixture, "en");
    expect(enHtml).toContain("Current BAH work EN");
    const esHtml = renderPage2(fullFixture, "es");
    expect(esHtml).toContain("Trabajo BAH ES");
  });

  it("renders stack pills", () => {
    const html = renderPage2(fullFixture, "en");
    expect(html).toContain("/te-skin");
    expect(html).toContain("DS");
  });

  it("renders client chips with localized industry", () => {
    const enHtml = renderPage2(fullFixture, "en");
    expect(enHtml).toContain("Merck &amp; Co.");
    expect(enHtml).toContain("Healthcare");
    const esHtml = renderPage2(fullFixture, "es");
    expect(esHtml).toContain("Salud");
  });

  it("renders testimonial quote and author", () => {
    const html = renderPage2(fullFixture, "en");
    expect(html).toContain("Verified quote EN");
    expect(html).toContain("Test Author");
  });

  it("applies 'verified' badge only to verified testimonials", () => {
    const html = renderPage2(fullFixture, "en");
    expect(html).toContain("verified");
  });
});

import { renderSkillsSheet } from "../generators/templates/skills-sheet.js";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const tokensPath = path.join(here, "..", "design-system", "tokens.css");
const tokensCss = readFileSync(tokensPath, "utf8");

describe("renderSkillsSheet full page", () => {
  it("returns a full HTML document with doctype, head and body", () => {
    const fullFixture: SkillsSheetData = {
      ...fixture,
      experience: { current: [] },
      clients: [],
      testimonials: [],
    };
    const html = renderSkillsSheet(fullFixture, "en", tokensCss);
    expect(html).toMatch(/^<!doctype html>/i);
    expect(html).toContain("<html");
    expect(html).toContain("</html>");
    expect(html).toContain('<style>');
  });

  it("inlines the design tokens CSS", () => {
    const html = renderSkillsSheet(fixture, "en", tokensCss);
    expect(html).toContain("--accent");
    expect(html).toContain(tokensCss.slice(0, 80));
  });

  it("contains both page articles", () => {
    const html = renderSkillsSheet(fixture, "en", tokensCss);
    const pageCount = (html.match(/<article class="page">/g) ?? []).length;
    expect(pageCount).toBe(2);
  });
});
