import formservice from "../services/form.service.js";
import { PythonShell } from "python-shell";
import path from "path";
import fs from "fs";
import nodemailer from 'nodemailer';

// 1. CONFIGURACIÓN ROBUSTA DE GMAIL
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,               // Puerto seguro SSL
  secure: true,            // SSL activado
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 20000, // 20 segundos de paciencia
  greetingTimeout: 10000,
  socketTimeout: 20000
});

export const IA = async (req, res) => {
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
    if (!existente) return res.status(404).json({ message: "No encontrado" });
    res.json([existente]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const python = async (req, res) => {
  const { id, token, emailUsuario } = req.body;
  
  console.log("🚀 CONTROLADOR PYTHON INICIADO. ID:", id);

  const scriptDir = path.join(process.cwd(), "IA");
  const scriptFile = "Modulo.py";
  const fullPath = path.join(scriptDir, scriptFile);

  console.log("📂 Directorio del script:", scriptDir);
  
  if (!fs.existsSync(fullPath)) {
    console.error("❌ EL ARCHIVO NO EXISTE:", fullPath);
    return res.status(500).json({ error: "El script de Python no se encuentra." });
  }

  let options = {
    mode: 'text',
    pythonPath: 'python3',
    pythonOptions: ['-u'],
    scriptPath: scriptDir,
    args: [id, token]
  };

  let mensajesPython = [];

  try {
    let pyshell = new PythonShell(scriptFile, options);

    pyshell.on('message', function (message) {
      console.log('🐍 [PYTHON DICE]:', message);
      mensajesPython.push(message);
    });

    pyshell.on('stderr', function (stderr) {
      console.log('⚠️ [PYTHON ERROR]:', stderr);
    });

    // LA PARTE IMPORTANTE: ASYNC FUNCTION
    pyshell.end(async function (err, code, signal) {
      if (err) {
        console.error("❌ Python terminó con error:", err);
        return res.status(500).json({ 
          status: "error",
          error_generacion: err.message,
          logs: mensajesPython 
        });
      }

      console.log("✅ Python terminó correctamente.");
      const informeFinal = mensajesPython.join("\n");

      // ENVÍO DE CORREO
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
              </div>
            `
          });
          console.log("✉️ ¡Correo enviado con éxito!");
        } else {
          console.warn("⚠️ Falta 'emailUsuario'. No se envió correo.");
        }
      } catch (emailError) {
        console.error("❌ Error enviando correo:", emailError);
      }

      return res.status(200).json({
        status: "success",
        message: "Informe generado.",
        informe: informeFinal,
        debug_logs: mensajesPython
      });
    });

  } catch (error) {
    console.error("❌ Error al iniciar PythonShell:", error);
    return res.status(500).json({ error: "Error interno." });
  }
};

export default { IA, getF, python };