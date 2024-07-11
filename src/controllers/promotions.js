//Importamos dependencias
const authenticateJWT = require("../config/authenticateJWT");
const db = require("../config/db");
require('dotenv').config();

//Agregar una promocion
exports.addPromotion = [
    authenticateJWT,
    (req, res) => {
      const promocion = req.body;
      db.query("INSERT INTO promociones SET ?", promocion, (err, result) => {
        if (err) {
          res.status(500).send("Error al agregar la promocion");
          throw err;
        }
        res.status(201).send("Promocion agregada correctamente");
      });
    },
  ];

// Obtener todos los elementos
exports.getPromotion = [
  authenticateJWT,
  (req, res) => {
    const id_promocion = req.params.id;
    db.query(
      "SELECT id_promocion FROM promociones WHERE id_promocion = ?",
      id_promocion,
      async (err, result) => {
        if (err) {
          res.status(500).send("Error al obtener la promocion");
          throw err;
        }
        res.json(result);
      }
    );
  },
];


// Eliminar un elemento
exports.deletePromotion = [
  authenticateJWT,
  (req, res) => {
    const id_promocion = req.params.id;
    db.query(
      "DELETE FROM promociones WHERE id_promocion = ?",
      id_promocion,
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