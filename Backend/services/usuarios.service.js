import { Usuarios } from '../models/usuarios.model.js';

const getUsuarioByEmail = async (email) => {
    return await Usuarios.findOne({ where: { email } });
};

const getUsuarioBydni = async (dni) => {
    return await Usuarios.findOne({ where: { dni } });
};

const getUsuarioById = async (id) => {
    return await Usuarios.findByPk(id);
};

const createUsuario = async (usuario) => {
    return await Usuarios.create(usuario);
};

const getUsuarios = async () => {
        return await Usuarios.findAll();
};


export default {
    getUsuarioByEmail,
    getUsuarioById,
    createUsuario,
    getUsuarioBydni,
    getUsuarios,
};