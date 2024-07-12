//Importamos dependencias
const authenticateJWT = require("../config/authenticateJWT");
const db = require("../config/db");
require('dotenv').config();

//Añadir un paciente
exports.addPatient = [authenticateJWT, (req, res) => {
    const patient = req.body;
    db.query("INSERT INTO pacientes SET ?", patient, (err, result) => {
        if (err) {
            res.status(500).send("Error al agregar al paciente");
            return;
            throw err;
        }
        res.status(201);
        res.json({
          messaje: "Paciente creado correctamente", 
          id_paciente: result.insertId
        });
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
        res.status(201).send("Elemento eliminado correctamente");
    });
}];


//Buscar un elemento
exports.searchPatient = [
  authenticateJWT,
  (req, res) => {
    const name = req.params.nombre;
    db.query(
      "SELECT id_paciente, nombre, apellidoP, apellidoM FROM pacientes WHERE MATCH(nombre, apellidoP, apellidoM) AGAINST (? IN NATURAL LANGUAGE MODE) LIMIT 1;",
      name,
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
  