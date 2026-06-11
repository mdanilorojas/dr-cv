/**
 * Optimizes raw .png stills for landing-page case animations.
 *
 * For each .png in `perfil/assets/animations/<case>/`:
 *   - Resize to max 1200px wide (keeps aspect, no upscale).
 *   - Convert to .webp at quality 78.
 *   - Write alongside the original (original kept for reference).
 *
 * Run with: npx tsx generadores/lib/optimize-animation-stills.ts
 */
import { readdirSync, statSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(process.cwd(), "assets", "animations");

async function optimizeDir(dir: string): Promise<void> {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) {
      await optimizeDir(full);
      continue;
    }
    if (!entry.toLowerCase().endsWith(".png")) continue;
    const out = full.replace(/\.png$/i, ".webp");
    const img = sharp(full);
    const meta = await img.metadata();
    const pipeline =
      meta.width && meta.width > 1200
        ? img.resize({ width: 1200, withoutEnlargement: true })
        : img;
    const info = await pipeline.webp({ quality: 78 }).toFile(out);
    const before = statSync(full).size;
    console.log(
      `[anim] ${path.relative(ROOT, full)} â†’ ${path.relative(ROOT, out)}  ${(before / 1024).toFixed(0)}KB â†’ ${(info.size / 1024).toFixed(0)}KB  (${meta.width}Ã—${meta.height})`,
    );
  }
}

await optimizeDir(ROOT);
