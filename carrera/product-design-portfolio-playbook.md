# Playbook: Portfolio para Product Designer Senior / Staff / Principal

Complementa `cv-optimization-playbook.md` (CV/ATS). Este archivo cubre solo **portfolio**: que mostrar, como estructurarlo, y como evitar que te descarten en los primeros 6-8 segundos.

## Overview

El portfolio no prueba craft, prueba **judgment**: que puedes tomar una decision bajo incertidumbre, asumir la consecuencia, y mejorar la siguiente. En 2026, ejecucion pura es commodity (AI la abarato); lo que escasea es estrategia, criterio y la capacidad de dirigir AI con intencion. Nada de esto garantiza una oferta — el objetivo es maximizar probabilidad de entrevista, no asegurar el resultado.

## Que escanean primero (6-8 segundos)

Filtro mental del recruiter/hiring manager, en este orden:
1. **Role fit** — que tipo de designer eres, en 3 segundos.
2. **Seniority signal** — se infiere scope, ownership, judgment (no el titulo que pongas).
3. **Relevance** — sirve para este rol especifico.

Si estos tres no quedan claros de inmediato, cierran la pestana. No hay segunda oportunidad para "se entiende mejor si sigues leyendo".

**Capa previa a humanos:** buena parte de recruiting ya corre un filtro AI-asistido antes de que un humano abra el portfolio. La revision humana que sigue dura 2-3 minutos en total, con 10-15 segundos solo en la home. Implicacion practica: el texto de la home y el primer caso debe ser legible y parseable como texto plano (no solo como imagen/canvas), porque ese filtro automatizado lee contenido, no estetica.

**Segunda pasada (menos de 2 minutos), si pasa el filtro inicial:** abre el sitio -> lee la frase de presentacion -> entra al primer caso -> escanea su estructura -> salta directo a resultados. Implicaciones practicas: el primer caso debe ser el mas fuerte (no el cronologicamente mas reciente), y el resultado tiene que ser visible sin scroll profundo — si esta enterrado al final de un caso largo, no lo van a leer.

## Como evaluan (hiring manager, segunda pasada)

- ¿El producto es real y trazable? ¿Sigue vivo, escalo? Un rediseno bonito que shippeo y no movio ninguna metrica es indistinguible de un proyecto concept — muestra craft, no judgment.
- ¿Que tomaste de decision, no que ejecutaste? Decision-making escala con seniority; ejecucion no.
- ¿Hay evidencia de proceso real: research, iteracion, testeo, feedback incorporado? Ausencia de esto es la red flag #1.
- ¿Puedes nombrar el tradeoff que rechazaste y por que? Si solo cuentas la version que "funciono", falta la mitad de la historia.

## Senior vs Staff vs Principal — tabla de decision

| Dimension | Senior | Staff | Principal |
|---|---|---|---|
| Pregunta que respondes | "¿Como lo construimos bien?" | "¿Deberiamos construir esto, y por que?" | "¿Hacia donde va el producto/negocio?" |
| Scope de impacto | Tu producto/feature | Equipo + equipos adyacentes (pillar) | Toda la org / multiples grupos |
| Rol en estrategia | Ejecuta la estrategia | Contribuye a la estrategia del grupo | Define y conduce la vision de producto |
| Multiplicador | De tu propio output | De tu equipo y equipos cercanos | De toda la organizacion |
| Relacion con liderazgo | Reporta hacia arriba | Pairea con leads de equipos | Pairea con liderazgo senior/exec |
| Como se ve en el portfolio | 1 caso fuerte con metricas claras de producto | Casos que muestran influencia cross-team sin autoridad formal | Casos que muestran como cambiaste la direccion de un negocio/org |

Nota de calibracion: el nivel es relativo al tamano de la empresa — un Principal en una startup de 100 personas puede equivaler a un Senior en una de 1500. No asumas que el titulo de tu rol anterior se traduce 1:1 al de la empresa objetivo; calibra el caso al scope real, no al nombre del cargo.

**Pregunta diagnostico para saber si un caso es Staff y no Senior:** ¿el caso resuelve "¿estan distintos equipos resolviendo el mismo problema de formas distintas?" o define un patron que otros equipos reutilizan? Si el caso solo describe una feature de tu propio equipo, es Senior aunque el titulo diga Staff. Dato de referencia de asignacion de tiempo: Senior gasta ~50-60% en ejecucion directa; Staff baja a ~25% porque el resto es influencia cross-team — si tu narrativa de caso es 90% "yo ejecute X", el portfolio se lee Senior independientemente del titulo que pongas.

