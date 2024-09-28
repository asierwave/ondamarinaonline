const clientId = '178578ec9bc64de985b429c34d160bcb';
const clientSecret = 'd7193a9976974fd09bdf37af4cf7266b';

// Función para obtener el token de acceso desde Spotify API
async function getAccessToken(clientId, clientSecret) {
    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'
        });
        const data = await response.json();
        return data.access_token;
    } catch (error) {
        console.error('Error obteniendo el token de acceso:', error);
    }
}

// Función para obtener los episodios de un podcast dado su ID
async function getPodcastEpisodes(token, podcastId) {
    try {
        const response = await fetch(`https://api.spotify.com/v1/shows/${podcastId}/episodes?limit=2`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        const data = await response.json();
        console.log(data.items);
        return data.items;
    } catch (error) {
        console.error('Error obteniendo episodios:', error);
    }
}

// Función para formatear la duración del episodio en minutos y segundos
function formatDuration(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Función para mostrar los episodios en la interfaz
function displayEpisodes(episodes, containerId) {
    const episodesContainer = document.getElementById(containerId);
    if (!episodesContainer) return;
    episodesContainer.innerHTML = '';
    episodes.forEach(episode => {
        const episodeName = extractEpisodeNumber(episode.name);
        const episodeDescription = String(episode.description);
        const episodeDate = String(episode.release_date);
        const audioPreviewUrl = episode.audio_preview_url;

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
async function fetchAndDisplayEpisodes(cardElement) {
    const podcastId = cardElement.getAttribute('data-podcast-id');
    const containerElement = cardElement.querySelector('.programasrecientes');

    if (!containerElement) {
        console.error('No se encontró el contenedor de episodios en la tarjeta:', cardElement);
        return;
    }

    const containerId = containerElement.id;
    try {
        const token = await getAccessToken(clientId, clientSecret);
        if (!token) throw new Error('No se pudo obtener el token de acceso.');
        const episodes = await getPodcastEpisodes(token, podcastId);
        if (episodes) displayEpisodes(episodes, containerId);
    } catch (error) {
        console.error('Error fetching episodes:', error);
    }
}

// Observa cambios en el DOM para detectar tarjetas de podcast añadidas dinámicamente
function observePodcastCards() {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach((node) => {
                    if (node.classList && node.classList.contains('podcastcard')) {
                        console.log('Nueva tarjeta de podcast encontrada:', node);
                        fetchAndDisplayEpisodes(node); // Carga episodios en la nueva tarjeta
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

// Función para obtener y mostrar episodios en todas las tarjetas al cargar
async function fetchAndDisplayEpisodesOnLoad() {
    const podcastCards = document.querySelectorAll('.podcastcard');
    podcastCards.forEach(card => {
        fetchAndDisplayEpisodes(card);
    });
}

// Inicia la observación de cambios cuando el DOM está completamente cargado
window.onload = function() {
    observePodcastCards();
    setTimeout(() => {
        fetchAndDisplayEpisodesOnLoad();
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
            pauseEpisode(); // Detener el episodio actual si hay alguno reproduciéndose
        }
        playEpisode(audioUrl, episodeName, button);
    }
}

// Función para reproducir un episodio
function playEpisode(audioUrl, episodeName, button) {
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
        progressBar.style.transition = 'none'; // Desactivar la transición al inicio
        currentAudio.ontimeupdate = () => {
            const percentage = (currentAudio.currentTime / currentAudio.duration) * 100;
            progressBar.style.width = `${percentage}%`;
        };
    }

    currentAudio.onended = () => {
        isPlaying = false;
        button.querySelector('.playpause-img').src = 'Assets/playwhite.png';
        button.querySelector('.button-text').textContent = 'Reproducir un fragmento';
        if (progressBar) {
            progressBar.style.width = '100%';
        }
    };
}

// Función para pausar el episodio
function pauseEpisode() {
    if (currentAudio) {
        currentAudio.pause();
        isPlaying = false;
        const button = document.querySelector(`.masprogramasreproducirfragmento[data-episode-name="${currentEpisodeName}"]`);
        if (button) {
            button.querySelector('.playpause-img').src = 'Assets/playwhite.png';
            button.querySelector('.button-text').textContent = 'Reproducir un fragmento';
        }
    }
}

// Función para alternar la visualización de programas recientes
const toggleProgramasRecientes = (card) => {
    const programasRecientes = card.querySelector('.programasrecientes');
    const cards = document.querySelector('.cards');

    // Cerrar otros contenedores de programas recientes
    const allProgramasRecientes = document.querySelectorAll('.programasrecientes');
    allProgramasRecientes.forEach(otherContainer => {
        if (otherContainer !== programasRecientes) {
            otherContainer.style.display = 'none';
            otherContainer.style.width = '0';
            const otherCard = otherContainer.closest('.podcastcard');
            if (otherCard) {
                otherCard.classList.remove('open'); // Quitar clase para centrar y ocupar pantalla
            }
        }
    });

    if (programasRecientes.style.display === 'flex') {
        pauseEpisode(); // Pausar el audio si está en reproducción
        programasRecientes.style.display = 'none';
        programasRecientes.style.width = '0';
        card.classList.remove('open'); // Quitar clase para centrar y ocupar pantalla

    } else {
        programasRecientes.style.display = 'flex';
        programasRecientes.style.maxWidth = '57.5vw';

        if (window.innerWidth <= 1300) {
            programasRecientes.style.maxWidth = '46vw';
        }

        if (window.innerWidth <= 800) {
            programasRecientes.style.maxWidth = '100%';
            programasRecientes.style.height = 'fit-content';
            cards.style.maxHeight = 'fit-content';
        }
        card.classList.add('open'); // Añadir clase para centrar y ocupar pantalla
        cards.style.maxWidth = '100vw';
    }
};

// Event listener para manejar el toggle de programas recientes
document.addEventListener('click', (event) => {
    const card = event.target.closest('.podcastcard');
    
    if (event.target.closest('.masprogramasrecientes')) {
        toggleProgramasRecientes(card);
    }
    
    // Cerrar programas recientes de todas las tarjetas si se hace clic en un botón del carrusel
    if (event.target.closest('button.podcastsprev, button.podcastsnext')) {
        const openCards = document.querySelectorAll('.podcastcard');
        openCards.forEach(openCard => {
            const programasRecientes = openCard.querySelector('.programasrecientes');
            if (programasRecientes.style.display === 'flex') {
                toggleProgramasRecientes(openCard);
            }
        });
    }
});
