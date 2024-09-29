const retocards = document.querySelector('.equipoconjunto');
const retocardsArray = document.querySelectorAll('.equipolocutor');
let counter = 0; // Inicia en 0
let intervalTime = 20000; // Intervalo para el auto-slide
let autoSlide;
// Función para actualizar la posición del carrusel
function updateCarousel() {
    const cardWidth = retocardsArray[0].clientWidth; // Ancho de una tarjeta
    retocards.style.transition = "transform 0.5s ease-in-out"; // Transición suave
    retocards.style.transform = `translateX(${-counter * cardWidth}px)`; // Mover el carrusel
}

// Función para determinar cuántas tarjetas saltar según el ancho de la pantalla
function getCardsToSkip() {
    if (window.innerWidth > 1300) {
        return 4; // Salta solo 4 tarjetas
    } else if (window.innerWidth > 800 && window.innerWidth <= 1300) {
        return 3; // Ajuste para pantallas medianas
    } else {
        return 1; // Ajuste para pantallas pequeñas
    }
}

// Función para mover automáticamente las tarjetas
function autoNextSlide() {
    const cardsToSkip = getCardsToSkip();
    counter += cardsToSkip;
    if (counter >= retocardsArray.length - cardsToSkip) { // Si se supera el total, vuelve al inicio
        counter = 0;
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

// Cambia el contador de tarjetas al saltar manualmente (con botones)
function jumpCards(numCards) {
    const cardsToSkip = getCardsToSkip(); // Cuántas tarjetas saltar
    counter += numCards * cardsToSkip;

    // Asegúrate de que el contador esté dentro de los límites
    if (counter < 0) {
        // Si está en la primera posición, envía al final
        counter = retocardsArray.length - Math.ceil(cardsToSkip); // Va a la última posición visible
    } else if (counter >= retocardsArray.length) {
        // Si está en la última posición, vuelve al principio
        counter = 0;
    }

    updateCarousel();
}

// Manejo del botón "siguiente"
document.querySelector('.next').addEventListener('click', () => {
    stopAutoSlide();  // Detiene el movimiento automático
    jumpCards(1);     // Salta hacia adelante
    setTimeout(startAutoSlide, 500); // Reinicia el auto-slide después de un pequeño retraso
});

// Manejo del botón "anterior"
document.querySelector('.prev').addEventListener('click', () => {
    stopAutoSlide();  // Detiene el movimiento automático
    jumpCards(-1);    // Salta hacia atrás
    setTimeout(startAutoSlide, 500); // Reinicia el auto-slide después de un pequeño retraso
});

// Al cambiar el tamaño de la ventana, actualiza el carrusel
window.addEventListener('resize', () => {
    updateCarousel(); // Actualiza la posición del carrusel
});

// Inicia el auto-slide
startAutoSlide();
