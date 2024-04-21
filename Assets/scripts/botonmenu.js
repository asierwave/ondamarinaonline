document.addEventListener("DOMContentLoaded", function() {
    var boton = document.getElementById("menu");
    var hoverActivo = false;
    var temporizador;
    var botonImg = document.getElementById("menu2");

    boton.addEventListener("mouseenter", function() {
        hoverActivo = true;
        clearTimeout(temporizador); // Limpiar el temporizador si el cursor está sobre el botón
        if (boton.classList.contains("clicked")) {
            botonImg.setAttribute('src', 'Assets/menucierre.png'); // Cambia la imagen a "Cierremenu"

        } else {
            botonImg.setAttribute('src', 'Assets/menualtwhite.png'); // Cambia la imagen a "menu"

        };
    });

    boton.addEventListener("mouseleave", function() {
        hoverActivo = false;
        iniciarTemporizador(); // Volver a iniciar el temporizador cuando el cursor sale del botón

        if (boton.classList.contains("clicked")) {
            botonImg.setAttribute('src', 'Assets/menucierre.png'); // Cambia la imagen a "Cierremenu"

        } else {
            botonImg.setAttribute('src', 'Assets/menualtwhite.png'); // Cambia la imagen a "menu"

        };
    

    });

    boton.addEventListener("click", function() {
        
     if (boton.classList.contains("clicked")) {
        boton.classList.remove("clicked");
        botonImg.setAttribute('src', 'Assets/menualtwhite.png'); // Cambia la imagen a "menu"

     } else {
        boton.classList.add("clicked");
        clearTimeout(temporizador); // Limpiar el temporizador al hacer clic en el botón
        botonImg.setAttribute('src', 'Assets/menucierre.png'); // Cambia la imagen a "Cierremenu"

        temporizador = setTimeout(function() {
            if (!hoverActivo) {
                boton.classList.remove("clicked");
                botonImg.setAttribute('src', 'Assets/menualtwhite.png'); // Cambia la imagen a "Cierremenu"
            }
        }, 2000); // Cambia el estado después de 2 segundos (2000 milisegundos)

    }
    });

    // Función para iniciar el temporizador
    function iniciarTemporizador() {
        temporizador = setTimeout(function() {
            if (!hoverActivo) {
                boton.classList.remove("clicked");
            }
        }, 2000); // Cambia el estado después de 3 segundos (3000 milisegundos)
        botonImg.setAttribute('src', 'Assets/menualtwhite.png'); // Cambia la imagen a "menu"

    }

    // Iniciar el temporizador cuando se carga el DOM
    iniciarTemporizador();
});
