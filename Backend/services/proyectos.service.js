import { Proyectos } from '../models/proyectos.model.js';

const createProyectos = async (proyectos) => {
    return await Proyectos.create(proyectos);
  };

  const getProyectos = async (proyectos) => {
    return await Proyectos.findAll({
      where: { id_usuario: id },
      proyectos});
  };

  export default {createProyectos, getProyectos};