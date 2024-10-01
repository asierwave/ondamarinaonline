const clientId = 'daca5776ab0641a1bd7cb99522b12660';
const clientSecret = 'fc7ee7bb61114819a6605e320f57b569';

let cachedToken = null;
let tokenExpiryTime = null;

// Función para obtener el token de acceso desde Spotify API
async function getAccessToken(clientId, clientSecret) {
    // Check if the token is cached and still valid
    if (cachedToken && tokenExpiryTime && Date.now() < tokenExpiryTime) {
        return cachedToken;
    }

    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'
        });

        if (!response.ok) {
            throw new Error(`Error en la respuesta: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        // Cache the token and its expiration time (3600 seconds = 1 hour)
        cachedToken = data.access_token;
        tokenExpiryTime = Date.now() + data.expires_in * 1000;

        return cachedToken;
    } catch (error) {
        console.error('Error obteniendo el token de acceso:', error);
        return null;
    }
}



const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function getPodcastEpisodes(token, podcastId, retries = 1) {
    for (let attempt = 0; attempt < retries; attempt++) {
        try {
            const response = await fetch(`https://api.spotify.com/v1/shows/${podcastId}/episodes?limit=3`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });

            if (response.status === 429) {
                const retryAfter = response.headers.get('Retry-After') || 1; // Default to 1 second if not provided
                console.warn(`Rate limit hit. Retrying after ${retryAfter} seconds...`);
                await delay(retryAfter * 1000); // Wait for the specified time before retrying
                continue; // Retry the request
            }

            if (!response.ok) {
                throw new Error(`Error en la respuesta: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            console.log('Episodios obtenidos:', data.items);
            return data.items || [];

        } catch (error) {
            console.error('Error obteniendo episodios:', error);
            if (attempt === retries - 1) {
                return []; // Return empty array after exhausting retries
            }
        }
    }
}


// Función para formatear la duración del episodio en minutos y segundos
function formatDuration(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// 
function pauseAllEpisodesOnClose() {
    if (currentAudio) {
        currentAudio.pause();
        isPlaying = false;

        // Reiniciar todos los botones de reproducción a su estado inicial
        document.querySelectorAll('.playpause-img').forEach(img => {
            img.src = 'Assets/playwhite.png';
        });

        document.querySelectorAll('.button-text').forEach(buttonText => {
            buttonText.textContent = 'Reproducir un fragmento';
        });

        document.querySelectorAll('.masprogramasreproducirfragmentofondo').forEach(bar => {
            bar.style.width = '0';
        });

        // Resetear el nombre del episodio actual
        currentEpisodeName = '';
        currentAudio = null;
    }
}





// Función para mostrar los episodios en la interfaz
function displayEpisodes(episodes, containerId) {
    const episodesContainer = document.getElementById(containerId);
    if (!episodesContainer) return;

   
    episodesContainer.innerHTML = '';
    
    episodes.forEach(episode => {
        const episodeName = extractEpisodeNumber(episode.name);
        const episodeDescription = episode.description || 'Descripción no disponible.';
        const episodeDate = episode.release_date || 'Fecha no disponible.';
        const audioPreviewUrl = episode.audio_preview_url || '';

        const episodeDiv = document.createElement('div');
        episodeDiv.className = 'programareciente';
        episodeDiv.innerHTML = `
            <div class="programarecienteimgtitulo">
                <div class="programarecientesphere">.</div>
                <h2 class="programarecientetitulo">Programa #${episodeName}</h2>
            </div> 
            <div class="programarecientesubtitulos">
                <p class="programarecientedate"><span class="material-symbols-outlined">calendar_month</span>${episodeDate}</p>
                <p class="programarecienteduracion"><strong><span class="material-symbols-outlined">schedule</span></strong> ${formatDuration(episode.duration_ms)}</p>
            </div>
            <div class="programarecientetexto">
                <p>${episodeDescription}</p>
            </div>
            <div class="masprogramas masprogramasreproducirfragmento" onclick="togglePlay('${audioPreviewUrl}', '${episodeName}', this)"> 
                <img class="playpause-img" src="Assets/playwhite.png" style="width: 30px; height: 30px; margin-right: 10px; margin-top: 2px; border-radius: 0; padding: 0; background-color: transparent; overflow: visible;" alt="Boton reproducir ultimo episodio">
                <span class="button-text">Reproducir un fragmento</span>
                <div class="masprogramasreproducirfragmentofondo" id="progressbar-${episodeName}"></div>
            </div>
        `;
        episodesContainer.appendChild(episodeDiv);
    });
}

// Función para extraer el número del episodio del nombre
function extractEpisodeNumber(episodeName) {
    const regex = /Programa (\d+)/;
    const match = episodeName.match(regex);
    return match ? match[1] : episodeName;
}

// Función para obtener y mostrar episodios en una tarjeta específica
// Event listener para manejar el clic en los botones de programas recientes
document.addEventListener('click', async function (event) {
    if (event.target.classList.contains('masprogramasrecientes')) {
        const button = event.target;
        const cardElement = button.closest('.podcastcard'); // Obtener la tarjeta correspondiente
        
        const buttonTextElement = button.querySelector('.masprogramasrecientestexto');
        
        // Verificar si el texto es "CERRAR PROGRAMAS"
        if (buttonTextElement && buttonTextElement.textContent.trim() === "CERRAR PROGRAMAS") {
            // Si es "CERRAR PROGRAMAS", llamamos a la API para obtener los episodios
            await fetchAndDisplayEpisodes(cardElement);
        }
    }
});

// Función para obtener y mostrar episodios en una tarjeta específica
async function fetchAndDisplayEpisodes(cardElement) {
    const podcastId = cardElement.getAttribute('data-podcast-id');
    const containerElement = cardElement.querySelector('.episodes-container');

    if (!containerElement) {
        console.error('No se encontró el contenedor de episodios en la tarjeta:', cardElement);
        return;
    }

    const containerId = containerElement.id;
    try {
        const token = await getAccessToken(clientId, clientSecret);
        if (!token) throw new Error('No se pudo obtener el token de acceso.');
        
        const episodes = await getPodcastEpisodes(token, podcastId);
        if (episodes.length > 0) {
            displayEpisodes(episodes, containerId);
        } else {
            console.log('No se encontraron episodios para mostrar.');
        }
    } catch (error) {
        console.error('Error fetching episodes:', error);
    }
}


// Function to fetch and display episodes on load
async function fetchAndDisplayEpisodesOnLoad() {
    const podcastCards = document.querySelectorAll('.podcastcard');
    podcastCards.forEach(card => {
        fetchAndDisplayEpisodes(card);
    });
}

// Function to observe changes in the DOM and dynamically detect added podcast cards
function observePodcastCards() {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach((node) => {
                    if (node.classList && node.classList.contains('podcastcard')) {
                        console.log('Nueva tarjeta de podcast encontrada:', node);
                        fetchAndDisplayEpisodes(node);
                    }
                });
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });
}

// Ensure functions are called when DOM is fully loaded
window.onload = function() {
    observePodcastCards();
    setTimeout(() => {
        fetchAndDisplayEpisodesOnLoad(); // Ensure this function is defined
    }, 500);
};

let currentAudio = null;
let isPlaying = false;
let currentEpisodeName = '';

// Función para alternar la reproducción del audio
function togglePlay(audioUrl, episodeName, button) {
    if (currentEpisodeName === episodeName && isPlaying) {
        pauseEpisode();
    } else {
        if (currentAudio) {
            pauseEpisode();
        }
        playEpisode(audioUrl, episodeName, button);
    }
}

// Función para reproducir un episodio
function playEpisode(audioUrl, episodeName, button) {
    if (!audioUrl) {
        console.error('No hay URL de audio para reproducir.');
        return;
    }

    currentAudio = new Audio(audioUrl);
    currentAudio.play();

    currentEpisodeName = episodeName;
    isPlaying = true;

    // Reiniciar todos los episodios a su estado inicial
    document.querySelectorAll('.playpause-img').forEach(img => {
        img.src = 'Assets/playwhite.png';
    });

    document.querySelectorAll('.button-text').forEach(buttonText => {
        buttonText.textContent = 'Reproducir un fragmento';
    });

    document.querySelectorAll('.masprogramasreproducirfragmentofondo').forEach(bar => {
        bar.style.width = '0';
    });

    // Cambiar el botón a pausa
    button.querySelector('.playpause-img').src = 'Assets/pausewhite.png';
    button.querySelector('.button-text').textContent = 'Pausar';
    
    // Avanzar el progreso del audio
    const progressBar = document.getElementById(`progressbar-${episodeName}`);
    if (progressBar) {
        progressBar.style.transition = 'none'; 
        currentAudio.ontimeupdate = () => {
            const percentage = (currentAudio.currentTime / currentAudio.duration) * 100;
            progressBar.style.width = `${percentage}%`;
        };
    }

    currentAudio.onended = () => {
        isPlaying = false;
        button.querySelector('.playpause-img').src = 'Assets/playwhite.png';
        button.querySelector('.button-text').textContent = 'Reproducir un fragmento';
        if (progressBar) progressBar.style.width = '100%';
    };
}

// Función para pausar el episodio actual
function pauseEpisode() {
    if (currentAudio) {
        currentAudio.pause();
        isPlaying = false;

        const button = document.querySelector(`[data-episode-name="${currentEpisodeName}"]`);
        if (button) {
            button.querySelector('.playpause-img').src = 'Assets/playwhite.png';
            button.querySelector('.button-text').textContent = 'Reproducir un fragmento';
        }
    }
}
