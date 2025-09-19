import multer from "multer";

// Memory storage para no guardar archivos en disco
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 500, // opcional: límite de 500MB
  },
  fileFilter: (req, file, cb) => {
    // Aceptar solo videos
    if (file.mimetype.startsWith("video/")) {
      cb(null, true);
    } else {
      cb(new Error("Solo se permiten archivos de video"));
    }
  },
});

export default upload;
