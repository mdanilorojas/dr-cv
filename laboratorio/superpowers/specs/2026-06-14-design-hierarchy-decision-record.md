# Design hierarchy & precedence — MentorOS × Aura

- **Date:** 14 Jun 2026
- **Status:** Active. Governs every dr-cv interface (app, web, internal tools).
- **Owner:** Danilo Rojas
- **Companion:** `2026-06-14-design-hierarchy-decision-record.html` (the precedence
  ladder as a diagram)
- **Related:** `2026-06-14-career-training-os-integration.md` (the build contract),
  `../../mentor-os/` (the two staged bundles this record governs)

---

## Why this exists

Two assets landed on 14 Jun 2026: **MentorOS** (the `/app` v2 prototype — the mentor
that runs Danilo's education) and the **Aura Design System** (codename `dr-cv V11` —
the formalized brand canon, the "nuevo design system"). They will eventually meet in
one product. The app is **not being built yet** — the assessment answers are still
being filled in, and Aura is still being refined. This record fixes the precedence
rules *now*, while it's cheap, so that when MentorOS and Aura disagree later, the
resolution is already decided and nobody re-litigates it.

The rule in one sentence: **structure comes from MentorOS, looks come from Aura, and
dark mode outranks both.**

---

## The precedence ladder (highest wins)

```
  1. DARK MODE                 ─ supreme. Overrides everything, including structure.
        ▲
  2. MentorOS — STRUCTURE      ─ information architecture: nav, screens, grouping,
        ▲                         data contract, flows. Source of truth.
  3. Aura — VISUAL LANGUAGE    ─ tokens, color, type, components, spacing, motion,
                                  artifact surfaces. Serves the structure above it.
```

### 1 — Dark mode is supreme
Dark is the default and the single highest-priority constraint. It outranks even
MentorOS's structure. Light mode is an **extension of the same semantic tokens**, not
a re-theme into a different brand; the accent shifts to a deeper terracotta
(`#D9663F`) only to hold AA contrast on cream. Already baked into both bundles
(`<html data-theme="dark">`, light extends the same names) — this record makes it a
law, not a default.

### 2 — MentorOS owns structure and hierarchy
For **information architecture** — navigation, the screen set, how screens are
grouped, the `window.DATA` contract, the user/data flows — **MentorOS is the source
of truth.** When MentorOS and the design system disagree about *structure*, MentorOS
wins, and that decision is **pushed into the design system** (Aura updates to match;
the structure does not bend to Aura).

### 3 — Aura owns the visual language
Color, type, spacing, radii, shadows, motion, components, and the signature artifact
surfaces (embed / stream / plan / diff / skill-chip) come from Aura. Aura dresses the
structure MentorOS defines; it does not redefine it.

---

## The canonical structure (what MentorOS owns, verbatim)

The MentorOS shell (`app-prototype/src/shell.jsx`) is the authoritative navigation
hierarchy:

| Group | Items |
|---|---|
| **Daily** | Today · Coach |
| **Learn** | Dashboard · Diagnostic · Learning Journey · AI Mentor · Skill Graph |
| **Apply** | Projects · Analytics |
| **Workspace** | Design Process · Settings |

Plus: a 248px sidebar collapsible to 68px, a 57px blurred topbar, a `⌘K` command
palette, a notifications panel, and a persistent **objective footer** (the $250k goal
with a live progress bar). The objective drives everything; it is structural, not
decoration.

### Worked example of the rule
Aura's `career-os-app` template
(`aura-design-system/project/templates/career-os-app/CareerOsApp.dc.html`) currently
ships a *different* nav: **Workspace** (Dashboard, Diagnostic, Skill graph) +
**Program** (Learning path, AI mentor, Projects). That is a structural disagreement.

**Resolution (rule 2):** MentorOS's four-group structure (Daily / Learn / Apply /
Workspace) is canonical. The Aura template must be updated to match MentorOS — not
the reverse. Action tracked in the activation plan.

---

## Typography guardrail — no handwritten sans in interfaces

A handwritten / script "sans" face is **forbidden in any interface** (app or product
UI). Standing rule, not a one-off.

- **Allowed:** maybe in a CV. (Print is a different surface with different rules.)
- **Candidate only:** as a secondary / background face for a blog or editorial
  surface — never load-bearing UI text. Decision deferred; Danilo is lukewarm on it
  for now.
- **Never:** anywhere in the app, the landing's functional UI, or internal tools.

Note: neither bundle currently ships such a font — Aura's stack is **Inter** (UI/body)
· **JetBrains Mono** (display/metadata/code) · **Source Serif 4** (essay surface
only). This guardrail exists to keep it that way as the system grows.

---

## The design system prioritizes UIs, first

Aura builds and refines **app/product UI surfaces before anything else.** Marketing,
landing, and print follow. When effort is scarce, the app kit wins the polish budget.
This matches Aura's own "two surfaces" split (operative-cockpit app vs notebook
essay) — but fixes the order: **app first.**

---

## Naming, so future sessions don't get confused

- **"The new design system" = Aura Design System** (codename `dr-cv V11`). It already
  exists as a handoff bundle in `../../mentor-os/aura-design-system/`. Built *from*
  the repo's canonical `design-system/tokens-web.css` (the `--v11-*` tokens) — same
  source of truth as the live landing (`dist/landing-v11`).
- **EnRegla is superseded.** The `_ds/enregla-…` system embedded in the MentorOS
  bundle is dropped. The integration spec's decision on record: *"dr-cv tokens only.
  No EnRegla."* Kept only for provenance.
- **MentorOS / "Career Training OS" / "Career OS"** are the same thing: the `/app` v2
  app. "MentorOS" = the prototype bundle; "Career OS" = the in-product brand string.

---

## Gating — why we are not building today

| Gate | Blocks |
|---|---|
| Assessment answers still being filled | The diagnostic's real content + the skill→$ data |
| Aura still being refined | Adopting it as the live design system |

Until both clear, this stays parked. See `plans/2026-06-14-mentor-os-activation.md`
for the path from here to a live `/app` v2.

---

## Decisions on record (don't re-litigate)

1. Dark mode is the supreme constraint, above structure.
2. MentorOS owns structure; conflicts resolve toward MentorOS, then flow into Aura.
3. Aura owns the visual language, in service of that structure.
4. No handwritten sans in interfaces (CV maybe; blog background maybe; UI never).
5. The design system prioritizes UIs before any other surface.
6. Aura is the canonical "new design system"; EnRegla is dropped; dr-cv `--v11-*`
   tokens remain the single source of truth.
