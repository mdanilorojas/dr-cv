import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseLecturaMd } from "../generadores/lib/parse-lectura.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const actualMdPath = path.join(__dirname, "..", "lectura", "ruta_lectura_product_design_ai_agents.md");

describe("parseLecturaMd", () => {
  it("parses blocks, items, priority badges, times, URLs and descriptions correctly from mock markdown", () => {
    const mockMd = `# BLOQUE 1 — Producto: juicio antes de herramientas\n\n**Objetivo:** recuperar el centro.\n\n## 1. Shape Up — Introduction\n\n**Link:** https://basecamp.com/shapeup/0.3-chapter-01  \n**Prioridad:** Must-read  \n**Tiempo:** 45–60 min\n\nShaping, riesgo, límites, ciclos.\n- Paso 1\n- Paso 2\n`;
    const result = parseLecturaMd(mockMd);
    expect(result).toHaveLength(1);
    expect(result[0].blockTitle).toBe("Bloque 1 · Producto: juicio antes de herramientas");
    expect(result[0].items).toHaveLength(1);
    expect(result[0].items[0].title).toBe("Shape Up — Introduction");
    expect(result[0].items[0].url).toBe("https://basecamp.com/shapeup/0.3-chapter-01");
    expect(result[0].items[0].badge).toBe("Must-read");
    expect(result[0].items[0].time).toBe("45–60 min");
    expect(result[0].items[0].extract).toContain("Shaping, riesgo, límites, ciclos.");
    expect(result[0].items[0].extract).toContain("<li>Paso 1</li>");
  });

  it("parses the actual lectura markdown file fully and correctly", () => {
    const actualMd = fs.readFileSync(actualMdPath, "utf-8");
    const blocks = parseLecturaMd(actualMd);

    // There should be exactly 7 blocks
    expect(blocks).toHaveLength(7);

    // Verify block titles are cleaned up and standardized
    expect(blocks[0].blockTitle).toBe("Bloque 1 · Producto: juicio antes de herramientas");
    expect(blocks[1].blockTitle).toBe("Bloque 2 · Fundamentos de agentes: entender el loop real");
    expect(blocks[2].blockTitle).toBe("Bloque 3 · Arquitectura práctica de agentes");
    expect(blocks[3].blockTitle).toBe("Bloque 4 · Herramientas que usas: Claude Code, Codex, Cursor");
    expect(blocks[4].blockTitle).toBe("Bloque 5 · Lo nuevo: loops, auto-research, harnesses, skills");
    expect(blocks[5].blockTitle).toBe("Bloque 6 · Product Design x Figma x AI-native UI");
    expect(blocks[6].blockTitle).toBe("Bloque 7 · Riesgos: velocidad sin mantenibilidad");

    // Let's verify some items in detail
    // Block 1, Item 1
    const shapeUp = blocks[0].items[0];
    expect(shapeUp.title).toBe("Shape Up — Introduction");
    expect(shapeUp.url).toBe("https://basecamp.com/shapeup/0.3-chapter-01");
    expect(shapeUp.badge).toBe("Must-read");
    expect(shapeUp.time).toBe("45–60 min");
    expect(shapeUp.extract).toContain("Por qué va primero:");
    expect(shapeUp.extract).toContain("<li>Cómo definir trabajo “bounded”.</li>");

    // Item 17 (OpenAI - Codex Product Page / Help) in Block 4
    // This item uses "**Links:**" plural on its own line followed by list items
    const codex = blocks[3].items.find(item => item.title.includes("Codex Product Page"));
    expect(codex).toBeDefined();
    expect(codex!.url).toBe("https://openai.com/codex/");

    // Item 25 (OpenAI - Deep Research) in Block 5
    const deepResearch = blocks[4].items.find(item => item.title.includes("Deep Research"));
    expect(deepResearch).toBeDefined();
    expect(deepResearch!.url).toBe("https://openai.com/index/introducing-deep-research/");
    expect(deepResearch!.badge).toBe("Must-read para auto-research");
    expect(deepResearch!.time).toBe("45–60 min");

    // Ensure all items across all blocks have basic required data parsed
    for (const block of blocks) {
      expect(block.blockTitle).not.toContain("#");
      expect(block.items.length).toBeGreaterThan(0);
      for (const item of block.items) {
        expect(item.title).toBeTruthy();
        expect(item.url).toBeTruthy();
        expect(item.badge).toBeTruthy();
        expect(item.time).toBeTruthy();
        expect(item.extract).toBeTruthy();
        // Make sure no headings or section marks leaked into titles
        expect(item.title.startsWith("##")).toBe(false);
        // Make sure metadata didn't leak into the extract plain text
        expect(item.extract).not.toContain("**Link:**");
        expect(item.extract).not.toContain("**Prioridad:**");
        expect(item.extract).not.toContain("**Tiempo:**");
      }
    }
  });
});
