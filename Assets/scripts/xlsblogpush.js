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
        document.getElementById("resultado").innerText = 'Noticia guardada exitosamente';
    } catch (error) {
        console.error('Error:', error);
        document.getElementById("resultado").innerText = 'Error al guardar la noticia';
    }
}