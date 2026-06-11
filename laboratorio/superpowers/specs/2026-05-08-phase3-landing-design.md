# dr-cv Â· Phase 3 Â· Landing Page Â· Design Spec

**Date:** 2026-05-08
**Author:** Danilo Rojas (with Claude as operator)
**Status:** Brainstorming complete â†’ ready for writing-plans
**Companion:** `2026-05-08-phase3-landing-design.html` (for human review)
**Parent spec:** `2026-05-07-master-plan-design.md` (Phase 3 section)

---

## Problem

`dr-cv/` has Phases 1 and 2 shipped (skills sheet generator + 5 CV PDFs). None of that is visible on the public internet. A prospect who finds Danilo via LinkedIn outreach, BairesDev placement, or a CV handoff has nowhere to land that shows:

- The current 2026 Agentic Designer positioning (not the 2022 UX/UI frozen profile).
- A navigable case-study surface (TE Skin, TE Black, TE Landing v4.5, EnRegla, Life Update Mobile, DS migration, etc.).
- The method behind the work â€” the "profile + agentic AI = combination" frame.
- Real social proof (Sheppard, Giraldez verbal-OK testimonials).
- A single clear CTA.

The landing is the public-facing surface that turns prospects into conversations. Everything else Danilo ships in this repo funnels into it.

## Goal

Ship a production-ready landing page at `danilorojas.design` (domain TBD) that:

1. Loads the same `/perfil/data/*` single source of truth used by Phases 1 and 2 â€” zero hand-edited content.
2. Matches the **Huly.io aesthetic** (dark-dominant, alternating light-bg sections, JetBrains Mono display, Inter body, warm accent `#FF8964`, one animated visual per section).
3. Follows the **tab-SPA pattern** Danilo already shipped at BAH in `te-landing-v4.5.html` â€” a single HTML file, tab-switched sections, no router.
4. Is **mobile-first** responsive, works on 375px width without horizontal overflow.
5. Is **bilingual** EN/ES via dual-file emission (`/index.html` + `/es/index.html`), not a JS runtime toggle.
6. Can be deployed to any static host (Vercel, GitHub Pages, Netlify) with zero build-time environment variables.

## Non-goals

- **NOT a React / Next / SSR app.** The tab-SPA vanilla-HTML-and-CSS pattern is deliberate â€” it proved itself in SharePoint at BAH and keeps the surface auditable. Adding a framework is Phase 5+ if ever.
- **NOT a CMS.** Content lives in `/perfil/data/` YAML/Markdown, just like Phases 1â€“2.
- **NOT a backend.** The docked "me" agent is Phase 4+; Phase 3 reserves the UI slot but ships no LLM calls, no API routes, no server.
- **NOT analytics / tracking / cookies in v1.** PostHog / Sentry are Phase 4+. No consent banner in Phase 3 because there is nothing to consent to.
- **NOT a contact form.** A mailto + clipboard-copy of the email is enough. Forms need backends; backends are Phase 4+.
- **NOT a domain purchase.** Uses placeholder `danilorojas.design`; swap when Danilo buys the real one.
- **NOT multi-page routing.** One HTML file per language. Tabs switch via URL hash (`#work`, `#method`, etc.) for shareability.
- **NOT a blog.** Case studies are the only long-form content surface in Phase 3.

## Architecture

### Tab-SPA single-file pattern

The landing is **one HTML file per language**. All sections exist in the DOM from load; a tab bar toggles which one is visible via CSS `[hidden]`. URL hash reflects active tab for shareability (`danilorojas.design/#work`). No router, no framework, no hydration.

This mirrors `te-landing-v4.5.html` â€” the SharePoint-deployable SPA Danilo shipped at BAH â€” because it's already validated in a harsher deploy environment than any public host Phase 3 will touch.

### Tabs (5 sections)

