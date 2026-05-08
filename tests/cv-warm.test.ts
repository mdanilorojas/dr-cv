import { describe, it, expect } from "vitest";
import { renderWarmCv } from "../generators/templates/cv/warm.js";
import { loadCvData } from "../generators/lib/load-data.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readFileSync } from "node:fs";

const here = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(here, "..", "data");
const tokensPath = path.join(here, "..", "design-system", "tokens.css");
const tokensCss = readFileSync(tokensPath, "utf8");

describe("renderWarmCv", () => {
  const data = loadCvData(dataDir);

  it("returns a full HTML document", () => {
    const html = renderWarmCv(data, "en", tokensCss);
    expect(html).toMatch(/^<!doctype html>/i);
    expect(html).toContain("<html");
    expect(html).toContain("</html>");
  });

  it("includes the live dot signature", () => {
    const html = renderWarmCv(data, "en", tokensCss);
    expect(html).toContain("cv-identity__live-dot");
  });

  it("includes orange accent variable", () => {
    const html = renderWarmCv(data, "en", tokensCss);
    expect(html).toContain("--accent:");
    expect(html).toContain("#FF8964");
  });

  it("renders 4 case cards with first being featured dark", () => {
    const html = renderWarmCv(data, "en", tokensCss);
    const caseCount = (html.match(/class="cv-case /g) || []).length;
    expect(caseCount).toBeGreaterThanOrEqual(4);
    expect(html).toContain("cv-case--dark");
  });

  it("renders 2 verified + 3 attributed testimonials", () => {
    const html = renderWarmCv(data, "en", tokensCss);
    const verified = (html.match(/cv-testimonial__badge--verified/g) || []).length;
    const attributed = (html.match(/cv-testimonial__badge--attributed/g) || []).length;
    expect(verified).toBe(2);
    expect(attributed).toBe(3);
  });

  it("generates ES version with Spanish thesis", () => {
    const html = renderWarmCv(data, "es", tokensCss);
    expect(html).toContain("Entrego productos reales");
  });
});
