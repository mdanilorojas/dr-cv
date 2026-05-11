/**
 * Phase 4+ placeholder. Ships as an empty, hidden aside so the landing DOM
 * already has the anchor when the "me" agent is wired up later.
 */
export function renderMeAgentDock(): string {
  return `<aside
  id="me-agent-dock"
  class="lp-me-dock"
  aria-hidden="true"
  hidden
  data-phase="reserved"
></aside>`;
}
