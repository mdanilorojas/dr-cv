/* MentorOS — Coach. The proactive, LLM-backed motivation engine migrated from
 * the mobile "Coach" tab: nudges grounded in your data, win detection, outreach
 * when you go quiet, weekly reflection, and 👍/👎 feedback that feeds the
 * anti-sycophancy score. */
const { useState: useStateCo } = React;

const COACH_TYPE = {
  nudge:      { tone: "info",    icon: "bolt",  label: "Nudge" },
  win:        { tone: "success", icon: "award", label: "Win" },
  outreach:   { tone: "warning", icon: "send",  label: "Outreach" },
  critical:   { tone: "danger",  icon: "alert", label: "Needs attention" },
  reflection: { tone: "neutral", icon: "book",  label: "Reflection" },
};

function EvidenceList({ items }) {
  const [open, setOpen] = useStateCo(false);
  if (!items || !items.length) return null;
  return (
    <div style={{ marginTop: "var(--s-3)" }}>
      <button onClick={() => setOpen((o) => !o)}
        style={{ all: "unset", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, fontSize: "var(--fs-sm)", color: "var(--text-secondary)", fontWeight: "var(--fw-medium)" }}>
        <I.link size={13} /> Cited evidence ({items.length})
        <span style={{ transition: "transform var(--dur-fast)", transform: open ? "rotate(90deg)" : "none", display: "inline-flex" }}><I.chevronRight size={13} /></span>
      </button>
      {open && (
        <ul style={{ listStyle: "none", margin: "var(--s-2) 0 0", padding: 0, display: "flex", flexDirection: "column", gap: 5 }}>
          {items.map((e, i) => (
            <li key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: "var(--fs-sm)", color: "var(--text-secondary)", fontFamily: "var(--font-mono)", background: "var(--surface-subtle)", padding: "6px 10px", borderRadius: "var(--r-sm)" }}>
              <span style={{ color: "var(--text-faint)", flex: "none" }}>›</span>{e}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function CoachCard({ msg, onFeedback }) {
  const t = COACH_TYPE[msg.type] || COACH_TYPE.nudge;
  const Ic = I[t.icon] || I.sparkle;
  return (
    <Card className={msg.type === "win" ? "ai-surface" : ""}>
      <div style={{ padding: "var(--s-5)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--s-3)", marginBottom: "var(--s-3)" }}>
          <span style={{ width: 34, height: 34, borderRadius: "var(--r-md)", flex: "none", display: "grid", placeItems: "center", background: `var(--${t.tone}-soft)`, color: `var(--${t.tone})` }}><Ic size={17} /></span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: "var(--fs-lg)", fontWeight: "var(--fw-semibold)", letterSpacing: "var(--tracking-base)", lineHeight: 1.25 }}>{msg.title}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 3 }}>
              <Badge mono tone={t.tone}>{t.label}</Badge>
              <span style={{ fontSize: "var(--fs-xs)", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{msg.time}</span>
              {msg.confidence && <Confidence level={msg.confidence} showLabel={false} />}
            </div>
          </div>
        </div>
        <p style={{ margin: 0, fontSize: "var(--fs-base)", color: "var(--text-secondary)", lineHeight: "var(--lh-normal)" }}>{msg.text}</p>
        <EvidenceList items={msg.evidence} />
        <div style={{ display: "flex", alignItems: "center", gap: "var(--s-2)", marginTop: "var(--s-4)", paddingTop: "var(--s-3)", borderTop: "1px solid var(--border-subtle)" }}>
          <span style={{ fontSize: "var(--fs-sm)", color: "var(--text-muted)" }}>Was this honest and useful?</span>
          <div style={{ marginLeft: "auto", display: "flex", gap: 4 }}>
            <Button variant={msg.feedback === "up" ? "primary" : "ghost"} size="sm" icon={I.thumbsUp} onClick={() => onFeedback(msg.id, "up")} aria-label="Helpful" />
            <Button variant={msg.feedback === "down" ? "secondary" : "ghost"} size="sm" onClick={() => onFeedback(msg.id, "down")} aria-label="Not helpful"
              style={msg.feedback === "down" ? { color: "var(--danger-text)" } : null}>
              <span style={{ display: "inline-flex", transform: "rotate(180deg)" }}><I.thumbsUp size={16} /></span>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

function ReflectionModal({ open, onClose }) {
  const R = window.TRACK.weeklyReflection;
  const [answers, setAnswers] = useStateCo({});
  const [saved, setSaved] = useStateCo(false);
  return (
    <Modal open={open} onClose={onClose} width={580} label="Weekly reflection">
      <div className="card-hd"><div><h3 className="card-title">Weekly reflection</h3><p className="card-sub">{R.weekLabel}</p></div>
        <Button variant="ghost" size="sm" icon={I.x} onClick={onClose} aria-label="Close" /></div>
      <div style={{ padding: "var(--s-5)", overflowY: "auto" }}>
        {saved ? (
          <EmptyState icon={I.checkCircle} title="Logged for the week">Your coach will fold this into next week's nudges. See you Monday.</EmptyState>
        ) : R.prompts.map((p, i) => (
          <div key={i} style={{ marginBottom: "var(--s-4)" }}>
            <label className="field-label">{p}</label>
            <textarea className="textarea" value={answers[i] || ""} onChange={(e) => setAnswers((a) => ({ ...a, [i]: e.target.value }))} placeholder="In a sentence or two…" />
          </div>
        ))}
      </div>
      {!saved && <div style={{ padding: "var(--s-4) var(--s-5)", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "flex-end", gap: "var(--s-2)" }}>
        <Button variant="ghost" onClick={onClose}>Cancel</Button>
        <Button variant="primary" icon={I.check} onClick={() => setSaved(true)}>Save reflection</Button>
      </div>}
    </Modal>
  );
}

function Coach({ navigate }) {
  const M = window.TRACK; const L = window.DATA.learner; const CS = M.coachSettings;
  const [msgs, setMsgs] = useStateCo(M.coachMessages);
  const [busy, setBusy] = useStateCo(false);
  const [reflectOpen, setReflectOpen] = useStateCo(false);

  const onFeedback = (id, v) => setMsgs((ms) => ms.map((m) => m.id === id ? { ...m, feedback: m.feedback === v ? null : v } : m));

  const generate = async () => {
    setBusy(true);
    const fallback = {
      title: "Protect tomorrow's morning block",
      text: "Your focus scores are 30% higher before noon. Put the hardest module on tomorrow's calendar at 9am and treat it like a meeting you can't move.",
      evidence: ["Focus 8.1 AM vs 6.2 PM", "Eval module = hardest remaining"],
    };
    const out = await window.LLM.json(
      `You are a no-nonsense career coach for ${L.name}, a ${L.role} optimizing toward ${L.objective}. Based on: 23-day deep-work streak, income dimension behind by $13k, RAG module 40% for 6 days. Write one grounded nudge. Return JSON {title, text (2-3 sentences), evidence (array of short strings)}.`,
      fallback
    );
    const msg = { id: "g" + Date.now(), type: "nudge", time: "Just now", dimension: "carrera", confidence: "high", feedback: null, ...out };
    setMsgs((ms) => [msg, ...ms]); setBusy(false);
  };

  return (
    <div className="page anim-fade-in">
      <div className="page-head">
        <div>
          <div className="eyebrow" style={{ marginBottom: 8 }}>Daily</div>
          <h1 className="page-title">Coach</h1>
          <p className="page-desc">Grounded in your tracking — not vibes. It celebrates real wins, flags real gaps, and tells you the one thing to do next.</p>
        </div>
        <Button variant="primary" icon={I.sparkle} onClick={generate} disabled={busy}>{busy ? "Thinking…" : "Generate nudge"}</Button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 300px", gap: "var(--s-6)", alignItems: "start" }} className="coach-grid">
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-4)" }}>
          {/* Outreach banner */}
          <div className="card" style={{ padding: "var(--s-4) var(--s-5)", borderColor: "color-mix(in oklab, var(--warning) 35%, var(--border))", background: "var(--warning-soft)", display: "flex", gap: "var(--s-3)", alignItems: "flex-start" }}>
            <span style={{ color: "var(--warning)", flex: "none", marginTop: 1 }}><I.send size={18} /></span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "var(--fs-base)", fontWeight: "var(--fw-semibold)", color: "var(--warning-text)" }}>You've gone quiet on outreach</div>
              <div style={{ fontSize: "var(--fs-sm)", color: "var(--text-secondary)", lineHeight: 1.45, marginTop: 2 }}>6 of the last 30 days. Income is your only "behind" dimension and it's the one the market actually pays. Two messages today.</div>
            </div>
            <Button variant="secondary" size="sm" iconRight={I.arrowRight} onClick={() => navigate("projects")}>Start</Button>
          </div>

          {busy && <Card pad><span className="ai-tag"><I.sparkle /> Reading your last 30 days…</span></Card>}
          {msgs.map((m) => <CoachCard key={m.id} msg={m} onFeedback={onFeedback} />)}
        </div>

        {/* Right rail */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-4)", position: "sticky", top: 0 }}>
          <Card pad>
            <div className="eyebrow" style={{ marginBottom: "var(--s-3)" }}>Coach honesty</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span className="stat-val" style={{ fontSize: "var(--fs-3xl)", color: "var(--success)" }}>+{CS.antiSycophancy.toFixed(2)}</span>
              <span style={{ fontSize: "var(--fs-sm)", color: "var(--text-muted)" }}>anti-sycophancy</span>
            </div>
            <p style={{ fontSize: "var(--fs-sm)", color: "var(--text-secondary)", lineHeight: 1.45, marginTop: "var(--s-2)" }}>
              Correlation between your 👍/👎 and the real change in your gaps. Positive means the coach is honest, not just flattering.
            </p>
            <div style={{ marginTop: "var(--s-3)", paddingTop: "var(--s-3)", borderTop: "1px solid var(--border-subtle)" }}>
              <Row2 label="LLM model" value={CS.model} />
              <Row2 label="Mode" value={CS.mode} />
              <Row2 label="Spent today" value={"$" + CS.spentTodayUsd.toFixed(2) + " / $" + CS.dailyCostCapUsd.toFixed(2)} />
            </div>
            <Button variant="ghost" size="sm" icon={I.settings} onClick={() => navigate("settings")} style={{ marginTop: "var(--s-3)" }}>Coach settings</Button>
          </Card>

          <Card pad>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "var(--s-2)" }}><I.book size={16} style={{ color: "var(--text-muted)" }} /><span style={{ fontWeight: "var(--fw-semibold)" }}>Weekly reflection</span></div>
            <p style={{ fontSize: "var(--fs-sm)", color: "var(--text-secondary)", lineHeight: 1.45, margin: "0 0 var(--s-3)" }}>Close the week in three questions. It sharpens next week's nudges.</p>
            <Button variant="secondary" size="sm" icon={I.edit} onClick={() => setReflectOpen(true)}>Reflect on this week</Button>
          </Card>
        </div>
      </div>

      <ReflectionModal open={reflectOpen} onClose={() => setReflectOpen(false)} />
      <style>{`@media (max-width: 900px){ .coach-grid{ grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}

function Row2({ label, value }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 0", fontSize: "var(--fs-sm)" }}>
      <span style={{ color: "var(--text-muted)" }}>{label}</span>
      <span className="mono" style={{ fontWeight: "var(--fw-medium)", textTransform: "capitalize" }}>{value}</span>
    </div>
  );
}

Object.assign(window, { Coach });
