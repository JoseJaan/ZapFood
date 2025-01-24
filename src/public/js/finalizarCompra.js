const botaoFinalizar = document.getElementById("botaoFinalizarPedido");

botaoFinalizar.addEventListener("click", async ()=>{
  event.preventDefault();

  


  const radiosf = document.getElementsByName('formaPagamento');

    let valorSelecionadof = null;
    for (const radio of radiosf) {
      if (radio.checked) {
        valorSelecionadof = radio.value;
        break;
      }
    }

    if (!valorSelecionadof) {
      alert("Por favor, preencha o campo forma de pagamento");
      return;
  }


     // Cria o formulário dinâmico
     const formulario = document.createElement('form');
     formulario.method = 'post';
     formulario.action = '/finalizarCompra'; // Rota para o backend
     formulario.style.display = 'none';

     const inputFormaPagamento = document.createElement('input');
     inputFormaPagamento.type = 'text';
     inputFormaPagamento.name = 'formaPagamento';
     inputFormaPagamento.value = valorSelecionadof;

    formulario.appendChild(inputFormaPagamento);


  if(document.getElementById("enderecoExiste").checked  == true){
    const radios = document.getElementsByName('enderecoExiste');
    let valorSelecionado = null;
    for (const radio of radios) {
      if (radio.checked) {
        valorSelecionado = radio.value;
        break;
      }
    }

    if (!valorSelecionado) {
      alert("Por favor, escolha algum endereço");
      return;
  }

    const inputEnderecoExiste = document.createElement('input');
    inputEnderecoExiste.type = 'text';
    inputEnderecoExiste.name = 'endereco';
    inputEnderecoExiste.value = valorSelecionado;

    formulario.appendChild(inputEnderecoExiste);
  }
  else{
    const nome = document.getElementById('nome').value;
    const cidade = document.getElementById('cidade').value;
    const cep = document.getElementById('cep').value;
    const rua = document.getElementById('rua').value;
    const numero = document.getElementById('numero').value;
    const complemento = document.getElementById('complemento').value;

    // Verifica se todos os campos obrigatórios estão preenchidos
    if (!nome || !cidade || !cep || !rua || !numero) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }


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


  }

  document.body.appendChild(formulario);
  await formulario.submit();
  

})

