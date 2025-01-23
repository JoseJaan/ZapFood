const botaoVisualizar = document.querySelectorAll('.iconeVisualizar');
const modalVisualizar = document.getElementById('modalVisualizar');

// Função para formatar o preço
function formatarPreco(valor) {
    return `R$ ${valor.toFixed(2).replace('.', ',')}`;
}

// Função para formatar a data
function formatarData(dataISO) {
    const data = new Date(dataISO);
    return data.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }) + ` às ${data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
}

botaoVisualizar.forEach((element) => {
    element.addEventListener('click', () => {
        // Pega os atributos data-* do botão
        const id = element.getAttribute('data-id');
        const idCliente = element.getAttribute('data-idcliente');
        const produtos = JSON.parse(element.getAttribute('data-produtos'));
        const createdAt = element.getAttribute('data-createdat');

        // Atualiza o conteúdo do modal
        document.querySelector('.nomePerfilModalVisualizar').textContent = `Cliente: ${idCliente}`;
        const produtosContainer = document.querySelector('.tituloProdutosModalVisualizar');
        produtosContainer.innerHTML = ''; // Limpa os produtos antigos

        // Adiciona os produtos no modal
        produtos.forEach((produto) => {
            const produtoElement = document.createElement('p');
            produtoElement.classList.add('produtoModalVisualizar');
            produtoElement.textContent = `${produto.nomeProduto} ${formatarPreco(produto.precoProduto)}`;
            produtosContainer.appendChild(produtoElement);
        });

        // Atualiza a data e o total
        document.querySelector('.dataProdutoModalVisualizar').textContent = `DATA: ${formatarData(createdAt)}`;
        const totalVenda = produtos.reduce((total, produto) => total + produto.precoProduto, 0);
        document.querySelector('.totalVendaModalVisualizar').textContent = `TOTAL: ${formatarPreco(totalVenda)}`;

        // Exibe o modal
        modalVisualizar.style.display = 'flex';
    });
});

// Fecha o modal ao clicar fora dele
window.addEventListener('click', (event) => {
    if (event.target === modalVisualizar) {
        modalVisualizar.style.display = 'none';
    }
});
