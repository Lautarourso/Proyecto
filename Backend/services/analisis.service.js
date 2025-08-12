import { Analisis } from '../models/analisis.model.js';



  const GetAnalisis = async (analisis) => {
    return await Analisis.findAll({
      where: { id_usuario: id },
      analisis});
  };

  export default { GetAnalisis};