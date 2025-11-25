import videosService from "../services/videos.service.js";
import cloudinary from "../config/cloudinary.js";

const UploadV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No se envió ningún archivo." });
    }

    const { proyecto_id } = req.body;

    // Convertimos upload_stream a una Promesa
    const subirVideoCloudinary = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "video", folder: "tus_videos" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );

        stream.end(req.file.buffer);
      });
    };

    // Esperamos a que Cloudinary termine la subida
    const cloudResult = await subirVideoCloudinary();

    // Creamos el video en la DB
    const videoCreado = await videosService.createvideo({
      url: cloudResult.secure_url,
      tipo_mime: cloudResult.resource_type,
      user_id: req.idUsuario,
      proyecto_id: proyecto_id || null
    });

    // Si viene un proyecto, lo asociamos
    if (proyecto_id) {
      await proyectosService.asociarVideoAProyecto(
        proyecto_id,
        videoCreado.id
      );
    }

    res.status(201).json({
      message: "Video subido y asociado con éxito",
      url: cloudResult.secure_url
    });

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
