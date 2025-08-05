import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import AuthRouter from "./routes/auth.router.js";
import AnalisisRouter from "./routes/analisis.router.js";
import VideosRouter from "./routes/vids.router.js";
import cors from "cors";
import "dotenv/config";
import { defModelos } from "./models/models.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendPath = path.join(__dirname, "../Frontend");

const app = express();

async function startServer() {
  app.use(express.static(frontendPath));
  app.use(express.json());
  app.use(cors());

  app.get("/", (req, res) => {
    res.send("Servidor activo");
  });
  
  await defModelos(); // <- ahora sí lo podés usar

  app.get("/", (req, res) => {
    res.sendFile("mainpage.html", { root: frontendPath });
  });

  app.use("/auth", AuthRouter);
  app.use("/vids", VideosRouter);
  app.use("/analisis", AnalisisRouter);

  const PORT = process.env.PORT || 9000;
  app.listen(PORT, "0.0.0.0", () =>
    console.log(`Server is running on port ${PORT}, Ya puedes empezar`)
  );
}

startServer().catch((err) => {
  console.error("Error al iniciar el servidor:", err);
  process.exit(1);
});


/*
"nombre": "a",
"apellido": "a",
"email": "metricafutbolera@gmail.com",
"dni": 23343434,
"password": "piepie"


"email": "lautarourso@gmail.com",
"password": "Lautaro"

npm install express cors dotenv jsonwebtoken sequelize mysql2
npm install multer
npm install cloudinary multer


http://10.8.5.99:9000/
cp .env.example .env


*/