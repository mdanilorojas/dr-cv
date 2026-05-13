import { readFileSync, mkdirSync, copyFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadLandingData } from "./lib/load-data.js";
import { renderV11Landing } from "./templates/v11-landing/index.js";
import { renderCaseDetailPage } from "./templates/v11-landing/case-detail.js";
import { renderOgCardHtml } from "./templates/v11-landing/og-card.js";
import { renderOgImage } from "./lib/render-og.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");
const dataDir = path.join(projectRoot, "data");
const tokensPath = path.join(projectRoot, "design-system", "tokens-v11.css");
const distDir = path.join(projectRoot, "dist", "landing-v11");
const photoSrc = path.join(projectRoot, "assets", "photo", "danilo.jpg");

const MAX_HTML_BYTES = 400_000;
const SITE_ORIGIN = "https://danilorojas.design";

async function emit(relPath: string, html: string): Promise<void> {
  if (html.length > MAX_HTML_BYTES) {
    throw new Error(`[v11-landing] ${relPath} is ${html.length} bytes (> ${MAX_HTML_BYTES} budget)`);
  }
  const fullPath = path.join(distDir, relPath);
  mkdirSync(path.dirname(fullPath), { recursive: true });
  await writeFile(fullPath, html);
  console.log(`[v11-landing] wrote ${fullPath} (${html.length} bytes)`);
}

async function copyPhoto(): Promise<string> {
  const photoDestDir = path.join(distDir, "assets", "photo");
  const photoDest = path.join(photoDestDir, "danilo.jpg");
  mkdirSync(photoDestDir, { recursive: true });
  copyFileSync(photoSrc, photoDest);
  console.log(`[v11-landing] copied photo → ${photoDest}`);
  return photoDest;
}

function copyAnimationAssets(): void {
  const src = path.join(projectRoot, "assets", "animations");
  if (!existsSync(src)) return;
  const destRoot = path.join(distDir, "assets", "animations");
  function recurse(from: string, to: string): void {
    mkdirSync(to, { recursive: true });
    for (const entry of readdirSync(from)) {
      const fromPath = path.join(from, entry);
      const toPath = path.join(to, entry);
      if (statSync(fromPath).isDirectory()) {
        recurse(fromPath, toPath);
      } else {
        copyFileSync(fromPath, toPath);
      }
    }
  }
  recurse(src, destRoot);
  console.log(`[v11-landing] copied animation assets → ${destRoot}`);
}

async function buildOgImage(): Promise<void> {
  const photoBytes = readFileSync(photoSrc);
  const photoDataUrl = `data:image/jpeg;base64,${photoBytes.toString("base64")}`;
  const cardHtml = renderOgCardHtml({
    photoDataUrl,
    name: "Danilo Rojas",
    role: "Agentic Designer · Product Engineer",
    tagline: "A point of view on agentic design, not a résumé.",
    domain: "danilorojas.design",
  });
  const outputPath = path.join(distDir, "og.png");
  await renderOgImage({ html: cardHtml, outputPath });
  console.log(`[v11-landing] wrote OG image → ${outputPath}`);
}

async function main(): Promise<void> {
  console.log("[v11-landing] loading /data/ …");
  const data = loadLandingData(dataDir);
  console.log(`[v11-landing] loaded ${data.cases.length} cases`);

  const tokensCss = readFileSync(tokensPath, "utf8");
  console.log(`[v11-landing] tokens-v11.css = ${tokensCss.length} bytes`);

  mkdirSync(distDir, { recursive: true });

  await copyPhoto();
  copyAnimationAssets();
  await buildOgImage();

  const ogImageUrl = `${SITE_ORIGIN}/og.png`;

  await emit(
    "index.html",
    renderV11Landing(data, "en", tokensCss, {
      photoHref: "assets/photo/danilo.jpg",
      ogImageUrl,
    }),
  );
  await emit(
    path.join("es", "index.html"),
    renderV11Landing(data, "es", tokensCss, {
      photoHref: "../assets/photo/danilo.jpg",
      ogImageUrl,
    }),
  );

  // Per-case detail pages (EN + ES).
  for (const c of data.cases) {
    const enPath = path.join("work", c.slug, "index.html");
    const esPath = path.join("es", "work", c.slug, "index.html");
    await emit(
      enPath,
      renderCaseDetailPage({
        data,
        caseData: c,
        lang: "en",
        tokensCss,
        assets: { photoHref: "../../assets/photo/danilo.jpg", ogImageUrl },
      }),
    );
    await emit(
      esPath,
      renderCaseDetailPage({
        data,
        caseData: c,
        lang: "es",
        tokensCss,
        assets: { photoHref: "../../../assets/photo/danilo.jpg", ogImageUrl },
      }),
    );
  }

  console.log("[v11-landing] done.");
}

main().catch((err) => {
  console.error("[v11-landing] FAILED:", err);
  process.exit(1);
});
