#!/usr/bin/env bash
# Hook Stop de Claude Code: lee en voz alta la ultima respuesta del asistente.
#
# Claude Code entrega un JSON por stdin con `transcript_path`. Si no llega
# nada (invocacion manual via `tts last`), se busca el transcript mas reciente
# del proyecto actual.
#
# Sale con 0 siempre: un hook que falla no debe interrumpir la sesion.

set -uo pipefail
. "$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/config.sh"

FORCE=""
DRY=0
for arg in "$@"; do
  case "$arg" in
    --force) FORCE="--force" ;;
    --dry)   DRY=1; FORCE="--force" ;;  # imprime el texto en vez de leerlo
  esac
done

# Con el interruptor en OFF no se hace nada, ni se lee el transcript.
if [ -z "$FORCE" ] && ! tts_enabled; then
  exit 0
fi

[ -n "${TTS_PYTHON:-}" ] || exit 0

PAYLOAD=""
# stdin solo se lee si es un pipe: si no, el hook se colgaria esperando.
if [ ! -t 0 ]; then
  PAYLOAD="$(cat 2>/dev/null || true)"
fi

# El hook dispara antes de que Claude Code termine de flushear la ultima linea
# del transcript. Sin esta pausa se lee el mensaje anterior, no el final.
sleep "${TTS_SETTLE:-0.6}"

TEXT="$(
  TTS_PAYLOAD="$PAYLOAD" TTS_CWD="$PWD" "$TTS_PYTHON" - <<'PY' 2>/dev/null
import json, os, sys
from pathlib import Path

payload = os.environ.get("TTS_PAYLOAD", "").strip()
transcript = None

if payload:
    try:
        transcript = json.loads(payload).get("transcript_path")
    except (ValueError, AttributeError):
        transcript = None

if not transcript:
    # Fallback: el transcript mas reciente del proyecto actual.
    slug = str(Path(os.environ.get("TTS_CWD", ".")).resolve()).replace("/", "-")
    project = Path.home() / ".claude" / "projects" / slug
    files = sorted(project.glob("*.jsonl"), key=lambda p: p.stat().st_mtime, reverse=True)
    if not files:
        sys.exit(1)
    transcript = files[0]

path = Path(transcript)
if not path.is_file():
    sys.exit(1)

def text_blocks(entry):
    """Texto plano de una entrada; ignora tool_use, tool_result y thinking."""
    content = entry.get("message", {}).get("content")
    if isinstance(content, str):
        return [content]
    if isinstance(content, list):
        return [
            block.get("text", "")
            for block in content
            if isinstance(block, dict) and block.get("type") == "text"
        ]
    return []


entries = []
with path.open(encoding="utf-8", errors="replace") as handle:
    for line in handle:
        line = line.strip()
        if not line:
            continue
        try:
            entries.append(json.loads(line))
        except ValueError:
            continue

# Retroceder hasta el ultimo mensaje real del usuario. Los `user` que solo
# contienen tool_result son ecos de herramientas, no turnos nuevos.
start = 0
for index in range(len(entries) - 1, -1, -1):
    entry = entries[index]
    if entry.get("type") == "user" and any(t.strip() for t in text_blocks(entry)):
        start = index + 1
        break

# Todo el turno, no solo el ultimo mensaje: una respuesta con herramientas de
# por medio se parte en varios mensajes y si no se pierde la mitad.
parts = []
for entry in entries[start:]:
    if entry.get("type") != "assistant":
        continue
    for chunk in text_blocks(entry):
        chunk = chunk.strip()
        if chunk:
            parts.append(chunk)

if not parts:
    sys.exit(1)
sys.stdout.write("\n\n".join(parts))
PY
)" || exit 0

[ -n "${TEXT//[[:space:]]/}" ] || exit 0

if [ "$DRY" -eq 1 ]; then
  printf '%s\n' "$TEXT"
  exit 0
fi

printf '%s' "$TEXT" | "$TTS_HOME/speak.sh" $FORCE
exit 0
