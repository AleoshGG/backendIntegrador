//Importacion de dependencias
const express = require("express");
const router = express.Router();
const direccionController = require("../controllers/direccion");

//Rutas para los endpoinds 
router.post("/add", direccionController.addDireccion);

module.exports = router;