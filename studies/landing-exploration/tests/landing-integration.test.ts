import { describe, it, expect, beforeAll } from "vitest";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readFileSync } from "node:fs";
import { loadLandingData } from "../generators/lib/load-data.js";
import { renderLanding } from "../generators/templates/landing/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");
const dataDir = path.join(projectRoot, "data");
const tokensPath = path.join(projectRoot, "design-system", "tokens-landing.css");

describe("renderLanding — integration", () => {
  let data: ReturnType<typeof loadLandingData>;
  let tokensCss: string;
  let htmlEn: string;
  let htmlEs: string;

  beforeAll(() => {
    data = loadLandingData(dataDir);
    tokensCss = readFileSync(tokensPath, "utf8");
    htmlEn = renderLanding(data, "en", tokensCss);
    htmlEs = renderLanding(data, "es", tokensCss);
  });

  it("renders 5 tabpanels", () => {
    // Count actual <section> tags with role=tabpanel (exclude CSS + JS selector references).
    const panelCount = (htmlEn.match(/id="tabpanel-[a-z]+"/g) ?? []).length;
    expect(panelCount).toBe(5);
  });

  it("renders every case from /data/cases/*.md by title", () => {
    for (const c of data.cases) {
      expect(htmlEn).toContain(c.titleEn);
      expect(htmlEs).toContain(c.titleEs);
    }
  });

  it("renders the EN CTA 'Let&#39;s work together' and the ES 'Trabajemos juntos'", () => {
    expect(htmlEn).toContain("Let&#39;s work together");
    expect(htmlEs).toContain("Trabajemos juntos");
  });

  it("renders both verified testimonials by author name", () => {
    expect(htmlEn).toContain("Jennifer Sheppard");
    expect(htmlEn).toContain("Alexander Giraldez");
  });

  it("includes <html lang> matching the requested language", () => {
    expect(htmlEn).toMatch(/<html lang="en">/);
    expect(htmlEs).toMatch(/<html lang="es">/);
  });

  it("includes hreflang alternate links", () => {
    expect(htmlEn).toContain('hreflang="es"');
    expect(htmlEn).toContain('hreflang="en"');
    expect(htmlEs).toContain('hreflang="en"');
  });

  it("includes the live-dot in at least one panel", () => {
    expect(htmlEn).toContain("lp-live-dot");
    expect(htmlEs).toContain("lp-live-dot");
  });

  it("contains no scrub-list tokens (BAH internal URLs)", () => {
    const scrub = [
      "bah-ss-nonprod",
      "tecustomersuccess@bah.com",
      "etc.bah.com",
      "assistme.bah.com",
      "cmisbahprod.servicenowservices",
    ];
    for (const token of scrub) {
      expect(htmlEn.toLowerCase(), `EN output must not contain ${token}`).not.toContain(token.toLowerCase());
      expect(htmlEs.toLowerCase(), `ES output must not contain ${token}`).not.toContain(token.toLowerCase());
    }
  });

  it("stays under 400 KB uncompressed per language", () => {
    expect(htmlEn.length).toBeLessThan(400_000);
    expect(htmlEs.length).toBeLessThan(400_000);
  });

  it("embeds the landing tokens and styles inline (no <link rel=stylesheet>)", () => {
    expect(htmlEn).not.toContain("<link rel=\"stylesheet\"");
    expect(htmlEn).toContain("--accent:");
    expect(htmlEn).toContain(".lp-nav");
  });

  it("embeds the runtime script inline", () => {
    expect(htmlEn).toContain("<script>");
    expect(htmlEn).toContain("activateTab");
    // The runtime references copy-email via attribute selector.
    expect(htmlEn).toMatch(/data-action=["']copy-email["']/);
  });

  it("marks the default (overview) tab as aria-selected=true", () => {
    // One CSS selector reference is expected + exactly one rendered attribute.
    const cssRef = (htmlEn.match(/\[aria-selected="true"\]/g) ?? []).length;
    const attr   = (htmlEn.match(/\saria-selected="true"/g) ?? []).length;
    expect(cssRef).toBeGreaterThanOrEqual(1);
    expect(attr).toBe(1);
    expect(htmlEn).toMatch(/aria-selected="true"[^>]*aria-controls="tabpanel-overview"|aria-controls="tabpanel-overview"[^>]*aria-selected="true"/);
  });

  it("reserves the me-agent-dock placeholder (hidden) in Contact", () => {
    expect(htmlEn).toContain('id="me-agent-dock"');
    expect(htmlEn).toContain('data-phase="reserved"');
  });

  it("hides non-default tabpanels with the hidden attribute", () => {
    expect(htmlEn).toMatch(/id="tabpanel-work"[^>]*hidden/);
    expect(htmlEn).toMatch(/id="tabpanel-contact"[^>]*hidden/);
  });
});
