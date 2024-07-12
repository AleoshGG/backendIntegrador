//Importamos dependencias
const authenticateJWT = require("../config/authenticateJWT");
const db = require("../config/db");
require("dotenv").config();

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//Añadir un resultado
exports.addResult = [
  authenticateJWT,
  upload.single("respaldo_resultado"),
  (req, res) => {
    const resultado = {
      respaldo_resultado: req.file.buffer,
      fecha_emicion: req.body.fecha_emicion,
    };
    db.query("INSERT INTO resultados SET ?", resultado, (err, result) => {
      if (err) {
        res.status(500).send("Error al agregar el resultado");
        throw err;
      }
      res
        .status(201)
        .json({
          msg: "Resultado agregado correctamente",
          id_resultado: result.insertId,
        });
    });
  },
];

//Eliminar un resultado
exports.deleteResult = [
  authenticateJWT,
  (req, res) => {
    const id_resultado = req.params.id;
    db.query(
      "DELETE FROM resultado WHERE id_resultado = ? ",
      id_resultado,
      (err, result) => {
        if (err) {
          res.status(500).send("Error al eliminar al paciente");
          throw err;
        }
        res.status(201).send("Paciente eliminado correctamente");
      }
    );
  },
];
