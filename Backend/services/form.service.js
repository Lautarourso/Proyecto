import { Form } from '../models/form.model.js';



const Cañerias = async (datos) => {
    return await Form.create(datos);
};

const getFormbyIDP = async (proyectoId) => {
    return await Form.findOne({ where: { proyectoId } });
};

export default {Cañerias, getFormbyIDP};