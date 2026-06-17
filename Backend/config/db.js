require("dotenv").config();

const { Pool } = require("pg");

const conexion = new Pool({

    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,

    ssl: {
        rejectUnauthorized: false
    },

    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 15000

});

conexion.on("error", (err) => {
    console.error("Error inesperado en PostgreSQL:", err);
});

module.exports = conexion;