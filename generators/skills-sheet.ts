import { readFileSync, mkdirSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadAllData } from "./lib/load-data.js";
import { renderSkillsSheet } from "./templates/skills-sheet.js";
import { renderPdf } from "./lib/render-pdf.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");
const dataDir = path.join(projectRoot, "data");
const tokensPath = path.join(projectRoot, "design-system", "tokens.css");
const distDir = path.join(projectRoot, "dist");

async function main() {
  console.log("[skills-sheet] loading data from /data/ …");
  const data = loadAllData(dataDir);
  console.log(`[skills-sheet] loaded ${data.skills.byLayer.groups.length} layer groups, ${data.skills.byOutcome.groups.length} outcome groups`);

  const tokensCss = readFileSync(tokensPath, "utf8");
  console.log(`[skills-sheet] loaded tokens.css (${tokensCss.length} bytes)`);

  mkdirSync(distDir, { recursive: true });

  // render EN first (primary)
  const htmlEn = renderSkillsSheet(data, "en", tokensCss);
  const htmlEnPath = path.join(distDir, "skills-sheet-en.html");
  await writeFile(htmlEnPath, htmlEn);
  console.log(`[skills-sheet] wrote ${htmlEnPath} (${htmlEn.length} bytes)`);

  const pdfEnPath = path.join(distDir, "skills-sheet-en.pdf");
  await renderPdf({ html: htmlEn, outputPath: pdfEnPath });
  console.log(`[skills-sheet] wrote ${pdfEnPath}`);

  // render ES
  const htmlEs = renderSkillsSheet(data, "es", tokensCss);
  const htmlEsPath = path.join(distDir, "skills-sheet-es.html");
  await writeFile(htmlEsPath, htmlEs);
  console.log(`[skills-sheet] wrote ${htmlEsPath} (${htmlEs.length} bytes)`);

  const pdfEsPath = path.join(distDir, "skills-sheet-es.pdf");
  await renderPdf({ html: htmlEs, outputPath: pdfEsPath });
  console.log(`[skills-sheet] wrote ${pdfEsPath}`);

  console.log("[skills-sheet] done.");
}

main().catch((err) => {
  console.error("[skills-sheet] FAILED:", err);
  process.exit(1);
});
