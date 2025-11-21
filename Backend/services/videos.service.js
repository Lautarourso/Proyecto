    import { Videos } from '../models/videos.model.js';

  

   const getVideosById = async (id) => {
    return await Videos.findByPk(id);
};
   
  const Createvideo = async (data) => {
  return await Videos.create(data);
};


    export default {
        getVideosById,
        Createvideo
    };