# CV Optimization Playbook

> Tactical system for tailoring a CV to a specific job post so it survives ATS parsing, wins the 6-second recruiter scan, and earns a hiring-manager interview. **No guarantees** — this maximizes interview probability, not offers.

Audience: senior product / UX / AI product designer (Danilo). Reuse per job post.

---

## 0. The four gates a CV must pass

Every application is read by four reviewers in sequence. A weakness at any gate kills the rest.

| Gate | Who | Time | What they want | Failure mode |
|---|---|---|---|---|
| 1. Parse | ATS software | ms | Clean machine-readable text, mapped fields | Garbled columns, image text, header contact info |
| 2. Scan | Recruiter | 6–7 sec | Title match, company tier, recency, keywords | No title match, no metrics, wall of text |
| 3. Evaluate | Hiring manager | 1–3 min | Scope, impact, process, fit | Vague bullets, no outcomes, no "why you" |
| 4. Verify | Portfolio reviewer | 5–15 min | Proof the CV claims are real | CV ≠ portfolio, no case depth |

**Rule:** optimize for all four, in this order of *non-negotiables*: parse > scan > evaluate > verify. If a design choice trades ATS readability for beauty, ATS wins.

---

## 1. Gate 1 — ATS parsing (make the machine read you)

ATS = Applicant Tracking System (Greenhouse, Lever, Workday, Taleo, iCIMS, Ashby). It extracts your text into structured fields, then ranks you on keyword/skill match against the job req. ~99% of recruiters filter on keywords.

### Hard rules (2026 data)
- **Single column.** ~93% parse accuracy vs ~86% two-column. Multi-column scrambles reading order.
- **File format: `.docx` unless the post asks for PDF.** Plain DOCX ≈ 4% parse-failure vs ~18% for PDF. If forced to PDF, export *text-based* PDF (selectable text), never an image/flattened export.
- **Contact info in the body, not header/footer.** ~25% of ATS skip header/footer text → you become invisible.
- **Standard section headings, verbatim:** `Summary`, `Skills`, `Experience`, `Education`, `Certifications`. Don't get cute ("Where I've Made Dents").
- **Reverse-chronological** order. Highest ATS compatibility, expected by every recruiter.
- **Web-safe fonts:** Arial, Calibri, Garamond, Georgia, Times New Roman. Body 10–12pt, headings 14–16pt.
- **Bullets: circle `•` or dash `-` only.** No custom glyphs/icons.
- **No tables, text boxes, columns, images, icons, charts, headshots.** Text inside these often parses as nothing.
- **Dates as `MMM YYYY – MMM YYYY`** (e.g. `Jan 2024 – Present`). Consistent format every entry.
- **Spell out then abbreviate:** `Design System (DS)`, `Applicant Tracking System (ATS)` — match either query.

### Parse-safe section order
`Contact → Summary → Skills → Experience → Education → Certifications`

> ⚠️ Danilo-specific: the landing/portfolio can be as expressive as you want. The **CV file you upload to an ATS must be the boring single-column text version.** Keep two artifacts: the beautiful portfolio (gate 4) and the plain CV (gates 1–3). Don't merge them.

---

## 2. Gate 2 — the 6-second recruiter scan

Recruiter eyes hit, in order: **current title → current company → most recent dates → a few keywords → does this match the req?** You have ~6–7 seconds.

### What must be visible in the top third (above the fold)
1. **Target job title** as your headline — mirror the post (see §4).
2. **One-line positioning** with seniority + domain + leverage.
3. **3–5 hard metrics** in the summary or first role.
4. **Recognizable companies / clients** (Merck, Mondelēz, Banco Pichincha, Booz Allen) — tier signals trust.

### Scan-friendly formatting
- Front-load every bullet with the **result or the strongest noun**, not "Responsible for…".
- ≤2 lines per bullet. 3–6 bullets per role.
- White space. A scannable page beats a dense one.
- Bold the *metric*, not random words: "Cut onboarding time **30%**".

---

## 3. Gate 3 — hiring manager evaluation (senior product/UX design)

A design hiring manager is asking: *scope, impact, process, collaboration, judgment.* They discount adjectives and reward evidence.

They specifically look for:
- **Design process narrative** — research → prototyping → iteration → ship. Show the loop, not just the screen.
- **Cross-functional evidence** — worked with PM, eng, data, leadership. Senior = drives, not just executes.
- **Measurable product outcomes** — conversion lift, task-completion gain, support tickets cut, time-to-ship, adoption.
- **Scope signals** — team size influenced, surface owned, users affected, $ or risk touched.
- **Judgment** — tradeoffs named, constraints (regulated/complex environments) handled.

