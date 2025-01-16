document.getElementById('botao').addEventListener('click',()=>{
    event.preventDefault();
    const campoSenha = document.getElementById('senha').value;
    const campoSenhaConfirmar = document.getElementById('confirmarSenha').value;

    if(campoSenha == campoSenhaConfirmar){
        const formulario = document.createElement('form');
        formulario.method = 'post';
        formulario.action = '/registroEmpresa'; // Substitua pelo caminho correto
        formulario.classList.add('formulario');
       // formulario.enctype = 'multipart/form-data'; // Necessário para envio de arquivos

        const nome = document.getElementById('nome').value;
        const horarioFuncionamento = document.getElementById('horarioFuncionamento').value;
        const cnpj = document.getElementById('cnpj').value;
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;
        const descricao = document.getElementById('descricao').value;

        const inputNome = document.createElement('input');
        inputNome.type = 'text';
        inputNome.name = 'nome';
        inputNome.value = nome;

        const inputHorario = document.createElement('input');
        inputHorario.type = 'text';
        inputHorario.name = 'horarioFuncionamento';
        inputHorario.value = horarioFuncionamento;

        const inputCnpj = document.createElement('input');
        inputCnpj.type = 'text';
        inputCnpj.name = 'cnpj';
        inputCnpj.value = cnpj;

        const inputEmail = document.createElement('input');
        inputEmail.type = 'text';
        inputEmail.name = 'email';
        inputEmail.value = email;

        const inputDescricao = document.createElement('input');
        inputDescricao.type = 'text';
        inputDescricao.name = 'descricao';
        inputDescricao.value = descricao;

        const inputSenha = document.createElement('input');
        inputSenha.type = 'text';
        inputSenha.name = 'senha';
        inputSenha.value = senha;

        formulario.appendChild(inputNome);
        formulario.appendChild(inputCnpj);
        formulario.appendChild(inputEmail);
        formulario.appendChild(inputHorario);
        formulario.appendChild(inputDescricao);
        formulario.appendChild(inputSenha);

        document.body.appendChild(formulario);

        formulario.submit();

        document.body.removeChildChild(formulario);

        


    }
    else{
        alert("Senhas não conferem");
    }
})