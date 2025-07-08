document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("authToken");
  
    if (!token) {
      console.error("No hay token. No puedes pedir videos.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:9000/vids/videos", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        console.error("Error al pedir videos:", await response.text());
        return;
      }
  
      const videos = await response.json();
      console.log("Videos recibidos:", videos);
  
      const container = document.querySelector(".video-container");
      const info = document.getElementById("videosInfo");
  
      if (videos.length === 0) {
        info.innerText = "No hay videos disponibles.";
      } else {
        info.style.display = "none";
  
        videos.forEach(video => {
          const div = document.createElement("div");
          div.classList.add("video-placeholder");
          div.innerHTML = `
            <div>
              <i class="bi bi-play-circle-fill" style="font-size: 2rem; color: var(--naranja);"></i>
              <p class="mt-2">${video.titulo || "Video sin título"}</p>
            </div>
          `;
          container.appendChild(div);
        });
      }
  
    } catch (err) {
      console.error("Error de red:", err);
    }
  });
  