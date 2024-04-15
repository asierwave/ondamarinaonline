// Función para desplazarse hasta arriba
function scrollToTop() {

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}


var rd2 = document.querySelector('.reproductor');
var hr2 = document.querySelector('header'); 

var quienesSomos = document.querySelector ('.quienesomos');
var botondirecto = document.querySelector('#botondirecto');


// Agregar event listener al botón
rd2.addEventListener('click', function() {

  // Llamar a la función scrollToTop cuando se hace clic en el botón
  scrollToTop();
  
//




//Si la pantalla es menor de 800, movil, al cargar

  if (window.innerWidth < 800) {
    rd2.style.top='350px';
    rd2.style.width='70vw';



    quienesSomos.style.marginBottom= '0';



//Si la pantalla es mayor de 800, desktop, al cargar
    } else {
    rd2.style.top='120px';
    rd2.style.width='70vw';
    botondirecto.style.transform='rotate(90deg)';
    hr2.style.background = 'transparent';



    
    }

});



window.addEventListener('scroll', function() {
  var scrollPosition = window.scrollY;

  console.log (scrollPosition);

  var logo = document.querySelector('#logo');
  var menu = document.querySelector('#menu');
  var directo = document.querySelector('#directo');
  var menuitem = document.querySelector('.submenuitem2');
  var botondirecto = document.querySelector('#botondirecto');
  var textocambiante = document.querySelector('#programaActual');
  var adelante = document.querySelector('#imagen-diez-segundos-atras');
  var atras = document.querySelector('#imagen-en-vivo');
  var hr2 = document.querySelector('header'); 
  var ar2 = document.querySelector('.submenuitem'); 
  var menuCabeza = document.querySelector('.cabeza');
  var quienesSomos = document.querySelector ('.quienesomos');

  var rd2 = document.querySelector('.reproductor');


  //Si estamos en una posición de scroll superior

  if (scrollPosition < 443) {
    ar2.style.color = '#fafafa';
    logo.src = 'Assets/logowhite.png';
    menu.src = 'Assets/menualtwhite.png';
    hr2.style.backgroundColor = 'transparent'; // Corregir aquí
    menuCabeza.style.padding= '0 8vw 0 8vw';
    logo.style.scale='1';
    directo.style.opacity='100';
    rd2.style.background = 'none';
    textocambiante.style.color = '#fafafa';
    directo.style.color = '#fafafa';
    menuitem.style.color = '#fafafa';
    adelante.src = 'Assets/10adelantewhite.png';
    botondirecto.src = 'Assets/playwhite.png';
    atras.src = 'Assets/backwhite.png';

    //Posición de scroll superior y pantalla movil

    if (window.innerWidth < 800) {
      rd2.style.top='350px';
      rd2.style.boxShadow='0 4px 8px 0 rgba(0,0,0,0.2)';
      rd2.style.width='70vw';
      rd2.style.maxHeight='160px';
      hr2.style.background = 'transparent';


      botondirecto.style.transform='rotate(90deg)';

      quienesSomos.style.marginBottom= '0';




  
      //Posición de scroll superior y pantalla desktop

    } else {
      rd2.style.top='120px';
      rd2.style.width='70vw';
      rd2.style.boxShadow='0 4px 8px 0 rgba(0,0,0,0.2)';
      botondirecto.style.transform='rotate(0deg)';
      rd2.style.maxHeight='40px';
      quienesSomos.style.marginBottom= '-10vh';
      hr2.style.background = 'transparent';




    }
    

    //Posición de scroll inferior

  } else if (scrollPosition > 443) {
    ar2.style.color = '#2F75A2';
    logo.src = 'Assets/logonline.png';
    menu.src = 'Assets/menualt.png';
    menuCabeza.style.padding= '0 2vw 0 1vw';
    logo.style.scale='0.6';
    directo.style.color = '#2F75A2';
    menuitem.style.color = '#fafafa';
    textocambiante.style.color = '#2F75A2';
    adelante.src = 'Assets/diezblue.png';
    botondirecto.src = 'Assets/iconoplays.png';
    atras.src = 'Assets/backblue.png';
    rd2.style.maxHeight='40px';
    
//Posición de scroll inferior y tamaño de pantalla movil

    if (window.innerWidth < 800) {
    rd2.style.top='-65px';
    rd2.style.boxShadow='0 0 0 0 rgba(0,0,0,0)';
    rd2.style.width='70vw';
    rd2.style.background = '#fafafa';
    directo.style.opacity='100';
    botondirecto.style.transform='rotate(0deg)';
    hr2.style.background = 'linear-gradient(180deg, rgba(250,250,250,1) 54%, rgba(250,250,250,0) 38%)';

    quienesSomos.style.marginBottom= '-35vh';





//Posición de scroll inferior y tamaño pantalla desktop

    } else {
    rd2.style.top='120px';
    rd2.style.boxShadow = '0 0 0 0';
    rd2.style.background = '#fafafa';
    rd2.style.width='6vw';
    rd2.style.top='120px';
    directo.style.opacity='0';
    rd2.style.boxShadow='0 4px 8px 0 rgba(0,0,0,0.2)';
    botondirecto.style.transform='rotate(0deg)';
    hr2.style.background = 'linear-gradient(180deg, rgba(250,250,250,1) 84%, rgba(250,250,250,0) 38%)';

    
  }


}



});


