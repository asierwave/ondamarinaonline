function cargarDatosDesdeGoogleSheetsNoticias() {
    // Inicializa la API de Google
    gapi.client
      .init({
        apiKey: "AIzaSyCZm_uR6TknLlgLhTrOhhsSKnzgUQeSOOE",
      })
      .then(function () {
        console.log("API de Google inicializada correctamente.");
        // Solicita los datos desde la hoja de cálculo
        return gapi.client.request({
          path: "https://sheets.googleapis.com/v4/spreadsheets/1jlHc0Z3_P7ibmAAqTkfxBtAez530e-bH36wVKRHwPuI/values/NOTICIAS!A:Z",
        });
      })
      .then(function (response) {
        console.log("Datos recibidos de Google Sheets:", response);
        var datos = response.result.values;
        var articulosContainer = document.getElementById('articulos-container');
  
        // Si hay datos, procesarlos
        if (datos && datos.length > 0) {
          console.log("Datos procesados correctamente.");
          // Limpiar el contenedor antes de volver a llenarlo
          articulosContainer.innerHTML = '';
          
          // Invertir el orden de las filas (excepto la primera fila que es el encabezado)
          var filasInvertidas = datos.slice(1).reverse(); // Obtener todas las filas excepto la primera y luego invertirlas
  
          for (var i = 0; i < filasInvertidas.length; i++) {
            var fila = filasInvertidas[i];
            // Cargar solo los datos relevantes: titular, subtítulo, autor, fecha e imagen principal
            var objeto = {
                id:fila[0],
              titulo: fila[1],
              autor: fila[3],
              fecha: fila[2],  // Suponiendo que la fecha está en la columna 5
              imagen: fila[12] // URL de la imagen principal
            };
  
            // Crear el HTML del artículo
            var articuloHTML = `
            <a class="noticia" id="articulo-${i}" href="noticia.html?id=${objeto.id}" target="_blank">
                  <img class="noticiavideo" src="${objeto.imagen}" alt="Imagen del artículo">
               
                <div class="noticiatextual">
                  <h2 class="noticiatitular">${objeto.titulo}</h2>
                  <div class="noticiaetiquetas">
                    <div class="noticiatextualautor">
                      <p>${objeto.autor}</p>
                    </div>
                    <div class="noticiafecha">
                      <p>${objeto.fecha}</p>
                    </div>
            
                  </div>
                </div>
              
              </a>
            `;
  
            articulosContainer.innerHTML += articuloHTML;
          }
        } else {
          console.error("No se encontraron datos en la hoja de cálculo.");
        }
      }, function (reason) {
        console.error("Error al cargar los datos: " + reason.result.error.message);
      });
  }
  
  // Cargar la API de Google Sheets
  gapi.load("client", function() {
    console.log("Cliente de Google cargado, iniciando la carga de datos.");
    cargarDatosDesdeGoogleSheetsNoticias();
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM completamente cargado y procesado.");
  });
  