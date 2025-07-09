document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("authToken");
  const container = document.querySelector(".video-container");
  const info = document.getElementById("videosInfo");

  if (!token) {
    info.classList.replace("alert-info", "alert-danger");
    info.textContent = "No estás autenticado. Iniciá sesión primero.";
    return;
  }

  try {
    const response = await fetch("http://localhost:9000/vids/videos", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error("Error al obtener los videos.");
    }

    const videos = await response.json();

    if (videos.length === 0) {
      info.textContent = "No tenés videos aún.";
      return;
    }

    info.style.display = "none";

    videos.forEach(video => {
  // Validar que el campo datos exista y tenga buffer
  if (!video.datos || !video.datos.data) {
    console.warn("Video sin datos:", video);
    return;
  }

  // Convertir el buffer a Uint8Array (para usarlo como Blob)
  const byteArray = new Uint8Array(video.datos.data);
  const blob = new Blob([byteArray], { type: video.tipo_mime });

  // Crear una URL temporal para el video
  const videoURL = URL.createObjectURL(blob);

  // Formatear la fecha
  const fecha = new Date(video.fecha).toLocaleString('es-AR');

  // Crear el contenedor del video
  const div = document.createElement("div");
  div.classList.add("video-placeholder");

  div.innerHTML = `
  <video controls width="100%" height="100%">
    <source src="${videoURL}" type="${video.tipo_mime}">
    Tu navegador no soporta video HTML5.
  </video>
  <div class="mt-2 text-center">
    <p class="mb-1">Video #${video.id}</p>
    <p class="text-muted small">${fecha}</p>
  </div>
`;

  container.appendChild(div);
});






  } catch (err) {
    info.classList.replace("alert-info", "alert-danger");
    info.textContent = "Error al cargar los videos: " + err.message;
  }
});
