//Importamos dependencias
const authenticateJWT = require("../config/authenticateJWT");
const db = require("../config/db");

//Añadir un horario
exports.addSchedule = [authenticateJWT, (req, res) => {
    const horario = req.body;
    db.query("INSERT INTO horarios_atencion SET ?", horario, (err, result) => {
        if (err) {
            res.status(500).send("Error al agregar el horario");
            throw err;
        }
        res.status(201).send("Horario agregado correctamente");
    });
}];

//Eliminar un elemento
exports.deleteSchedule = [authenticateJWT, (req, res) => {
    const id_horario = req.params.id;
    db.query("DELETE FROM horarios_atencion WHERE id_horario = ? ", id_horario, (err, result) => {
        if (err) {
            res.status(500).send("Error al eliminar el horario");
            throw err;
        }
        res.status(201).send("Horario eliminado correctamente");
    });
}];


//Buscar un elemento
exports.getSchedule = [
    authenticateJWT,
    (req, res) => {
        const id_horario = req.params.id_horario;
      db.query(
        "SELECT id_horario FROM horarios_atencion WHERE id_horario = ?",
        [id_horario],
        async (err, result) => {
          if (err) {
            res.status(500).send("Error al obtener el horario");
            throw err;
          }
          res.json(result);
        }
      );
    },
  ];