1. **Overview** â€” hero (name, category, thesis), live-dot status, four proof numbers, primary CTA.
2. **Work** â€” case studies grid with the 4 `/perfil/data/cases/*.md` already in the repo (+ future additions). Each card expands inline to show full case body; no modals, no navigation away.
3. **Method** â€” the "how I work" narrative: profile + agentic AI = combination. Animated diagram showing the agentic workflow (Claude Code + MCP + subagents + skills-lock). Links out to Phase 1 skills sheet and Phase 2 CVs.
4. **About** â€” bio, 15-year timeline (2010â€“2026), education, languages, location.
5. **Contact** â€” mailto CTA, LinkedIn, GitHub, Behance, copy-email button, live-dot. Reserves a `<aside id="me-agent-dock">` placeholder for Phase 4+ (empty in Phase 3 output).

### Bilingual via dual file emission

- `dist/landing/index.html` â€” English (primary).
- `dist/landing/es/index.html` â€” Spanish (translations already in `/perfil/data/`).
- Language toggle is an `<a href>` link in the header, not a JS state toggle. This keeps each page fully static, SEO-indexable, and shareable.
- Any language switch preserves the active tab via hash.

### Generator

`generadores/landing.ts` follows the same pattern as `generadores/cv.ts`:

```
generadores/landing.ts                     # orchestrator, emits 2 HTML files
generadores/templates/landing/
  â”œâ”€â”€ index.ts                            # full-page template
  â”œâ”€â”€ landing-styles.ts                   # inline <style>, single blob
  â”œâ”€â”€ landing-script.ts                   # inline <script>, tab logic only
  â””â”€â”€ components/
      â”œâ”€â”€ hero-block.ts                   # overview hero
      â”œâ”€â”€ proof-numbers.ts                # 4-number strip (reuses /perfil/data/positioning.yaml)
      â”œâ”€â”€ tab-nav.ts                      # horizontal scroll on mobile, sticky on desktop
      â”œâ”€â”€ case-expander.ts                # work-tab case card with inline expansion
      â”œâ”€â”€ method-diagram.ts               # SVG/CSS animated agent workflow
      â”œâ”€â”€ timeline.ts                     # about-tab chronological strip
      â”œâ”€â”€ testimonial-featured.ts         # large-format quote (reuses perfil/data/testimonials/*)
      â”œâ”€â”€ section-visual.ts               # per-section animated background slot
      â””â”€â”€ contact-block.ts                # mailto + social links + copy-email
```

### Data

Reuses all existing data files. Adds one:

- `perfil/data/landing.yaml` â€” new file. Defines tab order, tab visibility flags, per-section visual choice (e.g. `overview: "particles"`, `method: "flow"`), CTA text per language.

Schema for `perfil/data/landing.yaml`:

```yaml
tabs:
  - id: overview
    labelEn: Overview
    labelEs: Resumen
    visual: particles
    default: true
  - id: work
    labelEn: Work
    labelEs: Trabajo
    visual: grid
  - id: method
    labelEn: Method
    labelEs: MÃ©todo
    visual: flow
  - id: about
    labelEn: About
    labelEs: Sobre mÃ­
    visual: timeline
  - id: contact
    labelEn: Contact
    labelEs: Contacto
    visual: signature

cta:
  en: "Let's work together"
  es: "Trabajemos juntos"

seo:
  titleEn: "Danilo Rojas â€” Agentic Designer"
  titleEs: "Danilo Rojas â€” DiseÃ±ador AgÃ©ntico"
  descriptionEn: "I ship real products â€” and I ship the tools agents use to help me ship them."
  descriptionEs: "Entrego publicables reales â€” y entrego las herramientas que los agentes usan para ayudarme."
```

### Performance budget

- Total transferred bytes (HTML + inlined CSS + inlined JS) per language: **â‰¤ 250 KB gzipped**.
- No external fonts from CDN. Self-host Inter + JetBrains Mono via `assets/fonts/` with `font-display: swap`.
- No external JS libraries. Vanilla JS only for tab switching, hash sync, copy-to-clipboard, and intersection observers for section visuals.
- Animated visuals: CSS-only where possible; if canvas, single `<canvas>` per section, paused when section is hidden.
- Lighthouse: performance â‰¥ 90, accessibility â‰¥ 95, best practices â‰¥ 95, SEO â‰¥ 95.

