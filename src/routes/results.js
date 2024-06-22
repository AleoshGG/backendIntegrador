//Importacion de dependencias
const express = require("express");
const router = express.Router();
const resultsController = require("../controllers/results");

//Rutas para los endpoinds 
router.post("/add/", resultsController.addResult);
router.delete("/delete/:id", resultsController.deleteResult);

module.exports = router;