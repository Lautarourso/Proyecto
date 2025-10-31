import formservice from "../services/form.service.js";

export const IA = async (req, res) => {
    try {
      const datos = req.body;
  
      // Ruta absoluta al script Python
      const scriptPath = path.resolve(process.cwd(), "IA", "Numericos.py");
  
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