#!/usr/bin/env bash
# Motor de reproduccion. Limpia el texto y lo lee en streaming, sin bloquear.
#
#   speak.sh "texto"          leer un argumento
#   cat x.md | speak.sh       leer stdin
#   speak.sh --file x.md      leer un archivo
#   speak.sh --clip           leer el portapapeles
#   speak.sh --force "texto"  ignorar el flag ON/OFF
#
# Si el flag esta en OFF sale con codigo 0 y sin imprimir nada.

set -uo pipefail
. "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/config.sh"

FORCE=0
SOURCE="stdin"
ARG=""

while [ $# -gt 0 ]; do
  case "$1" in
    --force) FORCE=1; shift ;;
    --file)  SOURCE="file"; ARG="${2:-}"; shift 2 ;;
    --clip)  SOURCE="clip"; shift ;;
    --)      shift; SOURCE="arg"; ARG="$*"; break ;;
    -*)      shift ;;
    *)       SOURCE="arg"; ARG="$*"; break ;;
  esac
done

# 1. Interruptor. En OFF no se hace absolutamente nada.
if [ "$FORCE" -eq 0 ] && ! tts_enabled; then
  exit 0
fi

# 2. Dependencias. Silencioso en modo automatico, ruidoso si lo pediste tu.
if [ -z "${TTS_EDGE:-}" ] || [ -z "${TTS_PLAYER:-}" ] || [ -z "${TTS_PYTHON:-}" ]; then
  [ "$FORCE" -eq 1 ] && echo "tts: falta edge-tts, python3 o un reproductor (mpv/ffplay/afplay)" >&2
  exit 1
fi

# 3. Entrada.
case "$SOURCE" in
  arg)   RAW="$ARG" ;;
  file)  [ -r "$ARG" ] || { echo "tts: no puedo leer $ARG" >&2; exit 1; }
         RAW="$(cat "$ARG")" ;;
  clip)  RAW="$(pbpaste 2>/dev/null || true)" ;;
  stdin) RAW="$(cat)" ;;
esac

[ -n "${RAW//[[:space:]]/}" ] || exit 0

# 4. Limpieza. Sin texto hablable, se sale callado.
TEXT="$("$TTS_PYTHON" "$TTS_HOME/clean.py" --max-chars "$TTS_MAX_CHARS" <<<"$RAW")" || exit 0
[ -n "${TEXT//[[:space:]]/}" ] || exit 0

# 5. Cortar la reproduccion anterior: nunca deben sonar dos voces a la vez.
tts_stop_all

# 6. Reproduccion en segundo plano.
# Nada de FIFO: un FIFO sin escritor deja a mpv dormido para siempre. Con un
# pipe normal el reproductor recibe EOF y sale solo.
# Y nada de envolver el pipeline en un subshell: en bash, `$!` de un pipeline
# en segundo plano es el PID del ULTIMO comando, o sea el reproductor real.
# Guardar el PID del subshell era el bug que dejaba varias voces sonando.
# Nota: macOS trae bash 3.2, nada de mapfile.
if [ "$(basename "$TTS_PLAYER")" = "afplay" ]; then
  # afplay no acepta stdin: hay que pasar por un archivo temporal.
  TMP="$TTS_STATE/clip.$$.mp3"
  "$TTS_EDGE" --voice "$TTS_VOICE" --rate "$TTS_RATE" --volume "$TTS_VOLUME" \
    --write-media "$TMP" --text "$TEXT" >/dev/null 2>&1 || exit 0
  "$TTS_PLAYER" "$TMP" >/dev/null 2>&1 &
  echo $! >"$TTS_PIDFILE"
else
  # mpv y ffplay consumen el mp3 conforme llega: suena sin esperar el final.
  set -- $(tts_player_args)
  "$TTS_EDGE" \
    --voice "$TTS_VOICE" \
    --rate "$TTS_RATE" \
    --volume "$TTS_VOLUME" \
    --write-media /dev/stdout \
    --text "$TEXT" 2>/dev/null \
  | "$TTS_PLAYER" "$@" >/dev/null 2>&1 &
  echo $! >"$TTS_PIDFILE"
fi

disown -a 2>/dev/null || true
exit 0
