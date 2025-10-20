import cloudinary from "../config/cloudinary.js";
import proyectosService from "../services/proyectos.service.js";

export const UploadP = async (req, res) => {
  try {
    const { analisisData } = req.body;

    if (!analisisData) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    // ✅ Como viene en RAW JSON, NO se parsea
    let parsedAnalisis = analisisData; 

    const proyecto = await proyectosService.createProyectos(
      req.idUsuario,
      parsedAnalisis,
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
    console.log("🟦 [GetP] ID del usuario recibido:", req.idUsuario);
    const proyectos = await proyectosService.GetProyectos(req.idUsuario);
    console.log("🟩 [GetP] Proyectos obtenidos:", proyectos.length);
    res.json(proyectos);
  } catch (error) {
    console.error("❌ [GetP] Error:", error);
    res.status(500).json({ message: error.message });
  }
};


export const NameP = async (req, res) => {
  try {
    const { Name, id } = req.body;
    if (!Name || !id) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    let parsedName = Name;
    let proyecto_id = id;

    const proyectosa = await proyectosService.renameProyectos(
      parsedName,
      proyecto_id
    );
    res.json(proyectosa);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default { UploadP, GetP, NameP};
