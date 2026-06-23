# Ruta de lectura — Product Designer avanzado + ingeniería + AI agents

**Fecha:** 2026-06-22  
**Perfil objetivo:** Product Designer senior/estratégico que puede dirigir sistemas ejecutables: UX, producto, ingeniería, IA, repos, prototipos, pruebas, automatización, compliance y handoff real.

---

## 1. Decisión principal

No leas los artículos **del más nuevo al más viejo** ni **del más viejo al más nuevo**.

Tu ruta debe ser por **dependencias cognitivas**:

1. Primero lo que te da **juicio de producto**.
2. Luego lo que te da **arquitectura mental de agentes**.
3. Luego lo que te da **método de ejecución en repos/prototipos**.
4. Al final, lo nuevo de la semana: loops, auto-research, subagents, MCP, Figma agents, Codex/Cursor/Claude updates.

La fórmula práctica:

```text
70% backbone: fundamentos durables
20% tooling: docs y flujos de herramientas que usas hoy
10% frontier: artículos recientes de la semana
```

La trampa a evitar: leer solo lo nuevo y sentir que avanzas, cuando en realidad solo estás persiguiendo vocabulario. Lo nuevo vale más cuando ya tienes el mapa mental para ubicarlo.

---

## 2. Tesis de carrera para filtrar lecturas

Tu objetivo no es “saber más IA”. Es convertirte en este perfil:

> Product Designer que transforma ambigüedad de negocio en dirección ejecutable para humanos y agentes.

Eso significa que cada lectura debe ayudarte a mejorar una de estas capacidades:

- Entender el problema correcto.
- Diseñar flujos, estados, reglas y excepciones.
- Traducir decisiones de producto a specs, tickets, prototipos, prompts, reglas, pruebas y PRs.
- Saber cuándo un agente debe actuar, cuándo debe parar y cómo debe demostrar evidencia.
- Diseñar interfaces para humanos, pero también estructuras legibles para agentes: docs, componentes, tokens, APIs, archivos, MCP, tests, logs.
- Proteger el juicio: no dejar que la velocidad de Codex/Claude/Cursor reemplace criterios de UX, negocio, seguridad, accesibilidad y mantenibilidad.

---

## 3. Regla de triage para cualquier artículo nuevo

Antes de leer un artículo, clasifícalo:

### A. Leer profundo

Léelo completo si cumple al menos dos:

- Cambia tu modelo mental.
- Se conecta con EnRegla, landing, compliance ops, product design, design systems, IA aplicada o repos reales.
- Viene de fuente primaria: OpenAI, Anthropic, Google, Figma, Cursor, Basecamp, Microsoft Research, paper académico.
- Te deja una herramienta reusable: checklist, patrón, prompt, arquitectura, criterio de evaluación.

### B. Leer rápido

Skim de 10–15 minutos si es:

- Announcement de producto.
- Trend piece tipo “loops are the new prompting”.
- Thread con ejemplos útiles pero poco fundamento.
- Benchmark sin metodología clara.

### C. Guardar, no leer todavía

Guárdalo si es útil, pero requiere una capacidad previa que aún no consolidaste. Ejemplo: multi-agent orchestration avanzada antes de entender workflows simples.

### D. Ignorar

Ignora:

- Predicciones genéricas de empleos.
- “AI changed everything” sin patrón concreto.
- Benchmarks usados como marketing.
- Artículos que te hacen comprar otra herramienta sin mejorar tu proceso.

---

## 4. Orden recomendado de lectura

La ruta está organizada en 6 bloques. No saltes al bloque 5 si no tienes los bloques 1–3 claros.

---

# BLOQUE 1 — Producto: juicio antes de herramientas

**Objetivo:** recuperar el centro. Antes de loops, auto-research o agentes, necesitas saber qué vale la pena construir y cómo acotar trabajo.

## 1. Shape Up — Introduction

**Link:** https://basecamp.com/shapeup/0.3-chapter-01  
**Prioridad:** Must-read  
**Tiempo:** 45–60 min

