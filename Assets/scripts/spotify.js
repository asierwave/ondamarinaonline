const clientId = '178578ec9bc64de985b429c34d160bcb';
const clientSecret = 'd7193a9976974fd09bdf37af4cf7266b';

// Función para obtener el token de acceso desde Spotify API
async function getAccessToken(clientId, clientSecret) {
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
}

// Función para obtener los episodios de un podcast dado su ID
async function getPodcastEpisodes(token, podcastId) {
    const response = await fetch(`https://api.spotify.com/v1/shows/${podcastId}/episodes?limit=2`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });
    const data = await response.json();
    return data.items;
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
    const containerId = cardElement.querySelector('.episodes-container').id;
    try {
        const token = await getAccessToken(clientId, clientSecret);
        const episodes = await getPodcastEpisodes(token, podcastId);
        displayEpisodes(episodes, containerId);
    } catch (error) {
        console.error('Error fetching episodes:', error);
    }
}

// Observa cambios en el DOM para detectar tarjetas de podcast añadidas dinámicamente
function observePodcastCards() {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                // Recorre los nodos añadidos para encontrar las nuevas tarjetas de podcast
                mutation.addedNodes.forEach((node) => {
                    if (node.classList && node.classList.contains('podcastcard')) {
                        console.log('Nueva tarjeta de podcast encontrada:', node);
                        fetchAndDisplayEpisodes(node); // Carga episodios en la nueva tarjeta
                    }
                });
            }
        });
    });

    // Configura el observer para observar cambios en el DOM
    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });
}

// Inicia la observación de cambios cuando el DOM está completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    observePodcastCards();
});

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

    document.querySelectorAll('.masprogramasreproducirfragmentofondo').forEach(progressBar => {
        progressBar.style.width = '0%';
    });

    // Actualizar el botón del episodio seleccionado
    const playPauseImg = button.querySelector('.playpause-img');
    playPauseImg.src = 'Assets/pausewhite.png';

    const buttonText = button.querySelector('.button-text');
    buttonText.textContent = 'Reproduciendo fragmento';

    // Actualizar la barra de progreso específica para este episodio
    const progressBar = document.getElementById(`progressbar-${episodeName}`);
    currentAudio.addEventListener('timeupdate', function() {
        const progress = (currentAudio.currentTime / currentAudio.duration) * 100;
        progressBar.style.width = progress + '%';
    });

    // Event listener para el final de la reproducción del audio
    currentAudio.addEventListener('ended', function() {
        isPlaying = false;
        playPauseImg.src = 'Assets/playwhite.png';
        buttonText.textContent = 'Reproducir un fragmento';
        progressBar.style.width = '0%';
    });
}

// Función para pausar un episodio
function pauseEpisode() {
    if (currentAudio) {
        currentAudio.pause();
        isPlaying = false;

        // Reiniciar botones de play/pause, texto y barras de progreso
        document.querySelectorAll('.playpause-img').forEach(img => {
            img.src = 'Assets/playwhite.png';
        });

        document.querySelectorAll('.button-text').forEach(button => {
            button.textContent = 'Reproducir un fragmento';
        });

        document.querySelectorAll('.masprogramasreproducirfragmentofondo').forEach(progressBar => {
            progressBar.style.width = '0%';
        });

        currentEpisodeName = '';
    }
}

// Event listener para detener la reproducción al hacer clic en #imagen-reproducir-pausar
const imagenReproducirPausarButton = document.getElementById('imagen-reproducir-pausar');
if (imagenReproducirPausarButton) {
    imagenReproducirPausarButton.addEventListener('click', function() {
        pauseEpisode();
    });
}

// Event listener para #iconoplay
const iconoPlayButton = document.getElementById('iconoplay');
if (iconoPlayButton) {
    iconoPlayButton.addEventListener('click', function() {
        if (isPlaying) {
            pauseEpisode();
        }
    });
}

// Arrow function para mostrar/ocultar el contenido de programas recientes en la tarjeta correspondiente
const toggleProgramasRecientes = (event) => {
    const card = event.target.closest('.podcastcard'); // Encuentra la tarjeta contenedora más cercana
    const BotonAbrirProgramasRecientes = card.querySelector('.masprogramasrecientes');
    const programasRecientes = card.querySelector('.programasrecientes'); // Encuentra la sección de programas recientes en la tarjeta actual

    if (programasRecientes.style.display === 'flex') {
        pauseEpisode();
        programasRecientes.style.display = 'none';
        programasRecientes.style.width = '0';
        card.style.order='0';
        card.style.width='auto';
        BotonAbrirProgramasRecientes.querySelector('span').textContent = 'Más programas recientes';
        BotonAbrirProgramasRecientes.querySelector('img').style.transform = 'rotate(0deg)';
    } else {
        programasRecientes.style.display = 'flex';
        programasRecientes.style.width = '57.5vw';
        card.style.width='90vw';
        card.style.order='-9999';
        BotonAbrirProgramasRecientes.querySelector('span').textContent = 'Menos programas recientes';
        BotonAbrirProgramasRecientes.querySelector('img').style.transform = 'rotate(180deg)';
    }
};

// Event listener para manejar el toggle de programas recientes
document.addEventListener('click', (event) => {
    if (event.target.closest('.masprogramasrecientes')) {
        toggleProgramasRecientes(event);
    }
});
