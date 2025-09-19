import Proyectos from "../services/proyectos.service.js";

import proyectosService from "../services/proyectos.service.js";

export const UploadP = async (req, res) => {
  try {
    const { analisisData, videoData } = req.body;

    if (!analisisData || analisisData.length === 0) {
      return res.status(400).json({ message: "No se enviaron datos de análisis" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No se envió ningún archivo de video." });
    }

    const proyecto = await proyectosService.createProyectoCompleto(
      req.idUsuario,
      analisisData,
      videoData,
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