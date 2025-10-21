import { sequelize } from "../db.js";
import { Proyectos } from "../models/proyectos.model.js";
import { Analisis } from "../models/analisis.model.js";
import { Videos } from '../models/videos.model.js';

const createProyectos = async (Usuario_id, analisisData) => {
  const t = await sequelize.transaction();

  try {
    // 1. Crear proyecto
    const proyecto = await Proyectos.create(
      { usuario_id: Usuario_id},
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

const getProyectos = async (Usuario_id) => {
  try {
    console.log("🟦 [Service] Buscando proyectos del usuario:", Usuario_id);

    const proyectos = await Proyectos.findAll({
      where: { usuario_id: Usuario_id },
      attributes: ["id", "name", "video_id"],
    });

    console.log("🟩 [Service] Proyectos encontrados:", proyectos.length);
    return proyectos;
  } catch (error) {
    console.error("❌ [Service] Error en getProyectos:", error);
    throw error;
  }
};

const proyId = async (id) => {
    return await Proyectos.findByPk(id);
};


const renameProyectos = async (parsedName, proyecto_id) =>{

  return await Proyectos.update({ 
    name: parsedName},
    {where: { id: proyecto_id }});
};


const videoProyecto = async (proyecto_id, video_id) => {
  return await Proyectos.update(
    { video_id },
    { where: { id: proyecto_id } }
  );
};


  export default {createProyectos, getProyectos, renameProyectos, videoProyecto, proyId};