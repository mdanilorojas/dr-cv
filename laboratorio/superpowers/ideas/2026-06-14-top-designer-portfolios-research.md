# Research — the 10 best personal portfolios of UI designers in the world

- **Date:** 14 Jun 2026
- **Status:** Research / data. Input to the Aura design-system rethink.
- **Companion:** `2026-06-14-top-designer-portfolios-research.html` (browsable, with live links)
- **Method:** Curated from designer-portfolio roundups (Awwwards, Muzli, Bestfolios,
  Adham Dannaway's list), the "design engineer" canon (ui.land, Maggie Appleton's
  list), and direct fetches of each live site. Theme (dark/light) is best-effort from
  fetch + public evidence; **confirm by eye via the links** — that is exactly why the
  HTML exists.

> **Headline finding (answers Danilo's hypothesis directly):** yes, the world's most
> admired UI-designer personal sites **skew strongly light.** Of the 10, roughly
> **8 are light-dominant**, 1–2 are dark, and most that are light still ship a dark
> *toggle* — dark is an option, not the identity. The exceptions that go dark are the
> course/product sellers (Meng To), not the craft portfolios. **Our current Aura
> rule — "dark is supreme" — is the minority position among the references.** That is
> a tension worth deciding on, not ignoring (see §4).

---

## 1 · The ten

| # | Designer | Site | Known for | Theme | Signature of the page |
|---|---|---|---|---|---|
| 1 | **Rauno Freiberg** | rauno.me | Design engineer (Vercel); UI craft canon | **Light** | Manifesto voice ("Make it fast. Make it beautiful."), mono micro-labels, *Craft* + *Devouring Details* |
| 2 | **Paco Coursey** | paco.me | Design engineer (Linear); `cmdk`, `vaul` | **Dark** / toggle | ⌘K command menu, "perfect dark mode," a *Now* section |
| 3 | **Emil Kowalski** | emilkowal.ski | Design engineer (Linear, Vercel); `Sonner`, `Vaul`, animations.dev | **Light** | Editorial writing on motion + taste; the site *is* the proof |
| 4 | **Brian Lovin** | brianlovin.com | Product designer (GitHub, Campsite) | **Light** | OS/app-shell layout — the portfolio rendered as a desktop product |
| 5 | **Tobias van Schneider** | vanschneider.com | Creative director (ex-Spotify); Semplice | **Light** (bold) | Editorial storytelling, big type, confident color; personality-first |
| 6 | **Adham Dannaway** | adhamdannaway.com | Product designer + front-end dev | **Light** | The iconic split hero: half **designer**, half `<coder>` |
| 7 | **Meng To** | mengto.com | Design+Code founder; SwiftUI/Figma educator | **Dark** | Polished, deep surfaces, product-grade marketing craft |
| 8 | **Tobias Ahlin** | tobiasahlin.com | Design engineer (GitHub, ex-Spotify); SpinKit, Mona Sans | **Light** | Writing on CSS/animation with live motion specimens |
| 9 | **Jim Nielsen** | jim-nielsen.com | Designer-who-codes; web-craft writer (IndieWeb) | **Light** | Blog-forward, near-no-JS, ferociously fast and typographic |
| 10 | **Lynn Fisher** | lynnandtonic.com | Web designer; annual full-site redesigns, CSS art | **Light** (playful) | A new identity every year — the redesign *is* the portfolio |

**Theme tally:** Light 8 · Dark 2 (Meng To; Paco dark-default with toggle). Most "light"
entries also offer a dark toggle. **Light-dominant + restrained accent + dark optional.**

---

## 2 · Per-site notes (what's actually on the page)

- **Rauno Freiberg — rauno.me.** White, near-empty canvas; system sans with mono
  micro-labels; an index that routes to *Craft*, *Projects*, *Devouring Details*,
  *History of Software*, *Field Notes*. Copy-to-clipboard email. The restraint is the
  flex — every pixel earns its place. Light, minimal, refined.
- **Paco Coursey — paco.me.** Single column; sections bio / building / projects /
  writing / *now* / connect. Ships the ⌘K command menu he's known for; author of the
  canonical "perfect dark mode in Next.js." Minimal, intentional, dark-leaning.
- **Emil Kowalski — emilkowal.ski.** Light editorial. Projects (Sonner, Vaul) flow
  into writing on animation and taste; the page demonstrates the motion principles he
  teaches. Refined, legible, calm.
- **Brian Lovin — brianlovin.com.** Light, multi-column **app shell** — it reads like
  a native desktop app (sidebar, panes). Deep content: writing, bookmarks, AMA,
  *Staff Design*. The signature is "my portfolio is a product."
- **Tobias van Schneider — vanschneider.com.** Bold editorial; large type, generous
  color, strong personal voice and storytelling. Proof that "light" needn't mean timid.
- **Adham Dannaway — adhamdannaway.com.** The famous split hero: one portrait, half
  flat-illustrated **designer** and half code-styled `<coder>`. Light, clean,
  systems-focused case studies. One memorable idea, executed once, remembered forever.
- **Meng To — mengto.com.** Dark, glossy, product-grade — closer to a polished SaaS
  landing than a humble portfolio, because he sells courses. Shows how far dark +
  craft can go when the goal is conversion.
- **Tobias Ahlin — tobiasahlin.com.** Light; writing on CSS, animation, brand
  (GitHub's Mona Sans, SpinKit) with **live motion specimens** embedded in the page.
- **Jim Nielsen — jim-nielsen.com.** Light, blog-forward, IndieWeb. Minimal markup,
  near-zero JS, extremely fast, deeply typographic. The anti-spectacle that wins on
  substance and speed.
- **Lynn Fisher — lynnandtonic.com.** Playful, light, CSS-art driven; she rebuilds the
  whole site on a theme every year. The craft of *the page itself* is the portfolio.

---

## 3 · What makes them wonderful (the patterns)

Nine traits recur. None is a gradient, a glow, or an emoji.

1. **Restraint as the flex.** Whitespace, few elements, content-first. The empty space
   signals confidence. (Rauno, Jim Nielsen, Paco)
2. **Typography is the system.** A single excellent sans does the heavy lifting; mono
   micro-labels for metadata; serif when there's reading. Type, not decoration, carries
   the brand. (Rauno, Emil, Tobias Ahlin)
3. **The site is the proof.** Especially for design engineers — the craft of the page
   *demonstrates* the skill. Show, don't list. (Rauno, Paco, Emil, Brian Lovin)
4. **A point of view, in writing.** *Now* pages, field notes, essays, manifestos. These
   are bodies of thought, not galleries. The writing is the moat. (Rauno, Emil, Jim
   Nielsen, van Schneider)
5. **Micro-interactions with taste.** ⌘K palettes, copy-to-clipboard, restrained,
   meaningful motion. Never decorative loops. (Paco, Rauno, Emil)
6. **Web-native: fast, accessible, keyboard-friendly.** Performance and a11y are part
   of the aesthetic. Light + system fonts + minimal JS. (Jim Nielsen, Rauno)
7. **Light-dominant, one restrained accent.** Off-white canvases, a single accent,
   dark offered as a toggle — not the identity. (8 of 10)
8. **Editorial / notebook structure.** Long-form thinking + a few signature projects;
   not 20 exhaustive case studies. (Emil, van Schneider, Jim Nielsen)
9. **One memorable signature idea.** Adham's split, Brian's OS-shell, Lynn's annual
   redesign, Meng's gloss. A single hook you remember. (everyone, in their own way)

---

## 4 · Replanteamiento — what this means for Aura

> Framing: nothing here overrides decisions unilaterally — this is data for Danilo to
> decide on. It consults the Aura tokens and respects the precedence record; where it
> *challenges* a rule, it says so out loud.

**The central tension.** Aura today is **dark-dominant** with a warm accent, and our
decision record makes **"dark is supreme."** The reference set says the opposite for
*portfolio/landing* surfaces: **light wins.** But note the nuance — Aura already runs
**two surfaces**: a dark *app/cockpit* and a light *notebook essay*. The research
doesn't break Aura; it **re-weights** it.

**Recommendations (to fold into Aura as the source of truth):**

1. **Split the theme decision by surface, don't globalize it.**
   - *Landing / portfolio* (the danilorojas.design front door): make **light the
     default** — cream "paper," restrained terracotta accent, dark as a *toggle*. This
     matches the world's best and Danilo's own instinct.
   - *App / mentor cockpit* (`/app`): **dark stays defensible** — tools and dashboards
     (Linear, the design-engineer cockpit) legitimately go dark.
   - This reframes "dark is supreme" → **"dark for the product, light editorial for the
     portfolio."** A decision for Danilo, captured for the record.

2. **Make typography the spine.** Aura already names Inter + JetBrains Mono + Source
   Serif. Double down: mono micro-labels (Rauno), serif reading measure (the essay
   surface), one exceptional sans. Less chrome, more type. *(And self-host them — the
   current CDN dependency is exactly what just produced "caracteres extraños.")*

3. **Buy whitespace, cut components.** The best sites are sparse. Aura's app kit is
   dense (NOC cockpit); the *portfolio* should be the opposite — big margins, few
   elements, content-first.

4. **Lead with a point of view.** Build a *field notes / essays* surface, not just case
   studies. Aura already names the "notebook thesis" — make it real. The writing is the
   moat for the $250k positioning.

5. **Keep one signature idea — and we already have a strong one.** The AI **artifact
   surfaces** (embed / stream / plan / diff / skill-chip) and the *polished-draftsman /
   blueprint* concept are Aura's memorable hook. That is our "Adham split." Protect it;
   don't dilute it with generic components.

6. **Micro-interactions with restraint, honoring reduced-motion.** ⌘K, copy-to-clipboard,
   transform-only entrances. Aura's motion rules already say this — the research confirms
   it's the right call.

**Net:** the research *supports* most of Aura's instincts (restraint, type-led, one
accent, no glow/gradient, signature artifact layer) and **challenges exactly one** —
global dark. Proposed resolution: **light portfolio, dark app.** Decide, then push it
into Aura.

---

## 5 · Honorable mentions / adjacent (famous, but platform- or motion-led)

- **Jordan Singer** (jsngr) — superstar product/AI designer (Figma, Diagram, Mainframe),
  but his presence is more X/Figma-Community than a single portfolio page.
- **Daniel Eden** (daneden.me) — design at Vercel/Meta; Animate.css.
- **Sebastien Gabriel** (sebastiengabriel.com) — Google designer.
- **Bruno Simon** (bruno-simon.com) — legendary 3D/WebGL site, but creative-dev more
  than UI portfolio.
- **Cassie Evans** (cassie.codes) — SVG/animation craft (GSAP), dev-leaning.
- **Frank Chimero** (frankchimero.com) — designer/writer, canonical essays.

---

## 6 · Sources

- https://www.adhamdannaway.com/blog/web-design/design-portfolio-inspiration
- https://muz.li/blog/top-100-most-creative-and-unique-portfolio-websites-of-2025/
- https://www.awwwards.com/websites/winner_category_portfolio/
- https://www.bestfolios.com/
- https://maggieappleton.com/design-engineers
- https://ui.land/interviews/rauno-freiberg · https://ui.land/interviews/paco-coursey
- https://www.killerportfolio.com/by/rauno-freiberg
- Sites: rauno.me · paco.me · emilkowal.ski · brianlovin.com · vanschneider.com ·
  adhamdannaway.com · mengto.com · tobiasahlin.com · jim-nielsen.com · lynnandtonic.com
