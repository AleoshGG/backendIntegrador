//Importacion de dependencias
const express = require("express");
const router = express.Router();
const schedulesController = require("../controllers/schedules");

//Rutas para los endpoinds 
router.get("/search/:id", schedulesController.getSchedule);
router.post("/add/", schedulesController.addSchedule);
router.delete("/delete/:id", schedulesController.deleteSchedule);

module.exports = router;