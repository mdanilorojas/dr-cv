# EnRegla Design System

> **Brand promise:** *Preciso. Confiable. Protector.*

EnRegla is a SaaS for multi-site permit & compliance management in LATAM (built for Ecuador first). The product centralises operational permits, municipal licences, and regulatory deadlines for companies that operate two, ten, or fifty sedes — replacing WhatsApp threads, lost PDFs, and forgotten expiry dates with one structured expediente per site.

This folder is the brand-and-build canon for that product: tokens, type, colour, components, and UI kits for both the **app** and the **landing**.

---

## Sources

| Source | Path | What we pulled |
|---|---|---|
| App codebase | [`mdanilorojas/enregla`](https://github.com/mdanilorojas/enregla) | Design tokens (`src/styles/design-tokens.css`), shadcn-style ui-v2 components (`src/components/ui/`), `CLAUDE.md` brand brief |
| Landing | [`mdanilorojas/enregla-landing`](https://github.com/mdanilorojas/enregla-landing) | `src/App.tsx` (full landing source), favicon |

The landing repo is private — readers may not have access. Everything we needed has been copied into this design system.

---

## What lives here

| File / folder | Purpose |
|---|---|
| `README.md` | This file — the high-level guide |
| `colors_and_type.css` | Single source of truth for tokens, fonts, type scale |
| `SKILL.md` | Agent-Skills compatible header for Claude Code use |
| `assets/` | Logos, favicons, raw illustrations |
| `preview/` | Design-system tab cards (colors, type, components, etc.) |
| `ui_kits/app/` | High-fidelity recreation of the EnRegla app (dashboard, sedes, permits, network map, public link) |
| `ui_kits/landing/` | Recreation of the marketing landing |

---

## Two surfaces, one brand

EnRegla speaks with two related-but-distinct voices. Recognise which one you're designing for first — the visual rules differ.

### **The App** — *operative cockpit*

- Lives at `enregla.vercel.app` (the dashboard / locations / permits product).
- Voice: helpful, structured, calm. Spanish, `usted`/`tú` mix, professional but not stiff.
- Visual: shadcn-flavoured. Soft rounded corners (`6–8 px`), subtle shadows, deep-blue (`#1E3A8A`) primary, emerald accents on success, risk semaphores on data.
- Typography: **DM Sans** at 14–16 px, friendly humanist sans.
- Density: medium-tight. Tables, badges, cards. Light mode only — users are at their desk during work hours.

### **The Landing** — *editorial dossier*

- Lives at `enregla.app` (the marketing site that sells the product).
- Voice: assertive, slightly tactical. "Operación", "auditoría", "blindar la sede". Not aggressive — *certain*.
- Visual: hard-edge editorial. **Zero border-radius** on cards/buttons, navy `#0A1128` ink, signal-orange `#E65100` CTAs, emerald `#047857` for "vigente". Mock terminal blocks. Hairline borders. Heavy display weights.
- Typography: **Inter** display (heavy, very tight tracking) + **JetBrains Mono** for metadata, status pills, terminal output, file names.
- Density: airy. Big margins. The whitespace is part of the message.

When in doubt: app is *Linear-meets-Notion-for-compliance*. Landing is *broadsheet newspaper for ops directors*.

---

## Content fundamentals

EnRegla is **Spanish-first** (Latin American). Both surfaces.

### Tone & casing

- **Sentence case** for headings. Never Title Case. Period at end of sentence-fragments only when a marketing block uses two short stacked statements.
- Pronouns: the app addresses the user as **`tú`** ("Sube la renovación", "Tu próxima inspección"). The landing alternates between **`tú`** in CTAs ("Solicitar demo") and **third-person assertions** ("EnRegla centraliza…"). Never `usted` — too distant.
- No exclamation marks. No "¡". Confidence beats enthusiasm.
- No emoji in product copy or marketing copy. (Emoji DO appear in the open-source README as section markers — that is internal docs, not a UX surface.)

### Vocabulary the brand owns

These words are load-bearing — use them, don't paraphrase:

> **sede** (site), **permiso** (permit), **expediente** (file/dossier), **vigente** (current/in-force), **vencido** (expired), **por vencer** (about to expire), **renovación**, **trámite** (procedure), **inspección**, **dossier**, **bóveda documental** (document vault), **motor de previsión / motor de alertas** (forecasting engine), **blindar** (to shield/armour — used metaphorically: *"sede blindada"*).

### Examples — copy off the wire

**Landing hero:**
> *Control operativo para permisos y cumplimiento multi-sede.*
> *EnRegla centraliza el estado regulatorio de tu red. Deja de operar con fechas olvidadas, documentos dispersos en WhatsApp y caos de última hora.*

**Landing problem statement:**
> *Operar a ciegas cuesta caro. Las multas no avisan.*

**Landing terminal block (the sub-genre):**
> `> WARN: Detección de vencimiento inminente.`
> `> SYS: Notificando a gerente de operaciones…`
> `> OK: Validación exitosa. Registro actualizado.`

**App empty state:**
> *Aún no hay permisos registrados para esta sede. Sube el primero para activar el motor de alertas.*

**App badge labels (canonical strings):**
> Vigente · Por vencer · Vencido · En trámite · No registrado
> Crítico · Alto · Medio · Bajo

**Number / date formats:**
> Dates: `14 Oct 2026` (day, abbreviated month, year) — never `10/14/2026`.
> Times use 24-hour clock.
> Currency: `$ 1.250,00 USD` (Ecuador uses USD, comma decimal).

### Vibe

- **Operational.** Like a NOC dashboard for legal compliance.
- **Sober.** Adults at work. No tropes, no playfulness, no "Hey 👋 welcome back!".
- **Punctual.** Short paragraphs. Two-clause sentences. Verbs in the active voice.

---

## Visual foundations

### Colour

- **Three brand colours, not five.** Every design uses `Ink Navy` (`#0A1128`) or `Deep Blue` (`#1E3A8A`) for structure, `Defense Orange` (`#E65100` / `#FF5A1F`) sparingly for action, and `Shield Emerald` (`#047857` / `#10B981`) for "you're covered". Slate fills in the rest.
- **Risk colours are sacred.** `crítico → red`, `alto → orange`, `medio → yellow`, `bajo → green`. Don't reassign them.
- **Status colours mirror semantics.** Vigente=emerald, vencido=red, por-vencer=amber, en-trámite=info-blue.
- **No gradients.** Anywhere. The landing uses one near-black `#050A18` solid for the terminal block and one navy `#0A1128` for dark sections — that is it. No purple-blue AI gradients, no neon, no glow.

### Typography

- App: **DM Sans** 14–28 px. Letter-spacing `-0.015em` on body to tighten the humanist sans into something more corporate.
- Landing: **Inter** display weights (700–800) at 48–72 px, *very* tight tracking (`-0.04em`). Body still DM Sans. Metadata in **JetBrains Mono** at 10–11 px uppercase.
- Headings are **sentence case**, balanced wrapping (`text-wrap: balance`), tight leading (`1.05–1.2`).

### Spacing

- 4-pt base. Sections on the landing breathe at `py-24` (96 px). App padding is `p-4`/`p-6`.
- Cards: `p-6` to `p-8` on the landing; `p-4`–`p-6` on the app.

### Backgrounds

- App page background: `#FAFAFA` (legal paper).
- Landing page background: `#F6F7F9` (slightly cooler).
- **Dark sections** on the landing: `#0A1128` (navy). Text on dark goes `#FFFFFF` for headings, `slate-400` (`#94A3B8`) for body.
- **No** background images, no patterns, no gradients, no full-bleed photography. The brand is texture-poor on purpose.
- One exception: the landing hero "card" has a subtle drop-replicate effect — a solid `#0A1128` block translated `+12 px` x/y behind a white card. We've replicated that as a reusable motif.

### Animation

- App: `200–300 ms` `cubic-bezier(0.4, 0, 0.2, 1)`. Fades, slides up `4–12 px`. Risk badges have a slow `2 s` pulse.
- Landing: hero text `fadeUp` (800 ms `cubic-bezier(0.16, 1, 0.3, 1)`) with `blur(4px)` → `0`. Hero box `revealBox` clip-path-inset wipe over `1.2 s`. CTAs do not animate on hover beyond colour swap.
- **No bounces. No springs.** Movement is linear-easing-out. We're a compliance product, not Slack.

### Hover & press

- **Hover (app):** swap to `*-hover` token (slightly deeper colour). Outline buttons darken border to `#0A1128` and add `bg-surface`.
- **Hover (landing):** orange CTA `#E65100 → #BF360C`. Card hover: border `#E5E7EB → #0A1128`, no shadow change.
- **Press:** no scale transform. The landing uses no press state at all — buttons just visit. The app uses Radix focus rings (`ring-2 ring-primary ring-offset-2`).

### Borders

- **Hairlines.** `1 px solid #E5E7EB` (slate-200) is the universal default. Never thicker than `2 px` (used on `border-l-4` accent stripe in the landing terminal card).
- App rounds them at `6–8 px`. Landing keeps them sharp (`0`).

### Shadows

- App: `shadow-sm` (`0 1px 2px rgba(0,0,0,.05)`) on cards. `shadow-lg` only on dropdowns/dialogs.
- Landing: **no shadows on flat elements**. The hero card uses a *displaced solid block* instead of a shadow. Mobile mock uses `shadow-2xl` because it's a phone.

### Layout

- Container max width: `max-w-7xl` (1280 px) on landing, `max-w-screen-2xl` (1536 px) in app shell.
- Sidebar app shell: `260 px` collapsed sidebar + content. Right rail rare.
- Grid: `12-col` on landing sections, `2/3-col` on app feature grids.

### Transparency & blur

- Used **once**: the landing nav is `bg-[#F6F7F9]/90 backdrop-blur-md` so it floats over content while staying readable. Do not introduce more blurred surfaces — this is the only one.
- Modal scrims are `rgba(10,17,40,0.6)` solid, no blur.

### Imagery

- Vibe: **none, currently.** No photography, no illustration, no stock. Both surfaces are pure typographic + UI mockup. If/when imagery is introduced, it should be:
  - cool desaturated colour grade,
  - architectural / interior subject (premises, signage, paperwork on desks),
  - never people-on-laptops stock.

### Corner radii (cheat sheet)

- Landing: **0** everywhere. Hard edges are the entire point.
- App: `4` (radius-sm), `6` (radius-md, default), `8` (radius-lg, cards), `12` (xl), `9999` (pill badges with dot).

### Cards

- App card: `bg-white border border-slate-200 rounded-lg shadow-sm p-6`.
- Landing card: `bg-white border border-slate-200 p-6` (no radius, no shadow). On hover, border darkens to ink navy.
- "Featured permit" landing variant: `border-l-4` accent (orange/slate/emerald depending on state) — this is the *only* place we use a coloured left border.

---

## Iconography

**Icon system: `lucide-react`** (already a dependency in the app codebase). Stroke-based, `1.5 px` stroke, square caps, miter joins. The landing reproduces this style by hand-rolling tiny inline SVGs with `stroke-width="1.5"` `stroke-linecap="square"` `stroke-linejoin="miter"`.

We've copied a curated subset of Lucide SVGs into `assets/icons/` (the ones the product actually uses: shield, upload, lock, arrow-right, check, menu, map-pin, file-text, calendar/clock). For anything not in the subset, pull from the [Lucide CDN](https://lucide.dev) — same stroke style.

**Emoji?** No. The app's open-source README uses emoji as section markers (📋 ✨ 🛠️) — those are dev-docs only and never appear in the product.

**Unicode glyphs?** Avoid. Use a real icon.

**Logo:** EnRegla currently has no figurative mark. The wordmark is `**EnRegla**` (with the period in the landing variant: `EnRegla.`). Both surfaces use a tiny **two-square emblem** as a logomark stand-in:
- a filled `4 × 4 px` ink square,
- a stroked `4 × 4 px` ink square,
- arranged side-by-side with `gap-2`.

This reads as *"sealed + open"* (filled = blindada, outline = en trámite). It's our placeholder identity until a proper mark is commissioned. The favicon for the app is the literal letters **`ER`** in a slate rounded-rect; the favicon for the landing is a richer purple-and-cyan abstract — the two do not match and we should resolve which is canonical (see Caveats in chat).

---

## Index

- **Tokens & type:** [`colors_and_type.css`](./colors_and_type.css)
- **Brand cards:** [`preview/`](./preview/) — colors, type, components, status badges, risk badges, logos
- **App UI kit:** [`ui_kits/app/index.html`](./ui_kits/app/index.html) — dashboard, sedes list, network map, permit detail, public verification
- **Landing UI kit:** [`ui_kits/landing/index.html`](./ui_kits/landing/index.html) — hero, problem/solution, platform, vista-inspección, CTA, footer
- **Assets:** [`assets/`](./assets/) — favicons, icon SVGs

---

*Last updated: 2026-05-06.*
