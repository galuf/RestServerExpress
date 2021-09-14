const { request, response } = require("express");
const { Categoria } = require("../models");

//obtenerCategorias - paginado  - total - populate
const obtenerCategorias = async (req = require, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, categorias] = await Promise.all([
    Categoria.countDocuments(query),
    Categoria.find(query)
      .skip(Number(desde))
      .limit(Number(limite))
      .populate("usuario", "nombre"),
  ]);

  res.json({
    total,
    categorias,
  });
};

//obtenerCategoria - populate {}
const obtenerCategoria = async (req = request, res = response) => {
  const { id } = req.params;

  const categoria = await Categoria.findById(id).populate("usuario", "nombre");

  res.status(200).json({
    categoria,
  });
};

//Crear Categoria
const crearCategoria = async (req = request, res = response) => {
  const nombre = req.body.nombre.toUpperCase();

  const categoriaDB = await Categoria.findOne({ nombre });
  if (categoriaDB) {
    return res.status(400).json({
      msg: `La categoria ${categoriaDB.nombre}, ya existe `,
    });
  }

  //Generar la data a guardar
  const data = {
    nombre,
    usuario: req.usuario._id,
  };

  const categoria = new Categoria(data);

  //Guardar DB
  await categoria.save();

  res.status(201).json(categoria);
};

//actualizarCategoria -
const actualizarCategoria = async (req = request, res = response) => {
  const { id } = req.params;
  const { nombre } = req.body;
  const resto = { nombre: nombre.toUpperCase() };
  const categoria = await Categoria.findByIdAndUpdate(id, resto, { new: true });

  res.json({
    categoria,
  });
};

//borrarCategoria - estado->False
const borrarCategoria = async (req = request, res = response) => {
  const { id } = req.params;

  //Barrando Fisicamente
  //const usuario = await Usuario.findByIdAndDelete(id);

  //Modificando el estado de usuario
  const categoria = await Categoria.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json({ categoria });
};

module.exports = {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria,
};
