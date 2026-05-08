import { describe, it, expect } from "vitest";
import { renderTabNav } from "../generators/templates/landing/components/tab-nav.js";
import { renderHeroBlock } from "../generators/templates/landing/components/hero-block.js";
import { renderProofNumbers } from "../generators/templates/landing/components/proof-numbers.js";
import type { Landing, Identity, Positioning } from "../generators/lib/types.js";

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
