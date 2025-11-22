document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("authToken");
    const container = document.getElementById("proyectosContainer");
    const info = document.getElementById("proyectosInfo");

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
            // Se actualiza el mensaje ya que la opción de crear fue eliminada
            info.textContent = "No tenés proyectos cargados."; 
            info.style.display = "block";
            
        } else {
            info.style.display = "none";
            container.innerHTML = ""; 

            proyectos.forEach(proyecto => {
                const div = document.createElement("div");
                div.className = "proyecto-card";
                div.dataset.id = proyecto.id;

                div.innerHTML = `
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