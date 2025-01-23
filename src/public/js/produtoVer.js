const botao = document.getElementById("botaoAdicionaraoCarrinho");
const id = document.getElementById("idProduto");

botao.addEventListener('click', async (event) => {
    event.preventDefault();
    
    try {
        const response = await fetch('/adicionarAoCarrinho', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id.value }),
        });

        if (response.ok) {
            const { redirectUrl } = await response.json();
            window.location.href = redirectUrl; // Redireciona o usuário para a URL fornecida
        } else {
            const errorMessage = await response.text();
            alert(`Erro: ${errorMessage}`);
        }
    } catch (error) {
        alert("Ocorreu um erro ao adicionar o produto ao carrinho.");
        console.error(error);
    }
});
