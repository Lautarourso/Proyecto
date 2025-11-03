import formservice from "../services/form.service.js";

const IA = async (req, res) => {
    const { proyectoId, datosMaterial } = req.body;

    

  try {

    const usuario2 = await formservice.getFormbyIDP(proyectoId);

    if (usuario2)
        return res.status(400).json({ message: "Ya hay una cuenta registrada con ese correo" });
        
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
