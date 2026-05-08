import { describe, it, expect } from "vitest";
import { renderTabNav } from "../generators/templates/landing/components/tab-nav.js";
import { renderHeroBlock } from "../generators/templates/landing/components/hero-block.js";
import { renderProofNumbers } from "../generators/templates/landing/components/proof-numbers.js";
import { renderCaseExpander } from "../generators/templates/landing/components/case-expander.js";
import { renderMethodDiagram } from "../generators/templates/landing/components/method-diagram.js";
import type { Landing, Identity, Positioning, Case } from "../generators/lib/types.js";

const identityFixture: Identity = {
  name: "Danilo Rojas",
  role: "Agentic Designer · Product Engineer",
  location: "Quito · Ecuador",
  languages: "EN · ES",
  availability: "Open to work · Remote global",
  contact: {
    email: "hi@example.com",
    linkedin: "linkedin.com/in/mdanilorojas",
    github: "github.com/mdanilorojas",
  },
};

const positioningFixture: Positioning = {
  thesis: {
    en: "I ship real products — and I ship the tools agents use to help me.",
    es: "Entrego productos reales — y entrego las herramientas que los agentes usan.",
  },
  tagline: {
    en: "Fifteen years of delivery.",
    es: "Quince años entregando.",
  },
  proofNumbers: [
    { value: "15", unit: "+", labelEn: "Years shipping", labelEs: "Años entregando" },
    { value: "346", labelEn: "Commits · 40 days", labelEs: "Commits · 40 días" },
    { value: "1", unit: ".0", labelEn: "SaaS live", labelEs: "SaaS en producción" },
    { value: "95", unit: ".6", labelEn: "DS score", labelEs: "Score DS" },
  ],
};

const landingFixture: Landing = {
  tabs: [
    { id: "overview", labelEn: "Overview", labelEs: "Resumen", visual: "particles", default: true },
    { id: "work", labelEn: "Work", labelEs: "Trabajo", visual: "grid" },
    { id: "method", labelEn: "Method", labelEs: "Método", visual: "flow" },
    { id: "about", labelEn: "About", labelEs: "Sobre mí", visual: "timeline" },
    { id: "contact", labelEn: "Contact", labelEs: "Contacto", visual: "signature" },
  ],
  cta: { en: "Let's work together", es: "Trabajemos juntos" },
  seo: {
    titleEn: "Danilo Rojas",
    titleEs: "Danilo Rojas",
    descriptionEn: "x",
    descriptionEs: "x",
  },
};

describe("renderTabNav", () => {
  it("renders all 5 EN labels when lang=en", () => {
    const html = renderTabNav(landingFixture, "en");
    expect(html).toContain("Overview");
    expect(html).toContain("Work");
    expect(html).toContain("Method");
    expect(html).toContain("About");
    expect(html).toContain("Contact");
  });

  it("renders all 5 ES labels when lang=es", () => {
    const html = renderTabNav(landingFixture, "es");
    expect(html).toContain("Resumen");
    expect(html).toContain("Trabajo");
    expect(html).toContain("Método");
    expect(html).toContain("Sobre mí");
    expect(html).toContain("Contacto");
  });

  it("uses WAI-ARIA tabs pattern (tablist + role=tab + aria-controls)", () => {
    const html = renderTabNav(landingFixture, "en");
    expect(html).toContain('role="tablist"');
    const tabMatches = html.match(/role="tab"/g) ?? [];
    expect(tabMatches.length).toBe(5);
    expect(html).toContain('aria-controls="tabpanel-overview"');
    expect(html).toContain('aria-controls="tabpanel-contact"');
  });

  it("marks the default tab as selected", () => {
    const html = renderTabNav(landingFixture, "en");
    const selectedMatches = html.match(/aria-selected="true"/g) ?? [];
    expect(selectedMatches.length).toBe(1);
    // The selected tab must be the overview one.
    expect(html).toMatch(/aria-selected="true"[^>]*aria-controls="tabpanel-overview"|aria-controls="tabpanel-overview"[^>]*aria-selected="true"/);
  });

  it("renders a language toggle linking EN → /es/", () => {
    const html = renderTabNav(landingFixture, "en");
    expect(html).toContain('href="/es/"');
    expect(html).toContain("hreflang=\"es\"");
  });

  it("renders a language toggle linking ES → /", () => {
    const html = renderTabNav(landingFixture, "es");
    expect(html).toContain('href="/"');
    expect(html).toContain("hreflang=\"en\"");
  });

  it("includes aria-label on the tablist for screen readers", () => {
    const html = renderTabNav(landingFixture, "en");
    expect(html).toMatch(/aria-label="[^"]+"/);
  });
});

describe("renderHeroBlock", () => {
  it("renders the name split into first + last with an accent span on last", () => {
    const html = renderHeroBlock(identityFixture, positioningFixture, landingFixture, "en");
    expect(html).toContain("Danilo");
    expect(html).toContain("Rojas");
    expect(html).toMatch(/lp-hero__name-last/);
  });

  it("renders the EN thesis when lang=en", () => {
    const html = renderHeroBlock(identityFixture, positioningFixture, landingFixture, "en");
    expect(html).toContain("I ship real products");
  });

  it("renders the ES thesis when lang=es", () => {
    const html = renderHeroBlock(identityFixture, positioningFixture, landingFixture, "es");
    expect(html).toContain("Entrego productos reales");
  });

  it("renders the CTA in the correct language", () => {
    // escapeHtml converts ' to &#39;, so match the escaped form.
    expect(renderHeroBlock(identityFixture, positioningFixture, landingFixture, "en"))
      .toContain("Let&#39;s work together");
    expect(renderHeroBlock(identityFixture, positioningFixture, landingFixture, "es"))
      .toContain("Trabajemos juntos");
  });

  it("renders an animated live-dot marked aria-hidden", () => {
    const html = renderHeroBlock(identityFixture, positioningFixture, landingFixture, "en");
    expect(html).toContain("lp-live-dot");
    expect(html).toMatch(/lp-live-dot[^>]*aria-hidden="true"|aria-hidden="true"[^>]*lp-live-dot/);
  });

  it("renders the availability line", () => {
    const html = renderHeroBlock(identityFixture, positioningFixture, landingFixture, "en");
    expect(html).toContain("Open to work");
  });
});

