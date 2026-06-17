# CV Narrative Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reframe and polish the English and Spanish content inside `2026-06-16-cv-minimalist-templates-visuals.html` to highlight Danilo's UX/UI Product Design expert authority and eliminate engineering-focused clutter (such as SQL migrations, Cron jobs, and RLS rules).

**Architecture:** Edit the static HTML file directly in place. Since the file is structured with two parallel `tab-en` and `tab-es` previews using Tailwind classes, we will swap the text nodes within those tags to match our reframed narrative.

**Tech Stack:** HTML, Tailwind CSS (via CDN), Google Fonts (Inter, JetBrains Mono).

## Global Constraints
*   **Single-Page A4 Budget**: Ensure the content does not overflow the simulated A4 page height (`min-h-[297mm]` / `w-[210mm]`).
*   **No Decorative Accents**: Grayscale monochrome only. No live colors (except for background preview borders/tabs).
*   **Aesthetic Quality**: Swiss Editorial style with strong hierarchy, clean lines, and strict typography spacing.

---

### Task 1: Update English CV Content
**Files:**
- Modify: `laboratorio/superpowers/visuals/2026-06-16-cv-minimalist-templates-visuals.html`

**Interfaces:**
- Consumes: Existing HTML text nodes in `#tab-en`
- Produces: Reframed English content in `#tab-en` representing a Senior Product Designer

- [ ] **Step 1: Replace header tagline, thesis statement, and experience bullets in `#tab-en`**
  Modify the English template content inside lines 57-196 of `laboratorio/superpowers/visuals/2026-06-16-cv-minimalist-templates-visuals.html` to use:
  - Header Tagline: `Senior Product Designer · Design Systems & UX Research`
  - Thesis: `I design software products for complex, regulated environments. Former systems engineer turned Senior Product Designer — bridging deep UX/UI judgment, cognitive ergonomics, and front-end execution to translate complex compliance and data models into frictionless user experiences.`
  - Booz Allen Hamilton:
    - `Led end-to-end UX/UI, user flows, and interaction models for the federal Trusted Environments platform and Developer Portal.`
    - `Designed and architected two parallel WCAG 2.1 AAA accessibility-compliant design systems (/te-skin and TE Black), documenting strict usability rules and component anti-patterns.`
    - `Pioneered agentic UX research: developed custom LLM-based user persona emulators to run automated usability tests, mapping cognitive friction and user journeys before development.`
    - `Consulted cross-team Army/DoD product managers and engineers on secure UI pipelines, bridging design intent with production code.`
  - Compliance SaaS · LATAM:
    - `Co-founded and led product design from discovery to launch, translating complex regulatory requirements into a simple, self-serve SMB compliance tool.`
    - `Conducted user interviews, mapped cognitive patterns, and designed the onboarding and core dashboard flows, shipping a validated MVP in 40 days.`
    - `Designed a modular 31-component UI system in Figma and implemented it directly in React/TypeScript, ensuring 100% layout fidelity.`
    - `Built agentic feedback loops to simulate user pathways, optimizing conversion funnels and reducing activation drop-offs.`
  - Xentinels DesignOps:
    - `Directed the DesignOps unit, scaling distributed, multi-theme design systems and token libraries for Fortune 500 enterprise clients (Merck, Mondelēz, Banco Pichincha).`
    - `Led qualitative user research (n>100 interviews, usability testing, and card sorting) to establish standard enterprise interaction patterns.`
    - `Streamlined design-to-engineering handoff workflows, reducing product time-to-market by 35% and establishing a single source of UI truth.`
  - Previews timeline (older roles):
    - `Built product design foundation through engineering and product management roles: designed retail POS and CRM flows, co-founded product ventures, and administered regional technical infrastructure projects.`
  - Capabilities Grid:
    - strategy -> `Product & UX: UX Research · Interaction Design · Cognitive Ergonomics · User Testing`
    - design -> `Design Systems: Multi-Theme Tokens · Figma Libraries · Component Architecture · W3C Tokens`
    - engineering -> `Design Engineering: TypeScript · React 19 / Next.js · Rapid Prototyping · CSS Houdini / Canvas`
    - agents -> `Agentic UX / AI: Agentic Usability Testing · Persona Emulation · LLM Interface Design · AI Multipliers`

- [ ] **Step 2: Commit Task 1**
  Run:
  ```powershell
  git add laboratorio/superpowers/visuals/2026-06-16-cv-minimalist-templates-visuals.html
  git commit -m "feat(cv-visuals): refactor English CV content for premium UX Product Designer positioning"
  ```

---

### Task 2: Update Spanish CV Content
**Files:**
- Modify: `laboratorio/superpowers/visuals/2026-06-16-cv-minimalist-templates-visuals.html`

