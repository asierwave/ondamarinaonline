// Importar Tilt.js
import VanillaTilt from "vanilla-tilt";

// Inicializar Tilt.js en los elementos seleccionados
VanillaTilt.init(document.querySelectorAll(".tilt-box"), {
    max: 25,           // Máximo ángulo de inclinación
    speed: 400,        // Velocidad de la inclinación
    glare: true,       // Habilitar brillo
    "max-glare": 0.5,  // Máximo brillo
});
