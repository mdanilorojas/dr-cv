/* MentorOS — Reusable UI primitives. Exposed on window for cross-file use. */
const { useState, useEffect, useRef, useCallback, createContext, useContext } = React;

/* ---- Button ---- */
function Button({ variant = "secondary", size, icon, iconRight, children, className = "", ...rest }) {
  const cls = ["btn", `btn-${variant}`, size && `btn-${size}`, !children && "btn-icon", className].filter(Boolean).join(" ");
  const Ic = typeof icon === "function" ? icon : null;
  const IcR = typeof iconRight === "function" ? iconRight : null;
  return (
    <button className={cls} {...rest}>
      {Ic && <Ic />}{children}{IcR && <IcR />}
    </button>
  );
}

/* ---- Card ---- */
function Card({ children, className = "", pad = false, ai = false, as: Tag = "div", ...rest }) {
  return <Tag className={["card", ai && "ai-surface", pad && "card-pad", className].filter(Boolean).join(" ")} {...rest}>{children}</Tag>;
}
function CardHead({ title, sub, icon, action, children }) {
  const Ic = typeof icon === "function" ? icon : null;
  return (
    <div className="card-hd">
      <div style={{ display: "flex", gap: "var(--s-3)", alignItems: "flex-start", minWidth: 0 }}>
        {Ic && <span style={{ color: "var(--text-muted)", marginTop: 1 }}><Ic size={18} /></span>}
        <div style={{ minWidth: 0 }}>
          <h3 className="card-title">{title}</h3>
          {sub && <p className="card-sub">{sub}</p>}
          {children}
        </div>
      </div>
      {action}
    </div>
  );
}

/* ---- Badge ---- */
function Badge({ tone = "neutral", dot = false, mono = false, children, className = "", ...rest }) {
  return (
    <span className={["badge", mono && "badge-mono", `badge-${tone}`, className].filter(Boolean).join(" ")} {...rest}>
      {dot && <span className="dot" />}{children}
    </span>
  );
}

const STATUS = {
  mastered: { tone: "mastered", label: "Mastered" },
  proficient: { tone: "proficient", label: "Proficient" },
  developing: { tone: "developing", label: "Developing" },
  novice: { tone: "novice", label: "Novice" },
  gap: { tone: "gap", label: "Skill gap" },
};
function MasteryBadge({ level, children }) {
  const s = STATUS[level] || STATUS.novice;
  return <Badge tone={s.tone} dot>{children || s.label}</Badge>;
}

/* ---- Progress ---- */
function Progress({ value, max = 100, tone, lg = false, color }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className={["track", lg && "track-lg"].filter(Boolean).join(" ")} role="progressbar" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100}>
      <div className="fill" style={{ width: pct + "%", background: color || (tone ? `var(--${tone})` : undefined) }} />
    </div>
  );
}

/* ---- Tabs ---- */
function Tabs({ tabs, value, onChange, className = "" }) {
  return (
    <div className={["tabs", className].filter(Boolean).join(" ")} role="tablist">
      {tabs.map((t) => {
        const id = typeof t === "string" ? t : t.id;
        const label = typeof t === "string" ? t : t.label;
        return (
          <button key={id} role="tab" aria-selected={value === id} className="tab" onClick={() => onChange(id)}>
            {label}{typeof t === "object" && t.count != null && <span style={{ marginLeft: 6, color: "var(--text-muted)", fontVariantNumeric: "tabular-nums" }}>{t.count}</span>}
          </button>
        );
      })}
    </div>
  );
}

/* ---- Segmented control ---- */
function Segmented({ options, value, onChange }) {
  return (
    <div className="seg" role="group">
      {options.map((o) => {
        const id = typeof o === "string" ? o : o.id;
        const label = typeof o === "string" ? o : o.label;
        const Ic = typeof o === "object" && typeof o.icon === "function" ? o.icon : null;
        return (
          <button key={id} aria-pressed={value === id} onClick={() => onChange(id)}>
            {Ic && <Ic size={14} />}{label}
          </button>
        );
      })}
    </div>
  );
}

