# Phase 3 â€” Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship `npm run build:landing` producing `dist/landing/index.html` (EN) and `dist/landing/es/index.html` (ES). Single-file tab-SPA per language, reusing `/perfil/data/*` from Phases 1â€“2, Huly-aesthetic dark-dominant, 5 tabs, mobile-first, Lighthouse â‰¥ 90/95/95/95.

**Architecture:** Pure components `(data, lang) => string` in `generadores/templates/landing/components/`. One orchestrator `generadores/landing.ts`. Inline CSS via `landing-styles.ts`, inline JS via `landing-script.ts` (tab switching, hash sync, copy-to-clipboard, reduced-motion handling). Forked token set `design-system/tokens-landing.css` (dark-dominant) separate from existing `tokens-print.css` (light paper).

**Tech Stack:** Same as Phases 1â€“2 â€” Node 20+, TypeScript strict, js-yaml, vitest, tsx. NEW: puppeteer used for Lighthouse smoke test (lazy import to keep test suite fast); no framework, no bundler, no router.

**Spec reference:** `docs/superpowers/specs/2026-05-08-phase3-landing-design.md`.

**Success criteria (from spec, copy-pasted for agent clarity):**
1. `npm run build:landing` emits both HTML files from `/perfil/data/*` only.
2. Render cleanly at 375 / 768 / 1280 px.
3. Tab switching via click, keyboard, URL hash.
4. Language toggle preserves active tab (`/#work` â†’ `/es/#work`).
5. Lighthouse â‰¥ 90 performance, â‰¥ 95 accessibility on `dist/landing/index.html`.
6. All 97 existing tests pass + new landing tests green.
7. Deployable with `npx http-server dist/landing`.
8. BAH scrub list respected.

---

## File Structure

```
dr-cv/
â”œâ”€â”€ package.json                                       # MODIFY: add build:landing, build:all includes it
â”œâ”€â”€ perfil/data/
â”‚   â””â”€â”€ landing.yaml                                   # NEW: tabs config + CTA + SEO
â”œâ”€â”€ design-system/
â”‚   â”œâ”€â”€ tokens-print.css                                     # existing (light) â€” untouched
â”‚   â””â”€â”€ tokens-landing.css                             # NEW (dark-dominant)
â”œâ”€â”€ assets/
â”‚   â””â”€â”€ fonts/                                         # NEW (self-hosted woff2, subset Latin-1)
â”‚       â”œâ”€â”€ Inter-Regular.woff2
â”‚       â”œâ”€â”€ Inter-Medium.woff2
â”‚       â”œâ”€â”€ Inter-SemiBold.woff2
â”‚       â”œâ”€â”€ JetBrainsMono-Regular.woff2
â”‚       â””â”€â”€ JetBrainsMono-Medium.woff2
â”œâ”€â”€ generadores/
â”‚   â”œâ”€â”€ lib/
â”‚   â”‚   â”œâ”€â”€ types.ts                                   # MODIFY: add Landing, LandingTab, LandingData types
â”‚   â”‚   â”œâ”€â”€ load-data.ts                               # MODIFY: add loadLanding + loadLandingData (composes CvData + landing)
â”‚   â”‚   â””â”€â”€ render-pdf.ts                              # existing â€” untouched
â”‚   â”œâ”€â”€ templates/
â”‚   â”‚   â””â”€â”€ landing/                                   # NEW
â”‚   â”‚       â”œâ”€â”€ components/
â”‚   â”‚       â”‚   â”œâ”€â”€ tab-nav.ts                         # NEW
â”‚   â”‚       â”‚   â”œâ”€â”€ hero-block.ts                      # NEW
â”‚   â”‚       â”‚   â”œâ”€â”€ proof-numbers.ts                   # NEW
â”‚   â”‚       â”‚   â”œâ”€â”€ case-expander.ts                   # NEW
â”‚   â”‚       â”‚   â”œâ”€â”€ method-diagram.ts                  # NEW
â”‚   â”‚       â”‚   â”œâ”€â”€ timeline.ts                        # NEW
â”‚   â”‚       â”‚   â”œâ”€â”€ testimonial-featured.ts            # NEW
â”‚   â”‚       â”‚   â”œâ”€â”€ section-visual.ts                  # NEW
â”‚   â”‚       â”‚   â”œâ”€â”€ contact-block.ts                   # NEW
â”‚   â”‚       â”‚   â””â”€â”€ me-agent-dock.ts                   # NEW (empty placeholder for Phase 4+)
â”‚   â”‚       â”œâ”€â”€ landing-styles.ts                      # NEW (inline <style> blob)
â”‚   â”‚       â”œâ”€â”€ landing-script.ts                      # NEW (inline <script> blob)
â”‚   â”‚       â””â”€â”€ index.ts                               # NEW (full-page template composer)
â”‚   â””â”€â”€ landing.ts                                     # NEW orchestrator
â”œâ”€â”€ tests/
â”‚   â”œâ”€â”€ landing-components.test.ts                     # NEW
â”‚   â”œâ”€â”€ landing-integration.test.ts                    # NEW
â”‚   â””â”€â”€ landing-smoke.test.ts                          # NEW (puppeteer + lighthouse, opt-in via env)
â””â”€â”€ dist/landing/                                      # NEW (gitignored via existing dist/ rule)
    â”œâ”€â”€ index.html
    â”œâ”€â”€ es/
    â”‚   â””â”€â”€ index.html
    â””â”€â”€ assets/
        â””â”€â”€ fonts/                                     # copied from /assets/fonts at build time
```

