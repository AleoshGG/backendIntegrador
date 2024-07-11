//Importamos dependencias
const authenticateJWT = require("../config/authenticateJWT");
const db = require("../config/db");
require('dotenv').config();

//Agregar un nuevo horario
exports.getHorario = [
  authenticateJWT,
  (req, res) => {
    db.query("SELECT * FROM horarios_atencion", (err, result) => {
      if (err) {
        res.status(500).send("Error al obtener los horarios");
        return;
        throw err;
      }
      res.status(201);
      res.json(result);;
    });
  },
];
