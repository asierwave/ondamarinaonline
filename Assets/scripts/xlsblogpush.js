// Función para inicializar la API de Google
function initGoogleAPI() {
    // Asegúrate de que el cliente de Google esté inicializado con tu Client ID
    window.google.accounts.id.initialize({
        client_id: "AKfycbyPoObZ-fSqhzJla68JH1kwpM871VhlN_UZUi-l8CDwD1z3L7YsMZENLETmikrWWtqGBA", // Reemplaza esto con tu Client ID
        callback: handleCredentialResponse
    });
}

// Función de callback para manejar la respuesta de credenciales
function handleCredentialResponse(response) {
    const idToken = response.credential;

    // Puedes enviar el idToken a tu servidor o utilizarlo directamente para autenticar
    console.log('ID Token:', idToken);

    // Aquí puedes llamar a tu función para mostrar el formulario
    document.getElementById("authContainer").style.display = "none";
    document.getElementById("noticiasForm").style.display = "block";
}

// Evento para el botón de inicio de sesión
document.getElementById("loginButton").addEventListener("click", function() {
    window.google.accounts.id.prompt();
});

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