**Por qué va primero:** porque enseña a pensar en shaping, riesgo, límites, ciclos y responsabilidad. Para ti es clave porque un agente sin un appetite claro solo acelera caos.

**Qué extraer:**

- Cómo definir trabajo “bounded”.
- Cómo separar shaping de building.
- Cómo convertir ideas vagas en proyectos con límites.
- Cómo pensar en riesgo antes de ejecución.

**Output:** escribe una página llamada `product-shaping-rules.md` con 10 reglas para tus proyectos.

---

## 2. Shape Up — Principles of Shaping / Set Boundaries

**Link:** https://basecamp.com/shapeup/4.0-appendix-01  
**Prioridad:** Must-read  
**Tiempo:** 60 min

**Qué extraer:**

- Appetite > estimate.
- Rough, solved, bounded.
- Work that matters, not endless backlog.

**Aplicación directa:** EnRegla no debería ser “construir un SaaS”. Debe ser un bet de 6 semanas: por ejemplo, “carpeta viva de cumplimiento para constructoras con 1 flujo verificable”.

---

## 3. Microsoft HAX Toolkit — Guidelines for Human-AI Interaction

**Link:** https://www.microsoft.com/en-us/haxtoolkit/?p=105  
**Prioridad:** Must-read  
**Tiempo:** 60–90 min

**Por qué importa:** es una base seria para diseñar experiencias con IA: qué puede hacer el sistema, qué tan bien lo hace, cómo corregirlo cuando falla y cómo calibrar confianza.

**Qué extraer:**

- Cómo diseñar onboarding de capacidades y límites.
- Cómo mostrar incertidumbre.
- Cómo permitir corrección y recuperación.
- Cómo diseñar interacción con sistemas no determinísticos.

**Output:** crea una checklist de 18 puntos para evaluar cualquier feature IA que diseñes.

---

## 4. Design Principles for Generative AI Applications

**Link:** https://arxiv.org/abs/2401.14484  
**Prioridad:** Must-read  
**Tiempo:** 60–90 min

**Por qué importa:** traduce UX tradicional a sistemas generativos. Esto te ayuda a no caer en “poner un chat” como solución universal.

**Qué extraer:**

- Control del usuario.
- Transparencia.
- Iteración.
- Prevención de daño.
- Diseño para fallos inevitables.

---

# BLOQUE 2 — Fundamentos de agentes: entender el loop real

**Objetivo:** entender qué es un agente antes de leer sobre “loop engineering”.

## 5. The Bitter Lesson — Richard Sutton

**Link:** http://www.incompleteideas.net/IncIdeas/BitterLesson.html  
**Prioridad:** Must-read  
**Tiempo:** 30–45 min

**Por qué va aquí:** te da el criterio de fondo: los sistemas que escalan suelen ganar sobre reglas manuales demasiado humanas. Pero para producto, la conclusión correcta no es “automatiza todo”; es “diseña sistemas donde búsqueda, feedback y aprendizaje puedan operar”.

**Qué extraer:**

- Search + learning como patrón central.
- Por qué conviene diseñar entornos donde el agente pueda probar, observar y corregir.

---

## 6. LLM Powered Autonomous Agents — Lilian Weng

**Link:** https://lilianweng.github.io/posts/2023-06-23-agent/  
**Prioridad:** Must-read  
**Tiempo:** 90–120 min

**Por qué importa:** es el mapa mental clásico: planning, memory, tool use, reflection.

**Qué extraer:**

- Planning: cómo se descompone una tarea.
- Memory: qué debe recordar el sistema.
- Tool use: cómo se conecta a acciones reales.
- Reflection: cómo mejora después de fallar.

**Output:** dibuja tu propio mapa: `agent-system-overview-for-product-design.md`.

---

## 7. ReAct: Synergizing Reasoning and Acting in Language Models

**Link:** https://arxiv.org/abs/2210.03629  
**Prioridad:** Must-read, pero puedes leer abstract + intro + diagrams  
**Tiempo:** 45–60 min

**Por qué importa:** ReAct es la base mental de muchos agentes: razonar, actuar, observar, ajustar.

