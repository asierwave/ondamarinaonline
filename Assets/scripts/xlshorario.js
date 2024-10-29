  function cargarDatosDesdeGoogleSheetsHorarioRotativo() {
    gapi.client
      .init({
        apiKey: "AIzaSyCZm_uR6TknLlgLhTrOhhsSKnzgUQeSOOE",
      })
      .then(function () {
        return gapi.client.request({
          path: "https://sheets.googleapis.com/v4/spreadsheets/1jlHc0Z3_P7ibmAAqTkfxBtAez530e-bH36wVKRHwPuI/values/HORARIOROTATIVO!A:Z",
        });
      })
      .then(
        function (response) {
          var datos = response.result.values;
          var arrayDeObjetos2 = [];
          var arrayDeObjetosVisualizacion= [];
          if (datos && datos.length > 0) {
            for (var i = 1; i < datos.length; i++) {

              var fila = datos[i];

              //Para el letrero rotativo
              var objeto = {
                hora: fila[0],
                programalunes: fila[1],
                programamartes: fila[2],
                programamiercoles: fila[3],
                programajueves: fila[4],
                programaviernes: fila[5],
                programasabado: fila[6],
                programadomingo: fila[7],
              };




              // Para visualizar el horario en cards
         
              var objetoVisualizacion = {
                hora: fila[0], // La primera columna contiene la hora
                programas: {
                  lunes: fila[1] || '',
                  martes: fila[2] || '',
                  miercoles: fila[3] || '',
                  jueves: fila[4] || '',
                  viernes: fila[5] || '',
                  sabado: fila[6] || '',
                  domingo: fila[7] || '',
                }
              };

              arrayDeObjetos2.push(objeto);
              arrayDeObjetosVisualizacion.push(objetoVisualizacion);
            }
          }

          console.log(arrayDeObjetos2);
          console.log(arrayDeObjetosVisualizacion);


          

// Inicializa el contenedor principal
var HorarioCardsContainer = document.getElementById('horarioVisualizador');
HorarioCardsContainer.className = "horarioCardsContainer";

// Crea un fragmento para mejorar el rendimiento
const fragment = document.createDocumentFragment();

// Inicializa arrays para almacenar programas de cada día
var programacionLunes = [];
var programacionMartes = [];
var programacionMiercoles = [];
var programacionJueves = [];
var programacionViernes = [];
var programacionSabado = [];
var programacionDomingo = [];

// Itera sobre el array de objetos y extrae los programas de cada día
arrayDeObjetosVisualizacion.forEach(function(objetoVisualizacion) {
  // Filtra la hora para eliminar todo lo que está después de "-", incluido
  var horaFiltrada = objetoVisualizacion.hora.split('-')[0].trim();

  // Verifica si hay un programa para cada día antes de agregarlo
  if (objetoVisualizacion.programas.lunes) {
      programacionLunes.push(horaFiltrada + ": " + objetoVisualizacion.programas.lunes);
  }
  if (objetoVisualizacion.programas.martes) {
      programacionMartes.push(horaFiltrada + ": " + objetoVisualizacion.programas.martes);
  }
  if (objetoVisualizacion.programas.miercoles) {
      programacionMiercoles.push(horaFiltrada + ": " + objetoVisualizacion.programas.miercoles);
  }
  if (objetoVisualizacion.programas.jueves) {
      programacionJueves.push(horaFiltrada + ": " + objetoVisualizacion.programas.jueves);
  }
  if (objetoVisualizacion.programas.viernes) {
      programacionViernes.push(horaFiltrada + ": " + objetoVisualizacion.programas.viernes);
  }
  if (objetoVisualizacion.programas.sabado) {
      programacionSabado.push(horaFiltrada + ": " + objetoVisualizacion.programas.sabado);
  }
  if (objetoVisualizacion.programas.domingo) {
      programacionDomingo.push(horaFiltrada + ": " + objetoVisualizacion.programas.domingo);
  }
});


// Crea una tarjeta para cada día y añade todos los programas
function crearTarjeta(dia, programas, clase) {
    var card = document.createElement('div');
    card.className = 'horarioCard ' + clase;
    card.style.display = 'none'; // Oculta la tarjeta por defecto

    programas.forEach(function(programa) {
        var programacionSingle = document.createElement('p');
        programacionSingle.textContent = programa;
        card.appendChild(programacionSingle);
    });

    return card;
}

// Agrega cada tarjeta al fragmento
var cardLunes = crearTarjeta('Lunes', programacionLunes, 'horarioCardLunes');
var cardMartes = crearTarjeta('Martes', programacionMartes, 'horarioCardMartes');
var cardMiercoles = crearTarjeta('Miércoles', programacionMiercoles, 'horarioCardMiercoles');
var cardJueves = crearTarjeta('Jueves', programacionJueves, 'horarioCardJueves');
var cardViernes = crearTarjeta('Viernes', programacionViernes, 'horarioCardViernes');
var cardSabado = crearTarjeta('Sábado', programacionSabado, 'horarioCardSabado');
var cardDomingo = crearTarjeta('Domingo', programacionDomingo, 'horarioCardDomingo');

fragment.appendChild(cardLunes);
fragment.appendChild(cardMartes);
fragment.appendChild(cardMiercoles);
fragment.appendChild(cardJueves);
fragment.appendChild(cardViernes);
fragment.appendChild(cardSabado);
fragment.appendChild(cardDomingo);

// Luego agrega el fragmento al contenedor
HorarioCardsContainer.appendChild(fragment);

// Función para mostrar/ocultar las tarjetas
function toggleCard(dia) {
  const cards = {
      lunes: cardLunes,
      martes: cardMartes,
      miercoles: cardMiercoles,
      jueves: cardJueves,
      viernes: cardViernes,
      sabado: cardSabado,
      domingo: cardDomingo,
  };

  // Oculta todas las tarjetas
  Object.values(cards).forEach(card => {
      card.style.display = 'none';
  });

  // Muestra la tarjeta del día seleccionado
  if (cards[dia]) {
      cards[dia].style.display = 'block';
  }
  
  // Cambiar el estado de los botones
  document.querySelectorAll('.diaBtn').forEach(button => {
      if (button.getAttribute('data-dia') === dia) {
          button.classList.add('active'); // Agrega la clase 'active' al botón presionado
      } else {
          button.classList.remove('active'); // Elimina la clase 'active' de los demás botones
      }
  });
}

// Inicialmente, oculta todas las tarjetas
toggleCard('lunes'); // Muestra solo la tarjeta del lunes al cargar la página

// Añadir event listeners a los botones
document.querySelectorAll('.diaBtn').forEach(button => {
  button.addEventListener('click', function() {
      const dia = this.getAttribute('data-dia');
      toggleCard(dia);
  });
});







            //PARA LETRERO ROTATIVO (CON'T)

      
  
          // Asignación de valores a los elementos del HTML

          var programaLunes0 = document.getElementById("xlshl0");
          var programaMartes0 = document.getElementById("xlshm0");
          var programaMiercoles0 = document.getElementById("xlshx0");
          var programaJueves0 = document.getElementById("xlshj0");
          var programaViernes0 = document.getElementById("xlshv0");
          var programaSabado0 = document.getElementById("xlshs0");
          var programaDomingo0 = document.getElementById("xlshd0");

          var programaLunes1 = document.getElementById("xlshl1");
          var programaMartes1 = document.getElementById("xlshm1");
          var programaMiercoles1 = document.getElementById("xlshx1");
          var programaJueves1 = document.getElementById("xlshj1");
          var programaViernes1 = document.getElementById("xlshv1");
          var programaSabado1 = document.getElementById("xlshs1");
          var programaDomingo1 = document.getElementById("xlshd1");

          var programaLunes3 = document.getElementById("xlshl3");
          var programaMartes3 = document.getElementById("xlshm3");
          var programaMiercoles3 = document.getElementById("xlshx3");
          var programaJueves3 = document.getElementById("xlshj3");
          var programaViernes3 = document.getElementById("xlshv3");
          var programaSabado3 = document.getElementById("xlshs3");
          var programaDomingo3 = document.getElementById("xlshd3");

          var programaLunes9 = document.getElementById("xlshl9");
          var programaMartes9 = document.getElementById("xlshm9");
          var programaMiercoles9 = document.getElementById("xlshx9");
          var programaJueves9 = document.getElementById("xlshj9");
          var programaViernes9 = document.getElementById("xlshv9");
          var programaSabado9 = document.getElementById("xlshs9");
          var programaDomingo9 = document.getElementById("xlshd9");
  
          var programaLunes9M = document.getElementById("xlshl9M");
          var programaMartes9M = document.getElementById("xlshm9M");
          var programaMiercoles9M = document.getElementById("xlshx9M");
          var programaJueves9M = document.getElementById("xlshj9M");
          var programaViernes9M = document.getElementById("xlshv9M");
          var programaSabado9M = document.getElementById("xlshs9M");
          var programaDomingo9M = document.getElementById("xlshd9M");
  
          var programaLunes10 = document.getElementById("xlshl10");
          var programaMartes10 = document.getElementById("xlshm10");
          var programaMiercoles10 = document.getElementById("xlshx10");
          var programaJueves10 = document.getElementById("xlshj10");
          var programaViernes10 = document.getElementById("xlshv10");
          var programaSabado10 = document.getElementById("xlshs10");
          var programaDomingo10 = document.getElementById("xlshd10");
  
          var programaLunes11 = document.getElementById("xlshl11");
          var programaMartes11 = document.getElementById("xlshm11");
          var programaMiercoles11 = document.getElementById("xlshx11");
          var programaJueves11 = document.getElementById("xlshj11");
          var programaViernes11 = document.getElementById("xlshv11");
          var programaSabado11 = document.getElementById("xlshs11");
          var programaDomingo11 = document.getElementById("xlshd11");
  
          var programaLunes13 = document.getElementById("xlshl13");
          var programaMartes13 = document.getElementById("xlshm13");
          var programaMiercoles13 = document.getElementById("xlshx13");
          var programaJueves13 = document.getElementById("xlshj13");
          var programaViernes13 = document.getElementById("xlshv13");
          var programaSabado13 = document.getElementById("xlshs13");
          var programaDomingo13 = document.getElementById("xlshd13");
  
          var programaLunes14 = document.getElementById("xlshl14");
          var programaMartes14 = document.getElementById("xlshm14");
          var programaMiercoles14 = document.getElementById("xlshx14");
          var programaJueves14 = document.getElementById("xlshj14");
          var programaViernes14 = document.getElementById("xlshv14");
          var programaSabado14 = document.getElementById("xlshs14");
          var programaDomingo14 = document.getElementById("xlshd14");
  
          var programaLunes15 = document.getElementById("xlshl15");
          var programaMartes15 = document.getElementById("xlshm15");
          var programaMiercoles15 = document.getElementById("xlshx15");
          var programaJueves15 = document.getElementById("xlshj15");
          var programaViernes15 = document.getElementById("xlshv15");
          var programaSabado15 = document.getElementById("xlshs15");
          var programaDomingo15 = document.getElementById("xlshd15");
  
          var programaLunes16 = document.getElementById("xlshl16");
          var programaMartes16 = document.getElementById("xlshm16");
          var programaMiercoles16 = document.getElementById("xlshx16");
          var programaJueves16 = document.getElementById("xlshj16");
          var programaViernes16 = document.getElementById("xlshv16");
          var programaSabado16 = document.getElementById("xlshs16");
          var programaDomingo16 = document.getElementById("xlshd16");
  
          var programaLunes16M = document.getElementById("xlshl16M");
          var programaMartes16M = document.getElementById("xlshm16M");
          var programaMiercoles16M = document.getElementById("xlshx16M");
          var programaJueves16M = document.getElementById("xlshj16M");
          var programaViernes16M = document.getElementById("xlshv16M");
          var programaSabado16M = document.getElementById("xlshs16M");
          var programaDomingo16M = document.getElementById("xlshd16M");
  
          var programaLunes17 = document.getElementById("xlshl17");
          var programaMartes17 = document.getElementById("xlshm17");
          var programaMiercoles17 = document.getElementById("xlshx17");
          var programaJueves17 = document.getElementById("xlshj17");
          var programaViernes17 = document.getElementById("xlshv17");
          var programaSabado17 = document.getElementById("xlshs17");
          var programaDomingo17 = document.getElementById("xlshd17");
  
          var programaLunes17M = document.getElementById("xlshl17M");
          var programaMartes17M = document.getElementById("xlshm17M");
          var programaMiercoles17M = document.getElementById("xlshx17M");
          var programaJueves17M = document.getElementById("xlshj17M");
          var programaViernes17M = document.getElementById("xlshv17M");
          var programaSabado17M = document.getElementById("xlshs17M");
          var programaDomingo17M = document.getElementById("xlshd17M");
  
          var programaLunes18 = document.getElementById("xlshl18");
          var programaMartes18 = document.getElementById("xlshm18");
          var programaMiercoles18 = document.getElementById("xlshx18");
          var programaJueves18 = document.getElementById("xlshj18");
          var programaViernes18 = document.getElementById("xlshv18");
          var programaSabado18 = document.getElementById("xlshs18");
          var programaDomingo18 = document.getElementById("xlshd18");
  
          var programaLunes19 = document.getElementById("xlshl19");
          var programaMartes19 = document.getElementById("xlshm19");
          var programaMiercoles19 = document.getElementById("xlshx19");
          var programaJueves19 = document.getElementById("xlshj19");
          var programaViernes19 = document.getElementById("xlshv19");
          var programaSabado19 = document.getElementById("xlshs19");
          var programaDomingo19 = document.getElementById("xlshd19");
  
          var programaLunes19M = document.getElementById("xlshl19M");
          var programaMartes19M = document.getElementById("xlshm19M");
          var programaMiercoles19M = document.getElementById("xlshx19M");
          var programaJueves19M = document.getElementById("xlshj19M");
          var programaViernes19M = document.getElementById("xlshv19M");
          var programaSabado19M = document.getElementById("xlshs19M");
          var programaDomingo19M = document.getElementById("xlshd19M");
  
          var programaLunes20 = document.getElementById("xlshl20");
          var programaMartes20 = document.getElementById("xlshm20");
          var programaMiercoles20 = document.getElementById("xlshx20");
          var programaJueves20 = document.getElementById("xlshj20");
          var programaViernes20 = document.getElementById("xlshv20");
          var programaSabado20 = document.getElementById("xlshs20");
          var programaDomingo20 = document.getElementById("xlshd20");
  
          var programaLunes20M = document.getElementById("xlshl20M");
          var programaMartes20M = document.getElementById("xlshm20M");
          var programaMiercoles20M = document.getElementById("xlshx20M");
          var programaJueves20M = document.getElementById("xlshj20M");
          var programaViernes20M = document.getElementById("xlshv20M");
          var programaSabado20M = document.getElementById("xlshs20M");
          var programaDomingo20M = document.getElementById("xlshd20M");

          var programaLunes21 = document.getElementById("xlshl21");
          var programaMartes21 = document.getElementById("xlshm21");
          var programaMiercoles21 = document.getElementById("xlshx21");
          var programaJueves21 = document.getElementById("xlshj21");
          var programaViernes21 = document.getElementById("xlshv21");
          var programaSabado21 = document.getElementById("xlshs21");
          var programaDomingo21 = document.getElementById("xlshd21");

          var programaLunes22 = document.getElementById("xlshl22");
          var programaMartes22 = document.getElementById("xlshm22");
          var programaMiercoles22 = document.getElementById("xlshx22");
          var programaJueves22 = document.getElementById("xlshj22");
          var programaViernes22 = document.getElementById("xlshv22");
          var programaSabado22 = document.getElementById("xlshs22");
          var programaDomingo22 = document.getElementById("xlshd22");


          var programaLunes23 = document.getElementById("xlshl23");
          var programaMartes23 = document.getElementById("xlshm23");
          var programaMiercoles23 = document.getElementById("xlshx23");
          var programaJueves23 = document.getElementById("xlshj23");
          var programaViernes23 = document.getElementById("xlshv23");
          var programaSabado23 = document.getElementById("xlshs23");
          var programaDomingo23 = document.getElementById("xlshd23");
  
        

          if (arrayDeObjetos2.length > 1) {
            programaLunes0.textContent = arrayDeObjetos2[0].programalunes;
            programaMartes0.textContent = arrayDeObjetos2[0].programamartes;
            programaMiercoles0.textContent = arrayDeObjetos2[0].programamiercoles;
            programaJueves0.textContent = arrayDeObjetos2[0].programajueves;
            programaViernes0.textContent = arrayDeObjetos2[0].programaviernes;
            programaSabado0.textContent = arrayDeObjetos2[0].programasabado;
            programaDomingo0.textContent = arrayDeObjetos2[0].programadomingo;
        } else {
            console.error("No se encontraron datos para la fila de las 0:00 AM");
          }

          if (arrayDeObjetos2.length > 1) {
            programaLunes1.textContent = arrayDeObjetos2[1].programalunes;
            programaMartes1.textContent = arrayDeObjetos2[1].programamartes;
            programaMiercoles1.textContent = arrayDeObjetos2[1].programamiercoles;
            programaJueves1.textContent = arrayDeObjetos2[1].programajueves;
            programaViernes1.textContent = arrayDeObjetos2[1].programaviernes;
            programaSabado1.textContent = arrayDeObjetos2[1].programasabado;
            programaDomingo1.textContent = arrayDeObjetos2[1].programadomingo;
        } else {
            console.error("No se encontraron datos para la fila de las 2:00 AM");
          }

          if (arrayDeObjetos2.length > 1) {
            programaLunes3.textContent = arrayDeObjetos2[2].programalunes;
            programaMartes3.textContent = arrayDeObjetos2[2].programamartes;
            programaMiercoles3.textContent = arrayDeObjetos2[2].programamiercoles;
            programaJueves3.textContent = arrayDeObjetos2[2].programajueves;
            programaViernes3.textContent = arrayDeObjetos2[2].programaviernes;
            programaSabado3.textContent = arrayDeObjetos2[2].programasabado;
            programaDomingo3.textContent = arrayDeObjetos2[2].programadomingo;
        } else {
            console.error("No se encontraron datos para la fila de las 8:30 AM");
          }


          if (arrayDeObjetos2.length > 1) {
            programaLunes9.textContent = arrayDeObjetos2[3].programalunes;
            programaMartes9.textContent = arrayDeObjetos2[3].programamartes;
            programaMiercoles9.textContent = arrayDeObjetos2[3].programamiercoles;
            programaJueves9.textContent = arrayDeObjetos2[3].programajueves;
            programaViernes9.textContent = arrayDeObjetos2[3].programaviernes;
            programaSabado9.textContent = arrayDeObjetos2[3].programasabado;
            programaDomingo9.textContent = arrayDeObjetos2[3].programadomingo;
        } else {
            console.error("No se encontraron datos para la fila de las 9:00 AM");
          }


            if (arrayDeObjetos2.length > 1) { 
            programaLunes9M.textContent = arrayDeObjetos2[4].programalunes;
            programaMartes9M.textContent = arrayDeObjetos2[4].programamartes;
            programaMiercoles9M.textContent = arrayDeObjetos2[4].programamiercoles;
            programaJueves9M.textContent = arrayDeObjetos2[4].programajueves;
            programaViernes9M.textContent = arrayDeObjetos2[4].programaviernes;
            programaSabado9M.textContent = arrayDeObjetos2[4].programasabado;
            programaDomingo9M.textContent = arrayDeObjetos2[4].programadomingo;
          } else {
            console.error("No se encontraron datos para la fila de las 9:00 AM");
          }
  
          // Asignar valores para la fila de las 10:00 AM
          if (arrayDeObjetos2.length > 5) {
            programaLunes10.textContent = arrayDeObjetos2[5].programalunes;
            programaMartes10.textContent = arrayDeObjetos2[5].programamartes;
            programaMiercoles10.textContent = arrayDeObjetos2[5].programamiercoles;
            programaJueves10.textContent = arrayDeObjetos2[5].programajueves;
            programaViernes10.textContent = arrayDeObjetos2[5].programaviernes;
            programaSabado10.textContent = arrayDeObjetos2[5].programasabado;
            programaDomingo10.textContent = arrayDeObjetos2[5].programadomingo;
          } else {
            console.error("No se encontraron datos para la fila de las 10:00 AM");
          }
  
          // Asignar valores para la fila de las 11:00 AM
          if (arrayDeObjetos2.length > 6) {
            programaLunes11.textContent = arrayDeObjetos2[6].programalunes;
            programaMartes11.textContent = arrayDeObjetos2[6].programamartes;
            programaMiercoles11.textContent = arrayDeObjetos2[6].programamiercoles;
            programaJueves11.textContent = arrayDeObjetos2[6].programajueves;
            programaViernes11.textContent = arrayDeObjetos2[6].programaviernes;
            programaSabado11.textContent = arrayDeObjetos2[6].programasabado;
            programaDomingo11.textContent = arrayDeObjetos2[6].programadomingo;
          } else {
            console.error("No se encontraron datos para la fila de las 11:00 AM");
          }
  
          // Asignar valores para la fila de las 1:00 PM
          if (arrayDeObjetos2.length > 7) {
            programaLunes13.textContent = arrayDeObjetos2[7].programalunes;
            programaMartes13.textContent = arrayDeObjetos2[7].programamartes;
            programaMiercoles13.textContent = arrayDeObjetos2[7].programamiercoles;
            programaJueves13.textContent = arrayDeObjetos2[7].programajueves;
            programaViernes13.textContent = arrayDeObjetos2[7].programaviernes;
            programaSabado13.textContent = arrayDeObjetos2[7].programasabado;
            programaDomingo13.textContent = arrayDeObjetos2[7].programadomingo;
          } else {
            console.error("No se encontraron datos para la fila de la 1:00 PM");
          }
  
          // Asignar valores para la fila de las 2:00 PM
          if (arrayDeObjetos2.length > 8) {
            programaLunes14.textContent = arrayDeObjetos2[8].programalunes;
            programaMartes14.textContent = arrayDeObjetos2[8].programamartes;
            programaMiercoles14.textContent = arrayDeObjetos2[8].programamiercoles;
            programaJueves14.textContent = arrayDeObjetos2[8].programajueves;
            programaViernes14.textContent = arrayDeObjetos2[8].programaviernes;
            programaSabado14.textContent = arrayDeObjetos2[8].programasabado;
            programaDomingo14.textContent = arrayDeObjetos2[8].programadomingo;
          } else {
            console.error("No se encontraron datos para la fila de las 2:00 PM");
          }
  
          // Asignar valores para la fila de las 3:00 PM
          if (arrayDeObjetos2.length > 9) {
            programaLunes15.textContent = arrayDeObjetos2[9].programalunes;
            programaMartes15.textContent = arrayDeObjetos2[9].programamartes;
            programaMiercoles15.textContent = arrayDeObjetos2[9].programamiercoles;
            programaJueves15.textContent = arrayDeObjetos2[9].programajueves;
            programaViernes15.textContent = arrayDeObjetos2[9].programaviernes;
            programaSabado15.textContent = arrayDeObjetos2[9].programasabado;
            programaDomingo15.textContent = arrayDeObjetos2[9].programadomingo;
          } else {
            console.error("No se encontraron datos para la fila de las 3:00 PM");
          }
  
          // Asignar valores para la fila de las 4:00 PM
          if (arrayDeObjetos2.length > 10) {
            programaLunes16.textContent = arrayDeObjetos2[10].programalunes;
            programaMartes16.textContent = arrayDeObjetos2[10].programamartes;
            programaMiercoles16.textContent = arrayDeObjetos2[10].programamiercoles;
            programaJueves16.textContent = arrayDeObjetos2[10].programajueves;
            programaViernes16.textContent = arrayDeObjetos2[10].programaviernes;
            programaSabado16.textContent = arrayDeObjetos2[10].programasabado;
            programaDomingo16.textContent = arrayDeObjetos2[10].programadomingo;
  
            programaLunes16M.textContent = arrayDeObjetos2[11].programalunes;
            programaMartes16M.textContent = arrayDeObjetos2[11].programamartes;
            programaMiercoles16M.textContent = arrayDeObjetos2[11].programamiercoles;
            programaJueves16M.textContent = arrayDeObjetos2[11].programajueves;
            programaViernes16M.textContent = arrayDeObjetos2[11].programaviernes;
            programaSabado16M.textContent = arrayDeObjetos2[11].programasabado;
            programaDomingo16M.textContent = arrayDeObjetos2[11].programadomingo;
          } else {
            console.error("No se encontraron datos para la fila de las 4:00 PM");
          }
  
          // Asignar valores para la fila de las 5:00 PM
          if (arrayDeObjetos2.length > 12) {
            programaLunes17.textContent = arrayDeObjetos2[12].programalunes;
            programaMartes17.textContent = arrayDeObjetos2[12].programamartes;
            programaMiercoles17.textContent = arrayDeObjetos2[12].programamiercoles;
            programaJueves17.textContent = arrayDeObjetos2[12].programajueves;
            programaViernes17.textContent = arrayDeObjetos2[12].programaviernes;
            programaSabado17.textContent = arrayDeObjetos2[12].programasabado;
            programaDomingo17.textContent = arrayDeObjetos2[12].programadomingo;
  
            programaLunes17M.textContent = arrayDeObjetos2[13].programalunes;
            programaMartes17M.textContent = arrayDeObjetos2[13].programamartes;
            programaMiercoles17M.textContent = arrayDeObjetos2[13].programamiercoles;
            programaJueves17M.textContent = arrayDeObjetos2[13].programajueves;
            programaViernes17M.textContent = arrayDeObjetos2[13].programaviernes;
            programaSabado17M.textContent = arrayDeObjetos2[13].programasabado;
            programaDomingo17M.textContent = arrayDeObjetos2[13].programadomingo;
          } else {
            console.error("No se encontraron datos para la fila de las 5:00 PM");
          }
  
          // Asignar valores para la fila de las 6:00 PM
          if (arrayDeObjetos2.length > 14) {
            programaLunes18.textContent = arrayDeObjetos2[14].programalunes;
            programaMartes18.textContent = arrayDeObjetos2[14].programamartes;
            programaMiercoles18.textContent = arrayDeObjetos2[14].programamiercoles;
            programaJueves18.textContent = arrayDeObjetos2[14].programajueves;
            programaViernes18.textContent = arrayDeObjetos2[14].programaviernes;
            programaSabado18.textContent = arrayDeObjetos2[14].programasabado;
            programaDomingo18.textContent = arrayDeObjetos2[14].programadomingo;
          } else {
            console.error("No se encontraron datos para la fila de las 6:00 PM");
          }
  
          // Asignar valores para la fila de las 7:00 PM
          if (arrayDeObjetos2.length > 15) {
            programaLunes19.textContent = arrayDeObjetos2[15].programalunes;
            programaMartes19.textContent = arrayDeObjetos2[15].programamartes;
            programaMiercoles19.textContent = arrayDeObjetos2[15].programamiercoles;
            programaJueves19.textContent = arrayDeObjetos2[15].programajueves;
            programaViernes19.textContent = arrayDeObjetos2[15].programaviernes;
            programaSabado19.textContent = arrayDeObjetos2[15].programasabado;
            programaDomingo19.textContent = arrayDeObjetos2[15].programadomingo;
  
            programaLunes19M.textContent = arrayDeObjetos2[16].programalunes;
            programaMartes19M.textContent = arrayDeObjetos2[16].programamartes;
            programaMiercoles19M.textContent = arrayDeObjetos2[16].programamiercoles;
            programaJueves19M.textContent = arrayDeObjetos2[16].programajueves;
            programaViernes19M.textContent = arrayDeObjetos2[16].programaviernes;
            programaSabado19M.textContent = arrayDeObjetos2[16].programasabado;
            programaDomingo19M.textContent = arrayDeObjetos2[16].programadomingo;
          } else {
            console.error("No se encontraron datos para la fila de las 7:00 PM");
          }
  
          // Asignar valores para la fila de las 8:00 PM
          if (arrayDeObjetos2.length > 17) {
            programaLunes20.textContent = arrayDeObjetos2[17].programalunes;
            programaMartes20.textContent = arrayDeObjetos2[17].programamartes;
            programaMiercoles20.textContent = arrayDeObjetos2[17].programamiercoles;
            programaJueves20.textContent = arrayDeObjetos2[17].programajueves;
            programaViernes20.textContent = arrayDeObjetos2[17].programaviernes;
            programaSabado20.textContent = arrayDeObjetos2[17].programasabado;
            programaDomingo20.textContent = arrayDeObjetos2[17].programadomingo;
  
            programaLunes20M.textContent = arrayDeObjetos2[18].programalunes;
            programaMartes20M.textContent = arrayDeObjetos2[18].programamartes;
            programaMiercoles20M.textContent = arrayDeObjetos2[18].programamiercoles;
            programaJueves20M.textContent = arrayDeObjetos2[18].programajueves;
            programaViernes20M.textContent = arrayDeObjetos2[18].programaviernes;
            programaSabado20M.textContent = arrayDeObjetos2[18].programasabado;
            programaDomingo20M.textContent = arrayDeObjetos2[18].programadomingo;
          } else {
            console.error("No se encontraron datos para la fila de las 8:00 PM");
          }

 // Asignar valores para la fila de las 21:00 PM
 if (arrayDeObjetos2.length > 19) {
    programaLunes21.textContent = arrayDeObjetos2[19].programalunes;
    programaMartes21.textContent = arrayDeObjetos2[19].programamartes;
    programaMiercoles21.textContent = arrayDeObjetos2[19].programamiercoles;
    programaJueves21.textContent = arrayDeObjetos2[19].programajueves;
    programaViernes21.textContent = arrayDeObjetos2[19].programaviernes;
    programaSabado21.textContent = arrayDeObjetos2[19].programasabado;
    programaDomingo21.textContent = arrayDeObjetos2[19].programadomingo;

} else {
    console.error("No se encontraron datos para la fila de las 9:00 PM");
  }


   // Asignar valores para la fila de las 21:00 PM
 if (arrayDeObjetos2.length > 20) {

    programaLunes22.textContent = arrayDeObjetos2[20].programalunes;
    programaMartes22.textContent = arrayDeObjetos2[20].programamartes;
    programaMiercoles22.textContent = arrayDeObjetos2[20].programamiercoles;
    programaJueves22.textContent = arrayDeObjetos2[20].programajueves;
    programaViernes22.textContent = arrayDeObjetos2[20].programaviernes;
    programaSabado22.textContent = arrayDeObjetos2[20].programasabado;
    programaDomingo22.textContent = arrayDeObjetos2[20].programadomingo;

} else {
    console.error("No se encontraron datos para la fila de las 10:00 PM");
  }

  if (arrayDeObjetos2.length > 21) {

    programaLunes23.textContent = arrayDeObjetos2[21].programalunes;
    programaMartes23.textContent = arrayDeObjetos2[21].programamartes;
    programaMiercoles23.textContent = arrayDeObjetos2[21].programamiercoles;
    programaJueves23.textContent = arrayDeObjetos2[21].programajueves;
    programaViernes23.textContent = arrayDeObjetos2[21].programaviernes;
    programaSabado23.textContent = arrayDeObjetos2[21].programasabado;
    programaDomingo23.textContent = arrayDeObjetos2[21].programadomingo;
} else {
    console.error("No se encontraron datos para la fila de las 11:00 PM");
  }




        },
        function (reason) {
          console.error("Error al cargar datos desde Google Sheets: " + reason.result.error.message);
        }
      );

      setTimeout(mostrarProgramasActuales, 2000);

  }
  
  






  //LETRERO ROTATIVO FUNCIONAMIENTO
  

   // Definir la función mostrarProgramasActuales como arrow function
