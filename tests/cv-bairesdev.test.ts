import { describe, it, expect } from "vitest";
import { renderBairesdevCv } from "../generators/templates/cv/bairesdev.js";
import { loadCvData } from "../generators/lib/load-data.js";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(here, ".." , "data");

function bodyOnly(html: string): string {
  const m = /<body>([\s\S]*?)<\/body>/i.exec(html);
  return m ? m[1] : html;
}

describe("renderBairesdevCv", () => {
  const data = loadCvData(dataDir);

  it("does NOT contain Agentic Designer in the role line", () => {
    const html = renderBairesdevCv(data);
    const body = bodyOnly(html);
    const identityMatch = body.match(/cv-identity__role[^>]*>([^<]+)</);
    expect(identityMatch).toBeTruthy();
    expect(identityMatch![1]).not.toContain("Agentic Designer");
    expect(identityMatch![1]).toContain("Product Designer");
  });

  it("does NOT import tokens.css — sets inline grayscale tokens", () => {
    const html = renderBairesdevCv(data);
    // bairesdev must not contain the signature warm orange #FF8964
    expect(html).not.toContain("#FF8964");
    expect(html).not.toContain("FFAA81");
  });

  it("does NOT render any testimonials", () => {
    const html = renderBairesdevCv(data);
    const body = bodyOnly(html);
    expect(body).not.toContain("cv-testimonial__quote");
  });

  it("does NOT include the live dot", () => {
    const html = renderBairesdevCv(data);
    const body = bodyOnly(html);
    expect(body).not.toContain("cv-identity__live-dot");
  });

  it("renders exactly 2 case cards (not 4)", () => {
    const html = renderBairesdevCv(data);
    const body = bodyOnly(html);
    const caseCount = (body.match(/class="cv-case /g) || []).length;
    expect(caseCount).toBe(2);
  });

  it("is English only (role label in English)", () => {
    const html = renderBairesdevCv(data);
    expect(html).toContain("Professional Summary");
    expect(html).toContain("Education");
  });

  it("renders the agentic-forward thesis (not the generic one)", () => {
    const html = renderBairesdevCv(data);
    expect(html).toContain("Agentic Designer.");
    expect(html).toContain("15 years delivering product");
    expect(html).toContain("agents as force multiplier");
    expect(html).not.toContain("I ship real products — and I ship the tools");
  });

  it("renders a skills inventory section with ≥ 20 rows", () => {
    const html = renderBairesdevCv(data);
    expect(html).toMatch(/<section\s+class="cv-inventory/);
    const rowMatches = html.match(/class="cv-inventory__row"/g) ?? [];
    expect(rowMatches.length).toBeGreaterThanOrEqual(20);
  });

  it("renders the inventory section INSIDE page 2 (after the second <article>)", () => {
    const html = renderBairesdevCv(data);
    const pageBoundaries = [...html.matchAll(/<article class="cv-page"/g)].map((m) => m.index ?? -1);
    expect(pageBoundaries.length).toBe(2);
    const inventoryIdx = html.indexOf('class="cv-inventory');
    expect(inventoryIdx).toBeGreaterThan(pageBoundaries[1]);
  });

  it("puts Agents group before Design group in the sidebar", () => {
    const html = renderBairesdevCv(data);
    const agentsGroupMatch = html.match(/<h4 class="cv-skills__group-title">Agents<\/h4>/);
    const designGroupMatch = html.match(/<h4 class="cv-skills__group-title">Design<\/h4>/);
    expect(agentsGroupMatch).toBeTruthy();
    expect(designGroupMatch).toBeTruthy();
    const agentsIdx = agentsGroupMatch!.index!;
    const designIdx = designGroupMatch!.index!;
    expect(agentsIdx).toBeLessThan(designIdx);
  });
});
