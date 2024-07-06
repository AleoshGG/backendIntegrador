const express = require("express");
const router = express.Router();
const gendersController = require("../controllers/genders");

// Rutas para los endpoints CRUD
router.get("/getAll/", gendersController.getGender);

module.exports = router;