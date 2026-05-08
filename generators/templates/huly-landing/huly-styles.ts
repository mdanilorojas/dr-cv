/**
 * Inline CSS blob for the Huly-faithful landing.
 * Concatenated AFTER tokens-huly.css by the orchestrator.
 * Long-scroll layout (no tabs). Dark/cream alternation. Huly type scale + CTA.
 */
export const HULY_STYLES = `
/* ============== reset ============== */
*, *::before, *::after { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: var(--hl-font-body);
  font-size: var(--hl-text-body);
  line-height: var(--hl-lead-body);
  background: var(--hl-bg-primary);
  color: var(--hl-text-body);
  -webkit-font-smoothing: antialiased;
  min-height: 100vh;
  overflow-x: hidden;
  font-feature-settings: "kern", "liga", "calt";
}
a { color: inherit; text-decoration: none; }
button { font: inherit; color: inherit; background: none; border: none; cursor: pointer; padding: 0; }
ul, ol { list-style: none; padding: 0; margin: 0; }
img { max-width: 100%; display: block; }
:focus-visible { outline: 2px solid var(--hl-accent); outline-offset: 3px; border-radius: var(--hl-radius-sm); }

.hl-container { max-width: var(--hl-container); margin: 0 auto; padding: 0 var(--hl-pad-x); }
.hl-container-narrow { max-width: var(--hl-container-narrow); margin: 0 auto; padding: 0 var(--hl-pad-x); }

/* ============== NAV ============== */
.hl-nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 50;
  padding: 18px 0;
  backdrop-filter: saturate(140%) blur(12px);
  -webkit-backdrop-filter: saturate(140%) blur(12px);
  background: rgba(9, 10, 12, 0.65);
  border-bottom: 1px solid transparent;
  transition: border-color var(--hl-dur-fast) var(--hl-ease);
}
.hl-nav.is-scrolled { border-bottom-color: var(--hl-line); }
.hl-nav__inner {
  display: flex; align-items: center; gap: 20px;
  max-width: var(--hl-container);
  margin: 0 auto;
  padding: 0 var(--hl-pad-x);
}
.hl-nav__brand {
  font-family: var(--hl-font-display);
  font-size: 15px;
  color: var(--hl-text);
  letter-spacing: var(--hl-track-snug);
  font-weight: 500;
}
.hl-nav__brand-accent { color: var(--hl-accent); }
.hl-nav__links {
  display: flex; gap: 28px; margin-left: auto;
  align-items: center;
}
.hl-nav__link {
  font-size: var(--hl-text-small);
  color: var(--hl-text);
  letter-spacing: var(--hl-track-snugger);
  transition: color var(--hl-dur-fast) var(--hl-ease);
}
.hl-nav__link:hover { color: var(--hl-accent-cool); }
.hl-nav__lang {
  font-family: var(--hl-font-mono);
  font-size: var(--hl-text-nano);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 7px 12px;
  border: 1px solid var(--hl-line);
  border-radius: var(--hl-radius-pill);
  color: var(--hl-text-80);
  transition: color var(--hl-dur-fast), border-color var(--hl-dur-fast);
}
.hl-nav__lang:hover { color: var(--hl-accent); border-color: var(--hl-accent); }
.hl-nav__cta {
  font-family: var(--hl-font-body);
  font-size: var(--hl-text-nano);
  letter-spacing: 0;
  text-transform: uppercase;
  font-weight: 700;
  padding: 8px 16px;
  border: 1px solid var(--hl-line-strong);
  border-radius: var(--hl-radius-pill);
  color: var(--hl-text);
  transition: border-color var(--hl-dur-fast), color var(--hl-dur-fast);
}
.hl-nav__cta:hover { border-color: rgba(255,255,255,0.5); }
@media (max-width: 767px) {
  .hl-nav__links { display: none; }
}

/* ============== SECTION base ============== */
.hl-section {
  position: relative;
  padding: clamp(72px, 10vw, 150px) 0;
}
.hl-section--hero {
  padding-top: clamp(100px, 14vw, 220px);
  padding-bottom: clamp(120px, 14vw, 180px);
  min-height: 100vh;
  background: var(--hl-bg-primary);
  overflow: hidden;
}
.hl-section--cream {
  background: var(--hl-bg-secondary);
  color: var(--hl-text-dark-body);
}
.hl-section--dark-alt {
  background: var(--hl-bg-inverse);
}
.hl-section__eyebrow {
  font-family: var(--hl-font-mono);
  font-size: var(--hl-text-micro);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--hl-accent);
  margin-bottom: 20px;
}
.hl-section--cream .hl-section__eyebrow { color: var(--hl-accent-burn); }

/* ============== HERO ============== */
.hl-hero__grid {
  display: grid;
  grid-template-columns: 1fr;
  align-items: end;
  gap: 40px;
  position: relative;
  z-index: 2;
}
.hl-hero__name {
  font-family: var(--hl-font-display);
  font-size: var(--hl-text-h1);
  letter-spacing: var(--hl-track-tight);
  line-height: var(--hl-lead-h1);
  font-weight: 600;
  margin: 0 0 24px;
  background: linear-gradient(to bottom right,
    var(--hl-head-1) 30%,
    var(--hl-head-2) 80%,
    var(--hl-head-3));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}
.hl-hero__sub {
  font-family: var(--hl-font-body);
  font-size: var(--hl-text-lead);
  line-height: 1.45;
  color: var(--hl-text-body);
  max-width: 46ch;
  margin: 0 0 40px;
  letter-spacing: var(--hl-track-snugger);
}
.hl-hero__actions {
  display: flex; flex-wrap: wrap; align-items: center;
  gap: 22px;
}
.hl-hero__live {
  display: inline-flex; align-items: center; gap: 10px;
  font-family: var(--hl-font-mono);
  font-size: var(--hl-text-micro);
  letter-spacing: 0.08em;
  color: var(--hl-text-60);
  text-transform: uppercase;
}

/* ============== HERO MASK BG ============== */
.hl-hero__bg {
  position: absolute; inset: 0; z-index: 0;
  pointer-events: none;
}
.hl-hero__aurora {
  position: absolute;
  left: 50%; bottom: -20%;
  transform: translateX(-50%);
  width: 150vw;
  max-width: 2200px;
  aspect-ratio: 1.07 / 1;
  background:
    radial-gradient(ellipse 60% 55% at 20% 80%, rgba(86,131,218,0.22) 0%, transparent 55%),
    radial-gradient(ellipse 55% 50% at 80% 70%, rgba(255,137,100,0.28) 0%, transparent 55%),
    radial-gradient(ellipse 40% 40% at 50% 90%, rgba(213,216,246,0.18) 0%, transparent 60%);
  filter: blur(40px);
  mix-blend-mode: lighten;
  opacity: 0.9;
}
.hl-hero__mask {
  position: absolute; inset: 0;
  background:
    repeating-linear-gradient(
      110deg,
      transparent 0 80px,
      rgba(255,255,255,0.015) 80px 81px
    ),
    repeating-linear-gradient(
      70deg,
      transparent 0 100px,
      rgba(255,137,100,0.015) 100px 101px
    );
  mix-blend-mode: overlay;
  --hl-mask-x: 50%;
  --hl-mask-y: 60%;
  --hl-mask-size: 0px;
  clip-path: circle(var(--hl-mask-size) at var(--hl-mask-x) var(--hl-mask-y));
  transition: clip-path var(--hl-dur-med) var(--hl-ease);
}
.hl-hero__fade {
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 340px;
  background: linear-gradient(to bottom, rgba(9,10,12,0) 0%, var(--hl-bg-primary) 50%);
  z-index: 1;
  pointer-events: none;
}

/* ============== CTA pill (Huly signature) ============== */
.hl-cta {
  position: relative;
  display: inline-flex;
  isolation: isolate;
}
.hl-cta__pill {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  height: 44px;
  padding: 0 28px;
  border-radius: var(--hl-radius-pill);
  background: #d1d1d1;
  border: 1px solid rgba(255, 255, 255, 0.60);
  color: var(--hl-cta-text);
  font-family: var(--hl-font-body);
  font-weight: 700;
  font-size: var(--hl-text-micro);
  text-transform: uppercase;
  letter-spacing: -0.015em;
  overflow: hidden;
  z-index: 2;
  transition: transform var(--hl-dur-fast) var(--hl-ease);
}
.hl-cta__pill:hover { transform: translateY(-1px); }
.hl-cta__pill::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(50% 50% at 50% 50%,
    var(--hl-glow-1) 3.5%,
    var(--hl-glow-2) 26.5%,
    var(--hl-glow-3) 37.5%,
    rgba(255,170,129,0.50) 49%,
    rgba(210,106,58,0) 92.5%);
  z-index: -1;
}
.hl-cta__pill::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(43.3% 44.23% at 50% 49.51%,
    #FFFFF7 29%,
    #FFFACD 48.5%,
    #F4D2BF 60.71%,
    rgba(214,211,210,0) 100%);
  filter: blur(5px);
  z-index: -1;
}
.hl-cta__aura {
  position: absolute;
  inset: -9px;
  border-radius: var(--hl-radius-pill);
  background: radial-gradient(50% 60% at 50% 50%, rgba(255,218,159,0.45) 0%, rgba(255,137,100,0) 75%);
  filter: blur(18px);
  z-index: 1;
  pointer-events: none;
}
.hl-cta__arrow { font-family: var(--hl-font-body); position: relative; z-index: 3; }

.hl-cta--ghost {
  display: inline-flex; align-items: center; gap: 10px;
  height: 44px; padding: 0 22px;
  border-radius: var(--hl-radius-pill);
  background: #0B0C0F;
  border: 1px solid rgba(255, 255, 255, 0.10);
  color: var(--hl-text);
  font-weight: 700; font-size: var(--hl-text-micro);
  text-transform: uppercase; letter-spacing: -0.01em;
  transition: border-color var(--hl-dur-fast);
}
.hl-cta--ghost:hover { border-color: rgba(255,255,255,0.18); }

/* ============== live-dot ============== */
.hl-live-dot {
  display: inline-block;
  width: 8px; height: 8px;
  border-radius: 50%;
  background: var(--hl-accent);
  box-shadow: 0 0 0 3px rgba(255,137,100,0.25);
  animation: hl-livepulse 2.4s ease-in-out infinite;
}
@keyframes hl-livepulse {
  0%, 100% { box-shadow: 0 0 0 3px rgba(255,137,100,0.25); }
  50%      { box-shadow: 0 0 0 8px rgba(255,137,100,0.04); }
}

/* ============== MARQUEE infinity scroll ============== */
.hl-marquee {
  border-top: 1px solid var(--hl-line);
  border-bottom: 1px solid var(--hl-line);
  padding: 26px 0;
  overflow: hidden;
  position: relative;
  background: var(--hl-bg-primary);
  z-index: 2;
}
.hl-marquee__label {
  font-family: var(--hl-font-mono);
  font-size: var(--hl-text-small);
  color: rgba(255,255,255,0.6);
  letter-spacing: var(--hl-track-snugger);
  padding: 0 var(--hl-pad-x) 12px;
  display: block;
  max-width: var(--hl-container);
  margin: 0 auto;
}
.hl-marquee__track {
  display: flex;
  gap: 40px;
  animation: hl-infscroll 60s linear infinite;
  width: max-content;
}
.hl-marquee__item {
  font-family: var(--hl-font-display);
  font-size: var(--hl-text-lead);
  font-weight: 500;
  color: var(--hl-text);
  letter-spacing: var(--hl-track-snugger);
  white-space: nowrap;
}
.hl-marquee__dot {
  font-family: var(--hl-font-display);
  color: var(--hl-accent);
}
@keyframes hl-infscroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.hl-marquee__fade-l, .hl-marquee__fade-r {
  position: absolute; top: 0; bottom: 0; width: 180px; pointer-events: none; z-index: 2;
}
.hl-marquee__fade-l { left: 0;  background: linear-gradient(90deg,  var(--hl-bg-primary) 28.3%, rgba(9,10,12,0)); }
.hl-marquee__fade-r { right: 0; background: linear-gradient(270deg, var(--hl-bg-primary) 28.3%, rgba(9,10,12,0)); }

/* ============== section headers (h2) ============== */
.hl-h2 {
  font-family: var(--hl-font-display);
  font-size: var(--hl-text-h2);
  letter-spacing: var(--hl-track-tighter);
  line-height: var(--hl-lead-h2);
  font-weight: 600;
  margin: 0 0 30px;
  max-width: 16ch;
  color: var(--hl-text);
}
.hl-section--cream .hl-h2 { color: var(--hl-text-dark); }
.hl-h2--gradient {
  background: linear-gradient(to bottom right,
    var(--hl-head-1) 30%,
    var(--hl-head-2) 80%,
    var(--hl-head-3));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}
.hl-sub {
  font-family: var(--hl-font-body);
  font-size: clamp(16px, 2vw, 20px);
  line-height: var(--hl-lead-tight);
  color: var(--hl-text-80);
  max-width: 58ch;
  letter-spacing: var(--hl-track-snugger);
  margin: 0 0 56px;
}
.hl-section--cream .hl-sub { color: var(--hl-text-dark-body); }

/* ============== proof numbers ============== */
.hl-proof {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px 40px;
  margin: 32px 0 56px;
  padding: 32px 0;
  border-top: 1px solid var(--hl-line);
  border-bottom: 1px solid var(--hl-line);
}
@media (min-width: 720px) { .hl-proof { grid-template-columns: repeat(4, 1fr); } }
.hl-proof__num {
  font-family: var(--hl-font-display);
  font-size: clamp(32px, 4.5vw, 52px);
  letter-spacing: var(--hl-track-tight);
  line-height: 1;
  color: var(--hl-text);
  font-weight: 600;
}
.hl-proof__unit { color: var(--hl-accent); }
.hl-proof__label {
  font-family: var(--hl-font-mono);
  font-size: var(--hl-text-micro);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--hl-text-50);
  margin-top: 8px;
}

/* ============== feature cards (ring-6 signature) ============== */
.hl-cards {
  display: grid;
  gap: 28px;
  grid-template-columns: 1fr;
}
@media (min-width: 900px) { .hl-cards { grid-template-columns: repeat(2, 1fr); } }
.hl-card {
  position: relative;
  background: var(--hl-bg-elevated);
  border-radius: var(--hl-radius-card);
  padding: 32px 34px;
  box-shadow: 0 0 0 6px var(--hl-ring-card) inset, var(--hl-shadow-card);
  transition: box-shadow var(--hl-dur-fast) var(--hl-ease), transform var(--hl-dur-fast) var(--hl-ease);
  isolation: isolate;
  overflow: hidden;
  min-height: 220px;
  display: flex; flex-direction: column; justify-content: flex-end;
}
.hl-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 0 0 6px rgba(255,255,255,0.55) inset, var(--hl-shadow-card-hover);
}
.hl-card--featured { grid-column: 1 / -1; }
.hl-card__meta {
  font-family: var(--hl-font-mono);
  font-size: var(--hl-text-nano);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--hl-text-50);
  margin-bottom: 14px;
  display: flex; justify-content: space-between;
}
.hl-card__client { color: var(--hl-accent); }
.hl-card__title {
  font-family: var(--hl-font-display);
  font-size: clamp(20px, 2.3vw, 28px);
  letter-spacing: var(--hl-track-tight);
  line-height: 1.1;
  color: var(--hl-text);
  font-weight: 500;
  margin: 0 0 14px;
}
.hl-card__hook {
  font-size: var(--hl-text-small);
  line-height: 1.5;
  color: var(--hl-text-80);
  max-width: 56ch;
  margin: 0 0 20px;
}
.hl-card__bullets {
  display: grid; gap: 10px;
  margin-top: 4px;
}
.hl-card__bullets li {
  position: relative;
  padding-left: 16px;
  font-size: var(--hl-text-small);
  color: var(--hl-text-80);
  line-height: 1.5;
}
.hl-card__bullets li::before {
  content: "—";
  position: absolute; left: 0; top: 0;
  color: var(--hl-accent);
  font-family: var(--hl-font-mono);
}
.hl-card__stack {
  display: flex; flex-wrap: wrap; gap: 6px;
  margin-top: 20px;
}
.hl-chip {
  font-family: var(--hl-font-mono);
  font-size: 10px;
  padding: 3px 8px;
  border-radius: 4px;
  background: var(--hl-bg-toolbar);
  color: var(--hl-text-85);
  letter-spacing: 0.04em;
  text-transform: lowercase;
}

/* ============== method diagram ============== */
.hl-method {
  padding: 24px;
  background: var(--hl-bg-elevated-2);
  border-radius: var(--hl-radius-card);
  box-shadow: 0 0 0 6px var(--hl-ring-card) inset;
  overflow-x: auto;
}
.hl-method svg { width: 100%; height: auto; min-width: 560px; max-width: 780px; margin: 0 auto; display: block; }

/* ============== quote ============== */
.hl-quote {
  padding: 40px 44px;
  border-left: 3px solid var(--hl-accent);
  background: var(--hl-bg-elevated-2);
  border-radius: 0 var(--hl-radius-card) var(--hl-radius-card) 0;
  margin: 56px 0;
  max-width: 80ch;
}
.hl-section--cream .hl-quote {
  background: rgba(11,12,14,0.04);
  border-left-color: var(--hl-accent-burn);
}
.hl-quote__text {
  font-family: var(--hl-font-display);
  font-size: clamp(18px, 2.4vw, 24px);
  letter-spacing: var(--hl-track-snugger);
  line-height: 1.35;
  color: var(--hl-text);
  font-weight: 500;
  font-style: italic;
  margin: 0 0 20px;
}
.hl-section--cream .hl-quote__text { color: var(--hl-text-dark); }
.hl-quote__mark {
  color: var(--hl-accent);
  font-size: 1.4em; line-height: 0; vertical-align: -0.25em;
  margin-right: 4px; font-style: normal;
}
.hl-quote__attr {
  display: flex; flex-wrap: wrap; align-items: center; gap: 12px;
  font-family: var(--hl-font-mono);
  font-size: var(--hl-text-nano);
  color: var(--hl-text-50);
  letter-spacing: 0.08em;
}
.hl-quote__author {
  font-family: var(--hl-font-display);
  font-size: var(--hl-text-small);
  color: var(--hl-text);
  letter-spacing: var(--hl-track-snug);
  font-style: normal;
  font-weight: 500;
}
.hl-section--cream .hl-quote__author { color: var(--hl-text-dark); }
.hl-quote__role { color: var(--hl-text-60); }
.hl-section--cream .hl-quote__role { color: var(--hl-text-dark-muted); }
.hl-quote__badge {
  font-family: var(--hl-font-mono);
  font-size: 9px;
  padding: 3px 8px;
  border-radius: var(--hl-radius-pill);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  border: 1px solid var(--hl-accent);
  color: var(--hl-accent);
}

/* ============== timeline ============== */
.hl-timeline {
  position: relative;
  padding-left: 28px;
  margin: 40px 0;
}
.hl-timeline::before {
  content: "";
  position: absolute; left: 7px; top: 6px; bottom: 6px;
  width: 1px; background: var(--hl-line-strong);
}
.hl-section--cream .hl-timeline::before { background: var(--hl-line-dark); }
.hl-timeline__row {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 28px;
  padding: 20px 0;
  border-top: 1px solid var(--hl-line);
  position: relative;
}
.hl-section--cream .hl-timeline__row { border-color: rgba(11,12,14,0.08); }
.hl-timeline__row:first-child { border-top: 0; }
.hl-timeline__marker {
  position: absolute; left: -28px; top: 26px;
  width: 15px; height: 15px; border-radius: 50%;
  background: var(--hl-bg-primary); border: 2px solid var(--hl-line-strong);
}
.hl-section--cream .hl-timeline__marker {
  background: var(--hl-bg-secondary);
  border-color: var(--hl-line-dark);
}
.hl-timeline__row--current .hl-timeline__marker {
  background: var(--hl-accent);
  border-color: var(--hl-accent);
  box-shadow: 0 0 0 4px rgba(255,137,100,0.2);
}
.hl-timeline__years {
  font-family: var(--hl-font-mono);
  font-size: var(--hl-text-micro);
  color: var(--hl-text-50);
  letter-spacing: 0.04em;
  padding-top: 4px;
}
.hl-section--cream .hl-timeline__years { color: var(--hl-text-dark-muted); }
.hl-timeline__company {
  font-family: var(--hl-font-display);
  font-size: 20px;
  color: var(--hl-text);
  letter-spacing: var(--hl-track-tight);
  font-weight: 500;
}
.hl-section--cream .hl-timeline__company { color: var(--hl-text-dark); }
.hl-timeline__role {
  font-family: var(--hl-font-mono);
  font-size: var(--hl-text-micro);
  color: var(--hl-accent);
  margin-bottom: 8px;
  letter-spacing: 0.04em;
}
.hl-section--cream .hl-timeline__role { color: var(--hl-accent-burn); }
.hl-timeline__desc {
  font-size: var(--hl-text-small);
  color: var(--hl-text-80);
  line-height: 1.55;
  margin: 0;
}
.hl-section--cream .hl-timeline__desc { color: var(--hl-text-dark-body); }
@media (max-width: 720px) {
  .hl-timeline__row { grid-template-columns: 1fr; gap: 10px; }
  .hl-timeline__years { padding-top: 0; }
}

/* ============== contact ============== */
.hl-contact {
  display: grid; gap: 24px;
  max-width: 560px;
  padding: 36px 40px;
  background: var(--hl-bg-elevated-2);
  border-radius: var(--hl-radius-card);
  box-shadow: 0 0 0 6px var(--hl-ring-card) inset;
}
.hl-contact__live {
  display: inline-flex; align-items: center; gap: 10px;
  font-family: var(--hl-font-mono);
  font-size: var(--hl-text-micro);
  color: var(--hl-text-60); letter-spacing: 0.08em;
}
.hl-contact__email-row {
  display: flex; flex-wrap: wrap; gap: 12px;
  align-items: center; justify-content: space-between;
  padding: 14px 16px;
  background: var(--hl-bg-primary);
  border: 1px solid var(--hl-line);
  border-radius: var(--hl-radius-sm);
}
.hl-contact__email {
  font-family: var(--hl-font-mono);
  font-size: var(--hl-text-small);
  color: var(--hl-text);
  letter-spacing: 0.02em;
  word-break: break-all;
}
.hl-contact__copy {
  font-family: var(--hl-font-mono);
  font-size: var(--hl-text-nano);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 7px 12px;
  border: 1px solid var(--hl-line-strong);
  border-radius: var(--hl-radius-sm);
  color: var(--hl-text);
  transition: color var(--hl-dur-fast), border-color var(--hl-dur-fast);
}
.hl-contact__copy:hover { border-color: var(--hl-accent); color: var(--hl-accent); }
.hl-contact__copy[data-copied="true"] { border-color: var(--hl-accent); color: var(--hl-accent); }
.hl-contact__socials {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 10px;
}
.hl-contact__social {
  padding: 12px;
  border: 1px solid var(--hl-line);
  border-radius: var(--hl-radius-sm);
  transition: border-color var(--hl-dur-fast);
}
.hl-contact__social:hover { border-color: var(--hl-accent); }
.hl-contact__social-label {
  display: block;
  font-family: var(--hl-font-mono);
  font-size: var(--hl-text-nano);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--hl-accent);
  margin-bottom: 3px;
}
.hl-contact__social-handle {
  display: block;
  font-family: var(--hl-font-mono);
  font-size: var(--hl-text-nano);
  color: var(--hl-text-80);
  letter-spacing: 0.02em;
  word-break: break-all;
}

/* ============== topographic lines bg (Knowledge-style) ============== */
.hl-lines-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0.5;
  background-image:
    repeating-linear-gradient(
      125deg,
      transparent 0 20px,
      rgba(11,12,14,0.025) 20px 21px,
      transparent 21px 40px
    ),
    repeating-linear-gradient(
      35deg,
      transparent 0 28px,
      rgba(11,12,14,0.035) 28px 29px,
      transparent 29px 56px
    );
  mask-image: radial-gradient(ellipse at center, #000 35%, transparent 80%);
  -webkit-mask-image: radial-gradient(ellipse at center, #000 35%, transparent 80%);
}
.hl-section--cream .hl-lines-bg { opacity: 0.7; }
.hl-section__inner { position: relative; z-index: 1; }

/* ============== footer ============== */
.hl-footer {
  padding: 20px 0;
  border-top: 1px solid var(--hl-line);
  background: var(--hl-bg-primary);
}
.hl-footer__inner {
  display: flex; flex-wrap: wrap; gap: 20px;
  justify-content: space-between;
  align-items: center;
  max-width: var(--hl-container);
  margin: 0 auto;
  padding: 0 var(--hl-pad-x);
  font-family: var(--hl-font-mono);
  font-size: var(--hl-text-micro);
  color: var(--hl-text-40);
  letter-spacing: 0.08em;
}
.hl-footer a { color: var(--hl-text-80); transition: color var(--hl-dur-fast); }
.hl-footer a:hover { color: var(--hl-text); }

/* ============== reduced motion ============== */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
  .hl-live-dot { animation: none; }
}
`;
