import puppeteer from "puppeteer";
import { writeFile, mkdir } from "node:fs/promises";

const WORK = "file:///C:/dev/dr-cv/laboratorio/superpowers/visuals/2026-06-16-cv-minimalist-templates-visuals-WORK.html";
const OUT = "C:/dev/dr-cv/dist/cvs/";

await mkdir(OUT, { recursive: true });
const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.goto(WORK, { waitUntil: "networkidle0" });
const headCss = await page.$eval("head style", (e) => e.outerHTML);

for (const lang of ["en", "es"]) {
  let outer = await page.$eval("#tab-" + lang, (e) => e.outerHTML);
  outer = outer
    .replace(/\bhidden\b/, "")
    .replace(/shadow-2xl/, "")
    .replace(/border border-black\/20/, "");
  const doc = `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><script src="https://cdn.tailwindcss.com"></script>${headCss}<style>@page{size:A4;margin:0}html,body{margin:0;padding:0;background:#FAFAF7}#tab-${lang}{box-shadow:none!important;border:0!important;margin:0!important;padding:8mm 16mm!important;min-height:auto!important}</style></head><body>${outer}</body></html>`;
  const p = await browser.newPage();
  await p.setContent(doc, { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 400));
  const h = await p.evaluate(() => { const el = document.querySelector('[id^="tab-"]'); return { content: el.scrollHeight, body: document.body.scrollHeight }; });
  const a4px = 1122.5;
  console.log(lang, "contentPx", h.content, "bodyPx", h.body, "a4", a4px, "overflow", (h.body - a4px).toFixed(0));
  await p.pdf({
    path: OUT + "cv-" + lang + ".pdf",
    format: "A4",
    printBackground: true,
    margin: { top: "0", right: "0", bottom: "0", left: "0" },
    preferCSSPageSize: true,
  });
  await writeFile(OUT + "cv-" + lang + ".html", doc);
  await p.close();
  const buf = await import("node:fs").then((fs) => fs.readFileSync(OUT + "cv-" + lang + ".pdf"));
  const pages = (buf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) || []).length;
  console.log("wrote cv-" + lang + " (pages=" + pages + ")");
}
await browser.close();
