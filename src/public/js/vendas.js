const botaoVisualizar = document.querySelectorAll('.iconeVisualizar');
const modalVisualizar = document.getElementById('modalVisualizar');

botaoVisualizar.forEach((element)=>{

    element.addEventListener('click',()=>{
        modalVisualizar.style.display = 'flex';
    });


});

window.addEventListener('click', (event) => {
    if (event.target === modalVisualizar) {
      modalVisualizar.style.display = 'none';
    }
  });