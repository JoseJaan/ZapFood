const botaoAdicionar = document.getElementById("botaoAdicionar")
const modalAdicionar = document.getElementById("modalAdicionar")
const botoesEditar = document.querySelectorAll(".iconeEditar");
const modalEditar = document.getElementById("modalEditar");
const modalVisualizar = document.getElementById("modalVisualizar");
const botoesVisualizar = document.querySelectorAll(".iconeVisualizar")
const modalExcluir = document.getElementById("modalExcluir");
const botoesExcluir = document.querySelectorAll(".icone")

botaoAdicionar.addEventListener('click',()=>{
    modalAdicionar.style.display = 'flex';
})

window.onclick = function (event) {
    if (event.target === modalAdicionar) {
        modalAdicionar.style.display = "none";
    }

    if (event.target === modalEditar) {
        modalEditar.style.display = "none";
    }
    
    if (event.target === modalVisualizar) {
        modalVisualizar.style.display = "none";
    }

    if (event.target === modalExcluir) {
        modalExcluir.style.display = "none";
    }
  };


  botoesEditar.forEach(element => {
    element.addEventListener('click',()=>{
        modalEditar.style.display = "flex";
    });
  });

  botoesVisualizar.forEach(element => {
    element.addEventListener('click',()=>{
        modalVisualizar.style.display = "flex";
    });
  });
  

  botoesExcluir.forEach(element => {
    element.addEventListener('click',()=>{
        modalExcluir.style.display = "flex";
    });
  });
  