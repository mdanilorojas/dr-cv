/* MentorOS — Learning Journey. The generated path as an explorable roadmap:
 * every module, why it's there, and what each item builds toward. */
const { useState: useStateJ } = React;

const TYPE_META = {
  module:     { icon: I.book,   label: "Module" },
  lesson:     { icon: I.file,   label: "Lesson" },
  project:    { icon: I.rocket, label: "Project" },
  exercise:   { icon: I.bolt,   label: "Exercise" },
  assessment: { icon: I.target, label: "Checkpoint" },
};
const STATUS_META = {
  complete:  { icon: I.checkCircle, tone: "success", label: "Complete" },
  active:    { icon: I.halfCircle,  tone: "primary", label: "In progress" },
  available: { icon: I.circle,      tone: "neutral", label: "Available" },
  locked:    { icon: I.lock,        tone: "neutral", label: "Locked" },
};

function Journey({ navigate }) {
  const d = window.DATA;
  const { path, learner: L } = d;
  const [view, setView] = useStateJ("path"); // path | list
  const [open, setOpen] = useStateJ(() => {
    const a = path.find((m) => m.status === "active");
    return { [a ? a.id : path[0].id]: true };
  });
  const toggle = (id) => setOpen((o) => ({ ...o, [id]: !o[id] }));

  const totalItems = path.reduce((s, m) => s + m.modules.length, 0);
  const doneItems = path.reduce((s, m) => s + m.modules.filter((x) => x.status === "complete").length, 0);

  return (
    <div className="page anim-fade-in">
      <div className="page-head">
        <div>
          <div className="eyebrow" style={{ marginBottom: 8 }}>Generated path · {L.pathName}</div>
          <h1 className="page-title">Learning journey</h1>
          <p className="page-desc">A path built from your goal, not a fixed syllabus. {doneItems} of {totalItems} items complete · {path.length} modules to your goal.</p>
        </div>
        <div style={{ display: "flex", gap: "var(--s-2)", flex: "none", alignItems: "center" }}>
          <Segmented options={[{ id: "path", label: "Roadmap", icon: I.journey }, { id: "list", label: "List", icon: I.list }]} value={view} onChange={setView} />
          <Button variant="secondary" size="sm" icon={I.refresh}>Re-plan</Button>
        </div>
      </div>

      {/* Path rationale */}
      <div className="card ai-surface" style={{ padding: "var(--s-5)", marginBottom: "var(--s-6)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--s-2)", marginBottom: "var(--s-2)" }}>
          <span className="ai-tag"><I.sparkle /> Why this path</span>
          <span style={{ marginLeft: "auto" }}><Confidence level="high" /></span>
        </div>
        <p style={{ margin: 0, fontSize: "var(--fs-base)", color: "var(--text-primary)", lineHeight: "var(--lh-normal)", maxWidth: "78ch" }}>{L.pathRationale}</p>
        <div style={{ marginTop: "var(--s-4)", display: "flex", gap: "var(--s-2)", flexWrap: "wrap" }}>
          <Button variant="secondary" size="sm" icon={I.edit}>Adjust goal</Button>
          <Button variant="ghost" size="sm" icon={I.bolt}>Re-weight by confidence</Button>
          <Button variant="ghost" size="sm" iconRight={I.arrowRight} onClick={() => navigate("graph")}>See it on the skill graph</Button>
        </div>
      </div>

      {view === "list" ? <JourneyList path={path} navigate={navigate} /> : (
        <div className="journey-rail">
          {path.map((m, i) => (
            <PathModule key={m.id} m={m} index={i} last={i === path.length - 1} open={!!open[m.id]} onToggle={() => toggle(m.id)} navigate={navigate} />
          ))}
        </div>
      )}
    </div>
  );
}

