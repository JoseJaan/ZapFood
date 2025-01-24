const botaoEditarDadosDoUsuario = document.getElementById("botaoEditarDadosUsuario");
const botaoSalvarDadosDoUsuario = document.getElementById("botaoSalvarDadosUsuario");
const campos = document.querySelectorAll(".opacidade");

botaoEditarDadosDoUsuario.addEventListener('click',()=>{
    botaoEditarDadosDoUsuario.style.display = 'none';
    botaoSalvarDadosDoUsuario.style.display = 'flex';
    campos.forEach(element => {
        element.style.opacity = '100'
        element.readOnly = false;
    });
})


botaoSalvarDadosDoUsuario.addEventListener('click',async()=>{

    const nome = document.getElementById('nomeEmpresa').value;
    const cnpj = document.getElementById('cnpj').value;
    const hf = document.getElementById('hf').value;
    const bd = document.getElementById('bd').value;

    const formulario = document.createElement('form');
    formulario.method = 'post';
    formulario.action = '/editarPerfilEmpresa'; // Rota para o backend
    formulario.style.display = 'none';

    // Criação dos inputs dinâmicos
    const inputNome = document.createElement('input');
    inputNome.type = 'text';
    inputNome.name = 'nome';
    inputNome.value = nome;

    const inputCNPJ = document.createElement('input');
    inputCNPJ.type = 'text';
    inputCNPJ.name = 'cpf';
    inputCNPJ.value = cnpj;

    const inputhf= document.createElement('input');
    inputhf.type = 'text';
    inputhf.name = 'idade';
    inputhf.value = hf;

    const inputbd= document.createElement('input');
    inputbd.type = 'text';
    inputbd.name = 'idade';
    inputbd.value = bd;

    formulario.appendChild(inputNome);
    formulario.appendChild(inputCNPJ);
    formulario.appendChild(inputhf);
    formulario.appendChild(inputbd);

    document.body.appendChild(formulario);
    //await formulario.submit();

    document.body.removeChild(formulario);

    botaoEditarDadosDoUsuario.style.display = 'flex';
    botaoSalvarDadosDoUsuario.style.display = 'none';
    campos.forEach(element => {
        element.style.opacity = '0.5'
        element.readOnly = true;
    });

})

const fileInput = document.getElementById('file-input');
const uploadArea = document.getElementById('fotoPerfilUsuario');

uploadArea.addEventListener('click', () => {
    fileInput.click();
  });

fileInput.addEventListener('change', () => {
    const formulario = document.createElement('form');
    formulario.method = 'post';
    formulario.action = '/mudarImagemLoja'; // Rota para o backend
    formulario.style.display = 'none';
    formulario.enctype = 'multipart/form-data';

    formulario.appendChild(document.getElementById("file-input"));

    document.body.appendChild(formulario);

    formulario.submit();

    alert("Imagem alterada com sucesso!")

    document.body.removeChild(formulario);
  
});