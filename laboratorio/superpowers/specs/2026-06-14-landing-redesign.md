# Spec — Landing redesign (single-column editorial)

- **Date:** 14 Jun 2026 (rev. 2)
- **Status:** Approved design (Paso 2). Ready for Paso 3 (build).
- **Companion:** `2026-06-14-landing-redesign.flow.html` (user flow diagram)
- **Scope:** The landing page **and**, by consequence, the CV — both read one data
  source (`perfil/data/*.yaml`). MentorOS / `/app` v2 is explicitly out of scope.
- **Backup:** Pre-redesign source + rendered output saved at
  `laboratorio/landing-v11-backup-2026-06-14/`.

---

## 0 · Strategy (why this shape)

A recruiter cannot perceive the real quality of Danilo's work from a page — that only
shows up when they work with him. So the landing's job is **not** to prove the work; it
is to convey the **vision and the proven quality** in a form they *can* analyze, using a
narrative extrapolated from the ten best designer portfolios in the world. Trust forms in
seconds — the best portfolios earn it fast with text, not with big logos.

North star (Danilo's words): **not marketing-y — semi-flex but deeper.** Visitors should
get an excellent UX and an extremely clean design. Depth over hype, craft-as-proof.

**Internal vs external — hard line.** The **$250k/year goal is PRIVATE** (a personal
target). It NEVER appears on the landing, the CV, or any public surface. Publicly, the
only thing shared about growth is that Danilo runs **his own continuous-improvement
system**, with work in progress — expressed through the past / present / future framing
(see Method). Keep internal strategy internal.

## 1 · Positioning (locked in Paso 1)

- **Role:** `Senior Product Designer · UX/UI · AI-augmented`.
- **Hero line:** "Designing products for complex systems, regulated environments, and
  teams that need to move faster."
- **Anchors:** deep UX/UI applying AI to improve the product · documentation +
  compliance/regulation strength · 4 yrs at Booz Allen Hamilton (support for FAA, DoD,
  VA) · adaptability ("analyze, learn, ship, align") · soft skills.
- **Product philosophy (use verbatim somewhere):** "My work sits between user needs,
  business constraints, and execution."
- **Honesty guardrail:** not an expert engineer — high-level code understanding that
  enables agentic workflows. Engineering skills stay `mastered` ("I ship it with agents").

## 2 · Visual direction

- **Theme:** light editorial (cream "paper", one restrained accent). Research: ~8/10 of
  the best are light-dominant. Accent = terracotta `#D9663F` (AA on cream). Dark = an
  optional toggle later, not the identity. Source: [[project-design-hierarchy-aura]]
  surface-split (light portfolio / dark app).
- **Structure:** single-column editorial scroll — NOT tabs. (Current landing is tabbed;
  the best almost never tab.)
- **Type-led:** Inter (sans) · JetBrains Mono (micro-labels) · Source Serif 4 (reading
  measure). Self-host the Latin subset — drop the Google Fonts CDN.
- **Restraint:** big margins, few elements, content-first. Remove the decorative
  `particles` hero visual; keep at most one meaningful micro-interaction.
- **Web-native:** fast, accessible, keyboard-friendly, honor `prefers-reduced-motion`.

## 3 · Signature idea — "Judgment over costume" (hook A)

The one memorable idea (every best portfolio has one — Adham's split, Brian's OS-shell).
For Danilo: **proven rigor (gov · enterprise · compliance) made fast by AI.** The hook is
the honesty + the arc — judgment is the product, agents are the leverage, not a disguise.
This posture echoes across hero, method, and about.

## 4 · Narrative model (from the best → to Danilo)

**Voice (common to the ten):** first person, calm, declarative, lowercase-leaning; show
with specificity, not adjectives; one accent; lots of space. (Matches Danilo's own
assessment-answer voice.)

| # | Section | Narrative intent | Best-designer move |
|---|---|---|---|
| 1 | Hero | Manifesto, not pitch. The hero line, big type, few words. | Rauno ("Make it fast. Make it beautiful.") |
| 2 | Trust strip | Text-only credential row, no logos. Trust in seconds. | common to the best |
| 3 | Proof | Specificity = credibility (his bias: "numbers don't have opinions"). Quiet mono labels. | Jim Nielsen / restraint |
| 4 | Notes / POV | The moat. Short, extraordinary, concrete, his. | Rauno / Emil / Jim |
| 5 | Selected work | 3–4 cases told as **decisions + outcomes**, not screenshots. | Emil / Brian Lovin |
| 6 | Method | How he works + his continuous-improvement system (past/present/future). | van Schneider |
| 7 | About | The arc DBA→UX as a story + gov/compliance rigor + clients. Tight bio. | editorial bio |
| 8 | Contact | Copy-to-clipboard, restrained. | Rauno |

**Order:** lead with thinking (Notes high, before Work/Method/About) — the best lead with
a point of view, because the writing is what a recruiter *can* evaluate.

## 5 · Section spec & data sources

1. **Hero** — `identity.name`, `identity.role`, the hero line, one CTA (copy email from
   `identity.contact.email`). No particles.
2. **Trust strip** — text only, no big logos:
   `FAA · DoD · VA · Booz Allen Hamilton · Pichincha Bank · Rappi · Juan Valdez`
   (ES: `… Banco Pichincha …`). New data field needed (a `trustStrip` list).
3. **Proof** — four numbers, mono micro-labels:
   - 18+ years building products
   - 15 years in design
   - 4 years supporting FAA, DoD & VA programs
   - 50+ product initiatives delivered

   (Replaces the old proof set; 95.6 DS migration and the 0→1.0 SaaS move into case
   content, not headline proof.)
4. **Notes / POV** — placed high, so it carries the most weight. This section has the
   highest upside and the highest risk: if the notes sound generic, they weaken the entire
   positioning.

   **Purpose.** The writing is evidence of judgment. A recruiter can't see the quality of
   the work from a page, but they *can* read how Danilo thinks. Each note is a short,
   load-bearing opinion earned from real product work — the analyzable signal.

   **Quality bar — a note qualifies only if it is:** short · specific · senior ·
   opinionated · earned from real work · impossible to write without product experience ·
   connected to complex products, ambiguity, regulation, execution, handoff, or judgment.
   Standard to match: *"Most product teams don't fail because they lack solutions. They
   fail because they misdiagnose the problem."*

   **Warning — reject generic thought-leadership.** Not "AI is changing design", not
   "collaboration is important", not "users should be at the center", not "design is about
   empathy", not "good design solves problems". If it could sit on any designer's LinkedIn,
   it is cut.

   **v1 ships exactly two notes** (not 3–5 — fewer and sharper):

   - **Note 1 — "Most teams do not lack solutions."** Teams rarely fail for lack of ideas,
     UI options, or tools. They fail because the problem was misdiagnosed, the constraints
     were never made explicit, or they shipped around the real decision. Good design
     reduces ambiguity before it produces screens.
   - **Note 2 — "Handoff is where judgment disappears."** Traditional handoff turns product
     decisions into artifacts and asks another team to reconstruct the intent later — that
     gap is where waste lives. The answer isn't designers pretending to be engineers; it's
     making judgment executable through systems, rubrics, and agents.

   **Optional third note (only if a slot earns it) — "Regulated products reward clarity."**
   In complex or regulated environments, polish isn't enough: the product must explain
   itself to users, teams, reviewers, and sometimes auditors. Documentation, traceability,
   and interface clarity aren't secondary craft — they are part of the product.
5. **Selected work** — built later, one at a time, via Q&A interview modeled on how the
   best present wins. Candidates: Juan Valdez mobile, Credit Score web app, Money transfer
   module, FAA personas, Rappi (study). Needs a `cases` data shape (designed in Paso 3).
6. **Method** — `horizon.yaml` (Earned → Investing → Next) reframed as prose: judgment +
   agentic leverage, the "not costume" honesty, and his **continuous-improvement system**
   shown as past / present / future. No mention of the private $250k goal. Include the
   philosophy line: "My work sits between user needs, business constraints, and execution."
7. **About** — the arc from `experience.yaml` (DBA→backend→frontend→UI→UX), gov/compliance
   rigor (Booz Allen, FAA/DoD/VA), `clients.yaml` strip, `education.yaml`.
8. **Contact** — `identity.contact` (email copy-to-clipboard, linkedin, github, behance).

## 6 · Build contract (Paso 3)

- **Source to edit:** `generadores/v11-landing.ts`, `generadores/templates/v11-landing/*`
  (`index.ts`, `v11-styles.ts`, `v11-script.ts`, `case-detail.ts`), and
  `design-system/tokens-web.css`. **Never edit `dist/` by hand.**
- **Data to update:** `perfil/data/positioning.yaml` (new hero line + 4 proof numbers),
  a new `trustStrip` field (in `landing.yaml` or `positioning.yaml`), `horizon.yaml`
  copy. Keep the shapes the generator expects.
- **Output:** `dist/landing-v11/{index.html, es/, work/}` via `npm run build:landing-v11`.
  Deploy routes (CLAUDE.md) must keep working: `index.html`, `es/`, `work/*`, `CNAME`,
  and the un-linked `app/`, `daily/`, `plan/`.
- **Tokens:** add a light editorial profile to `tokens-web.css` (cream paper, terracotta
  accent). Dark stays available behind a toggle (later).
- **Fonts:** self-host Inter · JetBrains Mono · Source Serif 4 (Latin subset).
- **Templates:** convert the tabbed shell → single-column editorial scroll.
- **Bilingual:** EN + ES already in the data; keep `es/` output (EN "Pichincha Bank" /
  ES "Banco Pichincha").

## 7 · Out of scope

MentorOS / `/app` v2 ([[project-mentor-os-app-v2]]); the dark app cockpit theme; net-new
case-study content (interviewed separately in Paso 3); anything referencing the private
$250k goal.

## 8 · Open items / risks

- `node_modules/` is empty — run `npm install` before any build verifies.
- `cases` and `trustStrip` data shapes do not exist yet — design them in Paso 3.
- Notes/POV content requires a short interview to seed (held to the high bar above).
- Confirm "50+ product initiatives delivered" is the number Danilo wants to stand behind.
- Self-hosting fonts: confirm license/subset; removes the CDN dependency.

## 9 · User flow

```
Recruiter lands
   │
   ▼
Hero line ── reads positioning (complex systems · regulated · speed) ──► first impression
   │
   ▼
Trust strip ── FAA · DoD · VA · BAH · Pichincha · Rappi · Juan Valdez ──► trust in seconds
   │
   ▼
Proof numbers ── scans specificity ──► credibility
   │
   ▼
Notes / POV ──► evaluates THINKING (the analyzable signal)
   │
   ├──► Selected work ──► sees decisions + outcomes
   │
   ▼
Method + About ──► how he works (continuous improvement: past/present/future) + the arc
   │
   ▼
Contact ── copy email ──► reaches out
```
