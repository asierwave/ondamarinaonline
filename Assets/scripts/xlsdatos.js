function cargarDatosDesdeGoogleSheets() {
  gapi.client
    .init({
      apiKey: "AIzaSyCZm_uR6TknLlgLhTrOhhsSKnzgUQeSOOE",
    })
    .then(function () {
      return gapi.client.request({
        path: "https://sheets.googleapis.com/v4/spreadsheets/1jlHc0Z3_P7ibmAAqTkfxBtAez530e-bH36wVKRHwPuI/values/MAIN!A:Z",
      });
    })
    .then(
      function (response) {
        var datos = response.result.values;
        var arrayDeObjetos = [];
        if (datos && datos.length > 0) {
          for (var i = 1; i < datos.length; i++) {
            // Empezamos en 1 para omitir la fila de encabezado
            var fila = datos[i];
            var objeto = {
              id: fila[0],
              titulo: fila[1],
              descripcion: fila[2],
              imagen: fila[3],

              // Puedes agregar más propiedades según la estructura de tu hoja de cálculo
            };
            arrayDeObjetos.push(objeto);
          }
        }
        console.log(arrayDeObjetos);

        // Puedes hacer lo que quieras con el array de objetos aquí

        //////////////////////////

        // Buscar el elemento <h2> dentro del <div> con id "xlsquienesomos"
        var quienesSomosTitulo = document.getElementById(
          "xlsquienesomostitulo"
        );
        var quienesSomosDescripcion = document.getElementById(
          "xlsquienesomosdescripcion"
        );

        var mapaTitulo = document.getElementById("xlssectionmapatitulo");
        var mapaDescripcion = document.getElementById(
          "xlssectionmapadescripcion"
        );

        var footerTitulo = document.getElementById("xlssectionfootertitulo");
        // var footerDescripcion = document.getElementById("xlssectionfooterdescripcion");

        // Verificar que hay algo en el array
        if (arrayDeObjetos !== null) {
          // Asignar valores al texto e imágenes
          quienesSomosTitulo.innerHTML = arrayDeObjetos[0].titulo;
          quienesSomosDescripcion.innerHTML = arrayDeObjetos[0].descripcion;

          mapaTitulo.innerHTML = arrayDeObjetos[1].titulo;
          mapaDescripcion.innerHTML = arrayDeObjetos[1].descripcion;

          footerTitulo.innerHTML = arrayDeObjetos[2].titulo;
          //   footerDescripcion.innerHTML = arrayDeObjetos[21].descripcion;
        } else {
          console.error(
            "No se encuentran datos o no se puede conectar con el array"
          );
        }

        /////////////////////////
      },
      function (reason) {
        console.error("Error: " + reason.result.error.message);
      }
    );
}


// Cargar la API de Google Sheets
gapi.load("client", cargarDatosDesdeGoogleSheets);
