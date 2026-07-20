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
- Búsqueda web en el agente de diseño de Figma / Web search in Figma's design agent [Product Design]
- Seguridad en tiempo de ejecución de agentes / Agentic AI runtime security [AI]
- Atributo HTML focusgroup / HTML focusgroup attribute [Development]
- Motion design nativo en Figma / Native motion design in Figma [Product Design]
- Memoria persistente de agentes vía MCP / Agent persistent memory via MCP [AI]
- flex-wrap: balance en CSS / CSS flex-wrap: balance [Development]
- Weave / plugins generativos en Figma / Weave & generative plugins [Product Design]
- ChatGPT Work (agente de OpenAI para tareas largas) / ChatGPT Work [AI]
- text-fit en CSS / CSS text-fit property [Development]
- Figma Skills (sistema de habilidades para el agente) / Figma Skills system [Product Design]
- Computer-use agéntico por lotes de acciones (Muse Spark 1.1) / Batched computer-use agent [AI]
- background-clip: border-area en CSS / CSS background-clip: border-area [Development]
- Machine Experience (MX) Design [Product Design]
- Claude Cowork multiplataforma + herramientas de escritura M365 / Claude Cowork web/mobile + M365 write tools [AI]
- sibling-index() / sibling-count() en CSS [Development]
- Generative UI / Interfaz generativa [Product Design]
- Ejecución en segundo plano de herramientas del agente / Background tool execution [AI]
- Gap decorations en CSS / CSS gap decorations [Development]

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

### 2026-07-13 · lunes

**Product Design**
**Búsqueda web en el agente de diseño de Figma (ES) / Web search in Figma's design agent (EN)** → función lanzada esta semana en Config 2026 que permite al agente de Figma buscar en la web en vivo para traer mejores prácticas y contenido real en lugar de placeholders "lorem ipsum". → Importa porque elimina el paso manual de research/curación de referencias antes de maquetar, acercando el output del agente a un primer borrador usable en vez de un mockup genérico. → Aplicación: pedirle al agente de Figma que pueble un layout de landing-v11 con copy y datos reales de la industria de tech recruiting en vez de placeholders, y luego curar/editar con criterio senior.

**AI**
**Seguridad en tiempo de ejecución de agentes (ES) / Agentic AI runtime security (EN)** → categoría de herramientas, con cobertura fuerte esta semana (CISA añadió un CVE crítico de Langflow a su catálogo de vulnerabilidades explotadas), que aplica política de seguridad en el momento exacto en que un agente actúa —qué herramienta puede llamar, qué dato puede tocar— en vez de solo revisar el prompt de entrada. → Importa porque cada agente desplegado es una identidad no-humana nueva con credenciales y permisos propios, un "blast radius" que los controles de seguridad tradicionales (firewall, revisión de código) no cubren; es literalmente el tema del kickoff de mañana con PPM. → Aplicación: en el review de arquitectura de agentes production-ready de mañana, proponer límites explícitos de herramientas/datos por agente y logs de auditoría por acción, no solo un guardrail en el prompt del sistema.

**Development**
**Atributo HTML focusgroup (ES) / HTML focusgroup attribute (EN)** → atributo nuevo en Microsoft Edge 150 (lanzado esta semana) que estandariza la navegación por teclado (flechas, Home/End) para widgets compuestos como toolbars, tabs, menús y grupos de radio, sin JS custom. → Importa porque hoy ese comportamiento de teclado hay que reimplementarlo a mano por componente, y es una de las causas más comunes de bugs de accesibilidad en design systems. → Aplicación: usarlo en los componentes de tabs/toolbar de `design-system/` para landing-v11, reemplazando el manejo manual de keydown por una sola línea de HTML declarativo.

### 2026-07-14 · martes

**Product Design**
**Motion design nativo en Figma (ES) / Native motion design in Figma (EN)** → en Config 2026 (esta semana) Figma agregó un timeline de motion con keyframes y presets directamente en Figma Design, más la opción de pedirle al agente de Figma un borrador de animación a partir de un prompt. → Importa porque cierra el círculo de Code Layers (ya cubierto): ya no solo el layout se convierte en código con un clic, ahora la animación misma se define e itera en el mismo archivo, sin handoff a After Effects o Lottie. → Aplicación: prototipar ahí mismo las micro-interacciones propias de `perfil/` (reveal de foto, transición de casos) antes de traducirlas a CSS/JS en el design system.

**AI**
**Memoria persistente de agentes vía MCP (ES) / Agent persistent memory via MCP (EN)** → AgentPrizm lanzó esta semana (9 de julio) AgentMemory + AgentSkills: una API REST sobre infraestructura MCP que le da a un agente memoria que sobrevive entre sesiones, en vez de reiniciar en cero con cada ventana de contexto nueva. → Importa porque resuelve el límite que dejan sin cerrar el patrón actor-evaluador y la arquitectura basada en grafos ya cubiertos: sin memoria persistente, un agente "reaprende" la misma corrección cada sesión en vez de acumular criterio. → Aplicación: conectar un MCP de memoria a un workflow agéntico de dr-cv (p. ej. generación de bullets de CV) para que recuerde qué formulaciones ya rechazó Danilo en sesiones previas, en vez de repetir el mismo error.

