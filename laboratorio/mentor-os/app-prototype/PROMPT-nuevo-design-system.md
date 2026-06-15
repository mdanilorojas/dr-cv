# Prompt — Create the **Aura Design System** (dr-cv V11)

> **How to use this file.** Open a **new Claude Design window / project** and paste
> everything from `=== PROMPT START ===` to `=== PROMPT END ===` as your first
> message, then invoke the **"Create design system"** skill. It is fully
> self-contained — all tokens are embedded inline — so it needs **no access to this
> project or any bound design system**; the new window builds Aura from scratch off
> the embedded values. Everything below `=== PROMPT END ===` is notes for *you*
> (where the real source lives in this project, how to refine it) — do **not** paste
> those into the new window.

---

=== PROMPT START ===

## Role & objective

You are a senior design-systems engineer. Build a **complete, production-grade
design system** called the **Aura Design System** (codename `dr-cv V11`). It is the
brand-and-build canon for **Danilo Rojas — Product Designer** (`danilorojas.design`)
and its flagship product, the **Career Training OS**: a prose-based skills
diagnostic and study program whose single objective is *"$250k/year as a Product
Designer."*

This is **not** a from-scratch invention. The token foundation already exists and
is **canonical — do not redesign it.** Your job is to (1) formalize it into a real
design system folder, (2) document it exhaustively, (3) build preview cards and
high-fidelity UI kits that prove every token and component, and (4) extend it
*beyond* what the existing app uses, filling the obvious gaps a mature system
needs. Lift token values **verbatim** — never round, rename, or "improve" them.

## What this system is (essence)

**Aura — a "Warm Huly Refined + AI Product-Tour" aesthetic.** Dark-dominant surfaces, a restrained warm
orange accent used as *punctuation not decoration*, self-hosted Inter + JetBrains
Mono, WCAG-AA contrast. The signature is that the product **embeds running AI
artifacts** — PDF embeds, live generator previews, streamed "visible thinking,"
plan-before-build, diff-review, named skills — so those artifact surfaces are
**product-UI tokens, not effects.**

