//Importamos dependencias
const authenticateJWT = require("../config/authenticateJWT");
const db = require("../config/db");

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
    const id_usuario = req.params.id;
    db.query(
      "SELECT nombre, fecha_emision, apellidoP, apellidoM, respaldo_resultado FROM pacientes NATURALJOIN historial_medico NATURALJOIN resultados WHERE id_usuario = ?",
      id_usuario,
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