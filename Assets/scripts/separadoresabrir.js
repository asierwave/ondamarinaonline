document.addEventListener("DOMContentLoaded", function () {
  const tituloseparadores = document.querySelectorAll(".tituloseparador");
  const botonequipo = document.getElementById("botonequipo");
  const containerequipo = document.querySelector(".equipo");

  // Configuración inicial para los contenedores asociados a los títulos
  tituloseparadores.forEach((titulo, index) => {
    const container = titulo.nextElementSibling;
    container.style.maxHeight = "0";
    container.style.overflow = "hidden";
    container.style.transition = "max-height 0.5s ease, padding 0.5s ease";
    container.style.padding = "0 7vw";

    const img = titulo.querySelector("img");
    if (img) {
      img.style.transition = "transform 0.5s ease";
    }

    // Evento para manejar el click sobre los títulos
    titulo.addEventListener("click", function () {
      const isOpen = container.style.maxHeight !== "0px" && container.style.maxHeight !== "";

      // Cerrar todos los contenedores excepto el actual
      tituloseparadores.forEach((otherTitulo) => {
        const otherContainer = otherTitulo.nextElementSibling;
        if (otherContainer !== container) {
          otherContainer.style.maxHeight = "0";
          otherContainer.style.padding = "0 7vw";
          const otherImg = otherTitulo.querySelector("img");
          if (otherImg) {
            otherImg.style.transform = "rotate(0deg)";
          }
        }
      });

      // Abrir o cerrar el contenedor actual
      if (!isOpen) {
        if (index === 0) {
          container.style.maxHeight = `fit-content`;  //Si no, ponerle un `${container.scrollHeight}px`; para que deslice al clickar el botón hasta ese bloque
          container.style.padding = "0 7vw";
        }else{

        container.style.maxHeight = `fit-content`; 
        container.style.padding = "0 7vw";
      }
        if (img) {
          img.style.transform = "rotate(180deg)";
        }
      } else {
        container.style.maxHeight = "0";
        container.style.padding = "0 7vw";
        if (img) {
          img.style.transform = "rotate(0deg)";
        }
      }
    });

    // Abrir el primer y el quinto contenedor al cargar la página (Container PROGRAMAS)
    if (index === 0) {
      container.style.maxHeight = `100%`;
      container.style.padding = "0 7vw";
      if (img) {
        img.style.transform = "rotate(180deg)";
      }

      }
  });

  // Evento para abrir el contenedor en la posición [3] EQUIPO al hacer clic en el botón "equipo"
  botonequipo.addEventListener("click", function () {
    const index = 3; // Posición del contenedor que deseas abrir
    if (index < tituloseparadores.length) {
      const titulo = tituloseparadores[index];
      const container = titulo.nextElementSibling;
      const img = titulo.querySelector("img");

      // Cerrar todos los demás contenedores
      tituloseparadores.forEach((otherTitulo) => {
        const otherContainer = otherTitulo.nextElementSibling;
        otherContainer.style.maxHeight = "0";
        otherContainer.style.padding = "0 7vw";
        const otherImg = otherTitulo.querySelector("img");
        if (otherImg) {
          otherImg.style.transform = "rotate(0deg)";
        }
      });

      // Abrir el contenedor en la posición [3]
      container.style.maxHeight = `${container.scrollHeight}px`;
      container.style.padding = "0 7vw";
      if (img) {
        img.style.transform = "rotate(180deg)";
      }
    }
  });


  
});
