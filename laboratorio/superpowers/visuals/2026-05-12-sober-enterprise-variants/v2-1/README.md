# Sober-Enterprise V2.1 + 12 exploration variants

V2.1 is the base (V2 with all Danilo's feedback applied). V2.2 through V2.13 are 12 explorations across 4 axes, 3 variants per axis. Open each in a browser, compare side by side, tell me which wins â€” the winner becomes a real generator variant with PDF output.

## V2.1 base â€” the refined ground

**File:** `V2-1-base.html`

All feedback from Danilo applied on top of V2:

- Role line in one line, right-aligned years: `Senior Product Designer Â· Agentic Design` â€” `15 years of experience`
- Industries band: `Department of Defense Â· Banking Â· Pharmaceuticals Â· Consumer Goods Â· Government Â· Energy (regulated)` â€” spelled out, not "DoD adjacent"
- Thesis dropped from 13pt â†’ 11pt
- BAH dates corrected to `2022 â€” Present` (4 years)
- Selected Work: **no border**, orange dot beside company name
- Sidebar: new `In progress` skill group (dashed pills) with enterprise learning-edge skills
- Professional Experience role line rendered in UPPERCASE mono, same treatment as Selected Work meta
- Education typography unified with the rest (mono, UPPERCASE, same scale)
- 6mm breathing room between `Enterprise Clients` and `Education` in the sidebar
- Two font families only: Inter + JetBrains Mono

## Axis 1 â€” Mix sensato (3 controller's picks for variety)

- **V2.2 Â· `mix-proof-numbers`** â€” adds a proof-number band under the thesis: `15+` Â· `8+` Â· `10`. Tests whether numbers land harder than the industries band alone.
- **V2.3 Â· `mix-role-alt`** â€” role line swapped to `Senior Product Designer + Agentic Delivery` (Delivery instead of Design â€” more "operational" feel for ops/energy buyers).
- **V2.4 Â· `mix-orange-assertive`** â€” same content as V2.1 but with assertive orange: bigger dots, first-stack-pill accent-tinted, industries label bolder.

## Axis 2 â€” Role-line formulations

- **V2.5 Â· `role-senior-agentic-design`** â€” `Senior Product Designer Â· Agentic Design` (V2.1 baseline isolated for A/B comparison).
- **V2.6 Â· `role-ds-agentic-delivery`** â€” `Product Designer â€” Design Systems & Agentic Delivery` (wider, signals DS explicitly).
- **V2.7 Â· `role-senior-agentic-practice`** â€” `Senior Product Designer (Agentic practice)` (parenthetical â€” subtlest Agentic mention).

## Axis 3 â€” Orange accent intensity

- **V2.8 Â· `orange-quiet`** â€” all accents desaturated EXCEPT a hairline orange rule under the name (V1-Quiet vibe). Case dots hidden.
- **V2.9 Â· `orange-moderate`** â€” V2.1 baseline.
- **V2.10 Â· `orange-assertive`** â€” same as V2.4, kept in this axis so you see it in an intensity-only comparison.

## Axis 4 â€” Content emphasis

- **V2.11 Â· `content-industries`** â€” V2.1 baseline (industries band leads).
- **V2.12 Â· `content-numbers`** â€” industries band removed, proof-number band in its place, thesis rewritten to lead with numbers.
- **V2.13 Â· `content-compliance`** â€” industries band removed, per-role compliance `â–¸` bullet added, thesis rewritten to open with "Compliance-first".

## How to decide

Open all 13 files side by side (or just the 3 variants of the axis you want to compare). The decision tests:

1. **Scan test** â€” in 3 seconds, does the reader know what you do and that you're senior?
2. **Orange intrusion** â€” does the accent feel intentional or decorative?
3. **Conservative-client feel** â€” if Kinder Morgan's IT/Digital-Transformation Director scanned this for 15 seconds, would they file it as "call him" or "safe generalist, next"?
4. **Agentic calibration** â€” is the Agentic mention present enough to differentiate, subtle enough to not scare?

Once you pick, tell me the variant ID (e.g. "V2.6 wins, but with V2.1's orange intensity"). That composition becomes `generadores/templates/cv/bairesdev-sober.ts`, gets PDF output, and merges.

## Not in scope yet

- No PDF output. HTML-only mockups.
- No generator variant. `bairesdev.ts` (AI-forward) stays untouched on `main`.
- No tests. Written when the winner is promoted.
