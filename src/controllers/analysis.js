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

//Agregar un nuevo analisis
exports.addAnalysis = [
  authenticateJWT,
  (req, res) => {
    const analisis = req.body;
    db.query("INSERT INTO resultados SET ?", analisis, (err, result) => {
      if (err) {
        res.status(500).send("Error al agregar el analisis");
        throw err;
      }
      res.status(201).send("Analisis agregado correctamente");
    });
  },
];

//Obtener por categoria los analisis
exports.getCategoryAnalysis = [
  authenticateJWT,
  (req, res) => {
    const categoria = req.params.categoria;
    db.query(
      "SELECT nombre, clave_estudios, precio, descripcion, categoria FROM analisis WHERE categoria = ?",
      categoria,
      async (err, result) => {
        if (err) {
          res.status(500).send("Error al obtener los analisis");
          throw err;
        }
        res.json(result);
      }
    );
  },
];

// Actualizar un elemento existente
exports.updateAnalysis = [
  authenticateJWT,
  (req, res) => {
    const id_analisis = req.params.id;
    const analisis = req.body;

    db.query(
      "UPDATE analisis SET ? WHERE id_analisis = ?",
      [analisis, id_analisis],
      (err, result) => {
        if (err) {
          res.status(500).send("Error al actualizar el analisis");
          throw err;
        }
        res.status(201).send("Analisis actualizado correctamente");
      }
    );
  },
];

// Eliminar un elemento
exports.deleteAnalysis = [
  authenticateJWT,
  (req, res) => {
    const id_analisis = req.params.id;
    db.query(
      "DELETE FROM analisis WHERE id_analisis = ?",
      id_analisis,
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
