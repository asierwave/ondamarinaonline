// Detectar si es Safari
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

if (isSafari) {
    // Si es Safari, usar DOMContentLoaded y añadir un retraso de 2 segundos
    document.addEventListener("DOMContentLoaded", function() {
        const loading = document.getElementById('loading');
        const content = document.getElementById('content');

        // Añadir un retraso de 2 segundos
        setTimeout(function() {
            loading.classList.add('hidden');
            content.classList.add('move-up');
        }, 2000);  // 2000ms = 2 segundos
    });
} else {
    // Para otros navegadores, usar el evento load
    window.addEventListener("load", function() {
        const loading = document.getElementById('loading');
        const content = document.getElementById('content');

        // Añadir un pequeño retardo para asegurarse de que la animación se dispara correctamente
        setTimeout(function() {
            loading.classList.add('hidden');
            content.classList.add('move-up');
        }, 100);  // Ajusta el tiempo si es necesario
    });
}
