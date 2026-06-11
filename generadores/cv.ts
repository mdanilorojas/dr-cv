import { readFileSync, mkdirSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadCvData } from "./lib/load-data.js";
import { renderPdf } from "./lib/render-pdf.js";
import { renderWarmCv } from "./templates/cv/warm.js";
import { renderSeriousCv } from "./templates/cv/serious.js";
import { renderBairesdevCv } from "./templates/cv/bairesdev.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");
const dataDir = path.join(projectRoot, "perfil", "data");
const tokensPath = path.join(projectRoot, "design-system", "tokens-print.css");
const distDir = path.join(projectRoot, "dist", "cvs");

async function emit(name: string, html: string): Promise<void> {
  const htmlPath = path.join(distDir, `${name}.html`);
  await writeFile(htmlPath, html);
  console.log(`[cv] wrote ${htmlPath} (${html.length} bytes)`);
  const pdfPath = path.join(distDir, `${name}.pdf`);
  await renderPdf({ html, outputPath: pdfPath });
  console.log(`[cv] wrote ${pdfPath}`);
}

async function main() {
  console.log("[cv] loading /perfil/data/ ...");
  const data = loadCvData(dataDir);
  console.log(`[cv] loaded ${data.cases.length} cases, ${data.experience.current.length} current + ${data.experience.past?.length ?? 0} past jobs`);

  const tokensCss = readFileSync(tokensPath, "utf8");
  console.log(`[cv] tokens-print.css = ${tokensCss.length} bytes`);

  mkdirSync(distDir, { recursive: true });

  await emit("cv-warm-en", renderWarmCv(data, "en", tokensCss));
  await emit("cv-warm-es", renderWarmCv(data, "es", tokensCss));
  await emit("cv-serious-en", renderSeriousCv(data, "en", tokensCss));
  await emit("cv-serious-es", renderSeriousCv(data, "es", tokensCss));
  await emit("cv-bairesdev-en", renderBairesdevCv(data));

  console.log("[cv] done.");
}

main().catch((err) => {
  console.error("[cv] FAILED:", err);
  process.exit(1);
});