**Interfaces:**
- Consumes: Existing HTML text nodes in `#tab-es`
- Produces: Reframed Spanish content in `#tab-es` representing a Senior Product Designer

- [ ] **Step 1: Replace header tagline, thesis statement, and experience bullets in `#tab-es`**
  Modify the Spanish template content inside lines 199-338 of `laboratorio/superpowers/visuals/2026-06-16-cv-minimalist-templates-visuals.html` to use:
  - Header Tagline: `Diseñador de Producto Senior · Design Systems y UX Research`
  - Thesis: `Diseño productos de software para entornos complejos y regulados. Ex-ingeniero de sistemas convertido en Diseñador de Producto Senior — conectando juicio UX/UI profundo, ergonomía cognitiva y ejecución front-end para traducir flujos complejos de cumplimiento y datos en experiencias intuitivas.`
  - Booz Allen Hamilton:
    - `Lideré el UX/UI, flujos de usuario y modelos de interacción para la plataforma federal de Trusted Environments y el Developer Portal.`
    - `Diseñé y automaticé la arquitectura de dos design systems paralelos con conformidad WCAG 2.1 AAA (/te-skin y TE Black), definiendo reglas de usabilidad y patrones de accesibilidad.`
    - `Fui pionero en investigación de UX agéntica: creé emuladores de personas de usuario basados en IA para automatizar pruebas de usabilidad y detectar fricción cognitiva antes del desarrollo.`
    - `Consultoría transversal a PMs y desarrolladores de proyectos Army/DoD para asegurar la fidelidad del diseño y el cumplimiento de la Sección 508.`
  - Compliance SaaS · LATAM:
    - `Co-fundador y líder de diseño de producto: traduje regulaciones complejas en flujos intuitivos de autoservicio para PYMES.`
    - `Realicé entrevistas a usuarios, mapeé patrones conductuales y diseñé la experiencia de onboarding y dashboard, lanzando un MVP validado en 40 días.`
    - `Diseñé un sistema modular de 31 componentes UI en Figma e implementé el código de producción en React/TypeScript para garantizar fidelidad del 100%.`
    - `Integré simulaciones agénticas de usabilidad para optimizar el embudo de conversión y reducir abandonos.`
  - Xentinels DesignOps:
    - `Dirigí la unidad de DesignOps, escalando design systems y librerías de tokens multi-tema distribuidos para clientes Fortune 500 (Merck, Mondelēz, Banco Pichincha).`
    - `Lideré investigación cualitativa (n>100 entrevistas, pruebas de usabilidad y card sorting) para estandarizar patrones de interacción corporativos.`
    - `Optimicé los flujos de handoff de diseño a ingeniería, reduciendo el time-to-market en un 35% y centralizando la gobernanza de UI.`
  - Previews timeline (older roles):
    - `Construí bases de diseño de producto desde la ingeniería y gestión: diseñé flujos POS y CRM, co-fundé startups y administré infraestructura tecnológica.`
  - Capabilities Grid (Habilidades):
    - strategy -> `Producto y UX: Investigación UX · Diseño de Interacción · Ergonomía Cognitiva · Pruebas de Usabilidad`
    - design -> `Design Systems: Tokens Multi-Tema · Librerías Figma · Arquitectura de Componentes · Tokens W3C`
    - engineering -> `Design Engineering: TypeScript · React 19 / Next.js · Prototipado Rápido · CSS Houdini / Canvas`
    - agents -> `UX Agéntica / IA: Pruebas Agénticas de Usabilidad · Emulación de Personas · Diseño de UI con LLM · Multiplicadores IA`

- [ ] **Step 2: Commit Task 2**
  Run:
  ```powershell
  git add laboratorio/superpowers/visuals/2026-06-16-cv-minimalist-templates-visuals.html
  git commit -m "feat(cv-visuals): refactor Spanish CV content for premium UX Product Designer positioning"
  ```

---

### Task 3: Visual Audit & A4 Page Fit Verification
**Files:**
- Modify: `laboratorio/superpowers/visuals/2026-06-16-cv-minimalist-templates-visuals.html`

- [ ] **Step 1: Check A4 bounding boxes and margins**
  Open the file locally or use CLI tools to ensure there are no overflow elements. Adjust margins/paddings if the content is too tall. Specifically, keep padding around sections tight (`py-4` instead of `py-6`, or `space-y-6` instead of `space-y-8`) so that everything remains inside the simulated `min-h-[297mm]` preview card.
- [ ] **Step 2: Final Verification**
  Compare final reframed HTML page structure against requirements of Swiss editorial style (monochrome, no heavy borders, premium fonts).
