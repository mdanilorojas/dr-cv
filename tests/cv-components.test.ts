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
