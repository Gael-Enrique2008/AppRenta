const jwt = require("jsonwebtoken");

exports.verificarToken = (req, res, next) => {

    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            mensaje: "Acceso denegado"
        });
    }

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.usuario = decoded;

        next();

    } catch {

        return res.status(401).json({
            mensaje: "Token inválido"
        });

    }

};