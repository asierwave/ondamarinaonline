const miAudio = new Audio();
let defaultStreamURL = 'https://servidor40.brlogic.com:7004/live';
miAudio.src = defaultStreamURL;

const iconosPlay = document.querySelectorAll('.iconoplay');
iconosPlay.forEach(iconoPlay => {
  iconoPlay.addEventListener('click', function () {
    const streamURL = this.closest('.programareciente').dataset.streamurl || defaultStreamURL;
    miAudio.src = streamURL;

    fetch(streamURL)
      .then(response => response.text())
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const textoPodcast = doc.getElementById('streamtitle').textContent.trim();
        const descripcionPodcast = doc.getElementById('streamdescription').textContent.trim();

        console.log('Texto del podcast:', textoPodcast);
        console.log('Descripción del podcast:', descripcionPodcast);

        miAudio.play();
      })
      .catch(error => {
        console.error('Error al obtener información del podcast:', error.message);
      });
  });
});

const botonFotoplay = document.getElementById('imagen-reproducir-pausar');
let estaReproduciendo = false;

botonFotoplay.addEventListener('click', function () {
  if (miAudio.paused) {
    miAudio.play();
    estaReproduciendo = true;
  } else {
    miAudio.pause();
    estaReproduciendo = false;
  }
  actualizarEstadoReproduccion(estaReproduciendo); // Actualiza el estado de reproducción
});

window.addEventListener('scroll', function () {
  actualizarEstadoReproduccion(estaReproduciendo);
});

const botonDiezSegundosAtras = document.getElementById('imagen-diez-segundos-atras');
botonDiezSegundosAtras.addEventListener('click', function() {
  miAudio.currentTime -= 10;
});

const botonEnVivo = document.getElementById('imagen-en-vivo');
botonEnVivo.addEventListener('click', function() {
  miAudio.currentTime = lastBufferedTime;
  miAudio.play();
});

let lastBufferedTime = 0;
miAudio.addEventListener('progress', function () {
  if (miAudio.buffered.length > 0) {
    lastBufferedTime = miAudio.buffered.end(miAudio.buffered.length - 1);
  }
});

miAudio.addEventListener('timeupdate', function () {
  actualizarEstadoReproduccion(!miAudio.paused);
});

function actualizarEstadoReproduccion(estaReproduciendo) {
  if (estaReproduciendo) {
    botonFotoplay.setAttribute('src', 'Assets/pausewhite.png');
  } else {
    botonFotoplay.setAttribute('src', 'Assets/playwhite.png');
  }
}
