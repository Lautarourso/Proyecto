import { Proyectos } from '../models/proyectos.model.js';
import { Analisis as AnalisisModel } from "../models/analisis.model.js";
import { sequelize } from "../db.js";

import { sequelize } from "../db.js";
import { Proyectos } from "../models/Proyectos.js";
import { Analisis } from "../models/Analisis.js";
import { Videos } from "../models/Videos.js";
import cloudinary from "../config/cloudinary.js";

const createProyectos = async (Usuario_id, analisisData, videoData, file) => {
  const t = await sequelize.transaction();

  try {
    // 1. Crear proyecto
    const proyecto = await Proyectos.create(
      { usuario_id: Usuario_id },
      { transaction: t }
    );

    // 2. Subir video a Cloudinary
    const videoUpload = await new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        { resource_type: "video", folder: "tus_videos" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      upload.end(file.buffer);
    });

    // 3. Guardar video en DB
    const video = await Videos.create(
      {
        ...videoData,
        url: videoUpload.secure_url,
        tipo_mime: videoUpload.resource_type,
        usuario_id: Usuario_id
      },
      { transaction: t }
    );

    // 4. Insertar análisis con referencias a proyecto y video
    const datosConRelaciones = (Array.isArray(analisisData) ? analisisData : [analisisData]).map(item => ({
      ...item,
      proyecto_id: proyecto.id,
      usuario_id: Usuario_id,
      video_id: video.id
    }));

    await Analisis.bulkCreate(datosConRelaciones, { transaction: t });

    await t.commit();
    return proyecto;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

export default { createProyectoCompleto };


const getProyectos = async (proyectos) => {
  return await Proyectos.findAll({
    where: { id_usuario: id },
    proyectos});
};

  export default {createProyectos, getProyectos};