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
              horario1: fila[4],
              horario2: fila[5],
              horarior: fila[6],
              duracion: fila[7],
              etiqueta: fila[8],

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

        var lasOndasTitulo = document.getElementById(
          "xlscardlasondasdelamarinatitulo"
        );
        var lasOndasDescripcion = document.getElementById(
          "xlscardlasondasdelamarinadescripcion"
        );

        var lasOndasHorario1 = document.getElementById ("xlscardlasondasdelamarinahorario1");
        var lasOndasHorario2 = document.getElementById ("xlscardlasondasdelamarinahorario2");
        var lasOndasHorarioR = document.getElementById ("xlscardlasondasdelamarinahorarior");
        var lasOndasDuracion = document.getElementById ("xlscardlasondasdelamarinaduracion");
        var lasOndasEtiqueta = document.getElementById ("xlscardlasondasdelamarinaetiqueta");

        var elRinconTitulo = document.getElementById(
          "xlscardelrincondemaurititulo"
        );
        var elRinconHorario1 = document.getElementById ("xlscardelrincondemaurihorario1");
        var elRinconHorario2 = document.getElementById ("xlscardelrincondemaurihorario2");
        var elRinconHorarioR= document.getElementById ("xlscardelrincondemaurihorarior");
        var elRinconDuracion = document.getElementById ("xlscardelrincondemauriduracion");
        var elRinconEtiqueta = document.getElementById ("xlscardelrincondemaurietiqueta");


        var elRinconDescripcion = document.getElementById(
          "xlscardelrincondemauridescripcion"
        );

        var elDesvanTitulo = document.getElementById("xlscardeldesvantitulo");
        var elDesvanDescripcion = document.getElementById(
          "xlscardeldesvandescripcion"
        );

        var elDesvanHorario1 = document.getElementById ("xlscardeldesvanhorario1");
        var elDesvanHorario2 = document.getElementById ("xlscardeldesvanhorario2");
        var elDesvanHorarioR = document.getElementById ("xlscardeldesvanhorarior");
        var elDesvanDuracion = document.getElementById ("xlscardeldesvanduracion");
        var elDesvanEtiqueta = document.getElementById ("xlscardeldesvanetiqueta");

        var lasTertuliasTitulo = document.getElementById(
          "xlscardlastertuliasinformalestitulo"
        );
        var lasTertuliasDescripcion = document.getElementById(
          "xlscardlastertuliasinformalesdescripcion");

        var lasTertuliasHorario1 = document.getElementById ("xlscardlastertuliasinformaleshorario1");
        var lasTertuliasHorario2 = document.getElementById ("xlscardlastertuliasinformaleshorario2");
        var lasTertuliasHorarioR = document.getElementById ("xlscardlastertuliasinformaleshorarior");
        var lasTertuliasDuracion = document.getElementById ("xlscardlastertuliasinformalesduracion");
        var lasTertuliasEtiqueta = document.getElementById ("xlscardlastertuliasinformalesetiqueta");

        var laTabernaTitulo = document.getElementById(
          "xlscardlatabernadelossuenostitulo"
        );
        var laTabernaDescripcion = document.getElementById(
          "xlscardlatabernadelossuenosdescripcion"
        );

        var laTabernaHorario1 = document.getElementById ("xlscardlatabernadelossuenoshorario1");
        var laTabernaHorario2 = document.getElementById ("xlscardlatabernadelossuenoshorario2");
        var laTabernaHorarioR = document.getElementById ("xlscardlatabernadelossuenoshorarior");
        var laTabernaDuracion = document.getElementById ("xlscardlatabernadelossuenosduracion");
        var laTabernaEtiqueta = document.getElementById ("xlscardlatabernadelossuenosetiqueta");


        var laSendaTitulo = document.getElementById(
          "xlscardlasendadelvagabundotitulo"
        );
        var laSendaDescripcion = document.getElementById(
          "xlscardlasendadelvagabundodescripcion"
        );

        var laSendaHorario1 = document.getElementById ("xlscardlasendadelvagabundohorario1");
        var laSendaHorario2 = document.getElementById ("xlscardlasendadelvagabundohorario2");
        var laSendaHorarioR = document.getElementById ("xlscardlasendadelvagabundohorarior");
        var laSendaDuracion = document.getElementById ("xlscardlasendadelvagabundoduracion");
        var laSendaEtiqueta = document.getElementById ("xlscardlasendadelvagabundoetiqueta");

        var deUnTiempoTitulo = document.getElementById(
          "xlscarddeuntiempoaestapartetitulo"
        );
        var deUnTiempoDescripcion = document.getElementById(
          "xlscarddeuntiempoaestapartedescripcion"
        );

        var deUnTiempoHorario1 = document.getElementById ("xlscarddeuntiempoaestapartehorario1");
        var deUnTiempoHorario2 = document.getElementById ("xlscarddeuntiempoaestapartehorario2");
        var deUnTiempoHorarioR = document.getElementById ("xlscarddeuntiempoaestapartehorarior");
        var deUnTiempoDuracion = document.getElementById ("xlscarddeuntiempoaestaparteduracion");
        var deUnTiempoEtiqueta = document.getElementById ("xlscarddeuntiempoaestaparteetiqueta");



        var arribaQueEsTitulo = document.getElementById(
          "xlscardarribaqueeslahoratitulo"
        );
        var arribaQueEsDescripcion = document.getElementById(
          "xlscardarribaqueeslahoradescripcion"
        );


        var arribaQueEsHorario1 = document.getElementById ("xlscardarribaqueeslahorahorario1");
        var arribaQueEsHorario2 = document.getElementById ("xlscardarribaqueeslahorahorario2");
        var arribaQueEsHorarioR = document.getElementById ("xlscardarribaqueeslahorahorarior");
        var arribaQueEsDuracion = document.getElementById ("xlscardarribaqueeslahoraduracion");
        var arribaQueEsEtiqueta = document.getElementById ("xlscardarribaqueeslahoraetiqueta");


        var cuatroTerciosTitulo = document.getElementById(
          "xlscardcuatroterciostitulo"
        );
        var cuatroTerciosDescripcion = document.getElementById(
          "xlscardcuatroterciosdescripcion"
        );


        var cuatroTerciosHorario1 = document.getElementById ("xlscardcuatrotercioshorario1");
        var cuatroTerciosHorario2 = document.getElementById ("xlscardcuatrotercioshorario2");
        var cuatroTerciosHorarioR = document.getElementById ("xlscardcuatrotercioshorarior");
        var cuatroTerciosDuracion = document.getElementById ("xlscardcuatroterciosduracion");
        var cuatroTerciosEtiqueta = document.getElementById ("xlscardcuatroterciosetiqueta");

        var genteDivertidaTitulo = document.getElementById(
          "xlscardgentedivertidatitulo"
        );
        var genteDivertidaDescripcion = document.getElementById(
          "xlscardgentedivertidadescripcion"
        );


        var genteDivertidaHorario1 = document.getElementById ("xlscardgentedivertidahorario1");
        var genteDivertidaHorario2 = document.getElementById ("xlscardgentedivertidahorario2");
        var genteDivertidaHorarioR = document.getElementById ("xlscardgentedivertidahorarior");
        var genteDivertidaDuracion = document.getElementById ("xlscardgentedivertidaduracion");
        var genteDivertidaEtiqueta = document.getElementById ("xlscardgentedivertidaetiqueta");

        var elBoleroTitulo = document.getElementById(
          "xlscardelboleroencantabriatitulo"
        );
        var elBoleroDescripcion = document.getElementById(
          "xlscardelboleroencantabriadescripcion"
        );

        var elBoleroHorario1 = document.getElementById ("xlscardelboleroencantabriahorario1");
        var elBoleroHorario2 = document.getElementById ("xlscardelboleroencantabriahorario2");
        var elBoleroHorarioR = document.getElementById ("xlscardelboleroencantabriahorarior");
        var elBoleroDuracion = document.getElementById ("xlscardelboleroencantabriaduracion");
        var elBoleroEtiqueta = document.getElementById ("xlscardelboleroencantabriaetiqueta");




        var luchaGigantesTitulo = document.getElementById(
          "xlscardluchadegigantestitulo"
        );
        var luchaGigantesDescripcion = document.getElementById(
          "xlscardluchadegigantesdescripcion"
        );

        var luchaGigantesHorario1 = document.getElementById ("xlscardluchadegiganteshorario1");
        var luchaGigantesHorario2 = document.getElementById ("xlscardluchadegiganteshorario2");
        var luchaGigantesHorarioR = document.getElementById ("xlscardluchadegiganteshorarior");
        var luchaGigantesDuracion = document.getElementById ("xlscardluchadegigantesduracion");
        var luchaGigantesEtiqueta = document.getElementById ("xlscardluchadegigantesetiqueta");

        var elRaroTitulo = document.getElementById(
          "xlscardelraroerestutitulo"
        );
        var elRaroDescripcion = document.getElementById(
          "xlscardelraroerestudescripcion"
        );


        var elRaroHorario1 = document.getElementById ("xlscardelraroerestuhorario1");
        var elRaroHorario2 = document.getElementById ("xlscardelraroerestuhorario2");
        var elRaroHorarioR = document.getElementById ("xlscardelraroerestuhorarior");
        var elRaroDuracion = document.getElementById ("xlscardelraroerestuduracion");
        var elRaroEtiqueta = document.getElementById ("xlscardelraroerestuetiqueta");

        var mapaTitulo = document.getElementById("xlssectionmapatitulo");
        var mapaDescripcion = document.getElementById(
          "xlssectionmapadescripcion"
        );

        var footerTitulo = document.getElementById("xlssectionfootertitulo");
        // var footerDescripcion = document.getElementById("xlssectionfooterdescripcion");


      
        // Verificar que hay algo en el array
        if (arrayDeObjetos !== null) {
          // Asignar valores al texto e imágenes
          quienesSomosTitulo.textContent = arrayDeObjetos[0].titulo;
          quienesSomosDescripcion.textContent = arrayDeObjetos[0].descripcion;


      
          elRinconTitulo.textContent = arrayDeObjetos[1].titulo;
          elRinconDescripcion.textContent = arrayDeObjetos[1].descripcion;
          elRinconHorario1.textContent = arrayDeObjetos[1].horario1;
          elRinconHorario2.textContent = arrayDeObjetos[1].horario2;
          elRinconHorarioR = arrayDeObjetos[1].horarior;
          elRinconDuracion.textContent = arrayDeObjetos[1].duracion;
          elRinconEtiqueta.textContent = arrayDeObjetos[1].etiqueta;
          

          lasOndasTitulo.textContent = arrayDeObjetos[2].titulo;
          lasOndasDescripcion.textContent = arrayDeObjetos[2].descripcion;
          lasOndasHorario1.textContent = arrayDeObjetos[2].horario1;
          lasOndasHorario2.textContent = arrayDeObjetos[2].horario2;
          lasOndasHorarioR.textContent = arrayDeObjetos[2].horarior;
          lasOndasDuracion.textContent = arrayDeObjetos[2].duracion;
          lasOndasEtiqueta.textContent = arrayDeObjetos[2].etiqueta;

          elDesvanTitulo.textContent = arrayDeObjetos[3].titulo;
          elDesvanDescripcion.textContent = arrayDeObjetos[3].descripcion;
          elDesvanHorario1.textContent = arrayDeObjetos[3].horario1;
          elDesvanHorario2.textContent = arrayDeObjetos[3].horario2;
          elDesvanHorarioR.textContent = arrayDeObjetos[3].horarior;
          elDesvanDuracion.textContent = arrayDeObjetos[3].duracion;
          elDesvanEtiqueta.textContent = arrayDeObjetos[3].etiqueta;

          lasTertuliasTitulo.textContent = arrayDeObjetos[4].titulo;
          lasTertuliasDescripcion.textContent = arrayDeObjetos[4].descripcion;
          lasTertuliasHorario1.textContent = arrayDeObjetos[4].horario1;
          lasTertuliasHorario2.textContent = arrayDeObjetos[4].horario2;
          lasTertuliasHorarioR.textContent = arrayDeObjetos[4].horarior;
          lasTertuliasDuracion.textContent = arrayDeObjetos[4].duracion;
          lasTertuliasEtiqueta.textContent = arrayDeObjetos[4].etiqueta;

          laTabernaTitulo.textContent = arrayDeObjetos[5].titulo;
          laTabernaDescripcion.textContent = arrayDeObjetos[5].descripcion;
          laTabernaHorario1.textContent = arrayDeObjetos[5].horario1;
          laTabernaHorario2.textContent = arrayDeObjetos[5].horario2;
          laTabernaHorarioR.textContent = arrayDeObjetos[5].horarior;
          laTabernaDuracion.textContent = arrayDeObjetos[5].duracion;
          laTabernaEtiqueta.textContent = arrayDeObjetos[5].etiqueta;

          laSendaTitulo.textContent = arrayDeObjetos[6].titulo;
          laSendaDescripcion.textContent = arrayDeObjetos[6].descripcion;
          laSendaHorario1.textContent = arrayDeObjetos[6].horario1;
          laSendaHorario2.textContent = arrayDeObjetos[6].horario2;
          laSendaHorarioR.textContent = arrayDeObjetos[6].horarior;
          laSendaDuracion.textContent = arrayDeObjetos[6].duracion;
          laSendaEtiqueta.textContent = arrayDeObjetos[6].etiqueta;

          deUnTiempoTitulo.textContent = arrayDeObjetos[7].titulo;
          deUnTiempoDescripcion.textContent = arrayDeObjetos[7].descripcion;
          deUnTiempoHorario1.textContent = arrayDeObjetos[7].horario1;
          deUnTiempoHorario2.textContent = arrayDeObjetos[7].horario2;
          deUnTiempoHorarioR.textContent = arrayDeObjetos[7].horarior;
          deUnTiempoDuracion.textContent = arrayDeObjetos[7].duracion;
          deUnTiempoEtiqueta.textContent = arrayDeObjetos[7].etiqueta;

          arribaQueEsTitulo.textContent = arrayDeObjetos[8].titulo;
          arribaQueEsDescripcion.textContent = arrayDeObjetos[8].descripcion;
          arribaQueEsHorario1.textContent = arrayDeObjetos[8].horario1;
          arribaQueEsHorario2.textContent = arrayDeObjetos[8].horario2;
          arribaQueEsHorarioR.textContent = arrayDeObjetos[8].horarior;
          arribaQueEsDuracion.textContent = arrayDeObjetos[8].duracion;
          arribaQueEsEtiqueta.textContent = arrayDeObjetos[8].etiqueta;

          cuatroTerciosTitulo.textContent = arrayDeObjetos[9].titulo;
          cuatroTerciosDescripcion.textContent = arrayDeObjetos[9].descripcion;
          cuatroTerciosHorario1.textContent = arrayDeObjetos[9].horario1;
          cuatroTerciosHorario2.textContent = arrayDeObjetos[9].horario2;
          cuatroTerciosHorarioR.textContent = arrayDeObjetos[9].horarior;
          cuatroTerciosDuracion.textContent = arrayDeObjetos[9].duracion;
          cuatroTerciosEtiqueta.textContent = arrayDeObjetos[9].etiqueta;

          genteDivertidaTitulo.textContent = arrayDeObjetos[10].titulo;
          genteDivertidaDescripcion.textContent = arrayDeObjetos[10].descripcion;
          genteDivertidaHorario1.textContent = arrayDeObjetos[10].horario1;
          genteDivertidaHorario2.textContent = arrayDeObjetos[10].horario2;
          genteDivertidaHorarioR.textContent = arrayDeObjetos[10].horarior;
          genteDivertidaDuracion.textContent = arrayDeObjetos[10].duracion;
          genteDivertidaEtiqueta.textContent = arrayDeObjetos[10].etiqueta;

          elBoleroTitulo.textContent = arrayDeObjetos[11].titulo;
          elBoleroDescripcion.textContent = arrayDeObjetos[11].descripcion;
          elBoleroHorario1.textContent = arrayDeObjetos[11].horario1;
          elBoleroHorario2.textContent = arrayDeObjetos[11].horario2;
          elBoleroHorarioR.textContent = arrayDeObjetos[11].horarior;
          elBoleroDuracion.textContent = arrayDeObjetos[11].duracion;
          elBoleroEtiqueta.textContent = arrayDeObjetos[11].etiqueta;

          luchaGigantesTitulo.textContent = arrayDeObjetos[12].titulo;
          luchaGigantesDescripcion.textContent = arrayDeObjetos[12].descripcion;
          luchaGigantesHorario1.textContent = arrayDeObjetos[12].horario1;
          luchaGigantesHorario2.textContent = arrayDeObjetos[12].horario2;
          luchaGigantesHorarioR.textContent = arrayDeObjetos[12].horarior;
          luchaGigantesDuracion.textContent = arrayDeObjetos[12].duracion;
          luchaGigantesEtiqueta.textContent = arrayDeObjetos[12].etiqueta;

          elRaroTitulo.textContent = arrayDeObjetos[13].titulo;
          elRaroDescripcion.textContent = arrayDeObjetos[13].descripcion;
          elRaroHorario1.textContent = arrayDeObjetos[13].horario1;
          elRaroHorario2.textContent = arrayDeObjetos[13].horario2;
          elRaroHorarioR.textContent = arrayDeObjetos[13].horarior;
          elRaroDuracion.textContent = arrayDeObjetos[13].duracion;
          elRaroEtiqueta.textContent = arrayDeObjetos[13].etiqueta;

          mapaTitulo.textContent = arrayDeObjetos[18].titulo;
          mapaDescripcion.textContent = arrayDeObjetos[18].descripcion;

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
