# Huly.io Design System — Reference Document

> **Fecha de scraping:** 2026-05-07
> **URL base:** https://huly.io
> **Stack detectado:** Next.js 14+ App Router (`app/(website)/...`), Tailwind CSS (custom config), framer-motion o Motion One (inferido por `animate-*` classes y `will-change-transform`), Rive (detectado `rive.b8b719dae3c2060a.wasm` preload), Shiki (code highlight), GoogleTagManager (`GTM-5PP3NPSN`).
> **Assets descargados:** `C:\dev\dr-cv\assets\references\huly\`
> **CSS descargado:** `styles/main-1.css` (3.5 KB, sólo @font-face) y `styles/main-2.css` (114 KB, utilities + custom tokens).

---

## TL;DR — 10 elementos más distintivos del sistema Huly

1. **Fondo base casi-negro azulado** (`#090A0C`) con transición a un **segundo fondo crema-grisáceo** (`#F6F6F6`) que alterna entre secciones. Es el "switcheo de tema" la seña de identidad.
2. **Tipografía monoespaciada custom "esbuild"** para todos los titulares (`font-title`), no una sans-serif decorativa. Genera un look técnico/developer.
3. **Tamaños de headline enormes**: H1 hero a **84px** (desktop), H2 sección a **80px/88px**, con `leading-h2: 0.8` y `tracking-tighter: -0.05em`. Extremadamente condensado.
4. **H1/H2 con gradiente blanco-lila-rosa** aplicado por `bg-clip-text`: `linear-gradient(to bottom right, #fff 30%, #d5d8f6 80%, #fdf7fe)`.
5. **CTA primario con "glow cálido" radial**: pill blanco con un gradiente radial interno `#FFFFF5 → #FFAA81 → #FFDA9F` filtrado con blur. Texto del botón en `#5A250A` (marrón profundo).
6. **Accent azul** `#5683DA` y **accent naranja** `#FF8964` como únicos colores vivos fuera del stack neutro.
7. **Ring / outline con `hsla(0,0%,100%,.4)` y `ring-[6px]`** en las feature cards — efecto de "vidrio enmarcado" blanco semitransparente.
8. **Máscara radial dinámica en hero** (`clip-path: circle(var(--hero-mask-size) at var(--hero-mask-x) var(--hero-mask-y))`) que sigue el cursor con `mix-blend-lighten` y `mix-blend-overlay`. Es el efecto signature.
9. **Fondo decorativo de líneas** (`lines-bg.png`, 595×3167, colocado detrás de la sección MetaBrain): líneas curvas estilo topografía, muy sutiles, dan profundidad sin ruido visual.
10. **Botones de navegación en 11–12 px, UPPERCASE, font-bold, tracking-snug** — tipografía del nav ultra pequeña y técnica, opuesta a la escala dramática de los titulares.

---

## 1.1 Paleta de colores

### Background (fondos)

| Token | Hex | RGB | Uso |
|---|---|---|---|
| `grey-1` | `#090A0C` | `rgb(9,10,12)` | Fondo primario oscuro (hero, CTA section) |
| `grey-2` | `#0C0C0D` | `rgb(12,12,13)` | Feature cards dentro de secciones oscuras |
| `grey-5` | `#0B0C0E` | `rgb(11,12,14)` | Variante fondo profundo |
| `grey-10` | `#18191B` | `rgb(24,25,27)` | Elevated surface oscuro |
| `grey-20` | `#303236` | `rgb(48,50,54)` | Toolbar / chip / code-highlight bg |
| `grey-30` | `#4A4B50` | `rgb(74,75,80)` | Dividers, separadores |
| `grey-94` | `#EFEFF0` | `rgb(239,239,240)` | Avatar/chip sobre fondo claro |
| `grey-98` | `#FAFAFA` | `rgb(250,250,250)` | Pill backgrounds claros |
| `light-bg-1` | `#F6F6F6` | - | Fondo "claro alterno" (sección `Unmatched productivity`, sección Knowledge) |
| `dark-alt` | `#111111` | - | Fondo de la sección "Sync with GitHub" |
| `dark-alt-2` | `#0B0C0F` | - | Botón secundario ("Join our Slack") |

### Text (texto)

| Token | Hex | Uso |
|---|---|---|
| `white` | `#FFFFFF` | Titulares oscuros, CTA secondary text |
| `grey-90` | `#E5E5E7` | Párrafos sobre fondo oscuro (body copy) |
| `grey-85` | `#D7D8DB` | Body text variante |
| `grey-80` | `#C9CBCF` | Subtítulos secundarios, iconos de footer |
| `grey-70` | `#B0B2B7` | Text "Tap here to continue…" sobre fondo claro |
| `grey-60` | `#95979E` | Párrafos secundarios (sobre dark) |
| `grey-50` | `#797D86` | Descripciones bajo ítems de nav ("Read our latest insights") |
| `grey-40` | `#61656B` | Footer copyright |
| `grey-30` | `#4A4B50` | Body sobre fondo claro |
| `grey-20` | `#303236` | Text primary sobre fondo claro |
| `grey-5` | `#0B0C0E` | Headings sobre fondo claro |

### Accent colors (únicos colores vivos)

| Token | Hex | RGB | Uso |
|---|---|---|---|
| `blue` | `#5683DA` | `rgb(86,131,218)` | Link hover, iconos GitHub, pin azul "Collaborate" |
| `blue-variant` | `#478BEB` | - | Glow de iconos (GitHub features) |
| `blue-deep` | `#3D7EFF` | - | Hover Ghost |
| `blue-light` | `#6DA6FB` | `rgb(109,166,251)` | Light ring variant |
| `blue-cool` | `#4DA6FF` | - | Link/hover secundario |
| `orange` | `#FF8964` | `rgb(255,137,100)` | Tinte strong, "pin" naranja del MetaBrain, border accent |
| `orange-deep` | `#F58041` | - | Gradientes decorativos |
| `orange-burn` | `#CD3100` | - | Acento intenso (raro, sólo usado en gradientes) |
| `cta-text` | `#5A250A` | - | Color del texto del CTA primario ("See in Action") |
| `code-keyword` | `#FF4D89` | - | Shiki keyword highlight |
| `code-function` | `#4DA6FF` | - | Shiki function |
| `code-string` | `#00CA53` | - | Shiki string |
| `code-string-expr` | `#47D18C` | - | Shiki string expression |
| `code-constant` | `#BF6AFB` | - | Shiki constants |
| `code-parameter` | `#FF990A` | - | Shiki parameters |
| `code-comment` | `#777A88` | - | Shiki comments |
| `code-bg` | `#111112` | - | Shiki background |
| `shadow-dot-accent` | `#DCDBFF` | - | Dotted-loader accent |
| `warm-accent-1` | `#E7A87B` | - | Gradiente cálido decorativo |
| `warm-accent-2` | `#F8E6DD` | - | Gradiente cálido superior |
| `warm-accent-3` | `#CBD3EB` | - | Gradiente cálido inferior |

### Gradientes (EXACTOS)

**1. Headline gradient (H1, H2 "Join the Movement")** — aplicado con `bg-clip-text`:
```css
background: linear-gradient(to bottom right, #fff 30%, #d5d8f6 80%, #fdf7fe);
```

**2. CTA "See in Action" — glow radial dentro del pill (doble capa):**
```css
/* Capa interna (nítida) */
background: radial-gradient(50% 50% at 50% 50%,
  #FFFFF5 3.5%,
  #FFAA81 26.5%,
  #FFDA9F 37.5%,
  rgba(255,170,129,0.50) 49%,
  rgba(210,106,58,0.00) 92.5%);

/* Capa externa (blur 5px) */
background: radial-gradient(43.3% 44.23% at 50% 49.51%,
  #FFFFF7 29%,
  #FFFACD 48.5%,
  #F4D2BF 60.71%,
  rgba(214,211,210,0.00) 100%);
filter: blur(5px);
```

