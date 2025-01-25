document.addEventListener("DOMContentLoaded", () => {
    const minhaEmpresaDiv = document.getElementById("minhaEmpresa");

    if (minhaEmpresaDiv) {
        minhaEmpresaDiv.addEventListener("click", () => {
            const url = minhaEmpresaDiv.getAttribute("data-href");
            if (url) {
                window.location.href = url;
            }
        });
    }
});