**Qué extraer:**

- Por qué el agente necesita acciones externas, no solo “pensar”.
- Por qué observar resultados reduce alucinación.
- Cómo se ve un loop de acción verificable.

---

## 8. Reflexion: Language Agents with Verbal Reinforcement Learning

**Link:** https://arxiv.org/abs/2303.11366  
**Prioridad:** Must-read parcial  
**Tiempo:** 45–60 min

**Por qué importa:** introduce una idea crucial para tus workflows: el agente puede mejorar sin reentrenarse si guarda feedback verbal y lo usa en próximos intentos.

**Qué extraer:**

- Feedback textual.
- Episodic memory.
- Aprendizaje por intentos.
- Cómo convertir errores repetidos en reglas del repo o del workflow.

---

# BLOQUE 3 — Arquitectura práctica de agentes

**Objetivo:** pasar de papers a patrones de producción.

## 9. Anthropic — Building Effective Agents

**Link:** https://www.anthropic.com/engineering/building-effective-agents  
**Prioridad:** Must-read  
**Tiempo:** 90 min

**Por qué importa:** distingue workflows de agents y recomienda empezar simple. Es probablemente el artículo más importante para no sobreconstruir.

**Qué extraer:**

- Workflow vs agent.
- Prompt chaining.
- Routing.
- Parallelization.
- Orchestrator-workers.
- Evaluator-optimizer.
- Cuándo NO usar agentes.

**Output:** crea `agent-patterns-for-enregla.md` con 5 flujos posibles y cuál usarías primero.

---

## 10. OpenAI — A Practical Guide to Building Agents

**Link:** https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/  
**Prioridad:** Must-read  
**Tiempo:** 90 min

**Por qué importa:** está escrito para product + engineering teams. Te ayuda a traducir use cases a herramientas, instrucciones, orquestación y guardrails.

**Qué extraer:**

- Cuándo un caso amerita agente.
- Cómo diseñar instrucciones.
- Cómo diseñar tools.
- Cómo pensar guardrails y handoffs.

**Aplicación directa:** Compliance Ops: agente que revisa documentos, detecta vencimientos, genera checklist, crea evidencia, pero no toma decisiones legales sin revisión humana.

---

## 11. OpenAI Cookbook — GPT-4.1 Prompting Guide

**Link:** https://cookbook.openai.com/examples/gpt4-1_prompting_guide  
**Prioridad:** Must-read táctico  
**Tiempo:** 60 min

**Por qué importa:** tiene patrones útiles para agentes: persistencia, tool use, planificación, instrucciones literales, diff/editing, long context.

**Qué extraer:**

- Cómo escribir instrucciones que no se diluyen.
- Cómo pedir comportamiento agentic sin perder control.
- Cómo estructurar tareas de código y documentación.

---

## 12. Anthropic — The “think” tool / extended thinking

**Link:** https://www.anthropic.com/engineering/claude-think-tool  
**Prioridad:** Leer conceptual  
**Tiempo:** 45 min

**Por qué importa:** no por el “truco”, sino por el patrón: en tareas con herramientas, el agente necesita pausas de deliberación antes o entre acciones.

**Qué extraer:**

- Cuándo conviene más razonamiento.
- Cuándo conviene acción directa.
- Cómo insertar checkpoints antes de tocar archivos, correr scripts o producir decisiones.

---

# BLOQUE 4 — Herramientas que usas: Claude Code, Codex, Cursor

**Objetivo:** que las herramientas dejen de ser “chat con esteroides” y se vuelvan infraestructura de trabajo.

## 13. Anthropic — Claude Code Best Practices

**Link:** https://www.anthropic.com/engineering/claude-code-best-practices  
**Prioridad:** Must-read operativo  
**Tiempo:** 60–90 min

**Qué extraer:**

- Cómo iniciar repos.
- Cómo dar contexto.
- Cómo pedir cambios pequeños.
- Cómo revisar outputs.
- Cómo usar Claude como agente de código, no como chatbot.

**Output:** actualiza un `CLAUDE.md` real de tu repo.

---

