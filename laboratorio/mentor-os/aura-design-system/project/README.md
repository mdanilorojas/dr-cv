# Aura Design System
**Codename `dr-cv V11` · "Warm Huly Refined + AI Product-Tour"**

The brand-and-build canon for **Danilo Rojas — Product Designer** ([danilorojas.design](https://danilorojas.design)) and its flagship product, the **Career Training OS** — a prose-based skills diagnostic and study program built around one objective: **$250,000 / year as a Product Designer.**

This is not a from-scratch invention. The token foundation is **canonical** and lifted verbatim from the source repository. This system formalizes it into a real design-system package: documented tokens, reusable components, foundation specimen cards, and two high-fidelity UI kits.

---

## Sources

Built from the real product source. Explore these to design with higher fidelity:

- **GitHub — [`mdanilorojas/dr-cv`](https://github.com/mdanilorojas/dr-cv)** — the work-in-progress products. Key files lifted:
  - `design-system/tokens-web.css` — the canonical raw `--v11-*` tokens (source of truth).
  - `career-training/ur-assessment/index.html` — the live Career Training OS app, recreated as `ui_kits/app`.
  - `dist/landing-v11/index.html` — the V11 landing, recreated as `ui_kits/landing`.
  - `dist/landing-v11/assets/photo/danilo.jpg` — portrait, imported to `assets/photo/`.

Nothing here assumes you have access — but if you do, the repo is the deeper reference.

---

## Essence

Dark-dominant surfaces, a restrained **warm orange accent used as punctuation, not decoration**, self-hosted Inter + JetBrains Mono, WCAG-AA contrast. The signature move: the product **embeds running AI artifacts** — PDF embeds, live generator previews, streamed "visible thinking," plan-before-build, diff-review, named skills — so those artifact surfaces are **product-UI tokens, not effects.**

### Hard rules (baked into the brand)
- **No warm-radial-glow CTA pill** — anti-pattern #1. The accent is flat.
- **No AI-slop gradients, no neon, no glow.** Accent appears as small fills, hairline rings, carets, and chips only.
- **Two themes, one source of truth.** Dark is default; light *extends* the same semantic names (it does not re-theme into a different brand). Light shifts the accent to a deeper terracotta `#D9663F` for AA contrast on cream — a deliberate craft floor, not a bug.
- **Self-hosted variable fonts** (Latin subset) in production — not a CDN.
- **Reduced-motion respected.** Entrance animations are transform-only so content never gets stuck at `opacity:0`.

### Two surfaces, one brand
Recognize which you are designing before you start — the rules differ.

- **The App** — *operative cockpit.* Linear-meets-Notion density. Sidebar shell, cards, tables, badges, charts. Medium-tight. Dark default with a light toggle. Think: a NOC dashboard for a career.
- **The Landing / essay** — *notebook thesis + proof strip.* Long-form serif essay (Source Serif 4) on a cream "paper" chapter, dark/dark rhythm elsewhere, artifact embeds as the hero. Airy, big margins. Think: a designer's notebook that occasionally boots a live artifact.

---

## The concept — *the polished draftsman*

Aura's identity is **precision as signature**: the clean, exacting hand of a draftsman/architect. Marks sit on a visible scaffold — Vitruvian square, inscribing circle, golden-ratio guides, dimension *cotas* in mono. The accent is a single construction node, never a flourish. This is why the artifact surfaces (hairline frames, mono headers, diff rules) feel native: the whole system is drawn, not decorated. See `guidelines/brand-construction.html` and `assets/dr-blueprint.svg`.

---

## CONTENT FUNDAMENTALS

**Voice:** taste-first, sober, certain. Critic, not cheerleader.

- **Outcome-first, never activity-first.** "Earn $250,000 / year," not "Take courses to improve."
- **No emoji** in product or marketing copy. **No exclamation marks.**
- **Casing:** sentence case for headings; balanced wrapping (`text-wrap: pretty`); tight leading.
- **Person:** speaks *to* the reader ("Diagnose your own gap") and *from* the subject ("This is the working method behind one number"). First-person for the thesis, second-person for the product.
- **Numbers/format:** dates `14 Jun 2026`; 24-hour clock; **tabular-nums** for every metric; income as a clean `$250,000`.
- **Owned vocabulary (load-bearing — use, don't paraphrase):** *objective, mastery, skill cluster, gap, diagnostic, prose grader, market value, banked value, learning path, visible thinking, plan-before-build, diff-review, named skill, artifact.*

Examples in use: *"A point of view on agentic design — not a résumé." · "Write, don't pick. Your prose is graded against the senior rubric." · "Everything else is decoration."*

---

## VISUAL FOUNDATIONS

**Color.** Dark-dominant ladder (`#060708` deep → `#1C1F27` elevated-2) with a single cream "paper" surface (`#F6F4F0`) reserved for reading. One accent — warm orange `#FF8964` (terracotta `#D9663F` in light) — used only as fills, hairline rings (`rgba(255,137,100,.35)`), carets, and chips. Four **signal** colors for agentic state (cool/warn/pos/neg). A five-step **mastery scale** with sacred semantics (mastered green · proficient blue · developing amber · novice grey · gap red) — never reassigned. A five-series viz palette.

**Type.** *JetBrains Mono* for display headings + all metadata/code/pills (tight `-0.04em` tracking). *Inter* for UI and body. *Source Serif 4* for the essay surface only, at a 42rem measure with an optional accent drop-cap. Fluid clamp scale for marketing; fixed rem scale for the app.

**Spacing.** 4-base scale (`4 → 160px`). Generous in the landing, medium-tight in the app.

**Backgrounds.** Flat surfaces — **no gradients, no textures, no full-bleed imagery.** Depth comes from the surface ladder + hairline borders, occasionally a faint 24px construction grid (`.blueprint__grid`). The only imagery is the portrait.

**Borders & corners.** Hairline borders everywhere (`rgba(255,255,255,.08)` on dark, `#E5E2DA` on cream). Radii: 4 / 8 / 12 / 16 / 24 / pill. Cards = 12–16px. Modals = 24px. Pills = full.

**Shadows.** Muted, Huly-derived — `shadow-sm/md/lg` plus a dedicated `--v11-shadow-artifact` (deep drop + 1px inset top highlight). No glow shadows.

**Elevation/transparency.** Blur is used sparingly — topbar/nav (`backdrop-filter: blur(12px)`) and modal scrims only.

**Animation.** Standard ease `cubic-bezier(0.22,0.61,0.36,1)`; durations 80/180/280/480/720ms. Entrances are **transform-only**; the stream caret blinks (1.1s) and the skeleton shimmers — both still under `prefers-reduced-motion`. No bounces, no decorative loops on content.

**States.** Hover = surface lightens one step + border strengthens (no scale). Press = no shrink (the brand rejects scale-on-press). Focus = `0 0 0 3px` accent at 18%.

**Imagery vibe.** Warm, sober, documentary — the single portrait, no stock.

---

## ICONOGRAPHY

The source product uses **Lucide** (1.8px stroke, round caps/joins). This kit draws its handful of nav/UI icons as **inline Lucide-style SVG paths** at that exact weight (see `ui_kits/app/AppShell.jsx`) rather than pulling the font — keeping the kit dependency-free. For production, link Lucide from CDN or copy the SVGs you need.

- **No emoji**, ever, in product or brand surfaces.
- A few **Unicode glyphs** are used intentionally as iconography: `⌘` (named-skill chips, ⌘K), `▲ ▼ —` (deltas), `+ −` (diff signs), `✓` (completed plan steps), `//` (mono eyebrow prefix).
- Brand marks live in `assets/`: `dr-monogram.svg` (the DR mark), `dr-blueprint.svg` (the construction-drawing variant), `favicon.svg`.

---

## Index — what's in this package

| Path | What |
|---|---|
| `styles.css` | Global entry — `@import` manifest only. Consumers link this one file. |
| `fonts.css` | `@font-face` / font loading (Inter · JetBrains Mono · Source Serif 4). |
| `colors_and_type.css` | **Source of truth** — Layer 1 raw `--v11-*` tokens, Layer 2 semantic aliases (dark + light), base resets. |
| `components.css` | Every component class, consuming semantic tokens only. |
| `kitchen-sink.html` | Every component on one page, dark + light toggle. |
| `assets/` | Monogram, blueprint mark, favicon, portrait. |
| `guidelines/*.html` | Foundation specimen cards (Type · Colors · Spacing · Brand). |
| `components/<group>/` | Reusable React primitives + `.d.ts` + `.prompt.md` + card. |
| `ui_kits/app/` | Career Training OS app kit (dashboard · diagnostic · skill graph). |
| `ui_kits/landing/` | danilorojas.design notebook landing kit. |
| `templates/` | Seedable starting points consuming projects can copy — `career-os-app` (app dashboard) and `notebook-landing`. |
| `SKILL.md` | Agent-Skills header for Claude Code consumption. |

### Components (namespace `window.AuraDesignSystem_…`)
- **core** — `Button`, `Badge`, `Mastery`, `Card` (+ `CardHeader`/`CardBody`), `Avatar` (+ `AvatarGroup`)
- **forms** — `Input`, `Select`, `Switch`, `Tabs`, `Segmented`
- **feedback** — `Alert`, `Toast`, `Tooltip`, `ProgressBar`, `Skeleton`
- **artifact** (signature) — `Artifact` (+ `EmbedWell`), `Stream`, `PlanSteps`, `DiffReview`, `SkillChip`

---

## Caveats & how to help me iterate

- **Fonts are loaded from the Google Fonts CDN**, not yet self-hosted. The brand canon calls for self-hosted Latin-subset variable fonts in production. **Please drop the `.woff2` files** (Inter, JetBrains Mono, Source Serif 4) so I can swap `fonts.css` to local `@font-face` rules — no other change needed.
- **Icons are inline Lucide-style SVGs** at 1.8px stroke, not the real Lucide set. If you want exact parity, point me at the icon source or confirm I should link Lucide from CDN.
- The UI kits recreate the **dashboard, diagnostic, and skill-graph** views. The source app also has journey / mentor / projects / settings — say the word and I'll build those screens too.

**Bold ask:** tell me what to refine token-by-token — *"make the light accent one step warmer," "essay measure to 38rem," "the stream caret should pulse slower," "add a toasts card."* Because every component reads semantic tokens, most polish is a one-line change that ripples everywhere.
