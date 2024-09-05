
// Función para obtener el parámetro 'id' de la URL
function obtenerParametroUrl(nombre) {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nombre);
}

// Función para cargar la noticia desde Google Sheets en base al ID
function cargarNoticiaPorId(idNoticia) {
gapi.client.init({
    apiKey: "AIzaSyCZm_uR6TknLlgLhTrOhhsSKnzgUQeSOOE",
}).then(function () {
    return gapi.client.request({
        path: "https://sheets.googleapis.com/v4/spreadsheets/1jlHc0Z3_P7ibmAAqTkfxBtAez530e-bH36wVKRHwPuI/values/NOTICIAS!A:Z",
    });
}).then(function (response) {
    var datos = response.result.values;

    if (datos && datos.length > 0) {
        // Buscar la noticia con el ID proporcionado
        for (var i = 1; i < datos.length; i++) {
            var fila = datos[i];
            var objeto = {
                id: fila[0],
                titulo: fila[1],
                subtitulo: fila[2],
                autor: fila[3],
                entradilla: fila[4],
                cuerpo: fila[5].replace(/\n/g, '<br>'),
                ladillo1: fila[6],
                cuerpo2: fila[7],
                ladillo2: fila[8],
                cuerpo3: fila[9],
                ladillo3: fila[10],
                cuerpo4: fila[11],
                imagen: fila[12],
                imagen2: fila[13],
                imagenautor: fila[14],
            };

            // Mostrar la noticia si coincide con el ID
            if (objeto.id === idNoticia) {
                const urlActual = window.location.href;
                const titulo = objeto.titulo;
                const imagen = objeto.imagen;

                document.getElementById('noticia-completa').innerHTML = `
                    <div class="noticiamedia">
                        <img class="noticiavideo" src="${objeto.imagen}" alt="Imagen del artículo" style="max-width: auto; height: auto;">
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
                        <img class="noticiaimagencomplementaria" src="${objeto.imagen2}" alt="Imagen complementaria" style="max-width: auto; height: auto;">
                        <h2 class="noticialadillo">${objeto.ladillo2}</h2>
                        <p class="noticiatextualp">${objeto.cuerpo3}</p>
                        <h2 class="noticialadillo">${objeto.ladillo3}</h2>
                        <p class="noticiatextualp">${objeto.cuerpo4}</p>
                        <a href="noticia.html?id=${objeto.id}"><button class="masprogramas noticialeermas">Leer más</button></a>
                        
                        <!-- Botones para compartir y copiar enlace -->
                        <h2 class="noticialadillo" style="padding-bottom:0.5rem;">¡Comparte esta noticia en redes!</h2>
                        <div class="social-share"> 
                            <button onclick="compartirEnRedSocial('facebook', '${urlActual}', '${titulo}', '${imagen}')"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"/></svg></button>
                            <button onclick="compartirEnRedSocial('twitter', '${urlActual}', '${titulo}', '${imagen}')"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg></button>
                            <button onclick="compartirEnRedSocial('linkedin', '${urlActual}', '${titulo}', '${imagen}')"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z"/></svg></button>
                            <button onclick="compartirEnRedSocial('whatsapp', '${urlActual}', '${titulo}', '${imagen}')"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg></button>
                            <button onclick="copiarEnlace('${urlActual}')"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"/></svg></button>
                        </div>
                    </div>
                `;

                // Actualizar Open Graph Tags dinámicamente
                document.querySelector('meta[property="og:title"]').textContent= objeto.titulo;
                document.querySelector('meta[property="og:description"]').textContent= objeto.entradilla;
                document.querySelector('meta[property="og:image"]').innerHTML = objeto.imagen;
                document.querySelector('meta[property="og:url"]').textContent= urlActual;

                document.querySelector('title[property="og:title"').textContent = objeto.titulo;
                break;
            }
        }
    } else {
        document.getElementById('noticia-completa').innerHTML = '<p>No se encontró la noticia.</p>';
    }
}, function (reason) {
    console.error("Error: " + reason.result.error.message);
    document.getElementById('noticia-completa').innerHTML = '<p>Error al cargar la noticia.</p>';
});
}

// Función para compartir en redes sociales
function compartirEnRedSocial(redSocial, url, titulo, imagen) {
    let enlaceCompartir = '';
    switch (redSocial) {
        case 'facebook':
            enlaceCompartir = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(titulo)}`;
            break;
        case 'twitter':
            enlaceCompartir = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(titulo)}`;
            break;
        case 'linkedin':
            enlaceCompartir = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(titulo)}&summary=&source=`;
            break;
        case 'whatsapp':
            enlaceCompartir = `https://api.whatsapp.com/send?text=${encodeURIComponent(titulo + ' ' + url)}`;
            break;
    }
    window.open(enlaceCompartir, '_blank');
}

// Función para copiar el enlace de la noticia
function copiarEnlace(url) {
    navigator.clipboard.writeText(url).then(function () {
            // Muestra el pop-up
            var toast = document.getElementById('toast');
            toast.className = 'toast show';
            
            // Oculta el pop-up después de 3 segundos
            setTimeout(function () {
                toast.className = toast.className.replace('show', '');
            }, 2000);
    }, function () {
        alert('Error al copiar el enlace');
    });
}

// Cargar la API de Google Sheets y luego la noticia específica
gapi.load("client", function() {
    var idNoticia = obtenerParametroUrl('id'); // Obtener el ID de la noticia de la URL
    if (idNoticia) {
        cargarNoticiaPorId(idNoticia);
    } else {
        document.getElementById('noticia-completa').innerHTML = '<p>No se ha proporcionado una ID de noticia.</p>';
    }
});
