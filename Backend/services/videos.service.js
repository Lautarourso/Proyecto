    import { Videos } from '../models/videos.model.js';

  

   const getVideosById = async (id) => {
  return await Videos.findAll({
    where: { user_id: id },
    attributes: ['id', 'tipo_mime', 'url', 'fecha', 'name'], 
    raw: true,
  });
};
   




    export default {
        getVideosById,
    };