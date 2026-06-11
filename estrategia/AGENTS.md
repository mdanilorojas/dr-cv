# Estrategia Danilo Pro - Guia de Navegacion

Este directorio es el centro de comando de la estrategia de vida/carrera de Danilo. No es una app ni un producto: conecta, prioriza y ejecuta sobre herramientas externas.

## Fuentes de Verdad

| Dominio | Fuente | No duplicar aqui |
|---|---|---|
| Estrategia | `Estrategia Danilo Pro` | Codigo de apps externas |
| Skills / portfolio / CV | `C:\dev\dr-cv` | Generators, data YAML, respuestas UR completas |
| Tracking diario | `C:\dev\life-update-mobile` | Logica de app, Supabase |
| Validacion comercial | `C:\dev\enregla` | Producto, migraciones DB |

## Abrir Primero

1. Plan maestro:
   - `docs/superpowers/specs/2026-06-07-master-plan-6months.md`
   - `docs/superpowers/specs/2026-06-07-master-plan-6months.html`
2. Semana actual:
   - `execution/current-week.md`
   - `docs/superpowers/visuals/2026-06-07-weekly-schedule.html`
3. Review:
   - `execution/weekly-review-template.md`
   - `baseline/weekly-metrics.yaml`

## Mapa

```text
Estrategia Danilo Pro/
|-- AGENTS.md
|-- README.md
|-- MIGRATION-HANDOFF.md
|-- links.yaml
|-- baseline/
|   `-- weekly-metrics.yaml
|-- execution/
|   |-- current-week.md
|   |-- priority-pyramid.md
|   `-- weekly-review-template.md
`-- docs/superpowers/
    |-- specs/
    |   |-- 2026-06-07-master-plan-6months.md
    |   `-- 2026-06-07-master-plan-6months.html
    |-- plans/
    |   `-- 2026-06-07-life-update-strategy-integration.md
    |-- visuals/
    |   |-- 2026-06-07-weekly-schedule.html
    |   `-- 2026-06-07-ur-arch-q1.html
    `-- archive/
        `-- 2026-06-07-superseded/
```

## Reglas

1. Una fuente de verdad por dominio.
2. `execution/current-week.md` es el unico archivo operativo semanal.
3. El plan maestro de 6 meses manda sobre specs anteriores.
4. Life Update esta pausado para implementacion hasta aprobacion explicita.
5. En Regla es validacion, no empresa principal, hasta 3/10 conversaciones con interes real.
6. Objetivo primario: subir valor de mercado como Product Designer / AI Product Designer remoto ($250k).
7. `/daily` y `/app` son publicos pero no enlazados desde la landing principal.
8. Migrar assessment/daily a base de datos real queda pendiente; no ejecutar sin aprobacion explicita.

## Comandos Externos

| Accion | Donde | Comando |
|---|---|---|
| Evaluacion de skills | `C:\dev\dr-cv` | `node UR_training/starting_point/server.js` |
| Portfolio build | `C:\dev\dr-cv` | `npm run build:all` |
| Life Update local | `C:\dev\life-update-mobile` | `npx expo start --clear` |
| En Regla local | `C:\dev\enregla` | Ver `enregla/AGENTS.md` |

## Frase Operativa

> No necesito claridad total. Necesito ejecutar el siguiente movimiento correcto.
