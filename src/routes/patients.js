//Importacion de dependencias
const express = require("express");
const router = express.Router();
const patientsController = require("../controllers/patients");

//Rutas para los endpoinds 
router.get("/search/", patientsController.searchPatient);
router.post("/add/", patientsController.addPatient);
router.delete("/delete/:id", patientsController.deletePatient);

module.exports = router;