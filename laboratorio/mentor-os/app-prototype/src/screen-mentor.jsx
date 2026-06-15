/* MentorOS — AI Mentor. A grounded, context-aware tutor. Every answer is
 * tied to the learner's real history, shows its confidence, and can act. */
const { useState: useStateM, useEffect: useEffectM, useRef: useRefM } = React;

function Mentor({ navigate }) {
  const d = window.DATA;
  const ctx = d.mentorContext;
  const [thread, setThread] = useStateM(d.mentorThread);
  const [draft, setDraft] = useStateM("");
  const [typing, setTyping] = useStateM(false);
  const scrollRef = useRefM(null);
  const taRef = useRefM(null);

  useEffectM(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [thread, typing]);

  const reply = (text) => {
    const canned = {
      grounded: "Based on your last 3 project submissions and the docs-assistant eval log.",
      text: "Good question. Pulling from your history: this connects directly to the retrieval misses we logged. The shortest path is to turn it into a graded drill so you see the effect immediately — want me to add it to your active module?",
      list: ["Reuse your 4 failing questions as the test set.", "Measure recall before and after the change.", "Promote to the project resubmit once recall clears 0.8."],
      confidence: "high",
    };
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setThread((t) => [...t, { id: "m" + Date.now(), role: "mentor", time: now(), text: canned.text, grounded: canned.grounded, list: canned.list, confidence: canned.confidence, chips: ["Add the drill", "Show me the misses", "Not now"] }]);
    }, 1100);
  };

  const send = (text) => {
    const v = (text || "").trim();
    if (!v) return;
    setThread((t) => [...t, { id: "u" + Date.now(), role: "user", time: now(), text: v }]);
    setDraft("");
    if (taRef.current) taRef.current.style.height = "auto";
    reply(v);
  };

  return (
    <div className="anim-fade-in" style={{ height: "100%", display: "grid", gridTemplateColumns: "minmax(0,1fr) 288px" }}>
      {/* Chat column */}
      <div style={{ display: "flex", flexDirection: "column", minWidth: 0, borderRight: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--s-3)", padding: "var(--s-4) var(--s-5)", borderBottom: "1px solid var(--border-subtle)", flex: "none" }}>
          <span style={{ width: 38, height: 38, borderRadius: "var(--r-md)", background: "var(--primary-soft)", color: "var(--primary-soft-text)", display: "grid", placeItems: "center", flex: "none" }}><I.sparkle size={20} /></span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: "var(--fs-lg)", fontWeight: "var(--fw-semibold)", display: "flex", alignItems: "center", gap: 8 }}>Your mentor <Badge mono tone="success" dot>online</Badge></div>
            <div style={{ fontSize: "var(--fs-sm)", color: "var(--text-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Tuned to {ctx.focus.toLowerCase()} · knows your history</div>
          </div>
          <Button variant="ghost" size="sm" icon={I.refresh} aria-label="New chat" style={{ flex: "none" }} />
        </div>

        <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: "var(--s-5)", display: "flex", flexDirection: "column", gap: "var(--s-5)" }}>
          <div style={{ textAlign: "center" }}><Badge mono tone="neutral">Today · {ctx.goal}</Badge></div>
          {thread.map((msg) => <Message key={msg.id} msg={msg} onChip={send} navigate={navigate} />)}
          {typing && <TypingBubble />}
        </div>

        {/* Composer */}
        <div style={{ flex: "none", padding: "var(--s-4) var(--s-5)", borderTop: "1px solid var(--border-subtle)" }}>
          <div style={{ display: "flex", gap: 7, marginBottom: "var(--s-3)", flexWrap: "wrap" }}>
            {d.suggestedPrompts.map((p) => (
              <button key={p} onClick={() => send(p)} style={{ all: "unset", cursor: "pointer", fontSize: "var(--fs-sm)", color: "var(--text-secondary)", border: "1px solid var(--border)", borderRadius: "var(--r-full)", padding: "5px 12px", transition: "all var(--dur-fast)" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--border-strong)"; e.currentTarget.style.color = "var(--text-primary)"; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-secondary)"; }}>{p}</button>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: "var(--s-3)", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r-lg)", padding: "var(--s-2) var(--s-2) var(--s-2) var(--s-4)" }}>
            <button className="btn btn-ghost btn-icon btn-sm" aria-label="Attach"><I.paperclip size={16} /></button>
            <textarea ref={taRef} value={draft} rows={1} placeholder="Ask anything — the mentor sees your projects, scores, and mistakes…"
              onChange={(e) => { setDraft(e.target.value); e.target.style.height = "auto"; e.target.style.height = Math.min(e.target.scrollHeight, 140) + "px"; }}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(draft); } }}
              style={{ flex: 1, border: "none", outline: "none", background: "none", resize: "none", fontFamily: "var(--font-sans)", fontSize: "var(--fs-base)", color: "var(--text-primary)", lineHeight: "var(--lh-base)", padding: "7px 0", maxHeight: 140 }} />
            <Button variant="primary" size="sm" icon={I.send} disabled={!draft.trim()} onClick={() => send(draft)} aria-label="Send" style={{ height: 32, width: 32, padding: 0 }} />
          </div>
          <div style={{ fontSize: "var(--fs-xs)", color: "var(--text-faint)", marginTop: 8, textAlign: "center" }}>Mentor answers are grounded in your work and can be wrong. Verify before you ship.</div>
        </div>
      </div>

      {/* Context rail */}
      <aside style={{ overflowY: "auto", padding: "var(--s-5)", display: "flex", flexDirection: "column", gap: "var(--s-5)", background: "var(--surface-subtle)" }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: "var(--s-3)" }}>What your mentor knows</div>
          <p style={{ margin: 0, fontSize: "var(--fs-sm)", color: "var(--text-secondary)", lineHeight: "var(--lh-normal)" }}>The mentor reads your live skill model — not a generic prompt. This is the context behind every answer.</p>
        </div>

        <CtxCard icon={I.target} title="Goal">
          <span style={{ fontSize: "var(--fs-base)", fontWeight: "var(--fw-medium)" }}>{ctx.goal}</span>
        </CtxCard>

        <CtxCard icon={I.compass} title="Current focus">
          <Badge tone="primary" dot>{ctx.focus}</Badge>
        </CtxCard>

        <CtxCard icon={I.alert} title="Recent mistakes" accent="var(--m-gap)">
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
            {ctx.recentMistakes.map((m, i) => (
              <li key={i} style={{ display: "flex", gap: 8, fontSize: "var(--fs-sm)", color: "var(--text-secondary)", lineHeight: 1.4 }}>
                <span style={{ color: "var(--m-gap)", flex: "none", marginTop: 5, width: 5, height: 5, borderRadius: "50%", background: "var(--m-gap)" }} />{m}
              </li>
            ))}
          </ul>
        </CtxCard>

        <CtxCard icon={I.file} title="Recent projects">
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {ctx.lastProjects.map((p, i) => (
              <button key={i} onClick={() => navigate("projects")} style={{ all: "unset", cursor: "pointer", fontSize: "var(--fs-sm)", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: 6 }}>
                <I.file size={13} /><span style={{ flex: 1 }}>{p}</span><I.chevronRight size={13} />
              </button>
            ))}
          </div>
        </CtxCard>
      </aside>
    </div>
  );
}

