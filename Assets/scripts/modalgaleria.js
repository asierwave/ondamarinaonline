function openModal(image) {
    const modal = document.getElementById("modal");
    const modalImage = document.getElementById("modalImage");
    modalImage.src = image.src; // Establece la fuente de la imagen del modal
    modal.style.display = "flex"; // Muestra el modal
}

function closeModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none"; // Oculta el modal
}
