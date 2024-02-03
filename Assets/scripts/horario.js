function mostrarProgramaActual() {
  var ahora = new Date();
  var horaActual = ahora.getHours() + ':' + (ahora.getMinutes() < 10 ? '0' : '') + ahora.getMinutes();
  var diaSemanaActual = ahora.getDay();

  var tablaProgramacion = document.getElementById("tablaProgramacion");
  var programaActual = ""; // Inicialmente no hay programa actual

  // Iterar sobre las filas de la tabla (a partir de la segunda fila)
  for (var i = 1; i < tablaProgramacion.rows.length; i++) {
    var fila = tablaProgramacion.rows[i];
    var horaPrograma = fila.cells[0].textContent;
    var programa = fila.cells[diaSemanaActual].textContent; // Usar el día de la semana actual como índice

    var horas = horaPrograma.split(" - ");
    var horaInicio = horas[0];
    var horaFin = horas[1];

    if (horaActual >= horaInicio && horaActual <= horaFin) {
      programaActual = programa;
      fila.classList.add("horaActual"); // Agregar la clase de estilo para resaltar la fila actual
      break; // Salir del bucle una vez que se encuentre el programa actual
    }
  }

  // Actualizar el contenido del elemento HTML con el programa actual o el mensaje predeterminado
  var programaActualElement = document.getElementById("programaActual");
  if (programaActual.trim() === "") {
    programaActualElement.textContent = "AHORA: MÚSICA 24H"; // Mensaje predeterminado
  } else {
    programaActualElement.textContent = "AHORA: " + programaActual;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  mostrarProgramaActual();
});

// Llamar a la función para mostrar el programa actual
mostrarProgramaActual();







// function mostrarProgramaActual() {
//   var ahora = new Date();
//   var horaActual = ahora.getHours() + ':' + (ahora.getMinutes() < 10 ? '0' : '') + ahora.getMinutes();
//   var diaSemanaActual = ahora.getDay();

//   var tablaProgramacion = document.getElementById("tablaProgramacion");
//   var programaActual = ""; // Inicialmente no hay programa actual

//   // Iterar sobre las filas de la tabla (a partir de la segunda fila)
//   for (var i = 1; i < tablaProgramacion.rows.length; i++) {
//     var fila = tablaProgramacion.rows[i];
//     var horaPrograma = fila.cells[0].textContent;
//     var programa = fila.cells[diaSemanaActual].textContent; // Usar el día de la semana actual como índice

//     var horas = horaPrograma.split(" - ");
//     var horaInicio = horas[0];
//     var horaFin = horas[1];

//     if (horaActual >= horaInicio && horaActual <= horaFin) {
//       programaActual = programa;
//       break; // Salir del bucle una vez que se encuentre el programa actual
//     }
//   }

//   // Actualizar el contenido del elemento HTML con el programa actual o el mensaje predeterminado
//   var programaActualElement = document.getElementById("programaActual");
//   if (programaActual.trim() === "") {
//     programaActualElement.textContent = "AHORA: MÚSICA 24H"; // Mensaje predeterminado
//   } else {
//     programaActualElement.textContent = "AHORA: " + programaActual;
//   }
// }

// document.addEventListener("DOMContentLoaded", function() {
//   mostrarProgramaActual();
// });

// // Llamar a la función para mostrar el programa actual
// mostrarProgramaActual();
