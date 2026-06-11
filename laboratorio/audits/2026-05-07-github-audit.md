# GitHub Audit â€” Danilo Rojas (`mdanilorojas`)

**Fecha del audit:** 2026-05-07
**Fuente:** GitHub API pÃºblica + clones `--depth 50` de los repos relevantes
**Objetivo:** materia prima para reposicionar a Danilo como **Agentic Designer** con base de ingenierÃ­a, reescribir su CV, y extraer case studies vendibles.

---

## Resumen ejecutivo (10 lÃ­neas)

1. Danilo tiene **12 repos pÃºblicos**, pero el perfil en GitHub **subrepresenta masivamente** su volumen de trabajo: 7 estÃ¡n vacÃ­os o son experimentos de 2022â€“2023 sobre design tokens, y **casi toda la actividad real estÃ¡ concentrada en 2 repos de las Ãºltimas 4 semanas** (2026-04-08 â†’ 2026-05-07).
2. **`enregla`** es el repo central: SaaS de compliance para PYMES en Ecuador. React 19 + TS 6 + Vite 8 + Supabase + Vercel. ~346 commits en ~1 mes, 51 archivos de features, 31 componentes UI, 21 migraciones SQL, 1 edge function, CI en GitHub Actions, 1.0-MVP en producciÃ³n (`enregla.vercel.app`, dominio objetivo `enregla.ec`).
3. **`life-update`** es la segunda prueba: Next.js 16 + NextAuth v5 + Prisma + Supabase. 20 commits en 1 dÃ­a. Producto personal (sistema de tracking diario), desplegado en Vercel (`life-update-wheat.vercel.app`). Muestra velocidad de bootstrap 0â†’producciÃ³n en un sprint.
4. **El gap del CV 2022â†’2026 estÃ¡ resuelto en el cÃ³digo**: diseÃ±o, producto, ingenierÃ­a full-stack, arquitectura DB, RLS, CI, deploys, y workflow agentic documentado paso a paso.
5. **La seÃ±al agentic mÃ¡s fuerte NO es cÃ³digo con Anthropic SDK** (no lo usa en runtime) â€” es **el uso intensivo de Claude Code + skills "superpowers" como metodologÃ­a de trabajo**: specs, plans, recursive iterations, subagent-driven-development, handoffs, reviews numÃ©ricos por iteraciÃ³n. Es un caso de "diseÃ±ador que opera con orquesta de agentes", no "desarrollador que llama una API".
6. **Piezas serias de ingenierÃ­a agentic en producto**: Supabase MCP server configurado en el repo (`.mcp.json`), skills-lock.json reproducible (`supabase/agent-skills` pinned por hash), edge function de alerts con cron (pg_cron), RLS dual-mode (demo + producciÃ³n), feature flags por env, integraciÃ³n con TanStack Query + Sentry + React Hook Form + Zod.
7. **Design chops visibles**: sistema de tokens completo (Atlassian DS con Banco Pichincha blue + orange), 31 componentes UI custom (shadcn-style), showcases HTML interactivos (`design-system-complete.html` 145KB, `atlassian-ds-showcase.html`), landing PYME, dos tableros con "weather card" emocional de compliance.
8. **Debilidades honestas**: cobertura de tests baja (6 archivos de test, ~5% coverage por su propio reporte), cero trabajo con APIs de LLM en runtime (no llama Claude/GPT desde cÃ³digo), colaboraciÃ³n solo-dev (no hay PRs externos ni issues de terceros), docs centradas en SaaS (poco portfolio pÃºblico de trabajo previo como diseÃ±ador), observabilidad apenas cableada (Sentry en placeholder).
9. **Case studies vendibles inmediatos**: EnRegla (el principal â€” 5+ Ã¡ngulos narrativos), migraciÃ³n Atlassian DS (17 partes + 5 iteraciones recursivas de polish), GTM bootstrap spec (estrategia + producto + sprint semana 1), CRM interno de partners con scorecard (TDD real), life-update (0â†’prod en un dÃ­a), capacitaciÃ³n IA PolicÃ­a Judicial (artefacto HTML pedagÃ³gico).
10. **Voz de marca**: bilingÃ¼e ES-EN, tÃ©cnico pero cÃ¡lido, frases como "dueÃ±os operativos que no hablan jerga", mezcla "Don Huevas con 2-3 locales" con SLAs y RICE scoring. AutodescripciÃ³n en bio: *"Software designer focused on creating exceptional user experiences powered by cutting-edge technology"*.

---

## 1. Inventario completo de repos

Total: **12 repos pÃºblicos**. NingÃºn fork marcado como tal en la API aunque `tokensdemo` sÃ­ es fork. Ninguno archivado.

