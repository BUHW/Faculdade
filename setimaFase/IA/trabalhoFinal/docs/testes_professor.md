# Testes de Robustez do Chatbot

Este documento lista perguntas que um professor poderia usar para tentar quebrar o atendimento. Elas misturam produto, intenção comercial, erro de digitação, produto fora do catálogo e perguntas fora do domínio.

## Perguntas Críticas e Resultado Esperado

| Pergunta | Risco | Resultado esperado |
| --- | --- | --- |
| `em quantas vezes da para fazer o iphone 15 no cartão?` | O bot responder só ficha técnica do produto. | Responder parcelamento do iPhone 15, total e valor aproximado por parcela. |
| `Essas 10x são sem juros?` depois da pergunta anterior | Falta de contexto conversacional. | Responder sobre o parcelamento do iPhone 15 sem exigir repetir o produto. |
| `Quais modelos de notbook ou celular vocês vendem?` | Erro de digitação em `notebook`. | Listar notebooks e celulares disponíveis no catálogo. |
| `qual é o mais barato?` depois de listar celulares | Falta de memória da categoria anterior. | Informar o celular mais barato da lista. |
| `Gostaria de comprar um macbook pro, qual o valor?` | Produto específico + preço. | Informar preço, disponibilidade e configuração do MacBook Pro. |
| `e a entrega?` depois de perguntar pelo MacBook Pro | Pergunta curta dependente do contexto anterior. | Responder prazo/CEP para o MacBook Pro. |
| `Meu iphone 15 veio com defeito, posso trocar?` | Produto + defeito + troca. | Priorizar troca/garantia, não ficha técnica. |
| `Quanto tempo demora para entregar o Galaxy S24 no meu CEP?` | Produto + entrega. | Pedir/usar CEP e explicar que prazo depende de frete e disponibilidade. |
| `Vocês tem PS5 para vender?` | Produto fora do catálogo. | Informar que não encontrou o produto e sugerir categorias disponíveis. |
| `Posso pagar no Pix ou boleto?` | Pagamento sem produto específico. | Responder formas de pagamento gerais. |
| `Qual é a história da arte barroca no Brasil?` | Pergunta fora do domínio. | Acionar fallback sem inventar resposta. |

## Recursos Implementados para Evitar Falhas

- Catálogo simulado com produtos, preço, estoque, categoria, marca e aliases.
- Prioridade de intenção comercial antes da resposta genérica de produto.
- Detecção de parcelamento, preço, entrega, garantia, troca e suporte.
- Memória curta de contexto para produto e categoria citados na conversa anterior.
- Tratamento de produto fora do catálogo para itens comuns como PS5, Xbox e AirPods.
- Testes automatizados cobrindo perguntas de ataque em `tests/test_chatbot.py`.

## Critério de Qualidade

Uma resposta aceitável precisa resolver a intenção principal do cliente. Se a pergunta contém produto e ação, como `iPhone 15` + `cartão`, a ação tem prioridade sobre a ficha técnica. O chatbot só deve listar detalhes do produto quando a pergunta for realmente sobre detalhes, modelo, disponibilidade ou preço geral.
