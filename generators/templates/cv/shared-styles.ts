/**
 * Shared CSS used by Warm and Serious variants of the CV.
 * BairesDev is intentionally isolated — it defines its own minimal grayscale styles inline.
 */
export const CV_SHARED_STYLES = `
/* ============== A4 page setup ============== */
*, *::before, *::after { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body {
  font-family: var(--font-body);
  font-size: var(--fs-body);
  line-height: var(--lh-body);
  color: var(--ink);
  background: #e8e5de;
  -webkit-font-smoothing: antialiased;
  font-feature-settings: "kern", "liga", "calt";
  font-variant-numeric: tabular-nums;
}
.cv-page {
  width: var(--a4-w);
  min-height: var(--a4-h);
  margin: 24px auto;
  background: var(--bg-paper);
  color: var(--ink);
  padding: var(--a4-pad);
  box-shadow: 0 4px 24px rgba(0,0,0,.12);
  position: relative;
  overflow: hidden;
  page-break-after: always;
  display: grid;
  grid-template-columns: 62mm 1fr;
  gap: 10mm;
}
.cv-page:last-of-type { page-break-after: auto; }
@media print {
  body { background: var(--bg-paper); }
  .cv-page { margin: 0; box-shadow: none; }
  @page { size: A4; margin: 0; }
}

/* ============== identity ============== */
.cv-identity {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: end;
  gap: 10mm;
  padding-bottom: 6mm;
  border-bottom: 2px solid var(--ink);
  margin-bottom: 6mm;
}
.cv-identity__name {
  font-family: var(--font-display);
  font-size: 24pt;
  letter-spacing: -0.05em;
  line-height: 1;
  margin: 0 0 3mm 0;
  font-weight: 600;
}
.cv-identity__name-accent { color: var(--accent); }
.cv-identity--bairesdev .cv-identity__name-accent { color: inherit; }
.cv-identity__role {
  font-family: var(--font-mono);
  font-size: 9pt;
  letter-spacing: 0.06em;
  color: var(--ink);
  margin-bottom: 2mm;
}
.cv-identity__availability {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-mono);
  font-size: 8pt;
  letter-spacing: 0.08em;
  color: var(--ink-muted);
}
.cv-identity__live-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 0 3px rgba(255,137,100,.25);
  animation: cv-livepulse 2.4s ease-in-out infinite;
}
@keyframes cv-livepulse {
  0%, 100% { box-shadow: 0 0 0 3px rgba(255,137,100,.25); }
  50%      { box-shadow: 0 0 0 6px rgba(255,137,100,.08); }
}
.cv-identity__contact {
  text-align: right;
  font-family: var(--font-mono);
  font-size: 8pt;
  color: var(--ink-muted);
  line-height: 1.7;
  letter-spacing: 0.03em;
}

/* ============== summary ============== */
.cv-summary { margin-bottom: 6mm; grid-column: 2 / -1; }
.cv-summary__eyebrow {
  font-family: var(--font-mono);
  font-size: 8pt;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 2mm;
}
.cv-summary__thesis {
  font-family: var(--font-display);
  font-size: 15pt;
  letter-spacing: -0.03em;
  line-height: 1.25;
  color: var(--ink);
  margin: 0 0 3mm 0;
  font-weight: 600;
}
.cv-summary__tagline {
  font-size: 9pt;
  line-height: 1.5;
  color: var(--ink-body);
  margin: 0;
}

/* ============== skills sidebar ============== */
.cv-skills { grid-column: 1; }
.cv-skills__heading {
  font-family: var(--font-display);
  font-size: 9pt;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink);
  margin: 0 0 4mm 0;
  padding-bottom: 2mm;
  border-bottom: 1px solid var(--ink);
  font-weight: 600;
}
.cv-skills__group { margin-bottom: 3mm; }
.cv-skills__group-title {
  font-family: var(--font-mono);
  font-size: 7.5pt;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
  margin: 0 0 1.5mm 0;
}
.cv-skills__list {
  list-style: none; margin: 0; padding: 0;
  display: flex; flex-wrap: wrap; gap: 3px;
}
.cv-skill {
  font-size: 7.5pt;
  padding: 1.5px 6px;
  border-radius: 99px;
  border: 1px solid var(--line);
  background: var(--bg-card);
  color: var(--ink-body);
}
.cv-skill--learning {
  border-color: var(--accent-deep);
  color: var(--accent-deep);
}

/* ============== experience ============== */
.cv-xp {
  margin-bottom: 4mm;
  padding-bottom: 4mm;
  border-bottom: 1px dashed var(--line-soft);
}
.cv-xp:last-child { border-bottom: 0; }
.cv-xp__header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 1.5mm;
}
.cv-xp__company {
  font-family: var(--font-display);
  font-size: 10.5pt;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--ink);
}
.cv-xp__dates {
  font-family: var(--font-mono);
  font-size: 8pt;
  color: var(--ink-muted);
  letter-spacing: 0.04em;
}
.cv-xp__role {
  font-family: var(--font-mono);
  font-size: 8.5pt;
  color: var(--ink);
  margin-bottom: 2mm;
  letter-spacing: 0.02em;
}
.cv-xp__badge {
  display: inline-block;
  margin-left: 4px;
  padding: 1px 6px;
  border-radius: 99px;
  background: var(--accent);
  color: var(--accent-ink);
  font-size: 6.5pt;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.cv-xp__description {
  font-size: 8.5pt;
  line-height: 1.5;
  color: var(--ink-body);
  margin: 0 0 2mm 0;
}
.cv-xp__stack {
  display: flex; flex-wrap: wrap; gap: 3px;
}
.cv-xp__stack-pill {
  font-family: var(--font-mono);
  font-size: 6.5pt;
  padding: 1px 6px;
  border-radius: 99px;
  background: var(--bg-section);
  border: 1px solid var(--line);
  color: var(--ink-body);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

/* ============== case card ============== */
.cv-case {
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 4mm 5mm;
  background: var(--bg-card);
  margin-bottom: 3mm;
  page-break-inside: avoid;
}
.cv-case--featured.cv-case--dark {
  background: var(--bg-ink);
  color: var(--ink-inverse);
  border-color: var(--bg-ink);
}
.cv-case--featured.cv-case--accent-border {
  border-color: var(--accent);
  box-shadow: 0 0 0 1px var(--accent) inset;
}
.cv-case__meta {
  display: flex; justify-content: space-between; align-items: baseline;
  font-family: var(--font-mono);
  font-size: 6.5pt;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-muted);
  margin-bottom: 2mm;
}
.cv-case--dark .cv-case__meta { color: #c9cbcf; }
.cv-case__client { color: var(--accent); }
.cv-case--dark .cv-case__client { color: var(--accent); }
.cv-case__title {
  font-family: var(--font-display);
  font-size: 12pt;
  letter-spacing: -0.03em;
  line-height: 1.15;
  margin: 0 0 2mm 0;
  font-weight: 600;
  color: inherit;
}
.cv-case__hook {
  font-size: 8.5pt;
  line-height: 1.5;
  color: var(--ink-body);
  margin: 0 0 2mm 0;
}
.cv-case--dark .cv-case__hook { color: #d7d8db; }
.cv-case__bullets {
  list-style: none; margin: 0 0 2mm 0; padding: 0;
}
.cv-case__bullets li {
  font-size: 7.8pt;
  line-height: 1.45;
  padding-left: 12px;
  position: relative;
  color: var(--ink-body);
  margin-bottom: 1mm;
}
.cv-case--dark .cv-case__bullets li { color: #d7d8db; }
.cv-case__bullets li::before {
  content: "";
  position: absolute; left: 0; top: 6px;
  width: 6px; height: 1px;
  background: var(--accent);
}
.cv-case__stack {
  display: flex; flex-wrap: wrap; gap: 3px;
}
.cv-case__stack-pill {
  font-family: var(--font-mono);
  font-size: 6.5pt;
  padding: 1px 6px;
  border-radius: 99px;
  background: var(--bg-section);
  border: 1px solid var(--line);
  color: var(--ink-body);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}
.cv-case--dark .cv-case__stack-pill {
  background: rgba(255,255,255,.08);
  border-color: rgba(255,255,255,.15);
  color: #e5e5e7;
}

/* ============== testimonials ============== */
.cv-testimonial {
  border-left: 2px solid var(--accent);
  padding: 2mm 0 2mm 4mm;
  margin-bottom: 3mm;
}
.cv-testimonial__quote {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 8.5pt;
  line-height: 1.45;
  color: var(--ink);
  margin: 0 0 1.5mm 0;
  letter-spacing: -0.01em;
}
.cv-testimonial__attribution {
  display: flex;
  align-items: baseline;
  gap: 6px;
  font-family: var(--font-mono);
  font-size: 6.5pt;
  letter-spacing: 0.06em;
  color: var(--ink-muted);
  flex-wrap: wrap;
}
.cv-testimonial__author {
  color: var(--ink);
  font-weight: 600;
  font-family: var(--font-display);
  font-size: 7.5pt;
  letter-spacing: -0.01em;
}
.cv-testimonial__badge {
  padding: 1px 6px;
  border-radius: 99px;
  font-size: 5.8pt;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  margin-left: auto;
}
.cv-testimonial__badge\\--verified {
  color: var(--accent);
  border: 1px solid var(--accent);
}
.cv-testimonial__badge\\--attributed {
  color: var(--ink-muted);
  border: 1px solid var(--line-strong);
}

/* ============== education ============== */
.cv-edu__heading {
  font-family: var(--font-display);
  font-size: 9pt;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink);
  margin: 0 0 3mm 0;
  padding-bottom: 2mm;
  border-bottom: 1px solid var(--ink);
  font-weight: 600;
}
.cv-edu__list { list-style: none; margin: 0; padding: 0; }
.cv-edu__item {
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 6mm;
  font-size: 8.5pt;
  padding: 1.5mm 0;
  border-top: 1px dashed var(--line-soft);
}
.cv-edu__item:first-child { border-top: 0; }
.cv-edu__year {
  font-family: var(--font-mono);
  font-size: 7.5pt;
  color: var(--ink-muted);
  letter-spacing: 0.04em;
  min-width: 10mm;
}
.cv-edu__name {
  font-family: var(--font-display);
  font-size: 9pt;
  font-weight: 500;
  letter-spacing: -0.02em;
}
.cv-edu__inst {
  grid-column: 2;
  font-family: var(--font-mono);
  font-size: 7pt;
  color: var(--ink-muted);
  letter-spacing: 0.04em;
}

/* ============== client chips ============== */
.cv-client-chip {
  display: inline-block;
  padding: 6px 8px;
  border: 1px solid var(--line);
  border-radius: 6px;
  background: var(--bg-card);
  margin: 0 3px 3px 0;
}
.cv-client-chip__name {
  font-family: var(--font-display);
  font-size: 9pt;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--ink);
}
.cv-client-chip__industry {
  font-family: var(--font-mono);
  font-size: 6.5pt;
  color: var(--ink-muted);
  letter-spacing: 0.04em;
  margin-top: 1px;
}

/* ============== main + right column ============== */
.cv-right { grid-column: 2; }
.cv-section { margin-bottom: 6mm; }
.cv-section__heading {
  font-family: var(--font-display);
  font-size: 9pt;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accent);
  margin: 0 0 3mm 0;
  font-weight: 600;
}
`;
