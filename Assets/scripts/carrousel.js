const retocards = document.querySelector('.equipoconjunto');
const retocardsArray = document.querySelectorAll('.equipolocutor');
let counter = 0; // Inicia en 0

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
    jumpCards(1); // Salta hacia adelante
});

// Manejo del botón "anterior"
document.querySelector('.prev').addEventListener('click', () => {
    jumpCards(-1); // Salta hacia atrás
});

// Al cambiar el tamaño de la ventana, actualiza el carrusel
window.addEventListener('resize', () => {
    updateCarousel(); // Actualiza la posición del carrusel
});
