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
        url: {
            type: DataTypes.TEXT,
        },
        user_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fecha: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW // ✔️ Se autocompleta al crear el video
        },
        
        proyecto_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
       
    },
    {
        sequelize,
        modelName: "videos",
        timestamps: false,
    }
);
