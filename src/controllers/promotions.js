require("dotenv").config();
const jwt = require("jsonwebtoken");

//Importamos dependencias
const mysql = require("mysql2");

//Iniciamos la párametros de conexión
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

//Inica la conexión
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Conexión establecida");
});

//Validar token
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

//Agregar una promocion
exports.addPromotion = [
    authenticateJWT,
    (req, res) => {
      const promocion = req.body;
      db.query("INSERT INTO promociones SET ?", promocion, (err, result) => {
        if (err) {
          res.status(500).send("Error al agregar la promocion");
          throw err;
        }
        res.status(201).send("Promocion agregada correctamente");
      });
    },
  ];

// Obtener todos los elementos
exports.getPromotion = [
  authenticateJWT,
  (req, res) => {
    const id_promocion = req.params.id;
    db.query(
      "SELECT id_promocion FROM promociones WHERE id_promocion = ?",
      id_promocion,
      async (err, result) => {
        if (err) {
          res.status(500).send("Error al obtener la promocion");
          throw err;
        }
        res.json(result);
      }
    );
  },
];


// Eliminar un elemento
exports.deletePromotion = [
  authenticateJWT,
  (req, res) => {
    const id_promocion = req.params.id;
    db.query(
      "DELETE FROM promociones WHERE id_promocion = ?",
      id_promocion,
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