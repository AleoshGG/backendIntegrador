//Importacion de dependencias
const express = require("express");
const router = express.Router();
const salesController = require("../controllers/sales");

//Rutas para los endpoinds 
router.get("/getAll/", salesController.getAllSales);
router.post("/add/", salesController.addSale);
router.delete("/delete/:id", salesController.deleteSale);

module.exports = router;