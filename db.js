import "dotenv/config";

export const config = {
    url: "postgresql://pig_owner:npg_Vh1Im7ZHlDXz@ep-shrill-thunder-acbvarc0-pooler.sa-east-1.aws.neon.tech/pig?sslmode=require",
    user: "Lautaro", // Tu usuario de base de datos
    host: "ep-shrill-thunder-acbvarc0-pooler.sa-east-1.aws.neon.tech", // El host de la base de datos
    database: "pig", // El nombre de tu base de datos
    password: "npg_Vh1Im7ZHlDXz", // La contraseña de tu base de datos
    port: 3000, // El puerto de PostgreSQL (por defecto es 5432)
    ssl: true, // SSL habilitado para conexiones seguras
};


import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
    config.url
);

try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
} catch (error) {
    console.error("Unable to connect to the database:", error);
}
