# GPU Shader & Texture Options — 2026-05-08

Research dossier for advanced GPU-accelerated effects on dr-cv landing.
See also: `huly-shader-research.md` (CSS-compositing tricks, L0–L1),
`huly-design-system.md` (Huly scrape reference).

---

**The honest pick:** If you want Apple-grade metallic PBR and volumetric god rays, the price of entry is Three.js + R3F + postprocessing (~200 KB gzipped, 2–4 weeks learning). If you want Huly-grade polish at 1/10th the effort, use Rive for motion and a single custom WebGL shader for the one hero effect (cymatics ring or iridescent sphere). If you're bundle-obsessed, OGL plus hand-written GLSL is the Awwwards route. CSS Houdini is still a 2026 trap — Chrome-only — and Lottie is for icons, not surfaces.

---

## Feasibility Matrix

| Option | Metallic | Cymatics | Iridescence | Volumetric beam | Procedural textures |
|---|---|---|---|---|---|
| Three.js + R3F + drei + postprocessing | **5** | 4 | **5** | **5** | 4 |
| OGL + custom GLSL | 4 | **5** | 4 | 3 | **5** |
| Rive | 1 | 3 | 2 | 1 | 1 |
| Lottie | 1 | 2 | 1 | 1 | 1 |
| Custom WebGL (single fragment shader) | 3 | **5** | 4 | 3 | **5** |
| CSS Houdini Paint Worklet | 1 | 3 | 2 | 1 | 3 |

Scale: 1 = don't attempt, 3 = possible with effort, 5 = native strength.

---

## 1. Three.js + React Three Fiber + drei + postprocessing

**What it is.** The full react-three ecosystem. `three` is the WebGL scene graph, `@react-three/fiber` is the React reconciler, `@react-three/drei` is a helpers library (environments, materials, loaders), `@react-three/postprocessing` wraps the `postprocessing` lib for bloom, god rays, chromatic aberration, DOF. This is the stack behind Apple's marketing pages and most "holy crap" landing pages of the last three years.

**Bundle cost.** `three` ~150 KB gzipped tree-shaken (full build ~600 KB minified), `@react-three/fiber` ~40 KB, `drei` pay-per-import (a loaded `Environment` + `MeshTransmissionMaterial` adds ~25 KB), `postprocessing` ~80 KB. Realistic production bundle: **280–350 KB gzipped** on top of React. Can be used without React via plain `three`. Can be used without a bundler via ESM import maps.

**Browser support.** WebGL2 everywhere since 2022. WebGPU (`three/webgpu`) is opt-in and still rolling out. No issues on Safari 16+, Chrome, Firefox, Edge.

**Learning curve.** Steep for PBR (2–4 weeks to be dangerous, months to master lighting). drei's `<MeshTransmissionMaterial>`, `<Environment preset="city" />`, and `<Lightformer>` give 80% of the "Apple look" out of the box.

**Feasibility.** Metallic (5) — built-in `MeshStandardMaterial` + HDRI environment map. Iridescence (5) — `MeshPhysicalMaterial` has a real `iridescence` PBR layer (KHR_materials_iridescence spec, three r132+). Volumetric beam (5) — `GodRaysEffect` + volumetric cone mesh. Cymatics (4) — custom `ShaderMaterial` with concentric sine. Procedural textures (4) — custom ShaderMaterial or `three-custom-shader-material` package.

**Production:** Stripe Sessions 2024 — https://stripe.com/sessions/2024 — R3F for interactive 3D hero. Framer homepage — https://www.framer.com.

---

## 2. OGL (tiny WebGL library)

**What it is.** Minimal WebGL 1/2 wrapper by Nathan Gordon (`oframe/ogl`). `Program`, `Mesh`, `Geometry`, `Texture`, `RenderTarget` primitives — no scene graph bloat, no PBR abstractions, no loaders. You write GLSL directly.

**Bundle cost.** ~15 KB minified, ~6 KB gzipped. An order of magnitude smaller than three.

**Learning curve.** Shallow for JS setup, steep for GLSL. No `MeshStandardMaterial` safety net.

**Feasibility.** Metallic (4) — doable but you write PBR math. Cymatics (5) — perfect fit, single fragment shader. Iridescence (4) — thin-film interference is ~20 lines of GLSL. Volumetric beam (3). Procedural textures (5) — native sweet spot.

**Production:** Robin Noguier portfolio (Awwwards SOTD) — https://www.robin-noguier.com — uses OGL. Many Awwwards entries: https://www.awwwards.com/sites_of_the_day.

---

## 3. Rive

