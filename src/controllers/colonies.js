//Importamos dependencias
const authenticateJWT = require("../config/authenticateJWT");
const db = require("../config/db");
const jwt = require("jsonwebtoken");

// Obtener todos los géneros
exports.getColinies = [
    authenticateJWT,
    (req, res) => {
      db.query(
        "SELECT * FROM colonias",
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
