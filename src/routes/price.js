const express = require("express");
const router = express.Router();
const priceController = require("../controllers/price");

// Rutas para los endpoints CRUD
router.post("/add/", priceController.addPrice);
router.post("/getID/", priceController.getIdPrice);
router.post("/getAll/", priceController.getAllPrice);
router.delete("/delete/:id_analisis/:id_usuario", priceController.deletePrice);


module.exports = router;