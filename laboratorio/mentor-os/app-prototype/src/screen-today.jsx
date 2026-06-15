/* MentorOS — Today. The daily home: check-in, AI insight of the day, today's
 * missions, dimension status, and a coach nudge. Migrated from the mobile "Hoy"
 * + "Historial" tabs, reframed around the $250k objective. */
const { useState: useStateT, useEffect: useEffectT, useMemo: useMemoT } = React;

const DIM_STATUS = {
  ahead:      { tone: "success",  label: "Ahead" },
  "on-track": { tone: "info",     label: "On track" },
  behind:     { tone: "warning",  label: "Behind" },
  critical:   { tone: "danger",   label: "Critical" },
  stale:      { tone: "neutral",  label: "Stale" },
};

function fmtDate(iso) {
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("en-US", { weekday: "short", day: "2-digit", month: "short" });
}

/* ───────────────── Daily check-in ───────────────── */
function ScaleRow({ metric, value, onChange }) {
  const Ic = I[metric.icon] || I.circle;
  return (
    <div style={{ padding: "var(--s-3) 0", borderBottom: "1px solid var(--border-subtle)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--s-3)", marginBottom: 8 }}>
        <span style={{ color: "var(--text-muted)", flex: "none" }}><Ic size={16} /></span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: "var(--fs-base)", fontWeight: "var(--fw-medium)" }}>{metric.label}</div>
          <div style={{ fontSize: "var(--fs-sm)", color: "var(--text-muted)", lineHeight: 1.4 }}>{metric.help}</div>
        </div>
        <span className="mono" style={{ fontSize: "var(--fs-lg)", fontWeight: "var(--fw-bold)", minWidth: 42, textAlign: "right", color: "var(--primary)" }}>
          {metric.kind === "hours" ? value.toFixed(1) + "h" : value}
        </span>
      </div>
      <input type="range" min={metric.min} max={metric.max} step={metric.step || 1} value={value}
        onChange={(e) => onChange(+e.target.value)}
        style={{ width: "100%", accentColor: "var(--primary)" }} aria-label={metric.label} />
    </div>
  );
}

function CheckinForm({ value, onSave }) {
  const M = window.TRACK;
  const [form, setForm] = useStateT(value || { deepWork: 2.5, energy: 7, focus: 7, shipped: false, outreach: false, note: "" });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  return (
    <Card>
      <CardHead title="Daily check-in" sub="Two minutes. Logs the behaviour that builds the number." icon={I.edit} />
      <div style={{ padding: "var(--s-2) var(--s-5) var(--s-4)" }}>
        {M.CHECKIN_METRICS.map((m) => (
          <ScaleRow key={m.id} metric={m} value={form[m.id]} onChange={(v) => set(m.id, v)} />
        ))}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--s-3)", padding: "var(--s-4) 0" }}>
          {M.CHECKIN_TOGGLES.map((t) => {
            const Ic = I[t.icon] || I.check; const on = form[t.id];
            return (
              <button key={t.id} onClick={() => set(t.id, !on)}
                style={{ all: "unset", cursor: "pointer", display: "flex", gap: 10, alignItems: "flex-start", padding: "var(--s-3)", borderRadius: "var(--r-md)", border: "1px solid " + (on ? "color-mix(in oklab, var(--primary) 40%, var(--border))" : "var(--border)"), background: on ? "var(--primary-soft)" : "var(--surface)" }}>
                <span style={{ color: on ? "var(--primary-soft-text)" : "var(--text-muted)", flex: "none", marginTop: 1 }}><Ic size={17} /></span>
                <span>
                  <span style={{ display: "block", fontSize: "var(--fs-base)", fontWeight: "var(--fw-medium)", color: on ? "var(--primary-soft-text)" : "var(--text-primary)" }}>{t.label}</span>
                  <span style={{ display: "block", fontSize: "var(--fs-sm)", color: "var(--text-muted)", lineHeight: 1.35, marginTop: 2 }}>{t.desc}</span>
                </span>
              </button>
            );
          })}
        </div>
        <div>
          <label className="field-label">Quick note <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>· optional</span></label>
          <textarea className="textarea" placeholder="What moved the number today? What got in the way?" value={form.note} onChange={(e) => set("note", e.target.value)} />
        </div>
      </div>
      <div style={{ padding: "var(--s-4) var(--s-5)", borderTop: "1px solid var(--border-subtle)", display: "flex", justifyContent: "flex-end" }}>
        <Button variant="primary" icon={I.check} onClick={() => onSave(form)}>Save today's entry</Button>
      </div>
    </Card>
  );
}