**Red flag especifico de mismatch:** titulo Staff/Principal con casos que solo muestran trabajo de feature aislada, sin mencion de patrones compartidos, multiplicador de equipo o cambio de direccion. El nivel se demuestra en el contenido del caso, no se declara en el titulo de la pagina.

## Estructura de case study (framework)

Seis bloques, en este orden. Cada uno debe poder leerse en 20-30 segundos si el lector tiene prisa.

1. **Contexto + tu rol** — negocio, producto, tu ownership especifico (no "we", se claro en que parte fuiste tu). Si el resultado fue de equipo, dilo explicito ("yo lidere X, el equipo de data construyo Y") — un logro de equipo presentado como individual se detecta en la entrevista de seguimiento, y se nota peor ahi que si lo hubieras aclarado desde el portfolio.
2. **El problema (con restricciones reales)** — datos de negocio, restricciones tecnicas/legales/de tiempo. Sin restricciones, no hay judgment que mostrar.
3. **Proceso** — research, hipotesis, iteracion, quien estuvo en la mesa (cross-functional). No describas el proceso, muestra una decision concreta que tomaste dentro de el.
4. **El tradeoff que rechazaste** — la alternativa descartada y por que. Esto es lo que separa judgment de craft.
5. **Resultado medible** — metrica de negocio o producto, no solo "mejoro la experiencia". Si el producto sigue vivo, dilo y di si escalo.
6. **Que harias diferente / que aprendiste** — honestidad calculada, no autocritica vacia.

### Ejemplo corto (formato, no caso real)
> **Contexto:** Fintech B2B, checkout de onboarding con 40% de drop-off en KYC.
> **Problema:** Legal exigia 6 campos no negociables; ingenieria tenia 2 sprints.
> **Decision:** Dividir el flujo en 2 pasos progresivos en vez de un formulario unico (alternativa descartada: autosave + un solo paso, rechazada por riesgo legal de datos incompletos).
> **Resultado:** Drop-off de 40% a 24% en 6 semanas; flujo sigue en produccion 18 meses despues.
> **Aprendizaje:** Subestime el tiempo de QA con legal; en el siguiente proyecto los incluí desde el research.

## Mostrando lo dificil de mostrar

- **Estrategia/systems thinking:** dibuja el sistema (no solo la pantalla) — interconexiones, feedback loops, puntos de apalancamiento. Una sola pantalla nunca prueba systems thinking; un mapa o diagrama si.
- **Metricas:** numeros de negocio (revenue, retention, conversion, costo evitado), no solo "satisfaction score". Si no tienes el numero exacto, usa el orden de magnitud y se honesto sobre la fuente.
- **Ambiguedad:** nombra explicitamente que informacion NO tenias y como decidiste sin ella. Eso es la prueba, no la pantalla final.
- **Liderazgo sin autoridad formal:** cuenta a quien convenciste, que resistencia hubo, como la resolviste. Liderazgo de IC se mide en influencia, no en headcount.
- **Tradeoffs:** un parrafo dedicado solo a "lo que NO hice y por que" en cada caso. Si no esta, falta.
- **Impacto de negocio:** conecta la metrica de producto con la de negocio (ej. "+8pp activacion -> +$420k ARR estimado"). El hiring manager de nivel senior+ piensa en P&L, no en pixeles.

## Red flags que descartan en el primer scan