## 14. Claude Code Docs — Common Workflows

**Link:** https://code.claude.com/docs/en/common-workflows  
**Prioridad:** Must-read práctico  
**Tiempo:** 45–60 min

**Qué extraer:**

- Codebase overview.
- Find relevant code.
- Trace flow.
- Fix bugs.
- Refactor.
- Write tests.
- Create PRs.
- Work with images.
- Schedule runs.

**Aplicación directa:** úsalo para tus repos de landing, EnRegla, Aura, compliance docs.

---

## 15. Claude Code Docs — Memory / CLAUDE.md

**Link:** https://code.claude.com/docs/en/memory  
**Prioridad:** Must-read práctico  
**Tiempo:** 45 min

**Por qué importa:** si los agentes repiten errores, el problema no es solo el modelo; es tu memoria del proyecto.

**Qué extraer:**

- `CLAUDE.md` para reglas del proyecto.
- Auto memory para aprendizajes.
- Reglas por carpeta.
- Qué debe ir en instrucciones permanentes vs skills.

---

## 16. OpenAI — Introducing Codex

**Link:** https://openai.com/index/introducing-codex/  
**Prioridad:** Must-read operativo  
**Tiempo:** 45–60 min

**Qué extraer:**

- Codex como agente que trabaja en un entorno propio.
- Evidencia de logs y tests.
- Revisión, PRs, integración local.
- `AGENTS.md` como guía del repo.

**Output:** crea un `AGENTS.md` base para cada repo importante.

---

## 17. OpenAI — Codex Product Page / Help

**Links:**  
- https://openai.com/codex/  
- https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan

**Prioridad:** Skim mensual  
**Tiempo:** 20–30 min

**Qué extraer:**

- Cambios de disponibilidad.
- Worktrees.
- Skills.
- Multi-agent coding workflows.
- Límites y planes.

---

## 18. Cursor — Rules

**Link:** https://docs.cursor.com/context/rules  
**Prioridad:** Must-read si usas Cursor  
**Tiempo:** 45 min

**Qué extraer:**

- `.cursor/rules`.
- Project rules vs user rules vs memories.
- Rules como contexto reusable.
- Cómo evitar repetir instrucciones en cada chat.

---

## 19. Cursor — Background Agents

**Link:** https://docs.cursor.com/background-agent  
**Prioridad:** Leer si vas a correr trabajo paralelo  
**Tiempo:** 30 min

**Qué extraer:**

- Cuándo usar agentes remotos.
- Cómo dar follow-up.
- Cuándo tomar control.
- Qué tipo de tareas conviene delegar.

---

## 20. Cursor — Bugbot updates, June 2026

**Link:** https://cursor.com/changelog/bugbot-updates-june-2026  
**Prioridad:** Skim  
**Tiempo:** 20 min

**Por qué importa:** la tendencia es clara: la velocidad de agentes exige revisión automática, security review y feedback antes del PR.

**Qué extraer:**

- `/review` antes de push.
- Bugbot + security review.
- Revisiones incrementales.
- Cómo separar agente escritor de agente revisor.

---

# BLOQUE 5 — Lo nuevo: loops, auto-research, harnesses, skills

**Objetivo:** ahora sí leer lo reciente, porque ya tienes el marco.

## 21. Addy Osmani — Loop Engineering

**Link:** https://addyosmani.com/blog/loop-engineering/  
**Prioridad:** Must-read actual  
**Tiempo:** 45–60 min

**Por qué importa:** esto es exactamente lo que mencionaste: pasar de escribir prompts a diseñar loops que promptéan agentes.

**Lectura correcta:** no lo leas como hype. Léelo como arquitectura operacional.

**Qué extraer:**

- Qué es un loop.
- Qué condiciones de salida necesita.
- Por qué worktrees importan.
- Por qué skills/plugins/connectors/subagents importan.
- Riesgo de costo/token burn.

**Output:** crea `LOOP.md` con un loop real para tu landing o EnRegla:

```md
# LOOP.md
Goal:
Success criteria:
Allowed files:
Disallowed actions:
Verification commands:
Reviewer agent:
Max iterations:
Stop conditions:
Final evidence required:
```

