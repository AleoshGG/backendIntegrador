//Importamos dependencias
const authenticateJWT = require("../config/authenticateJWT");
const db = require("../config/db");

//Agregar una nueva direccion
exports.addDireccion = [
  authenticateJWT,
  (req, res) => {
    const direccion = req.body;
    db.query("INSERT INTO direccion SET ?", direccion, (err, result) => {
      if (err) {
        res.status(500).send("Error al agregar la direccion");
        return;
        throw err;
      }
      res.status(201).send("Direccion agregada correctamente");
    });
  },
];