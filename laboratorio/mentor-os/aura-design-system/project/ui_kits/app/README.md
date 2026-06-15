# Career Training OS — App UI Kit

A high-fidelity recreation of the Aura **app surface**: the operative cockpit for the Career Training OS. Dark by default with a light toggle in the topbar.

## Screens
- **Dashboard** (`DashboardScreen.jsx`) — objective header, stat row, skill-cluster table, a live learning-path artifact, and the path-to-objective progress.
- **Diagnostic** (`DiagnosticScreen.jsx`) — the prose grader: write-don't-pick textarea beside a streaming grade artifact (visible thinking → plan → diff → mastery).
- **Skill graph** (`SkillGraphScreen.jsx`) — mastery distribution donut + clusters ranked by market value.

## Shell
`AppShell.jsx` provides the 248px sidebar (nav groups, accent left-rail active item) and the 57px blurred topbar (search, theme toggle, DR avatar).

## How it composes the system
Every primitive comes from the compiled bundle via `window.AuraDesignSystem_58f91b` — Button, Card, Badge, Mastery, Tabs, Segmented, ProgressBar, Alert, and the artifact surfaces (Artifact, Stream, PlanSteps, DiffReview, SkillChip). The kit only adds layout and screen-specific charts; it never re-implements a primitive.

Open `index.html` and use the sidebar to move between screens; the topbar button toggles dark/light.
