#!/usr/bin/env python3
"""Convierte markdown ruidoso en texto hablable.

Lee de stdin, escribe a stdout. Descarta lo que no se escucha bien:
bloques de codigo, tablas, URLs, rutas de archivo, emoji, y la sintaxis
de markdown. Deja el contenido explicativo.

    cat respuesta.md | clean.py --max-chars 2400
"""

import argparse
import re
import sys
import unicodedata

# --- bloques completos que se eliminan antes de procesar linea por linea ---
FENCED_CODE = re.compile(r"```.*?(?:```|\Z)", re.S)
HTML_COMMENT = re.compile(r"<!--.*?-->", re.S)
HTML_TAG = re.compile(r"<[^>\n]{1,200}>")

# --- patrones de linea ---
TABLE_ROW = re.compile(r"^\s*\|.*\|\s*$")
TABLE_SEP = re.compile(r"^\s*\|?[\s:|-]{5,}\|?\s*$")
HR = re.compile(r"^\s*([-*_])\s*(\1\s*){2,}$")
HEADING = re.compile(r"^\s{0,3}#{1,6}\s+")
LIST_BULLET = re.compile(r"^\s*([-*+]|\d{1,3}[.)])\s+")
CHECKBOX = re.compile(r"^\s*\[[ xX]\]\s*")
BLOCKQUOTE = re.compile(r"^\s*>+\s?")
INDENTED_CODE = re.compile(r"^(?: {4,}|\t)\S")

# --- patrones inline ---
IMAGE = re.compile(r"!\[[^\]]*\]\([^)]*\)")
LINK = re.compile(r"\[([^\]]+)\]\([^)]*\)")
WIKILINK = re.compile(r"\[\[([^\]|]+)(?:\|[^\]]+)?\]\]")
BARE_URL = re.compile(r"<?\b(?:https?://|www\.)\S+>?")
INLINE_CODE = re.compile(r"`([^`]+)`")
BOLD_ITALIC = re.compile(r"(\*{1,3}|_{1,3})(?=\S)(.+?)(?<=\S)\1")
STRIKE = re.compile(r"~~(.+?)~~")
FOOTNOTE = re.compile(r"\[\^[^\]]+\]")

# Codigo inline que suena mal dicho en voz alta: rutas, extensiones,
# identificadores con guion bajo, flags de CLI, llamadas de funcion.
UNSPEAKABLE = re.compile(r"[/\\]|\.\w{1,5}$|_|^--?\w|\(\)$|::")

# Rutas sueltas fuera de backticks.
PATH_LIKE = re.compile(r"(?:^|\s)(?:~|\.{1,2})?/[\w.\-/]{4,}")

SENTENCE_END = re.compile(r"[.!?…:;]$")


def strip_emoji(text: str) -> str:
    out = []
    for char in text:
        if char in "\n\t ":
            out.append(char)
            continue
        category = unicodedata.category(char)
        # So = simbolo otro (emoji, dingbats), Cs = surrogate, Co = uso privado
        if category in ("So", "Cs", "Co"):
            continue
        if ord(char) >= 0x1F000:
            continue
        out.append(char)
    return "".join(out)


def clean_inline(text: str) -> str:
    text = IMAGE.sub(" ", text)
    text = LINK.sub(r"\1", text)
    text = WIKILINK.sub(r"\1", text)
    text = FOOTNOTE.sub("", text)
    text = BARE_URL.sub(" ", text)
    # codigo inline: se conserva solo si es una palabra pronunciable
    text = INLINE_CODE.sub(
        lambda m: " " if UNSPEAKABLE.search(m.group(1)) or len(m.group(1)) > 28 else m.group(1),
        text,
    )
    text = BOLD_ITALIC.sub(r"\2", text)
    text = STRIKE.sub(r"\1", text)
    text = HTML_TAG.sub(" ", text)
    text = PATH_LIKE.sub(" ", text)
    text = text.replace("—", ", ").replace("–", ", ").replace("→", ", ")
    text = text.replace("“", '"').replace("”", '"').replace("’", "'")
    text = strip_emoji(text)
    return re.sub(r"[ \t]+", " ", text).strip()


def clean(raw: str) -> str:
    raw = HTML_COMMENT.sub(" ", raw)
    raw = FENCED_CODE.sub(" ", raw)

    lines, in_frontmatter = [], False
    for index, line in enumerate(raw.splitlines()):
        if index == 0 and line.strip() == "---":
            in_frontmatter = True
            continue
        if in_frontmatter:
            if line.strip() in ("---", "..."):
                in_frontmatter = False
            continue

        if not line.strip():
            lines.append("")
            continue
        if TABLE_ROW.match(line) or TABLE_SEP.match(line) or HR.match(line):
            continue
        if INDENTED_CODE.match(line):
            continue

        line = BLOCKQUOTE.sub("", line)
        line = HEADING.sub("", line)
        line = CHECKBOX.sub("", LIST_BULLET.sub("", line))

        spoken = clean_inline(line)
        if not spoken:
            continue
        # Una linea suelta sin letras (separadores, numeracion huerfana) no aporta.
        if not re.search(r"[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]{2,}", spoken):
            continue
        # Los encabezados y items sin puntuacion final necesitan una pausa.
        if not SENTENCE_END.search(spoken):
            spoken += "."
        lines.append(spoken)

    # Reunir en parrafos: las lineas en blanco marcan pausa larga.
    text = "\n".join(lines)
    text = re.sub(r"\n{2,}", "\n\n", text)
    text = re.sub(r"\.{2,}", ".", text)
    return text.strip()


def truncate(text: str, limit: int) -> str:
    if limit <= 0 or len(text) <= limit:
        return text
    cut = text[:limit]
    # cortar en el ultimo final de oracion para no dejar la frase colgando
    boundary = max(cut.rfind(". "), cut.rfind(".\n"), cut.rfind("? "), cut.rfind("! "))
    if boundary > limit * 0.5:
        cut = cut[: boundary + 1]
    return cut.rstrip() + " … Texto recortado."


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--max-chars", type=int, default=0)
    args = parser.parse_args()

    text = truncate(clean(sys.stdin.read()), args.max_chars)
    if not text:
        return 1
    sys.stdout.write(text)
    return 0


if __name__ == "__main__":
    sys.exit(main())