---

## 22. Addy Osmani — Agent Harness Engineering

**Link:** https://addyosmani.com/blog/agent-harness-engineering/  
**Prioridad:** Must-read  
**Tiempo:** 45–60 min

**Por qué importa:** es la pieza que conecta con tu realidad. No gana quien “promptea mejor”; gana quien construye mejor scaffolding: prompts, tools, tests, hooks, sandboxes, feedback loops, recovery paths.

**Qué extraer:**

- El modelo no es el producto completo.
- El harness es infraestructura.
- Cada error repetido debe convertirse en una regla, test, hook o skill.

---

## 23. Addy Osmani — Agent Skills

**Link:** https://addyosmani.com/blog/agent-skills/  
**Prioridad:** Must-read  
**Tiempo:** 45 min

**Por qué importa:** para tu perfil, los skills son una forma de empaquetar criterio senior: no solo “hazlo”, sino “hazlo como un senior lo revisaría”.

**Qué extraer:**

- Spec writing.
- Tests.
- Reviewability.
- Security boundaries.
- Evidence.
- Scope discipline.

**Output:** crea 3 skills conceptuales:

1. `product-spec-skill.md`
2. `ux-review-skill.md`
3. `compliance-evidence-skill.md`

---

## 24. Addy Osmani — Agent Engineer Course

**Link:** https://addyosmani.com/agents/  
**Prioridad:** Referencia continua  
**Tiempo:** 19 lecciones, no leer todo de golpe

**Cómo usarlo:** úsalo como índice. Lee una lección cuando te falte ese concepto en un proyecto real.

**Orden sugerido dentro del curso:**

1. What are AI agents?
2. Tools.
3. Agentic design patterns.
4. Memory and context.
5. Multi-agent systems.
6. Agent skills.
7. Orchestrators.

---

## 25. OpenAI — Deep Research

**Links:**  
- https://openai.com/index/introducing-deep-research/  
- https://help.openai.com/en/articles/10500283

**Prioridad:** Must-read para auto-research  
**Tiempo:** 45–60 min

**Qué extraer:**

- Multi-step research.
- Plan before execution.
- Source selection.
- Interrupt/refine.
- Citations and verifiability.
- Public web + uploaded files + connected apps.

**Aplicación directa:** crear research reports para compliance, API Ecuador, verticales UAFE, permisos, benchmarking de software regulado.

---

## 26. Google — Gemini Deep Research Agent / Deep Research Max

**Links:**  
- https://ai.google.dev/gemini-api/docs/interactions/deep-research  
- https://blog.google/innovation-and-ai/models-and-research/gemini-models/next-generation-gemini-deep-research/

**Prioridad:** Leer para arquitectura, no solo producto  
**Tiempo:** 45–60 min

**Qué extraer:**

- Collaborative planning.
- Background execution.
- MCP servers.
- Visualizations.
- Cost ranges.
- Long-running research loops.

**Aplicación directa:** diseñar tu propio flujo de auto-research con plan → búsqueda → lectura → synthesis → contradiction log → final brief.

---

## 27. Deep Research Agents — Systematic Examination and Roadmap

**Link:** https://arxiv.org/abs/2506.18096  
**Prioridad:** Leer abstract + taxonomy + roadmap  
**Tiempo:** 45–60 min

**Por qué importa:** te da vocabulario para evaluar research agents sin depender de marketing.

**Qué extraer:**

- Static vs dynamic workflows.
- Browser-based vs API-based acquisition.
- Tool use.
- MCP.
- Planning strategies.
- Benchmark limitations.

---

## 28. Evaluating Deep Research Agents on Expert Consulting Work

**Link:** https://arxiv.org/abs/2605.17554  
**Prioridad:** Leer para escepticismo  
**Tiempo:** 45 min

**Por qué importa:** te recuerda que deep research puede producir reports bonitos pero fallar en tareas de consultoría si no hay verifiers, rubrics y trampas cognitivas.

**Qué extraer:**

