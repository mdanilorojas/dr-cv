import { describe, it, expect, beforeAll } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import { loadLandingData } from "../generadores/lib/load-data.js";
import { renderV11Landing } from "../generadores/templates/v11-landing/index.js";

const PROJECT_ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(PROJECT_ROOT, "perfil", "data");
const TOKENS_PATH = path.join(PROJECT_ROOT, "design-system", "tokens-web.css");

let htmlEn: string;
let htmlEs: string;

beforeAll(() => {
  const data = loadLandingData(DATA_DIR);
  const tokensCss = readFileSync(TOKENS_PATH, "utf8");
  const assets = {
    photoHref: "assets/photo/danilo.jpg",
    ogImageUrl: "https://danilorojas.design/og.png",
  };
  htmlEn = renderV11Landing(data, "en", tokensCss, assets);
  htmlEs = renderV11Landing(data, "es", tokensCss, assets);
});

describe("v11 horizon timeline â€” placement", () => {
  it("renders after hero and inside method (after notes) in EN", () => {
    const heroIdx = htmlEn.indexOf('id="top"');
    const notesIdx = htmlEn.indexOf('id="notes"');
    const methodIdx = htmlEn.indexOf('id="method"');
    const horizonIdx = htmlEn.indexOf('class="v11-horizon"');
    expect(heroIdx).toBeGreaterThan(-1);
    expect(notesIdx).toBeGreaterThan(heroIdx);
    // Method (which contains the horizon) comes after notes.
    expect(methodIdx).toBeGreaterThan(notesIdx);
    expect(horizonIdx).toBeGreaterThan(methodIdx);
  });

  it("renders after hero and inside method (after notes) in ES", () => {
    const heroIdx = htmlEs.indexOf('id="top"');
    const notesIdx = htmlEs.indexOf('id="notes"');
    const methodIdx = htmlEs.indexOf('id="method"');
    const horizonIdx = htmlEs.indexOf('class="v11-horizon"');
    expect(heroIdx).toBeGreaterThan(-1);
    expect(notesIdx).toBeGreaterThan(heroIdx);
    expect(methodIdx).toBeGreaterThan(notesIdx);
    expect(horizonIdx).toBeGreaterThan(methodIdx);
  });
});

describe("v11 horizon timeline â€” emphasized column", () => {
  it("investing column has data-emphasis=true", () => {
    const col = extractColumn(htmlEn, "investing");
    expect(col).toContain('data-emphasis="true"');
  });

  it("earned column does not have data-emphasis", () => {
    const col = extractColumn(htmlEn, "earned");
    expect(col).not.toContain('data-emphasis="true"');
  });
});

describe("v11 horizon timeline â€” investing chips are links", () => {
  it("all investing chips are <a> with non-empty href", () => {
    const col = extractColumn(htmlEn, "investing");
    const chips = extractChips(col);
    expect(chips.length).toBe(5);
    for (const chip of chips) {
      expect(chip).toMatch(/^<a [^>]*href="[^"]+"/);
    }
  });
});

describe("v11 horizon timeline â€” horizon column composition", () => {
  it("horizon column has exactly 2 evidence chips + 1 bet chip", () => {
    const col = extractColumn(htmlEn, "horizon");
    const chips = extractChips(col);
    expect(chips.length).toBe(3);
    const evidence = chips.filter((c) => c.includes('data-kind="evidence"'));
    const bets = chips.filter((c) => c.includes('data-kind="bet"'));
    expect(evidence.length).toBe(2);
    expect(bets.length).toBe(1);
  });

  it("bet chip has no href and has a visible bet badge", () => {
    const col = extractColumn(htmlEn, "horizon");
    const chips = extractChips(col);
    const bet = chips.find((c) => c.includes('data-kind="bet"'));
    expect(bet).toBeDefined();
    expect(bet!).not.toMatch(/href=/);
    expect(bet!).toContain('class="v11-horizon__bet-badge"');
  });
});

