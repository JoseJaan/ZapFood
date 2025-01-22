const checkboxes = document.querySelectorAll('.checkbox');
const checkboxess = document.querySelectorAll('.checkboxx');


checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      // Desmarca todos os outros checkboxes quando um é marcado
      checkboxes.forEach(cb => {
        if (cb !== this) {
          cb.checked = false;
        }
      });
    });
  });

  checkboxess.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      // Desmarca todos os outros checkboxes quando um é marcado
      checkboxess.forEach(cb => {
        if (cb !== this) {
          cb.checked = false;
        }
      });
    });
  });