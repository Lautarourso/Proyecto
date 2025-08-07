import { Usuarios } from "./usuarios.model.js";
import { Videos } from "./videos.model.js";
import { Analisis } from "./analisis.model.js";
import {Proyectos} from "./proyectos.model.js";
import { sequelize } from "../db.js"; // ojo: ¡importá esto!

Usuarios.hasMany(Videos, { foreignKey: "user_id" });
Videos.belongsTo(Usuarios, { foreignKey: "user_id", onDelete: "CASCADE" });

Analisis.belongsTo(Videos, { foreignKey: "video_id", onDelete: "CASCADE" });
Videos.hasMany(Analisis, { foreignKey: "video_id" });

Analisis.belongsTo(Usuarios, { foreignKey: "usuario_id", onDelete: "CASCADE" });
Usuarios.hasMany(Analisis, { foreignKey: "usuario_id" });

Analisis.belongsTo(Proyectos, { foreignKey: "proyecto_id", onDelete: "CASCADE" });
Proyectos.hasMany(Analisis, { foreignKey: "proyecto_id" });

Proyectos.belongsTo(Usuarios, { foreignKey: "usuario_id", onDelete: "CASCADE" });
Usuarios.hasMany(Proyectos, { foreignKey: "usuario_id" });

export { Usuarios, Videos, Analisis, Proyectos };

export const defModelos = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection OK!");

    // 🔑 Aquí sincronizás los modelos:
    await sequelize.sync({ alter: true }); // crea tablas si no existen
    console.log("Models synced!");
  } catch (error) {
    console.error("Unable to connect:", error);
    process.exit(1);
  }
};
