import Proyectos from "../services/proyectos.service.js";

const UploadP = async (req, res) => {
    const proyectos = req.body
    try {
      await Proyectos.createProyectos({
          ...proyectos,
          Usuario_id: req.idUsuario
      });
      res.status(201).json({ message: "Usuario registrado con éxito" });
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