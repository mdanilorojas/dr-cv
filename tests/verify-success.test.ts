import { describe, it, expect } from "vitest";
import { loadAllData } from "../generadores/lib/load-data.js";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(here, "..", "perfil", "data");

describe("success criteria", () => {
  const data = loadAllData(dataDir);

  it("criterion 1: dual-taxonomy structure is complete", () => {
    expect(data.skills.byLayer.groups).toHaveLength(4);
    expect(data.skills.byOutcome.groups).toHaveLength(4);
    const layerTitles = data.skills.byLayer.groups.map(g => g.title);
    expect(layerTitles).toEqual(["Strategy", "Design", "Engineering", "Agents"]);
    const outcomeTitles = data.skills.byOutcome.groups.map(g => g.title);
    expect(outcomeTitles).toEqual(["Discovery", "Build", "Ship", "Scale"]);
  });

  it("criterion 5: both mastered and learning are present", () => {
    const allSkills = [
      ...data.skills.byLayer.groups.flatMap(g => g.skills),
      ...data.skills.byOutcome.groups.flatMap(g => g.skills),
    ];
    expect(allSkills.some(s => s.level === "mastered")).toBe(true);
    expect(allSkills.some(s => s.level === "learning")).toBe(true);
  });

  it("has 8 enterprise clients", () => {
    expect(data.clients).toHaveLength(8);
  });

  it("has at least 2 verified testimonials, all sourced as verified", () => {
    expect(data.testimonials.length).toBeGreaterThanOrEqual(2);
    expect(data.testimonials.every(t => t.source === "verified")).toBe(true);
  });
});
