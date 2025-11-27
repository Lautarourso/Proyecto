let analisis = null; 
let token = null; 
let id = null;

id = localStorage.getItem("proyectoSeleccionadoId");
token = localStorage.getItem("authToken");
let contenedor = document.getElementById("proyecto-detalle");

function showAlert(icon, title, text) {
  return Swal.fire({
    icon: icon,
    title: title,
    text: text,
    showConfirmButton: false, // Ocultamos botón para que sea automático
    timer: 2000 // Dura 2 segundos
  });
}

async function checkFormExists() {
  try {
    const res = await fetch(`https://proyecto-zvzl.onrender.com/form/dup/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const data = await res.json();
    return data.exists; // true si ya existe
  } catch (error) {
    console.error("Error verificando formulario:", error);
    return false;
  }
}

document.addEventListener("DOMContentLoaded", async () => {


  if (!id) {
    contenedor.textContent = "No se indicó un proyecto.";
    return;
  }

  // 🟢 Verificar si ya hay formulario subido
  const yaExiste = await checkFormExists(id, token);
  if (yaExiste) {
    alert("Este proyecto ya tiene datos subidos. Serás redirigido a la página de videos.");
    localStorage.removeItem("proyectoSeleccionadoId");
    window.location.href = "videos.html";
    return;
  }

  try {
    const res = await fetch(`https://proyecto-zvzl.onrender.com/proyectos/${id}`,{
      headers: { Authorization: `Bearer ${token}` }
    });
    
    const proyecto = await res.json();
    let video = {}; 

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

    contenedor.innerHTML = `
      <h2>${proyecto.name || "Proyecto sin título"}</h2>
      ${
        video.url
          ? `<video controls width="500" src="${video.url}"></video>`
          : `
              <p>No hay video asociado.</p>
              <button id="btnSubirVideo" style="margin-top:10px;">Subir video</button>
              <input type="file" id="inputVideo" accept="video/*" style="display:none;">
            `
      }
    `;

    // 🟢 LÓGICA PARA SUBIR VIDEO (solo si no existe)
    if (!video.url) {
      const btn = document.getElementById("btnSubirVideo");
      const input = document.getElementById("inputVideo");

      btn.addEventListener("click", () => {
        input.click(); // abrir explorador
      });

      input.addEventListener("change", async () => {
        const file = input.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("video", file);
        formData.append("proyecto_id", id);

        try {
          const res = await fetch("https://proyecto-zvzl.onrender.com/vids/upload", {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData
          });

          const data = await res.json();
          console.log("Video subido:", data);

          // Actualizar contenido sin recargar
          contenedor.innerHTML = `
            <h2>${proyecto.name}</h2>
            <video controls width="500" src="${data.url}"></video>
            <h3>Análisis:</h3>
            ${
              analisis.length > 0
                ? `<ul>${analisis
                    .map(a => `<p>Tiempo: ${a.tiempo}s — Distancia: ${a.distancia}m</p>`)
                    .join("")}</ul>`
                : "<p>No hay análisis cargados.</p>"
            }
          `;
        } catch (err) {
          console.error("Error subiendo video:", err);
          alert("Error al subir el video.");
        }
      });
    }

  } catch (err) {
    console.error(err);
    document.getElementById("proyecto-detalle").textContent = "Error al cargar el proyecto.";
  }
});


// 🟡 SEGUNDO DOMContentLoaded — Lo dejo igual que tenías
document.addEventListener("DOMContentLoaded", () => {

  const boton = document.getElementById("btnAccion");
  if (boton) {
    boton.addEventListener("click", async () => {
      console.log("🔹 Botón presionado. Acción pendiente por definir...");

      boton.disabled = true;
      boton.innerText = "Procesando..."; // Cambiamos el texto

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

      const payload = {
        proyectoId: id,
        datosMaterial: formData,
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
        console.log("✅ Respuesta del backend:", data);

        const mail = "lautarourso@gmail.com";
        const resPython = await fetch("https://proyecto-zvzl.onrender.com/form/python", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ id, token, emailUsuario: mail })
        });
  
        const dataPython = await resPython.json();
        console.log("📄 Informe recibido:", dataPython);
        
        localStorage.removeItem("proyectoSeleccionadoId");
  
        await showAlert('success', 'Formulario enviado', 'Volviendo a la página de proyectos...');
  
          // Redirección después de que la alerta se muestre
          setTimeout(() => {
            window.location.href = "videos.html";
          }, 1500);

      } catch (error) {
        alert("Error al enviar datos", error);
      }

      
    });
  }
});
