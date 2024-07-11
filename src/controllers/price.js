//Importamos dependencias
const authenticateJWT = require("../config/authenticateJWT");
const db = require("../config/db");
require('dotenv').config();

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
