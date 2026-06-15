import { readFileSync, mkdirSync, copyFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadLandingData } from "./lib/load-data.js";
import { renderV11Landing } from "./templates/v11-landing/index.js";
import { renderStructuralLanding } from "./templates/v11-landing/structural.js";
import { renderCaseDetailPage } from "./templates/v11-landing/case-detail.js";
import { renderOgCardHtml } from "./templates/v11-landing/og-card.js";
import { renderOgImage } from "./lib/render-og.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");
const dataDir = path.join(projectRoot, "perfil", "data");
const tokensPath = path.join(projectRoot, "design-system", "tokens-web.css");
const distDir = path.join(projectRoot, "dist", "landing-v11");
const photoSrc = path.join(projectRoot, "perfil", "assets", "photo", "danilo.jpg");

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
  console.log(`[v11-landing] copied photo -> ${photoDest}`);
  return photoDest;
}

function copyAnimationAssets(): void {
  const src = path.join(projectRoot, "perfil", "assets", "animations");
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
  console.log(`[v11-landing] copied animation assets -> ${destRoot}`);
}

function copyFonts(): void {
  const src = path.join(projectRoot, "perfil", "assets", "fonts");
  if (!existsSync(src)) return;
  const destRoot = path.join(distDir, "assets", "fonts");
  mkdirSync(destRoot, { recursive: true });
  for (const entry of readdirSync(src)) {
    const fromPath = path.join(src, entry);
    if (statSync(fromPath).isDirectory()) continue;
    copyFileSync(fromPath, path.join(destRoot, entry));
  }
  console.log(`[v11-landing] copied fonts -> ${destRoot}`);
}

// Hand-maintained, unlisted tools served alongside the landing. They are public
// by direct URL, but intentionally not linked from the main landing.
// Their source lives outside dist/; this copy keeps dist fully regenerable.
const handTools: Array<{ src: string; destRel: string }> = [
  {
    src: path.join(projectRoot, "carrera", "daily", "index.html"),
    destRel: path.join("daily", "index.html"),
  },
  {
    src: path.join(projectRoot, "career-training", "ur-assessment", "index.html"),
    destRel: path.join("app", "index.html"),
  },
  {
    src: path.join(projectRoot, "carrera", "plan", "index.html"),
    destRel: path.join("plan", "index.html"),
  },
];

function copyHandTools(): void {
  for (const tool of handTools) {
    if (!existsSync(tool.src)) {
      throw new Error(`[v11-landing] hand tool source missing: ${tool.src}`);
    }
    const dest = path.join(distDir, tool.destRel);
    mkdirSync(path.dirname(dest), { recursive: true });
    copyFileSync(tool.src, dest);
    console.log(`[v11-landing] copied hand tool -> ${dest}`);
  }
}

async function buildOgImage(data: ReturnType<typeof loadLandingData>): Promise<void> {
  const photoBytes = readFileSync(photoSrc);
  const photoDataUrl = `data:image/jpeg;base64,${photoBytes.toString("base64")}`;
  const cardHtml = renderOgCardHtml({
    photoDataUrl,
    name: data.identity.name,
    role: data.identity.role,
    tagline: data.positioning.heroLine?.en ?? data.positioning.thesis.en,
    domain: "danilorojas.design",
    availability: data.identity.availability,
  });
  const outputPath = path.join(distDir, "og.png");
  await renderOgImage({ html: cardHtml, outputPath });
  console.log(`[v11-landing] wrote OG image -> ${outputPath}`);
}

async function main(): Promise<void> {
  console.log("[v11-landing] loading /perfil/data/ ...");
  const data = loadLandingData(dataDir);
  console.log(`[v11-landing] loaded ${data.cases.length} cases`);

  const tokensCss = readFileSync(tokensPath, "utf8");
  console.log(`[v11-landing] tokens-web.css = ${tokensCss.length} bytes`);

  mkdirSync(distDir, { recursive: true });

  await copyPhoto();
  copyAnimationAssets();
  copyFonts();
  copyHandTools();
  await buildOgImage(data);

  const ogImageUrl = `${SITE_ORIGIN}/og.png`;

  await emit(
    "index.html",
    renderStructuralLanding(data, "en", tokensCss, {
      photoHref: "assets/photo/danilo.jpg",
      ogImageUrl,
    }),
  );
  await emit(
    path.join("es", "index.html"),
    renderStructuralLanding(data, "es", tokensCss, {
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
