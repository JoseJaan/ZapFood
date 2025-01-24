document.addEventListener('DOMContentLoaded', () => {
    // Elementos gerais
    const produtosContainer = document.getElementById('produtosContainer');
    const botaoAdicionar = document.getElementById("botaoAdicionar");
    const modalAdicionar = document.getElementById("modalAdicionar");
    const modalEditar = document.getElementById("modalEditar");
    const modalVisualizar = document.getElementById("modalVisualizar");
    const modalExcluir = document.getElementById("modalExcluir");
    const nomeLojaElement = document.querySelector('.nomeLoja');
    const logoElement = document.querySelector('.logo');
    const botaoEditarProduto = document.getElementById('botaoEditar');
    const botaoAdicionarProduto = document.querySelector('.botaoAdicionar');

    // Utilitários
    const exibirModal = (modal) => modal.style.display = 'flex';
    const fecharModal = (modal) => modal.style.display = 'none';

    const criarInputOculto = (nome, valor) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = nome;
        input.value = valor;
        return input;
    };

    const criarProdutoElemento = (produto) => {
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

        divProduto.querySelector('.opcoesEditar').addEventListener('click', () => abrirModalEditar(produto.idProduto));
        divProduto.querySelector('.opcoesExcluir').addEventListener('click', () => abrirModalExcluir(produto.idProduto));
        divProduto.querySelector('.iconeVisualizar').addEventListener('click', () => abrirModalVisualizar(produto.idProduto));

        return divProduto;
    };

    const carregarProdutos = async () => {
        try {
            const response = await fetch('/produtos');
            if (!response.ok) throw new Error('Erro ao buscar produtos');
            const produtos = await response.json();
            produtosContainer.innerHTML = '';
            produtos.forEach(produto => produtosContainer.appendChild(criarProdutoElemento(produto)));
        } catch (error) {
            console.error('Erro ao carregar produtos:', error);
        }
    };

    const carregarDadosLoja = async () => {
        try {
            const response = await fetch('/loja/detalhar');
            if (!response.ok) throw new Error('Erro ao buscar dados da loja');
            const loja = await response.json();
            nomeLojaElement.textContent = loja.nome || 'Nome da Loja Indisponível';
            logoElement.src = loja.logo || 'img/logo.png';
        } catch (error) {
            console.error('Erro ao carregar dados da loja:', error);
        }
    };

    const abrirModalVisualizar = async (idProduto) => {
        try {
            const response = await fetch(`/produto/detalhar/${idProduto}`);
            if (!response.ok) throw new Error('Erro ao buscar produto');
            const produto = await response.json();

            document.querySelector('.fotoVisualizar').innerHTML = produto.img
                ? `<img class="imagemProdutoModal" src="${produto.img}" alt="${produto.nomeProduto}">`
                : '<p>Imagem não disponível</p>';
            document.querySelector('.tituloProdutoVisualizar').textContent = produto.nomeProduto;
            document.querySelector('.precoProdutoVisualizar').textContent = `R$ ${produto.precoProduto.toFixed(2)}`;
            document.querySelector('.ingredientes').textContent = produto.descricaoProduto;

            exibirModal(modalVisualizar);
        } catch (error) {
            console.error('Erro ao carregar informações do produto:', error);
        }
    };

    const abrirModalEditar = async (idProduto) => {
        try {
            const response = await fetch(`/produto/detalhar/${idProduto}`);
            if (!response.ok) throw new Error('Erro ao buscar detalhes do produto');
            const produto = await response.json();
        
            // Preenchendo os campos do formulário
            document.getElementById('nomeCadastrarEditar').value = produto.nomeProduto;
            document.getElementById('precoCadastrarEditar').value = produto.precoProduto;
            document.getElementById('descontoCadastrarEditar').value = produto.desconto || 0;
            document.getElementById('disponivelEditarEditar').checked = produto.visibilidade || 0;
            document.getElementById('descricaoCadastrarEditar').value = produto.descricaoProduto;
        
            // Carregando a imagem na div `imagemVisualizarCadastrar`
            const imagemDiv = document.querySelector('.imagemVisualizarEditar');
            console.log("Produto.img", produto.img)
            if (produto.img) {
                console.log("entrou no if")
                imagemDiv.innerHTML = `<img class="imagemProdutoModal" src="${produto.img}" alt="${produto.nomeProduto}">`;
            } else {
                imagemDiv.innerHTML = '<p>Imagem não disponível</p>';
            }
        
            // Definindo o ID do produto no botão de edição
            botaoEditarProduto.setAttribute('data-id', idProduto);
        
            // Exibe o modal de edição
            exibirModal(modalEditar);
        } catch (error) {
            console.error('Erro ao carregar informações do produto para edição:', error);
        }
        
    };

    const abrirModalExcluir = (idProduto) => {
        exibirModal(modalExcluir);

        document.querySelector('.persistir').onclick = async () => {
            try {
                const response = await fetch(`/produto/remover/${idProduto}`, { method: 'DELETE' });
                if (!response.ok) throw new Error('Erro ao excluir produto');
                alert('Produto excluído com sucesso!');
                fecharModal(modalExcluir);
                carregarProdutos();
            } catch (error) {
                console.error('Erro ao excluir produto:', error);
            }
        };

        document.querySelector('.desistir').onclick = () => fecharModal(modalExcluir);
    };

    // Eventos gerais
    botaoAdicionar.addEventListener('click', () => exibirModal(modalAdicionar));
    window.addEventListener('click', (e) => {
        if ([modalAdicionar, modalEditar, modalVisualizar, modalExcluir].includes(e.target)) {
            fecharModal(e.target);
        }
    });

    //Editar produto
    botaoEditarProduto.addEventListener('click', (event) => {
        event.preventDefault();
        console.log("Entrou na funcao")
        const produtoId = botaoEditarProduto.getAttribute('data-id');
        
        // Obtendo os dados do formulário
        const nomeProduto = document.getElementById('nomeCadastrarEditar').value;
        const precoProduto = (document.getElementById('precoCadastrarEditar').value);
        const desconto = (document.getElementById('descontoCadastrarEditar').value) || 0;
        const disponivel = document.getElementById('disponivelEditarEditar').checked;
        const descricaoProduto = document.getElementById('descricaoCadastrarEditar').value;
        const imagemInput = document.getElementById('imagemCadastroEditar');
    
        // Validação básica
        if (!nomeProduto || !precoProduto || !descricaoProduto) {
            alert('Por favor, preencha todos os campos obrigatórios!');
            return;
        }
    
        // Criando o formulário para envio
        const form = document.createElement('form');
        form.method = 'POST'; // Métodos PUT não são suportados diretamente por formulários HTML
        form.action = `/produto/atualizar/${produtoId}`;
        form.enctype = 'multipart/form-data';
    
        // Criando os campos do formulário
        form.appendChild(criarInputOculto('nomeProduto', nomeProduto));
        form.appendChild(criarInputOculto('precoProduto', precoProduto));
        form.appendChild(criarInputOculto('desconto', desconto));
        form.appendChild(criarInputOculto('disponivel', disponivel));
        form.appendChild(criarInputOculto('descricaoProduto', descricaoProduto));

        // Adicionando o campo de arquivo, se houver imagem selecionada
        if (imagemInput.files && imagemInput.files[0]) {
            console.log("Entrou no if da imagem")
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.name = 'file-id';
            fileInput.files = imagemInput.files; // Atribui os arquivos selecionados
            form.appendChild(fileInput);
        }
        // Adicionando o formulário ao corpo do documento e enviando-o
        document.body.appendChild(form);
        form.submit();
        alert("Produto atualizado com sucesso!")
        document.body.removeChild(form);
    });
    
    // Adicionar produto
    botaoAdicionarProduto.addEventListener('click', (event) => {
        event.preventDefault();

        const imagem = document.getElementById('imagemCadastro');
        const nomeProduto = document.getElementById('nomeCadastrarAdicionar').value;
        const precoProduto = document.getElementById('precoCadastrarAdicionar').value;
        const desconto = document.getElementById('descontoCadastrarAdicionar').value;
        const descricaoProduto = document.getElementById('descricaoCadastrarAdicionar').value;

        if (!nomeProduto || !precoProduto || !descricaoProduto) {
            alert('Por favor, preencha todos os campos obrigatórios!');
            return;
        }
        
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = '/produto/cadastro';
        form.enctype = 'multipart/form-data';


        form.appendChild(imagem);
        form.appendChild(criarInputOculto('nomeProduto', nomeProduto));
        form.appendChild(criarInputOculto('precoProduto', precoProduto));
        form.appendChild(criarInputOculto('desconto', desconto));
        form.appendChild(criarInputOculto('descricaoProduto', descricaoProduto));

        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
    });

    // Inicialização
    carregarProdutos();
    carregarDadosLoja();
});