document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");

  const podcastcards = document.querySelector(".cards");
  let podcastcardArray = document.querySelectorAll(".podcastcard");
  let counterpodcastCard = 0;
  let intervalTimePodcastCard = 3000;
  let autoSlidePodcastCard;

  // Refresca la lista de podcast cards
  function refreshPodcastCards() {
      podcastcardArray = document.querySelectorAll(".podcastcard");
  }

  // Cerrar todos los grupos de programas recientes y ajustar el estilo de podcastcard
  function closeAllProgramasRecientes() {
      podcastcardArray.forEach(card => {
          const programasRecientes = card.querySelector(".programasrecientes");
          if (programasRecientes) {
              programasRecientes.style.display = 'none';
              programasRecientes.style.maxWidth = '0';
          }
          // Cambiar estilo de podcastcard a max-width: fit-content
          card.style.maxWidth = 'fit-content'; 
      });
  }

  // Actualiza la posición del carrusel
  function updatePodcastCarousel() {
      refreshPodcastCards();

      if (!podcastcardArray.length) {
          console.error("No podcast cards found!");
          return;
      }

      const podcastCardWidth = podcastcardArray[0].clientWidth;
      podcastcards.style.transform = `translateX(${
          -counterpodcastCard * podcastCardWidth
      }px)`;
  }

  function getPodcastCardsToSkip() {
      if (innerWidth > 1300) {
          return 3;
      } else if (innerWidth > 800 && innerWidth <= 1300) {
          return 2;
      } else {
          return 1;
      }
  }

  function jumpPodcastCards(numCards) {
      refreshPodcastCards();

      if (!podcastcardArray.length) {
          console.error("No podcast cards found!");
          return;
      }

      const podcastTotalCards = podcastcardArray.length;
      counterpodcastCard = (counterpodcastCard + numCards + podcastTotalCards) % podcastTotalCards;
      updatePodcastCarousel();
  }

  function startPodcastAutoSlide() {
      autoSlidePodcastCard = setInterval(
          podcastAutoNextSlide,
          intervalTimePodcastCard
      );
  }

  function stopPodcastAutoSlide() {
      clearInterval(autoSlidePodcastCard);
  }

  function goToPodcastCard(button) {
      stopPodcastAutoSlide();
      refreshPodcastCards();

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

      counterpodcastCard = index;
      updatePodcastCarousel();

      podcastcardArray.forEach(card => {
          if (card !== closestCard) {
              card.classList.remove("open");
          } else {
              card.classList.toggle("open");
          }
      });
  }

  podcastcards.addEventListener("click", (event) => {
      if (event.target.closest(".masprogramasrecientes")) {
          console.log("Mas programas recientes button clicked!");
          goToPodcastCard(event.target);
      }
  });

  document.querySelector(".podcastsnext").addEventListener("click", () => {
      console.log("Next button clicked!");
      stopPodcastAutoSlide();
      closeAllProgramasRecientes(); // Cerrar todos los programas recientes y ajustar estilo
      const podcastCardsToSkip = getPodcastCardsToSkip();
      jumpPodcastCards(podcastCardsToSkip);
  });

  document.querySelector(".podcastsprev").addEventListener("click", () => {
      console.log("Previous button clicked!");
      stopPodcastAutoSlide();
      closeAllProgramasRecientes(); // Cerrar todos los programas recientes y ajustar estilo
      const podcastCardsToSkip = getPodcastCardsToSkip();
      jumpPodcastCards(-podcastCardsToSkip);
  });

  window.addEventListener("resize", () => {
      updatePodcastCarousel();
  });

  function addNewPodcastCards() {
      refreshPodcastCards();
      updatePodcastCarousel();
      startPodcastAutoSlide();
  }

  if (podcastcardArray.length) {
      startPodcastAutoSlide();
  }
});
