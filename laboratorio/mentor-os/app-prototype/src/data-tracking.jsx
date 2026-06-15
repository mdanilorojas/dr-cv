/* MentorOS — Tracking & Coach data (migrated from life-update-mobile).
 *
 * The mobile app tracked a full life model (health, weight, relationships…). For
 * the web MVP we keep ONLY the dimensions that move the one number — $250k/yr —
 * and reframe the daily metrics around income-driving behaviour, not biometrics.
 *
 * MOBILE → WEB metric mapping (see PROMPT-mobile-to-web-backend.md for the rest):
 *   energy_level        → energy        (kept — drives coach pacing)
 *   stress_level        → focus         (reframed: clarity/focus, higher = better)
 *   deep_work_hours     → deepWork      (kept — THE leading indicator for $250k)
 *   trained_today       → shipped       (reframed: shipped portfolio/project work)
 *   clean_today         → outreach      (reframed: took an income action today)
 *   quick_note          → note          (kept)
 *   physical_pain / pain_location / weight  → DROPPED in MVP (documented only)
 */

const TODAY = "2026-06-12"; // fixed "today" so the demo is deterministic

/* ---- Daily check-in metric specs (what the form collects) ---- */
const CHECKIN_METRICS = [
  { id: "deepWork", label: "Deep work", kind: "hours", min: 0, max: 10, step: 0.5, icon: "clock",
    help: "Focused hours on skill-building or portfolio work. Your strongest leading indicator." },
  { id: "energy", label: "Energy", kind: "scale", min: 1, max: 10, icon: "bolt",
    help: "Physical + mental energy today." },
  { id: "focus", label: "Focus & clarity", kind: "scale", min: 1, max: 10, icon: "target",
    help: "How clear and undistracted you were." },
];
const CHECKIN_TOGGLES = [
  { id: "shipped", label: "Shipped something", desc: "Pushed real portfolio or project work today.", icon: "rocket" },
  { id: "outreach", label: "Income action", desc: "Applied, pitched, posted, or followed up with a lead.", icon: "send" },
];

/* ---- 30-day history (most recent last). Seeded, deterministic. ---- */
function seedEntries() {
  const out = [];
  const base = new Date(TODAY + "T12:00:00");
  // a believable ramp: deep work and ship-rate trending up as the streak builds
  const dw = [1.5,2,0,2.5,3,2,1.5, 2,3,2.5,3,3.5,1,0, 3,2.5,3,4,2,3.5,2, 3,4,3.5,4,2.5,3,4, 3.5,4.5];
  const en = [6,7,5,7,8,6,5, 7,8,7,8,7,6,5, 8,7,8,9,7,8,6, 8,9,8,9,7,8,9, 8,9];
  const fo = [5,6,4,6,7,6,5, 6,7,7,8,7,5,4, 7,7,8,8,7,8,6, 8,8,8,9,7,8,8, 8,9];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(base); d.setDate(base.getDate() - i);
    const idx = 29 - i;
    const iso = d.toISOString().slice(0, 10);
    const deepWork = dw[idx];
    out.push({
      date: iso,
      deepWork,
      energy: en[idx],
      focus: fo[idx],
      shipped: deepWork >= 3 && idx % 3 !== 1,
      outreach: idx % 2 === 0 && deepWork >= 2,
      note: "",
      // a couple of skipped days early on, to make the streak real (best 31, now 23)
      skipped: idx === 2 || idx === 13,
    });
  }
  return out.map((e) => (e.skipped ? null : e)).filter(Boolean);
}
const dailyEntries = seedEntries();
const todayEntry = null; // no entry yet for TODAY — the "Hoy" banner state

/* ---- Derived tracking stats (last 30d) ---- */
function avg(arr) { return arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0; }
const trackingStats = {
  streak: 23,
  streakBest: 31,
  weeklyTargetHrs: 6,
  weeklyDoneHrs: 4.5,
  avgDeepWork: +avg(dailyEntries.map((e) => e.deepWork)).toFixed(1),
  avgEnergy: +avg(dailyEntries.map((e) => e.energy)).toFixed(1),
  avgFocus: +avg(dailyEntries.map((e) => e.focus)).toFixed(1),
  shipRate: Math.round((dailyEntries.filter((e) => e.shipped).length / dailyEntries.length) * 100),
  totalDeepWork: +dailyEntries.reduce((a, e) => a + e.deepWork, 0).toFixed(1),
  daysTracked: dailyEntries.length,
  last14: dailyEntries.slice(-14),
};

/* ---- Daily insight (LLM "daily-content" → strip on Today). A pool of seeds the
 *      model rewrites/expands; index 0 is "today's". ---- */
const dailyInsights = [
  { id: "di1", text: "Your market value moved +$6k in 30 days, and 80% of that came from days you logged 3h+ of deep work. The number isn't built by mood — it's built by hours. Protect today's block first, answer Slack second.", tag: "Pattern", fav: false },
  { id: "di2", text: "Senior offers don't go to the most talented designer in the room. They go to the one who can defend a decision in two clauses. Every prose answer you grade is rehearsal for that room.", tag: "Strategy", fav: true },
  { id: "di3", text: "You're seven weeks from the goal date and 54% through the path. That's on-track, not ahead. One extra deep-work block a week is the difference between hitting $250k in August and chasing it in October.", tag: "Forecast", fav: false },
];

