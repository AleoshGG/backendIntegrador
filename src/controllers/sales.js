//Importamos dependencias
const authenticateJWT = require("../config/authenticateJWT");
const db = require("../config/db");
require('dotenv').config();

//Añadir un paciente
exports.addSale = [
  authenticateJWT,
  (req, res) => {
    const sale = req.body;
    db.query("INSERT INTO ventas SET ?", sale, (err, result) => {
      if (err) {
        res.status(500).send("Error al agregar la venta");
        throw err;
      }
      res.status(201).send("Venta agregada correctamente");
    });
  },
];

//Eliminar un paciente
exports.deleteSale = [
  authenticateJWT,
  (req, res) => {
    const id_venta = req.params.id;
    db.query(
      "DELETE FROM ventas WHERE id_pago = ? ",
      id_venta,
      (err, result) => {
        if (err) {
          res.status(500).send("Error al eliminar la venta");
          throw err;
        }
        res.status(201).send("Venta eliminada correctamente");
      }
    );
  },
];

//Buscar un elemento
exports.getAllSales = [
  authenticateJWT,
  (req, res) => {
    db.query(
      "SELECT id_pago, nombre, apellidoP, apellidoM, monto, fecha_pago FROM ventas NATURAL JOIN pacientes WHERE id_paciente = id_paciente ORDER BY fecha_pago DESC;",
      async (err, result) => {
        if (err) {
          res.status(500).send("Error al obtener las ventas");
          throw err;
        }
        res.json(result);
      }
    );
  },
];
