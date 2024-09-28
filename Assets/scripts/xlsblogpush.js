document.addEventListener('DOMContentLoaded', function() {
    // Asignar evento al formulario
    document.getElementById("noticia-form").addEventListener("submit", function(event) {
      event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
      agregarNoticia();
    });
  });
  
  function agregarNoticia() {
    const url = 'https://script.google.com/macros/s/AKfycbxJW8hIoLUG7GGnkTPaDhfMqX08Zwqb9IIPXJrEuvU3cdkcLqRcQrYoTzTP88IViS8gKQ/exec'; // Reemplaza con tu URL de despliegue
  
    // Captura los datos del formulario
    const data = {
      Titulo: document.getElementById("titulo").value,
      Subtitulo: document.getElementById("subtitulo").value,
      Autor: document.getElementById("autor").value,
      Entradilla: document.getElementById("entradilla").value,
      Cuerpo: document.getElementById("cuerpo").value,
      Imagen: document.getElementById("imagen").value,
      Imagen2: document.getElementById("imagen2").value,
      ImagenAutor: document.getElementById("imagenautor").value,
    };
  
    // Verifica que todos los campos estén llenos
    if (!data.Titulo || !data.Subtitulo || !data.Autor || !data.Entradilla || !data.Cuerpo || !data.Imagen || !data.ImagenAutor) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }
  
    // Enviar los datos al script de Google Apps
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(data),
    })
    .then(response => response.json())
    .then(result => {
      if (result.result === 'success') {
        alert("Noticia agregada correctamente en la fila: " + result.row);
        document.getElementById("noticia-form").reset(); // Reiniciar el formulario
      } else {
        alert("Error: " + result.error);
      }
    })
    .catch(error => {
      console.error("Error:", error);
      alert("Error al agregar la noticia.");
    });
  }
  