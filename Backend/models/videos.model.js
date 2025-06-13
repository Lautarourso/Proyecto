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
            type: DataTypes.BYTEA,
        },
       
    },
    {
        sequelize,
        modelName: "videos",
        timestamps: false,
    }
);