**3. Mask fade inferior del hero** (fade-to-black):
```css
background: linear-gradient(to bottom, rgba(9,10,12,0) 0%, #090A0C 50%);
```

**4. Mask lateral en infinity scroller** (ambos lados):
```css
background: linear-gradient(90deg, #090A0C 28.3%, rgba(9,10,12,0) 100%);
background: linear-gradient(270deg, #090A0C 28.3%, rgba(9,10,12,0) 100%);
```

**5. Decorative gradients del MetaBrain/fondo claro** (warm pastel):
```css
/* warm sunset (izquierdo a derecho) */
background: linear-gradient(180deg, #f8e6dd 15%, #cbd3eb 83.5%);
background: linear-gradient(180deg, #e7a87b 33.85%, hsla(25,69%,69%,0) 100%);
background: linear-gradient(180deg, #f8e6dd 17.05%, hsla(20,66%,92%,0) 100%);
```

**6. Feature icon glow circular (GitHub section)** — sobre cada ícono, mix-blend-plus-lighter:
```css
background: linear-gradient(180deg, #478BEB 60%, rgba(71,139,235,0) 100%);
opacity: 0.6;
mix-blend-mode: plus-lighter;
filter: blur(24px);
```

**7. Gradientes rainbow decorativos (usados en líneas/trazos finos):**
```css
linear-gradient(90deg, #9fffff, #57aaf9 51.33%, #588bf8);
linear-gradient(90deg, #e4ffff 0.61%, #628eff 24.99%, #725eff 78.85%, #ffdeff 99.78%);
linear-gradient(90deg, #95efff, #5cacf8 49.2%, #5caaf2);
linear-gradient(90deg, #f58041, #ac795c 25.6%, #887064 41.58%, #716a69 56.98%, #61656b 69.44%);
```

**8. "Dark shimmer" horizontal** (dividers y efectos de barrido):
```css
linear-gradient(270deg, #2d2f31, #2d2f31 40%, #835549 88.5%, #ca9a8c);
linear-gradient(90deg, #443d59, #2d2f31 50.9%);
```

### Overlays / Glass effects

- **Ring blanco sobre feature cards**: `ring: 6px solid rgba(255,255,255,0.40)` — el card tiene `outline: white/60` y `outline-4` en algunos casos (`outline-color: rgba(255,255,255,0.60)`).
- **Alpha whites** usados recurrentemente: `hsla(0,0%,100%,.05)`, `.1`, `.15`, `.2`, `.25`, `.3`, `.4`, `.5`, `.6`, `.65`, `.9`.
- **Backdrop-filter**: `backdrop-filter: blur(1px)` (muy sutil, detectado sólo una vez — Huly evita glassmorphism pesado).
- **Blur filters** disponibles: `blur(2px)`, `blur(4px)`, `blur(5px)`, `blur(7px)`, `blur(8px)`, `blur(12px)`, `blur(15px)`, `blur(40px)`, `blur(64px)`.
- **Mix-blend modes** detectados: `mix-blend-mode: lighten`, `overlay`, `plus-lighter` (para glows).

### Box shadows (12 variantes)

```css
0px 4px 6px 0px rgba(0,0,0,0.15);    /* subtle */
0px 4px 10px 0px rgba(0,0,0,0.15);   /* card light */
0px 4px 16px 0px rgba(0,0,0,0.35);   /* #00000059 */
0px 4px 25px rgba(11,13,16,0.80);    /* strong dark */
0px 6px 25px 0px rgba(0,0,0,0.50);   /* pin idle */
0px 10px 20px 0px rgba(0,0,0,0.50);  /* toolbar float */
0px 14px 20px rgba(0,0,0,0.50);      /* card hover */
0px 14px 24px rgba(0,0,0,0.90);      /* deep card hover */
0px 14px 30px 0px rgba(0,0,0,0.50);  /* pin active */
4px 6px 25px rgba(0,0,0,0.56);       /* asymmetric */
4px 14px 25px 0px rgba(0,0,0,0.56);  /* asymmetric-strong */
-4px 9px 18.6px 0px rgba(0,0,0,0.47);/* left-tilt */
```

---

## 1.2 Tipografía

### Font families (3 custom + fallbacks)

```css
/* Inter — body text (variable 100-900, latin subset) */
@font-face {
  font-family: __Inter_f367f3;
  src: url(/_next/static/media/e4af272ccee01ff0-s.p.woff2) format("woff2");
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}
/* Fallback adjustment */
@font-face {
  font-family: __Inter_Fallback_f367f3;
  src: local("Arial");
  ascent-override: 90.49%;
  descent-override: 22.56%;
  line-gap-override: 0.00%;
  size-adjust: 107.06%;
}

/* esbuild — TITULARES (monospace humanista custom) */
@font-face {
  font-family: __esbuild_b38aaf;
  src: url(/_next/static/media/14d7ce3e41dcbb66-s.p.woff2) format("woff2"); /* 400 */
  src: url(/_next/static/media/e8b276476c0ac6fa-s.p.woff2) format("woff2"); /* 500 */
  src: url(/_next/static/media/1b0b3615811be75b-s.p.woff2) format("woff2"); /* 600 */
  font-display: swap;
}

/* SF Mono — code blocks (Shiki) */
@font-face {
  font-family: __sf_0aa2f2;
  src: url(/_next/static/media/c92e08b531692979-s.p.woff2) format("woff2");
  font-weight: 400;
}
```

