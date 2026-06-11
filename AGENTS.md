# dr-cv - Guia de navegacion

Este repo esta organizado por **proposito humano**, no por tecnologia. Si quieres entender rapido donde esta algo, piensa primero en que estas haciendo.

## Objetivo del repo

El objetivo central es ayudar a Danilo a llegar a **USD 250k/ano** como Product Designer / AI Product Designer remoto.

La columna vertebral es:

```text
estrategia/ -> UR_training/ -> data/ + assets/ -> generators/ -> dist/landing-v11/
              aprendizaje       evidencia       outputs publicables
```

## Mapa del repo

```text
dr-cv/
├── estrategia/      ← Centro de comando: plan 6 meses, semana actual, daily.
├── UR_training/     ← Capacitacion/assessment. Fuente de /app.
├── productos/       ← ¿Que sale de aqui, visible al mundo? CV, landing, social, skills-sheet.
├── data/            ← Fuente de verdad del texto publicable (YAML + MD).
├── assets/          ← Foto, animaciones, stills. Se copian a dist/ en build.
├── design-system/   ← Tokens activos: print + web.
├── generators/      ← Codigo que lee data/assets/fuentes y escribe dist/.
├── tests/           ← Vitest suites.
├── dist/            ← Outputs generados. Regenerable con `npm run build:all`.
│
├── pruebas/         ← Exploratorio, temporal o descartado.
└── referencias/     ← Inspiracion externa (NO ES MIO).
```

## Rutas vivas pero no enlazadas

Estas rutas son publicas por decision explicita, pero no deben aparecer como botones ni links principales en la landing:

| URL | Fuente real | Output |
|---|---|---|
| `danilorojas.design/app` | `UR_training/starting_point/index.html` | `dist/landing-v11/app/index.html` |
| `danilorojas.design/daily` | `estrategia/daily/index.html` | `dist/landing-v11/daily/index.html` |

Regla: editar siempre la fuente real, nunca `dist/`. `npm run build:landing-v11` copia ambas herramientas a `dist/landing-v11/` para que sobrevivan a regeneraciones.

## Sistemas de diseno

`design-system/` debe mantenerse pequeno:

| Archivo | Uso |
|---|---|
| `tokens.css` | Sistema print/documento: CVs + skills sheet. |
| `tokens-v11.css` | Sistema web: landing v11 + referencias visuales actuales. |

Los tokens historicos de exploraciones descartadas viven junto a esas exploraciones en `pruebas/landing-exploration/`.

## Reglas para decidir donde va algo

### Regla 1 - Si es un deliverable real que alguien vera: `productos/`

CV, skills sheet, landing, post de LinkedIn = van a `productos/<producto>/`. Cada subcarpeta tiene un `README.md` que explica que es y como se genera.

**`productos/` no tiene codigo**. Solo:
- Documentacion humana del producto.
- Deliverables hechos a mano.
- Una `design-system-reference.html` o mockups finales si aplica.

El codigo que genera productos vive en `generators/`.

### Regla 2 - Si es estrategia operativa: `estrategia/`

Plan maestro, semana actual, daily tracker, metricas y decisiones de ejecucion viven en `estrategia/`.

`estrategia/daily/index.html` es fuente real de `/daily`.

### Regla 3 - Si es capacitacion/assessment: `UR_training/`

Preguntas, respuestas, servidor local y app del assessment viven en `UR_training/starting_point/`.

`UR_training/starting_point/index.html` es fuente real de `/app`.

Pendiente documentado: cuando el assessment/daily necesiten multi-dispositivo serio, migrar estado y respuestas a una base de datos real. No ejecutar esa migracion sin aprobacion explicita.

### Regla 4 - Si es exploratorio, prueba, variante descartada: `pruebas/`

Specs de superpowers, plans, visuals de brainstorming, variantes de landing que no usamos, prompts guardados, audits -> `pruebas/<tema>/`.

Convencion para visuals: `pruebas/superpowers/visuals/YYYY-MM-DD-<topic>/`.

### Regla 5 - Si es referencia externa: `referencias/`

Snapshots de Huly, hiring universe, visual universe, huly design system research.

**Read-only.** Si quiero anotar algo, va en `referencias/notes/`.

### Regla 6 - Data, generators, tests, design-system activo: no mover sin revisar build

Estas carpetas tienen paths consumidos por generators y tests:

- `data/`
- `design-system/tokens.css`
- `design-system/tokens-v11.css`
- `generators/lib/` + `generators/templates/`
- `tests/`
- `assets/photo/`, `assets/animations/`

## Politica para nuevos archivos

Antes de crear un archivo nuevo en la raiz:

1. ¿Es estrategia operativa? -> `estrategia/`
2. ¿Es capacitacion/assessment? -> `UR_training/`
3. ¿Es un deliverable real? -> `productos/<producto>/`
4. ¿Es exploracion, spec, visual o variante descartada? -> `pruebas/<tema>/`
5. ¿Es inspiracion externa? -> `referencias/<fuente>/`
6. ¿Es codigo de generacion? -> `generators/`
7. ¿Es data o tokens activos? -> `data/` o `design-system/`

Regla final: si despues de 10 segundos no sabes en que categoria cae, es `pruebas/`. Luego se mueve si se consolida.

## Builds

| Comando | Output |
|---|---|
| `npm run build:skills-sheet` | `dist/skills-sheet-{en,es}.{html,pdf}` |
| `npm run build:cvs` | `dist/cvs/*.pdf` (5 variantes) |
| `npm run build:landing-v11` | `dist/landing-v11/` (SPA EN+ES + case details + `/app` + `/daily`) |
| `npm run build:all` | Todo lo anterior en serie |
| `npm test` | Vitest full suite |
| `npm run typecheck` | tsc --noEmit |

## Instrucciones heredadas

Las reglas del workspace compartido (`C:\dev\AGENTS.md`) siguen aplicando:

- Visuales de brainstorming siempre en HTML, sin pedir permiso.
- Specs/plans como doble deliverable: MD canonico + HTML companion para review humana.
- Todo spec/plan incluye user flow diagram.

Los dos van en `pruebas/superpowers/{specs,plans,visuals}/`.
