// Crea un objeto Howl para el audio
// Crea un objeto Howl para el audio
let miAudio = new Howl({
  src: ["https://servidor40.brlogic.com:7004/live?identifier=ondamarina&source=7621"], // Nueva URL del archivo de audio
  autoplay: false, // No reproducir automáticamente al cargar la página
  loop: false, // No reproducir en bucle
  volume: 1.0 // Volumen del audio (0 a 1)
});
  
  // Obtiene una referencia al botón de imagen por su ID
  let botonFotoplay = document.getElementById('imagen-reproducir-pausar');
  let botonTreintaAtras = document.getElementById ('imagen-treint-atras');
  let botonTreintaAdelante = document.getElementById ('imagen-treint-adelante');
  
  // Variable para realizar un seguimiento del estado de reproducción
  let estaReproduciendo = false;
  
  // Agrega un evento click al botón de imagen para controlar la reproducción/pausa
  botonFotoplay.addEventListener('click', function() {
    if (estaReproduciendo) {
      miAudio.pause(); // Pausa el audio si está reproduciéndose
      botonFotoplay.setAttribute('src', 'Assets/adelante.png'); // Cambia la imagen a "Reproducir"
      estaReproduciendo = false;
    } else {
      miAudio.play(); // Reproduce el audio si está pausado
      botonFotoplay.setAttribute('src', 'Assets/pause.png'); // Cambia la imagen a "Pausar"
      estaReproduciendo = true;
    }
  });
  
  // Evento para detectar cuando se termina la reproducción
  miAudio.on('end', function() {
    botonFotoplay.setAttribute('src', 'Assets/adelante.png'); // Cambia la imagen a "Reproducir" cuando el audio finaliza
    estaReproduciendo = false;
  });
  

// BOTÓN DE RETROCESO 30 SEGUNDOS

// Agrega un manejador de eventos al botón
botonTreintaAtras.addEventListener("click", retroceder30Segundos);

// Función para retroceder 30 segundos
function retroceder30Segundos() {
  var currentPosition = miAudio.seek(); // Obtiene la posición actual
  var newPosition = currentPosition - 10; // Retrocede 10 segundos

  // Asegúrate de que la nueva posición no sea menor que 0
  if (newPosition < 0) {
    newPosition = 0;
  }

  miAudio.seek(newPosition); // Establece la nueva posición
}


// BOTÓN DE ADELANTO 30 SEGUNDOS


// Agrega un manejador de eventos al botón
botonTreintaAdelante.addEventListener("click", adelantar30Segundos);

// Función para adelantar 30 segundos
function adelantar30Segundos() {
  var currentPosition = miAudio.seek(); // Obtiene la posición actual
  var newPosition = currentPosition + 10; // Retrocede 10 segundos

  // Asegúrate de que la nueva posición no sea mayor que 100
  if (newPosition > 100) {
    newPosition = 100;
  } 

  miAudio.seek(newPosition); // Establece la nueva posición
}




  