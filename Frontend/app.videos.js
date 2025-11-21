document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("authToken");
  const container = document.getElementById("proyectosContainer");
  const info = document.getElementById("proyectosInfo");

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

    // Asegurarse de que sea un array
    const proyectos = Array.isArray(data) ? data : data.proyectos || [];

    if (proyectos.length === 0) {
      info.classList.replace("alert-info", "alert-warning");
      info.textContent = "No tenés proyectos cargados.";
      return;
    }

    info.style.display = "none";
    container.innerHTML = ""; // limpiar contenido previo

    proyectos.forEach(proyecto => {
      const div = document.createElement("div");
      div.className = "proyecto-card";
      div.dataset.id = proyecto.id; // guardar el id del proyecto

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

      // Al hacer clic en el botón, redirige a proyectos.html?id=ID
      const boton = div.querySelector(".ver-proyecto");
      boton.addEventListener("click", () => {
        localStorage.setItem("proyectoSeleccionadoId", proyecto.id);
        window.location.href = "proyecto.html";
      });
      

      container.appendChild(div);
    });

  } catch (err) {
    console.error("Error cargando proyectos:", err);
    info.classList.replace("alert-info", "alert-danger");
    info.textContent = "Error al cargar los proyectos: " + err.message;
  }
});
