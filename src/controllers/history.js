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
exports.addHistory = [
  authenticateJWT,
  (req, res) => {
    const historial = req.body;
    db.query("INSERT INTO historial_medico SET ?", historial, (err, result) => {
      if (err) {
        res.status(500).send("Error al agregar el historial");
        throw err;
      }
      res.status(201).send("Histopial agregado correctamente");
    });
  },
];

//Obtener todas las citas
exports.getHistory = [
  authenticateJWT,
  (req, res) => {
    const id_usuario = req.params.id;
    db.query(
      "SELECT nombre, fecha_emision, apellidoP, apellidoM, respaldo_resultado FROM pacientes NATURALJOIN historial_medico NATURALJOIN resultados WHERE id_usuario = ?",
      id_usuario,
      async (err, result) => {
        if (err) {
          res.status(500).send("Error al obtener el historial");
          throw err;
        }
        res.json(result);
      }
    );
  },
];

// Eliminar un elemento
exports.deleteHistory = [
  authenticateJWT,
  (req, res) => {
    const id_historial = req.params.id;
    db.query(
      "DELETE FROM historial_medico WHERE id_historial = ?",
      id_historial,
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