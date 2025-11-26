// =========================================================
// FUNCIÓN PARA ELIMINAR PROYECTO (Frontend y API)
// =========================================================
function showAlert(icon, title, text) {
    return Swal.fire({
      icon: icon,
      title: title,
      text: text,
      showConfirmButton: false, // Ocultamos botón para que sea automático
      timer: 2000 // Dura 2 segundos
    });
  }

async function deleteProject(proyectoId, token, proyectoName) {
    // 1. Preguntar al usuario antes de borrar usando SweetAlert2
    const result = await Swal.fire({
        title: `¿Estás seguro de borrar "${proyectoName}"?`,
        text: "¡Esta acción no se puede deshacer! Se eliminarán todos los datos asociados al proyecto.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#E24B16', // Color naranja de tu tema
        cancelButtonColor: '#0088FF', 
        confirmButtonText: 'Sí, ¡Borrar!',
        cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
        // Si el usuario confirma, procedemos con la llamada a la API
        try {
            // Llama a la API de tu backend para eliminar el proyecto
            const response = await fetch(`https://proyecto-zvzl.onrender.com/proyectos/delete/${proyectoId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });

            if (!response.ok) {
                // Si el backend devuelve un error, intentamos leer el mensaje de error
                const errorData = await response.json().catch(() => ({ message: 'Error desconocido del servidor.' }));
                throw new Error(`Error ${response.status}: ${errorData.message || 'Error al conectar con la API.'}`);
            }

            // Muestra confirmación de éxito
            if (response.ok){
                await showAlert('success', '¡Eliminado!', "El proyecto ha sido eliminado");
                setTimeout(() => {
                    window.location.href = "videos.html";
                }, 1500);
            }

        } catch (err) {
            console.error("Error borrando proyecto:", err);
            // Muestra el error al usuario
            Swal.fire(
                'Error',
                err.message || 'Ocurrió un error al intentar eliminar el proyecto.',
                'error'
            );
        }
    }
}


document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("authToken");
    const container = document.getElementById("proyectosContainer");
    const info = document.getElementById("proyectosInfo");

    // Hacemos que deleteProject sea accesible globalmente para el onclick del botón
    window.deleteProject = deleteProject; 
    
    // =========================================================
    // 1. LÓGICA DE CARGA DE PROYECTOS EXISTENTES
    // =========================================================

    if (!token) {
        info.classList.replace("alert-info", "alert-danger");
        info.textContent = "No estás autenticado. Iniciá sesión primero.";
        return;
    }

    try {
        const response = await fetch("https://proyecto-zvzl.onrender.com/proyectos/getProyectos", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        });

        if (!response.ok) {
            throw new Error(`Error de servidor: ${response.status}`);
        }

        const data = await response.json();
        console.log("Datos recibidos de la API (proyectos):", data);

        const proyectos = Array.isArray(data) ? data : data.proyectos || [];

        if (proyectos.length === 0) {
            info.classList.replace("alert-info", "alert-warning");
            info.textContent = "No tenés proyectos cargados."; 
            info.style.display = "block";
            
        } else {
            info.style.display = "none";
            container.innerHTML = ""; 

            proyectos.forEach(proyecto => {
                const div = document.createElement("div");
                // CLASE position-relative NECESARIA para posicionar el botón de borrado
                div.className = "proyecto-card position-relative"; 
                div.dataset.id = proyecto.id;
                
                // Escapa comillas simples en el nombre del proyecto para el onclick
                const projectNameSafe = proyecto.name ? proyecto.name.replace(/'/g, "\\'") : 'Proyecto sin nombre';


                div.innerHTML = `
                    <button 
                        class="btn-delete-project" 
                        title="Eliminar Proyecto"
                        onclick="deleteProject('${proyecto.id}', '${token}', '${projectNameSafe}')">
                        <i class="bi bi-trash-fill"></i>
                    </button>
                    <div class="proyecto-info">
                        <h3 class="proyecto-title">${proyecto.name || "Proyecto sin nombre"}</h3>
                        ${
                            proyecto.video_id
                                ? `<p class="proyecto-video">🎬 Video asociado</p>`
                                : `<p class="proyecto-video sin-video">Sin video asociado</p>`
                        }
                        <button class="btn ver-proyecto">Ver detalles</button>
                    </div>
                `;

                const boton = div.querySelector(".ver-proyecto");
                boton.addEventListener("click", () => {
                    localStorage.setItem("proyectoSeleccionadoId", proyecto.id);
                    window.location.href = "proyecto.html";
                });
                
                container.appendChild(div);
            });
        }


    } catch (err) {
        console.error("Error cargando proyectos:", err);
        info.classList.replace("alert-info", "alert-danger");
        info.textContent = "Error al cargar los proyectos: " + err.message;
        info.style.display = "block";
    }

});