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