/* ---- Tooltip ---- */
function Tooltip({ content, children }) {
  return (
    <span className="tip" tabIndex={0}>
      {children}
      <span className="tip-pop" role="tooltip">{content}</span>
    </span>
  );
}

/* ---- Switch ---- */
function Switch({ checked, onChange, label, id }) {
  return (
    <label className="switch" htmlFor={id}>
      <input id={id} type="checkbox" role="switch" checked={checked} aria-label={label} onChange={(e) => onChange(e.target.checked)} />
      <span className="slider" />
    </label>
  );
}

/* ---- Confidence meter ---- */
function Confidence({ level = "medium", showLabel = true }) {
  const labels = { high: "High", medium: "Medium", low: "Low" };
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
      <span className={`conf ${level}`} aria-hidden="true"><i /><i /><i /></span>
      {showLabel && <span style={{ fontSize: "var(--fs-sm)", color: "var(--text-secondary)" }}>Confidence: {labels[level]}</span>}
    </span>
  );
}

/* ---- Delta indicator ---- */
function Delta({ value, suffix = "", invert = false }) {
  const dir = value > 0 ? "up" : value < 0 ? "down" : "flat";
  const good = invert ? value < 0 : value > 0;
  const cls = value === 0 ? "flat" : good ? "up" : "down";
  const Ar = value === 0 ? null : value > 0 ? I.trending : I.trendingDown;
  return (
    <span className={`delta ${cls}`}>
      {Ar && <Ar size={13} />}{value > 0 ? "+" : ""}{value}{suffix}
    </span>
  );
}

/* ---- Stat block ---- */
function Stat({ label, value, sub, delta, deltaSuffix = "", invert }) {
  return (
    <div>
      <div className="stat-label">{label}</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: "var(--s-2)", marginTop: 4 }}>
        <span className="stat-val">{value}</span>
        {delta != null && <Delta value={delta} suffix={deltaSuffix} invert={invert} />}
      </div>
      {sub && <div style={{ fontSize: "var(--fs-sm)", color: "var(--text-muted)", marginTop: 3 }}>{sub}</div>}
    </div>
  );
}

/* ---- AI insight card ---- */
function AIInsight({ title, children, confidence, why, action, onAction, compact = false }) {
  return (
    <div className="card ai-surface" style={{ padding: compact ? "var(--s-4)" : "var(--s-5)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--s-2)", marginBottom: "var(--s-2)" }}>
        <span className="ai-tag"><I.sparkle /> {title || "Mentor insight"}</span>
        {confidence && <span style={{ marginLeft: "auto" }}><Confidence level={confidence} /></span>}
      </div>
      <div style={{ fontSize: "var(--fs-base)", color: "var(--text-primary)", lineHeight: "var(--lh-normal)" }}>{children}</div>
      {why && (
        <div style={{ marginTop: "var(--s-3)", paddingTop: "var(--s-3)", borderTop: "1px solid var(--border-subtle)", display: "flex", gap: 7, alignItems: "flex-start" }}>
          <span style={{ color: "var(--text-muted)", flex: "none", marginTop: 1 }}><I.info size={14} /></span>
          <span style={{ fontSize: "var(--fs-sm)", color: "var(--text-secondary)" }}><strong style={{ color: "var(--text-primary)", fontWeight: "var(--fw-medium)" }}>Recommended because</strong> {why}</span>
        </div>
      )}
      {action && <div style={{ marginTop: "var(--s-4)" }}><Button variant="primary" size="sm" iconRight={I.arrowRight} onClick={onAction}>{action}</Button></div>}
    </div>
  );
}

