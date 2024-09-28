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

async function enviarDatos(data) {
    try {
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

        const result = await response.json();
        console.log('Respuesta del servidor:', result);
        return result;
    } catch (error) {
        console.error('Error:', error);
    }
}

// Función para procesar el formulario
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

    enviarDatos(data)
        .then(response => {
            document.getElementById('resultado').innerText = 'Datos guardados exitosamente.';
        })
        .catch(error => {
            document.getElementById('resultado').innerText = 'Hubo un error al guardar los datos.';
        });
}

// Inicializa la API de Google cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', initGoogleAPI);
