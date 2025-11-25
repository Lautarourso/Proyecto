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
    
    // Log inicial para confirmar que la petición entró
    console.log("🚀 CONTROLADOR PYTHON INICIADO. ID:", id);

    // Configuración de rutas
    const scriptDir = path.join(process.cwd(), "IA");
    const scriptFile = "Modulo.py";
    const fullPath = path.join(scriptDir, scriptFile);

    console.log("📂 Directorio del script:", scriptDir);
    
    // Verificación de existencia
    if (!fs.existsSync(fullPath)) {
        console.error("❌ EL ARCHIVO NO EXISTE:", fullPath);
        return res.status(500).json({ error: "El script de Python no se encuentra en el servidor." });
    }

    // Opciones vitales para Render
    let options = {
        mode: 'text',
        pythonPath: 'python3',       // Forzamos python3 (Render a veces confunde versiones)
        pythonOptions: ['-u'],       // -u forzará el modo "unbuffered" (sin espera)
        scriptPath: scriptDir,       // Carpeta donde está el script
        args: [id, token]
    };

    // Array para guardar lo que vaya diciendo Python
    let mensajesPython = [];

    try {
        // Instanciamos PythonShell (modo interactivo)
        let pyshell = new PythonShell(scriptFile, options);

        // EVENTO 1: Cada vez que Python hace un print(), lo vemos AQUÍ y AHORA
        pyshell.on('message', function (message) {
            console.log('🐍 [PYTHON DICE]:', message);
            mensajesPython.push(message);
        });

        // EVENTO 2: Si Python tira un error (stderr)
        pyshell.on('stderr', function (stderr) {
            console.log('⚠️ [PYTHON ERROR]:', stderr);
        });

        // EVENTO 3: Cuando Python termina
        pyshell.end(function (err, code, signal) {
            if (err) {
                console.error("❌ Python terminó con error:", err);
                return res.status(500).json({ 
                    status: "error",
                    error_generacion: err.message,
                    logs: mensajesPython 
                });
            }

            console.log("✅ Python terminó correctamente. Código:", code);

            // El informe suele ser el último mensaje largo, o unimos todo
            // Aquí asumimos que el último mensaje es el informe final
            const informeFinal = mensajesPython.length > 0 
                ? mensajesPython[mensajesPython.length - 1] 
                : "No se recibió texto de Python";

            return res.status(200).json({
                status: "success",
                message: "Informe generado.",
                informe: informeFinal, // Enviamos lo capturado
                debug_logs: mensajesPython // Útil para ver en el frontend qué pasó
            });
        });

    } catch (error) {
        console.error("❌ Error al iniciar PythonShell:", error);
        return res.status(500).json({ error: "Error interno iniciando el proceso de IA." });
    }
};
  
export default { IA, getF, python};
