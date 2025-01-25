const botaoVisualizar = document.querySelectorAll('.iconeVisualizar');
const modalVisualizar = document.getElementById('modalVisualizar');
const modalEditar = document.getElementById('modalEditar');

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
      const nomeCliente = element.getAttribute('data-idcliente'); // Agora pega o nome do cliente
      const produtos = JSON.parse(element.getAttribute('data-produtos'));
      const createdAt = element.getAttribute('data-createdat');

      // Atualiza o conteúdo do modal
      document.querySelector('.nomePerfilModalVisualizar').textContent = `Cliente: ${nomeCliente}`;
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
    if (event.target == modalEditar){
        modalEditar.style.display = 'none';
        document.getElementById("modalConteudoEditar").removeChild(document.getElementById("modalConteudoEditarInfo"));
        document.getElementById("modalConteudoEditar").removeChild(document.getElementById("botaooo"));
    }
});


const icones = document.querySelectorAll(".iconeEditar");

icones.forEach(element =>{
    element.addEventListener('click',()=>{
        modalEditar.style.display = 'flex';

       const produtos = JSON.parse(element.getAttribute('data-produtos'));
       const container = document.createElement('div');  
        container.id = 'modalConteudoEditarInfo';
       produtos.forEach(element => {
        const divNova = document.createElement('div'); 
        divNova.style.display = 'flex';
        const checkbox = document.createElement("input");
        checkbox.type = "radio";
        checkbox.name = "opcao"; // Todos os radios do mesmo grupo precisam ter o mesmo "name"
        checkbox.id = `${element.idProduto}`;
        checkbox.value = `${element.idProduto}`;

        // Cria um label para o input
        const label = document.createElement("div");
        label.innerHTML = `<p>${element.nomeProduto}</p> <p class="descricaoProdutoExcluir">${element.descricaoProduto}</p>`
        label.className="infoExcluirProdutoLabel";

        // Adiciona o input e o label ao container
        divNova.appendChild(checkbox);
        divNova.appendChild(label);
        container.appendChild(divNova)
       });

       
       document.getElementById("modalConteudoEditar").appendChild(container);
       

       const botao = document.createElement('button');
       botao.className = "botaoEditarVendaFinalizar"
       botao.id = 'botaooo'
       botao.setAttribute('data-id',element.getAttribute('data-id'));
       botao.textContent = "Editar Venda";

       container.appendChild(botao);

       document.getElementById("modalConteudoEditar").appendChild(botao);

       
       const botaoEditarVend = document.getElementById("botaooo");
        botaoEditarVend.addEventListener('click',()=>{
        const opcoes = document.getElementsByName("opcao");
        let excluir;
        opcoes.forEach(element => {
            if(element.checked == true){
                excluir = element.id;
            }
        });
        const formulario = document.createElement('form');
        formulario.method = 'post';
        formulario.action = '/vendaAtualizar'; // Rota para o backend
        formulario.style.display = 'none';
    
        // Criação dos inputs dinâmicos
        const input = document.createElement('input');
        input.type = 'text';
        input.name = 'idVenda';
        input.value = document.getElementById('botaooo').getAttribute('data-id');
    
        const input1 = document.createElement('input');
        input1.type = 'text';
        input1.name = 'idProduto';
        input1.value = excluir;


        formulario.appendChild(input);
        formulario.appendChild(input1);

        document.body.appendChild(formulario);
        formulario.submit();

        document.body.removeChild(formulario);
    

        })

    })
})

const botoesExcluir = document.querySelectorAll('.iconeExcluir');

botoesExcluir.forEach((botao) => {
    botao.addEventListener('click', () => {
        const vendaId = botao.previousElementSibling.getAttribute('data-id'); // Obtém o ID da venda
        const confirmacao = confirm('Tem certeza que deseja excluir esta venda?');

        if (confirmacao) {
            fetch(`/vendas/deletar/${vendaId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => {
                    if (response.ok) {
                        alert('Venda excluída com sucesso!');
                        location.reload(); // Atualiza a página para refletir a exclusão
                    } else if (response.status === 403) {
                        alert('Acesso negado ou venda não encontrada.');
                    } else {
                        throw new Error('Erro ao excluir a venda.');
                    }
                })
                .catch((error) => {
                    console.error(error.message);
                    alert('Ocorreu um erro ao tentar excluir a venda.');
                });
        }
    });
});





