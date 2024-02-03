<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $contacto = $_POST["contacto"];
    $mensaje = $_POST["mensaje"];

    $para = "info@ondamarina.online";  // Reemplaza con tu dirección de correo electrónico
    $asunto = "Nuevo mensaje del formulario de contacto";

    $contenido = "Contacto: " . $contacto . "\nMensaje:\n" . $mensaje;

    // Utiliza la función mail para enviar el correo electrónico
    if (mail($para, $asunto, $contenido)) {
        echo "El mensaje ha sido enviado con éxito.";
    } else {
        echo "Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.";
    }
}
?>
