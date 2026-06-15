/* MentorOS — Design Process. An editorial case study: the thinking behind the
 * product, written by its designer. Reached from "See my design process". */
function DesignProcess({ navigate }) {
  return (
    <div className="anim-fade-in" style={{ overflowX: "hidden" }}>
      {/* Back bar */}
      <div style={{ maxWidth: 940, margin: "0 auto", padding: "var(--s-6) var(--s-8) 0" }}>
        <button className="btn btn-ghost btn-sm" onClick={() => navigate("dashboard")} style={{ paddingLeft: 6 }}><I.chevronLeft size={15} />Back to dashboard</button>
      </div>

      {/* Hero */}
      <header style={{ maxWidth: 940, margin: "0 auto", padding: "var(--s-8) var(--s-8) var(--s-12)" }}>
        <div className="eyebrow" style={{ marginBottom: "var(--s-5)" }}>Case study · Product design · 2026</div>
        <h1 style={{ margin: 0, fontSize: "var(--fs-4xl)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--tracking-tight)", lineHeight: 1.04, textWrap: "balance", maxWidth: "18ch" }}>
          Designing a learning OS that decides, not just displays.
        </h1>
        <p style={{ margin: "var(--s-6) 0 0", fontSize: "var(--fs-xl)", color: "var(--text-secondary)", lineHeight: "var(--lh-normal)", maxWidth: "60ch", fontWeight: "var(--fw-regular)" }}>
          MentorOS is an AI-native platform for professionals mastering hard skills. The design problem wasn't showing more data — it was earning enough trust to tell someone the single next thing worth doing.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--s-8)", marginTop: "var(--s-8)", paddingTop: "var(--s-6)", borderTop: "1px solid var(--border)" }}>
          <Meta label="Role" value="Product design, end to end" />
          <Meta label="Surface" value="Web app · light-first" />
          <Meta label="Timeframe" value="6 weeks, 0→1" />
          <Meta label="Stack" value="React · design tokens" />
        </div>
      </header>

      {/* Problem */}
      <Block n="01" kicker="The problem">
        <P lead>Skill platforms are good at content and bad at judgment. They hand you a catalogue, a progress bar, and a streak — then leave the hardest question, <Em>"what should I actually do right now?"</Em>, entirely to you.</P>
        <P>For someone with six focused hours a week, that ambiguity is the product's biggest failure. Completion isn't mastery. A finished course doesn't mean you can ship. And a generic chatbot bolted onto a course library doesn't know what you got wrong last Tuesday.</P>
        <Pull>The job wasn't a prettier dashboard. It was a system confident enough to make a recommendation — and honest enough to show its work.</Pull>
      </Block>

      {/* Principles */}
      <Block n="02" kicker="Design principles" tint>
        <P lead>Four principles held every screen to the same standard.</P>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--s-4)", marginTop: "var(--s-6)" }}>
          <Principle icon={I.target} title="Decide, then explain" body="Every surface leads with one recommended action, never a wall of equal options. The reasoning sits one line below — never hidden, never the headline." />
          <Principle icon={I.link} title="Grounded or silent" body="The mentor cites the learner's real projects, scores, and mistakes. If it can't ground a claim, it says so. No confident hallucinations." />
          <Principle icon={I.rocket} title="Mastery is shipped work" body="Progress bars measure motion; projects measure ability. The model's confidence moves on graded, versioned work — not minutes watched." />
          <Principle icon={I.gauge} title="Forecasts wear a label" body="Anything projected — completion dates, mastery curves — is visually distinct from what's measured. Dashed, not solid. Confidence shown." />
        </div>
      </Block>

      {/* Decisions */}
      <Block n="03" kicker="Key decisions">
        <Decision title="A decision surface, not a dashboard"
          before="A KPI grid where every tile competes for attention and nothing tells you where to start."
          after="The dashboard opens with one 'next best action' card — the exercise that unblocks the most downstream work — with its rationale and an override link. Metrics support the decision; they don't replace it.">
          The first thing you read is a sentence, not a number. KPIs moved to a quiet strip above the fold; the hero is the recommendation and why it was made.
        </Decision>

        <Decision title="The skill graph is the source of truth"
          before="A flat list of courses with percentages, hiding the fact that skills depend on each other."
          after="A dependency DAG, coloured by mastery, that makes gaps and unlocks legible at a glance. The path is generated from it; the mentor reasons over it.">
          Modelling skills as a graph let every other surface borrow the same logic: the path explains itself ("this unlocks four downstream skills"), and weak nodes become obvious focus areas.
        </Decision>

        <Decision title="One AI, always in context"
          before="A generic assistant that answers from training data and forgets you between sessions."
          after="A mentor pane with a persistent context rail — goal, current focus, recent mistakes, recent projects — visible beside every answer, with citations and a confidence meter on each reply.">
          Showing the context the AI is reasoning over is itself the trust mechanism. You can see why it said what it said, and it can take action — adding a drill straight to your active module.
        </Decision>
      </Block>

      {/* The system */}
      <Block n="04" kicker="The system" tint>
        <P lead>A restrained token system did the heavy lifting — warm orange as punctuation, never decoration.</P>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "var(--s-4)", marginTop: "var(--s-6)" }}>
          <SysCard title="Colour">
            <div style={{ display: "flex", gap: 8, marginBottom: "var(--s-3)" }}>
              {["var(--primary)", "var(--brand-secondary)", "var(--success)", "var(--info)", "var(--warning)", "var(--m-gap)"].map((c, i) => <span key={i} style={{ width: 28, height: 28, borderRadius: "var(--r-sm)", background: c, border: "1px solid var(--border)" }} />)}
            </div>
            <P small>One accent, one ink, and a sacred risk scale. Status colour always mirrors meaning — never reassigned.</P>
          </SysCard>
          <SysCard title="Type">
            <div style={{ lineHeight: 1.1, marginBottom: "var(--s-3)" }}>
              <div style={{ fontSize: 30, fontWeight: "var(--fw-bold)", letterSpacing: "var(--tracking-tight)" }}>Aa</div>
              <div className="mono" style={{ fontSize: "var(--fs-sm)", color: "var(--text-muted)", marginTop: 4 }}>Inter · JetBrains Mono</div>
            </div>
            <P small>Tight display sans for confidence; mono for every metric and timestamp, so data reads as data.</P>
          </SysCard>
          <SysCard title="Components">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: "var(--s-3)" }}>
              <Badge tone="success" dot>Mastered</Badge><Badge tone="developing" dot>Developing</Badge><Confidence level="high" showLabel={false} />
            </div>
            <P small>Mastery badges, confidence meters, and a tinted "AI surface" mark anything the model authored.</P>
          </SysCard>
        </div>
      </Block>

      {/* Outcome + byline */}
      <Block n="05" kicker="Where it lands">
        <P lead>The result is a product that feels like a NOC for your own growth: calm, legible, and opinionated where it counts.</P>
        <P>Every screen can answer "what now, and why?" without you digging. The AI is useful because it's grounded, and trustworthy because it's honest about its limits. That combination — decisive but accountable — is the whole thesis.</P>

        <div style={{ display: "flex", alignItems: "center", gap: "var(--s-4)", marginTop: "var(--s-8)", padding: "var(--s-5)", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r-lg)" }}>
          <img src="assets/danilo.jpg" alt="Danilo Rojas" width="56" height="56" style={{ borderRadius: "50%", objectFit: "cover", flex: "none" }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: "var(--fs-base)", fontWeight: "var(--fw-semibold)" }}>Danilo Rojas</div>
            <div style={{ fontSize: "var(--fs-sm)", color: "var(--text-muted)" }}>Product designer · concept, system, and build</div>
          </div>
          <Button variant="primary" size="sm" iconRight={I.arrowRight} onClick={() => navigate("dashboard")}>Explore the product</Button>
        </div>
      </Block>

      <div style={{ height: "var(--s-16)" }} />
    </div>
  );
}

