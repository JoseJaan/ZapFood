document.getElementById('botaoLogin').addEventListener('click', (event) => {
    event.preventDefault(); // Impede o comportamento padrão do envio do formulário

    console.log("Positivo");
    // Captura o valor do campo de entrada
    const email = document.getElementById('usuario').value;
    
    console.log(email); // Mostra o valor no console para depuração

    // Verifica se o campo foi preenchido
    if (!email) {
        alert('Por favor, preencha o campo!');
        return;
    }

    // Cria um formulário para enviar os dados
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '/redSenha';  // Certifique-se de que esta rota está correta

    const inputEmail = document.createElement('input');
    inputEmail.type = 'hidden'; // Torna o campo invisível no formulário
    inputEmail.name = 'email';
    inputEmail.value = email; // Insere o valor do email

    form.appendChild(inputEmail);

    document.body.appendChild(form);

    // Envia o formulário
    form.submit();

    // Remove o formulário do DOM após o envio
    document.body.removeChild(form);
});
