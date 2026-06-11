# dr-cv - Guia de navegacion

Este repo es una **maquina de carrera**. Su objetivo central es ayudar a Danilo a llegar a **USD 250k/ano** como Product Designer / AI Product Designer remoto.

La estructura se ordena por proposito humano, no por tecnologia.

## Columna vertebral

```text
carrera/ -> career-training/ -> perfil/ -> publicables/ -> generadores/ -> dist/
decision     facultades          evidencia   salidas        build           output
```

## Mapa del repo

```text
dr-cv/
|-- carrera/          Centro de mando: plan, semana, daily, decisiones.
|-- career-training/  Training de facultades senior; fuente de /app.
|-- perfil/           Fuente de verdad profesional: data + assets propios.
|-- publicables/      CV, landing, skills sheet, social posts.
|-- generadores/      Codigo que genera HTML/PDF/site desde perfil/.
|-- design-system/    Un design system activo con targets print/web.
|-- dist/             Outputs generados; raiz deployada: dist/landing-v11.
|-- laboratorio/      Specs, plans, visuals, audits, exploraciones.
|-- referencias/      Inspiracion externa read-only.
|-- tests/            Vitest suite de la maquinaria.
`-- node_modules/     Dependencias instaladas; no navegar mentalmente.
```

## Rutas vivas pero no enlazadas

Estas rutas son publicas por decision explicita, pero no deben aparecer como botones ni links principales en la landing:

| URL | Fuente real | Output |
|---|---|---|
| `danilorojas.design/app` | `career-training/ur-assessment/index.html` | `dist/landing-v11/app/index.html` |
| `danilorojas.design/daily` | `carrera/daily/index.html` | `dist/landing-v11/daily/index.html` |
| `danilorojas.design/plan` | `carrera/plan/index.html` | `dist/landing-v11/plan/index.html` |

Regla: editar siempre la fuente real, nunca `dist/`. `npm run build:landing-v11` copia estas herramientas a `dist/landing-v11/`.

## Deploy

GitHub Pages publica `dist/landing-v11/` desde `.github/workflows/static.yml`.

No cambiar estas rutas sin verificar deploy:

- `dist/landing-v11/index.html`
- `dist/landing-v11/es/index.html`
- `dist/landing-v11/work/*`
- `dist/landing-v11/app/index.html`
- `dist/landing-v11/daily/index.html`
- `dist/landing-v11/plan/index.html`
- `dist/landing-v11/CNAME`

## Design system

Hay un solo design system activo:

| Archivo | Uso |
|---|---|
| `design-system/tokens-print.css` | CVs + skills sheet. |
| `design-system/tokens-web.css` | Landing v11 + publicables web. |

Los tokens historicos de exploraciones descartadas viven en `laboratorio/landing-exploration/`.

## Reglas para decidir donde va algo

1. Estrategia operativa, semana, metas, daily -> `carrera/`
2. Training, assessment, gaps, respuestas -> `career-training/`
3. Identidad profesional, casos, skills, foto, animaciones propias -> `perfil/`
4. CV, landing, skills sheet, posts -> `publicables/`
5. Codigo de generacion -> `generadores/`
6. Tokens activos -> `design-system/`
7. Exploraciones, specs, plans, prompts, audits -> `laboratorio/`
8. Inspiracion externa -> `referencias/`
9. Tests automatizados -> `tests/`

Regla final: si despues de 10 segundos no sabes donde va, va a `laboratorio/` hasta que madure.

## Builds

| Comando | Output |
|---|---|
| `npm run build:skills-sheet` | `dist/skills-sheet-{en,es}.{html,pdf}` |
| `npm run build:cvs` | `dist/cvs/*.pdf` |
| `npm run build:landing-v11` | `dist/landing-v11/` incluyendo `/app` y `/daily` |
| `npm run build:all` | Todo lo anterior |
| `npm test` | Vitest suite |
| `npm run typecheck` | `tsc --noEmit` |

## Instrucciones heredadas

Las reglas del workspace compartido (`C:\dev\CLAUDE.md`) siguen aplicando:

- Visuales de brainstorming siempre en HTML, sin pedir permiso.
- Specs/plans como doble deliverable: MD canonico + HTML companion.
- Todo spec/plan incluye user flow diagram.

En este repo, specs/plans/visuals van en `laboratorio/superpowers/{specs,plans,visuals}/`.
