import { describe, it, expect } from "vitest";
import { renderSeriousCv } from "../generators/templates/cv/serious.js";
import { loadCvData } from "../generators/lib/load-data.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readFileSync } from "node:fs";

const here = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(here, "..", "data");
const tokensPath = path.join(here, "..", "design-system", "tokens.css");
const tokensCss = readFileSync(tokensPath, "utf8");

function bodyOnly(html: string): string {
  const m = /<body>([\s\S]*?)<\/body>/i.exec(html);
  return m ? m[1] : html;
}

describe("renderSeriousCv", () => {
  const data = loadCvData(dataDir);

  it("does NOT include the live dot", () => {
    const html = renderSeriousCv(data, "en", tokensCss);
    const body = bodyOnly(html);
    expect(body).not.toContain("cv-identity__live-dot");
  });

  it("featured case uses accent border, not dark fill", () => {
    const html = renderSeriousCv(data, "en", tokensCss);
    const body = bodyOnly(html);
    expect(body).toContain("cv-case--accent-border");
    expect(body).not.toContain("cv-case--dark");
  });

  it("renders only 2 verified testimonials, no attributed", () => {
    const html = renderSeriousCv(data, "en", tokensCss);
    const body = bodyOnly(html);
    const verified = (body.match(/cv-testimonial__badge--verified/g) || []).length;
    const attributed = (body.match(/cv-testimonial__badge--attributed/g) || []).length;
    expect(verified).toBe(2);
    expect(attributed).toBe(0);
  });

  it("uses 'Professional Summary' eyebrow in EN", () => {
    const html = renderSeriousCv(data, "en", tokensCss);
    expect(html).toContain("Professional Summary");
  });

  it("renders 4 case cards", () => {
    const html = renderSeriousCv(data, "en", tokensCss);
    const body = bodyOnly(html);
    const caseCount = (body.match(/class="cv-case /g) || []).length;
    expect(caseCount).toBeGreaterThanOrEqual(4);
  });
});
