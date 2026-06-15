/* MentorOS — Minimal SVG chart primitives. Responsive via viewBox. */
const { useState: useStateC, useRef: useRefC, useEffect: useEffectC } = React;

function useMeasure() {
  const ref = useRefC(null);
  const [w, setW] = useStateC(560);
  useEffectC(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver((entries) => {
      const cw = entries[0].contentRect.width;
      if (cw > 0) setW(cw);
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [ref, w];
}

/* ---- Sparkline ---- */
function Sparkline({ data, w = 120, h = 32, color = "var(--primary)", fill = true, strokeWidth = 1.75 }) {
  const min = Math.min(...data), max = Math.max(...data);
  const rng = max - min || 1;
  const pts = data.map((v, i) => [(i / (data.length - 1)) * w, h - 3 - ((v - min) / rng) * (h - 6)]);
  const line = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
  const area = line + ` L${w} ${h} L0 ${h} Z`;
  const gid = "sg" + Math.random().toString(36).slice(2, 7);
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: "block", overflow: "visible" }}>
      {fill && <defs><linearGradient id={gid} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={color} stopOpacity="0.18" /><stop offset="1" stopColor={color} stopOpacity="0" /></linearGradient></defs>}
      {fill && <path d={area} fill={`url(#${gid})`} />}
      <path d={line} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="2.5" fill={color} />
    </svg>
  );
}

