document.getElementById('botaoLogin').addEventListener('click', (event) => {
    event.preventDefault(); // Impede o comportamento padrão do envio do formulário

    const senha = document.getElementById('senha').value;
    // Verifica se os campos foram preenchidos
    if (!senha) {
        alert('Por favor, preencha o campo!');
        return;
    }

    // Obtém o token da query string
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (!token) {
        alert('Token de redefinição de senha não encontrado. Por favor, tente novamente.');
        return;
    }


    // Cria um formulário para enviar os dados
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = `/resetarSenha`;  // Certifique-se de que esta rota está correta

    const inputSenha = document.createElement('input');
    inputSenha.type = 'hidden';
    inputSenha.name = 'senha';
    inputSenha.value = senha;

    // Adiciona o token ao formulário
    const inputToken = document.createElement('input');
    inputToken.type = 'hidden';
    inputToken.name = 'token';
    inputToken.value = token;

    form.appendChild(inputToken);
    form.appendChild(inputSenha);

    document.body.appendChild(form);

    // Envia o formulário
    form.submit();

    // Remove o formulário do DOM após o envio
    document.body.removeChild(form);
});