Seniority ladder in language:
- Mid: "designed X"
- Senior: "owned X across Y, aligned Z stakeholders, shipped, measured"
- Lead: "set direction for X, established the system/process others built on"

**Where seniority actually lives (2026 hiring managers):** the moments you *chose between two competing goods* — traded scope against time, ranked one user need over another, killed a feature. Surface ≥1 such judgment call. A CV/portfolio of clean wins with no tradeoffs reads as junior. "Decided X over Y because Z, given [constraint]" is the strongest senior signal you can give.

**Their fast mental filter (6–8 sec):** role fit → seniority signal (scope, judgment, ownership) → relevance. Make all three legible in the top third.

---

## 4. Keyword & title alignment (the matching engine)

ATS ranks you on overlap with the job description. This is the single highest-leverage tailoring move.

### Title alignment
- Make your CV headline **match the posted title** when it's honestly true: post says "Senior Product Designer" → headline "Senior Product Designer". 
- If your real title differs, use a **dual line**: `Senior Product Designer` (headline) / actual title in the role entry. Never lie about the role you held — align the *framing*, not the facts.
- Maintain CV variants per register (AI-forward vs sober-enterprise) — never one compromise file.

### Keyword extraction workflow
1. Paste the job post. Pull every **noun phrase** that is a skill, tool, method, or responsibility.
2. Bucket them: *tools* (Figma, etc.), *methods* (user research, design systems, prototyping), *domain* (fintech, regulated, compliance), *soft/scope* (cross-functional, stakeholder alignment).
3. Rank by frequency + placement (title and first 3 requirements = highest weight).
4. Place the top terms in: **headline, summary, skills list, and ≥1 experience bullet.** A skill only in the skills list reads as a claim; the same skill proven in a bullet reads as evidence. Do both.
5. Use the **exact phrasing** of the post ("design systems" not "component libraries" if they said design systems). Then add the synonym once for human readers.

### Anti-patterns
- ❌ Keyword stuffing / white-text hidden keywords — modern parsers and recruiters penalize it.
- ❌ Generic skill soup unrelated to the post.
- ✅ Evidence-based: tools used + scale + outcome tied to the job family.

---

## 5. Impact metrics (the currency of senior CVs)

Numbers parse as structured data and dominate human scans. "Reduced onboarding time by 30%" >>> "Improved onboarding."

### Metric menu for designers
- Conversion / signup / activation lift (%)
- Task completion or success rate (%)
- Time saved (cycle time, time-to-ship, onboarding time)
- Support tickets / errors reduced (%)
- Adoption / retention / engagement (%)
- Scope: # users, # markets, team size, # surfaces, design-system components shipped
- Business: revenue influenced, cost/risk reduced, pilots → paying clients

### When you lack a hard number
Use a **defensible proxy or scope figure**: "shipped to 3 markets", "adopted by 4 squads", "design system consumed by N engineers". Range or qualitative-with-scope beats nothing. Never invent precise figures you can't defend in the interview — the portfolio gate will expose it.

---

## 6. The bullet formula: Action + Scope + Result

Every experience bullet = **[Strong verb] + [what / for whom, at what scale] + [measurable outcome]**.

`[Action verb] [scope/surface] [for whom] → [result with metric]`

Examples (designer):
- ✅ "Redesigned the compliance onboarding flow for 12k regulated users, cutting drop-off **22%** and support tickets **30%**."
- ✅ "Built an agent-consumable design system adopted by 4 product squads, halving handoff time."
- ❌ "Responsible for onboarding redesign and design system work." (no scope, no result)

Verb bank: *Designed, Shipped, Led, Owned, Built, Scaled, Drove, Reduced, Increased, Established, Unified, Migrated, Prototyped, Researched, Aligned.* Avoid *Helped, Assisted, Worked on, Responsible for.*

Rule: **at least the first bullet of every role carries a metric.**

---

## 7. Gate 4 — portfolio-to-CV consistency

The reviewer opens your portfolio to verify the CV. Mismatch = instant distrust. Hiring managers don't *read* portfolios — they apply the same 6–8 sec filter (role fit → seniority → relevance), then dig or move on.

- Every CV claim with a metric should have a **case study** that backs it.
- Use the **same project names, companies, metrics, and dates** in both.
- CV bullet = the headline; case study = the proof (problem → role → process → outcome → **impact delta**).
- Lead the portfolio with your **strongest asset for that role** (e.g. agent-consumable DS for AI-design roles).
- One link, clean, in contact block. Make the named projects in the CV findable in the portfolio in <10 sec.

