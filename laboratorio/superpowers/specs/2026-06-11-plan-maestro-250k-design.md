# Plan Maestro 250k — Diseño por Compuertas

**Fecha:** 2026-06-11
**Reemplaza a:** `carrera/docs/superpowers/specs/2026-06-07-master-plan-6months.md` (se archiva)
**Companion visual:** `2026-06-11-plan-maestro-250k-design.html`

---

## Objetivo único

> Contrato directo de **USD 250k/año** como Product Designer / AI Product Designer.

No hay fechas en el plan. Hay **compuertas (gates)** con criterios de salida verificables. El tiempo es proyección con escenarios (1 año perfecto / ~3 promedio / 5 máximo) que se calibran **después** de G1, no antes.

## Premisa estratégica

La escalera es real, no un salto: ~$60k (BairesDev) → ~$100k (escalón) → $250k (directo). En cada escalón se sobre-entrega al 250% para justificar el siguiente. El salto no es geográfico sino de **categoría**: salir del cajón "LATAM nearshore" ($1.4k–5k/mes vía agencias) y competir con evidencia nivel Staff/Principal.

## Estado real — Baseline 2026-06-11

| Activo | Estado verificado |
|---|---|
| Ingreso | BairesDev $5k/mes, bench top talent pool, reassignment en curso. Estable. |
| UR Training | 30/80 respuestas crudas en `answers_state.json`. **0 auditadas con rúbrica senior.** |
| Portfolio | 0 casos publicados. Drafts: Developer Portal (BAH), Life Update Mobile (README). |
| Landing/CV | v11 deployada en danilorojas.design. Funcional, sin casos élite. |
| Inglés | Insuficiente para entrevista senior (autoevaluación honesta). |
| Legal/cobro US | Inexistente. 0 documentos, 0 trámites. |
| Sistema operativo | Daily tracker + weekly review + pirámide de prioridad. Activos. |
| Runway | $12k ahorros + salario BairesDev. Sin presión de caja. |

## Investigación de mercado (2026-06)

1. **$250k es una categoría real:** Principal Product Designer US promedio $262k (rango $209k–$334k); Staff PD ~$286k TC. Fuentes: Glassdoor, Built In, PayScale.
2. **El escalón $100k está bajo el promedio remoto** (~$145k PD remoto US). Es alcanzable con 2–3 bloques de evidencia cerrados.
3. **AI fluency paga 56% de premium salarial.** 73% de hiring managers exigen proficiencia en herramientas AI; 79% valoran diseñar productos AI. Demanda senior (56%) duplica la junior (25%). Fuentes: Figma 2026 survey, UX Design Institute, Designer Fund.
4. **Lo que evalúan en nivel Staff/Principal:** systems thinking, strategic skills, orquestación de sistemas inteligentes, outcomes de negocio — no screens. El training UR y los mocks deben apuntar a ese lenguaje.
5. **Riesgo de ancla LATAM:** agencias posicionan diseñadores LATAM en $1.4k–5k/mes. Implicación: el CV/landing nunca debe competir por precio ni señalizar "nearshore"; compite por categoría y evidencia.

## Arquitectura: compuertas G1–G5

```
G1 DIAGNÓSTICO → G2 TRAINING POR BLOQUES → G3 DOMINIO PROBADO
                                              │ (trigger LLC + caza $100k)
                                              ▼
                              G4 ESCALÓN $100k → G5 CLIENTE DIRECTO 250k
```

### G1 — Diagnóstico completo

- **Trabajo:** auditar las 30 respuestas existentes con rúbrica senior; responder las 50 restantes por bloques temáticos; auditar todo. En paralelo (esfuerzo bajo): documento de investigación LLC/cobro US — jurisdicción, costos, banco, impuestos Ecuador, alternativas tipo Deel. Solo investigación, cero trámites.
- **Rúbrica:** contexto → decisión → tradeoff → evidencia → cierre. En inglés. Score por respuesta.
- **Criterio de salida:** 80/80 auditadas + matriz de gaps (skill × severidad) + calibración de escenarios de tiempo + orden de bloques para G2.
- **Verificador:** IA con rúbrica (Claude).

### G2 — Training por bloques (loop repetible, ~5 bloques)

Por cada bloque temático (Product Strategy, AI-native, Research/Metrics, Design Systems, Interview/Positioning):

