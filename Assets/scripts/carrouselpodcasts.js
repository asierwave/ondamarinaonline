document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed"); // Log para verificar que el DOM está listo

  const podcastcards = document.querySelector(".cards");
  let podcastcardArray = document.querySelectorAll(".podcastcard");
  let counterpodcastCard = 0;
  let intervalTimePodcastCard = 3000; // Tiempo de intervalo para el slide automático
  let autoSlidePodcastCard;

  // Refresca la lista de podcast cards
  function refreshPodcastCards() {
      podcastcardArray = document.querySelectorAll(".podcastcard");
  }

  // Actualiza la posición del carrusel
  function updatePodcastCarousel() {
      refreshPodcastCards(); // Refresca la lista de nodos

      // Verifica si hay tarjetas de podcast disponibles
      if (!podcastcardArray.length) {
          console.error("No podcast cards found!");
          return;
      }

      const podcastCardWidth = podcastcardArray[0].clientWidth; // Ancho de una tarjeta
      podcastcards.style.transform = `translateX(${
          -counterpodcastCard * podcastCardWidth
      }px)`; // Mueve el carrusel basado en el contador
  }

  // Función para determinar el número de tarjetas a saltar basado en el ancho de la pantalla
  function getPodcastCardsToSkip() {
      if (innerWidth > 1300) {
          return 3;
      } else if (innerWidth > 800 && innerWidth <= 1300) {
          return 2;
      } else {
          return 1;
      }
  }

  // Función para saltar a un número específico de tarjetas
  function jumpPodcastCards(numCards) {
      refreshPodcastCards(); // Refresca la lista de tarjetas antes de saltar

      if (!podcastcardArray.length) {
          console.error("No podcast cards found!");
          return;
      }

      const podcastTotalCards = podcastcardArray.length;

      // Verifica los límites al saltar tarjetas
      counterpodcastCard = (counterpodcastCard + numCards + podcastTotalCards) % podcastTotalCards;

      updatePodcastCarousel();
  }

  // Iniciar el deslizamiento automático
  function startPodcastAutoSlide() {
      autoSlidePodcastCard = setInterval(
          podcastAutoNextSlide,
          intervalTimePodcastCard
      );
  }

  // Detener el deslizamiento automático
  function stopPodcastAutoSlide() {
      clearInterval(autoSlidePodcastCard);
  }

  // Ir a una tarjeta específica basada en el botón clicado
  function goToPodcastCard(button) {
      stopPodcastAutoSlide(); // Detiene el desplazamiento automático
      refreshPodcastCards(); // Refresca la lista de tarjetas

      const closestCard = button.closest(".podcastcard");
      if (!closestCard) {
          console.error("No closest podcast card found!");
          return;
      }

      const index = Array.from(podcastcardArray).indexOf(closestCard);
      console.log("Index of clicked card:", index);

      if (index < 0 || index >= podcastcardArray.length) {
          console.error("Index out of bounds");
          return;
      }

      counterpodcastCard = index; // Cambia el contador a la posición del botón
      updatePodcastCarousel();

      // Cerrar otras tarjetas abiertas
      podcastcardArray.forEach(card => {
          if (card !== closestCard) {
              card.classList.remove("open"); // Asegúrate de tener una clase para ocultar
          } else {
              card.classList.toggle("open"); // Abre la tarjeta clicada
          }
      });
  }

  // Delegación de eventos para botones
  podcastcards.addEventListener("click", (event) => {
      if (event.target.closest(".masprogramasrecientes")) {
          console.log("Mas programas recientes button clicked!"); // Log para el botón de programas recientes
          goToPodcastCard(event.target); // Pasa el botón clicado a la función
      }
  });

  // Eventos para los botones de siguiente y anterior
  document.querySelector(".podcastsnext").addEventListener("click", () => {
      console.log("Next button clicked!"); // Log para el botón siguiente
      stopPodcastAutoSlide();
      const podcastCardsToSkip = getPodcastCardsToSkip();
      jumpPodcastCards(podcastCardsToSkip);
  });

  document.querySelector(".podcastsprev").addEventListener("click", () => {
      console.log("Previous button clicked!"); // Log para el botón anterior
      stopPodcastAutoSlide();
      const podcastCardsToSkip = getPodcastCardsToSkip();
      jumpPodcastCards(-podcastCardsToSkip);
      startPodcastAutoSlide();
  });

  // Actualiza la posición del carrusel al redimensionar la ventana
  window.addEventListener("resize", () => {
      updatePodcastCarousel();
  });

  // Función para llamar después de agregar nuevas tarjetas de podcast dinámicamente
  function addNewPodcastCards() {
      refreshPodcastCards(); // Refresca la lista de tarjetas para incluir nuevas
      updatePodcastCarousel(); // Actualiza la posición del carrusel
      startPodcastAutoSlide(); // Inicia el deslizamiento automático
  }

  // Iniciar el deslizamiento automático solo si hay tarjetas disponibles
  if (podcastcardArray.length) {
      startPodcastAutoSlide();

}
}
);
