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



        


      //
     
      var CrimenesTitulo = document.getElementById("xlscardcrimenesymisteriostitulo");
      
      var CrimenesDescripcion = document.getElementById("xlscardcrimenesymisteriosdescripcion");

      var CrimenesHorario1 = document.getElementById ("xlscardcrimenesymisterioshorario1");
      var CrimenesHorarioR = document.getElementById ("xlscardcrimenesymisterioshorarior");
      var CrimenesHorario2 = document.getElementById ("xlscardcrimenesymisterioshorario2");
      var CrimenesDuracion = document.getElementById ("xlscardcrimenesymisteriosduracion");
      var CrimenesEtiqueta = document.getElementById ("xlscardcrimenesymisteriosetiqueta");


//





      //
     
      var MostradorTitulo = document.getElementById("xlscarddetrasdelmostradortitulo");
      
      var MostradorDescripcion = document.getElementById("xlscarddetrasdelmostradordescripcion");


      var MostradorHorario1 = document.getElementById ("xlscarddetrasdelmostradorhorario1");
      var MostradorHorarioR = document.getElementById ("xlscarddetrasdelmostradorhorarior");
      var MostradorHorario2 = document.getElementById ("xlscarddetrasdelmostradorhorario2");
      var MostradorDuracion = document.getElementById ("xlscarddetrasdelmostradorduracion");
      var MostradorEtiqueta = document.getElementById ("xlscarddetrasdelmostradoretiqueta");


//





      //
     
               var MotorTitulo = document.getElementById("xlscardelmotorenondatitulo");
      
               var MotorDescripcion = document.getElementById("xlscardelmotorenondadescripcion");
       
       
               var MotorHorario1 = document.getElementById ("xlscardelmotorenondahorario1");
               var MotorHorarioR = document.getElementById ("xlscardelmotorenondahorarior");
               var MotorHorario2 = document.getElementById ("xlscardelmotorenondahorario2");
               var MotorDuracion = document.getElementById ("xlscardelmotorenondaduracion");
               var MotorEtiqueta = document.getElementById ("xlscardelmotorenondaetiqueta");
       
       
       //
       


        //
     
        var BurbujaTitulo = document.getElementById("xlscardlaburbujadelosculturetastitulo");
      
        var BurbujaDescripcion = document.getElementById("xlscardlaburbujadelosculturetasdescripcion");


        var BurbujaHorario1 = document.getElementById ("xlscardlaburbujadelosculturetashorario1");
        var BurbujaHorarioR = document.getElementById ("xlscardlaburbujadelosculturetashorarior");
        var BurbujaHorario2 = document.getElementById ("xlscardlaburbujadelosculturetashorario2");
        var BurbujaDuracion = document.getElementById ("xlscardlaburbujadelosculturetasduracion");
        var BurbujaEtiqueta = document.getElementById ("xlscardlaburbujadelosculturetasetiqueta");


