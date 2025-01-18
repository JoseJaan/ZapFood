document.querySelector('.botaoAdicionar').addEventListener('click', (event) => {
    event.preventDefault(); // Impede o comportamento padrão

    // Captura os valores dos campos de entrada
    const imagem = document.getElementById('imagemCadastro').files[0];
    const nomeProduto = document.getElementById('nomeCadastrarAdicionar').value;
    const precoProduto = document.getElementById('precoCadastrarAdicionar').value;
    const desconto = document.getElementById('descontoCadastrarAdicionar').value;
    const descricaoProduto = document.getElementById('descricaoCadastrarAdicionar').value;

    // Verifica se os campos obrigatórios foram preenchidos
    if (!nomeProduto || !precoProduto || !descricaoProduto) {
        alert(`Por favor, preencha todos os campos obrigatórios!`);
        return;
    }
    
    // Cria um formulário para enviar os dados
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '/produto/cadastro'; // Certifique-se de que esta rota está correta
    form.enctype = 'multipart/form-data';

    // Adiciona os campos ao formulário
    if (imagem) {
        const inputImagem = document.createElement('input');
        inputImagem.type = 'hidden';
        inputImagem.name = 'imagem';
        inputImagem.value = imagem.name; // Apenas o nome do arquivo é enviado. Ajuste conforme necessário.
        form.appendChild(inputImagem);
    }

    const inputNome = document.createElement('input');
    inputNome.type = 'hidden';
    inputNome.name = 'nomeProduto';
    inputNome.value = nomeProduto;
    form.appendChild(inputNome);

    const inputPreco = document.createElement('input');
    inputPreco.type = 'hidden';
    inputPreco.name = 'precoProduto';
    inputPreco.value = precoProduto;
    form.appendChild(inputPreco);

    const inputDesconto = document.createElement('input');
    inputDesconto.type = 'hidden';
    inputDesconto.name = 'desconto';
    inputDesconto.value = desconto;
    form.appendChild(inputDesconto);

    const inputDescricao = document.createElement('input');
    inputDescricao.type = 'hidden';
    inputDescricao.name = 'descricaoProduto';
    inputDescricao.value = descricaoProduto;
    form.appendChild(inputDescricao);

    // Adiciona o formulário ao corpo do documento
    document.body.appendChild(form);

    // Envia o formulário
    form.submit();

    // Remove o formulário do DOM após o envio
    document.body.removeChild(form);
});

const botaoAdicionar = document.getElementById("botaoAdicionar");
const modalAdicionar = document.getElementById("modalAdicionar");
const modalEditar = document.getElementById("modalEditar");
const modalVisualizar = document.getElementById("modalVisualizar");
const modalExcluir = document.getElementById("modalExcluir");

botaoAdicionar.addEventListener('click',()=>{
    modalAdicionar.style.display = 'flex';
});

window.addEventListener("click", (e) => {
    if (e.target === modalAdicionar) {
        modalAdicionar.style.display = "none";
    }

    if (e.target === modalEditar) {
        modalEditar.style.display = "none";
    }

    if (e.target === modalVisualizar) {
        modalVisualizar.style.display = "none";
    }

    if (e.target === modalExcluir) {
        modalExcluir.style.display = "none";
    }
});

const botoesEditar = document.querySelectorAll('.opcoesEditar');

botoesEditar.forEach(element => {
    element.addEventListener('click',()=>{
        modalEditar.style.display = 'flex';
    })
});

const botoesExcluir = document.querySelectorAll('.opcoesExcluir');

botoesExcluir.forEach(element => {
    element.addEventListener('click',()=>{
        modalExcluir.style.display = 'flex';
    })
});

const botoesVisualizar = document.querySelectorAll('.iconeVisualizar');

