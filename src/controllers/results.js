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

//Añadir un resultado
exports.addResult = [authenticateJWT, (req, res) => {
    const resultado = req.body;
    db.query("INSERT INTO resultados SET ?", resultado, (err, result) => {
        if (err) {
            res.status(500).send("Error al agregar al paciente");
            throw err;
        }
        res.status(201).send("Paciente agregado correctamente");
    });
}];

//Eliminar un resultado
exports.deleteResult = [authenticateJWT, (req, res) => {
    const id_resultado = req.params.id;
    db.query("DELETE FROM resultado WHERE id_resultado = ? ", id_resultado, (err, result) => {
        if (err) {
            res.status(500).send("Error al eliminar al paciente");
            throw err;
        }
        res.status(201).send("Paciente eliminado correctamente");
    });
}];