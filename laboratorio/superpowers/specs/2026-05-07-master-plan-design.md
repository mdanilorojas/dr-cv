# dr-cv Â· Master Plan Â· Design Spec

**Date:** 2026-05-07
**Author:** Danilo Rojas (with Claude as operator)
**Status:** Brainstorming complete â†’ ready for writing-plans
**Companion:** `2026-05-07-master-plan-design.html` (for human review)

---

## Problem

Danilo's public professional narrative freezes in 2022 as "UX/UI Product Designer." Between 2023 and 2026 he has:
- Shipped production work at Booz Allen Hamilton (Trusted Environments / Developer Portal) â€” two parallel design systems (`/te-skin` as an agent-consumable slash-command skill, TE Black as a dark-first DS with per-token WCAG audit trail) and a SharePoint-deployable single-file SPA landing.
- Built EnRegla, his own compliance SaaS, from zero to a 1.0-MVP in production in 40 days, now with paying pilots.
- Built Life Update Mobile, a personal tracking product that uses the Gemini API in runtime for semantic analysis.
- Industrialized an agentic workflow (Claude Code + MCP servers + subagents + skills-lock + recursive numeric review) that multiplies his delivery speed without sacrificing craft.

None of that is visible in any public CV, portfolio or web presence. Clients and recruiters looking him up today see a 2022 UX/UI designer, not the Agentic Designer he is now.

He is currently employed by BairesDev (nearshore outsourcing, placed at Booz Allen Hamilton) and is running a parallel go-to-market via LinkedIn to find direct clients.

## Goal

Build a **system that keeps itself alive** â€” a single-source-of-truth repository of Danilo's professional identity (skills, experience, cases, clients, testimonials, network) from which multiple deliverables (skills sheet, CVs, landing page, eventually a "me" agent) are generated automatically. The platform itself is proof of the thesis: an Agentic Designer who builds the tools agents use to help him ship.

Deliverable targets, in strict order:
1. **Skills Sheet** (Phase 1) â€” a visual A4 PDF of 1â€“2 pages, shareable by email.
2. **CV** (Phase 2) â€” bilingual A4 PDF, three variants (LinkedIn warm, LinkedIn serious, BairesDev plain).
3. **Landing Page** (Phase 3) â€” `DaniloRojas.design` (domain TBD) using Huly.io aesthetic (dark-mode sections + monospace display + light accent + section-per-animation) in a tab-SPA pattern proven by Danilo himself at BAH.
4. **Future phases** â€” the "me" agent, network/testimonials pipeline, auto-update agents.

## Non-goals

- NOT a rewrite of the 2022 CV. This is a reposition and narrative closure.
- NOT a single-channel strategy. The same data must feed multiple audiences (US enterprise, LATAM SMB, full-time remote, investor, BairesDev template) via different generated artifacts.
- NOT a Figma-first workflow. The source of truth is code-first (YAML/JSON/MD in a Git repo); Figma is downstream, not upstream.
- NOT a solo-genius narrative. The framing is *profile + agentic AI = combination*, never *Danilo alone is superhuman*.
- NOT mobile-only and NOT desktop-only. The skills sheet and CVs are A4 print-first; the landing is mobile-first responsive.

## Architecture

### Single source of truth

All of Danilo's professional identity lives in a dedicated Git repo (this repo, `mdanilorojas/dr-cv`) under a `/perfil/data/` directory. Proposed structure:

