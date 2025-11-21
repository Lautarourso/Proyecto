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
            info.textContent = "No tenés proyectos cargados. ¡Creá uno nuevo!";
            // Esto asegura que si no hay proyectos, el mensaje queda visible
            info.style.display = "block";
            
            // Si no hay proyectos, podemos salir del try, pero la lógica de creación debe seguir
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

    // =========================================================
    // 2. LÓGICA DE CREAR PROYECTO (Unificada)
    // =========================================================

    // Referencias a elementos del modal
    const form = document.getElementById("crearProyectoForm");
    const nombreInput = document.getElementById("nombreProyecto");
    const videoSourceSelect = document.getElementById("videoSourceSelect");
    const fileUploadGroup = document.getElementById("fileUploadGroup");
    const urlInputGroup = document.getElementById("urlInputGroup");
    const noVideoCheck = document.getElementById("noVideoCheck");
    const videoFile = document.getElementById("videoFile");
    const videoUrl = document.getElementById("videoUrl");

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

        // Actualizar el atributo 'required' al cambiar la fuente
        if (!noVideoCheck.checked) {
            if (videoSourceSelect.value === 'file') {
                videoFile.setAttribute('required', 'required');
                videoUrl.removeAttribute('required');
            } else {
                videoFile.removeAttribute('required');
                videoUrl.setAttribute('required', 'required');
            }
        }
    });

    // Lógica para deshabilitar opciones de video si se marca 'No asignar'
    noVideoCheck.addEventListener('change', () => {
        const videoOpciones = document.getElementById('videoOpciones');
        const isChecked = noVideoCheck.checked;
        videoOpciones.style.display = isChecked ? 'none' : 'block';

        if (isChecked) {
            // Limpiar y quitar required
            videoFile.value = '';
            videoUrl.value = '';
            videoFile.removeAttribute('required'); 
            videoUrl.removeAttribute('required');
        } else {
            // Restaurar required basado en la opción seleccionada
            videoSourceSelect.dispatchEvent(new Event('change'));
        }
    });
    
    // Ejecutar cambio inicial para establecer required
    videoSourceSelect.dispatchEvent(new Event('change'));
    // Deshabilitar la opción por defecto de no video, si no está marcada
    noVideoCheck.dispatchEvent(new Event('change'));


    // Submit del formulario
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        if (!token) {
            Swal.fire('Error', 'No estás autenticado.', 'error');
            return;
        }

        const nombre = nombreInput.value.trim();
        const noVideo = noVideoCheck.checked;
        let tieneVideoAsignado = false;
        
        // Validación básica
        if (nombre === "") {
            Swal.fire('Atención', 'El nombre del proyecto no puede estar vacío.', 'warning');
            return;
        }

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

            if (!proyectoRes.ok) {
                const errorData = await proyectoRes.json();
                throw new Error(`Error al crear proyecto: ${errorData.message || 'Error desconocido'}`);
            }
            
            const nuevoProyecto = await proyectoRes.json();
            const proyectoId = nuevoProyecto.id;

            // 2. Manejar la asignación del video
            if (!noVideo) {
                const source = videoSourceSelect.value;

                if (source === 'file' && videoFile.files.length > 0) {
                    // Opción: Subir Archivo
                    
                    Swal.fire({
                        title: 'Subiendo Video...',
                        text: 'Por favor, espera mientras se procesa el archivo. Esto puede tardar.',
                        allowOutsideClick: false,
                        didOpen: () => {
                            Swal.showLoading();
                        }
                    });

                    const formData = new FormData();
                    formData.append("video", videoFile.files[0]);
                    formData.append("proyectoId", proyectoId);

                    const uploadRes = await fetch("https://proyecto-zvzl.onrender.com/vids/upload", {
                        method: "POST",
                        headers: { "Authorization": `Bearer ${token}` },
                        body: formData
                    });

                    if (!uploadRes.ok) {
                        const errorData = await uploadRes.json();
                        throw new Error(`Error al subir el archivo de video: ${errorData.message || 'Error desconocido'}`);
                    }
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
                    
                    if (!urlRes.ok) {
                        const errorData = await urlRes.json();
                        throw new Error(`Error al asignar la URL de video: ${errorData.message || 'Error desconocido'}`);
                    }
                    tieneVideoAsignado = true;
                }
                
                // Si el usuario eligió una fuente (file/url) pero el campo está vacío
                if (!tieneVideoAsignado) {
                    throw new Error("Debes seleccionar un archivo o ingresar una URL válida para el video.");
                }
            }
            
            // Ocultar modal y SweetAlerts anteriores
            const modalElement = document.getElementById('crearProyectoModal');
            const modal = bootstrap.Modal.getInstance(modalElement);
            if (modal) modal.hide();
            Swal.close(); 

            // 3. Mostrar confirmación y redirigir/recargar
            Swal.fire({
                title: '¡Éxito!',
                text: `Proyecto "${nombre}" creado correctamente. ${tieneVideoAsignado ? 'Video asignado y en proceso de análisis. Serás redirigido.' : 'Sin video asignado. Podrás cargarlo más tarde.'}`,
                icon: 'success',
                confirmButtonText: 'Continuar'
            }).then(() => {
                // Si tiene video asignado, redirigir a proyecto.html
                if (tieneVideoAsignado) {
                    localStorage.setItem("proyectoSeleccionadoId", proyectoId);
                    window.location.href = "proyecto.html";
                } else {
                    // Si no tiene video, recargar la página de videos para mostrar el nuevo proyecto en la lista
                    window.location.reload();
                }
            });

        } catch (error) {
            console.error("Error en la creación del proyecto:", error);
            // Asegurarse de cerrar cualquier SweetAlert de carga o éxito
            Swal.close(); 
            Swal.fire('Error', error.message || 'Ocurrió un error al crear el proyecto.', 'error');
        }
    });
});