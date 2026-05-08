import { escapeHtml, type Lang } from "../../skills-sheet-page-1.js";

interface Node {
  id: string;
  labelEn: string;
  labelEs: string;
  x: number;
  y: number;
}

const NODES: Node[] = [
  { id: "profile",  labelEn: "Profile",       labelEs: "Perfil",      x: 60,  y: 80 },
  { id: "claude",   labelEn: "Claude Code",   labelEs: "Claude Code", x: 240, y: 80 },
  { id: "mcp",      labelEn: "MCP servers",   labelEs: "MCP servers", x: 420, y: 80 },
  { id: "subagents",labelEn: "Subagents",     labelEs: "Subagentes",  x: 600, y: 80 },
  { id: "ship",     labelEn: "Shipped work",  labelEs: "Trabajo entregado", x: 420, y: 210 },
];

export function renderMethodDiagram(lang: Lang): string {
  const ariaLabel = lang === "en"
    ? "How I work — profile, Claude Code, MCP, subagents, shipped work"
    : "Cómo trabajo — perfil, Claude Code, MCP, subagentes, trabajo entregado";

  const nodesSvg = NODES.map((n) => {
    const label = lang === "en" ? n.labelEn : n.labelEs;
    return `  <g transform="translate(${n.x}, ${n.y})">
    <rect x="0" y="0" width="140" height="44" rx="6" fill="#16161d" stroke="#FF8964"/>
    <text x="70" y="27" text-anchor="middle" fill="#f4f4f5" font-size="13" font-family="Inter,sans-serif" font-weight="500">${escapeHtml(label)}</text>
  </g>`;
  }).join("\n");

  const arrows = `
  <line x1="200" y1="102" x2="238" y2="102" stroke="#8f8f95" stroke-width="1.5" marker-end="url(#mdarrow)"/>
  <line x1="380" y1="102" x2="418" y2="102" stroke="#8f8f95" stroke-width="1.5" marker-end="url(#mdarrow)"/>
  <line x1="560" y1="102" x2="598" y2="102" stroke="#8f8f95" stroke-width="1.5" marker-end="url(#mdarrow)"/>
  <path d="M 670 124 Q 670 180 550 210" stroke="#FF8964" stroke-width="1.5" fill="none" marker-end="url(#mdarrow-accent)"/>
  <path d="M 130 124 Q 130 180 420 210" stroke="#8f8f95" stroke-width="1" stroke-dasharray="4 3" fill="none" marker-end="url(#mdarrow)"/>
  `;

  return `<figure class="lp-method" role="img" aria-label="${escapeHtml(ariaLabel)}">
  <svg viewBox="0 0 760 280" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
    <defs>
      <marker id="mdarrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#8f8f95"/>
      </marker>
      <marker id="mdarrow-accent" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#FF8964"/>
      </marker>
    </defs>
${nodesSvg}
${arrows}
  </svg>
</figure>`;
}
