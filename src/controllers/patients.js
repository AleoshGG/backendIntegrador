//Importamos dependencias
const authenticateJWT = require("../config/authenticateJWT");
const db = require("../config/db");

//Añadir un paciente
exports.addPatient = [authenticateJWT, (req, res) => {
    const patient = req.body;
    db.query("INSERT INTO pacientes SET ?", patient, (err, result) => {
        if (err) {
            res.status(500).send("Error al agregar al paciente");
            return;
            throw err;
        }
        res.status(201).send("Paciente agregado correctamente");
    });
}];

//Eliminar un paciente
exports.deletePatient = [authenticateJWT, (req, res) => {
    const id_paciente = req.params.id;
    db.query("DELETE FROM pacientes WHERE id_paciente = ? ", id_paciente, (err, result) => {
        if (err) {
            res.status(500).send("Error al eliminar al paciente");
            throw err;
        }
        res.status(201).send("Paciente eliminado correctamente");
    });
}];


//Buscar un elemento
exports.searchPatient = [
    authenticateJWT,
    (req, res) => {
      const user = req.body;
      db.query(
        "SELECT id_paciente FROM pacientes WHERE nombre = ? OR apellidoP = ?",
        [user.nombre, user.apellidoP],
        async (err, result) => {
          if (err) {
            res.status(500).send("Error al obtener el paciente");
            throw err;
          }
          res.json(result);
        }
      );
    },
  ];
  