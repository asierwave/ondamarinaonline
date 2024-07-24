document.addEventListener('DOMContentLoaded', function() {
    const tituloseparadores = document.querySelectorAll('.tituloseparador');
    const botonequipo = document.getElementById('botonequipo');
    const containerequipo = document.getElementById('containerequipo');

    tituloseparadores.forEach(titulo => {
        const container = titulo.nextElementSibling;
        container.style.maxHeight = '0';
        container.style.padding = '0 7vw';
        container.style.overflow = 'hidden';
        container.style.transition = 'max-height 0.5s ease-in-out, padding 0.5s ease-in-out';
        container.style.boxSizing = 'border-box'; // Asegúrate de que el padding se tenga en cuenta

        const img = titulo.querySelector('img');
        if (img) {
            img.style.transition = 'transform 0.5s ease-in-out';
        }

        titulo.addEventListener('click', function() {
            const isOpen = container.style.maxHeight !== '0px' && container.style.maxHeight !== '';

            // Cerrar todos los contenedores abiertos
            document.querySelectorAll('.tituloseparador').forEach(otherTitulo => {
                const otherContainer = otherTitulo.nextElementSibling;
                if (otherContainer !== container) {
                    otherContainer.style.maxHeight = '0';
                    otherContainer.style.padding = '0 7vw';
                    const otherImg = otherTitulo.querySelector('img');
                    if (otherImg) {
                        otherImg.style.transform = 'rotate(0deg)';
                    }
                }
            });

            // Manejo de la apertura/cierre del contenedor actual
            if (!isOpen) {
                // Primero aseguramos que el contenedor esté a la altura inicial para calcular correctamente
                container.style.maxHeight = container.scrollHeight + 'px';
                // Luego se ajusta el padding con retraso para la animación fluida
                setTimeout(() => {
                    container.style.padding = '0 7vw';
                }, 0); // Retraso para la transición de padding
                if (img) {
                    img.style.transform = 'rotate(180deg)';
                }
            } else {
                // Primero aseguramos que el padding se colapse para evitar problemas de animación
                container.style.padding = '0 7vw';
                // Luego se cierra el contenedor
                setTimeout(() => {
                    container.style.maxHeight = '0';
                }, 0); // Retraso para la transición de max-height
                if (img) {
                    img.style.transform = 'rotate(0deg)';
                }
            }
        });
    });

    // Función para abrir el contenedor 'containerequipo'
    if (botonequipo && containerequipo) {
        botonequipo.addEventListener('click', function() {
            // Aseguramos que el contenedor esté a la altura inicial para calcular correctamente
            containerequipo.style.maxHeight = containerequipo.scrollHeight + 'px';
            // Ajustamos el padding con retraso para la animación fluida
            setTimeout(() => {
                containerequipo.style.padding = '0 6vw';
            }, 0); // Retraso para la transición de padding
        });
    }
});