1. Entrenar los gaps del bloque.
2. Re-responder las preguntas débiles.
3. Mock interview oral en inglés (con IA, grabada).
4. Proyecto de práctica que demuestre el skill — alcance pequeño, terminado, publicable.
5. Publicar en portfolio + actualizar `skills.yaml`, CV y landing.

- **Criterio de aprobación por bloque:** rúbrica pasada + mock fluido + proyecto publicado.
- **Regla:** el mercado ve evidencia nueva en cada cierre de bloque, no al final.
- **Verificador:** IA (rúbrica + evaluación de mock).

### G3 — Dominio probado

- **Criterio de salida:** desempeño con holgura sostenida (~4–8 semanas) en el cliente asignado por BairesDev + mocks de entrevista en inglés fluidos.
- **Trigger que dispara:** ejecutar LLC + EIN + banco (el doc de investigación ya está listo en el cajón desde G1) y arrancar la caza del escalón ~$100k.
- **Regla:** antes de G3, cero dinero y cero tiempo en estructura legal. Solo investigación documentada.
- **Verificador:** weekly review + feedback del cliente.

### G4 — Escalón ~$100k

- **Trabajo:** conseguir rol/cliente ~$100k. Sobre-entregar al 250%: casos élite nuevos, referencias, leverage de negociación.
- **Criterio de salida:** ingreso del escalón ≥ BairesDev y estable → renuncia a BairesDev.
- **Verificador:** contrato firmado + 3 meses de entrega.

### G5 — Cliente directo $250k

- **Requiere:** LLC operativa + paquete de negociación + 3+ casos élite + pipeline de conversaciones activas.
- **Criterio de salida:** contrato directo firmado en el rango $200–250k+.

## Tracks paralelos (corren siempre, no son compuertas)

| Track | Regla |
|---|---|
| Inglés | Todo el training en inglés. Mocks orales grabados. Criterio de fluidez vive en G3. |
| Cuerpo | Pirámide intacta: salud primero, 4x/semana. |
| Ops | Daily tracker + weekly review dominical. El review actualiza `gates.yaml`. |
| Publicables | CV, landing, skills sheet se regeneran al cierre de cada bloque de G2. |

## Pausas explícitas

- **En Regla:** pausa total documentada (doc de cierre con estado y condiciones de reactivación). Cero horas. Se reevalúa cuando G4 esté asegurada.
- **Life Update:** solo tablero personal. Cero desarrollo.

## Regla de datos reales

Nuevo archivo: `carrera/execution/gates.yaml` — estado de compuertas y bloques. Es la **única fuente** que el grafo/mapa visual puede leer.

| Dato del mapa | Fuente real |
|---|---|
| Progreso UR | `answers_state.json` + scores de auditoría |
| Skills | `perfil/data/skills.yaml` |
| Casos | `perfil/data/cases/` |
| Métricas semanales | `carrera/baseline/weekly-metrics.yaml` |
| Estado de compuertas | `carrera/execution/gates.yaml` |

**Prohibido cualquier porcentaje inventado.** Si un número no tiene fuente, el nodo se muestra "sin datos".

## Migración documental

1. `2026-06-07-master-plan-6months.{md,html}` → `carrera/docs/superpowers/archive/`.
2. Este spec es la nueva fuente de verdad estratégica.
3. `current-week.md` se re-deriva de este plan (foco: G1).
4. Crear `carrera/execution/gates.yaml` con baseline real.
5. Mapa visual (grafo de fuerzas) se rediseña **después**, leyendo `gates.yaml` — fuera del alcance de este spec.

## User flow / proceso

El diagrama completo (compuertas, loop de bloque, triggers, estados de fallo) está renderizado en el HTML companion. Resumen de rutas de fallo:

- Bloque no pasa rúbrica/mock → re-entrenar ese bloque, no avanzar.
- Cliente BairesDev no se domina → G3 no abre; volver a G2 con gaps del trabajo real.
- Caza $100k sin tracción en ~8 semanas → revisar posicionamiento con datos de conversaciones (no cambiar el plan por impulso).
- Oferta directa aparece antes de G3 → excepción: ejecutar LLC exprés; la oportunidad real mata la secuencia.

## Frase operativa

> No necesito claridad total. Necesito ejecutar el siguiente movimiento correcto.
