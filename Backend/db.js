import dotenv from "dotenv";
dotenv.config();

export const config = {
    url: "psql 'postgresql://neondb_owner:npg_8AKpoRnSYN0x@ep-green-dawn-acc9cczp-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'",
    user: "LAUTARO", // Tu usuario de base de datos
    host: "ep-green-dawn-acc9cczp-pooler.sa-east-1.aws.neon.tech", // El host de la base de datos
    database: "neondb", // El nombre de tu base de datos
    password: "npg_8AKpoRnSYN0x", // La contraseña de tu base de datos
    port: 3000, // El puerto de PostgreSQL (por defecto es 5432)
    ssl: true, // SSL habilitado para conexiones seguras
};


import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(process.env.DB_URL, {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false
  });

try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
} catch (error) {
    console.error("Unable to connect to the database:", error);
}
