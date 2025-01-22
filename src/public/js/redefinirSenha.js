document.getElementById('botaoLogin').addEventListener('click', async (event) => {
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

    try {
        // Envia a requisição para o servidor usando fetch
        const response = await fetch('/redSenha', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
            },
            body: JSON.stringify({ email }), // Envia o email no corpo da requisição
        });

        // Verifica a resposta do servidor
        if (response.ok) {
            alert('Email enviado com sucesso!');
        } else {
            alert('Erro ao enviar o email. Tente novamente.');
        }
    } catch (error) {
        console.error('Erro ao enviar a requisição:', error);
        alert('Ocorreu um erro inesperado. Por favor, tente novamente.');
    }
});