### Accessibility

- All tab controls follow WAI-ARIA tabs pattern: `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, `aria-controls`.
- Keyboard: arrow keys navigate tabs, Enter/Space activates, Home/End jump to first/last.
- All animations respect `prefers-reduced-motion: reduce`.
- Contrast audited (tokens already have per-token WCAG audit from BAH TE Black work).
- Language toggle in the header uses `hreflang` attributes.
- Focus visible on every interactive element.

### Visual system

Landing uses the **dark-dominant** Huly aesthetic, which is distinct from Phases 1â€“2 (light-paper). Token set forks:

- `design-system/tokens-print.css` â†’ used by skills-sheet and CVs (light paper).
- `design-system/tokens-landing.css` â†’ new file, dark-dominant, reuses accent `#FF8964`, defines `--bg-ink: #0a0a0f`, `--ink-inverse: #f4f4f5`, section-alt light band `#f7f5f1`.

The landing CSS uses `tokens-landing.css` as its base; existing CV/skills-sheet outputs are untouched.

### User flow

```mermaid
flowchart TD
    A[Entry: LinkedIn / CV link / direct URL / BairesDev placement] --> B{Landing at /}
    B -->|Load| C[Overview tab = default]
    C --> D{User action}
    D -->|Tab: Work| E[Work section]
    D -->|Tab: Method| F[Method section]
    D -->|Tab: About| G[About section]
    D -->|Tab: Contact| H[Contact section]
    D -->|Toggle ES| ES[/es/ version, same tab preserved]
    D -->|CTA click| H
    E -->|Click case card| E2[Case expanded inline]
    E2 -->|Collapse| E
    F -->|Links out| SKILLS[Phase 1 skills sheet PDF]
    F -->|Links out| CV[Phase 2 CV PDFs]
    H -->|Mailto| MAIL[Email client opens]
    H -->|Copy email| COPY[Clipboard success toast]
    H -->|LinkedIn / GitHub / Behance| EXT[External profile]
    ES --> B
```

## Components

Each component is a pure render function `(data, lang) => string`. All testable in isolation.

| Component | Purpose | Reused by |
|-----------|---------|-----------|
| `hero-block` | Overview hero â€” name + category + thesis + live dot + CTA | Overview tab only |
| `proof-numbers` | Four stats strip from `/perfil/data/positioning.yaml.proofNumbers` | Overview tab, Method tab |
| `tab-nav` | Sticky nav, 5 tabs, hash-sync, keyboard nav, lang toggle | Every tab |
| `case-expander` | Case card that expands inline (reads `/perfil/data/cases/*.md` body) | Work tab |
| `method-diagram` | SVG diagram of Claude Code + MCP + subagents + skills-lock flow | Method tab |
| `timeline` | 2010â€“2026 chronological strip from `/perfil/data/experience.yaml` | About tab |
| `testimonial-featured` | Large-format quote card with verified/attributed badge | Work tab, Method tab |
| `section-visual` | Per-section animated background (particles / flow / grid / timeline / signature) | Every tab |
| `contact-block` | Mailto + social links + copy-email | Contact tab |

## Testing strategy

Same pattern as Phase 2:

- **Unit tests** (vitest) per component: returns non-empty string, escapes HTML, renders EN + ES variants.
- **Integration tests** for `renderLanding(data, lang)`:
  - Contains all 5 tab panels.
  - Contains all 4 case-card entries from `/perfil/data/cases/`.
  - EN version contains "Let's work together"; ES contains "Trabajemos juntos".
  - Contains both verified testimonials (Sheppard, Giraldez).
  - Does not contain any scrub-list URL (defensive â€” reuses existing scrub test pattern).
  - Total HTML size â‰¤ 400 KB uncompressed per language (rough proxy for budget).
- **Smoke test** with puppeteer: load each emitted HTML, check Lighthouse scores, check no horizontal scroll at 375px width, check tab switching works.

## Success criteria

Phase 3 is complete when:

