//Importacion de dependencias
const express = require("express");
const router = express.Router();
const horarioController = require("../controllers/horario");

//Rutas para los endpoinds 
router.post("/add", horarioController.addHorario);

module.exports = router;