---

## Task 1: Data schema + loader extension

**Context:** Landing needs new `perfil/data/landing.yaml` that defines tab order, per-section visual hint, CTA text, SEO titles/descriptions per language. Everything else is reused from Phase 2's `CvData`.

- [ ] Create `perfil/data/landing.yaml` with schema from spec (tabs array of 5, cta en/es, seo en/es).
- [ ] Add TypeScript types in `generadores/lib/types.ts`:
  ```ts
  export interface LandingTab {
    id: "overview" | "work" | "method" | "about" | "contact";
    labelEn: string;
    labelEs: string;
    visual: "particles" | "grid" | "flow" | "timeline" | "signature";
    default?: boolean;
  }
  export interface Landing {
    tabs: LandingTab[];
    cta: { en: string; es: string };
    seo: { titleEn: string; titleEs: string; descriptionEn: string; descriptionEs: string };
  }
  export interface LandingData extends CvData { landing: Landing; }
  ```
- [ ] Add `loadLanding(dataDir: string): Landing` in `load-data.ts` (js-yaml read + shape assertion).
- [ ] Add `loadLandingData(dataDir: string): LandingData` that composes `loadCvData` + `loadLanding`.
- [ ] Write unit tests in `tests/load-data.test.ts`:
  - loadLanding returns 5 tabs, one with `default: true`.
  - CTA en/es both non-empty.
  - SEO en/es both present.
  - loadLandingData includes all CvData fields + landing.
- [ ] Typecheck + run full test suite; commit: `feat(phase-3): landing data schema + loader`.

---

## Task 2: Dark-dominant token set

**Context:** `tokens-print.css` is optimized for light paper (CVs, skills sheet). Landing needs a distinct dark-dominant Huly palette. Fork cleanly.

- [ ] Create `design-system/tokens-landing.css` with:
  - `--bg-ink: #0a0a0f`
  - `--bg-ink-alt: #111117`
  - `--bg-paper: #f7f5f1` (for alternating light sections)
  - `--ink-inverse: #f4f4f5`
  - `--ink-muted-inverse: #8f8f95`
  - `--line-inverse: rgba(255,255,255,.1)`
  - `--accent: #FF8964` (preserved)
  - `--accent-deep: #e0674a`
  - `--font-display: "JetBrains Mono", monospace` (Huly headline style)
  - `--font-body: "Inter", sans-serif`
  - `--font-mono: "JetBrains Mono", monospace`
  - CSS `@font-face` blocks referencing `./assets/fonts/*.woff2` (relative to deployed HTML).
  - `:root[data-lang="es"]` override (none for now, reserved).
- [ ] Download Inter + JetBrains Mono woff2 subset (Latin-1 only) into `assets/fonts/`. Document provenance in `assets/fonts/README.md` (SIL OFL license for both).
- [ ] Add `.gitignore` entry for generator-copied font dupes in `dist/landing/assets/` (relative to repo root, kept simple).
- [ ] Smoke typecheck; commit: `feat(phase-3): dark-dominant tokens + self-hosted fonts`.

