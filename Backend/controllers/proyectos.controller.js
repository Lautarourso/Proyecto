import Proyectos from "../services/proyectos.service.js";
import cloudinary from "../config/cloudinary.js";
import proyectosService from "../services/proyectos.service.js";

export const UploadP = async (req, res) => {
  try {
    const { analisisData, Name } = req.body;

    if (!analisisData || !Name) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    // ✅ Como viene en RAW JSON, NO se parsea
    let parsedAnalisis = analisisData; 
    let parsedName = Name;

    const proyecto = await proyectosService.createProyectos(
      req.idUsuario,
      parsedAnalisis,
      parsedName
    );

    res.status(201).json({
      message: "Proyecto, análisis y video creados con éxito",
      proyecto_id: proyecto.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const GetP = async (req, res) => {
  try {
    const proyectos = await Proyectos.GetProyectos(req.idUsuario);
    res.json(proyectos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default { UploadP, GetP };
