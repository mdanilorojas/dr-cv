# Swiss Editorial CV Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a single-page minimalist, monochrome Swiss Editorial CV template (`clean.ts`), synchronize it with profile data, remove all "Open to work" mentions, and verify all builds and tests pass.

**Architecture:** Render a lightweight A4 page with high-contrast Inter/JetBrains Mono typography, completely removing background grids, card boxes, metrics, and accent colors.

**Tech Stack:** TypeScript, Puppeteer, Vitest, JS-YAML

## Global Constraints
- **100% Monochrome**: Strictly Grayscale, no terracotta or green color accents.
- **No Metrics Grid**: Omit metrics grids on the CV.
- **Single-Page**: Strict vertical bounds for A4 page sizing.
- **Synchronized Data**: Dynamic YAML mapping with Xentinels DesignOps ending in 2022 and availability set to "Remote global".

---

### Task 1: Update Data Sources
**Files:**
- Modify: `perfil/data/identity.yaml`
- Modify: `perfil/data/experience.yaml`
- Modify: `perfil/data/positioning.yaml`

- [x] **Step 1: Set Availability in `identity.yaml`**
  Remove "Open to work", changing `availability` to `"Remote global"`.
- [x] **Step 2: Update Positioning in `positioning.yaml`**
  Change `heroLine` to `"I design software products for complex, regulated environments."`
- [x] **Step 3: Update Experience in `experience.yaml`**
  * Change Xentinels DesignOps `endYear` to `2022`.
  * Update description to focus on user testing, automated persona emulators, and product discovery.
  * Add "VA · FAA" to Booz Allen Hamilton badge.

---

### Task 2: Create / Refine Swiss Template
**Files:**
- Create/Modify: `generadores/templates/cv/clean.ts`
- Modify: `generadores/cv.ts`

- [x] **Step 1: Code the Swiss Editorial Layout in `clean.ts`**
  Design the layout with Inter headings, JetBrains Mono dates/details, asymmetrical columns, and a clean footer. Remove `.dot` green elements and `EXP // SELECTED` labels.
- [x] **Step 2: Connect clean.ts in cv.ts**
  Register the clean template inside `generadores/cv.ts` to emit `cv-clean-en` and `cv-clean-es` HTML and PDF files.

---

### Task 3: Testing & Build Verification
**Files:**
- Modify: `tests/cv-clean.test.ts`

- [x] **Step 1: Update tests to match Co-founder wording**
  Update the localized role summary test inside `tests/cv-clean.test.ts` to expect "Co-fundador · producto y diseño".
- [x] **Step 2: Run tests**
  Execute `npm test` to verify 100% success rate.
- [x] **Step 3: Run full build**
  Execute `npm run build:all` to ensure all CV and landing outputs compile correctly and PDF generation completes.