/* ---- Today's missions (LLM "generate-daily-missions"). ---- */
const dailyMissions = [
  { id: "mi1", title: "Ship the query-expansion fix", detail: "Close the 4 multi-file retrieval misses on the docs assistant, then resubmit for review.", dim: "carrera", est: "90m", done: false, priority: "high" },
  { id: "mi2", title: "Two outreach messages", detail: "Message two design leads at remote-first US/EU companies. Reference the docs-assistant project, not your résumé.", dim: "finanzas", est: "25m", done: false, priority: "high" },
  { id: "mi3", title: "45-min deep work on eval module", detail: "Designing an eval set — the prerequisite the system flagged before any production work.", dim: "carrera", est: "45m", done: false, priority: "med" },
  { id: "mi4", title: "Grade 3 prose answers", detail: "Re-take RAG questions you scored lowest on. Tighten each answer to two clauses.", dim: "habitos", est: "20m", done: true, priority: "low" },
];

/* ---- Life dimensions (MVP subset — only what drives $250k). ---- */
// status: ahead | on-track | behind | critical | stale
const dimensions = [
  { id: "carrera", label: "Career", icon: "rocket", status: "on-track", metricLabel: "Path progress", actual: 54, expected: 56, unit: "%", note: "RAG module is the bottleneck. Finish it and three downstream skills unlock." },
  { id: "finanzas", label: "Income", icon: "dollar", status: "behind", metricLabel: "Market value", actual: 165, expected: 178, unit: "k", note: "Value is banking from skills, but outreach is the lever you're under-using. 2 messages/day closes the gap." },
  { id: "habitos", label: "Deep-work habit", icon: "flame", status: "ahead", metricLabel: "Weekly hours", actual: 4.5, expected: 4, unit: "h", note: "23-day streak, 8 from your best. The habit is compounding — don't break it for a busy day." },
  { id: "mental", label: "Energy & focus", icon: "brain", status: "on-track", metricLabel: "30-day avg", actual: 7.4, expected: 7, unit: "/10", note: "Mornings score highest. The path schedules hard modules before noon for a reason." },
];

/* ---- Coach feed (algorithmic + LLM, migrated from lib/coach/). ---- */
// type: nudge | win | outreach | critical | reflection
const coachMessages = [
  {
    id: "cm1", type: "nudge", time: "08:30", dimension: "carrera", confidence: "high", feedback: null,
    title: "Finish RAG before you start anything new",
    text: "You're 40% through the RAG pipeline module and it's been open 6 days. It gates evaluation, agents, and observability — three of your four lowest skills. One focused block today unblocks the whole back half of the path.",
    evidence: ["RAG pipeline module: 40% for 6 days", "Blocks: eval, agents, observability", "Docs assistant resubmit waiting on this"],
  },
  {
    id: "cm2", type: "win", time: "Yesterday", dimension: "habitos", confidence: "high", feedback: "up",
    title: "23-day streak — your second-longest ever",
    text: "You've logged deep work 23 days straight. The last time you got here you hit a personal best of 31. You're 8 days out. The market-value gain over this streak is +$6k — the habit is literally paying.",
    evidence: ["Streak: 23 days (best 31)", "Market value +$6k over the streak"],
  },
  {
    id: "cm3", type: "outreach", time: "Yesterday", dimension: "finanzas", confidence: "medium", feedback: null,
    title: "Income is your behind dimension — and it's the cheapest to fix",
    text: "Skills are banking value, but $250k comes from someone choosing to pay it. You've sent outreach on 6 of the last 30 days. Designers who land senior remote roles send 2–4 touches a day. This is the highest-leverage 25 minutes you have today.",
    evidence: ["Outreach: 6 of last 30 days", "Income dimension: behind (−$13k vs expected)"],
  },
  {
    id: "cm4", type: "nudge", time: "2 days ago", dimension: "mental", confidence: "medium", feedback: "down",
    title: "Your focus dips after 2pm — front-load the hard work",
    text: "Across 30 days your focus scores average 8.1 before noon and 6.2 after 2pm. The eval module is the hardest thing on your path right now. Do it in the morning block, not as a tired afternoon afterthought.",
    evidence: ["Focus: 8.1 AM vs 6.2 PM (30-day avg)", "Eval module flagged 'hardest remaining'"],
  },
];

/* ---- Weekly reflection prompts (Coach → modal). ---- */
const weeklyReflection = {
  weekLabel: "Week of 6–12 Jun",
  prompts: [
    "What was the single highest-leverage thing you did toward $250k this week?",
    "Where did you spend hours that didn't move the number?",
    "What will you protect on your calendar next week?",
  ],
};

/* ---- Coach settings (Settings → Coach section). ---- */
const coachSettings = {
  mode: "balanced",                 // minimal | balanced | proactive — how often the LLM runs
  model: "sonnet",                  // haiku | sonnet | opus
  dailyCostCapUsd: 0.5,
  spentTodayUsd: 0.18,
  spentMonthUsd: 4.2,
  zdr: false,                       // zero data retention
  antiSycophancy: 0.72,             // Pearson corr of feedback vs real gap-delta; >0 = honest
  costLast14: [0.12,0.31,0.08,0.22,0.4,0.19,0.05, 0.28,0.33,0.11,0.24,0.37,0.16,0.18],
  dimsEnabled: { carrera: true, finanzas: true, habitos: true, mental: true },
};

window.TRACK = {
  TODAY, CHECKIN_METRICS, CHECKIN_TOGGLES, dailyEntries, todayEntry, trackingStats,
  dailyInsights, dailyMissions, dimensions, coachMessages, weeklyReflection, coachSettings,
};
