const clientId = '4306ee8a93e84b92914ddc505c7d5d41';
const clientSecret = '3ef61e58a15b44e39cafa253dd22d792';
const podcastId = '2ZAATz3n7Il82afif140L2'; // Reemplaza con tu ID de podcast
const miAudio = new Audio();
let estaReproduciendo = false;

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

function displayEpisodes(episodes) {
    const episodesContainer = document.getElementById('programasrecienteslataberna');
    episodesContainer.innerHTML = '';
    episodes.forEach(episode => {
        const episodeName = extractEpisodeNumber(episode.name);
        const episodeDescription = String(episode.description);
        const episodeDate = String(episode.release_date);

        const episodeDiv = document.createElement('div');
        // episodeDiv.style.width = "900px";
        episodeDiv.className = 'programareciente';
        episodeDiv.innerHTML = `
            <div class="programarecienteimgtitulo">
                <div class="programarecientesphere">.</div>
                <h2 class="programarecientetitulo">Programa #${episodeName}</h2>
                <p class="programarecientedate"><span class="material-symbols-outlined">
                calendar_month
                </span>${episodeDate}</p>
                <p class="programarecienteduracion"><strong><span class="material-symbols-outlined">
                schedule
                </span></strong> ${formatDuration(episode.duration_ms)}</p>
            </div>
            <div class="programarecientetexto">
                <p>${episodeDescription}</p>
            </div>
            <div class="masprogramas masprogramasprogramaespecifico"> 
            <img src="Assets/playwhite.png" style="width: 30px; height: 30px; margin-right: 10px;margin-top:2px; border-radius: 0; padding: 0; background-color: transparent;overflow: visible;" alt="Boton reproducir ultimo episodio">
                Escucha un fragmento
            </div>
        `;
        episodeDiv.querySelector('.iconoplay').addEventListener('click', function () {
            miAudio.src = episode.audio_preview_url; // Utiliza la URL de la vista previa del episodio
            miAudio.play();
            document.getElementById('imagen-reproducir-pausar').setAttribute('src', 'Assets/pausewhite.png');
            estaReproduciendo = true;
        });
        episodesContainer.appendChild(episodeDiv);
    });
}

function extractEpisodeNumber(episodeName) {
    const regex = /La Taberna de los sueños - Programa (\d+)/;
    const match = episodeName.match(regex);
    return match ? match[1] : episodeName;
}

async function fetchAndDisplayEpisodes() {
    const token = await getAccessToken(clientId, clientSecret);
    const episodes = await getPodcastEpisodes(token, podcastId);
    displayEpisodes(episodes);
}

fetchAndDisplayEpisodes();

const botonFotoplay = document.getElementById('imagen-reproducir-pausar');
botonFotoplay.addEventListener('click', function () {
    if (estaReproduciendo) {
        miAudio.pause();
        botonFotoplay.setAttribute('src', 'Assets/playwhite.png');
        estaReproduciendo = false;
    } else {
        miAudio.play();
        botonFotoplay.setAttribute('src', 'Assets/pausewhite.png');
        estaReproduciendo = true;
    }
});

const botonDiezSegundosAtras = document.getElementById('imagen-diez-segundos-atras');
botonDiezSegundosAtras.addEventListener('click', function () {
    miAudio.currentTime -= 10;
});

const audioSlider = document.getElementById('audio-slider');

miAudio.addEventListener('timeupdate', function () {
    audioSlider.value = (miAudio.currentTime / miAudio.duration) * 100;
});

audioSlider.addEventListener('input', function () {
    miAudio.currentTime = (audioSlider.value / 100) * miAudio.duration;
});