describe("v11 horizon timeline â€” past chips aria-label", () => {
  it("every earned chip has aria-label starting with Earned (EN)", () => {
    const col = extractColumn(htmlEn, "earned");
    const chips = extractChips(col);
    expect(chips.length).toBe(5);
    for (const chip of chips) {
      const match = chip.match(/aria-label="([^"]+)"/);
      expect(match).not.toBeNull();
      expect(match![1]).toMatch(/^Earned/);
    }
  });

  it("every earned chip has aria-label starting with Ganado (ES)", () => {
    const col = extractColumn(htmlEs, "earned");
    const chips = extractChips(col);
    expect(chips.length).toBe(5);
    for (const chip of chips) {
      const match = chip.match(/aria-label="([^"]+)"/);
      expect(match).not.toBeNull();
      expect(match![1]).toMatch(/^Ganado/);
    }
  });
});

describe("v11 horizon timeline â€” HTML budget", () => {
  it("EN output stays under 400k bytes", () => {
    expect(htmlEn.length).toBeLessThan(400_000);
  });
  it("ES output stays under 400k bytes", () => {
    expect(htmlEs.length).toBeLessThan(400_000);
  });
});

describe("v11 horizon timeline â€” internal anchor resolution", () => {
  it("every on-page href in the horizon section points to an id that exists in the HTML", () => {
    const section = extractHorizonSection(htmlEn);
    const anchors = Array.from(section.matchAll(/href="(#[^"]+)"/g)).map((m) => m[1]);
    expect(anchors.length).toBeGreaterThan(0);
    for (const anchor of anchors) {
      const idStr = `id="${anchor.slice(1)}"`;
      expect(htmlEn.includes(idStr), `missing id target for ${anchor}`).toBe(true);
    }
  });
});

// ---------- helpers ----------
function extractHorizonSection(html: string): string {
  const start = html.indexOf('class="v11-horizon"');
  if (start === -1) throw new Error("v11-horizon section not found");
  const end = html.indexOf("</section>", start);
  return html.slice(start, end);
}

function extractColumn(html: string, id: string): string {
  const marker = `data-horizon-col="${id}"`;
  const start = html.indexOf(marker);
  if (start === -1) throw new Error(`column ${id} not found`);
  // Stop at the next data-horizon-col marker or the closing </section> of the horizon block.
  const nextCol = html.indexOf("data-horizon-col=", start + marker.length);
  const endSection = html.indexOf("</section>", start);
  const end = nextCol !== -1 && nextCol < endSection ? nextCol : endSection;
  return html.slice(start, end);
}

function extractChips(columnHtml: string): string[] {
  // Match <a|span class="v11-horizon__chip" ...> ... </a|span>, allowing nested elements
  // (the bet chip contains a nested <span class="v11-horizon__bet-badge">).
  // We match greedily by tag depth using a simple state machine.
  const results: string[] = [];
  const openRe = /<(a|span)\b[^>]*class="[^"]*v11-horizon__chip[^"]*"[^>]*>/g;
  let m: RegExpExecArray | null;
  while ((m = openRe.exec(columnHtml)) !== null) {
    const tag = m[1];
    const start = m.index;
    // Find matching close tag, honoring nested same-tag opens
    let depth = 1;
    let cursor = openRe.lastIndex;
    const nestedRe = new RegExp(`<${tag}\\b[^>]*>|</${tag}>`, "g");
    nestedRe.lastIndex = cursor;
    while (depth > 0) {
      const nm = nestedRe.exec(columnHtml);
      if (!nm) throw new Error("chip without closing tag");
      if (nm[0].startsWith("</")) depth -= 1;
      else depth += 1;
      cursor = nestedRe.lastIndex;
    }
    results.push(columnHtml.slice(start, cursor));
    openRe.lastIndex = cursor;
  }
  return results;
}
