// Función para inicializar la API de Google
function initGoogleAPI() {
    // Configurar el botón de inicio de sesión
    document.getElementById("loginButton").addEventListener("click", function() {
        window.google.accounts.id.prompt();
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

// Función para enviar datos a Google Sheets
async function enviarDatos(data) {
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbxJW8hIoLUG7GGnkTPaDhfMqX08Zwqb9IIPXJrEuvU3cdkcLqRcQrYoTzTP88IViS8gKQ/exec', {
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
        document.getElementById('resultado').innerText = result.message;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('resultado').innerText = 'Error al guardar los datos';
    }
}

// Función para procesar el formulario
document.getElementById('noticiasForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío estándar del formulario
    const titular = document.getElementById('titular').value;
    const contenido = document.getElementById('contenido').value.split('\n');

    const data = {
        titular: titular,
        entradilla: contenido[0] || "",
        cuerpo1: contenido[1] || "",
        ladillo1: contenido[2] || "",
        cuerpo2: contenido[3] || "",
        ladillo2: contenido[4] || "",
        cuerpo3: contenido[5] || "",
        ladillo3: contenido[6] || "",
        cuerpo4: contenido[7] || "",
    };

    enviarDatos(data);
});

// Inicializa la API de Google cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', initGoogleAPI);
