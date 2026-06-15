/* MentorOS — Dashboard. A decision surface: what to do next, why, and how it's going. */
function Dashboard({ navigate, openProcess }) {
  const d = window.DATA;
  const { learner: L, analytics: A, path, projects, checkpoints, skills } = d;
  const activeModule = path.find((m) => m.status === "active");
  const activeLesson = activeModule.modules.find((m) => m.status === "active");
  const weakSkills = skills.filter((s) => s.weak).sort((a, b) => a.score - b.score).slice(0, 3);
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="page anim-fade-in">
      {/* Header */}
      <div className="page-head">
        <div>
          <div className="eyebrow" style={{ marginBottom: 8 }}>{learnerDate()} · Day 89 of your path</div>
          <h1 className="page-title">{greeting}, {L.name.split(" ")[0]}.</h1>
          <p className="page-desc">The one move worth making next, and where you stand against your objective — <strong style={{ color: "var(--text-primary)", fontWeight: "var(--fw-medium)" }}>{L.objective.toLowerCase()}</strong>.</p>
        </div>
        <div style={{ display: "flex", gap: "var(--s-2)", flex: "none" }}>
          <Button variant="secondary" size="sm" icon={I.diagnostic} onClick={() => navigate("diagnostic")}>Diagnostic</Button>
          <Button variant="primary" size="sm" iconRight={I.arrowRight} onClick={() => navigate("journey")}>Resume learning</Button>
        </div>
      </div>

      {/* North star — the objective everything optimizes toward */}
      <NorthStar navigate={navigate} />

      {/* KPI strip */}
      <div className="grid" style={{ gridTemplateColumns: "repeat(4, 1fr)", marginBottom: "var(--s-5)" }}>
        <KpiTile>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <Stat label="Market value" value={usdDash(L.incomeCurrent)} delta={Math.round(L.marketDelta30d / 1000)} deltaSuffix="k" sub="est. comp · last 30 days" />
            <Ring value={Math.round(((L.incomeCurrent - L.incomeBaseline) / (L.incomeGoal - L.incomeBaseline)) * 100)} size={52} stroke={5} />
          </div>
        </KpiTile>
        <KpiTile>
          <Stat label="This week" value={`${L.weeklyDoneHrs}h`} sub={`of ${L.weeklyTargetHrs}h target`} />
          <div style={{ marginTop: 12 }}><Progress value={L.weeklyDoneHrs} max={L.weeklyTargetHrs} /></div>
        </KpiTile>
        <KpiTile>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <Stat label="Learning streak" value={`${L.streak} days`} sub={`best ${L.streakBest}`} />
            <span style={{ color: "var(--warning)" }}><I.flame size={22} /></span>
          </div>
          <div style={{ display: "flex", gap: 3, marginTop: 12 }}>
            {Array.from({ length: 14 }).map((_, i) => (
              <span key={i} style={{ flex: 1, height: 6, borderRadius: 2, background: i < 12 ? "var(--warning)" : "var(--surface-subtle)", opacity: i < 12 ? 0.4 + (i / 14) * 0.6 : 1 }} />
            ))}
          </div>
        </KpiTile>
        <KpiTile>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <Stat label="Time invested" value={`${L.hoursTotal}h`} sub="since 14 Mar" />
            <Sparkline data={A.hoursByWeek.map((h) => h.value)} w={70} h={34} />
          </div>
        </KpiTile>
      </div>

      {/* Two-column body */}
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.55fr) minmax(0,1fr)", gap: "var(--s-5)", alignItems: "start" }}>
        {/* MAIN */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-5)" }}>
          {/* Recommended next action — the decision */}
          <div className="card ai-surface anim-fade-up" style={{ padding: "var(--s-5)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--s-2)", marginBottom: "var(--s-3)" }}>
              <span className="ai-tag"><I.target /> Next best action</span>
              <Badge mono tone="accent" style={{ marginLeft: "auto" }}>+$9.6k to goal</Badge>
              <Badge mono tone="primary">1 of 1</Badge>
            </div>
            <h2 style={{ margin: "0 0 6px", fontSize: "var(--fs-xl)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--tracking-tight)" }}>
              Run the query-expansion exercise, then resubmit the docs assistant.
            </h2>
            <p style={{ margin: "0 0 var(--s-4)", color: "var(--text-secondary)", fontSize: "var(--fs-base)", lineHeight: "var(--lh-normal)", maxWidth: "62ch" }}>
              It directly fixes the 4 retrieval misses your last review flagged, and clears the gate blocking your retrieval checkpoint. Roughly 1 hour.
            </p>
            <div style={{ display: "flex", gap: "var(--s-3)", flexWrap: "wrap", alignItems: "center" }}>
              <Button variant="primary" iconRight={I.arrowRight} onClick={() => navigate("journey")}>Start the exercise</Button>
              <Button variant="ghost" size="sm" onClick={() => navigate("mentor")}>Ask the mentor why</Button>
              <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 14 }}>
                <Confidence level="high" />
              </span>
            </div>
            <div style={{ marginTop: "var(--s-4)", paddingTop: "var(--s-3)", borderTop: "1px solid var(--border-subtle)", display: "flex", gap: 7, alignItems: "flex-start" }}>
              <span style={{ color: "var(--text-muted)", flex: "none", marginTop: 1 }}><I.info size={14} /></span>
              <span style={{ fontSize: "var(--fs-sm)", color: "var(--text-secondary)" }}>
                <strong style={{ color: "var(--text-primary)", fontWeight: "var(--fw-medium)" }}>Recommended because</strong> retrieval is your lowest-confidence skill and gates four downstream modules worth <strong style={{ color: "var(--text-primary)", fontWeight: "var(--fw-medium)" }}>$37k</strong> in market value. You can <a href="#" onClick={(e) => { e.preventDefault(); navigate("journey"); }} style={{ color: "var(--primary-soft-text)" }}>override the path</a> anytime.
              </span>
            </div>
          </div>

          {/* Active path */}
          <Card>
            <CardHead title="Active learning path" sub={`${L.pathName} · ${L.pathProgress}% complete`} icon={I.journey}
              action={<Button variant="ghost" size="sm" iconRight={I.arrowRight} onClick={() => navigate("journey")}>Open</Button>} />
            <div style={{ padding: "var(--s-5)" }}>
              <div style={{ display: "flex", gap: "var(--s-2)", marginBottom: "var(--s-4)" }}>
                {path.map((m) => (
                  <Tooltip key={m.id} content={`${m.title} — ${m.status}`}>
                    <div style={{ flex: 1, height: 7, borderRadius: 3, background: m.status === "complete" ? "var(--success)" : m.status === "active" ? "var(--primary)" : "var(--surface-subtle)", border: m.status === "active" ? "none" : "none" }} />
                  </Tooltip>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--s-4)", padding: "var(--s-3)", background: "var(--surface-subtle)", borderRadius: "var(--r-md)" }}>
                <span style={{ width: 36, height: 36, borderRadius: "var(--r-md)", background: "var(--primary-soft)", color: "var(--primary-soft-text)", display: "grid", placeItems: "center", flex: "none" }}><I.code size={18} /></span>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontSize: "var(--fs-xs)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: ".06em", color: "var(--text-muted)" }}>In progress · {activeModule.title}</div>
                  <div style={{ fontSize: "var(--fs-base)", fontWeight: "var(--fw-semibold)", marginTop: 2 }}>{activeLesson.title}</div>
                  <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ flex: 1, maxWidth: 200 }}><Progress value={activeLesson.progress} /></div>
                    <span style={{ fontSize: "var(--fs-sm)", color: "var(--text-secondary)" }}>{activeLesson.progress}% · {activeLesson.time} left</span>
                  </div>
                </div>
                <Button variant="primary" size="sm" onClick={() => navigate("journey")}>Continue</Button>
              </div>
            </div>
          </Card>

          {/* Active projects */}
          <Card>
            <CardHead title="Active projects" sub="Mastery is proven by projects, not completion" icon={I.projects}
              action={<Button variant="ghost" size="sm" iconRight={I.arrowRight} onClick={() => navigate("projects")}>All projects</Button>} />
            <div>
              {projects.map((p, i) => {
                const total = p.rubric.reduce((s, r) => s + r.score, 0);
                return (
                  <button key={p.id} onClick={() => navigate("projects")} style={{ all: "unset", cursor: "pointer", display: "flex", alignItems: "center", gap: "var(--s-4)", padding: "var(--s-4) var(--s-5)", borderTop: i ? "1px solid var(--border-subtle)" : "none", width: "100%", boxSizing: "border-box" }}>
                    <span style={{ width: 34, height: 34, borderRadius: "var(--r-md)", background: "var(--surface-subtle)", display: "grid", placeItems: "center", flex: "none", color: "var(--text-secondary)" }}><I.file size={17} /></span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: "var(--fw-medium)", fontSize: "var(--fs-base)" }}>{p.title}</div>
                      <div style={{ fontSize: "var(--fs-sm)", color: "var(--text-muted)" }}>Submitted {p.submitted} · {skillName(p.skill)}</div>
                    </div>
                    {p.status === "in-review"
                      ? <Badge tone="info" dot>{total}/100 · review ready</Badge>
                      : <Badge tone="success" dot>Passed · {total}/100</Badge>}
                    <span style={{ color: "var(--text-muted)" }}><I.chevronRight size={16} /></span>
                  </button>
                );
              })}
            </div>
          </Card>
        </div>

        {/* RAIL */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-5)" }}>
          {/* Completion forecast */}
          <Card pad>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "var(--s-4)" }}>
              <div>
                <div className="eyebrow" style={{ marginBottom: 6 }}>Completion forecast</div>
                <div style={{ fontSize: "var(--fs-lg)", fontWeight: "var(--fw-bold)" }}>30 Aug 2026</div>
                <div style={{ fontSize: "var(--fs-sm)", color: "var(--success)", marginTop: 2, display: "flex", alignItems: "center", gap: 5 }}><I.checkCircle size={14} />On track</div>
              </div>
              <Ring value={L.pathProgress} size={64} stroke={6} label={`${L.pathProgress}%`} sub="path" />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "var(--s-3)", background: "var(--surface-subtle)", borderRadius: "var(--r-md)", fontSize: "var(--fs-sm)", color: "var(--text-secondary)" }}>
              <I.info size={14} /> ~7 weeks left at your current pace of {L.weeklyDoneHrs}h/week.
              <span style={{ marginLeft: "auto" }}><Confidence level="medium" showLabel={false} /></span>
            </div>
          </Card>

          {/* Weak areas */}
          <Card>
            <CardHead title="Highest-value gaps" sub="Skills you haven't proven — ranked by money left on the table" icon={I.coins} />
            <div style={{ padding: "var(--s-4) var(--s-5)", display: "flex", flexDirection: "column", gap: "var(--s-4)" }}>
              {weakSkills.map((s) => {
                const upside = window.DATA.skillUpside(s);
                return (
                  <div key={s.id} style={{ display: "flex", alignItems: "center", gap: "var(--s-3)" }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                        <span style={{ fontSize: "var(--fs-base)", fontWeight: "var(--fw-medium)" }}>{s.name}</span>
                        <span style={{ fontSize: "var(--fs-sm)", color: "var(--accent-soft-text)", fontFamily: "var(--font-mono)", fontWeight: "var(--fw-semibold)" }}>+{usdKDash(upside)}</span>
                      </div>
                      <Progress value={s.score} color={s.score < 25 ? "var(--m-gap)" : "var(--m-developing)"} />
                    </div>
                  </div>
                );
              })}
              <Button variant="secondary" size="sm" iconRight={I.arrowRight} onClick={() => navigate("diagnostic")} style={{ marginTop: 2 }}>Open diagnostic</Button>
            </div>
          </Card>

          {/* Upcoming checkpoints */}
          <Card>
            <CardHead title="Upcoming checkpoints" icon={I.calendar} />
            <div>
              {checkpoints.map((c, i) => (
                <div key={c.id} style={{ display: "flex", alignItems: "center", gap: "var(--s-3)", padding: "var(--s-3) var(--s-5)", borderTop: i ? "1px solid var(--border-subtle)" : "none" }}>
                  <span style={{ width: 30, height: 30, borderRadius: "var(--r-md)", display: "grid", placeItems: "center", flex: "none", background: c.state === "action" ? "var(--accent-soft)" : "var(--surface-subtle)", color: c.state === "action" ? "var(--accent-soft-text)" : "var(--text-secondary)" }}>
                    {c.type === "assessment" ? <I.target size={15} /> : c.type === "project" ? <I.file size={15} /> : <I.mentor size={15} />}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "var(--fs-base)", fontWeight: "var(--fw-medium)" }}>{c.title}</div>
                    <div style={{ fontSize: "var(--fs-sm)", color: "var(--text-muted)" }}>{c.module}</div>
                  </div>
                  <div style={{ textAlign: "right", flex: "none" }}>
                    {c.state === "action" && <Badge tone="accent" style={{ marginBottom: 4 }}>Action</Badge>}
                    <div style={{ fontSize: "var(--fs-sm)", color: "var(--text-secondary)", fontVariantNumeric: "tabular-nums" }}>{c.due}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Mentor insight */}
          <AIInsight title="Mentor insight" confidence="medium" why="your hours dipped to 4h last week — below your 6h target." onAction={() => navigate("mentor")} action="Talk to your mentor">
            You learn retrieval best in the morning — your last 3 morning sessions scored 18% higher on exercises than evening ones. Want me to nudge your next checkpoint earlier in the day?
          </AIInsight>
        </div>
      </div>
    </div>
  );
}