1. Resultado sin "por que" — pantalla final sin problema, restricciones, ni decision.
2. Portfolio con mala UX propia (navegacion confusa) — descalifica de inmediato, es ironico pero real.
3. No se entiende que tipo de designer eres en los primeros 10 segundos.
4. Proyectos concept/fantasia (rediseno de Spotify/Airbnb sin usuarios reales ni restricciones de negocio) — muestra craft, no judgment.
5. Casos duplicados (3 checkouts rediseñados) — curado > comprensivo. 3 casos fuertes ganan a 7 mediocres.
6. Mismo patron visual aplicado a todo — sugiere eleccion por habito, no por intencion.
7. Cero evidencia de testing, research o iteracion con feedback real.
8. Metricas vagas ("mejoro la experiencia") sin numero, sin fuente, sin periodo de tiempo.
9. Mejora reportada sin baseline ("40% mejor" — ¿mejor que que?). Sin punto de comparacion explicito, el numero no significa nada y se lee como inflado.
10. "Shippeado a produccion" sin evidencia verificable (link, dashboard, captura de monitoreo, video corto). Es el claim mas comun y el primero que se chequea en entrevista — si no lo puedes mostrar, no lo afirmes asi.
11. Craft visual debil disfrazado de "yo soy mas de research/estrategia" — para la mayoria de roles de product design (no research puro), pulido visual flojo descalifica aunque el proceso sea solido.
12. Cero mencion de como usas AI en tu proceso de diseno. En 2026 esto ya no se lee como neutral, se lee como senial de que no te has adaptado.
13. Exceso de texto de proceso o diagramas de double-diamond/journey-map genericos sin una decision concreta al lado. Estos diagramas estan sobreusados y ya no diferencian — si los usas, que sirvan para mostrar UNA decision especifica, no el proceso completo.
14. El template/design-system del portfolio le gana en atencion al trabajo mismo. Si el visitante recuerda el layout antes que el caso, el craft visual esta compitiendo contra tu propio contenido.

## Patrones que funcionan (2026)

- **Formato "pensamiento en curso" abierto:** secciones que admiten que no sabes algo aun, documentando el proceso de pensar el problema en vivo — mas valorado que un caso pulido y cerrado, porque prueba judgment en tiempo real.
- **Evidencia de trabajo con AI como meta-skill:** un loom corto (3-5 min) mostrando como prompteas, editas, y tomas decisiones de criterio sobre output de AI. Para roles AI-adjacent esto pesa mas que un case study tradicional.
- **3-5 casos, no mas.** Cada uno con rol explicito, restricciones explicitas, y un tradeoff nombrado.
- **Pagina de "como pienso"** separada de los casos — un compendio corto de principios/heuristicas que usas, sirve como prueba adicional de judgment sin depender de un proyecto especifico.
- **Narrativa escrita corta (500-800 palabras):** alternativa o complemento al case study visual — traza una decision especifica desde el punto ambiguo de partida hasta el resultado, en prosa, sin diagramas pesados. Funciona mejor que un formato visual cargado cuando el lector tiene poco tiempo y quiere "verte pensar", no "ver pantallas".
- **Prototipo funcional, no solo mockup:** para roles staff/principal AI-adjacent, un prototipo con codigo real y datos reales (Framer, ProtoPie, o repo) que un ingeniero podria continuar pesa mas que una serie de pantallas en Figma — siempre que sea verificable (link vivo, repo, o video corto del flujo funcionando). Afirmar que algo es "shippable" sin poder mostrarlo es el red flag #10 de la lista anterior.
- **Vocabulario de fluidez AI en roles staff+/principal AI-adjacent:** generative UI patterns, tokenizacion de design systems, comportamiento de modelos/LLM, patrones de diseno de sistemas agenticos. No hace falta dominarlo todo — mencionarlo con criterio real (no como buzzword suelto) es una senial de seniority que los JDs de 2026 ya piden explicitamente.
- **Caso de eval propio, sin necesitar un trabajo AI actual:** elegi una feature AI publica (ChatGPT, Claude, Notion AI), corre un eval de ~50 casos, y documenta que falla, que pasa, y las categorias del fallo. Es el ejercicio mas barato de producir y el que mas credibilidad da para roles AI-adjacent — diseño de evals es la habilidad menos preparada en entrevistas AI, y mostrarla en el portfolio es diferenciador inmediato.
- **Tres arquetipos validos de caso AI** (usa el que tengas, no fuerces los tres): (1) feature AI dentro de un producto existente (ej. smart replies); (2) producto AI-first desde cero (ej. herramienta generativa); (3) rediseno de un workflow completo alrededor de una feature AI (ej. automatizacion de edicion de video). Cualquiera de los tres es valido si muestra el "messy middle" — los quirks, limites y comportamiento impredecible del modelo — y no solo la pantalla final pulida.

## Tailoring por familia de rol

