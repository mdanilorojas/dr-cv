# Estrategia Danilo Pro

Centro de comando para conectar estrategia profesional, UR Training, portfolio, Life Update y validacion comercial.

Este directorio no es una app. Es el sistema operativo de ejecucion.

## Abrir Primero

1. **Plan maestro 6 meses**
   - Humano: [`docs/superpowers/specs/2026-06-07-master-plan-6months.html`](docs/superpowers/specs/2026-06-07-master-plan-6months.html)
   - Agentes: [`docs/superpowers/specs/2026-06-07-master-plan-6months.md`](docs/superpowers/specs/2026-06-07-master-plan-6months.md)
2. **Semana actual**
   - Operativo unico: [`execution/current-week.md`](execution/current-week.md)
   - Visual: [`docs/superpowers/visuals/2026-06-07-weekly-schedule.html`](docs/superpowers/visuals/2026-06-07-weekly-schedule.html)
3. **Review semanal**
   - Template: [`execution/weekly-review-template.md`](execution/weekly-review-template.md)
   - Snapshot: [`baseline/weekly-metrics.yaml`](baseline/weekly-metrics.yaml)

Visual de apoyo, no operativo:

[`docs/superpowers/visuals/2026-06-07-ur-arch-q1.html`](docs/superpowers/visuals/2026-06-07-ur-arch-q1.html)

## Objetivo

Pasar de ~$50k/ano a **$250k/ano** como Product Designer / AI Product Designer remoto.

La cadena causal es:

> Entrenar Product Design -> convertirlo en evidencia -> llevarlo al mercado.

## Metricas Semanales

1. UR Training: respuestas con calidad senior.
2. Portfolio: secciones/case studies publicables.
3. Mercado: aplicaciones o conversaciones laborales de alto valor.
4. En Regla: conversaciones de validacion comercial.
5. Cuerpo: dias con ejercicio.
6. Life Update: check-ins diarios.

## Fuentes Externas

| Dominio | Fuente |
|---|---|
| UR Training / CV / portfolio | `C:\dev\dr-cv` |
| Preguntas UR Training | `C:\dev\dr-cv\UR_training\starting_point\questions.md` |
| Life Update app | `C:\dev\life-update-mobile` |
| En Regla | `C:\dev\enregla` |

## Life Update

La integracion con el plan de dinero esta pausada hasta aprobacion explicita.

Plan pausado:

[`docs/superpowers/plans/2026-06-07-life-update-strategy-integration.md`](docs/superpowers/plans/2026-06-07-life-update-strategy-integration.md)

No ejecutar hasta que Danilo diga:

```text
ejecuta integracion Life Update
```

## Daily tracker

[`daily/index.html`](daily/index.html) es la **fuente unica** del daily (danilorojas.design/daily). El build de la landing (`npm run build:landing-v11`) lo copia a `dist/landing-v11/daily/`. Editar siempre aqui, nunca en dist.

La ruta `/daily` es publica por decision explicita, pero no debe enlazarse desde la landing principal. Se comparte por URL directa cuando haga falta.

## Assessment / training

`C:\dev\dr-cv\UR_training\starting_point\index.html` es la fuente unica de `danilorojas.design/app`. El build de la landing lo copia a `dist/landing-v11/app/`.

La ruta `/app` tambien es publica por decision explicita, pero no debe enlazarse desde la landing principal.

Pendiente futuro: cuando el assessment/daily necesiten sincronizacion multi-dispositivo seria, migrar estado y respuestas a una base de datos real. No ejecutar esa migracion sin aprobacion explicita.

## Migracion

Completada el 2026-06-11: este directorio vive en `C:\dev\dr-cv\estrategia`. Historial en [`MIGRATION-HANDOFF.md`](MIGRATION-HANDOFF.md).

## Archivo

Documentos superseded se guardan en:

[`docs/superpowers/archive/`](docs/superpowers/archive/)

No usar archivos archivados para decidir la semana actual.
