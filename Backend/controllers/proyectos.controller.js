import Proyectos from "../services/proyectos.service.js";
import cloudinary from "../config/cloudinary.js";
import proyectosService from "../services/proyectos.service.js";

export const UploadP = async (req, res) => {
  try {
    const { analisisData, Name } = req.body;

    let parsedAnalisis;
      try {
        parsedAnalisis = JSON.parse(analisisData);
      } catch (err) {
        return res.status(400).json({ message: "analisisData no es JSON válido" });
      
}
  
    if (!analisisData || !Name ) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    
    const proyecto = await proyectosService.createProyectos(
      req.idUsuario,
      parsedAnalisis,
      Name,
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