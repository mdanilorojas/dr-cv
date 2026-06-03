# dr-cv — Guía de navegación

Este repo está organizado por **propósito humano**, no por tecnología. Si quieres entender rápido dónde está algo, piensa primero en qué estás haciendo.

## Mapa del repo

```
dr-cv/
├── productos/       ← ¿Qué sale de aquí, visible al mundo? (CV, landing, social, skills-sheet)
├── data/            ← Fuente de verdad del texto (YAML + MD). Lo que Danilo "es".
├── assets/          ← Foto, animaciones, stills (binarios). Se copian a dist/ en build.
├── design-system/   ← Tokens CSS
├── generators/      ← Código que lee data/ y escribe dist/
├── tests/           ← Vitest suites
├── dist/            ← Outputs generados. Regenerable con `npm run build:all`.
│
├── pruebas/         ← TODO lo exploratorio, temporal, o descartado.
└── referencias/     ← Inspiración externa (NO ES MÍO)
```

## Reglas para decidir dónde va algo

### Regla 1 — Si es un deliverable real que alguien verá: `productos/`

CV, skills sheet, landing, post de LinkedIn = van a `productos/<producto>/`. Cada subcarpeta tiene un `README.md` que explica qué es y cómo se genera.

**`productos/` no tiene código**. Solo:
- Documentación humana del producto (qué es, audiencia, por qué existe)
- Deliverables hechos a mano (social posts, checklists)
- Una `design-system-reference.html` o mockups finales si aplica

El código que genera productos vive en `generators/`.

### Regla 2 — Si es algo exploratorio, prueba, variante descartada: `pruebas/`

Specs de superpowers, plans, visuals de brainstorming, variantes de landing que no usamos, prompts guardados, audits → **`pruebas/<tema>/`**.

Estructura dentro de `pruebas/`:

```
pruebas/
├── superpowers/
│   ├── specs/         ← Specs formales (MD + HTML companion)
│   ├── plans/         ← Planes de implementación
│   ├── visuals/       ← HTMLs de brainstorming visual (por fecha + tema)
│   └── ideas/         ← Exploración temprana
├── landing-exploration/  ← Variantes históricas de la landing
├── prompts/              ← Feedback verbatim del usuario guardado
└── audits/               ← Auditorías internas (BAH, GitHub, etc.)
```

**Convención para visuals:** `pruebas/superpowers/visuals/YYYY-MM-DD-<topic>/`.

### Regla 3 — Si es referencia externa (no es mío): `referencias/`

Snapshots de Huly, hiring universe, visual universe, huly design system research.
**Read-only.** Si quiero anotar algo, va en `referencias/notes/`.

### Regla 4 — Data, generators, tests, design-system: NO TOCAR la ubicación

Estas carpetas tienen paths hard-coded en los generators y tests. Moverlas rompe el build:

- `data/` — toda la YAML + `cases/*.md` + `testimonials/*.yaml`
- `design-system/tokens*.css`
- `generators/lib/` + `generators/templates/`
- `tests/`
- `assets/photo/`, `assets/animations/`

## Política para nuevos archivos

Antes de crear un archivo nuevo en la raíz:

1. ¿Es un deliverable real? → `productos/<producto>/`
2. ¿Es exploración, spec, visual, variante descartada? → `pruebas/<tema>/`
3. ¿Es inspiración externa? → `referencias/<fuente>/`
4. ¿Es código de generación? → `generators/`
5. ¿Es data o tokens? → `data/` o `design-system/`

**Regla final:** si después de 10 segundos no sabes en qué categoría cae, es `pruebas/`. Luego lo movemos si se consolida.

## Lo que pasa con `docs/`

`docs/` ya no existe. Todo su contenido se distribuyó:

- `docs/superpowers/` → `pruebas/superpowers/`
- `docs/prompts/` → `pruebas/prompts/`
- `docs/audits/` → `pruebas/audits/`
- `docs/references/` → `referencias/` (y `referencias/notes/` para MDs sueltos)
- `docs/deliverables/bairesdev-portal-skills.md` → `productos/cv/`
- `docs/design-system/v11/index.html` → `productos/landing/design-system-reference.html`
- `docs/index.html` → `pruebas/docs-index.html` (legacy landing del repo; no se usa en el build)

## Builds

| Comando | Output |
|---|---|
| `npm run build:skills-sheet` | `dist/skills-sheet-{en,es}.{html,pdf}` |
| `npm run build:cvs` | `dist/cvs/*.pdf` (5 variantes) |
| `npm run build:landing-v11` | `dist/landing-v11/` (SPA EN+ES + case details) |
| `npm run build:all` | Todo lo anterior en serie |
| `npm test` | Vitest full suite |
| `npm run typecheck` | tsc --noEmit |

## Instrucciones heredadas

Las reglas del workspace compartido (`C:\dev\AGENTS.md`) siguen aplicando:
- Visuales de brainstorming siempre en HTML, sin pedir permiso
- Specs/plans como doble deliverable: MD canónico + HTML companion para review humana
- Todo spec/plan incluye user flow diagram

Los dos van en `pruebas/superpowers/{specs,plans,visuals}/`.
