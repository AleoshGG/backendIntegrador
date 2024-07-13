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
         console.log(err);
         return
      }
      res.status(201).send("Cotrizacion agregada correctamente");
    });
  },
];

//Obtener todas las citas
exports.getIdPrice = [
  authenticateJWT,
  (req, res) => {
    const id_usuario = req.body.id_usuario;
    db.query(
      "SELECT id_analisis FROM cotizacion WHERE id_usuario = ?", id_usuario,
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
    const id_analisis = req.params.id_analisis;
    const id_usuario = req.params.id_usuario;
    db.query(
      "DELETE FROM cotizacion WHERE id_analisis = ? AND id_usuario = ?",
      [id_analisis, id_usuario],
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