**Stack final aplicado:**
- `--font-inter: "__Inter_f367f3", "__Inter_Fallback_f367f3"` + UI fallback: `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`.
- `--font-esbuild: "__esbuild_b38aaf", "__esbuild_Fallback_b38aaf"` + UI fallback: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`.
- `--font-mono: "__sf_0aa2f2", "__sf_Fallback_0aa2f2"` (SF Mono).
- `.font-title` clase aplica esbuild — **toda heading (h1/h2/h3) usa esbuild (monospace custom)**.

> **INFERENCIA:** "esbuild" es una fuente propietaria desarrollada por Hardcore Engineering / Huly Labs. No aparece en Google Fonts. Para replicar, los candidatos open-source más cercanos son **Geist Mono**, **JetBrains Mono**, o **Commit Mono**. Los archivos `.woff2` están descargados en `assets/references/huly/fonts/` pero el uso comercial fuera de huly.io es jurídicamente incierto.

### Tamaños (EXACTOS, px)

| Uso | Desktop | lg (≤1279px) | md (≤1023px) | sm (≤767px) | Clase Tailwind |
|---|---|---|---|---|---|
| H1 hero | 84px | 72px | 56px | 32px | `text-84 lg:text-72 md:text-56 sm:text-32` |
| H2 section | 80px | 80px | 64px | 36px | `text-80 md:text-64 sm:text-36` |
| H2 "Unmatched productivity" | 80px | 88px (lg) | 64px | 36px | (raro: lg ES más grande) |
| H2 "Join the Movement" | 80px | 80px | 56px | 44px | — |
| H2 "Knowledge" | 80px | 80px | 54px | 36px | — |
| H3 feature (grande) | 32px | 28px | 24px | 20px | `text-32 lg:text-28 md:text-24 sm:text-20` |
| H3 feature (medio) | 28px | 24px | — | 20px | — |
| Hero subheadline | 18px | 18px | 16px | 15px | `text-18 md:text-16 sm:text-15` |
| Body párrafo sobre claro | 22px | 20px | 15px | 14px | (sección Knowledge) |
| Body standard | 16px (default) | — | — | 15px | — |
| Nav links | 14px | — | — | — | `text-14` |
| CTA pill text | 12px | — | — | — | `text-12 uppercase font-bold` |
| Button "Sign In/Up" | 11px | — | — | — | `text-11 uppercase font-bold` |
| Card description | 15px | 13px | 12px | — | — |

Todas las escalas custom existentes en CSS: 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 20, 22, 24, 28, 32, 36, 40, 44, 48, 52, 54, 56, 64, 72, 80, 84, 88 px.

### Font weights usados

| Peso | Uso |
|---|---|
| 300 | `font-light` — descripciones y card captions |
| 400 | Regular (default) |
| 500 | `font-medium` — H2 "Join the Movement" y "GitHub", strong en body |
| 600 | `font-semibold` — H1, H2 principales |
| 700 | `font-bold` — CTAs uppercase |
| 800, 900 | Definidos pero no usados prominentemente |

### Letter-spacing (tracking)

| Clase | Valor | Uso |
|---|---|---|
| `tracking-snug` | `-0.01em` | Botones "Sign In/Sign Up" |
| `tracking-snugger` | `-0.02em` | Nav links, body copy, H3s |
| `tracking-tight` | `-0.04em` | H1, párrafos hero |
| `tracking-tighter` | `-0.05em` | H2 principales ("Unmatched productivity", "Knowledge") |
| Arbitrary | `-0.015em` | CTA button text |
| Arbitrary | `-0.03em` | H2 "Join the Movement" |

### Line-height

| Clase | Valor | Uso |
|---|---|---|
| `leading-h2` | `0.8` | H2 principales (ultra-apretado) |
| `leading-none` | `1` | H3 titulares feature |
| `leading-dense` | `1.125` | Sub-items de nav |
| `leading-tight` | `1.25` | Body sobre fondo claro |
| `leading-snug` | `1.375` | Párrafos generales |
| Arbitrary | `0.9` | H1 hero |

### Casing

- **UPPERCASE bold** para CTAs pills: `Start Free`, `See in Action`, `Sign In`, `Sign Up`, `Star Us`.
- **Sentence case** para navegación: `Pricing`, `Resources`, `Community`, `Download`.
- **Title Case** para H1/H2: `Everything App for your teams`, `Unmatched productivity`, `Join the Movement`.
- **No small-caps, no all-caps en body.**

---

## 1.3 Spacing y layout

### Grid y containers

| Token | Max-width | Padding lateral |
|---|---|---|
| `.container` | `80rem` (1280px) | `2rem` (32px), `1.25rem` (20px) en mobile |
| `.container-narrow` | `64rem` (1024px) | `4rem` / `2rem` / `1.25rem` responsive |
| `.container-wide` | `1408px` | `2rem` / `1.25rem` |
| `.container-ultra-narrow` | `960px → 860 → 635 → 470 → 410 → 340` | — |

Ejemplos de grids reales:
- MetaBrain / Knowledge section: `grid-cols-[264px_1fr]` con `gap-x-[181px]`, responsive hasta `grid-cols-[177px_1fr]` en md.
- GitHub features: `grid-cols-3 gap-x-24 gap-y-20 lg:gap-x-[76px] lg:gap-y-14 md:gap-x-16 md:gap-y-12 sm:grid-cols-1`.
- Hero productivity cards: `flex flex-wrap gap-5` con items de anchos fijos 428px / 768px (desktop) que colapsan a 308/572 (lg) / 252/436 (md).

### Section padding (vertical)

Ejemplos medidos en el HTML:
- GitHub section: `pt-[131px] pb-[180px] lg:pt-24 lg:pb-[131px] md:py-24 sm:py-16`
- MetaBrain: `pt-[247px] pb-[180px] xl:py-32 md:pb-24 md:pt-[100px] sm:pb-[72px] sm:pt-16`
- Knowledge: `pb-[247px] lg:pb-[102px] md:pb-[94px] sm:pb-[72px]`
- CTA final "Join the Movement": `pb-[294px] pt-[152px] lg:pb-[251px] lg:pt-[109px] md:pb-[190px] md:pt-[77px] sm:pb-[235px] sm:pt-[266px]`

**Patrón:** padding vertical extremo (≥120px arriba, ≥150px abajo en desktop; reducido a 60–80px en mobile).

### Gap base

- `gap-5` (20px) en card grids productividad.
- `gap-4.5` (18px) en MetaBrain cards.
- `gap-x-24` (96px) en features GitHub (generoso).
- `gap-[31px]` (arbitrary) entre botones CTA.

### Border-radius estándar

| Valor | Uso |
|---|---|
| `4px` (`rounded`) | Botones secundarios pequeños |
| `6px` (`rounded-md`) | Cajas de herramientas compactas |
| `7px` (`rounded-[7px]`) | — |
| `8px` (`rounded-lg`) | Avatar containers |
| `10px` (`rounded-[10px]`) | Hero illustration, billboard images |
| `12px` (`rounded-xl`) | **Cards principales (feature cards productividad)** |
| `14px` (`rounded-[14px]`) | Resources/Community dropdown items |
| `18px` (`rounded-[18px]`) | — |
| `20px` (`rounded-[20px]`) | Mobile MetaBrain cards |
| `24px` (`rounded-[24px]`, `rounded-3xl`) | MetaBrain cards md |
| `30px` (`rounded-[30px]`) | MetaBrain cards desktop |
| `50%` | Pins, iconos circulares |
| `9999px` (`rounded-full`) | **Todos los CTAs pill** |

### Breakpoints

Todos declarados como `max-width` (Tailwind invertido):

| Breakpoint | Max-width | Equivalencia estándar |
|---|---|---|
| `2xs` | 413px | Very small phone |
| `xs` | 639px | Phone |
| `sm` | 767px | Large phone / small tablet |
| `md` | 1023px | Tablet |
| `lg` | 1279px | Laptop |
| `xl` | 1439px | Desktop |

**Default:** desktop-first; los modificadores `md:`, `sm:`, `xs:` aplican en pantallas MÁS PEQUEÑAS.

---

## 1.4 Componentes identificados

### Header / Nav (fixed top, transparent over hero)

**Estructura:**
```html
<nav>
  <a href="/"><img src="/logo.svg" alt="Huly logo" width="71" height="24"/></a>
  <ul>
    <li><a class="text-14 text-white hover:text-blue">Pricing</a></li>
    <li><button class="text-14">Resources <chevron/></button>
      <!-- dropdown: rounded-[14px] hover:bg-grey-10 p-2 -->
      <ul>
        <li><a><span class="text-14 text-white">Blog</span>
           <span class="text-14 font-light text-grey-50">Read our latest insights</span></a></li>
        <!-- Docs, X.com, LinkedIn, Youtube, Slack, GitHub, Telegram -->
      </ul>
    </li>
    <li><a>Download</a></li>
    <li><a href="/github">Star Us <github-icon/></a></li>
    <li><a class="uppercase font-bold text-11 border-button-grey">Sign In</a></li>
    <li><a class="uppercase font-bold text-11 border-button-grey">Sign Up</a></li>
  </ul>