```
dr-cv/
â”œâ”€â”€ perfil/data/
â”‚   â”œâ”€â”€ identity.yaml          # name, role, location, languages, contact, live status
â”‚   â”œâ”€â”€ positioning.yaml       # headline variants (warm/serious/bairesdev), taglines, category
â”‚   â”œâ”€â”€ skills.yaml            # dual taxonomy: by-product-layer AND by-outcome
â”‚   â”œâ”€â”€ experience.yaml        # chronological employment + client history (anonymized where needed)
â”‚   â”œâ”€â”€ clients.yaml           # enterprise client list (logos, industries, years)
â”‚   â”œâ”€â”€ cases/
â”‚   â”‚   â”œâ”€â”€ te-skin.md                        # /te-skin case study
â”‚   â”‚   â”œâ”€â”€ te-black.md                       # TE Black DS case study
â”‚   â”‚   â”œâ”€â”€ te-landing-v45.md                 # SharePoint SPA case
â”‚   â”‚   â”œâ”€â”€ enregla.md                        # EnRegla 0 â†’ 1.0-MVP case
â”‚   â”‚   â”œâ”€â”€ life-update-mobile.md             # Gemini runtime case
â”‚   â”‚   â”œâ”€â”€ ds-migration-recursive.md         # 17-parts Ã— 5-rounds DS migration case
â”‚   â”‚   â””â”€â”€ policia-judicial-ai-literacy.md   # pro-bono case
â”‚   â”œâ”€â”€ testimonials/
â”‚   â”‚   â”œâ”€â”€ verified.yaml       # real ones (Sheppard, Giraldez, future ones as they arrive)
â”‚   â”‚   â””â”€â”€ attributed.yaml     # composed from verifiable work, labeled as such
â”‚   â”œâ”€â”€ education.yaml          # degrees, certifications
â”‚   â””â”€â”€ network.yaml            # key relationships for future landing/agent use
â”œâ”€â”€ generadores/
â”‚   â”œâ”€â”€ skills-sheet.ts         # reads /data â†’ emits skills-sheet-A4.html + .pdf
â”‚   â”œâ”€â”€ cv-warm.ts              # emits cv-linkedin-warm-A4.html + .pdf
â”‚   â”œâ”€â”€ cv-serious.ts           # emits cv-linkedin-serious-A4.html + .pdf
â”‚   â”œâ”€â”€ cv-bairesdev.ts         # emits cv-bairesdev-A4.html + .pdf
â”‚   â””â”€â”€ landing.ts              # emits landing site (Phase 3)
â”œâ”€â”€ design-system/
â”‚   â”œâ”€â”€ tokens-print.css              # derived from Huly, adapted for dr-cv (light + dark variants)
â”‚   â”œâ”€â”€ components.css          # atomic components (buttons, cards, pills, testimonials)
â”‚   â””â”€â”€ patterns.css            # composite patterns (tabs, sections, CTAs)
â”œâ”€â”€ docs/
â”‚   â”œâ”€â”€ audits/                 # private (.gitignore'd)
â”‚   â”œâ”€â”€ references/             # Huly scrape etc.
â”‚   â”œâ”€â”€ superpowers/
â”‚   â”‚   â”œâ”€â”€ specs/              # this document
â”‚   â”‚   â”œâ”€â”€ plans/              # writing-plans outputs
â”‚   â”‚   â””â”€â”€ visuals/            # visual previews
â”œâ”€â”€ dist/                       # generator outputs (PDFs, site)
â”œâ”€â”€ README.md
â””â”€â”€ package.json
```

### Agents as the update layer

Danilo describes a new skill or accomplishment to an agent (Claude Code, probably via a skill installed in this repo). The agent:
1. Identifies which `/perfil/data/*.yaml` or `/perfil/data/cases/*.md` file is affected.
2. Proposes a change (PR-style diff).
3. On merge, CI re-runs the relevant generadores.
4. New artifacts land in `/dist/` and on the live landing site.

Eventually: agents that observe his GitHub activity, commits, or text input and auto-propose updates. For Phase 1, manual invocation is fine.

### Generators as the emission layer

One data source, many outputs. The canonical generadores cover:
- **Skills Sheet PDF** (A4, 2 pp) â€” shareable by email.
- **CV warm PDF** â€” LinkedIn + direct outreach.
- **CV serious PDF** â€” enterprise-formal audiences.
- **CV BairesDev PDF** â€” template-safe for his current employer to place him.
- **Landing site** â€” Huly-style tab-SPA, responsive, with a "me" agent hook reserved for later.

