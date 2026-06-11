import { describe, it, expectTypeOf } from "vitest";
import type {
  Identity,
  Positioning,
  Skill,
  SkillGroup,
  SkillAxis,
  Skills,
  ExperienceItem,
  Experience,
  Client,
  Clients,
  Testimonial,
  Testimonials,
  SkillsSheetData,
  Case,
  Education,
  EducationItem,
  AttributedTestimonial,
  CvData,
} from "../generadores/lib/types.js";

describe("data schema types", () => {
  it("Skill has name, level, optional note", () => {
    expectTypeOf<Skill>().toMatchTypeOf<{
      name: string;
      level: "mastered" | "learning";
      note?: string;
    }>();
  });

  it("SkillGroup has title and list of skills", () => {
    expectTypeOf<SkillGroup>().toMatchTypeOf<{
      title: string;
      skills: Skill[];
    }>();
  });

  it("SkillAxis has name, axis label and groups", () => {
    expectTypeOf<SkillAxis>().toMatchTypeOf<{
      name: string;
      axis: string;
      groups: SkillGroup[];
    }>();
  });

  it("Skills has byLayer and byOutcome axes", () => {
    expectTypeOf<Skills>().toMatchTypeOf<{
      byLayer: SkillAxis;
      byOutcome: SkillAxis;
    }>();
  });

  it("Testimonial has quote, author, role, source", () => {
    expectTypeOf<Testimonial>().toMatchTypeOf<{
      quote: string;
      author: string;
      role: string;
      company?: string;
      source: "verified" | "attributed";
    }>();
  });

  it("SkillsSheetData composes everything", () => {
    expectTypeOf<SkillsSheetData>().toMatchTypeOf<{
      identity: Identity;
      positioning: Positioning;
      skills: Skills;
      experience: Experience;
      clients: Clients;
      testimonials: Testimonials;
    }>();
  });
});

describe("CV data schema types", () => {
  it("Case has multilingual title + hook + bullets + stack + featured", () => {
    expectTypeOf<Case>().toMatchTypeOf<{
      slug: string;
      titleEn: string;
      titleEs: string;
      clientEn: string;
      clientEs: string;
      yearStart: number;
      yearEnd: number | "present";
      hookEn: string;
      hookEs: string;
      bulletsEn: string[];
      bulletsEs: string[];
      stack: string[];
      featured: boolean;
    }>();
  });

  it("EducationItem has year (nullable) + name + institution", () => {
    expectTypeOf<EducationItem>().toMatchTypeOf<{
      year: number | null;
      name: string;
      institution: string;
    }>();
  });

  it("Education is an array of items", () => {
    expectTypeOf<Education>().toMatchTypeOf<EducationItem[]>();
  });

  it("AttributedTestimonial has quote + author + role + source='attributed'", () => {
    expectTypeOf<AttributedTestimonial>().toMatchTypeOf<{
      quote: string;
      quoteEs?: string;
      author: string;
      role: string;
      company?: string;
      source: "attributed";
    }>();
  });

  it("CvData extends SkillsSheetData with past + education + cases + attributed", () => {
    // Strong assertion: CvData must be assignable to SkillsSheetData (structural extension).
    expectTypeOf<CvData>().toMatchTypeOf<SkillsSheetData>();
    // Shape assertion: CvData adds the CV-specific fields.
    expectTypeOf<CvData>().toMatchTypeOf<{
      identity: unknown;
      positioning: unknown;
      skills: unknown;
      experience: unknown;
      clients: unknown;
      testimonials: unknown;
      education: Education;
      cases: Case[];
      attributedTestimonials: AttributedTestimonial[];
    }>();
  });
});
