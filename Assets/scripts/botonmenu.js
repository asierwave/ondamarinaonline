document.addEventListener("DOMContentLoaded", function() {
    var boton = document.getElementById("menu");

    boton.addEventListener("click", function() {
        boton.classList.add("clicked");
        setTimeout(function() {
            boton.classList.remove("clicked");
        }, 3000); // Cambia el estado después de 2 segundos (2000 milisegundos)
    });
});


document.addEventListener("DOMContentLoaded", function() {
var boton = document.querySelector(".submenu");

boton.addEventListener("click", function() {
    boton.classList.add("clicked");
    setTimeout(function() {
        boton.classList.remove("clicked");
    }, 2000); // Cambia el estado después de 2 segundos (2000 milisegundos)
});

});

