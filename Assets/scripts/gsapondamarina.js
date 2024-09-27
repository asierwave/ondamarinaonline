 // Espera a que el DOM esté completamente cargado
 window.addEventListener('load', () => {
    // Animación de entrada para el body
    gsap.to('body', {
        opacity: 1,   // Cambia la opacidad a 1 (totalmente visible)
        duration: 2,  // Duración de la animación en segundos
        ease: 'power2.out'  // Tipo de easing para una transición suave
    });
});