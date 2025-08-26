import Proyectos from "../services/proyectos.service.js";

const UploadP = async (req, res) => {
  const analisisData = req.body;

  if (!analisisData || analisisData.length === 0) {
    return res.status(400).json({ message: "No se enviaron datos de análisis" });
  }

    try {
      const proyecto = await Proyectos.createProyectos(
        req.idUsuario,   // primer parámetro
        analisisData     // segundo parámetro
      );      
      res.status(201).json({
      message: "Proyecto y análisis creados con éxito",
      proyecto_id: proyecto.id
    });
  } catch (error) {
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