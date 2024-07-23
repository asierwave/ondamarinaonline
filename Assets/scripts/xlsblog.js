function cargarDatosDesdeGoogleSheetsNoticias() {
  gapi.client
    .init({
      apiKey: "AIzaSyCZm_uR6TknLlgLhTrOhhsSKnzgUQeSOOE",
    })
    .then(function () {
      return gapi.client.request({
        path: "https://sheets.googleapis.com/v4/spreadsheets/1jlHc0Z3_P7ibmAAqTkfxBtAez530e-bH36wVKRHwPuI/values/NOTICIAS!A:Z",
      });
    })
    .then(function (response) {
      var datos = response.result.values;
      var arrayDeObjetos = [];
      var articulosContainer = document.getElementById('articulos-container');

      // Si hay datos, procesarlos
      if (datos && datos.length > 0) {
        // Limpiar el contenedor antes de volver a llenarlo
        articulosContainer.innerHTML = '';

        for (var i = 1; i < datos.length; i++) {
          var fila = datos[i];
          var objeto = {
            id: fila[0],
            titulo: fila[1],
            subtitulo: fila[2],
            autor: fila[3],
            entradilla: fila[4],
            cuerpo: fila[5].replace(/\n/g, '<br>'), // Reemplaza saltos de línea con <br>
            ladillo1: fila[6],
            cuerpo2: fila[7],
            ladillo2: fila[8],
            cuerpo3: fila[9],
            ladillo3: fila[10],
            cuerpo4: fila[11],
            imagen: fila[12], // URL de la imagen
            imagen2: fila[13], // URL de la imagen
            imagenautor: fila[14], // URL de la imagen
          };
          arrayDeObjetos.push(objeto);

          // Crear un nuevo artículo en el HTML
          var articuloHTML = `
            <div class="noticia" id="articulo-${objeto.id}">
              <div class="noticiamedia">
                <img class="noticiavideo" src="${objeto.imagen}" alt="Imagen del artículo" style="max-width: auto; height: auto;">
              </div>
                             

              <div class="noticiatextual">
                <h2 class="noticiatitular">${objeto.titulo}</h2>

                <div class="noticiaetiquetas">

                <div class="noticiatextualautor">
                                <img class="noticiaimagenautor" src="${objeto.imagenautor}" alt="Imagen del artículo" style="max-width: auto; height: auto;">
                                <p>${objeto.autor}</p>
                            </div>

                <div class="noticiafecha"> <p>${objeto.subtitulo}</p></div>
                
                </div>

                <p class="noticiatextualentradilla">${objeto.entradilla}</p>

                <p class="noticiatextualp">${objeto.cuerpo}</p>

                              <h2 class="noticialadillo">${objeto.ladillo1}</h2>
                              <p class="noticiatextualp">${objeto.cuerpo2}</p>

                         <img class="noticiaimagencomplementaria" src="${objeto.imagen2}" alt="Imagen del artículo" style="max-width: auto; height: auto;">


                              <h2 class="noticialadillo">${objeto.ladillo2}</h2>
                              <p class="noticiatextualp">${objeto.cuerpo3}</p>

                                 <h2 class="noticialadillo">${objeto.ladillo3}</h2>
                              <p class="noticiatextualp">${objeto.cuerpo4}</p>


                <a href="noticias.html"><button class="masprogramas noticialeermas">Leer más</button></a>
              </div>
            </div>
          `;
          articulosContainer.innerHTML += articuloHTML;
        }
      } else {
        console.error("No se encuentran datos o no se puede conectar con el array");
      }
    }, function (reason) {
      console.error("Error: " + reason.result.error.message);
    });
}

// Cargar la API de Google Sheets
gapi.load("client", cargarDatosDesdeGoogleSheetsNoticias);

document.addEventListener('DOMContentLoaded', function() {
  // La carga inicial de datos se maneja en cargarDatosDesdeGoogleSheetsNoticias
});