**Development**
**flex-wrap: balance en CSS (ES) / CSS flex-wrap: balance (EN)** → Chrome 150 (esta semana) envió este nuevo valor que reparte automáticamente el número de items por línea en un contenedor flex que hace wrap, evitando que la última línea quede con un solo item huérfano. → Importa porque hoy ese balanceo se resuelve a mano con JS o trucos de `nth-child`, y es un problema recurrente en grids de logos, skills o tags. → Aplicación: usarlo en las grids de skills/logos de landing-v11 o del skills sheet para que la última fila nunca quede descuadrada.

### 2026-07-15 · miércoles

**Product Design**
**Weave / plugins generativos (ES) / Weave & generative plugins (EN)** → anunciado en Config 2026 (esta semana): dentro de Figma describes en lenguaje natural la herramienta que necesitas y el agente la construye como un plugin reusable dentro del archivo, sin escribir código. → Importa porque mueve la frontera de "quién puede extender el design system" de un puñado de plugin developers a cualquier diseñador senior con criterio de qué herramienta falta. → Aplicación: pedirle a Weave un plugin que audite que los componentes de landing-v11 usan los tokens correctos de `design-system/tokens-web.css` antes de cada build.

**AI**
**ChatGPT Work (ES: agente de OpenAI para tareas largas / EN: ChatGPT Work)** → lanzado el 9 de julio de 2026 sobre GPT-5.6, es un agente de OpenAI pensado para profesionales que puede trabajar horas seguidas en una tarea compleja (documentos, spreadsheets, presentaciones, apps web) en vez de responder turno a turno. → Importa porque confirma que la carrera entre labs en 2026 ya no es "mejor modelo por benchmark" sino "mejor harness para tareas largas sin supervisión constante" — el mismo tema de fondo de la memoria persistente vía MCP y la arquitectura de grafos ya cubiertas. → Aplicación: al decidir si delegar la generación completa de un CV o skills sheet a un agente, evaluar cuánto tiempo autónomo necesita de verdad vs. cuántos checkpoints humanos conviene mantener.

**Development**
**text-fit en CSS (ES) / CSS text-fit property (EN)** → propiedad nueva, estable esta semana en Chrome 150, que escala automáticamente el tamaño de fuente de un texto para que llene exactamente el ancho de su contenedor, sin JS ni cálculos manuales. → Importa porque hoy ese ajuste de titulares o texto dinámico a un ancho fijo se resuelve con JS custom o media queries frágiles, un problema recurrente en headlines de landing pages. → Aplicación: usarlo en el hero de landing-v11 o en el nombre/título del CV para que el texto siempre llene el contenedor sin importar el idioma (ES/EN) o el largo del nombre.

### 2026-07-16 · jueves

**Product Design**
**Figma Skills (ES: sistema de habilidades para el agente / EN: Figma Skills system)** → anunciado en Config 2026: te deja empaquetar tus propios workflows y convenciones de diseño como instrucciones reutilizables para el agente de Figma, que puedes crear, compartir con tu equipo o importar de la comunidad. → Importa porque es el mismo patrón de las Skills de Claude Code aplicado al diseño: el criterio senior deja de vivir solo en la cabeza del diseñador y se vuelve un artefacto reutilizable que el agente ejecuta consistentemente. → Aplicación: empaquetar como Skill de Figma las convenciones de `design-system/tokens-web.css` (spacing, jerarquía tipográfica, reglas de componentes) para que cualquier generación con el agente las respete sin que Danilo las repita cada vez.

**AI**
**Computer-use agéntico por lotes de acciones (ES) / Batched computer-use agent (EN)** → Meta lanzó esta semana (9 de julio) Muse Spark 1.1, un modelo agéntico que decide cuándo escribir un script y cuándo hacer clic directamente en la interfaz, generando lotes de acciones por paso en vez de razonar clic por clic. → Importa porque marca un salto de eficiencia sobre el patrón "un paso, un clic" de los agentes de computer-use anteriores: menos llamadas al modelo, más tolerancia a interfaces que cambian mientras el agente trabaja. → Aplicación: al automatizar tareas repetitivas en herramientas sin API (ej. subir un CV a un portal de reclutamiento), preferir un agente que planifique un lote de acciones de UI en vez de uno que decida acción por acción.

