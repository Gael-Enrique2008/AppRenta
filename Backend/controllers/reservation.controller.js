const conexion = require("../config/db");

exports.crearReserva = async (req, res) => {

    try {

        const arrendatario_id = req.usuario.id;

        const {
            objeto_id,
            fecha_inicio,
            fecha_fin
        } = req.body;

        const conflicto = await conexion.query(
            `SELECT * FROM reservas
             WHERE objeto_id = $1
             AND estado != 'cancelada'
             AND (
                (fecha_inicio <= $2 AND fecha_fin >= $2)
                OR
                (fecha_inicio <= $3 AND fecha_fin >= $3)
             )`,
            [objeto_id, fecha_inicio, fecha_fin]
        );

        if (conflicto.rows.length > 0) {
            return res.status(400).json({
                mensaje: "Ya existe una reserva en esas fechas"
            });
        }

        const disponible = await conexion.query(
            `SELECT * FROM disponibilidad
             WHERE objeto_id = $1
             AND fecha_inicio <= $2
             AND fecha_fin >= $3`,
            [objeto_id, fecha_inicio, fecha_fin]
        );

        if (disponible.rows.length === 0) {
            return res.status(400).json({
                mensaje: "Objeto no disponible en esas fechas"
            });
        }

¡        await conexion.query(
            `INSERT INTO reservas
            (objeto_id, arrendatario_id, fecha_inicio, fecha_fin, estado, total)
            VALUES ($1,$2,$3,$4,'pendiente',0)`,
            [
                objeto_id,
                arrendatario_id,
                fecha_inicio,
                fecha_fin
            ]
        );

        res.json({
            mensaje: "Reserva creada (pendiente)"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: "Error al crear reserva"
        });

    }

};

exports.misReservas = async (req, res) => {

    try {

        const id = req.usuario.id;

        const resultado = await conexion.query(
            `SELECT r.*, o.titulo
             FROM reservas r
             JOIN objetos o ON r.objeto_id = o.id
             WHERE r.arrendatario_id = $1`,
            [id]
        );

        res.json(resultado.rows);

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al obtener reservas"
        });

    }

};

exports.misRentas = async (req, res) => {

    try {

        const id = req.usuario.id;

        const resultado = await conexion.query(
            `SELECT r.*, o.titulo, o.descripcion
             FROM reservas r
             JOIN objetos o ON r.objeto_id = o.id
             WHERE r.arrendatario_id = $1
             ORDER BY r.created_at DESC`,
            [id]
        );

        res.json(resultado.rows);

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al obtener rentas"
        });

    }

};

exports.reservasPropietario = async (req, res) => {

    try {

        const propietario_id = req.usuario.id;

        const resultado = await conexion.query(
            `SELECT r.*, o.titulo
             FROM reservas r
             JOIN objetos o ON r.objeto_id = o.id
             WHERE o.propietario_id = $1
             ORDER BY r.created_at DESC`,
            [propietario_id]
        );

        res.json(resultado.rows);

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al obtener reservas del propietario"
        });

    }

};