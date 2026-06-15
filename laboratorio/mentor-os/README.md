# mentor-os — staging for `/app` v2

> **Status: incubating. Do not build yet.**
> Parked here on purpose so it is ready the moment we sit down to work. The app
> build is gated on two things: (1) Danilo finishing the assessment answers — the
> diagnostic's real content — and (2) the Aura design system being finalized.

This folder holds two design handoffs that together define the next version of
`danilorojas.design/app` — the **mentor** that runs Danilo's education, anchored to
one number: **$250,000 / year as a Product Designer.**

## What's here

| Path | What it is |
|---|---|
| `app-prototype/` | **MentorOS** — the `/app` v2 React prototype (multi-file, React-over-Babel). The mentor app: Today, Coach, Dashboard, Diagnostic, Learning Journey, AI Mentor, Skill Graph, Projects, Analytics, Design Process, Settings. This bundle **owns the structure and hierarchy** (see the decision record). |
| `aura-design-system/` | **Aura Design System** (codename `dr-cv V11`) — the formalized brand-and-build canon: documented tokens, components, two UI kits. This is the "nuevo design system." It owns the **visual language**, in service of MentorOS's structure. |

Both are verbatim Claude Design handoff bundles. Treat them as source, not as
something to hand-edit in place — they get *promoted* into the repo when we build.

## The canonical documents (in `laboratorio/superpowers/`)

1. **`specs/2026-06-14-design-hierarchy-decision-record.md`** — read this first.
   The precedence rules that govern every dr-cv interface: dark mode is supreme,
   MentorOS owns structure, Aura owns the visuals, no handwritten sans in UI, the
   DS prioritizes UIs first.
2. **`specs/2026-06-14-career-training-os-integration.md`** — the integration
   contract (data sources, prose-grader server route, Supabase schema, Vercel
   deploy, the exact diff). Authored in the MentorOS bundle, promoted here as the
   canonical copy. Companion flow diagram: `…-integration.flow.html`.
3. **`plans/2026-06-14-mentor-os-activation.md`** — the staged, gated plan from
   "parked" to "live `/app` v2."

## Where it goes live (later, not now)

```
career-training/ur-assessment/index.html   →  retires as UI, stays as content (question bank + answers)
career-training/career-training-os/         →  NEW home of the MentorOS app
design-system/tokens-web.css                →  stays the single source of truth; Aura formalizes it
dist/landing-v11/app/                        →  build output, published at danilorojas.design/app
```

Nothing in this folder is wired to production. When we activate, we follow the plan.

## Provenance

Dropped by Danilo on 14 Jun 2026 as two Claude Design handoff zips
(`Repos/MentorOS-handoff (1).zip`, `Repos/Aura Design System-handoff.zip`),
unpacked here verbatim. The `app-prototype/` also carries its own embedded copies
(`design-system/tokens-web.css` vendored from the repo; a superseded `_ds/enregla-…`
design system that the integration spec explicitly drops in favor of dr-cv tokens).
