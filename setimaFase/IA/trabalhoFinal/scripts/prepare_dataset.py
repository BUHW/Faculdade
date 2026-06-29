"""Prepare a small technology-store FAQ dataset from MFAQ.

The script uses Hugging Face Dataset Server search endpoints, filters Portuguese
FAQ questions, maps them to project intents and normalizes answers to the
simulated store policy.
"""

from __future__ import annotations

import argparse
import html
import json
import re
import unicodedata
import urllib.parse
import urllib.request
from datetime import date
from pathlib import Path
from typing import Iterable


HF_SEARCH_URL = "https://datasets-server.huggingface.co/search"
DATASET_NAME = "clips/mfaq"
CONFIG = "pt_flat"
SPLIT = "train"

QUERY_INTENTS = {
    "notebook": "produtos_disponiveis",
    "computador": "produtos_disponiveis",
    "celular smartphone": "produtos_disponiveis",
    "monitor teclado mouse": "produtos_disponiveis",
    "pagamento notebook": "formas_pagamento",
    "boleto compra": "formas_pagamento",
    "pix pagamento": "formas_pagamento",
    "entrega notebook": "prazo_entrega",
    "frete produto": "prazo_entrega",
    "garantia notebook": "garantia",
    "garantia celular": "garantia",
    "troca produto": "troca_devolucao",
    "devolucao produto": "troca_devolucao",
    "defeito notebook": "suporte_tecnico",
    "recuperar hd notebook": "suporte_tecnico",
    "suporte tecnico computador": "suporte_tecnico",
    "atendimento whatsapp": "canal_atendimento",
    "horario atendimento loja": "horario_atendimento",
}

CANONICAL_ANSWERS = {
    "produtos_disponiveis": (
        "Atendemos consultas sobre notebooks, computadores, celulares, monitores, teclados, mouses, "
        "webcams, roteadores e acessorios. Para estoque e modelos exatos, informe o produto desejado."
    ),
    "formas_pagamento": (
        "A loja trabalha com Pix, cartao de credito, cartao de debito e boleto. O parcelamento depende "
        "do valor da compra e das regras vigentes no momento do pedido."
    ),
    "prazo_entrega": (
        "O prazo de entrega depende do CEP, disponibilidade do produto e modalidade de frete. Em uma "
        "simulacao de atendimento, o cliente deve informar o CEP para estimativa."
    ),
    "garantia": (
        "Produtos de tecnologia possuem garantia conforme fabricante e nota fiscal. Se o item apresentar "
        "defeito, informe numero do pedido, data da compra e descricao do problema."
    ),
    "troca_devolucao": (
        "Trocas e devolucoes seguem a politica da loja e o Codigo de Defesa do Consumidor. Informe numero "
        "do pedido, produto e motivo para abertura da solicitacao."
    ),
    "suporte_tecnico": (
        "Para suporte tecnico, descreva o produto, o erro apresentado e os testes ja realizados. Quando "
        "necessario, o atendimento encaminha para assistencia tecnica ou garantia."
    ),
    "canal_atendimento": (
        "O atendimento simulado pode orientar por chat, telefone ou WhatsApp da loja. Para este projeto, "
        "a interacao pratica acontece pelo terminal."
    ),
    "horario_atendimento": (
        "O horario simulado de atendimento e de segunda a sexta, das 8h as 18h, e aos sabados das 9h as 13h."
    ),
}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Gera dataset FAQ de tecnologia a partir do MFAQ.")
    parser.add_argument("--output", type=Path, default=Path("data/faq_tecnologia.json"))
    parser.add_argument("--max-per-intent", type=int, default=8)
    parser.add_argument("--timeout", type=float, default=30.0)
    return parser.parse_args()


