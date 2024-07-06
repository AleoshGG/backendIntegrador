//Importamos dependencias
const authenticateJWT = require("../config/authenticateJWT");
const db = require("../config/db");

//Agregar un nuevo horario
exports.addHorario = [
  authenticateJWT,
  (req, res) => {
    const horario = req.body;
    db.query("INSERT INTO horarios_atencion SET ?", horario, (err, result) => {
      if (err) {
        res.status(500).send("Error al agregar el horario");
        return;
        throw err;
      }
      res.status(201).send("horario agregado correctamente");
    });
  },
];
