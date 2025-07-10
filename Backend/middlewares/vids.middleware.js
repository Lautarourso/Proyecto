import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Carpeta temporal para almacenar los videos subidos
const uploadFolder = './uploads';

// Crear carpeta si no existe
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    // Generar nombre único
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

export const upload = multer({
  storage,
  limits: {
    fileSize: 500 * 1024 * 1024 // 500 MB máximo (ajustalo si querés)
  }
});
