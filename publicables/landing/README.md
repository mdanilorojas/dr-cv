# publicables/landing

Landing page v11 â€” lo que verÃ¡ el pÃºblico en `danilorojas.design`.

## QuÃ© genera

- `dist/landing-v11/index.html` â€” landing EN
- `dist/landing-v11/es/index.html` â€” landing ES
- `dist/landing-v11/work/<slug>/index.html` â€” pÃ¡gina de detalle por case (EN)
- `dist/landing-v11/es/work/<slug>/index.html` â€” idem ES
- `dist/landing-v11/og.png` â€” imagen Open Graph
- `dist/landing-v11/assets/` â€” foto, animaciones, stills

## CÃ³mo generar

```
npm run build:landing-v11
```

## Ver local

```
npx http-server dist/landing-v11 -p 5174
```

## Fuente de datos

- `perfil/data/identity.yaml`, `perfil/data/positioning.yaml`, `perfil/data/landing.yaml`, `perfil/data/horizon.yaml`
- `perfil/data/cases/*.md` â€” cases individuales (enregla, developer-portal, life-update-mobile)
- `perfil/data/testimonials/` â€” quotes verificados
- `perfil/assets/photo/danilo.jpg` â€” retrato
- `perfil/assets/animations/gallery/` â€” animaciones embebidas en cases (iframe-based)
- Plantillas en `generadores/templates/v11-landing/`

## DiseÃ±o

- Tokens V11: `design-system/tokens-web.css`
- Referencia visual original: `laboratorio/superpowers/specs/2026-05-10-v11-horizon-timeline-design.html` y variantes en `laboratorio/superpowers/visuals/`
