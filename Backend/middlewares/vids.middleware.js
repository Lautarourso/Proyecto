import multer from 'multer';

const storage = multer.memoryStorage(); // Para no guardarlo en disco
const upload = multer({ storage });

export default upload;
