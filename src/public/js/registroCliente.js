document.getElementById('botao').addEventListener('click',()=>{
    event.preventDefault();
    const campoSenha = document.getElementById('senha').value;
    const campoSenhaConfirmar = document.getElementById('confirmarSenha').value;

    if(campoSenha == campoSenhaConfirmar){
        const formulario = document.createElement('form');
        formulario.method = 'post';
        formulario.action = '/cadastro'; // Substitua pelo caminho correto
        formulario.classList.add('formulario');
       // formulario.enctype = 'multipart/form-data'; // Necessário para envio de arquivos

        const nome = document.getElementById('nome').value;
        const idade = document.getElementById('idade').value;
        const cpf = document.getElementById('cpf').value;
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;


        const inputNome = document.createElement('input');
        inputNome.type = 'text';
        inputNome.name = 'nome';
        inputNome.value = nome;

        const inputIdade = document.createElement('input');
        inputIdade.type = 'text';
        inputIdade.name = 'idade';
        inputIdade.value = idade;

        const inputCpf = document.createElement('input');
        inputCpf.type = 'text';
        inputCpf.name = 'cpf';
        inputCpf.value = cpf;

        const inputEmail = document.createElement('input');
        inputEmail.type = 'text';
        inputEmail.name = 'email';
        inputEmail.value = email;


        const inputSenha = document.createElement('input');
        inputSenha.type = 'text';
        inputSenha.name = 'senha';
        inputSenha.value = senha;

        formulario.appendChild(inputNome);
        formulario.appendChild(inputCpf);
        formulario.appendChild(inputEmail);
        formulario.appendChild(inputIdade);
        formulario.appendChild(inputSenha);

        document.body.appendChild(formulario);

        formulario.submit();

        document.body.removeChildChild(formulario);

    }
    else{
        alert("Senhas não conferem");
    }
})