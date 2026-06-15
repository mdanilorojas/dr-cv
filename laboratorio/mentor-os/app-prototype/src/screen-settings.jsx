/* MentorOS — Settings. Profile, the goal that drives the whole path,
 * mentor behaviour, notifications, and appearance. */
const { useState: useStateSet } = React;

const SECTIONS = [
  { id: "profile", label: "Profile", icon: I.user },
  { id: "goal", label: "Objective", icon: I.target },
  { id: "mentor", label: "Mentor & path", icon: I.sparkle },
  { id: "coach", label: "Coach & cost", icon: I.bolt },
  { id: "notifications", label: "Notifications", icon: I.bell },
  { id: "appearance", label: "Appearance", icon: I.eye },
  { id: "account", label: "Account", icon: I.shield },
];

function Settings({ theme, setTheme }) {
  const L = window.DATA.learner;
  const [sec, setSec] = useStateSet("profile");
  const [prefs, setPrefs] = useStateSet({
    nudges: true, morningBias: true, grounded: true, autoDrills: true, difficulty: "adaptive",
    nReview: true, nSteps: true, nStreak: false, nCheckpoint: true, nWeekly: true,
    density: "comfortable", target: L.weeklyTargetHrs,
  });
  const set = (k, v) => setPrefs((p) => ({ ...p, [k]: v }));

  return (
    <div className="page anim-fade-in">
      <div className="page-head">
        <div>
          <div className="eyebrow" style={{ marginBottom: 8 }}>Workspace</div>
          <h1 className="page-title">Settings</h1>
          <p className="page-desc">Your goal and preferences shape the path and how the mentor behaves. Changes apply to future recommendations.</p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "208px minmax(0,1fr)", gap: "var(--s-6)", alignItems: "start" }}>
        {/* Section nav */}
        <nav style={{ display: "flex", flexDirection: "column", gap: 2, position: "sticky", top: 0 }}>
          {SECTIONS.map((s) => {
            const Ic = s.icon;
            return (
              <button key={s.id} className={["nav-item", sec === s.id && "active"].filter(Boolean).join(" ")} onClick={() => setSec(s.id)}>
                <Ic /><span>{s.label}</span>
              </button>
            );
          })}
        </nav>

        <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-5)" }}>
          {sec === "profile" && <ProfileSection L={L} />}
          {sec === "goal" && <GoalSection L={L} prefs={prefs} set={set} />}
          {sec === "mentor" && <MentorSection prefs={prefs} set={set} />}
          {sec === "coach" && <CoachSettingsSection />}
          {sec === "notifications" && <NotifSection prefs={prefs} set={set} />}
          {sec === "appearance" && <AppearanceSection theme={theme} setTheme={setTheme} prefs={prefs} set={set} />}
          {sec === "account" && <AccountSection L={L} />}
        </div>
      </div>
    </div>
  );
}

function Row({ title, desc, children, last }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "var(--s-5)", padding: "var(--s-4) 0", borderBottom: last ? "none" : "1px solid var(--border-subtle)" }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: "var(--fs-base)", fontWeight: "var(--fw-medium)" }}>{title}</div>
        {desc && <div style={{ fontSize: "var(--fs-sm)", color: "var(--text-muted)", marginTop: 2, lineHeight: 1.4 }}>{desc}</div>}
      </div>
      <div style={{ flex: "none" }}>{children}</div>
    </div>
  );
}
function Section({ title, sub, icon, children, footer }) {
  return (
    <Card>
      <CardHead title={title} sub={sub} icon={icon} />
      <div style={{ padding: "var(--s-2) var(--s-5) var(--s-4)" }}>{children}</div>
      {footer && <div style={{ padding: "var(--s-4) var(--s-5)", borderTop: "1px solid var(--border-subtle)", display: "flex", justifyContent: "flex-end", gap: "var(--s-2)" }}>{footer}</div>}
    </Card>
  );
}