**Development**
**background-clip: border-area en CSS (ES) / CSS background-clip: border-area (EN)** → Microsoft Edge 150 (julio 2026) agregó este valor que recorta el fondo de un elemento exactamente al área pintada por el trazo del borde, permitiendo bordes con gradiente sin depender de `border-image`. → Importa porque hoy un borde con gradiente exige el truco frágil de `border-image` o un pseudo-elemento extra; esto lo resuelve con una sola declaración de `background` + `background-clip`. → Aplicación: usarlo en los bordes de las tarjetas de casos o badges de skills de landing-v11 para lograr un borde con gradiente de marca sin pseudo-elementos extra en el CSS.

### 2026-07-17 · viernes

**Product Design**
**Machine Experience / MX Design (ES: Diseño de Experiencia de Máquina)** → disciplina emergente en 2026 que diseña contenido y estructura no solo para personas sino para los sistemas de IA (agentes, crawlers, resúmenes) que ahora leen, interpretan y resumen tu producto antes de que un humano lo vea. → Importa porque un landing o CV que no está optimizado para ser "leído" correctamente por un agente de búsqueda o un ATS con IA pierde visibilidad antes de llegar a ojos humanos. → Aplicación: auditar `publicables/` (CV, landing) con la pregunta "¿un agente de IA que resume esto entendería mi propuesta de valor?", no solo "¿se ve bien?".

**AI**
**Claude Cowork multiplataforma + herramientas de escritura M365 (ES) / Claude Cowork on web/mobile + Microsoft 365 write tools (EN)** → esta semana Anthropic expandió Cowork a web y móvil (sesiones y archivos sincronizados entre dispositivos) y agregó herramientas de escritura para Microsoft 365: redactar/enviar email, gestionar eventos de calendario, crear/actualizar archivos de OneDrive y SharePoint directamente desde el agente. → Importa porque es la misma dirección que ya vimos con ChatGPT Work: el agente deja de ser un chat que sugiere texto y pasa a ejecutar la tarea completa en las herramientas reales donde vive el trabajo. → Aplicación: usar un agente conectado a Gmail/Calendar (como el que generó este mismo briefing) para que redacte y agende directamente el seguimiento de postulaciones de trabajo, no solo que lo resuma.

**Development**
**sibling-index() y sibling-count() en CSS (ES) / CSS sibling-index() and sibling-count() (EN)** → funciones nuevas en Chrome y Safari (julio 2026) que devuelven, dentro de cualquier propiedad CSS, la posición de un elemento entre sus hermanos y el total de hermanos, sin depender de `:nth-child()` ni JS. → Importa porque layouts que dependen de "posición relativa" (numerar tarjetas, escalonar animaciones, pintar la última fila distinto) hoy se resuelven con selectores frágiles o JavaScript; esto lo hace nativo y calculable en cualquier propiedad. → Aplicación: usarlo en las grids de casos o skills de landing-v11 para escalonar delays de animación (`animation-delay: calc(sibling-index() * 80ms)`) sin JS extra.

### 2026-07-20 · lunes

**Product Design**
**Generative UI (ES: Interfaz generativa / EN: Generative UI)** → patrón de 2026 en el que la interfaz no es fija sino que un modelo de IA la ensambla en vivo según el contexto, la intención y los datos de cada usuario, en vez de servir la misma pantalla a todos. → Importa porque corre el rol del diseñador de "dibujar cada pantalla" a "definir el sistema de componentes, reglas y restricciones que la IA puede combinar con seguridad" — que es exactamente el trabajo del AI Product Designer. → Aplicación: en EnRegla, en vez de diseñar un formulario estático por cada tipo de pliego, definir un set de componentes + reglas para que un agente arme el formulario correcto según el pliego, curando yo el catálogo y los límites.

**AI**
**Ejecución en segundo plano de herramientas del agente (ES) / Background tool execution (EN)** → patrón formalizado esta semana en las notas de Claude Code (jul 2026: las llamadas MCP que pasan de ~2 min saltan solas a background) donde una herramienta lenta corre de forma asíncrona para que la sesión del agente siga usable en vez de bloquearse esperando el resultado. → Importa porque un agente production-ready que hace tareas largas (builds, scraping, generar PDFs) no puede congelar toda la conversación; separar "disparar" de "esperar el resultado" es lo que lo vuelve usable de verdad. → Aplicación: en workflows agénticos de dr-cv, disparar `npm run build:all` o un scrape largo como tarea en background y seguir trabajando, revisando el output cuando notifique, en vez de bloquear el turno.

**Development**
**Gap decorations en CSS (ES: decoraciones del espacio / EN: CSS gap decorations)** → función nueva (Chrome 149, jun 2026) que permite pintar líneas y separadores directamente en el `gap` entre items de un grid o flexbox, con propiedades tipo `column-rule`/`row-rule`, sin pseudo-elementos ni bordes falsos. → Importa porque hoy los divisores entre tarjetas o columnas se resuelven con `border` + trucos de `:last-child` o pseudo-elementos frágiles; esto lo hace declarativo y responsive por defecto. → Aplicación: usarlo en las grids de skills o de casos de landing-v11 y en el skills sheet para separadores limpios entre columnas sin agregar markup extra.
