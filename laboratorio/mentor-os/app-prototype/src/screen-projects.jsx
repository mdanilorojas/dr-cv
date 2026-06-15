/* MentorOS — Projects. Mastery is proven by shipped work. Each project is a
 * brief, an AI-graded rubric, version history, and a path back to resubmit. */
const { useState: useStateP } = React;

const PROJ_STATUS = {
  "in-review": { tone: "info", label: "Review ready", icon: I.eye },
  passed: { tone: "success", label: "Passed", icon: I.checkCircle },
  draft: { tone: "neutral", label: "Draft", icon: I.edit },
};

function Projects({ navigate }) {
  const { projects } = window.DATA;
  const [selId, setSelId] = useStateP(projects[0].id);
  const sel = projects.find((p) => p.id === selId);
  const [resubmit, setResubmit] = useStateP(false);

  return (
    <div className="page anim-fade-in">
      <div className="page-head">
        <div>
          <div className="eyebrow" style={{ marginBottom: 8 }}>Portfolio · {projects.length} projects</div>
          <h1 className="page-title">Projects</h1>
          <p className="page-desc">Completion doesn't prove mastery — shipped, graded work does. Every project maps to a skill and feeds your model.</p>
        </div>
        <Button variant="primary" size="sm" icon={I.plus}>New project</Button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "288px minmax(0,1fr)", gap: "var(--s-5)", alignItems: "start" }}>
        {/* List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-3)", position: "sticky", top: 0 }}>
          {projects.map((p) => {
            const total = p.rubric.reduce((s, r) => s + r.score, 0);
            const st = PROJ_STATUS[p.status];
            const active = p.id === selId;
            return (
              <button key={p.id} onClick={() => setSelId(p.id)} className="card" style={{ textAlign: "left", cursor: "pointer", padding: "var(--s-4)", borderColor: active ? "color-mix(in oklab, var(--primary) 40%, var(--border))" : "var(--border)", boxShadow: active ? "var(--shadow-md)" : "var(--shadow-sm)", display: "flex", flexDirection: "column", gap: "var(--s-3)" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "var(--s-3)" }}>
                  <span style={{ width: 32, height: 32, borderRadius: "var(--r-md)", background: active ? "var(--primary-soft)" : "var(--surface-subtle)", color: active ? "var(--primary-soft-text)" : "var(--text-secondary)", display: "grid", placeItems: "center", flex: "none" }}><I.rocket size={16} /></span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "var(--fs-base)", fontWeight: "var(--fw-semibold)", lineHeight: 1.25 }}>{p.title}</div>
                    <div style={{ fontSize: "var(--fs-sm)", color: "var(--text-muted)", marginTop: 2 }}>{skillName(p.skill)}</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Badge tone={st.tone} dot>{st.label}</Badge>
                  <span style={{ fontSize: "var(--fs-md)", fontWeight: "var(--fw-semibold)", fontVariantNumeric: "tabular-nums" }}>{total}<span style={{ color: "var(--text-muted)", fontWeight: "var(--fw-regular)" }}>/100</span></span>
                </div>
              </button>
            );
          })}
          <div className="card card-pad" style={{ boxShadow: "none", borderStyle: "dashed", textAlign: "center" }}>
            <p style={{ margin: "0 0 var(--s-3)", fontSize: "var(--fs-sm)", color: "var(--text-muted)" }}>3 more projects unlock as you progress through your path.</p>
            <Button variant="ghost" size="sm" iconRight={I.arrowRight} onClick={() => navigate("journey")}>See upcoming</Button>
          </div>
        </div>

        {/* Detail */}
        <ProjectDetail key={sel.id} p={sel} navigate={navigate} onResubmit={() => setResubmit(true)} />
      </div>

      <Modal open={resubmit} onClose={() => setResubmit(false)} label="Resubmit project" width={520}>
        <div className="card-hd"><h3 className="card-title">Resubmit · {sel.title}</h3><button className="btn btn-ghost btn-icon btn-sm" onClick={() => setResubmit(false)}><I.x size={16} /></button></div>
        <div style={{ padding: "var(--s-5)" }}>
          <p style={{ margin: "0 0 var(--s-4)", fontSize: "var(--fs-base)", color: "var(--text-secondary)", lineHeight: "var(--lh-normal)" }}>The mentor will re-run the rubric and compare against your current version. Attach your updated submission.</p>
          <div style={{ border: "1.5px dashed var(--border-strong)", borderRadius: "var(--r-lg)", padding: "var(--s-8)", textAlign: "center", color: "var(--text-muted)" }}>
            <I.upload size={24} /><div style={{ marginTop: 8, fontSize: "var(--fs-base)" }}>Drop a repo link or zip, or click to browse</div>
          </div>
        </div>
        <div style={{ padding: "var(--s-4) var(--s-5)", borderTop: "1px solid var(--border-subtle)", display: "flex", justifyContent: "flex-end", gap: "var(--s-2)" }}>
          <Button variant="ghost" size="sm" onClick={() => setResubmit(false)}>Cancel</Button>
          <Button variant="primary" size="sm" iconRight={I.arrowRight} onClick={() => setResubmit(false)}>Run review</Button>
        </div>
      </Modal>
    </div>
  );
}

