document.addEventListener("DOMContentLoaded", function() {
    var boton = document.getElementById("menu");
    var hoverActivo = false;
    var temporizador;

    boton.addEventListener("mouseenter", function() {
        hoverActivo = true;
        clearTimeout(temporizador); // Limpiar el temporizador si el cursor está sobre el botón
    });

    boton.addEventListener("mouseleave", function() {
        hoverActivo = false;
        iniciarTemporizador(); // Volver a iniciar el temporizador cuando el cursor sale del botón
    });

    boton.addEventListener("click", function() {
        boton.classList.add("clicked");
        clearTimeout(temporizador); // Limpiar el temporizador al hacer clic en el botón
        temporizador = setTimeout(function() {
            if (!hoverActivo) {
                boton.classList.remove("clicked");
            }
        }, 2000); // Cambia el estado después de 3 segundos (3000 milisegundos)
    });

    // Función para iniciar el temporizador
    function iniciarTemporizador() {
        temporizador = setTimeout(function() {
            if (!hoverActivo) {
                boton.classList.remove("clicked");
            }
        }, 2000); // Cambia el estado después de 3 segundos (3000 milisegundos)
    }

    // Iniciar el temporizador cuando se carga el DOM
    iniciarTemporizador();
});
