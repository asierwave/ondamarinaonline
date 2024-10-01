// script.js
window.addEventListener("load", function() {
    const loading = document.getElementById('loading');
    const content = document.getElementById('content');

    // Añadir la clase 'hidden' a la pantalla de carga
    loading.classList.add('hidden');
    
    // Añadir la clase 'move-up' al contenido para desplazarlo
    content.classList.add('move-up');
});

