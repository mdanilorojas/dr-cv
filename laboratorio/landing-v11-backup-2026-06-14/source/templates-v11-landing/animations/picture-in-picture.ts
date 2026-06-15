/**
 * Picture-in-picture case animation.
 *
 * Desktop: 4 background stills + PIP overlay. Synced scene timeline.
 * Mobile: same layout, scaled down.
 * Reduced motion: frame 4 (final state) shown as a static poster.
 * Viewport: the template outputs `data-animate="pip"` on the container.
 *   The v11-script observes it with IntersectionObserver and toggles
 *   `is-playing` to start/stop CSS animations.
 *
 * Copy is anonymized â€” no real client branding.
 */

interface PipAnimationInput {
  slug: string;            // case slug, used for unique ids and asset path
  stillBase: string;       // e.g. "assets/animations/developer-portal"
}

const SCENES = [
  { i: 1, still: "01-home.webp",           tag: "developer arrives" },
  { i: 2, still: "02-catalog.webp",        tag: "picks a compliant template" },
  { i: 3, still: "03-design-system.webp",  tag: "built on a real design system" },
  { i: 4, still: "04-observability.webp",  tag: "ships with metrics flowing" },
];

export function renderPipAnimation(input: PipAnimationInput): string {
  const { slug, stillBase } = input;
  const shots = SCENES
    .map(
      (s) =>
        `<div class="v11-anim__shot v11-anim__shot--${s.i}" style="background-image:url('${stillBase}/${s.still}')"></div>`,
    )
    .join("");
  const tags = SCENES
    .map((s) => `<div class="v11-anim__tag v11-anim__tag--t${s.i}">${escape(s.tag)} â†’</div>`)
    .join("");
  return `<div class="v11-anim v11-anim--pip" data-animate="pip" data-anim-slug="${escape(slug)}" aria-hidden="true">
  <div class="v11-anim__frame">
    <div class="v11-anim__chrome">
      <span class="v11-anim__chrome-dot v11-anim__chrome-dot--r"></span>
      <span class="v11-anim__chrome-dot v11-anim__chrome-dot--y"></span>
      <span class="v11-anim__chrome-dot v11-anim__chrome-dot--g"></span>
      <span class="v11-anim__chrome-title">developer-portal</span>
      <span class="v11-anim__chrome-badge">Preview</span>
    </div>
    <div class="v11-anim__content">
      ${shots}
      <div class="v11-anim__tint"></div>
      ${tags}
      <div class="v11-anim__pip">
        <div class="v11-anim__pip-chrome">
          <span class="v11-anim__pip-dot v11-anim__pip-dot--r"></span>
          <span class="v11-anim__pip-dot v11-anim__pip-dot--y"></span>
          <span class="v11-anim__pip-dot v11-anim__pip-dot--g"></span>
          <span class="v11-anim__pip-chrome-title">deploy</span>
        </div>
        <div class="v11-anim__pip-body">
          <div class="v11-anim__pip-step v11-anim__pip-step--s1">
            <div class="v11-anim__pip-greeting">Hello, developer<span class="v11-anim__pip-cursor"></span></div>
          </div>
          <div class="v11-anim__pip-step v11-anim__pip-step--s2">
            <div>
              <div class="v11-anim__pip-processing">Processing</div>
              <div class="v11-anim__pip-proc-bar"></div>
            </div>
          </div>
          <div class="v11-anim__pip-step v11-anim__pip-step--s3">
            <div class="v11-anim__pip-envs">
              <div class="v11-anim__pip-env">dev</div>
              <div class="v11-anim__pip-env">staging</div>
              <div class="v11-anim__pip-env v11-anim__pip-env--active">secure-cluster</div>
            </div>
          </div>
          <div class="v11-anim__pip-step v11-anim__pip-step--s4">
            <div>
              <div class="v11-anim__pip-check">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7"/></svg>
              </div>
              <div class="v11-anim__pip-done">Deployed</div>
              <div class="v11-anim__pip-done-sub">all green</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;
}

function escape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * CSS for the pip animation. Scoped under `.v11-anim--pip`.
 * All keyframes gated on `.v11-anim.is-playing` so the IntersectionObserver
 * can start/stop them without touching individual animations.
 */
export const pipAnimationCss = /* css */ `
/* ============== ANIMATIONS â€” picture-in-picture ============== */
.v11-anim {
  width: 100%;
  aspect-ratio: 820 / 500;
  background: #06080a;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  overflow: hidden;
  color: #e8ecef;
  font: 14px/1.5 var(--v11-font-body, "Inter", system-ui, sans-serif);
  contain: layout paint;
}
.v11-anim__frame {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
}
.v11-anim__chrome {
  height: 32px;
  background: #13171c;
  border-bottom: 1px solid #1f242a;
  display: flex;
  align-items: center;
  padding: 0 12px;
  gap: 6px;
  position: relative;
  z-index: 10;
  flex-shrink: 0;
}
.v11-anim__chrome-dot { width: 8px; height: 8px; border-radius: 50%; }
.v11-anim__chrome-dot--r { background: #ff5f57; }
.v11-anim__chrome-dot--y { background: #ffbd2e; }
.v11-anim__chrome-dot--g { background: #28c840; }
.v11-anim__chrome-title {
  margin: 0 auto;
  font-size: 10px;
  color: #9aa4ae;
  font-family: var(--v11-font-mono, ui-monospace, monospace);
  letter-spacing: 0.05em;
}
.v11-anim__chrome-badge {
  font-size: 9px;
  padding: 2px 7px;
  border-radius: 999px;
  border: 1px solid #0d8f93;
  color: #23d2d7;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-weight: 600;
}
.v11-anim__content {
  flex: 1;
  position: relative;
  overflow: hidden;
  background: #000;
}

/* Background stills */
.v11-anim__shot {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center top;
  will-change: opacity, transform;
  opacity: 0;
}
.v11-anim__shot--1 { opacity: 1; }
.v11-anim__tint {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 80% 0%, rgba(52, 211, 153, 0.12), transparent 60%);
  opacity: 0;
  pointer-events: none;
}

/* Contextual tags */
.v11-anim__tag {
  position: absolute;
  top: 14%;
  right: 34%;
  background: #13171c;
  border: 1px solid #0d8f93;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 10px;
  color: #23d2d7;
  font-family: var(--v11-font-mono, ui-monospace, monospace);
  opacity: 0;
  transform: translateX(8px);
  box-shadow: 0 6px 18px -4px rgba(0, 0, 0, 0.5);
  z-index: 6;
  white-space: nowrap;
}
.v11-anim__tag::before {
  content: "";
  position: absolute;
  right: -6px;
  top: 50%;
  transform: translateY(-50%);
  border: 5px solid transparent;
  border-left-color: #0d8f93;
}

/* PIP */
.v11-anim__pip {
  position: absolute;
  top: 4%;
  right: 3%;
  width: 32%;
  height: 35%;
  background: #13171c;
  border: 1px solid #1f242a;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 28px -6px rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  transform: scale(0.98);
  opacity: 0.92;
  transition: transform 400ms ease, opacity 400ms ease, box-shadow 400ms ease;
  z-index: 5;
}
.v11-anim__pip-chrome {
  height: 20px;
  background: #1a1f26;
  border-bottom: 1px solid #1f242a;
  display: flex;
  align-items: center;
  padding: 0 7px;
  gap: 3px;
  font-size: 9px;
  color: #9aa4ae;
  font-family: var(--v11-font-mono, ui-monospace, monospace);
  flex-shrink: 0;
}
.v11-anim__pip-dot { width: 5px; height: 5px; border-radius: 50%; }
.v11-anim__pip-dot--r { background: #ff5f57; }
.v11-anim__pip-dot--y { background: #ffbd2e; }
.v11-anim__pip-dot--g { background: #28c840; }
.v11-anim__pip-chrome-title { margin-left: 5px; }
.v11-anim__pip-body {
  flex: 1;
  padding: 10px;
  display: grid;
  place-items: center;
  position: relative;
}
.v11-anim__pip-step {
  position: absolute;
  inset: 10px;
  display: grid;
  place-items: center;
  text-align: center;
  opacity: 0;
}
.v11-anim__pip-step--s1 { opacity: 1; }

.v11-anim__pip-greeting {
  font-size: 13px;
  font-weight: 600;
  color: #e8ecef;
}
.v11-anim__pip-cursor {
  display: inline-block;
  width: 2px;
  height: 12px;
  background: #23d2d7;
  vertical-align: -2px;
  margin-left: 2px;
  animation: v11-anim-blink 700ms steps(2) infinite;
}
.v11-anim__pip-processing {
  font-size: 10px;
  color: #23d2d7;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}
.v11-anim__pip-proc-bar {
  margin-top: 8px;
  width: 140px;
  height: 3px;
  background: #1f242a;
  border-radius: 2px;
  overflow: hidden;
  position: relative;
}
.v11-anim__pip-proc-bar::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, #23d2d7, #6effff, #23d2d7);
  width: 0;
}
.v11-anim__pip-envs { display: flex; gap: 5px; }
.v11-anim__pip-env {
  padding: 3px 8px;
  font-size: 9px;
  font-family: var(--v11-font-mono, ui-monospace, monospace);
  border: 1px solid #1f242a;
  border-radius: 3px;
  color: #9aa4ae;
  background: #1a1f26;
}
.v11-anim__pip-env--active {
  border-color: #23d2d7;
  color: #23d2d7;
  box-shadow: 0 0 0 2px rgba(35, 210, 215, 0.15);
}
.v11-anim__pip-check {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(52, 211, 153, 0.14);
  border: 2px solid #34d399;
  display: grid;
  place-items: center;
  margin: 0 auto 6px;
  transform: scale(0);
}
.v11-anim__pip-check svg { width: 16px; height: 16px; color: #34d399; }
.v11-anim__pip-check svg path { stroke-dasharray: 30; stroke-dashoffset: 30; }
.v11-anim__pip-done { font-size: 12px; font-weight: 600; color: #e8ecef; }
.v11-anim__pip-done-sub {
  font-size: 9px;
  color: #9aa4ae;
  margin-top: 2px;
  font-family: var(--v11-font-mono, ui-monospace, monospace);
}

/* ============== PLAYING STATE â€” only runs when in viewport ============== */
.v11-anim.is-playing .v11-anim__shot--1 {
  animation: v11-anim-bg1-fade 1400ms ease forwards 1000ms;
}
.v11-anim.is-playing .v11-anim__shot--2 {
  animation:
    v11-anim-bg2-in 1000ms ease forwards 1100ms,
    v11-anim-bg2-out 800ms ease forwards 2500ms;
}
.v11-anim.is-playing .v11-anim__shot--3 {
  animation:
    v11-anim-bg3-in 900ms cubic-bezier(.4, 0, .2, 1) forwards 2500ms,
    v11-anim-bg3-out 900ms ease forwards 3800ms;
}
.v11-anim.is-playing .v11-anim__shot--4 {
  animation: v11-anim-bg4-in 1200ms cubic-bezier(.2, 0, .1, 1) forwards 3900ms;
}
.v11-anim.is-playing .v11-anim__tint {
  animation: v11-anim-tint-in 1000ms ease forwards 4400ms;
}
.v11-anim.is-playing .v11-anim__pip {
  transform: scale(1.02);
  opacity: 1;
  box-shadow: 0 16px 40px -6px rgba(35, 210, 215, 0.35), 0 0 0 1px rgba(35, 210, 215, 0.5);
}
.v11-anim.is-playing .v11-anim__pip-step--s1 {
  animation: v11-anim-cycle 1200ms ease forwards 0ms;
}
.v11-anim.is-playing .v11-anim__pip-step--s2 {
  animation: v11-anim-cycle 1400ms ease forwards 1200ms;
}
.v11-anim.is-playing .v11-anim__pip-step--s3 {
  animation: v11-anim-cycle 1400ms ease forwards 2600ms;
}
.v11-anim.is-playing .v11-anim__pip-step--s4 {
  animation: v11-anim-cycle-keep 1800ms ease forwards 4000ms;
}
.v11-anim.is-playing .v11-anim__pip-step--s2 .v11-anim__pip-proc-bar::after {
  animation: v11-anim-fill 1200ms ease forwards 1300ms;
}
.v11-anim.is-playing .v11-anim__pip-step--s4 .v11-anim__pip-check {
  animation: v11-anim-pop 300ms cubic-bezier(.34, 1.56, .64, 1) forwards 4100ms;
}
.v11-anim.is-playing .v11-anim__pip-step--s4 .v11-anim__pip-check svg path {
  animation: v11-anim-draw 350ms ease forwards 4350ms;
}
.v11-anim.is-playing .v11-anim__tag--t1 {
  animation:
    v11-anim-tag-show 1200ms ease forwards 200ms,
    v11-anim-tag-hide 400ms ease forwards 1000ms;
}
.v11-anim.is-playing .v11-anim__tag--t2 {
  animation:
    v11-anim-tag-show 1200ms ease forwards 1400ms,
    v11-anim-tag-hide 400ms ease forwards 2400ms;
}
.v11-anim.is-playing .v11-anim__tag--t3 {
  animation:
    v11-anim-tag-show 1200ms ease forwards 2800ms,
    v11-anim-tag-hide 400ms ease forwards 3800ms;
}
.v11-anim.is-playing .v11-anim__tag--t4 {
  animation: v11-anim-tag-show-keep 1200ms ease forwards 4500ms;
}

@keyframes v11-anim-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
@keyframes v11-anim-bg1-fade {
  0% { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(1.04); }
}
@keyframes v11-anim-bg2-in {
  0% { opacity: 0; transform: scale(1.06); }
  100% { opacity: 1; transform: scale(1); }
}
@keyframes v11-anim-bg2-out {
  0% { opacity: 1; transform: scale(1) translateX(0); }
  100% { opacity: 0; transform: scale(1.02) translateX(-40px); }
}
@keyframes v11-anim-bg3-in {
  0% { opacity: 0; transform: translateX(60px) scale(1); }
  100% { opacity: 1; transform: translateX(0) scale(1); }
}
@keyframes v11-anim-bg3-out {
  0% { opacity: 1; transform: scale(1); filter: blur(0); }
  100% { opacity: 0; transform: scale(.92); filter: blur(2px); }
}
@keyframes v11-anim-bg4-in {
  0% { opacity: 0; transform: scale(1.08); filter: brightness(.7); }
  60% { opacity: 1; transform: scale(1); filter: brightness(1); }
  100% { opacity: 1; transform: scale(1); filter: brightness(1); }
}
@keyframes v11-anim-tint-in { to { opacity: 1; } }
@keyframes v11-anim-cycle {
  0% { opacity: 0; }
  15%, 85% { opacity: 1; }
  100% { opacity: 0; }
}
@keyframes v11-anim-cycle-keep {
  0% { opacity: 0; }
  15%, 100% { opacity: 1; }
}
@keyframes v11-anim-fill { to { width: 100%; } }
@keyframes v11-anim-pop { to { transform: scale(1); } }
@keyframes v11-anim-draw { to { stroke-dashoffset: 0; } }
@keyframes v11-anim-tag-show { to { opacity: 1; transform: translateX(0); } }
@keyframes v11-anim-tag-show-keep { to { opacity: 1; transform: translateX(0); } }
@keyframes v11-anim-tag-hide { to { opacity: 0; transform: translateX(-6px); } }

/* Reduced motion â€” show final frame, no animation */
@media (prefers-reduced-motion: reduce) {
  .v11-anim__shot--1,
  .v11-anim__shot--2,
  .v11-anim__shot--3 {
    opacity: 0;
  }
  .v11-anim__shot--4 { opacity: 1; }
  .v11-anim__tint { opacity: 1; }
  .v11-anim__pip-step--s1,
  .v11-anim__pip-step--s2,
  .v11-anim__pip-step--s3 { opacity: 0; }
  .v11-anim__pip-step--s4 { opacity: 1; }
  .v11-anim__pip-check { transform: scale(1); }
  .v11-anim__pip-check svg path { stroke-dashoffset: 0; }
  .v11-anim__tag--t4 { opacity: 1; transform: translateX(0); }
  .v11-anim.is-playing * { animation: none !important; }
  .v11-anim__pip-cursor { animation: none; }
}
`;
