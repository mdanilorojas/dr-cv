import { writeFile } from "node:fs/promises";
import puppeteer from "puppeteer";

export interface RenderOgOptions {
  html: string;
  outputPath: string;
  width?: number;
  height?: number;
}

/**
 * Render an HTML string to a PNG file using headless Chromium.
 * Defaults to the standard Open Graph card dimensions (1200x630).
 */
export async function renderOgImage(opts: RenderOgOptions): Promise<void> {
  const width = opts.width ?? 1200;
  const height = opts.height ?? 630;

  const browser = await puppeteer.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width, height, deviceScaleFactor: 2 });
    await page.setContent(opts.html, { waitUntil: "networkidle0" });
    const pngBuffer = await page.screenshot({
      type: "png",
      omitBackground: false,
      clip: { x: 0, y: 0, width, height },
    });
    await writeFile(opts.outputPath, pngBuffer);
  } finally {
    await browser.close();
  }
}
