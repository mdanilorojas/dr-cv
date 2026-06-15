/* MentorOS — Diagnostic. The 95-question exam is the spine of the whole system:
 * every question maps to a skill, pass/fail sets that skill's level, levels are
 * priced in $ toward the goal, and re-taking after study levels skills up — the
 * "chips" that fill in poco a poco. */
const { useState: useStateAss, useMemo: useMemoAss } = React;

const DLEVEL_COLOR = {
  mastered: "var(--m-mastered)", proficient: "var(--m-proficient)",
  developing: "var(--m-developing)", novice: "var(--m-novice)", gap: "var(--m-gap)",
};
const DLEVEL_BG = {
  mastered: "var(--m-mastered-bg)", proficient: "var(--m-proficient-bg)",
  developing: "var(--m-developing-bg)", novice: "var(--m-novice-bg)", gap: "var(--m-gap-bg)",
};
function usd(n) { return "$" + Math.round(n).toLocaleString("en-US"); }
function usdK(n) { return "$" + Math.round(n / 1000) + "k"; }

function Diagnostic({ navigate }) {
  const d = window.DATA;
  const { skills, assessment: A, skillBanked, skillUpside, learner: L } = d;

  const totals = useMemoAss(() => {
    let passed = 0, failed = 0, untested = 0, banked = 0, upside = 0;
    skills.forEach((s) => {
      passed += s.q.passed; failed += s.q.failed; untested += s.q.untested;
      banked += skillBanked(s); upside += skillUpside(s);
    });
    const graded = passed + failed;
    const leveled = skills.filter((s) => s.q.untested === 0).length;
    return { passed, failed, untested, graded, banked, upside, leveled };
  }, [skills]);

  return (
    <div className="page anim-fade-in">
      <div className="page-head">
        <div>
          <div className="eyebrow" style={{ marginBottom: 8 }}>Skill diagnostic · 95 prose questions · last run {A.lastRun}</div>
          <h1 className="page-title">Diagnostic</h1>
          <p className="page-desc">
            95 questions you answer <strong style={{ color: "var(--text-primary)", fontWeight: "var(--fw-medium)" }}>in your own words</strong> — Claude scores each on substance, structure, English and concision. Your scores set each skill's level, and every level is worth real money toward <strong style={{ color: "var(--text-primary)", fontWeight: "var(--fw-medium)" }}>{L.objective.toLowerCase()}</strong>. Study, then re-answer to level up.
          </p>
        </div>
        <div style={{ display: "flex", gap: "var(--s-2)", flex: "none" }}>
          <Button variant="secondary" size="sm" icon={I.refresh}>Re-take full diagnostic</Button>
          <Button variant="primary" size="sm" iconRight={I.arrowRight} onClick={() => navigate("journey")}>Generate study program</Button>
        </div>      </div>

      {/* Status strip */}
      <div className="grid" style={{ gridTemplateColumns: "repeat(4, 1fr)", marginBottom: "var(--s-5)" }}>
        <DiagTile>
          <DiagStat label="Questions graded" value={`${totals.graded}`} sub={`of 95 · ${totals.untested} not yet attempted`} />
          <div style={{ marginTop: 12 }}>
            <div className="track" style={{ height: 7 }}>
              <div style={{ display: "flex", height: "100%", width: `${(totals.graded / 95) * 100}%` }}>
                <span style={{ flex: totals.passed, background: "var(--success)" }} />
                <span style={{ flex: totals.failed, background: "var(--m-gap)" }} />
              </div>
            </div>
            <div style={{ display: "flex", gap: 14, marginTop: 8, fontSize: "var(--fs-xs)", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><span style={{ width: 7, height: 7, borderRadius: 2, background: "var(--success)" }} />{totals.passed} passed</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><span style={{ width: 7, height: 7, borderRadius: 2, background: "var(--m-gap)" }} />{totals.failed} failed</span>
            </div>
          </div>
        </DiagTile>
        <DiagTile>
          <DiagStat label="Skills leveled" value={`${totals.leveled}`} sub={`of ${skills.length} · ${skills.length - totals.leveled} need more questions`} />
          <div style={{ display: "flex", gap: 3, marginTop: 14 }}>
            {skills.map((s) => (
              <Tooltip key={s.id} content={`${s.name} — ${s.level}`}>
                <span style={{ flex: 1, height: 6, borderRadius: 2, background: s.q.untested === 0 ? DLEVEL_COLOR[s.level] : "var(--surface-subtle)", opacity: s.q.untested === 0 ? 1 : 1 }} />
              </Tooltip>
            ))}
          </div>
        </DiagTile>
        <DiagTile>
          <DiagStat label="Value unlocked" value={usd(L.incomeBaseline + totals.banked)} sub={`market value from skills you've proven`} />
          <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: "var(--success)" }}><I.trending size={16} /></span>
            <span style={{ fontSize: "var(--fs-sm)", color: "var(--text-secondary)" }}>{usdK(totals.banked)} added by mastery so far</span>
          </div>
        </DiagTile>
        <DiagTile>
          <DiagStat label="Locked behind re-tests" value={usd(totals.upside)} sub="value waiting on failed & untested questions" />
          <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: "var(--warning)" }}><I.lock size={15} /></span>
            <span style={{ fontSize: "var(--fs-sm)", color: "var(--text-secondary)" }}>nearly all the gap to {usdK(L.incomeGoal)}</span>
          </div>
        </DiagTile>
      </div>

      {/* Body */}
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.5fr) minmax(0,1fr)", gap: "var(--s-5)", alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-5)" }}>
          <ExamRunner navigate={navigate} />
          <SkillOutcomes skills={skills} skillBanked={skillBanked} skillUpside={skillUpside} navigate={navigate} retakeReady={A.retakeReady} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-5)" }}>
          <ChipBoard skills={skills} />
          <ProgramCta totals={totals} L={L} navigate={navigate} />
        </div>
      </div>
    </div>
  );
}

