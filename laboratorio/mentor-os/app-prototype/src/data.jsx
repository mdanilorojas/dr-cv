/* Career Training OS — Mock data.
 * Learner: Danilo Rojas, Product Designer aiming for senior remote roles.
 * NOTE: the skill domain below is placeholder seed data. On integration it is
 * REPLACED by the real sources in dr-cv:
 *   • skills           ← perfil/data/skills.yaml
 *   • assessment       ← career-training/ur-assessment/questions.md + answers_state.json
 *   • objective/goal   ← carrera/execution/master-goals.md
 * The shapes here ARE the integration contract — see laboratorio/superpowers/
 * career-training-os-integration.md. */

const learner = {
  name: "Danilo Rojas",
  initials: "DR",
  role: "Product Designer",
  org: "danilorojas.design",
  plan: "Public",

  /* ---- The objective: a concrete outcome, not an activity ---- */
  objective: "Earn $250,000 / year",
  objectiveKind: "income",       // income | role | outcome
  incomeGoal: 250000,            // the number everything optimizes toward
  incomeBaseline: 120000,        // market value when the path started
  incomeCurrent: 165000,         // current estimated market value (baseline + banked skill value)
  incomeCeiling: 252000,         // value at full mastery of the skill model
  targetRole: "Senior Product Designer (remote, US/EU)",
  marketSource: "Levels.fyi + live offers · Product Design, remote LATAM/US",
  marketDelta30d: 6000,          // market value gained in last 30 days
  /* The means — how the money gets earned. The path optimizes this to hit the number above. */
  goalTitle: "Land senior remote product-design work at $250k",
  goalStarted: "14 Mar 2026",
  goalTarget: "30 Aug 2026",
  streak: 23,
  streakBest: 31,
  weeklyTargetHrs: 6,
  weeklyDoneHrs: 4.5,
  hoursTotal: 78.5,
  masteryScore: 68, // directional 0-100
  masteryDelta: 6,
  forecast: "On track · ~7 weeks to goal",
  forecastConfidence: "medium",
  activeProjects: 2,
  pathProgress: 54, // %
  pathName: "Senior Product Designer track",
  pathRationale: "Generated from your goal, the ur-assessment diagnostic, and your imported portfolio. Weighted toward the skills your prose answers scored lowest on.",
};

/* ---------------- Skills ---------------- */
// level: mastered | proficient | developing | novice | gap
// value: $ (thousands) this skill adds to market value at full mastery.
// q: diagnostic questions for this skill { passed, failed, untested }.
// levelFactor banks a fraction of `value` by level: mastered 1.0, proficient .7,
// developing .4, novice .2, gap .05 — sum of banked value + baseline = incomeCurrent.
const skills = [
  { id: "py-data", name: "Python for data", cluster: "Foundations", level: "mastered", score: 94, confidence: "high", prereqs: [], next: ["embeddings"], weak: false, value: 8, q: { passed: 8, failed: 0, untested: 0 } },
  { id: "ml-fundamentals", name: "ML fundamentals", cluster: "Foundations", level: "proficient", score: 80, confidence: "high", prereqs: ["py-data"], next: ["eval"], weak: false, value: 10, q: { passed: 8, failed: 1, untested: 0 } },
  { id: "prompt", name: "Prompt engineering", cluster: "LLM core", level: "proficient", score: 82, confidence: "high", prereqs: ["ml-fundamentals"], next: ["agents", "structured"], weak: false, value: 9, q: { passed: 8, failed: 1, untested: 0 } },
  { id: "embeddings", name: "Embeddings & vectors", cluster: "Retrieval", level: "developing", score: 61, confidence: "medium", prereqs: ["py-data"], next: ["rag"], weak: false, value: 11, q: { passed: 5, failed: 2, untested: 1 } },
  { id: "rag", name: "Retrieval-augmented gen", cluster: "Retrieval", level: "developing", score: 52, confidence: "low", prereqs: ["embeddings", "prompt"], next: ["eval", "agents"], weak: true, value: 16, q: { passed: 5, failed: 4, untested: 1 } },
  { id: "structured", name: "Structured outputs", cluster: "LLM core", level: "developing", score: 58, confidence: "medium", prereqs: ["prompt"], next: ["agents"], weak: false, value: 7, q: { passed: 4, failed: 2, untested: 1 } },
  { id: "eval", name: "LLM evaluation", cluster: "Quality", level: "novice", score: 34, confidence: "low", prereqs: ["rag", "ml-fundamentals"], next: ["observability"], weak: true, value: 14, q: { passed: 3, failed: 4, untested: 2 } },
  { id: "agents", name: "Agentic workflows", cluster: "LLM core", level: "novice", score: 28, confidence: "low", prereqs: ["rag", "structured"], next: ["observability"], weak: true, value: 15, q: { passed: 2, failed: 4, untested: 2 } },
  { id: "observability", name: "LLM observability", cluster: "Production", level: "gap", score: 12, confidence: "low", prereqs: ["eval"], next: ["deploy"], weak: true, value: 12, q: { passed: 1, failed: 3, untested: 3 } },
  { id: "deploy", name: "Serving & cost control", cluster: "Production", level: "gap", score: 8, confidence: "low", prereqs: ["observability"], next: [], weak: false, value: 13, q: { passed: 0, failed: 2, untested: 4 } },
  { id: "safety", name: "Safety & guardrails", cluster: "Quality", level: "novice", score: 30, confidence: "low", prereqs: ["eval"], next: ["deploy"], weak: false, value: 8, q: { passed: 2, failed: 3, untested: 2 } },
  { id: "ft", name: "Fine-tuning & adapters", cluster: "Advanced", level: "novice", score: 22, confidence: "low", prereqs: ["eval"], next: [], weak: false, value: 9, q: { passed: 2, failed: 3, untested: 2 } },
];

