import { Analisis } from '../models/analisis.model.js';

const createAnalisis = async (analisis) => {
    return await Analisis.create(analisis);
  };
    
  export default {createAnalisis};