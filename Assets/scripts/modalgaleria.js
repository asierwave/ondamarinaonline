function openModal(image) {
    const modal = document.getElementById("modal");
    const modalImage = document.getElementById("modalImage");
    modalImage.src = image.src; // Establece la fuente de la imagen del modal
    modal.style.display = "flex"; // Muestra el modal
    modal.style.zIndex = "99999999999999999999999";

}

function closeModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none"; // Oculta el modal
    modal.style.zIndex = "-1";
}
