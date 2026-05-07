import { writeFile } from "node:fs/promises";
import puppeteer from "puppeteer";

export interface RenderPdfOptions {
  html: string;
  outputPath: string;
}

/**
 * Render an HTML string to a PDF file using headless Chromium.
 * Uses A4 format with zero margins because the HTML already has A4 padding.
 */
export async function renderPdf(opts: RenderPdfOptions): Promise<void> {
  const browser = await puppeteer.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.setContent(opts.html, { waitUntil: "networkidle0" });
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
      preferCSSPageSize: true,
    });
    await writeFile(opts.outputPath, pdfBuffer);
  } finally {
    await browser.close();
  }
}
