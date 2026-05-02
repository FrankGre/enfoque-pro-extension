/**
 * Motor de limpieza visual "Enfoque Pro"
 * Este archivo se encarga de aplicar las reglas de enfoque en la web activa.
 */

function ejecutarLimpiezaVisual() {
    // 1. Lista de selectores que comúnmente contienen distracciones
    const selectoresBasura = [
        'aside',            // Barras laterales
        '.sidebar', 
        '#sidebar',
        '.ads',             // Contenedores de anuncios
        '.advertisement', 
        '.banner',
        'footer',           // Pies de página
        '.footer',
        '.comments',        // Secciones de comentarios
        '#comments',
        '.social-share',    // Botones de redes sociales
        '.related-posts',   // Recomendaciones de otros artículos
        '.recommended'
    ];

    // 2. Aplicamos la clase de limpieza al cuerpo de la página
    document.body.classList.add('limpieza-activa');

    // 3. Ocultamos los elementos de distracción usando la clase CSS profesional
    selectoresBasura.forEach(selector => {
        const elementos = document.querySelectorAll(selector);
        elementos.forEach(el => {
            // En lugar de style.opacity, usamos la clase para aprovechar las animaciones del style.css
            el.classList.add('basura-oculta');
        });
    });

    // 4. Identificamos y resaltamos el contenido principal
    // Intentamos encontrar la etiqueta más probable de contener el texto real
    const principal = document.querySelector('article') || 
                      document.querySelector('main') || 
                      document.querySelector('.content') ||
                      document.querySelector('#content');
    
    if (principal) {
        principal.classList.add('contenido-enfocado');
        
        // Desplazamos suavemente la vista al inicio del contenido resaltado
        principal.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

/**
 * Escuchador de mensajes:
 * Recibe la orden desde popup.js cuando el usuario pulsa el botón o el switch.
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.accion === "limpiar_ahora") {
        ejecutarLimpiezaVisual();
        sendResponse({ estado: "Limpieza Premium completada" });
    }
    return true; // Mantiene el canal abierto para la respuesta asíncrona
});