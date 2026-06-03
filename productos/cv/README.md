# productos/cv

CVs generados en PDF.

## Variantes

| Archivo en `dist/cvs/` | Audiencia | Tono |
|---|---|---|
| `cv-warm-{en,es}.pdf` | LinkedIn warm / contacto directo | Agentic Designer, featured-dark, 5 testimonios |
| `cv-serious-{en,es}.pdf` | LinkedIn serious / roles Staff | Accent border, sólo testimonios verificados |
| `cv-bairesdev-{en,es}.pdf` | Colocación vía BairesDev | Minimalista sans+mono, grayscale, sin testimonios |

## Cómo generar

```
npm run build:cvs
```

Los PDFs salen en `dist/cvs/`.

## Fuente de datos

- `data/identity.yaml`, `data/experience.yaml`, `data/skills.yaml`, `data/positioning.yaml`, `data/testimonials/`
- Plantillas en `generators/templates/cv/`

## Deliverables asociados

- `bairesdev-portal-skills.md` — checklist de actualización del portal de BairesDev