function ProfileSection({ L }) {
  return (
    <Section title="Profile" sub="How you appear across MentorOS" icon={I.user}
      footer={<><Button variant="ghost" size="sm">Cancel</Button><Button variant="primary" size="sm">Save changes</Button></>}>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--s-4)", padding: "var(--s-4) 0", borderBottom: "1px solid var(--border-subtle)" }}>
        <span style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--brand-secondary)", color: "#fff", display: "grid", placeItems: "center", fontSize: "var(--fs-xl)", fontWeight: "var(--fw-semibold)", flex: "none" }}>{L.initials}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: "var(--fs-lg)", fontWeight: "var(--fw-semibold)" }}>{L.name}</div>
          <div style={{ fontSize: "var(--fs-sm)", color: "var(--text-muted)" }}>{L.role} · {L.org}</div>
        </div>
        <Button variant="secondary" size="sm" icon={I.edit}>Change photo</Button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--s-4)", padding: "var(--s-4) 0" }}>
        <div><label className="field-label">Full name</label><input className="input" defaultValue={L.name} /></div>
        <div><label className="field-label">Email</label><input className="input" defaultValue="marina.velasco@vantor.io" /></div>
        <div><label className="field-label">Role</label><input className="input" defaultValue={L.role} /></div>
        <div><label className="field-label">Organization</label><input className="input" defaultValue={L.org} /></div>
      </div>
    </Section>
  );
}

function GoalSection({ L, prefs, set }) {
  const [kind, setKind] = useStateSet(L.objectiveKind || "income");
  return (
    <>
      <Section title="Your objective" sub="The one outcome your entire path is optimized toward. State it as a result, not an activity." icon={I.target}
        footer={<><Button variant="ghost" size="sm" icon={I.history}>Objective history</Button><Button variant="primary" size="sm" icon={I.refresh}>Re-plan from objective</Button></>}>
        <Row title="Objective type" desc="What kind of result you're chasing. It changes how progress is measured.">
          <Segmented options={[{ id: "income", label: "Income" }, { id: "role", label: "Role" }, { id: "outcome", label: "Outcome" }]} value={kind} onChange={setKind} />
        </Row>
        {kind === "income" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--s-4)", padding: "var(--s-4) 0", borderBottom: "1px solid var(--border-subtle)" }}>
            <div>
              <label className="field-label">Target income (per year)</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>$</span>
                <input className="input" defaultValue={(250000).toLocaleString("en-US")} style={{ paddingLeft: 26, fontFamily: "var(--font-mono)", fontWeight: "var(--fw-semibold)" }} />
              </div>
              <div className="field-help">This number anchors every skill's dollar value and the order of your program.</div>
            </div>
            <div>
              <label className="field-label">Target role</label>
              <input className="input" defaultValue={L.targetRole} />
              <div className="field-help">Used to benchmark your market value against live comp data.</div>
            </div>
          </div>
        )}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--s-4)", padding: "var(--s-4) 0" }}>
          <div><label className="field-label">Started</label><input className="input" defaultValue={L.goalStarted} disabled /></div>
          <div><label className="field-label">Target date</label><input className="input" defaultValue={L.goalTarget} /></div>
        </div>
        <Row title="The means" desc="The capability that earns the objective. Your path is built to make this true." last>
          <input className="input" defaultValue={L.goalTitle} style={{ width: 320 }} />
        </Row>
      </Section>

      <Section title="Pace" sub="How fast you close the gap to your number" icon={I.gauge}>
        <Row title="Weekly time commitment" desc={`Drives the completion forecast. Currently ${prefs.target}h/week.`} last>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--s-3)", width: 220 }}>
            <input type="range" min="2" max="20" step="1" value={prefs.target} onChange={(e) => set("target", +e.target.value)} style={{ flex: 1, accentColor: "var(--primary)" }} />
            <span className="mono" style={{ fontSize: "var(--fs-base)", fontWeight: "var(--fw-semibold)", minWidth: 34, textAlign: "right" }}>{prefs.target}h</span>
          </div>
        </Row>
      </Section>
    </>
  );
}

function MentorSection({ prefs, set }) {
  return (
    <Section title="Mentor & path behaviour" sub="How proactive the AI mentor is, and how it adapts your path" icon={I.sparkle}>
      <Row title="Proactive nudges" desc="Let the mentor surface the next best action and flag risks without being asked.">
        <Switch id="nudges" checked={prefs.nudges} onChange={(v) => set("nudges", v)} label="Proactive nudges" />
      </Row>
      <Row title="Schedule around my peak hours" desc="You score higher in the morning — bias checkpoints and hard modules earlier in the day.">
        <Switch id="morning" checked={prefs.morningBias} onChange={(v) => set("morningBias", v)} label="Peak-hour scheduling" />
      </Row>
      <Row title="Ground answers in my history" desc="Every mentor answer cites your projects, scores, and past mistakes. Turning this off gives generic answers.">
        <Switch id="grounded" checked={prefs.grounded} onChange={(v) => set("grounded", v)} label="Grounded answers" />
      </Row>
      <Row title="Auto-add drills from mistakes" desc="When a project review finds a recurring miss, the mentor adds a targeted drill to your active module.">
        <Switch id="drills" checked={prefs.autoDrills} onChange={(v) => set("autoDrills", v)} label="Auto-add drills" />
      </Row>
      <Row title="Difficulty" desc="How aggressively the path stretches you beyond your current level." last>
        <Segmented options={[{ id: "gentle", label: "Gentle" }, { id: "adaptive", label: "Adaptive" }, { id: "hard", label: "Hard" }]} value={prefs.difficulty} onChange={(v) => set("difficulty", v)} />
      </Row>
    </Section>
  );
}

