import { readFileSync, mkdirSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadLandingData } from "./lib/load-data.js";
import { renderHulyLanding } from "./templates/huly-landing/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");
const dataDir = path.join(projectRoot, "data");
const tokensPath = path.join(projectRoot, "tokens-huly.css");
const distDir = path.join(projectRoot, "dist", "landing-huly");

const MAX_HTML_BYTES = 500_000;

async function emit(relPath: string, html: string): Promise<void> {
  if (html.length > MAX_HTML_BYTES) {
    throw new Error(`[huly-landing] ${relPath} is ${html.length} bytes (> ${MAX_HTML_BYTES} budget)`);
  }
  const fullPath = path.join(distDir, relPath);
  mkdirSync(path.dirname(fullPath), { recursive: true });
  await writeFile(fullPath, html);
  console.log(`[huly-landing] wrote ${fullPath} (${html.length} bytes)`);
}

async function main(): Promise<void> {
  console.log("[huly-landing] loading /data/ …");
  const data = loadLandingData(dataDir);
  console.log(`[huly-landing] loaded ${data.cases.length} cases`);

  const tokensCss = readFileSync(tokensPath, "utf8");
  console.log(`[huly-landing] tokens-huly.css = ${tokensCss.length} bytes`);

  mkdirSync(distDir, { recursive: true });

  await emit("index.html", renderHulyLanding(data, "en", tokensCss));
  await emit(path.join("es", "index.html"), renderHulyLanding(data, "es", tokensCss));

  console.log("[huly-landing] done.");
}

main().catch((err) => {
  console.error("[huly-landing] FAILED:", err);
  process.exit(1);
});
