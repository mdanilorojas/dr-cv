# Plan: Integrar Life Update con Estrategia Danilo Pro

**Fecha:** 2026-06-07
**Repositorio:** `C:\dev\life-update-mobile` â†’ https://github.com/mdanilorojas/life-update-mobile
**Estado:** Plan pendiente de aprobaciÃ³n â€” NO ejecutar hasta confirmar

---

## Problema

Life Update ya trackea bienestar diario (energÃ­a, estrÃ©s, sueÃ±o, ejercicio).
Lo que **no** trackea: el progreso del plan de carrera que determinarÃ¡ si Danilo llega a $250k.

Actualmente, las 80 preguntas de UR Training, el portfolio, las aplicaciones enviadas y las conversaciones de En Regla no quedan registradas en ningÃºn lugar estructurado.

---

## Objetivo

Que el check-in diario de Life Update tambiÃ©n capture las 4 mÃ©tricas del plan de carrera, sin eliminar nada de lo que ya existe.

---

## Lo que ya existe (no tocar)

| Campo | Tipo | QuÃ© mide |
|---|---|---|
| energy_level | slider 1â€“10 | EnergÃ­a del dÃ­a |
| stress_level | slider 1â€“10 | EstrÃ©s del dÃ­a |
| deep_work_hours | slider 0â€“12 | Horas de trabajo profundo |
| trained_today | checkbox | Entrenamiento completado |
| clean_today | checkbox | DÃ­a limpio (alcohol/porn/tabaco) |
| physical_pain | checkbox + texto | Dolor fÃ­sico |
| sleep_hours | slider 0â€“12 | Horas de sueÃ±o |
| weight_lb | slider semanal | Peso corporal |
| quick_note | texto libre | Nota del dÃ­a |

---

## Lo que se agrega

4 campos nuevos en la tabla `daily_entries` (migraciÃ³n ya aplicada en Supabase el 2026-06-07):

| Campo DB | Tipo | Pregunta en el form |
|---|---|---|
| `ur_training_today` | INTEGER (0â€“10) | Â¿CuÃ¡ntas preguntas del plan de 80 respondiste hoy con calidad? |
| `portfolio_progress` | TEXT | Â¿QuÃ© avanzaste en portfolio o case study hoy? |
| `job_applications` | INTEGER (0â€“9) | Â¿CuÃ¡ntas aplicaciones o mensajes a recruiters enviaste? |
| `enregla_conversations` | INTEGER (0â€“9) | Â¿CuÃ¡ntas conversaciones de validaciÃ³n tuviste hoy? |

### UbicaciÃ³n en el form

Nueva secciÃ³n **"Plan de Carrera"** al final del formulario diario, antes del botÃ³n Guardar.

```
[ EnergÃ­a ] [ EstrÃ©s ] [ Deep Work ] [ Peso ] [ SueÃ±o ]
[ HÃ¡bitos: entrenÃ³ / limpio / dolor ]
[ Nota rÃ¡pida ]
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
PLAN DE CARRERA                          â† secciÃ³n nueva
  Â¿Preguntas UR respondidas hoy?    [_]
  Â¿QuÃ© avanzaste en portfolio?   [_____]
  Â¿Aplicaciones enviadas?           [_]
  Â¿Convos En Regla hoy?             [_]
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
[ Guardar Entrada ]
```

### Interfaz de los campos numÃ©ricos

OpciÃ³n A (mÃ¡s simple): `GlassInput` con `keyboardType="numeric"`, valor por defecto "0".
OpciÃ³n B (mejor UX): Mini-contador con botones +/âˆ’ usando componentes existentes.

**RecomendaciÃ³n: OpciÃ³n A primero.** Si el uso diario muestra que es molesto tipear nÃºmeros, se cambia a B. No sobre-construir antes de usar.

---

## Cambios de cÃ³digo necesarios

### 1. `types/index.ts`
Agregar a `DailyEntryInput`:
```ts
urTrainingToday: number;
portfolioProgress: string;
jobApplications: number;
enreglaConversations: number;
```
Agregar a `DailyEntryRow`:
```ts
ur_training_today: number | null;
portfolio_progress: string | null;
job_applications: number | null;
enregla_conversations: number | null;
```

### 2. `lib/api.ts` â†’ `createDailyEntry`
Agregar al payload:
```ts
ur_training_today: data.urTrainingToday,
portfolio_progress: data.portfolioProgress || null,
job_applications: data.jobApplications,
enregla_conversations: data.enreglaConversations,
```

### 3. `components/forms/DailyEntryForm.tsx`
Agregar estados y secciÃ³n nueva antes del botÃ³n submit.
Estados: `urTrainingToday` (0), `portfolioProgress` (''), `jobApplications` (0), `enreglaConversations` (0).
Inicializar desde `initialEntry` si existe.

### 4. `app/(tabs)/plan.tsx` (futuro â€” no ahora)
Pantalla Plan ya existe. Agregar vista de progreso acumulado:
- Total UR Training respondidas (suma histÃ³rica de `ur_training_today`)
- Progress bar hacia 30/80 (meta M1)
- Totales semana: aplicaciones, convos En Regla

---

## Lo que NO se hace en este sprint

- No se toca la pantalla de historial
- No se modifica el coach
- No se agrega lÃ³gica de validaciÃ³n compleja
- No se crea pantalla nueva
- No se cambia ningÃºn flujo existente

---

## Criterio de "listo"

1. Formulario diario muestra los 4 nuevos campos
2. Al guardar, los valores se persisten en Supabase
3. Al editar una entrada existente, los campos se precargan correctamente
4. Todo lo anterior sin romper ningÃºn campo o flujo existente

---

## Estado de la migraciÃ³n DB

MigraciÃ³n aplicada el 2026-06-07:
```sql
ALTER TABLE daily_entries
  ADD COLUMN IF NOT EXISTS ur_training_today     INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS portfolio_progress    TEXT,
  ADD COLUMN IF NOT EXISTS job_applications      INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS enregla_conversations INTEGER DEFAULT 0;
```

Los tipos en `types/index.ts` tambiÃ©n fueron actualizados el mismo dÃ­a.
Pendiente: `lib/api.ts` y `components/forms/DailyEntryForm.tsx`.

---

## CuÃ¡ndo ejecutar

Cuando Danilo apruebe este plan y diga "ejecuta".
No antes.
