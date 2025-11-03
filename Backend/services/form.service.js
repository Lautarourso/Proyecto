import { Form } from '../models/form.model.js';



const Cañerias = async (datos) => {
    return await Form.create(datos);
};

export default {Cañerias};