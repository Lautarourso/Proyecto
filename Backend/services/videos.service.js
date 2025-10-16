    import { Videos } from '../models/videos.model.js';

  

   const getVideosById = async (id) => {
  return await Videos.findAll({
    where: { user_id: id },
    attributes: ['id', 'tipo_mime', 'url', 'fecha', 'name'], 
    raw: true,
  });
};
   
  const Createvideo = async (video, url, tipo_mime, user_id) => {
  return await Videos.create(
        {
          video,
          url,
          tipo_mime,
          user_id  
        },
      );
    }


    export default {
        getVideosById,
        Createvideo
    };