# Migration Handoff

**Objetivo:** mover esta estrategia para que viva dentro de `C:\dev\dr-cv` como parte del continuo de identidad profesional, portfolio, UR Training y plan de mercado.

## Fuente actual

`C:\dev\Estrategia Danilo Pro`

## Destino preparado

`C:\dev\dr-cv\Estrategia Danilo Pro`

## Estado de migracion

- Copia preparada el 2026-06-07.
- **Migracion de carpeta completada el 2026-06-11**: la carpeta vive en `C:\dev\dr-cv\estrategia` (renombrada, sin espacios).
- **Pendiente de cierre**: revisar `git status`, validar build/tests y commitear la migracion cuando Danilo confirme.
- Se agrego `daily/index.html` como fuente unica del daily tracker; el build de la landing lo copia a `dist/landing-v11/daily/`.
- El original en `C:\dev\Estrategia Danilo Pro` queda intacto; borrarlo cuando Danilo confirme.

## Fuente de verdad despues de migrar

1. `README.md` - entrada principal del sistema.
2. `docs/superpowers/specs/2026-06-07-master-plan-6months.md` - plan estrategico.
3. `execution/current-week.md` - unico archivo operativo semanal.
4. `docs/superpowers/plans/2026-06-07-life-update-strategy-integration.md` - plan pausado para conectar Life Update.
5. `baseline/weekly-metrics.yaml` - snapshot para review dominical.

## Estado Life Update

No ejecutar todavia.

En `C:\dev\life-update-mobile` ya existen:

- SQL: `supabase/sql/2026-06-07-strategy-fields.sql`
- Tipos: `types/index.ts`

Pendiente:

- Persistir campos en `lib/api.ts`
- Agregar campos al formulario `components/forms/DailyEntryForm.tsx`

## Pendiente futuro: base de datos real

No ejecutar todavia.

Cuando el assessment, el daily tracker o el plan de entrenamiento necesiten sincronizacion multi-dispositivo seria, migrar estado/respuestas a una base de datos real. Por ahora las fuentes siguen siendo archivos del repo:

- `UR_training/starting_point/answers_state.json`
- `UR_training/starting_point/answers.md`
- `estrategia/daily/index.html`

## Primer prompt sugerido para el nuevo chat

```text
Evalua el estado actual de C:\dev\dr-cv\Estrategia Danilo Pro.
No hagas cambios todavia.
Confirma si README.md, master plan 6 meses, execution/current-week.md y el plan pausado de Life Update estan alineados.
Luego propon la siguiente accion.
```