function PathModule({ m, index, last, open, onToggle, navigate }) {
  const sm = STATUS_META[m.status];
  const SIc = sm.icon;
  const nodeColor = m.status === "complete" ? "var(--success)" : m.status === "active" ? "var(--primary)" : "var(--text-faint)";
  return (
    <div style={{ display: "grid", gridTemplateColumns: "44px 1fr", columnGap: "var(--s-4)" }}>
      {/* Spine */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <span style={{ width: 34, height: 34, borderRadius: "50%", flex: "none", display: "grid", placeItems: "center",
          background: m.status === "locked" ? "var(--surface-subtle)" : "var(--surface)", border: `2px solid ${nodeColor}`, color: nodeColor, position: "relative", zIndex: 2 }}>
          <SIc size={17} />
        </span>
        {!last && <span style={{ flex: 1, width: 2, background: m.status === "complete" ? "var(--success)" : "var(--border)", marginTop: 2, marginBottom: 2, minHeight: 18 }} />}
      </div>

      {/* Card */}
      <div style={{ paddingBottom: last ? 0 : "var(--s-5)" }}>
        <div className="card" style={{ overflow: "hidden", borderColor: m.status === "active" ? "color-mix(in oklab, var(--primary) 34%, var(--border))" : "var(--border)" }}>
          <button onClick={onToggle} aria-expanded={open} style={{ all: "unset", boxSizing: "border-box", cursor: m.status === "locked" ? "default" : "pointer", display: "flex", alignItems: "center", gap: "var(--s-4)", padding: "var(--s-4) var(--s-5)", width: "100%" }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--s-3)", flexWrap: "wrap" }}>
                <span className="eyebrow">{m.weeks}</span>
                <Badge tone={sm.tone} dot mono>{sm.label}</Badge>
                {m.status !== "complete" && m.status !== "locked" && <span style={{ fontSize: "var(--fs-sm)", color: "var(--text-muted)", fontVariantNumeric: "tabular-nums" }}>{m.progress}%</span>}
              </div>
              <h2 style={{ margin: "6px 0 4px", fontSize: "var(--fs-xl)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--tracking-tight)", color: m.status === "locked" ? "var(--text-muted)" : "var(--text-primary)" }}>{m.title}</h2>
              <p style={{ margin: 0, fontSize: "var(--fs-base)", color: "var(--text-secondary)", lineHeight: "var(--lh-normal)", maxWidth: "64ch" }}>{m.summary}</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--s-4)", flex: "none" }}>
              <Ring value={m.progress} size={42} stroke={4} color={m.status === "complete" ? "var(--success)" : "var(--primary)"} />
              {m.status !== "locked" && <span style={{ color: "var(--text-muted)", transform: open ? "rotate(180deg)" : "none", transition: "transform var(--dur-fast) var(--ease)" }}><I.chevronDown size={18} /></span>}
            </div>
          </button>

          {open && m.status !== "locked" && (
            <div style={{ borderTop: "1px solid var(--border-subtle)" }}>
              {m.why && (
                <div style={{ display: "flex", gap: 8, alignItems: "flex-start", padding: "var(--s-3) var(--s-5)", background: "color-mix(in oklab, var(--primary) 4%, var(--surface))", borderBottom: "1px solid var(--border-subtle)" }}>
                  <span style={{ color: "var(--primary-soft-text)", flex: "none", marginTop: 1 }}><I.sparkle size={14} /></span>
                  <span style={{ fontSize: "var(--fs-sm)", color: "var(--text-secondary)" }}><strong style={{ color: "var(--text-primary)", fontWeight: "var(--fw-medium)" }}>Why now —</strong> {m.why}</span>
                </div>
              )}
              {m.modules.map((it, i) => <ModuleItem key={it.id} it={it} first={i === 0} navigate={navigate} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ModuleItem({ it, first, navigate }) {
  const tm = TYPE_META[it.type] || TYPE_META.module;
  const TIc = tm.icon;
  const isActive = it.status === "active";
  const isLocked = it.status === "locked";
  const isDone = it.status === "complete";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "var(--s-4)", padding: "var(--s-3) var(--s-5)", borderTop: first ? "none" : "1px solid var(--border-subtle)", background: isActive ? "color-mix(in oklab, var(--primary) 5%, var(--surface))" : "transparent", opacity: isLocked ? 0.6 : 1 }}>
      <span style={{ width: 30, height: 30, borderRadius: "var(--r-md)", flex: "none", display: "grid", placeItems: "center",
        background: isActive ? "var(--primary-soft)" : "var(--surface-subtle)", color: isActive ? "var(--primary-soft-text)" : isDone ? "var(--success)" : "var(--text-secondary)" }}>
        {isDone ? <I.check size={16} /> : isLocked ? <I.lock size={15} /> : <TIc size={16} />}
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: "var(--fs-base)", fontWeight: isActive ? "var(--fw-semibold)" : "var(--fw-medium)", color: isLocked ? "var(--text-muted)" : "var(--text-primary)" }}>{it.title}</div>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--s-2)", marginTop: 4, flexWrap: "wrap" }}>
          <Badge mono tone="neutral">{tm.label}</Badge>
          <span style={{ fontSize: "var(--fs-sm)", color: "var(--text-muted)", display: "inline-flex", alignItems: "center", gap: 4 }}><I.clock size={12} />{it.time}</span>
          <span style={{ fontSize: "var(--fs-sm)", color: "var(--text-muted)" }}>· {it.difficulty}</span>
          {isActive && it.progress != null && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, marginLeft: 2 }}>
              <span style={{ width: 70 }}><Progress value={it.progress} /></span>
              <span style={{ fontSize: "var(--fs-xs)", color: "var(--text-muted)", fontVariantNumeric: "tabular-nums" }}>{it.progress}%</span>
            </span>
          )}
        </div>
      </div>
      <div style={{ flex: "none" }}>
        {isActive ? <Button variant="primary" size="sm" iconRight={I.arrowRight} onClick={() => navigate && navigate("mentor")}>Continue</Button>
          : isDone ? <span style={{ fontSize: "var(--fs-sm)", color: "var(--success)", display: "inline-flex", alignItems: "center", gap: 5 }}><I.checkCircle size={14} />Done</span>
          : isLocked ? <span style={{ fontSize: "var(--fs-sm)", color: "var(--text-muted)" }}>Locked</span>
          : it.type === "project" ? <Button variant="secondary" size="sm" icon={I.rocket} onClick={() => navigate && navigate("projects")}>Start</Button>
          : <Button variant="ghost" size="sm" iconRight={I.arrowRight}>Open</Button>}
      </div>
    </div>
  );
}

