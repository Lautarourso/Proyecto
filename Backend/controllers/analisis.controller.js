import Analisis from "../services/analisis.service.js";
import { execFile } from "child_process";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const IA = async (req, res) => {
  try {
    const datos = req.body;

    // Ruta absoluta al script Python
    const scriptPath = path.join(__dirname, "../../Proyecto/IA/Numericos.py");

    // Ejecutamos el script, pasándole los datos como JSON
    execFile("python3", [scriptPath, JSON.stringify(datos)], (error, stdout, stderr) => {
      if (error) {
        console.error("Error ejecutando Numericos.py:", stderr);
        return res.status(500).json({ message: "Error en el script Python", error: stderr });
      }

      console.log("Salida de Python:", stdout);
      res.json({ message: "Ejecución exitosa", resultado: stdout });
    });
  } catch (error) {
    console.error("Error en el controlador:", error);
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

const GetT = async (req, res) => {
  try {
    const { id } = req.params;

    const analisis = await Analisis.GetAnalisis(id); // viene del token
    res.json(analisis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export default { GetT, IA};
