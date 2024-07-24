//Importamos dependencias
const authenticateJWT = require("../config/authenticateJWT");
const db = require("../config/db");
require('dotenv').config();

//Empezacmos a crear las funciones
exports.addHistory = [
  authenticateJWT,
  (req, res) => {
    const historial = req.body;
    db.query("INSERT INTO historial_medico SET ?", historial, (err, result) => {
      if (err) {
        res.status(500).send("Error al agregar el historial");
        throw err;
      }
      res.status(201).send("Histopial agregado correctamente");
    });
  },
];

//Obtener todas las citas
exports.getHistory = [
  authenticateJWT,
  (req, res) => {
    const nombre = req.params.nombre;
    const id_usuario = req.params.id;
    const fecha_emicion = req.params.fecha;
    db.query(
      "SELECT id_historial, nombre, apellidoP, apellidoM, respaldo_resultado, fecha_emicion FROM historial_medico NATURAL JOIN pacientes NATURAL JOIN resultados WHERE (MATCH(nombre, apellidoP, apellidoM) AGAINST (? IN NATURAL LANGUAGE MODE) OR fecha_emicion = ?) and id_usuario = ? and id_resultado = id_resultado;",
      [nombre, fecha_emicion, id_usuario],
      async (err, result) => {
        if (err) {
          res.status(500).send("Error al obtener el historial");
          throw err;
        }
        res.json(result);
      }
    );
  },
];

// Eliminar un elemento
exports.deleteHistory = [
  authenticateJWT,
  (req, res) => {
    const id_historial = req.params.id;
    db.query(
      "DELETE FROM historial_medico WHERE id_historial = ?",
      id_historial,
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

