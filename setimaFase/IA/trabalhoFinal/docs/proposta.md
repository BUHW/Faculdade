# Proposta do Trabalho

## Identificação

- Curso/disciplina: Inteligência Artificial
- Projeto: Chatbot Inteligente para Atendimento de Loja de Tecnologia
- Integrantes:
  - Bernardo Burigo
  - Bruno Baldessar
  - Gabriel Waltrick
  - Victor Antonio Pereira

## Problema Escolhido

O projeto consiste no desenvolvimento de um bot inteligente para atendimento conversacional em uma loja de tecnologia. O sistema deve receber perguntas em linguagem natural pelo terminal e retornar respostas relacionadas a dúvidas comuns de clientes, como produtos disponíveis, formas de pagamento, entrega, garantia, troca, devolução e suporte técnico.

O domínio foi escolhido porque representa uma aplicação prática de Processamento de Linguagem Natural em atendimento ao cliente. Mesmo em uma versão simples, o bot permite demonstrar classificação de intenção, recuperação de perguntas semelhantes e resposta automática.

## Objetivos

- Compreender a estrutura básica de bots inteligentes aplicados a atendimento.
- Usar técnicas de NLP para tratar perguntas em português.
- Construir uma base FAQ a partir de dataset público, evitando criação totalmente manual.
- Implementar um chatbot funcional em Python via terminal.
- Documentar decisões técnicas, limitações, testes e resultados.

## Dataset Preliminar

A fonte de dados escolhida é o MFAQ, disponível no Hugging Face como `clips/mfaq`: https://huggingface.co/datasets/clips/mfaq

O MFAQ é um dataset multilíngue de perguntas frequentes extraídas de páginas da web com marcação de FAQ. O artigo do dataset informa aproximadamente 6 milhões de pares pergunta-resposta em 21 idiomas, incluindo português: https://arxiv.org/abs/2109.12870

Para este trabalho, será usado o subset `pt_flat`, que organiza os dados por pares individuais de pergunta e resposta. A base local `data/faq_tecnologia.json` é gerada por filtragem de palavras-chave relacionadas a tecnologia e atendimento, como notebook, computador, celular, pagamento, entrega, garantia, troca, devolução e suporte técnico.

Tratamento aplicado:

- seleção de registros em português;
- filtragem por palavras-chave do domínio;
- remoção de duplicatas;
- associação de cada pergunta a uma intent;
- normalização das respostas para políticas simuladas de uma loja de tecnologia;
- preservação de metadados da origem, como domínio, `domain_id` e `pair_id`.

Essa abordagem reduz trabalho manual, mas mantém o dataset pequeno e controlável para o prazo do projeto.

## Ferramentas e Bibliotecas

- Python: linguagem principal pela simplicidade e rapidez de desenvolvimento.
- NLTK: tokenização, stopwords e stemming em português.
- scikit-learn: `TfidfVectorizer` e similaridade por cosseno para encontrar a pergunta mais próxima.
- pytest: testes automatizados básicos.
- Context7: apoio para consulta de documentação técnica durante o desenvolvimento, não como dataset.

Tecnologias pesquisadas, mas fora da implementação principal:

- IBM watsonx Assistant: alternativa robusta para bots em produção, mas exige serviço externo.
- ChatterBot: biblioteca de chatbot em Python, útil como referência, mas menos adequada que uma solução controlada com TF-IDF para este escopo.
- LUIS: considerado apenas historicamente, pois a Microsoft informa aposentadoria completa do serviço em 31 de março de 2026.

## Funcionamento Proposto

O chatbot carrega o arquivo `data/faq_tecnologia.json`, pré-processa as perguntas e cria uma matriz TF-IDF. Para perguntas comerciais sobre modelos, preços e disponibilidade, o sistema consulta também o catálogo simulado `data/catalogo_produtos.json`. Quando o usuário digita uma pergunta no terminal, o sistema tenta primeiro responder por catálogo e, se não for o caso, calcula a similaridade entre a entrada e as perguntas conhecidas. Se a confiança for suficiente, retorna a resposta associada à intent encontrada. Caso contrário, retorna uma mensagem de fallback pedindo reformulação.

Intents previstas:

- `produtos_disponiveis`
- `formas_pagamento`
- `prazo_entrega`
- `garantia`
- `troca_devolucao`
- `suporte_tecnico`
- `canal_atendimento`
- `horario_atendimento`
- `fallback`
- `modelos_disponiveis`
- `preco_produto`
- `consulta_produto`

## Testes Planejados

Serão realizados testes com perguntas esperadas e perguntas fora do domínio:

- "Quais notebooks vocês vendem?"
- "Posso pagar no Pix?"
- "Qual o prazo de entrega?"
- "Meu notebook veio com defeito."
- "Vocês dão garantia?"
- "Como faço para trocar um produto?"
- "Qual é a história da arte barroca no Brasil?"

Critérios de aceite:

- o chatbot executa pelo terminal;
- o dataset local é carregado corretamente;
- perguntas comuns retornam intents coerentes;
- perguntas fora do domínio usam fallback;
- a documentação registra origem dos dados, tecnologias e decisões técnicas.

## Limitações

O projeto não pretende substituir um atendimento real. A base é pequena, as respostas são simuladas e o modelo usa similaridade textual, não compreensão profunda de linguagem. A solução foi mantida simples para priorizar funcionamento, documentação e viabilidade no prazo.
