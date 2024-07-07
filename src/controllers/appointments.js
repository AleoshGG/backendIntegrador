//Importamos dependencias
const authenticateJWT = require("../config/authenticateJWT");
const db = require("../config/db");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//Empezacmos a crear las funciones
exports.addAppointment = [
  authenticateJWT,
  upload.single("solicitud_estudios"),
  (req, res) => {
    const cita = {
      id_usuario: req.body.id_usuario,
      id_paciente: req.body.id_paciente,
      id_horario_atencion: req.body.id_horario_atencion,
      id_analisis: req.body.id_analisis,
      solicitud_estudios: req.file.buffer,
      id_cotizacion: req.body.id_cotizacion,
    };

    db.query("INSERT INTO citas SET ?", cita, (err, result) => {
      if (err) {
        res.status(500).send("Error al agregar la cita");
        console.log(err);
        return
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
    db.query(
      //Mover datos del paciente
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
    db.query("DELETE FROM citas WHERE id_cita = ?", id_cita, (err, result) => {
      if (err) {
        res.status(500).send("Error al eliminar el elemento");
        throw err;
      }
      res.send("Elemento eliminado correctamente");
    });
  },
];
