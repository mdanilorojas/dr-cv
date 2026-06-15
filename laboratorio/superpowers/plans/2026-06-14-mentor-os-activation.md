# Plan — MentorOS activation (`/app` v2)

- **Date:** 14 Jun 2026
- **Status:** Staged. Phase 0 done; Phases 1–4 gated.
- **Specs:** `../specs/2026-06-14-design-hierarchy-decision-record.md` (precedence),
  `../specs/2026-06-14-career-training-os-integration.md` (build contract)
- **Bundles:** `../../mentor-os/` (app prototype + Aura design system)

The path from "parked" to a live `danilorojas.design/app` v2. We do **not** start
Phase 1 until the gates clear. Everything here optimizes one number: **$250k/year as
a Product Designer.**

```
  ▣ Phase 0  Stage          ──► ☐ Phase 1  Content      ──► ☐ Phase 2  Adopt Aura
   done                          gate: answers done           gate: Aura final
                                       │
                                       ▼
                              ☐ Phase 3  Wire app  ──►  ☐ Phase 4  Retire old /app
```

---

## ▣ Phase 0 — Stage (done 14 Jun 2026)

- [x] Both handoff bundles unpacked verbatim into `laboratorio/mentor-os/`.
- [x] Canonical integration spec + flow diagram promoted to
  `laboratorio/superpowers/specs/` (dated).
- [x] Design hierarchy decision record authored (MD + HTML companion).
- [x] This plan written. No production wiring, no `dist/` edits.

## ☐ Phase 1 — Content (GATE: assessment answers finished)

The diagnostic can't ship without its real content. Blocked on Danilo finishing
`career-training/ur-assessment/answers_state.json`.

- [ ] Finalize the question bank (`questions.md`, v4.1 — 96 Q / 23 sections) and the
  real answers as the **data source**. `ur-assessment/` stops being a UI, becomes
  content (integration spec §1, §3.3).
- [ ] **Open decision — skill → $ pricing rule.** A defensible basis for each skill's
  `value` (even a rough "gates senior roles" tier beats arbitrary numbers).
  Distribute `(incomeCeiling − incomeBaseline)` weighted by seniority gating; document
  the rule next to the data. (spec §3.2, §10.1)
- [ ] **Open decision — cluster taxonomy.** `byOutcome` (Discovery/Build/Ship/Scale)
  or `byLayer` (Strategy/Design/Engineering/Agents)? Pick one, keep it. (spec §10.2)
- [ ] **Open decision — attempt history.** Keep every attempt (trend over time) or
  latest-per-question only? (spec §10.4)

## ☐ Phase 2 — Adopt Aura (GATE: Aura finalized)

Per the decision record: Aura owns the visual language; the design system prioritizes
UIs first; dark is supreme.

- [ ] Promote Aura into `design-system/` as the live DS for `/app` (today's active
  tokens are `design-system/tokens-web.css` — Aura formalizes the same `--v11-*`).
- [ ] **Reconcile the template nav to MentorOS structure** (decision record, worked
  example): update `career-os-app` from Workspace/Program → MentorOS's
  Daily/Learn/Apply/Workspace. Structure follows MentorOS, not the template.
- [ ] Self-host the fonts (Inter · JetBrains Mono · Source Serif 4, Latin subset);
  swap Aura's `fonts.css` off the Google Fonts CDN (Aura README caveat).
- [ ] Hold the typography guardrail: no handwritten sans enters the UI kit.

## ☐ Phase 3 — Wire the app (GATE: Phases 1 & 2)

Follow the integration spec §0 TL;DR exactly.

- [ ] Land the prototype as `career-training/career-training-os/` (rename
  `MentorOS.html` → `index.html`). (spec §1)
- [ ] Relink `<link href="design-system/tokens-web.css">` to the **real** repo tokens;
  delete the vendored copy. (spec §0.2)
- [ ] Replace the three seed blocks in `src/data.jsx` with real repo data — keep the
  **shapes** (they are the contract). (spec §3)
- [ ] Stand up the prose grader as a server route: swap `window.claude.complete` for
  `fetch('/api/score')`; key stays server-side; keep the heuristic fallback. (spec §4)
  - **Model note:** the spec pins `claude-sonnet-4-20250514`. When we build, use the
    **current Sonnet** (`claude-sonnet-4-6`) and re-verify the model id + pricing via
    the `claude-api` skill at build time — don't ship the pinned snapshot blindly.
- [ ] Create the Supabase tables (`skills`, `questions`, `attempts`), public RLS, no
  auth, fixed `profile_id`. (spec §5)
- [ ] Add `build:app` → emits to `dist/landing-v11/app/`; wire into `build`. Ideal
  end-state: `generadores/` emits `data.jsx`/`data.json` from `skills.yaml` +
  `ur-assessment/*` + `master-goals.md`, so `/app` is regenerated like every other
  artifact, never hand-edited. (spec §6)
- [ ] Deploy on Vercel (host + `/api/score`); env vars per spec §7; route `/app`.

## ☐ Phase 4 — Retire the old `/app`

- [ ] `career-training/ur-assessment/index.html` (129KB monolith) stops being the UI;
  its content role (questions + answers) is already covered in Phase 1.
- [ ] Confirm `danilorojas.design/app` serves v2; update CLAUDE.md / README route
  table.

---

## Notes & risks

- **superpowers convention.** Authored per this repo's documented superpowers flow
  (specs/plans/visuals in `laboratorio/superpowers/`, MD canonical + HTML companion,
  flow diagrams). No `superpowers` skill is registered in this session — if Danilo has
  a specific superpowers/GSD plugin he wants driving this, say so and I'll re-run it
  through that.
- **Don't edit `dist/` by hand** (repo rule). `/app` v2 must be a build output.
- **Batch grading cost.** A full 96-answer pass is ~96 Sonnet calls. Decide on-demand
  ("score my whole exam") vs nightly batch (`/api/score-all`, spec §4.3) before wiring.
- **`95` vs `96`.** UI copy says 95 questions; the bank is 96. Make it one constant
  `assessment.total`; don't hardcode the string. (spec §3.3)
- **mobile-to-web-backend.** The bundle also carries
  `app-prototype/PROMPT-mobile-to-web-backend.md` — a separate track; review before
  Phase 3 in case it changes the backend shape.
