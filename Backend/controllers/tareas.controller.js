const conexion = require("../config/db");

exports.agregarTarea = (req, res) => {

    const titulo = req.body.titulo;

    const id_usuario = req.usuario.id;

    const sql = "INSERT INTO tareas(titulo, id_usuario) VALUES (?, ?)";

    conexion.query(sql, [titulo, id_usuario], (err) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            mensaje: "Tarea guardada"
        });

    });

};

exports.obtenerTareas = (req, res) => {

    const id_usuario = req.usuario.id;

    const sql = "SELECT * FROM tareas WHERE id_usuario = ?";

    conexion.query(sql, [id_usuario], (err, resultado) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(resultado);

    });
};

exports.eliminarTarea = (req, res) => {

    const id_tarea = req.params.id;
    const id_usuario = req.usuario.id;

    const sql = `
        DELETE FROM tareas
        WHERE id = ? AND id_usuario = ?
    `;

    conexion.query(sql, [id_tarea, id_usuario], (err, resultado) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            mensaje: "Tarea eliminada"
        });

    });

};