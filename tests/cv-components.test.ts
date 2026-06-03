import { describe, it, expect } from "vitest";
import { renderClientChip } from "../generators/templates/cv/components/client-chip.js";
import type { Client } from "../generators/lib/types.js";

describe("renderClientChip", () => {
  const c: Client = { name: "Merck & Co.", industryEn: "Healthcare", industryEs: "Salud" };

  it("renders the client name with HTML-escaped ampersand", () => {
    const html = renderClientChip(c, "en");
    expect(html).toContain("Merck &amp; Co.");
  });

  it("uses EN industry when lang=en", () => {
    const html = renderClientChip(c, "en");
    expect(html).toContain("Healthcare");
  });

  it("uses ES industry when lang=es", () => {
    const html = renderClientChip(c, "es");
    expect(html).toContain("Salud");
  });
});

import { renderIdentityBlock } from "../generators/templates/cv/components/identity-block.js";
import type { Identity } from "../generators/lib/types.js";

const identityFixture: Identity = {
  name: "Danilo Rojas",
  role: "Agentic Designer · Product Engineer",
  location: "Quito · Ecuador",
  languages: "EN · ES",
  availability: "Open to work · Remote global",
  contact: {
    email: "danilorojas@hotmail.com",
    linkedin: "linkedin.com/in/mdanilorojas",
    github: "github.com/mdanilorojas",
  },
};

describe("renderIdentityBlock", () => {
  it("renders the name (may be split across spans)", () => {
    const html = renderIdentityBlock(identityFixture, { variant: "warm", lang: "en" });
    expect(html).toContain("Danilo");
    expect(html).toContain("Rojas");
  });

  it("includes a live-dot span when variant is warm", () => {
    const html = renderIdentityBlock(identityFixture, { variant: "warm", lang: "en" });
    expect(html).toContain("cv-identity__live-dot");
  });

  it("omits the live-dot when variant is serious", () => {
    const html = renderIdentityBlock(identityFixture, { variant: "serious", lang: "en" });
    expect(html).not.toContain("cv-identity__live-dot");
  });

  it("overrides role when variant is bairesdev (no 'Agentic Designer')", () => {
    const html = renderIdentityBlock(identityFixture, { variant: "bairesdev", lang: "en" });
    expect(html).not.toContain("Agentic Designer");
    expect(html).toContain("Product Designer &amp; Engineer");
    expect(html).toContain("15+ years");
  });

  it("escapes contact email in the hrefless text variant", () => {
    const evil: Identity = { ...identityFixture, contact: { email: '"><script>alert(1)</script>' } };
    const html = renderIdentityBlock(evil, { variant: "serious", lang: "en" });
    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;script&gt;");
  });
});

import { renderSummaryBlock } from "../generators/templates/cv/components/summary-block.js";
import type { Positioning } from "../generators/lib/types.js";

const positioningFixture: Positioning = {
  thesis: {
    en: "I ship real products — and I ship the tools agents use to help me ship them.",
    es: "Entrego productos reales — y entrego las herramientas que los agentes usan para ayudarme.",
  },
  tagline: {
    en: "Fifteen years of delivery.",
    es: "Quince años entregando.",
  },
  proofNumbers: [],
};

describe("renderSummaryBlock", () => {
  it("uses 'hello · summary' eyebrow for warm variant", () => {
    const html = renderSummaryBlock(positioningFixture, { variant: "warm", lang: "en" });
    expect(html).toContain("hello");
  });

  it("uses 'Professional Summary' eyebrow for serious variant", () => {
    const html = renderSummaryBlock(positioningFixture, { variant: "serious", lang: "en" });
    expect(html).toContain("Professional Summary");
  });

  it("uses 'Professional Summary' eyebrow for bairesdev variant", () => {
    const html = renderSummaryBlock(positioningFixture, { variant: "bairesdev", lang: "en" });
    expect(html).toContain("Professional Summary");
  });

  it("renders EN thesis when lang=en", () => {
    const html = renderSummaryBlock(positioningFixture, { variant: "warm", lang: "en" });
    expect(html).toContain("I ship real products");
  });

  it("renders ES thesis when lang=es", () => {
    const html = renderSummaryBlock(positioningFixture, { variant: "warm", lang: "es" });
    expect(html).toContain("Entrego productos reales");
  });
});

