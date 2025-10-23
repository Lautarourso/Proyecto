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

    let video = null
    if (proyecto.video_id) {
      const resVideo = await fetch(`https://proyecto-zvzl.onrender.com/vids/${proyecto.video_id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      video = await resVideo.json();

    }


    const resAnalisis = await fetch(`https://proyecto-zvzl.onrender.com/analisis/proyecto/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const analisis = await resAnalisis.json();

    
    const contenedor = document.getElementById("proyecto-detalle");

    contenedor.innerHTML = `
      <h2>${proyecto.name || "Proyecto sin título"}</h2>
      ${
        video.url
          ? `<video controls width="500" src="${video.videoUrl}"></video>`
          : "<p>No hay video asociado.</p>"
      }
      <h3>Análisis:</h3>
      ${
        analisis.length > 0
          ? `<ul>${analisis.map(a => `
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
