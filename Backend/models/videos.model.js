import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db.js";

export class Videos extends Model {}

Videos.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        tipo_mime: {
            type: DataTypes.TEXT,
        },
        datos: {
            type: DataTypes.BLOB,
        },
        user_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fecha: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW // ✔️ Se autocompleta al crear el video
  }
       
    },
    {
        sequelize,
        modelName: "videos",
        timestamps: false,
    }
);
