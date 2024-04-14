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
  
  
  rd2.addEventListener('click', function () {
    scrollToTop();
  });
 

  if (window.innerWidth < 800) {
    rd2.style.top='400px';
    rd2.style.width='60vw';

  
    } else {
    rd2.style.top='120px';
    rd2.style.width='100vw';

    
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

  if (scrollPosition < 280) {
    ar2.style.color = '#fafafa';
    logo.src = 'Assets/logowhite.png';
    menu.src = 'Assets/menualtwhite.png';
    hr2.style.backgroundColor = 'transparent'; // Corregir aquí
    menuCabeza.style.padding= '0 8vw 0 8vw';
    logo.style.scale='1';
    directo.style.opacity='100';

    
  } else if (scrollPosition > 280) {
    ar2.style.color = '#2F75A2';
    logo.src = 'Assets/logonline.png';
    menu.src = 'Assets/menualt.png';
    hr2.style.backgroundColor = 'transparent'; // Corregir aquí
    menuCabeza.style.padding= '0 2vw 0 1vw';
    logo.style.scale='0.6';

    if (window.innerWidth > 800) {
      rd2.style.top='0px';
      rd2.style.width='8vw';
      directo.style.opacity='0';
      rd2.style.boxShadow='0 4px 8px 0 rgba(0,0,0,0.2)';

    } else {
      rd2.style.top='-65px';
      rd2.style.width='60vw';
      rd2.style.boxShadow='0 4px 8px 0 rgba(0,0,0,0.2)';

    }
    
  }


  if (scrollPosition < 280) {
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
      rd2.style.top='350px';
      rd2.style.boxShadow='0 4px 8px 0 rgba(0,0,0,0.2)';
      rd2.style.width='60vw';

    } else {
      rd2.style.top='120px';
      rd2.style.width='100vw';
      rd2.style.boxShadow='0 4px 8px 0 rgba(0,0,0,0.2)';

    }
    


  } else if (scrollPosition > 280){
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
    rd2.style.boxShadow='0 4px 8px 0 rgba(0,0,0,0.2)';
    rd2.style.width='60vw';
    rd2.style.background = '#fafafa';





    } else {
    rd2.style.top='120px';
    rd2.style.boxShadow = '0 0 0 0';
    rd2.style.background = 'transparent';


    

    }

  }



});


