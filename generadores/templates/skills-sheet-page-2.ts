import type { SkillsSheetData, ExperienceItem, Client, Testimonial } from "../lib/types.js";
import { escapeHtml, type Lang } from "./skills-sheet-page-1.js";

function renderCurrentWorkCard(item: ExperienceItem, lang: Lang): string {
  const desc = lang === "en" ? item.descriptionEn : item.descriptionEs;
  const timeframe = item.endYear === "present"
    ? `${item.startYear} â€” ${lang === "en" ? "now" : "hoy"}`
    : `${item.startYear} â€” ${item.endYear}`;
  const badgeHtml = item.badge
    ? `<span class="pill pill--accent">${escapeHtml(item.badge)}</span>`
    : `<span class="pill pill--outline">${escapeHtml(timeframe)}</span>`;
  return `
    <div class="card">
      <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:2mm;">
        <div class="eyebrow" style="color:var(--accent)">${escapeHtml(item.role)}</div>
        ${badgeHtml}
      </div>
      <h3 style="font-size:11pt; margin-bottom:3mm;">${escapeHtml(item.company)}</h3>
      <p style="font-size:8pt; line-height:1.45; color:var(--ink-body); margin:0 0 3mm 0;">${escapeHtml(desc)}</p>
      <div style="display:flex; flex-wrap:wrap; gap:4px;">
        ${item.stack.map((t) => `<span class="pill">${escapeHtml(t)}</span>`).join("\n")}
      </div>
    </div>`;
}

function renderClientChip(c: Client, lang: Lang): string {
  const industry = lang === "en" ? c.industryEn : c.industryEs;
  return `
    <div class="card" style="padding:10px 12px;">
      <div class="mono" style="font-size:9.5pt; font-weight:600; letter-spacing:-0.02em;">${escapeHtml(c.name)}</div>
      <div style="font-size:7pt; color:var(--ink-muted); margin-top:2px;">${escapeHtml(industry)}</div>
    </div>`;
}

function renderTestimonial(t: Testimonial, lang: Lang): string {
  const quote = lang === "es" && t.quoteEs ? t.quoteEs : t.quote;
  const company = t.company ? ` Â· ${escapeHtml(t.company)}` : "";
  const badgeLabel = lang === "en"
    ? (t.source === "verified" ? "verified" : "attributed")
    : (t.source === "verified" ? "verificado" : "atribuida");
  return `
    <div class="voice">
      <p class="q">&ldquo;${escapeHtml(quote)}&rdquo;</p>
      <div class="who">
        <span><b>${escapeHtml(t.author)}</b> Â· ${escapeHtml(t.role)}${company}</span>
        <span class="verified">${escapeHtml(badgeLabel)}</span>
      </div>
    </div>`;
}

export function renderPage2(data: SkillsSheetData, lang: Lang): string {
  const { experience, clients, testimonials } = data;
  const verifiedOnly = testimonials.filter((t) => t.source === "verified").slice(0, 2);

  const currentWork = experience.current
    .map((item) => renderCurrentWorkCard(item, lang))
    .join("\n");

  const clientChips = clients.map((c) => renderClientChip(c, lang)).join("\n");

  const voices = verifiedOnly.map((t) => renderTestimonial(t, lang)).join("\n");

  const ctaTitle = lang === "en" ? "The combination is the product." : "La combinaciÃ³n es el producto.";
  const ctaLabel = lang === "en" ? "let's talk" : "hablemos";
  const ctaButton = lang === "en" ? "Work together" : "Trabajemos juntos";

  return `
<article class="page">
  <div class="ss">

    <header class="ss-head">
      <div>
        <span class="eyebrow">skills sheet Â· cont Â· p.2 of 2</span>
        <h1 class="tighter">${lang === "en" ? "How I work" : "CÃ³mo trabajo"}</h1>
      </div>
      <div class="meta">
        <div>${lang === "en" ? "generated from repo" : "generado desde repo"}</div>
        <div><b>/perfil/data/skills.yaml</b></div>
      </div>
    </header>

    <section style="margin-top:4mm;">
      <div class="sec-head">
        <span class="sec-head__num">01</span>
        <span class="sec-head__title">${lang === "en" ? "Current work" : "Trabajo actual"}</span>
        <span class="sec-head__rule"></span>
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:5mm; margin-top:4mm;">
        ${currentWork}
      </div>
    </section>

    <section style="margin-top:8mm;">
      <div class="sec-head">
        <span class="sec-head__num">02</span>
        <span class="sec-head__title">${lang === "en" ? "Past clients (selected)" : "Clientes pasados (seleccionados)"}</span>
        <span class="sec-head__rule"></span>
      </div>
      <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:3mm; margin-top:4mm;">
        ${clientChips}
      </div>
    </section>

    <section style="margin-top:8mm;">
      <div class="sec-head">
        <span class="sec-head__num">03</span>
        <span class="sec-head__title">${lang === "en" ? "Voices" : "Voces"}</span>
        <span class="sec-head__rule"></span>
      </div>
      <div class="voices">
        ${voices}
      </div>
    </section>

    <section style="margin-top:auto; padding-top:8mm; display:flex; justify-content:space-between; align-items:center;">
      <div>
        <div class="eyebrow">${escapeHtml(ctaLabel)}</div>
        <h2 style="font-size:16pt; margin-top:3px; letter-spacing:-0.04em;">${escapeHtml(ctaTitle)}</h2>
      </div>
      <a class="cta" href="mailto:${escapeHtml(data.identity.contact.email)}">
        <span>${escapeHtml(ctaButton)}</span>
        <span style="transform:translateY(-1px)">â†’</span>
      </a>
    </section>

    <footer class="ss-foot" style="margin-top:6mm;">
      <div class="left">
        <span>${lang === "en" ? "dr-cv Â· skills sheet Â· generated from single source of truth" : "dr-cv Â· skills sheet Â· generado desde fuente Ãºnica"}</span>
      </div>
      <div class="pills">
        <span class="k">Page 2 / 2</span>
      </div>
    </footer>
  </div>
</article>`;
}
