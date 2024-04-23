function cargarDatosDesdeGoogleSheets() {
  gapi.client
    .init({
      apiKey: "AIzaSyCZm_uR6TknLlgLhTrOhhsSKnzgUQeSOOE",
    })
    .then(function () {
      return gapi.client.request({
        path: "https://sheets.googleapis.com/v4/spreadsheets/1jlHc0Z3_P7ibmAAqTkfxBtAez530e-bH36wVKRHwPuI/values/A1%3AC100",
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
              otro: fila[4],

              // Puedes agregar más propiedades según la estructura de tu hoja de cálculo
            };
            arrayDeObjetos.push(objeto);
          }
        }
        console.log(arrayDeObjetos);

        // Puedes hacer lo que quieras con el array de objetos aquí

        //////////////////////////

        // Buscar el elemento <h2> dentro del <div> con id "xlsquienesomos"
        const quienesSomosTitulo = document.getElementById(
          "xlsquienesomostitulo"
        );
        const quienesSomosDescripcion = document.getElementById(
          "xlsquienesomosdescripcion"
        );

        const lasOndasTitulo = document.getElementById(
          "xlscardlasondasdelamarinatitulo"
        );
        const lasOndasDescripcion = document.getElementById(
          "xlscardlasondasdelamarinadescripcion"
        );


        const elRinconTitulo = document.getElementById("xlscardelrincondemaurititulo");
        const elRinconDescripcion = document.getElementById(
          "xlscardelrincondemauridescripcion");


        const elDesvanTitulo = document.getElementById("xlscardeldesvantitulo");
        const elDesvanDescripcion = document.getElementById(
          "xlscardeldesvandescripcion"
        );
 

        const lasTertuliasTitulo = document.getElementById("xlscardlastertuliasinformalestitulo");
        const lasTertuliasDescripcion = document.getElementById("xlscardlastertuliasinformalesdescripcion");

        const laTabernaTitulo = document.getElementById("xlscardlatabernadelossuenostitulo");
        const laTabernaDescripcion = document.getElementById(
          "xlscardlatabernadelossuenosdescripcion"
        );

        const laSendaTitulo = document.getElementById(
          "xlscardlasendadelvagabundotitulo"
        );
        const laSendaDescripcion = document.getElementById(
          "xlscardlasendadelvagabundodescripcion"
        );

        const deUnTiempoTitulo = document.getElementById(
          "xlscarddeuntiempoaestapartetitulo"
        );
        const deUnTiempoDescripcion = document.getElementById(
          "xlscarddeuntiempoaestapartedescripcion"
        );

        const arribaQueEsTitulo = document.getElementById(
          "xlscardarribaqueeslahoratitulo"
        );
        const arribaQueEsDescripcion = document.getElementById(
          "xlscardarribaqueeslahoradescripcion"
        );

        const cuatroTerciosTitulo = document.getElementById(
          "xlscardcuatroterciostitulo"
        );
        const cuatroTerciosDescripcion = document.getElementById(
          "xlscardcuatroterciosdescripcion"
        );

        const genteDivertidaTitulo = document.getElementById(
          "xlscardgentedivertidatitulo"
        );
        const genteDivertidaDescripcion = document.getElementById(
          "xlscardgentedivertidadescripcion"
        );

        const elBoleroTitulo = document.getElementById(
          "xlscardelboleroencantabriatitulo"
        );
        const elBoleroDescripcion = document.getElementById(
          "xlscardelboleroencantabriadescripcion"
        );

        const luchaGigantesTitulo = document.getElementById(
          "xlscardluchadegigantestitulo"
        );
        const luchaGigantesDescripcion = document.getElementById(
          "xlscardluchadegigantesdescripcion"
        );

        const elRaroTitulo = document.getElementById(
          "xlscardelraroerestutitulo"
        );
        const elRaroDescripcion = document.getElementById(
          "xlscardelraroerestudescripcion"
        );


        const mapaTitulo = document.getElementById("xlssectionmapatitulo");
        const mapaDescripcion = document.getElementById("xlssectionmapadescripcion");

        const footerTitulo = document.getElementById("xlssectionfootertitulo");
        // const footerDescripcion = document.getElementById("xlssectionfooterdescripcion");



        // Verificar que hay algo en el array
        if (arrayDeObjetos !== null) {
          // Asignar valores al texto e imágenes
          quienesSomosTitulo.textContent = arrayDeObjetos[0].titulo;
          quienesSomosDescripcion.textContent = arrayDeObjetos[0].descripcion;


          elRinconTitulo.textContent = arrayDeObjetos[1].titulo;
          elRinconDescripcion.textContent = arrayDeObjetos[1].descripcion;

          lasOndasTitulo.textContent = arrayDeObjetos[2].titulo;
          lasOndasDescripcion.textContent = arrayDeObjetos[2].descripcion;


          elDesvanTitulo.textContent = arrayDeObjetos[3].titulo;
          elDesvanDescripcion.textContent = arrayDeObjetos[3].descripcion;

          lasTertuliasTitulo.textContent = arrayDeObjetos[4].titulo;
          lasTertuliasDescripcion.textContent = arrayDeObjetos[4].descripcion;

          laTabernaTitulo.textContent = arrayDeObjetos[5].titulo;
          laTabernaDescripcion.textContent = arrayDeObjetos[5].descripcion;

          laSendaTitulo.textContent = arrayDeObjetos[6].titulo;
          laSendaDescripcion.textContent = arrayDeObjetos[6].descripcion;

          deUnTiempoTitulo.textContent = arrayDeObjetos[7].titulo;
          deUnTiempoDescripcion.textContent = arrayDeObjetos[7].descripcion;

          arribaQueEsTitulo.textContent = arrayDeObjetos[8].titulo;
          arribaQueEsDescripcion.textContent = arrayDeObjetos[8].descripcion;

          cuatroTerciosTitulo.textContent = arrayDeObjetos[9].titulo;
          cuatroTerciosDescripcion.textContent = arrayDeObjetos[9].descripcion;

          genteDivertidaTitulo.textContent = arrayDeObjetos[10].titulo;
          genteDivertidaDescripcion.textContent = arrayDeObjetos[10].descripcion;

          elBoleroTitulo.textContent = arrayDeObjetos[11].titulo;
          elBoleroDescripcion.textContent = arrayDeObjetos[11].descripcion;

          luchaGigantesTitulo.textContent = arrayDeObjetos[12].titulo;
          luchaGigantesDescripcion.textContent = arrayDeObjetos[12].descripcion;

          elRaroTitulo.textContent = arrayDeObjetos[13].titulo;
          elRaroDescripcion.textContent = arrayDeObjetos[13].descripcion;

          mapaTitulo.textContent = arrayDeObjetos[16].titulo;
          mapaDescripcion.textContent = arrayDeObjetos[16].descripcion;

          footerTitulo.textContent = arrayDeObjetos[19].titulo;
        //   footerDescripcion.textContent = arrayDeObjetos[19].descripcion;




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
