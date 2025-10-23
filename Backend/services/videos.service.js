    import { Videos } from '../models/videos.model.js';

  

   const getVideosById = async (id) => {
    return await Videos.findByPk(id);
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