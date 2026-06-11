# Landing exploration â€” archived studies

Historical iterations of the landing page, kept for reference.

**Not part of the production build.** These generadores are excluded from
`tsconfig.json` and `vitest.config.ts`, so their imports may be stale.
The production landing lives in `generadores/v11-landing.ts` â†’
`dist/landing-v11/`.

## What's here

- `generadores/landing.ts` â€” Phase 3 SPA with 5 tabs (EN + ES). The first
  shipped version.
- `generadores/huly-landing.ts` â€” Huly-style exploration, single-page with
  heavier motion.
- `generadores/templates/landing/` and `templates/huly-landing/` â€” their
  template code and component breakdowns.
- `tests/` â€” the Vitest suites that covered these when they were live.

## Reviving one of these

If you want to resurrect a study:

1. Move it back under `generadores/` (and its tests to `tests/`).
2. Fix relative imports (they currently point to `../lib/` paths that no
   longer match once moved deeper).
3. Re-add its `build:â€¦` script to `package.json`.
4. Drop the `studies/**` exclusions from `tsconfig.json` and
   `vitest.config.ts`, or make them narrower.

Easier: start a new iteration from `v11-landing` and keep the old study
as reference only.

## Why archived, not deleted

These studies contain decisions that informed v11 â€” component patterns,
what worked, what didn't. Git history alone loses the ability to run
them side-by-side with v11 at the same commit. Keeping the code is cheap.
