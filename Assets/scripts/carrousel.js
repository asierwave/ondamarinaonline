const retocards = document.querySelector('.equipoconjunto');
const retocardsArray = document.querySelectorAll('.equipolocutor');
let counter = 0; // Inicia en 0
let intervalTime = 5000; // Intervalo para el auto-slide
let autoSlide;

// Función para actualizar la posición del carrusel
function updateCarousel() {
    const cardWidth = retocardsArray[0].clientWidth; // Ancho de una tarjeta
    retocards.style.transform = `translateX(${-counter * cardWidth}px)`; // Mover el carrusel
}

// Función para determinar cuántas tarjetas saltar según el ancho de la pantalla
function getCardsToSkip() {
    if (window.innerWidth > 1300) {
        return 4; // Ajustado para que salte solo 2 tarjetas
    } else if (window.innerWidth > 800 && window.innerWidth <= 1300) {
        return 3; // Puedes ajustar esto también si lo deseas
    } else {
        return 1;
    }
}

// Función para mover automáticamente las tarjetas
function autoNextSlide() {
    const cardsToSkip = getCardsToSkip();
    counter += cardsToSkip; // Aumenta el contador
    if (counter >= retocardsArray.length) { // Si se supera el total
        counter = 0; // Vuelve al principio
    }
    updateCarousel();
}

// Inicia el movimiento automático
function startAutoSlide() {
    autoSlide = setInterval(autoNextSlide, intervalTime);
}

// Detiene el movimiento automático
function stopAutoSlide() {
    clearInterval(autoSlide);
}

// Cambia el contador de tarjetas al saltar
function jumpCards(numCards) {
    const cardsToSkip = getCardsToSkip(); // Obtiene cuántas tarjetas saltar
    counter += numCards * cardsToSkip; // Ajusta el contador según los saltos

    // Asegúrate de que el contador esté dentro de los límites
    if (counter < 0) {
        counter = retocardsArray.length - 1; // Va al final si es negativo
    } else if (counter >= retocardsArray.length) {
        counter = 0; // Vuelve al principio si se supera el total
    }

    updateCarousel();
}

// Manejo del botón "siguiente"
document.querySelector('.next').addEventListener('click', () => {
    stopAutoSlide();  // Detiene el movimiento automático
    jumpCards(1);     // Salta hacia adelante
});

// Manejo del botón "anterior"
document.querySelector('.prev').addEventListener('click', () => {
    stopAutoSlide();  // Detiene el movimiento automático
    jumpCards(-1);    // Salta hacia atrás
    startAutoSlide(); // Reinicia el movimiento automático
});

// Al cambiar el tamaño de la ventana, actualiza el carrusel
window.addEventListener('resize', () => {
    updateCarousel(); // Actualiza la posición del carrusel
});

// Inicia el auto-slide
startAutoSlide();
