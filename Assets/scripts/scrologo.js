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

    if (innerWidth < 800) {
      rd2.style.top='0';
    } else {
      rd2.style.top='120px';
    }
    


  } else {
    rd2.style.background = '#fafafa';
    directo.style.color = '#2F75A2';
    menuitem.style.color = '#fafafa';
    textocambiante.style.color = '#2F75A2';
    adelante.src = 'Assets/diezblue.png';
    botondirecto.src = 'Assets/iconoplays.png';
    atras.src = 'Assets/backblue.png';
    rd2.style.maxHeight='50px';

    if (innerWidth < 800) {
    rd2.style.top='-65px';
    } else {
    rd2.style.top='120px';
    }

  }
});


