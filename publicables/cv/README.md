# publicables/cv

CVs generados en PDF.

## Variantes

| Archivo en `dist/cvs/` | Audiencia | Tono |
|---|---|---|
| `cv-warm-{en,es}.pdf` | LinkedIn warm / contacto directo | Agentic Designer, featured-dark, 5 testimonios |
| `cv-serious-{en,es}.pdf` | LinkedIn serious / roles Staff | Accent border, sÃ³lo testimonios verificados |
| `cv-bairesdev-{en,es}.pdf` | ColocaciÃ³n vÃ­a BairesDev | Minimalista sans+mono, grayscale, sin testimonios |

## CÃ³mo generar

```
npm run build:cvs
```

Los PDFs salen en `dist/cvs/`.

## Fuente de datos

- `perfil/data/identity.yaml`, `perfil/data/experience.yaml`, `perfil/data/skills.yaml`, `perfil/data/positioning.yaml`, `perfil/data/testimonials/`
- Plantillas en `generadores/templates/cv/`

## Deliverables asociados

- `bairesdev-portal-skills.md` â€” checklist de actualizaciÃ³n del portal de BairesDev
