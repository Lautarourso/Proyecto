import { Usuarios } from "./usuarios.model.js";
import { Videos } from "./videos.model.js";
import { Analisis } from "./analisis.model.js";

Usuarios.hasMany(Videos, { foreignKey: "user_id" });
Videos.belongsTo(Usuarios, { foreignKey: "user_id", onDelete: "CASCADE" });

export { Usuarios, Videos, Analisis };

export const defModelos = async()=>{

        
}  
