const express = require("express");
const router = express.Router();
const priceController = require("../controllers/price");

// Rutas para los endpoints CRUD
router.post("/add/", priceController.addPrice);
router.get("/getAll/", priceController.getAllPrice);
router.delete("/delete/:id", priceController.deletePrice);


module.exports = router;