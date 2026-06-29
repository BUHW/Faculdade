"""FAQ retrieval chatbot for a simulated technology store."""

from __future__ import annotations

import json
import math
from dataclasses import dataclass
from pathlib import Path
from random import Random
from typing import Any

from .catalog import DEFAULT_CATALOG_PATH, ProductCatalog
from .preprocessing import join_non_empty, preprocess_tokens, token_set


DEFAULT_DATA_PATH = Path(__file__).resolve().parents[1] / "data" / "faq_tecnologia.json"

FALLBACK_RESPONSE = (
    "Nao encontrei uma resposta confiavel para essa pergunta. "
    "Tente reformular ou pergunte sobre produtos, pagamento, entrega, garantia, troca ou suporte tecnico."
)

INTENT_HINTS = {
    "formas_pagamento": {
        "boleto",
        "cartao",
        "credito",
        "debito",
        "pagar",
        "pagamento",
        "parcelamento",
        "parcelar",
        "pix",
    },
    "prazo_entrega": {"cep", "entrega", "entregar", "frete", "prazo", "receber"},
    "garantia": {"defeito", "garantia", "nota", "reparo", "trocar"},
    "troca_devolucao": {"devolver", "devolucao", "reembolso", "troca", "trocar"},
    "suporte_tecnico": {"assistencia", "defeito", "erro", "hd", "problema", "suporte", "tecnico"},
    "canal_atendimento": {"atendente", "atendimento", "chat", "telefone", "whatsapp"},
    "horario_atendimento": {"abre", "aberto", "atendimento", "fecha", "horario", "sabado"},
    "produtos_disponiveis": {"disponivel", "estoque", "modelo", "produto", "vendem", "vender"},
}


@dataclass(frozen=True)
class FAQRecord:
    """Single FAQ example used by the retriever."""

    id: str
    intent: str
    question: str
    answer: str
    source_dataset: str = ""
    source_domain: str = ""
    tags: tuple[str, ...] = ()

    @property
    def training_text(self) -> str:
        return join_non_empty([self.question, self.intent.replace("_", " "), " ".join(self.tags)])


@dataclass(frozen=True)
class ChatbotResponse:
    """Structured response returned by the chatbot."""

    answer: str
    intent: str
    confidence: float
    matched_question: str | None
    source_domain: str | None
    used_fallback: bool


def load_faq_dataset(path: str | Path = DEFAULT_DATA_PATH) -> tuple[dict[str, Any], list[FAQRecord]]:
    """Load and validate the local FAQ dataset."""
    data_path = Path(path)
    with data_path.open("r", encoding="utf-8") as file:
        payload = json.load(file)

    raw_records = payload.get("faqs")
    if not isinstance(raw_records, list) or not raw_records:
        raise ValueError(f"Dataset invalido em {data_path}: campo 'faqs' ausente ou vazio.")

    records: list[FAQRecord] = []
    for index, item in enumerate(raw_records, start=1):
        question = str(item.get("question", "")).strip()
        answer = str(item.get("answer", "")).strip()
        intent = str(item.get("intent", "")).strip()
        if not question or not answer or not intent:
            raise ValueError(f"Registro {index} do dataset esta incompleto.")

        tags = item.get("tags") or []
        records.append(
            FAQRecord(
                id=str(item.get("id") or f"faq_{index:03d}"),
                intent=intent,
                question=question,
                answer=answer,
                source_dataset=str(item.get("source_dataset", "")),
                source_domain=str(item.get("source_domain", "")),
                tags=tuple(str(tag) for tag in tags),
            )
        )

    return payload.get("metadata", {}), records


