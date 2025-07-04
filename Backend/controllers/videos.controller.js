import videosService from "../services/videos.service.js";

const UploadV = async (req,res) => {
    const video = req.body;

    
    try {
        await videosService.createVideo({
            ...video,
            tipo_mime: "video/mp4",
            user_id: decoded.id
        });
        res.status(201).json({ message: "Video subido con éxito" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const GetV = async (req, res) => {
    try {
        const videos = await videosService.getVideosById(decoded.id);
        res.json(videos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export default { UploadV, GetV};
