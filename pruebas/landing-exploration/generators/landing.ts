import { readFileSync, mkdirSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadLandingData } from "./lib/load-data.js";
import { renderLanding } from "./templates/landing/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");
const dataDir = path.join(projectRoot, "data");
const tokensPath = path.join(projectRoot, "design-system", "tokens-landing.css");
const distDir = path.join(projectRoot, "dist", "landing");

const MAX_HTML_BYTES = 400_000;

async function emit(relPath: string, html: string): Promise<void> {
  if (html.length > MAX_HTML_BYTES) {
    throw new Error(`[landing] ${relPath} is ${html.length} bytes (> ${MAX_HTML_BYTES} budget)`);
  }
  const fullPath = path.join(distDir, relPath);
  mkdirSync(path.dirname(fullPath), { recursive: true });
  await writeFile(fullPath, html);
  console.log(`[landing] wrote ${fullPath} (${html.length} bytes)`);
}

async function main(): Promise<void> {
  console.log("[landing] loading /data/ …");
  const data = loadLandingData(dataDir);
  console.log(`[landing] loaded ${data.cases.length} cases, ${data.landing.tabs.length} tabs`);

  const tokensCss = readFileSync(tokensPath, "utf8");
  console.log(`[landing] tokens-landing.css = ${tokensCss.length} bytes`);

  mkdirSync(distDir, { recursive: true });

  await emit("index.html", renderLanding(data, "en", tokensCss));
  await emit(path.join("es", "index.html"), renderLanding(data, "es", tokensCss));

  console.log("[landing] done.");
}

main().catch((err) => {
  console.error("[landing] FAILED:", err);
  process.exit(1);
});
