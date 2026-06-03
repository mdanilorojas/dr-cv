# productos/landing

Landing page v11 — lo que verá el público en `danilorojas.design`.

## Qué genera

- `dist/landing-v11/index.html` — landing EN
- `dist/landing-v11/es/index.html` — landing ES
- `dist/landing-v11/work/<slug>/index.html` — página de detalle por case (EN)
- `dist/landing-v11/es/work/<slug>/index.html` — idem ES
- `dist/landing-v11/og.png` — imagen Open Graph
- `dist/landing-v11/assets/` — foto, animaciones, stills

## Cómo generar

```
npm run build:landing-v11
```

## Ver local

```
npx http-server dist/landing-v11 -p 5174
```

## Fuente de datos

- `data/identity.yaml`, `data/positioning.yaml`, `data/landing.yaml`, `data/horizon.yaml`
- `data/cases/*.md` — cases individuales (enregla, developer-portal, life-update-mobile)
- `data/testimonials/` — quotes verificados
- `assets/photo/danilo.jpg` — retrato
- `assets/animations/gallery/` — animaciones embebidas en cases (iframe-based)
- Plantillas en `generators/templates/v11-landing/`

## Diseño

- Tokens V11: `design-system/tokens-v11.css`
- Referencia visual original: `pruebas/superpowers/specs/2026-05-10-v11-horizon-timeline-design.html` y variantes en `pruebas/superpowers/visuals/`
