//Importamos dependencias
const authenticateJWT = require("../config/authenticateJWT");
const db = require("../config/db");
require('dotenv').config();

//Buscar un elemento
exports.getAll = [
    authenticateJWT,
    (req, res) => {
      db.query(
        "SELECT * FROM categorias",
        async (err, result) => {
          if (err) {
            res.status(500).send("Error al obtener las categorias");
            throw err;
          }
          res.json(result);
        }
      );
    },
  ];