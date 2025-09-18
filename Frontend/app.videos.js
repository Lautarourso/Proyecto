document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("authToken");
  const container = document.getElementById("videosContainer"); // Cambiado a ID
  const info = document.getElementById("videosInfo");

  if (!token) {
    info.classList.replace("alert-info", "alert-danger");
    info.textContent = "No estás autenticado. Iniciá sesión primero.";
    return;
  }

  try {
    const response = await fetch("https://proyecto-zvzl.onrender.com/vids/videos", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!response.ok) {
      throw new Error(`Error de servidor: ${response.status}`);
    }

    const data = await response.json();
    console.log("Datos recibidos de la API:", data);

    // Manejar ambos casos: array directo o objeto con 'videos'
    const videos = Array.isArray(data) ? data : data.videos || [];

    if (videos.length === 0) {
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
      div.className = "video-card"; // Añade la clase para el estilo
      iv.innerHTML = `
  <video class="video-player" controls preload="metadata" crossorigin="anonymous">
    <source src="${video.url}" type="video/mp4">
    Tu navegador no soporta video HTML5.
  </video>
  <div class="video-info">
    <p class="video-title">Video #${video.id}</p>
    <p class="video-date">${fecha}</p>
  </div>
`;

      console.log("Agregando al DOM:", video.url);
      container.appendChild(div);
    });

  } catch (err) {
    console.error("Error cargando videos:", err);
    info.classList.replace("alert-info", "alert-danger");
    info.textContent = "Error al cargar los videos: " + err.message;
  }
});