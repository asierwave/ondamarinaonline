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
        var arrayDeObjetos = [];
        var articulosContainer = document.getElementById('articulos-container');
  
        // Si hay datos, procesarlos
        if (datos && datos.length > 0) {
          console.log("Datos procesados correctamente.");
          // Limpiar el contenedor antes de volver a llenarlo
          articulosContainer.innerHTML = '';
      // Invertir el orden de las filas (excepto la primera fila que es el encabezado)
      var filasInvertidas = datos.slice(1).reverse(); // Obtener todas las filas excepto la primera y luego invertirlas

      for (var i = 0; i < Math.min(filasInvertidas.length); i++) { // Solo muestra todas las noticias filasInvertidas.length
        var fila = filasInvertidas[i];
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
              fuenteImagen: fila[15], // Pie de foto principal
              fuenteImagen2: fila[16], // Pie de foto 2
            };

            let fuenteImagenHTML;
            if (objeto.fuenteImagen) {
                fuenteImagenHTML = `<p class="noticiavideopie">${objeto.fuenteImagen}</p>`;

            } else {
              fuenteImagenHTML = ``;
            }

            let fuenteImagen2HTML;
            if (objeto.fuenteImagen2) {
                fuenteImagen2HTML = `<p class="noticiavideopie">${objeto.fuenteImagen}</p>`;

            }
            arrayDeObjetos.push(objeto);


     
  
            if (innerWidth > 800) {
            // Crear un nuevo artículo en el HTML
            var articuloHTML = `
              <div class="noticia" id="articulo-${objeto.id}">
                <div class="noticiamedia">
                  <img class="noticiavideo noticiavideopaginaindividual" src="${objeto.imagen}" alt="Imagen del artículo" style="max-width: auto; height: auto;">
                    ${fuenteImagenHTML}
                </div>
                <div class="noticiatextual">
                  <h2 class="noticiatitular">${objeto.titulo}</h2>
                  <div class="noticiaetiquetas">
                    <div class="noticiatextualautor">
                      <img class="noticiaimagenautor" src="${objeto.imagenautor}" alt="Imagen del autor" style="max-width: auto; height: auto;">
                      <p>${objeto.autor}</p>
                    </div>
                    <div class="noticiafecha"> <p>${objeto.subtitulo}</p></div>
                  </div>
                  <p class="noticiatextualentradilla">${objeto.entradilla}</p>
                  <p class="noticiatextualp">${objeto.cuerpo}</p>
                  <h2 class="noticialadillo">${objeto.ladillo1}</h2>
                  <p class="noticiatextualp">${objeto.cuerpo2}</p>
                  <img class="noticiaimagencomplementaria noticiaimagencomplementariapaginaindividual" src="${objeto.imagen2}" alt="Imagen complementaria" style="max-width: auto; height: auto;">
  ${fuenteImagen2HTML}
                    <h2 class="noticialadillo">${objeto.ladillo2}</h2>
                  <p class="noticiatextualp">${objeto.cuerpo3}</p>
                  <h2 class="noticialadillo">${objeto.ladillo3}</h2>
                  <p class="noticiatextualp">${objeto.cuerpo4}</p>
                  <a href="noticia.html?id=${objeto.id}"><button class="masprogramas noticialeermas">Leer más</button></a>
  
                </div>
              </div>
            `;
            } else {
// Crear un nuevo artículo en el HTML
var articuloHTML = `
<div class="noticia" id="articulo-${objeto.id}">
 <div class="noticiatextual">
    <h2 class="noticiatitular">${objeto.titulo}</h2>

    <div class="noticiaetiquetas">
      <div class="noticiatextualautor">
        <img class="noticiaimagenautor" src="${objeto.imagenautor}" alt="Imagen del autor" style="max-width: auto; height: auto;">
        <p>${objeto.autor}</p>
      </div>
      <div class="noticiafecha"> <p>${objeto.subtitulo}</p></div>
    </div>
              <img class="noticiavideo" src="${objeto.imagen}" alt="Imagen del artículo" style="max-width: auto; height: auto;">
                <p class="noticiavideopie">${objeto.fuenteImagen}</p>
                <div class="noticiasredes">
                </div>
    <p class="noticiatextualentradilla">${objeto.entradilla}</p>
    <p class="noticiatextualp">${objeto.cuerpo}</p>
    <h2 class="noticialadillo">${objeto.ladillo1}</h2>
    <p class="noticiatextualp">${objeto.cuerpo2}</p>
    <img class="noticiaimagencomplementaria" src="${objeto.imagen2}" alt="Imagen complementaria" style="max-width: auto; height: auto;">
                    <p class="noticiavideopie">${objeto.fuenteImagen2}</p>
    <h2 class="noticialadillo">${objeto.ladillo2}</h2>
    <p class="noticiatextualp">${objeto.cuerpo3}</p>
    <h2 class="noticialadillo">${objeto.ladillo3}</h2>
    <p class="noticiatextualp">${objeto.cuerpo4}</p>
    <a href="noticia.html?id=${objeto.id}"><button class="masprogramas noticialeermas">Leer más</button></a>

  </div>
</div>
`;
            }
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
    // La carga inicial de datos se maneja en cargarDatosDesdeGoogleSheetsNoticias
    console.log("DOM completamente cargado y procesado.");
  });
  