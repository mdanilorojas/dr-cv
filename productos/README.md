# productos/

Cada subcarpeta = un deliverable real que sale de este repo.

| Producto | Qué es | Cómo se genera |
|---|---|---|
| `cv/` | CVs en PDF (warm, serious, bairesdev × EN/ES) | `npm run build:cvs` → `dist/cvs/` |
| `skills-sheet/` | Skills sheet 2 páginas A4, EN+ES | `npm run build:skills-sheet` → `dist/` |
| `landing/` | Landing v11 (danilorojas.design) | `npm run build:landing-v11` → `dist/landing-v11/` |
| `social/` | Posts y contenido para redes (LinkedIn, etc.) | Hecho a mano, sin generador |

**Esta carpeta NO tiene código**. El código vive en `generators/`, los datos en `data/`, los builds en `dist/`. Aquí van:

- READMEs del producto (qué es, audiencia, por qué existe)
- Deliverables hechos a mano (como `social/LinkedIn/*.md`)
- Checklists, decisiones de scope, notas de marca

Para pruebas, exploraciones, variantes descartadas → `pruebas/`.