import { renderExperienceItem } from "../generators/templates/cv/components/experience-item.js";
import type { ExperienceItem } from "../generators/lib/types.js";

const xpFixture: ExperienceItem = {
  company: "Xentinels DesignOps",
  role: "Product Manager / UX-UI Designer",
  startYear: 2016,
  endYear: "present",
  descriptionEn: "Led design system work across enterprise clients.",
  descriptionEs: "Lideré trabajo de design system con clientes enterprise.",
  stack: ["Design system", "Figma"],
};

describe("renderExperienceItem", () => {
  it("renders company, role, timeframe", () => {
    const html = renderExperienceItem(xpFixture, { lang: "en", density: "full" });
    expect(html).toContain("Xentinels DesignOps");
    expect(html).toContain("Product Manager");
    expect(html).toContain("2016");
  });

  it("uses 'Present' when endYear is 'present' in EN", () => {
    const html = renderExperienceItem(xpFixture, { lang: "en", density: "full" });
    expect(html).toContain("Present");
  });

  it("uses 'presente' when endYear is 'present' in ES", () => {
    const html = renderExperienceItem(xpFixture, { lang: "es", density: "full" });
    expect(html).toContain("presente");
  });

  it("renders numeric endYear directly", () => {
    const closed: ExperienceItem = { ...xpFixture, endYear: 2017 };
    const html = renderExperienceItem(closed, { lang: "en", density: "full" });
    expect(html).toContain("2017");
  });

  it("omits description in condensed density", () => {
    const html = renderExperienceItem(xpFixture, { lang: "en", density: "condensed" });
    expect(html).not.toContain("Led design system work");
    expect(html).toContain("Xentinels DesignOps");
  });

  it("renders stack pills in full density", () => {
    const html = renderExperienceItem(xpFixture, { lang: "en", density: "full" });
    expect(html).toContain("Design system");
    expect(html).toContain("Figma");
  });
});

import { renderCaseCard } from "../generators/templates/cv/components/case-card.js";
import type { Case } from "../generators/lib/types.js";

const caseFixture: Case = {
  slug: "te-skin",
  titleEn: "/te-skin — a design system as an agent-consumable skill",
  titleEs: "/te-skin — un design system como skill consumible por agentes",
  clientEn: "Booz Allen Hamilton · Developer Portal",
  clientEs: "Booz Allen Hamilton · Developer Portal",
  yearStart: 2024,
  yearEnd: 2026,
  hookEn: "Packaged a 17-component design system as a slash-command skill.",
  hookEs: "Empaqueté un DS de 17 componentes como slash-command skill.",
  bulletsEn: ["Bullet 1 EN", "Bullet 2 EN"],
  bulletsEs: ["Bullet 1 ES", "Bullet 2 ES"],
  stack: ["Agent", "W3C"],
  featured: true,
};

describe("renderCaseCard", () => {
  it("renders title, client, hook, bullets, stack", () => {
    const html = renderCaseCard(caseFixture, { variant: "warm", lang: "en", featured: false });
    expect(html).toContain("/te-skin");
    expect(html).toContain("Developer Portal");
    expect(html).toContain("Packaged a 17-component");
    expect(html).toContain("Bullet 1 EN");
    expect(html).toContain("Agent");
  });

  it("renders ES content when lang=es", () => {
    const html = renderCaseCard(caseFixture, { variant: "warm", lang: "es", featured: false });
    expect(html).toContain("Empaqueté un DS");
    expect(html).toContain("Bullet 1 ES");
  });

  it("adds 'cv-case--featured' class when featured=true for warm", () => {
    const html = renderCaseCard(caseFixture, { variant: "warm", lang: "en", featured: true });
    expect(html).toContain("cv-case--featured");
  });

  it("adds 'cv-case--warm' + 'cv-case--featured' but NOT 'cv-case--dark' for serious featured", () => {
    const html = renderCaseCard(caseFixture, { variant: "serious", lang: "en", featured: true });
    expect(html).toContain("cv-case--serious");
    expect(html).toContain("cv-case--featured");
    expect(html).not.toContain("cv-case--dark");
  });

  it("no featured treatment for bairesdev", () => {
    const html = renderCaseCard(caseFixture, { variant: "bairesdev", lang: "en", featured: true });
    expect(html).toContain("cv-case--bairesdev");
    expect(html).not.toContain("cv-case--featured");
  });
});

