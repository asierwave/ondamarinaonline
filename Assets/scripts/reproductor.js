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
    actualizarSliderBuffer();
  }
});

miAudio.addEventListener('timeupdate', function () {
  actualizarSliderTiempo();
});

const audioSlider = document.getElementById('audio-slider');

// Variable para almacenar la última posición de reproducción
let lastSeekTime = 0;

// Event listener para el slider de audio
audioSlider.addEventListener('input', function () {
  const seekTime = parseFloat(audioSlider.value);

  // Restringir el movimiento del slider según el tiempo bufferizado y el tiempo actual del audio
  if (seekTime > lastBufferedTime) {
    audioSlider.value = lastBufferedTime;
  } else if (seekTime > miAudio.currentTime) {
    audioSlider.value = miAudio.currentTime;
  }

  lastSeekTime = parseFloat(audioSlider.value); // Guarda la última posición de reproducción

  // Si el audio no está en pausa, reanuda la reproducción después de cambiar la posición
  if (!miAudio.paused) {
    miAudio.pause(); // Pausa el audio antes de cambiar la posición
  }
  miAudio.currentTime = lastSeekTime;
  miAudio.play(); // Reanuda la reproducción desde la nueva posición
});

function actualizarSliderBuffer() {
  const duration = miAudio.duration;

  // Limitar el buffer máximo a la duración del audio
  if (lastBufferedTime > duration) {
    lastBufferedTime = duration;
  }

  audioSlider.max = lastBufferedTime;
  audioSlider.value = miAudio.currentTime;
}

function actualizarSliderTiempo() {
  const currentTime = miAudio.currentTime;

  // Actualiza el slider solo si no se está cambiando manualmente (seeking)
  if (!audioSlider.getAttribute('seeking')) {
    audioSlider.value = currentTime;
  }

  actualizarEstadoReproduccion(!miAudio.paused);
}

function actualizarEstadoReproduccion(estaReproduciendo) {
  if (estaReproduciendo) {
    botonFotoplay.setAttribute('src', 'Assets/pausewhite.png');
  } else {
    botonFotoplay.setAttribute('src', 'Assets/playwhite.png');
  }
}


function actualizarSliderBuffer() {
  const duration = miAudio.duration;
  let bufferProgress = 0;

  if (lastBufferedTime > 0 && duration > 0) {
    bufferProgress = (lastBufferedTime / duration) * 100;
  }

  // Actualiza el ancho del elemento de progreso del buffer
  const bufferProgressBar = document.getElementById('buffer-progress');
  bufferProgressBar.style.width = `${bufferProgress}%`;
}
