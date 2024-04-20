function mostrarProgramasActuales() {
  var ahora = new Date();
  var horaActual = ahora.getHours() * 60 + ahora.getMinutes(); // Convertir la hora actual a minutos
  var diaSemanaActual = ahora.getDay() || 0;

  var tablaProgramacion = document.getElementById("tablaProgramacion");
  var programaActual = ""; // Inicialmente no hay programa actual
  var programaSiguiente = ""; // Inicialmente no hay programa siguiente

  // Iterar sobre las filas de la tabla (a partir de la segunda fila)
  for (var i = 2; i < tablaProgramacion.rows.length; i++) {
    var fila = tablaProgramacion.rows[i];
    var horaPrograma = fila.cells[0].textContent;
    var programa = fila.cells[diaSemanaActual].textContent; // Usar el día de la semana actual como índice
    var horas = horaPrograma.split(" - ");
    var horaInicio = horas[0];
    var horaFin = horas[1];
    var minutosInicio = convertirHoraAMinutos(horaInicio);
    var minutosFin = convertirHoraAMinutos(horaFin);

    if (horaActual >= minutosInicio && horaActual <= minutosFin) {
      programaActual = programa;
      // Obtener el programa siguiente si existe
      if (i + 1 < tablaProgramacion.rows.length) {
        var siguienteFila = tablaProgramacion.rows[i + 1];
        programaSiguiente = siguienteFila.cells[diaSemanaActual].textContent;
      }
      fila.classList.add("horaActual"); // Agregar la clase de estilo para resaltar la fila actual
      break; // Salir del bucle una vez que se encuentre el programa actual
    }
  }

  // Actualizar el contenido del elemento HTML con los programas actuales
  var programaActualElement = document.getElementById("programaActual");
  if (programaActual.trim() === "") {
    programaActualElement.innerHTML = "<strong>AHORA:</strong>"+ " MÚSICA 24H"; // Mensaje predeterminado
  } else {
    programaActualElement.innerHTML = "<strong>AHORA</strong>"+ ": " + programaActual;
  }

  var programaSiguienteElement = document.getElementById("programaSiguiente");
  if (programaSiguiente.trim() === "") {
    programaSiguienteElement.innerHTML = "<strong>DESPUÉS:</strong>"+ " MÚSICA 24H"; // Mensaje predeterminado si no hay programa siguiente
  } else {
    programaSiguienteElement.innerHTML = "<strong>DESPUÉS</strong>" + ": " + programaSiguiente;
  }
}

function convertirHoraAMinutos(hora) {
  var partesHora = hora.split(":");
  var horas = parseInt(partesHora[0]);
  var minutos = parseInt(partesHora[1]);
  return horas * 60 + minutos; // Convertir la hora a minutos
}

document.addEventListener("DOMContentLoaded", function () {
  mostrarProgramasActuales();
});

// Llamar a la función para mostrar los programas actuales
mostrarProgramasActuales();
