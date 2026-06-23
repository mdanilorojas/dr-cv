# Landing v12 — improvement loop log

Sandbox: `dist/landing-v12/` (copy of v11). NOT published, NOT pushed. Deploy still serves v11.

## Done
### Iteration 1 — a11y + SEO conventions (EN index.html)
- og:image:alt + twitter:image:alt, meta author, theme-color
- Person JSON-LD structured data
- skip-to-content link
- focus-visible outline for keyboard nav
- email → real `mailto:` anchor (works w/o JS) + separate copy button w/ aria
- portrait img width/height (CLS) + better alt

### Iteration 2 — mirrored iter-1 into es/index.html
- og/twitter image alt, author, theme-color, Person JSON-LD (jobTitle ES), skip-link (ES copy), focus-visible, mailto+copy, img dims/alt.

### Iteration 3 — work subpages (6 pages: 3 EN + 3 ES)
- og:image:alt (from og:title), author, theme-color, focus-visible outline.
- (skip-link + back-nav already present in subpages.)

### Iteration 4 — hero subhead clarity (EN+ES)
- "Mapping the coordinates…" (vague) → "Eighteen years of senior UX judgment for regulated, high-stakes products — where engineering rigor meets human craft." Front-loads concrete value, keeps the craft poetry. ES mirrored.

## Backlog (next iterations)
- [x] Mirror iteration 1 into es/index.html
- [x] Mirror into work/* subpages
- [x] Hero subhead clarity pass
### Iteration 5 — social-proof section (EN+ES)
- New `#words` section after #work: 3 verified named testimonials (Sheppard, Giraldez, Donner) from perfil/data/testimonials/verified.yaml. Serif-italic quotes matching Notes aesthetic. Added nav link (Words/Citas).
- NOTE: Lauren Donner quote condensed for card length (full text in CV). Sheppard + Giraldez verbatim. All have verbal use-freely permission.
- Unused: Lizzie Salita quote (4th available) — reserve.

### Iteration 6 — persistent nav CTA + contrast verified (EN+ES)
- nav "Contact"/"Contacto" link → bordered button CTA (near-universal pro convention; persistent path to conversion).
- Contrast checked: system-dim #8a8a8a on #030303 ≈ 5.9:1 → passes WCAG AA. No change needed.

### Iteration 7 — hero secondary CTA (EN+ES)
- Added ghost "View selected work"/"Ver trabajo seleccionado" → #work next to primary CTA. Primary+secondary CTA pair is near-universal; improves scent/navigation without competing with the conversion CTA.
- Decided NOT to rewrite Notes/Method/About prose — already crisp; over-editing voice violates surgical principle.

### Iteration 8 — mobile-visible nav CTA (EN+ES)
- Pulled Contact CTA out of the `hidden md:flex` group into an always-visible nav element → persistent conversion path on mobile. Section anchors stay desktop-only (short scroll page; hamburger would be over-engineering).

### Iteration 9 — integrity check + rel=me (EN+ES)
- Tag balance verified after 8 iterations: 7 section, 3 figure, 3 blockquote, 170 div — EN/ES identical. No broken markup.
- Added rel="me" to LinkedIn/GitHub/Behance footer links (identity verification / IndieWeb convention).

### Iteration 10 — nav/lang-switch a11y (EN+ES)
- `aria-label` on <nav> (landmark naming).
- Lang switch: added aria-label ("Ver esta página en español" / "View this page in English"), `lang` attr on target-lang link, and made the active-language token white for clear current-state signal.

### Iteration 11 — decorative SVG a11y (EN+ES)
- aria-hidden="true" on the large hero compass SVG (decorative; SR should skip). Confirmed tailwindcss CLI NOT installed → CDN→compiled-CSS swap stays deferred (won't install+compile blind without browser QA).

### Iteration 12 — section landmark labels (EN+ES)
- aria-label on the 6 id'd regions (notes/work/words/method/about/contact footer) for screen-reader landmark navigation.

## Backlog / known deferred (need tooling or visual QA)
- [x] Mobile nav (Contact CTA now visible on mobile)
- [ ] **#1 PERF (deferred, needs build + browser QA): replace Tailwind CDN runtime compile with a precompiled minified CSS.** Overwhelming majority of pro landings ship compiled CSS; CDN runtime causes FOUC + blocks render. Requires `npx tailwindcss` with the inline config + visual regression check across index/es/work — do not do blind.
- [ ] apple-touch-icon (needs 180x180 PNG — none available)
- [ ] apple-touch-icon / PNG favicon fallback
- [ ] Consider visible "Download CV" once a public CV URL exists
- [ ] Evaluate replacing Tailwind CDN runtime (FOUC/perf) — needs build step
- [ ] Mobile nav: anchors hidden on mobile; consider compact nav
- [ ] Contrast check system-dim text on dark surfaces
- [ ] Replace Tailwind CDN runtime compile (FOUC/perf) — needs build step, evaluate
- [ ] Mobile nav: in-page anchors hidden on mobile; consider compact nav
- [ ] Terminal "v11.0" label decorative — leave or bump
- [ ] Review color contrast of system-dim on accent surfaces
- [ ] Consider testimonial/social-proof section (Jennifer Sheppard, Alexander Giraldez verbal-permission quotes)

## Flags for human (don't auto-change)
- Contact email is hotmail.com on a premium-positioning landing — pro convention = custom-domain email (danilo@danilorojas.design). Decision is Danilo's.
