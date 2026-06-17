const conexion = require("../config/db");

exports.crearDisponibilidad = async (req, res) => {

    try {

        const {
            objeto_id,
            fecha_inicio,
            fecha_fin
        } = req.body;

        const propietario_id = req.usuario.id;

        // validar que el objeto sea del usuario
        const obj = await conexion.query(
            "SELECT * FROM objetos WHERE id=$1",
            [objeto_id]
        );

        if (obj.rows.length === 0) {
            return res.status(404).json({ mensaje: "Objeto no existe" });
        }

        if (obj.rows[0].propietario_id !== propietario_id) {
            return res.status(403).json({ mensaje: "No autorizado" });
        }

        await conexion.query(
            `INSERT INTO disponibilidad
             (objeto_id, fecha_inicio, fecha_fin)
             VALUES ($1,$2,$3)`,
            [objeto_id, fecha_inicio, fecha_fin]
        );

        res.json({ mensaje: "Disponibilidad guardada" });

    } catch (error) {

        res.status(500).json({ mensaje: "Error" });

    }

};