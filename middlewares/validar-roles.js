const role = require("../models/role");

const adminRole = (req, res, next) => {
  if (!req.usuario) {
    return res.status(500).json({
      msg: "se quiere verificar el token sin validar el token",
    });
  }

  const { rol, nombre } = req.usuario;

  if (rol !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${nombre} no es administrador - No puede realizar la accion`,
    });
  }

  next();
};

const tieneRol = (...roles) => {
  return (req, res, next) => {
    if (!req.usuario) {
      return res.status(500).json({
        msg: "se quiere verificar el token sin validar el token",
      });
    }

    if (!roles.includes(req.usuario.rol)) {
      return res.status(401).json({
        msg: `El servicio require uno de estos roles ${roles}`,
      });
    }

    next();
  };
};

module.exports = {
  adminRole,
  tieneRol,
};
