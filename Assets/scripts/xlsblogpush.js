let CLIENT_ID = '109798056863-bhnofh9fch7l6ftlou8tdhg36klnq9fr.apps.googleusercontent.com';
let SCOPE = 'https://www.googleapis.com/auth/spreadsheets'; // Scope to access Google Sheets

function initGoogleAPI() {
    window.google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: handleCredentialResponse
    });
}

function handleCredentialResponse(response) {
    const credential = response.credential;
    console.log("Credential:", credential); // Debug: log the credential
    // Here, you can make a request to your backend or other API if needed.
    document.getElementById("authContainer").style.display = "none"; // Hide login button
    document.getElementById("noticiasForm").style.display = "block"; // Show the form
}

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
        const response = await fetch('https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec', { // Replace with your script URL
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


document.getElementById('loginButton').onclick = function() {
    window.google.accounts.id.prompt();
};

window.onload = function() {
    initGoogleAPI();
};
