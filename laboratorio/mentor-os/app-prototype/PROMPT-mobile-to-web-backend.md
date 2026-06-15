# Prompt — Take MentorOS daily-tracking + coach from UI to a real product (local → Vercel)

> **Context for whoever runs this.** The MentorOS web app (`MentorOS.html` +
> `src/*.jsx`) now contains the full daily loop migrated from `life-update-mobile`:
> **Today** (check-in, AI insight, missions, dimensions, history), **Coach**
> (grounded nudges, wins, outreach, weekly reflection, 👍/👎 feedback), and the
> **Coach & cost** settings (mode, model, daily cost cap, ZDR, anti-sycophancy).
> Today it runs on mock data (`src/data-tracking.jsx`) and an LLM bridge
> (`src/llm.jsx`) that calls the canvas-only `window.claude.complete`. This prompt
> is the spec to make it a real product: **persistence + auth + server-side LLM**,
> first **locally**, then on **Vercel**. Everything optimizes one number: **$250k/yr.**
>
> Paste from `=== PROMPT START ===` to `=== PROMPT END ===` into Claude Code at the
> repo root.

---

=== PROMPT START ===

## Objective

Wire the MentorOS web app's daily-tracking + coach UI to a real backend. Stack —
identical to the `dr-cv` integration already speced for `/api/score`:

- **Host + API:** Vercel (static `MentorOS.html` + serverless functions under `/api`).
- **DB + Auth:** Supabase (Postgres, Auth, Row-Level Security `auth.uid() = user_id`).
- **LLM:** Anthropic via the user's API key, **server-side only** (in `/api`, never
  the client). The mobile app already proved this pattern with Supabase Edge
  Functions — we are porting it to Vercel serverless.

Do it in two phases: **(A) local** (`vercel dev` + a local/Supabase Postgres),
then **(B) deploy to Vercel + hosted Supabase**. Keep the client diff minimal —
the UI is done.

## The one client change

`src/llm.jsx` is the entire seam. Today its `complete()` calls
`window.claude.complete`. In production, change that single function to POST to our
API and keep the deterministic `fallback` path untouched:

```js
// src/llm.jsx — production form
async function complete(prompt, fallback = "") {
  try {
    const r = await fetch("/api/coach", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeader() },
      body: JSON.stringify({ prompt }),
    });
    if (r.ok) { const { text } = await r.json(); if (text?.trim()) return text.trim(); }
  } catch (e) { /* fall through */ }
  await new Promise((r) => setTimeout(r, 300));
  return fallback;   // deterministic template — never leave the UI empty
}
```

`src/data-tracking.jsx` becomes a **fetch layer**: replace the seeded constants with
calls to the endpoints below, keeping the **exact same shapes** (they are the data
contract — do not rename fields).

## Database schema (Supabase / Postgres)

All tables: `user_id uuid not null references auth.users`, RLS enabled, policy
`using (auth.uid() = user_id)` for select/insert/update/delete.

```sql
-- Daily check-in. Reframed from mobile daily_entries around income behaviour.
create table daily_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  date date not null,
  deep_work numeric(3,1) not null default 0,   -- hours of focused skill/portfolio work (leading indicator)
  energy int not null check (energy between 1 and 10),
  focus int not null check (focus between 1 and 10),
  shipped boolean not null default false,        -- pushed real portfolio/project work
  outreach boolean not null default false,       -- applied / pitched / posted / followed up
  note text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique (user_id, date)                         -- upsert on (user_id, date)
);

-- Daily missions (LLM-generated, with carry-over of undone ones).
create table missions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  date date not null,
  title text not null, detail text, dim text,    -- dim ∈ career|income|habit|focus
  est text, priority text check (priority in ('high','med','low')),
  done boolean not null default false,
  created_at timestamptz default now()
);

-- Coach feed (nudge|win|outreach|critical|reflection) + feedback for anti-sycophancy.
create table coach_messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  type text not null, title text not null, body text not null,
  dimension text, confidence text,
  evidence jsonb default '[]',                   -- array of short cited strings
  feedback text check (feedback in ('up','down')),  -- nullable
  gap_delta_at_feedback numeric,                 -- snapshot for anti-sycophancy correlation
  created_at timestamptz default now()
);

-- Daily insight strip + favorites.
create table daily_insights (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null, date date not null,
  text text not null, tag text, favorite boolean default false,
  created_at timestamptz default now()
);

-- The plan: objective + per-dimension targets the coach measures gaps against.
create table life_plan (
  user_id uuid primary key,
  objective text, objective_kind text, income_goal int, income_baseline int,
  target_role text, target_date date,
  dimensions jsonb not null default '[]',        -- [{id,label,metricLabel,expected,unit,enabled}]
  updated_at timestamptz default now()
);

-- Weekly reflections.
create table reflections (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null, week_start date not null,
  answers jsonb not null default '{}', created_at timestamptz default now()
);

-- LLM cost ledger — the daily cap gate reads/writes this.
create table cost_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null, date date not null,
  function text, model text, usd numeric(8,4) not null,
  created_at timestamptz default now()
);
```

