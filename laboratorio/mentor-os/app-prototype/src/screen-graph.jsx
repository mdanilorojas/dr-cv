/* MentorOS — Skill Graph. The dependency DAG behind the path: what's
 * mastered, what's a gap, and what each skill unlocks. */
const { useState: useStateG, useMemo: useMemoG } = React;

const LEVEL_COLOR = {
  mastered: "var(--m-mastered)", proficient: "var(--m-proficient)",
  developing: "var(--m-developing)", novice: "var(--m-novice)", gap: "var(--m-gap)",
};
const LEVEL_BG = {
  mastered: "var(--m-mastered-bg)", proficient: "var(--m-proficient-bg)",
  developing: "var(--m-developing-bg)", novice: "var(--m-novice-bg)", gap: "var(--m-gap-bg)",
};

function SkillGraph({ navigate }) {
  const { skills } = window.DATA;
  const byId = useMemoG(() => Object.fromEntries(skills.map((s) => [s.id, s])), [skills]);
  const [selId, setSelId] = useStateG(() => (skills.find((s) => s.weak) || skills[0]).id);
  const [hoverId, setHoverId] = useStateG(null);

  // ---- Layout: x by dependency depth, y stacked within depth ----
  const layout = useMemoG(() => {
    const depth = {};
    const calc = (id, seen = new Set()) => {
      if (depth[id] != null) return depth[id];
      if (seen.has(id)) return 0;
      seen.add(id);
      const s = byId[id];
      const d = s.prereqs.length ? Math.max(...s.prereqs.map((p) => calc(p, seen))) + 1 : 0;
      depth[id] = d;
      return d;
    };
    skills.forEach((s) => calc(s.id));
    const cols = {};
    skills.forEach((s) => { (cols[depth[s.id]] ||= []).push(s.id); });
    const colW = 190, nodeW = 152, nodeH = 56, rowGap = 20;
    const maxRows = Math.max(...Object.values(cols).map((c) => c.length));
    const W = (Math.max(...Object.keys(cols).map(Number)) + 1) * colW + 40;
    const H = maxRows * (nodeH + rowGap) + 40;
    const pos = {};
    Object.entries(cols).forEach(([d, ids]) => {
      const colH = ids.length * (nodeH + rowGap) - rowGap;
      const y0 = (H - colH) / 2;
      ids.sort((a, b) => byId[b].score - byId[a].score);
      ids.forEach((id, i) => {
        pos[id] = { x: 20 + Number(d) * colW, y: y0 + i * (nodeH + rowGap), w: nodeW, h: nodeH };
      });
    });
    const edges = [];
    skills.forEach((s) => s.prereqs.forEach((p) => edges.push([p, s.id])));
    return { pos, edges, W, H };
  }, [skills, byId]);

  const sel = byId[selId];
  const related = useMemoG(() => {
    const set = new Set([selId]);
    sel.prereqs.forEach((p) => set.add(p));
    sel.next.forEach((n) => set.add(n));
    return set;
  }, [selId, sel]);

  const focus = hoverId || selId;

  return (
    <div className="page anim-fade-in">
      <div className="page-head">
        <div>
          <div className="eyebrow" style={{ marginBottom: 8 }}>Skill model · 12 skills · 6 clusters</div>
          <h1 className="page-title">Skill graph</h1>
          <p className="page-desc">Every skill, its prerequisites, and what it unlocks. The model scores you continuously from projects, exercises, and checkpoints.</p>
        </div>
        <div style={{ display: "flex", gap: "var(--s-3)", flex: "none", flexWrap: "wrap" }}>
          {Object.entries({ mastered: "Mastered", proficient: "Proficient", developing: "Developing", novice: "Novice", gap: "Gap" }).map(([k, label]) => (
            <span key={k} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "var(--fs-sm)", color: "var(--text-secondary)" }}>
              <span style={{ width: 9, height: 9, borderRadius: 3, background: LEVEL_COLOR[k] }} />{label}
            </span>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 320px", gap: "var(--s-5)", alignItems: "stretch" }}>
        {/* Graph canvas */}
        <Card>
          <CardHead title="Dependency map" sub="Click a skill to inspect it. Arrows point toward what it unlocks." icon={I.graph}
            action={<span style={{ fontSize: "var(--fs-sm)", color: "var(--text-muted)", display: "inline-flex", alignItems: "center", gap: 5 }}><I.arrowRight size={13} />scroll to pan</span>} />
          <div style={{ overflow: "auto", padding: "var(--s-4)" }}>
            <div style={{ position: "relative", width: layout.W, height: layout.H, minWidth: "100%" }}>
              <svg width={layout.W} height={layout.H} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                <defs>
                  <marker id="arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M1 1 L7 4.5 L1 8" fill="none" stroke="var(--border-strong)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></marker>
                  <marker id="arrowHi" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M1 1 L7 4.5 L1 8" fill="none" stroke="var(--primary)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></marker>
                </defs>
                {layout.edges.map(([from, to], i) => {
                  const a = layout.pos[from], b = layout.pos[to];
                  const x1 = a.x + a.w, y1 = a.y + a.h / 2, x2 = b.x, y2 = b.y + b.h / 2;
                  const mx = (x1 + x2) / 2;
                  const hi = focus === from || focus === to;
                  return <path key={i} d={`M${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2 - 4} ${y2}`} fill="none"
                    stroke={hi ? "var(--primary)" : "var(--border)"} strokeWidth={hi ? 2 : 1.4} markerEnd={`url(#${hi ? "arrowHi" : "arrow"})`}
                    opacity={focus && !hi ? 0.35 : 1} style={{ transition: "stroke var(--dur-fast), opacity var(--dur-fast)" }} />;
                })}
              </svg>
              {window.DATA.skills.map((s) => {
                const p = layout.pos[s.id];
                const isSel = s.id === selId;
                const dim = focus && !related.has(s.id) && focus !== s.id;
                return (
                  <button key={s.id} onClick={() => setSelId(s.id)} onMouseEnter={() => setHoverId(s.id)} onMouseLeave={() => setHoverId(null)}
                    style={{ position: "absolute", left: p.x, top: p.y, width: p.w, height: p.h, textAlign: "left", cursor: "pointer",
                      background: isSel ? LEVEL_BG[s.level] : "var(--surface)", border: `1.5px solid ${isSel ? LEVEL_COLOR[s.level] : "var(--border)"}`,
                      borderRadius: "var(--r-md)", padding: "8px 10px", boxShadow: isSel ? "var(--shadow-md)" : "var(--shadow-xs)",
                      opacity: dim ? 0.4 : 1, transition: "opacity var(--dur-fast) var(--ease), border-color var(--dur-fast), box-shadow var(--dur-fast)", display: "flex", flexDirection: "column", gap: 5, overflow: "hidden" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ width: 8, height: 8, borderRadius: 2, background: LEVEL_COLOR[s.level], flex: "none" }} />
                      <span style={{ fontSize: "var(--fs-md)", fontWeight: "var(--fw-semibold)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", lineHeight: 1.15 }}>{s.name}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ flex: 1 }}><Progress value={s.score} color={LEVEL_COLOR[s.level]} /></span>
                      <span style={{ fontSize: "var(--fs-xs)", fontFamily: "var(--font-mono)", color: "var(--text-muted)", fontVariantNumeric: "tabular-nums" }}>{s.score}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Detail panel */}
        <SkillDetail s={sel} byId={byId} onSelect={setSelId} navigate={navigate} />
      </div>
    </div>
  );
}

function SkillDetail({ s, byId, onSelect, navigate }) {
  return (
    <div className="card" style={{ display: "flex", flexDirection: "column", alignSelf: "start", position: "sticky", top: 0 }}>
      <div style={{ padding: "var(--s-5)", borderBottom: "1px solid var(--border-subtle)" }}>
        <div className="eyebrow" style={{ marginBottom: 8 }}>{s.cluster}</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "var(--s-3)" }}>
          <h2 style={{ margin: 0, fontSize: "var(--fs-xl)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--tracking-tight)", lineHeight: 1.15 }}>{s.name}</h2>
          <Ring value={s.score} size={56} stroke={5} color={LEVEL_COLOR[s.level]} label={s.score} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--s-3)", marginTop: "var(--s-3)", flexWrap: "wrap" }}>
          <MasteryBadge level={s.level} />
          <Confidence level={s.confidence} />
        </div>
        {s.weak && (
          <div style={{ display: "flex", gap: 7, alignItems: "flex-start", marginTop: "var(--s-3)", padding: "var(--s-3)", background: "var(--m-gap-bg)", borderRadius: "var(--r-md)" }}>
            <span style={{ color: "var(--m-gap)", flex: "none", marginTop: 1 }}><I.alert size={14} /></span>
            <span style={{ fontSize: "var(--fs-sm)", color: "var(--text-secondary)" }}>Flagged as a focus area. This skill is on your active path.</span>
          </div>
        )}
      </div>

      <div style={{ padding: "var(--s-5)", display: "flex", flexDirection: "column", gap: "var(--s-5)" }}>
        <SkillValueBlock s={s} navigate={navigate} />
        <DepList title="Builds on" empty="No prerequisites — this is a foundation." ids={s.prereqs} byId={byId} onSelect={onSelect} icon={I.chevronLeft} />
        <DepList title="Unlocks" empty="Nothing further depends on this yet." ids={s.next} byId={byId} onSelect={onSelect} icon={I.arrowRight} />
      </div>

      <div style={{ marginTop: "auto", padding: "var(--s-4) var(--s-5)", borderTop: "1px solid var(--border-subtle)", display: "flex", flexDirection: "column", gap: "var(--s-2)" }}>
        <Button variant="primary" size="sm" iconRight={I.arrowRight} onClick={() => navigate("journey")}>Practice this skill</Button>
        <Button variant="ghost" size="sm" icon={I.diagnostic} onClick={() => navigate("diagnostic")}>Re-take diagnostic to level up</Button>
      </div>
    </div>
  );
}

