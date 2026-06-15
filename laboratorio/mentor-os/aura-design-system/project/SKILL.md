---
name: aura-design
description: Use this skill to generate well-branded interfaces and assets for the Aura Design System (Danilo Rojas — danilorojas.design, codename dr-cv V11), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

Aura is a "Warm Huly Refined + AI Product-Tour" system: dark-dominant surfaces, a single warm-orange accent used as punctuation (no glow, no gradients), JetBrains Mono for display/metadata, Inter for UI, Source Serif 4 for the essay surface only. Two themes from one source of truth (dark default, light extends). The signature is embedded AI artifact surfaces (embed / stream / plan / diff / skill-chip) treated as product UI.

Key files:
- `styles.css` — the single stylesheet to link (imports fonts + tokens + components).
- `colors_and_type.css` — source of truth: Layer 1 `--v11-*` tokens, Layer 2 semantic aliases (dark + light).
- `components.css` — all component classes (consume semantic tokens only).
- `components/<group>/` — React primitives; `kitchen-sink.html` shows everything.
- `ui_kits/app` and `ui_kits/landing` — full-screen recreations to copy from.
- `assets/` — DR monogram, blueprint mark, favicon, portrait.

If creating visual artifacts (slides, mocks, throwaway prototypes), copy assets out and produce static HTML files the user can view. If working on production code, copy assets and follow the rules here. Always honor the hard rules: no glow, no gradients, no emoji; accent only as fills/rings/carets/chips; tabular-nums for metrics; outcome-first copy.

If the user invokes this skill without other guidance, ask what they want to build, ask a few questions, and act as an expert designer who outputs HTML artifacts or production code, depending on the need.