## Serverless functions (`/api/*`, Node runtime)

Every function: validate the Supabase JWT, derive `user_id` server-side, **never**
trust a client-sent id. Every LLM-calling function runs the **cost gate** first.

| Route | Port of mobile | Does |
|---|---|---|
| `POST /api/daily-content` | `daily-content` | Generate today's insight from `life_plan` + recent `daily_entries`. Upsert into `daily_insights`. |
| `POST /api/generate-missions` | `generate-daily-missions` | 3–5 missions for today; carry over yesterday's undone ones. Insert into `missions`. |
| `POST /api/coach` | `coach-run` + `nudgePromptBuilder`/`Validator` | The workhorse: cost gate → build prompt from gaps (`gapAnalyzer`) → call model → validate output → log cost → return `{text}` or `{title,text,evidence}`. Backs `generate nudge` + the insight strip + missions when called generically. |
| `POST /api/score` | (already speced in dr-cv) | Prose-diagnostic grader. Reuse verbatim. |

**Cost gate (port `lib/coach/costApi` + `weekBudget`):**
```
spentToday = sum(cost_log.usd where user_id, date = today)
if spentToday >= life_plan.daily_cost_cap  →  return deterministic fallback, DO NOT call the model
else  →  call model, then insert into cost_log with estimated usd
```

**Gap analysis (port `lib/coach/gapAnalyzer` + `trajectoryPlanner`):** for each
enabled dimension compute `actual` vs `expected` → `gap` → `status`
(ahead/on-track/behind/critical/stale). Feed the gaps into the nudge prompt so the
coach is **grounded, not generic** — this is what powers the cited-evidence list and
the anti-sycophancy score.

**Anti-sycophancy (port `lib/coach/antiSycophancy`):** when a user 👍/👎s a message,
snapshot the relevant `gap_delta`. The score = Pearson correlation between feedback
sign and subsequent gap improvement. Surface it in Coach + Settings (UI already reads
`coachSettings.antiSycophancy`).

## Env vars

```
SUPABASE_URL=…           NEXT_PUBLIC_SUPABASE_URL=…   (client: url + anon key only)
SUPABASE_SERVICE_ROLE=…  (server only — never shipped to client)
SUPABASE_ANON_KEY=…
ANTHROPIC_API_KEY=…      (server only)
COACH_DEFAULT_MODEL=claude-…   COACH_DEFAULT_COST_CAP_USD=0.50
```

## Phase A — local

1. `supabase init` + `supabase start` (local Postgres) **or** point at a hosted dev
   project. Run the schema above as a migration; enable RLS + policies on every table.
2. Seed one user's `life_plan` from the existing mock in `src/data-tracking.jsx`
   (objective $250k, the four MVP dimensions: career, income, deep-work habit,
   energy/focus) so the gap engine has targets.
3. Add `/api/*` functions. Implement `/api/coach` first (it unblocks insight,
   missions, and nudges). Keep the deterministic fallbacks from
   `src/data-tracking.jsx` as the cost-gate / model-failure path.
