import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import AuthRouter from "./routes/auth.router.js";
import VideosRouter from "./routes/vids.router.js";
import cors from "cors";
import "dotenv/config";
import { defModelos } from "./models/models.js";
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../Frontend')));


app.use(express.json());
app.use(cors());
await defModelos();
app.get("/", (_, res) => res.send("BurgerTIC API is running..."));

app.use("/auth", AuthRouter);
app.use("/vids", VideosRouter);

app.listen(process.env.PORT || 9000, () =>
    console.log(`Server is running on port ${process.env.PORT || 9000}` + ", Ya puedes empezar")
);

/*
"nombre": "a",
"apellido": "a",
"email": "metricafutbolera@gmail.com",
"dni": 23877647,
"password": "piepie"


"email": "lautarourso@gmail.com",
"password": "Lautaro"

pip install node
npm install express cors dotenv jsonwebtoken sequelize mysql2

http://localhost:9000/mainpage.html

*/