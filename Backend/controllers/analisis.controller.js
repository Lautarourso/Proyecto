import Analisis from "../services/analisis.service.js";


const UploadT = async (req, res) => {
    const analisis = req.body
    try {
      await Analisis.createAnalisis({
          ...analisis,
      });
      res.status(201).json({ message: "Usuario registrado con éxito" });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

export default { UploadT};
