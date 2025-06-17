import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db.js";
import { Videos } from "./videos.model.js"; // IMPORTANTE

export class Usuarios extends Model {}

Usuarios.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        apellido: {
            type: DataTypes.STRING,
        },
        nombre: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        dni: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
        admin: {
            type: DataTypes.BOOLEAN,
        },
    },
    {
        sequelize,
        modelName: "usuarios",
        timestamps: false,
    }
);
Usuarios.hasMany(Videos, {
  foreignKey: "user_id",
});