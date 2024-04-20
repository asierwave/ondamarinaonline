const miAudio = new Audio();
let defaultStreamURL = 'https://servidor40.brlogic.com:7004/live';
miAudio.src = defaultStreamURL;

const iconosPlay = document.querySelectorAll('.iconoplay');
iconosPlay.forEach(iconoPlay => {
  iconoPlay.addEventListener('click', function () {
    const streamURL = this.closest('.programareciente').dataset.streamurl || defaultStreamURL;
    miAudio.src = streamURL;

    // Realiza la solicitud HTTP usando Fetch
    fetch(streamURL)
      .then(response => response.text())
      .then(html => {
        // Utiliza el DOM del navegador para manipular el HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const textoPodcast = doc.getElementById('streamtitle').textContent.trim();
        const descripcionPodcast = doc.getElementById('streamdescription').textContent.trim();

        console.log('Texto del podcast:', textoPodcast);
        console.log('Descripción del podcast:', descripcionPodcast);

        // Continúa con la reproducción de audio o cualquier otra lógica que necesites
        miAudio.play();
      })
      .catch(error => {
        console.error('Error al obtener información del podcast:', error.message);
      });
  });
});

// Resto del código del reproductor de audio...

// Agrega un manejador de eventos para el botón de reproducción/pausa
const botonFotoplay = document.getElementById('imagen-reproducir-pausar');
let estaReproduciendo = false;





botonFotoplay.addEventListener('click', function () {
  if (window.scrollY < 443) {
    if (estaReproduciendo) {
      miAudio.pause(); // Pausa la transmisión si está reproduciéndose
      botonFotoplay.setAttribute('src', 'Assets/playwhite.png'); // Cambia la imagen a "Reproducir"
      estaReproduciendo = false;

  
    } else {
      miAudio.play(); // Reproduce la transmisión si está pausada
      botonFotoplay.setAttribute('src', 'Assets/pausewhite.png'); // Cambia la imagen a "Pausar"
      estaReproduciendo = true;

  }
} else {

  if (estaReproduciendo) {
    miAudio.pause(); // Pausa la transmisión si está reproduciéndose
    botonFotoplay.setAttribute('src', 'Assets/playwhite.png'); // Cambia la imagen a "Reproducir"
    estaReproduciendo = false;


  } else {
    miAudio.play(); // Reproduce la transmisión si está pausada
    botonFotoplay.setAttribute('src', 'Assets/pausewhite.png'); // Cambia la imagen a "Pausar"
    estaReproduciendo = true;

}

}

});


window.addEventListener('scroll', function () {
  // Verificar la posición del scroll
  if (window.scrollY < 443) {
    if (estaReproduciendo) {
      botonFotoplay.setAttribute('src', 'Assets/pausewhite.png'); // Cambia la imagen a "Reproducir"

  
    } else {
      botonFotoplay.setAttribute('src', 'Assets/playwhite.png'); // Cambia la imagen a "Pausar"

  }
  } else {
    
  if (estaReproduciendo) {
    botonFotoplay.setAttribute('src', 'Assets/pausewhite.png'); // Cambia la imagen a "Reproducir"


  } else {
    botonFotoplay.setAttribute('src', 'Assets/playwhite.png'); // Cambia la imagen a "Pausar"

}
  }
});

 
  


// Agrega un manejador de eventos para retroceder 10 segundos
const botonDiezSegundosAtras = document.getElementById('imagen-diez-segundos-atras');
botonDiezSegundosAtras.addEventListener('click', retroceder10Segundos);

function retroceder10Segundos() {
  miAudio.currentTime -= 10; // Retrocede 10 segundos
}

// Agrega un manejador de eventos para volver al último momento cargado en el búfer
const botonEnVivo = document.getElementById('imagen-en-vivo');
botonEnVivo.addEventListener('click', volverAlEnVivo);

function volverAlEnVivo() {
  // Ajusta la implementación según tus necesidades exactas
  // Para volver al último momento cargado en el búfer, simplemente configura la reproducción desde ese momento
  miAudio.currentTime = lastBufferedTime;
  miAudio.play();
}

