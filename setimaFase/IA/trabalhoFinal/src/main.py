"""Terminal interface for the technology store chatbot."""

from __future__ import annotations

import argparse
from pathlib import Path

from .chatbot import DEFAULT_DATA_PATH, TechnologyStoreChatbot


EXIT_COMMANDS = {"sair", "exit", "quit", "tchau", "adeus"}


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Chatbot de atendimento para loja de tecnologia.")
    parser.add_argument(
        "--data",
        type=Path,
        default=DEFAULT_DATA_PATH,
        help="Caminho do arquivo JSON com as perguntas FAQ.",
    )
    parser.add_argument(
        "--threshold",
        type=float,
        default=0.18,
        help="Confianca minima para aceitar uma resposta.",
    )
    parser.add_argument(
        "--debug",
        action="store_true",
        help="Mostra intent, confianca e pergunta mais parecida.",
    )
    return parser


def main() -> int:
    args = build_parser().parse_args()
    chatbot = TechnologyStoreChatbot(args.data, min_confidence=args.threshold)

    print("Chatbot da loja de tecnologia")
    print(f"Base: {args.data}")
    print(f"Motor: {chatbot.backend}")
    print("Digite sua pergunta ou 'sair' para encerrar.")

    while True:
        try:
            user_input = input("\nCliente> ").strip()
        except (EOFError, KeyboardInterrupt):
            print("\nBot> Atendimento encerrado.")
            return 0

        if not user_input:
            continue

        if user_input.lower() in EXIT_COMMANDS:
            print("Bot> Obrigado pelo contato. Ate mais!")
            return 0

        response = chatbot.ask(user_input)
        print(f"Bot> {response.answer}")

        if args.debug:
            matched = response.matched_question or "-"
            source = response.source_domain or "-"
            print(
                f"[debug] intent={response.intent} "
                f"confidence={response.confidence:.3f} "
                f"source={source} matched={matched}"
            )


if __name__ == "__main__":
    raise SystemExit(main())

