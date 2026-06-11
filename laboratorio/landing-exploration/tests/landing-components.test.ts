import { describe, it, expect } from "vitest";
import { renderTabNav } from "../generadores/templates/landing/components/tab-nav.js";
import { renderHeroBlock } from "../generadores/templates/landing/components/hero-block.js";
import { renderProofNumbers } from "../generadores/templates/landing/components/proof-numbers.js";
import { renderCaseExpander } from "../generadores/templates/landing/components/case-expander.js";
import { renderMethodDiagram } from "../generadores/templates/landing/components/method-diagram.js";
import { renderTimeline } from "../generadores/templates/landing/components/timeline.js";
import { renderTestimonialFeatured } from "../generadores/templates/landing/components/testimonial-featured.js";
import { renderContactBlock } from "../generadores/templates/landing/components/contact-block.js";
import { renderSectionVisual } from "../generadores/templates/landing/components/section-visual.js";
import { renderMeAgentDock } from "../generadores/templates/landing/components/me-agent-dock.js";
import type { Landing, Identity, Positioning, Case, Experience, Testimonial } from "../generadores/lib/types.js";

const identityFixture: Identity = {
  name: "Danilo Rojas",
  role: "Agentic Designer Â· Product Engineer",
  location: "Quito Â· Ecuador",
  languages: "EN Â· ES",
  availability: "Open to work Â· Remote global",
  contact: {
    email: "hi@example.com",
    linkedin: "linkedin.com/in/mdanilorojas",
    github: "github.com/mdanilorojas",
  },
};

const positioningFixture: Positioning = {
  thesis: {
    en: "I ship real products â€” and I ship the tools agents use to help me.",
    es: "Entrego publicables reales â€” y entrego las herramientas que los agentes usan.",
  },
  tagline: {
    en: "Fifteen years of delivery.",
    es: "Quince aÃ±os entregando.",
  },
  proofNumbers: [
    { value: "15", unit: "+", labelEn: "Years shipping", labelEs: "AÃ±os entregando" },
    { value: "346", labelEn: "Commits Â· 40 days", labelEs: "Commits Â· 40 dÃ­as" },
    { value: "1", unit: ".0", labelEn: "SaaS live", labelEs: "SaaS en producciÃ³n" },
    { value: "95", unit: ".6", labelEn: "DS score", labelEs: "Score DS" },
  ],
};

