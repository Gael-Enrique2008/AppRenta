const express = require("express");
const router = express.Router();

const controller = require("../controllers/reservation.controller");
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

router.post(
    "/reservas",
    auth.verificarToken,
    controller.crearReserva
);

router.get(
    "/reservas",
    auth.verificarToken,
    controller.misReservas
);

router.get(
    "/mis-rentas",
    auth.verificarToken,
    controller.misRentas
);

router.get(
    "/reservas-propietario",
    auth.verificarToken,
    controller.reservasPropietario
);

router.put(
    "/reservas/estado",
    auth.verificarToken,
    role.verificarRol("propietario", "administrador"),
    controller.cambiarEstadoReserva
);

router.put(
    "/cancelar-reserva/:id",
    auth.verificarToken,
    controller.cancelarReserva
);

module.exports = router;