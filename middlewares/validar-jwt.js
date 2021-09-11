const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      msg: "No hay toquen en la peticion",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    req.usuario = await Usuario.findById(uid);

    if (!req.usuario) {
      return res.status(401).json({
        msg: "Token no valido - usuario no existe en BDs",
      });
    }

    //Verificar si el uid tiene estado true
    if (!req.usuario.estado) {
      return res.status(401).json({
        msg: "Token no valido - usuario estado false",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no valido",
    });
  }
};

module.exports = {
  validarJWT,
};