function mostrarProgramasActuales (){
    var ahora = new Date();
    var horaActual = ahora.getHours() * 60 + ahora.getMinutes(); // Convertir la hora actual a minutos
    var diaSemanaActual = ahora.getDay() || 7; // Cambiar 0 a 7 para tratar el domingo como el día 7
  
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
      programaActualElement.innerHTML = "<strong>AHORA</strong>"+ ": " +"MÚSICA DE TODOS LOS TIEMPOS"; // Mensaje predeterminado
    } else {
      programaActualElement.innerHTML = "<strong>AHORA</strong>"+ ": " + programaActual;
    }
  
    var programaSiguienteElement = document.getElementById("programaSiguiente");
    if (programaSiguiente.trim() === "") {
      programaSiguienteElement.innerHTML = "<strong>DESPUÉS</strong>"+": "+ " MÚSICA DE TODOS LOS TIEMPOS"; // Mensaje predeterminado si no hay programa siguiente
    } else {
      programaSiguienteElement.innerHTML = "<strong>DESPUÉS</strong>" + ": " + programaSiguiente;
    }

  };

  function convertirHoraAMinutos(hora) {
    var partesHora = hora.split(":");
    var horas = parseInt(partesHora[0]);
    var minutos = parseInt(partesHora[1]);
    return horas * 60 + minutos; // Convertir la hora a minutos
  }


  
// Cargar la API de Google Sheets
gapi.load("client", cargarDatosDesdeGoogleSheetsHorarioRotativo);

  