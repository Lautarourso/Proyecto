import videosService from "../services/videos.service.js";
import cloudinary from "../config/cloudinary.js";

const UploadV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No se envió ningún archivo." });
    }

    const { proyecto_id } = req.body; // <-- importantísimo

    // Subir a Cloudinary
    const uploadResult = await cloudinary.uploader.upload_stream(
      { resource_type: "video", folder: "tus_videos" },
      async (error, result) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: "Error subiendo a Cloudinary" });
        }
        const video = req.body
        // Guarda solo la URL en la DB
        await videosService.createVideo({
          ...video,
          url: result.secure_url,
          tipo_mime: result.resource_type,
          user_id: req.idUsuario
        });

        res.status(201).json({ message: "Video subido con éxito", url: result.secure_url });
      }
    );

    // Pipe para enviarle los datos
    uploadResult.end(req.file.buffer);

      if (proyecto_id) {
        await proyectosService.asociarVideoAProyecto(
          proyecto_id,
          videoCreado.id
        );
      }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};


const GetV = async (req, res) => {
  try {
    const { id } = req.params;
    const videos = await videosService.getVideosById(id);
    console.log("Video encontrado:", videos);
    res.json(videos);
  } catch (error) {
    console.error("Error al obtener videos:", error);
    res.status(500).json({ message: error.message });
  }
};






export default { UploadV, GetV,};