const landingFixture: Landing = {
  tabs: [
    { id: "overview", labelEn: "Overview", labelEs: "Resumen", visual: "particles", default: true },
    { id: "work", labelEn: "Work", labelEs: "Trabajo", visual: "grid" },
    { id: "method", labelEn: "Method", labelEs: "MÃ©todo", visual: "flow" },
    { id: "about", labelEn: "About", labelEs: "Sobre mÃ­", visual: "timeline" },
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
    expect(html).toContain("MÃ©todo");
    expect(html).toContain("Sobre mÃ­");
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

  it("renders a language toggle linking EN â†’ /es/", () => {
    const html = renderTabNav(landingFixture, "en");
    expect(html).toContain('href="/es/"');
    expect(html).toContain("hreflang=\"es\"");
  });

  it("renders a language toggle linking ES â†’ /", () => {
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
    expect(html).toContain("Entrego publicables reales");
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
  titleEn: "TE Skin â€” agent-consumable design system",
  titleEs: "TE Skin â€” sistema agent-consumable",
  clientEn: "Booz Allen Hamilton Â· Trusted Environments",
  clientEs: "Booz Allen Hamilton Â· Trusted Environments",
  yearStart: 2025,
  yearEnd: "present",
  hookEn: "Slash-command skill that teaches an agent the DS from memory.",
  hookEs: "Skill de slash-command que enseÃ±a al agente el DS desde memoria.",
  bulletsEn: ["Recursive review scored 95.6", "17 parts Ã— 5 rounds"],
  bulletsEs: ["RevisiÃ³n recursiva scoreÃ³ 95.6", "17 partes Ã— 5 rondas"],
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
    expect(html).toContain("17 partes Ã— 5 rondas");
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

describe("renderTimeline", () => {
  const experienceFixture: Experience = {
    current: [
      {
        company: "Booz Allen Hamilton",
        role: "Design Engineer",
        startYear: 2025,
        endYear: "present",
        descriptionEn: "Consulting engagement.",
        descriptionEs: "ConsultorÃ­a.",
        stack: ["React"],
      },
    ],
    past: [
      {
        company: "Xentinels",
        role: "DesignOps Lead",
        startYear: 2021,
        endYear: 2023,
        descriptionEn: "Led DS migration.",
        descriptionEs: "LiderÃ© migraciÃ³n DS.",
        stack: ["Figma"],
      },
    ],
  };

  it("renders both current and past entries", () => {
    const html = renderTimeline(experienceFixture, "en");
    expect(html).toContain("Booz Allen Hamilton");
    expect(html).toContain("Xentinels");
  });

  it("marks current-job rows with a current class", () => {
    const html = renderTimeline(experienceFixture, "en");
    expect(html).toContain("lp-timeline__row--current");
  });

  it("shows 'Present' in EN and 'presente' in ES", () => {
    expect(renderTimeline(experienceFixture, "en")).toContain("Present");
    expect(renderTimeline(experienceFixture, "es")).toContain("presente");
  });
});

describe("renderTestimonialFeatured", () => {
  const verified: Testimonial = {
    quote: "Danilo is doing wonderful things.",
    quoteEs: "Danilo estÃ¡ haciendo cosas geniales.",
    author: "Jennifer Sheppard",
    role: "Product Lead Â· Developer Portal",
    company: "Booz Allen Hamilton",
    source: "verified",
  };

  it("renders the quote + attribution", () => {
    const html = renderTestimonialFeatured(verified, "en");
    expect(html).toContain("Danilo is doing wonderful things");
    expect(html).toContain("Jennifer Sheppard");
    expect(html).toContain("Product Lead");
    expect(html).toContain("Booz Allen Hamilton");
  });

  it("uses ES quote when lang=es and quoteEs is present", () => {
    const html = renderTestimonialFeatured(verified, "es");
    expect(html).toContain("cosas geniales");
    expect(html).not.toContain("Danilo is doing wonderful things");
  });

  it("renders a 'Verified' badge for verified source", () => {
    const html = renderTestimonialFeatured(verified, "en");
    expect(html).toContain("Verified");
    expect(html).toContain("lp-quote__badge--verified");
  });

  it("renders 'Verificado' badge in ES", () => {
    const html = renderTestimonialFeatured(verified, "es");
    expect(html).toContain("Verificado");
  });
});

describe("renderContactBlock", () => {
  it("renders mailto with the identity email", () => {
    const html = renderContactBlock(identityFixture, landingFixture, "en");
    expect(html).toContain('href="mailto:hi@example.com"');
  });

  it("renders a copy-email button with data-action", () => {
    const html = renderContactBlock(identityFixture, landingFixture, "en");
    expect(html).toContain('data-action="copy-email"');
    expect(html).toContain('data-email="hi@example.com"');
  });

  it("renders social links with external target + rel=noopener", () => {
    const html = renderContactBlock(identityFixture, landingFixture, "en");
    expect(html).toContain("LinkedIn");
    expect(html).toContain("GitHub");
    expect(html).toContain('rel="noopener"');
    expect(html).toContain('target="_blank"');
  });

  it("uses ES labels when lang=es", () => {
    const html = renderContactBlock(identityFixture, landingFixture, "es");
    expect(html).toContain("Trabajemos juntos");
    expect(html).toContain("Copiar email");
  });
});

describe("renderSectionVisual", () => {
  it("renders a variant-specific class and aria-hidden wrapper", () => {
    expect(renderSectionVisual("particles")).toContain("lp-visual--particles");
    expect(renderSectionVisual("grid")).toContain("lp-visual--grid");
    expect(renderSectionVisual("flow")).toContain("lp-visual--flow");
    expect(renderSectionVisual("timeline")).toContain("lp-visual--timeline");
    expect(renderSectionVisual("signature")).toContain("lp-visual--signature");
    expect(renderSectionVisual("particles")).toContain('aria-hidden="true"');
  });
});

describe("renderMeAgentDock", () => {
  it("is hidden by default (Phase 4+ placeholder)", () => {
    const html = renderMeAgentDock();
    expect(html).toContain('id="me-agent-dock"');
    expect(html).toContain("hidden");
    expect(html).toContain('aria-hidden="true"');
    expect(html).toContain('data-phase="reserved"');
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
    expect(html).toContain("Commits Â· 40 days");
  });

  it("uses ES labels when lang=es", () => {
    const html = renderProofNumbers(positioningFixture, "es");
    expect(html).toContain("AÃ±os entregando");
    expect(html).toContain("Commits Â· 40 dÃ­as");
  });
});