//




        var RetrocedemosTitulo = document.getElementById(
          "xlscardretrocedemoseneltiempotitulo"
        );
        var RetrocedemosDescripcion = document.getElementById(
          "xlscardretrocedemoseneltiempodescripcion"
        );


        var RetrocedemosHorario1 = document.getElementById ("xlscardretrocedemoseneltiempohorario1");
        var RetrocedemosHorario2 = document.getElementById ("xlscardretrocedemoseneltiempohorario2");
        var RetrocedemosHorarioR = document.getElementById ("xlscardretrocedemoseneltiempohorarior");
        var RetrocedemosDuracion = document.getElementById ("xlscardretrocedemoseneltiempoduracion");
        var RetrocedemosEtiqueta = document.getElementById ("xlscardretrocedemoseneltiempoetiqueta");




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


      
          elRinconTitulo.innerHTML = arrayDeObjetos[1].titulo;
          elRinconDescripcion.innerHTML = arrayDeObjetos[1].descripcion;
          elRinconHorario1.innerHTML = arrayDeObjetos[1].horario1;
          elRinconHorario2.innerHTML = arrayDeObjetos[1].horario2;
          elRinconHorarioR = arrayDeObjetos[1].horarior;
          elRinconDuracion.innerHTML = arrayDeObjetos[1].duracion;
          elRinconEtiqueta.innerHTML = arrayDeObjetos[1].etiqueta;
          

          lasOndasTitulo.innerHTML = arrayDeObjetos[2].titulo;
          lasOndasDescripcion.innerHTML = arrayDeObjetos[2].descripcion;
          lasOndasHorario1.innerHTML = arrayDeObjetos[2].horario1;
          lasOndasHorario2.innerHTML = arrayDeObjetos[2].horario2;
          lasOndasHorarioR.innerHTML = arrayDeObjetos[2].horarior;
          lasOndasDuracion.innerHTML = arrayDeObjetos[2].duracion;
          lasOndasEtiqueta.innerHTML = arrayDeObjetos[2].etiqueta;

          elDesvanTitulo.innerHTML = arrayDeObjetos[3].titulo;
          elDesvanDescripcion.innerHTML = arrayDeObjetos[3].descripcion;
          elDesvanHorario1.innerHTML = arrayDeObjetos[3].horario1;
          elDesvanHorario2.innerHTML = arrayDeObjetos[3].horario2;
          elDesvanHorarioR.innerHTML = arrayDeObjetos[3].horarior;
          elDesvanDuracion.innerHTML = arrayDeObjetos[3].duracion;
          elDesvanEtiqueta.innerHTML = arrayDeObjetos[3].etiqueta;

          lasTertuliasTitulo.innerHTML = arrayDeObjetos[4].titulo;
          lasTertuliasDescripcion.innerHTML = arrayDeObjetos[4].descripcion;
          lasTertuliasHorario1.innerHTML = arrayDeObjetos[4].horario1;
          lasTertuliasHorario2.innerHTML = arrayDeObjetos[4].horario2;
          lasTertuliasHorarioR.innerHTML = arrayDeObjetos[4].horarior;
          lasTertuliasDuracion.innerHTML = arrayDeObjetos[4].duracion;
          lasTertuliasEtiqueta.innerHTML = arrayDeObjetos[4].etiqueta;

          laTabernaTitulo.innerHTML = arrayDeObjetos[5].titulo;
          laTabernaDescripcion.innerHTML = arrayDeObjetos[5].descripcion;
          laTabernaHorario1.innerHTML = arrayDeObjetos[5].horario1;
          laTabernaHorario2.innerHTML = arrayDeObjetos[5].horario2;
          laTabernaHorarioR.innerHTML = arrayDeObjetos[5].horarior;
          laTabernaDuracion.innerHTML = arrayDeObjetos[5].duracion;
          laTabernaEtiqueta.innerHTML = arrayDeObjetos[5].etiqueta;

          laSendaTitulo.innerHTML = arrayDeObjetos[6].titulo;
          laSendaDescripcion.innerHTML = arrayDeObjetos[6].descripcion;
          laSendaHorario1.innerHTML = arrayDeObjetos[6].horario1;
          laSendaHorario2.innerHTML = arrayDeObjetos[6].horario2;
          laSendaHorarioR.innerHTML = arrayDeObjetos[6].horarior;
          laSendaDuracion.innerHTML = arrayDeObjetos[6].duracion;
          laSendaEtiqueta.innerHTML = arrayDeObjetos[6].etiqueta;

          deUnTiempoTitulo.innerHTML = arrayDeObjetos[7].titulo;
          deUnTiempoDescripcion.innerHTML = arrayDeObjetos[7].descripcion;
          deUnTiempoHorario1.innerHTML = arrayDeObjetos[7].horario1;
          deUnTiempoHorario2.innerHTML = arrayDeObjetos[7].horario2;
          deUnTiempoHorarioR.innerHTML = arrayDeObjetos[7].horarior;
          deUnTiempoDuracion.innerHTML = arrayDeObjetos[7].duracion;
          deUnTiempoEtiqueta.innerHTML = arrayDeObjetos[7].etiqueta;

          arribaQueEsTitulo.innerHTML = arrayDeObjetos[8].titulo;
          arribaQueEsDescripcion.innerHTML = arrayDeObjetos[8].descripcion;
          arribaQueEsHorario1.innerHTML = arrayDeObjetos[8].horario1;
          arribaQueEsHorario2.innerHTML = arrayDeObjetos[8].horario2;
          arribaQueEsHorarioR.innerHTML = arrayDeObjetos[8].horarior;
          arribaQueEsDuracion.innerHTML = arrayDeObjetos[8].duracion;
          arribaQueEsEtiqueta.innerHTML = arrayDeObjetos[8].etiqueta;

          cuatroTerciosTitulo.innerHTML = arrayDeObjetos[9].titulo;
          cuatroTerciosDescripcion.innerHTML = arrayDeObjetos[9].descripcion;
          cuatroTerciosHorario1.innerHTML = arrayDeObjetos[9].horario1;
          cuatroTerciosHorario2.innerHTML = arrayDeObjetos[9].horario2;
          cuatroTerciosHorarioR.innerHTML = arrayDeObjetos[9].horarior;
          cuatroTerciosDuracion.innerHTML = arrayDeObjetos[9].duracion;
          cuatroTerciosEtiqueta.innerHTML = arrayDeObjetos[9].etiqueta;

          genteDivertidaTitulo.innerHTML = arrayDeObjetos[10].titulo;
          genteDivertidaDescripcion.innerHTML = arrayDeObjetos[10].descripcion;
          genteDivertidaHorario1.innerHTML = arrayDeObjetos[10].horario1;
          genteDivertidaHorario2.innerHTML = arrayDeObjetos[10].horario2;
          genteDivertidaHorarioR.innerHTML = arrayDeObjetos[10].horarior;
          genteDivertidaDuracion.innerHTML = arrayDeObjetos[10].duracion;
          genteDivertidaEtiqueta.innerHTML = arrayDeObjetos[10].etiqueta;

          elBoleroTitulo.innerHTML = arrayDeObjetos[11].titulo;
          elBoleroDescripcion.innerHTML = arrayDeObjetos[11].descripcion;
          elBoleroHorario1.innerHTML = arrayDeObjetos[11].horario1;
          elBoleroHorario2.innerHTML = arrayDeObjetos[11].horario2;
          elBoleroHorarioR.innerHTML = arrayDeObjetos[11].horarior;
          elBoleroDuracion.innerHTML = arrayDeObjetos[11].duracion;
          elBoleroEtiqueta.innerHTML = arrayDeObjetos[11].etiqueta;

          luchaGigantesTitulo.innerHTML = arrayDeObjetos[12].titulo;
          luchaGigantesDescripcion.innerHTML = arrayDeObjetos[12].descripcion;
          luchaGigantesHorario1.innerHTML = arrayDeObjetos[12].horario1;
          luchaGigantesHorario2.innerHTML = arrayDeObjetos[12].horario2;
          luchaGigantesHorarioR.innerHTML = arrayDeObjetos[12].horarior;
          luchaGigantesDuracion.innerHTML = arrayDeObjetos[12].duracion;
          luchaGigantesEtiqueta.innerHTML = arrayDeObjetos[12].etiqueta;

          elRaroTitulo.innerHTML = arrayDeObjetos[13].titulo;
          elRaroDescripcion.innerHTML = arrayDeObjetos[13].descripcion;
          elRaroHorario1.innerHTML = arrayDeObjetos[13].horario1;
          elRaroHorario2.innerHTML = arrayDeObjetos[13].horario2;
          elRaroHorarioR.innerHTML = arrayDeObjetos[13].horarior;
          elRaroDuracion.innerHTML = arrayDeObjetos[13].duracion;
          elRaroEtiqueta.innerHTML = arrayDeObjetos[13].etiqueta;


          CrimenesTitulo.innerHTML = arrayDeObjetos[14].titulo;
          CrimenesDescripcion.innerHTML = arrayDeObjetos[14].descripcion;
          CrimenesHorario1.innerHTML = arrayDeObjetos[14].horario1;
          CrimenesHorario2.innerHTML = arrayDeObjetos[14].horario2;
          CrimenesHorarioR.innerHTML = arrayDeObjetos[14].horarior;
          CrimenesDuracion.innerHTML = arrayDeObjetos[14].duracion;
          CrimenesEtiqueta.innerHTML = arrayDeObjetos[14].etiqueta;

          MostradorTitulo.innerHTML = arrayDeObjetos[15].titulo;
          MostradorDescripcion.innerHTML = arrayDeObjetos[15].descripcion;
          MostradorHorario1.innerHTML = arrayDeObjetos[15].horario1;
          MostradorHorario2.innerHTML = arrayDeObjetos[15].horario2;
          MostradorHorarioR.innerHTML = arrayDeObjetos[15].horarior;
          MostradorDuracion.innerHTML = arrayDeObjetos[15].duracion;
          MostradorEtiqueta.innerHTML = arrayDeObjetos[15].etiqueta;

          MotorTitulo.innerHTML = arrayDeObjetos[16].titulo;
          MotorDescripcion.innerHTML = arrayDeObjetos[16].descripcion;
          MotorHorario1.innerHTML = arrayDeObjetos[16].horario1;
          MotorHorario2.innerHTML = arrayDeObjetos[16].horario2;
          MotorHorarioR.innerHTML = arrayDeObjetos[16].horarior;
          MotorDuracion.innerHTML = arrayDeObjetos[16].duracion;
          MotorEtiqueta.innerHTML = arrayDeObjetos[16].etiqueta;

          BurbujaTitulo.innerHTML = arrayDeObjetos[17].titulo;
          BurbujaDescripcion.innerHTML = arrayDeObjetos[17].descripcion;
          BurbujaHorario1.innerHTML = arrayDeObjetos[17].horario1;
          BurbujaHorario2.innerHTML = arrayDeObjetos[17].horario2;
          BurbujaHorarioR.innerHTML = arrayDeObjetos[17].horarior;
          BurbujaDuracion.innerHTML = arrayDeObjetos[17].duracion;
          BurbujaEtiqueta.innerHTML = arrayDeObjetos[17].etiqueta;

          RetrocedemosTitulo.innerHTML = arrayDeObjetos[18].titulo;
          RetrocedemosDescripcion.innerHTML = arrayDeObjetos[18].descripcion;
          RetrocedemosHorario1.innerHTML = arrayDeObjetos[18].horario1;
          RetrocedemosHorario2.innerHTML = arrayDeObjetos[18].horario2;
          RetrocedemosHorarioR.innerHTML = arrayDeObjetos[18].horarior;
          RetrocedemosDuracion.innerHTML = arrayDeObjetos[18].duracion;
          RetrocedemosEtiqueta.innerHTML = arrayDeObjetos[18].etiqueta;

          mapaTitulo.innerHTML = arrayDeObjetos[19].titulo;
          mapaDescripcion.innerHTML = arrayDeObjetos[19].descripcion;

          footerTitulo.innerHTML = arrayDeObjetos[20].titulo;
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
