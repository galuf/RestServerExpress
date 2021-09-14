const { Categoria, Usuario, Producto } = require("../models");
const Role = require("../models/role");

const esRolValido = async (rol = "") => {
  //Verificar que el rol exista en la BDs
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no esta registrado en la Base de Datos`);
  }
};

const emailExiste = async (correo = "") => {
  //Verificar si el correo existe
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El correo ${correo} ya esta registrado`);
  }
};

const existeUsuarioPorId = async (id = "") => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El id: ${id} no existe`);
  }
};

const existeCategoriaPorId = async (id = "") => {
  const existeCategoria = await Categoria.findById(id);
  if (!existeCategoria) {
    throw new Error(`La categoria con id: ${id} no existe`);
  }
};

const existeProductoPorId = async (id = "") => {
  const existeProducto = await Producto.findById(id);
  if (!existeProducto) {
    throw new Error(`El producto con id: ${id} no existe`);
  }
};

const esCategoriaValida = async (id = "") => {
  //Verificar que el rol exista en la BDs
  const existeCategoria = await Categoria.findOne({ id });
  if (!existeCategoria) {
    throw new Error(
      `La categoria ${categoria} no esta registrado en la Base de Datos`
    );
  }
};

module.exports = {
  esRolValido,
  emailExiste,
  existeUsuarioPorId,
  existeCategoriaPorId,
  esCategoriaValida,
  existeProductoPorId,
};
