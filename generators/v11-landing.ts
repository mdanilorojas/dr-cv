import { readFileSync, mkdirSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadLandingData } from "./lib/load-data.js";
import { renderV11Landing } from "./templates/v11-landing/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");
const dataDir = path.join(projectRoot, "data");
const tokensPath = path.join(projectRoot, "design-system", "tokens-v11.css");
const distDir = path.join(projectRoot, "dist", "landing-v11");

const MAX_HTML_BYTES = 400_000;

async function emit(relPath: string, html: string): Promise<void> {
  if (html.length > MAX_HTML_BYTES) {
    throw new Error(`[v11-landing] ${relPath} is ${html.length} bytes (> ${MAX_HTML_BYTES} budget)`);
  }
  const fullPath = path.join(distDir, relPath);
  mkdirSync(path.dirname(fullPath), { recursive: true });
  await writeFile(fullPath, html);
  console.log(`[v11-landing] wrote ${fullPath} (${html.length} bytes)`);
}

async function main(): Promise<void> {
  console.log("[v11-landing] loading /data/ …");
  const data = loadLandingData(dataDir);
  console.log(`[v11-landing] loaded ${data.cases.length} cases`);

  const tokensCss = readFileSync(tokensPath, "utf8");
  console.log(`[v11-landing] tokens-v11.css = ${tokensCss.length} bytes`);

  mkdirSync(distDir, { recursive: true });

  await emit("index.html", renderV11Landing(data, "en", tokensCss));
  await emit(path.join("es", "index.html"), renderV11Landing(data, "es", tokensCss));

  console.log("[v11-landing] done.");
}

main().catch((err) => {
  console.error("[v11-landing] FAILED:", err);
  process.exit(1);
});
