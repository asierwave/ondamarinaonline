const SHEET_ID = "1jlHc0Z3_P7ibmAAqTkfxBtAez530e-bH36wVKRHwPuI";
const SHEET_RANGE = "NOTICIAS!A:Z";
const API_KEY = "AIzaSyCZm_uR6TknLlgLhTrOhhsSKnzgUQeSOOE";
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyPoObZ-fSqhzJla68JH1kwpM871VhlN_UZUi-l8CDwD1z3L7YsMZENLETmikrWWtqGBA/exec";  // Reemplaza con la URL de tu Web App de Apps Script

document.addEventListener('DOMContentLoaded', function() {
    gapi.load("client", function() {
        gapi.client.init({
            apiKey: API_KEY,
        }).then(function () {
            cargarDatosDesdeGoogleSheetsNoticias();
        });
    });
});


function cargarDatosDesdeGoogleSheetsNoticias() {
    gapi.client.request({
        path: `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_RANGE}`,
    }).then(function(response) {
        const datos = response.result.values;
        const articulosContainer = document.getElementById('articulos-container');

        if (datos && datos.length > 0) {
            articulosContainer.innerHTML = '';
            for (let i = 1; i < datos.length; i++) {
                const fila = datos[i];
                const articuloHTML = `
                    <div class="noticia" id="articulo-${fila[0]}">
                      <div class="noticiamedia">
                        <img class="noticiavideo" src="${fila[12]}" alt="Imagen del artículo">
                      </div>
                      <div class="noticiatextual">
                        <h2 class="noticiatitular">${fila[1]}</h2>
                        <div class="noticiaetiquetas">
                          <div class="noticiatextualautor">
                            <img class="noticiaimagenautor" src="${fila[14]}" alt="Imagen del autor">
                            <p>${fila[3]}</p>
                          </div>
                          <div class="noticiafecha"> <p>${fila[2]}</p></div>
                        </div>
                        <p class="noticiatextualentradilla">${fila[4]}</p>
                        <p class="noticiatextualp">${fila[5].replace(/\n/g, '<br>')}</p>
                        <h2 class="noticialadillo">${fila[6]}</h2>
                        <p class="noticiatextualp">${fila[7]}</p>
                        <img class="noticiaimagencomplementaria" src="${fila[13]}" alt="Imagen complementaria">
                        <h2 class="noticialadillo">${fila[8]}</h2>
                        <p class="noticiatextualp">${fila[9]}</p>
                        <h2 class="noticialadillo">${fila[10]}</h2>
                        <p class="noticiatextualp">${fila[11]}</p>
                        <a href="noticia.html?id=${fila[0]}"><button class="masprogramas noticialeermas">Leer más</button></a>
                        <a href="noticias.html" class="masprogramas" style="margin-top:0.5rem; background-color:#2c2c2c; border:none;">Todas las noticias</a>
                      </div>
                    </div>
                `;
                articulosContainer.innerHTML += articuloHTML;
            }
        } else {
            console.error("No se encontraron datos en la hoja de cálculo.");
        }
    }, function(reason) {
        console.error("Error al cargar los datos: " + reason.result.error.message);
    });
}

async function procesarFormulario() {
    const titular = document.getElementById('titular').value;
    const contenido = document.getElementById('contenido').value;
    const imagen1 = await convertirImagenABase64(document.getElementById('imagen1').files[0]);
    const imagen2 = await convertirImagenABase64(document.getElementById('imagen2').files[0]);

    const secciones = contenido.split(/\n\s*\n/);

    const data = {
        titular: titular,
        entradilla: secciones[0] || "",
        cuerpo1: secciones[1] || "",
        ladillo1: secciones[2] || "",
        cuerpo2: secciones[3] || "",
        ladillo2: secciones[4] || "",
        cuerpo3: secciones[5] || "",
        ladillo3: secciones[6] || "",
        cuerpo4: secciones[7] || "",
        imagen1: imagen1,
        imagen2: imagen2
    };

    const response = await fetch(WEB_APP_URL, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const result = await response.json();
    document.getElementById('resultado').innerText = result.result === 'success' ? 'Guardado con éxito en Google Sheets' : 'Hubo un error al guardar';

    // Recargar datos después de guardar
    cargarDatosDesdeGoogleSheetsNoticias();
}

function convertirImagenABase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}
