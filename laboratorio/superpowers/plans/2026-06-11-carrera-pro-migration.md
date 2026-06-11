# Carrera Pro Repo Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate `dr-cv` to the Carrera Pro structure while preserving the landing, GitHub Pages deploy root, `/app`, and `/daily`.

**Architecture:** Path migration only. Keep `dist/landing-v11/` as the published root. Move sources, update generators/tests/docs, then verify builds and hashes.

**Tech Stack:** Node 20+, TypeScript, tsx, Vitest, Puppeteer, GitHub Pages static deploy.

---

## Final Structure

```text
dr-cv/
|-- carrera/
|-- career-training/ur-assessment/
|-- perfil/data/
|-- perfil/assets/
|-- publicables/
|-- generadores/
|-- design-system/
|-- dist/
|-- laboratorio/
|-- referencias/
`-- tests/
```

## Migration Steps

- [x] Move `estrategia/` to `carrera/`.
- [x] Move `UR_training/starting_point/` to `career-training/ur-assessment/`.
- [x] Move `data/` to `perfil/data/`.
- [x] Move `assets/` to `perfil/assets/`.
- [x] Move `productos/` to `publicables/`.
- [x] Move `generators/` to `generadores/`.
- [x] Move `pruebas/` to `laboratorio/`.
- [x] Rename `design-system/tokens.css` to `design-system/tokens-print.css`.
- [x] Rename `design-system/tokens-v11.css` to `design-system/tokens-web.css`.
- [x] Update `package.json`, `tsconfig.json`, `vitest.config.ts`.
- [x] Update active generator paths.
- [x] Update test imports and fixture paths.
- [x] Update root navigation docs.

## Verification Checklist

- [ ] Run `npm.cmd run typecheck`.
- [ ] Run `npm.cmd test`.
- [ ] Run `npm.cmd run build:all` outside sandbox if Puppeteer needs Chromium access.
- [ ] Confirm `dist/landing-v11/index.html`, `CNAME`, `/app`, and `/daily` exist.
- [ ] Confirm app and daily hashes match their source files.
- [ ] Commit with `chore(repo): migrate to carrera pro structure`.

## Non-Goals

- Do not redesign landing or CV.
- Do not change professional content.
- Do not migrate to a database.
- Do not protect `/app` or `/daily`.
- Do not change the deploy root away from `dist/landing-v11/`.
