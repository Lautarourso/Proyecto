import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false, // Opcional: desactiva logs de SQL en consola
});

// Probar conexión
try {
  await sequelize.authenticate();
  console.log("Conexión con la base de datos establecida correctamente.");
} catch (error) {
  console.error("No se pudo conectar con la base de datos:", error);
}
