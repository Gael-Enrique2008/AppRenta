const express = require("express");
const router = express.Router();

const controller = require("../controllers/disponibilidad.controller");
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

router.post(
    "/disponibilidad",
    auth.verificarToken,
    role.verificarRol("propietario", "administrador"),
    controller.crearDisponibilidad
);

module.exports = router;