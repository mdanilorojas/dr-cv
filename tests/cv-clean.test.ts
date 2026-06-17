import { describe, it, expect } from "vitest";
import { renderCleanCv } from "../generadores/templates/cv/clean.js";
import { loadCvData } from "../generadores/lib/load-data.js";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dataDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "perfil", "data");
const data = loadCvData(dataDir);

describe("renderCleanCv (EN)", () => {
  const html = renderCleanCv(data, "en");

  it("is a single-page A4 document with the right lang", () => {
    expect(html).toContain("<!doctype html>");
    expect(html).toContain('<html lang="en">');
    expect(html).toContain("@page");          // print sizing present
    expect(html).toContain("A4");
  });

  it("renders identity and the hero-mirroring lead", () => {
    expect(html).toContain("Danilo Rojas");
    expect(html).toContain("complex, regulated environments");
    expect(html).toContain("danilorojas.design");
  });

  it("renders the selected experience with companies and badges", () => {
    expect(html).toContain("Booz Allen Hamilton");
    expect(html).toContain("Compliance SaaS");
    expect(html).toContain("Xentinels DesignOps");
  });

  it("renders capabilities and education", () => {
    expect(html).toContain("Design Systems");
    expect(html).toContain("Escuela Politécnica Nacional");
  });

  it("does NOT render the proof-numbers row", () => {
    // the landing's metric labels must not appear in the sober CV
    expect(html).not.toContain("Years building products");
  });
});

describe("renderCleanCv (ES)", () => {
  const html = renderCleanCv(data, "es");
  it("localizes the lead and section headings", () => {
    expect(html).toContain('<html lang="es">');
    expect(html).toContain("entornos complejos y regulados");
    expect(html).toContain("Experiencia");
    expect(html).toContain("Educación");
  });
  it("localizes role summaries", () => {
    expect(html).toContain("Co-fundador y Líder de Diseño de Producto");
  });
});
