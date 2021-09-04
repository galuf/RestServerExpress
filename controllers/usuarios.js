const { response } = require("express");

const usuariosGet = (req, res = response) => {
  const { q } = req.query;
  res.json({
    msg: "get Api - Controlador",
    q,
  });
};

const usuariosPut = (req, res = response) => {
  const { id } = req.params;
  res.json({
    msg: "put Api - Controlador",
    id,
  });
};

const usuariosPost = (req, res = response) => {
  const { nombre, edad } = req.body;

  res.json({
    msg: "post Api - Controlador",
    nombre,
    edad,
  });
};

const usuariosDel = (req, res = response) => {
  res.json({
    msg: "delete Api",
  });
};

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "patch Api",
  });
};

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDel,
  usuariosPatch,
};
