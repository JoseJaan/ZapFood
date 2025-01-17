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
        alert(`Por favor, preencha todos os campos obrigatórios! ${console.log(precoProduto)}`);
        return;
    }

    console.log({
        nomeProduto,
        precoProduto,
        desconto,
        descricaoProduto,
    });
    

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
    element.addEventListener('click',()=>{
        modalVisualizar.style.display = 'flex';
    })
});
