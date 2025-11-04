import formservice from "../services/form.service.js";

const IA = async (req, res) => {
    const { proyectoId, datosMaterial } = req.body;

    

  try {

    const usuario2 = await formservice.getFormbyIDP(proyectoId);

    if (usuario2)
        return res.status(400).json({ message: "Ya has subido los datos de este proyecto" });

    await formservice.Cañerias({
        proyecto_id: proyectoId,
        ...datosMaterial,
    });
    res.status(201).json({ message: "Formulario subido" });
} catch (error) {
    res.status(500).json({ message: error.message });
}
};

export const getF = async (req, res) => {
    try {
      const form = await formservice.FormId(req.params.id);
  
      if (!form) {
        return res.status(404).json({ message: "Proyecto no encontrado" });
      }
  
      res.json(form);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

export default { IA, getF};
