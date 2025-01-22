const botao = document.getElementById("botaoAdicionaraoCarrinho");
const id = document.getElementById("idProduto");

botao.addEventListener('click',async ()=>{
    event.preventDefault();

    const formulario = document.createElement('form');
    formulario.method = 'post';
    formulario.action = '/adicionarAoCarrinho'; // Rota para o backend
    formulario.style.display = 'none';

    // Criação dos inputs dinâmicos
    const inputID = document.createElement('input');
    inputID.type = 'text';
    inputID.name = 'id';
    inputID.value = id.value;

    formulario.appendChild(inputID);

    document.body.appendChild(formulario);
    await formulario.submit();

    alert("Adicionado ao carrinho com sucesso!");

    await document.body.removeChild(formulario);


})