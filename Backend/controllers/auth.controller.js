const conexion = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registro = async (req, res) => {

    const { correo, password } = req.body;

    const hash = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO usuarios(correo, password) VALUES (?, ?)";

    conexion.query(sql, [correo, hash], (err, resultado) => {

        if (err) {
            console.log(err);
            return res.status(500).json({
                mensaje: "Error al registrar"
            });
        }

        res.json({
            mensaje: "Usuario registrado"
        });

    });

};

exports.login = (req, res) => {

    const { correo, password } = req.body;

    const sql = "SELECT * FROM usuarios WHERE correo = ?";

    conexion.query(sql, [correo], async (err, resultado) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (resultado.length === 0) {
            return res.json({
                mensaje: "Usuario no encontrado"
            });
        }

        const valido = await bcrypt.compare(
            password,
            resultado[0].password
        );

        if (valido) {

            const token = jwt.sign(

                {
                    id: resultado[0].id,
                    correo: resultado[0].correo
                },

                process.env.JWT_SECRET,

                {
                    expiresIn: "1h"
                }

            );

            res.json({

                mensaje: "Login correcto",
                token: token

            });

        }
        else {
            res.json({
                mensaje: "Contraseña incorrecta"
            });
        }

    });

};