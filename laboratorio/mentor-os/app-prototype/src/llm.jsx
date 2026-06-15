/* MentorOS — LLM bridge.
 *
 * In the canvas/preview this calls window.claude.complete() (the same helper the
 * prose diagnostic uses). In PRODUCTION this exact surface is the only thing that
 * changes: point `llmComplete` at POST /api/coach (Vercel serverless + your
 * Anthropic key, server-side) so the key never reaches the client. Everything
 * downstream — missions, daily insight, coach nudges — stays identical.
 *
 * Every call carries a deterministic `fallback` so the UI is never empty when the
 * model is unavailable, over the daily cost cap, or running offline. This mirrors
 * life-update-mobile's `fallbackTemplates`.
 */
const LLM = (() => {
  const has = () => typeof window !== "undefined" && window.claude && typeof window.claude.complete === "function";

  // Raw completion. Returns a string. Never throws.
  async function complete(prompt, fallback = "") {
    try {
      if (has()) {
        const out = await window.claude.complete(prompt);
        if (out && String(out).trim()) return String(out).trim();
      }
    } catch (e) { /* swallow — fall through to fallback */ }
    // tiny delay so the "generating…" state is visible even on fallback
    await new Promise((r) => setTimeout(r, 480));
    return fallback;
  }

  // JSON completion. Prompt MUST ask for JSON only. Returns parsed object/array
  // or the fallback value on any parse/availability failure.
  async function json(prompt, fallback) {
    const raw = await complete(prompt + "\n\nReturn ONLY valid JSON. No prose, no markdown fences.", "");
    if (!raw) return fallback;
    try {
      const cleaned = raw.replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
      return JSON.parse(cleaned);
    } catch (e) {
      return fallback;
    }
  }

  return { complete, json, available: has };
})();

window.LLM = LLM;
