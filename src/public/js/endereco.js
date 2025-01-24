const botaoAdicionar = document.getElementById("botaoAdicionar")
const modalAdicionar = document.getElementById("modalAdicionar")
const botoesEditar = document.querySelectorAll(".iconeEditar");
const modalEditar = document.getElementById("modalEditar");
const modalVisualizar = document.getElementById("modalVisualizar");
const botoesVisualizar = document.querySelectorAll(".iconeVisualizar")
const modalExcluir = document.getElementById("modalExcluir");
const botoesExcluir = document.querySelectorAll(".icone")
const botaoDesistir = document.querySelector('.desistir'); 
const botaoPersistir = document.querySelector('.persistir'); 
const botaoEditar = document.getElementById("botaoEditar");
const listaEnderecos = document.querySelector(".osEnderecos"); 

botaoAdicionar.addEventListener('click',()=>{
    modalAdicionar.style.display = 'flex';
})

document.querySelector('.botaoAdicionarModal').addEventListener('click', async (event) => {
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

    
    document.body.appendChild(formulario);
    await formulario.submit();

    document.getElementById('nome').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('cep').value = '';
    document.getElementById('rua').value = '';
    document.getElementById('numero').value = '';
    document.getElementById('complementoAdicionar').value = '';

    alert("Alteração feita com sucesso!")

    document.getElementById('modalAdicionar').style.display = 'none';

    
    await document.body.removeChild(formulario);


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

// Função para preencher o modal com os dados do endereço
function preencherModalVisualizar(endereco) {
    document.getElementById('nomeVisualizar').value = endereco.nome;
    document.getElementById('cidadeVisualizar').value = endereco.cidade;
    document.getElementById('cepVisualizar').value = endereco.CEP;
    document.getElementById('ruaVisualizar').value = endereco.rua;
    document.getElementById('numeroVisualizar').value = endereco.numero;
    document.getElementById('complementoVisualizar').value = endereco.complemento || '';
}

// Adiciona evento a todos os botões de visualização
botoesVisualizar.forEach((element) => {
    element.addEventListener('click', () => {
        const index = element.getAttribute('data-index'); // Obtém o índice do endereço
        const endereco = enderecos[index]; // Obtém o endereço correspondente
        preencherModalVisualizar(endereco); // Preenche o modal com os dados
        modalVisualizar.style.display = "flex"; // Exibe o modal
    });
});
  
let enderecoIdParaExcluir = null; 

botoesExcluir.forEach((element) => {
    element.addEventListener('click', () => {
        enderecoIdParaExcluir = element.getAttribute('data-id'); 
        modalExcluir.style.display = "flex";
    });
});
//Fecha o modal de exclusão
botaoDesistir.addEventListener('click', () => {
    modalExcluir.style.display = "none";
    enderecoIdParaExcluir = null;
});

//Exclui endereço
botaoPersistir.addEventListener("click", () => {
    if (enderecoIdParaExcluir) {
        fetch(`/endereco/excluir/${enderecoIdParaExcluir}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (response.ok) {
                    alert("Endereço excluído com sucesso!");
                    modalExcluir.style.display = "none";

                    // Remover o endereço da lista na interface
                    const enderecoElemento = document.querySelector(
                        `.icone[data-id="${enderecoIdParaExcluir}"]`
                    ).closest(".endereco");
                    if (enderecoElemento) {
                        enderecoElemento.remove();
                    }
                } else {
                    alert("Erro ao excluir o endereço. Verifique se ele está associado a uma venda.");
                }
                location.reload()
            })
            .catch((error) => {
                console.error("Erro ao excluir:", error);
                alert("Ocorreu um erro ao tentar excluir o endereço.");
            })
            .finally(() => {
                enderecoIdParaExcluir = null; // Limpar o ID do endereço
            });
    }
});

const campoNome = document.getElementById("nomeAtualizar");
const campoCidade = document.getElementById("cidadeAtualizar");
const campoCEP = document.getElementById("cepAtualizar");
const campoRua = document.getElementById("ruaAtualizar");
const campoNumero = document.getElementById("numeroAtualizar");
const campoComplemento = document.getElementById("complementoAtualizar");
let enderecoIdParaEditar = null;

// Abrir o modal de edição com os dados do endereço
botoesEditar.forEach((element) => {
    element.addEventListener("click", () => {
        enderecoIdParaEditar = element.getAttribute("data-id");

        // Obter os dados do endereço
        const endereco = enderecos.find((e) => e.idEndereco == enderecoIdParaEditar);
        // Preencher os campos do modal com os dados do endereço
        if (endereco) {
            campoNome.value = endereco.nome || "";
            campoCidade.value = endereco.cidade || "";
            campoCEP.value = endereco.CEP || "";
            campoRua.value = endereco.rua || "";
            campoNumero.value = endereco.numero || "";
            campoComplemento.value = endereco.complemento || "";
        }

        // Exibir o modal
        modalEditar.style.display = "flex";
    });
});

// Enviar os dados atualizados ao backend
botaoEditar.addEventListener("click", () => {
    if (enderecoIdParaEditar) {
        const dadosAtualizados = {
            nome: campoNome.value,
            cidade: campoCidade.value,
            CEP: campoCEP.value,
            rua: campoRua.value,
            numero: campoNumero.value,
            complemento: campoComplemento.value,
        };

        fetch(`/endereco/editar/${enderecoIdParaEditar}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dadosAtualizados),
        })
            .then((response) => {
                if (response.ok) {
                    alert("Endereço atualizado com sucesso!");
                    modalEditar.style.display = "none";

                    // Atualizar a interface com o novo nome (opcional)
                    const enderecoElemento = document.querySelector(`.iconeEditar[data-id="${enderecoIdParaEditar}"]`);
                    if (enderecoElemento) {
                        enderecoElemento.closest(".endereco").querySelector(".nomeEndereco").textContent = dadosAtualizados.nome;
                    }
                } else {
                    alert("Erro ao atualizar o endereço.");
                }
                location.reload()
            })
            .catch((error) => {
                console.error("Erro:", error);
                alert("Ocorreu um erro ao tentar atualizar o endereço.");
            })
            .finally(() => {
                enderecoIdParaEditar = null; // Limpar o ID do endereço
            });
    }
});

