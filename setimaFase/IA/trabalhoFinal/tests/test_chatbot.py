from pathlib import Path

from src.chatbot import DEFAULT_DATA_PATH, TechnologyStoreChatbot, load_faq_dataset


def test_dataset_loads_records():
    metadata, records = load_faq_dataset(DEFAULT_DATA_PATH)

    assert metadata["source"]["dataset"] == "clips/mfaq"
    assert len(records) >= 20
    assert {record.intent for record in records} >= {
        "produtos_disponiveis",
        "formas_pagamento",
        "prazo_entrega",
        "garantia",
        "troca_devolucao",
        "suporte_tecnico",
    }


def test_chatbot_answers_payment_question():
    chatbot = TechnologyStoreChatbot(DEFAULT_DATA_PATH)

    response = chatbot.ask("Posso pagar um notebook no Pix ou boleto?")

    assert not response.used_fallback
    assert response.intent == "formas_pagamento"
    assert "Pix" in response.answer or "boleto" in response.answer


def test_chatbot_lists_notebook_and_phone_models():
    chatbot = TechnologyStoreChatbot(DEFAULT_DATA_PATH)

    response = chatbot.ask("Quais modelos de notbook ou celular voces vendem?")

    assert not response.used_fallback
    assert response.intent == "modelos_disponiveis"
    assert "MacBook Pro" in response.answer
    assert "iPhone 15" in response.answer


def test_chatbot_answers_specific_product_price():
    chatbot = TechnologyStoreChatbot(DEFAULT_DATA_PATH)

    response = chatbot.ask("Gostaria de comprar um macbook pro, qual o valor?")

    assert not response.used_fallback
    assert response.intent == "preco_produto"
    assert "MacBook Pro 14 M3" in response.answer
    assert "R$" in response.answer


def test_chatbot_answers_installments_for_specific_product():
    chatbot = TechnologyStoreChatbot(DEFAULT_DATA_PATH)

    response = chatbot.ask("em quantas vezes da para fazer o iphone 15 no cartao?")

    assert not response.used_fallback
    assert response.intent == "parcelamento_produto"
    assert "iPhone 15" in response.answer
    assert "10x" in response.answer
    assert "R$ 529,90" in response.answer


def test_chatbot_answers_interest_follow_up_from_context():
    chatbot = TechnologyStoreChatbot(DEFAULT_DATA_PATH)

    chatbot.ask("em quantas vezes da para fazer o iphone 15 no cartao?")
    response = chatbot.ask("Essas 10x sao sem juros?")

    assert not response.used_fallback
    assert response.intent == "parcelamento_produto"
    assert "iPhone 15" in response.answer
    assert "sem juros" in response.answer
    assert "R$ 529,90" in response.answer


def test_chatbot_answers_cheapest_follow_up_from_category_context():
    chatbot = TechnologyStoreChatbot(DEFAULT_DATA_PATH)

    chatbot.ask("quais modelos de celulares voces vendem?")
    response = chatbot.ask("qual e o mais barato?")

    assert not response.used_fallback
    assert response.intent == "produto_mais_barato"
    assert "Motorola Edge 40" in response.answer
    assert "R$ 2.499,00" in response.answer


def test_category_follow_up_ignores_stale_product_context():
    chatbot = TechnologyStoreChatbot(DEFAULT_DATA_PATH)

    chatbot.ask("em quantas vezes da para fazer o iphone 15 no cartao?")
    chatbot.ask("Quais modelos de celulares voces vendem?")
    cheapest = chatbot.ask("Qual e o modelo mais barato?")
    most_expensive = chatbot.ask("Qual e o modelo mais caro?")

    assert cheapest.intent == "produto_mais_barato"
    assert "Motorola Edge 40" in cheapest.answer
    assert most_expensive.intent == "produto_mais_caro"
    assert "iPhone 15" in most_expensive.answer


def test_chatbot_answers_delivery_follow_up_from_product_context():
    chatbot = TechnologyStoreChatbot(DEFAULT_DATA_PATH)

    chatbot.ask("Gostaria de comprar um macbook pro, qual o valor?")
    response = chatbot.ask("e a entrega?")

    assert not response.used_fallback
    assert response.intent == "entrega_produto"
    assert "MacBook Pro 14 M3" in response.answer
    assert "CEP" in response.answer


def test_chatbot_prioritizes_exchange_over_product_details():
    chatbot = TechnologyStoreChatbot(DEFAULT_DATA_PATH)

    response = chatbot.ask("Meu iphone 15 veio com defeito, posso trocar?")

    assert not response.used_fallback
    assert response.intent == "troca_produto"
    assert "trocar" in response.answer.lower() or "devolver" in response.answer.lower()


def test_chatbot_answers_delivery_for_specific_product():
    chatbot = TechnologyStoreChatbot(DEFAULT_DATA_PATH)

    response = chatbot.ask("Quanto tempo demora para entregar o Galaxy S24 no meu CEP?")

    assert not response.used_fallback
    assert response.intent == "entrega_produto"
    assert "CEP" in response.answer
    assert "Galaxy S24" in response.answer


def test_chatbot_handles_product_out_of_catalog():
    chatbot = TechnologyStoreChatbot(DEFAULT_DATA_PATH)

    response = chatbot.ask("Voces tem PS5 para vender?")

    assert not response.used_fallback
    assert response.intent == "produto_nao_encontrado"
    assert "catalogo simulado" in response.answer


def test_chatbot_answers_warranty_question():
    chatbot = TechnologyStoreChatbot(DEFAULT_DATA_PATH)

    response = chatbot.ask("Meu celular esta com defeito e preciso de garantia")

    assert not response.used_fallback
    assert response.intent in {"garantia", "suporte_tecnico"}
    assert "garantia" in response.answer.lower() or "suporte" in response.answer.lower()


def test_chatbot_uses_fallback_for_unrelated_question():
    chatbot = TechnologyStoreChatbot(DEFAULT_DATA_PATH, min_confidence=0.75)

    response = chatbot.ask("Qual e a historia da arte barroca no Brasil?")

    assert response.used_fallback
    assert response.intent == "fallback"


def test_default_data_file_exists():
    assert Path(DEFAULT_DATA_PATH).exists()
