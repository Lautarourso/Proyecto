import { Analisis } from '../models/analisis.model.js';

const GetAnalisis = async (id) => {
  return await Analisis.findAll({
    where: { proyecto_id: id },
    order: [["id", "ASC"]]
  });
};

export default { GetAnalisis };
