document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("authToken");
  const container = document.querySelector(".video-container");
  const info = document.getElementById("videosInfo");

  console.log("Token en videos.html:", token);

  if (!token) {
    info.classList.replace("alert-info", "alert-danger");
    info.textContent = "No estás autenticado. Iniciá sesión primero.";
    return;
  }

  try {
    const response = await fetch("https://proyecto-zvzl.onrender.com/vids/videos", {
      method: "GET",
      headers: { 
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    console.log("Response status:", response.status);

    const text = await response.text();
    console.log("Response text:", text);

    let videos;
    try {
      videos = JSON.parse(text);
    } catch (err) {
      throw new Error("No se pudo parsear la respuesta JSON: " + err.message);
    }

    console.log("Videos parseados:", videos);

    if (!Array.isArray(videos) || videos.length === 0) {
      info.classList.replace("alert-info", "alert-warning");
      info.textContent = "No tenés videos disponibles.";
      return;
    }

    info.style.display = "none";

    videos.forEach(video => {
      if (!video.url) {
        console.warn("Video sin URL:", video);
        return;
      }

      const fecha = new Date(video.fecha).toLocaleString('es-AR');

      const div = document.createElement("div");
      div.innerHTML = `
        <video controls width="100%" height="100%">
          <source src="${video.url}" type="video/mp4">
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
    console.error("Error cargando videos:", err);
    info.classList.replace("alert-info", "alert-danger");
    info.textContent = "Error al cargar los videos: " + err.message;
  }
});