/* Level → fraction of a skill's $ value that is "banked" into market value today. */
const LEVEL_FACTOR = { mastered: 1.0, proficient: 0.7, developing: 0.4, novice: 0.2, gap: 0.05 };
const skillBanked = (s) => Math.round(s.value * LEVEL_FACTOR[s.level] * 1000);   // $ banked now
const skillUpside = (s) => Math.round(s.value * (1 - LEVEL_FACTOR[s.level]) * 1000); // $ left to unlock

const clusters = ["Foundations", "LLM core", "Retrieval", "Quality", "Production", "Advanced"];

/* ---------------- Learning path ---------------- */
// status: complete | active | available | locked
const path = [
  {
    id: "m1", title: "LLM foundations", status: "complete", weeks: "Weeks 1–2", progress: 100,
    summary: "Mental model for how modern LLMs behave, tokens, context, and where they fail.",
    modules: [
      { id: "m1a", title: "How LLMs actually work", type: "module", status: "complete", time: "3h", difficulty: "Intro", skill: "ml-fundamentals" },
      { id: "m1b", title: "Prompt patterns that hold up", type: "module", status: "complete", time: "4h", difficulty: "Core", skill: "prompt" },
      { id: "m1c", title: "Project: Prompt-graded triage bot", type: "project", status: "complete", time: "6h", difficulty: "Applied", skill: "prompt" },
    ],
  },
  {
    id: "m2", title: "Retrieval & grounding", status: "active", weeks: "Weeks 3–5", progress: 58,
    summary: "Make a model answer from your data, not its training set. The core of every useful internal tool.",
    why: "You ranked retrieval as your lowest-confidence area, and it unblocks 4 downstream skills including evaluation and agents.",
    modules: [
      { id: "m2a", title: "Embeddings & vector search", type: "module", status: "complete", time: "4h", difficulty: "Core", skill: "embeddings" },
      { id: "m2b", title: "Chunking strategies", type: "lesson", status: "complete", time: "1.5h", difficulty: "Core", skill: "rag" },
      { id: "m2c", title: "Build a RAG pipeline", type: "module", status: "active", time: "5h", difficulty: "Applied", skill: "rag", progress: 40 },
      { id: "m2d", title: "Exercise: Fix the hallucinating retriever", type: "exercise", status: "available", time: "1h", difficulty: "Applied", skill: "rag" },
      { id: "m2e", title: "Project: Docs assistant over your repo", type: "project", status: "available", time: "8h", difficulty: "Applied", skill: "rag" },
      { id: "m2f", title: "Checkpoint: Retrieval quality", type: "assessment", status: "locked", time: "45m", difficulty: "Gate", skill: "rag" },
    ],
  },
  {
    id: "m3", title: "Evaluation & quality", status: "available", weeks: "Weeks 6–8", progress: 0,
    summary: "If you can't measure it, you can't ship it. Build eval sets, graders, and regression gates.",
    why: "Recommended next after retrieval. Evaluation is the prerequisite the system flagged as missing before any production work.",
    modules: [
      { id: "m3a", title: "Designing an eval set", type: "module", status: "available", time: "3h", difficulty: "Core", skill: "eval" },
      { id: "m3b", title: "LLM-as-judge, carefully", type: "module", status: "locked", time: "3h", difficulty: "Core", skill: "eval" },
      { id: "m3c", title: "Guardrails & failure modes", type: "module", status: "locked", time: "3h", difficulty: "Core", skill: "safety" },
      { id: "m3d", title: "Project: Eval harness for the docs assistant", type: "project", status: "locked", time: "7h", difficulty: "Applied", skill: "eval" },
    ],
  },
  {
    id: "m4", title: "Agentic workflows", status: "locked", weeks: "Weeks 9–10", progress: 0,
    summary: "Tools, planning, and multi-step execution — and knowing when an agent is the wrong answer.",
    modules: [
      { id: "m4a", title: "When to use an agent (and when not to)", type: "module", status: "locked", time: "2h", difficulty: "Core", skill: "agents" },
      { id: "m4b", title: "Tool use & structured calls", type: "module", status: "locked", time: "4h", difficulty: "Applied", skill: "agents" },
      { id: "m4c", title: "Project: Research agent with guardrails", type: "project", status: "locked", time: "9h", difficulty: "Stretch", skill: "agents" },
    ],
  },
  {
    id: "m5", title: "Production & observability", status: "locked", weeks: "Weeks 11–12", progress: 0,
    summary: "Serving, tracing, cost, and the dashboards you need before real users arrive.",
    modules: [
      { id: "m5a", title: "Tracing & observability", type: "module", status: "locked", time: "3h", difficulty: "Core", skill: "observability" },
      { id: "m5b", title: "Latency & cost control", type: "module", status: "locked", time: "3h", difficulty: "Applied", skill: "deploy" },
      { id: "m5c", title: "Capstone: Ship the assistant to staging", type: "project", status: "locked", time: "12h", difficulty: "Capstone", skill: "deploy" },
    ],
  },
];

