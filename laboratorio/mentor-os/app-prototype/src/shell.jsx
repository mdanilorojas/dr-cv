/* MentorOS — App shell: sidebar, topbar, command palette, notifications. */
const { useState: useStateS, useEffect: useEffectS, useRef: useRefS } = React;

const NAV = [
  { group: "Daily", items: [
    { id: "today", label: "Today", icon: I.flame },
    { id: "coach", label: "Coach", icon: I.message, badge: 1 },
  ]},
  { group: "Learn", items: [
    { id: "dashboard", label: "Dashboard", icon: I.dashboard },
    { id: "diagnostic", label: "Diagnostic", icon: I.diagnostic },
    { id: "journey", label: "Learning Journey", icon: I.journey },
    { id: "mentor", label: "AI Mentor", icon: I.mentor, badge: 2 },
    { id: "graph", label: "Skill Graph", icon: I.graph },
  ]},
  { group: "Apply", items: [
    { id: "projects", label: "Projects", icon: I.projects, badge: 1 },
    { id: "analytics", label: "Analytics", icon: I.analytics },
  ]},
  { group: "Workspace", items: [
    { id: "process", label: "Design Process", icon: I.process },
    { id: "settings", label: "Settings", icon: I.settings },
  ]},
];

function Sidebar({ route, navigate, collapsed, setCollapsed }) {
  const L = window.DATA.learner;
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="logo-mark">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1.5" y="1.5" width="6" height="6" rx="1.5" fill="var(--primary)" /><rect x="8.5" y="1.5" width="6" height="6" rx="1.5" stroke="#fff" strokeWidth="1.3" /><rect x="1.5" y="8.5" width="6" height="6" rx="1.5" stroke="#fff" strokeWidth="1.3" /><rect x="8.5" y="8.5" width="6" height="6" rx="1.5" fill="var(--accent)" /></svg>
        </span>
        {!collapsed && <div style={{ lineHeight: 1.1 }}>
          <div style={{ fontWeight: "var(--fw-bold)", fontSize: "var(--fs-lg)", letterSpacing: "var(--tracking-tight)" }}>Career OS</div>
          <div style={{ fontSize: "var(--fs-xs)", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>danilorojas.design</div>
        </div>}
      </div>

      <nav style={{ flex: 1, overflowY: "auto" }}>
        {NAV.map((g) => (
          <div className="nav-group" key={g.group}>
            {!collapsed && <div className="nav-label eyebrow">{g.group}</div>}
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {g.items.map((it) => {
                const Ic = it.icon;
                const active = route === it.id;
                return (
                  <Tooltip key={it.id} content={collapsed ? it.label : ""}>
                    <button className={["nav-item", active && "active"].filter(Boolean).join(" ")} onClick={() => navigate(it.id)} aria-current={active ? "page" : undefined} style={{ justifyContent: collapsed ? "center" : "flex-start" }}>
                      <Ic />
                      {!collapsed && <span>{it.label}</span>}
                      {!collapsed && it.badge && <Badge mono tone={it.id === "projects" ? "accent" : "primary"} className="nav-badge">{it.badge}</Badge>}
                    </button>
                  </Tooltip>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Goal footer — the objective drives everything */}
      <div style={{ borderTop: "1px solid var(--border-subtle)", padding: "var(--s-3)" }}>
        {!collapsed && (() => {
          const span = L.incomeGoal - L.incomeBaseline;
          const pct = Math.round(((L.incomeCurrent - L.incomeBaseline) / span) * 100);
          return (
            <div style={{ padding: "var(--s-3)", background: "var(--surface-subtle)", borderRadius: "var(--r-md)", marginBottom: "var(--s-2)" }}>
              <div className="eyebrow" style={{ marginBottom: 6, display: "flex", alignItems: "center", gap: 5 }}><I.target size={12} /> Objective</div>
              <div style={{ fontSize: "var(--fs-lg)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--tracking-tight)", lineHeight: 1.1 }}>{(L.incomeGoal).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })}<span style={{ fontSize: "var(--fs-xs)", color: "var(--text-muted)", fontWeight: "var(--fw-medium)" }}> / yr</span></div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "8px 0 5px", fontSize: "var(--fs-xs)", fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
                <span style={{ color: "var(--text-secondary)", fontWeight: "var(--fw-semibold)" }}>${Math.round(L.incomeCurrent / 1000)}k now</span>
                <span>{pct}%</span>
              </div>
              <Progress value={pct} />
              <div style={{ fontSize: "var(--fs-xs)", color: "var(--text-muted)", marginTop: 6 }}>${Math.round((L.incomeGoal - L.incomeCurrent) / 1000)}k of market value to go</div>
            </div>
          );
        })()}
        <button className="nav-item" onClick={() => setCollapsed(!collapsed)} style={{ justifyContent: collapsed ? "center" : "flex-start" }} aria-label="Toggle sidebar">
          <I.panelLeft />{!collapsed && <span style={{ fontSize: "var(--fs-sm)" }}>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}

function Topbar({ route, navigate, theme, setTheme, openCmd, notifsOpen, setNotifsOpen }) {
  const L = window.DATA.learner;
  const unread = window.DATA.notifications.filter((n) => n.unread).length;
  const crumb = ([].concat(...NAV.map((g) => g.items)).find((i) => i.id === route) || {}).label || "";
  return (
    <header className="topbar">
      <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--text-secondary)", fontSize: "var(--fs-base)", flex: "none" }}>
        <span style={{ fontWeight: "var(--fw-medium)", color: "var(--text-primary)" }}>{crumb}</span>
      </div>
      <button className="searchbar" onClick={openCmd} style={{ margin: "0 auto 0 var(--s-6)" }} aria-label="Search and commands">
        <I.search size={15} />
        <span style={{ flex: 1, textAlign: "left", fontSize: "var(--fs-base)" }}>Search skills, modules, projects…</span>
        <span className="kbd">⌘K</span>
      </button>
      <div style={{ display: "flex", alignItems: "center", gap: 4, flex: "none" }}>
        <Tooltip content={theme === "dark" ? "Light mode" : "Dark mode"}>
          <Button variant="ghost" size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} icon={theme === "dark" ? I.sun : I.moon} aria-label="Toggle theme" />
        </Tooltip>
        <div style={{ position: "relative" }}>
          <Button variant="ghost" size="sm" onClick={() => setNotifsOpen(!notifsOpen)} icon={I.bell} aria-label={`Notifications, ${unread} unread`} />
          {unread > 0 && <span style={{ position: "absolute", top: 4, right: 4, width: 7, height: 7, borderRadius: "50%", background: "var(--accent)", border: "1.5px solid var(--surface)" }} />}
          {notifsOpen && <NotificationsPanel onClose={() => setNotifsOpen(false)} navigate={navigate} />}
        </div>
        <div style={{ width: 1, height: 22, background: "var(--border)", margin: "0 6px" }} />
        <button onClick={() => navigate("settings")} aria-label="Account" style={{ all: "unset", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 30, height: 30, borderRadius: "50%", background: "var(--brand-secondary)", color: "#fff", display: "grid", placeItems: "center", fontSize: "var(--fs-sm)", fontWeight: "var(--fw-semibold)", flex: "none" }}>{L.initials}</span>
        </button>
      </div>
    </header>
  );
}

function NotificationsPanel({ onClose, navigate }) {
  const ns = window.DATA.notifications;
  useEffectS(() => {
    const h = (e) => { if (!e.target.closest("[data-notifs]")) onClose(); };
    setTimeout(() => document.addEventListener("click", h), 0);
    return () => document.removeEventListener("click", h);
  }, []);
  return (
    <div data-notifs className="card anim-scale-in" style={{ position: "absolute", top: "calc(100% + 10px)", right: 0, width: 360, zIndex: 80, boxShadow: "var(--shadow-overlay)", maxHeight: 460, display: "flex", flexDirection: "column" }}>
      <div className="card-hd"><h3 className="card-title">Notifications</h3><button className="btn btn-ghost btn-sm" style={{ height: 24, padding: "0 8px" }}>Mark all read</button></div>
      <div style={{ overflowY: "auto" }}>
        {ns.map((n) => {
          const Ic = I[n.icon] || I.bell;
          return (
            <div key={n.id} style={{ display: "flex", gap: 12, padding: "var(--s-3) var(--s-4)", borderTop: "1px solid var(--border-subtle)", background: n.unread ? "color-mix(in oklab, var(--primary) 4%, var(--surface))" : "transparent" }}>
              <span style={{ width: 32, height: 32, borderRadius: "var(--r-md)", flex: "none", display: "grid", placeItems: "center", background: "var(--surface-subtle)", color: "var(--text-secondary)" }}><Ic size={16} /></span>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: "var(--fs-base)", fontWeight: "var(--fw-medium)" }}>{n.title}</div>
                <div style={{ fontSize: "var(--fs-sm)", color: "var(--text-secondary)", lineHeight: 1.4 }}>{n.body}</div>
                <div style={{ fontSize: "var(--fs-xs)", color: "var(--text-muted)", marginTop: 3, fontFamily: "var(--font-mono)" }}>{n.time} ago</div>
              </div>
              {n.unread && <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--accent)", flex: "none", marginTop: 6 }} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CommandPalette({ open, onClose, navigate }) {
  const [q, setQ] = useStateS("");
  const inputRef = useRefS(null);
  const [idx, setIdx] = useStateS(0);
  useEffectS(() => { if (open) { setQ(""); setIdx(0); setTimeout(() => inputRef.current && inputRef.current.focus(), 40); } }, [open]);

  const commands = [
    { type: "Go to", label: "Today", icon: I.flame, to: "today" },
    { type: "Go to", label: "Coach", icon: I.message, to: "coach" },
    { type: "Go to", label: "Dashboard", icon: I.dashboard, to: "dashboard" },
    { type: "Go to", label: "Diagnostic", icon: I.diagnostic, to: "diagnostic" },
    { type: "Go to", label: "Learning Journey", icon: I.journey, to: "journey" },
    { type: "Go to", label: "AI Mentor", icon: I.mentor, to: "mentor" },
    { type: "Go to", label: "Skill Graph", icon: I.graph, to: "graph" },
    { type: "Go to", label: "Projects", icon: I.projects, to: "projects" },
    { type: "Go to", label: "Analytics", icon: I.analytics, to: "analytics" },
    { type: "Go to", label: "Design Process", icon: I.process, to: "process" },
    { type: "Action", label: "Log today's check-in", icon: I.edit, to: "today" },
    { type: "Action", label: "Generate a coach nudge", icon: I.sparkle, to: "coach" },
    { type: "Action", label: "Resume active module", icon: I.play, to: "journey" },
    { type: "Action", label: "Ask the mentor a question", icon: I.sparkle, to: "mentor" },
    { type: "Action", label: "Resubmit docs assistant", icon: I.refresh, to: "projects" },
    ...window.DATA.searchIndex.map((s) => ({ type: s.type, label: s.label, icon: I.search, to: s.to })),
  ];
  const filtered = q ? commands.filter((c) => c.label.toLowerCase().includes(q.toLowerCase()) || c.type.toLowerCase().includes(q.toLowerCase())) : commands;

  useEffectS(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "ArrowDown") { e.preventDefault(); setIdx((i) => Math.min(filtered.length - 1, i + 1)); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setIdx((i) => Math.max(0, i - 1)); }
      else if (e.key === "Enter") { e.preventDefault(); const c = filtered[idx]; if (c) { navigate(c.to); onClose(); } }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, idx]);

  if (!open) return null;
  let lastType = "";
  return (
    <div className="scrim" onClick={onClose} style={{ alignItems: "flex-start" }}>
      <div className="modal anim-scale-in" role="dialog" aria-label="Command palette" onClick={(e) => e.stopPropagation()}
        style={{ width: 560, maxWidth: "calc(100vw - 32px)", left: "50%", top: 90, transform: "translateX(-50%)", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "var(--s-4)", borderBottom: "1px solid var(--border)" }}>
          <I.search size={18} />
          <input ref={inputRef} value={q} onChange={(e) => { setQ(e.target.value); setIdx(0); }} placeholder="Search or run a command…"
            style={{ flex: 1, border: "none", outline: "none", background: "none", fontSize: "var(--fs-lg)", color: "var(--text-primary)", fontFamily: "var(--font-sans)" }} />
          <span className="kbd">Esc</span>
        </div>
        <div style={{ maxHeight: 360, overflowY: "auto", padding: "var(--s-2)" }}>
          {filtered.length === 0 && <div style={{ padding: "var(--s-6)", textAlign: "center", color: "var(--text-muted)", fontSize: "var(--fs-base)" }}>No results for "{q}"</div>}
          {filtered.map((c, i) => {
            const Ic = c.icon;
            const showHd = c.type !== lastType; lastType = c.type;
            return (
              <React.Fragment key={i}>
                {showHd && <div className="eyebrow" style={{ padding: "var(--s-3) var(--s-3) var(--s-2)" }}>{c.type}</div>}
                <button onClick={() => { navigate(c.to); onClose(); }} onMouseEnter={() => setIdx(i)}
                  style={{ all: "unset", boxSizing: "border-box", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, padding: "var(--s-3)", borderRadius: "var(--r-md)", width: "100%", background: idx === i ? "var(--surface-hover)" : "transparent" }}>
                  <span style={{ color: "var(--text-secondary)" }}><Ic size={16} /></span>
                  <span style={{ flex: 1, fontSize: "var(--fs-base)" }}>{c.label}</span>
                  {idx === i && <span style={{ color: "var(--text-muted)" }}><I.arrowRight size={15} /></span>}
                </button>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Sidebar, Topbar, CommandPalette, NotificationsPanel, NAV });
