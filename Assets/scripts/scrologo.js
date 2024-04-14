// Función para desplazarse hasta arriba
function scrollToTop() {



  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
var rd2 = document.querySelector('.reproductor');

// Agregar event listener al botón
rd2.addEventListener('click', function() {
  if (window.innerWidth < 800){
  // Llamar a la función scrollToTop cuando se hace clic en el botón
  scrollToTop();
  }
});








  // Definir una función para manejar el cambio en el ancho de la pantalla
function manejarCambioAnchoPantalla() {
  // Obtener el ancho de la pantalla actual
  var anchoPantalla = window.innerWidth;

  // Hacer lo que necesites con el ancho de la pantalla
  console.log("El ancho de la pantalla es: " + anchoPantalla + " píxeles.");
}

// Agregar un event listener para el evento resize
window.addEventListener('resize', function () {
  var rd2 = document.querySelector('.reproductor');

  if (window.innerWidth < 800) {
    rd2.style.top='200px';

    rd2.addEventListener('click', function () {
      scrollPosition= -100;

    });
   

    } else {
    rd2.style.top='120px';

    
    }


  // Llamar a la función manejarCambioAnchoPantalla cada vez que se redimensione la ventana
  manejarCambioAnchoPantalla();
});

// Llamar a la función manejarCambioAnchoPantalla al cargar la página para obtener el ancho inicial de la pantalla
manejarCambioAnchoPantalla();




window.addEventListener('scroll', function() {
  var logo = document.querySelector('#logo');
  var menu = document.querySelector('#menu');
  var rd2 = document.querySelector('.reproductor');
  var directo = document.querySelector('#directo');
  var menuitem = document.querySelector('.submenuitem2');
  var botondirecto = document.querySelector('#botondirecto');
  var textocambiante = document.querySelector('#programaActual');
  var adelante = document.querySelector('#imagen-diez-segundos-atras');
  var atras = document.querySelector('#imagen-en-vivo');
  var hr2 = document.querySelector('header'); 
  var ar2 = document.querySelector('.submenuitem'); 
  var menuCabeza = document.querySelector('.cabeza');


  


  var scrollPosition = window.scrollY;

  if (scrollPosition < 1000) {
    ar2.style.color = '#fafafa';
    logo.src = 'Assets/logowhite.png';
    menu.src = 'Assets/menualtwhite.png';
    hr2.style.background = 'none'; 
    menuCabeza.style.padding= '0 8vw 0 8vw';
    logo.style.scale='1';
    
  } else if (scrollPosition > 1000) {
    ar2.style.color = '#2F75A2';
    logo.src = 'Assets/logonline.png';
    menu.src = 'Assets/menualt.png';
    hr2.style.background = 'linear-gradient(to bottom, #fafafa, transparent)'; // Corregir aquí
    menuCabeza.style.padding= '0 2vw 0 1vw';
    logo.style.scale='0.6';
    
  }


  if (scrollPosition < 900) {
    rd2.style.background = 'none';
    textocambiante.style.color = '#fafafa';
    directo.style.color = '#fafafa';
    menuitem.style.color = '#fafafa';
    adelante.src = 'Assets/10adelantewhite.png';
    botondirecto.src = 'Assets/playwhite.png';
    atras.src = 'Assets/backwhite.png';
    rd2.style.maxHeight='180px';
    botondirecto.style.transform='rotate(90deg)';

    if (window.innerWidth < 800) {
      rd2.style.top='50vh';
    } else {
      rd2.style.top='120px';
    }
    


  } else if (scrollPosition > 900){
    rd2.style.background = '#fafafa';
    directo.style.color = '#2F75A2';
    menuitem.style.color = '#fafafa';
    textocambiante.style.color = '#2F75A2';
    adelante.src = 'Assets/diezblue.png';
    botondirecto.src = 'Assets/iconoplays.png';
    atras.src = 'Assets/backblue.png';
    rd2.style.maxHeight='50px';
    botondirecto.style.transform='rotate(0deg)';


   
  

   



    if (window.innerWidth < 800) {
    rd2.style.top='-65px';

    } else {
    rd2.style.top='120px';
    }

  }



});


