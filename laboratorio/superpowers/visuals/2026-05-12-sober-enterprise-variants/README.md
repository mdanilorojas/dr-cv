# Sober-Enterprise CV â€” 4 variants to compare

Base layout: Option A (currently on `main`) â€” moderate typography, 2-col inventory in main column. These are **exploratory HTML mockups**, not generator outputs. Open each in a browser, decide the direction, and the winner becomes the official `bairesdev-sober` variant.

## Shared ground rules across all 4

- **Role line:** "Senior Product Designer Â· Design Systems Â· 15+ years" (no "Agentic Designer")
- **Silenced:** Agentic label, EnRegla, AI skills in sidebar, "346 commits" metric, founder/side-SaaS framing
- **Anchored:** BAH/DoD/Army, Banco Pichincha, Merck, MondelÄ“z, Xentinels DS 10+, WCAG/Section 508, SharePoint SPA, bilingual EN/ES
- **Orange accent:** `#FF8964` (landing v11 signature), used sparingly â€” never on body text

## The four variants

### V1 Â· Quiet Enterprise
*The most conservative version. If in doubt, this is the safe default.*

- **Thesis:** none â€” role line carries the positioning
- **Orange:** a 28mm hairline under the name â€” visually present but easy to miss
- **Inventory:** omitted (kept implicit via sidebar skill pills)
- **Cases:** BAH design system + Xentinels distributed DS
- **Order:** Identity â†’ Skills + Work â†’ Clients + Education â†’ References

### V2 Â· Industries First
*Leads with where you've worked, because conservative buyers scan industries first.*

- **Thesis:** "Fifteen years delivering design in regulated industries â€” defense, banking, pharmaceuticals, consumer goods. Design systems as governance. Accessibility as compliance."
- **Orange:** every `//` section-heading prefix tinted orange (subtle but consistent signal)
- **Inventory:** omitted
- **Industries band:** full-width row under identity listing Defense, Banking, Pharmaceuticals, Consumer goods, Government, Energy (adjacent via DoD)
- **Cases:** BAH + Banco Pichincha (banking-regulated)

### V3 Â· Governance & Scale
*The one that brags about scale without bragging about AI. Keeps the inventory.*

- **Thesis:** "Ten years building and governing **distributed design systems at enterprise scale**. Fifteen years shipping product designâ€¦"
- **Orange:** three proof numbers rendered big-and-orange â€” `15+`, `8+`, `10` â€” below the thesis
- **Inventory:** **kept** (in the main column of page 2, 2-col grid), signals depth on skills
- **Cases:** BAH + Xentinels DS

### V4 Â· Accessibility = Compliance
*The WCAG-forward pitch. Talks their regulatory language.*

- **Thesis:** "Fifteen years of product design where **accessibility is compliance**, not decoration. WCAG 2.1 AA and Section 508 audited inside design tokens."
- **Orange:** one keyword ("accessibility is compliance") tinted orange in the thesis
- **Inventory:** omitted
- **Per-role compliance bullet:** every current role gets an extra `â–¸` line describing the compliance/governance work done there, with an orange `â–¸` marker
- **Cases:** BAH + Banco Pichincha

## How to decide

Open the 4 HTML files side by side. Ignore small content copy â€” focus on:

1. **Scan test** â€” in the first 3 seconds, what does the reader think you do?
2. **Orange intrusion** â€” does the accent feel subtle and branded, or does it feel like a decoration mistake? (It should feel intentional but optional.)
3. **Signal-to-ritual ratio** â€” V2 puts industries up front (high signal for oil & gas / banking), V3 adds a proof-number band (numbers pop), V1 is minimal (maximum legibility, least sell), V4 is compliance-coded (WCAG as opener).
4. **Inventory yes/no** â€” only V3 keeps it. Does the inventory help or hurt for a compliance-minded reader? Either answer is defensible.

## After deciding

Tell me which letter wins. That variant gets:

1. Converted from this mockup into a proper `generadores/templates/cv/bairesdev-sober.ts`
2. Data that supports it extracted into `perfil/data/` (industries list, proof numbers, compliance bullets, etc.)
3. Added to `npm run build:cvs` as a 6th PDF: `dist/cvs/cv-bairesdev-sober-en.pdf`
4. Tests added under `tests/cv-bairesdev-sober.test.ts`

The current AI-forward `bairesdev` variant stays untouched on `main`.
