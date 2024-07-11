//Importamos dependencias
const authenticateJWT = require("../config/authenticateJWT");
const db = require("../config/db");
require('dotenv').config();

//Añadir un resultado
exports.addResult = [authenticateJWT, (req, res) => {
    const resultado = req.body;
    db.query("INSERT INTO resultados SET ?", resultado, (err, result) => {
        if (err) {
            res.status(500).send("Error al agregar al paciente");
            throw err;
        }
        res.status(201).send("Paciente agregado correctamente");
    });
}];

//Eliminar un resultado
exports.deleteResult = [authenticateJWT, (req, res) => {
    const id_resultado = req.params.id;
    db.query("DELETE FROM resultado WHERE id_resultado = ? ", id_resultado, (err, result) => {
        if (err) {
            res.status(500).send("Error al eliminar al paciente");
            throw err;
        }
        res.status(201).send("Paciente eliminado correctamente");
    });
}];