const express = require("express");
const router = express.Router();
const gendersController = require("../controllers/colonies");

// Rutas para los endpoints CRUD
router.get("/getAll/", gendersController.getColinies);

module.exports = router;