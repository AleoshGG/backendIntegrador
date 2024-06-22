//Importacion de dependencias
const express = require("express");
const router = express.Router();
const promotionsController = require("../controllers/promotions");

//Rutas para los endpoinds 
router.get("/get/:id", promotionsController.getPromotion);
router.post("/add/", promotionsController.addPromotion);
router.delete("/delete/:id", promotionsController.deletePromotion);

module.exports = router;