function CheckinSummary({ entry, onEdit }) {
  const M = window.TRACK;
  const chips = [
    { label: "Deep work", value: entry.deepWork.toFixed(1) + "h" },
    { label: "Energy", value: entry.energy + "/10" },
    { label: "Focus", value: entry.focus + "/10" },
  ];
  return (
    <Card ai>
      <CardHead title="Today's entry — logged" icon={I.checkCircle}
        action={<Button variant="ghost" size="sm" icon={I.edit} onClick={onEdit}>Edit</Button>} />
      <div style={{ padding: "var(--s-2) var(--s-5) var(--s-5)" }}>
        <div style={{ display: "flex", gap: "var(--s-5)", flexWrap: "wrap" }}>
          {chips.map((c) => (
            <div key={c.label}>
              <div className="stat-label">{c.label}</div>
              <div className="stat-val" style={{ fontSize: "var(--fs-2xl)" }}>{c.value}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: "var(--s-2)", marginTop: "var(--s-4)", flexWrap: "wrap" }}>
          {M.CHECKIN_TOGGLES.filter((t) => entry[t.id]).map((t) => <Badge key={t.id} tone="primary" dot>{t.label}</Badge>)}
          {!entry.shipped && !entry.outreach && <span style={{ fontSize: "var(--fs-sm)", color: "var(--text-muted)" }}>No ship / outreach logged.</span>}
        </div>
        {entry.note && <p style={{ marginTop: "var(--s-4)", fontSize: "var(--fs-base)", color: "var(--text-secondary)", lineHeight: "var(--lh-normal)", paddingTop: "var(--s-3)", borderTop: "1px solid var(--border-subtle)" }}>"{entry.note}"</p>}
      </div>
    </Card>
  );
}

/* ───────────────── Daily insight strip ───────────────── */
function InsightStrip() {
  const pool = window.TRACK.dailyInsights;
  const [idx, setIdx] = useStateT(0);
  const [fav, setFav] = useStateT(pool[0].fav);
  const [busy, setBusy] = useStateT(false);
  const [text, setText] = useStateT(pool[0].text);
  const [copied, setCopied] = useStateT(false);

  const regen = async () => {
    setBusy(true);
    const next = (idx + 1) % pool.length;
    const fallback = pool[next].text;
    const L = window.DATA.learner;
    const out = await window.LLM.complete(
      `You are the daily coach inside a career-training app. The user is ${L.name}, a ${L.role} optimizing toward ${L.objective}. In 2–3 sentences, give one sharp, non-generic insight that connects today's behaviour to that number. No greeting, no emoji.`,
      fallback
    );
    setIdx(next); setText(out); setFav(pool[next].fav); setBusy(false);
  };
  const copy = () => { try { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1400); } catch (e) {} };

  return (
    <div className="card ai-surface" style={{ padding: "var(--s-5)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--s-2)", marginBottom: "var(--s-3)" }}>
        <span className="ai-tag"><I.sparkle /> Insight of the day</span>
        <Badge mono tone="neutral">{pool[idx].tag}</Badge>
        <div style={{ marginLeft: "auto", display: "flex", gap: 2 }}>
          <Tooltip content={copied ? "Copied" : "Copy"}><Button variant="ghost" size="sm" icon={copied ? I.check : I.file} onClick={copy} aria-label="Copy insight" /></Tooltip>
          <Tooltip content={fav ? "Favorited" : "Favorite"}><Button variant="ghost" size="sm" icon={I.star} onClick={() => setFav((f) => !f)} aria-label="Favorite" style={fav ? { color: "var(--warning)" } : null} /></Tooltip>
          <Tooltip content="New insight"><Button variant="ghost" size="sm" icon={I.refresh} onClick={regen} disabled={busy} aria-label="Regenerate" /></Tooltip>
        </div>
      </div>
      <p style={{ margin: 0, fontSize: "var(--fs-lg)", lineHeight: "var(--lh-normal)", color: "var(--text-primary)", opacity: busy ? 0.5 : 1, transition: "opacity var(--dur-fast)" }}>
        {busy ? "Thinking through your last 30 days…" : text}
      </p>
    </div>
  );
}

