const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointments");

// Rutas para los endpoints CRUD
router.post("/add/", appointmentController.addAppointment);
router.get("/getAll/:fecha_actual", appointmentController.getAll);
router.get("/getSolicitud/:id", appointmentController.getSolicitud);
router.get("/exist/:fecha_actual/:id_horario_atencion", appointmentController.exist);
router.delete("/delete/:id", appointmentController.deleteAppointment);

module.exports = router;
