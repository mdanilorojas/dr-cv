#!/usr/bin/env bash
# Configuracion compartida del sistema TTS. Se importa desde speak.sh y tts.
# Sobrescribible por variables de entorno: TTS_VOICE, TTS_RATE, TTS_VOLUME.

TTS_HOME="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TTS_STATE="$TTS_HOME/.state"
TTS_FLAG="$TTS_STATE/enabled"
TTS_PIDFILE="$TTS_STATE/player.pid"
TTS_LOCAL="$TTS_STATE/config.env"

mkdir -p "$TTS_STATE"

# Valores por defecto. `tts voice` / `tts rate` los persisten en config.env.
TTS_VOICE_DEFAULT="es-MX-JorgeNeural"
TTS_RATE_DEFAULT="+0%"
TTS_VOLUME_DEFAULT="+0%"
# Corte de seguridad: no leer respuestas gigantes en voz alta.
TTS_MAX_CHARS_DEFAULT=2400

[ -f "$TTS_LOCAL" ] && . "$TTS_LOCAL"

TTS_VOICE="${TTS_VOICE:-${VOICE:-$TTS_VOICE_DEFAULT}}"
TTS_RATE="${TTS_RATE:-${RATE:-$TTS_RATE_DEFAULT}}"
TTS_VOLUME="${TTS_VOLUME:-${VOLUME:-$TTS_VOLUME_DEFAULT}}"
TTS_MAX_CHARS="${TTS_MAX_CHARS:-${MAX_CHARS:-$TTS_MAX_CHARS_DEFAULT}}"

# Los binarios se resuelven a mano: los hooks de Claude Code y las tareas de
# VS Code no siempre heredan el PATH de mise/homebrew.
_tts_find() {
  local name="$1" candidate
  if command -v "$name" >/dev/null 2>&1; then
    command -v "$name"
    return 0
  fi
  for candidate in \
    "$HOME/.local/share/mise/installs/python/3.13/bin/$name" \
    "$HOME/.local/bin/$name" \
    "/opt/homebrew/bin/$name" \
    "/usr/local/bin/$name" \
    "/usr/bin/$name"; do
    [ -x "$candidate" ] && { echo "$candidate"; return 0; }
  done
  # ultimo intento: cualquier version de python instalada por mise
  for candidate in "$HOME"/.local/share/mise/installs/python/*/bin/"$name"; do
    [ -x "$candidate" ] && { echo "$candidate"; return 0; }
  done
  return 1
}

TTS_EDGE="$(_tts_find edge-tts || true)"
TTS_PYTHON="$(_tts_find python3 || true)"
TTS_PLAYER="$(_tts_find mpv || _tts_find ffplay || _tts_find afplay || true)"

# Marca en la linea de comandos del reproductor. Permite matar solo nuestras
# instancias con pkill sin tocar un mpv que el usuario haya abierto aparte.
TTS_MARKER="drcvtts=1"

tts_player_args() {
  case "$(basename "${TTS_PLAYER:-}")" in
    mpv)    printf '%s\n' --no-terminal --really-quiet --no-video --idle=no \
                          "--script-opts=$TTS_MARKER" - ;;
    ffplay) printf '%s\n' -nodisp -autoexit -loglevel quiet - ;;
    afplay) printf '%s\n' - ;;
  esac
}

tts_enabled() { [ -f "$TTS_FLAG" ]; }

# Corta todo lo que este sonando y limpia el estado. Idempotente.
tts_stop_all() {
  if [ -f "$TTS_PIDFILE" ]; then
    while IFS= read -r pid; do
      case "$pid" in ''|*[!0-9]*) continue ;; esac
      kill "$pid" 2>/dev/null
    done <"$TTS_PIDFILE"
    rm -f "$TTS_PIDFILE"
  fi
  # Red de seguridad: procesos huerfanos de una sesion anterior.
  pkill -f "$TTS_MARKER" 2>/dev/null
  rm -f "$TTS_STATE"/stream.*.fifo "$TTS_STATE"/clip.*.mp3 2>/dev/null
  return 0
}
