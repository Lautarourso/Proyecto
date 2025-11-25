import formservice from "../services/form.service.js";
import { PythonShell } from "python-shell";
import path from "path";
import fs from "fs";
import nodemailer from 'nodemailer'; // <--- IMPORTANTE


const transporter = nodemailer.createTransport({
  service: 'gmail', // O el servicio que uses
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

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
  
      res.json([existente ]);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  export const python = async (req, res) => {
    const { id, token, emailUsuario } = req.body;
    
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
        pyshell.end(async function (err, code, signal) {
            if (err) {
                console.error("❌ Python terminó con error:", err);
                return res.status(500).json({ 
                    status: "error",
                    error_generacion: err.message,
                    logs: mensajesPython 
                });
            }

            console.log("✅ Python terminó correctamente. Código:", code);

            const informeFinal = mensajesPython.join("\n");

      // -----------------------------------------------------------------
      // 3. ENVÍO DE CORREO ELECTRÓNICO
      // -----------------------------------------------------------------
      try {
        if (emailUsuario) {
          console.log(`📧 Enviando informe a: ${emailUsuario}...`);
          
          await transporter.sendMail({
            from: `"Sistema de Gasoductos" <${process.env.EMAIL_USER}>`,
            to: emailUsuario,
            subject: `Informe de Análisis Completado - Proyecto #${id}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
                <h2 style="color: #2c3e50;">Informe de Análisis con IA</h2>
                <p>Estimado usuario,</p>
                <p>El análisis para el proyecto <strong>#${id}</strong> ha finalizado exitosamente.</p>
                <hr style="border: 1px solid #eee;">
                <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; white-space: pre-wrap;">
                  <strong>Resumen del Análisis:</strong><br><br>
                  ${informeFinal}
                </div>
                <hr style="border: 1px solid #eee;">
                <p style="font-size: 12px; color: #777;">Este es un mensaje automático generado por el sistema.</p>
              </div>
            `
          });
          console.log("✉️ ¡Correo enviado con éxito!");
        } else {
          console.warn("⚠️ No se envió correo: No se recibió 'emailUsuario' desde el frontend.");
        }
      } catch (emailError) {
        console.error("❌ Error enviando correo:", emailError);
        // No bloqueamos la respuesta, solo logueamos el error
      }

            return res.status(200).json({
                status: "success",
                message: "Informe generado.",
                informe: informeFinal, // Enviamos lo capturado
                debug_logs: mensajesPython // Útil para ver en el frontend qué pasó
            });
        }
      
      );

    } catch (error) {
        console.error("❌ Error al iniciar PythonShell:", error);
        return res.status(500).json({ error: "Error interno iniciando el proceso de IA." });
    }
};
  
export default { IA, getF, python};
