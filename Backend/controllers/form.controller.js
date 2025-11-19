import formservice from "../services/form.service.js";
import { PythonShell } from "python-shell";
import path from "path";
import fs from "fs";


const IA = async (req, res) => {
    const { proyectoId, datosMaterial } = req.body;

    

  try {

    

    
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

      const existente = await formservice.getFormbyIDP(id);
  
      res.json({ exists: !!existente });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  export const python = async (req, res) => {
    const { id, token } = req.body;
    console.log("ID recibido desde el front:", id);
  
    const scriptPath = path.join(process.cwd(),  "IA", "Modulo.py");

    console.log("CWD:", process.cwd());
    console.log("Ruta del script Python:", scriptPath);
    console.log("¿Existe el archivo?", fs.existsSync(scriptPath));  

    PythonShell.run(scriptPath, { args: [id, token] }, (err, results) => {
      if (err) {
        console.error("Error ejecutando Python:", err);
        return res.status(500).json({ error_generacion: err.message });
      }
  
      const informeFinal = results?.length ? results[results.length - 1] : null;
      console.log("📌 Resultados del script:", results);

  
      return res.status(200).json({
        status: "success",
        message: "Datos guardados e informe de IA generado.",
        informe: informeFinal,
      });
    });
  };
  
export default { IA, getF, python};
