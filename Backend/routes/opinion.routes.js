const express = require("express");
const router = express.Router();

const opinionController = require("../controllers/opinion.controller");
const verificarToken = require("../middleware/auth.middleware");

router.post(
    "/opinion",
    verificarToken,
    opinionController.crearOpinion
);

router.get(
    "/reputacion/:id",
    opinionController.obtenerReputacion
);

module.exports = router;