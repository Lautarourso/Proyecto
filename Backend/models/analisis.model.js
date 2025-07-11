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
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "analisis",
      tableName: "analisis", // 👈 usa este nombre literal
      timestamps: false,
    }
  );
  