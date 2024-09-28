// Inicializar el cliente de Google
function initGoogleAPI() {
    window.onload = function () {
        const loginButton = document.getElementById('loginButton');
        loginButton.addEventListener('click', () => {
            const client = google.accounts.oauth2.initTokenClient({
                client_id: '109798056863-bhnofh9fch7l6ftlou8tdhg36klnq9fr.apps.googleusercontent.com', // Tu Client ID
                scope: 'https://www.googleapis.com/auth/spreadsheets',
                callback: (response) => {
                    // Manejar la respuesta de Google
                    console.log('Token:', response);
                    document.getElementById('authContainer').style.display = 'none'; // Ocultar el botón de inicio de sesión
                    document.getElementById('noticiasForm').style.display = 'block'; // Mostrar el formulario
                }
            });
            client.requestAccessToken();
        });
    };
}

// Procesar el formulario y enviar los datos a Google Sheets
async function procesarFormulario() {
    const titular = document.getElementById("titular").value;
    const contenido = document.getElementById("contenido").value;

    const partesContenido = contenido.split('\n');

    const data = {
        titular: titular,
        entradilla: partesContenido[0] || "",
        cuerpo1: partesContenido[1] || "",
        ladillo1: partesContenido[2] || "",
        cuerpo2: partesContenido[3] || "",
        ladillo2: partesContenido[4] || "",
        cuerpo3: partesContenido[5] || "",
        ladillo3: partesContenido[6] || "",
        cuerpo4: partesContenido[7] || ""
    };

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
        document.getElementById("resultado").innerText = 'Noticia guardada exitosamente';
    } catch (error) {
        console.error('Error:', error);
        document.getElementById("resultado").innerText = 'Error al guardar la noticia';
    }
}

// Asegúrate de que se llame a initGoogleAPI al cargar la página
window.onload = initGoogleAPI;
