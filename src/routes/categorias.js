//Importacion de dependencias
const express = require("express");
const router = express.Router();
const categoriasController = require("../controllers/categorias");

//Rutas para los endpoinds 
router.get("/getAll/", categoriasController.getAll);

module.exports = router;