const caseFixture: Case = {
  slug: "te-skin",
  titleEn: "TE Skin — agent-consumable design system",
  titleEs: "TE Skin — sistema agent-consumable",
  clientEn: "Booz Allen Hamilton · Trusted Environments",
  clientEs: "Booz Allen Hamilton · Trusted Environments",
  yearStart: 2025,
  yearEnd: "present",
  hookEn: "Slash-command skill that teaches an agent the DS from memory.",
  hookEs: "Skill de slash-command que enseña al agente el DS desde memoria.",
  bulletsEn: ["Recursive review scored 95.6", "17 parts × 5 rounds"],
  bulletsEs: ["Revisión recursiva scoreó 95.6", "17 partes × 5 rondas"],
  stack: ["TypeScript", "Claude Code", "MCP"],
  featured: true,
};

describe("renderCaseExpander", () => {
  it("renders the EN title, client, hook, and bullets when lang=en", () => {
    const html = renderCaseExpander(caseFixture, "en");
    expect(html).toContain("TE Skin");
    expect(html).toContain("Booz Allen Hamilton");
    expect(html).toContain("Slash-command skill");
    expect(html).toContain("Recursive review scored 95.6");
  });

  it("renders the ES equivalents when lang=es", () => {
    const html = renderCaseExpander(caseFixture, "es");
    expect(html).toContain("sistema agent-consumable");
    expect(html).toContain("Skill de slash-command");
    expect(html).toContain("17 partes × 5 rondas");
  });

  it("uses the aria-expanded + aria-controls toggle pattern", () => {
    const html = renderCaseExpander(caseFixture, "en");
    expect(html).toMatch(/aria-expanded="false"/);
    expect(html).toContain('aria-controls="case-body-te-skin"');
    expect(html).toContain('id="case-body-te-skin"');
    expect(html).toContain("hidden");
  });

  it("escapes HTML in title and hook", () => {
    const evil: Case = {
      ...caseFixture,
      titleEn: "<script>alert(1)</script>",
    };
    const html = renderCaseExpander(evil, "en");
    expect(html).not.toContain("<script>alert(1)</script>");
    expect(html).toContain("&lt;script&gt;");
  });

  it("renders the year range with 'Present' when yearEnd=present in EN", () => {
    const html = renderCaseExpander(caseFixture, "en");
    expect(html).toContain("Present");
  });

  it("renders 'presente' when yearEnd=present in ES", () => {
    const html = renderCaseExpander(caseFixture, "es");
    expect(html).toContain("presente");
  });

  it("marks featured cases with a featured class", () => {
    const html = renderCaseExpander(caseFixture, "en");
    expect(html).toContain("lp-case--featured");
  });

  it("uses data-action=toggle-case for runtime JS hook", () => {
    const html = renderCaseExpander(caseFixture, "en");
    expect(html).toContain('data-action="toggle-case"');
  });
});

describe("renderMethodDiagram", () => {
  it("renders an SVG with all 5 node labels in EN", () => {
    const html = renderMethodDiagram("en");
    expect(html).toContain("<svg");
    expect(html).toContain("Profile");
    expect(html).toContain("Claude Code");
    expect(html).toContain("MCP servers");
    expect(html).toContain("Subagents");
    expect(html).toContain("Shipped work");
  });

  it("renders the ES labels when lang=es", () => {
    const html = renderMethodDiagram("es");
    expect(html).toContain("Perfil");
    expect(html).toContain("Subagentes");
    expect(html).toContain("Trabajo entregado");
  });

  it("has an aria-label describing the diagram", () => {
    const html = renderMethodDiagram("en");
    expect(html).toContain('role="img"');
    expect(html).toMatch(/aria-label="[^"]+"/);
  });
});

describe("renderProofNumbers", () => {
  it("renders exactly 4 proof-number blocks", () => {
    const html = renderProofNumbers(positioningFixture, "en");
    const blocks = html.match(/class="lp-proof__num"/g) ?? [];
    expect(blocks.length).toBe(4);
  });

  it("renders unit suffix when present", () => {
    const html = renderProofNumbers(positioningFixture, "en");
    expect(html).toContain(">15<");
    expect(html).toContain(">+<");
    expect(html).toContain(">.0<");
    expect(html).toContain(">.6<");
  });

  it("uses EN labels when lang=en", () => {
    const html = renderProofNumbers(positioningFixture, "en");
    expect(html).toContain("Years shipping");
    expect(html).toContain("Commits · 40 days");
  });

  it("uses ES labels when lang=es", () => {
    const html = renderProofNumbers(positioningFixture, "es");
    expect(html).toContain("Años entregando");
    expect(html).toContain("Commits · 40 días");
  });
});
