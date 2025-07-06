import { Videos } from '../models/videos.model.js';

const createVideo = async (video) => {
    return await Videos.create(video);
};

const getVideosById = async (id) => {
    return await Videos.findAll({ where: { user_id: id } });
  };
  

export default {
    createVideo,
    getVideosById,
};