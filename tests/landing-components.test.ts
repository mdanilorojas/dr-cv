import { describe, it, expect } from "vitest";
import { renderTabNav } from "../generators/templates/landing/components/tab-nav.js";
import type { Landing } from "../generators/lib/types.js";

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
