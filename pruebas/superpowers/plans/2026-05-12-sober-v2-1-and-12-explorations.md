# Sober-Enterprise V2.1 + 12 exploration variants — Implementation Plan

> **For agentic workers:** Inline execution. Steps are checkboxes the implementer ticks off.

**Goal:** Extend `docs/superpowers/visuals/2026-05-12-sober-enterprise-variants/_generate.mjs` to emit V2.1 (refined base) plus 12 exploration variants under `v2-1/`, commit on branch `feat/sober-enterprise-explorations`, no merge.

**Architecture:** One Node ESM file renders 13 HTMLs from shared tokens + data + per-variant config. Pure string templating, no deps. Output: 13 HTMLs + 1 README inside `v2-1/`.

**Tech Stack:** Node 20+, ESM, pure strings. No build step.

**Spec:** `docs/superpowers/specs/2026-05-12-sober-v2-1-and-12-explorations.md`

---

## Task 1 — Rewrite _generate.mjs with V2.1 base and variant system

**Files:**
- Modify: `docs/superpowers/visuals/2026-05-12-sober-enterprise-variants/_generate.mjs`

- [ ] **Step 1:** Rewrite the script with shared tokens + shared CSS + data block + render helpers + variant configs + emit loop. The rewrite replaces the current file (which only had 4 variants). Keep the original V1–V4 emits so old HTMLs still regenerate identically. Add V2.1 + 12 variants emitting to `v2-1/` subdirectory.
- [ ] **Step 2:** Run `node docs/superpowers/visuals/2026-05-12-sober-enterprise-variants/_generate.mjs`. Confirm 17 files emitted total (4 original at dir root + 13 new at `v2-1/`).
- [ ] **Step 3:** Spot-check by grep that `#FF8964` appears in each of the 13 new files.
- [ ] **Step 4:** Commit.

## Task 2 — Write README.md comparator

**Files:**
- Create: `docs/superpowers/visuals/2026-05-12-sober-enterprise-variants/v2-1/README.md`

- [ ] **Step 1:** Write index of 13 variants (V2.1 base + 12 explorations), with axis-by-axis description and "how to decide" rubric.
- [ ] **Step 2:** Commit.

## Task 3 — Update memory

**Files:**
- Modify: `C:\Users\Danilo\.claude\projects\C--dev-dr-cv\memory\project_bairesdev_conservative_archetype.md`

- [ ] **Step 1:** Update the memory with the nuance: subtle Agentic mention in role-line is acceptable for the average BairesDev end-client; pure Kinder Morgan archetype still silences all AI language. Accessibility demoted from headline to one compliance item among several.
- [ ] **Step 2:** No commit — memory is outside the repo.

## Task 4 — Final verification

- [ ] **Step 1:** `git log --oneline ^main feat/sober-enterprise-explorations` — confirm 2 commits.
- [ ] **Step 2:** `ls docs/superpowers/visuals/2026-05-12-sober-enterprise-variants/v2-1/` — confirm 14 entries (13 HTMLs + README.md).
- [ ] **Step 3:** Confirm main branch is untouched: `git diff main..feat/sober-enterprise-explorations --stat` should only show new files under the v2-1 directory + the _generate.mjs edit + the spec + plan + prompt files.
