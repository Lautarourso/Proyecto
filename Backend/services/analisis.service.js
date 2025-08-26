import { Analisis } from '../models/analisis.model.js';

const GetAnalisis = async (id) => {
  return await Analisis.findAll({
    where: { id_usuario: id }
  });
};

export default { GetAnalisis };
