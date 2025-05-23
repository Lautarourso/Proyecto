import UsuariosService from "../services/usuarios.service.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import usuariosService from "../services/usuarios.service.js";

const register = async (req, res) => {
    const usuario = req.body;

    if (!usuario)
        return res.status(400).json({ message: "Se necesita un usuario" });

    if (
        !usuario.nombre ||
        !usuario.apellido ||
        !usuario.email ||
        !usuario.dni ||
        !usuario.password
    )
        return res.status(400).json({ message: "Faltan campos por llenar" });

    const usuario2 = await UsuariosService.getUsuarioByEmail(usuario.email);
    const usuario3 = await UsuariosService.getUsuarioBydni(usuario.dni);

    if (usuario2)
        return res.status(400).json({ message: "Ya hay una cuenta registrada con ese correo" });

    if (usuario3)
        return res.status(400).json({message: "Ya hay una cuenta registrada con ese DNI"})
    const hash = await bcrypt.hash(usuario.password, 10);
    try {
        await UsuariosService.createUsuario({
            ...usuario,
            password: hash,
            admin: false
        });
        res.status(201).json({ message: "Usuario registrado con éxito" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUsuarios = async (req, res) => {
    try {
        const usuarios = await usuariosService.getUsuarios();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({ message: "Faltan campos por llenar" });

    const usuario = await UsuariosService.getUsuarioByEmail(email);

    if (!usuario)
        return res.status(400).json({ message: "Usuario no encontrado" });

    const passwordMatch = await bcrypt.compare(password, usuario.password);

    if (!passwordMatch)
        return res.status(400).json({ message: "Contraseña incorrecta" });
        
    try {
        const token = jwt.sign({ id: usuario.id }, "HolaPepe"/*process.env.SECRET*/, {
            expiresIn: "30m",
        });
        res.json({
            usuario: {
                id: usuario.id,
                email: usuario.email,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                dni: usuario.dni,
                admin: usuario.admin || false,
            },
            token,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export default { register, login, getUsuarios};
