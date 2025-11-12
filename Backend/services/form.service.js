import { Form } from '../models/form.model.js';



const Cañerias = async (datos) => {
    return await Form.create(datos);
};

const getFormbyIDP = async (id) => {
    return await Form.findOne({ where: { proyecto_id: id } });
};

const FormId = async (id) => {
    return await Form.findAll({
        where: { proyecto_id: id },
        order: [["id", "ASC"]]
      });
};

export default {Cañerias, getFormbyIDP, FormId};