/* ---------------- Projects ---------------- */
const projects = [
  {
    id: "p1", title: "Docs assistant over your repo", skill: "rag", status: "in-review", submitted: "08 Jun 2026",
    brief: "Build a retrieval assistant that answers questions about a codebase using only the repository's own files as grounding. It must cite sources and refuse when context is insufficient.",
    requirements: [
      "Ingest a Git repo and chunk source + markdown sensibly",
      "Retrieve with hybrid (vector + keyword) search",
      "Cite the file and line range for every claim",
      "Refuse gracefully when retrieval confidence is low",
    ],
    rubric: [
      { id: "r1", label: "Grounding & citations", weight: 30, score: 27, note: "Citations are accurate and line-level. Strong." },
      { id: "r2", label: "Retrieval quality", weight: 30, score: 21, note: "Recall drops on multi-file questions. Try query expansion." },
      { id: "r3", label: "Refusal behavior", weight: 20, score: 18, note: "Refuses well below threshold. Good calibration." },
      { id: "r4", label: "Code quality", weight: 20, score: 17, note: "Clean. Add a retrieval eval before you call it done." },
    ],
    versions: [
      { v: "v3", date: "08 Jun 2026", note: "Added hybrid search + refusal threshold", current: true },
      { v: "v2", date: "02 Jun 2026", note: "First end-to-end pipeline" },
      { v: "v1", date: "28 May 2026", note: "Ingestion + chunking only" },
    ],
    relatedSkills: ["rag", "embeddings", "structured"],
    aiFeedback: "Strong submission. Your citation discipline is ahead of most learners at this stage. The one thing standing between this and 'mastery evidence' is retrieval recall on questions that span files — your grader caught 4 of those. Add query expansion and a small eval set, then resubmit. I can scaffold the eval set from your existing test questions.",
    aiConfidence: "high",
  },
  {
    id: "p2", title: "Prompt-graded triage bot", skill: "prompt", status: "passed", submitted: "21 May 2026",
    brief: "Classify inbound support messages into priority tiers with a prompt-only approach, then prove it with a graded test set.",
    requirements: ["Define a 4-tier rubric", "Prompt-only classifier", "Graded eval on 50 held-out messages", "Document failure cases"],
    rubric: [
      { id: "r1", label: "Classification accuracy", weight: 40, score: 36, note: "88% on held-out set." },
      { id: "r2", label: "Eval rigor", weight: 30, score: 27, note: "Good held-out discipline." },
      { id: "r3", label: "Failure analysis", weight: 30, score: 25, note: "Thoughtful. Edge cases documented." },
    ],
    versions: [{ v: "v2", date: "21 May 2026", note: "Final with eval set", current: true }, { v: "v1", date: "18 May 2026", note: "Initial classifier" }],
    relatedSkills: ["prompt", "ml-fundamentals"],
    aiFeedback: "Passed with mastery evidence. This is portfolio-worthy — your failure analysis section is exactly what hiring managers look for. Mastery in Prompt engineering is now supported by this project plus your checkpoint score.",
    aiConfidence: "high",
  },
];

