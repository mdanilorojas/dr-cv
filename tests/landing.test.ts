import { describe, it, expect } from "vitest";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadLandingData } from "../generadores/lib/load-data.js";
import { renderV11Landing } from "../generadores/templates/v11-landing/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, "..", "perfil", "data");
const tokens = "";

function html(lang: "en" | "es"): string {
  const data = loadLandingData(dataDir);
  return renderV11Landing(data, lang, tokens, {
    photoHref: "x.jpg",
    ogImageUrl: "https://x/og.png",
  });
}

describe("landing redesign", () => {
  const en = html("en");
  const es = html("es");

  it("renders the new hero line", () => {
    expect(en).toContain("complex systems");
    expect(es).toContain("sistemas complejos");
  });

  it("renders the text-only trust strip", () => {
    expect(en).toContain("Booz Allen Hamilton");
    expect(en).toContain("Juan Valdez");
    expect(en).toContain("Pichincha Bank");
    expect(es).toContain("Banco Pichincha");
  });

  it("renders the four proof numbers from data", () => {
    expect(en).toContain("18");
    expect(en).toContain("15");
    expect(en).toContain("50");
    expect(en).toContain("FAA, DoD &amp; VA");
  });

  it("renders the two POV notes", () => {
    expect(en).toContain("Most teams do not lack solutions");
    expect(en).toContain("Handoff is where judgment disappears");
    expect(es).toContain("A la mayoría de los equipos no les faltan soluciones");
  });

  it("leads with thinking — Notes section precedes Method and About", () => {
    const notesIdx = en.indexOf('id="notes"');
    const methodIdx = en.indexOf('id="method"');
    const aboutIdx = en.indexOf('id="about"');
    expect(notesIdx).toBeGreaterThan(-1);
    expect(methodIdx).toBeGreaterThan(notesIdx);
    expect(aboutIdx).toBeGreaterThan(methodIdx);
  });

  it("has no stale positioning copy", () => {
    for (const bad of [
      "Agentic Designer",
      "Staff / Principal",
      "$250",
      "Fifteen years",
      "fifteen years shipping",
    ]) {
      expect(en).not.toContain(bad);
      expect(es).not.toContain(bad);
    }
  });

  it("has no UTF-8 mojibake", () => {
    for (const bad of ["Â·", "Ã©", "Ã±", "â€”", "â†’", "rÃ©sumÃ©"]) {
      expect(en).not.toContain(bad);
      expect(es).not.toContain(bad);
    }
  });

  it("uses no Google Fonts CDN (self-hosted)", () => {
    expect(en).not.toContain("fonts.googleapis");
    expect(en).not.toContain("fonts.gstatic");
  });

  // Work-section case content is a deferred follow-up (interview-built).
  // The "EnRegla" brand must be removed per the unbranding decision once
  // cases are refreshed; tracked here so it is not forgotten.
  it.todo("Work cases carry no retired brand names (pending case refresh)");
});
