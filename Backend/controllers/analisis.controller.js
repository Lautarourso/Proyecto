import Analisis from "../services/analisis.service.js";
import { execFile } from "child_process";
import path from "path";
import { fileURLToPath } from "url";





const GetT = async (req, res) => {
  try {
    const { id } = req.params;

    const analisis = await Analisis.GetAnalisis(id); // viene del token
    res.json(analisis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export default { GetT};