/* ---- Empty state ---- */
function EmptyState({ icon, title, children, action, onAction }) {
  const Ic = typeof icon === "function" ? icon : I.layers;
  return (
    <div style={{ textAlign: "center", padding: "var(--s-12) var(--s-6)", maxWidth: 380, margin: "0 auto" }}>
      <div style={{ width: 48, height: 48, borderRadius: "var(--r-xl)", background: "var(--surface-subtle)", border: "1px solid var(--border)", display: "grid", placeItems: "center", margin: "0 auto var(--s-4)", color: "var(--text-muted)" }}>
        <Ic size={22} />
      </div>
      <h3 style={{ margin: "0 0 var(--s-2)", fontSize: "var(--fs-lg)", fontWeight: "var(--fw-semibold)" }}>{title}</h3>
      <p style={{ margin: 0, fontSize: "var(--fs-base)", color: "var(--text-secondary)", lineHeight: "var(--lh-normal)" }}>{children}</p>
      {action && <div style={{ marginTop: "var(--s-5)" }}><Button variant="primary" size="sm" onClick={onAction} icon={I.plus}>{action}</Button></div>}
    </div>
  );
}

/* ---- Error state ---- */
function ErrorState({ title = "Something went wrong", children, onRetry }) {
  return (
    <div style={{ textAlign: "center", padding: "var(--s-12) var(--s-6)", maxWidth: 400, margin: "0 auto" }}>
      <div style={{ width: 48, height: 48, borderRadius: "var(--r-xl)", background: "var(--danger-soft)", display: "grid", placeItems: "center", margin: "0 auto var(--s-4)", color: "var(--danger)" }}>
        <I.alert size={22} />
      </div>
      <h3 style={{ margin: "0 0 var(--s-2)", fontSize: "var(--fs-lg)", fontWeight: "var(--fw-semibold)" }}>{title}</h3>
      <p style={{ margin: 0, fontSize: "var(--fs-base)", color: "var(--text-secondary)", lineHeight: "var(--lh-normal)" }}>{children}</p>
      {onRetry && <div style={{ marginTop: "var(--s-5)" }}><Button variant="secondary" size="sm" icon={I.refresh} onClick={onRetry}>Try again</Button></div>}
    </div>
  );
}

/* ---- Modal ---- */
function Modal({ open, onClose, children, width = 540, label }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="scrim" onClick={onClose}>
      <div className="modal anim-scale-in" role="dialog" aria-modal="true" aria-label={label}
        style={{ width, maxWidth: "calc(100vw - 32px)", maxHeight: "calc(100vh - 64px)", left: "50%", top: "50%", transform: "translate(-50%,-50%)", display: "flex", flexDirection: "column", overflow: "hidden" }}
        onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

/* ---- Ring (radial progress) ---- */
function Ring({ value, size = 64, stroke = 6, color = "var(--primary)", track = "var(--surface-subtle)", label, sub }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const off = c - (Math.max(0, Math.min(100, value)) / 100) * c;
  return (
    <div style={{ position: "relative", width: size, height: size, flex: "none" }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={off} style={{ transition: "stroke-dashoffset var(--dur-slow) var(--ease-out)" }} />
      </svg>
      {label != null && (
        <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", textAlign: "center", lineHeight: 1 }}>
          <div>
            <div style={{ fontSize: size > 80 ? "var(--fs-xl)" : "var(--fs-base)", fontWeight: "var(--fw-bold)", fontVariantNumeric: "tabular-nums" }}>{label}</div>
            {sub && <div style={{ fontSize: "var(--fs-xs)", color: "var(--text-muted)", marginTop: 2 }}>{sub}</div>}
          </div>
        </div>
      )}
    </div>
  );
}

Object.assign(window, {
  Button, Card, CardHead, Badge, MasteryBadge, STATUS, Progress, Tabs, Segmented,
  Tooltip, Switch, Confidence, Delta, Stat, AIInsight, EmptyState, ErrorState, Modal, Ring,
});