1. `npm run build:landing` emits `dist/landing/index.html` and `dist/landing/es/index.html` from `/perfil/data/*` only â€” zero hand-edited content in the output.
2. Both files open in a browser and render all 5 tabs correctly at mobile (375px), tablet (768px), and desktop (1280px) widths.
3. Tab switching works via click, keyboard, and URL hash.
4. Language toggle preserves active tab (`/#work` â†’ `/es/#work`).
5. Lighthouse scores â‰¥ 90 performance, â‰¥ 95 accessibility on the deployed or locally-served output.
6. All tests green: existing 97 + new landing tests.
7. The output is deployable to any static host (tested at minimum with `npx http-server dist/landing`).
8. The BAH scrub list is respected â€” no internal URLs, no customer counts, no token exposure.

## Phase 3 out-of-scope (explicit future work)

- Docked "me" agent (Phase 4+).
- Analytics / tracking / consent (Phase 4+).
- Contact form with backend (Phase 4+).
- Custom domain DNS configuration (user action, not a code task).
- Blog / long-form writing surface (Phase 5+ if ever).
- Behance gallery embed (kept as external link, not embedded).
- Video / motion case studies (Phase 4+).

## Risks and mitigations

| Risk | Mitigation |
|------|------------|
| Tab-SPA hurts SEO vs. multi-page | Each language gets its own `<title>` and `<meta description>`; tabs get hash URLs (`#work`) which are client-side only but each page is fully crawlable as one unit. Acceptable tradeoff for a personal landing; revisit if we ever need per-case SEO. |
| Dark-dominant design clashes with light CV/skills-sheet | Token sets are forked â€” landing has `tokens-landing.css`, CVs keep `tokens-print.css`. No cross-contamination. |
| Performance budget blown by self-hosted fonts | Subset to Latin-1 only at build time; woff2 only; `font-display: swap`. If still over budget, drop JetBrains Mono and keep Inter only. |
| Animations trigger motion-sensitive users | `prefers-reduced-motion: reduce` media query disables all non-essential motion; live-dot keeps static state. |
| Copy-email button fails on iOS Safari | Fallback to `window.prompt` with pre-filled email if `navigator.clipboard` unavailable. |
| Hash-based routing breaks browser back button | Handled â€” every hash change pushes to history via `history.pushState`; popstate listener syncs UI. |
| User lands on `/es/#contact` but switches to EN â†’ goes to `/#overview` instead of `/#contact` | The language toggle preserves `location.hash` explicitly. |

## Decisions locked for Phase 3

| # | Decision | Reason |
|---|----------|--------|
| P3-1 | Tab-SPA single-file-per-language, not React/Next | Proven pattern at BAH; zero build/runtime complexity; auditable |
| P3-2 | Bilingual via dual file emission, not JS toggle | SEO, shareability, simplicity |
| P3-3 | Dark-dominant visual system, separate token file | Matches master plan Huly aesthetic; doesn't touch Phases 1â€“2 |
| P3-4 | 5 tabs: Overview / Work / Method / About / Contact | Matches master plan; maps cleanly to data already in repo |
| P3-5 | Self-hosted fonts, no CDN | Performance budget + offline-friendly |
| P3-6 | Vanilla TS generator + vanilla JS runtime | Consistent with Phases 1â€“2; no framework tax |
| P3-7 | Mailto CTA, no form | No backend needed in Phase 3 |
| P3-8 | Performance budget â‰¤ 250 KB gzipped per language | Hard ceiling; enforces discipline |
| P3-9 | Lighthouse a11y â‰¥ 95 | Danilo has a11y discipline from BAH TE Black; this is the baseline |
| P3-10 | `perfil/data/landing.yaml` new file, everything else reused | Minimize new data surface |
| P3-11 | Case expansion inline, not modals or separate pages | Tab-SPA purity |
| P3-12 | "me" agent dock reserved as empty `<aside>` placeholder | Phase 4 hook without Phase 3 work |

## Next step

Invoke `writing-plans` skill to produce the Phase 3 implementation plan (tasks, order, test-first checkpoints, commit boundaries).
