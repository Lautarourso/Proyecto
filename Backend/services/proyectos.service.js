import { Proyectos } from '../models/proyectos.model.js';
import { Analisis as AnalisisModel } from "../models/analisis.model.js";
import { sequelize } from "../db.js";

const createProyectos = async (Usuario_id, analisisData) => {
  const t = await sequelize.transaction();
  try {
    const proyecto = await Proyectos.create(
      { usuario_id: Usuario_id },
      { transaction: t }
    );

    const dataArray = Array.isArray(analisisData) ? analisisData : [analisisData];
    // 2. Agregar proyecto_id a cada análisis
    const datosConProyecto = analisisData.map(item => ({
      ...item,
      proyecto_id: proyecto.id,
      usuario_id: Usuario_id
    }));

    // 3. Insertar análisis
    await AnalisisModel.bulkCreate(datosConProyecto, { transaction: t });

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