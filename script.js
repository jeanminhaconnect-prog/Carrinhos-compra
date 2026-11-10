const produtos = [
    { id: 1, nome: "Mouse", preco: 50 },
    { id: 2, nome: "Teclado", preco: 120 }
];

let carrinho = [];

function adicionarProduto(id) {
    const produto = produtos.find(p => p.id === id);

    if (!produto) return;

    const item = carrinho.find(p => p.id === id);

    if (item) {
        item.quantidade++;
    } else {
        carrinho.push({
            ...produto,
            quantidade: 1
        });
    }

    renderizarCarrinho();
}

function removerProduto(id) {
    carrinho = carrinho.filter(p => p.id !== id);
    renderizarCarrinho();
}

function atualizarQuantidade(id, quantidade) {
    const item = carrinho.find(p => p.id === id);

    if (!item || !Number.isInteger(quantidade)) return;

    if (quantidade <= 0) {
        removerProduto(id);
        return;
    }

    item.quantidade = quantidade;
    renderizarCarrinho();
}

function calcularSubtotal(item) {
    return item.preco * item.quantidade;
}

function calcularTotal() {
    return carrinho.reduce(
        (total, item) => total + calcularSubtotal(item), 0
    );
}

function renderizarCarrinho() {
    const lista = document.getElementById("listaCarrinho");

    lista.innerHTML = "";

    carrinho.forEach(item => {
        lista.innerHTML += `
            <div class="item">
                ${item.nome} -
                R$ ${calcularSubtotal(item).toFixed(2)}
                <br>
                Quantidade: ${item.quantidade}
                <br>
                <button onclick="atualizarQuantidade(${item.id}, ${item.quantidade + 1})">+</button>
                <button onclick="atualizarQuantidade(${item.id}, ${item.quantidade - 1})">-</button>
                <button onclick="removerProduto(${item.id})">Remover</button>
            </div>
        `;
    });

    document.getElementById("total").textContent =
        "Total: R$ " + calcularTotal().toFixed(2);
}