Each generator is a TypeScript file that reads data, applies a template, outputs HTML + PDF.

## Phases (strict order, no parallel scope)

### Phase 1 â€” Skills Sheet

**Deliverable:** `skills-sheet-A4.html` â†’ `skills-sheet.pdf`, 2 pages A4.

**Contents:**
- Identity band (name, role, live dot, contact).
- Intro tagline: *"I ship real products â€” and I ship the tools agents use to help me ship them."*
- Four proof numbers (15+ years, 346 commits in 40 days, 1.0 SaaS live, 95.6 DS score).
- Two skill visuals side-by-side on page 1:
  - **Visual A** â€” by product layer: Strategy / Design / Engineering / Agents.
  - **Visual B** â€” by client outcome: Discovery / Build / Ship / Scale.
  - Each group marks *mastered* (filled dot) vs *learning* (outline dot).
- Page 2:
  - "The way I build" â€” three process cards (Strategy, Design+Code, Agents).
  - "Current work" â€” two cards (Booz Allen Hamilton, EnRegla).
  - "Past clients" â€” eight enterprise logos as chips (Merck, MondelÄ“z, Banco Pichincha, Quifatex, Grupo Superior, Moderna, Azzorti, Flamingo).
  - "Voices" â€” two verified testimonials (Sheppard, Giraldez).
  - CTA: *"The combination is the product."* + email link.

**Approval gate:** Phase 2 does not start until skills sheet v1.0 is approved and generated from `/perfil/data/`.

### Phase 2 â€” CV (three variants)

**Deliverables:**
- `cv-linkedin-warm-A4.html` + PDF
- `cv-linkedin-serious-A4.html` + PDF
- `cv-bairesdev-A4.html` + PDF

All three pull from the same `/perfil/data/` but apply different templates and content filters.

- **Warm:** Agentic Designer headline, live dot animated, casual-professional voice, featured dark case card, 5 testimonials (2 verified + 3 attributed with honest disclosure), language toggle EN/ES.
- **Serious:** Agentic Designer headline, formal voice, no dark cards, only 2 verified testimonials, language toggle EN/ES.
- **BairesDev:** "Product Designer & Engineer Â· 15+ years" headline (universal, no Agentic Designer category), no testimonials, no dark cards, no orange accent, EN only, BairesDev as employer with BAH as placement, EnRegla as "personal project."

**Approval gate:** Phase 3 does not start until all three CV variants are approved and generated.

### Phase 3 â€” Landing Page

**Deliverable:** production landing at `danilorojas.design` (domain TBD).

**Pattern:** tab-SPA single-file, mobile-first responsive â€” replicating the pattern Danilo already shipped at BAH (`te-landing-v4.5.html`). Huly.io aesthetic (dark-mode dominant, alternating light-bg sections, JetBrains Mono display, Inter body, warm accent `#FF8964`, per-section animated visual â€” shader / flow / particles / quiet text).

**Candidate tabs (to be refined in Phase 3 brainstorming):**
- Overview (hero + thesis + live status)
- Work (case studies navigable)
- Method (agentic workflow explained)
- About (bio + path)
- Let's talk (CTA + contact)

Landing integrates real testimonials (Sheppard, Giraldez) as featured quotes, keeps attributed testimonials disclosed, and reserves a docked "me" agent as the Phase 4 hook.

**Approval gate:** Phase 3 goes through its own brainstorming â†’ spec â†’ plan â†’ implementation cycle once Phase 2 is approved.

### Phase 4+ (future, scoped later)

- The "me" agent conversational interface.
- Network / testimonials pipeline (active outreach, LinkedIn import).
- Auto-update agents (observe activity, propose data changes).
- Additional case studies.

## Positioning rules (apply throughout)

