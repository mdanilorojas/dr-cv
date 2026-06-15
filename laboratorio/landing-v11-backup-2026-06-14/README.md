# Landing v11 — backup (pre-redesign, 14 Jun 2026)

Snapshot taken before the single-column editorial redesign.

- `source/v11-landing.ts`, `source/templates-v11-landing/`, `source/tokens-web.css`
  — the rebuildable source of the current landing.
- `source/perfil-data-original-gitHEAD/` — profile data at git HEAD (BEFORE Paso 1 copy edits).
- `source/perfil-data-current/` — profile data AFTER Paso 1 reformulation.
- `rendered/` — the actual built site (index.html, es/, work/, assets/, og.png) as it
  looked live. node_modules was empty at backup time, so this is the true old output.

Restore: copy `source/*` back over `generadores/` + `design-system/`, run `npm install`
then `npm run build:landing-v11`.
