# Career Training OS — Integration Spec

> **What this is.** A prose-first, money-anchored skills diagnostic + study-program
> app that replaces the current `career-training/ur-assessment/index.html` and
> becomes the source of `danilorojas.design/app`. Built as a multi-file React
> prototype; this spec is the contract for wiring it to **real data (the repo),
> a real grader (Claude via a server route), Supabase persistence, and a Vercel
> deploy.**
>
> **One objective.** Everything in the app optimizes one number: **$250k/year as
> a Product Designer.** Skills are priced; the diagnostic measures the gap; the
> study program closes it. If a feature doesn't move that number, it doesn't ship.

- **Status:** UI complete, reskinned to dr-cv V11 tokens, persona = Danilo Rojas,
  diagnostic converted to prose with live Claude scoring (works in-canvas via the
  preview helper; production needs the server route in §4).
- **Owner:** Danilo Rojas
- **Companion:** `career-training-os-integration.flow.html` (clickable user-flow + data-flow diagram)
- **Source app bundle:** the `MentorOS.html` + `src/` + `styles/` + `design-system/` tree shipped alongside this spec.

---

## 0 · TL;DR for Claude Code

1. Drop the app bundle into `career-training/career-training-os/` (multi-file).
2. Point its `<link rel="stylesheet" href="design-system/tokens-web.css">` at the
   **real** `design-system/tokens-web.css` (delete the vendored copy).
3. Replace the three seed data blocks in `src/data.jsx` with real repo data
   (§3 mapping). Keep the **shapes** — they are the contract.
4. Stand up the prose grader as a server route (§4) and swap `window.claude.complete`
   for `fetch('/api/score')`. Key lives server-side only.
5. Create the Supabase tables in §5; persist attempts + scores (no auth — public).
6. Add a `build:app` step that emits to `dist/landing-v11/app/` (§6).
7. Deploy on Vercel, env vars in §7.

---

## 1 · Where it lands in dr-cv

The repo already ships a public-but-unlinked app at:

```
career-training/ur-assessment/index.html  →  danilorojas.design/app   (129KB monolith, retired)
```

This project **is `/app` v2** — same job, resolved properly. Proposed home:

```
career-training/
  career-training-os/        ← NEW (this bundle)
    index.html               (was MentorOS.html — rename on import)
    src/*.jsx
    styles/*.css
    api/score.ts             (new — §4)
  ur-assessment/             ← KEPT as the data source of record (questions.md, answers_state.json)
```

`ur-assessment/` stops being a UI and becomes **content** (the question bank +
your real answers). `career-training-os/` is the UI that reads it.

---

## 2 · Architecture at a glance

```
   carrera/execution/master-goals.md ──► objective ($250k, baseline, target role)
   perfil/data/skills.yaml ──────────────► skills[] (level, prereqs, $ value)
   ur-assessment/questions.md ───────────► assessment.questions[] (prose + cues + model)
   ur-assessment/answers_state.json ─────► your saved answers (seed the diagnostic)
                         │
                         ▼
            src/data.jsx  (the in-app contract — window.DATA)
                         │
        ┌────────────────┼─────────────────────────┐
        ▼                ▼                          ▼
   Dashboard        Diagnostic (prose)         Skill Graph / Journey
  north-star      answer → /api/score → Claude   priced DAG, study program
   $250k gap      → {substance,structure,         generated from gaps
                     english,concision,overall}
                         │
                         ▼
              Supabase: attempts + scores (public, no auth)
```

**Single source of truth for design:** `design-system/tokens-web.css` (the `--v11-*`
custom properties). `styles/tokens.css` is a thin alias layer over it — semantic
app names (`--primary`, `--bg`, `--surface`…) map to `--v11-*` with the same
literal as fallback. The app and the landing page share one palette by construction.

---

## 3 · Data contract (seed → real source)

`src/data.jsx` exposes everything on `window.DATA`. Three blocks are seed data and
must be replaced; **the shapes are the integration contract — do not change them.**

### 3.1 `learner` → `carrera/execution/master-goals.md`

| field | meaning | real source |
|---|---|---|
| `objective` | the one sentence goal | master-goals headline |
| `incomeGoal` `250000` | the number everything optimizes toward | master-goals anchor |
| `incomeBaseline` `120000` | market value when the path started | master-goals / your call |
| `incomeCurrent` `165000` | baseline + banked skill value (derived) | computed from skills |
| `incomeCeiling` `252000` | value at full mastery of the model | sum of all skill values + baseline |
| `targetRole` | role the money attaches to | master-goals |

> `incomeCurrent` should be **computed**, not stored: `incomeBaseline + Σ skillBanked(s)`.
> Wire it so proving a skill moves the dashboard number live.

### 3.2 `skills[]` → `perfil/data/skills.yaml`

