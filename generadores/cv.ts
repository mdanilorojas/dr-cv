import { mkdirSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadCvData } from "./lib/load-data.js";
import { renderPdf } from "./lib/render-pdf.js";
import { renderCleanCv } from "./templates/cv/clean.js";
import { renderAtsCv } from "./templates/cv/ats.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");
const dataDir = path.join(projectRoot, "perfil", "data");
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

  mkdirSync(distDir, { recursive: true });

  await emit("cv-clean-en", renderCleanCv(data, "en"));
  await emit("cv-clean-es", renderCleanCv(data, "es"));

  // Versión ATS fechada 2026-07-02: todos los [DATO: ...] resueltos contra fact-bank — enviable.
  await emit("cv-ats-2026-07-02-en", renderAtsCv(data, "en"));
  await emit("cv-ats-2026-07-02-es", renderAtsCv(data, "es"));

  console.log("[cv] done.");
}

main().catch((err) => {
  console.error("[cv] FAILED:", err);
  process.exit(1);
});
