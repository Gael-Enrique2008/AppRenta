const conexion = require("../config/db");

exports.crearOpinion = async (req, res) => {

    try {

        const autor_id = req.usuario.id;

        const {
            reserva_id,
            calificacion,
            comentario
        } = req.body;

        const reserva = await conexion.query(
            `
            SELECT r.*, o.propietario_id
            FROM reservas r
            INNER JOIN objetos o
                ON r.objeto_id = o.id
            WHERE r.id = $1
            `,
            [reserva_id]
        );

        if (reserva.rows.length === 0) {

            return res.status(404).json({
                mensaje: "Reserva no encontrada"
            });

        }

        const datos = reserva.rows[0];

        // Solo reservas aprobadas
        if (datos.estado !== "aprobada") {

            return res.status(400).json({
                mensaje: "La reserva aún no puede ser calificada"
            });

        }

        let usuario_calificado;

        if (autor_id === datos.arrendatario_id) {

            usuario_calificado = datos.propietario_id;

        } else {

            usuario_calificado = datos.arrendatario_id;

        }

        // Evitar doble reseña
        const existente = await conexion.query(
            `
            SELECT *
            FROM opiniones
            WHERE reserva_id = $1
            AND autor_id = $2
            `,
            [reserva_id, autor_id]
        );

        if (existente.rows.length > 0) {

            return res.status(400).json({
                mensaje: "Ya calificaste esta reserva"
            });

        }

        await conexion.query(
            `
            INSERT INTO opiniones
            (
                reserva_id,
                autor_id,
                usuario_calificado_id,
                calificacion,
                comentario
            )
            VALUES ($1,$2,$3,$4,$5)
            `,
            [
                reserva_id,
                autor_id,
                usuario_calificado,
                calificacion,
                comentario
            ]
        );

        // Actualizar reputación del usuario
        await conexion.query(
            `
            UPDATE usuarios
            SET reputacion = (

                SELECT AVG(calificacion)

                FROM opiniones

                WHERE usuario_calificado_id = $1

            )

            WHERE id = $1
            `,
            [usuario_calificado]
        );

        res.json({
            mensaje: "Opinión registrada"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: "Error al registrar opinión"
        });

    }

};



exports.obtenerReputacion = async (req, res) => {

    try {

        const usuario_id = req.params.id;

        const resultado = await conexion.query(
            `
            SELECT reputacion
            FROM usuarios
            WHERE id = $1
            `,
            [usuario_id]
        );

        res.json(resultado.rows[0]);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: "Error al obtener reputación"
        });

    }

};