import { renderTestimonialItem } from "../generators/templates/cv/components/testimonial-item.js";
import type { Testimonial, AttributedTestimonial } from "../generators/lib/types.js";

describe("renderTestimonialItem", () => {
  const verified: Testimonial = {
    quote: "A real loss for us.",
    quoteEs: "Una pérdida de verdad.",
    author: "Jennifer Sheppard",
    role: "Product Lead · Developer Portal",
    company: "Booz Allen Hamilton",
    source: "verified",
  };

  const attributed: AttributedTestimonial = {
    quote: "He ships the way a senior team ships.",
    author: "Head of Product",
    role: "EnRegla pilot",
    source: "attributed",
  };

  it("renders quote + author + role for verified", () => {
    const html = renderTestimonialItem(verified, "en");
    expect(html).toContain("A real loss for us");
    expect(html).toContain("Jennifer Sheppard");
    expect(html).toContain("Product Lead");
  });

  it("uses 'verified' badge for verified source", () => {
    const html = renderTestimonialItem(verified, "en");
    expect(html).toContain("cv-testimonial__badge--verified");
    expect(html).toContain("verified");
  });

  it("uses 'attributed' badge for attributed source", () => {
    const html = renderTestimonialItem(attributed, "en");
    expect(html).toContain("cv-testimonial__badge--attributed");
    expect(html).toContain("attributed");
  });

  it("prefers Spanish quote when lang=es and quoteEs exists", () => {
    const html = renderTestimonialItem(verified, "es");
    expect(html).toContain("Una pérdida de verdad");
  });

  it("falls back to English quote when lang=es but no quoteEs", () => {
    const html = renderTestimonialItem(attributed, "es");
    expect(html).toContain("senior team ships");
  });
});

import { renderSkillsSidebar } from "../generators/templates/cv/components/skills-sidebar.js";
import { renderEducationBlock } from "../generators/templates/cv/components/education-block.js";
import type { Skills, Education } from "../generators/lib/types.js";

const skillsFixture: Skills = {
  byLayer: {
    name: "Visual A",
    axis: "axis · product layer",
    groups: [
      {
        title: "Strategy",
        skills: [
          { name: "Product vision", level: "mastered" },
          { name: "Pricing", level: "learning" },
        ],
      },
      {
        title: "Agents",
        skills: [
          { name: "Claude Code", level: "mastered" },
        ],
      },
    ],
  },
  byOutcome: {
    name: "Visual B",
    axis: "axis · outcome",
    groups: [],
  },
};

describe("renderSkillsSidebar", () => {
  it("renders group titles and skill names", () => {
    const html = renderSkillsSidebar(skillsFixture, { variant: "warm", lang: "en" });
    expect(html).toContain("Strategy");
    expect(html).toContain("Agents");
    expect(html).toContain("Product vision");
    expect(html).toContain("Claude Code");
  });

  it("marks learning skills with a class", () => {
    const html = renderSkillsSidebar(skillsFixture, { variant: "warm", lang: "en" });
    const pricingIdx = html.indexOf("Pricing");
    expect(pricingIdx).toBeGreaterThan(-1);
    const section = html.slice(Math.max(0, pricingIdx - 100), pricingIdx + 50);
    expect(section).toContain("cv-skill--learning");
  });

  it("adds cv-skills--bairesdev class modifier when variant is bairesdev", () => {
    const html = renderSkillsSidebar(skillsFixture, { variant: "bairesdev", lang: "en" });
    expect(html).toContain("cv-skills--bairesdev");
  });

  it("renders ONLY byLayer axis (byOutcome is reserved for the skills sheet)", () => {
    // Lock the decision: the narrow 62mm CV sidebar cannot fit both axes.
    // byLayer groups like Strategy / Design / Engineering / Agents go on the CV.
    // byOutcome groups like Discovery / Build / Ship / Scale stay on the skills sheet.
    const bothAxesFixture: Skills = {
      byLayer: {
        name: "Visual A",
        axis: "layer",
        groups: [{ title: "LayerGroup", skills: [{ name: "LayerSkill", level: "mastered" }] }],
      },
      byOutcome: {
        name: "Visual B",
        axis: "outcome",
        groups: [{ title: "OutcomeGroup", skills: [{ name: "OutcomeSkill", level: "mastered" }] }],
      },
    };
    const html = renderSkillsSidebar(bothAxesFixture, { variant: "warm", lang: "en" });
    expect(html).toContain("LayerGroup");
    expect(html).toContain("LayerSkill");
    expect(html).not.toContain("OutcomeGroup");
    expect(html).not.toContain("OutcomeSkill");
  });
});

