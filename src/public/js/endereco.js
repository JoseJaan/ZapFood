const botaoAdicionar = document.getElementById("botaoAdicionar")
const modalAdicionar = document.getElementById("modalAdicionar")
const botoesEditar = document.querySelectorAll(".iconeEditar");
const modalEditar = document.getElementById("modalEditar");
const modalVisualizar = document.getElementById("modalVisualizar");
const botoesVisualizar = document.querySelectorAll(".iconeVisualizar")
const modalExcluir = document.getElementById("modalExcluir");
const botoesExcluir = document.querySelectorAll(".icone")

botaoAdicionar.addEventListener('click',()=>{
    modalAdicionar.style.display = 'flex';
})

document.querySelector('.botaoAdicionarModal').addEventListener('click', (event) => {
    event.preventDefault();

    // Captura os valores dos campos do modal
    const nome = document.getElementById('nome').value;
    const cidade = document.getElementById('cidade').value;
    const cep = document.getElementById('cep').value;
    const rua = document.getElementById('rua').value;
    const numero = document.getElementById('numero').value;
    const complemento = document.getElementById('complementoAdicionar').value;

    // Verifica se todos os campos obrigatórios estão preenchidos
    if (!nome || !cidade || !cep || !rua || !numero) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    // Cria o formulário dinâmico
    const formulario = document.createElement('form');
    formulario.method = 'post';
    formulario.action = '/endereco/cadastrar'; // Rota para o backend
    formulario.style.display = 'none';

    // Criação dos inputs dinâmicos
    const inputNome = document.createElement('input');
    inputNome.type = 'text';
    inputNome.name = 'nome';
    inputNome.value = nome;

    const inputCidade = document.createElement('input');
    inputCidade.type = 'text';
    inputCidade.name = 'cidade';
    inputCidade.value = cidade;

    const inputCep = document.createElement('input');
    inputCep.type = 'text';
    inputCep.name = 'CEP';
    inputCep.value = cep;

    const inputRua = document.createElement('input');
    inputRua.type = 'text';
    inputRua.name = 'rua';
    inputRua.value = rua;

    const inputNumero = document.createElement('input');
    inputNumero.type = 'number';
    inputNumero.name = 'numero';
    inputNumero.value = numero;

    const inputComplemento = document.createElement('input');
    inputComplemento.type = 'text';
    inputComplemento.name = 'complemento';
    inputComplemento.value = complemento;

    // Adiciona os inputs ao formulário
    formulario.appendChild(inputNome);
    formulario.appendChild(inputCidade);
    formulario.appendChild(inputCep);
    formulario.appendChild(inputRua);
    formulario.appendChild(inputNumero);
    formulario.appendChild(inputComplemento);

    // Adiciona o formulário ao body e o submete
    document.body.appendChild(formulario);
    formulario.submit();

    // Remove o formulário do DOM após o envio
    document.body.removeChild(formulario);
});


window.onclick = function (event) {
    if (event.target === modalAdicionar) {
        modalAdicionar.style.display = "none";
    }

    if (event.target === modalEditar) {
        modalEditar.style.display = "none";
    }
    
    if (event.target === modalVisualizar) {
        modalVisualizar.style.display = "none";
    }

    if (event.target === modalExcluir) {
        modalExcluir.style.display = "none";
    }
  };


  botoesEditar.forEach(element => {
    element.addEventListener('click',()=>{
        modalEditar.style.display = "flex";
    });
  });

  botoesVisualizar.forEach(element => {
    element.addEventListener('click',()=>{
        modalVisualizar.style.display = "flex";
    });
  });
  

  botoesExcluir.forEach(element => {
    element.addEventListener('click',()=>{
        modalExcluir.style.display = "flex";
    });
  });
  