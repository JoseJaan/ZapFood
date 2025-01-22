const lixeiras = document.querySelectorAll(".lixeiraIcone");


lixeiras.forEach((element)=>{
    element.addEventListener('click',async ()=>{
        const id = element.getAttribute('data-id');
        const formulario = document.createElement('form');
        formulario.method = 'POST'; 
        formulario.action = '/excluirProdutoCarrinho'; // Rota para o backend
        formulario.style.display = 'none';
        const inputId = document.createElement('input');
        inputId.type = 'text';
        inputId.name = 'id';
        inputId.value = id;

        formulario.appendChild(inputId);

        document.body.appendChild(formulario);
        await formulario.submit();
        

        alert("Produto removido com sucesso!")

        await document.body.removeChild(formulario);

    })
})