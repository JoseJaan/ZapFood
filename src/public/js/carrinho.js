const lixeiras = document.querySelectorAll(".lixeiraIcone");
const valorTotalElement = document.querySelector(".valorTotalCarrinho");

// Função para calcular o total
function calcularTotal() {
    const precos = document.querySelectorAll(".textoValorEscrito");
    let total = 0;
    
    precos.forEach(preco => {
        // Extrair o valor numérico da string "R$ XX,XX"
        const valor = parseFloat(preco.textContent
            .replace("R$ ", "")
            .replace(",", ".")
        );
        total += valor;
    });
    
    // Formatar o total para o padrão brasileiro de moeda
    const totalFormatado = total.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    
    valorTotalElement.textContent = `TOTAL: R$ ${totalFormatado}`;
}

// Calcular o total inicial
calcularTotal();

// Adicionar evento de clique nas lixeiras
lixeiras.forEach((element) => {
    element.addEventListener('click', async () => {
        const id = element.getAttribute('data-id');
        const formulario = document.createElement('form');
        formulario.method = 'POST';
        formulario.action = '/excluirProdutoCarrinho';
        formulario.style.display = 'none';
        
        const inputId = document.createElement('input');
        inputId.type = 'text';
        inputId.name = 'id';
        inputId.value = id;
        
        formulario.appendChild(inputId);
        document.body.appendChild(formulario);
        
        formulario.submit();
        alert("Produto removido com sucesso!");
        
        // Remover o produto do DOM
        const produtoElement = element.closest('.produto');
        produtoElement.remove();
        
        // Recalcular o total após remover o produto
        calcularTotal();
        
        document.body.removeChild(formulario);
    });
});