/* ---------------- Checkpoints ---------------- */
const checkpoints = [
  { id: "c1", title: "Retrieval quality gate", module: "Retrieval & grounding", due: "16 Jun 2026", type: "assessment", state: "upcoming" },
  { id: "c2", title: "Docs assistant — resubmit", module: "Project review", due: "13 Jun 2026", type: "project", state: "action" },
  { id: "c3", title: "Weekly mentor check-in", module: "AI Mentor", due: "12 Jun 2026", type: "session", state: "upcoming" },
];

/* ---------------- Mentor chat ---------------- */
const mentorContext = {
  goal: "Ship production-grade LLM applications",
  focus: "Retrieval-augmented generation",
  recentMistakes: [
    "Retriever returned confident answers with no supporting chunk (3× in last project)",
    "Chunk size too large — diluted relevance on short queries",
    "No eval set before iterating on the pipeline",
  ],
  lastProjects: ["Docs assistant over your repo (in review)", "Prompt-graded triage bot (passed)"],
};

const mentorThread = [
  { id: "t1", role: "mentor", time: "10:02", text: "You're 40% through the RAG pipeline module. Before you go further — your last project flagged 4 multi-file retrieval misses. Want to tackle why that happens, or keep building?", chips: ["Explain the misses", "Keep building", "Show me the 4 cases"] },
  { id: "t2", role: "user", time: "10:03", text: "Explain the misses. I thought hybrid search would fix them." },
  { id: "t3", role: "mentor", time: "10:03", text: "Hybrid search helps recall on rare terms, but your misses share a pattern: the answer lives across two files, and each chunk alone looks only weakly relevant. So neither crosses your top-k threshold.\n\nThree levers, cheapest first:", grounded: "Based on your last 3 project submissions and the docs-assistant eval log.", list: ["Query expansion — generate 2–3 sub-queries, retrieve for each, merge.", "Raise k for multi-clause questions only (cheap, slightly noisier).", "Add a re-ranker — most accurate, but adds latency and cost."], confidence: "high" },
  { id: "t4", role: "user", time: "10:05", text: "Let's do query expansion. Can you turn this into a project step?" },
  { id: "t5", role: "mentor", time: "10:05", text: "Done — I added 'Exercise: query expansion for multi-file recall' to your active module, right before the project resubmit. It reuses the 4 failing questions as its test set, so you'll see the recall change directly.", action: "added-step", confidence: "high" },
];

const suggestedPrompts = [
  "Explain RAG re-ranking differently",
  "Give me a harder retrieval challenge",
  "Turn my last mistake into a drill",
  "Why is evaluation recommended next?",
];