- Rubrics.
- Ground-truth verifiers.
- Cognitive traps.
- Required sections.
- Fabrication signatures.

**Aplicación directa:** cada research report de EnRegla debería tener verifiers: fuentes oficiales, fechas, jurisdicción, contradicciones, certeza y decisiones que NO se pueden automatizar.

---

# BLOQUE 6 — Product Design x Figma x AI-native UI

**Objetivo:** ubicar tu ventaja como diseñador: juicio, sistema, interfaz, semántica, producción.

## 29. Figma — Introducing Figma Make

**Link:** https://www.figma.com/blog/introducing-figma-make/  
**Prioridad:** Must-read para AI product design  
**Tiempo:** 30–45 min

**Qué extraer:**

- Prompt-to-app.
- Start from design.
- Edit in code.
- Prototype real enough to feel.
- Cómo Figma se mueve hacia producto ejecutable.

---

## 30. Figma — Figma Make GA

**Link:** https://www.figma.com/blog/figma-make-general-availability/  
**Prioridad:** Skim  
**Tiempo:** 20–30 min

**Qué extraer:**

- Import libraries.
- Design consistency.
- Prototyping to app-like artifacts.
- Qué puede ser útil vs qué sigue siendo débil.

---

## 31. Figma Newsroom / Release Notes — Mayo-Junio 2026

**Links:**  
- https://www.figma.com/newsroom/  
- https://www.figma.com/release-notes/

**Prioridad:** Radar semanal  
**Tiempo:** 15 min cada viernes

**Qué buscar:**

- Design agent on canvas.
- Figma Make on local code.
- MCP server workflows.
- Slots / design system guardrails.
- FigJam as coding agent whiteboard.

**Cómo leerlo:** no como fan de Figma. Léelo preguntando: “¿Qué parte del diseño se volvió ejecutable? ¿Qué parte todavía necesita juicio humano?”

---

## 32. Imagining Design Workflows in Agentic AI Futures

**Link:** https://arxiv.org/abs/2509.20731  
**Prioridad:** Leer conceptual  
**Tiempo:** 45 min

**Por qué importa:** estudia cómo diseñadores imaginan trabajar con agentes: autoridad, control, intención y colaboración.

**Qué extraer:**

- Quién decide.
- Qué delegar.
- Qué no delegar.
- Cómo explicar intención a agentes.

---

## 33. The Emerging Use of GenAI for UX Research in Software Development

**Link:** https://arxiv.org/abs/2512.15944  
**Prioridad:** Leer si vas a automatizar UX research  
**Tiempo:** 45–60 min

**Qué extraer:**

- Riesgo de que PMs sobreestimen IA.
- Desconfianza de UX researchers en análisis generado.
- Cómo usar IA sin borrar interpretación humana.
- Qué outputs requieren revisión humana.

---

# BLOQUE 7 — Riesgos: velocidad sin mantenibilidad

**Objetivo:** no convertirte en “vibe designer” ni en “vibe coder”.

## 34. Beyond Functional Correctness: Design Issues in AI IDE-Generated Large-Scale Projects

**Link:** https://arxiv.org/abs/2604.06373  
**Prioridad:** Must-read defensivo  
**Tiempo:** 45–60 min

**Por qué importa:** muestra que los proyectos generados por IDEs con IA pueden funcionar, pero acumular problemas de mantenibilidad: duplicación, complejidad, métodos grandes, accesibilidad, manejo de errores.

**Qué extraer:**

- Funcionar ≠ estar bien diseñado.
- El diseñador con ingeniería debe revisar estructura, no solo pantalla.
- La mantenibilidad también es UX del equipo.

---

## 35. SWE-PRBench: Benchmarking AI Code Review Quality

**Link:** https://arxiv.org/abs/2603.26130  
**Prioridad:** Leer abstract + findings  
**Tiempo:** 30–45 min

**Por qué importa:** ayuda a no confiar ciegamente en AI code review. Los revisores automáticos son útiles, pero no reemplazan revisión experta.

**Qué extraer:**

