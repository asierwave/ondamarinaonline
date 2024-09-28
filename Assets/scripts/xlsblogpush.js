const CLIENT_ID = '109798056863-bhnofh9fch7l6ftlou8tdhg36klnq9fr.apps.googleusercontent.com'; // Reemplaza esto con tu Client ID

// Inicializa la API de Google Identity Services
function initGoogleAPI() {
    window.google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: handleCredentialResponse
    });
}

// Maneja la respuesta del ID Token
function handleCredentialResponse(response) {
    const idToken = response.credential; // Token de ID
    console.log('ID Token: ', idToken);
}

// Envía los datos al Google Sheets
async function enviarDatos(data) {
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbyPoObZ-fSqhzJla68JH1kwpM871VhlN_UZUi-l8CDwD1z3L7YsMZENLETmikrWWtqGBA/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Aquí se añade el token si es necesario
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Error al enviar los datos a Google Sheets');
        }

        const result = await response.json();
        console.log('Respuesta del servidor:', result);
        return result;
    } catch (error) {
        console.error('Error:', error);
    }
}

// Procesa el formulario al enviarlo
function procesarFormulario() {
    const titular = document.getElementById('titular').value;
    const contenido = document.getElementById('contenido').value.split('\n');

    const data = {
        titular: titular,
        entradilla: contenido[0],
        cuerpo1: contenido[1],
        ladillo1: contenido[2],
        cuerpo2: contenido[3],
        ladillo2: contenido[4],
        cuerpo3: contenido[5],
        ladillo3: contenido[6],
        cuerpo4: contenido[7],
    };

    // Envía los datos
    enviarDatos(data)
        .then(response => {
            document.getElementById('resultado').innerText = 'Datos guardados exitosamente.';
        })
        .catch(error => {
            document.getElementById('resultado').innerText = 'Hubo un error al guardar los datos.';
        });
}

// Escucha el evento de carga del DOM
document.addEventListener('DOMContentLoaded', function() {
    initGoogleAPI();
});
