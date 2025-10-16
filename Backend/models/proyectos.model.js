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

    video_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "videos",   // nombre de la tabla de videos
        key: "id"          // referencia a id en Videos
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