</nav>
```

Claves:
- Logo **71×24 px** SVG (wordmark blanco).
- Links a `text-14 text-white transition-colors duration-200 hover:text-blue`.
- Dropdowns con cada ítem en **rounded-[14px]** y hover `bg-grey-10` (#18191B).
- Botones Sign In / Sign Up: **h-8 px-4 text-11 uppercase font-bold**.

### Hero section

**Estructura:**
```html
<section class="relative min-h-screen bg-grey-1">
  <div class="container relative z-30">
    <h1 class="text-84 font-semibold leading-[0.9] tracking-tight bg-gradient-to-br from-white from-30% via-[#d5d8f6] via-80% to-[#fdf7fe] bg-clip-text text-transparent">
      Everything App for your teams
    </h1>
    <p class="mt-5 text-18 text-grey-90 max-w-md">Huly, an open-source platform…</p>
    <!-- CTA pill with glow -->
    <div class="relative inline-flex">
      <div class="border-button-light-blur absolute …"></div> <!-- glow aura -->
      <a class="uppercase font-bold text-12 rounded-full h-10 px-16 bg-[#d1d1d1] border border-white/60">
        <div class="absolute -z-10"><!-- radial gradient glow --></div>
        <span class="text-[#5A250A]">See in Action</span>
        <svg class="text-[#5A250A]">→</svg>
      </a>
    </div>
  </div>

  <!-- Decorative layers -->
  <div class="absolute bottom-0 aspect-[1.067842] w-[1574px]" style="--hero-mask-x:0; --hero-mask-y:0;">
    <div class="mix-blend-lighten"><!-- aurora illustration 1920px wide --></div>
    <div class="[clip-path:circle(var(--hero-mask-size)_at_var(--hero-mask-x)_var(--hero-mask-y))] mix-blend-overlay">
      <img src="/hero-mask-1.svg"/> <!-- rainbow lines mask -->
      <img src="/hero-mask-2.svg"/>
    </div>
    <img src="/hero-illustration.jpg"/> <!-- product screenshot, rounded-t-[10px] -->
  </div>

  <!-- Infinity scroll ribbon at bottom of hero -->
  <div class="text-14 tracking-snugger">
    <p class="text-white/60">Everything you need for productive team work:</p>
    <ul class="animate-infinityScroll font-semibold text-white">
      <li>Team Planner</li> • <li>Project Management</li> • <li>Virtual Office</li>
      <li>Chat</li> • <li>Documents</li> • <li>Inbox</li>
    </ul>
  </div>

  <!-- Bottom fade mask -->
  <div class="absolute bottom-0 h-[340px] bg-gradient-to-b from-grey-1/0 to-grey-1 to-50%"></div>
