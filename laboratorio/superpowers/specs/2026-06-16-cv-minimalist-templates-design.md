# Spec: Minimalist Swiss Editorial CV Template (Monochrome)

**Date**: 2026-06-16  
**Author**: Antigravity  
**Status**: Approved  

---

## 1. Purpose & Objectives
Introduce a new minimalist CV template into the `dr-cv` repository pipeline, designed around the **Swiss Editorial** style. It focuses strictly on impeccable typography, asymmetrical hierarchy, and deliberate white space, removing all heavy boxes, borders, technical grids, and unnecessary metrics from the CV context. The content is derived from the latest profile state (matching the screenshot details: Xentinels ending in 2022, compact older positions, capabilities, and education). The output fits on a single A4 page, renders in both English and Spanish, and is **100% monochrome** with no decorative accent colors.

## 2. Requirements & Constraints
1. **Single-Page Constraint**: The layout must fit precisely on a single A4 page. Spacing, padding, and section heights must be carefully budgeted.
2. **Swiss Editorial Visual Style**:
   *   **No background grids** (unlike the technical landing page).
   *   **No borders or boxes** around sections.
   *   **Asymmetrical typography**: Strong hierarchy with large names and clean headings. Inter font for all primary texts, JetBrains Mono used only for technical stack tokens and dates.
   *   **100% Monochrome**: Pure grayscale/charcoal hierarchy with no live color highlights.
3. **Structured Content**:
   *   **Header**: Large name, subtitle. Asymmetric contact block.
   *   **Positioning Tesis**: Narrative statement on UX judgment, enterprise compliance, and system-level design.
   *   **Selected Experience**: Asymmetrical layout (dates on the left, details on the right) for Booz Allen (2022-present, with badge `Army · DoD · VA · FAA`), Compliance SaaS (2026-present), and Xentinels (2016-2022).
   *   **Compact Timeline**: One-liner timeline grouping older roles (Arpatel, Tecniequipos, CBN).
   *   **Capabilities & Education Columns**: Side-by-side columns at the bottom.
4. **Data Sync**: Consume data directly from `perfil/data/` YAML files (with "Open to work" stripped from availability).

---

## 3. General Architecture & Build Pipeline
The generation follows the repo's TSX workflow:

```mermaid
graph TD
    Data[perfil/data/*.yaml] -->|Load| Loader[generadores/lib/load-data.ts]
    Loader -->|Parsed CvData| Generator[generadores/cv.ts]
    Tokens[design-system/tokens-print.css] -->|Read CSS| Generator
    
    Generator -->|Render| Swiss[generadores/templates/cv/swiss.ts]
    
    Swiss -->|Emit HTML & PDF| DistSwiss[dist/cvs/cv-swiss-{en,es}]
```

### Outputs to register in [generadores/cv.ts](file:///C:/dev/dr-cv/generadores/cv.ts):
*   `dist/cvs/cv-swiss-en.html` / `dist/cvs/cv-swiss-en.pdf`
*   `dist/cvs/cv-swiss-es.html` / `dist/cvs/cv-swiss-es.pdf`

---

## 4. Visual Style & Layout Definition

The style maps CSS variables from `design-system/tokens-print.css` but forces a clean, monochrome look:

| Attribute | Swiss Editorial Value (Monochrome) |
|---|---|
| **Background** | Clean warm paper white (`#FAFAF7` or `#FFFFFF`) |
| **Grid Lines** | None (pure white space) |
| **Borders / Lines** | Minimal or none (only very faint structural breaks if needed, e.g. `1px solid rgba(28,30,36,0.05)`) |
| **Fonts** | Body & Headings: `Inter` / Technical stacks & Dates: `JetBrains Mono` |
| **Colors** | Primary: `#1C1A17` (Charcoal) / Secondary: `#5C626E` (Muted Gray) / Background: `#FAFAF7` |
| **Accents** | None. Grayscale availability dot (neutral gray ring or dot) |

---

## 5. Content Layout & Spacing Budget

The single-page content budget is defined as:

1. **Header & Contact (120px)**:
   *   Large title font for name, subtitle. Contact list aligned to the right.
2. **Hero Statement (100px)**:
   *   Tagline + Thesis. Highlighting Product Design judgment, enterprise compliance, and system-level thinking.
3. **Primary Experience (560px)**:
   *   Detailed bullet points for Booz Allen (2022-NOW), Compliance SaaS (2026-NOW), Xentinels DesignOps (2016-2022).
   *   Timeline grouping older roles (Arpatel, Tecniequipos, CBN) in a single-row timeline.
4. **Capabilities & Education Columns (180px)**:
   *   Side-by-side layout: Capabilities list on the left (Design systems, Engineering, Agents, Strategy), Education on the right.
5. **Footer (40px)**:
   *   Minimalist baseline text: `DANILO ROJAS - SENIOR PRODUCT DESIGNER` on left, `DANILOROJAS.DESIGN` on right.

---

## 6. Spec Self-Review
*   **Placeholders check**: None. All data is dynamically loaded.
*   **Color/Grid check**: Verified 100% grayscale and NO grid. Purely typographic.
*   **A4 Budgeting**: Spacings and padding are aligned to ensure perfect single-page fit.
