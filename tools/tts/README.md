# TTS — lectura en voz alta

Voz neuronal de Microsoft Edge (`edge-tts`) reproducida en streaming con `mpv`.
Sin API key, sin costo, sin conexión a nada más que Microsoft.

## Comandos

```bash
tools/tts/tts on          # activar lectura automática
tools/tts/tts off         # desactivar (y cortar lo que suene)
tools/tts/tts toggle      # alternar
tools/tts/tts status      # estado, voz, velocidad, binarios
tools/tts/tts stop        # cortar la reproducción actual

tools/tts/tts say "hola"     # leer un texto ahora
tools/tts/tts read FILE.md   # leer un archivo
tools/tts/tts clip           # leer el portapapeles
tools/tts/tts last           # releer la última respuesta de Claude Code
tools/tts/tts test           # prueba de audio
```

`say`, `read`, `clip`, `last` y `test` **ignoran el interruptor**: siempre suenan.
La lectura automática es la única que respeta ON/OFF.

## Voz y velocidad

```bash
tools/tts/tts voice                      # ver la voz actual
tools/tts/tts voice es-EC-AndreaNeural   # cambiar (reproduce una muestra)
tools/tts/tts voices                     # listar voces es- y en-
tools/tts/tts voices female              # filtrar

tools/tts/tts rate          # ver velocidad
tools/tts/tts rate +25%     # más rápido
tools/tts/tts rate -15%     # más lento
```

Los cambios se guardan en `.state/config.env` y persisten entre sesiones.

Voces recomendadas:

| Voz | Nota |
|---|---|
| `es-MX-JorgeNeural` | masculina, neutra latina — por defecto |
| `es-EC-AndreaNeural` | femenina, ecuatoriana |
| `es-MX-DaliaNeural` | femenina, neutra latina |
| `es-ES-AlvaroNeural` | masculina, España |
| `es-ES-ElviraNeural` | femenina, España |
| `en-US-AndrewNeural` | masculina, inglés — para practicar respuestas |

## Integración

**Claude Code** — dos piezas:

- Slash command `/tts` (`.claude/commands/tts.md`). Acepta los mismos argumentos
  que la CLI: `/tts off`, `/tts stop`, `/tts voice es-EC-AndreaNeural`, `/tts rate +25%`.
  Sin argumentos muestra el estado.
- Hook `Stop` en `.claude/settings.local.json`. Al terminar de responder lee la
  respuesta en voz alta, si el interruptor está en ON.

Ambos se cargan al iniciar la sesión: si acabas de crearlos, reinicia Claude Code.

El hook lee **todo el turno**, no solo el último mensaje: una respuesta con
herramientas de por medio se parte en varios mensajes y de otro modo se pierde
la mitad. Además espera `TTS_SETTLE` segundos (0.6 por defecto) antes de leer el
transcript, porque el hook dispara antes de que Claude Code termine de escribir
la última línea — sin esa pausa se lee el mensaje anterior.

Para depurar sin reproducir audio:

```bash
tools/tts/hooks/read-last.sh --dry     # imprime el texto que leería
```

**VS Code** — cinco tareas en `.vscode/tasks.json`: leer selección, leer archivo,
leer portapapeles, on/off, parar. Se lanzan con `Cmd+Shift+P → Run Task`.

Para un atajo de teclado, agrega esto a tu `keybindings.json`
(`Cmd+Shift+P → Preferences: Open Keyboard Shortcuts (JSON)`):

```json
{ "key": "cmd+alt+s", "command": "workbench.action.tasks.runTask", "args": "TTS: leer selección" },
{ "key": "cmd+alt+t", "command": "workbench.action.tasks.runTask", "args": "TTS: on/off" },
{ "key": "cmd+alt+.", "command": "workbench.action.tasks.runTask", "args": "TTS: parar" }
```

**Alias de shell** — para escribir `tts` en lugar de la ruta completa:

```bash
echo 'alias tts="/Users/dano/dev/dr-cv/tools/tts/tts"' >> ~/.zshrc && source ~/.zshrc
```

## Qué se filtra antes de leer

`clean.py` descarta lo que suena mal: bloques de código, tablas, URLs, rutas de
archivo, emoji, y la sintaxis de markdown. El código inline se conserva solo si
es una palabra pronunciable — `useMemo` se lee, `src/app/main.ts` se descarta.

Corte de seguridad en **2400 caracteres** para que una respuesta larga no se
convierta en un audiolibro. Ajustable:

```bash
echo 'TTS_MAX_CHARS="4000"' >> tools/tts/.state/config.env
```

## Piezas

| Archivo | Rol |
|---|---|
| `tts` | CLI de control |
| `speak.sh` | motor: limpia, sintetiza y reproduce sin bloquear |
| `clean.py` | markdown → texto hablable |
| `config.sh` | configuración y resolución de binarios |
| `hooks/read-last.sh` | hook `Stop` de Claude Code |
| `.state/` | interruptor, PID y config local (gitignored) |

Los binarios se resuelven a mano porque los hooks y las tareas de VS Code no
heredan el PATH de mise ni de homebrew.

## Dependencias

```bash
pip install edge-tts
brew install mpv        # o ffplay; afplay de macOS sirve de respaldo
```
