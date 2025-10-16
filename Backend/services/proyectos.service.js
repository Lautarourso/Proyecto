import { sequelize } from "../db.js";
import { Proyectos } from "../models/proyectos.model.js";
import { Analisis } from "../models/analisis.model.js";
import { Videos } from '../models/videos.model.js';

const createProyectos = async (Usuario_id, analisisData/*, videoData, url, tipo_mime ,videoName,file*/) => {
  const t = await sequelize.transaction();

  try {
    // 1. Crear proyecto
    const proyecto = await Proyectos.create(
      { usuario_id: Usuario_id },
      { transaction: t }
    );    

    /* 3. Guardar video en DB
    
    */
    // 4. Insertar análisis con referencias a proyecto y video
    const datosConRelaciones = (Array.isArray(analisisData) ? analisisData : [analisisData]).map(item => ({
      ...item,
      proyecto_id: proyecto.id,
      usuario_id: Usuario_id,
     // video_id: video.id
    }));

    await Analisis.bulkCreate(datosConRelaciones, { transaction: t });

    await t.commit();
    return proyecto;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

const getProyectos = async (proyectos) => {
  return await Proyectos.findAll({
    where: { id_usuario: id },
    proyectos});
};

  export default {createProyectos, getProyectos};