- Primary role: **Agentic Designer** (new category) paired with classic anchor in hybrid headlines (e.g., "Agentic Designer Â· Product Engineer").
- Tone: **serious + warm**. Authoritative without distance.
- Frame: **profile + agentic AI = combination**. Never *Danilo as solo superhuman*.
- Language: English primary, Spanish toggle. Body copy written in EN first, ES generated translation.
- Visual: controlled structure per section + one memorable animated visual per section. Light, never heavy.
- Domain: TBD (Danilo assigns when purchased). Placeholder `DaniloRojas.design`.
- Pricing: never shown. Single CTA: "Let's work together" / "Trabajemos juntos."
- Honesty: testimonials labeled as *verified* or *attributed* with explicit disclosure; skills split *mastered* / *learning*; EnRegla described as "early paying pilots" without numbers.
- Audience: four in parallel â€” US enterprise, LATAM SMB, full-time remote, SaaS investor â€” each served by a dedicated generated artifact.

## Scrub list (for any public surface)

Never expose on public landing, CV, or social:
- Internal BAH URLs: `backstage.bah-ss-nonprod.te-test-domain.com`, `etc.bah.com`, `assistme.bah.com`, `cmisbahprod.servicenowservices.com`, specific SharePoint URLs with tokens, Workday course URLs.
- Emails like `tecustomersuccess@bah.com`.
- Code, tokens or assets copied from BAH artifacts.
- Work from `E:\Trusted Environment Black\uploads\` (likely not Danilo's authorship â€” BAH DS v3 upstream material).
- EnRegla customer count (Danilo opted to withhold the number).

## Risks and open items

- **Domain not purchased yet.** Use placeholder `DaniloRojas.design` throughout until Danilo confirms final.
- **`/te-skin` case naming** may need to adapt if BAH is nervous about naming specifics â€” framing is already anonymizable to "component-library slash-command skill."
- **Real testimonials** (Sheppard, Giraldez) used with verbal permission; written confirmation should be requested before the landing goes live publicly.
- **"Aura" brand identity** needs a decision later: does it get its own page, logo, or stay as a tagline?
- **BairesDev-facing narrative** must not leak direct-outreach intent; separate from LinkedIn-facing content.

## Success criteria

Phase 1 is complete when:
- `/perfil/data/skills.yaml` exists with full dual-taxonomy structure.
- `skills-sheet-A4.html` generates cleanly from data (no hand-edits).
- The PDF output passes print test and fits 2 pp A4.
- Danilo can generate it in one command and send it to a prospect by email.

Phase 2 is complete when all three CV variants generate cleanly from the same `/perfil/data/`.

Phase 3 is complete when the landing is live on the chosen domain, with live data, and the tab-SPA pattern is validated on mobile.

## Next step

Invoke `writing-plans` skill to produce the Phase 1 implementation plan (skills sheet + `/perfil/data/skills.yaml` schema).

---

## Decisions already locked (reference)

| # | Decision | Confirmed |
|---|----------|-----------|
| 1 | Tone: serious + warm | 2026-05-07 |
| 2 | Category: Agentic Designer | 2026-05-07 |
| 3 | Visual: controlled sections + per-section animated visual | 2026-05-07 |
| 4 | Language: EN primary, ES toggle | 2026-05-07 |
| 5 | Domain: TBD (placeholder DaniloRojas.design) | 2026-05-07 |
| 6 | Social proof: verified + attributed with disclosure | 2026-05-07 |
| 7 | Behance: keep 7 public + add 4â€“7 more in Phase 3 | 2026-05-07 |
| 8 | No pricing, single "Let's work together" CTA | 2026-05-07 |
| 9 | BairesDev is current employer â†’ separate CV variant | 2026-05-07 |
| 10 | BAH nameable + scrub internal URLs | 2026-05-07 |
| 11 | Real testimonials usable (Sheppard, Giraldez, verbal OK) | 2026-05-07 |
| 12 | Positioning: profile + agentic AI = combination | 2026-05-07 |
| 13 | Huly.io as visual reference system | 2026-05-07 |
| 14 | Sequential phases, no parallel scope | 2026-05-07 |