| Familia | Que enfatizar | Que evitar |
|---|---|---|
| B2B SaaS | Multi-stakeholder (sales, CS, eng), metricas de adopcion/retencion por segmento de cuenta, complejidad de permisos/roles | Casos B2C genericos sin contexto de venta enterprise |
| AI / AI-native products | Evals, golden datasets, criterios de "bueno" para comportamiento del modelo, manejo de incertidumbre/alucinacion, control del usuario sobre output de AI | Hablar solo de "UI de chat" sin mencionar evaluacion o criterios de calidad del modelo |
| Fintech | Confianza, compliance (KYC/AML), manejo de riesgo regulatorio, claridad bajo presion legal | Casos que ignoren restricciones legales o de seguridad |
| Enterprise / regulado (salud, legal, gobierno) | WCAG/accesibilidad, criterios de auditoria, ciclos de aprobacion largos, diseño de sistemas (no pantallas sueltas) | Estetica como argumento principal; falta de evidencia de compliance |
| Government / sector publico | Accesibilidad estricta, proceso de procurement, multiples stakeholders no tecnicos, lenguaje plano | Jerga de startup, metricas de growth que no aplican al contexto |

Calibra cada caso eligiendo 1-2 filas relevantes al rol objetivo; no fuerces todas las dimensiones en un solo caso.

## Checklist pre-publicacion

- [ ] En los primeros 10 segundos, ¿se entiende que tipo de designer soy y mi seniority?
- [ ] Cada caso tiene: contexto + rol propio, problema con restricciones reales, proceso, tradeoff rechazado, resultado medible, aprendizaje.
- [ ] Hay al menos un numero de negocio (no solo de producto) por caso.
- [ ] Elimine duplicados — quedan 3-5 casos curados, no todos los proyectos que hice.
- [ ] Cada caso esta calibrado al nivel objetivo (senior/staff/principal) segun la tabla de scope.
- [ ] Si aplico a rol AI-adjacent, hay evidencia de manejo de evals/criterios de calidad de modelo, o un loom de proceso con AI.
- [ ] La navegacion del portfolio mismo es clara — lo probé como si fuera un usuario nuevo.
- [ ] Ningun caso es "concept"/fantasia sin restricciones reales de negocio.
- [ ] El portfolio esta tailored al role family del puesto especifico (tabla de arriba), no generico.
- [ ] El nivel que proyecto en el portfolio coincide con el nivel del JD al que aplico (no aplico mas senior ni mas junior de lo que el caso realmente demuestra).
- [ ] Ningun caso es solo texto/diagrama de proceso sin una decision concreta — si hay double-diamond o journey map, esta ahi para mostrar UNA decision, no el proceso completo.

## Changelog

- **2026-06-26** — Creacion inicial del playbook. Investigacion sobre que buscan recruiters/hiring managers en 2026 (judgment > craft, evals para AI design, formato "pensamiento abierto"), diferencias senior/staff/principal por scope, framework de case study en 6 bloques, red flags, y tabla de tailoring por familia de rol (B2B SaaS, AI, fintech, enterprise/regulado, gobierno).
- **2026-06-26** — Pasada de research adicional. Agregado: modelo de doble pasada de revision (6-8s filtro + <2min lectura real, con implicancia de que el primer caso debe ser el mas fuerte); atribucion explicita de contribucion individual vs equipo en el bloque de contexto; 4 red flags nuevos (mejora sin baseline, "shippeado" sin evidencia verificable, craft visual debil, ausencia de mencion de AI en el proceso); patrones nuevos de prototipo funcional verificable y vocabulario de fluidez AI (generative UI, tokenizacion, sistemas agenticos) para roles staff+/principal AI-adjacent.
- **2026-06-26 (pasada 3, UTC)** — Investigacion sobre filtro AI-asistido de recruiting (capa previa al humano, home debe ser legible como texto plano); pregunta diagnostico concreta para distinguir Staff de Senior (patrones cross-team vs feature aislada) con dato de asignacion de tiempo (Senior ~50-60% ejecucion vs Staff ~25%); 2 red flags nuevos (exceso de diagramas double-diamond/journey-map genericos sin decision concreta, template del portfolio compitiendo con el trabajo); ejercicio concreto de eval propio sobre feature AI publica (ChatGPT/Claude/Notion AI, ~50 casos) como proyecto de portfolio AI-adjacent sin requerir trabajo AI actual; 3 arquetipos validos de caso AI (feature embebida, producto AI-first, rediseno de workflow) con enfasis en mostrar el "messy middle" del modelo, no solo la pantalla final.
