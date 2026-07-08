# Aprendizaje diario — camino a AI Product Designer

Log de snippets del **Briefing** (lun–vie 08:00). Cada día: **1 Product Design · 1 AI · 1 Development**.
Objetivo: crecer poco a poco hacia AI Product Designer, con vocabulario y conocimiento que hoy me falta.

## Reglas para el agente del briefing

1. **Lee TODO este archivo antes de escribir.** No repitas ningún término ya cubierto (revisa el índice de abajo).
2. **Prioriza información actual** — usa WebSearch para traer algo real de esta semana (una herramienta nueva, un release, un patrón que esté surgiendo). Cuando no haya nada notablemente nuevo en un área, enseña un **fundamento** que me falte para crecer hacia AI Product Designer (background sólido > relleno).
3. **Formato por snippet:** `**Término (ES + EN)**` → definición en 1 frase → por qué importa → ejemplo de cómo lo aplico en mi trabajo (EnRegla, design systems, workflows agénticos).
4. **Añade la entrada del día al FINAL** de la sección "Log", con fecha y día de semana. Agrega los términos nuevos al índice.
5. Al terminar: `git add`, `git commit`, `git push` a `main`. Si hay conflicto, haz `git pull --rebase` y reintenta.

---

## Índice de términos cubiertos

_(el agente mantiene esta lista para no repetir — uno por línea, área entre corchetes)_

- Code Layers [Product Design]
- Patrón Actor-Evaluador / Reflection pattern [AI]
- Idempotencia / Idempotency [Development]

---

## Log

<!-- El agente agrega aquí abajo. Más reciente al final. Ejemplo de formato:

### 2026-07-08 · martes

**Product Design**
**Term (ES + EN)** → definición → por qué importa → ejemplo aplicado.

**AI**
**Term (ES + EN)** → definición → por qué importa → ejemplo aplicado.

**Development**
**Term (ES + EN)** → definición → por qué importa → ejemplo aplicado.

-->

### 2026-07-08 · miércoles

**Product Design**
**Code Layers (ES: Capas de código / EN: Code Layers)** → función nueva de Figma (Config 2026, esta semana) que convierte cualquier capa de diseño en una capa de código interactiva y funcional con un clic o un prompt. → Importa porque acorta la brecha diseño→desarrollo que la propia comunidad UX está señalando esta semana como "deuda de design system" que ahora paga todo el equipo, no solo el diseñador. → Aplicación: usarlo para entregar componentes de EnRegla o del design system como código casi-funcional en vez de specs estáticas, reduciendo ciclos de handoff.

**AI**
**Patrón Actor-Evaluador (ES) / Actor-Evaluator (Reflection) pattern (EN)** → arquitectura de agentes donde un modelo "actor" genera una respuesta y un segundo modelo o chequeo externo ("evaluador/crítico") la mide contra pruebas concretas, revisando en bucle hasta pasar o llegar a un límite. → Importa porque esta semana se señaló como el patrón líder de agentes 2026: un agente de un solo paso envía errores que un crítico separado sí detecta; las mejoras durables vienen de críticos con base real, límites de iteración y salidas claras, no de que el modelo se auto-discuta. → Aplicación: en un workflow agéntico que genera bullets de CV, agregar un paso "evaluador" que verifique cada bullet contra los datos reales de perfil antes de aceptarlo.

**Development**
**Idempotencia (ES) / Idempotency (EN)** → una operación es idempotente si produce el mismo resultado final sin importar cuántas veces se ejecute, incluso tras un fallo a medias. → Importa porque es la propiedad que hace seguro reintentar pipelines de build o llamadas de herramientas de un agente sin duplicar efectos secundarios. → Aplicación: diseñar los scripts de `generadores/` (y cualquier task runner agéntico) para que, si se cortan a medias, volver a correr `npm run build:all` sobrescriba `dist/` limpio en vez de acumular o duplicar archivos.
