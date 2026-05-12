/**
 * V11 production styles — extracted from docs/design-system/v11/index.html
 * Imports design-system/tokens-v11.css via the orchestrator concat.
 * No Huly-glow CTA (V11 R8 #1). Self-hosted fonts (V11 R7).
 */
export const V11_STYLES = `
/* ============== reset + base ============== */
*, *::before, *::after { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
html { scroll-behavior: smooth; scroll-padding-top: 64px; }
body {
  font-family: var(--v11-font-body);
  font-size: var(--v11-fs-body);
  line-height: var(--v11-lead-body);
  background: var(--v11-bg-primary);
  color: var(--v11-text-body);
  -webkit-font-smoothing: antialiased;
  font-feature-settings: "kern", "liga", "calt";
  min-height: 100vh;
  overflow-x: hidden;
}
a { color: inherit; text-decoration: none; }
button { font: inherit; color: inherit; background: none; border: none; cursor: pointer; padding: 0; }
ul, ol { list-style: none; padding: 0; margin: 0; }
img { max-width: 100%; display: block; }

:focus-visible {
  outline: 2px solid var(--v11-accent);
  outline-offset: 3px;
  border-radius: var(--v11-radius-sm);
}

.v11-container { max-width: var(--v11-container); margin: 0 auto; padding: 0 var(--v11-pad-x); }
.v11-container-narrow { max-width: var(--v11-container-narrow); margin: 0 auto; padding: 0 var(--v11-pad-x); }

/* ============== skip link (V11 R7 floor 02) ============== */
.v11-skip {
  position: absolute;
  left: -9999px; top: 0;
  background: var(--v11-accent);
  color: var(--v11-accent-ink);
  padding: 8px 14px;
  border-radius: var(--v11-radius);
  font-family: var(--v11-font-body);
  font-weight: var(--v11-wt-semibold);
  font-size: var(--v11-fs-small);
  z-index: var(--v11-z-hint);
}
.v11-skip:focus { left: 8px; top: 8px; }

/* ============== NAV ============== */
.v11-nav {
  position: sticky; top: 0; z-index: var(--v11-z-nav);
  padding: var(--v11-s-3) 0;
  background: rgba(10, 11, 14, 0.80);
  backdrop-filter: saturate(140%) blur(14px);
  -webkit-backdrop-filter: saturate(140%) blur(14px);
  border-bottom: 1px solid transparent;
  transition: border-color var(--v11-dur-fast) var(--v11-ease-standard);
}
.v11-nav.is-scrolled { border-bottom-color: var(--v11-line); }
.v11-nav__inner {
  max-width: var(--v11-container);
  margin: 0 auto;
  padding: 0 var(--v11-pad-x);
  display: flex;
  align-items: center;
  gap: var(--v11-s-4);
}
.v11-nav__brand {
  font-family: var(--v11-font-display);
  font-size: 15px;
  color: var(--v11-text);
  letter-spacing: var(--v11-track-snug);
  font-weight: var(--v11-wt-semibold);
}
.v11-nav__brand-sep { color: var(--v11-accent); margin: 0 6px; }
.v11-nav__tabs { display: flex; gap: var(--v11-s-4); margin: 0 auto; }
@media (max-width: 680px) {
  .v11-nav__tabs { display: none; }
}
.v11-nav__link {
  font-size: var(--v11-fs-small);
  color: var(--v11-text-85);
  letter-spacing: var(--v11-track-snug);
  transition: color var(--v11-dur-fast) var(--v11-ease-standard);
}
.v11-nav__link:hover { color: var(--v11-accent); }
.v11-nav__lang {
  font-family: var(--v11-font-mono);
  font-size: var(--v11-fs-nano);
  padding: 6px 12px;
  border-radius: var(--v11-radius-pill);
  border: 1px solid var(--v11-line);
  color: var(--v11-text-70);
  letter-spacing: var(--v11-track-code);
  text-transform: uppercase;
  transition: color var(--v11-dur-fast), border-color var(--v11-dur-fast);
}
.v11-nav__lang:hover { border-color: var(--v11-accent); color: var(--v11-accent); }

/* ============== BUTTONS (V11 R8 #1 compliant — no glow) ============== */
.v11-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  height: 44px;
  padding: 0 var(--v11-s-5);
  border-radius: var(--v11-radius-pill);
  font-family: var(--v11-font-body);
  font-weight: var(--v11-wt-semibold);
  font-size: var(--v11-fs-small);
  letter-spacing: var(--v11-track-snug);
  transition: background var(--v11-dur-fast) var(--v11-ease-standard),
              border-color var(--v11-dur-fast) var(--v11-ease-standard),
              color var(--v11-dur-fast) var(--v11-ease-standard);
}
.v11-btn--primary {
  background: var(--v11-accent);
  color: var(--v11-accent-ink);
  border: 1px solid var(--v11-accent);
}
.v11-btn--primary:hover { background: var(--v11-accent-deep); border-color: var(--v11-accent-deep); }
.v11-btn--ghost {
  background: transparent;
  border: 1px solid var(--v11-line-strong);
  color: var(--v11-text);
}
.v11-btn--ghost:hover { border-color: var(--v11-text); }
.v11-btn__arrow { transition: transform var(--v11-dur-fast) var(--v11-ease-standard); }
.v11-btn:hover .v11-btn__arrow { transform: translateX(3px); }

/* ============== LIVE DOT ============== */
.v11-live {
  display: inline-block;
  width: 8px; height: 8px;
  border-radius: 50%;
  background: var(--v11-accent);
  box-shadow: 0 0 0 3px var(--v11-accent-soft);
  animation: v11-livepulse 2.4s ease-in-out infinite;
}
@keyframes v11-livepulse {
  0%, 100% { box-shadow: 0 0 0 3px var(--v11-accent-soft); }
  50%      { box-shadow: 0 0 0 8px rgba(255,137,100,0.03); }
}

/* ============== SECTION shell ============== */
.v11-section {
  padding: clamp(72px, 10vw, 120px) 0;
  position: relative;
}
.v11-section--alt { background: var(--v11-bg-alt); }
.v11-section--paper {
  background: var(--v11-bg-paper);
  color: var(--v11-paper-body);
}
.v11-section__eyebrow {
  font-family: var(--v11-font-mono);
  font-size: var(--v11-fs-micro);
  color: var(--v11-accent);
  letter-spacing: var(--v11-track-code);
  text-transform: uppercase;
  margin-bottom: var(--v11-s-4);
}
.v11-section__eyebrow::before { content: "// "; color: var(--v11-text-subtle); }
.v11-section--paper .v11-section__eyebrow { color: var(--v11-accent-deep); }
.v11-section--paper .v11-section__eyebrow::before { color: var(--v11-paper-subtle); }

.v11-h1 {
  font-family: var(--v11-font-display);
  font-size: var(--v11-fs-h1);
  font-weight: var(--v11-wt-semibold);
  line-height: var(--v11-lead-h);
  letter-spacing: var(--v11-track-tight);
  color: var(--v11-text);
  margin: 0 0 var(--v11-s-5);
}
.v11-section--paper .v11-h1 { color: var(--v11-paper-ink); }
.v11-h1 em { font-style: normal; color: var(--v11-accent); font-weight: var(--v11-wt-regular); }

.v11-lead {
  font-size: var(--v11-fs-lead);
  line-height: var(--v11-lead-tight);
  color: var(--v11-text-body);
  max-width: 62ch;
  margin: 0 0 var(--v11-s-7);
}
.v11-section--paper .v11-lead { color: var(--v11-paper-body); }

/* ============== HERO ============== */
.v11-hero {
  min-height: 100vh;
  padding-top: clamp(100px, 14vw, 180px);
  padding-bottom: clamp(80px, 10vw, 140px);
  display: flex;
  align-items: center;
  position: relative;
}
.v11-hero__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--v11-s-7);
  align-items: center;
}
@media (min-width: 960px) {
  .v11-hero__grid { grid-template-columns: 6fr 6fr; }
}
.v11-hero__byline {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: var(--v11-s-5);
}
.v11-hero__avatar {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid rgba(255, 255, 255, 0.14);
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.04) inset, 0 6px 22px rgba(0, 0, 0, 0.45);
  flex-shrink: 0;
  display: block;
}
@media (max-width: 720px) {
  .v11-hero__avatar { width: 88px; height: 88px; }
}
.v11-hero__eyebrow {
  font-family: var(--v11-font-mono);
  font-size: var(--v11-fs-micro);
  color: var(--v11-accent);
  letter-spacing: var(--v11-track-code);
  text-transform: uppercase;
  margin-bottom: 0;
}
.v11-hero__byline .v11-hero__eyebrow::before { content: ""; }
.v11-hero__title {
  font-family: var(--v11-font-display);
  font-size: var(--v11-fs-hero);
  font-weight: var(--v11-wt-semibold);
  line-height: var(--v11-lead-hero);
  letter-spacing: var(--v11-track-tight);
  color: var(--v11-text);
  margin: 0 0 var(--v11-s-5);
  max-width: 18ch;
}
.v11-hero__title em {
  font-style: normal;
  color: var(--v11-accent);
  font-weight: var(--v11-wt-regular);
}
.v11-hero__sub {
  font-size: var(--v11-fs-lead);
  line-height: var(--v11-lead-tight);
  color: var(--v11-text-body);
  max-width: 52ch;
  margin: 0 0 var(--v11-s-6);
}
.v11-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--v11-s-3);
  align-items: center;
  margin-bottom: var(--v11-s-5);
}
.v11-hero__availability {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--v11-font-mono);
  font-size: var(--v11-fs-micro);
  color: var(--v11-text-60);
  letter-spacing: var(--v11-track-snug);
}

/* ============== ARTIFACT FRAME (AI Product-Tour layer) ============== */
.v11-artifact {
  position: relative;
  background: var(--v11-artifact-bg);
  border: 1px solid var(--v11-artifact-line);
  border-radius: var(--v11-radius-card);
  box-shadow: var(--v11-shadow-artifact);
  overflow: hidden;
  isolation: isolate;
}
.v11-artifact__head {
  display: flex;
  align-items: center;
  gap: var(--v11-s-3);
  padding: 10px 14px;
  border-bottom: 1px solid var(--v11-artifact-line);
  background: var(--v11-artifact-bg-alt);
  font-family: var(--v11-font-mono);
  font-size: var(--v11-fs-nano);
  color: var(--v11-text-60);
  letter-spacing: var(--v11-track-code);
  text-transform: uppercase;
}
.v11-artifact__dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: var(--v11-accent);
  box-shadow: 0 0 0 2px var(--v11-accent-soft);
}
.v11-artifact__file { color: var(--v11-text); text-transform: none; letter-spacing: var(--v11-track-snug); font-size: var(--v11-fs-micro); }
.v11-artifact__status { margin-left: auto; color: var(--v11-signal-pos); }
.v11-artifact__body {
  padding: var(--v11-s-5);
  background: var(--v11-artifact-bg);
}

/* Paper artifact preview (emulates the actual PDF look) */
.v11-artifact-paper {
  padding: var(--v11-s-5);
  background: var(--v11-bg-paper);
  color: var(--v11-paper-ink);
  border-radius: var(--v11-radius);
  min-height: 260px;
  display: flex;
  flex-direction: column;
  gap: var(--v11-s-2);
}
.v11-artifact-paper__kicker {
  font-family: var(--v11-font-mono);
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--v11-accent-deep);
}
.v11-artifact-paper__name {
  font-family: var(--v11-font-display);
  font-size: 22px;
  font-weight: var(--v11-wt-semibold);
  line-height: 1.1;
  letter-spacing: -0.02em;
}
.v11-artifact-paper__name span { color: var(--v11-accent-deep); }
.v11-artifact-paper__meta {
  font-family: var(--v11-font-mono);
  font-size: 10px;
  color: var(--v11-paper-muted);
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
.v11-artifact-paper__hr {
  border: 0;
  border-top: 1px solid var(--v11-line-paper-sf);
  margin: 8px 0;
}
.v11-artifact-paper__body {
  font-size: 12px;
  color: var(--v11-paper-body);
  line-height: 1.55;
}

/* Stream (Visible Thinking) */
.v11-stream {
  padding: var(--v11-s-4);
  margin-top: var(--v11-s-3);
  background: var(--v11-stream-bg);
  border: 1px solid var(--v11-stream-line);
  border-radius: var(--v11-radius);
  font-family: var(--v11-font-mono);
  font-size: var(--v11-fs-small);
  color: var(--v11-text-70);
  line-height: 1.7;
}
.v11-stream__head {
  display: flex;
  gap: var(--v11-s-2);
  align-items: center;
  color: var(--v11-text-60);
  font-size: var(--v11-fs-nano);
  letter-spacing: var(--v11-track-code);
  text-transform: uppercase;
  margin-bottom: var(--v11-s-3);
}
.v11-stream__head::before {
  content: "";
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--v11-accent);
  animation: v11-pulse 1.6s ease-in-out infinite;
}
@keyframes v11-pulse { 0%,100% { opacity: 0.4; } 50% { opacity: 1; } }
.v11-stream__line { display: block; margin-bottom: 4px; }
.v11-stream__caret {
  display: inline-block;
  width: 6px; height: 14px;
  background: var(--v11-stream-caret);
  vertical-align: -2px;
  margin-left: 2px;
  animation: v11-blink 1.1s steps(2, end) infinite;
}
@keyframes v11-blink { 50% { opacity: 0; } }

/* ============== PROOF STRIP ============== */
.v11-proof {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  border: 1px solid var(--v11-line);
  border-radius: var(--v11-radius-card);
  background: var(--v11-bg-elevated);
  margin: var(--v11-s-5) 0;
}
.v11-proof__item {
  padding: var(--v11-s-5);
  border-left: 1px solid var(--v11-line);
}
.v11-proof__item:first-child { border-left: 0; }
@media (max-width: 720px) {
  .v11-proof__item { border-left: 0; border-top: 1px solid var(--v11-line); }
  .v11-proof__item:first-child { border-top: 0; }
}
.v11-proof__num {
  font-family: var(--v11-font-display);
  font-size: clamp(28px, 4vw, 40px);
  font-weight: var(--v11-wt-semibold);
  line-height: 1;
  letter-spacing: var(--v11-track-tight);
  color: var(--v11-text);
}
.v11-proof__num em {
  font-style: normal;
  color: var(--v11-accent);
  font-weight: var(--v11-wt-regular);
}
.v11-proof__label {
  font-family: var(--v11-font-mono);
  font-size: var(--v11-fs-nano);
  color: var(--v11-text-60);
  letter-spacing: var(--v11-track-code);
  text-transform: uppercase;
  margin-top: 10px;
}
.v11-proof__attr {
  font-family: var(--v11-font-mono);
  font-size: var(--v11-fs-nano);
  color: var(--v11-text-subtle);
  letter-spacing: var(--v11-track-snug);
  margin-top: 4px;
}

/* ============== NOTEBOOK (essay) ============== */
.v11-notebook {
  max-width: var(--v11-container-narrow);
  margin: 0 auto;
}
.v11-notebook h2.v11-h1 { color: var(--v11-paper-ink); }
.v11-notebook__essay {
  font-family: var(--v11-font-serif);
  font-size: 18px;
  line-height: 1.7;
  color: var(--v11-paper-body);
}
.v11-notebook__essay p { margin: 0 0 var(--v11-s-5); }
.v11-notebook__essay em { color: var(--v11-accent-deep); font-style: italic; }
.v11-notebook__toc {
  display: flex;
  flex-wrap: wrap;
  gap: var(--v11-s-3);
  padding: var(--v11-s-4);
  background: rgba(11, 12, 14, 0.04);
  border-radius: var(--v11-radius);
  margin: var(--v11-s-5) 0;
  font-family: var(--v11-font-mono);
  font-size: var(--v11-fs-nano);
  letter-spacing: var(--v11-track-code);
  text-transform: uppercase;
  color: var(--v11-paper-muted);
}
.v11-notebook__toc a { color: var(--v11-paper-ink); }
.v11-notebook__toc a:hover { color: var(--v11-accent-deep); }
.v11-notebook__byline {
  display: flex;
  align-items: center;
  gap: 14px;
  margin: var(--v11-s-5) 0 var(--v11-s-6);
  padding: var(--v11-s-4) 0;
  border-top: 1px solid rgba(11, 12, 14, 0.12);
  border-bottom: 1px solid rgba(11, 12, 14, 0.12);
}
.v11-notebook__byline-photo {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  object-fit: cover;
  filter: grayscale(1) contrast(1.05);
  flex-shrink: 0;
  display: block;
}
.v11-notebook__byline-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.v11-notebook__byline-name {
  font-family: var(--v11-font-serif);
  font-size: 15px;
  color: var(--v11-paper-ink);
  letter-spacing: -0.005em;
}
.v11-notebook__byline-name strong { font-weight: 600; }
.v11-notebook__byline-sub {
  font-family: var(--v11-font-mono);
  font-size: var(--v11-fs-nano);
  letter-spacing: var(--v11-track-code);
  text-transform: uppercase;
  color: var(--v11-paper-muted);
}

/* ============== WORK / CASE CARDS ============== */
.v11-work {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--v11-s-5);
}
@media (min-width: 820px) {
  .v11-work { grid-template-columns: repeat(2, 1fr); }
}
.v11-case {
  background: var(--v11-bg-elevated);
  border: 1px solid var(--v11-line);
  border-radius: var(--v11-radius-card);
  padding: var(--v11-s-6);
  page-break-inside: avoid;
}
.v11-case__head {
  display: flex;
  flex-wrap: wrap;
  gap: var(--v11-s-3);
  align-items: baseline;
  margin-bottom: var(--v11-s-3);
  font-family: var(--v11-font-mono);
  font-size: var(--v11-fs-nano);
  letter-spacing: var(--v11-track-code);
  text-transform: uppercase;
  color: var(--v11-text-60);
}
.v11-case__client { color: var(--v11-accent); }
.v11-case__dates { margin-left: auto; color: var(--v11-text-subtle); }
.v11-case__title {
  font-family: var(--v11-font-display);
  font-size: var(--v11-fs-h3);
  font-weight: var(--v11-wt-semibold);
  line-height: var(--v11-lead-h);
  letter-spacing: var(--v11-track-snugger);
  color: var(--v11-text);
  margin: 0 0 var(--v11-s-3);
}
.v11-case__hook {
  font-size: var(--v11-fs-small);
  color: var(--v11-text-body);
  line-height: 1.6;
  margin: 0 0 var(--v11-s-4);
}
.v11-case__beats {
  display: grid;
  gap: var(--v11-s-3);
  margin: var(--v11-s-4) 0 var(--v11-s-4);
}
.v11-case__beat {
  display: grid;
  grid-template-columns: 110px 1fr;
  gap: var(--v11-s-3);
  font-size: var(--v11-fs-small);
}
@media (max-width: 540px) {
  .v11-case__beat { grid-template-columns: 1fr; gap: 4px; }
}
.v11-case__beat dt {
  font-family: var(--v11-font-mono);
  font-size: var(--v11-fs-nano);
  letter-spacing: var(--v11-track-code);
  text-transform: uppercase;
  color: var(--v11-text-60);
}
.v11-case__beat dd {
  margin: 0;
  color: var(--v11-text-body);
  line-height: 1.55;
}
.v11-case__stack {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: var(--v11-s-4);
}

/* ============== CHIPS (Named Skills) ============== */
.v11-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: var(--v11-radius-pill);
  background: var(--v11-artifact-chip-bg);
  border: 1px solid var(--v11-artifact-chip-line);
  color: var(--v11-artifact-chip-ink);
  font-family: var(--v11-font-mono);
  font-size: var(--v11-fs-nano);
  letter-spacing: var(--v11-track-code);
  text-transform: uppercase;
}
.v11-chip--cool {
  background: rgba(86, 131, 218, 0.10);
  border-color: rgba(86, 131, 218, 0.28);
  color: var(--v11-signal-cool);
}
.v11-chip--muted {
  background: rgba(255, 255, 255, 0.04);
  border-color: var(--v11-line-strong);
  color: var(--v11-text-60);
}
.v11-chip__at { color: var(--v11-text-subtle); }

/* ============== METHOD section ============== */
.v11-method {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--v11-s-5);
  margin: var(--v11-s-5) 0;
}
@media (min-width: 820px) {
  .v11-method { grid-template-columns: 1fr 1fr; align-items: start; }
}
.v11-plan {
  border: 1px solid var(--v11-line);
  border-radius: var(--v11-radius);
  padding: var(--v11-s-4);
  background: var(--v11-bg-elevated);
}
.v11-plan__head {
  display: flex; align-items: center; gap: var(--v11-s-2);
  font-family: var(--v11-font-mono);
  font-size: var(--v11-fs-nano);
  color: var(--v11-accent);
  letter-spacing: var(--v11-track-code);
  text-transform: uppercase;
  margin-bottom: var(--v11-s-3);
}
.v11-plan__list { list-style: none; padding: 0; margin: 0; counter-reset: v11step; }
.v11-plan__step {
  display: grid;
  grid-template-columns: 24px 1fr auto;
  gap: 12px;
  padding: 10px 0;
  border-top: 1px solid var(--v11-line);
  font-size: var(--v11-fs-small);
  align-items: center;
  color: var(--v11-text-body);
}
.v11-plan__step:first-child { border-top: 0; }
.v11-plan__step::before {
  counter-increment: v11step;
  content: counter(v11step, decimal-leading-zero);
  font-family: var(--v11-font-mono);
  color: var(--v11-text-subtle);
  font-size: var(--v11-fs-nano);
  letter-spacing: var(--v11-track-code);
}
.v11-plan__step--done { color: var(--v11-text-60); }
.v11-plan__step--done strong { text-decoration: line-through; text-decoration-color: var(--v11-text-subtle); }
.v11-plan__meta { font-family: var(--v11-font-mono); font-size: var(--v11-fs-nano); color: var(--v11-text-50); }

.v11-diff {
  background: var(--v11-bg-inset);
  border: 1px solid var(--v11-line);
  border-radius: var(--v11-radius);
  overflow: hidden;
  font-family: var(--v11-font-mono);
  font-size: var(--v11-fs-small);
  line-height: 1.6;
}
.v11-diff__row {
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: 12px;
  padding: 3px 12px;
  color: var(--v11-text-70);
}
.v11-diff__row--add { background: var(--v11-diff-add-bg); color: var(--v11-signal-pos); }
.v11-diff__row--del { background: var(--v11-diff-del-bg); color: var(--v11-signal-neg); }
.v11-diff__ln { color: var(--v11-text-subtle); text-align: right; user-select: none; }

/* ============== QUOTE ============== */
.v11-quote {
  padding: var(--v11-s-5) var(--v11-s-6);
  border-left: 2px solid var(--v11-accent);
  background: var(--v11-bg-elevated);
  border-radius: 0 var(--v11-radius) var(--v11-radius) 0;
  margin: var(--v11-s-4) 0;
}
.v11-quote__text {
  font-family: var(--v11-font-display);
  font-size: clamp(17px, 2vw, 20px);
  font-style: italic;
  line-height: 1.4;
  letter-spacing: var(--v11-track-snug);
  color: var(--v11-text);
  margin: 0 0 var(--v11-s-4);
}
.v11-quote__text::before {
  content: "\\" ";
  color: var(--v11-accent);
  font-style: normal;
}
.v11-quote__attr {
  display: flex;
  flex-wrap: wrap;
  gap: var(--v11-s-3);
  align-items: center;
}
.v11-quote__author {
  font-family: var(--v11-font-display);
  font-weight: var(--v11-wt-semibold);
  color: var(--v11-text);
  font-size: var(--v11-fs-small);
  letter-spacing: var(--v11-track-snug);
}
.v11-quote__role {
  font-family: var(--v11-font-mono);
  font-size: var(--v11-fs-nano);
  color: var(--v11-text-60);
  letter-spacing: var(--v11-track-snug);
}
.v11-quote__badge {
  font-family: var(--v11-font-mono);
  font-size: 9px;
  padding: 3px 8px;
  border-radius: var(--v11-radius-pill);
  color: var(--v11-accent);
  border: 1px solid var(--v11-accent-line);
  letter-spacing: var(--v11-track-micro);
  text-transform: uppercase;
  margin-left: auto;
}

/* ============== CONTACT ============== */
.v11-contact {
  display: grid;
  gap: var(--v11-s-4);
  padding: var(--v11-s-6);
  background: var(--v11-bg-elevated);
  border: 1px solid var(--v11-line);
  border-radius: var(--v11-radius-card);
  max-width: 560px;
}
.v11-contact__headline {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--v11-font-mono);
  font-size: var(--v11-fs-micro);
  color: var(--v11-text-60);
  letter-spacing: var(--v11-track-snug);
}
.v11-contact__email-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--v11-s-3);
  align-items: center;
  justify-content: space-between;
  padding: var(--v11-s-3) var(--v11-s-4);
  background: var(--v11-bg-primary);
  border: 1px solid var(--v11-line);
  border-radius: var(--v11-radius-sm);
}
.v11-contact__email {
  font-family: var(--v11-font-mono);
  font-size: var(--v11-fs-small);
  color: var(--v11-text);
  letter-spacing: var(--v11-track-snug);
  word-break: break-all;
}
.v11-contact__copy {
  font-family: var(--v11-font-mono);
  font-size: var(--v11-fs-nano);
  letter-spacing: var(--v11-track-code);
  text-transform: uppercase;
  padding: 7px 12px;
  border: 1px solid var(--v11-line-strong);
  border-radius: var(--v11-radius-sm);
  color: var(--v11-text);
  transition: color var(--v11-dur-fast), border-color var(--v11-dur-fast);
}
.v11-contact__copy:hover { border-color: var(--v11-accent); color: var(--v11-accent); }
.v11-contact__copy[data-copied="true"] { border-color: var(--v11-accent); color: var(--v11-accent); }
.v11-contact__socials {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 10px;
}
.v11-contact__social {
  padding: 12px;
  border: 1px solid var(--v11-line);
  border-radius: var(--v11-radius-sm);
  transition: border-color var(--v11-dur-fast);
}
.v11-contact__social:hover { border-color: var(--v11-accent); }
.v11-contact__social-label {
  display: block;
  font-family: var(--v11-font-mono);
  font-size: var(--v11-fs-nano);
  letter-spacing: var(--v11-track-code);
  text-transform: uppercase;
  color: var(--v11-accent);
  margin-bottom: 3px;
}
.v11-contact__social-handle {
  display: block;
  font-family: var(--v11-font-mono);
  font-size: var(--v11-fs-nano);
  color: var(--v11-text-80);
  letter-spacing: var(--v11-track-snug);
  word-break: break-all;
}

/* ============== FOOTER ============== */
.v11-footer {
  padding: var(--v11-s-6) 0;
  background: var(--v11-bg-deep);
  border-top: 1px solid var(--v11-line);
}
.v11-footer__inner {
  max-width: var(--v11-container);
  margin: 0 auto;
  padding: 0 var(--v11-pad-x);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: var(--v11-s-3);
  font-family: var(--v11-font-mono);
  font-size: var(--v11-fs-nano);
  color: var(--v11-text-40);
  letter-spacing: var(--v11-track-snug);
}
.v11-footer a { color: var(--v11-text-70); transition: color var(--v11-dur-fast); }
.v11-footer a:hover { color: var(--v11-accent); }

/* ============== reduced motion (V11 R7 floor 04) ============== */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
  .v11-live { animation: none; box-shadow: 0 0 0 3px var(--v11-accent-soft); }
  .v11-stream__head::before { animation: none; opacity: 1; }
  .v11-stream__caret { animation: none; opacity: 1; }
}

/* ============== HORIZON TIMELINE ============== */
.v11-horizon {
  padding: 64px 0;
  background: var(--v11-bg-alt);
  border-bottom: 1px solid var(--v11-line);
}
.v11-horizon__eyebrow {
  font-family: var(--v11-font-mono, "JetBrains Mono", ui-monospace, monospace);
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--v11-accent);
  margin: 0 0 12px;
}
.v11-horizon__title {
  font-size: 28px;
  font-weight: 600;
  letter-spacing: -0.01em;
  margin: 0 0 40px;
  color: var(--v11-text);
}

/* Progress bar — segmented rail sits ABOVE tool rail and columns */
.v11-horizon__progress {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 6px;
  padding: 0 22px;
  margin: 36px 0 16px;
}
.v11-horizon__seg {
  height: 6px;
  border-radius: 3px;
  position: relative;
}
.v11-horizon__seg--earned {
  background: var(--v11-signal-pos);
  box-shadow: 0 0 0 1px rgba(74, 222, 128, 0.32);
}
.v11-horizon__seg--investing {
  background: var(--v11-accent);
}
.v11-horizon__seg--horizon {
  background: transparent;
  border: 1px dashed var(--v11-accent);
}
.v11-horizon__marker {
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--v11-font-mono, "JetBrains Mono", ui-monospace, monospace);
  font-size: 9px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--v11-accent);
  white-space: nowrap;
  padding: 3px 10px;
  background: var(--v11-accent-soft);
  border: 1px solid var(--v11-accent-line);
  border-radius: 3px;
  font-weight: 600;
}
.v11-horizon__marker::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -4px;
  border: 4px solid transparent;
  border-top-color: var(--v11-accent);
}

/* Tool rail — neutral monochrome pills, canonical tool inventory */
.v11-horizon__tools {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0;
  margin-bottom: 8px;
}
.v11-horizon__tools-block {
  padding: 14px 22px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  font-family: var(--v11-font-mono, "JetBrains Mono", ui-monospace, monospace);
  font-size: 11px;
  letter-spacing: 0.02em;
}
.v11-horizon__tools-block + .v11-horizon__tools-block {
  border-left: 1px solid var(--v11-line);
}
.v11-horizon__tool {
  padding: 4px 10px;
  border-radius: 4px;
  background: var(--v11-bg-inset);
  border: 1px solid var(--v11-line);
  color: var(--v11-text-70);
  font-weight: 500;
  text-transform: uppercase;
  font-size: 10px;
  letter-spacing: 0.06em;
}
.v11-horizon__arrow {
  color: var(--v11-text-40);
  font-size: 11px;
  font-weight: 500;
}

/* Main grid — stage labels → headings → body → content chips */
.v11-horizon__grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0;
}
.v11-horizon__col {
  padding: 16px 22px 0;
  position: relative;
}
.v11-horizon__col + .v11-horizon__col {
  border-left: 1px solid var(--v11-line);
}
.v11-horizon__stage {
  font-family: var(--v11-font-mono, "JetBrains Mono", ui-monospace, monospace);
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--v11-text-50);
  margin-bottom: 14px;
}
.v11-horizon__col[data-horizon-col='earned'] .v11-horizon__stage {
  color: var(--v11-signal-pos);
}
.v11-horizon__col[data-emphasis="true"] .v11-horizon__stage {
  color: var(--v11-accent);
}
.v11-horizon__heading {
  font-size: 17px;
  font-weight: 600;
  letter-spacing: -0.005em;
  margin: 0 0 10px;
  color: var(--v11-text);
}
.v11-horizon__body {
  font-size: 14px;
  line-height: 1.55;
  color: var(--v11-text-70);
  margin: 0 0 16px;
}

/* Content chips */
.v11-horizon__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  list-style: none;
  margin: 0;
  padding: 0 0 4px;
}
.v11-horizon__chip {
  font-family: var(--v11-font-mono, "JetBrains Mono", ui-monospace, monospace);
  font-size: 11px;
  padding: 4px 10px 4px 8px;
  border-radius: 999px;
  background: var(--v11-bg-inset);
  color: var(--v11-text-70);
  border: 1px solid var(--v11-line);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  line-height: 1;
}
a.v11-horizon__chip:hover,
a.v11-horizon__chip:focus-visible {
  border-color: var(--v11-accent-line);
  color: var(--v11-text);
  outline: none;
}
a.v11-horizon__chip:focus-visible {
  box-shadow: 0 0 0 3px var(--v11-accent-ring);
}

/* Earned chips — achieved milestones (green pill + inline check glyph) */
[data-horizon-col='earned'] .v11-horizon__chip {
  background: rgba(74, 222, 128, 0.14);
  border-color: rgba(74, 222, 128, 0.32);
  color: var(--v11-text);
  text-decoration: none;
}
[data-horizon-col='earned'] .v11-horizon__chip::before {
  content: "";
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: var(--v11-signal-pos);
  flex-shrink: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cpath d='M2.5 6.2l2.3 2.3 4.7-4.7' stroke='%230A0B0E' stroke-width='1.6' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 9px 9px;
}
[data-horizon-col='investing'] .v11-horizon__chip {
  background: var(--v11-accent-soft);
  color: var(--v11-text);
  border-color: var(--v11-accent-line);
}
[data-horizon-col='horizon'] .v11-horizon__chip[data-kind='bet'] {
  border-style: dashed;
  color: var(--v11-text-body);
}
.v11-horizon__bet-badge {
  font-size: 9px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--v11-signal-warn);
  font-weight: 600;
  padding: 1px 5px;
  border: 1px solid var(--v11-signal-warn);
  border-radius: 3px;
  line-height: 1;
}

@media (max-width: 920px) {
  .v11-horizon__progress { display: none; }
  .v11-horizon__tools,
  .v11-horizon__grid {
    grid-template-columns: 1fr;
  }
  .v11-horizon__tools-block + .v11-horizon__tools-block,
  .v11-horizon__col + .v11-horizon__col {
    border-left: 0;
    border-top: 1px solid var(--v11-line);
    margin-top: 12px;
    padding-top: 16px;
  }
}
`;
