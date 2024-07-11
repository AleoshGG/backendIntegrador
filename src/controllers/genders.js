//Importamos dependencias
const authenticateJWT = require("../config/authenticateJWT");
const db = require("../config/db");
require('dotenv').config();

// Obtener todos los géneros
exports.getGender = [
    authenticateJWT,
    (req, res) => {
      db.query(
        "SELECT * FROM generos",
        async (err, result) => {
          if (err) {
            res.status(500).send("Error al obtener los usuarios");
            throw err;
          }
          res.json(result);
        }
      );
    },
  ];

