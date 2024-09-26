// Select the main container and initialize variables
const podcastcards = document.querySelector(".cards");
let podcastcardArray = document.querySelectorAll(".podcastcard"); // Initially set the NodeList
let counterpodcastCard = 0;
let intervalTimePodcastCard = 0;
let autoSlidePodcastCard;

// Function to refresh the NodeList after dynamic changes
function refreshPodcastCards() {
  podcastcardArray = document.querySelectorAll(".podcastcard"); // Refresh the NodeList
}

// Function to update the carousel position
function updatePodcastCarousel() {
  // Refresh NodeList to make sure it's up-to-date
  refreshPodcastCards();

  // Check if there are any podcast cards available
  if (!podcastcardArray.length) {
    console.error("No podcast cards found!");
    return;
  }

  const podcastCardWidth = podcastcardArray[0].clientWidth; // Width of one card
  podcastcards.style.transform = `translateX(${
    -counterpodcastCard * podcastCardWidth
  }px)`; // Move the carousel based on the counter
}

// Function to determine the number of cards to skip based on screen width
function getPodcastCardsToSkip() {
  if (innerWidth > 1300) {
    return 3;
  } else if (innerWidth > 800 && innerWidth <= 1300) {
    return 2;
  } else {
    return 1;
  }
}

// Function to automatically move the cards
// function podcastAutoNextSlide() {
//   const podcastCardsToSkip = getPodcastCardsToSkip();
//   counterpodcastCard =
//     (counterpodcastCard + podcastCardsToSkip) % podcastcardArray.length;
//   updatePodcastCarousel();
// }

// Functions to start, stop, and reset the automatic slide
function startPodcastAutoSlide() {
  autoSlidePodcastCard = setInterval(
    podcastAutoNextSlide,
    intervalTimePodcastCard
  );
}

function stopPodcastAutoSlide() {
  clearInterval(autoSlidePodcastCard);
}

function resetPodcastAutoSlide() {
  stopPodcastAutoSlide();
  startPodcastAutoSlide();
}

// Functionality for the navigation buttons
function jumpPodcastCards(numCards) {
  refreshPodcastCards(); // Refresh NodeList before any jump actions

  if (!podcastcardArray.length) {
    console.error("No podcast cards found!");
    return;
  }

  const podcastCardsToSkip = getPodcastCardsToSkip();
  const podcastTotalCards = podcastcardArray.length;

  // Check bounds when jumping cards
  if (counterpodcastCard === 0 && numCards < 0) {
    counterpodcastCard =
      Math.floor((podcastTotalCards - 1) / podcastCardsToSkip) *
      podcastCardsToSkip;
  } else {
    counterpodcastCard =
      (counterpodcastCard + numCards + podcastTotalCards) % podcastTotalCards;
  }

  updatePodcastCarousel();
}

// Button event listeners for next and previous actions
document.querySelector(".podcastsnext").addEventListener("click", () => {
  stopPodcastAutoSlide();
  const podcastCardsToSkip = getPodcastCardsToSkip();
  jumpPodcastCards(podcastCardsToSkip);
});

document.querySelector(".podcastsprev").addEventListener("click", () => {
  stopPodcastAutoSlide();
  const podcastCardsToSkip = getPodcastCardsToSkip();
  jumpPodcastCards(-podcastCardsToSkip);
  startPodcastAutoSlide();
});

// Update carousel position when the window resizes
window.addEventListener("resize", () => {
  updatePodcastCarousel();
});

// Function to call after adding new podcast cards dynamically
function addNewPodcastCards() {
  // Example code to add new podcast cards dynamically
  // After adding cards, call refreshPodcastCards and update the carousel
  refreshPodcastCards(); // Refresh the NodeList to include new cards
  updatePodcastCarousel(); // Update the carousel position
  startPodcastAutoSlide(); // Start the automatic sliding
}

// Start the automatic slide only after ensuring cards are available
if (podcastcardArray.length) {
  startPodcastAutoSlide();
} else {
  console.warn("Waiting for podcast cards to load...");
  // Optionally, set an interval to check when cards are loaded and then start sliding
}