/* ---- Interactive PROSE exam session ----
 * You answer in your own words. Claude (via window.claude.complete) scores each
 * answer on four dimensions — Substance, Structure, English, Concision — so the
 * diagnostic measures not just whether you're right, but how you communicate.
 * Falls back to a transparent heuristic if the model API isn't reachable. */
function ExamRunner({ navigate }) {
  const { assessment: A, skills, RUBRIC_DIMS } = window.DATA;
  const qs = A.questions;
  const byId = useMemoAss(() => Object.fromEntries(skills.map((s) => [s.id, s])), [skills]);
  const [i, setI] = useStateAss(0);
  const [text, setText] = useStateAss("");
  const [phase, setPhase] = useStateAss("answer"); // answer | scoring | scored
  const [result, setResult] = useStateAss(null);
  const [showModel, setShowModel] = useStateAss(false);
  const [runScore, setRunScore] = useStateAss({ sum: 0, done: 0, passed: 0 });
  const done = i >= qs.length;
  const q = qs[i];

  async function score() {
    if (!text.trim() || phase === "scoring") return;
    setPhase("scoring");
    const skill = byId[q.skill];
    const dims = RUBRIC_DIMS.map((d) => `"${d.id}" (${d.label}: ${d.desc})`).join(", ");
    const prompt =
`You are a senior hiring panel grading a Product Designer's spoken-style answer to a skills-diagnostic question. Be exacting but fair.

QUESTION (skill: ${skill.name}, difficulty: ${q.difficulty}):
${q.prompt}

WHAT A STRONG ANSWER HITS:
- ${q.cues.join("\n- ")}

MODEL ANSWER (for your reference only — do not require identical wording):
${q.model}

CANDIDATE'S ANSWER:
"""${text.trim()}"""

Score each dimension 0-100: ${dims}.
Then give "overall" 0-100 as the weighted blend (Substance .45, Structure .20, English .20, Concision .15).
Also return "verdict" ("pass" if overall>=70 else "fail"), a one-sentence "feedback" naming the single highest-leverage improvement, and a short "diction" note on English/phrasing (tone, grammar, naturalness for a US/EU room).
Return ONLY strict minified JSON: {"substance":n,"structure":n,"english":n,"concision":n,"overall":n,"verdict":"pass|fail","feedback":"...","diction":"..."}`;

    let r = null;
    try {
      if (window.claude && window.claude.complete) {
        const raw = await window.claude.complete(prompt);
        const m = String(raw).match(/\{[\s\S]*\}/);
        if (m) r = JSON.parse(m[0]);
      }
    } catch (e) { r = null; }
    if (!r) r = heuristicScore(text, q);

    const overall = Math.max(0, Math.min(100, Math.round(r.overall ?? 0)));
    const passed = overall >= (A.passThreshold || 70);
    setResult({ ...r, overall, passed });
    setRunScore((s) => ({ sum: s.sum + overall, done: s.done + 1, passed: s.passed + (passed ? 1 : 0) }));
    setPhase("scored");
  }

  const next = () => { setI(i + 1); setText(""); setPhase("answer"); setResult(null); setShowModel(false); };
  const restart = () => { setI(0); setText(""); setPhase("answer"); setResult(null); setShowModel(false); setRunScore({ sum: 0, done: 0, passed: 0 }); };

  if (done) {
    const avg = runScore.done ? Math.round(runScore.sum / runScore.done) : 0;
    return (
      <Card>
        <CardHead title="Diagnostic session" sub={A.scoredBy} icon={I.diagnostic} />
        <div style={{ padding: "var(--s-6) var(--s-5)", textAlign: "center" }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--success-soft)", color: "var(--success)", display: "grid", placeItems: "center", margin: "0 auto var(--s-4)" }}><I.checkCircle size={26} /></div>
          <h3 style={{ margin: "0 0 6px", fontSize: "var(--fs-xl)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--tracking-tight)" }}>Session scored — {avg}/100 average · {runScore.passed} of {runScore.done} passed</h3>
          <p style={{ margin: "0 auto var(--s-5)", maxWidth: "54ch", color: "var(--text-secondary)", fontSize: "var(--fs-base)", lineHeight: "var(--lh-normal)" }}>
            Each answer was scored on substance, structure, English and concision — and rolled into your levels. Answers below the bar become targeted drills in your study program; re-answer after studying to level the skill up.
          </p>
          <div style={{ display: "flex", gap: "var(--s-2)", justifyContent: "center" }}>
            <Button variant="secondary" size="sm" icon={I.refresh} onClick={restart}>Run again</Button>
            <Button variant="primary" size="sm" iconRight={I.arrowRight} onClick={() => navigate("journey")}>Build my program</Button>
          </div>
        </div>
      </Card>
    );
  }

  const skill = byId[q.skill];
  const scoring = phase === "scoring";
  const scored = phase === "scored";
  return (
    <Card>
      <CardHead title="Diagnostic session" sub={A.scoredBy} icon={I.diagnostic}
        action={<Badge mono tone="primary">{i + 1} / {qs.length}</Badge>} />
      <div style={{ padding: "var(--s-5)" }}>
        {/* progress dots */}
        <div style={{ display: "flex", gap: 5, marginBottom: "var(--s-4)" }}>
          {qs.map((_, k) => (
            <span key={k} style={{ flex: 1, height: 4, borderRadius: 2, background: k < i ? "var(--success)" : k === i ? "var(--primary)" : "var(--surface-subtle)" }} />
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "var(--s-2)", marginBottom: "var(--s-3)" }}>
          <span style={{ width: 26, height: 26, borderRadius: "var(--r-sm)", background: DLEVEL_BG[skill.level], color: DLEVEL_COLOR[skill.level], display: "grid", placeItems: "center", flex: "none" }}><I.chip size={15} /></span>
          <span style={{ fontSize: "var(--fs-sm)", color: "var(--text-secondary)" }}>Maps to <strong style={{ color: "var(--text-primary)", fontWeight: "var(--fw-medium)" }}>{skill.name}</strong></span>
          <Badge mono tone="neutral" style={{ marginLeft: "auto" }}>{q.difficulty}</Badge>
          <Badge mono tone="accent">+{usdK(window.DATA.skillUpside(skill))} upside</Badge>
        </div>

        <h3 style={{ margin: "0 0 var(--s-3)", fontSize: "var(--fs-lg)", fontWeight: "var(--fw-semibold)", lineHeight: "var(--lh-snug)", letterSpacing: "var(--tracking-base)" }}>{q.prompt}</h3>

        {/* prose answer field */}
        <textarea
          className="textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={scoring || scored}
          placeholder="Answer in your own words, the way you'd say it in an interview. The grader reads for substance, structure, English and concision."
          style={{ minHeight: 132, fontFamily: "var(--font-sans)", fontSize: "var(--fs-base)", lineHeight: "var(--lh-normal)" }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: "var(--s-3)", marginTop: 6 }}>
          <span style={{ fontSize: "var(--fs-xs)", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{text.trim() ? text.trim().split(/\s+/).length : 0} words</span>
          <span className="ai-tag" style={{ marginLeft: "auto", fontSize: "var(--fs-xs)" }}><I.sparkle /> Scored by Claude</span>
        </div>

        {/* score result */}
        {scored && result && (
          <div className="anim-fade-up" style={{ marginTop: "var(--s-4)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--s-3)", padding: "var(--s-3) var(--s-4)", borderRadius: "var(--r-md)", background: result.passed ? "var(--success-soft)" : "var(--m-gap-bg)", marginBottom: "var(--s-3)" }}>
              <span style={{ fontSize: "var(--fs-3xl)", fontWeight: "var(--fw-bold)", fontVariantNumeric: "tabular-nums", color: result.passed ? "var(--success-text)" : "var(--danger-text)", lineHeight: 1 }}>{result.overall}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: "var(--fs-sm)", fontWeight: "var(--fw-semibold)", color: result.passed ? "var(--success-text)" : "var(--danger-text)" }}>
                  {result.passed ? `Pass — counts toward leveling up ${skill.name}` : "Below the bar — this becomes a drill in your program"}
                </div>
                <div style={{ fontSize: "var(--fs-sm)", color: "var(--text-secondary)", lineHeight: "var(--lh-normal)", marginTop: 2 }}>{result.feedback}</div>
              </div>
            </div>
            {/* four dimensions */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--s-2) var(--s-4)", marginBottom: "var(--s-3)" }}>
              {RUBRIC_DIMS.map((d) => {
                const v = Math.max(0, Math.min(100, Math.round(result[d.id] ?? 0)));
                const c = v >= 80 ? "var(--success)" : v >= 60 ? "var(--warning)" : "var(--m-gap)";
                return (
                  <div key={d.id}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--fs-xs)", marginBottom: 4 }}>
                      <span style={{ color: "var(--text-secondary)", fontWeight: "var(--fw-medium)" }}>{d.label}</span>
                      <span style={{ fontFamily: "var(--font-mono)", color: c, fontWeight: "var(--fw-semibold)" }}>{v}</span>
                    </div>
                    <div className="track" style={{ height: 5 }}><div className="fill" style={{ width: `${v}%`, background: c }} /></div>
                  </div>
                );
              })}
            </div>
            {result.diction && (
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start", padding: "var(--s-3) var(--s-4)", borderRadius: "var(--r-md)", background: "var(--info-soft)", marginBottom: "var(--s-2)" }}>
                <span style={{ color: "var(--info)", flex: "none", marginTop: 1 }}><I.mentor size={15} /></span>
                <div style={{ fontSize: "var(--fs-sm)", color: "var(--text-secondary)", lineHeight: "var(--lh-normal)" }}><strong style={{ color: "var(--info-text)", fontWeight: "var(--fw-semibold)" }}>English & diction · </strong>{result.diction}</div>
              </div>
            )}
            <button onClick={() => setShowModel((v) => !v)} style={{ all: "unset", cursor: "pointer", fontSize: "var(--fs-sm)", color: "var(--primary-soft-text)", fontWeight: "var(--fw-medium)", display: "inline-flex", alignItems: "center", gap: 5 }}>
              <I.chevronRight size={13} style={{ transform: showModel ? "rotate(90deg)" : "none", transition: "transform var(--dur-fast)" }} />{showModel ? "Hide" : "Compare with a model answer"}
            </button>
            {showModel && (
              <div className="anim-fade-up" style={{ marginTop: "var(--s-2)", padding: "var(--s-3) var(--s-4)", borderRadius: "var(--r-md)", background: "var(--surface-subtle)", border: "1px solid var(--border-subtle)", fontSize: "var(--fs-sm)", color: "var(--text-secondary)", lineHeight: "var(--lh-normal)" }}>{q.model}</div>
            )}
          </div>
        )}

        <div style={{ marginTop: "var(--s-4)", display: "flex", alignItems: "center", gap: "var(--s-3)" }}>
          {!scored
            ? <Button variant="primary" size="sm" onClick={score} disabled={!text.trim() || scoring} iconRight={scoring ? undefined : I.sparkle}>{scoring ? "Scoring your answer…" : "Submit for scoring"}</Button>
            : <Button variant="primary" size="sm" onClick={next} iconRight={I.arrowRight}>{i + 1 < qs.length ? "Next question" : "Finish session"}</Button>}
          <span style={{ marginLeft: "auto", fontSize: "var(--fs-sm)", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{runScore.done ? `${Math.round(runScore.sum / runScore.done)} avg · ${runScore.passed}/${runScore.done} passed` : "no answers yet"}</span>
        </div>
      </div>
    </Card>
  );
}

/* Transparent fallback when the model API isn't reachable (offline preview).
 * Rewards length-appropriateness + hitting the cue keywords — never random. */
function heuristicScore(text, q) {
  const t = text.toLowerCase();
  const words = text.trim().split(/\s+/).length;
  const cueHits = q.cues.reduce((n, c) => {
    const keys = c.toLowerCase().match(/[a-z]{5,}/g) || [];
    const hit = keys.some((k) => t.includes(k.slice(0, 5)));
    return n + (hit ? 1 : 0);
  }, 0);
  const cueRatio = q.cues.length ? cueHits / q.cues.length : 0.5;
  const substance = Math.round(40 + cueRatio * 55);
  const structure = Math.round(words >= 35 && /because|so |first|then|trade/i.test(text) ? 82 : 58);
  const english = Math.round(words >= 20 ? 80 : 62);
  const concision = Math.round(words > 140 ? 55 : words < 18 ? 60 : 86);
  const overall = Math.round(substance * 0.45 + structure * 0.20 + english * 0.20 + concision * 0.15);
  return {
    substance, structure, english, concision, overall,
    verdict: overall >= 70 ? "pass" : "fail",
    feedback: cueRatio < 0.6 ? "Name the core mechanism explicitly and lead with your first action." : "Solid — tighten the opening and state the trade-off you're making.",
    diction: "Offline estimate — connect the model API for a real read on phrasing and fluency.",
  };
}

/* ---- Per-skill outcomes: questions -> level -> $ ---- */
function SkillOutcomes({ skills, skillBanked, skillUpside, navigate, retakeReady }) {
  const sorted = useMemoAss(() => [...skills].sort((a, b) => skillUpside(b) - skillUpside(a)), [skills]);
  return (
    <Card>
      <CardHead title="What each skill is worth" sub="Questions set the level · the level sets the money · sorted by upside left" icon={I.coins} />
      <div>
        {sorted.map((s, idx) => {
          const total = s.q.passed + s.q.failed + s.q.untested;
          const canRetake = retakeReady.includes(s.id) || s.q.failed > 0 || s.q.untested > 0;
          const upside = skillUpside(s);
          return (
            <div key={s.id} style={{ display: "flex", alignItems: "center", gap: "var(--s-4)", padding: "var(--s-4) var(--s-5)", borderTop: idx ? "1px solid var(--border-subtle)" : "none" }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "var(--s-3)", marginBottom: 8, flexWrap: "wrap" }}>
                  <span style={{ fontSize: "var(--fs-base)", fontWeight: "var(--fw-semibold)" }}>{s.name}</span>
                  <MasteryBadge level={s.level} />
                  <span style={{ fontSize: "var(--fs-xs)", fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>{s.q.passed}/{total} passed</span>
                </div>
                {/* question segments */}
                <div style={{ display: "flex", gap: 3, maxWidth: 360 }}>
                  {Array.from({ length: s.q.passed }).map((_, k) => <span key={"p" + k} style={{ flex: 1, height: 7, borderRadius: 2, background: "var(--success)" }} />)}
                  {Array.from({ length: s.q.failed }).map((_, k) => <span key={"f" + k} style={{ flex: 1, height: 7, borderRadius: 2, background: "var(--m-gap)" }} />)}
                  {Array.from({ length: s.q.untested }).map((_, k) => <span key={"u" + k} style={{ flex: 1, height: 7, borderRadius: 2, background: "var(--surface-subtle)", border: "1px solid var(--border)" }} />)}
                </div>
              </div>
              <div style={{ textAlign: "right", flex: "none", width: 92 }}>
                <div style={{ fontSize: "var(--fs-base)", fontWeight: "var(--fw-bold)", fontVariantNumeric: "tabular-nums" }}>{usdK(skillBanked(s))}</div>
                <div style={{ fontSize: "var(--fs-xs)", color: upside > 0 ? "var(--accent-soft-text)" : "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{upside > 0 ? "+" + usdK(upside) + " left" : "maxed"}</div>
              </div>
              <div style={{ flex: "none", width: 116, textAlign: "right" }}>
                {canRetake
                  ? <Button variant={retakeReady.includes(s.id) ? "primary" : "secondary"} size="sm" iconRight={I.arrowRight} onClick={() => navigate("journey")}>Level up</Button>
                  : <span style={{ fontSize: "var(--fs-sm)", color: "var(--success)", display: "inline-flex", alignItems: "center", gap: 5 }}><I.checkCircle size={14} />Maxed</span>}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

/* ---- Chip board: skills filling in poco a poco ---- */
function ChipBoard({ skills }) {
  return (
    <Card>
      <CardHead title="Your skill chips" sub="Each chip fills as you pass its questions" icon={I.chip} />
      <div style={{ padding: "var(--s-4)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--s-3)" }}>
        {skills.map((s) => <SkillChip key={s.id} s={s} />)}
      </div>
      <div style={{ padding: "var(--s-3) var(--s-5)", borderTop: "1px solid var(--border-subtle)", display: "flex", flexWrap: "wrap", gap: "var(--s-3)" }}>
        {Object.entries({ mastered: "Mastered", proficient: "Proficient", developing: "Developing", novice: "Novice", gap: "Gap" }).map(([k, label]) => (
          <span key={k} style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: "var(--fs-xs)", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, background: DLEVEL_COLOR[k] }} />{label}
          </span>
        ))}
      </div>
    </Card>
  );
}

function SkillChip({ s }) {
  const c = DLEVEL_COLOR[s.level];
  const filled = s.level === "mastered";
  const shortName = s.name.replace(" & vectors", "").replace("-augmented gen", "").replace(" & cost control", "").replace(" & adapters", "").replace(" & guardrails", "");
  return (
    <Tooltip content={`${s.name} · ${s.level} · ${usdK(window.DATA.skillBanked(s))} of ${usdK(s.value * 1000)}`}>
      <div style={{ position: "relative", border: `1.5px solid ${s.level === "gap" ? "var(--border)" : c}`, borderRadius: "var(--r-md)", padding: "10px 11px", background: filled ? DLEVEL_BG[s.level] : "var(--surface)", overflow: "hidden", minHeight: 64, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        {/* fill bar from the bottom = score */}
        <span style={{ position: "absolute", left: 0, bottom: 0, height: `${s.score}%`, width: 3, background: c, opacity: 0.9 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 8, height: 8, borderRadius: 2, background: c, flex: "none" }} />
          <span style={{ fontSize: "var(--fs-sm)", fontWeight: "var(--fw-semibold)", lineHeight: 1.15, letterSpacing: "var(--tracking-base)" }}>{shortName}</span>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 6 }}>
          <span style={{ fontSize: "var(--fs-xs)", fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>{s.q.passed}/{s.q.passed + s.q.failed + s.q.untested}</span>
          <span style={{ fontSize: "var(--fs-xs)", fontFamily: "var(--font-mono)", color: c, fontWeight: "var(--fw-semibold)" }}>{usdK(window.DATA.skillBanked(s))}</span>
        </div>
      </div>
    </Tooltip>
  );
}

/* ---- Study-program CTA ---- */
function ProgramCta({ totals, L, navigate }) {
  return (
    <div className="card ai-surface" style={{ padding: "var(--s-5)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--s-2)", marginBottom: "var(--s-3)" }}>
        <span className="ai-tag"><I.sparkle /> From results to a plan</span>
      </div>
      <p style={{ margin: "0 0 var(--s-4)", fontSize: "var(--fs-base)", color: "var(--text-primary)", lineHeight: "var(--lh-normal)" }}>
        Your failed and untested questions are worth <strong style={{ fontWeight: "var(--fw-semibold)" }}>{usd(totals.upside)}</strong> in locked market value. The program orders modules by the money each unlocks — retrieval and evaluation first, because they gate everything above.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-2)" }}>
        <Button variant="primary" size="sm" iconRight={I.arrowRight} onClick={() => navigate("journey")}>Generate study program</Button>
        <Button variant="ghost" size="sm" icon={I.graph} onClick={() => navigate("graph")}>See it on the skill graph</Button>
      </div>
    </div>
  );
}

function DiagTile({ children }) { return <div className="card" style={{ padding: "var(--s-4) var(--s-5)" }}>{children}</div>; }
function DiagStat({ label, value, sub }) {
  return (
    <div>
      <div className="stat-label">{label}</div>
      <div style={{ fontSize: "var(--fs-2xl)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--tracking-tight)", marginTop: 4, fontVariantNumeric: "tabular-nums" }}>{value}</div>
      {sub && <div style={{ fontSize: "var(--fs-sm)", color: "var(--text-muted)", marginTop: 3 }}>{sub}</div>}
    </div>
  );
}

Object.assign(window, { Diagnostic });