- Context dilution.
- Diff-only vs full context.
- Human-flagged issues.
- Por qué necesitas tests, acceptance criteria y revisión humana.

---

## 36. Comparing AI Coding Agents: Pull Request Acceptance

**Link:** https://arxiv.org/abs/2602.08915  
**Prioridad:** Skim  
**Tiempo:** 30 min

**Qué extraer:**

- No hay un agente ganador para todo.
- Las tareas de documentación, fixes y features tienen dinámicas distintas.
- Selecciona agente según tarea, no por fanatismo.

---

# 5. El orden exacto para las próximas 3 semanas

## Semana 1 — Base de juicio

1. Shape Up — Introduction.
2. Shape Up — Shaping / Set Boundaries.
3. Microsoft HAX Guidelines.
4. Design Principles for Generative AI Applications.
5. Escribir `product-ai-design-principles.md`.

**Meta de la semana:** definir tus 10 reglas personales para diseñar productos con IA.

---

## Semana 2 — Base de agentes

1. Bitter Lesson.
2. Lilian Weng — LLM Powered Autonomous Agents.
3. ReAct.
4. Reflexion.
5. Anthropic — Building Effective Agents.
6. OpenAI — Practical Guide to Building Agents.

**Meta de la semana:** poder explicar, sin buzzwords, la diferencia entre workflow, agent, loop, tool, memory, evaluator, orchestrator.

---

## Semana 3 — Ejecución real

1. Claude Code Best Practices.
2. Claude Code Common Workflows.
3. Claude Code Memory.
4. OpenAI Codex intro.
5. Cursor Rules.
6. Addy Osmani — Loop Engineering.
7. Addy Osmani — Agent Harness Engineering.
8. Addy Osmani — Agent Skills.

**Meta de la semana:** dejar en tus repos:

- `CLAUDE.md`
- `AGENTS.md`
- `.cursor/rules/`
- `LOOP.md`
- `REVIEW.md`
- `EVALS.md`

---

# 6. Ritual semanal de lectura

## Lunes — Backbone

Lee algo durable: producto, arquitectura, diseño IA, agentes.

## Martes — Tooling

Lee docs de Claude/Codex/Cursor/Figma y aplica una mejora real al repo.

## Miércoles — Aplicación

Convierte una lectura en un prompt, regla, checklist o archivo markdown.

## Jueves — Crítica

Lee un paper o benchmark que te obligue a desconfiar de la herramienta.

## Viernes — Frontier scan

15–30 minutos:

- Figma Newsroom / release notes.
- OpenAI product/docs.
- Anthropic engineering/docs.
- Cursor changelog.
- Addy Osmani blog.
- Google AI blog/docs.

No más de 30 minutos. Lo nuevo es radar, no currículo.

---

# 7. Plantilla para leer cada artículo

Copia esto en NotebookLM, Obsidian o un `.md` por artículo.

```md
# Article Note

## Source
- Title:
- Author / Org:
- Date:
- Link:

## Why I am reading this

## One-sentence thesis

## Durable ideas
1.
2.
3.

## Tactical ideas I can use this week
1.
2.
3.

## What this changes in my workflow

## What I disagree with / risk / limitation

## Application to my work
- EnRegla:
- Portfolio / landing:
- UX/product role:
- Claude/Codex/Cursor workflow:

## Artifact to create
- [ ] Prompt
- [ ] Checklist
- [ ] CLAUDE.md rule
- [ ] AGENTS.md rule
- [ ] Test/eval
- [ ] UX pattern
- [ ] LinkedIn post
- [ ] Product spec

## Final decision
- Keep as principle
- Apply now
- Archive
- Ignore
```

---

# 8. Auto-research workflow recomendado

Para research profundo, no pidas “investiga X”. Usa este flujo:

```md
# AUTO-RESEARCH.md

## Research question

## Decision this research must support

## Scope
- Geography:
- Industry:
- Dates:
- Source types allowed:
- Source types excluded:

## Required source tiers
1. Official / primary sources
2. Academic / technical papers
3. Industry reports
4. Expert blogs
5. Community discussions only as weak signal

## Research plan
1.
2.
3.

## Evidence table required
| Claim | Source | Date | Confidence | Notes |
|---|---|---:|---:|---|

## Contradiction log
| Claim A | Claim B | Which is stronger? | Why? |
|---|---|---|---|

## Final output
- Executive summary
- Practical implications
- Recommended next action
- Risks
- Open questions
```

