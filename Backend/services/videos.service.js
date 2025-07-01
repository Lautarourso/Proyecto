import { Videos } from '../models/videos.model.js';

const createVideo = async (video) => {
    return await Videos.create(video);
};

const getVideosById = async (id) => {
    return await Videos.findAll({ where: { id_usuario: id } });
  };
  

export default {
    createVideo,
    getVideosById,
};