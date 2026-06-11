# dr-cv

Maquina de carrera de Danilo Rojas: carrera, career training, evidencia profesional, publicables y generadores para llegar a USD 250k/ano como Product Designer / AI Product Designer remoto.

## Modelo mental

```text
carrera/ -> career-training/ -> perfil/ -> publicables/ -> generadores/ -> dist/
```

- `carrera/`: que hago ahora y por que.
- `career-training/`: que facultades estoy entrenando.
- `perfil/`: evidencia profesional propia (`data/` + `assets/`).
- `publicables/`: CV, landing, skills sheet y posts.
- `generadores/`: TypeScript que genera HTML/PDF/site.
- `dist/`: outputs generados y raiz publicada.

## Publicacion

La landing vive en `dist/landing-v11/` y se publica por GitHub Pages desde `.github/workflows/static.yml`.

Rutas clave:

- `danilorojas.design/`
- `danilorojas.design/es/`
- `danilorojas.design/work/*`
- `danilorojas.design/app`
- `danilorojas.design/daily`

`/app` y `/daily` son publicas por URL directa, pero no se enlazan desde la landing principal.

## Fuentes importantes

| Quiero cambiar... | Editar |
|---|---|
| Identidad, experiencia, skills, casos | `perfil/data/` |
| Foto y animaciones fuente | `perfil/assets/` |
| Daily tracker | `carrera/daily/index.html` |
| Career training app | `career-training/ur-assessment/index.html` |
| Landing/CV generation | `generadores/` |
| Design system activo | `design-system/` |
| Specs, plans, exploraciones | `laboratorio/` |

## Comandos

```bash
npm install
npm run build:skills-sheet
npm run build:cvs
npm run build:landing-v11
npm run build:all
npm test
npm run typecheck
```

Nota: los comandos que renderizan PDF/OG usan Puppeteer. En Codex sandbox pueden requerir ejecucion fuera del sandbox para que Chromium arranque.

## Outputs

- `dist/skills-sheet-{en,es}.{html,pdf}`
- `dist/cvs/*.pdf`
- `dist/landing-v11/`

No editar `dist/` a mano. Editar fuentes y regenerar.