// Agrega un manejador de eventos para rastrear el último momento cargado en el búfer
miAudio.addEventListener('progress', function () {
  if (miAudio.buffered.length > 0) {
    lastBufferedTime = miAudio.buffered.end(miAudio.buffered.length - 1);
  }
});
 
 
 
 
 //1
 
 
 // // Crea un elemento de audio
  // const miAudio = new Audio();

  // // Configura la fuente de audio predeterminada
  // let defaultStreamURL = 'https://servidor40.brlogic.com:7004/live';
  // miAudio.src = defaultStreamURL;

  // // Manejador de eventos para cada icono de reproducción
  // const iconosPlay = document.querySelectorAll('.iconoplay');
  // iconosPlay.forEach(iconoPlay => {
  //   iconoPlay.addEventListener('click', function () {
  //     // Obtén la URL específica del atributo de datos del grupo actual
  //     const streamURL = this.closest('.programareciente').dataset.streamurl || defaultStreamURL;
  //     // Actualiza el streamURL
  //     miAudio.src = streamURL;
  //     // Reproduce la transmisión
  //     miAudio.play();
  //   });
  // });

  // // Resto del código del reproductor de audio...

  // // Agrega un manejador de eventos para el botón de reproducción/pausa
  // const botonFotoplay = document.getElementById('imagen-reproducir-pausar');
  // let estaReproduciendo = false;

  // botonFotoplay.addEventListener('click', function () {
  //   if (estaReproduciendo) {
  //     miAudio.pause(); // Pausa la transmisión si está reproduciéndose
  //     botonFotoplay.setAttribute('src', 'Assets/adelante.png'); // Cambia la imagen a "Reproducir"
  //     estaReproduciendo = false;
  //   } else {
  //     miAudio.play(); // Reproduce la transmisión si está pausada
  //     botonFotoplay.setAttribute('src', 'Assets/pause.png'); // Cambia la imagen a "Pausar"
  //     estaReproduciendo = true;
  //   }
  // });

  // // Agrega un manejador de eventos para retroceder 10 segundos
  // const botonDiezSegundosAtras = document.getElementById('imagen-diez-segundos-atras');
  // botonDiezSegundosAtras.addEventListener('click', retroceder10Segundos);

  // function retroceder10Segundos() {
  //   miAudio.currentTime -= 10; // Retrocede 10 segundos
  // }

  // // Agrega un manejador de eventos para volver al último momento cargado en el búfer
  // const botonEnVivo = document.getElementById('imagen-en-vivo');
  // botonEnVivo.addEventListener('click', volverAlEnVivo);

  // function volverAlEnVivo() {
  //   // Ajusta la implementación según tus necesidades exactas
  //   // Para volver al último momento cargado en el búfer, simplemente configura la reproducción desde ese momento
  //   miAudio.currentTime = lastBufferedTime;
  //   miAudio.play();
  // }

  // // Agrega un manejador de eventos para rastrear el último momento cargado en el búfer
  // miAudio.addEventListener('progress', function () {
  //   if (miAudio.buffered.length > 0) {
  //     lastBufferedTime = miAudio.buffered.end(miAudio.buffered.length - 1);
  //   }
  // });


//2

// // Crea un elemento de audio
// const miAudio = new Audio();

// // URL de la transmisión en vivo de audio
// const streamURL = 'https://go.ivoox.com/sq/2312714'; // Reemplaza con la URL correcta de la transmisión en vivo

// // Configura la fuente de audio
// miAudio.src = streamURL;

// // Agrega un manejador de eventos para el botón de reproducción/pausa
// const botonFotoplay = document.getElementById('imagen-reproducir-pausar');
// let estaReproduciendo = false;

// botonFotoplay.addEventListener('click', function () {
//   if (estaReproduciendo) {
//     miAudio.pause(); // Pausa la transmisión si está reproduciéndose
//     botonFotoplay.setAttribute('src', 'Assets/adelante.png'); // Cambia la imagen a "Reproducir"
//     estaReproduciendo = false;
//   } else {
//     miAudio.play(); // Reproduce la transmisión si está pausada
//     botonFotoplay.setAttribute('src', 'Assets/pause.png'); // Cambia la imagen a "Pausar"
//     estaReproduciendo = true;
//   }
// });

// // Agrega un manejador de eventos para retroceder 10 segundos
// const botonDiezSegundosAtras = document.getElementById('imagen-diez-segundos-atras');
// botonDiezSegundosAtras.addEventListener('click', retroceder10Segundos);

// function retroceder10Segundos() {
//   miAudio.currentTime -= 10; // Retrocede 10 segundos
// }

// // Agrega un manejador de eventos para volver al último momento cargado en el búfer
// const botonEnVivo = document.getElementById('imagen-en-vivo');
// botonEnVivo.addEventListener('click', volverAlEnVivo);

// function volverAlEnVivo() {
//   // Ajusta la implementación según tus necesidades exactas
//   // Para volver al último momento cargado en el búfer, simplemente configura la reproducción desde ese momento
//   miAudio.currentTime = lastBufferedTime;
//   miAudio.play();
// }

// // Agrega un manejador de eventos para rastrear el último momento cargado en el búfer
// miAudio.addEventListener('progress', function () {
//   if (miAudio.buffered.length > 0) {
//     lastBufferedTime = miAudio.buffered.end(miAudio.buffered.length - 1);
//   }
// });





