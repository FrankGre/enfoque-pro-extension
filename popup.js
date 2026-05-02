document.addEventListener('DOMContentLoaded', function() {
    const boton = document.getElementById('btnAction');
    const switchCheck = document.getElementById('limpiar');

    // Función unificada para enviar la orden de limpieza
    const dispararLimpieza = async () => {
        try {
            let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            
            // Enviamos el mensaje al content.js
            chrome.tabs.sendMessage(tab.id, { accion: "limpiar_ahora" }, (response) => {
                if (chrome.runtime.lastError) {
                    console.log("Error: La página no permite inyectar scripts o no ha cargado.");
                } else {
                    // Si todo sale bien, actualizamos la interfaz
                    boton.innerText = "✅ Web Limpia";
                    boton.classList.replace('btn-primary', 'btn-success');
                    if(switchCheck) switchCheck.checked = true;
                }
            });
        } catch (error) {
            console.error("Fallo al consultar la pestaña:", error);
        }
    };

    // Escuchamos tanto el clic en el botón como el cambio en el switch
    if (boton) {
        boton.addEventListener('click', dispararLimpieza);
    }
    
    if (switchCheck) {
        switchCheck.addEventListener('change', (e) => {
            if (e.target.checked) {
                dispararLimpieza();
            } else {
                // Si apagan el switch, recargamos para quitar el filtro
                chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
                    chrome.tabs.reload(tab.id);
                    boton.innerText = "✨ Limpiar Página";
                    boton.classList.replace('btn-success', 'btn-primary');
                });
            }
        });
    }
});