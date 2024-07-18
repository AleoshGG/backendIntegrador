//Importacion de dependencias
const express = require("express");
const router = express.Router();
const analysisController = require("../controllers/analysis");

//Rutas para los endpoinds 
router.get("/allCategory/:id", analysisController.getCategoryAnalysis);
router.get("/getAll/", analysisController.getAll);
router.get("/search/:clave_estudios", analysisController.searchAnalysis);
router.post("/add/", analysisController.addAnalysis);
router.put("/update/:id_analisis", analysisController.updateAnalysis)
router.delete("/delete/:id", analysisController.deleteAnalysis);

module.exports = router;