document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");

  const podcastcards = document.querySelector(".podcastCards");
  let podcastcardArray = document.querySelectorAll(".podcastCard");
  let counterpodcastCard = 0;
  const intervalTimePodcastCard = 3000;
  let autoSlidePodcastCard;

  // Refresca la lista de podcast cards
  const refreshPodcastCards = () => {
      podcastcardArray = document.querySelectorAll(".podcastCard");
  };

  // Actualiza el contenido del botón masprogramasrecientes
  const updateButtonContent = (button, isOpen) => {
      const iconRotation = isOpen ? "-180deg" : "0deg";
      const buttonText = isOpen ? "CERRAR PROGRAMAS RECIENTES" : "PROGRAMAS RECIENTES";
      button.innerHTML = `
          <img class="cardreproducirultimoprogramaimg" 
               src="Assets/playicon.png" 
               style="transform: rotate(${iconRotation}); width: 30px; height: auto; margin-right: 10px; margin-top: 2px; border-radius: 0; padding: 0; background-color: transparent; overflow: visible;" 
               alt="Boton reproducir ultimo episodio">
          <h3 class="masprogramasrecientestexto">${buttonText}</h3>`;
  };

  // Cerrar todos los grupos de programas recientes
  const closeAllProgramasRecientes = () => {
      podcastcardArray.forEach(card => {
          const btnMasProgramas = card.querySelector(".masprogramasrecientes");
          const programasRecientes = card.querySelector(".episodes-container");

          card.classList.remove("open");
          if (btnMasProgramas) updateButtonContent(btnMasProgramas, false);
          if (programasRecientes) {
              programasRecientes.style.display = 'none';
              programasRecientes.style.maxWidth = '0';
          }
      });
  };

  const goToPodcastCard = (button) => {
      const closestCard = button.closest(".podcastcard");
      const programasRecientes = closestCard.querySelector(".episodes-container");

      // Obtener el índice de la tarjeta seleccionada
      const cardIndex = Array.from(podcastcardArray).indexOf(closestCard);

      // Mover el carrusel a la tarjeta seleccionada
      counterpodcastCard = cardIndex;
      updatePodcastCarousel();  // Desplazar el carrusel a la tarjeta

      // Si el contenedor está abierto, cerrarlo
      if (closestCard.classList.contains("open")) {
          closestCard.classList.remove("open");
          updateButtonContent(button, false);
          programasRecientes.style.display = 'none';
          programasRecientes.style.maxWidth = '0';
          pauseAllEpisodesOnClose();
      } else {
          // Cerrar todos los demás
          closeAllProgramasRecientes();

          // Abrir el contenedor actual
          closestCard.classList.add("open");
          updateButtonContent(button, true);
          programasRecientes.style.display = 'block';  // Mostrar el contenedor
          programasRecientes.style.maxWidth = '100%';  // Ajustar el max-width
      }
  };

  podcastcards.addEventListener("click", (event) => {
      const button = event.target.closest(".masprogramasrecientes");
      if (button) {
          goToPodcastCard(button);
      }
  });

  // Código para manejar el carrusel y el desplazamiento
  const jumpPodcastCards = (numCards) => {
      refreshPodcastCards();
      const podcastTotalCards = podcastcardArray.length;
      counterpodcastCard = (counterpodcastCard + numCards + podcastTotalCards) % podcastTotalCards;
      updatePodcastCarousel();
  };

  const updatePodcastCarousel = () => {
      refreshPodcastCards();
      if (!podcastcardArray.length) return;
      const podcastCardWidth = podcastcardArray[0].clientWidth;
      podcastcards.style.transform = `translateX(${-counterpodcastCard * podcastCardWidth}px)`;
  };

  document.querySelector(".podcastsnext").addEventListener("click", () => {
      stopPodcastAutoSlide();
      closeAllProgramasRecientes();
      jumpPodcastCards(getPodcastCardsToSkip());
      pauseAllEpisodesOnClose();
  });

  document.querySelector(".podcastsprev").addEventListener("click", () => {
      stopPodcastAutoSlide();
      closeAllProgramasRecientes();
      jumpPodcastCards(-getPodcastCardsToSkip());
      pauseAllEpisodesOnClose();
  });

  window.addEventListener("resize", updatePodcastCarousel);

  // Lógica de auto-slide (opcional)
  const startPodcastAutoSlide = () => {
      autoSlidePodcastCard = setInterval(podcastAutoNextSlide, intervalTimePodcastCard);
  };

  const stopPodcastAutoSlide = () => {
      clearInterval(autoSlidePodcastCard);
  };

  const getPodcastCardsToSkip = () => {
      return innerWidth > 1300 ? 3 : innerWidth > 800 ? 2 : 1;
  };

  if (podcastcardArray.length) {
      startPodcastAutoSlide();
  }

  // Funcionalidad de deslizamiento
  let startX;

  podcastcards.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX; // Guardar la posición inicial del toque
  });

  podcastcards.addEventListener("touchmove", (e) => {
      const currentX = e.touches[0].clientX; // Obtener la posición actual del toque
      const diffX = startX - currentX; // Calcular la diferencia

      // Deslizar hacia la izquierda
      if (diffX > 50) {
          e.preventDefault(); // Evitar el comportamiento predeterminado
          stopPodcastAutoSlide();
          closeAllProgramasRecientes();
          jumpPodcastCards(getPodcastCardsToSkip());
          startX = currentX; // Actualizar la posición inicial
      }
      // Deslizar hacia la derecha
      else if (diffX < -50) {
          e.preventDefault(); // Evitar el comportamiento predeterminado
          stopPodcastAutoSlide();
          closeAllProgramasRecientes();
          jumpPodcastCards(-getPodcastCardsToSkip());
          startX = currentX; // Actualizar la posición inicial
      }
  });

  // Prevenir el comportamiento predeterminado del deslizamiento vertical
  podcastcards.addEventListener("touchend", (e) => {
      // Aquí no necesitas llamar a e.preventDefault(), ya que el comportamiento ya está controlado en touchmove.
  });
});
