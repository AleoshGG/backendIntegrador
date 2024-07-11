//Importacion de dependencias
const express = require("express");
const router = express.Router();
const horarioController = require("../controllers/horario");

//Rutas para los endpoinds 
router.get("/getAll", horarioController.getHorario);

module.exports = router;