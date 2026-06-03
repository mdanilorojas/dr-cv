# GitHub Audit — Danilo Rojas (`mdanilorojas`)

**Fecha del audit:** 2026-05-07
**Fuente:** GitHub API pública + clones `--depth 50` de los repos relevantes
**Objetivo:** materia prima para reposicionar a Danilo como **Agentic Designer** con base de ingeniería, reescribir su CV, y extraer case studies vendibles.

---

## Resumen ejecutivo (10 líneas)

1. Danilo tiene **12 repos públicos**, pero el perfil en GitHub **subrepresenta masivamente** su volumen de trabajo: 7 están vacíos o son experimentos de 2022–2023 sobre design tokens, y **casi toda la actividad real está concentrada en 2 repos de las últimas 4 semanas** (2026-04-08 → 2026-05-07).
2. **`enregla`** es el repo central: SaaS de compliance para PYMES en Ecuador. React 19 + TS 6 + Vite 8 + Supabase + Vercel. ~346 commits en ~1 mes, 51 archivos de features, 31 componentes UI, 21 migraciones SQL, 1 edge function, CI en GitHub Actions, 1.0-MVP en producción (`enregla.vercel.app`, dominio objetivo `enregla.ec`).
3. **`life-update`** es la segunda prueba: Next.js 16 + NextAuth v5 + Prisma + Supabase. 20 commits en 1 día. Producto personal (sistema de tracking diario), desplegado en Vercel (`life-update-wheat.vercel.app`). Muestra velocidad de bootstrap 0→producción en un sprint.
4. **El gap del CV 2022→2026 está resuelto en el código**: diseño, producto, ingeniería full-stack, arquitectura DB, RLS, CI, deploys, y workflow agentic documentado paso a paso.
5. **La señal agentic más fuerte NO es código con Anthropic SDK** (no lo usa en runtime) — es **el uso intensivo de Claude Code + skills "superpowers" como metodología de trabajo**: specs, plans, recursive iterations, subagent-driven-development, handoffs, reviews numéricos por iteración. Es un caso de "diseñador que opera con orquesta de agentes", no "desarrollador que llama una API".
6. **Piezas serias de ingeniería agentic en producto**: Supabase MCP server configurado en el repo (`.mcp.json`), skills-lock.json reproducible (`supabase/agent-skills` pinned por hash), edge function de alerts con cron (pg_cron), RLS dual-mode (demo + producción), feature flags por env, integración con TanStack Query + Sentry + React Hook Form + Zod.
7. **Design chops visibles**: sistema de tokens completo (Atlassian DS con Banco Pichincha blue + orange), 31 componentes UI custom (shadcn-style), showcases HTML interactivos (`design-system-complete.html` 145KB, `atlassian-ds-showcase.html`), landing PYME, dos tableros con "weather card" emocional de compliance.
8. **Debilidades honestas**: cobertura de tests baja (6 archivos de test, ~5% coverage por su propio reporte), cero trabajo con APIs de LLM en runtime (no llama Claude/GPT desde código), colaboración solo-dev (no hay PRs externos ni issues de terceros), docs centradas en SaaS (poco portfolio público de trabajo previo como diseñador), observabilidad apenas cableada (Sentry en placeholder).
9. **Case studies vendibles inmediatos**: EnRegla (el principal — 5+ ángulos narrativos), migración Atlassian DS (17 partes + 5 iteraciones recursivas de polish), GTM bootstrap spec (estrategia + producto + sprint semana 1), CRM interno de partners con scorecard (TDD real), life-update (0→prod en un día), capacitación IA Policía Judicial (artefacto HTML pedagógico).
10. **Voz de marca**: bilingüe ES-EN, técnico pero cálido, frases como "dueños operativos que no hablan jerga", mezcla "Don Huevas con 2-3 locales" con SLAs y RICE scoring. Autodescripción en bio: *"Software designer focused on creating exceptional user experiences powered by cutting-edge technology"*.

---

## 1. Inventario completo de repos

Total: **12 repos públicos**. Ningún fork marcado como tal en la API aunque `tokensdemo` sí es fork. Ninguno archivado.