/* ───────────────── Today's missions ───────────────── */
function MissionsCard({ navigate }) {
  const seed = window.TRACK.dailyMissions;
  const [missions, setMissions] = useStateT(seed);
  const [busy, setBusy] = useStateT(false);
  const done = missions.filter((m) => m.done).length;
  const toggle = (id) => setMissions((ms) => ms.map((m) => m.id === id ? { ...m, done: !m.done } : m));
  const regen = async () => {
    setBusy(true);
    const L = window.DATA.learner;
    const out = await window.LLM.json(
      `Generate 4 daily missions for ${L.name}, a ${L.role} optimizing toward ${L.objective}. Mix skill-building, shipping, and outreach. Each: {title, detail, est ("45m"), priority ("high"|"med"|"low")}. Return a JSON array.`,
      null
    );
    if (Array.isArray(out) && out.length) {
      setMissions(out.slice(0, 5).map((m, i) => ({ id: "g" + i, dim: "carrera", done: false, ...m })));
    }
    setBusy(false);
  };
  return (
    <Card>
      <CardHead title="Today's missions" sub={`${done} of ${missions.length} done · generated from your plan`} icon={I.target}
        action={<Tooltip content="Regenerate"><Button variant="ghost" size="sm" icon={I.refresh} onClick={regen} disabled={busy} aria-label="Regenerate missions" /></Tooltip>} />
      <div style={{ padding: "var(--s-2) var(--s-3) var(--s-3)", position: "relative" }}>
        {busy && <div style={{ position: "absolute", inset: 0, background: "color-mix(in oklab, var(--surface) 70%, transparent)", display: "grid", placeItems: "center", zIndex: 2, borderRadius: "var(--r-md)" }}><span className="ai-tag"><I.sparkle /> Generating…</span></div>}
        {missions.map((m) => {
          const tone = m.priority === "high" ? "danger" : m.priority === "med" ? "warning" : "neutral";
          return (
            <button key={m.id} onClick={() => toggle(m.id)}
              style={{ all: "unset", cursor: "pointer", display: "flex", gap: "var(--s-3)", alignItems: "flex-start", padding: "var(--s-3)", borderRadius: "var(--r-md)", width: "100%", boxSizing: "border-box" }}
              onMouseEnter={(e) => e.currentTarget.style.background = "var(--surface-hover)"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
              <span style={{ flex: "none", marginTop: 1, color: m.done ? "var(--success)" : "var(--text-faint)" }}>{m.done ? <I.checkCircle size={18} /> : <I.circle size={18} />}</span>
              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: "var(--fs-base)", fontWeight: "var(--fw-medium)", textDecoration: m.done ? "line-through" : "none", color: m.done ? "var(--text-muted)" : "var(--text-primary)" }}>{m.title}</span>
                </span>
                <span style={{ display: "block", fontSize: "var(--fs-sm)", color: "var(--text-muted)", lineHeight: 1.4, marginTop: 2 }}>{m.detail}</span>
              </span>
              <span style={{ flex: "none", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                <Badge mono tone={tone}>{m.priority}</Badge>
                <span className="mono" style={{ fontSize: "var(--fs-xs)", color: "var(--text-muted)" }}>{m.est}</span>
              </span>
            </button>
          );
        })}
      </div>
    </Card>
  );
}

/* ───────────────── Dimensions ───────────────── */
function DimensionsRow({ navigate }) {
  const dims = window.TRACK.dimensions;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "var(--s-4)" }}>
      {dims.map((d) => {
        const Ic = I[d.icon] || I.circle; const st = DIM_STATUS[d.status];
        return (
          <Card key={d.id} pad>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--s-2)", marginBottom: "var(--s-3)" }}>
              <span style={{ width: 30, height: 30, borderRadius: "var(--r-md)", background: "var(--surface-subtle)", color: "var(--text-secondary)", display: "grid", placeItems: "center", flex: "none" }}><Ic size={16} /></span>
              <span style={{ fontSize: "var(--fs-base)", fontWeight: "var(--fw-semibold)" }}>{d.label}</span>
              <span style={{ marginLeft: "auto" }}><Badge tone={st.tone} dot>{st.label}</Badge></span>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              <span className="stat-val" style={{ fontSize: "var(--fs-2xl)" }}>{d.unit === "k" ? "$" + d.actual + "k" : d.actual + (d.unit === "%" ? "%" : d.unit === "/10" ? "" : d.unit)}</span>
              <span style={{ fontSize: "var(--fs-sm)", color: "var(--text-muted)" }}>vs {d.unit === "k" ? "$" + d.expected + "k" : d.expected + (d.unit === "%" ? "%" : "")} target</span>
            </div>
            <div style={{ fontSize: "var(--fs-sm)", color: "var(--text-muted)", marginTop: 2 }}>{d.metricLabel}</div>
            <p style={{ fontSize: "var(--fs-sm)", color: "var(--text-secondary)", lineHeight: 1.45, marginTop: "var(--s-3)" }}>{d.note}</p>
          </Card>
        );
      })}
    </div>
  );
}

