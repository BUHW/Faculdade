# Relatório Técnico

## Decisões Técnicas

- A interface foi mantida no terminal para reduzir escopo e priorizar o funcionamento do chatbot.
- O dataset vem do MFAQ (`clips/mfaq`), filtrado por palavras-chave de tecnologia e atendimento.
- As perguntas originais do MFAQ são usadas como exemplos de treinamento.
- As respostas foram normalizadas para uma loja fictícia, evitando respostas antigas ou específicas de outros sites.
- Perguntas sobre modelos, preços e disponibilidade consultam um catálogo simulado em `data/catalogo_produtos.json`.
- Perguntas que misturam produto e ação, como parcelamento, entrega ou troca, priorizam a ação comercial antes da ficha técnica.
- O chatbot guarda memória curta do último produto e da última categoria citada para responder perguntas de continuação.
- O modelo usa TF-IDF e similaridade por cosseno, uma abordagem simples e adequada para FAQ.
- O código possui fallback por sobreposição de tokens caso scikit-learn ou recursos do NLTK não estejam disponíveis.

## Fluxo do Sistema

1. O arquivo `data/faq_tecnologia.json` é carregado.
2. As perguntas são pré-processadas com normalização, tokenização, stopwords e stemming quando disponível.
3. O chatbot cria uma representação vetorial das perguntas.
4. Antes da busca FAQ, perguntas sobre produto/preço/modelo são respondidas pelo catálogo simulado.
5. Se não houver resposta de catálogo, a pergunta do usuário é comparada com os exemplos conhecidos.
6. Se a similaridade for suficiente, a resposta da intent encontrada é exibida.
7. Se a similaridade for baixa, o fallback pede que o usuário reformule a pergunta.

## Testes Definidos

Os testes automatizados em `tests/test_chatbot.py` verificam:

- carregamento do dataset local;
- presença das principais intents;
- resposta para pergunta de pagamento;
- resposta para pergunta de garantia ou suporte;
- fallback para pergunta fora do domínio.

Exemplos de teste manual:

- `Quais notebooks vocês vendem?`
- `Quais modelos de notebook ou celular vocês vendem?`
- `Gostaria de comprar um MacBook Pro, qual o valor?`
- `Em quantas vezes dá para fazer o iPhone 15 no cartão?`
- `Essas 10x são sem juros?`
- `Qual é o mais barato?`
- `E a entrega?`
- `Meu iPhone 15 veio com defeito, posso trocar?`
- `Vocês tem PS5 para vender?`
- `Posso pagar um notebook no Pix ou boleto?`
- `Qual o prazo de entrega?`
- `Meu celular está com defeito e preciso de garantia`
- `Como faço para trocar um produto?`
- `Qual é a história da arte barroca no Brasil?`

## Resultados Esperados

O chatbot deve reconhecer perguntas próximas aos temas treinados e retornar respostas coerentes para atendimento simulado. Perguntas muito distantes do domínio devem acionar fallback.

## Limitações

- A base foi reduzida para manter o projeto viável.
- O modelo não usa LLM nem entendimento semântico profundo.
- As respostas representam políticas simuladas, não regras reais de uma loja.
- A qualidade depende das perguntas encontradas no MFAQ e do limiar de confiança configurado.