describe("renderEducationBlock", () => {
  const eduFixture: Education = [
    { year: 2015, name: "B.Sc. Systems Engineering", institution: "EPN" },
    { year: null, name: "Independent study", institution: "Self-taught" },
  ];

  it("renders each education item with name and institution", () => {
    const html = renderEducationBlock(eduFixture, "en");
    expect(html).toContain("B.Sc. Systems Engineering");
    expect(html).toContain("EPN");
  });

  it("renders year when present", () => {
    const html = renderEducationBlock(eduFixture, "en");
    expect(html).toContain("2015");
  });

  it("renders em dash for null year", () => {
    const html = renderEducationBlock(eduFixture, "en");
    expect(html).toContain("—");
  });
});

import { renderSkillsInventory } from "../generators/templates/cv/components/skills-inventory.js";

describe("renderSkillsInventory", () => {
  const items = [
    { skill: "UX/UI", years: "10+" },
    { skill: "React", years: "4+" },
    { skill: "Supabase", years: "2+" },
  ];

  it("renders an EN heading 'Skills Inventory'", () => {
    const html = renderSkillsInventory(items, "en");
    expect(html).toContain("Skills Inventory");
  });

  it("renders an ES heading 'Inventario de skills'", () => {
    const html = renderSkillsInventory(items, "es");
    expect(html).toContain("Inventario de skills");
  });

  it("emits one row per item with skill and years", () => {
    const html = renderSkillsInventory(items, "en");
    expect(html).toContain("UX/UI");
    expect(html).toContain("10+");
    expect(html).toContain("React");
    expect(html).toContain("4+");
    expect(html).toContain("Supabase");
    expect(html).toContain("2+");
  });

  it("wraps output in <section class=\"cv-inventory\">", () => {
    const html = renderSkillsInventory(items, "en");
    expect(html).toMatch(/<section\s+class="cv-inventory/);
  });

  it("escapes HTML-sensitive characters in skill names", () => {
    const hostile = [{ skill: "<script>", years: "1+" }];
    const html = renderSkillsInventory(hostile, "en");
    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;script&gt;");
  });
});

import { loadCvData } from "../generators/lib/load-data.js";
import path from "node:path";
import { fileURLToPath } from "node:url";

describe("renderSkillsSidebar — bairesdev ordering", () => {
  const here = path.dirname(fileURLToPath(import.meta.url));
  const dataDir = path.join(here, ".." , "data");
  const data = loadCvData(dataDir);

  it("puts the Agents group first for the bairesdev variant", () => {
    const html = renderSkillsSidebar(data.skills, { variant: "bairesdev", lang: "en" });
    const agentsIdx = html.indexOf("Agents");
    const designIdx = html.indexOf("Design");
    const engineeringIdx = html.indexOf("Engineering");
    const strategyIdx = html.indexOf("Strategy");
    expect(agentsIdx).toBeGreaterThan(-1);
    expect(designIdx).toBeGreaterThan(-1);
    expect(engineeringIdx).toBeGreaterThan(-1);
    expect(strategyIdx).toBeGreaterThan(-1);
    expect(agentsIdx).toBeLessThan(designIdx);
    expect(designIdx).toBeLessThan(engineeringIdx);
    expect(engineeringIdx).toBeLessThan(strategyIdx);
  });

  it("keeps the original Strategy-first order for warm and serious variants", () => {
    const htmlWarm = renderSkillsSidebar(data.skills, { variant: "warm", lang: "en" });
    const strategyIdx = htmlWarm.indexOf("Strategy");
    const agentsIdx = htmlWarm.indexOf("Agents");
    expect(strategyIdx).toBeLessThan(agentsIdx);
  });
});