/* ---------------- Analytics ---------------- */
const weeks = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10", "W11", "W12"];
const analytics = {
  masteryTrend: { labels: weeks.slice(0, 9), actual: [12, 20, 29, 38, 44, 51, 57, 62, 68], forecast: [68, 74, 80, 86] },
  hoursByWeek: [4.5, 6, 5.5, 7, 6.5, 5, 6, 4, 4.5].map((v, i) => ({ label: weeks[i], value: v })),
  timeBySkill: [
    { label: "RAG", value: 18.5, color: "var(--viz-1)" },
    { label: "Embeddings", value: 12, color: "var(--viz-2)" },
    { label: "Prompting", value: 11, color: "var(--viz-3)" },
    { label: "ML basics", value: 9, color: "var(--viz-4)" },
    { label: "Evaluation", value: 4, color: "var(--viz-5)" },
  ],
  strongest: [
    { label: "Python for data", value: 94 },
    { label: "Prompt engineering", value: 82 },
    { label: "ML fundamentals", value: 80 },
  ],
  weakest: [
    { label: "Serving & cost", value: 8, color: "var(--m-gap)" },
    { label: "Observability", value: 12, color: "var(--m-gap)" },
    { label: "Fine-tuning", value: 22, color: "var(--m-developing)" },
  ],
  retention: { labels: ["Day 1", "Day 3", "Day 7", "Day 14", "Day 30"], values: [100, 92, 84, 79, 76] },
  completion: 71,
  completionDelta: 5,
};

/* ---------------- Diagnostic / assessment ---------------- */
// The 95-question diagnostic is PROSE, not multiple-choice. You answer in your
// own words; an LLM (Claude, via the API) scores each answer on four dimensions
// — not just whether you're right, but how you communicate: substance, structure,
// English fluency, and concision. Every question maps to one skill; the scored
// answers set that skill's level. Re-take after study to level up.
//
// The four scoring dimensions every prose answer is graded on:
const RUBRIC_DIMS = [
  { id: "substance", label: "Substance",   desc: "Is the answer correct, complete, and senior-level?", weight: 0.45 },
  { id: "structure", label: "Structure",   desc: "Is it reasoned and well-organized — claim, why, trade-off?", weight: 0.20 },
  { id: "english",   label: "English",     desc: "Fluency, grammar, and natural phrasing for a US/EU room.", weight: 0.20 },
  { id: "concision", label: "Concision",   desc: "Says it tightly — no padding, no rambling.", weight: 0.15 },
];

