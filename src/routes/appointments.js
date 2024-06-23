const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointments");

// Rutas para los endpoints CRUD
router.post("/add/", appointmentController.addAppointment);
router.get("/getAll/:date", appointmentController.getAllAppointment);
router.put("/update/:id", appointmentController.updateAppointment);
router.delete("/delete/:id", appointmentController.deleteAppointment);


module.exports = router;
