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
// --- LÓGICA DE CREAR PROYECTO ---

document.addEventListener("DOMContentLoaded", () => {
    // Referencias a elementos del modal
    const form = document.getElementById("crearProyectoForm");
    const nombreInput = document.getElementById("nombreProyecto");
    const videoSourceSelect = document.getElementById("videoSourceSelect");
    const fileUploadGroup = document.getElementById("fileUploadGroup");
    const urlInputGroup = document.getElementById("urlInputGroup");
    const noVideoCheck = document.getElementById("noVideoCheck");
    const videoFile = document.getElementById("videoFile");
    const videoUrl = document.getElementById("videoUrl");
    const token = localStorage.getItem("authToken");

    // Lógica para alternar entre subida de archivo y URL
    videoSourceSelect.addEventListener('change', () => {
        if (videoSourceSelect.value === 'file') {
            fileUploadGroup.style.display = 'block';
            urlInputGroup.style.display = 'none';
        } else {
            fileUploadGroup.style.display = 'none';
            urlInputGroup.style.display = 'block';
        }
        // Limpia los campos al cambiar de opción
        videoFile.value = '';
        videoUrl.value = '';
    });

    // Lógica para deshabilitar opciones de video si se marca 'No asignar'
    noVideoCheck.addEventListener('change', () => {
        const videoOpciones = document.getElementById('videoOpciones');
        const isChecked = noVideoCheck.checked;
        videoOpciones.style.display = isChecked ? 'none' : 'block';
        if (isChecked) {
            // Limpiar y deshabilitar para asegurar
            videoFile.value = '';
            videoUrl.value = '';
            videoFile.required = false;
            videoUrl.required = false;
        } else {
            // Restaurar la opción por defecto (archivo)
            videoFile.required = videoSourceSelect.value === 'file';
            videoUrl.required = videoSourceSelect.value === 'url';
        }
    });

    // Submit del formulario
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        if (!token) {
            Swal.fire('Error', 'No estás autenticado.', 'error');
            return;
        }

        const nombre = nombreInput.value;
        const noVideo = noVideoCheck.checked;
        let videoData = null; // null si no se asigna video o si es por URL

        try {
            // 1. Crear el proyecto (sin video inicialmente)
            const proyectoRes = await fetch("https://proyecto-zvzl.onrender.com/proyectos/new", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ name: nombre })
            });

            if (!proyectoRes.ok) throw new Error("Error al crear proyecto.");
            const nuevoProyecto = await proyectoRes.json();
            const proyectoId = nuevoProyecto.id;

            // 2. Manejar la asignación del video
            let tieneVideoAsignado = false;

            if (!noVideo) {
                const source = videoSourceSelect.value;
                if (source === 'file' && videoFile.files.length > 0) {
                    // Opción: Subir Archivo
                    const formData = new FormData();
                    formData.append("video", videoFile.files[0]);
                    formData.append("proyectoId", proyectoId);

                    const uploadRes = await fetch("https://proyecto-zvzl.onrender.com/vids/upload", {
                        method: "POST",
                        headers: { "Authorization": `Bearer ${token}` },
                        body: formData
                    });

                    if (!uploadRes.ok) throw new Error("Error al subir el archivo de video.");
                    videoData = await uploadRes.json();
                    tieneVideoAsignado = true;

                } else if (source === 'url' && videoUrl.value.trim() !== '') {
                    // Opción: Asignar URL
                    const url = videoUrl.value.trim();
                    const urlRes = await fetch("https://proyecto-zvzl.onrender.com/vids/assignUrl", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify({ proyectoId, url })
                    });
                    if (!urlRes.ok) throw new Error("Error al asignar la URL de video.");
                    videoData = await urlRes.json();
                    tieneVideoAsignado = true;
                }
            }

            // 3. Mostrar confirmación y redirigir/recargar
            Swal.fire({
                title: '¡Éxito!',
                text: `Proyecto "${nombre}" creado correctamente. ${tieneVideoAsignado ? 'Video asignado.' : 'Sin video asignado.'}`,
                icon: 'success',
                confirmButtonText: 'Continuar'
            }).then(() => {
                const modalElement = document.getElementById('crearProyectoModal');
                const modal = bootstrap.Modal.getInstance(modalElement);
                modal.hide();

                // Si tiene video asignado, te pide el análisis (redirigiendo a proyecto.html)
                if (tieneVideoAsignado) {
                    localStorage.setItem("proyectoSeleccionadoId", proyectoId);
                    window.location.href = "proyecto.html";
                } else {
                    // Si no tiene video, recarga la página de videos
                    window.location.reload();
                }
            });

        } catch (error) {
            console.error("Error en la creación del proyecto:", error);
            Swal.fire('Error', error.message || 'Ocurrió un error al crear el proyecto.', 'error');
        }
    });

    // Asegurarse de que el campo de video correcto esté marcado como requerido inicialmente
    document.getElementById("videoSourceSelect").dispatchEvent(new Event('change'));
    
});