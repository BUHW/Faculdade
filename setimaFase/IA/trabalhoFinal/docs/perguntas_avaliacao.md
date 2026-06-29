# Perguntas e Respostas para Avaliação

Documento de apoio para responder perguntas sobre o desenvolvimento do projeto.

## Projeto

| Pergunta | Resposta curta |
| --- | --- |
| Qual é o objetivo do projeto? | Desenvolver um chatbot inteligente para atendimento de uma loja de tecnologia. |
| Qual problema o chatbot resolve? | Ele responde dúvidas comuns de clientes sobre produtos, preços, pagamento, entrega, garantia, troca e suporte. |
| Qual foi o domínio escolhido? | Atendimento de loja de tecnologia. |
| Por que esse domínio foi escolhido? | Porque é um cenário prático e fácil de simular com perguntas reais de atendimento. |
| O chatbot tem frontend? | Não. A interface foi feita no terminal para manter o foco em IA, NLP e documentação. |
| O sistema é uma aplicação real de loja? | Não. É uma simulação acadêmica com catálogo e políticas fictícias. |

## Base de Conhecimento

| Pergunta | Resposta curta |
| --- | --- |
| Qual é a base de conhecimento do chatbot? | A base combina um dataset FAQ público filtrado e um catálogo simulado de produtos. |
| Qual dataset foi usado? | O MFAQ, disponível no Hugging Face como `clips/mfaq`. |
| De onde os dados foram retirados? | Do dataset público MFAQ: https://huggingface.co/datasets/clips/mfaq |
| O que é o MFAQ? | Um dataset multilíngue com pares de perguntas e respostas de páginas FAQ da web. |
| O dataset tem dados em português? | Sim. Foi usado o subset `pt_flat`, com perguntas em português. |
| O dataset foi criado manualmente? | Não. Ele foi obtido de uma fonte pública e filtrado por palavras-chave do domínio. |
| O que foi feito manualmente? | A seleção do domínio, as intents, o catálogo simulado e as respostas padronizadas da loja. |
| Por que as respostas do MFAQ foram normalizadas? | Porque as respostas originais vêm de sites variados e poderiam ser antigas, específicas ou inadequadas para uma loja fictícia. |
| Onde fica o dataset tratado? | Em `data/faq_tecnologia.json`. |
| Onde fica o catálogo da loja? | Em `data/catalogo_produtos.json`. |
| O Context7 foi usado como dataset? | Não. O Context7 foi considerado apenas como apoio para documentação técnica. |

## Desenvolvimento

| Pergunta | Resposta curta |
| --- | --- |
| Qual linguagem foi usada? | Python. |
| Por que Python? | Porque é simples, rápido para prototipar e possui boas bibliotecas de NLP e IA. |
| Quais bibliotecas principais foram usadas? | NLTK, scikit-learn e pytest. |
| Para que serve o NLTK no projeto? | Para apoiar o pré-processamento de texto, como stopwords e stemming. |
| Para que serve o scikit-learn? | Para vetorização TF-IDF e cálculo de similaridade entre perguntas. |
| Para que serve o pytest? | Para validar automaticamente os principais comportamentos do chatbot. |
| Como o chatbot entende uma pergunta? | Ele normaliza o texto, extrai tokens e compara a pergunta com exemplos conhecidos. |
| Qual técnica de NLP foi usada? | TF-IDF com similaridade por cosseno. |
| O projeto usa rede neural ou LLM? | Não. Foi usada uma abordagem clássica e mais simples de NLP. |
| O chatbot foi treinado? | Sim, no sentido de ajustar o vetorizador TF-IDF com as perguntas do dataset local. |
| Existe treinamento pesado de modelo? | Não. O modelo é leve e adequado para um projeto acadêmico curto. |
| Como o bot escolhe uma resposta? | Primeiro tenta responder pelo catálogo; se não conseguir, busca a FAQ mais semelhante. |
| O que acontece quando a confiança é baixa? | O bot retorna fallback pedindo que o usuário reformule a pergunta. |

## Funcionamento do Atendimento

| Pergunta | Resposta curta |
| --- | --- |
| Por que existe um catálogo simulado? | Para responder perguntas comerciais reais, como modelos, preços, estoque e parcelamento. |
| O bot sabe responder preço de produto? | Sim, quando o produto está no catálogo simulado. |
| O bot sabe responder parcelamento? | Sim. Ele calcula até 10x sem juros no catálogo simulado. |
| O bot entende perguntas de continuação? | Sim. Ele guarda memória curta do último produto e da última categoria citada. |
| Dê um exemplo de contexto. | Depois de perguntar sobre o iPhone 15, o usuário pode perguntar `essas 10x são sem juros?`. |
| O bot sabe comparar produtos? | Sim. Ele responde o produto mais barato ou mais caro dentro da categoria citada. |
| O que acontece se o produto não existe no catálogo? | O bot informa que não encontrou o produto e sugere categorias disponíveis. |
| O bot responde perguntas fora do domínio? | Não inventa resposta; ele usa fallback. |
| O bot aceita erros de digitação? | Parcialmente. Alguns erros comuns, como `notbook`, foram previstos. |

## Decisões Técnicas

| Pergunta | Resposta curta |
| --- | --- |
| Por que não usar WhatsApp ou Telegram? | Para reduzir complexidade e não depender de tokens, APIs externas ou configuração adicional. |
| Por que não usar IBM watsonx Assistant? | Seria uma boa alternativa, mas aumentaria dependência externa e complexidade. |
| Por que não usar LUIS? | Porque a Microsoft informou aposentadoria completa do LUIS em 31 de março de 2026. |
| Por que não usar ChatterBot? | A solução com TF-IDF dá mais controle sobre dataset, respostas e testes. |
| Por que usar respostas simuladas? | Para manter coerência com uma loja fictícia e evitar respostas antigas de sites externos. |
| Qual foi a principal melhoria durante o desenvolvimento? | Adicionar catálogo e memória curta para tornar o atendimento mais natural. |

## Testes

| Pergunta | Resposta curta |
| --- | --- |
| Como o projeto foi testado? | Com testes automatizados em `tests/test_chatbot.py` e testes manuais no terminal. |
| Quantos testes automatizados existem? | 15 testes. |
| O que os testes verificam? | Dataset, preço, parcelamento, contexto, comparação, entrega, troca, fallback e produto fora do catálogo. |
| Qual comando executa os testes? | `.\.venv\Scripts\python.exe -m pytest` |
| Qual comando executa o chatbot? | `.\.venv\Scripts\python.exe -m src.main` |
| Qual exemplo testa contexto? | Perguntar parcelamento do iPhone 15 e depois `essas 10x são sem juros?`. |
| Qual exemplo testa comparação? | Listar celulares e depois perguntar `qual é o modelo mais barato?`. |

## Limitações

| Pergunta | Resposta curta |
| --- | --- |
| Qual é a principal limitação do chatbot? | Ele depende de regras, catálogo pequeno e similaridade textual. |
| O chatbot entende linguagem natural profundamente? | Não. Ele usa NLP clássico e regras de domínio. |
| O catálogo é real? | Não. É um catálogo simulado para fins acadêmicos. |
| Os preços são reais? | Não. São valores simulados. |
| O bot pode errar? | Sim, especialmente com perguntas muito ambíguas ou fora do domínio previsto. |
| Como o projeto poderia evoluir? | Com frontend, banco de dados, API, integração com WhatsApp e modelo semântico mais avançado. |
| Como melhorar a base de conhecimento? | Ampliando o catálogo, aumentando exemplos de FAQ e validando respostas com casos reais de atendimento. |

