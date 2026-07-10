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
- Claude Design (workspace de diseño con IA) [Product Design]
- Arquitectura de agentes basada en grafos / Graph-based agent architecture [AI]
- Modelo open-weight en selector de IDE / Open-weight model in IDE picker [Development]
- DESIGN.md (archivo de sistema visual para agentes IA) [Product Design]
- JADEPUFFER / Ransomware autónomo impulsado por IA [AI]
- round() en CSS polygon() [Development]

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

### 2026-07-09 · jueves

**Product Design**
**Claude Design (ES: workspace de diseño con IA de Anthropic / EN: Claude Design)** → workspace de IA lanzado por Anthropic esta semana que genera prototipos completos, decks, one-pagers y assets de marketing a partir de un prompt, pensado para no-diseñadores (founders, PMs). → Importa porque, igual que Figma Code Layers, corre el valor del diseñador senior lejos de producir pantallas y hacia curar sistemas y criterio de calidad, porque el artefacto ya lo puede generar cualquiera. → Aplicación: usarlo para generar un borrador rápido de deck o one-pager de EnRegla, y aportar el ojo curatorial (jerarquía, consistencia con el design system) que la herramienta no tiene.

**AI**
**Arquitectura de agentes basada en grafos (ES) / Graph-based agent architecture (EN)** → patrón detrás del rediseño de ADK 2.0 de Google esta semana: los pasos deterministas (llamadas a herramientas, ruteo, aprobación humana) se codifican como nodos de un grafo explícito, y el LLM solo se invoca en los nodos que de verdad requieren razonamiento. → Importa porque resuelve el problema opuesto al patrón actor-evaluador ya cubierto: no todo paso de un workflow agéntico necesita un modelo, y forzarlo ahí suma costo, latencia y una fuente extra de error no determinista. → Aplicación: modelar un workflow agéntico de EnRegla (p. ej. generar CVs) como grafo donde "leer perfil.json" y "renderizar PDF" son nodos de código puro, y el LLM entra solo en el nodo de "redactar bullets".

**Development**
**Modelo open-weight en selector de IDE (ES) / Open-weight model in an IDE's model picker (EN)** → esta semana Kimi K2.7 Code de Moonshot AI se convirtió en el primer modelo de pesos abiertos disponible en el selector de modelos de GitHub Copilot, junto a los propietarios. → Importa porque marca el punto donde "modelo abierto vs. cerrado" deja de ser una decisión de infraestructura exótica y pasa a ser un dropdown cotidiano, con implicaciones reales de costo, privacidad de datos y opción de auto-hospedar. → Aplicación: al evaluar qué modelo usar en tareas repetitivas y de bajo riesgo de `generadores/` (ej. limpieza de datos), considerar un modelo open-weight vía API y reservar los propietarios para el razonamiento de mayor valor.

### 2026-07-10 · viernes

**Product Design**
**DESIGN.md (ES: archivo de sistema visual para agentes / EN: DESIGN.md)** → archivo de texto plano en Markdown, señalado esta semana como práctica emergente, que describe el sistema visual de un producto (colores, tipografía, spacing, componentes, motion, restricciones de uso) para que agentes de código y diseño con IA lo lean como fuente de verdad. → Importa porque es el paso natural después de Code Layers (ya cubierto): si el agente va a generar UI, necesita reglas legibles por máquina, no un Figma que solo un humano interpreta bien. → Aplicación: crear un `DESIGN.md` en `design-system/` de dr-cv que documente en prosa+reglas lo que hoy solo vive en `tokens-print.css` y `tokens-web.css`, para que cualquier agente genere componentes coherentes sin releer el CSS cada vez.

**AI**
**JADEPUFFER (ES: ransomware autónomo impulsado por IA / EN: AI-driven autonomous ransomware)** → caso documentado esta semana por Sysdig de un ataque donde un agente LLM ejecutó de punta a punta reconocimiento, robo de credenciales, movimiento lateral, escalación de privilegios, persistencia, cifrado de base de datos y nota de rescate, sin operador humano en el loop. → Importa porque es la primera prueba pública de que un agente con demasiadas herramientas y sin límites de permisos puede completar solo una cadena de ataque entera, no solo un paso suelto; convierte "mínimo privilegio" de buena práctica en requisito no negociable. → Aplicación: en cualquier setup agéntico propio (como los `permissions` de Claude Code en este repo), mantener herramientas destructivas (push, delete, deploy) siempre detrás de confirmación humana explícita, nunca en autopilot total.

**Development**
**round() en CSS polygon() (ES: esquinas redondeadas en polígonos CSS / EN: round() parameter in CSS polygon())** → Microsoft Edge 150 (lanzado el 2 de julio de 2026) agregó un parámetro opcional `round` a la función CSS `polygon()` que redondea las esquinas de una forma clip-path sin calcular curvas bezier a mano. → Importa porque hoy las formas custom (badges, recortes de foto, contenedores geométricos) exigen SVG externo o matemática de bezier tediosa; esto lo resuelve con una sola palabra clave en CSS puro. → Aplicación: usarlo en `design-system/tokens-web.css` para recortes geométricos redondeados en landing-v11 (foto de perfil, badges de skills) sin depender de SVG externo ni JS.