Usa esto para temas como:

- APIs de Ecuador.
- Compliance Ops.
- UAFE/SPDP/SCVS.
- Competencia tipo Lexis.
- Productización de EnRegla.
- Verticales: constructoras, inmobiliarias, cadenas, proveedores corporativos.

---

# 9. Loop workflow recomendado

No corras loops abiertos tipo “mejora esto hasta que quede perfecto”. Eso quema tokens y produce drift.

Usa loops con criterios de salida:

```md
# LOOP.md

## Goal

## Context

## Success criteria
- [ ]
- [ ]
- [ ]

## Allowed changes

## Forbidden changes

## Files to inspect first

## Worktree / branch strategy

## Steps
1. Inspect current state.
2. Propose plan.
3. Implement smallest complete slice.
4. Run verification.
5. Self-review.
6. External review agent.
7. Fix only verified issues.
8. Stop after success or max iterations.

## Verification
- Command 1:
- Command 2:
- Visual check:
- Accessibility check:
- Business check:

## Max iterations
3

## Stop conditions
- All checks pass.
- Same issue appears twice.
- Required context missing.
- Change exceeds allowed scope.

## Final evidence
- Summary of changes.
- Files changed.
- Tests run.
- Screenshots if UI.
- Known limitations.
```

---

# 10. Qué leer cuando salga algo nuevo esta semana

Cuando aparezca un artículo nuevo sobre loops, auto-research, agents, Figma, Codex o Cursor, pregúntate:

1. ¿Es fuente primaria o comentario?
2. ¿Trae un patrón reusable?
3. ¿Me cambia el workflow esta semana?
4. ¿Tiene costos, límites o riesgos claros?
5. ¿Puedo convertirlo en un archivo del repo?

Si no puede convertirse en una regla, checklist, prompt, eval, spec o decisión de producto, probablemente es solo radar.

---

# 11. Orden de prioridad resumido

## Must-read inmediato

1. Shape Up.
2. HAX Guidelines.
3. Design Principles for GenAI Apps.
4. Lilian Weng — LLM Agents.
5. ReAct.
6. Reflexion.
7. Anthropic — Building Effective Agents.
8. OpenAI — Practical Guide to Building Agents.
9. Claude Code Best Practices.
10. Claude Code Memory.
11. Codex intro.
12. Cursor Rules.
13. Addy Osmani — Loop Engineering.
14. Addy Osmani — Agent Harness Engineering.
15. Addy Osmani — Agent Skills.

## Radar semanal

1. Figma Newsroom.
2. Figma Release Notes.
3. OpenAI docs/product updates.
4. Anthropic engineering/docs.
5. Cursor changelog.
6. Google AI blog/docs.
7. Addy Osmani blog.

## Papers para escepticismo

1. Beyond Functional Correctness.
2. SWE-PRBench.
3. Deep Research Agents Roadmap.
4. Evaluating Deep Research Agents on Expert Consulting Work.
5. Emerging Use of GenAI for UX Research.

---

# 12. Conclusión operativa

La respuesta a tu pregunta es:

> Empieza por la intersección Product Designer + ingeniería + IA, pero no con los artículos más nuevos. Empieza por los artículos que construyen el mapa mental. Luego usa los artículos nuevos como actualizaciones de frontera.

Tu ventaja no va a ser “conocer el último feature”. Tu ventaja será poder decir:

- Esto sí debe ser agente.
- Esto solo necesita workflow.
- Esto requiere humano.
- Esto necesita eval.
- Esto necesita evidencia.
- Esto no debe automatizarse todavía.
- Esto se convierte en una regla del repo.
- Esto se convierte en una experiencia clara para el usuario.

Ese es el Product Designer super pro con ingeniería detrás.