| # | Repo | Descripción | Lang principal | Último push | Stars | Forks | Fork? | README útil | Estado |
|---|------|-------------|----------------|-------------|-------|-------|-------|-------------|--------|
| 1 | [`enregla`](https://github.com/mdanilorojas/enregla) | (sin description) — SaaS compliance multi-sede LATAM | TypeScript | 2026-05-07 | 1 | 0 | no | **Sí, exhaustivo** (10KB) | **Producción 1.0-MVP**, 346 commits, homepage `https://enregla.vercel.app` |
| 2 | [`dr-cv`](https://github.com/mdanilorojas/dr-cv) | "La vida entera de Danilo Rojas" | — | 2026-05-07 | 0 | 0 | no | Minimal (39 bytes) | Recién creado hoy |
| 3 | [`va`](https://github.com/mdanilorojas/va) | (sin description) | — | 2026-05-05 | 0 | 0 | no | **Vacío** | Placeholder vacío |
| 4 | [`life-update`](https://github.com/mdanilorojas/life-update) | (sin description) — tracking diario de vida | TypeScript | 2026-05-05 | 0 | 0 | no | No README (pero `docs/superpowers/` + `plan/`) | **Desplegado**, 20 commits, homepage `https://life-update-wheat.vercel.app` |
| 5 | [`te-platform`](https://github.com/mdanilorojas/te-platform) | (sin description) | — | 2025-12-05 | 0 | 0 | no | **Vacío** | Placeholder vacío |
| 6 | [`figma-backstage2`](https://github.com/mdanilorojas/figma-backstage2) | (sin description) | — | 2025-11-17 | 0 | 0 | no | **Vacío** | Placeholder vacío |
| 7 | [`figma-backstage`](https://github.com/mdanilorojas/figma-backstage) | "A test environment for Figma to Backstage" | — | 2025-11-17 | 0 | 0 | no | **Vacío** | Placeholder vacío |
| 8 | [`mkdocs-material`](https://github.com/mdanilorojas/mkdocs-material) | (sin description) | — | 2023-05-01 | 0 | 0 | no (pero nombre sugiere que fue fork de `squidfunk/mkdocs-material`) | Solo `.gitignore` inicial | 1 commit inicial, abandonado |
| 9 | [`tokensdemo`](https://github.com/mdanilorojas/tokensdemo) | (sin description) | — | 2022-12-19 | 0 | 0 | **sí (fork)** | README 13 bytes | `.specifyrc.json` con pipeline Specify→Tailwind/CSS; abandonado |
| 10 | [`TokenStyles`](https://github.com/mdanilorojas/TokenStyles) | (sin description) — Style Dictionary basic demo | Swift | 2022-08-30 | 0 | 0 | no | README (starter de Style Dictionary) | Abandonado |
| 11 | [`demotoken`](https://github.com/mdanilorojas/demotoken) | (sin description) | — | 2022-08-29 | 0 | 0 | no | **Vacío** | Placeholder vacío |
| 12 | [`figmatokendemo`](https://github.com/mdanilorojas/figmatokendemo) | "Figma tokens demo repository" | — | 2023-08-08 | 0 | 0 | no | README trivial ("holi") | `styles.json` (17KB) y `UIPstyles.json` (83KB) con tokens Figma → abandonado |

**Observación clave:** 5 de 12 repos están vacíos (`va`, `te-platform`, `figma-backstage`, `figma-backstage2`, `demotoken`) — son reservas de nombre. El perfil *parece* pequeño pero la masa está concentrada en `enregla` + `life-update`.

---

## 2. Clustering temático

### Cluster A — **Producto SaaS en producción** (el trabajo serio)
- `enregla`

Patrón: arquitectura full-stack moderna (React 19 + Supabase), ciclo completo product→design→eng→deploy, docs de producto (PRODUCT/ROADMAP/BACKLOG con RICE scoring), feature flags, RLS dual-mode, edge functions, cron, GTM sprint documentado.

### Cluster B — **Producto personal en iteración rápida** (proving-ground)
- `life-update`

Patrón: Next.js 16 App Router + NextAuth v5 + Prisma + Supabase Postgres. De 0 a deploy en 1 día (20 commits en 24h). Schema Prisma serio con modelos `User`, `DailyEntry`, `WeeklyEntry`, `MonthlyEntry`, `Project`, `PlanSnapshot`. Valida API con handlers tipados, upsert en Postgres. Diseño dark mode + shadcn/ui.

### Cluster C — **Repos placeholder / en barbecho**
- `dr-cv` (hoy), `va`, `te-platform`, `figma-backstage`, `figma-backstage2`, `demotoken`

Patrón: reservados para proyectos futuros. `te-platform` parece ser "TE Portfolio" mencionado en `life-update/prisma/schema.prisma` como proyecto activo. `figma-backstage[2]` apuntaba a un test Figma↔Backstage (plataforma de developer portals de Spotify).

### Cluster D — **Experimentos de design tokens (2022–2023)**
- `tokensdemo`, `TokenStyles`, `figmatokendemo`

Patrón: época "UX/UI Product Designer" — explora pipelines Figma Tokens → Style Dictionary → Specify → código (Swift/SCSS/JSON). Son ejercicios, no productos. Muestran que Danilo venía del mundo DS-Ops.

### Cluster E — **Docs / Tooling**
- `mkdocs-material`

Patrón: 1 commit de intento de setup de MkDocs. Abandonado.

---

## 3. Stack técnico detectado

Agregado sobre los repos con contenido real (principalmente `enregla` + `life-update`; los de 2022 se notan aparte).

### Lenguajes
| Lenguaje | Apariciones | Dónde |
|----------|-------------|-------|
| TypeScript | 2 repos grandes | `enregla` (`~17.5K LOC` según su propio Ultra Review), `life-update` |
| JavaScript | secundario | scripts, configs |
| SQL (Postgres) | 1 repo | `enregla/supabase/migrations/` (21 archivos) |
| Swift | 1 repo viejo | `TokenStyles` (2022) |
| HTML/CSS | standalone | `enregla/policia-judicial.html`, `atlassian-ds-showcase.html`, `design-system-complete.html` (145KB) |

### Frameworks / Librerías UI
| Tech | Dónde |
|------|-------|
| React 19.2.4 | `enregla`, `life-update` |
| Next.js 16 (App Router) | `life-update` |
| Vite 8 | `enregla` |
| Tailwind 4 | ambos |
| shadcn/ui | ambos (implícito por componentes + `components.json`) |
| Radix UI (10 primitivos) | `enregla` |
| @base-ui/react | `life-update` |
| React Router 7 | `enregla` |
| framer-motion 12 | ambos |
| lucide-react | ambos (centralizado en `enregla/src/lib/lucide-icons.ts`) |
| Recharts | ambos |
| @xyflow/react (React Flow) | `enregla` (network map) |
| d3-force | `enregla` (layout de grafo) |
| qrcode.react | `enregla` (public verification links) |
| jspdf + html2canvas | `enregla` (export) |
| tw-animate-css | `life-update` |

### Forms, estado, data
| Tech | Dónde |
|------|-------|
| React Hook Form + Zod | `enregla` |
| @tanstack/react-query + devtools | `enregla` (agregado en sprint reciente de hardening) |
| @tanstack/react-table | `enregla` (permisos list) |
| @tanstack/react-virtual | `enregla` |
| Zustand | `enregla` |
| date-fns | ambos |
| Prisma | `life-update` |
| Supabase JS | ambos |

### Backend / Infra
| Tech | Dónde |
|------|-------|
| Supabase (Postgres + Auth + Storage + Edge Functions) | `enregla` (con `.mcp.json` apuntando a Supabase MCP server remoto), `life-update` |
| NextAuth v5 (beta.31) + Prisma adapter | `life-update` |
| bcryptjs | `life-update` |
| Vercel | ambos (deploys vivos) |
| GitHub Actions | `enregla` (CI: lint + typecheck + build + test en cada PR/push a main) |
| pg_cron + pg_net | `enregla` (cron para `send-expiry-alerts`) |
| Resend | `enregla` (email service en edge function) |
| Sentry | `enregla` (env placeholder; integración cableada pero no activada aún) |

### Testing
| Tech | Dónde |
|------|-------|
| Vitest 4 + @testing-library/react | `enregla` (**6 archivos de test total**: `dashboard-metrics`, `queryClient`, `PartnerScorecard`, `NetworkMapV3`, `useNodeAnimation`, `useStaticLayout`) |
| jsdom | `enregla` |
| ESLint 9 + typescript-eslint | ambos |

### Herramientas de IA / agentes
| Tech / Señal | Dónde | Nota |
|--------------|-------|------|
| **Claude Code** | Ambos (README footer: *"Built with ❤️ using Claude Code"*; commits `Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>`) | 76+ menciones en docs |
| **Superpowers skill framework** (`brainstorming`, `writing-plans`, `subagent-driven-development`, `executing-plans`, `verification-before-completion`) | `enregla/docs/superpowers/{specs,plans,reviews}` | 15+ planes y specs siguen el template |
| **Supabase MCP server** | `enregla/.mcp.json` (http transport a `mcp.supabase.com/mcp?project_ref=...`) | 1 MCP server configurado |
| **Supabase agent-skills** | `enregla/skills/`, `enregla/.claude/skills/`, `enregla/.agents/skills/` + `skills-lock.json` con hashes | Skills "supabase" y "supabase-postgres-best-practices" pinned por hash computado, instaladas vía `npx skills add` |
| **Cursor / Windsurf** | `enregla/.windsurf/skills/`, `enregla/.claude/` | Señal de multi-IDE agentic |
| **Higgsfield** (avatar IA) | mencionado en GTM spec | Plan de content con avatar IA para PYME EC |
| Anthropic SDK / OpenAI SDK | **no importados en runtime en ningún repo** | Danilo no hace calls a LLM desde el producto todavía |
| LangChain / RAG | **no presente** | — |

### Data (lo que el código modela)
- PostgreSQL 15 via Supabase (`enregla`): 21 migraciones, tablas `companies`, `profiles`, `locations`, `permits`, `documents`, `notification_preferences`, `notifications_log`, `leads`, `partners` con score generado, storage policies.
- PostgreSQL via Prisma (`life-update`): modelos `users`, `daily_entries`, `weekly_entries`, `monthly_entries`, `projects`, `plan_snapshots`.
- Design tokens JSON: `figmatokendemo/styles.json` (spacing/sizing/color scales), `tokensdemo/tokenfile` (83KB).

---

## 4. Profundidad agentic — lo más importante

**Aclaración crítica**: Danilo **no** construye sistemas agentic en runtime (no hay código que llame Claude/GPT/LangChain desde la app). Lo que sí hace — y es el diferencial real — es **operar como developer/designer usando agentes**: Claude Code + MCP servers + skills framework + subagents en paralelo. Esto es "agentic workflow", no "agentic product".

### Repos / artefactos con señal agentic fuerte

#### 4.1 `enregla` — uso maduro de agentes como co-piloto full-stack
- **Qué hace:** SaaS en producción construido mayormente con Claude Code como coautor (76 co-author signatures en 11 planes). Danilo actúa como arquitecto/product, Claude implementa.
- **Técnicas agentic visibles:**
  - **Supabase MCP server conectado** (`.mcp.json`): Claude puede ejecutar SQL, aplicar migraciones, leer logs, get_advisors. En la CLAUDE.md Danilo le instruye: *"Use mcp__supabase__execute_sql and mcp__supabase__apply_migration tools — You have direct access"*.
  - **Skills reproducibles con lock file**: `skills-lock.json` pinea 2 skills de `supabase/agent-skills` por hash SHA-256 computado. Instaladas en 3 ubicaciones simultáneas (`.claude/skills/`, `.agents/skills/`, `skills/`) para multi-harness (Claude Code + Windsurf + otros).
  - **Subagent-driven-development con despacho paralelo**: en el session-handoff describe *"Phase 1 ran ~10 subagents simultaneously. Controller stayed focused on coordination"*. Esto es orquestación real de agentes Task.
  - **Iteración recursiva con score numérico**: la migración Atlassian DS se ejecutó como 17 partes + 5 iteraciones de polish recursivo — scores 78.4 → 82 → 87.2 → 91.8 → 95.6. Cada iteración tiene su review doc (`reviews/iteration-{2..5}-*.md`). Esto es rigor de eval, aunque sea humano-en-el-loop y no LLM-as-judge.
  - **Specs + plans + handoffs como memoria externa**: 16 specs y 20+ plans en `docs/superpowers/`. Cada uno con formato estructurado para que subagentes lo consuman. Los handoffs documentan estado entre sesiones.
  - **HTML companions** junto a MD: specs importantes tienen versión `.html` visual (ej. `2026-05-06-db-reliability-design.html` 100KB+). Patrón: MD para agentes, HTML para humanos.
- **Madurez:** **alta**. Esto no es "probé Claude una vez" — es flujo de trabajo industrializado, ~1 mes de operación diaria, con métricas, lock files, y handoffs.

#### 4.2 `enregla` — Edge function `send-expiry-alerts` (pseudo-agentic runtime)
- **Qué hace:** Deno edge function que corre en cron (pg_cron + pg_net), busca permisos por vencer, agrupa por empresa, resuelve preferencias de notificación por usuario, envía emails batch via Resend, loguea resultados.
- **Técnicas:** no es agentic en sentido LLM, pero sí es un **agente-como-proceso-autónomo**: dispara sin input humano, itera sobre datos, toma decisiones condicionales (skip user si `email_enabled=false`), tiene manejo de errores estructurado y logging.
- **Madurez:** **media** — deployed, con cron configurado (`cb4c1cc: fix(deployment): instalar pg_net y arreglar cron`), pero sin LLM reasoning ni retries exponenciales explícitos en esta función.

#### 4.3 `life-update` — producto personal como proving-ground para agentes
- **Qué hace:** tracking de vida con `.md` files en el repo (source of truth del plan) + web app que los lee. Diseñado para que Danilo + Claude editen los `.md` colaborativamente y el app muestre progreso algorítmico.
- **Técnicas agentic:** el spec (`2026-05-04-life-tracking-system-design.md`) dice textualmente: *"User + Claude → Edit .md files → Git commit/push → Vercel redeploy → App re-reads plan"*. Es un workflow donde Claude es editor de plan, no solo implementador.
- **Madurez:** **baja-media**. Producto en v0.1, backend de daily entries funciona, el resto del workflow agentic está diseñado pero no implementado (analytics/progress calculations aún no existen).

#### 4.4 `enregla/docs/superpowers/specs/2026-05-06-gtm-bootstrap-design.md` — estrategia + sistema
- **Qué hace:** plan de 12 meses para 200 clientes pagando, con avatar IA (Higgsfield) para contenido orgánico en jerga ecuatoriana, 5 pilares + 4 vectores, presupuesto $9-12K, MRR proyectado. Incluye principio ético ("agresivo sin cruzar líneas").
- **Técnicas agentic:** el diseño del contenido es **AI-native** (avatar generado, jerga local), pero la spec es narrativa humana.
- **Madurez:** **spec aprobada, ejecución en semana 1**. Hay plan de sprint sem1 y mockup de landing PYME en branch separada.

### Señales agentic menores
- Uso de `mcp__supabase__list_tables`, `execute_sql`, `apply_migration`, `get_advisors`, `get_logs` documentado en CLAUDE.md como tools disponibles.
- Formato de commits consistente con convenciones + Co-Authored-By de Claude Opus 4.7 en fixes/features grandes.
- Skills framework custom en `C:/dev/.claude/CLAUDE.md` (visto en contexto del repo) — visual-first workflow, HTML companions obligatorios, user flow diagrams en cada spec.

---

## 5. Fortalezas inferidas — claims defendibles para el CV

### Strategy / product thinking
**Defendible con evidencia directa:**
- **Product documentation completa**: `enregla/docs/product/{PRODUCT,ROADMAP,BACKLOG}.md`. Roadmap segmentado en Phases 1–4. BACKLOG con RICE scoring.
- **Go-to-market concreto**: spec GTM de 12 meses con meta de 200 clientes, presupuesto cuantificado, canales multi-pilar, targeting explícito (PYME "Don Huevas" con 2-3 locales, **NO enterprise**).
- **Diseño de producto multi-persona**: en `CLAUDE.md` define 3 audiencias (gerente medium, consultor legal, dueño PYME) con contexto de uso y tono emocional objetivo ("Confianza y control").
- **Iteración por score**: 5 rondas recursivas con métricas (78.4 → 95.6) — discipline de evaluación, no vibes.

**Claim honesto:** *"Product strategy completo — vision, roadmap phased, backlog priorizado (RICE), GTM cuantificado, multi-persona design."*

**NO defendible (por solo 1 repo):** "liderazgo de producto en equipos de N+ personas", "roadmapping cross-company", "OKR alignment en equipos distribuidos".

### Design
**Defendible:**
- **Design system completo desde cero**: migración a Atlassian DS con paleta Banco Pichincha (`#0f265c` + `#ff7043`), escalas 50-900, semantic tokens, 31 componentes UI custom.
- **Showcases interactivos** (HTML standalone de 145KB): `design-system-complete.html`, `atlassian-ds-showcase.html`. Demuestra capacidad de comunicar DS sin Figma.
- **Design tokens history**: 3 repos de 2022–2023 (Style Dictionary, Figma Tokens, Specify) — experiencia DS-Ops desde hace años.
- **Mockups en código**: landing PYME, dos cards de dashboard con metáfora emocional ("ComplianceWeatherCard", "ComplianceInvoiceCard"), páginas visuales específicas de campañas (ej. `policia-judicial.html` como material de capacitación).
- **A11y awareness**: iteraciones con "A11y deep dive", `focus-visible`, prop `interactive` en Card, centralización de iconos Lucide.
- **Brand system thinking**: define 3 palabras de brand ("Preciso, Confiable, Protector"), emoción objetivo, paletas prohibidas ("AI genéricas: cyan-on-dark, neon").

**Claim honesto:** *"Design systems de punta a punta — tokens (Style Dictionary/Figma/Specify), componentes custom (shadcn-style), showcases interactivos, migraciones grandes (17 parts + 5 iteraciones recursivas hasta 95.6/100)."*

**NO defendible por pocos datos:** "design leadership", "design ops para >2 productos en paralelo", "user research con n>10".

### Engineering
**Defendible:**
- **TypeScript moderno** (React 19, TS 6, Next 16) — usa versiones bleeding-edge con comodidad.
- **Full-stack**: frontend (React/Next), backend (Supabase, Prisma, NextAuth), DB (21 migraciones SQL con RLS dual-mode, funciones generadas, checks, pg_cron, storage policies), infra (Vercel, GitHub Actions CI).
- **Arquitectura pragmática**: separa features por carpeta, hooks custom, query client compartido con timeouts hard (10s), error banners, retry policies, Sentry placeholder.
- **Migraciones SQL reales**: no usa UI de Supabase, escribe SQL con checks, foreign keys, generated columns, triggers, RLS por tabla con demo-mode isolation.
- **CI funcional**: `.github/workflows/ci.yml` con lint + typecheck + build + test en cada PR.
- **Convention discipline**: conventional commits, CHANGELOG.md mantenido, CONTRIBUTING.md, CUSTOM-DOMAIN-SETUP.md, OAUTH-SETUP.md.
- **TDD parcial**: `PartnerScorecard` tiene test file; `queryClient` tiene test; network map tiene 3 tests.

**Claim honesto:** *"Full-stack TypeScript moderno — React/Next bleeding-edge, Supabase (Postgres + RLS + Edge Functions + Storage + Cron), CI/CD, migraciones SQL production-grade, deployments vivos."*

**NO defendible:** "backend distribuido a escala", "microservicios", "sistemas con >1M usuarios", "on-call / SLA real probado".

### Agents
**Defendible:**
- **Claude Code power-user** con flujos industrializados: skills framework, skills-lock reproducible, MCP servers (Supabase), subagent-driven development con despacho paralelo, iteración recursiva scoreada.
- **Prompt engineering por docs**: instrucciones de nivel producción en `CLAUDE.md` (database management rules, RLS patterns, demo mode policy, tool-use guidance).
- **Agentic workflow design**: specs → plans → subagents → reviews → handoffs, todos en estructura consumible por LLMs.
- **MCP integration**: configuró Supabase MCP server remoto conectado a su proyecto, y lo usa para ejecutar SQL desde Claude con permisos reales.

**Claim honesto:** *"Agentic workflows en producción diaria — Claude Code + MCP servers + skills reproducibles, orquestación de subagents para features multi-parte, docs consumibles por LLM como memoria externa."*

**NO defendible (por ausencia en código runtime):** "diseño de sistemas multi-agente en runtime", "RAG en producción", "Anthropic SDK para producto", "evals de LLM con eval frameworks (promptfoo, Inspect, Braintrust)". **Es un gap real**.

---

## 6. Debilidades / "en curso" candidatos honestos

Cosas que NO aparecen o aparecen poco y que un Agentic Designer 2026 necesita tener (o señalar honestamente que está aprendiendo):

1. **Evals / observabilidad de LLM**: cero evidencia de testing sistemático de prompts, golden sets, regressions, o métricas de calidad en LLM outputs. No hay `promptfoo`, `langfuse`, `braintrust`, `Inspect`, `openllmetry`. → *CV: "en curso — aprendiendo evals con Inspect/promptfoo para productos con LLM"*.
2. **LLM en runtime del producto**: no hay `anthropic` ni `openai` como dependencia en `package.json`. Su posicionamiento "agentic designer" se apoya en **workflow personal**, no en producto que use agentes. Este es el gap más sensible a cerrar. → *CV: "siguiente hito — shipear una feature con LLM en producción (ej. EnRegla assistant para permisos)"*.
3. **Observabilidad madura**: Sentry en env placeholder (no activado), sin Datadog/Honeycomb/Grafana/PostHog visibles. Logs solo en `console.*`. → *CV: "en curso — Sentry + product analytics (PostHog)"*.
4. **Cobertura de tests**: su propio Ultra Review dice "2/8 failing, 71 console.logs, test coverage ~5%". 6 tests en ~17.5K LOC. → *CV: ser honesto — "calidad via TDD parcial y code review riguroso; ampliando coverage en sprints de hardening"*.
5. **Colaboración en equipo**: su GitHub no muestra PRs de otros, issues abiertos por terceros, ni forks. Trabaja solo (o con Claude). Esto es un posicionamiento válido pero limita el claim de "tech lead". → *CV: posicionar como "founder/solo-engineer con IA como multiplicador" en vez de "tech lead de equipo"*.
6. **Backend distribuido / sistemas a escala**: toda la infra es Vercel + Supabase + edge functions. No hay Kubernetes, Redis, queues, workers, ni caching avanzado. → Está bien; no pretender lo contrario.
7. **Producto público con tracción medible**: EnRegla está en 1.0-MVP pero todavía sin clientes pagando (meta es 200 en 12 meses). No hay screenshot de MRR ni testimonios. → *CV: timeline honesto "MVP en producción, primeros pilotos Q2 2026"*.
8. **Casos históricos previos a 2022**: el CV actual termina en 2022. Los repos de 2022 son ejercicios de tokens, no productos. Si tuvo experiencia diseñando en empresas (es probable por la autodescripción "10+ years experience" en life-update spec), no está en GitHub. → *CV: pedirle a Danilo case studies pre-2022 en formato narrativo*.
9. **Portfolio visual tradicional**: no hay screenshots/videos en los READMEs. Todo se entiende leyendo código. Para un Agentic Designer vendiendo a clientes, faltan "shots" navegables. → *CV/landing: generar un showcase visual*.
10. **Idiomas de comunicación**: docs en español mezclado con inglés. Para audiencia LATAM está perfecto. Para clientes US/EU conviene explicitar bilingüismo. → *CV: listar ES (nativo) / EN (técnico)*.

---

## 7. Case studies candidatos (5-7 más vendibles)

### 7.1 ⭐ EnRegla — SaaS de compliance con Claude Code como co-builder
- **Hook:** *"Diseñé y construí un SaaS de compliance multi-sede para PYMES en Ecuador — de 0 a 1.0-MVP en producción en 40 días, co-construido con Claude Code usando MCP servers y subagents paralelos."*
- **Lo interesante:** stack moderno completo, docs de producto + GTM + arquitectura, RLS dual-mode, network map interactivo, QR de verificación pública, edge function con cron, design system custom, CI/CD, subagents paralelos.
- **Qué le falta para caso completo:** screenshots/video de la app, métricas de tracción (primeros pilotos), un "lessons learned" narrativo, antes/después visual, un ángulo de "cost vs velocity" (cuánto tiempo/costo vs un equipo tradicional).

### 7.2 ⭐ Migración Atlassian Design System — 17 partes + 5 iteraciones recursivas
- **Hook:** *"Rediseñé el sistema de diseño de EnRegla usando Atlassian DS con identidad Banco Pichincha — 17 componentes migrados y 5 rondas de polish recursivo con scoring numérico (78.4 → 95.6) en 2 días."*
- **Lo interesante:** discipline de scoring cuantitativo, review docs por iteración, subagent-driven dispatch paralelo, `design-system-complete.html` de 145KB como deliverable navegable, tokens migration con backwards-compat aliases.
- **Qué le falta:** antes/después visual (side-by-side), un video corto del workflow con subagents, publicar el showcase HTML en URL pública.

### 7.3 GTM Bootstrap para PYMES ecuatorianas — sistema ético de 12 meses
- **Hook:** *"Diseñé un sistema de adquisición de 200 clientes en 12 meses para una SaaS de compliance, con avatar IA (Higgsfield), jerga local, presupuesto $9-12K, y un principio explícito de no-spam."*
- **Lo interesante:** estrategia + producto + ejecución en un solo documento, targeting contraintuitivo (NO enterprise, sí "Don Huevas con 2-3 locales"), 5 pilares con pesos %, reframing ético ("Socios con evidencia" en vez de "Caballo de Troya").
- **Qué le falta:** resultados reales (está en ejecución sem 1), deck visual del plan, un post-mortem a 3 meses.

### 7.4 Life Update — sistema de tracking personal 0→prod en 1 día
- **Hook:** *"Construí un sistema de tracking de vida personal (Next.js 16 + NextAuth v5 + Prisma + Supabase) desde commit inicial hasta deploy en producción en un día — 20 commits, full auth, DB schema, daily entries API."*
- **Lo interesante:** prueba de velocidad del setup Claude Code + skills + MCP, hybrid data model (md files = source of truth + DB = execution engine), schema Prisma bien pensado (daily/weekly/monthly/projects/snapshots).
- **Qué le falta:** el analytics/progress engine (mencionado en spec pero no implementado), un case study narrativo "1 día de vida con Claude Code".

### 7.5 CRM interno de enablers con scorecard auto-calculado
- **Hook:** *"Diseñé y construí un pipeline de partners (contadoras, tramitadores, consultores) con scorecard de 8 dimensiones (ponderaciones 1-5) y auto-calificación (priority/good/nurture/ignore) en Postgres como generated column + React component TDD."*
- **Lo interesante:** modelo de datos declarativo (el score vive en el DB, no en el frontend), TDD real (hay test antes del componente — `PartnerScorecard.test.tsx`), 8 criterios pensados desde GTM spec.
- **Qué le falta:** es un feature chico dentro de EnRegla, hay que vestirlo como mini-caso (3 párrafos, 1 screenshot).

### 7.6 DB Reliability Sprint — de "skeleton eterno" a app resiliente
- **Hook:** *"Diagnostiqué un problema intermitente de UX ('la app se muere') en un SaaS con 10 pilotos proyectados, y lo resolví en un sprint con root-cause análisis (~90% client-side, ~10% schema), migración a TanStack Query, hard timeouts, retry policies, y Sentry + CI validation gates."*
- **Lo interesante:** spec con problema/causas/no-goals explícitos, diagrama before/after en código, el rigor de separar qué sí/qué no entra en scope.
- **Qué le falta:** métricas de "después" (p99 latency, error rate), un tweet-sized versión del caso.

### 7.7 Capacitación IA para Policía Judicial del Ecuador (artefacto independiente)
- **Hook:** *"Diseñé un documento HTML interactivo (~260KB, standalone, sin build) para capacitar agentes de Policía Judicial en uso responsable de IA — dolores, regulación, herramientas, plan de clase, prompts, casos ficticios."*
- **Lo interesante:** design system propio ("Orange IA" shader), contenido pedagógico serio sobre IA pública, material institucional en un artefacto entregable offline.
- **Qué le falta:** contexto ("¿fue contratado? ¿fue volunteer?"), permiso para usarlo públicamente, link a la versión navegable.

---

## 8. Señales de marca / voz

**Idioma:** bilingüe ES-EN con predominio ES en prosa y mix natural en código/commits. Terminología técnica en inglés ("feature", "spec", "hardening"), storytelling en español ("Don Huevas con 2-3 locales", "este man perdió plata").

**Tono:**
- **Técnico + cálido.** No es frío ni corporativo. Usa emojis con moderación (⭐✅❌⚠️) en READMEs, pero no en commits.
- **Directo y sin-floritura.** Commits estilo "fix: corregir dominio de enregla.com a enregla.ec" — problema concreto, solución concreta.
- **Transparente sobre trade-offs.** En specs explicita "non-goals", "risks", "open questions". En Ultra Review se autocritica ("2/8 tests failing, 71 console.logs").
- **Producto-first.** Todo el discurso está centrado en el usuario final (el dueño de PYME que "no tiene gerente legal"). No hay "tech for tech's sake".
- **Discipline de naming.** Convenciones estrictas: `v1/v2` en carpetas durante migraciones, `feature/` branches, `docs/superpowers/{specs,plans,reviews}/YYYY-MM-DD-<topic>-<type>.md`.

**Naming patterns:**
- Archivos: kebab-case para docs, PascalCase para componentes React, camelCase para hooks.
- Nombres de empresa/alias: "Danilo", "Aura" (alias comercial), "HashUI" (alias viejo).
- Humor sutil: el readme del repo `dr-cv` dice simplemente "La vida entera de Danilo Rojas".

**Señales de influencias/filosofía:**
- **Visual-first workflow** (regla global: "would the user understand this better by seeing it than reading it?").
- **HTML companions obligatorios** en specs (MD para agentes, HTML para humanos).
- **Recursive iteration con score numérico** (estilo design system review).
- **Skills reproducibles con lock file** (estilo package manager).
- **Referencias explícitas a Claude Code** en READMEs — no oculta que trabaja con IA.

**Fraseo característico (extracción literal de su output):**
- *"Preciso, Confiable, Protector"* (3 palabras de brand de EnRegla).
- *"Jerarquía Funcional sobre Decoración"* (design principle).
- *"Nunca emails/WhatsApp a personas sin consentimiento. Primer toque siempre consentido."* (principio ético GTM).
- *"MVP → Producción en 40 días con Claude Code"*.
- *"Agresivo sin cruzar líneas"* (valor).

**Implicación para la landing de `dr-cv`:**
- Español principal, inglés selectivo para términos técnicos.
- Tono cálido-técnico. Frases cortas, verbos concretos.
- Usar contraste "antes 2022 UX/UI Designer → ahora Agentic Designer con producto en producción".
- Mostrar screenshots/HTML companions, no solo prosa.
- Incluir explícitamente la filosofía: "construyo con agentes, no a pesar de ellos".

---

## 9. Preguntas abiertas para Danilo (máx 10)

1. **Career pre-2022**: tu CV termina como "UX/UI Product Designer". ¿Dónde trabajaste antes de 2022? ¿Empresas, roles, duración, proyectos narrables? Los 3 repos de tokens de 2022 son ejercicios — ¿eran para un trabajo, un estudio, o pets?
2. **EnRegla realidad comercial**: el README dice "1.0-MVP en producción" y el GTM apunta a 200 clientes en 12 meses. ¿Ya hay clientes pagando? ¿Pilotos activos? ¿Primer revenue? — esto determina si el case es "en lanzamiento" vs "con tracción".
3. **Aura (alias comercial)**: ¿es un estudio con otros o un alias solo tuyo? En la landing aparece como brand, pero no hay otros GitHubs asociados.
4. **Policía Judicial del Ecuador HTML**: ¿fue contratado? ¿para qué institución específicamente? ¿tienes permiso de usarlo públicamente como caso?
5. **`te-platform` / TE Portfolio**: aparece en `life-update/prisma/schema.prisma` como proyecto activo. ¿Qué es? ¿Cuál es la tesis?
6. **Figma → Backstage (`figma-backstage[2]`)**: ¿por qué 2 repos vacíos del mismo tema en Nov 2025? ¿Es un proyecto con cliente, un experimento, o algo que quieres reintentar?
7. **Experiencia con LLMs en runtime**: ¿has construido **algo** con Anthropic SDK o OpenAI SDK que no esté en GitHub público? ¿Clients workshop, POCs privados, repos privados?
8. **Equipo y colaboración**: ¿has hecho trabajo con equipos humanos (no Claude) en los últimos 3 años? Code reviews, mentorship, sprints compartidos. Esto abre/cierra ciertos claims.
9. **Posicionamiento "Agentic Designer"**: ¿estás cómodo posicionando el diferencial como "workflow agentic" (lo que ya haces y está probado) o quieres también reclamar "productos con agentes en runtime" (requiere shipear algo nuevo primero)?
10. **Audiencia del CV**: ¿el CV es para conseguir clientes freelance/contract (LATAM y US), para un puesto in-house, o para inversores de una SaaS futura? El tono cambia significativamente.

---

## Apéndice A — Timeline de actividad GitHub (de más reciente a más viejo)

| Periodo | Actividad |
|---------|-----------|
| 2026-05-07 (hoy) | `dr-cv` creado; `enregla` merge `feature/database-audit` (DB production-ready + null-safety) |
| 2026-05-05 → 2026-05-07 | **Sprint GTM + CRM interno + DB audit**: landing PYME, tablas leads/partners, scorecard, DB reliability sprint, atlassian-ds-migration merge |
| 2026-05-04 → 2026-05-05 | **Atlassian DS Migration** (17 partes + 5 iteraciones, 95.6/100 final); `life-update` 0→prod en 1 día |
| 2026-04-22 → 2026-04-28 | Email notifications edge function + CRM start |
| 2026-04-14 → 2026-04-20 | **EnRegla 1.0-MVP shipping**: shadcn migration, onboarding incremental, document upload, public links, network map v2/v3 |
| 2026-04-08 | EnRegla repo creado |
| 2025-12-05 | `te-platform` reservado (vacío) |
| 2025-11-17 | `figma-backstage[2]` reservados (vacíos) |
| 2023-08-08 | Último push a `figmatokendemo` |
| 2023-05-01 | `mkdocs-material` creado (1 commit) |
| 2022-08-21 → 2022-12-19 | Época de experimentos de design tokens (`figmatokendemo`, `TokenStyles`, `demotoken`, `tokensdemo`) |
| 2022-08-21 | Cuenta GitHub creada |

**Gap evidente en GitHub público:** 2023-08 → 2025-11 (≈27 meses sin actividad visible). El trabajo de este periodo está en repos privados, clientes, o fuera de git — hay que preguntarle a Danilo.

---

## Apéndice B — Métricas cuantitativas (verificables)

| Métrica | Valor |
|---------|-------|
| Total repos públicos | 12 |
| Repos con contenido real | 7 (5 son placeholders vacíos) |
| Repos con push en 2026 | 4 (`enregla`, `dr-cv`, `va`, `life-update`) |
| Commits en `enregla` (shallow ~30 días) | ~346 |
| Commits en `life-update` | 20 |
| LOC en `enregla` (según Ultra Review propio) | ~17,544 |
| Migraciones SQL en `enregla` | 21 |
| Componentes UI custom en `enregla` | 31 |
| Hooks custom en `enregla` | 10 |
| Feature modules en `enregla` | 14 |
| Specs en `enregla/docs/superpowers/specs/` | 16 |
| Plans en `enregla/docs/superpowers/plans/` | 20 |
| Reviews por iteración | 4 |
| Edge functions | 1 (`send-expiry-alerts`) |
| MCP servers configurados | 1 (Supabase) |
| Skills pinned en lock file | 2 (ambas de `supabase/agent-skills`) |
| Archivos de test | 6 |
| Estimado de test coverage | ~5% (por su propio reporte) |
| Deploys vivos | 2 (`enregla.vercel.app`, `life-update-wheat.vercel.app`) |
| Stars totales | 1 (en `enregla`, self-star o similar) |
| Forks de sus repos | 0 |
| Followers | 0 |

---

**Fin del audit.** Este documento debe ser suficiente para llenar un skills map estructurado, un CV bilingüe reposicionado como Agentic Designer, y 5-7 case studies en el portfolio. Las 10 preguntas abiertas son el bloqueo para avanzar a Fase 2.