/* ───────────────── History tab ───────────────── */
function HistoryView() {
  const S = window.TRACK.trackingStats;
  const entries = window.TRACK.dailyEntries.slice().reverse();
  const stats = [
    { label: "Avg deep work / day", value: S.avgDeepWork + "h", delta: +0.6 },
    { label: "Ship rate", value: S.shipRate + "%", delta: +8 },
    { label: "Total deep work (30d)", value: S.totalDeepWork + "h" },
    { label: "Days tracked", value: S.daysTracked + " / 30" },
  ];
  const last = window.TRACK.trackingStats.last14;
  const labels = last.map((e) => fmtDate(e.date).slice(0, 6));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-5)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px,1fr))", gap: "var(--s-4)" }}>
        {stats.map((s) => <Card key={s.label} pad><Stat {...s} /></Card>)}
      </div>
      <Card>
        <CardHead title="Energy, focus & deep work" sub="Last 14 days" icon={I.analytics} />
        <div style={{ padding: "var(--s-4) var(--s-5) var(--s-5)" }}>
          <AreaChart height={240}
            series={[
              { name: "Energy", data: last.map((e) => e.energy) },
              { name: "Focus", data: last.map((e) => e.focus) },
            ]}
            labels={labels} yMax={10} color="var(--viz-2)" color2="var(--viz-3)" />
          <div style={{ display: "flex", gap: "var(--s-5)", marginTop: "var(--s-3)", justifyContent: "center" }}>
            <Legend color="var(--viz-2)" label="Energy" />
            <Legend color="var(--viz-3)" label="Focus" />
          </div>
        </div>
      </Card>
      <Card>
        <CardHead title="Recent entries" sub={`${entries.length} logged`} icon={I.history} />
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Date</th><th>Deep work</th><th>Energy</th><th>Focus</th><th>Shipped</th><th>Outreach</th></tr></thead>
            <tbody>
              {entries.slice(0, 12).map((e) => (
                <tr key={e.date}>
                  <td style={{ fontWeight: "var(--fw-medium)" }}>{fmtDate(e.date)}</td>
                  <td className="mono tnum">{e.deepWork.toFixed(1)}h</td>
                  <td className="tnum">{e.energy}</td>
                  <td className="tnum">{e.focus}</td>
                  <td>{e.shipped ? <I.check size={15} style={{ color: "var(--success)" }} /> : <span style={{ color: "var(--text-faint)" }}>—</span>}</td>
                  <td>{e.outreach ? <I.check size={15} style={{ color: "var(--success)" }} /> : <span style={{ color: "var(--text-faint)" }}>—</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
function Legend({ color, label }) {
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "var(--fs-sm)", color: "var(--text-secondary)" }}><span style={{ width: 10, height: 10, borderRadius: 3, background: color }} />{label}</span>;
}

/* ───────────────── Screen ───────────────── */
function Today({ navigate }) {
  const M = window.TRACK; const L = window.DATA.learner;
  const key = "mentoros-checkin-" + M.TODAY;
  const [tab, setTab] = useStateT("today");
  const [entry, setEntry] = useStateT(() => { try { return JSON.parse(localStorage.getItem(key)); } catch (e) { return null; } });
  const [editing, setEditing] = useStateT(false);
  const save = (form) => { try { localStorage.setItem(key, JSON.stringify(form)); } catch (e) {} setEntry(form); setEditing(false); };

  const hour = new Date(M.TODAY + "T09:00:00").getHours();
  const greet = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const nudge = M.coachMessages[0];

  return (
    <div className="page anim-fade-in">
      <div className="page-head">
        <div>
          <div className="eyebrow" style={{ marginBottom: 8 }}>{new Date(M.TODAY + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long" })}</div>
          <h1 className="page-title">{greet}, {L.name.split(" ")[0]}.</h1>
          <p className="page-desc">One number, one day at a time. Log what you did, see what to do next.</p>
        </div>
        <div style={{ display: "flex", gap: "var(--s-3)", alignItems: "center" }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, justifyContent: "flex-end", fontSize: "var(--fs-2xl)", fontWeight: "var(--fw-bold)", color: "var(--primary)", lineHeight: 1 }}><I.flame size={22} />{M.trackingStats.streak}</div>
            <div style={{ fontSize: "var(--fs-xs)", color: "var(--text-muted)", marginTop: 3 }}>day streak · best {M.trackingStats.streakBest}</div>
          </div>
          <Ring value={Math.round((M.trackingStats.weeklyDoneHrs / M.trackingStats.weeklyTargetHrs) * 100)} size={60} stroke={6}
            label={M.trackingStats.weeklyDoneHrs + "h"} sub={"/ " + M.trackingStats.weeklyTargetHrs + "h"} />
        </div>
      </div>

      <Tabs tabs={[{ id: "today", label: "Today" }, { id: "history", label: "History" }]} value={tab} onChange={setTab} className="anim-fade-in" />
      <div style={{ marginTop: "var(--s-5)" }}>
        {tab === "today" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-5)" }}>
            <InsightStrip />
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.15fr) minmax(0, 1fr)", gap: "var(--s-5)", alignItems: "start" }} className="today-grid">
              {entry && !editing ? <CheckinSummary entry={entry} onEdit={() => setEditing(true)} /> : <CheckinForm value={editing ? entry : null} onSave={save} />}
              <MissionsCard navigate={navigate} />
            </div>
            <div>
              <div className="eyebrow" style={{ marginBottom: "var(--s-3)" }}>Dimensions that move $250k</div>
              <DimensionsRow navigate={navigate} />
            </div>
            <AIInsight title="From your coach" confidence={nudge.confidence} action="Open coach" onAction={() => navigate("coach")}
              why={nudge.evidence.join(" · ")}>
              <strong style={{ fontWeight: "var(--fw-semibold)" }}>{nudge.title}.</strong> {nudge.text}
            </AIInsight>
          </div>
        ) : <HistoryView />}
      </div>

      <style>{`@media (max-width: 820px){ .today-grid{ grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}

Object.assign(window, { Today });
