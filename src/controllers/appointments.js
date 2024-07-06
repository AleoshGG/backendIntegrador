//Importamos dependencias
const authenticateJWT = require("../config/authenticateJWT");
const db = require("../config/db");

//Empezacmos a crear las funciones
exports.addAppointment = [
  authenticateJWT,
  (req, res) => {
    const cita = req.body;
    db.query("INSERT INTO citas SET ?", cita, (err, result) => {
      if (err) {
        res.status(500).send("Error al agregar la cita");
        return;
        throw err;
      }
      res.status(201).send("Cita agregada correctamente");
    });
  },
];

//Obtener todas las citas
exports.getAllAppointment = [
  authenticateJWT,
  (req, res) => {
    const fecha_actual = req.params.date;
    db.query(//Mover datos del paciente
      "SELECT nombre, correo_electronico, fecha, hora_inicio FROM horarios_atencion NATURALJOIN citas NATURALJOIN pacientes WHERE fecha >= ?",
      [fecha_actual],
      async (err, result) => {
        if (err) {
          res.status(500).send("Error al obtener las citas");
          throw err;
        }
        res.json(result);
      }
    );
  },
];

// Actualizar un elemento existente
exports.updateAppointment = [
  authenticateJWT,
  (req, res) => {
    const id_cita = req.params.id;
    const updatedCita = req.body;
    db.query(
      "UPDATE citas SET ? WHERE id_cita = ?",
      [updatedCita, id_cita],
      (err, result) => {
        if (err) {
          res.status(500).send("Error al actualizar el elemento");
          throw err;
        }
        res.send("Elemento actualizado correctamente");
      }
    );
  },
];

// Eliminar un elemento
exports.deleteAppointment = [
  authenticateJWT,
  (req, res) => {
    const id_cita = req.params.id;
    db.query(
      "DELETE FROM citas WHERE id_cita = ?",
      id_cita,
      (err, result) => {
        if (err) {
          res.status(500).send("Error al eliminar el elemento");
          throw err;
        }
        res.send("Elemento eliminado correctamente");
      }
    );
  },
];