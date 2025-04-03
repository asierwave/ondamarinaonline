// Function to load data from Google Sheets
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
                      youtubeLink: fila[13],
                      instagramLink: fila[14],
                      imagenAutor: fila[15],
                      nombreAutor: fila[16],
                      linkAutor: fila[17]
                  };
                  arrayDeObjetos.push(objeto);
              }
          }
          console.log(arrayDeObjetos);

          // Check if there's something in the array
          const podcastsContainer = document.querySelector('.podcastCards'); // Use a valid selector
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
                      spotifyId2,
                      youtubeLink,
                      instagramLink, 
                      imagenAutor,
                      nombreAutor,
                      linkAutor
                                          
                    } = podcast; // Destructure properties

                  const podcastDiv = document.createElement('div');
                  podcastDiv.className = 'podcastCardTemplate';
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

                  //Datos de autor y bubble redes

            

                  if (instagramLink) {
                     daysHTML += `<a class="podcastAutorRsBubble" href="${instagramLink}" target="_blank">
<svg alt="Logo Instagram"  xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0,0,256,256">
<g fill="#fafafa" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.12,5.12)"><path d="M16,3c-7.17,0 -13,5.83 -13,13v18c0,7.17 5.83,13 13,13h18c7.17,0 13,-5.83 13,-13v-18c0,-7.17 -5.83,-13 -13,-13zM37,11c1.1,0 2,0.9 2,2c0,1.1 -0.9,2 -2,2c-1.1,0 -2,-0.9 -2,-2c0,-1.1 0.9,-2 2,-2zM25,14c6.07,0 11,4.93 11,11c0,6.07 -4.93,11 -11,11c-6.07,0 -11,-4.93 -11,-11c0,-6.07 4.93,-11 11,-11zM25,16c-4.96,0 -9,4.04 -9,9c0,4.96 4.04,9 9,9c4.96,0 9,-4.04 9,-9c0,-4.96 -4.04,-9 -9,-9z"></path></g></g>
</svg></a>`;
                  }

                  if (spotifyLink) {
                    daysHTML += `<a style="background:green;" class="podcastAutorRsBubble" href="${spotifyLink}" target="_blank">
                     <img src="Assets/mapalocalizaciones/spotifylogo.png" alt="Logo spotify"></a>`;
                }

                if (IvooxLink) {
                    daysHTML += `<a style="background:#2c2c2c;" class="podcastAutorRsBubble" href="${IvooxLink}" target="_blank">
                     <img src="Assets/mapalocalizaciones/logoivoox.png" alt="Logo Ivoox"></a>`;

                }

                if (youtubeLink) {
                    daysHTML += `<a style="background:red;" class="podcastAutorRsBubble" href="${youtubeLink}" target="_blank">
                     <img src="Assets/youtube.png" alt="Logo Youtube"></a>`;

                }


                  
                if (nombreAutor) {
                    daysHTML += `<a href="${linkAutor}" target="_blank" class="podcastAutor"><img src="Assets/logos/${imagenAutor}" class="podcastImagenAutor"><h6>${nombreAutor}</h6></a>`;

                }
            















                

                  // Build the links section conditionally
                  let linksHTML = '';

                  if (spotifyLink) {
                      linksHTML += `<a href="${spotifyLink}" target="_blank">
                          <div class="masprogramas masprogramasspotify">
                              <img src="Assets/mapalocalizaciones/spotifylogo.png"
                                  style="width: 30px; height: auto; margin-right: 10px;margin-top: 2px;" alt="Logo spotify">EPISODIOS:
                              SPOTIFY
                          </div>
                      </a>`;
                  }

                  if (IvooxLink) {
                      linksHTML += `<a href="${IvooxLink}" target="_blank">
                          <div class="masprogramas masprogramasivoox">
                              <img src="Assets/mapalocalizaciones/logoivoox.png"
                                  style="width: 30px; height: auto; margin-right: 10px;margin-top: 2px;" alt="Logo Ivoox">EPISODIOS:
                              IVOOX
                          </div>
                      </a>`;
                  }

                  if (youtubeLink) {
                      linksHTML += `<a href="${youtubeLink}" target="_blank">
                          <div class="masprogramas masprogramasyoutube">
                              <img src="Assets/youtube.png"
                                  style="width: 30px; height: auto; margin-right: 10px;margin-top: 2px;" alt="Logo YouTube">EPISODIOS:
                              YOUTUBE
                          </div>
                      </a>`;
                  }

                  if (instagramLink) {
                      linksHTML += `<a href="${instagramLink}" target="_blank">
                          <div class="masprogramas masprogramasinstagram">
<svg style="width: 30px; height: auto; margin: 0 26px 0 -2px;" alt="Logo Instagram"  xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0,0,256,256">
<g fill="#fafafa" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.12,5.12)"><path d="M16,3c-7.17,0 -13,5.83 -13,13v18c0,7.17 5.83,13 13,13h18c7.17,0 13,-5.83 13,-13v-18c0,-7.17 -5.83,-13 -13,-13zM37,11c1.1,0 2,0.9 2,2c0,1.1 -0.9,2 -2,2c-1.1,0 -2,-0.9 -2,-2c0,-1.1 0.9,-2 2,-2zM25,14c6.07,0 11,4.93 11,11c0,6.07 -4.93,11 -11,11c-6.07,0 -11,-4.93 -11,-11c0,-6.07 4.93,-11 11,-11zM25,16c-4.96,0 -9,4.04 -9,9c0,4.96 4.04,9 9,9c4.96,0 9,-4.04 9,-9c0,-4.96 -4.04,-9 -9,-9z"></path></g></g>
</svg>INSTAGRAM</div>
                      </a>`;
                  }

                  // Build the masprogramas section conditionally
                  let spotifypHTML = '';

                  if (spotifyId) {
                      spotifypHTML += `<button class="masprogramas masprogramasrecientes"> 
                          <img class="cardreproducirultimoprogramaimg"
                              src="Assets/playicon.png"
                              style="transform: rotate(0deg);width: 30px; height: auto; margin-right: 10px;margin-top:2px; border-radius: 0; padding: 0; background-color: transparent;overflow: visible;"
                              alt="Boton reproducir ultimo episodio">
                          <h3 class="masprogramasrecientestexto">PROGRAMAS RECIENTES</h3>
                      </button>`;
                  }

                  podcastDiv.innerHTML = `
                      <div class="podcastCard">
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
                          ${spotifypHTML} <!-- Inject dynamic spotify preview here -->     

                        <!--   <div class="podcastCardLinks">
                              ${linksHTML} <!-- Inject dynamic links here                     
                          </div> -->



                      </div>
                      <div class="episodes-container" id="${spotifyId2}">
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