**What it is.** Design tool + runtime for stateful vector animations. Design in Rive editor (timeline, state machine, constraints, bones), export `.riv` binary, load via `@rive-app/canvas` or `@rive-app/react-canvas`. GPU via Rive Renderer or Skia fallback. **This is what Huly actually uses.** The "shader look" on Huly is Rive state machines + hand-tuned gradients, not WebGL shaders.

**Bundle cost.** WASM runtime ~300 KB (~120 KB gzipped). `.riv` files 20–200 KB. One-time WASM cost amortizes.

**Learning curve.** Low for consumption, medium for authoring (Rive editor is Figma-adjacent, state machines take a week to click). Zero GLSL.

**Feasibility.** Metallic (1) — out of scope. Cymatics (3) — timeline-animated vector circles, reads as "sound ripple" fine. Iridescence (2) — gradient tricks only. Volumetric (1). Procedural textures (1).

**Production:** Huly — https://huly.io. Duolingo mascots — https://www.duolingo.com.

---

## 4. Lottie

**What it is.** After Effects → JSON via Bodymovin, played by `lottie-web`. Vector keyframe only. **No GPU acceleration.** Rive is strictly better for new work.

**Bundle cost.** `lottie-web` ~55 KB gzipped. JSON files 5–50 KB.

**Feasibility.** All 1–2. For icon-scale animations only. Listed here because it gets confused with Rive.

**Production:** https://airbnb.design/lottie.

---

## 5. Custom WebGL with a single fragment shader

**What it is.** Vanilla WebGL, ~50 lines of JS for full-screen triangle + shader compile, plus one `.glsl` file. No library. The approach behind Shadertoy ports to production.

**Bundle cost.** ~2 KB of JS boilerplate + shader string (1–5 KB GLSL). Effectively free.

**Learning curve.** Medium-high for GLSL. Bounded scope. Resources: Inigo Quilez (https://iquilezles.org/articles), Book of Shaders (https://thebookofshaders.com), Shadertoy (https://www.shadertoy.com).

**Feasibility.** Metallic (3) — faked with noise + env map. Cymatics (5) — canonical use case, 15 lines of GLSL. Iridescence (4) — thin-film ports from Shadertoy cleanly. Volumetric beam (3). Procedural textures (5).

**Production:** Codrops tutorials ship on real sites — https://tympanus.net/codrops.

---

## 6. CSS Houdini Paint Worklet

**What it is.** `CSS.paintWorklet.addModule()` registers a JS function that paints to a 2D canvas for any CSS `background: paint(foo)`. Combined with `@property`, procedural CSS driven by the browser's animation loop.

**Bundle cost.** <2 KB worklet.

**Browser support.** **Chrome + Edge only as of 2026.** Safari has not shipped Paint Worklet. Firefox has not shipped it. No timeline announced. This alone kills it for a public landing — excluding ~30% of traffic (Safari + iOS).

**Feasibility.** Metallic (1), iridescence (2), volumetric (1). Cymatics (3). Procedural textures (3) — CPU-rendered per frame, not GPU.

**Production:** Hard to cite — which is itself the verdict. CSS-Tricks demos exist; no major commercial landing depends on Paint Worklet in 2026.

---

## Three tiers

### Tier 1 — Budget / lightweight (<50 KB, 1 week)

**OGL + one custom fragment shader for the hero effect, plus Rive for UI motion.** Pick ONE marquee shader (cymatics ring around the notification bell, or an iridescent sphere) and let everything else be Rive/CSS. Bundle ~130 KB gzipped. Awwwards-adjacent polish without Three.js weight. Learning: 1 week GLSL + 1 week Rive editor.

### Tier 2 — Pragmatic middle (~250 KB, 2–3 weeks)

**Three.js + R3F + drei + postprocessing, single hero scene.** `MeshPhysicalMaterial` with `iridescence` for the signature surface, `GodRaysEffect` for the beam, HDRI environment from drei for metallic reflections. Everything else stays DOM/CSS. Stripe Sessions / Framer playbook. 2–3 weeks if you've touched three before, 4–6 if cold.

### Tier 3 — Maximalist (400+ KB, 6+ weeks)

**Full R3F scene + custom `ShaderMaterial` + Rive for micro-interactions + postprocessing stack.** Apple Vision Pro tier. Requires real GLSL authoring, color/lighting direction, performance tuning. Do not attempt without 6+ weeks. Payoff: page looks like a product, not a portfolio.

**Honest bet:** Tier 1 for v1, evolve to Tier 2 once positioning + copy are validated. Skip Houdini entirely. Lottie only if you already have AE assets.
