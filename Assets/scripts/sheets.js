let turnos;

async function getTurnos() {
  let response;
  try {
    // Fetch first 10 files
    response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: "1jlHc0Z3_P7ibmAAqTkfxBtAez530e-bH36wVKRHwPuI",
      range: "MAIN!A:G",
    });
  } catch (err) {
    console.error(err);
    return;
  }

  const range = response.result;
  if (!range || !range.values || range.values.length == 0) {
    console.warn("No se encontraron valores");
    return;
  }

  turnos = [];
  range.values.forEach((fila) => {
    if (isNaN(parseInt(fila[0])) || fila[5] !== undefined) return;
    const nuevoTurno = {
      id: fila[0],
      cliente: fila[1],
      email: fila[2],
      modelo: fila[3],
      problema: fila[4],
      fecha_terminado: fila[5],
      comentario: fila[6]
    };
    turnos.push(nuevoTurno);
  });

  console.log(turnos);


}


  

function asignarClienteSegundoTurno(turnos) {
    // Verificar que exista un segundo turno en el array turnos
    if (turnos[1] !== undefined) {
      // Obtener el cliente del segundo turno
      const clienteSegundoTurno = turnos[1].cliente;
  
      // Buscar el elemento <h2> dentro del <div> con id "xlsquienesomos"
      const h2Element = document.getElementById('xlsquienesomostitulo');
  
      // Verificar que se haya encontrado el elemento <h2>
      if (h2Element) {
        // Asignar el cliente del segundo turno como texto del elemento <h2>
        h2Element.textContent = clienteSegundoTurno;
      } else {
        console.error('No se encontró el elemento <h2> dentro del <div> con id "xlsquienesomostitulo".');
      }
    } else {
      console.error('No hay un segundo turno en la lista.');
    }
  }
  
  // Llamar a la función con la variable de turnos como argumento
  asignarClienteSegundoTurno(turnos);
  