function KpiTile({ children }) {
  return <div className="card" style={{ padding: "var(--s-4) var(--s-5)" }}>{children}</div>;
}

function usdDash(n) { return "$" + Math.round(n).toLocaleString("en-US"); }
function usdKDash(n) { return "$" + Math.round(n / 1000) + "k"; }

/* North-star band: the income objective, a baseline→now→goal meter, and the
 * next moves priced in dollars. */
function NorthStar({ navigate }) {
  const { learner: L, skills, skillUpside } = window.DATA;
  const span = L.incomeGoal - L.incomeBaseline;
  const curPct = Math.max(0, Math.min(100, ((L.incomeCurrent - L.incomeBaseline) / span) * 100));
  const next = ["rag", "eval"].map((id) => skills.find((s) => s.id === id));
  const lockedAbove = ["agents", "observability", "deploy"].reduce((a, id) => a + skillUpside(skills.find((s) => s.id === id)), 0);

  return (
    <div className="card anim-fade-up" style={{ padding: "var(--s-5) var(--s-6)", marginBottom: "var(--s-5)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,0.85fr) minmax(0,1.4fr)", gap: "var(--s-8)", alignItems: "center" }}>
        {/* Objective */}
        <div>
          <div className="eyebrow" style={{ marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}><I.target size={13} /> Objective</div>
          <div style={{ fontSize: "var(--fs-4xl)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--tracking-tight)", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
            {usdDash(L.incomeGoal)}<span style={{ fontSize: "var(--fs-lg)", color: "var(--text-muted)", fontWeight: "var(--fw-medium)", letterSpacing: 0 }}> / year</span>
          </div>
          <p style={{ margin: "var(--s-3) 0 0", fontSize: "var(--fs-base)", color: "var(--text-secondary)", lineHeight: "var(--lh-normal)", maxWidth: "40ch" }}>
            Earned as a <strong style={{ color: "var(--text-primary)", fontWeight: "var(--fw-medium)" }}>{L.targetRole}</strong> who can {L.goalTitle.toLowerCase()}. Every skill you prove raises your market value toward this number.
          </p>
        </div>

        {/* Value meter */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 10 }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 4 }}>Market value now</div>
              <div style={{ fontSize: "var(--fs-2xl)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--tracking-tight)", fontVariantNumeric: "tabular-nums", display: "flex", alignItems: "baseline", gap: "var(--s-2)" }}>
                {usdDash(L.incomeCurrent)}<Delta value={Math.round(L.marketDelta30d / 1000)} suffix="k" />
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div className="eyebrow" style={{ marginBottom: 4 }}>Gap to goal</div>
              <div style={{ fontSize: "var(--fs-2xl)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--tracking-tight)", fontVariantNumeric: "tabular-nums", color: "var(--accent-soft-text)" }}>{usdDash(L.incomeGoal - L.incomeCurrent)}</div>
            </div>
          </div>
          {/* track */}
          <div style={{ position: "relative", height: 12, borderRadius: "var(--r-full)", background: "var(--surface-subtle)", border: "1px solid var(--border)", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, width: `${curPct}%`, background: "var(--primary)", borderRadius: "var(--r-full)" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 7, fontSize: "var(--fs-xs)", fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
            <span>Baseline {usdKDash(L.incomeBaseline)}</span>
            <span>{L.marketSource}</span>
            <span>Goal {usdKDash(L.incomeGoal)}</span>
          </div>
        </div>
      </div>

      {/* Next moves, priced */}
      <div style={{ marginTop: "var(--s-5)", paddingTop: "var(--s-4)", borderTop: "1px solid var(--border-subtle)", display: "flex", alignItems: "center", gap: "var(--s-3)", flexWrap: "wrap" }}>
        <span className="eyebrow" style={{ flex: "none" }}>Closes the gap next</span>
        {next.map((s) => (
          <span key={s.id} style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 10px", border: "1px solid var(--border)", borderRadius: "var(--r-full)", fontSize: "var(--fs-sm)" }}>
            <span style={{ fontWeight: "var(--fw-medium)" }}>{s.name}</span>
            <span style={{ fontFamily: "var(--font-mono)", color: "var(--accent-soft-text)", fontWeight: "var(--fw-semibold)" }}>+{usdKDash(skillUpside(s))}</span>
          </span>
        ))}
        <span style={{ fontSize: "var(--fs-sm)", color: "var(--text-muted)" }}>then unlocks <strong style={{ color: "var(--text-secondary)", fontWeight: "var(--fw-medium)" }}>{usdKDash(lockedAbove)}</strong> in production skills above them</span>
        <Button variant="ghost" size="sm" iconRight={I.arrowRight} onClick={() => navigate("diagnostic")} style={{ marginLeft: "auto" }}>Open diagnostic</Button>
      </div>
    </div>
  );
}
function skillName(id) { return (window.DATA.skills.find((s) => s.id === id) || {}).name || id; }
function learnerDate() {
  return new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
}

Object.assign(window, { Dashboard });
