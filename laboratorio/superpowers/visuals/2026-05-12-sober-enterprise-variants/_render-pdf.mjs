// One-off PDF renderer for sober-enterprise variants.
// Run: node docs/superpowers/visuals/2026-05-12-sober-enterprise-variants/_render-pdf.mjs <variant-id>
// Example: node docs/superpowers/visuals/2026-05-12-sober-enterprise-variants/_render-pdf.mjs V2-13-content-compliance
//
// Output: same directory, <variant-id>.pdf
// Margins: zero at puppeteer level (CSS @page size: A4; margin: 0; and .cv-page has
// padding: 16mm internally). page-break-after: always on each .cv-page means overflow
// continues to next page without clipping.

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const __dirname = dirname(fileURLToPath(import.meta.url));
const arg = process.argv[2];
if (!arg) {
  console.error("usage: node _render-pdf.mjs <variant-id>");
  process.exit(1);
}

const htmlPath = join(__dirname, "v2-1", `${arg}.html`);
const pdfPath = join(__dirname, "v2-1", `${arg}.pdf`);
const html = readFileSync(htmlPath, "utf8");

const browser = await puppeteer.launch({ headless: true });
try {
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });
  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: { top: "0", right: "0", bottom: "0", left: "0" },
    preferCSSPageSize: true,
  });
  writeFileSync(pdfPath, pdfBuffer);
  const pages = (pdfBuffer.toString("latin1").match(/\/Type\s*\/Page[^s]/g) || []).length;
  console.log(`wrote ${pdfPath} (${pdfBuffer.length} bytes, ${pages} pages)`);
} finally {
  await browser.close();
}