function ProjectDetail({ p, navigate, onResubmit }) {
  const [tab, setTab] = useStateP("review");
  const total = p.rubric.reduce((s, r) => s + r.score, 0);
  const maxTotal = p.rubric.reduce((s, r) => s + r.weight, 0);
  const st = PROJ_STATUS[p.status];
  const passing = total >= 80;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-5)" }}>
      {/* Header */}
      <Card pad>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "var(--s-5)", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 240 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--s-3)", marginBottom: 8 }}>
              <Badge tone={st.tone} dot>{st.label}</Badge>
              <span style={{ fontSize: "var(--fs-sm)", color: "var(--text-muted)" }}>Submitted {p.submitted}</span>
            </div>
            <h2 style={{ margin: "0 0 8px", fontSize: "var(--fs-2xl)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--tracking-tight)", lineHeight: 1.1 }}>{p.title}</h2>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {p.relatedSkills.map((s) => <Badge key={s} tone="neutral">{skillName(s)}</Badge>)}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--s-5)", flex: "none" }}>
            <div style={{ textAlign: "center" }}>
              <Ring value={total} size={84} stroke={7} color={passing ? "var(--success)" : "var(--primary)"} label={total} sub={`/ ${maxTotal}`} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-2)" }}>
              {p.status === "in-review"
                ? <Button variant="primary" icon={I.refresh} onClick={onResubmit}>Resubmit</Button>
                : <Button variant="secondary" icon={I.download}>Download</Button>}
              <Button variant="ghost" size="sm" icon={I.external}>Open repo</Button>
            </div>
          </div>
        </div>
      </Card>

      {/* AI feedback */}
      <div className="card ai-surface" style={{ padding: "var(--s-5)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--s-2)", marginBottom: "var(--s-3)" }}>
          <span className="ai-tag"><I.sparkle /> Mentor review</span>
          <span style={{ marginLeft: "auto" }}><Confidence level={p.aiConfidence} /></span>
        </div>
        <p style={{ margin: 0, fontSize: "var(--fs-lg)", color: "var(--text-primary)", lineHeight: "var(--lh-normal)", maxWidth: "74ch" }}>{p.aiFeedback}</p>
        <div style={{ marginTop: "var(--s-4)", display: "flex", gap: "var(--s-2)", flexWrap: "wrap" }}>
          {p.status === "in-review" && <Button variant="primary" size="sm" icon={I.bolt} onClick={() => navigate("journey")}>Scaffold the eval set</Button>}
          <Button variant="ghost" size="sm" icon={I.sparkle} onClick={() => navigate("mentor")}>Discuss with mentor</Button>
        </div>
      </div>

      <Tabs tabs={[{ id: "review", label: "Rubric" }, { id: "brief", label: "Brief" }, { id: "versions", label: `Versions`, count: p.versions.length }]} value={tab} onChange={setTab} />

      {tab === "review" && (
        <Card>
          <CardHead title="Graded rubric" sub={`${total} of ${maxTotal} points · weighted by criterion`} icon={I.gauge} />
          <div style={{ padding: "var(--s-2) var(--s-5) var(--s-5)" }}>
            {p.rubric.map((r) => {
              const pct = (r.score / r.weight) * 100;
              const tone = pct >= 90 ? "var(--success)" : pct >= 70 ? "var(--primary)" : "var(--warning)";
              return (
                <div key={r.id} style={{ padding: "var(--s-4) 0", borderBottom: "1px solid var(--border-subtle)" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--s-3)", marginBottom: 8 }}>
                    <span style={{ fontSize: "var(--fs-base)", fontWeight: "var(--fw-medium)" }}>{r.label}</span>
                    <span style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                      <span style={{ fontSize: "var(--fs-lg)", fontWeight: "var(--fw-bold)", fontVariantNumeric: "tabular-nums", color: tone }}>{r.score}</span>
                      <span style={{ fontSize: "var(--fs-sm)", color: "var(--text-muted)" }}>/ {r.weight}</span>
                    </span>
                  </div>
                  <Progress value={r.score} max={r.weight} color={tone} />
                  <p style={{ margin: "8px 0 0", fontSize: "var(--fs-sm)", color: "var(--text-secondary)", lineHeight: 1.45 }}>{r.note}</p>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {tab === "brief" && (
        <Card pad>
          <div className="eyebrow" style={{ marginBottom: "var(--s-3)" }}>The brief</div>
          <p style={{ margin: "0 0 var(--s-5)", fontSize: "var(--fs-lg)", color: "var(--text-primary)", lineHeight: "var(--lh-normal)", maxWidth: "72ch" }}>{p.brief}</p>
          <div className="eyebrow" style={{ marginBottom: "var(--s-3)" }}>Requirements</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-2)" }}>
            {p.requirements.map((req, i) => (
              <div key={i} style={{ display: "flex", gap: "var(--s-3)", alignItems: "flex-start", padding: "var(--s-3)", background: "var(--surface-subtle)", borderRadius: "var(--r-md)" }}>
                <span style={{ color: "var(--success)", flex: "none", marginTop: 1 }}><I.checkCircle size={16} /></span>
                <span style={{ fontSize: "var(--fs-base)", color: "var(--text-secondary)" }}>{req}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {tab === "versions" && (
        <Card pad>
          <div className="eyebrow" style={{ marginBottom: "var(--s-4)" }}>Version history</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {p.versions.map((v, i) => (
              <div key={v.v} style={{ display: "grid", gridTemplateColumns: "20px 1fr", columnGap: "var(--s-4)" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <span style={{ width: 12, height: 12, borderRadius: "50%", border: `2px solid ${v.current ? "var(--primary)" : "var(--border-strong)"}`, background: v.current ? "var(--primary)" : "var(--surface)", flex: "none", marginTop: 4 }} />
                  {i < p.versions.length - 1 && <span style={{ flex: 1, width: 2, background: "var(--border)", minHeight: 20 }} />}
                </div>
                <div style={{ paddingBottom: i < p.versions.length - 1 ? "var(--s-4)" : 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "var(--s-2)" }}>
                    <span className="mono" style={{ fontSize: "var(--fs-base)", fontWeight: "var(--fw-semibold)" }}>{v.v}</span>
                    {v.current && <Badge mono tone="primary">current</Badge>}
                    <span style={{ fontSize: "var(--fs-sm)", color: "var(--text-muted)", marginLeft: "auto" }}>{v.date}</span>
                  </div>
                  <div style={{ fontSize: "var(--fs-base)", color: "var(--text-secondary)", marginTop: 3 }}>{v.note}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

Object.assign(window, { Projects });