```js
{ id, name, cluster, level, score, confidence, prereqs:[], next:[], weak, value, q:{passed,failed,untested} }
```

- `level ∈ {mastered, proficient, developing, novice, gap}` — from your real
  proficiency in skills.yaml (`byLayer` / `byOutcome` / `inventory`).
- `value` (in $k) — **the money this skill adds at full mastery.** Not in skills.yaml
  yet → you must assign it. Suggested rule: distribute `(incomeCeiling − incomeBaseline)`
  across skills weighted by how much each gates senior roles. Document the rule next
  to the data so it's defensible.
- `cluster` — map skills.yaml `byOutcome` (Discovery / Build / Ship / Scale) or
  `byLayer` (Strategy / Design / Engineering / Agents). Pick one taxonomy and keep it.
- `q` — derived from diagnostic results (see 3.3), not authored by hand.

`LEVEL_FACTOR` banks a fraction of a skill's value by level
(`mastered 1.0 · proficient .7 · developing .4 · novice .2 · gap .05`). Tune the
curve, but keep the helpers `skillBanked(s)` / `skillUpside(s)` — the whole money
story depends on them.

### 3.3 `assessment` → `ur-assessment/questions.md` + `answers_state.json`

The diagnostic is **prose** (per decision: free-text answers, LLM-graded). Each
question:

```js
{
  id, skill,                 // maps the question to exactly one skills[].id
  difficulty,                // "Core" | "Applied" | …
  prompt,                    // the question text (from questions.md)
  cues: [ "...", "..." ],    // what a strong answer hits — fed to the grader as rubric
  model: "..."               // a reference model answer (from senior_…_assessment.md)
}
```

- `questions.md` (v4.1, **96 Q / 23 sections**) → the 23 sections **are the skill
  clusters**; each question's section determines its `skill`.
- `senior_product_designer_assessment.md` → `model` answers.
- `answers_state.json` → your already-written answers; import them so the diagnostic
  opens pre-populated and immediately scorable (you've effectively already taken it).
- `passThreshold` (default `70`) — overall score to "pass" a question and bank it
  toward the skill level.
- `RUBRIC_DIMS` — the four scoring axes (Substance .45 / Structure .20 / English .20 /
  Concision .15). This is the heart of the prose decision: it scores **how you
  communicate**, not just whether you're right. Adjust weights as you like.

> **96 vs 95.** The UI copy says "95 questions"; the bank is 96. Pick one and make it
> a single constant (`assessment.total`) — don't hardcode "95" in copy. (Search the
> JSX for the string `95` and replace with `{A.total}`.)

---

## 4 · Prose grader (the server route)

In-canvas the diagnostic calls `window.claude.complete(prompt)` (preview helper).
**That does not exist in production** and you must never ship an API key to the
browser. Replace it with a server route.

### 4.1 Client change (one spot)

`src/screen-assessment.jsx` → `ExamRunner.score()`. Today:

```js
const raw = await window.claude.complete(prompt);
```

Production:

```js
const res = await fetch('/api/score', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ questionId: q.id, skill: skill.name,
                         difficulty: q.difficulty, prompt: q.prompt,
                         cues: q.cues, model: q.model, answer: text }),
});
const r = await res.json();   // { substance, structure, english, concision, overall, verdict, feedback, diction }
```

Keep the `heuristicScore()` fallback — it's the graceful-degradation path if the
route is down. (It rewards cue-hits + length-fit; never random.)

### 4.2 Server route (Vercel serverless, `api/score.ts`)

```ts
import Anthropic from '@anthropic-ai/sdk';
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export default async function handler(req, res) {
  const { skill, difficulty, prompt, cues, model, answer } = req.body;
  const grading = `You are a senior hiring panel grading a Product Designer's
answer. Score Substance(.45) Structure(.20) English(.20) Concision(.15) 0-100,
give "overall", "verdict" (pass>=70), one-sentence "feedback", and a short
"diction" note on English/phrasing. Return ONLY strict JSON.
SKILL: ${skill} (${difficulty})
QUESTION: ${prompt}
STRONG ANSWER HITS: ${cues.join('; ')}
MODEL: ${model}
CANDIDATE: """${answer}"""`;

  const msg = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 400,
    messages: [{ role: 'user', content: grading }],
  });
  const json = JSON.parse(msg.content[0].text.match(/\{[\s\S]*\}/)[0]);
  // persist to Supabase here (see §5), then:
  res.status(200).json(json);
}
```

The exact grading prompt the UI already builds lives in `ExamRunner.score()` — lift
it verbatim so canvas and prod score identically.

### 4.3 Future: full-exam pass

Decision on record: *"eventually the LLM via the API will evaluate all my answers
and give me a score."* Add a batch route `/api/score-all` that walks
`answers_state.json`, scores every answer, writes the levels back to `skills[].q`,
and recomputes `incomeCurrent`. That's the loop that turns the whole 96-question
bank into a live market-value number.

