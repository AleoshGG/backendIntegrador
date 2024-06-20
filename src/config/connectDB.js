//Importamos dependencias
require("dotenv").config;
const mysql = require("mysql2");

//Iniciamos la párametros de conexión

const connectDB = async () => {
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
};

module.exports = connectDB();