/* ---- Area / Line chart with axes ---- */
function AreaChart({ series, labels, height = 220, yMax, yFmt = (v) => v, color = "var(--viz-1)", color2 = "var(--viz-2)", area = true }) {
  const [ref, w] = useMeasure();
  const padL = 38, padR = 12, padT = 14, padB = 26;
  const plotW = Math.max(10, w - padL - padR);
  const plotH = height - padT - padB;
  const allVals = series.flatMap((s) => s.data);
  const max = yMax || Math.ceil(Math.max(...allVals) * 1.12);
  const min = 0;
  const x = (i, n) => padL + (i / (n - 1)) * plotW;
  const y = (v) => padT + plotH - ((v - min) / (max - min)) * plotH;
  const ticks = 4;
  const colors = [color, color2, "var(--viz-3)"];
  return (
    <div ref={ref} style={{ width: "100%" }}>
      <svg width="100%" height={height} viewBox={`0 0 ${w} ${height}`} role="img">
        {Array.from({ length: ticks + 1 }).map((_, i) => {
          const v = (max / ticks) * i;
          const yy = y(v);
          return (
            <g key={i}>
              <line x1={padL} y1={yy} x2={w - padR} y2={yy} stroke="var(--border-subtle)" strokeWidth="1" />
              <text x={padL - 8} y={yy + 3.5} textAnchor="end" fontSize="10" fill="var(--text-muted)" fontFamily="var(--font-mono)">{yFmt(Math.round(v))}</text>
            </g>
          );
        })}
        {labels && labels.map((l, i) => i % Math.ceil(labels.length / 7) === 0 && (
          <text key={i} x={x(i, labels.length)} y={height - 8} textAnchor="middle" fontSize="10" fill="var(--text-muted)" fontFamily="var(--font-mono)">{l}</text>
        ))}
        {series.map((s, si) => {
          const c = s.color || colors[si % colors.length];
          const n = s.data.length;
          const def = s.data.map((v, i) => (v == null ? null : [x(i, n), y(v)]));
          let line = "", started = false, firstX = null, lastX = null;
          def.forEach((p) => {
            if (!p) { started = false; return; }
            line += (started ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1) + " ";
            started = true; if (firstX == null) firstX = p[0]; lastX = p[0];
          });
          const gid = "ag" + si + Math.random().toString(36).slice(2, 6);
          return (
            <g key={si}>
              {area && si === 0 && line && <defs><linearGradient id={gid} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={c} stopOpacity="0.16" /><stop offset="1" stopColor={c} stopOpacity="0" /></linearGradient></defs>}
              {area && si === 0 && line && <path d={line + `L${lastX} ${padT + plotH} L${firstX} ${padT + plotH} Z`} fill={`url(#${gid})`} />}
              <path d={line} fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={s.dashed ? "5 4" : "none"} />
              {def.map((p, i) => p && (s.dots || i === def.length - 1 || (def[i + 1] == null && def[i - 1] != null)) ? <circle key={i} cx={p[0]} cy={p[1]} r="3" fill={c} /> : null)}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ---- Bar chart (vertical) ---- */
function BarChart({ data, height = 200, color = "var(--viz-1)", yFmt = (v) => v, highlightMax = false }) {
  const [ref, w] = useMeasure();
  const padL = 34, padR = 8, padT = 12, padB = 26;
  const plotW = Math.max(10, w - padL - padR), plotH = height - padT - padB;
  const max = Math.ceil(Math.max(...data.map((d) => d.value)) * 1.14) || 1;
  const n = data.length;
  const gap = 0.34;
  const bw = (plotW / n) * (1 - gap);
  const maxIdx = data.reduce((mi, d, i, a) => (d.value > a[mi].value ? i : mi), 0);
  return (
    <div ref={ref} style={{ width: "100%" }}>
      <svg width="100%" height={height} viewBox={`0 0 ${w} ${height}`} role="img">
        {Array.from({ length: 4 }).map((_, i) => {
          const v = (max / 3) * i, yy = padT + plotH - (v / max) * plotH;
          return <g key={i}><line x1={padL} y1={yy} x2={w - padR} y2={yy} stroke="var(--border-subtle)" /><text x={padL - 7} y={yy + 3.5} textAnchor="end" fontSize="10" fill="var(--text-muted)" fontFamily="var(--font-mono)">{yFmt(Math.round(v))}</text></g>;
        })}
        {data.map((d, i) => {
          const bh = (d.value / max) * plotH;
          const bx = padL + (plotW / n) * i + (plotW / n) * gap / 2;
          const by = padT + plotH - bh;
          const c = d.color || (highlightMax && i === maxIdx ? "var(--accent)" : color);
          return (
            <g key={i}>
              <rect x={bx} y={by} width={bw} height={bh} rx="3" fill={c} opacity={d.muted ? 0.4 : 1} />
              <text x={bx + bw / 2} y={height - 9} textAnchor="middle" fontSize="10" fill="var(--text-muted)" fontFamily="var(--font-mono)">{d.label}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ---- Horizontal bars (ranked) ---- */
function RankBars({ data, color = "var(--viz-1)", fmt = (v) => v }) {
  const max = Math.max(...data.map((d) => d.value)) || 1;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-3)" }}>
      {data.map((d, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "130px 1fr 52px", alignItems: "center", gap: "var(--s-3)" }}>
          <span style={{ fontSize: "var(--fs-md)", color: "var(--text-secondary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{d.label}</span>
          <div className="track" style={{ height: 8 }}><div className="fill" style={{ width: (d.value / max) * 100 + "%", background: d.color || color }} /></div>
          <span style={{ fontSize: "var(--fs-md)", fontWeight: "var(--fw-medium)", textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{fmt(d.value)}</span>
        </div>
      ))}
    </div>
  );
}

/* ---- Donut ---- */
function Donut({ data, size = 140, thickness = 18, center }) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  let acc = 0;
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--surface-subtle)" strokeWidth={thickness} />
        {data.map((d, i) => {
          const frac = d.value / total;
          const dash = frac * c;
          const el = <circle key={i} cx={size / 2} cy={size / 2} r={r} fill="none" stroke={d.color} strokeWidth={thickness} strokeDasharray={`${dash} ${c - dash}`} strokeDashoffset={-acc * c} />;
          acc += frac;
          return el;
        })}
      </svg>
      {center && <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", textAlign: "center" }}>{center}</div>}
    </div>
  );
}

Object.assign(window, { Sparkline, AreaChart, BarChart, RankBars, Donut });
