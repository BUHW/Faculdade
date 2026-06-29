"""Text preprocessing helpers for Portuguese FAQ retrieval."""

from __future__ import annotations

import re
import unicodedata
from functools import lru_cache
from typing import Iterable


_TOKEN_RE = re.compile(r"[0-9a-zA-ZÀ-ÖØ-öø-ÿ]+", re.UNICODE)

_FALLBACK_STOPWORDS = {
    "a",
    "ao",
    "aos",
    "as",
    "com",
    "como",
    "da",
    "das",
    "de",
    "do",
    "dos",
    "e",
    "em",
    "eu",
    "me",
    "meu",
    "minha",
    "na",
    "nas",
    "no",
    "nos",
    "o",
    "os",
    "ou",
    "para",
    "por",
    "posso",
    "qual",
    "quais",
    "que",
    "se",
    "tem",
    "tenho",
    "um",
    "uma",
    "voce",
    "voces",
}


def strip_accents(text: str) -> str:
    """Return text without accent marks."""
    normalized = unicodedata.normalize("NFKD", text)
    return "".join(char for char in normalized if not unicodedata.combining(char))


def normalize_text(text: str) -> str:
    """Lowercase, remove accents and collapse spacing."""
    text = strip_accents(text or "").lower()
    text = re.sub(r"\s+", " ", text).strip()
    return text


@lru_cache(maxsize=1)
def portuguese_stopwords() -> set[str]:
    """Load Portuguese stopwords from NLTK, falling back to a local list."""
    try:
        from nltk.corpus import stopwords

        words = stopwords.words("portuguese")
    except Exception:
        words = []

    normalized = {normalize_text(word) for word in words}
    return normalized | _FALLBACK_STOPWORDS


@lru_cache(maxsize=1)
def _stemmer():
    try:
        from nltk.stem import RSLPStemmer

        return RSLPStemmer()
    except Exception:
        return None


def tokenize(text: str) -> list[str]:
    """Tokenize Portuguese text with lightweight normalization."""
    normalized = normalize_text(text)
    return _TOKEN_RE.findall(normalized)


def preprocess_tokens(text: str, *, use_stemming: bool = True) -> list[str]:
    """Return normalized tokens suitable for retrieval."""
    stopwords = portuguese_stopwords()
    tokens = [token for token in tokenize(text) if token not in stopwords and len(token) > 1]

    if not use_stemming:
        return tokens

    stemmer = _stemmer()
    if stemmer is None:
        return tokens

    return [stemmer.stem(token) for token in tokens]


def preprocess_text(text: str, *, use_stemming: bool = True) -> str:
    """Return a preprocessed string for vectorizers."""
    return " ".join(preprocess_tokens(text, use_stemming=use_stemming))


def token_set(text: str) -> set[str]:
    """Return preprocessed tokens as a set for fallback similarity."""
    return set(preprocess_tokens(text))


def join_non_empty(parts: Iterable[str]) -> str:
    """Join optional text fields for training."""
    return " ".join(part.strip() for part in parts if part and part.strip())