function CoachSettingsSection() {
  const CS = window.TRACK.coachSettings;
  const [s, setS] = useStateSet({ mode: CS.mode, model: CS.model, cap: CS.dailyCostCapUsd, zdr: CS.zdr, dims: { ...CS.dimsEnabled } });
  const set = (k, v) => setS((p) => ({ ...p, [k]: v }));
  const capPct = Math.min(100, Math.round((CS.spentTodayUsd / s.cap) * 100));
  const maxCost = Math.max(...CS.costLast14);
  const DIMS = [
    { id: "carrera", label: "Career" }, { id: "finanzas", label: "Income" },
    { id: "habitos", label: "Deep-work habit" }, { id: "mental", label: "Energy & focus" },
  ];
  return (
    <>
      {/* Cost — gate before any LLM call, migrated from lib/coach/costApi */}
      <Section title="LLM cost" sub="Every coach run is gated against your daily cap before it calls the model. Server-side, never the client." icon={I.coins}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--s-4)", padding: "var(--s-4) 0", borderBottom: "1px solid var(--border-subtle)" }}>
          <div><div className="stat-label">Spent today</div><div className="stat-val" style={{ fontSize: "var(--fs-2xl)" }}>${CS.spentTodayUsd.toFixed(2)}</div><div style={{ marginTop: 8 }}><Progress value={capPct} tone={capPct > 80 ? "danger" : "primary"} /></div><div style={{ fontSize: "var(--fs-xs)", color: "var(--text-muted)", marginTop: 5 }}>{capPct}% of ${s.cap.toFixed(2)} daily cap</div></div>
          <div><div className="stat-label">Spent this month</div><div className="stat-val" style={{ fontSize: "var(--fs-2xl)" }}>${CS.spentMonthUsd.toFixed(2)}</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 36, marginTop: 10 }}>
              {CS.costLast14.map((c, i) => <span key={i} title={"$" + c.toFixed(2)} style={{ flex: 1, height: Math.max(3, (c / maxCost) * 36), background: c > s.cap ? "var(--danger)" : "var(--primary)", borderRadius: 2, opacity: 0.85 }} />)}
            </div><div style={{ fontSize: "var(--fs-xs)", color: "var(--text-muted)", marginTop: 5 }}>Daily cost · last 14 days</div></div>
        </div>
        <Row title="Daily cost cap" desc="When today's spend hits this, the coach falls back to deterministic templates instead of calling the LLM." last>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--s-3)", width: 220 }}>
            <input type="range" min="0.1" max="2" step="0.1" value={s.cap} onChange={(e) => set("cap", +e.target.value)} style={{ flex: 1, accentColor: "var(--primary)" }} />
            <span className="mono" style={{ fontSize: "var(--fs-base)", fontWeight: "var(--fw-semibold)", minWidth: 48, textAlign: "right" }}>${s.cap.toFixed(2)}</span>
          </div>
        </Row>
      </Section>

      <Section title="Coach behaviour" sub="How often the coach runs, which model it uses, and how honest it stays" icon={I.bolt}>
        <Row title="Coach mode" desc="How proactively the coach invokes the LLM. Minimal = deterministic rules only; Proactive = richest, costs more.">
          <Segmented options={[{ id: "minimal", label: "Minimal" }, { id: "balanced", label: "Balanced" }, { id: "proactive", label: "Proactive" }]} value={s.mode} onChange={(v) => set("mode", v)} />
        </Row>
        <Row title="Model" desc="Haiku is cheapest and fastest; Opus is the most capable. Sonnet is the balanced default.">
          <Segmented options={[{ id: "haiku", label: "Haiku" }, { id: "sonnet", label: "Sonnet" }, { id: "opus", label: "Opus" }]} value={s.model} onChange={(v) => set("model", v)} />
        </Row>
        <Row title="Anti-sycophancy score" desc="Correlation between your 👍/👎 and the real change in your gaps. Positive means the coach is being honest, not flattering.">
          <Badge tone={CS.antiSycophancy > 0 ? "success" : "danger"} dot>+{CS.antiSycophancy.toFixed(2)}</Badge>
        </Row>
        <Row title="Zero data retention (ZDR)" desc="Send no prompt or completion to logs or model-training. Slightly fewer grounded references in exchange for maximum privacy." last>
          <Switch id="zdr" checked={s.zdr} onChange={(v) => set("zdr", v)} label="Zero data retention" />
        </Row>
      </Section>

      <Section title="Coach by dimension" sub="Turn the coach on or off per dimension. Off dimensions are still tracked — just not coached." icon={I.layers}>
        {DIMS.map((d, i) => (
          <Row key={d.id} title={d.label} desc={s.dims[d.id] ? "Coached — nudges, wins, and gap alerts on." : "Tracked only — no coach messages."} last={i === DIMS.length - 1}>
            <Switch id={"dim-" + d.id} checked={s.dims[d.id]} onChange={(v) => set("dims", { ...s.dims, [d.id]: v })} label={d.label} />
          </Row>
        ))}
      </Section>
    </>
  );
}

