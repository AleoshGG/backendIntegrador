//Importamos dependencias
const authenticateJWT = require("../config/authenticateJWT");
const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Agregar un nuevo usuario
exports.addUser = (req, res) => {
  const newUser = req.body;
  // Hashear la contraseña antes de guardarla (bcrypt)
  bcrypt.hash(newUser.password, 10, (err, hash) => {
    // 10 es el número de rondas de hashing
    if (err) {
      res.status(500).send("Error al hashear la contraseña");
      throw err;
    }
    newUser.password = hash;

    db.query("INSERT INTO usuarios SET ?", newUser, (err, result) => {
      if (err) {
        res.status(500).send("Error al agregar el usuario");
        return;
        throw err;
      }
      res.status(201).send("Usuario agregado correctamente");
    });
  });
};

//Login
exports.login = async (req, res) => {
  const { correo_electronico, password } = req.body;
  console.log(correo_electronico);
  db.query(
    "SELECT * FROM usuarios WHERE correo_electronico = ?",
    [correo_electronico],
    async (err, result) => {
      if (err) {
        res.status(500).send("Error en el servidor");
        throw err;
      }
      if (result.length === 0) {
        return res.status(401).send("No hubo coincidencias ");
      }

      const user = result[0];
      console.log(password, user.password);

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(404).send("Credenciales Inválidas");
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      res.json({
        message: "Credenciales válidas",
        token,
        id_usuario: user.id_usuario
      });
    }
  );
};

// Obtener todos los elementos
exports.getUser = [
  authenticateJWT,
  (req, res) => {
    //const id_usuario = req.params.id;
    db.query(
      "SELECT nombre, apellidoP, apellidoM, correo_electronico, telefono FROM usuarios",
      
      async (err, result) => {
        if (err) {
          res.status(500).send("Error al obtener los usuarios");
          throw err;
        }
        res.json(result);
      }
    );
  },
];

// Obtener todos los recepcionistas
exports.getRecep = [
  authenticateJWT,
  (req, res) => {
    db.query(
      "SELECT nombre, apellidoP, apellidoM, correo_electronico, telefono FROM usuarios WHERE rol = 2",
      async (err, result) => {
        if (err) {
          res.status(500).send("Error al obtener los usuarios");
          throw err;
        }
        res.json(result);
      }
    );
  },
];

// Actualizar un elemento existente
exports.updateUser = [
  authenticateJWT,
  (req, res) => {
    const id_usuario = req.params.id;
    const updatedUser = req.body;

    bcrypt.hash(updatedUser.password, 10, (err, hash) => {
      // 10 es el número de rondas de hashing
      if (err) {
        res.status(500).send("Error al hashear la contraseña");
        throw err;
      }
      updatedUser.password = hash;

      db.query(
        "UPDATE usuarios SET ? WHERE id_usuario = ?",
        [updatedUser, id_usuario],
        (err, result) => {
          if (err) {
            res.status(500).send("Error al actualizar el elemento");
            throw err;
          }
          res.send("Elemento actualizado correctamente");
        }
      );
    });
  },
];

// Eliminar un elemento
exports.deleteUser = [
  authenticateJWT,
  (req, res) => {
    const id_usuario = req.params.id;
    db.query(
      "DELETE FROM usuarios WHERE id_usuario = ?",
      id_usuario,
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

//Buscar un elemento
exports.searchUser = [
  authenticateJWT,
  (req, res) => {
    const user = req.body;
    db.query(
      "SELECT id_usuario FROM usuarios WHERE nombre = ? OR apellidoP = ?",
      [user.nombre, user.apellidoP],
      async (err, result) => {
        if (err) {
          res.status(500).send("Error al obtener el usuario");
          throw err;
        }
        res.json(result);
      }
    );
  },
];
