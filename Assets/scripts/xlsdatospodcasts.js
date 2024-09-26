function cargarDatosDesdeGoogleSheets() {
    gapi.client
      .init({
        apiKey: "AIzaSyCZm_uR6TknLlgLhTrOhhsSKnzgUQeSOOE",
      })
      .then(function () {
        return gapi.client.request({
          path: "https://sheets.googleapis.com/v4/spreadsheets/1jlHc0Z3_P7ibmAAqTkfxBtAez530e-bH36wVKRHwPuI/values/PODCASTS!A:Z",
        });
      })
      .then(function (response) {
        var datos = response.result.values;
        var arrayDeObjetos = [];
        if (datos && datos.length > 0) {
          for (var i = 1; i < datos.length; i++) {
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
              spotifyLink: fila[9],
              IvooxLink: fila[10],
              spotifyId: fila[11],
              spotifyId2: fila[12],
              // Add more properties as needed
            };
            arrayDeObjetos.push(objeto);
          }
        }
        console.log(arrayDeObjetos);
  
        // Check if there's something in the array
        const podcastsContainer = document.querySelector('.cards'); // Use a valid selector
        podcastsContainer.innerHTML = ""; // Clear previous content
  
        if (arrayDeObjetos.length > 0) {
          arrayDeObjetos.forEach(podcast => {
            const {
              titulo,
              descripcion,
              imagen,
              horario1,
              horario2,
              horarior,
              duracion,
              etiqueta,
              spotifyId,
              spotifyLink,
              IvooxLink,
              spotifyId2
            } = podcast; // Destructure properties
  
            const podcastDiv = document.createElement('div');
            podcastDiv.className = 'podcastcard';
            podcastDiv.setAttribute('data-podcast-id', spotifyId); // Set the correct attribute
  
            // Build the days section conditionally
            let daysHTML = '';
            if (horario1) {
              daysHTML += `<div class="descriptionon">${horario1}</div>`;
            }
            if (horario2) {
              daysHTML += `<div class="dayoff">${horario2}</div>`;
            }
            if (horarior) {
              daysHTML += `<div class="descriptionon">${horarior}</div>`;
            }
            if (duracion) {
              daysHTML += `<div class="descriptionon">${duracion}</div>`;
            }
            if (etiqueta) {
              daysHTML += `<div class="descriptionon">${etiqueta}</div>`;
            }
  
            podcastDiv.innerHTML = `
              <div class="partetextualpodcastcard">
                <img class="podcastcardimgprincipal"
                  src="Assets/logos/${imagen}"
                  style="object-fit:cover;" alt="Imagen">
                <h2>${titulo}</h2>
                <div class="days">
                  ${daysHTML} <!-- Inject dynamic daysHTML here -->
                </div>
                <div class="grupocarddescripcion">
                  <p class="parrafoleermas">${descripcion}<br></p>
                </div>
                <div style="display:none" class="masprogramas masprogramasrecientes"> 
                  <img class="cardreproducirultimoprogramaimg"
                    src="Assets/playwhite.png"
                    style="transform: rotate(0deg);width: 30px; height: auto; margin-right: 10px;margin-top:2px; border-radius: 0; padding: 0; background-color: transparent;overflow: visible;"
                    alt="Boton reproducir ultimo episodio">
                  PROGRAMAS RECIENTES
                </div>
                <div class="botonesplataforma">
                  <a href="${spotifyLink}" target="_blank">
                    <div class="masprogramas masprogramasspotify">
                      <img src="Assets/mapalocalizaciones/spotifylogo.png"
                        style="width: 30px; height: auto; margin-right: 10px;margin-top: 2px;" alt="Logo spotify">EPISODIOS:
                      SPOTIFY
                    </div>
                  </a>
                  <a href="${IvooxLink}" target="_blank">
                    <div class="masprogramas masprogramasivoox">
                      <img src="Assets/mapalocalizaciones/logoivoox.png"
                        style="width: 30px; height: auto; margin-right: 10px;margin-top: 2px;" alt="Logo Ivoox">EPISODIOS:
                      IVOOX
                    </div>
                  </a>
                </div>
              </div>
              <div class="episodes-container programasrecientes" id="${spotifyId2}">
                <!-- Rellenado dinámicamente -->
              </div>
            `;
  
            podcastsContainer.appendChild(podcastDiv);
          });
        } else {
          console.error("No se encuentran datos o no se puede conectar con el array");
        }
      });
  }
  
  // Cargar la API de Google Sheets
  gapi.load("client", cargarDatosDesdeGoogleSheets);
  