Hard rules baked into the brand:
- **No warm-radial-glow CTA pill** (marked anti-pattern #1). The accent is flat.
- **No AI-slop gradients, no neon, no glow.** Accent appears as small fills,
  hairline rings, carets, and chips only.
- **Two themes, one source of truth:** dark is default; light *extends* the same
  semantic names (it does not re-theme into a different brand).
- **Self-hosted variable fonts**, Latin subset — not Google Fonts CDN in prod.
- **Reduced-motion respected**; entrance animations are transform-only so content
  never gets stuck at `opacity:0` in a paused offscreen iframe.

### Two surfaces, one brand
Recognize which surface you're designing before you start — the rules differ.

- **The App** — *operative cockpit.* Linear-meets-Notion density. Sidebar shell,
  cards, tables, badges, charts. Medium-tight. Dark default with a light toggle.
- **The Landing / essay** — *Notebook thesis + proof-strip.* Long-form serif essay
  surface (Source Serif 4) on a cream "paper" chapter, dark/dark-alt rhythm
  elsewhere, artifact embeds as the hero. Airy. Big margins.

When in doubt: app is a NOC dashboard for a career; landing is a designer's
notebook that occasionally boots a live artifact.

## Content & voice

- **Subject:** Danilo Rojas, Product Designer. Everything optimizes one number —
  **$250k/year.** Copy is outcome-first ("Earn $250,000 / year"), never activity-
  first.
- **Tone:** taste-first, sober, certain. Critic voice, not cheerleader. No emoji
  in product or marketing copy. No exclamation marks.
- **Casing:** sentence case for headings; balanced wrapping; tight leading.
- **Number/format:** dates `14 Oct 2026`; 24-hour clock; tabular-nums for all
  metrics; income shown as a clean `$250,000`.
- **Owned vocabulary (load-bearing — use, don't paraphrase):** *objective,
  mastery, skill cluster, gap, diagnostic, prose grader, market value, banked
  value, learning path, visible thinking, plan-before-build, diff-review, named
  skill, artifact.*

## DESIGN TOKENS — canonical, paste verbatim into `colors_and_type.css` / `tokens.css`

### Layer 1 — raw brand tokens (`--v11-*`). This is the source of truth.

```css
:root {
  /* 1 · SURFACE (dark-dominant) */
  --v11-bg-deep:        #060708;
  --v11-bg-primary:     #0A0B0E;
  --v11-bg-alt:         #111318;
  --v11-bg-paper:       #F6F4F0;   /* cream chapter */
  --v11-bg-elevated:    #14161C;
  --v11-bg-elevated-2:  #1C1F27;
  --v11-bg-inset:       #0D0F13;

  /* 2 · INK on dark */
  --v11-text:        #F4F4F5;
  --v11-text-body:   #D7D8DB;
  --v11-text-85:     #C9CBCF;
  --v11-text-70:     #B0B2B7;
  --v11-text-60:     #95979E;
  --v11-text-50:     #797D86;
  --v11-text-40:     #61656B;
  --v11-text-subtle: #4A4B50;
  /* ink on cream */
  --v11-paper-ink:    #0B0C0E;
  --v11-paper-body:   #303236;
  --v11-paper-muted:  #4A4B50;
  --v11-paper-subtle: #797D86;

  /* 3 · ACCENT — restrained, punctuation only (NO glow) */
  --v11-accent:      #FF8964;
  --v11-accent-ink:  #2A0F05;
  --v11-accent-deep: #E0674A;
  --v11-accent-soft: rgba(255,137,100,0.14);
  --v11-accent-ring: rgba(255,137,100,0.35);
  --v11-accent-line: rgba(255,137,100,0.28);
  /* secondary signals — agentic UX state only */
  --v11-signal-cool: #5683DA;  /* tool-use / plan */
  --v11-signal-warn: #E5A84B;  /* caution / learning-level */
  --v11-signal-pos:  #4ADE80;  /* diff additions / success */
  --v11-signal-neg:  #F87171;  /* diff deletions / error */

  /* 4 · LINES */
  --v11-line:          rgba(255,255,255,0.08);
  --v11-line-strong:   rgba(255,255,255,0.18);
  --v11-line-soft:     rgba(255,255,255,0.04);
  --v11-line-paper:    #E5E2DA;
  --v11-line-paper-sf: #EFECE4;

  /* 5 · ELEVATION (muted, Huly-derived) */
  --v11-shadow-card:       0 6px 25px rgba(0,0,0,.50);
  --v11-shadow-card-hover: 0 14px 30px rgba(0,0,0,.80);
  --v11-shadow-float:      0 10px 20px rgba(0,0,0,.50);
  --v11-shadow-artifact:   0 16px 40px rgba(0,0,0,.45), 0 2px 0 rgba(255,255,255,.04) inset;

  /* 6 · TYPE (self-hosted variable fonts) */
  --v11-font-body:    'Inter','Helvetica Neue',system-ui,-apple-system,'Segoe UI',Arial,sans-serif;
  --v11-font-display: 'JetBrains Mono','SF Mono',Menlo,Consolas,ui-monospace,monospace;
  --v11-font-mono:    'JetBrains Mono','SF Mono',Menlo,Consolas,ui-monospace,monospace;
  --v11-font-serif:   'Source Serif 4','Source Serif Pro',Georgia,'Times New Roman',serif; /* essay only */
  /* fluid scale */
  --v11-fs-hero: clamp(32px,7vw,72px);
  --v11-fs-h1:   clamp(28px,5.5vw,56px);
  --v11-fs-h2:   clamp(24px,4vw,40px);
  --v11-fs-h3:   clamp(20px,2.8vw,28px);
  --v11-fs-lead: clamp(17px,1.9vw,20px);
  --v11-fs-body: 16px;  --v11-fs-small: 14px;
  --v11-fs-micro: 12px; --v11-fs-nano: 11px;
  /* tracking */
  --v11-track-snug:-0.01em; --v11-track-snugger:-0.02em; --v11-track-tight:-0.04em;
  --v11-track-tighter:-0.05em; --v11-track-loose:0.08em; --v11-track-code:0.14em; --v11-track-micro:0.16em;
  /* leading */
  --v11-lead-hero:0.95; --v11-lead-h:1.1; --v11-lead-tight:1.25; --v11-lead-body:1.55; --v11-lead-loose:1.7;
  /* weight */
  --v11-wt-regular:400; --v11-wt-medium:500; --v11-wt-semibold:600; --v11-wt-bold:700;

  /* 7 · RADIUS */
  --v11-radius-none:0; --v11-radius-sm:4px; --v11-radius:8px; --v11-radius-card:12px;
  --v11-radius-lg:16px; --v11-radius-xl:24px; --v11-radius-pill:9999px;

  /* 8 · SPACING (4-base) */
  --v11-s-0:0; --v11-s-1:4px; --v11-s-2:8px; --v11-s-3:12px; --v11-s-4:16px; --v11-s-5:24px;
  --v11-s-6:32px; --v11-s-7:48px; --v11-s-8:64px; --v11-s-9:80px; --v11-s-10:96px; --v11-s-11:128px; --v11-s-12:160px;

  /* 9 · LAYOUT */
  --v11-container:80rem; --v11-container-narrow:42rem; --v11-container-wide:88rem;
  --v11-pad-x:clamp(20px,4vw,32px);

  /* 10 · MOTION */
  --v11-ease-standard:cubic-bezier(0.22,0.61,0.36,1);
  --v11-ease-in:cubic-bezier(0.4,0,1,1);
  --v11-ease-out:cubic-bezier(0,0,0.2,1);
  --v11-ease-emphasize:cubic-bezier(0.2,0,0,1);
  --v11-dur-instant:80ms; --v11-dur-fast:180ms; --v11-dur-base:280ms; --v11-dur-slow:480ms; --v11-dur-extra:720ms;

  /* 11 · Z-INDEX */
  --v11-z-base:0; --v11-z-raised:1; --v11-z-nav:50; --v11-z-toast:60; --v11-z-modal:70; --v11-z-hint:80;

  /* 12 · ARTIFACT SURFACE (the AI Product-Tour layer — product UI, not effects) */
  --v11-artifact-bg:#111318; --v11-artifact-bg-alt:#16181F;
  --v11-artifact-line:rgba(255,255,255,0.10); --v11-artifact-line-strong:rgba(255,255,255,0.20);
  --v11-artifact-glow:rgba(255,137,100,0.08); /* 1px focused-frame border, NOT hero glow */
  --v11-artifact-chip-bg:rgba(255,137,100,0.12); --v11-artifact-chip-ink:var(--v11-accent); --v11-artifact-chip-line:var(--v11-accent-line);
  --v11-stream-bg:rgba(255,255,255,0.025); --v11-stream-line:rgba(255,255,255,0.06); --v11-stream-caret:var(--v11-accent);
  --v11-diff-add-bg:rgba(74,222,128,0.08); --v11-diff-add-line:rgba(74,222,128,0.25);
  --v11-diff-del-bg:rgba(248,113,113,0.08); --v11-diff-del-line:rgba(248,113,113,0.25);
}
@media (prefers-reduced-motion: reduce) {
  :root { --v11-dur-instant:0ms; --v11-dur-fast:0ms; --v11-dur-base:0ms; --v11-dur-slow:0ms; --v11-dur-extra:0ms; }
}
```

### Layer 2 — semantic alias layer (what components actually consume)

Map every semantic name to a `--v11-*` token **with the literal as fallback** so a
surface renders even if Layer 1 is absent. Ship **dark (default) + light**.

```css
:root {
  --font-sans:'Inter',system-ui,-apple-system,'Segoe UI',sans-serif;
  --font-mono:'JetBrains Mono','SF Mono',Menlo,Consolas,ui-monospace,monospace;
  /* app type scale */
  --fs-xs:.6875rem; --fs-sm:.75rem; --fs-md:.8125rem; --fs-base:.875rem; --fs-lg:1rem;
  --fs-xl:1.25rem; --fs-2xl:1.5rem; --fs-3xl:1.9375rem; --fs-4xl:2.75rem; --fs-5xl:4rem;
  --fw-regular:400; --fw-medium:500; --fw-semibold:600; --fw-bold:700;
  --lh-tight:1.06; --lh-snug:1.22; --lh-base:1.5; --lh-normal:1.62;
  --tracking-tight:-0.03em; --tracking-base:-0.011em; --tracking-wide:0.02em; --tracking-eyebrow:0.15em;
  /* spacing / radii / motion */
  --s-1:.25rem; --s-2:.5rem; --s-3:.75rem; --s-4:1rem; --s-5:1.25rem; --s-6:1.5rem; --s-8:2rem;
  --s-10:2.5rem; --s-12:3rem; --s-16:4rem; --s-20:5rem; --s-24:6rem;
  --r-sm:4px; --r-md:8px; --r-lg:12px; --r-xl:16px; --r-2xl:24px; --r-full:9999px;
  --ease:cubic-bezier(0.22,0.61,0.36,1); --ease-out:cubic-bezier(0,0,0.2,1);
  --dur-fast:180ms; --dur-base:280ms; --dur-slow:480ms;
  /* brand (theme-invariant) */
  --accent:var(--v11-accent,#FF8964); --accent-hover:var(--v11-accent-deep,#E0674A); --accent-ink:var(--v11-accent-ink,#2A0F05);
  --brand-secondary:#26221C;
  --signal-cool:#5683DA; --signal-warn:#E5A84B; --signal-pos:#4ADE80; --signal-neg:#F87171;
  --viz-1:#FF8964; --viz-2:#5683DA; --viz-3:#E5A84B; --viz-4:#4ADE80; --viz-5:#9B8AFB;
}
:root, [data-theme="dark"] {
  --bg:var(--v11-bg-primary,#0A0B0E); --bg-deep:var(--v11-bg-deep,#060708);
  --surface:var(--v11-bg-elevated,#14161C); --surface-subtle:var(--v11-bg-inset,#0D0F13);
  --surface-hover:var(--v11-bg-elevated-2,#1C1F27); --surface-elevated:var(--v11-artifact-bg-alt,#16181F);
  --text-primary:var(--v11-text,#F4F4F5); --text-secondary:var(--v11-text-70,#B0B2B7);
  --text-muted:var(--v11-text-50,#797D86); --text-faint:var(--v11-text-40,#61656B); --text-inverse:var(--v11-paper-ink,#0B0C0E);
  --border:var(--v11-line,rgba(255,255,255,.08)); --border-subtle:var(--v11-line-soft,rgba(255,255,255,.045)); --border-strong:var(--v11-line-strong,rgba(255,255,255,.18));
  --primary:var(--v11-accent,#FF8964); --primary-hover:var(--v11-accent-deep,#E0674A);
  --primary-soft:var(--v11-accent-soft,rgba(255,137,100,.13)); --primary-soft-text:var(--v11-accent,#FF8964); --on-primary:var(--v11-accent-ink,#2A0F05);
  --success:#4ADE80; --success-soft:rgba(74,222,128,.12); --success-text:#6EE79B;
  --warning:#E5A84B; --warning-soft:rgba(229,168,75,.13); --warning-text:#F0C27E;
  --danger:#F87171; --danger-soft:rgba(248,113,113,.12); --danger-text:#F89B9B;
  --info:#5683DA; --info-soft:rgba(86,131,218,.14); --info-text:#8FB0EA;
  /* mastery scale */
  --m-mastered:#4ADE80;   --m-mastered-bg:rgba(74,222,128,.12);
  --m-proficient:#5683DA; --m-proficient-bg:rgba(86,131,218,.14);
  --m-developing:#E5A84B; --m-developing-bg:rgba(229,168,75,.13);
  --m-novice:#9AA0A8;     --m-novice-bg:rgba(255,255,255,.06);
  --m-gap:#F87171;        --m-gap-bg:rgba(248,113,113,.12);
  --shadow-sm:0 2px 8px rgba(0,0,0,.4); --shadow-md:0 6px 25px rgba(0,0,0,.5); --shadow-lg:0 14px 30px rgba(0,0,0,.7);
  --shadow-overlay:0 28px 64px -18px rgba(0,0,0,.8); --scrim:rgba(3,5,8,.66);
  --sidebar-bg:#0D0F13; --topbar-bg:rgba(10,11,14,.82);
}
[data-theme="light"] {
  --bg:#F6F4F0; --bg-deep:#ECE9E2; --surface:#FFFFFF; --surface-subtle:#F1EEE8; --surface-hover:#F4F1EB; --surface-elevated:#FFFFFF;
  --text-primary:#0B0C0E; --text-secondary:#4A4B50; --text-muted:#797D86; --text-faint:#9AA0A8; --text-inverse:#F4F4F5;
  --border:#E5E2DA; --border-subtle:#EFECE4; --border-strong:#D6D2C8;
  --primary:#D9663F; --primary-hover:#BF4F2C; --primary-soft:rgba(217,102,63,.10); --primary-soft-text:#B14A28; --on-primary:#FFFFFF;
  --success:#1F9D57; --warning:#B7791F; --danger:#D14343; --info:#3F6FC4;
  --m-mastered:#1F9D57; --m-proficient:#3F6FC4; --m-developing:#B7791F; --m-novice:#797D86; --m-gap:#D14343;
  --viz-1:#D9663F; --viz-2:#3F6FC4; --viz-3:#B7791F; --viz-4:#1F9D57; --viz-5:#7A5AF0;
  --shadow-sm:0 1px 2px rgba(11,12,14,.07); --shadow-md:0 6px 20px -6px rgba(11,12,14,.12); --shadow-lg:0 16px 36px -10px rgba(11,12,14,.16);
  --shadow-overlay:0 28px 60px -18px rgba(11,12,14,.24); --scrim:rgba(40,38,33,.4);
  --sidebar-bg:#FFFFFF; --topbar-bg:rgba(246,244,240,.86);
}
```

> The light accent intentionally shifts to a **deeper terracotta `#D9663F`** for
> AA contrast on cream — keep that, it is a deliberate craft floor, not a bug.

## Component inventory — must all ship in the kit

**Everything the Career Training OS app already uses (recreate to pixel fidelity):**

- **Buttons** — primary, secondary, ghost, accent, danger; sizes sm/base/lg;
  icon-only; disabled. 36px default height, 8px radius, no scale-on-press.
- **Card** — surface + hairline border + `shadow-sm`; with header (title/sub +
  trailing slot), padded body variant. Plus the **`.ai-surface`** tinted variant
  for AI-authored content and its **`.ai-tag`** label.
- **Badges / pills** — neutral, primary, success, warning, danger, info, accent;
  `dot` variant; **mono pill** (JetBrains Mono, uppercase, micro tracking).
- **Mastery badges** — mastered / proficient / developing / novice / gap (each
  with its own bg/ink pair). These are sacred semantics — never reassign colors.
- **Progress track** (sm/lg) and **confidence meter** (3-bar high/medium/low).
- **Tabs** (underline) and **segmented control**.
- **Table** — sticky header, hover rows, hairline row separators, tabular-nums.
- **Inputs** — text / select / textarea, field-label, field-help, focus ring
  (`0 0 0 3px` accent at 18%), **toggle switch**, search bar.
- **Tooltip** (dark popover), **skeleton** shimmer, **divider**, **kbd**.
- **App shell** — 248px sidebar (collapsible to 68px), nav groups + active item
  with accent left-rail, 57px topbar with blur, scrollable content, page header
  block (`page-title`/`page-desc`), stat block, delta (up/down/flat).
- **Overlay** — scrim + modal (24px radius, overlay shadow).
- **Charts** — line/area, bars, donut/ring, sparkline, using `--viz-1..5`.
- **Artifact surfaces (the signature layer):**
  - **PDF / file embed well** (`--v11-artifact-*`, inset, focused-frame border).
  - **Stream UI** — "visible thinking" with blinking accent caret.
  - **Plan-before-build** — checklist/steps using `--signal-cool`.
  - **Diff-review** — add/del rows using the diff token pairs.
  - **Named-skill chip** — accent chip with mono label.

**Extend beyond the app (the "y más" — add these to round out the system):**

- Empty states, inline alerts/callouts (info/success/warn/danger), toasts, dropdown
  menu, dialog/sheet, avatar + avatar group (DR monogram), breadcrumbs, pagination,
  command palette (`⌘K`), date display chips, tag input, accordion, code block with
  copy, stat-card grid, and the **serif essay surface** (cream paper chapter,
  Source Serif 4, 42rem measure, drop-cap optional) for the landing/notebook.

## Deliverables (folder structure — mirror a real DS package)

```
README.md                  # brand canon — essence, two surfaces, voice, every visual rule
SKILL.md                   # Agent-Skills header so Claude Code can consume it
colors_and_type.css        # single source of truth: @font-face, Layer 1 + Layer 2 tokens, base element styles
components.css             # all component classes above, consuming semantic tokens only
assets/                    # self-hosted Inter / JetBrains Mono / Source Serif 4 subsets, favicon, DR monogram
preview/                   # one HTML card per token group + component group (see list)
ui_kits/app/index.html     # hi-fi recreation: dashboard, analytics, assessment, skill-graph, journey, mentor, projects, settings
ui_kits/landing/index.html # hi-fi recreation: notebook essay + artifact hero + proof strip + CTA
_ds_manifest.json          # register every preview card with group + viewport + subtitle
```

**Preview cards to generate** (group → cards):
- **Type** — display/hero scale, body scale, mono metadata, serif essay sample, tracking & leading specimens.
- **Colors** — surfaces (dark ladder + cream), ink ramp, accent + states, signal colors, mastery scale, viz series, diff tokens.
- **Spacing** — 4-base scale (s-1→s-12), radii (none→pill), shadow ladder.
- **Components** — buttons, badges & mastery, inputs & toggle, tabs & segmented, table, card & ai-surface, tooltip/skeleton/kbd, confidence meter, charts, **artifact surfaces** (embed / stream / plan / diff / skill-chip).
- **Brand** — logo/monogram (DR), favicon, motion specimen (durations × eases), light/dark toggle proof.

Build cards on **dark by default**, and include at least one card proving the
**light theme** holds (contrast + accent shift).

## Acceptance criteria

1. Token values match this prompt **exactly** — diff-clean, no rounding/renaming.
2. Both **dark and light** themes render every component legibly at **AA contrast**.
3. **No glow, no gradients, no emoji.** Accent appears only as fills/rings/carets/chips.
4. Every component class consumes **semantic** tokens (Layer 2), never raw hex.
5. The artifact surfaces (embed/stream/plan/diff/skill-chip) exist and look like
   **product UI**, not decoration — they are the system's signature.
6. Fonts are **self-hosted** (`@font-face`), Latin subset; no CDN dependency in the
   shipped kit.
7. Entrance animations are **transform-only** and honor `prefers-reduced-motion`.
8. Every preview card is registered in `_ds_manifest.json` with the right group.

## Build order

1. `colors_and_type.css` (fonts + both token layers + base resets) → screenshot a
   surface to confirm contrast.
2. `components.css` → a single "kitchen-sink" page rendering every component on
   dark, then on light.
3. Preview cards, grouped.
4. The two UI kits.
5. `README.md` + `SKILL.md` + `_ds_manifest.json`.
6. Stop and show me the kitchen-sink page + 3 representative cards before going
   wide, so we can **refine token-by-token**.

=== PROMPT END ===

---

## Notes for you (not part of the prompt)

**Where the real source already lives in this project** — if you run the prompt
*here*, tell the agent to lift verbatim from these instead of re-typing, so there's
zero drift:

| What | File |
|---|---|
| Raw `--v11-*` tokens | `design-system/tokens-web.css` |
| Semantic alias layer (dark + light) + base styles | `styles/tokens.css` |
| Every component class (buttons…artifact surfaces) | `styles/components.css` |
| Live app to recreate as the `ui_kits/app` | `MentorOS.html` + `src/*.jsx` |
| Brand decisions & rationale (V11 R5–R10) | header comments in `tokens-web.css` |

**The format to follow** is the same one the bound *EnRegla* system uses
(`_ds/enregla-…/` → README + colors_and_type.css + preview/ + ui_kits/ +
_ds_manifest.json). The Aura prompt already specifies that same structure inline, so
the new window needs nothing from here — this is only a reference if you build it in
this project instead.

**Refining loop ("irlo puliendo").** After the first build, iterate by telling me
things like: *"make the light accent one step warmer,"* *"add a toasts card,"*
*"the stream caret should pulse slower,"* *"essay measure to 38rem."* Because every
component reads semantic tokens, most polish is a one-line token change that ripples
everywhere.

**Two open decisions to settle before/while building:**
1. **Name** — settled: **Aura Design System** (codename *dr-cv V11*).
2. **Scope of "and more"** — I proposed a concrete extension list (toasts, command
   palette, essay surface, etc.). Trim or expand it; I didn't want to invent filler.
