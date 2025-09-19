import Proyectos from "../services/proyectos.service.js";
import cloudinary from "../config/cloudinary.js";
import proyectosService from "../services/proyectos.service.js";

export const UploadP = async (req, res) => {
  try {
    const { analisisData, videoData } = req.body;
    
    try {
      analisisData = JSON.parse(analisisData);
      videoData = videoData ? JSON.parse(videoData) : null;
    } catch (err) {
      return res.status(400).json({ message: "analisisData o videoData no son JSON válidos" });
    }
    
    if (!analisisData || !Array.isArray(analisisData) || analisisData.length === 0) {
      return res.status(400).json({ message: "No se enviaron datos de análisis" });
    }

    
    if (!req.file) {
      return res.status(400).json({ message: "No se envió ningún archivo de video." });
    }

    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "video", folder: "tus_videos" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(fileBuffer); // **muy importante** enviar el buffer
      });
    };
    
    const result = await streamUpload(req.file.buffer);
    const tipo_mime= result.resource_type

    const url= result.secure_url
    const proyecto = await proyectosService.createProyectos(
      req.idUsuario,
      analisisData,
      videoData,
      url,
      tipo_mime,
      req.file
    );

    res.status(201).json({
      message: "Proyecto, análisis y video creados con éxito",
      proyecto_id: proyecto.id
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


const GetP = async (req, res) => {
   try{ const proyectos = await Proyectos.GetProyectos(req. idUsuario);
    res.json(proyectos);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

export default { UploadP, GetP};