// Función para detectar si el navegador es Safari
function esSafari() {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}

// Espera a que el DOM esté completamente cargado
window.addEventListener('load', () => {
    if (!esSafari()) {
        // En Safari, agrega una clase al body
        document.body.classList.add('nosafari');
         // Animación de entrada para el body
         window.addEventListener('load', () => {
         gsap.to('body', {
            opacity: 1,   // Cambia la opacidad a 1 (totalmente visible)
            duration: 2,  // Duración de la animación en segundos
            ease: 'power2.out'  // Tipo de easing para una transición suave
         })
        });
    } else {
        // En otros navegadores, cambia la opacidad a 1
        
    }});




