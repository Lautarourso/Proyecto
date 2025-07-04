import { Usuarios } from "./usuarios.model.js";
import { Videos } from "./videos.model.js";

Usuarios.hasMany(Videos, { foreignKey: "user_id" });
Videos.belongsTo(Usuarios, { foreignKey: "user_id", onDelete: "CASCADE" });

export { Usuarios, Videos };

export const defModelos = async()=>{

        
}  
