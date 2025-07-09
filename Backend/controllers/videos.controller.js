import videosService from "../services/videos.service.js";

const UploadV = async (req,res) => {
    const video = req.body;

    
    try {
        await videosService.createVideo({
            ...video,
            datos: req.file.buffer,   // BLOB
            tipo_mime: "video/mp4",
            user_id: req.idUsuario
        });
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
