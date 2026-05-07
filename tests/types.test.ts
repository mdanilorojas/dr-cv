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
} from "../generators/lib/types.js";

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
