//Importamos las dependencias
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//Conexion a la base de datos
const bd = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

bd.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Conexión Establecida");
});

//Autentificacion del jwt
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(400);
  }
};

//Empezacmos a crear las funciones
exports.addAppointment = [
  authenticateJWT,
  (req, res) => {
    const cita = req.body;
    db.query("INSERT INTO citas SET ?", cita, (err, result) => {
      if (err) {
        res.status(500).send("Error al agregar la cita");
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
    db.query(
      "SELECT nombre, correo_electronico, dia, hora_inicio FROM horarios_atencion NATURALJOIN citas NATURALJOIN pacientes WHERE dia >= ?",
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