4. `vercel dev`. Flip `src/llm.jsx` to the fetch form. Verify: check-in upserts,
   missions persist + carry over, a nudge writes a `cost_log` row, the cap actually
   blocks a call when exceeded.

## Phase B — Vercel + hosted Supabase

1. Create the hosted Supabase project; push the migration; set RLS.
2. `vercel` link + set all env vars (service role + Anthropic key as **encrypted**,
   server-only). Deploy.
3. Auth: Supabase email/password (or magic link). Gate the app; `user_id` comes from
   the verified session in every `/api` call.
4. Smoke-test the full loop in prod: log a day → see it in History → generate
   missions → generate a coach nudge → 👍 it → confirm cost ledger + anti-sycophancy
   update.

## Acceptance

- Check-in upserts on `(user_id, date)`; History reads real rows; streak/stats are
  computed from the DB, not seeds.
- Missions persist and undone ones carry to the next day.
- Coach nudges are grounded in real gaps and cite real evidence; cost gate blocks the
  model past the cap and the UI degrades to fallbacks with no empty states.
- No secret (service role, Anthropic key) is ever present in client JS or network
  payloads the browser can read.
- RLS verified: a second user cannot read the first user's rows.

=== PROMPT END ===

---

## Feature inventory — what migrated vs. what's deferred

### ✅ In the MVP (already built in the UI, this prompt makes them real)
- **Daily check-in** — deep work · energy · focus · shipped · income action · note
- **Daily insight strip** — LLM, favorite + copy + regenerate
- **Today's missions** — LLM-generated, checkable, regenerate
- **History** — 30-day stats, energy/focus chart, entry table
- **Dimensions** — career · income · deep-work habit · energy/focus, with gap status
- **Coach feed** — grounded nudges, win detection, outreach prompt, weekly reflection,
  cited evidence, 👍/👎 feedback
- **Coach & cost settings** — mode · model · daily cost cap + ledger chart · ZDR ·
  anti-sycophancy · per-dimension on/off

### 🗂️ Documented but intentionally OUT of the MVP
These exist in `life-update-mobile`; they don't move the $250k number yet, so they're
parked. Re-introduce later as new dimensions/screens once the core loop has 30–60 days
of real data.

| Deferred feature | Mobile source | Why parked |
|---|---|---|
| **Weight / biometric tracking** | `WeightBanner`, `weightScheduler`, `monthly_entries` | Health, not income. No clear line to $250k yet. |
| **Workout generator** | `generate-workout`, `FitnessLevel` | Fitness vertical — out of scope for a career OS MVP. |
| **Physical pain / pain location** | daily-entry fields | Biometric; dropped from the check-in. |
| **Relationships & physical-health dimensions** | `metricCatalog` dims | Kept only career/income/habit/focus dims. |
| **Push notifications** | `expo-notifications` | Mobile-native; web equivalent (email/web-push) is a later add. |
| **Invite-only + set-password flow** | `redeem-invite`, `(set-password)` | Replace with plain Supabase auth for web. Invites optional later. |
| **Offline mode** | `useOnline`, `OfflineBanner` | Web app is online-first; revisit if PWA. |
| **Goal negotiator / monthly metrics editor** | `goalNegotiator`, `MonthlyMetricsEditor` | Valuable, but post-MVP once the plan model is in the DB. |

### Metric reframing (mobile → web), for reference
`energy_level → energy` · `stress_level → focus` (inverted: clarity, higher = better) ·
`deep_work_hours → deep_work` · `trained_today → shipped` · `clean_today → outreach` ·
`quick_note → note`. Weight / pain / training-specific fields dropped.

---

## Notes for you (not part of the prompt)
- The UI seam is deliberately tiny: **`src/llm.jsx`** is the only file that knows how
  the model is reached. Local canvas → `window.claude.complete`; production → `/api/coach`.
- `src/data-tracking.jsx` holds the **canonical data shapes**. When you build the API,
  return those exact shapes and the screens need no changes.
- The deterministic fallbacks in the UI are not throwaway — they are the **cost-gate
  and model-failure path** in production. Keep them.
