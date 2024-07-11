//Importamos dependencias
require('dotenv').config();
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
      fecha: req.body.fecha,
    };

    db.query("INSERT INTO citas SET ?", cita, (err, result) => {
      if (err) {
        res.status(500).send("Error al agregar la cita");
        console.log(err);
        return;
      }
      res.status(201);

      res.json({ msg: "Cita agregada correctamente" });
    });
  },
];

//Obtener todas las citas
exports.getAll = [
  authenticateJWT,
  (req, res) => {
    const fecha_actual = req.params.fecha_actual;
    db.query(
      //Mover datos del paciente
      "SELECT id_cita, nombre, apellidoP, apellidoM, telefono, fecha, horario_inicio FROM pacientes NATURAL JOIN citas NATURAL JOIN horarios_atencion WHERE fecha >= ? AND id_horario_atencion = id_horario ORDER BY fecha, horario_inicio ASC;",
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

//Obtener la solicitud de estudios
exports.getSolicitud = [
  authenticateJWT,
  (req, res) => {
    const id_cita = req.params.id;
    db.query(
      //Mover datos del paciente
      "SELECT solicitud_estudios FROM citas WHERE id_cita = ?",
      id_cita,
      async (err, result) => {
        if (err) {
          res.status(500).send("Error al obtener el documento");
          throw err;
        }

        const pdfBlob = result[0].solicitud_estudios;
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
          "Content-Disposition",
          "attachment; filename=Solicitud.pdf"
        );
        res.send(pdfBlob);
      }
    );
  },
];

//Obtener todas las citas
exports.exist = [
  authenticateJWT,
  (req, res) => {
    const fecha_actual = req.params.fecha_actual;
    const id_horario_atencion = req.params.id_horario_atencion;
    db.query(
      //Mover datos del paciente
      "SELECT fecha, id_horario FROM citas NATURAL JOIN horarios_atencion WHERE fecha = ? AND id_horario = ? AND id_horario_atencion = id_horario;",
      [fecha_actual, id_horario_atencion],
      async (err, result) => {
        if (err) {
          res.status(500).send("Error al obtener las citas");
          throw err;
        }

        if(result.length == 1) {
          res.json({
            msg: "Existe una cita agendada"
          })
        } else {
          res.json(result);
        }       
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
        return;
        throw err;
      }
      res.status(200);
      res.json({
        msg: "Eliminado",
      });
    });
  },
];
