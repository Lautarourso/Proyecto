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
  if (!video.datos || !video.datos.data) {
    console.warn("Video sin datos:", video);
    return;
  }

  // 1. Convertir el buffer a Uint8Array
  const byteArray = new Uint8Array(video.datos.data);

  // 2. Crear un Blob desde el array binario
  const blob = new Blob([byteArray], { type: video.tipo_mime });

  // 3. Crear una URL temporal desde el Blob
  const videoURL = URL.createObjectURL(blob);

  // 4. Insertar el video en el DOM
  const div = document.createElement("div");
  div.classList.add("video-placeholder");
  div.innerHTML = `
    <video controls width="100%" height="100%">
      <source src="${videoURL}" type="${video.tipo_mime}">
      Tu navegador no soporta video HTML5.
    </video>
    <p class="mt-2 text-center">Video #${video.id}</p>
  `;
  container.appendChild(div);
});





  } catch (err) {
    info.classList.replace("alert-info", "alert-danger");
    info.textContent = "Error al cargar los videos: " + err.message;
  }
});