---

## Task 3: tab-nav component (TDD-first)

**Context:** Every tab renders with a sticky nav. Hash-sync + keyboard nav lives in the shared runtime script (Task 10), not in the component itself. Component only emits markup.

- [ ] Write failing test in `tests/landing-components.test.ts`:
  - `renderTabNav(landing, "en")` returns HTML containing all 5 labelEn values.
  - Output contains `role="tablist"`, 5 `role="tab"` with `aria-controls`.
  - Output contains lang toggle `<a href="/es/">ES</a>` for EN, `<a href="/">EN</a>` for ES.
  - Active tab is marked with `aria-selected="true"` (initially the default tab).
  - "es" version uses labelEs values.
- [ ] Implement `generadores/templates/landing/components/tab-nav.ts`.
- [ ] Run; commit: `feat(phase-3): tab-nav component`.

---

## Task 4: hero-block + proof-numbers components

- [ ] Write failing tests:
  - `renderHeroBlock(data, "en")` contains `data.identity.name`, the thesis EN, and the CTA EN.
  - ES version uses ES thesis + CTA.
  - Contains live-dot element with `aria-hidden="true"`.
  - `renderProofNumbers(positioning, "en")` emits 4 `<div class="proof__num">` blocks with values from `positioning.proofNumbers`.
  - ES version uses `labelEs`.
- [ ] Implement `hero-block.ts` and `proof-numbers.ts`. Reuse structure from existing CV components where sensible (identity-block has splitName helper â€” reuse directly).
- [ ] Commit: `feat(phase-3): hero-block + proof-numbers`.

---

## Task 5: case-expander component

