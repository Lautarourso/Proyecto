let analisis = null; 
let token = null; 
let id = null;

document.addEventListener("DOMContentLoaded", async () => {
  id = localStorage.getItem("proyectoSeleccionadoId");
  token = localStorage.getItem("authToken");


  if (!id) {
    document.getElementById("proyecto-detalle").textContent = "No se indicó un proyecto.";
    return;
  }

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


    const resAnalisis = await fetch(`https://proyecto-zvzl.onrender.com/analisis/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    analisis = await resAnalisis.json();

    
    const contenedor = document.getElementById("proyecto-detalle");

    contenedor.innerHTML = `
      <h2>${proyecto.name || "Proyecto sin título"}</h2>
      ${
        video.url
          ? `<video controls width="500" src="${video.url}"></video>`
          : "<p>No hay video asociado.</p>"
      }
      <h3>Análisis:</h3>
      ${
        analisis.length > 0
          ? `<ul>${analisis.map(a => `
              <p>Tiempo: ${a.tiempo}s — Distancia: ${a.distancia}s</p>
            `).join("")}</ul>`
          : "<p>No hay análisis cargados.</p>"
      }
    `;
  } catch (err) {
    console.error(err);
    document.getElementById("proyecto-detalle").textContent = "Error al cargar el proyecto.";
  }
});

document.addEventListener("DOMContentLoaded", () => {

  const boton = document.getElementById("btnAccion");
  if (boton) {
    boton.addEventListener("click", async () => {
      console.log("🔹 Botón presionado. Acción pendiente por definir...");
      const formData = {
        falla: document.getElementById("falla").value,
        material: document.getElementById("material").value,
        espesor: parseFloat(document.getElementById("espesor").value),
        diametro: parseFloat(document.getElementById("diametro").value),
        antiguedad: parseInt(document.getElementById("antiguedad").value),
        tfme: parseFloat(document.getElementById("tfme").value),
        latitudInicial: document.getElementById("latitudInicial").value,
        latitudFinal: document.getElementById("latitudFinal").value,
        longitudInicial: document.getElementById("longitudInicial").value,
        longitudFinal: document.getElementById("longitudFinal").value,
        presionHabitual: parseFloat(document.getElementById("presionHabitual").value),
        presionMaxima: parseFloat(document.getElementById("presionMaxima").value),
      };

      // Crear objeto combinado
      const payload = {
        proyectoId: id,
        datosMaterial: formData,
        //datosAnalisis: analisis,
      };

      try {
        const res = await fetch("https://proyecto-zvzl.onrender.com/form/numericos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        localStorage.removeItem("proyectoSeleccionadoId");
        console.log("✅ Respuesta del backend:", data);

        alert("Datos enviados correctamente a Numericos.py");
      } catch (error) {
        console.error("❌ Error al enviar datos:", error);
        alert("Error al enviar datos.");
      }
    });
  }
});