---

## 5 · Supabase (public, no auth)

No login — the app is public (per decision). Persist results so the diagnostic
remembers your levels across sessions. Single owner = single row-set; use a fixed
`profile_id` constant rather than auth.

```sql
-- skills snapshot (mirrors skills[]; value + level are the money story)
create table skills (
  id text primary key,
  name text not null,
  cluster text,
  level text check (level in ('mastered','proficient','developing','novice','gap')),
  value_k numeric,            -- $k at full mastery
  prereqs text[],
  updated_at timestamptz default now()
);

-- the prose question bank (from questions.md)
create table questions (
  id text primary key,
  skill_id text references skills(id),
  difficulty text,
  prompt text,
  cues text[],
  model text
);

-- every answer + its score (append-only; latest per question = current level input)
create table attempts (
  id uuid primary key default gen_random_uuid(),
  question_id text references questions(id),
  answer text,
  substance int, structure int, english int, concision int, overall int,
  verdict text, feedback text, diction text,
  created_at timestamptz default now()
);
```

- **RLS:** public read on `skills`/`questions`; insert on `attempts` allowed
  (it's your own public log). No update/delete from the client.
- A skill's `q.passed/failed/untested` is **derived**: for each question in the
  skill, take the latest attempt → `overall >= passThreshold ? passed : failed`,
  untested if no attempt. Compute in the `/api/score` write path or a Postgres view.

---

## 6 · Build & deploy hooks

The repo rule: **never edit `dist/` by hand** — it's generated. Add:

```jsonc
// package.json scripts
"build:app": "node generadores/build-app.mjs",   // copies career-training-os → dist/landing-v11/app
"build": "... && npm run build:app"
```

Ideal end-state (matches how CV / skills-sheet / landing are already generated):
`generadores/` reads `skills.yaml` + `ur-assessment/*` + `master-goals.md` and
**emits `src/data.jsx`** (or a `data.json` the app fetches). Then the app is never
hand-edited — it's regenerated like every other artifact, and `/app` stays in the
same maquinaria.

---

## 7 · Env & deploy (Vercel)

```
ANTHROPIC_API_KEY=...          # server-only, used by /api/score
SUPABASE_URL=...
SUPABASE_ANON_KEY=...          # client read; insert via RLS
SUPABASE_SERVICE_ROLE=...      # server-only, used by /api/score writes
```

- Framework: static + Vercel Functions (the app is plain React-over-Babel today;
  for prod consider a Vite build so JSX is compiled ahead of time instead of in the
  browser — optional, the Babel-in-browser version deploys as-is).
- Route `/app` → `career-training-os/index.html`.
- `prefers-reduced-motion` and WCAG AA are already respected (V11 R7).

---

## 8 · What changed in this bundle (so you can review the diff)

| area | change |
|---|---|
| `MentorOS.html` | title/desc → Career OS; loads `design-system/tokens-web.css` first; default theme `dark`. **Rename to `index.html` on import.** |
| `styles/tokens.css` | dark theme now aliases dr-cv `--v11-*` (single source of truth) |
| `design-system/tokens-web.css` | **vendored** from dr-cv — delete + relink on import |
| `src/data.jsx` | persona → Danilo Rojas, Product Designer; objective copy; **assessment converted to prose** (`cues` + `model` + `RUBRIC_DIMS`, no more `options`/`correct`) |
| `src/screen-assessment.jsx` | `ExamRunner` rewritten: textarea answer → Claude scoring on 4 dimensions, model-answer compare, heuristic fallback |
| `src/shell.jsx` | brand → "Career OS · danilorojas.design" |

---

## 9 · Decisions on record (don't re-litigate)

- **Prose, not multiple-choice.** Answers are free text; the LLM scores substance,
  structure, English and diction. Reason: it measures *how Danilo actually
  communicates*, which is the real hireable signal.
- **No login.** The app is public.
- **dr-cv tokens only.** No EnRegla. `tokens-web.css` is the source of truth.
- **Name = Danilo Rojas, Product Designer.** Full content swap happens after the
  app is wired to the repo data.
- **One objective: $250k.** The money framing is the spine, not decoration.

---

## 10 · Open questions for Danilo

1. **Skill → $ pricing rule.** What's the defensible basis for each skill's `value`?
   (Even a rough rubric — "gates senior roles" tiers — beats arbitrary numbers.)
2. **Cluster taxonomy.** `byOutcome` (Discovery/Build/Ship/Scale) or `byLayer`
   (Strategy/Design/Engineering/Agents) as the skill grouping?
3. **Grader model + cost.** Sonnet per-answer is cheap; a full 96-answer batch is
   ~96 calls. Batch nightly, or on-demand "score my whole exam"?
4. **History.** Keep every attempt (trend over time) or only latest per question?
