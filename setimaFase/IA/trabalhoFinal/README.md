# Chatbot Inteligente para Atendimento de Loja de Tecnologia

Projeto de IA em Python para atendimento conversacional via terminal. O chatbot usa perguntas de FAQ filtradas do dataset público MFAQ e responde com políticas normalizadas de uma loja fictícia de tecnologia.
Para perguntas comerciais, ele também consulta um catálogo simulado de produtos com modelos, preços e estoque.

## Tecnologias

- Python 3.10+
- NLTK para pré-processamento de texto
- scikit-learn para vetorização TF-IDF e busca por similaridade
- Dataset público MFAQ: https://huggingface.co/datasets/clips/mfaq
- Catálogo simulado em `data/catalogo_produtos.json`

## Instalação

No Windows/PowerShell:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

Opcional, para usar stopwords e stemming do NLTK:

```powershell
python -m nltk.downloader stopwords rslp
```

O projeto funciona sem esses pacotes do NLTK baixados, usando uma lista local simples de stopwords.

## Execução

```powershell
python -m src.main
```

Digite perguntas como:

- `Quais notebooks vocês vendem?`
- `Quais modelos de notebook ou celular vocês vendem?`
- `Gostaria de comprar um MacBook Pro, qual o valor?`
- `Em quantas vezes dá para fazer o iPhone 15 no cartão?`
- `Meu iPhone 15 veio com defeito, posso trocar?`
- `Posso pagar no Pix?`
- `Qual o prazo de entrega?`
- `Meu notebook veio com defeito`
- `Vocês dão garantia?`

Para sair, use `sair`, `exit`, `quit` ou `tchau`.

## Regenerar o dataset

O arquivo `data/faq_tecnologia.json` pode ser recriado a partir da API pública do Hugging Face:

```powershell
python scripts/prepare_dataset.py --output data/faq_tecnologia.json --max-per-intent 8
```

O script consulta o subset `pt_flat` do `clips/mfaq`, filtra perguntas relacionadas a tecnologia e atendimento, remove duplicatas e mapeia perguntas para intents do chatbot.

## Testes

```powershell
pytest
```

Os testes verificam carregamento do dataset, respostas para intents principais e fallback para perguntas fora do domínio.
Casos de robustez pensados para avaliação estão em `docs/testes_professor.md`.

## Observações

- O objetivo é entregar um modelo simples, local e funcional.
- O Context7 pode ser usado como apoio para consultar documentação técnica durante o desenvolvimento, mas não como fonte de dataset.
- LUIS foi considerado apenas como referência histórica, pois a Microsoft informa aposentadoria completa do serviço em 31 de março de 2026.
