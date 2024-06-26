const clientId = '4306ee8a93e84b92914ddc505c7d5d41';
const clientSecret = '3ef61e58a15b44e39cafa253dd22d792';

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

async function getPodcastEpisodes(token, podcastId) {
    const response = await fetch(`https://api.spotify.com/v1/shows/${podcastId}/episodes?limit=3`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });
    const data = await response.json();
    return data.items;
}

function formatDuration(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

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

function extractEpisodeNumber(episodeName) {
    const regex = /Programa (\d+)/;
    const match = episodeName.match(regex);
    return match ? match[1] : episodeName;
}

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

document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        fetchAndDisplayEpisodes(card);
    });
});

let currentAudio = null;
let isPlaying = false;
let currentEpisodeName = '';

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
    const card = event.target.closest('.card'); // Encuentra la tarjeta contenedora más cercana
    const BotonAbrirProgramasRecientes = card.querySelector('.masprogramasrecientes');
    const programasRecientes = card.querySelector('.programasrecientes'); // Encuentra el contenedor de programas recientes dentro de la tarjeta
    if (programasRecientes.style.display === 'flex') {
        programasRecientes.style.display = 'none'; // oculta los programas recientes
        BotonAbrirProgramasRecientes.style = 'background-color: #2F75A2';
        BotonAbrirProgramasRecientes.innerHTML = '<img class="cardreproducirultimoprogramaimg" src="Assets/playwhite.png" style="transform: rotate(90deg);width: 30px; height: auto; margin-right: 10px;margin-top:2px; border-radius: 0; padding: 0; background-color: transparent;overflow: visible;" alt="Boton reproducir ultimo episodio">PROGRAMAS RECIENTES';

        // Pausar la reproducción si está en curso
        pauseEpisode();

    } else {
        programasRecientes.style.display = 'flex'; // Muestra los programas recientes
        BotonAbrirProgramasRecientes.style = 'background-color: #2c2c2c';
        BotonAbrirProgramasRecientes.innerHTML = '<img class="cardreproducirultimoprogramaimg" src="Assets/menucierre.png" style="transform: rotate(270deg);width: 30px; height: auto; margin-right: 10px;margin-top:2px; border-radius: 0; padding: 0; background-color: transparent;overflow: visible;" alt="Boton reproducir ultimo episodio">CERRAR PROGRAMAS RECIENTES';
    }
};

// Agregar el evento click a todos los elementos con la clase .masprogramasrecientes
document.querySelectorAll('.masprogramasrecientes').forEach(button => {
    button.addEventListener('click', toggleProgramasRecientes);
});