| # | Repo | DescripciÃ³n | Lang principal | Ãšltimo push | Stars | Forks | Fork? | README Ãºtil | Estado |
|---|------|-------------|----------------|-------------|-------|-------|-------|-------------|--------|
| 1 | [`enregla`](https://github.com/mdanilorojas/enregla) | (sin description) â€” SaaS compliance multi-sede LATAM | TypeScript | 2026-05-07 | 1 | 0 | no | **SÃ­, exhaustivo** (10KB) | **ProducciÃ³n 1.0-MVP**, 346 commits, homepage `https://enregla.vercel.app` |
| 2 | [`dr-cv`](https://github.com/mdanilorojas/dr-cv) | "La vida entera de Danilo Rojas" | â€” | 2026-05-07 | 0 | 0 | no | Minimal (39 bytes) | ReciÃ©n creado hoy |
| 3 | [`va`](https://github.com/mdanilorojas/va) | (sin description) | â€” | 2026-05-05 | 0 | 0 | no | **VacÃ­o** | Placeholder vacÃ­o |
| 4 | [`life-update`](https://github.com/mdanilorojas/life-update) | (sin description) â€” tracking diario de vida | TypeScript | 2026-05-05 | 0 | 0 | no | No README (pero `docs/superpowers/` + `plan/`) | **Desplegado**, 20 commits, homepage `https://life-update-wheat.vercel.app` |
| 5 | [`te-platform`](https://github.com/mdanilorojas/te-platform) | (sin description) | â€” | 2025-12-05 | 0 | 0 | no | **VacÃ­o** | Placeholder vacÃ­o |
| 6 | [`figma-backstage2`](https://github.com/mdanilorojas/figma-backstage2) | (sin description) | â€” | 2025-11-17 | 0 | 0 | no | **VacÃ­o** | Placeholder vacÃ­o |
| 7 | [`figma-backstage`](https://github.com/mdanilorojas/figma-backstage) | "A test environment for Figma to Backstage" | â€” | 2025-11-17 | 0 | 0 | no | **VacÃ­o** | Placeholder vacÃ­o |
| 8 | [`mkdocs-material`](https://github.com/mdanilorojas/mkdocs-material) | (sin description) | â€” | 2023-05-01 | 0 | 0 | no (pero nombre sugiere que fue fork de `squidfunk/mkdocs-material`) | Solo `.gitignore` inicial | 1 commit inicial, abandonado |
| 9 | [`tokensdemo`](https://github.com/mdanilorojas/tokensdemo) | (sin description) | â€” | 2022-12-19 | 0 | 0 | **sÃ­ (fork)** | README 13 bytes | `.specifyrc.json` con pipeline Specifyâ†’Tailwind/CSS; abandonado |
| 10 | [`TokenStyles`](https://github.com/mdanilorojas/TokenStyles) | (sin description) â€” Style Dictionary basic demo | Swift | 2022-08-30 | 0 | 0 | no | README (starter de Style Dictionary) | Abandonado |
| 11 | [`demotoken`](https://github.com/mdanilorojas/demotoken) | (sin description) | â€” | 2022-08-29 | 0 | 0 | no | **VacÃ­o** | Placeholder vacÃ­o |
| 12 | [`figmatokendemo`](https://github.com/mdanilorojas/figmatokendemo) | "Figma tokens demo repository" | â€” | 2023-08-08 | 0 | 0 | no | README trivial ("holi") | `styles.json` (17KB) y `UIPstyles.json` (83KB) con tokens Figma â†’ abandonado |

**ObservaciÃ³n clave:** 5 de 12 repos estÃ¡n vacÃ­os (`va`, `te-platform`, `figma-backstage`, `figma-backstage2`, `demotoken`) â€” son reservas de nombre. El perfil *parece* pequeÃ±o pero la masa estÃ¡ concentrada en `enregla` + `life-update`.

---

## 2. Clustering temÃ¡tico

### Cluster A â€” **Producto SaaS en producciÃ³n** (el trabajo serio)
- `enregla`

PatrÃ³n: arquitectura full-stack moderna (React 19 + Supabase), ciclo completo productâ†’designâ†’engâ†’deploy, docs de producto (PRODUCT/ROADMAP/BACKLOG con RICE scoring), feature flags, RLS dual-mode, edge functions, cron, GTM sprint documentado.

### Cluster B â€” **Producto personal en iteraciÃ³n rÃ¡pida** (proving-ground)
- `life-update`

PatrÃ³n: Next.js 16 App Router + NextAuth v5 + Prisma + Supabase Postgres. De 0 a deploy en 1 dÃ­a (20 commits en 24h). Schema Prisma serio con modelos `User`, `DailyEntry`, `WeeklyEntry`, `MonthlyEntry`, `Project`, `PlanSnapshot`. Valida API con handlers tipados, upsert en Postgres. DiseÃ±o dark mode + shadcn/ui.

### Cluster C â€” **Repos placeholder / en barbecho**
- `dr-cv` (hoy), `va`, `te-platform`, `figma-backstage`, `figma-backstage2`, `demotoken`

PatrÃ³n: reservados para proyectos futuros. `te-platform` parece ser "TE Portfolio" mencionado en `life-update/prisma/schema.prisma` como proyecto activo. `figma-backstage[2]` apuntaba a un test Figmaâ†”Backstage (plataforma de developer portals de Spotify).

### Cluster D â€” **Experimentos de design tokens (2022â€“2023)**
- `tokensdemo`, `TokenStyles`, `figmatokendemo`

PatrÃ³n: Ã©poca "UX/UI Product Designer" â€” explora pipelines Figma Tokens â†’ Style Dictionary â†’ Specify â†’ cÃ³digo (Swift/SCSS/JSON). Son ejercicios, no publicables. Muestran que Danilo venÃ­a del mundo DS-Ops.

### Cluster E â€” **Docs / Tooling**
- `mkdocs-material`

PatrÃ³n: 1 commit de intento de setup de MkDocs. Abandonado.

---

## 3. Stack tÃ©cnico detectado

Agregado sobre los repos con contenido real (principalmente `enregla` + `life-update`; los de 2022 se notan aparte).

### Lenguajes
| Lenguaje | Apariciones | DÃ³nde |
|----------|-------------|-------|
| TypeScript | 2 repos grandes | `enregla` (`~17.5K LOC` segÃºn su propio Ultra Review), `life-update` |
| JavaScript | secundario | scripts, configs |
| SQL (Postgres) | 1 repo | `enregla/supabase/migrations/` (21 archivos) |
| Swift | 1 repo viejo | `TokenStyles` (2022) |
| HTML/CSS | standalone | `enregla/policia-judicial.html`, `atlassian-ds-showcase.html`, `design-system-complete.html` (145KB) |

### Frameworks / LibrerÃ­as UI
| Tech | DÃ³nde |
|------|-------|
| React 19.2.4 | `enregla`, `life-update` |
| Next.js 16 (App Router) | `life-update` |
| Vite 8 | `enregla` |
| Tailwind 4 | ambos |
| shadcn/ui | ambos (implÃ­cito por componentes + `components.json`) |
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
| Tech | DÃ³nde |
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
| Tech | DÃ³nde |
|------|-------|
| Supabase (Postgres + Auth + Storage + Edge Functions) | `enregla` (con `.mcp.json` apuntando a Supabase MCP server remoto), `life-update` |
| NextAuth v5 (beta.31) + Prisma adapter | `life-update` |
| bcryptjs | `life-update` |
| Vercel | ambos (deploys vivos) |
| GitHub Actions | `enregla` (CI: lint + typecheck + build + test en cada PR/push a main) |
| pg_cron + pg_net | `enregla` (cron para `send-expiry-alerts`) |
| Resend | `enregla` (email service en edge function) |
| Sentry | `enregla` (env placeholder; integraciÃ³n cableada pero no activada aÃºn) |

### Testing
| Tech | DÃ³nde |
|------|-------|
| Vitest 4 + @testing-library/react | `enregla` (**6 archivos de test total**: `dashboard-metrics`, `queryClient`, `PartnerScorecard`, `NetworkMapV3`, `useNodeAnimation`, `useStaticLayout`) |
| jsdom | `enregla` |
| ESLint 9 + typescript-eslint | ambos |

### Herramientas de IA / agentes
| Tech / SeÃ±al | DÃ³nde | Nota |
|--------------|-------|------|
| **Claude Code** | Ambos (README footer: *"Built with â¤ï¸ using Claude Code"*; commits `Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>`) | 76+ menciones en docs |
| **Superpowers skill framework** (`brainstorming`, `writing-plans`, `subagent-driven-development`, `executing-plans`, `verification-before-completion`) | `enregla/docs/superpowers/{specs,plans,reviews}` | 15+ planes y specs siguen el template |
| **Supabase MCP server** | `enregla/.mcp.json` (http transport a `mcp.supabase.com/mcp?project_ref=...`) | 1 MCP server configurado |
| **Supabase agent-skills** | `enregla/skills/`, `enregla/.claude/skills/`, `enregla/.agents/skills/` + `skills-lock.json` con hashes | Skills "supabase" y "supabase-postgres-best-practices" pinned por hash computado, instaladas vÃ­a `npx skills add` |
| **Cursor / Windsurf** | `enregla/.windsurf/skills/`, `enregla/.claude/` | SeÃ±al de multi-IDE agentic |
| **Higgsfield** (avatar IA) | mencionado en GTM spec | Plan de content con avatar IA para PYME EC |
| Anthropic SDK / OpenAI SDK | **no importados en runtime en ningÃºn repo** | Danilo no hace calls a LLM desde el producto todavÃ­a |
| LangChain / RAG | **no presente** | â€” |

### Data (lo que el cÃ³digo modela)
- PostgreSQL 15 via Supabase (`enregla`): 21 migraciones, tablas `companies`, `profiles`, `locations`, `permits`, `documents`, `notification_preferences`, `notifications_log`, `leads`, `partners` con score generado, storage policies.
- PostgreSQL via Prisma (`life-update`): modelos `users`, `daily_entries`, `weekly_entries`, `monthly_entries`, `projects`, `plan_snapshots`.
- Design tokens JSON: `figmatokendemo/styles.json` (spacing/sizing/color scales), `tokensdemo/tokenfile` (83KB).

---

## 4. Profundidad agentic â€” lo mÃ¡s importante

**AclaraciÃ³n crÃ­tica**: Danilo **no** construye sistemas agentic en runtime (no hay cÃ³digo que llame Claude/GPT/LangChain desde la app). Lo que sÃ­ hace â€” y es el diferencial real â€” es **operar como developer/designer usando agentes**: Claude Code + MCP servers + skills framework + subagents en paralelo. Esto es "agentic workflow", no "agentic product".

### Repos / artefactos con seÃ±al agentic fuerte

#### 4.1 `enregla` â€” uso maduro de agentes como co-piloto full-stack
- **QuÃ© hace:** SaaS en producciÃ³n construido mayormente con Claude Code como coautor (76 co-author signatures en 11 planes). Danilo actÃºa como arquitecto/product, Claude implementa.
- **TÃ©cnicas agentic visibles:**
  - **Supabase MCP server conectado** (`.mcp.json`): Claude puede ejecutar SQL, aplicar migraciones, leer logs, get_advisors. En la CLAUDE.md Danilo le instruye: *"Use mcp__supabase__execute_sql and mcp__supabase__apply_migration tools â€” You have direct access"*.
  - **Skills reproducibles con lock file**: `skills-lock.json` pinea 2 skills de `supabase/agent-skills` por hash SHA-256 computado. Instaladas en 3 ubicaciones simultÃ¡neas (`.claude/skills/`, `.agents/skills/`, `skills/`) para multi-harness (Claude Code + Windsurf + otros).
  - **Subagent-driven-development con despacho paralelo**: en el session-handoff describe *"Phase 1 ran ~10 subagents simultaneously. Controller stayed focused on coordination"*. Esto es orquestaciÃ³n real de agentes Task.
  - **IteraciÃ³n recursiva con score numÃ©rico**: la migraciÃ³n Atlassian DS se ejecutÃ³ como 17 partes + 5 iteraciones de polish recursivo â€” scores 78.4 â†’ 82 â†’ 87.2 â†’ 91.8 â†’ 95.6. Cada iteraciÃ³n tiene su review doc (`reviews/iteration-{2..5}-*.md`). Esto es rigor de eval, aunque sea humano-en-el-loop y no LLM-as-judge.
  - **Specs + plans + handoffs como memoria externa**: 16 specs y 20+ plans en `docs/superpowers/`. Cada uno con formato estructurado para que subagentes lo consuman. Los handoffs documentan estado entre sesiones.
  - **HTML companions** junto a MD: specs importantes tienen versiÃ³n `.html` visual (ej. `2026-05-06-db-reliability-design.html` 100KB+). PatrÃ³n: MD para agentes, HTML para humanos.
- **Madurez:** **alta**. Esto no es "probÃ© Claude una vez" â€” es flujo de trabajo industrializado, ~1 mes de operaciÃ³n diaria, con mÃ©tricas, lock files, y handoffs.

#### 4.2 `enregla` â€” Edge function `send-expiry-alerts` (pseudo-agentic runtime)
- **QuÃ© hace:** Deno edge function que corre en cron (pg_cron + pg_net), busca permisos por vencer, agrupa por empresa, resuelve preferencias de notificaciÃ³n por usuario, envÃ­a emails batch via Resend, loguea resultados.
- **TÃ©cnicas:** no es agentic en sentido LLM, pero sÃ­ es un **agente-como-proceso-autÃ³nomo**: dispara sin input humano, itera sobre datos, toma decisiones condicionales (skip user si `email_enabled=false`), tiene manejo de errores estructurado y logging.
- **Madurez:** **media** â€” deployed, con cron configurado (`cb4c1cc: fix(deployment): instalar pg_net y arreglar cron`), pero sin LLM reasoning ni retries exponenciales explÃ­citos en esta funciÃ³n.

#### 4.3 `life-update` â€” producto personal como proving-ground para agentes
- **QuÃ© hace:** tracking de vida con `.md` files en el repo (source of truth del plan) + web app que los lee. DiseÃ±ado para que Danilo + Claude editen los `.md` colaborativamente y el app muestre progreso algorÃ­tmico.
- **TÃ©cnicas agentic:** el spec (`2026-05-04-life-tracking-system-design.md`) dice textualmente: *"User + Claude â†’ Edit .md files â†’ Git commit/push â†’ Vercel redeploy â†’ App re-reads plan"*. Es un workflow donde Claude es editor de plan, no solo implementador.
- **Madurez:** **baja-media**. Producto en v0.1, backend de daily entries funciona, el resto del workflow agentic estÃ¡ diseÃ±ado pero no implementado (analytics/progress calculations aÃºn no existen).

#### 4.4 `enregla/docs/superpowers/specs/2026-05-06-gtm-bootstrap-design.md` â€” estrategia + sistema
- **QuÃ© hace:** plan de 12 meses para 200 clientes pagando, con avatar IA (Higgsfield) para contenido orgÃ¡nico en jerga ecuatoriana, 5 pilares + 4 vectores, presupuesto $9-12K, MRR proyectado. Incluye principio Ã©tico ("agresivo sin cruzar lÃ­neas").
- **TÃ©cnicas agentic:** el diseÃ±o del contenido es **AI-native** (avatar generado, jerga local), pero la spec es narrativa humana.
- **Madurez:** **spec aprobada, ejecuciÃ³n en semana 1**. Hay plan de sprint sem1 y mockup de landing PYME en branch separada.

### SeÃ±ales agentic menores
- Uso de `mcp__supabase__list_tables`, `execute_sql`, `apply_migration`, `get_advisors`, `get_logs` documentado en CLAUDE.md como tools disponibles.
- Formato de commits consistente con convenciones + Co-Authored-By de Claude Opus 4.7 en fixes/features grandes.
- Skills framework custom en `C:/dev/.claude/CLAUDE.md` (visto en contexto del repo) â€” visual-first workflow, HTML companions obligatorios, user flow diagrams en cada spec.

---

## 5. Fortalezas inferidas â€” claims defendibles para el CV

### Strategy / product thinking
**Defendible con evidencia directa:**
- **Product documentation completa**: `enregla/docs/product/{PRODUCT,ROADMAP,BACKLOG}.md`. Roadmap segmentado en Phases 1â€“4. BACKLOG con RICE scoring.
- **Go-to-market concreto**: spec GTM de 12 meses con meta de 200 clientes, presupuesto cuantificado, canales multi-pilar, targeting explÃ­cito (PYME "Don Huevas" con 2-3 locales, **NO enterprise**).
- **DiseÃ±o de producto multi-persona**: en `CLAUDE.md` define 3 audiencias (gerente medium, consultor legal, dueÃ±o PYME) con contexto de uso y tono emocional objetivo ("Confianza y control").
- **IteraciÃ³n por score**: 5 rondas recursivas con mÃ©tricas (78.4 â†’ 95.6) â€” discipline de evaluaciÃ³n, no vibes.

**Claim honesto:** *"Product strategy completo â€” vision, roadmap phased, backlog priorizado (RICE), GTM cuantificado, multi-persona design."*

**NO defendible (por solo 1 repo):** "liderazgo de producto en equipos de N+ personas", "roadmapping cross-company", "OKR alignment en equipos distribuidos".

### Design
**Defendible:**
- **Design system completo desde cero**: migraciÃ³n a Atlassian DS con paleta Banco Pichincha (`#0f265c` + `#ff7043`), escalas 50-900, semantic tokens, 31 componentes UI custom.
- **Showcases interactivos** (HTML standalone de 145KB): `design-system-complete.html`, `atlassian-ds-showcase.html`. Demuestra capacidad de comunicar DS sin Figma.
- **Design tokens history**: 3 repos de 2022â€“2023 (Style Dictionary, Figma Tokens, Specify) â€” experiencia DS-Ops desde hace aÃ±os.
- **Mockups en cÃ³digo**: landing PYME, dos cards de dashboard con metÃ¡fora emocional ("ComplianceWeatherCard", "ComplianceInvoiceCard"), pÃ¡ginas visuales especÃ­ficas de campaÃ±as (ej. `policia-judicial.html` como material de capacitaciÃ³n).
- **A11y awareness**: iteraciones con "A11y deep dive", `focus-visible`, prop `interactive` en Card, centralizaciÃ³n de iconos Lucide.
- **Brand system thinking**: define 3 palabras de brand ("Preciso, Confiable, Protector"), emociÃ³n objetivo, paletas prohibidas ("AI genÃ©ricas: cyan-on-dark, neon").

**Claim honesto:** *"Design systems de punta a punta â€” tokens (Style Dictionary/Figma/Specify), componentes custom (shadcn-style), showcases interactivos, migraciones grandes (17 parts + 5 iteraciones recursivas hasta 95.6/100)."*

**NO defendible por pocos datos:** "design leadership", "design ops para >2 publicables en paralelo", "user research con n>10".

### Engineering
**Defendible:**
- **TypeScript moderno** (React 19, TS 6, Next 16) â€” usa versiones bleeding-edge con comodidad.
- **Full-stack**: frontend (React/Next), backend (Supabase, Prisma, NextAuth), DB (21 migraciones SQL con RLS dual-mode, funciones generadas, checks, pg_cron, storage policies), infra (Vercel, GitHub Actions CI).
- **Arquitectura pragmÃ¡tica**: separa features por carpeta, hooks custom, query client compartido con timeouts hard (10s), error banners, retry policies, Sentry placeholder.
- **Migraciones SQL reales**: no usa UI de Supabase, escribe SQL con checks, foreign keys, generated columns, triggers, RLS por tabla con demo-mode isolation.
- **CI funcional**: `.github/workflows/ci.yml` con lint + typecheck + build + test en cada PR.
- **Convention discipline**: conventional commits, CHANGELOG.md mantenido, CONTRIBUTING.md, CUSTOM-DOMAIN-SETUP.md, OAUTH-SETUP.md.
- **TDD parcial**: `PartnerScorecard` tiene test file; `queryClient` tiene test; network map tiene 3 tests.

**Claim honesto:** *"Full-stack TypeScript moderno â€” React/Next bleeding-edge, Supabase (Postgres + RLS + Edge Functions + Storage + Cron), CI/CD, migraciones SQL production-grade, deployments vivos."*

**NO defendible:** "backend distribuido a escala", "microservicios", "sistemas con >1M usuarios", "on-call / SLA real probado".

### Agents
**Defendible:**
- **Claude Code power-user** con flujos industrializados: skills framework, skills-lock reproducible, MCP servers (Supabase), subagent-driven development con despacho paralelo, iteraciÃ³n recursiva scoreada.
- **Prompt engineering por docs**: instrucciones de nivel producciÃ³n en `CLAUDE.md` (database management rules, RLS patterns, demo mode policy, tool-use guidance).
- **Agentic workflow design**: specs â†’ plans â†’ subagents â†’ reviews â†’ handoffs, todos en estructura consumible por LLMs.
- **MCP integration**: configurÃ³ Supabase MCP server remoto conectado a su proyecto, y lo usa para ejecutar SQL desde Claude con permisos reales.

**Claim honesto:** *"Agentic workflows en producciÃ³n diaria â€” Claude Code + MCP servers + skills reproducibles, orquestaciÃ³n de subagents para features multi-parte, docs consumibles por LLM como memoria externa."*

**NO defendible (por ausencia en cÃ³digo runtime):** "diseÃ±o de sistemas multi-agente en runtime", "RAG en producciÃ³n", "Anthropic SDK para producto", "evals de LLM con eval frameworks (promptfoo, Inspect, Braintrust)". **Es un gap real**.

---

## 6. Debilidades / "en curso" candidatos honestos

Cosas que NO aparecen o aparecen poco y que un Agentic Designer 2026 necesita tener (o seÃ±alar honestamente que estÃ¡ aprendiendo):

1. **Evals / observabilidad de LLM**: cero evidencia de testing sistemÃ¡tico de prompts, golden sets, regressions, o mÃ©tricas de calidad en LLM outputs. No hay `promptfoo`, `langfuse`, `braintrust`, `Inspect`, `openllmetry`. â†’ *CV: "en curso â€” aprendiendo evals con Inspect/promptfoo para publicables con LLM"*.
2. **LLM en runtime del producto**: no hay `anthropic` ni `openai` como dependencia en `package.json`. Su posicionamiento "agentic designer" se apoya en **workflow personal**, no en producto que use agentes. Este es el gap mÃ¡s sensible a cerrar. â†’ *CV: "siguiente hito â€” shipear una feature con LLM en producciÃ³n (ej. EnRegla assistant para permisos)"*.
3. **Observabilidad madura**: Sentry en env placeholder (no activado), sin Datadog/Honeycomb/Grafana/PostHog visibles. Logs solo en `console.*`. â†’ *CV: "en curso â€” Sentry + product analytics (PostHog)"*.
4. **Cobertura de tests**: su propio Ultra Review dice "2/8 failing, 71 console.logs, test coverage ~5%". 6 tests en ~17.5K LOC. â†’ *CV: ser honesto â€” "calidad via TDD parcial y code review riguroso; ampliando coverage en sprints de hardening"*.
5. **ColaboraciÃ³n en equipo**: su GitHub no muestra PRs de otros, issues abiertos por terceros, ni forks. Trabaja solo (o con Claude). Esto es un posicionamiento vÃ¡lido pero limita el claim de "tech lead". â†’ *CV: posicionar como "founder/solo-engineer con IA como multiplicador" en vez de "tech lead de equipo"*.
6. **Backend distribuido / sistemas a escala**: toda la infra es Vercel + Supabase + edge functions. No hay Kubernetes, Redis, queues, workers, ni caching avanzado. â†’ EstÃ¡ bien; no pretender lo contrario.
7. **Producto pÃºblico con tracciÃ³n medible**: EnRegla estÃ¡ en 1.0-MVP pero todavÃ­a sin clientes pagando (meta es 200 en 12 meses). No hay screenshot de MRR ni testimonios. â†’ *CV: timeline honesto "MVP en producciÃ³n, primeros pilotos Q2 2026"*.
8. **Casos histÃ³ricos previos a 2022**: el CV actual termina en 2022. Los repos de 2022 son ejercicios de tokens, no publicables. Si tuvo experiencia diseÃ±ando en empresas (es probable por la autodescripciÃ³n "10+ years experience" en life-update spec), no estÃ¡ en GitHub. â†’ *CV: pedirle a Danilo case studies pre-2022 en formato narrativo*.
9. **Portfolio visual tradicional**: no hay screenshots/videos en los READMEs. Todo se entiende leyendo cÃ³digo. Para un Agentic Designer vendiendo a clientes, faltan "shots" navegables. â†’ *CV/landing: generar un showcase visual*.
10. **Idiomas de comunicaciÃ³n**: docs en espaÃ±ol mezclado con inglÃ©s. Para audiencia LATAM estÃ¡ perfecto. Para clientes US/EU conviene explicitar bilingÃ¼ismo. â†’ *CV: listar ES (nativo) / EN (tÃ©cnico)*.

---

## 7. Case studies candidatos (5-7 mÃ¡s vendibles)

### 7.1 â­ EnRegla â€” SaaS de compliance con Claude Code como co-builder
- **Hook:** *"DiseÃ±Ã© y construÃ­ un SaaS de compliance multi-sede para PYMES en Ecuador â€” de 0 a 1.0-MVP en producciÃ³n en 40 dÃ­as, co-construido con Claude Code usando MCP servers y subagents paralelos."*
- **Lo interesante:** stack moderno completo, docs de producto + GTM + arquitectura, RLS dual-mode, network map interactivo, QR de verificaciÃ³n pÃºblica, edge function con cron, design system custom, CI/CD, subagents paralelos.
- **QuÃ© le falta para caso completo:** screenshots/video de la app, mÃ©tricas de tracciÃ³n (primeros pilotos), un "lessons learned" narrativo, antes/despuÃ©s visual, un Ã¡ngulo de "cost vs velocity" (cuÃ¡nto tiempo/costo vs un equipo tradicional).

### 7.2 â­ MigraciÃ³n Atlassian Design System â€” 17 partes + 5 iteraciones recursivas
- **Hook:** *"RediseÃ±Ã© el sistema de diseÃ±o de EnRegla usando Atlassian DS con identidad Banco Pichincha â€” 17 componentes migrados y 5 rondas de polish recursivo con scoring numÃ©rico (78.4 â†’ 95.6) en 2 dÃ­as."*
- **Lo interesante:** discipline de scoring cuantitativo, review docs por iteraciÃ³n, subagent-driven dispatch paralelo, `design-system-complete.html` de 145KB como deliverable navegable, tokens migration con backwards-compat aliases.
- **QuÃ© le falta:** antes/despuÃ©s visual (side-by-side), un video corto del workflow con subagents, publicar el showcase HTML en URL pÃºblica.

### 7.3 GTM Bootstrap para PYMES ecuatorianas â€” sistema Ã©tico de 12 meses
- **Hook:** *"DiseÃ±Ã© un sistema de adquisiciÃ³n de 200 clientes en 12 meses para una SaaS de compliance, con avatar IA (Higgsfield), jerga local, presupuesto $9-12K, y un principio explÃ­cito de no-spam."*
- **Lo interesante:** estrategia + producto + ejecuciÃ³n en un solo documento, targeting contraintuitivo (NO enterprise, sÃ­ "Don Huevas con 2-3 locales"), 5 pilares con pesos %, reframing Ã©tico ("Socios con evidencia" en vez de "Caballo de Troya").
- **QuÃ© le falta:** resultados reales (estÃ¡ en ejecuciÃ³n sem 1), deck visual del plan, un post-mortem a 3 meses.

### 7.4 Life Update â€” sistema de tracking personal 0â†’prod en 1 dÃ­a
- **Hook:** *"ConstruÃ­ un sistema de tracking de vida personal (Next.js 16 + NextAuth v5 + Prisma + Supabase) desde commit inicial hasta deploy en producciÃ³n en un dÃ­a â€” 20 commits, full auth, DB schema, daily entries API."*
- **Lo interesante:** prueba de velocidad del setup Claude Code + skills + MCP, hybrid data model (md files = source of truth + DB = execution engine), schema Prisma bien pensado (daily/weekly/monthly/projects/snapshots).
- **QuÃ© le falta:** el analytics/progress engine (mencionado en spec pero no implementado), un case study narrativo "1 dÃ­a de vida con Claude Code".

### 7.5 CRM interno de enablers con scorecard auto-calculado
- **Hook:** *"DiseÃ±Ã© y construÃ­ un pipeline de partners (contadoras, tramitadores, consultores) con scorecard de 8 dimensiones (ponderaciones 1-5) y auto-calificaciÃ³n (priority/good/nurture/ignore) en Postgres como generated column + React component TDD."*
- **Lo interesante:** modelo de datos declarativo (el score vive en el DB, no en el frontend), TDD real (hay test antes del componente â€” `PartnerScorecard.test.tsx`), 8 criterios pensados desde GTM spec.
- **QuÃ© le falta:** es un feature chico dentro de EnRegla, hay que vestirlo como mini-caso (3 pÃ¡rrafos, 1 screenshot).

### 7.6 DB Reliability Sprint â€” de "skeleton eterno" a app resiliente
- **Hook:** *"DiagnostiquÃ© un problema intermitente de UX ('la app se muere') en un SaaS con 10 pilotos proyectados, y lo resolvÃ­ en un sprint con root-cause anÃ¡lisis (~90% client-side, ~10% schema), migraciÃ³n a TanStack Query, hard timeouts, retry policies, y Sentry + CI validation gates."*
- **Lo interesante:** spec con problema/causas/no-goals explÃ­citos, diagrama before/after en cÃ³digo, el rigor de separar quÃ© sÃ­/quÃ© no entra en scope.
- **QuÃ© le falta:** mÃ©tricas de "despuÃ©s" (p99 latency, error rate), un tweet-sized versiÃ³n del caso.

### 7.7 CapacitaciÃ³n IA para PolicÃ­a Judicial del Ecuador (artefacto independiente)
- **Hook:** *"DiseÃ±Ã© un documento HTML interactivo (~260KB, standalone, sin build) para capacitar agentes de PolicÃ­a Judicial en uso responsable de IA â€” dolores, regulaciÃ³n, herramientas, plan de clase, prompts, casos ficticios."*
- **Lo interesante:** design system propio ("Orange IA" shader), contenido pedagÃ³gico serio sobre IA pÃºblica, material institucional en un artefacto entregable offline.
- **QuÃ© le falta:** contexto ("Â¿fue contratado? Â¿fue volunteer?"), permiso para usarlo pÃºblicamente, link a la versiÃ³n navegable.

---

## 8. SeÃ±ales de marca / voz

**Idioma:** bilingÃ¼e ES-EN con predominio ES en prosa y mix natural en cÃ³digo/commits. TerminologÃ­a tÃ©cnica en inglÃ©s ("feature", "spec", "hardening"), storytelling en espaÃ±ol ("Don Huevas con 2-3 locales", "este man perdiÃ³ plata").

**Tono:**
- **TÃ©cnico + cÃ¡lido.** No es frÃ­o ni corporativo. Usa emojis con moderaciÃ³n (â­âœ…âŒâš ï¸) en READMEs, pero no en commits.
- **Directo y sin-floritura.** Commits estilo "fix: corregir dominio de enregla.com a enregla.ec" â€” problema concreto, soluciÃ³n concreta.
- **Transparente sobre trade-offs.** En specs explicita "non-goals", "risks", "open questions". En Ultra Review se autocritica ("2/8 tests failing, 71 console.logs").
- **Producto-first.** Todo el discurso estÃ¡ centrado en el usuario final (el dueÃ±o de PYME que "no tiene gerente legal"). No hay "tech for tech's sake".
- **Discipline de naming.** Convenciones estrictas: `v1/v2` en carpetas durante migraciones, `feature/` branches, `docs/superpowers/{specs,plans,reviews}/YYYY-MM-DD-<topic>-<type>.md`.

**Naming patterns:**
- Archivos: kebab-case para docs, PascalCase para componentes React, camelCase para hooks.
- Nombres de empresa/alias: "Danilo", "Aura" (alias comercial), "HashUI" (alias viejo).
- Humor sutil: el readme del repo `dr-cv` dice simplemente "La vida entera de Danilo Rojas".

**SeÃ±ales de influencias/filosofÃ­a:**
- **Visual-first workflow** (regla global: "would the user understand this better by seeing it than reading it?").
- **HTML companions obligatorios** en specs (MD para agentes, HTML para humanos).
- **Recursive iteration con score numÃ©rico** (estilo design system review).
- **Skills reproducibles con lock file** (estilo package manager).
- **Referencias explÃ­citas a Claude Code** en READMEs â€” no oculta que trabaja con IA.

**Fraseo caracterÃ­stico (extracciÃ³n literal de su output):**
- *"Preciso, Confiable, Protector"* (3 palabras de brand de EnRegla).
- *"JerarquÃ­a Funcional sobre DecoraciÃ³n"* (design principle).
- *"Nunca emails/WhatsApp a personas sin consentimiento. Primer toque siempre consentido."* (principio Ã©tico GTM).
- *"MVP â†’ ProducciÃ³n en 40 dÃ­as con Claude Code"*.
- *"Agresivo sin cruzar lÃ­neas"* (valor).

**ImplicaciÃ³n para la landing de `dr-cv`:**
- EspaÃ±ol principal, inglÃ©s selectivo para tÃ©rminos tÃ©cnicos.
- Tono cÃ¡lido-tÃ©cnico. Frases cortas, verbos concretos.
- Usar contraste "antes 2022 UX/UI Designer â†’ ahora Agentic Designer con producto en producciÃ³n".
- Mostrar screenshots/HTML companions, no solo prosa.
- Incluir explÃ­citamente la filosofÃ­a: "construyo con agentes, no a pesar de ellos".

---

## 9. Preguntas abiertas para Danilo (mÃ¡x 10)

1. **Career pre-2022**: tu CV termina como "UX/UI Product Designer". Â¿DÃ³nde trabajaste antes de 2022? Â¿Empresas, roles, duraciÃ³n, proyectos narrables? Los 3 repos de tokens de 2022 son ejercicios â€” Â¿eran para un trabajo, un estudio, o pets?
2. **EnRegla realidad comercial**: el README dice "1.0-MVP en producciÃ³n" y el GTM apunta a 200 clientes en 12 meses. Â¿Ya hay clientes pagando? Â¿Pilotos activos? Â¿Primer revenue? â€” esto determina si el case es "en lanzamiento" vs "con tracciÃ³n".
3. **Aura (alias comercial)**: Â¿es un estudio con otros o un alias solo tuyo? En la landing aparece como brand, pero no hay otros GitHubs asociados.
4. **PolicÃ­a Judicial del Ecuador HTML**: Â¿fue contratado? Â¿para quÃ© instituciÃ³n especÃ­ficamente? Â¿tienes permiso de usarlo pÃºblicamente como caso?
5. **`te-platform` / TE Portfolio**: aparece en `life-update/prisma/schema.prisma` como proyecto activo. Â¿QuÃ© es? Â¿CuÃ¡l es la tesis?
6. **Figma â†’ Backstage (`figma-backstage[2]`)**: Â¿por quÃ© 2 repos vacÃ­os del mismo tema en Nov 2025? Â¿Es un proyecto con cliente, un experimento, o algo que quieres reintentar?
7. **Experiencia con LLMs en runtime**: Â¿has construido **algo** con Anthropic SDK o OpenAI SDK que no estÃ© en GitHub pÃºblico? Â¿Clients workshop, POCs privados, repos privados?
8. **Equipo y colaboraciÃ³n**: Â¿has hecho trabajo con equipos humanos (no Claude) en los Ãºltimos 3 aÃ±os? Code reviews, mentorship, sprints compartidos. Esto abre/cierra ciertos claims.
9. **Posicionamiento "Agentic Designer"**: Â¿estÃ¡s cÃ³modo posicionando el diferencial como "workflow agentic" (lo que ya haces y estÃ¡ probado) o quieres tambiÃ©n reclamar "publicables con agentes en runtime" (requiere shipear algo nuevo primero)?
10. **Audiencia del CV**: Â¿el CV es para conseguir clientes freelance/contract (LATAM y US), para un puesto in-house, o para inversores de una SaaS futura? El tono cambia significativamente.

---

## ApÃ©ndice A â€” Timeline de actividad GitHub (de mÃ¡s reciente a mÃ¡s viejo)

| Periodo | Actividad |
|---------|-----------|
| 2026-05-07 (hoy) | `dr-cv` creado; `enregla` merge `feature/database-audit` (DB production-ready + null-safety) |
| 2026-05-05 â†’ 2026-05-07 | **Sprint GTM + CRM interno + DB audit**: landing PYME, tablas leads/partners, scorecard, DB reliability sprint, atlassian-ds-migration merge |
| 2026-05-04 â†’ 2026-05-05 | **Atlassian DS Migration** (17 partes + 5 iteraciones, 95.6/100 final); `life-update` 0â†’prod en 1 dÃ­a |
| 2026-04-22 â†’ 2026-04-28 | Email notifications edge function + CRM start |
| 2026-04-14 â†’ 2026-04-20 | **EnRegla 1.0-MVP shipping**: shadcn migration, onboarding incremental, document upload, public links, network map v2/v3 |
| 2026-04-08 | EnRegla repo creado |
| 2025-12-05 | `te-platform` reservado (vacÃ­o) |
| 2025-11-17 | `figma-backstage[2]` reservados (vacÃ­os) |
| 2023-08-08 | Ãšltimo push a `figmatokendemo` |
| 2023-05-01 | `mkdocs-material` creado (1 commit) |
| 2022-08-21 â†’ 2022-12-19 | Ã‰poca de experimentos de design tokens (`figmatokendemo`, `TokenStyles`, `demotoken`, `tokensdemo`) |
| 2022-08-21 | Cuenta GitHub creada |

**Gap evidente en GitHub pÃºblico:** 2023-08 â†’ 2025-11 (â‰ˆ27 meses sin actividad visible). El trabajo de este periodo estÃ¡ en repos privados, clientes, o fuera de git â€” hay que preguntarle a Danilo.

---

## ApÃ©ndice B â€” MÃ©tricas cuantitativas (verificables)

| MÃ©trica | Valor |
|---------|-------|
| Total repos pÃºblicos | 12 |
| Repos con contenido real | 7 (5 son placeholders vacÃ­os) |
| Repos con push en 2026 | 4 (`enregla`, `dr-cv`, `va`, `life-update`) |
| Commits en `enregla` (shallow ~30 dÃ­as) | ~346 |
| Commits en `life-update` | 20 |
| LOC en `enregla` (segÃºn Ultra Review propio) | ~17,544 |
| Migraciones SQL en `enregla` | 21 |
| Componentes UI custom en `enregla` | 31 |
| Hooks custom en `enregla` | 10 |
| Feature modules en `enregla` | 14 |
| Specs en `enregla/docs/superpowers/specs/` | 16 |
| Plans en `enregla/docs/superpowers/plans/` | 20 |
| Reviews por iteraciÃ³n | 4 |
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

**Fin del audit.** Este documento debe ser suficiente para llenar un skills map estructurado, un CV bilingÃ¼e reposicionado como Agentic Designer, y 5-7 case studies en el portfolio. Las 10 preguntas abiertas son el bloqueo para avanzar a Fase 2.
