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
