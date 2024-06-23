//Importamos las dependencias
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//Conexion a la base de datos
const bd = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

bd.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Conexión Establecida");
});

//Autentificacion del jwt
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(400);
  }
};

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
      "SELECT monto, fecha_pago FROM ventas",
      [user.nombre, user.apellidoP],
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
