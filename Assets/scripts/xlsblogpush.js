// Función para inicializar la API de Google
function initGoogleAPI() {
    // Asegúrate de que el cliente de Google esté inicializado con tu Client ID
    window.google.accounts.id.initialize({
        client_id: "109798056863-bhnofh9fch7l6ftlou8tdhg36klnq9fr.apps.googleusercontent.com", // Reemplaza esto con tu Client ID
        callback: handleCredentialResponse
    });

    // Evento para el botón de inicio de sesión
    document.getElementById("loginButton").addEventListener("click", function() {
        window.google.accounts.id.prompt(); // Muestra la ventana emergente de inicio de sesión
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

// Función para enviar los datos al Google Apps Script
async function enviarDatos(data) {
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbxJW8hIoLUG7GGnkTPaDhfMqX08Zwqb9IIPXJrEuvU3cdkcLqRcQrYoTzTP88IViS8gKQ/exec', {
            method: 'POST',
            mode: 'no-cors',  // Utilizar modo no-cors
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        // En modo no-cors, no puedes acceder a la respuesta, así que solo asumimos que fue exitosa
        document.getElementById('resultado').innerText = 'Datos guardados (pero no se puede verificar la respuesta).';
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('resultado').innerText = 'Error al guardar los datos';
    }
}


// Función para procesar el formulario
function procesarFormulario(event) {
    event.preventDefault(); // Evita el envío predeterminado del formulario

    const titular = document.getElementById('titular').value;
    const contenido = document.getElementById('contenido').value.split('\n');

    const data = {
        titular: titular,
        entradilla: contenido[0] || '',
        cuerpo1: contenido[1] || '',
        ladillo1: contenido[2] || '',
        cuerpo2: contenido[3] || '',
        ladillo2: contenido[4] || '',
        cuerpo3: contenido[5] || '',
        ladillo3: contenido[6] || '',
        cuerpo4: contenido[7] || '',
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
document.addEventListener('DOMContentLoaded', () => {
    initGoogleAPI();
    
    // Agrega el evento de envío del formulario
    const form = document.getElementById('noticiasForm');
    form.addEventListener('submit', procesarFormulario);
});
