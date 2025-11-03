import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db.js"; // Asegúrate de que la ruta a tu instancia de Sequelize sea correcta

export class Form extends Model {}

Form.init(
    {
        // 🔑 Campo Clave Primaria (Serial en SQL)
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        proyecto_id: {
            type: DataTypes.INTEGER,
            allowNull: false, // Un formulario siempre debe pertenecer a un proyecto
            unique: true,     // 👈 CLAVE para la relación UNO A UNO:
                              // Asegura que solo un 'form' pueda referenciar un 'proyecto_id'.
            references: {
                model: "proyectos", // Nombre de la tabla de destino (en PostgreSQL)
                key: "id",          // Clave de destino en la tabla 'proyectos'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        // 📝 Campos de Texto (VARCHAR)
        falla: {
            type: DataTypes.STRING(100), // Mapea a VARCHAR(100)
            allowNull: false,
        },
        material: {
            type: DataTypes.STRING(100), // Mapea a VARCHAR(100)
            allowNull: false,
        },

        // 📏 Campos Numéricos (DOUBLE PRECISION en SQL)
        espesor: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        diametro: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        antiguedad: {
            type: DataTypes.DOUBLE, // Aunque es conceptualmente un entero, usamos DOUBLE para consistencia de DB
            allowNull: false,
        },
        tfme: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        presionHabitual: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        presionMaxima: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },

        // 🌍 Coordenadas Geográficas (DOUBLE PRECISION en SQL)
        latitudInicial: {
            type: DataTypes.DOUBLE,
            allowNull: true, // No tiene NOT NULL en el SQL, así que permitimos nulos
        },
        latitudFinal: {
            type: DataTypes.DOUBLE,
            allowNull: true,
        },
        longitudInicial: {
            type: DataTypes.DOUBLE,
            allowNull: true,
        },
        longitudFinal: {
            type: DataTypes.DOUBLE,
            allowNull: true,
        },

        
        fecha: {
            type: DataTypes.DATE, 
            allowNull: false,
            defaultValue: DataTypes.NOW,
        }
        
    },

        {
            sequelize,
            modelName: "form",
            tableName: "form", // 👈 Nombre literal de la tabla en PostgreSQL
            timestamps: false, // 👈 Importante: si tu tabla SÓLO tiene 'created_at' y no 'updated_at',
        }
    );