function SkillValueBlock({ s, navigate }) {
  const { skillBanked, skillUpside } = window.DATA;
  const total = s.q.passed + s.q.failed + s.q.untested;
  const banked = skillBanked(s);
  const upside = skillUpside(s);
  const full = s.value * 1000;
  const bankedPct = (banked / full) * 100;
  return (
    <div>
      <div className="eyebrow" style={{ marginBottom: "var(--s-3)" }}>Worth to your goal</div>
      <div style={{ padding: "var(--s-3) var(--s-4)", background: "var(--surface-subtle)", borderRadius: "var(--r-md)" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: "var(--fs-xl)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--tracking-tight)", fontVariantNumeric: "tabular-nums" }}>${Math.round(banked / 1000)}k</span>
          <span style={{ fontSize: "var(--fs-sm)", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>of ${s.value}k banked</span>
        </div>
        <div style={{ position: "relative", height: 8, borderRadius: "var(--r-full)", background: "var(--surface)", border: "1px solid var(--border)", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, width: `${bankedPct}%`, background: LEVEL_COLOR[s.level], borderRadius: "var(--r-full)" }} />
        </div>
        {upside > 0 && (
          <div style={{ marginTop: 8, fontSize: "var(--fs-sm)", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ color: "var(--accent-soft-text)" }}><I.lock size={13} /></span>
            <strong style={{ color: "var(--accent-soft-text)", fontWeight: "var(--fw-semibold)", fontFamily: "var(--font-mono)" }}>+${Math.round(upside / 1000)}k</strong> unlocks at full mastery
          </div>
        )}
      </div>
      <div style={{ marginTop: "var(--s-3)", display: "flex", alignItems: "center", gap: "var(--s-3)" }}>
        <span className="eyebrow" style={{ flex: "none" }}>Diagnostic</span>
        <div style={{ display: "flex", gap: 3, flex: 1 }}>
          {Array.from({ length: s.q.passed }).map((_, k) => <span key={"p" + k} style={{ flex: 1, height: 7, borderRadius: 2, background: "var(--success)" }} />)}
          {Array.from({ length: s.q.failed }).map((_, k) => <span key={"f" + k} style={{ flex: 1, height: 7, borderRadius: 2, background: "var(--m-gap)" }} />)}
          {Array.from({ length: s.q.untested }).map((_, k) => <span key={"u" + k} style={{ flex: 1, height: 7, borderRadius: 2, background: "var(--surface-subtle)", border: "1px solid var(--border)" }} />)}
        </div>
        <span style={{ fontSize: "var(--fs-xs)", fontFamily: "var(--font-mono)", color: "var(--text-muted)", flex: "none" }}>{s.q.passed}/{total}</span>
      </div>
    </div>
  );
}

function DepList({ title, ids, byId, onSelect, empty, icon }) {
  const Ic = icon;
  return (
    <div>
      <div className="eyebrow" style={{ marginBottom: "var(--s-3)" }}>{title}</div>
      {ids.length === 0 ? <p style={{ margin: 0, fontSize: "var(--fs-sm)", color: "var(--text-muted)" }}>{empty}</p> : (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {ids.map((id) => {
            const d = byId[id];
            return (
              <button key={id} onClick={() => onSelect(id)} style={{ all: "unset", boxSizing: "border-box", cursor: "pointer", display: "flex", alignItems: "center", gap: "var(--s-3)", padding: "8px 10px", borderRadius: "var(--r-md)", background: "var(--surface-subtle)", width: "100%", transition: "background var(--dur-fast)" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-hover)")} onMouseLeave={(e) => (e.currentTarget.style.background = "var(--surface-subtle)")}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: LEVEL_COLOR[d.level], flex: "none" }} />
                <span style={{ flex: 1, fontSize: "var(--fs-base)", fontWeight: "var(--fw-medium)" }}>{d.name}</span>
                <span style={{ fontSize: "var(--fs-xs)", fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>{d.score}</span>
                <span style={{ color: "var(--text-muted)" }}><Ic size={14} /></span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

Object.assign(window, { SkillGraph });