const assessment = {
  total: 95,
  format: "prose",                       // answers are free-text, LLM-scored
  passThreshold: 70,                     // overall score (0-100) needed to "pass" a question
  retakeReady: ["rag", "embeddings"],    // skills where new study makes a retake worth it
  lastRun: "06 Jun 2026",
  scoredBy: "Claude · scores Substance, Structure, English & Concision",
  // A representative slice you can answer in prose. Each maps to a skill and
  // carries a model answer + the cues the grader looks for. On integration the
  // full set comes from career-training/ur-assessment/questions.md.
  questions: [
    {
      id: "q-rag-1", skill: "rag", difficulty: "Core",
      prompt: "Your retriever returns a confident answer, but none of the top-k chunks actually contain it. Walk me through how you'd diagnose and fix this — and what you'd ship first.",
      cues: ["Names it as ungrounded generation / retrieval-coverage, not a model problem", "Adds a refusal/abstain gate when no chunk crosses a relevance threshold", "Mentions measuring it (faithfulness / groundedness) before and after"],
      model: "This is ungrounded generation: the model is answering from parametric memory because retrieval didn't surface supporting context. First I'd confirm it with a groundedness check on the failing cases, then ship the cheapest correctness win — a refusal gate that abstains when no chunk crosses a relevance threshold. Only after that would I invest in better recall (query expansion, re-ranking).",
    },
    {
      id: "q-rag-2", skill: "rag", difficulty: "Applied",
      prompt: "Answers that span two documents keep getting missed because each chunk alone looks only weakly relevant. What's your first lever, and why that one before the others?",
      cues: ["Identifies it as a multi-hop recall problem", "Reaches for query expansion / sub-queries before a re-ranker", "Justifies by cost/latency — cheap recall win first"],
      model: "It's a multi-hop recall problem: the answer lives across chunks that each look weak in isolation, so none crosses top-k. My first lever is query expansion — generate two or three sub-queries, retrieve for each, then merge — because it lifts recall cheaply and without added latency. A re-ranker would help too but it's more expensive, so I'd reach for it only if expansion isn't enough.",
    },
    {
      id: "q-eval-1", skill: "eval", difficulty: "Core",
      prompt: "Before you iterate on a RAG pipeline, what's the very first thing you build — and how do you defend that to a PM who just wants the demo to look better?",
      cues: ["A held-out eval set with graded expected answers, built first", "Frames 'you can't improve what you can't measure'", "Connects it to not regressing while iterating"],
      model: "The first thing I build is a small held-out eval set with graded expected answers, before touching the pipeline. To the PM I'd frame it simply: we can't improve what we can't measure, and without it every change is a guess that might quietly regress something else. The eval set turns 'feels better' into a number we can defend, which actually gets us to a good demo faster.",
    },
    {
      id: "q-eval-2", skill: "eval", difficulty: "Applied",
      prompt: "You're using an LLM as a judge to grade outputs at scale. What's the biggest risk, and how do you keep the scores trustworthy?",
      cues: ["Names systematic bias — position and/or verbosity bias", "Controls: randomize order, control for length", "Spot-checks judge against human labels"],
      model: "The biggest risk is systematic bias in the judge — it tends to favor longer answers and whichever option is listed first. I'd control for that by randomizing order, normalizing or capping length, and using a clear rubric rather than a vague 'which is better'. Then I'd calibrate by spot-checking a sample of the judge's scores against human labels before I trust the aggregate.",
    },
    {
      id: "q-agents-1", skill: "agents", difficulty: "Core",
      prompt: "A teammate wants to build an 'agent' for a task. What's the clearest signal it should NOT be an agent, and what would you build instead?",
      cues: ["A fixed, known sequence of steps = a pipeline, not an agent", "Agents earn cost only when the plan is decided at runtime", "Mentions reliability/cost downside of agents"],
      model: "The clearest signal is that the steps are known ahead of time and run in a fixed order — that's a pipeline, not an agent. Agents only earn their extra cost and unreliability when the plan has to be decided at runtime over open-ended input. So I'd build the deterministic pipeline first, and reserve the agent for the genuinely branching part, if any.",
    },
    {
      id: "q-emb-1", skill: "embeddings", difficulty: "Core",
      prompt: "Short queries match poorly against very long chunks. Explain why, and what you'd change.",
      cues: ["Long chunks dilute the signal — relevant span is averaged away", "Smaller, semantically coherent chunks retrieve better", "Bonus: mentions overlap / sentence-window retrieval"],
      model: "A single embedding for a long passage is an average of many topics, so the one relevant sentence gets washed out and the short query doesn't match it well. I'd chunk smaller and along semantic boundaries so each vector represents one idea, with a little overlap so nothing gets split. If I need both precision and context, sentence-window retrieval — match small, return the surrounding window — works well.",
    },
  ],
};

/* ---------------- Notifications ---------------- */
const notifications = [
  { id: "n1", kind: "review", icon: "projects", title: "AI review ready", body: "Your docs assistant scored 83/100. One change unlocks mastery evidence.", time: "12m", unread: true },
  { id: "n2", kind: "mentor", icon: "mentor", title: "Mentor added a step", body: "Query expansion exercise added to your active module.", time: "1h", unread: true },
  { id: "n3", kind: "streak", icon: "flame", title: "23-day streak", body: "You're 8 days from your personal best.", time: "5h", unread: false },
  { id: "n4", kind: "checkpoint", icon: "calendar", title: "Checkpoint Tuesday", body: "Retrieval quality gate is scheduled for 16 Jun.", time: "1d", unread: false },
];

const searchIndex = [
  { type: "Skill", label: "Retrieval-augmented generation", to: "graph" },
  { type: "Module", label: "Build a RAG pipeline", to: "journey" },
  { type: "Project", label: "Docs assistant over your repo", to: "projects" },
  { type: "Lesson", label: "Chunking strategies", to: "journey" },
  { type: "Skill", label: "LLM evaluation", to: "graph" },
];

Object.assign(window, {
  DATA: { learner, skills, clusters, path, projects, checkpoints, mentorContext, mentorThread, suggestedPrompts, analytics, notifications, searchIndex, assessment, RUBRIC_DIMS, LEVEL_FACTOR, skillBanked, skillUpside },
});
