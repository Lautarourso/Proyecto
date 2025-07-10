import videosService from "../services/videos.service.js";
import fs from 'fs/promises'; // al principio del archivo

const UploadV = async (req, res) => {
  const video = req.body;

  try {
    const filePath = req.file.path;

    // Leer el archivo como buffer
    const buffer = await fs.readFile(filePath);

    await videosService.createVideo({
      ...video,
      datos: buffer,
      tipo_mime: req.file.mimetype,
      user_id: req.idUsuario
    });

    // Opcional: eliminar archivo temporal luego de guardarlo
    await fs.unlink(filePath);

    res.status(201).json({ message: "Video subido con éxito" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const GetV = async (req, res) => {
  try {
    const videos = await videosService.getVideosById(req.idUsuario);
    console.log("Videos encontrados:", videos);
    res.json(videos);
  } catch (error) {
    console.error("Error al obtener videos:", error);
    res.status(500).json({ message: error.message });
  }
};






export default { UploadV, GetV,};
