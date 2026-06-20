router.post(
    "/opinion",
    verificarToken,
    controller.crearOpinion
);

router.get(
    "/reputacion/:id",
    controller.obtenerReputacion
);