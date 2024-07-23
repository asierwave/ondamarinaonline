async function obtenerDatosFacebook() {
    const token = 'EAAGhpZCRMq0ABOZC6qfjRcXFvr2azST8kWRF9bzktMXQGbtAak2h8jemxijqyHwzAvhBoZCRVRwjB34iaMuwA3pMkiYGN642KQT9xhyYmWKMGhUVGKhm7tQ6bZCB9djluEB4TrvZA9AyuiQHhZAQGI1pnVHTUQRzR3HnV1G7NEZBG53FIbss4az7IsUhkFjFqcWKZCA3SDNzdJf3jMpG2ZCiswpuJyoBT8UMZD'; // Reemplaza con tu token de acceso
    const pageId = '116170441582216'; // Reemplaza con el ID de la página o perfil
    const url = `https://graph.facebook.com/${pageId}/posts?fields=message,attachments{media_type,media,url}&access_token=${token}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Datos obtenidos:', data); // Verificar la estructura de los datos
        procesarDatosFacebook(data);
    } catch (error) {
        console.error('Error al obtener datos de Facebook:', error);
    }
}

function procesarDatosFacebook(data) {
    if (!data || !data.data) {
        console.error('No se encontraron datos en la respuesta.');
        return;
    }

    const posts = data.data;
    const container = document.getElementById('facebook-feed');

    container.innerHTML = ''; // Limpiar el contenedor antes de añadir nuevos datos

    posts.forEach(post => {
        const mensaje = post.message || '';
        const attachments = post.attachments ? post.attachments.data : [];

        attachments.forEach(attachment => {
            if (attachment.media_type === 'photo') {
                const imagenUrl = attachment.media.url;
                const postHTML = `
                    <div class="noticia">
                        <div class="noticiamedia">
                            <img class="noticiavideo" src="${imagenUrl}" alt="Imagen del artículo" style="max-width: auto; height: auto;">
                        </div>
                        <div class="noticiatextual">
                            <p>${mensaje}</p>
                        </div>
                    </div>
                `;
                container.innerHTML += postHTML;
            }
        });
    });
}

// Llamar a la función para obtener los datos al cargar la página
document.addEventListener('DOMContentLoaded', obtenerDatosFacebook);
