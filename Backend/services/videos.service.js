import { Videos } from '../models/videos.model.js';

const createVideo = async (video) => {
    return await Videos.create(video);
};

export default {
    createVideo,
};