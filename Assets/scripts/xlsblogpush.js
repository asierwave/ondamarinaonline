
const scriptURL = 'https://script.google.com/macros/s/AKfycbxwinYrKxgx2FTQ8J5kgMk9C43sTCpPpTR1ulv2KrDMxhKsqe2378AnwPrXdq0wYAVv/exec'

const form = document.forms['contact-form']

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  .then(response => alert("Thank you! your form is submitted successfully." ))
  .then(() => { window.location.reload(); })
  .catch(error => console.error('Error!', error.message))
})




// Funcionamiento de los datos introducidos en el input
const authorImageLinks = {
    "Esther Casabó": "https://ondamarina.online/Assets/equipo/estherom.png",
    "Carlos Toral": "https://ondamarina.online/Assets/equipo/carlosom.png",
    "Asier Toral": "https://ondamarina.online/Assets/logos/vacio.png",
    "Sinfo Bezanilla": "https://ondamarina.online/Assets/equipo/sinfoom.png",
    "Adolfo Higuera": "https://ondamarina.online/Assets/equipo/adolfoom.png"
};

function updateGeneratedLink() {
    const titular = document.getElementById('TITULAR').value; // Obtiene el valor del campo TITULAR
    const link = titular.toLowerCase().trim().replace(/\s+/g, '-'); // Genera el enlace
    document.getElementById('generated-link').value = link; // Asigna el enlace al campo LINK
}

function updateAuthorImageLink() {
    const selectedAuthor = document.getElementById('AUTOR').value; // Obtiene el autor seleccionado
    const imageLinkInput = document.getElementById('LINK_AUTOR_IMAGEN'); // Obtiene el campo de enlace de imagen del autor
    imageLinkInput.value = authorImageLinks[selectedAuthor] || ''; // Asigna el enlace correspondiente o vacío si no hay coincidencia
}

function toggleAdditionalSections() {
    const sections = document.getElementById('additional-sections');
    const buttonAdditionSections = document.getElementById('additional-sections-button');
    sections.style.display = sections.style.display === "none" ? "flex" : "none";
    buttonAdditionSections.textContent = buttonAdditionSections.textContent === "COLAPSAR CONTENIDO" ? "ESCRIBIR MAS CONTENIDO": "COLAPSAR CONTENIDO";
}

function formatAndSubmit(event) {
    const fechaInput = document.getElementById('FECHA');
    const fechaValue = new Date(fechaInput.value); // Convierte el valor del input a un objeto Date

    const day = fechaValue.getDate();
    const month = fechaValue.toLocaleString('es-ES', { month: 'long' }); // Obtiene el mes en texto
    const year = fechaValue.getFullYear();

    const formattedDate = `${day} de ${month} de ${year}`; // Formatea la fecha

    document.getElementById('formattedFecha').value = formattedDate; // Asigna la fecha formateada al campo oculto
}
