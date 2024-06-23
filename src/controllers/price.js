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
exports.addPrice = [
  authenticateJWT,
  (req, res) => {
    const cotizacion = req.body;
    db.query("INSERT INTO cotizacion SET ?", cotizacion, (err, result) => {
      if (err) {
        res.status(500).send("Error al agregar la cotizacion");
        throw err;
      }
      res.status(201).send("Cotrizacion agregada correctamente");
    });
  },
];

//Obtener todas las citas
exports.getAllPrice = [
  authenticateJWT,
  (req, res) => {
    db.query(
      "SELECT nombre, decripcion, costo, precio, promocion FROM analisis NATURALJOIN cotizacion NATURALJOIN promociones",
      async (err, result) => {
        if (err) {
          res.status(500).send("Error al obtener las cotizaciones");
          throw err;
        }
        res.json(result);
      }
    );
  },
];

// Eliminar un elemento
exports.deletePrice = [
  authenticateJWT,
  (req, res) => {
    const id_cotizacion = req.params.id;
    db.query(
      "DELETE FROM cotizacion WHERE id_cotizacion = ?",
      id_cotizacion,
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
