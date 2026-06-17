const express = require("express");
const router = express.Router();

const controller = require("../controllers/object.controller");
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

router.post(
    "/objetos",
    auth.verificarToken,
    role.verificarRol("propietario", "administrador"),
    controller.crearObjeto
);

router.get(
    "/objetos",
    auth.verificarToken,
    controller.obtenerObjetos
);

router.delete(
    "/objetos/:id",
    auth.verificarToken,
    role.verificarRol("propietario", "administrador"),
    controller.eliminarObjeto
);

module.exports = router;