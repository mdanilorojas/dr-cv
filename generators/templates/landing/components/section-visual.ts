import type { LandingVisualKind } from "../../../lib/types.js";

export function renderSectionVisual(kind: LandingVisualKind): string {
  return `<div class="lp-visual lp-visual--${kind}" aria-hidden="true"></div>`;
}
