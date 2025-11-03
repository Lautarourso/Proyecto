import formservice from "../services/form.service.js";

const IA = async (req, res) => {
  const datos = req.body;
  try {
    await formservice.Cañerias({
        ...datos,
    });
    res.status(201).json({ message: "Usuario registrado con éxito" });
} catch (error) {
    res.status(500).json({ message: error.message });
}
};

export default { IA};
