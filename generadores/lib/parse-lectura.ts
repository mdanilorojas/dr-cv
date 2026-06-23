import { LecturaBlock, LecturaItem } from "./types.js";

export function parseLecturaMd(mdContent: string): LecturaBlock[] {
  const blocks: LecturaBlock[] = [];
  const lines = mdContent.split(/\r?\n/);
  let currentBlock: LecturaBlock | null = null;
  let currentItem: LecturaItem | null = null;
  let extractLines: string[] = [];
  let expectingLink = false;
  let inCodeBlock = false;

  const flushItem = () => {
    if (currentItem && currentBlock) {
      // Parse markdown formatting inside extract to HTML list items or paragraphs
      let rawExtract = extractLines.join("\n").trim();
      
      // Simple markdown list parser that ignores code blocks
      let inFormatCodeBlock = false;
      const formatted = rawExtract
        .split("\n")
        .map(line => {
          const trimmed = line.trim();
          if (trimmed.startsWith("```")) {
            inFormatCodeBlock = !inFormatCodeBlock;
            return line;
          }
          if (inFormatCodeBlock) {
            return line;
          }
          if (trimmed.startsWith("- ") || trimmed.startsWith("— ")) {
            return `<li>${trimmed.substring(2).trim()}</li>`;
          }
          return line;
        })
        .join("\n");
      
      // Wrap groups of <li> in <ul>
      let finalExtract = formatted;
      if (finalExtract.includes("<li>")) {
        // Wrap sequential <li> blocks in <ul>
        const parts = finalExtract.split("\n");
        let inList = false;
        const processed: string[] = [];
        for (const part of parts) {
          if (part.trim().startsWith("<li>")) {
            if (!inList) {
              processed.push("<ul>");
              inList = true;
            }
            processed.push(part);
          } else {
            if (inList) {
              processed.push("</ul>");
              inList = false;
            }
            processed.push(part);
          }
        }
        if (inList) processed.push("</ul>");
        finalExtract = processed.join("\n");
      }

      currentItem.extract = finalExtract;
      currentBlock.items.push(currentItem);
    }
    currentItem = null;
    extractLines = [];
    expectingLink = false;
    inCodeBlock = false;
  };

  const flushBlock = () => {
    flushItem();
    if (currentBlock) {
      blocks.push(currentBlock);
    }
    currentBlock = null;
  };

  for (const line of lines) {
    const trimmed = line.trim();

    // Track code blocks
    if (trimmed.startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      if (currentItem) {
        extractLines.push(line);
      }
      continue;
    }

    // If inside a code block, treat lines strictly as raw extract text
    if (inCodeBlock) {
      if (currentItem) {
        extractLines.push(line);
      }
      continue;
    }

    // Detect Block
    if (trimmed.startsWith("# BLOQUE") || trimmed.startsWith("# Bloque")) {
      flushBlock();
      const blockName = trimmed.replace(/^#\s*/, "").trim();
      // Standardize block formatting (e.g. replacing "BLOQUE 1 — " with "Bloque 1 · ")
      const cleanName = blockName
        .replace(/BLOQUE\s+(\d+)\s*—\s*/i, "Bloque $1 · ")
        .replace(/BLOQUE\s+(\d+)\s*-\s*/i, "Bloque $1 · ");
      currentBlock = {
        blockTitle: cleanName,
        items: []
      };
      continue;
    }

    // Detect generic top-level headers to flush the active block and stop parsing items
    if (trimmed.startsWith("# ") && !trimmed.startsWith("# BLOQUE") && !trimmed.startsWith("# Bloque")) {
      flushBlock();
      continue;
    }

    // Detect Item
    if (trimmed.startsWith("## ") && !trimmed.toLowerCase().includes("semana")) {
      // Only parse items if we are currently inside a block
      if (currentBlock) {
        flushItem();
        // Extract title (remove "## 1. " or "## ")
        const titleClean = trimmed.replace(/^##\s*(?:\d+\.\s*)?/, "").trim();
        currentItem = {
          title: titleClean,
          url: "",
          badge: "",
          time: "",
          extract: ""
        };
      }
      continue;
    }

    // Detect properties
    if (currentItem) {
      if (
        trimmed.startsWith("**Link:**") ||
        trimmed.startsWith("**Link :**") ||
        trimmed.startsWith("**Links:**") ||
        trimmed.startsWith("**Links :**")
      ) {
        const urlPart = trimmed.replace(/^\*\*Links?\s*:\*\*\s*/i, "").trim();
        if (urlPart) {
          currentItem.url = urlPart;
        } else {
          expectingLink = true;
        }
        continue;
      }
      if (trimmed.startsWith("**Prioridad:**")) {
        currentItem.badge = trimmed.replace(/^\*\*Prioridad:\*\*\s*/, "").trim();
        continue;
      }
      if (trimmed.startsWith("**Tiempo:**")) {
        currentItem.time = trimmed.replace(/^\*\*Tiempo:\*\*\s*/, "").trim();
        continue;
      }

      if (expectingLink) {
        const urlMatch = trimmed.match(/https?:\/\/[^\s]+(\s*|$)/);
        if (urlMatch) {
          currentItem.url = urlMatch[0].trim();
          expectingLink = false;
          continue;
        }
      }
      
      // Accumulate details for the extract (ignoring markdown horizontal rules and metadata tags)
      if (trimmed !== "---" && trimmed !== "") {
        extractLines.push(trimmed);
      }
    }
  }

  flushBlock();
  return blocks;
}
