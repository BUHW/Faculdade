"""Product catalog helpers for the terminal chatbot."""

from __future__ import annotations

import json
from dataclasses import dataclass
from pathlib import Path

from .preprocessing import normalize_text, tokenize


DEFAULT_CATALOG_PATH = Path(__file__).resolve().parents[1] / "data" / "catalogo_produtos.json"

CATEGORY_ALIASES = {
    "notebook": {"notebook", "notebooks", "notbook", "notebooks", "macbook", "laptop"},
    "celular": {"celular", "celulares", "smartphone", "smartphones", "iphone", "android"},
    "monitor": {"monitor", "monitores", "tela"},
    "acessorio": {"acessorio", "acessorios", "teclado", "mouse", "webcam"},
    "roteador": {"roteador", "roteadores", "wifi", "wi-fi"},
}

MODEL_HINTS = {"catalogo", "lista", "modelo", "modelos", "opcoes", "tem", "vendem", "vender", "vende"}
PRICE_HINTS = {"comprar", "custa", "preco", "valor", "valores", "quanto", "orcamento"}
PAYMENT_HINTS = {
    "boleto",
    "cartao",
    "credito",
    "debito",
    "pagar",
    "pagamento",
    "parcela",
    "parcelas",
    "parcelamento",
    "parcelar",
    "pix",
    "vezes",
    "10x",
    "juros",
}
DELIVERY_HINTS = {"cep", "chega", "entrega", "entregar", "frete", "prazo", "receber"}
WARRANTY_HINTS = {"defeito", "garantia", "nota", "reparo"}
EXCHANGE_HINTS = {"arrependi", "devolver", "devolucao", "reembolso", "troca", "trocar"}
SUPPORT_HINTS = {"assistencia", "erro", "parou", "problema", "suporte", "tecnico"}
CONTEXT_HINTS = {
    "dela",
    "dele",
    "ele",
    "ela",
    "essa",
    "essas",
    "esse",
    "esses",
    "isso",
    "modelo",
    "produto",
    "valor",
}
UNKNOWN_PRODUCT_HINTS = {
    "airpods",
    "applewatch",
    "console",
    "imac",
    "ipad",
    "playstation",
    "ps5",
    "switch",
    "xbox",
}

MAX_INSTALLMENTS = 10


@dataclass(frozen=True)
class Product:
    id: str
    name: str
    category: str
    brand: str
    price: float
    stock: str
    specs: str
    aliases: tuple[str, ...]


@dataclass(frozen=True)
class CatalogResponse:
    answer: str
    intent: str
    confidence: float
    product_id: str | None = None
    categories: tuple[str, ...] = ()


def load_catalog(path: str | Path = DEFAULT_CATALOG_PATH) -> list[Product]:
    catalog_path = Path(path)
    with catalog_path.open("r", encoding="utf-8") as file:
        payload = json.load(file)

    products: list[Product] = []
    for index, item in enumerate(payload.get("products", []), start=1):
        products.append(
            Product(
                id=str(item.get("id") or f"product_{index:03d}"),
                name=str(item["name"]),
                category=str(item["category"]),
                brand=str(item["brand"]),
                price=float(item["price"]),
                stock=str(item["stock"]),
                specs=str(item["specs"]),
                aliases=tuple(str(alias) for alias in item.get("aliases", [])),
            )
        )

    if not products:
        raise ValueError(f"Catalogo invalido em {catalog_path}: nenhum produto encontrado.")

    return products


