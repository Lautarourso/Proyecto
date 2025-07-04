import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db.js";
import { Usuarios } from "./usuarios.model.js";

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
        }
       
    },
    {
        sequelize,
        modelName: "videos",
        timestamps: false,
    }
);
Videos.belongsTo(Usuarios, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});