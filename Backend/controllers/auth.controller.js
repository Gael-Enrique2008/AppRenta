const conexion = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registro = async (req, res) => {

    try {

        const { nombre, correo, password, rol } = req.body;

        const usuarioExistente = await conexion.query(
            "SELECT * FROM usuarios WHERE correo = $1",
            [correo]
        );

        if (usuarioExistente.rows.length > 0) {

            return res.status(400).json({
                mensaje: "El correo ya está registrado"
            });

        }

        const hash = await bcrypt.hash(password, 10);

        await conexion.query(

            `INSERT INTO usuarios
            (nombre, correo, password, rol)
            VALUES ($1, $2, $3, $4)`,

            [nombre, correo, hash, rol]

        );

        res.json({
            mensaje: "Usuario registrado"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: "Error al registrar usuario"
        });

    }

};

exports.login = async (req, res) => {

    try {

        const { correo, password } = req.body;

        const resultado = await conexion.query(

            "SELECT * FROM usuarios WHERE correo = $1",

            [correo]

        );

        if (resultado.rows.length === 0) {

            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });

        }

        const usuario = resultado.rows[0];

        const valido = await bcrypt.compare(

            password,

            usuario.password

        );

        if (!valido) {

            return res.status(401).json({
                mensaje: "Contraseña incorrecta"
            });

        }

        const token = jwt.sign(

            {
                id: usuario.id,
                correo: usuario.correo,
                rol: usuario.rol
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "1h"
            }

        );

        res.json({

            mensaje: "Login correcto",

            token,

            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                correo: usuario.correo,
                rol: usuario.rol
            }

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: "Error al iniciar sesión"
        });

    }

};