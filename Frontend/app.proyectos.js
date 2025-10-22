document.addEventListener("DOMContentLoaded", async () => {
  const id = localStorage.getItem("proyectoSeleccionadoId");
  const token = localStorage.getItem("authToken");


  if (!id) {
    document.getElementById("proyecto-detalle").textContent = "No se indicó un proyecto.";
    return;
  }
  localStorage.removeItem("proyectoSeleccionadoId");

  try {
    const res = await fetch(`https://proyecto-zvzl.onrender.com/proyectos/${id}`,{
      headers: {Authorization: `Bearer ${token}` }
    });
    
    const proyecto = await res.json();

    const contenedor = document.getElementById("proyecto-detalle");

    contenedor.innerHTML = `
      <h2>${proyecto.videoName || "Proyecto sin título"}</h2>
      ${
        proyecto.videoUrl
          ? `<video controls width="500" src="${proyecto.videoUrl}"></video>`
          : "<p>No hay video asociado.</p>"
      }
      <h3>Análisis:</h3>
      ${
        proyecto.analisisData && proyecto.analisisData.length > 0
          ? `<ul>${proyecto.analisisData.map(a => `
              <li>Tiempo: ${a.tiempo}s — Duración: ${a.duracion}s</li>
            `).join("")}</ul>`
          : "<p>No hay análisis cargados.</p>"
      }
    `;
  } catch (err) {
    console.error(err);
    document.getElementById("proyecto-detalle").textContent = "Error al cargar el proyecto.";
  }
});
