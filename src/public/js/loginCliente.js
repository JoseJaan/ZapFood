document.getElementById('botaoLogin').addEventListener('click', (event) => {
    event.preventDefault(); // Impede o comportamento padrão do envio do formulário


    // Captura os valores dos campos de entrada
    const email = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;
    // Verifica se os campos foram preenchidos
    if (!email || !senha) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    // Cria um formulário para enviar os dados
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '/autenticar';  // Certifique-se de que esta rota está correta

    const inputEmail = document.createElement('input');
    inputEmail.type = 'hidden'; // Torna o campo invisível no formulário
    inputEmail.name = 'email';
    inputEmail.value = email;

    const inputSenha = document.createElement('input');
    inputSenha.type = 'hidden';
    inputSenha.name = 'senha';
    inputSenha.value = senha;

    form.appendChild(inputEmail);
    form.appendChild(inputSenha);

    document.body.appendChild(form);

    // Envia o formulário
    form.submit();

    // Remove o formulário do DOM após o envio
    document.body.removeChild(form);
});
