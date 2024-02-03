function leerMas(boton) {
  var contenedor = boton.closest('.card');
  var contenido = contenedor.querySelector('.parrafoleermas');

  // Alternar entre altura inicial y máxima altura
  contenido.style.maxHeight = contenido.style.maxHeight === "100px" ? "100%" : "100px";

  // Cambiar el texto del botón
  boton.textContent = contenido.style.maxHeight === "100px" ? "Leer más" : "Leer menos";
}


// function leerMas() {
//     var contenido = document.getElementById("parrafoleermas");
//     var boton = document.getElementById("botonleermas");

//     // Alternar entre altura inicial y máxima altura
//     contenido.style.maxHeight = contenido.style.maxHeight === "100px" ? "100%" : "100px";

//     // Cambiar el texto del botón
//     boton.textContent = contenido.style.maxHeight === "100px" ? "Leer más" : "Leer menos";
//   }


// //Abrir mas programas
//   document.querySelector('.masprogramas').addEventListener('click', function() {
//     document.querySelector('.programasrecientes').classList.toggle('mostrar');
//   });
  