function Meta({ label, value }) {
  return (
    <div>
      <div className="eyebrow" style={{ marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: "var(--fs-base)", fontWeight: "var(--fw-medium)" }}>{value}</div>
    </div>
  );
}

function Block({ n, kicker, children, tint }) {
  return (
    <section style={{ background: tint ? "var(--surface-subtle)" : "transparent", borderTop: "1px solid var(--border-subtle)" }}>
      <div style={{ maxWidth: 940, margin: "0 auto", padding: "var(--s-12) var(--s-8)", display: "grid", gridTemplateColumns: "minmax(0,1fr)", gap: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--s-3)", marginBottom: "var(--s-6)" }}>
          <span className="mono" style={{ fontSize: "var(--fs-sm)", color: "var(--primary)", fontWeight: "var(--fw-semibold)" }}>{n}</span>
          <span style={{ flex: "none", width: 24, height: 1, background: "var(--border-strong)" }} />
          <span className="eyebrow">{kicker}</span>
        </div>
        {children}
      </div>
    </section>
  );
}

function P({ children, lead, small }) {
  return <p style={{ margin: "0 0 var(--s-4)", fontSize: lead ? "var(--fs-xl)" : small ? "var(--fs-sm)" : "var(--fs-lg)", color: lead ? "var(--text-primary)" : "var(--text-secondary)", lineHeight: "var(--lh-normal)", maxWidth: small ? "none" : "62ch", fontWeight: lead ? "var(--fw-medium)" : "var(--fw-regular)" }}>{children}</p>;
}
function Em({ children }) { return <em style={{ color: "var(--text-primary)", fontStyle: "italic" }}>{children}</em>; }

function Pull({ children }) {
  return <blockquote style={{ margin: "var(--s-6) 0 0", padding: "var(--s-4) var(--s-6)", borderLeft: "2px solid var(--primary)", fontSize: "var(--fs-2xl)", fontWeight: "var(--fw-medium)", letterSpacing: "var(--tracking-tight)", lineHeight: 1.3, color: "var(--text-primary)", textWrap: "balance", maxWidth: "26ch" }}>{children}</blockquote>;
}

function Principle({ icon, title, body }) {
  const Ic = icon;
  return (
    <div className="card card-pad">
      <span style={{ width: 36, height: 36, borderRadius: "var(--r-md)", background: "var(--primary-soft)", color: "var(--primary-soft-text)", display: "grid", placeItems: "center", marginBottom: "var(--s-3)" }}><Ic size={18} /></span>
      <h3 style={{ margin: "0 0 6px", fontSize: "var(--fs-lg)", fontWeight: "var(--fw-semibold)", letterSpacing: "var(--tracking-base)" }}>{title}</h3>
      <p style={{ margin: 0, fontSize: "var(--fs-base)", color: "var(--text-secondary)", lineHeight: "var(--lh-normal)" }}>{body}</p>
    </div>
  );
}

function Decision({ title, before, after, children }) {
  return (
    <div style={{ marginBottom: "var(--s-8)" }}>
      <h3 style={{ margin: "0 0 var(--s-3)", fontSize: "var(--fs-2xl)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--tracking-tight)", lineHeight: 1.15 }}>{title}</h3>
      <p style={{ margin: "0 0 var(--s-5)", fontSize: "var(--fs-lg)", color: "var(--text-secondary)", lineHeight: "var(--lh-normal)", maxWidth: "62ch" }}>{children}</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--s-4)" }}>
        <BeforeAfter kind="before" text={before} />
        <BeforeAfter kind="after" text={after} />
      </div>
    </div>
  );
}
function BeforeAfter({ kind, text }) {
  const isAfter = kind === "after";
  return (
    <div className="card" style={{ padding: "var(--s-4)", boxShadow: "none", borderColor: isAfter ? "color-mix(in oklab, var(--primary) 30%, var(--border))" : "var(--border)", background: isAfter ? "color-mix(in oklab, var(--primary) 4%, var(--surface))" : "var(--surface)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: "var(--s-2)" }}>
        <span style={{ color: isAfter ? "var(--primary-soft-text)" : "var(--text-muted)" }}>{isAfter ? <I.check size={15} /> : <I.x size={15} />}</span>
        <span className="eyebrow" style={{ color: isAfter ? "var(--primary-soft-text)" : "var(--text-muted)" }}>{isAfter ? "Shipped" : "Rejected"}</span>
      </div>
      <p style={{ margin: 0, fontSize: "var(--fs-base)", color: "var(--text-secondary)", lineHeight: "var(--lh-normal)" }}>{text}</p>
    </div>
  );
}

function SysCard({ title, children }) {
  return (
    <div className="card card-pad">
      <div className="eyebrow" style={{ marginBottom: "var(--s-3)" }}>{title}</div>
      {children}
    </div>
  );
}

Object.assign(window, { DesignProcess });