function JourneyList({ path, navigate }) {
  const rows = path.flatMap((m) => m.modules.map((it) => ({ ...it, module: m.title })));
  return (
    <Card>
      <div style={{ overflowX: "auto" }}>
        <table className="tbl">
          <thead><tr><th>Item</th><th>Module</th><th>Type</th><th>Difficulty</th><th>Time</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {rows.map((it) => {
              const tm = TYPE_META[it.type] || TYPE_META.module;
              const sm = STATUS_META[it.status];
              const TIc = tm.icon;
              return (
                <tr key={it.id}>
                  <td style={{ fontWeight: "var(--fw-medium)", maxWidth: 280 }}>{it.title}</td>
                  <td style={{ color: "var(--text-secondary)" }}>{it.module}</td>
                  <td><span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--text-secondary)" }}><TIc size={14} />{tm.label}</span></td>
                  <td style={{ color: "var(--text-secondary)" }}>{it.difficulty}</td>
                  <td className="mono" style={{ color: "var(--text-muted)" }}>{it.time}</td>
                  <td><Badge tone={sm.tone} dot>{sm.label}</Badge></td>
                  <td style={{ textAlign: "right" }}>{it.status !== "locked" && <button className="btn btn-ghost btn-sm" onClick={() => navigate(it.type === "project" ? "projects" : "mentor")} style={{ height: 26 }}>{it.status === "active" ? "Continue" : it.status === "complete" ? "Review" : "Open"}</button>}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

Object.assign(window, { Journey });
