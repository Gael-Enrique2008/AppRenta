const conexion = require("../config/db");

exports.crearObjeto = async (req, res) => {

    try {

        const propietario_id = req.usuario.id;

        const {
            titulo,
            descripcion,
            categoria,
            restricciones,
            precio_dia,
            precio_semana,
            precio_mes
        } = req.body;

        const sql = `
            INSERT INTO objetos (
                propietario_id,
                titulo,
                descripcion,
                categoria,
                restricciones,
                precio_dia,
                precio_semana,
                precio_mes
            )
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
        `;

        await conexion.query(sql, [
            propietario_id,
            titulo,
            descripcion,
            categoria,
            restricciones,
            precio_dia,
            precio_semana,
            precio_mes
        ]);

        res.json({
            mensaje: "Objeto creado"
        });

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al crear objeto"
        });

    }

};

exports.obtenerObjetos = async (req, res) => {

    try {

        const sql = `
            SELECT * FROM objetos
            WHERE activo = true
            ORDER BY created_at DESC
        `;

        const resultado = await conexion.query(sql);

        res.json(resultado.rows);

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al obtener objetos"
        });

    }

};

exports.eliminarObjeto = async (req, res) => {

    try {

        const id = req.params.id;

        const usuario = req.usuario;

        const sql = `
            DELETE FROM objetos
            WHERE id = $1
            AND (propietario_id = $2 OR $3 = 'administrador')
        `;

        await conexion.query(sql, [
            id,
            usuario.id,
            usuario.rol
        ]);

        res.json({
            mensaje: "Objeto eliminado"
        });

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al eliminar"
        });

    }

};