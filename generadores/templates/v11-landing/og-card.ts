/**
 * OG card HTML template — rendered by puppeteer to a 1200x630 PNG.
 *
 * Self-contained: inlines the photo as a data URL and uses system/web-safe
 * fallbacks so the card renders identically under headless Chromium without
 * needing network font loads.
 */

export interface OgCardInput {
  photoDataUrl: string;
  name: string;
  role: string;
  tagline: string;
  domain: string;
  /** Short availability line for the footer bar (role-neutral). */
  availability?: string;
}

export function renderOgCardHtml(input: OgCardInput): string {
  const { photoDataUrl, name, role, tagline, domain } = input;
  const availability = input.availability ?? "Available for work";
  return `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<style>
  @font-face {
    font-family: "Source Serif 4";
    src: local("Source Serif 4"), local("Source Serif Pro"), local("Georgia");
  }
  html, body { margin: 0; padding: 0; background: #0A0B0E; }
  body {
    width: 1200px;
    height: 630px;
    color: #F3F0EA;
    font-family: "Inter", -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif;
    display: flex;
    overflow: hidden;
    position: relative;
  }
  .bg-grain {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(1200px 600px at 75% 30%, rgba(230, 138, 46, 0.10), transparent 60%),
      radial-gradient(900px 500px at 15% 90%, rgba(230, 138, 46, 0.05), transparent 65%),
      linear-gradient(180deg, #0A0B0E 0%, #111318 100%);
  }
  .frame {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 72px;
    padding: 72px 88px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
  .photo-wrap {
    width: 380px;
    height: 380px;
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;
    border: 2px solid rgba(230, 138, 46, 0.35);
    box-shadow:
      0 0 0 6px rgba(230, 138, 46, 0.08),
      0 30px 60px rgba(0, 0, 0, 0.45);
  }
  .photo-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    filter: contrast(1.03) saturate(0.98);
  }
  .text {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 18px;
  }
  .domain {
    font-family: "JetBrains Mono", ui-monospace, "SF Mono", Consolas, monospace;
    font-size: 18px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #E68A2E;
  }
  .domain::before {
    content: "// ";
    color: #6E6B64;
  }
  .name {
    font-family: "Source Serif 4", "Source Serif Pro", Georgia, serif;
    font-size: 92px;
    line-height: 1.0;
    font-weight: 600;
    letter-spacing: -0.02em;
    color: #F3F0EA;
    margin: 0;
  }
  .role {
    font-family: "JetBrains Mono", ui-monospace, "SF Mono", Consolas, monospace;
    font-size: 20px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #A7A39B;
  }
  .tagline {
    font-family: "Source Serif 4", "Source Serif Pro", Georgia, serif;
    font-style: italic;
    font-size: 30px;
    line-height: 1.3;
    color: #D8D4CC;
    max-width: 620px;
    margin: 10px 0 0;
    font-weight: 400;
  }
  .bar {
    position: absolute;
    left: 88px;
    right: 88px;
    bottom: 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: "JetBrains Mono", ui-monospace, "SF Mono", Consolas, monospace;
    font-size: 14px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #6E6B64;
    z-index: 2;
  }
  .bar .left { color: #A7A39B; }
  .dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    background: #6FC78A;
    border-radius: 50%;
    margin-right: 10px;
    box-shadow: 0 0 8px rgba(111, 199, 138, 0.6);
    vertical-align: middle;
  }
</style>
</head>
<body>
  <div class="bg-grain"></div>
  <div class="frame">
    <div class="photo-wrap">
      <img src="${photoDataUrl}" alt="">
    </div>
    <div class="text">
      <div class="domain">${escapeHtml(domain)}</div>
      <h1 class="name">${escapeHtml(name)}</h1>
      <div class="role">${escapeHtml(role)}</div>
      <p class="tagline">${escapeHtml(tagline)}</p>
    </div>
  </div>
  <div class="bar">
    <span class="left"><span class="dot"></span>${escapeHtml(availability)}</span>
    <span>dr-cv · V11</span>
  </div>
</body>
</html>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