class ProductCatalog:
    def __init__(self, path: str | Path = DEFAULT_CATALOG_PATH) -> None:
        self.products = load_catalog(path)
        self._products_by_id = {product.id: product for product in self.products}

    def answer(
        self,
        question: str,
        *,
        context_product_id: str | None = None,
        context_categories: tuple[str, ...] = (),
    ) -> CatalogResponse | None:
        normalized = normalize_text(question)
        tokens = set(tokenize(question))
        categories = self._mentioned_categories(tokens)
        product = self._match_product(normalized)
        uses_context = self._is_contextual_followup(tokens, normalized)

        if not categories and context_categories and uses_context:
            categories = list(context_categories)

        wants_price = bool(tokens & PRICE_HINTS)
        wants_payment = bool(tokens & PAYMENT_HINTS)
        wants_delivery = bool(tokens & DELIVERY_HINTS)
        wants_warranty = bool(tokens & WARRANTY_HINTS)
        wants_exchange = bool(tokens & EXCHANGE_HINTS)
        wants_support = bool(tokens & SUPPORT_HINTS)
        wants_models = bool(tokens & MODEL_HINTS) or len(categories) > 1
        wants_cheapest = "mais barato" in normalized or "menor preco" in normalized or "menor valor" in normalized
        wants_most_expensive = "mais caro" in normalized or "maior preco" in normalized or "maior valor" in normalized

        if categories and wants_cheapest:
            cheapest = self._category_extreme_product(categories, reverse=False)
            if cheapest:
                return CatalogResponse(
                    self._category_extreme_response(cheapest, "mais barato"),
                    "produto_mais_barato",
                    0.95,
                    product_id=cheapest.id,
                    categories=(cheapest.category,),
                )

        if categories and wants_most_expensive:
            most_expensive = self._category_extreme_product(categories, reverse=True)
            if most_expensive:
                return CatalogResponse(
                    self._category_extreme_response(most_expensive, "mais caro"),
                    "produto_mais_caro",
                    0.95,
                    product_id=most_expensive.id,
                    categories=(most_expensive.category,),
                )

        if product is None and context_product_id and uses_context:
            product = self._products_by_id.get(context_product_id)

        if product and wants_payment:
            asks_interest = "sem juros" in normalized or "juros" in tokens
            return CatalogResponse(
                self._product_payment_response(product, asks_interest=asks_interest),
                "parcelamento_produto",
                0.99,
                product_id=product.id,
                categories=(product.category,),
            )

        if product and wants_delivery:
            return CatalogResponse(
                self._product_delivery_response(product),
                "entrega_produto",
                0.97,
                product_id=product.id,
                categories=(product.category,),
            )

        if product and wants_exchange:
            return CatalogResponse(
                self._product_exchange_response(product),
                "troca_produto",
                0.97,
                product_id=product.id,
                categories=(product.category,),
            )

        if product and wants_warranty:
            return CatalogResponse(
                self._product_warranty_response(product),
                "garantia_produto",
                0.97,
                product_id=product.id,
                categories=(product.category,),
            )

        if product and wants_support:
            return CatalogResponse(
                self._product_support_response(product),
                "suporte_produto",
                0.96,
                product_id=product.id,
                categories=(product.category,),
            )

        if product and wants_price:
            return CatalogResponse(
                self._product_price_response(product),
                "preco_produto",
                0.98,
                product_id=product.id,
                categories=(product.category,),
            )

        if product:
            return CatalogResponse(
                self._product_details_response(product),
                "consulta_produto",
                0.94,
                product_id=product.id,
                categories=(product.category,),
            )

        if self._looks_like_unknown_product(tokens):
            return CatalogResponse(self._unknown_product_response(tokens), "produto_nao_encontrado", 0.9)

        if categories and (wants_models or wants_price):
            return CatalogResponse(
                self._category_response(categories),
                "modelos_disponiveis",
                0.92,
                categories=tuple(categories),
            )

        return None

    def _match_product(self, normalized_question: str) -> Product | None:
        best_product: Product | None = None
        best_score = 0

        for product in self.products:
            candidates = [product.name, product.brand, *product.aliases]
            for candidate in candidates:
                normalized_candidate = normalize_text(candidate)
                if normalized_candidate and normalized_candidate in normalized_question:
                    score = len(normalized_candidate)
                    if score > best_score:
                        best_product = product
                        best_score = score

        return best_product

    def _mentioned_categories(self, tokens: set[str]) -> list[str]:
        categories: list[str] = []
        for category, aliases in CATEGORY_ALIASES.items():
            if tokens & aliases:
                categories.append(category)
        return categories

    def _products_by_category(self, category: str) -> list[Product]:
        return [product for product in self.products if product.category == category]

    def _looks_like_unknown_product(self, tokens: set[str]) -> bool:
        return bool(tokens & UNKNOWN_PRODUCT_HINTS and tokens & (MODEL_HINTS | PRICE_HINTS | PAYMENT_HINTS))

    def _is_contextual_followup(self, tokens: set[str], normalized_question: str) -> bool:
        if tokens & CONTEXT_HINTS:
            return True

        if tokens & (PAYMENT_HINTS | DELIVERY_HINTS | WARRANTY_HINTS | EXCHANGE_HINTS | SUPPORT_HINTS):
            return True

        return any(
            phrase in normalized_question
            for phrase in ("mais barato", "mais caro", "menor preco", "maior preco", "e o valor", "e a entrega")
        )

    def _category_extreme_product(self, categories: list[str], *, reverse: bool) -> Product | None:
        products: list[Product] = []
        for category in categories:
            products.extend(self._products_by_category(category))

        if not products:
            return None

        return sorted(products, key=lambda product: product.price, reverse=reverse)[0]

    def _category_response(self, categories: list[str]) -> str:
        parts: list[str] = []
        for category in categories:
            products = self._products_by_category(category)
            if not products:
                continue

            label = _category_label(category)
            product_list = "; ".join(_short_product_line(product) for product in products)
            parts.append(f"{label}: {product_list}")

        if not parts:
            return "No momento nao encontrei modelos para essa categoria no catalogo simulado."

        return (
            "Temos estas opcoes no catalogo simulado: "
            + " | ".join(parts)
            + ". Os valores podem mudar conforme promocao e disponibilidade."
        )

    def _product_price_response(self, product: Product) -> str:
        return (
            f"O {product.name} esta {product.stock} por {_format_brl(product.price)}. "
            f"Configuracao: {product.specs}. Aceitamos Pix, boleto e cartao; o parcelamento depende do valor final."
        )

    def _product_payment_response(self, product: Product, *, asks_interest: bool = False) -> str:
        installment = product.price / MAX_INSTALLMENTS
        if asks_interest:
            return (
                f"No catalogo simulado, sim: as {MAX_INSTALLMENTS}x do {product.name} sao sem juros. "
                f"O calculo usado e {_format_brl(product.price)} dividido por {MAX_INSTALLMENTS}, "
                f"ficando {MAX_INSTALLMENTS}x de {_format_brl(installment)}. "
                "Em uma loja real, essa condicao deve ser confirmada no fechamento da compra."
            )

        return (
            f"O {product.name} pode ser pago no cartao em ate {MAX_INSTALLMENTS}x sem juros de "
            f"{_format_brl(installment)} no catalogo simulado. O valor total e {_format_brl(product.price)}. "
            "Tambem aceitamos Pix e boleto; condicoes promocionais podem variar conforme a regra da loja."
        )

    def _product_delivery_response(self, product: Product) -> str:
        return (
            f"O {product.name} esta {product.stock}. Para calcular entrega, preciso do CEP do cliente. "
            "No atendimento simulado, o prazo depende do CEP, disponibilidade e modalidade de frete."
        )

    def _product_warranty_response(self, product: Product) -> str:
        return (
            f"O {product.name} possui garantia conforme fabricante e nota fiscal. "
            "Para acionar garantia, informe numero do pedido, data da compra e descricao do defeito."
        )

    def _product_exchange_response(self, product: Product) -> str:
        return (
            f"Para trocar ou devolver o {product.name}, informe numero do pedido, data da compra e motivo. "
            "Se houver defeito, o atendimento pode encaminhar para garantia ou assistencia tecnica."
        )

    def _product_support_response(self, product: Product) -> str:
        return (
            f"Para suporte do {product.name}, descreva o erro, quando comecou e quais testes ja foram feitos. "
            "Com essas informacoes o atendimento orienta os proximos passos ou encaminha para assistencia."
        )

    def _product_details_response(self, product: Product) -> str:
        return (
            f"Temos o {product.name} ({product.brand}) {product.stock}. "
            f"Ele custa {_format_brl(product.price)} e possui {product.specs}."
        )

    def _unknown_product_response(self, tokens: set[str]) -> str:
        available = ", ".join(sorted({product.category for product in self.products}))
        return (
            "Nao encontrei esse produto no catalogo simulado. "
            f"No momento tenho itens nas categorias: {available}. "
            "Voce pode perguntar por modelos de notebook, celular, monitor, acessorios ou roteador."
        )

    def _category_extreme_response(self, product: Product, label: str) -> str:
        return (
            f"Entre as opcoes citadas, o produto {label} e o {product.name}, "
            f"por {_format_brl(product.price)}. Ele esta {product.stock} e possui {product.specs}."
        )


def _format_brl(value: float) -> str:
    formatted = f"{value:,.2f}".replace(",", "X").replace(".", ",").replace("X", ".")
    return f"R$ {formatted}"


def _short_product_line(product: Product) -> str:
    return f"{product.name} ({_format_brl(product.price)}, {product.stock})"


def _category_label(category: str) -> str:
    labels = {
        "notebook": "notebooks",
        "celular": "celulares",
        "monitor": "monitores",
        "acessorio": "acessorios",
        "roteador": "roteadores",
    }
    return labels.get(category, category)
