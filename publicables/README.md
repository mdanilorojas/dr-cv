# publicables/

Cada subcarpeta es un deliverable real que sale de este repo.

| Publicable | Que es | Como se genera |
|---|---|---|
| `cv/` | CVs en PDF (warm, serious, bairesdev x EN/ES) | `npm run build:cvs` -> `dist/cvs/` |
| `skills-sheet/` | Skills sheet de 2 paginas A4, EN+ES | `npm run build:skills-sheet` -> `dist/` |
| `landing/` | Landing v11 (danilorojas.design) | `npm run build:landing-v11` -> `dist/landing-v11/` |
| `social/` | Posts y contenido para redes (LinkedIn, etc.) | Hecho a mano, sin generador |

Esta carpeta no tiene codigo de generacion. El codigo vive en `generadores/`, los datos en `perfil/data/`, los builds en `dist/`.

Aqui van:

- READMEs del publicable: que es, audiencia, por que existe.
- Deliverables hechos a mano, como `social/LinkedIn/*.md`.
- Checklists, decisiones de scope y notas de marca.

Exploraciones, variantes descartadas y pruebas visuales van en `laboratorio/`.
