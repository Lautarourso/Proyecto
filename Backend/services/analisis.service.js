import { Analisis } from '../models/analisis.model.js';

const GetAnalisis = async (id) => {
  return await Analisis.findAll({
    where: { usuario_id: id }
  });
};

export default { GetAnalisis };