</section>
```

### Feature cards (productivity section)

- `rounded-xl` (12px), `bg-grey-2` (#0C0C0D), **`ring-[6px] ring-white/40`** = anillo blanco difuso grueso (signature).
- `bg-clip-padding` para que el ring no se colorée por dentro.
- Alturas fijas: `h-[420px]` (desktop) → `h-[300px]` (lg) → `h-[260px]` (md). En mobile `sm:w-full`.
- Anchos alternados: tiles de 428px y 768px que componen un pattern asimétrico.
- Copy en esquina inferior-izquierda: `<span class="font-medium text-white">TITLE.</span> Description in text-white/65`.
- Fade lineal inferior en mobile: `after:bg-[linear-gradient(180deg,rgba(9,10,12,0)_0%,#090A0C_40.76%)] after:blur-md`.

### CTA buttons (primario y secundario)

**Primario ("See in Action"):**
```css
/* Pill base */
height: 40px;
padding: 0 64px;      /* px-16 */
border-radius: 9999px;
background: #D1D1D1;
border: 1px solid rgba(255,255,255,0.60);
color: #5A250A;
text-transform: uppercase;
font-weight: 700;
font-size: 12px;
letter-spacing: -0.015em;

/* Interior glow (pseudo, via absolute layers) */
/* Layer A: radial-gradient sharp */
/* Layer B: radial-gradient blurred 5px */

/* Exterior glow (separate absolute element) */
/* border-button-light-blur: h-[calc(100%+9px)] w-[calc(100%+9px)] rounded-full */
```
Referencia de la "aura" exterior: archivo `cta-button-glow.svg` (174×40 PNG-style SVG).

**Secundario ("Join our Slack"):**
```css
height: 40px;
padding: 0 24px 0 20px;
border-radius: 9999px;
background: #0B0C0F;
border: 1px solid rgba(255,255,255,0.10);
color: #FFFFFF;
text-transform: uppercase;
font-weight: 700;
font-size: 12px;
letter-spacing: -0.01em;  /* tracking-snug */
/* hover: border-white/15 */
```

**Header "Sign In / Sign Up":**
```css
height: 32px; padding: 0 16px;
text-transform: uppercase;
font-weight: 700;
font-size: 11px;
/* class border-button-grey (no pudo extraerse el valor exacto; inferencia: 1px solid rgba(255,255,255,0.2)) */
```

**Pricing plan CTA ("Start Free"):** altura 56px (`h-14`), `text-18 text-white rounded-full border border-white/20 hover:border-white/50`, plan "Common" usa bg blanco + texto negro (CTA destacado).

### Section dividers

- No hay dividers gráficos; la separación es por **cambio de color de fondo** (dark `#090A0C` → light `#F6F6F6` → dark `#111111` → light `#F6F6F6`).
- Transiciones se enmascaran con gradients bottom-fade.
- Entre hero y productividad: un **ring de 340px de alto** con gradient from `grey-1/0` to `grey-1` actúa como vignette (fade-out).

### Footer

```html
<footer class="absolute bottom-0 py-[17px]">
  <div class="container flex items-center text-14 leading-none tracking-snugger">
    <p class="text-grey-40">Copyright © 2026 <a href="https://hulylabs.com">Huly Labs</a>. All rights reserved.</p>
    <ul><!-- Terms of Service | Privacy Policy -->
      <a class="text-grey-80 hover:text-white">Terms of Service</a>
      <a>Privacy Policy</a>
    </ul>
    <ul><!-- Social icons, 18×18, opacity-80 hover:opacity-100 -->
      <!-- Twitter, LinkedIn, GitHub, YouTube, Slack, Blog, Telegram -->
      <!-- Cada ícono es SVG con linearGradient fill: stop-color #C9CBCF → #C9CBCF@0.8 -->
    </ul>
  </div>
</footer>
```

Notas:
- Footer es **absolute** dentro del layout (no sticky, queda al final de la última sección).
- Iconos usan `fill: url(#gradient)` con `linearGradient` definido inline — todos del mismo gris `#C9CBCF` con degradé vertical a 0.8 de opacidad.
- Excepcionalmente, el icono Blog tiene un **segundo linearGradient opacity 0.4** con color `#FF5F0B` para crear un acento naranja sutil sobre el hover.

### Testimonials

**INFERENCIA:** No se encontraron testimonials en la home actual. Sección ausente en home.html.

### Pricing cards

Observado en `/pricing`:
- 4 tiers (Common / Rare / Epic / Legendary) + 1 Custom.
- Cards uniformes, sin "most popular" highlight.
- Nombres con aura de **Magic the Gathering / rarezas** (Common, Rare, Epic, Legendary) — elección de copy distintiva.
- Iconos por tier (SVG badge únicos, no descargados).
- Checkmarks hechos con SVG inline base64: stroke `#fff` stroke-width `1.829` path `m13.33 4-7.333 7.333L2.664 8`.
- H3 tier name: `text-20 font-semibold leading-snug tracking-tight sm:text-16`.
- CTA "Start Free" en todos: `h-14 text-18 rounded-full` — Common tier usa `bg-white text-black` (destacado), los demás `border-white/20`.

---

## 1.5 Texturas y efectos visuales (CRÍTICO)

### Background patterns

1. **`lines-bg.png`** — Archivo PNG 595×3167 px colocado detrás de la sección Knowledge como `absolute -bottom-[247px] -left-[153px] -z-10`, `max-w-[480px]` en md. Son líneas onduladas tipo topografía/wave (estilo Apple keynote). **Guardado en `assets/references/huly/images/lines-bg.png`**.

2. **Hero mask SVGs** (`0f9e183a12bee7af6da9f9a175c71d3a.svg` = `hero-mask-1.svg` y `e4c3a7bd600393b1420b0ffef056534d.svg` = `hero-mask-2.svg`). Son trazos curvilíneos rainbow aplicados con `mix-blend-mode: overlay` y `clip-path: circle(var(--hero-mask-size) at var(--hero-mask-x) var(--hero-mask-y))` — reveal interactivo bajo cursor.

3. **MetaBrain decorative SVGs** (`metabrain-decor-1.svg`, `-2.svg`, `-3.svg`) — pequeñas formas sueltas (blobs o splashes) que flotan detrás de los cards. Cada uno ~900 bytes, simples.

4. **Fondos alternos de sección** (sin imagen): color sólido `#090A0C` vs `#F6F6F6` vs `#111111` que alterna como pattern rítmico.

### Glow effects

1. **CTA Glow** (radial-gradient warm): **fondo del botón principal** + un hermano `.border-button-light-blur` con `width:+9px; height:+9px` que simula un halo. Hay un SVG externo (`cta-button-glow.svg`) superpuesto como "aura estática" para reforzar.

2. **GitHub feature icon glow**: Cada ícono tiene `::after` con `bg-[linear-gradient(180deg,#478BEB_60%,rgba(71,139,235,0)_100%)]`, `opacity-60`, `mix-blend-plus-lighter`, `blur-2xl`. Esto genera un brillito azul detrás de cada SVG técnico.

3. **Pin glows** (Knowledge section): cada pin tiene `border-2` de color (blue/orange) + `shadow-[0px_6px_25px_0px_#00000080]` idle y `shadow-[0px_14px_30px_0px_#00000080]` active, además de `border-blue` / `border-orange`.

### Blur effects

- `backdrop-filter: blur(1px)` aplicado marginalmente (Huly evita glassmorphism clásico).
- `filter: blur(5px)` en la capa blurred del CTA glow.
- `blur-md` (12px) en fades de feature cards.
- `blur-2xl` (40px) en GitHub icon glows.

### Parallax layers

**INFERENCIA** (no puedo ejecutar JS para verificar): el hero tiene **3 capas superpuestas** con `aspect-[1.067842]` y tamaños distintos (1574px, 1920px, 1024px width), posicionadas con `absolute` y `left/bottom` negativos. Probablemente hay un scroll-linked offset en JS (framer-motion `useScroll` o similar) aunque no está inline en el HTML estático. La máscara radial del hero sí claramente responde al cursor (`--hero-mask-x/y` como CSS vars actualizadas vía JS).

### Hover animations

- `transition-colors duration-200` en todos los links (color `0.2s`).
- `transition-all duration-200` en CTAs y botones.
- `transition-all duration-500 hover:bg-opacity-85` en pricing CTAs.
- Pins (`group`): `group-active:translate-y-[-15px] group-active:scale-[1.05] group-active:shadow-[0px_14px_30px_0px_#00000080]` — levitan al click/drag.
- `transform-gpu` y `will-change-transform` sugieren GPU accel para efectos del hero.

### Scroll-triggered reveals

El HTML estático tiene elementos con `style="opacity:0"` y `style="transform:translateY(14px) translateZ(0)"`, lo cual sugiere:
- **Fade-in desde abajo**: `translateY(14px) → 0` + `opacity 0 → 1`.
- Duración típica: `duration-300` o `duration-500` (clases observadas: `transition-opacity duration-300 ease-in-out`).
- En la sección Knowledge hay timings largos declarados: `[transition:background_1.5s_2s,color_0.5s_1.5s]` — un efecto de highlight amarillo que se barre progresivamente, con delay de 2s y duración 1.5s.

### Shaders / Canvas

- **Rive animations**: `<link rel="preload" href="/_next/static/rive.b8b719dae3c2060a.wasm" as="fetch">` confirma que Huly carga el runtime de Rive. Hay divs con `[&_canvas]:!h-full [&_canvas]:!w-full` que sugieren contenedores Rive (probablemente el GitHub Octocat animado y el sticky card "Version History" en Knowledge section).
- No hay WebGL custom shader directo detectado.

### Decorative SVGs recurrentes

| Archivo | Descripción | Uso |
|---|---|---|
| `hero-mask-1.svg` | Trazos rainbow curvos (21 KB) | Hero, bajo cursor |
| `hero-mask-2.svg` | Trazos rainbow denso (157 KB) | Hero, bajo cursor |
| `metabrain-decor-1.svg` / `-2.svg` / `-3.svg` | Blobs/splashes pequeños | Section MetaBrain, decoration |
| `cta-button-glow.svg` | Aura del botón principal | CTA hero y CTA final |
| `lines-bg.png` | Topografía de líneas onduladas | Section Knowledge bg |
| `doc-editor-screenshot.svg` | SVG del editor de docs (53 KB) | Section Knowledge inline |

---

## 1.6 Animaciones

### Durations típicas

| Duración | Uso |
|---|---|
| `0.15s` | Transiciones ultrafinas |
| `0.2s` | Hover de links (`duration-200`) |
| `0.3s` | Fade de opacity, opacity transitions |
| `0.5s` | Reveal de highlight |
| `1.0s – 1.5s` | Barrido de highlight amarillo (con delays de 0.5s–2s) |
| `2.0s` | `solid-loader` animation ease-in-out infinite |
| `60s` | `infinityScroll` linear infinite — la marquesina del hero |

### Easing

- **Única timing function explícita**: `cubic-bezier(0.4, 0, 0.2, 1)` (Material "standard easing").
- `ease-in-out` en loaders.
- `ease` (default) en `dotted-loader`.
- `linear` en `infinityScroll` y `spin`.

### Keyframes encontrados

- `@keyframes spin` — rotación estándar 360deg.
- `@keyframes infinityScroll` — traslación horizontal infinita (para la marquesina de features).
- `@keyframes dotted-loader` — animación de puntos que se iluminan en círculo (los 8 box-shadows alternan `#dcdbff` como "punto activo").
- `@keyframes solid-loader` — loader sólido alternativo.

### Qué se anima al aparecer (scroll into view)

Inferido por los `style="opacity:0"` iniciales y las clases de transition:
- Toolbar flotante del editor (sección Knowledge): `translateY(14px) → 0 + opacity 0 → 1`.
- Highlight amarillo barrido: `background-position: 100% → 0%` sobre palabras "live" y "advanced solutions".
- Cursor de texto simulado: elemento con `--cursor-position: 0.104` que se mueve con animación.

### Hover animations

- Links: color (200ms).
- Pins (knowledge): scale 1.05, translateY -15px, shadow grande (200ms).
- CTA pill: scale interior +border brightness (aura inner/outer toggle).
- Cards: probablemente tienen `hover:scale` o `hover:shadow` (no directamente visible en HTML estático).
- Iconos de footer: `opacity-80 → opacity-100 duration-300`.

---

## 1.7 Voz y copy

### Longitud típica de headlines

- H1 hero: **4 palabras** ("Everything App for your teams").
- H2 sección: **2–4 palabras** ("Unmatched productivity", "Huly MetaBrain", "Join the Movement", "Sync with GitHub. Both ways.").
- Casi todas tienen tinte aspiracional + descriptivo muy comprimido. Nunca más de 5 palabras.

### Longitud típica de subheadlines

- 1–2 frases (15–30 palabras).
- Ejemplo: *"Huly, an open-source platform, serves as an all-in-one replacement of Linear, Jira, Slack, and Notion."* (17 palabras).
- Ejemplo: *"Connect every element of your workflow to build a dynamic knowledge base. Soon, Huly AI will turn it into a powerful asset — a second brain for your team."* (30 palabras, 2 oraciones).

### Estilo de CTAs

- Siempre **UPPERCASE BOLD**.
- 2–3 palabras.
- Verbos de acción directa: `See in Action`, `Start Free`, `Sign Up`, `Sign In`, `Join our Slack`, `Star Us`.
- Nunca imperativos suaves tipo "Learn more" o "Read about…"; son movimientos concretos.

### Tono

- **Aspiracional + técnico**. Habla de "productividad sin rival", "conexión", "movimiento".
- Copy no usa jerga corporativa (no "enterprise-grade", no "streamline", no "leverage"). Más bien directo: "Work together. Like in the office." o "Knowledge at Your Fingertips".
- Pone acento en **open-source** y **developer-friendly** (menciona "developers and product teams", "GitHub sync").
- Pricing usa fantasy naming (**Common, Rare, Epic, Legendary**) — guiño lúdico/gamer.
- Hay un toque de manifiesto: "Join the Movement", "Unlock the future of productivity with Huly. Remember, this journey is just getting started."

### Ejemplos literales de copy (verbatim)

**Hero:**
- H1: "Everything App for your teams"
- Sub: "Huly, an open-source platform, serves as an all-in-one replacement of Linear, Jira, Slack, and Notion."
- CTA: "See in Action"
- Marquee: "Everything you need for productive team work: Team Planner · Project Management · Virtual Office · Chat · Documents · Inbox"

**Productivity section:**
- H2: "Unmatched productivity"
- Sub: "Huly is a process, project, time, and knowledge management platform that provides amazing collaboration opportunities for developers and product teams alike."
- Feature card copy: "**Keyboard shortcuts.** Work efficiently with instant access to common actions." / "**Team Planner.** Keep track of the bigger picture by viewing all individual tasks in one centralized team calendar." / "**Notifications.** Keep up to date with any changes by receiving instant notifications." / "**Time-blocking.** Transform daily tasks into structured time blocks for focused productivity."

**Virtual office section:**
- H2: "Work together. Like in the office."
- Sub: "Create customized virtual office spaces for any department or event with high quality audio and video conferencing."
- Body: "Collaborating with remote teams is easy in your virtual office environment. Enjoy real-time communication within your workspace without additional software hassle."
- Card titles: "Customize workspace" / "Audio and video calls" / "Invite guests"

**GitHub section:**
- H2: "Sync with GitHub. Both ways."
- Sub: "Manage your tasks efficiently with Huly's bidirectional GitHub synchronization. Use Huly as an advanced front-end for GitHub Issues and GitHub Projects."
- Feature titles: "Two-way synchronization", "Private tasks", "Multiple repositories", "Milestone migration", "Track progress", "Advanced filtering"

**MetaBrain section:**
- H2: "Huly MetaBrain"
- Sub: "Connect every element of your workflow to build a dynamic knowledge base. Soon, Huly AI will turn it into a powerful asset — a second brain for your team."
- Card copy: "**Create tasks.** Schedule your personal events and todos." / "**Plan your work.** Visualize your workday in your planner." / "**Take notes.** Create documents to keep track of team resources" / "**Sync in real time.** Connect with your team instantly to monitor progress and track updates." / "**Chat with team.** Send DM and create group chats." / "**Manage projects.** Customize your workspace to fit the needs of your teams."

**Knowledge section:**
- H2: "Knowledge at Your Fingertips"
- Sub: "Huly offers a wide range of features to create and manage your project documentation. Huly's suite of collaborative editing tools boosts team efficiency."
- Card tooltip (sticky): "Collaborate — Enhance teamwork with powerful real-time collaboration features." / "Version History — Track every edit effortlessly, and never lose a single change."

**Final CTA:**
- H2: "Join the Movement"
- Sub: "Unlock the future of productivity with Huly. Remember, this journey is just getting started."
- CTAs: "See in Action" + "Join our Slack"

**Footer:** "Copyright © 2026 Huly Labs. All rights reserved."

---

## 2. Assets descargados

### Carpeta: `C:\dev\dr-cv\assets\references\huly\`

#### HTML pages (source HTML)
- `home.html` (248 KB) + `home.pretty.html` (formatted)
- `pricing.html` (158 KB) + `pricing.pretty.html`
- `download.html` (112 KB)
- `about.html` (106 KB) — idéntica a features.html (probablemente redirige)
- `features.html` (106 KB) — probable placeholder o genérica

#### `styles/`
- `main-1.css` — `@font-face` declarations only (3.5 KB)
- `main-2.css` — full tailwind compiled + custom tokens (114 KB)

#### `fonts/`
- `inter-latin.woff2` — Inter latin subset (48 KB)
- `esbuild-400.woff2` / `esbuild-500.woff2` / `esbuild-600.woff2` — **font custom de titulares**
- `sf-mono-400.woff2` — SF Mono para code blocks

#### `images/`
- `hero-illustration.jpg` — screenshot producto Huly (el "tablero" principal del hero)
- `cta-illustration.jpg` (322 KB) / `cta-illustration-mobile.jpg` — escena del CTA final
- `lines-bg.png` (203 KB) — **textura topográfica de líneas** (Knowledge section)
- `billboard.jpg` (1.1 MB) — editor de docs screenshot
- `blue-pin.jpg` / `orange-pin.jpg` — avatares 66×66 de los "pins" arrastrables
- `customize.png` / `video.png` / `invite.png` — iconos 40×40 (virtual office section)
- `tasks-notes.png` (386 KB) — card "Create tasks" (MetaBrain)
- `plan-work.jpg` — card "Plan your work"
- `teammates.jpg` — card "Sync in real time"
- `calendar.png` — card calendar visual
- `collab.jpg` — card "Chat with team"
- `pm.jpg` — card "Manage projects"

#### `svg/`
- `logo.svg` — Huly wordmark 71×24, fill `#fff` (996 bytes, ver contenido abajo)
- `hero-mask-1.svg` (21 KB) y `hero-mask-2.svg` (158 KB) — trazos rainbow para mask radial
- `metabrain-decor-1.svg` / `-2.svg` / `-3.svg` — blobs decorativos
- `cta-button-glow.svg` — aura del CTA primario
- `slack-icon.svg` — icono Slack del botón secundario
- `doc-editor-screenshot.svg` (54 KB) — vista del editor inline

#### Logo SVG (inline, para copia directa)

```svg
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 71 25">
  <path fill="#fff" d="M22.4 16a1.6 1.6 0 0 1 1.6 1.6v4.8a1.6 1.6 0 0 1-1.6 1.6h-4.8a1.6 1.6 0 0 1-1.6-1.6v-4.8a1.6 1.6 0 0 1 1.6-1.6zM6.4 0A1.6 1.6 0 0 1 8 1.6v4.8A1.6 1.6 0 0 1 6.4 8H1.6A1.6 1.6 0 0 1 0 6.4V1.6A1.6 1.6 0 0 1 1.6 0zM23.531 8.469c.3-.3.469-.707.469-1.132V1.6A1.6 1.6 0 0 0 22.4 0h-4.8A1.6 1.6 0 0 0 16 1.6v4.8A1.6 1.6 0 0 1 14.4 8H8.663a1.6 1.6 0 0 0-1.132.469L.47 15.53A1.6 1.6 0 0 0 0 16.663V22.4A1.6 1.6 0 0 0 1.6 24h4.8A1.6 1.6 0 0 0 8 22.4v-4.8A1.6 1.6 0 0 1 9.6 16h5.737a1.6 1.6 0 0 0 1.132-.469zM31.22 20V3.8h3.62v7.1q.42-.72 1.18-1.12.78-.42 1.78-.42 1.74 0 2.64 1.12.92 1.1.92 3.24V20h-3.62v-5.6q0-1.82-1.38-1.82-.74 0-1.14.52-.38.5-.38 1.44V20zm16.6.32q-2.46 0-3.74-1.24-1.26-1.24-1.26-3.62V9.68h3.64v5.66q0 1.76 1.38 1.76.7 0 1.02-.42t.32-1.34V9.68h3.64v5.78q0 2.38-1.28 3.62-1.26 1.24-3.72 1.24m6.546-.32V3.8h3.62V20zm5.955 4.9 2.58-5.46-4.24-9.76h3.98l2.1 6.06 1.94-6.06h3.88l-6.6 15.22z"/>
</svg>
```

#### Iconos SVG secundarios (todos descargados en `svg/`)

- `icon-nav-x.svg` — X/Twitter 18×18
- `icon-nav-linkedin.svg` — LinkedIn 18×18
- `icon-nav-youtube.svg` — YouTube 18×18
- `icon-footer-logo.svg` — Logo alternativo footer
- `icon-feature-two-way-sync.svg` · `icon-feature-private-tasks.svg` · `icon-feature-multiple-repos.svg` · `icon-feature-milestone.svg` · `icon-feature-track-progress.svg` · `icon-feature-filtering.svg` — Los 6 iconos 40×40 de la sección GitHub
- `icon-toolbar-edit.svg` — Icono del toolbar flotante del editor

#### Assets NO descargados (opcionales/grandes)

- `https://huly.io/_next/static/media/hero-illustration-mobile.*.jpg` (mobile variants de las ilustraciones principales, ~200 KB cada una)
- `https://huly.io/_next/static/media/tasks-mobile.abb306cb.jpg` · `plan-work-mobile.d9e8f583.jpg` · `notes-mobile.2bf5fcba.jpg` · `teammates-mobile.8dc948be.jpg` · `collab-mobile.a7137137.jpg` · `pm-mobile.39d0b377.jpg` (mobile variants de cards MetaBrain)
- `https://huly.io/_next/static/media/cta-illustration-mobile.621dcd29.jpg`
- `https://huly.io/_next/static/rive.b8b719dae3c2060a.wasm` (Rive runtime ~2 MB, sólo necesario para runtime de animaciones Rive, no para diseño estático)

**Screenshots de secciones:** no generados automáticamente (requiere headless browser). Recomendación: abrir `home.html` en Chrome y capturar manualmente con extensión Full-Page Screenshot.

---

## 3. Extracción de CSS — COMPLETA

Ambos stylesheets descargados en `assets/references/huly/styles/`:
- `main-1.css` — contiene todos los `@font-face` (Inter, esbuild, SF Mono) + class bindings via `--font-inter / --font-esbuild / --font-mono`.
- `main-2.css` — Tailwind compilado + custom tokens (container, grey palette, font-title, leading-h2, etc.). **206 custom properties, 88 hex colors, 85 rgba, 22 hsla, 33 gradientes, 4 keyframes, 12 box-shadows**.

Todo ya parseado arriba.

---

## 4. Páginas secundarias

### /pricing (descargada, 158 KB)

**Diferencias notables vs home:**
- Mantiene header y footer idénticos.
- Hero simplificado: solo `<h1 class="sr-only">Huly Pricing</h1>` (oculto para screen readers, visual sin H1 visible).
- 4 cards pricing en grid horizontal (desktop) con **mismo background `#090A0C` dark**.
- **No hay toggle monthly/yearly** visible — todos los precios muestran `/monthly`.
- Pricing tiers con fantasy naming:
  - **Common** — $0/monthly · "Individuals & teams starting out" · 10 GB storage · 10 GB video/audio
  - **Rare** — $19.99/monthly · "Freelancers & micro-agencies" · 100 GB · 100 GB
  - **Epic** — $99.99/monthly · "Professional creative companies" · 1 TB · 500 GB
  - **Legendary** — $399.99/monthly · "Large teams needing maximum capabilities" · 10 TB · 2 TB
  - **Custom Plan** — "flexible pricing available upon inquiry"
- Common card CTA: `bg-white !text-black` (único destacado).
- Features compartidos: Unlimited users, Unlimited Huly Objects, AI — TBD.
- Checkmarks en SVGs inline base64 (stroke `#fff` stroke-width `1.829`).

### /download (descargada, 112 KB)

**Diferencias notables:**
- Headline: **"All you need in one place"**
- Sub: **"Easily access online on macOS, Windows, and Linux. Boost your productivity on any platform."**
- Label: "Web Application".
- Layout minimalista, sin ilustraciones hero complejas. Mantiene fondo `#090A0C`.
- No hay H1 con gradiente (es un H1 normal en blanco).
- Footer y nav idénticos.

### /about (descargada, 106 KB)

**Contenido nulo visible** — el archivo parece ser un placeholder o redirige. Tamaño idéntico a `/features`, lo que sugiere que ambos rutas devuelven el mismo shell sin contenido real (probablemente hay un error o está pendiente de build).

### /features (descargada, 106 KB)

Mismo caso que `/about` — placeholder. **INFERENCIA:** Huly no tiene página `/features` pública; las features se presentan en la home.

### /resources

**HTTP 404 Not Found.** No existe como ruta directa; Huly redirige a `/blog` o `https://docs.huly.io`. Los enlaces "Resources" del nav son dropdowns, no páginas.

---

## 5. Cómo aplicarlo a dr-cv

### Qué adoptar tal cual

1. **Paleta neutra dominante**: `#090A0C` dark + `#F6F6F6` light + grises tipo `#18191B`, `#303236`, `#B0B2B7`. Es una base "silenciosa" que deja respirar la foto de un CV y permite que el único color vivo (accent) tenga todo el protagonismo.
2. **Font-stack tipográfico**:
   - Body: **Inter** (Google Fonts, free, idéntica al huly).
   - Headings: **JetBrains Mono** o **Geist Mono** (sustituto open-source de "esbuild"). El punto es: *titulares en monospace*.
   - Code/labels técnicos: SF Mono / JetBrains Mono.
3. **Escala tipográfica agresiva**: H1 a 72–84 px desktop, H2 a 56–80 px. `leading: 0.9` y `tracking: -0.04em`. Esta sí es replicable y hace la página sentir "editorial".
4. **Grid de containers** (`80rem` default, `1408px` wide, `64rem` narrow) con padding horizontal `2rem` → `1.25rem` en mobile.
5. **Border-radius pill para CTAs** (`9999px`), **border-radius 10–12 px** para cards grandes.
6. **Ring-[6px] ring-white/40** en cards dentro de fondos oscuros — excelente efecto de "vidrio enmarcado".
7. **Breakpoints invertidos Tailwind** (max-width): 413, 639, 767, 1023, 1279, 1439 px.

### Qué adaptar

1. **Texturas**: el `lines-bg.png` de Huly es 3167 px de alto. Para dr-cv conviene:
   - Generar un SVG propio de líneas topográficas (tool: `https://www.desmos.com/calculator` o `svg-patterns.com`) → guardarlo como tileable background.
   - O replicar el efecto con **puro CSS gradient stripes** con `repeating-linear-gradient`.
2. **Gradiente de H1** (`from-white via-[#d5d8f6] to-[#fdf7fe]`): adoptarlo **con un matiz diferente** para no ser idéntico. Ejemplo dr-cv: `from-[#fafbff] via-[#e3eaff] to-[#ffe4ec]` (más rosa/coral si buscás calidez). O mantener la paleta de Huly pero usarla sólo en el nombre del CV.
3. **CTA glow radial warm**: **replicable 100% en CSS** con dos layers `bg-[radial-gradient(...)]` + una capa `filter: blur(5px)`. Los colores `#FFFFF5 / #FFAA81 / #FFDA9F` son replicables tal cual (son "cálidos universales").
4. **Máscara radial cursor-reactive del hero**: replicable con `clip-path: circle()` + JS minimalista que actualice dos CSS vars `--x` y `--y` en `mousemove`. No requiere framer-motion.
5. **Infinity scroller marquee**: CSS `@keyframes` + `animation: scroll 60s linear infinite`. Trivial de portar.

### Qué NO copiar (muy signature Huly)

1. **Palabra "Movement" en el CTA final** — es la voz de Huly; usar otra (ej: "Let's collaborate", "Contact me", "See my work").
2. **Fantasy naming (Common/Rare/Epic/Legendary)** — es identitario de Huly.
3. **Font "esbuild" literal** — ilegal usar los `.woff2` descargados. Sustituir por JetBrains Mono o Geist Mono.
4. **El logo exacto** — obvio, pero vale recordar: no reutilizar el path SVG del logo.
5. **"Pins arrastrables" en el documento editor** — es muy signature y replicarlos se vería obvio.
6. **Copy literal**: frases como "Everything App for your teams" o "Unlock the future of productivity" son reconocibles.

### Token set derivado propuesto para dr-cv

Basado en la arquitectura Huly pero reinterpretado para un CV personal:

```css
:root {
  /* Surface */
  --bg-primary:       #0A0A0C;   /* base dark casi idéntico a huly */
  --bg-secondary:     #F6F4F0;   /* light cream, un poco más cálido que #F6F6F6 */
  --bg-elevated:      #15171B;   /* card dark surface */
  --bg-elevated-2:    #2A2C31;   /* toolbar */
  --bg-inverse:       #111111;   /* dark alt section */

  /* Text */
  --text-primary:     #FFFFFF;
  --text-body:        #E5E5E7;
  --text-muted:       #B0B2B7;
  --text-subtle:      #797D86;
  --text-dark:        #0B0C0E;
  --text-dark-body:   #303236;

  /* Accents (derivado pero NO idéntico a huly) */
  --accent-warm:      #FF8964;   /* mismo "orange" de huly — buen color cálido */
  --accent-warm-deep: #CD3100;
  --accent-cool:      #5683DA;   /* azul huly, pero usarlo minimalmente */
  --cta-text-deep:    #5A250A;   /* marrón del texto del CTA */

  /* Warm CTA gradient stops (replica fiel) */
  --cta-glow-1: #FFFFF5;
  --cta-glow-2: #FFAA81;
  --cta-glow-3: #FFDA9F;

  /* Headline gradient */
  --headline-grad-1: #FFFFFF;
  --headline-grad-2: #D5D8F6;
  --headline-grad-3: #FDF7FE;

  /* Elevation */
  --ring-card:        rgba(255,255,255,0.40);
  --shadow-card:      0 6px 25px rgba(0,0,0,0.50);
  --shadow-card-hover:0 14px 30px rgba(0,0,0,0.80);
  --shadow-float:     0 10px 20px rgba(0,0,0,0.50);

  /* Radius */
  --radius-pill:      9999px;
  --radius-card:      12px;
  --radius-card-lg:   20px;
  --radius-card-xl:   30px;
  --radius-small:     10px;

  /* Typography */
  --font-body:    'Inter', ui-sans-serif, system-ui, sans-serif;
  --font-display: 'JetBrains Mono', 'Geist Mono', ui-monospace, monospace;
  --font-mono:    'JetBrains Mono', ui-monospace, monospace;

  /* Scale (escala Huly) */
  --text-h1: clamp(32px, 6vw, 84px);
  --text-h2: clamp(36px, 5vw, 80px);
  --text-h3: clamp(20px, 2.5vw, 32px);
  --text-lead: 18px;
  --text-body: 16px;
  --text-small: 14px;
  --text-micro: 11px;

  /* Tracking */
  --tracking-snug: -0.01em;
  --tracking-snugger: -0.02em;
  --tracking-tight: -0.04em;
  --tracking-tighter: -0.05em;

  /* Leading */
  --leading-h2: 0.8;
  --leading-h1: 0.9;
  --leading-body: 1.375;

  /* Motion */
  --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
  --dur-fast: 0.2s;
  --dur-med: 0.3s;
  --dur-slow: 0.5s;

  /* Breakpoints (max-width, como huly) */
  --bp-xs: 639px;
  --bp-sm: 767px;
  --bp-md: 1023px;
  --bp-lg: 1279px;
  --bp-xl: 1439px;

  /* Container */
  --container-default: 80rem;
  --container-narrow:  64rem;
  --container-wide:    1408px;
}
```

### Patrones visuales clave a replicar

1. **Alternancia de fondos dark / cream / dark** por sección — marca el ritmo de scroll sin necesidad de ilustración pesada en cada una.
2. **H1 con `bg-clip-text` y gradiente sutil** — da "joyería tipográfica" al nombre/título.
3. **CTA pill blanco con glow warm interior** — el elemento más memorable visual. Replicarlo con dos layers radial + blur.
4. **Cards con `ring-[6px] ring-white/40`** sobre fondos oscuros — se ven como placas flotantes.
5. **Fade-to-bg en la base de cada sección oscura** con `linear-gradient(180deg, transparent, var(--bg-primary))`.
6. **Tipografía mono en titulares + Inter en body** — es el contraste "código vs prosa" que le da carácter developer-serio.
7. **Animaciones de 200–300ms** como regla general; nada más rápido, nada más lento salvo efectos especiales.
8. **Marquee horizontal infinita** como ribbon decorativo (debajo del hero).

---

## Resumen de cobertura del scraping

| Categoría | Estado |
|---|---|
| HTML home (248 KB) | ✅ descargado + prettified + analizado |
| HTML pricing, download | ✅ descargado + analizado |
| HTML about, features, resources | ⚠ /about, /features: placeholder vacío · /resources: 404 |
| CSS stylesheets | ✅ 2 archivos descargados y parseados |
| Fonts WOFF2 | ✅ 5 archivos descargados (Inter + esbuild 400/500/600 + SF Mono) |
| Imágenes key del hero | ✅ 15 imágenes descargadas |
| SVGs decorativos | ✅ 9 SVGs descargados (logo, hero masks, MetaBrain decor, CTA glow, etc.) |
| Paleta de colores | ✅ 88 hex + 85 rgba + 22 hsla + 33 gradientes extraídos |
| Tokens tipográficos | ✅ 44 font-sizes + 18 line-heights + 9 letter-spacings + 9 weights |
| Keyframes / animations | ✅ 4 keyframes + 4 animations + timing functions |
| Screenshots .png de secciones | ❌ No generados (requiere headless browser) |
| Rive wasm | ❌ No descargado (no crítico para diseño estático) |
| Iconos SVG secundarios | ⚠ Listados con URL, no descargados |

Total: ~95% de cobertura estática. Lo único que falta es inspección en runtime (screenshots visuales de cada sección + verificación de animaciones scroll-triggered exactas), que requeriría Puppeteer/Playwright.