### Senior portfolio red flags (cause silent rejection)
- ❌ **Missing impact delta** — a case with no before/after metric reads as untrustworthy at senior level. The #1 killer.
- ❌ **Double diamond as the case-study structure** — showing the framework diagram signals you confused a process map with evidence of thinking. Show the *decision*, not the diagram.
- ❌ **Features as isolated artifacts** — no systems thinking. Connect the work to the larger system/product.
- ❌ **Vague problem framing** — a fuzzy problem makes the solution look like luck. State the real, specific problem.
- ❌ **No tradeoffs shown** — only clean wins. Name the hard call.

---

## 8. Red flags that trigger rejection

| Red flag | Fix |
|---|---|
| Two-column / table layout | Single column, linear |
| Contact info in header/footer | Move into body |
| Image/flattened PDF | Text-based `.docx` |
| No metrics anywhere | Add ≥1 metric per role |
| Title doesn't match post | Align honest headline |
| Generic, untailored skills | Mirror job-post terms |
| Unexplained employment gaps | Brief context line / reframe |
| Job-hopping w/o narrative | Group/contract-frame short stints |
| Buzzword soup, no evidence | Tie every claim to outcome |
| CV ≠ portfolio | Reconcile names/metrics/dates |
| Typos, inconsistent dates | Proofread; one date format |
| >2 pages (non-academic) | Cut to 1–2 pages |
| Vague seniority ("worked on") | Action+Scope+Result |
| Skill bars / "90% Figma" graphics | Delete — subjective, contextless, reads junior |
| Long unbroken text blocks | Structure, anchors, scannable bullets |

---

## 9. CV structure template (single column, ATS-safe)

```
DANILO ROJAS
Senior Product Designer · Agentic Workflows        ← mirror target title
City, Country (Remote) · email · phone · portfolio URL · LinkedIn
                                                    ← all in body text

SUMMARY
2–3 lines: seniority + domain (complex, regulated environments) +
leverage (profile + agentic AI) + 1 signature proof metric.

SKILLS
Design: user research, design systems, prototyping, interaction design…
Tools: Figma, …
Domain: regulated/compliance, fintech, …
AI: agentic workflows, agent-consumable design systems, …
(mirror the job post's exact terms)

EXPERIENCE
[Title] — [Company/Client]                          Jan 2024 – Present
• [Action + scope + result with metric]
• [Cross-functional / process bullet]
• [Scope / system bullet]

[Title] — [Company]                                 Mon YYYY – Mon YYYY
• …

EDUCATION
[Degree] — [Institution]                            YYYY

CERTIFICATIONS
[Cert] — [Issuer]                                   YYYY
```

---

## 10. Per-job tailoring workflow (run every application)

1. **Read the post twice.** Extract title, top 5 requirements, exact tool/method terms, domain words.
2. **Pick the CV variant** (AI-forward vs sober-enterprise) matching the company register.
3. **Set the headline** to the posted title (if honest).
4. **Rewrite the summary** to lead with the domain + the one metric that matches their #1 need.
5. **Reorder skills** so their top terms appear first, in their wording.
6. **Reorder/rewrite bullets** so the role most relevant to the post is richest; ensure top keywords appear in ≥1 bullet as evidence.
7. **Check metrics** — every role has ≥1; the most relevant has the strongest.
8. **Reconcile portfolio** — names/metrics/dates match; strongest case leads.
9. **ATS self-check** — single column, body contact info, `.docx`, standard headings, no tables/images, run through a parser (Jobscan-type) if available.
10. **Human read** — 6-second test: is the title match + 3 metrics visible up top? Proofread dates/typos.
11. **Save as** `cv-[role]-[company]-[date].docx`.

---

## 11. Quick pre-send checklist

- [ ] Single column, no tables/images/icons
- [ ] Contact info in body (not header/footer)
- [ ] `.docx`, text-based (or PDF only if requested)
- [ ] Standard headings: Summary / Skills / Experience / Education / Certifications
- [ ] Reverse-chronological, consistent `Mon YYYY` dates
- [ ] Headline mirrors the posted title (honestly)
- [ ] Top job-post keywords in headline + summary + skills + ≥1 bullet
- [ ] Every role ≥1 metric; strongest role strongest metric
- [ ] Bullets = Action + Scope + Result, ≤2 lines
- [ ] 1–2 pages
- [ ] Portfolio names/metrics/dates reconciled with CV
- [ ] 6-second test passes
- [ ] Proofread

---

*Sources (2026): onehour.digital ATS stats, bestjobsearchapps ATS guide 2026, jobscan.co, enhancv product designer 2026, scale.jobs ATS format 2026, resumeoptimizerpro. This file improves each loop pass — weak advice out, stronger examples in.*
