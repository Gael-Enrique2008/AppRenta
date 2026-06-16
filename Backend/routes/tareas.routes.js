const express = require("express");
const router = express.Router();

const middleware = require("../middleware/auth.middleware");
const tareas = require("../controllers/tareas.controller");

router.post(
    "/tareas",
    middleware.verificarToken,
    tareas.agregarTarea
);

router.get(
    "/tareas",
    middleware.verificarToken,
    tareas.obtenerTareas
);

router.delete(
    "/tareas/:id",
    middleware.verificarToken,
    tareas.eliminarTarea
);

module.exports = router;