function CtxCard({ icon, title, children, accent }) {
  const Ic = icon;
  return (
    <div className="card card-pad" style={{ boxShadow: "none", borderLeft: accent ? `2px solid ${accent}` : undefined }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "var(--s-3)", color: "var(--text-muted)" }}>
        <Ic size={15} /><span className="eyebrow" style={{ color: "var(--text-muted)" }}>{title}</span>
      </div>
      {children}
    </div>
  );
}

function Message({ msg, onChip, navigate }) {
  if (msg.role === "user") {
    return (
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "var(--s-3)" }}>
        <div style={{ maxWidth: "72%", background: "var(--primary)", color: "var(--on-primary)", padding: "var(--s-3) var(--s-4)", borderRadius: "14px 14px 4px 14px", fontSize: "var(--fs-base)", lineHeight: "var(--lh-base)", whiteSpace: "pre-wrap" }}>{msg.text}</div>
      </div>
    );
  }
  return (
    <div style={{ display: "flex", gap: "var(--s-3)", maxWidth: "82%" }}>
      <span style={{ width: 30, height: 30, borderRadius: "var(--r-md)", background: "var(--primary-soft)", color: "var(--primary-soft-text)", display: "grid", placeItems: "center", flex: "none", marginTop: 2 }}><I.sparkle size={16} /></span>
      <div style={{ minWidth: 0 }}>
        <div className="card" style={{ padding: "var(--s-4)", borderRadius: "4px 14px 14px 14px", boxShadow: "none" }}>
          <div style={{ fontSize: "var(--fs-base)", color: "var(--text-primary)", lineHeight: "var(--lh-normal)", whiteSpace: "pre-wrap" }}>{msg.text}</div>
          {msg.list && (
            <ol style={{ margin: "var(--s-3) 0 0", paddingLeft: 0, listStyle: "none", counterReset: "step", display: "flex", flexDirection: "column", gap: 8 }}>
              {msg.list.map((li, i) => (
                <li key={i} style={{ display: "flex", gap: 10, fontSize: "var(--fs-base)", color: "var(--text-secondary)", lineHeight: 1.45 }}>
                  <span style={{ flex: "none", width: 20, height: 20, borderRadius: "var(--r-sm)", background: "var(--surface-subtle)", color: "var(--text-primary)", fontSize: "var(--fs-xs)", fontFamily: "var(--font-mono)", fontWeight: "var(--fw-semibold)", display: "grid", placeItems: "center", marginTop: 1 }}>{i + 1}</span>
                  <span>{li}</span>
                </li>
              ))}
            </ol>
          )}
          {msg.action === "added-step" && (
            <div style={{ marginTop: "var(--s-3)", display: "flex", alignItems: "center", gap: 8, padding: "var(--s-3)", background: "var(--success-soft)", borderRadius: "var(--r-md)" }}>
              <span style={{ color: "var(--success)", flex: "none" }}><I.checkCircle size={16} /></span>
              <span style={{ fontSize: "var(--fs-sm)", color: "var(--text-secondary)", flex: 1 }}>Added to your active module.</span>
              <button className="btn btn-ghost btn-sm" style={{ height: 24 }} onClick={() => navigate("journey")}>View</button>
            </div>
          )}
          {msg.grounded && (
            <div style={{ marginTop: "var(--s-3)", paddingTop: "var(--s-3)", borderTop: "1px solid var(--border-subtle)", display: "flex", gap: 7, alignItems: "center" }}>
              <span style={{ color: "var(--text-muted)", flex: "none" }}><I.link size={13} /></span>
              <span style={{ fontSize: "var(--fs-sm)", color: "var(--text-muted)", flex: 1 }}>{msg.grounded}</span>
              {msg.confidence && <Confidence level={msg.confidence} showLabel={false} />}
            </div>
          )}
        </div>
        {msg.chips && (
          <div style={{ display: "flex", gap: 7, marginTop: "var(--s-3)", flexWrap: "wrap" }}>
            {msg.chips.map((c) => (
              <button key={c} onClick={() => onChip(c)} style={{ all: "unset", cursor: "pointer", fontSize: "var(--fs-sm)", fontWeight: "var(--fw-medium)", color: "var(--primary-soft-text)", background: "var(--primary-soft)", borderRadius: "var(--r-full)", padding: "5px 12px", transition: "filter var(--dur-fast)" }}
                onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(0.96)")} onMouseLeave={(e) => (e.currentTarget.style.filter = "none")}>{c}</button>
            ))}
          </div>
        )}
        <div style={{ fontSize: "var(--fs-xs)", color: "var(--text-faint)", marginTop: 6, fontFamily: "var(--font-mono)" }}>{msg.time}</div>
      </div>
    </div>
  );
}

function TypingBubble() {
  return (
    <div style={{ display: "flex", gap: "var(--s-3)" }}>
      <span style={{ width: 30, height: 30, borderRadius: "var(--r-md)", background: "var(--primary-soft)", color: "var(--primary-soft-text)", display: "grid", placeItems: "center", flex: "none" }}><I.sparkle size={16} /></span>
      <div className="card" style={{ padding: "var(--s-4)", borderRadius: "4px 14px 14px 14px", boxShadow: "none", display: "flex", gap: 5, alignItems: "center" }}>
        {[0, 1, 2].map((i) => <span key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--text-muted)", animation: `pulseSoft 1s ${i * 0.18}s infinite` }} />)}
      </div>
    </div>
  );
}

function now() { return new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }); }

Object.assign(window, { Mentor });
