import formservice from "../services/form.service.js";
import { PythonShell } from "python-shell";
import path from "path";


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
      const { id } = req.params;

      const form = await formservice.FormId(id);
  
      if (!form) {
        return res.status(404).json({ message: "Proyecto no encontrado" });
      }
  
      res.json(form);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  export const python = async (req, res) => {
    const { id, token } = req.body;
    console.log("ID recibido desde el front:", id);
  
    const scriptPath = path.join(process.cwd(), "..","IA", "modulo.py");
    console.log("Ruta del script Python:", scriptPath);
  
    PythonShell.run(scriptPath, { args: [id, token] }, (err, results) => {
      if (err) {
        console.error("Error ejecutando Python:", err);
        return res.status(500).json({ error_generacion: err.message });
      }
  
      const informeFinal = results[results.length - 1];
  
      return res.status(200).json({
        status: "success",
        message: "Datos guardados e informe de IA generado.",
        informe: informeFinal,
      });
    });
  };
  
export default { IA, getF, python};
