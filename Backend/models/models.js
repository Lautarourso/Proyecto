import { Usuarios } from "./usuarios.model.js";
import { Videos } from "./videos.model.js";
import { Analisis } from "./analisis.model.js";
import { sequelize } from "../db.js"; // ojo: ¡importá esto!

Usuarios.hasMany(Videos, { foreignKey: "user_id" });
Videos.belongsTo(Usuarios, { foreignKey: "user_id", onDelete: "CASCADE" });

export { Usuarios, Videos, Analisis };

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
