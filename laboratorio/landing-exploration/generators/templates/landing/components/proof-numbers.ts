import type { Positioning } from "../../../lib/types.js";
import { escapeHtml, type Lang } from "../../skills-sheet-page-1.js";

export function renderProofNumbers(positioning: Positioning, lang: Lang): string {
  const items = positioning.proofNumbers
    .map((p) => {
      const label = lang === "en" ? p.labelEn : p.labelEs;
      const unit = p.unit ? `<span class="lp-proof__unit">${escapeHtml(p.unit)}</span>` : "";
      return `<div class="lp-proof__item">
    <div class="lp-proof__num"><span class="lp-proof__value">${escapeHtml(p.value)}</span>${unit}</div>
    <div class="lp-proof__label">${escapeHtml(label)}</div>
  </div>`;
    })
    .join("\n  ");
  return `<div class="lp-proof" role="list">
  ${items}
</div>`;
}
