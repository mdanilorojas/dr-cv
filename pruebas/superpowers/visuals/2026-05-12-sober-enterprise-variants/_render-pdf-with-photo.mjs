// One-off: renders V2-1-base-with-photo.html → V2-danilo-rojas-with-photo.pdf
// Uses page.goto(file://) so relative <img src="danilo.jpg"> resolves.
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import puppeteer from "puppeteer";

const __dirname = dirname(fileURLToPath(import.meta.url));
const htmlPath = join(__dirname, "v2-1", "V2-1-base-with-photo.html");
const pdfPath = join(__dirname, "v2-1", "V2-danilo-rojas-with-photo.pdf");

const browser = await puppeteer.launch({ headless: true });
try {
  const page = await browser.newPage();
  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "networkidle0" });
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
