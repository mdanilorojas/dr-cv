import { describe, it, expect } from "vitest";
import { loadSkills, loadAllData, DataLoadError } from "../generators/lib/load-data.js";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixtureDir = path.join(__dirname, "fixtures");
const fixtureBadDir = path.join(__dirname, "fixtures-bad");
const dataDir = path.join(__dirname, "..", "data");

describe("loadSkills", () => {
  it("loads and parses a minimal skills YAML file", () => {
    const skillsPath = path.join(fixtureDir, "minimal-skills.yaml");
    const skills = loadSkills(skillsPath);
    expect(skills.byLayer.name).toBe("Test A");
    expect(skills.byLayer.groups).toHaveLength(1);
    expect(skills.byLayer.groups[0].skills).toHaveLength(2);
    expect(skills.byLayer.groups[0].skills[0].level).toBe("mastered");
    expect(skills.byLayer.groups[0].skills[1].level).toBe("learning");
    expect(skills.byOutcome.groups).toHaveLength(1);
  });

  it("throws DataLoadError when file does not exist", () => {
    expect(() => loadSkills("nonexistent.yaml")).toThrow(DataLoadError);
  });

  it("throws DataLoadError when schema is violated (missing byLayer)", () => {
    const skillsPath = path.join(fixtureBadDir, "no-bylayer.yaml");
    expect(() => loadSkills(skillsPath)).toThrow(DataLoadError);
  });
});

describe("loadAllData", () => {
  it("loads the real /data/ directory without errors", () => {
    const data = loadAllData(dataDir);
    expect(data.identity.name).toBe("Danilo Rojas");
    expect(data.skills.byLayer.groups.length).toBeGreaterThan(0);
    expect(data.skills.byOutcome.groups.length).toBeGreaterThan(0);
    expect(data.experience.current.length).toBeGreaterThan(0);
    expect(data.clients.length).toBeGreaterThan(0);
    expect(data.testimonials.length).toBeGreaterThan(0);
  });
});
