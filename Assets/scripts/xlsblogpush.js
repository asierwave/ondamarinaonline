let gapiLoaded = false;

// Cargar la API de Google y autenticar al usuario
function initGoogleAPI() {
    gapi.load("client:auth2", async function() {
        await gapi.client.init({
            apiKey: "AIzaSyC6BLO51mAlYg8Y4ipLhm1RNr7069webkw", // Reemplaza esto con tu API Key
            clientId: "109798056863-bhnofh9fch7l6ftlou8tdhg36klnq9fr.apps.googleusercontent.com", // Reemplaza esto con tu Client ID
            scope: "https://www.googleapis.com/auth/spreadsheets",
            discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"]
        });

        gapiLoaded = true;

        const isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
        if (isSignedIn) {
            document.getElementById("authContainer").style.display = "none";
            document.getElementById("noticiasForm").style.display = "block";
        }
    });
}

// Función para enviar datos a Google Sheets
async function enviarDatos(data) {
    const response = await fetch('https://script.google.com/macros/s/AKfycbyPoObZ-fSqhzJla68JH1kwpM871VhlN_UZUi-l8CDwD1z3L7YsMZENLETmikrWWtqGBA/exec', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Error al enviar los datos a Google Sheets');
    }

    return await response.json();
}

// Evento para el botón de inicio de sesión
document.getElementById("loginButton").addEventListener("click", function() {
    gapi.auth2.getAuthInstance().signIn().then(() => {
        document.getElementById("authContainer").style.display = "none";
        document.getElementById("noticiasForm").style.display = "block";
    });
});

// Evento para enviar el formulario
document.getElementById("noticiasForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Evita el comportamiento predeterminado del formulario

    const titular = document.getElementById("titular").value;
    const contenido = document.getElementById("contenido").value;

    // Divide el contenido en partes utilizando saltos de línea
    const partesContenido = contenido.split('\n');
    const entradilla = partesContenido[0];
    const cuerpo1 = partesContenido[1];
    const ladillo1 = partesContenido[2];
    const cuerpo2 = partesContenido[3];
    const ladillo2 = partesContenido[4];
    const cuerpo3 = partesContenido[5];
    const ladillo3 = partesContenido[6];
    const cuerpo4 = partesContenido[7];

    const data = {
        titular: titular,
        entradilla: entradilla,
        cuerpo1: cuerpo1,
        ladillo1: ladillo1,
        cuerpo2: cuerpo2,
        ladillo2: ladillo2,
        cuerpo3: cuerpo3,
        ladillo3: ladillo3,
        cuerpo4: cuerpo4,
    };

    try {
        const result = await enviarDatos(data);
        console.log('Éxito:', result);
        document.getElementById("resultado").innerText = 'Datos guardados con éxito';
    } catch (error) {
        console.error('Error:', error);
        document.getElementById("resultado").innerText = 'Error al guardar los datos';
    }
});

// Inicializa la API de Google cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', initGoogleAPI);
