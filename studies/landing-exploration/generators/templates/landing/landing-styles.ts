/**
 * Inline CSS blob for the landing page. Concatenated after tokens-landing.css
 * by the orchestrator. Mobile-first, dark-dominant, WAI-ARIA-tab aware.
 */
export const LANDING_STYLES = `
/* =========================================================================
 * reset + base
 * ========================================================================= */
*, *::before, *::after { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: var(--font-body);
  font-size: var(--fs-base);
  line-height: var(--lh-body);
  background: var(--bg-ink);
  color: var(--ink-body);
  -webkit-font-smoothing: antialiased;
  min-height: 100vh;
  overflow-x: hidden;
  font-feature-settings: "kern", "liga", "calt";
}
a { color: inherit; text-decoration: none; }
button { font: inherit; color: inherit; background: none; border: none; cursor: pointer; padding: 0; }
ul, ol { list-style: none; padding: 0; margin: 0; }
img { max-width: 100%; display: block; }
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
  border-radius: var(--radius-sm);
}

/* =========================================================================
 * page container + nav
 * ========================================================================= */
.lp-page { min-height: 100vh; }

.lp-nav {
  position: sticky; top: 0; z-index: 50;
  background: rgba(10,10,15,0.85);
  backdrop-filter: saturate(140%) blur(14px);
  -webkit-backdrop-filter: saturate(140%) blur(14px);
  border-bottom: 1px solid var(--line);
}
.lp-nav__inner {
  max-width: var(--content-max);
  margin: 0 auto;
  padding: var(--s-3) var(--page-pad-x);
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: var(--s-4);
}
.lp-nav__brand {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink);
}
.lp-nav__slash { color: var(--ink-subtle); }
.lp-nav__role { color: var(--accent); }

.lp-nav__tabs {
  display: flex;
  gap: var(--s-1);
  overflow-x: auto;
  scrollbar-width: none;
  justify-content: center;
}
.lp-nav__tabs::-webkit-scrollbar { display: none; }

.lp-tab {
  font-family: var(--font-mono);
  font-size: var(--fs-xxs);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-muted);
  padding: 8px 10px;
  border-radius: var(--radius-sm);
  transition: color var(--dur-fast) var(--ease);
  white-space: nowrap;
}
.lp-tab:hover { color: var(--ink); }
.lp-tab[aria-selected="true"],
.lp-tab--active {
  color: var(--accent);
  background: var(--accent-soft);
}

.lp-lang {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: var(--font-mono);
  font-size: var(--fs-xxs);
  letter-spacing: 0.14em;
  padding: 6px 10px;
  border: 1px solid var(--line);
  border-radius: var(--radius-pill);
  color: var(--ink-muted);
  transition: border-color var(--dur-fast), color var(--dur-fast);
}
.lp-lang:hover { border-color: var(--accent); color: var(--accent); }
.lp-lang__sep { opacity: 0.4; }
.lp-lang__code--target { color: var(--ink); }

/* =========================================================================
 * tabpanels + section scaffolding
 * ========================================================================= */
.lp-main {
  max-width: var(--content-max);
  margin: 0 auto;
  padding: 0 var(--page-pad-x);
}
.lp-panel {
  padding: var(--s-8) 0 var(--s-9);
  min-height: 60vh;
  position: relative;
}
.lp-panel[hidden] { display: none !important; }
.lp-panel__eyebrow {
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: var(--s-4);
}
.lp-panel__eyebrow::before { content: "// "; color: var(--ink-subtle); }
.lp-panel__title {
  font-family: var(--font-display);
  font-size: clamp(28px, 5vw, 44px);
  letter-spacing: -0.02em;
  line-height: var(--lh-tight);
  color: var(--ink);
  margin: 0 0 var(--s-5);
  font-weight: 600;
}
.lp-panel__lead {
  font-size: clamp(16px, 2.2vw, 19px);
  line-height: var(--lh-snug);
  color: var(--ink);
  max-width: 62ch;
  margin: 0 0 var(--s-7);
}

/* =========================================================================
 * hero
 * ========================================================================= */
.lp-hero {
  padding: var(--s-8) 0 var(--s-7);
  position: relative;
}
.lp-hero__eyebrow {
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: var(--s-5);
}
.lp-hero__eyebrow::before { content: "// "; color: var(--ink-subtle); }
.lp-hero__name {
  font-family: var(--font-display);
  font-size: clamp(44px, 9vw, 96px);
  letter-spacing: -0.04em;
  line-height: 0.95;
  margin: 0 0 var(--s-6);
  font-weight: 600;
  color: var(--ink);
}
.lp-hero__name-first { color: var(--ink); }
.lp-hero__name-last { color: var(--accent); font-weight: 400; }
.lp-hero__thesis {
  font-family: var(--font-display);
  font-size: clamp(20px, 3vw, 28px);
  letter-spacing: -0.015em;
  line-height: 1.25;
  color: var(--ink);
  margin: 0 0 var(--s-4);
  max-width: 22ch;
  font-weight: 500;
}
.lp-hero__tagline {
  font-size: clamp(14px, 1.8vw, 16px);
  line-height: var(--lh-body);
  color: var(--ink-body);
  max-width: 54ch;
  margin: 0 0 var(--s-6);
}
.lp-hero__actions {
  display: flex; flex-wrap: wrap;
  align-items: center;
  gap: var(--s-5);
}
.lp-hero__availability {
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  letter-spacing: 0.08em;
  color: var(--ink-muted);
  display: inline-flex; align-items: center; gap: 8px;
}

.lp-live-dot {
  display: inline-block;
  width: 8px; height: 8px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-soft);
  animation: lp-livepulse 2.4s ease-in-out infinite;
}
@keyframes lp-livepulse {
  0%, 100% { box-shadow: 0 0 0 3px var(--accent-soft); }
  50%      { box-shadow: 0 0 0 8px rgba(255,137,100,.04); }
}

/* =========================================================================
 * buttons
 * ========================================================================= */
.lp-btn {
  display: inline-flex; align-items: center; gap: 10px;
  font-family: var(--font-body);
  font-weight: 600;
  font-size: var(--fs-sm);
  padding: 12px 22px;
  border-radius: var(--radius-pill);
  transition: transform var(--dur-fast) var(--ease), background var(--dur-fast);
  white-space: nowrap;
}
.lp-btn--primary {
  background: var(--accent);
  color: var(--accent-ink);
}
.lp-btn--primary:hover {
  background: var(--accent-deep);
  transform: translateY(-1px);
}
.lp-btn--large {
  font-size: var(--fs-md);
  padding: 16px 28px;
}
.lp-btn__arrow { display: inline-block; transition: transform var(--dur-fast); }
.lp-btn:hover .lp-btn__arrow { transform: translateX(3px); }

/* =========================================================================
 * proof-numbers
 * ========================================================================= */
.lp-proof {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--s-4) var(--s-5);
  padding: var(--s-5) 0;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  margin: var(--s-6) 0;
}
@media (min-width: 720px) {
  .lp-proof { grid-template-columns: repeat(4, 1fr); }
}
.lp-proof__item { min-width: 0; }
.lp-proof__num {
  font-family: var(--font-display);
  font-size: clamp(28px, 4vw, 38px);
  letter-spacing: -0.02em;
  line-height: 1;
  color: var(--ink);
  font-weight: 600;
}
.lp-proof__unit { color: var(--accent); }
.lp-proof__label {
  font-family: var(--font-mono);
  font-size: var(--fs-xxs);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-muted);
  margin-top: 6px;
}

/* =========================================================================
 * work · case cards
 * ========================================================================= */
.lp-cases {
  display: grid;
  gap: var(--s-4);
  grid-template-columns: 1fr;
}
@media (min-width: 820px) {
  .lp-cases { grid-template-columns: repeat(2, 1fr); }
  .lp-case--featured { grid-column: 1 / -1; }
}

.lp-case {
  background: var(--bg-ink-alt);
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  transition: border-color var(--dur-fast), background var(--dur-fast);
  overflow: hidden;
}
.lp-case:hover { border-color: var(--line-strong); }
.lp-case--featured {
  background: linear-gradient(180deg, var(--bg-ink-raise) 0%, var(--bg-ink-alt) 100%);
  border-color: var(--accent-ring);
}

.lp-case__header {
  display: block;
  width: 100%;
  text-align: left;
  padding: var(--s-5);
  cursor: pointer;
}
.lp-case__meta {
  display: flex; justify-content: space-between; gap: var(--s-3);
  font-family: var(--font-mono);
  font-size: var(--fs-xxs);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-muted);
  margin-bottom: var(--s-3);
}
.lp-case__client { color: var(--accent); }
.lp-case__title {
  font-family: var(--font-display);
  font-size: clamp(18px, 2.2vw, 22px);
  letter-spacing: -0.015em;
  line-height: 1.2;
  color: var(--ink);
  margin: 0 0 var(--s-3);
  font-weight: 600;
}
.lp-case__hook {
  font-size: var(--fs-sm);
  line-height: var(--lh-body);
  color: var(--ink-body);
  margin: 0 0 var(--s-4);
}
.lp-case__more {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: var(--font-mono);
  font-size: var(--fs-xxs);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent);
}
.lp-case__chevron {
  display: inline-flex; align-items: center; justify-content: center;
  width: 18px; height: 18px; border-radius: 50%;
  border: 1px solid var(--accent);
  transition: transform var(--dur-fast);
}
.lp-case__header[aria-expanded="true"] .lp-case__chevron { transform: rotate(45deg); }

.lp-case__body {
  padding: 0 var(--s-5) var(--s-5);
  border-top: 1px solid var(--line-soft);
  animation: lp-expand var(--dur-base) var(--ease);
}
@keyframes lp-expand {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}
.lp-case__bullets {
  display: grid; gap: var(--s-2);
  margin: var(--s-4) 0;
}
.lp-case__bullets li {
  font-size: var(--fs-sm);
  line-height: var(--lh-body);
  color: var(--ink-body);
  padding-left: 18px;
  position: relative;
}
.lp-case__bullets li::before {
  content: "—";
  position: absolute; left: 0; top: 0;
  color: var(--accent);
  font-family: var(--font-mono);
}
.lp-case__stack {
  display: flex; flex-wrap: wrap; gap: 6px;
}
.lp-case__tag {
  font-family: var(--font-mono);
  font-size: var(--fs-xxs);
  padding: 3px 8px;
  border-radius: var(--radius-sm);
  background: var(--line-soft);
  border: 1px solid var(--line);
  color: var(--ink-body);
  letter-spacing: 0.04em;
  text-transform: lowercase;
}

/* =========================================================================
 * method · diagram
 * ========================================================================= */
.lp-method {
  margin: var(--s-6) 0;
  padding: var(--s-5);
  background: var(--bg-ink-alt);
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  overflow-x: auto;
}
.lp-method svg {
  width: 100%; height: auto;
  min-width: 560px;
  max-width: 760px;
  display: block;
  margin: 0 auto;
}

/* =========================================================================
 * timeline (about)
 * ========================================================================= */
.lp-timeline {
  display: grid;
  gap: var(--s-4);
  margin: var(--s-6) 0;
  position: relative;
  padding-left: 28px;
}
.lp-timeline::before {
  content: "";
  position: absolute; left: 7px; top: 6px; bottom: 6px;
  width: 1px;
  background: var(--line);
}
.lp-timeline__row {
  display: grid;
  grid-template-columns: minmax(80px, 120px) 1fr;
  gap: var(--s-4);
  align-items: start;
  position: relative;
}
.lp-timeline__marker {
  position: absolute;
  left: -28px; top: 7px;
  width: 15px; height: 15px;
  border-radius: 50%;
  background: var(--bg-ink);
  border: 2px solid var(--line-strong);
}
.lp-timeline__row--current .lp-timeline__marker {
  border-color: var(--accent);
  background: var(--accent);
  box-shadow: 0 0 0 4px var(--accent-soft);
}
.lp-timeline__years {
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  letter-spacing: 0.06em;
  color: var(--ink-muted);
  padding-top: 2px;
}
.lp-timeline__company {
  font-family: var(--font-display);
  font-size: var(--fs-md);
  letter-spacing: -0.015em;
  color: var(--ink);
  font-weight: 600;
}
.lp-timeline__role {
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  color: var(--accent);
  letter-spacing: 0.04em;
  margin-bottom: 4px;
}
.lp-timeline__desc {
  font-size: var(--fs-sm);
  color: var(--ink-body);
  line-height: var(--lh-body);
  margin: 0;
}
@media (max-width: 600px) {
  .lp-timeline__row { grid-template-columns: 1fr; }
  .lp-timeline__years { padding-top: 0; }
}

/* =========================================================================
 * testimonial
 * ========================================================================= */
.lp-quote {
  margin: var(--s-5) 0;
  padding: var(--s-5) var(--s-6);
  border-left: 3px solid var(--accent);
  background: var(--bg-ink-alt);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
}
.lp-quote__text {
  font-family: var(--font-display);
  font-size: clamp(16px, 2.2vw, 20px);
  letter-spacing: -0.01em;
  line-height: 1.4;
  color: var(--ink);
  font-style: italic;
  margin: 0 0 var(--s-4);
  position: relative;
}
.lp-quote__mark {
  color: var(--accent);
  font-family: var(--font-display);
  font-size: 2em;
  line-height: 0;
  vertical-align: -0.2em;
  margin-right: 4px;
  font-style: normal;
}
.lp-quote__attr {
  display: flex; flex-wrap: wrap; align-items: center; gap: var(--s-3);
  font-family: var(--font-mono);
  font-size: var(--fs-xxs);
  letter-spacing: 0.06em;
  color: var(--ink-muted);
}
.lp-quote__author {
  font-family: var(--font-display);
  font-size: var(--fs-sm);
  color: var(--ink);
  letter-spacing: -0.01em;
  font-weight: 600;
  font-style: normal;
}
.lp-quote__role { color: var(--ink-muted); }
.lp-quote__badge {
  font-family: var(--font-mono);
  font-size: 9px;
  padding: 3px 8px;
  border-radius: var(--radius-pill);
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
.lp-quote__badge--verified {
  color: var(--accent);
  border: 1px solid var(--accent);
}
.lp-quote__badge--attributed {
  color: var(--ink-muted);
  border: 1px solid var(--line-strong);
}

/* =========================================================================
 * contact
 * ========================================================================= */
.lp-contact {
  display: grid;
  gap: var(--s-5);
  max-width: 520px;
  padding: var(--s-6);
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  background: var(--bg-ink-alt);
}
.lp-contact__headline {
  display: inline-flex; align-items: center; gap: 10px;
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  letter-spacing: 0.08em;
  color: var(--ink-muted);
}
.lp-contact__email-row {
  display: flex; flex-wrap: wrap;
  justify-content: space-between; align-items: center;
  gap: var(--s-3);
  padding: var(--s-3) var(--s-4);
  background: var(--bg-ink);
  border: 1px solid var(--line);
  border-radius: var(--radius-sm);
}
.lp-contact__email {
  font-family: var(--font-mono);
  font-size: var(--fs-sm);
  color: var(--ink);
  letter-spacing: 0.02em;
  word-break: break-all;
}
.lp-contact__copy {
  font-family: var(--font-mono);
  font-size: var(--fs-xxs);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 6px 10px;
  border: 1px solid var(--line-strong);
  border-radius: var(--radius-sm);
  color: var(--ink);
  transition: border-color var(--dur-fast), color var(--dur-fast);
}
.lp-contact__copy:hover { border-color: var(--accent); color: var(--accent); }
.lp-contact__copy[data-copied="true"] {
  border-color: var(--accent);
  color: var(--accent);
}
.lp-contact__socials {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: var(--s-3);
}
.lp-contact__social {
  padding: 10px 12px;
  border: 1px solid var(--line);
  border-radius: var(--radius-sm);
  transition: border-color var(--dur-fast);
}
.lp-contact__social:hover { border-color: var(--accent); }
.lp-contact__social-label {
  display: block;
  font-family: var(--font-mono);
  font-size: var(--fs-xxs);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 2px;
}
.lp-contact__social-handle {
  display: block;
  font-family: var(--font-mono);
  font-size: var(--fs-xxs);
  color: var(--ink-body);
  letter-spacing: 0.02em;
  word-break: break-all;
}

/* =========================================================================
 * section-visual — decorative, aria-hidden
 * ========================================================================= */
.lp-visual {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.5;
  z-index: 0;
}
.lp-visual--particles {
  background-image:
    radial-gradient(circle at 20% 30%, rgba(255,137,100,0.12) 0, transparent 2px),
    radial-gradient(circle at 80% 60%, rgba(255,137,100,0.08) 0, transparent 3px),
    radial-gradient(circle at 50% 80%, rgba(255,255,255,0.04) 0, transparent 2px),
    radial-gradient(circle at 10% 70%, rgba(255,255,255,0.04) 0, transparent 2px);
  background-size: 600px 600px, 800px 800px, 500px 500px, 700px 700px;
}
.lp-visual--grid {
  background-image:
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse at center, #000 40%, transparent 85%);
  -webkit-mask-image: radial-gradient(ellipse at center, #000 40%, transparent 85%);
}
.lp-visual--flow {
  background: linear-gradient(90deg,
    transparent 0%,
    rgba(255,137,100,0.05) 50%,
    transparent 100%);
}
.lp-visual--timeline {
  background-image: repeating-linear-gradient(
    to bottom,
    rgba(255,255,255,0.04) 0 1px,
    transparent 1px 60px
  );
}
.lp-visual--signature {
  background: radial-gradient(circle at 70% 30%, var(--accent-soft) 0%, transparent 45%);
}

/* section has to become a stacking context so .lp-visual sits behind content */
.lp-panel { isolation: isolate; }
.lp-panel > *:not(.lp-visual) { position: relative; z-index: 1; }

/* =========================================================================
 * me-agent-dock (Phase 4+ placeholder)
 * ========================================================================= */
.lp-me-dock[data-phase="reserved"] { display: none !important; }

/* =========================================================================
 * footer
 * ========================================================================= */
.lp-footer {
  max-width: var(--content-max);
  margin: 0 auto;
  padding: var(--s-6) var(--page-pad-x);
  border-top: 1px solid var(--line);
  font-family: var(--font-mono);
  font-size: var(--fs-xxs);
  letter-spacing: 0.08em;
  color: var(--ink-muted);
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--s-3);
}

/* =========================================================================
 * reduced motion
 * ========================================================================= */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
  .lp-live-dot { animation: none; box-shadow: 0 0 0 3px var(--accent-soft); }
}
`;
