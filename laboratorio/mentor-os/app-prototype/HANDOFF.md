# Career Training OS — handoff bundle

This folder is the **`/app` v2** for `danilorojas.design` — a prose skills
diagnostic + study program, anchored to one objective: **$250k/year as a Product
Designer.** Take it to Claude Code on desktop and wire it into the
[`mdanilorojas/dr-cv`](https://github.com/mdanilorojas/dr-cv) repo.

## Read this first
- **`laboratorio/superpowers/career-training-os-integration.md`** — the canonical
  integration spec. Data contract, the prose-grader server route, Supabase schema,
  Vercel deploy, and the exact diff. **Start here.**
- **`laboratorio/superpowers/career-training-os-integration.flow.html`** — open in a
  browser: the user flow + data flow at a glance (dr-cv V11 styling).

## The app
- **`MentorOS.html`** — entry point. Rename to `index.html` on import.
- **`src/*.jsx`** — React-over-Babel screens. The contract lives in `src/data.jsx`
  (`window.DATA`); the prose grader lives in `src/screen-assessment.jsx → ExamRunner`.
- **`styles/*.css`** — `tokens.css` is an **alias layer** over dr-cv's `--v11-*`.
- **`design-system/tokens-web.css`** — **vendored** from dr-cv. Delete it and relink
  to the real one once in-repo.

## The one thing that must change for production
The diagnostic scores answers with `window.claude.complete()` — a **canvas-only**
preview helper. In production, move scoring behind **`/api/score`** (Vercel
serverless + Anthropic SDK) so the API key stays server-side. See spec §4 — the
client change is a single line, and the grading prompt is ready to lift verbatim.

## Decisions baked in
Prose (not MCQ) · no login (public) · dr-cv tokens only · name = Danilo Rojas,
Product Designer · everything optimizes the $250k number.

## Deploy target
Vercel (host + `/api/score` function) · Supabase (public, no-auth persistence of
attempts + scores). Env vars and the SQL schema are in the spec (§5, §7).