class TechnologyStoreChatbot:
    """Similarity-based chatbot backed by FAQ examples."""

    def __init__(
        self,
        data_path: str | Path = DEFAULT_DATA_PATH,
        *,
        catalog_path: str | Path = DEFAULT_CATALOG_PATH,
        min_confidence: float = 0.18,
        random_seed: int = 42,
    ) -> None:
        self.metadata, self.records = load_faq_dataset(data_path)
        self.catalog = ProductCatalog(catalog_path)
        self.min_confidence = min_confidence
        self._random = Random(random_seed)
        self._sklearn_ready = False
        self._vectorizer = None
        self._matrix = None
        self._token_sets: list[set[str]] = []
        self._record_hint_boosts: list[float] = []
        self._last_product_id: str | None = None
        self._last_categories: tuple[str, ...] = ()
        self._build_index()

    @property
    def backend(self) -> str:
        return "scikit-learn tf-idf" if self._sklearn_ready else "token overlap fallback"

    def _build_index(self) -> None:
        corpus = [record.training_text for record in self.records]

        try:
            from sklearn.feature_extraction.text import TfidfVectorizer
            from sklearn.metrics.pairwise import cosine_similarity  # noqa: F401

            self._vectorizer = TfidfVectorizer(
                tokenizer=preprocess_tokens,
                token_pattern=None,
                ngram_range=(1, 2),
                min_df=1,
            )
            self._matrix = self._vectorizer.fit_transform(corpus)
            self._sklearn_ready = True
            return
        except Exception:
            self._sklearn_ready = False

        self._token_sets = [token_set(text) for text in corpus]

    def ask(self, question: str) -> ChatbotResponse:
        """Answer a user question."""
        question = (question or "").strip()
        if not question:
            return self._fallback()

        catalog_response = self.catalog.answer(
            question,
            context_product_id=self._last_product_id,
            context_categories=self._last_categories,
        )
        if catalog_response is not None:
            if catalog_response.product_id:
                self._last_product_id = catalog_response.product_id
            elif catalog_response.intent == "modelos_disponiveis":
                self._last_product_id = None

            if catalog_response.categories:
                self._last_categories = catalog_response.categories

            return ChatbotResponse(
                answer=catalog_response.answer,
                intent=catalog_response.intent,
                confidence=catalog_response.confidence,
                matched_question=None,
                source_domain="catalogo_simulado",
                used_fallback=False,
            )

        query_tokens = token_set(question)
        index, confidence = self._best_match(question, query_tokens)
        if index is None or confidence < self.min_confidence:
            return self._fallback(confidence=confidence)

        record = self.records[index]
        return ChatbotResponse(
            answer=record.answer,
            intent=record.intent,
            confidence=confidence,
            matched_question=record.question,
            source_domain=record.source_domain or None,
            used_fallback=False,
        )

    def _best_match(self, question: str, query_tokens: set[str]) -> tuple[int | None, float]:
        if self._sklearn_ready:
            return self._best_match_sklearn(question, query_tokens)
        return self._best_match_tokens(query_tokens)

    def _best_match_sklearn(self, question: str, query_tokens: set[str]) -> tuple[int | None, float]:
        from sklearn.metrics.pairwise import cosine_similarity

        if self._vectorizer is None or self._matrix is None:
            return None, 0.0

        query_vector = self._vectorizer.transform([question])
        scores = cosine_similarity(query_vector, self._matrix).ravel()
        if scores.size == 0:
            return None, 0.0

        adjusted_scores = scores.copy()
        for index, record in enumerate(self.records):
            adjusted_scores[index] += _intent_hint_boost(query_tokens, record.intent)

        best_index = int(adjusted_scores.argmax())
        return best_index, float(adjusted_scores[best_index])

    def _best_match_tokens(self, query_tokens: set[str]) -> tuple[int | None, float]:
        if not query_tokens:
            return None, 0.0

        best_index: int | None = None
        best_score = 0.0
        for index, (record, candidate_tokens) in enumerate(zip(self.records, self._token_sets)):
            score = _cosine_token_score(query_tokens, candidate_tokens)
            score += _intent_hint_boost(query_tokens, record.intent)
            if score > best_score:
                best_index = index
                best_score = score

        return best_index, best_score

    def _fallback(self, *, confidence: float = 0.0) -> ChatbotResponse:
        return ChatbotResponse(
            answer=FALLBACK_RESPONSE,
            intent="fallback",
            confidence=confidence,
            matched_question=None,
            source_domain=None,
            used_fallback=True,
        )


def _cosine_token_score(query_tokens: set[str], candidate_tokens: set[str]) -> float:
    if not query_tokens or not candidate_tokens:
        return 0.0
    intersection = len(query_tokens & candidate_tokens)
    denominator = math.sqrt(len(query_tokens) * len(candidate_tokens))
    return intersection / denominator if denominator else 0.0


def _intent_hint_boost(query_tokens: set[str], intent: str) -> float:
    hints = INTENT_HINTS.get(intent, set())
    if not hints:
        return 0.0

    matches = len(query_tokens & hints)
    if matches == 0:
        return 0.0

    return min(0.45, matches * 0.18)
