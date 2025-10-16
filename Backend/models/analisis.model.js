import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db.js";

export class Analisis extends Model {}

Analisis.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      tiempo: {
        type: DataTypes.DOUBLE,
      },
      distancia: {
        type: DataTypes.DOUBLE
      },
      video_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "videos",
        key: "id",
      },
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "usuarios",
        key: "id",
      },
    },
    proyecto_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "proyectos",
        key: "id",
      },
    }
  },

    {
      sequelize,
      modelName: "analisis",
      tableName: "analisis", // 👈 usa este nombre literal
      timestamps: false,
    }
  );
  