**Context:** Reads from existing `perfil/data/cases/*.md` (already loaded by Phase 2's `loadCases`). Expansion is inline (no modal). Clicked-state is managed in runtime JS; component emits the full collapsed + expanded content with `aria-expanded="false"` initial state.

- [ ] Write failing tests:
  - `renderCaseExpander(case, "en")` contains title EN, client EN, hook EN, all bullets EN.
  - Output has `<button aria-expanded="false" aria-controls="case-body-<id>">` pattern.
  - Expanded body contains `<div id="case-body-<id>" hidden>`.
  - HTML-escaped input does not break output.
- [ ] Implement `case-expander.ts`. Reuse `escapeHtml` from `skills-sheet-page-1.ts`.
- [ ] Commit: `feat(phase-3): case-expander component`.

---

## Task 6: method-diagram + timeline + testimonial-featured + contact-block components

**Context:** These are smaller; batch them since they don't share runtime concerns.

- [ ] `method-diagram.ts`: pure SVG, 4 nodes (Claude Code â†’ MCP â†’ Subagents â†’ Skills-lock) with accent-colored arrows. ES version swaps labels via `lang` argument.
- [ ] `timeline.ts`: reads `experience.current + past` from `CvData`. Renders as vertical timeline with year markers.
- [ ] `testimonial-featured.ts`: large-format quote card. Reuses `Testimonial` type from Phase 2. Badge `verified` / `attributed` matches CV component look, adapted for dark bg.
- [ ] `contact-block.ts`: mailto link, LinkedIn/GitHub/Behance, "Copy email" button (data-action="copy-email"), live-dot.
- [ ] `me-agent-dock.ts`: empty `<aside id="me-agent-dock" hidden aria-hidden="true"></aside>` â€” Phase 4 hook only.
- [ ] `section-visual.ts`: switch on `tab.visual` â€” each visual returns a CSS-only decorative `<div>` marked `aria-hidden="true"` (particles = radial gradient dots; grid = CSS grid lines; flow = linear-gradient stripe; timeline = dashed line; signature = text ornament). Keep tiny; heavy canvas deferred to Phase 4 if ever.
- [ ] Tests for each: non-empty render, EN + ES where applicable, escapeHtml used.
- [ ] Commit per component (5 small commits): `feat(phase-3): <component-name> component`.

---

## Task 7: landing-styles.ts (inline CSS)

**Context:** Single blob of CSS. Imports `tokens-landing.css` by reading it at generator time (like `cv.ts` does with `tokens-print.css`) and concatenating.

- [ ] Implement `landing-styles.ts` exporting `LANDING_STYLES: string` covering:
  - Reset, body bg `var(--bg-ink)`, color `var(--ink-inverse)`.
  - `.lp-page` layout â€” mobile-first, max-width 1200px, padding clamp-based.
  - `.lp-nav` sticky, flex, horizontal scroll on mobile.
  - `.lp-tabpanel` hidden by default, `[aria-hidden="false"]` visible.
  - Hero, proof-numbers, case-expander (collapsed vs expanded), method-diagram, timeline, contact-block, testimonial-featured styles.
  - Media query: mobile â‰¤ 640px stacks everything vertical.
  - `@media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }`.
  - Section-visual CSS per visual kind (particles/grid/flow/timeline/signature).
- [ ] Commit: `feat(phase-3): landing inline styles`.

---

## Task 8: landing-script.ts (inline JS runtime)

**Context:** Vanilla JS, ~80 lines. Handles tab switching, hash sync, keyboard nav, case-expander toggle, copy-email.

- [ ] Implement `landing-script.ts` exporting `LANDING_SCRIPT: string`:
  - On load: read `location.hash`; activate matching tab or default tab.
  - Click listener on `[role="tab"]`: update `aria-selected`, toggle `[aria-hidden]` on all `[role="tabpanel"]`, `history.pushState` hash.
  - Keyboard on tablist: arrow keys move focus + activate; Home/End jump; Enter/Space activate focused.
  - `popstate` listener re-syncs UI from hash.
  - Click listener on `[data-action="copy-email"]`: `navigator.clipboard.writeText(email)` with `window.prompt` fallback; flash "Copied" toast 2s.
  - Click listener on `[data-action="toggle-case"]`: toggle `aria-expanded` and the `hidden` attribute of its `aria-controls` target.
  - No framework, no dependencies.
- [ ] Commit: `feat(phase-3): landing runtime script (vanilla)`.

---

## Task 9: index.ts full-page template composer

**Context:** Ties everything together. One function `renderLanding(data: LandingData, lang: Lang): string`.

- [ ] Implement `generadores/templates/landing/index.ts`:
  - `<!doctype html>` + `<html lang="${lang}">` + `<head>` with SEO meta, `hreflang` alternate, inline `<style>` from `LANDING_STYLES` + embedded tokensCss.
  - `<body class="lp-page">`:
    - Header with tab-nav + lang toggle.
    - 5 `<section role="tabpanel">` for each tab, each wrapping the relevant components + `section-visual`.
    - Hidden me-agent-dock.
    - Inline `<script>` with `LANDING_SCRIPT`.
- [ ] Commit: `feat(phase-3): landing full-page composer`.

---

## Task 10: landing.ts orchestrator + package script

- [ ] Implement `generadores/landing.ts`:
  - Load `tokens-landing.css`.
  - Load `LandingData` via `loadLandingData`.
  - `mkdirSync` for `dist/landing/` and `dist/landing/es/`.
  - Copy `assets/fonts/*` to `dist/landing/assets/fonts/` (recursive sync).
  - Emit `dist/landing/index.html` and `dist/landing/es/index.html`.
  - Log byte sizes; fail if either > 400 KB uncompressed (budget proxy).
- [ ] Add script `"build:landing": "tsx generadores/landing.ts"` to `package.json`.
- [ ] Update `"build:all": "npm run build:skills-sheet && npm run build:cvs && npm run build:landing"`.
- [ ] Run `npm run build:landing` and verify files exist with correct sizes.
- [ ] Commit: `feat(phase-3): landing orchestrator + build:landing script`.

---

## Task 11: Integration tests

- [ ] Create `tests/landing-integration.test.ts`:
  - `renderLanding(data, "en")` contains all 5 `role="tabpanel"`.
  - Contains every case title from `data.cases`.
  - EN contains `"Let's work together"`; ES contains `"Trabajemos juntos"`.
  - Contains both verified testimonials (Sheppard quote substring + Giraldez quote substring).
  - Contains no scrub-list string: defensive assertions for `bah-ss-nonprod`, `tecustomersuccess@bah.com`, etc.
  - HTML length â‰¤ 400_000 bytes for each language.
  - Contains `lang="${lang}"` on `<html>`.
  - Both EN and ES versions render the live-dot element.
  - Contains `hreflang="en"` and `hreflang="es"` alternate links.
- [ ] All tests green.
- [ ] Commit: `test(phase-3): landing integration tests`.

---

## Task 12: Smoke test (puppeteer + lighthouse)

**Context:** Lighthouse via puppeteer. Opt-in: only run when `LANDING_SMOKE=1` in env, so CI doesn't slow down. Local manual run.

- [ ] Create `tests/landing-smoke.test.ts`:
  - Skip if `process.env.LANDING_SMOKE !== "1"`.
  - Launches puppeteer, `file://` loads `dist/landing/index.html`.
  - Checks `document.querySelectorAll('[role="tabpanel"]').length === 5`.
  - Clicks each tab button; checks corresponding panel becomes visible.
  - Sets viewport 375px; asserts `document.documentElement.scrollWidth <= 375` (no horizontal overflow).
  - Runs Lighthouse (lazy import `lighthouse` package â€” add as devDep only if needed).
  - Asserts perf â‰¥ 90, a11y â‰¥ 95.
  - If lighthouse adds too much install weight, ship without it â€” manual Chrome DevTools check is acceptable, just document in plan completion.
- [ ] Decision: if lighthouse devDep is heavy, skip automated Lighthouse; keep puppeteer DOM checks + document manual Lighthouse audit requirement in success notes.
- [ ] Commit: `test(phase-3): landing smoke test (opt-in via LANDING_SMOKE env)`.

---

## Task 13: Accessibility + BAH scrub + reduced-motion pass

**Context:** Final polish round before declaring Phase 3 done.

- [ ] Manual audit using Chrome DevTools Lighthouse on `dist/landing/index.html`:
  - Record scores; fix any a11y < 95 violations.
  - Known places to check: color contrast on orange-on-dark, tab focus indicators, live-dot has `aria-hidden`.
- [ ] Grep emitted HTML for scrub-list tokens; zero hits required.
- [ ] Test `prefers-reduced-motion: reduce` in DevTools: live-dot pulse stops, section-visual animations stop.
- [ ] Test keyboard-only navigation: Tab cycles through interactive elements in logical order; no traps.
- [ ] Commit: `chore(phase-3): a11y + scrub audit pass`.

---

## Task 14: Docs + memory update + push

- [ ] Update `README.md` with new `npm run build:landing` line + output paths.
- [ ] Add a memory note (manual, via Claude) marking Phase 3 shipped: criteria met, paths to output.
- [ ] `git push origin main`.
- [ ] Commit: `docs(phase-3): README + shipped`.

---

## Out of scope (explicit Phase 4+)

- "me" agent LLM integration (dock is empty placeholder only).
- Analytics / PostHog / Sentry.
- Contact form with backend.
- Custom domain DNS purchase/configuration.
- Behance gallery embed.
- Case-study-specific SEO routing.
- Blog.
- Motion-heavy canvas visuals (current section-visuals are CSS-only).

---

## Risk checkpoints during execution

| Checkpoint | If red, do this |
|-----------|------------------|
| Fonts push bundle > 250 KB gzip | Drop JetBrains Mono, use Inter for both display and mono slots. |
| Puppeteer Lighthouse too heavy | Skip automated Lighthouse; document manual Chrome audit in success notes. |
| Copy-email fails on iOS WebKit | Add `window.prompt` fallback path in `landing-script.ts`. |
| Hash navigation conflicts with browser back | Use `history.replaceState` for initial tab, `pushState` for subsequent. |
| Case expansion animation janky on mobile | Drop animation, use instant `hidden` toggle. |

---

## End-of-phase verification

- [ ] `npm test` â†’ 97 existing + ~25 new = ~122 tests, all green.
- [ ] `npm run build:all` â†’ skills-sheet + 5 CVs + 2 landing HTMLs produced.
- [ ] Manual Chrome Lighthouse on `dist/landing/index.html` â€” perf â‰¥ 90, a11y â‰¥ 95 captured in commit message.
- [ ] Manual open of `dist/landing/index.html` and `dist/landing/es/index.html` in Chrome + Firefox at widths 375 / 768 / 1280.
- [ ] Git log shows ~14 feature commits for Phase 3.
- [ ] Memory update: Phase 3 shipped.
