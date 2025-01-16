const botaoAdicionar = document.getElementById("botaoAdicionar");
const modalAdicionar = document.getElementById("modalAdicionar");
const modalEditar = document.getElementById("modalEditar");
const modalVisualizar = document.getElementById("modalVisualizar");
const modalExcluir = document.getElementById("modalExcluir");


botaoAdicionar.addEventListener('click',()=>{
    modalAdicionar.style.display = 'flex';

});


window.addEventListener("click", (e) => {
    if (e.target === modalAdicionar) {
        modalAdicionar.style.display = "none";
    }

    if (e.target === modalEditar) {
        modalEditar.style.display = "none";
    }

    if (e.target === modalVisualizar) {
        modalVisualizar.style.display = "none";
    }

    if (e.target === modalExcluir) {
        modalExcluir.style.display = "none";
    }
});



const botoesEditar = document.querySelectorAll('.opcoesEditar');

botoesEditar.forEach(element => {
    element.addEventListener('click',()=>{
        modalEditar.style.display = 'flex';
    })
    
});

const botoesExcluir = document.querySelectorAll('.opcoesExcluir');

botoesExcluir.forEach(element => {
    element.addEventListener('click',()=>{
        modalExcluir.style.display = 'flex';
    })
    
});


const botoesVisualizar = document.querySelectorAll('.iconeVisualizar');

botoesVisualizar.forEach(element => {
    element.addEventListener('click',()=>{
        modalVisualizar.style.display = 'flex';
    })

    
});