def fetch_rows(query: str, *, timeout: float) -> list[dict]:
    params = urllib.parse.urlencode(
        {
            "dataset": DATASET_NAME,
            "config": CONFIG,
            "split": SPLIT,
            "query": query,
        }
    )
    request = urllib.request.Request(f"{HF_SEARCH_URL}?{params}", headers={"User-Agent": "ia-project-chatbot/1.0"})
    with urllib.request.urlopen(request, timeout=timeout) as response:
        payload = json.loads(response.read().decode("utf-8"))
    return [item["row"] for item in payload.get("rows", [])]


def clean_text(value: str) -> str:
    value = html.unescape(value or "")
    value = re.sub(r"<[^>]+>", " ", value)
    value = "".join(char for char in value if unicodedata.category(char)[0] != "C")
    value = re.sub(r"\s+", " ", value).strip()
    return value


def normalize_for_id(text: str) -> str:
    text = unicodedata.normalize("NFKD", text.lower())
    text = "".join(char for char in text if not unicodedata.combining(char))
    return re.sub(r"[^a-z0-9]+", " ", text).strip()


def source_record_id(row: dict, intent: str, index: int) -> str:
    domain_id = str(row.get("domain_id", "domain"))
    pair_id = str(row.get("pair_id", index))
    return f"mfaq_pt_{intent}_{domain_id}_{pair_id}"


def build_dataset(max_per_intent: int, timeout: float) -> dict:
    records: list[dict] = []
    seen_questions: set[str] = set()
    per_intent: dict[str, int] = {intent: 0 for intent in set(QUERY_INTENTS.values())}

    for query, intent in QUERY_INTENTS.items():
        if per_intent[intent] >= max_per_intent:
            continue

        for row in fetch_rows(query, timeout=timeout):
            if per_intent[intent] >= max_per_intent:
                break

            question = clean_text(row.get("question", ""))
            source_answer = clean_text(row.get("answer", ""))
            if not question or not source_answer:
                continue

            dedupe_key = normalize_for_id(question)
            if dedupe_key in seen_questions:
                continue
            seen_questions.add(dedupe_key)

            records.append(
                {
                    "id": source_record_id(row, intent, len(records) + 1),
                    "intent": intent,
                    "question": question,
                    "answer": CANONICAL_ANSWERS[intent],
                    "source_answer": source_answer[:600],
                    "source_dataset": DATASET_NAME,
                    "source_config": CONFIG,
                    "source_domain": row.get("domain", ""),
                    "source_row": {
                        "domain_id": row.get("domain_id"),
                        "pair_id": row.get("pair_id"),
                        "language": row.get("language"),
                    },
                    "tags": [intent.replace("_", " "), query],
                }
            )
            per_intent[intent] += 1

    return {
        "metadata": {
            "project": "Chatbot Inteligente para Atendimento de Loja de Tecnologia",
            "generated_at": date.today().isoformat(),
            "source": {
                "name": "MFAQ: a Multilingual FAQ Dataset",
                "dataset": DATASET_NAME,
                "huggingface_url": "https://huggingface.co/datasets/clips/mfaq",
                "paper_url": "https://arxiv.org/abs/2109.12870",
                "config": CONFIG,
                "split": SPLIT,
            },
            "method": (
                "Perguntas em portugues foram buscadas no MFAQ por palavras-chave de tecnologia e atendimento. "
                "As respostas foram normalizadas para politicas simuladas de uma loja de tecnologia."
            ),
            "intents": sorted(per_intent),
            "record_count": len(records),
        },
        "faqs": records,
    }


def save_dataset(dataset: dict, output: Path) -> None:
    output.parent.mkdir(parents=True, exist_ok=True)
    with output.open("w", encoding="utf-8") as file:
        json.dump(dataset, file, ensure_ascii=False, indent=2)
        file.write("\n")


def main() -> int:
    args = parse_args()
    dataset = build_dataset(max_per_intent=args.max_per_intent, timeout=args.timeout)
    if not dataset["faqs"]:
        raise RuntimeError("Nenhum registro foi encontrado no MFAQ para os filtros configurados.")
    save_dataset(dataset, args.output)
    print(f"Dataset salvo em {args.output} com {len(dataset['faqs'])} registros.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

