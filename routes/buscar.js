const { Router } = require("express");
const { model } = require("mongoose");

const { buscar } = require("../controllers/buscar");

const router = Router();

router.get("/:coleccion/:termino", buscar);

module.exports = router;
