const { Router } = require("express");
const { check } = require("express-validator");

const { validarJWT, validarCampos, adminRole } = require("../middlewares");

const {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  borrarProducto,
  actualizarProducto,
} = require("../controllers/productos");

const {
  esCategoriaValida,
  existeProductoPorId,
} = require("../helpers/db-validators");

const router = Router();

//Obtener todas las categorias -> publico
router.get("/", obtenerProductos);

//Obtener categorias por id -> publico
router.get(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  obtenerProducto
);

//Crear categoria -> privado - cualquier persona con un toquen valido
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("categoria", "No es un ID valido").isMongoId(),
    check("categoria", "La categoria es obligatorio").not().isEmpty(),
    check("categoria").custom(esCategoriaValida),
    validarCampos,
  ],
  crearProducto
);

//Actualizar un registro por id - privado - Cualquiera con un toquen valido
router.put(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  actualizarProducto
);

//Borrar una categoria - Admin
router.delete(
  "/:id",
  [
    validarJWT,
    adminRole,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  borrarProducto
);

module.exports = router;