function NotifSection({ prefs, set }) {
  const items = [
    { k: "nReview", title: "Project reviews", desc: "When the mentor finishes grading a submission." },
    { k: "nSteps", title: "Path changes", desc: "When the mentor adds or reorders something on your path." },
    { k: "nCheckpoint", title: "Checkpoints", desc: "Upcoming assessments and gates, 48h ahead." },
    { k: "nStreak", title: "Streak reminders", desc: "A nudge when your daily streak is at risk." },
    { k: "nWeekly", title: "Weekly summary", desc: "A Monday digest of progress against your goal." },
  ];
  return (
    <Section title="Notifications" sub="What MentorOS pings you about. Channels apply to email and in-app." icon={I.bell}>
      {items.map((it, i) => (
        <Row key={it.k} title={it.title} desc={it.desc} last={i === items.length - 1}>
          <Switch id={it.k} checked={prefs[it.k]} onChange={(v) => set(it.k, v)} label={it.title} />
        </Row>
      ))}
    </Section>
  );
}

function AppearanceSection({ theme, setTheme, prefs, set }) {
  return (
    <Section title="Appearance" sub="Theme and density. Applies immediately." icon={I.eye}>
      <Row title="Theme" desc="MentorOS defaults to light during work hours.">
        <Segmented options={[{ id: "light", label: "Light", icon: I.sun }, { id: "dark", label: "Dark", icon: I.moon }]} value={theme} onChange={setTheme} />
      </Row>
      <Row title="Density" desc="Comfortable suits reading; compact fits more on screen." last>
        <Segmented options={[{ id: "comfortable", label: "Comfortable" }, { id: "compact", label: "Compact" }]} value={prefs.density} onChange={(v) => set("density", v)} />
      </Row>
    </Section>
  );
}

function AccountSection({ L }) {
  return (
    <>
      <Section title="Plan & billing" sub="Your subscription and usage" icon={I.shield}
        footer={<Button variant="secondary" size="sm" icon={I.external}>Manage billing</Button>}>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--s-4)", padding: "var(--s-4) 0", borderBottom: "1px solid var(--border-subtle)" }}>
          <span style={{ width: 40, height: 40, borderRadius: "var(--r-md)", background: "var(--primary-soft)", color: "var(--primary-soft-text)", display: "grid", placeItems: "center", flex: "none" }}><I.bolt size={20} /></span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "var(--fs-base)", fontWeight: "var(--fw-semibold)", display: "flex", alignItems: "center", gap: 8 }}>{L.plan} plan <Badge tone="success" dot>active</Badge></div>
            <div style={{ fontSize: "var(--fs-sm)", color: "var(--text-muted)" }}>Unlimited mentor, project reviews, and re-planning · renews 14 Jul 2026</div>
          </div>
          <Button variant="ghost" size="sm">Change plan</Button>
        </div>
        <Row title="Data export" desc="Download your full skill model, project history, and mentor transcripts." last>
          <Button variant="secondary" size="sm" icon={I.download}>Export data</Button>
        </Row>
      </Section>
      <Card>
        <CardHead title="Danger zone" icon={I.alert} />
        <div style={{ padding: "var(--s-2) var(--s-5) var(--s-4)" }}>
          <Row title="Reset skill model" desc="Clears all scores and re-runs the initial assessment. Your projects are kept.">
            <Button variant="secondary" size="sm" icon={I.refresh}>Reset model</Button>
          </Row>
          <Row title="Delete account" desc="Permanently removes your data. This cannot be undone." last>
            <Button variant="danger" size="sm">Delete account</Button>
          </Row>
        </div>
      </Card>
    </>
  );
}

Object.assign(window, { Settings });
