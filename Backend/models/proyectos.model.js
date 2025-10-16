import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db.js";

export class Proyectos extends Model {}

Proyectos.init (
{
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      usuario_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "usuarios",
        key: "id",
      },
    },

    name: {
      type: DataTypes.TEXT
    },
},

 {
        sequelize,
        modelName: "proyectos",
        timestamps: false,
}
);