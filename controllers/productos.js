const { request, response } = require("express");
const { Producto } = require("../models");

//obtenerCategorias - paginado  - total - populate
const obtenerProductos = async (req = require, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, productos] = await Promise.all([
    Producto.countDocuments(query),
    Producto.find(query)
      .skip(Number(desde))
      .limit(Number(limite))
      .populate("usuario", "nombre")
      .populate("categoria", "nombre"),
  ]);

  res.json({
    total,
    productos,
  });
};

//obtenerCategoria - populate {}
const obtenerProducto = async (req = request, res = response) => {
  const { id } = req.params;

  const producto = await Producto.findById(id)
    .populate("usuario", "nombre")
    .populate("categoria", "nombre");

  res.status(200).json({
    producto,
  });
};

//Crear Categoria
const crearProducto = async (req = request, res = response) => {
  const nombre = req.body.nombre.toUpperCase();
  const { precio, categoria, descripcion } = req.body;

  const productoDB = await Producto.findOne({ nombre });
  if (productoDB) {
    return res.status(400).json({
      msg: `La categoria ${productoDB.nombre}, ya existe `,
    });
  }

  //Generar la data a guardar
  const data = {
    nombre,
    usuario: req.usuario._id,
    precio,
    categoria,
    descripcion,
  };

  const producto = new Producto(data);

  //Guardar DB
  await producto.save();

  res.status(201).json(producto);
};

//actualizarCategoria -
const actualizarProducto = async (req = request, res = response) => {
  const { id } = req.params;
  const { estado, usuario, ...resto } = req.body;

  if (resto.nombre) {
    resto.nombre = resto.nombre.toUpperCase();
  }
  resto.usuario = req.usuario._id;

  const producto = await Producto.findByIdAndUpdate(id, resto, { new: true });

  res.json({
    producto,
  });
};

//borrarCategoria - estado->False
const borrarProducto = async (req = request, res = response) => {
  const { id } = req.params;

  //Modificando el estado de usuario
  const producto = await Producto.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json({ producto });
};

module.exports = {
  obtenerProductos,
  obtenerProducto,
  crearProducto,
  borrarProducto,
  actualizarProducto,
};