const botaoEditarDadosDoUsuario = document.getElementById("botaoEditarDadosUsuario");
const botaoSalvarDadosDoUsuario = document.getElementById("botaoSalvarDadosUsuario");
const campos = document.querySelectorAll(".opacidade");

botaoEditarDadosDoUsuario.addEventListener('click',()=>{
    botaoEditarDadosDoUsuario.style.display = 'none';
    botaoSalvarDadosDoUsuario.style.display = 'flex';
    campos.forEach(element => {
        element.style.opacity = '100'
        element.readOnly = false;
    });
})


botaoSalvarDadosDoUsuario.addEventListener('click',async()=>{

    const nome = document.getElementById('nomeUsuario').value;
    const cpf = document.getElementById('cpf').value;
    const idade = document.getElementById('idade').value;

    const formulario = document.createElement('form');
    formulario.method = 'post';
    formulario.action = '/editarPerfil'; // Rota para o backend
    formulario.style.display = 'none';

    // Criação dos inputs dinâmicos
    const inputNome = document.createElement('input');
    inputNome.type = 'text';
    inputNome.name = 'nome';
    inputNome.value = nome;

    const inputCPF = document.createElement('input');
    inputCPF.type = 'text';
    inputCPF.name = 'cpf';
    inputCPF.value = cpf;

    const inputIdade= document.createElement('input');
    inputIdade.type = 'text';
    inputIdade.name = 'idade';
    inputIdade.value = idade;

    formulario.appendChild(inputNome);
    formulario.appendChild(inputCPF);
    formulario.appendChild(inputIdade);

    document.body.appendChild(formulario);
    await formulario.submit();

    document.body.removeChild(formulario);


    botaoEditarDadosDoUsuario.style.display = 'flex';
    botaoSalvarDadosDoUsuario.style.display = 'none';
    campos.forEach(element => {
        element.style.opacity = '0.5'
        element.readOnly = true;
    });

})

const fileInput = document.getElementById('file-input');
const uploadArea = document.getElementById('fotoPerfilUsuario');

uploadArea.addEventListener('click', () => {
    fileInput.click();
  });

fileInput.addEventListener('change', () => {
    const formulario = document.createElement('form');
    formulario.method = 'post';
    formulario.action = '/mudarImagemUsuario'; // Rota para o backend
    formulario.style.display = 'none';
    formulario.enctype = 'multipart/form-data';

    formulario.appendChild(document.getElementById("file-input"));

    document.body.appendChild(formulario);

    formulario.submit();

    alert("Endereço cadastrado com sucesso!")

    document.body.removeChild(formulario);
  
});