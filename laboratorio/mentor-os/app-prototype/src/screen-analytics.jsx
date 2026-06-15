/* MentorOS — Analytics. How learning is actually going: trajectory, effort,
 * where time goes, and what's sticking. Forecasts are labelled as forecasts. */
const { useState: useStateA2 } = React;

function Analytics({ navigate }) {
  const d = window.DATA;
  const { analytics: A, learner: L } = d;
  const [range, setRange] = useStateA2("12w");

  const labels12 = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10", "W11", "W12"];
  const actual = [...A.masteryTrend.actual, null, null, null];           // weeks 1–9
  const forecast = [null, null, null, null, null, null, null, null, ...A.masteryTrend.forecast]; // 9–12

  return (
    <div className="page anim-fade-in">
      <div className="page-head">
        <div>
          <div className="eyebrow" style={{ marginBottom: 8 }}>Insights · since {L.goalStarted}</div>
          <h1 className="page-title">Analytics</h1>
          <p className="page-desc">Your learning, measured. The model separates what you've proven from what it's projecting forward.</p>
        </div>
        <div style={{ display: "flex", gap: "var(--s-2)", flex: "none" }}>
          <Segmented options={[{ id: "4w", label: "4w" }, { id: "12w", label: "12w" }, { id: "all", label: "All" }]} value={range} onChange={setRange} />
          <Button variant="secondary" size="sm" icon={I.download}>Export</Button>
        </div>
      </div>

      {/* KPI strip */}
      <div className="grid" style={{ gridTemplateColumns: "repeat(4, 1fr)", marginBottom: "var(--s-5)" }}>
        <div className="card" style={{ padding: "var(--s-4) var(--s-5)" }}><Stat label="Skill mastery" value={L.masteryScore} delta={L.masteryDelta} sub="directional · 0–100" /></div>
        <div className="card" style={{ padding: "var(--s-4) var(--s-5)" }}><Stat label="Completion rate" value={`${A.completion}%`} delta={A.completionDelta} deltaSuffix="%" sub="modules started → finished" /></div>
        <div className="card" style={{ padding: "var(--s-4) var(--s-5)" }}><Stat label="Hours invested" value={`${L.hoursTotal}h`} sub={`${L.weeklyDoneHrs}h this week`} /></div>
        <div className="card" style={{ padding: "var(--s-4) var(--s-5)" }}><Stat label="30-day retention" value={`${A.retention.values[A.retention.values.length - 1]}%`} delta={-3} deltaSuffix="%" invert sub="recall on spaced checks" /></div>
      </div>

      {/* Mastery trajectory */}
      <Card style={{ marginBottom: "var(--s-5)" }}>
        <CardHead title="Mastery trajectory" sub="Solid is measured. Dashed is the model's forecast to your goal." icon={I.trending}
          action={<div style={{ display: "flex", gap: "var(--s-4)", alignItems: "center" }}>
            <Legend color="var(--viz-1)" label="Measured" />
            <Legend color="var(--viz-2)" label="Forecast" dashed />
          </div>} />
        <div style={{ padding: "var(--s-5)" }}>
          <AreaChart height={260} yMax={100} yFmt={(v) => v} labels={labels12}
            series={[{ data: actual, color: "var(--viz-1)" }, { data: forecast, color: "var(--viz-2)", dashed: true, dots: true }]} />
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: "var(--s-3)", padding: "var(--s-3)", background: "var(--surface-subtle)", borderRadius: "var(--r-md)", fontSize: "var(--fs-sm)", color: "var(--text-secondary)" }}>
            <I.info size={14} /> At your current pace the model projects <strong style={{ color: "var(--text-primary)", fontWeight: "var(--fw-medium)" }}>86 by week 12</strong> — clearing the threshold for production-readiness.
            <span style={{ marginLeft: "auto" }}><Confidence level="medium" /></span>
          </div>
        </div>
      </Card>

      {/* Effort + time split */}
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.4fr) minmax(0,1fr)", gap: "var(--s-5)", marginBottom: "var(--s-5)" }}>
        <Card>
          <CardHead title="Weekly effort" sub="Hours per week against your 6h target" icon={I.clock} />
          <div style={{ padding: "var(--s-5) var(--s-5) var(--s-4)" }}>
            <BarChart data={A.hoursByWeek} height={200} color="var(--viz-1)" yFmt={(v) => v + "h"} highlightMax />
          </div>
        </Card>
        <Card>
          <CardHead title="Where time goes" sub="By skill, last 12 weeks" icon={I.gauge} />
          <div style={{ padding: "var(--s-5)", display: "flex", alignItems: "center", gap: "var(--s-6)" }}>
            <Donut data={A.timeBySkill} size={132} thickness={20} center={<div style={{ textAlign: "center" }}><div style={{ fontSize: "var(--fs-xl)", fontWeight: "var(--fw-bold)", fontVariantNumeric: "tabular-nums" }}>{A.timeBySkill.reduce((s, x) => s + x.value, 0).toFixed(0)}h</div><div style={{ fontSize: "var(--fs-xs)", color: "var(--text-muted)" }}>tracked</div></div>} />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
              {A.timeBySkill.map((t) => (
                <div key={t.label} style={{ display: "flex", alignItems: "center", gap: "var(--s-3)" }}>
                  <span style={{ width: 9, height: 9, borderRadius: 2, background: t.color, flex: "none" }} />
                  <span style={{ flex: 1, fontSize: "var(--fs-base)", color: "var(--text-secondary)" }}>{t.label}</span>
                  <span style={{ fontSize: "var(--fs-base)", fontWeight: "var(--fw-medium)", fontVariantNumeric: "tabular-nums" }}>{t.value}h</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Strengths / weaknesses */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--s-5)", marginBottom: "var(--s-5)" }}>
        <Card>
          <CardHead title="Strongest skills" sub="Mastery evidence is solid here" icon={I.award} />
          <div style={{ padding: "var(--s-5)" }}><RankBars data={A.strongest} color="var(--m-mastered)" fmt={(v) => v} /></div>
        </Card>
        <Card>
          <CardHead title="Needs attention" sub="Lowest-scoring skills on your path" icon={I.target}
            action={<Button variant="ghost" size="sm" iconRight={I.arrowRight} onClick={() => navigate("graph")}>Skill graph</Button>} />
          <div style={{ padding: "var(--s-5)" }}><RankBars data={A.weakest} fmt={(v) => v} /></div>
        </Card>
      </div>

      {/* Retention */}
      <Card>
        <CardHead title="Knowledge retention" sub="How well recall holds up on spaced checks after first learning" icon={I.brain} />
        <div style={{ padding: "var(--s-5)" }}>
          <AreaChart height={200} yMax={100} yFmt={(v) => v + "%"} labels={A.retention.labels} series={[{ data: A.retention.values, color: "var(--viz-4)", dots: true }]} />
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: "var(--s-3)", fontSize: "var(--fs-sm)", color: "var(--text-secondary)" }}>
            <I.info size={14} /> Retention plateaus at 76% by day 30 — the mentor schedules spaced reviews to lift this. Concepts you've shipped in a project retain ~14% better.
          </div>
        </div>
      </Card>
    </div>
  );
}

function Legend({ color, label, dashed }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "var(--fs-sm)", color: "var(--text-secondary)" }}>
      <svg width="20" height="8"><line x1="0" y1="4" x2="20" y2="4" stroke={color} strokeWidth="2.5" strokeDasharray={dashed ? "4 3" : "none"} strokeLinecap="round" /></svg>{label}
    </span>
  );
}

Object.assign(window, { Analytics });
