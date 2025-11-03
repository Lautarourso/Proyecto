import formservice from "../services/form.service.js";

const IA = async (req, res) => {
    const { proyectoId, datosMaterial } = req.body;
  try {
    await formservice.Cañerias({
        proyecto_id: proyectoId,
        ...datosMaterial,
    });
    res.status(201).json({ message: "Usuario registrado con éxito" });
} catch (error) {
    res.status(500).json({ message: error.message });
}
};

export default { IA};
