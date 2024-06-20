require("dotenv").config();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
        throw err;
      }
      res.status(201).send("Usuario agregado correctamente");
    });
  });
};

// Agregar un nuevo recepcionista
exports.addClerk = [authenticateJWT, (req, res) => {
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
        throw err;
      }
      res.status(201).send("Usuario agregado correctamente");
    });
  });
}];

// Agregar un administrador
exports.addAdmin = (req, res) => {
  const newUser = req.body;
  // Hashear la contraseña antes de guardarla (bcrypt)
  bcrypt.hash(newUser.password, 10, (err, hash) => {
    // 10 es el número de rondas de hashing
    if (err) {
      res.status(500).send("Error al hashear la contraseña");
      throw err;
    }
    newUser.password = hash;

    db.query("INSERT INTO administrador SET ?", newUser, (err, result) => {
      if (err) {
        res.status(500).send("Error al agregar el usuario");
        throw err;
      }
      res.status(201).send("Usuario agregado correctamente");
    });
  });
};

//Login
exports.login = async (req, res) => {
  const { correo_electronico, password } = req.body;

  db.query(
    "SELECT * FROM usuarios WHERE correo_electronico = ?",
    [correo_electronico],
    async (err, result) => {
      if (err) {
        res.status(500).send("Error en el servidor");
        throw err;
      }
      if (result.length === 0) {
        return res.status(401).send("Invalidas");
      }

      const user = result[0];
      console.log(password, user.password);
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(404).send("Credenciales Invalidas");
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.json({
        message: "Credenciales válidas",
        token,
      });
    }
  );
};


// Obtener todos los elementos
exports.getAllUsers = [
  authenticateJWT,
  (req, res) => {
    db.query("SELECT * FROM usuarios", (err, result) => {
      if (err) {
        res.status(500).send("Error al obtener los usuarios");
        throw err;
      }
      res.json(result);
    });
  },
];

// Actualizar un elemento existente
exports.updateUser = (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;
  db.query(
    "UPDATE users SET ? WHERE id = ?",
    [updatedUser, userId],
    (err, result) => {
      if (err) {
        res.status(500).send("Error al actualizar el elemento");
        throw err;
      }
      res.send("Elemento actualizado correctamente");
    }
  );
};

// Eliminar un elemento
exports.deleteUser = (req, res) => {
  const userId = req.params.id;
  db.query("DELETE FROM users WHERE id = ?", userId, (err, result) => {
    if (err) {
      res.status(500).send("Error al eliminar el elemento");
      throw err;
    }
    res.send("Elemento eliminado correctamente");
  });
};