botoesVisualizar.forEach(element => {
    element.addEventListener('click', async (event) => {
        const produtoId = event.target.getAttribute('data-id');
        console.log("entrou")
        try {
            // Faz uma requisição à rota para obter os detalhes do produto
            const response = await fetch(`/produto/detalhar/${produtoId}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar produto');
            }
            const produto = await response.json();

            // Preenche o modal com os dados do produto
            document.querySelector('.fotoVisualizar').innerHTML = produto.foto 
                ? `<img src="${produto.imagem}" alt="${produto.nomeProduto}">` 
                : `<p>Imagem não disponível</p>`;
            document.querySelector('.lojaVisualizar').textContent = produto.loja || 'Loja não especificada';
            document.querySelector('.tituloProdutoVisualizar').textContent = produto.nomeProduto;
            document.querySelector('.precoProdutoVisualizar').textContent = `R$ ${produto.precoProduto.toFixed(2)}`;
            document.querySelector('.ingredientes').textContent = produto.descricaoProduto;

            // Exibe o modal
            modalVisualizar.style.display = 'flex';
        } catch (error) {
            console.error('Erro ao carregar informações do produto:', error);
        }
    });
});

document.addEventListener('DOMContentLoaded', async () => {
    const produtosContainer = document.getElementById('produtosContainer');

    async function carregarProdutos() {
        try {
            const response = await fetch('/produtos'); 
            if (!response.ok) {
                throw new Error('Erro ao buscar produtos');
            }
            const produtos = await response.json(); 

            produtosContainer.innerHTML = '';

            //Itera sobre os produtos e os adiciona ao contêiner
            produtos.forEach(produto => {
                const produtoElement = criarProdutoElemento(produto);
                produtosContainer.appendChild(produtoElement);
            });
        } catch (error) {
            console.error('Erro ao carregar produtos:', error);
        }
    }

    // Função para criar o elemento HTML de um produto
    function criarProdutoElemento(produto) {
        const divProduto = document.createElement('div');
        divProduto.className = 'produto';

        divProduto.innerHTML = `
            <div class="visualizar">
                <div class="iconeVisualizar" data-id="${produto.idProduto}"></div>
                <p class="titulodoProduto">${produto.nomeProduto}</p>
            </div>
            <div class="opcoesProduto">
                <img class="opcoesEditar" src="img/Edit.png" alt="editar" data-id="${produto.idProduto}">
                <img class="opcoesExcluir" src="img/Trash.png" alt="excluir" data-id="${produto.idProduto}">
            </div>
        `;
        // Adiciona eventos aos botões de edição e exclusão
        divProduto.querySelector('.opcoesEditar').addEventListener('click', () => {
            modalEditar.style.display = 'flex';
            // Você pode implementar lógica adicional para preencher o modal com os dados do produto
        });

        divProduto.querySelector('.opcoesExcluir').addEventListener('click', (event) => {
            const produtoId = event.target.getAttribute('data-id'); 
            modalExcluir.style.display = 'flex';
        
            const botaoConfirmar = document.querySelector('.persistir');
            const botaoCancelar = document.querySelector('.desistir');
        
            botaoConfirmar.replaceWith(botaoConfirmar.cloneNode(true));
            botaoCancelar.replaceWith(botaoCancelar.cloneNode(true));
        
            document.querySelector('.persistir').addEventListener('click', async () => {
                try {
                    const response = await fetch(`/produto/remover/${produtoId}`, {
                        method: 'DELETE',
                    });
        
                    if (!response.ok) {
                        throw new Error('Erro ao excluir o produto');
                    }
        
                    const result = await response.json();
                    if (result.success) {
                        alert('Produto excluído com sucesso!');
                        modalExcluir.style.display = 'none';
        
                        const produtoElemento = event.target.closest('.produto');
                        if (produtoElemento) produtoElemento.remove();
                    } else {
                        alert(result.message || 'Erro desconhecido ao excluir o produto.');
                    }
                } catch (error) {
                    console.error('Erro ao excluir o produto:', error);
                    alert('Erro ao excluir o produto. Tente novamente.');
                }
            });
        
            // Evento para cancelar a exclusão e fechar o modal
            document.querySelector('.desistir').addEventListener('click', () => {
                modalExcluir.style.display = 'none';
            });
        });

        divProduto.querySelector('.iconeVisualizar').addEventListener('click', async (event) => {
            const produtoId = event.target.getAttribute('data-id');
            console.log("entrou")
            try {
                // Faz uma requisição à rota para obter os detalhes do produto
                const response = await fetch(`/produto/detalhar/${produtoId}`);
                if (!response.ok) {
                    throw new Error('Erro ao buscar produto');
                }
                const produto = await response.json();
        
                // Preenche o modal com os dados do produto
                document.querySelector('.fotoVisualizar').innerHTML = produto.foto 
                    ? `<img src="${produto.imagem}" alt="${produto.nomeProduto}">` 
                    : `<p>Imagem não disponível</p>`;
                document.querySelector('.lojaVisualizar').textContent = produto.loja || 'Loja não especificada';
                document.querySelector('.tituloProdutoVisualizar').textContent = produto.nomeProduto;
                document.querySelector('.precoProdutoVisualizar').textContent = `R$ ${produto.precoProduto.toFixed(2)}`;
                document.querySelector('.ingredientes').textContent = produto.descricaoProduto;
        
                // Exibe o modal
                modalVisualizar.style.display = 'flex';
            } catch (error) {
                console.error('Erro ao carregar informações do produto:', error);
            }
        });

        return divProduto;
    }

    
    await carregarProdutos();
});