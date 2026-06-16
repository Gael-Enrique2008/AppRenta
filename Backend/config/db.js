const mysql = require("mysql2");

const conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "gestor_tareas"
});

conexion.connect((err) => {
    if (err) {
        console.log("Error de conexión");
    } else {
        console.log("Base de datos conectada");
    }
});

module.exports = conexion;