const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");
const connectDB = require("../config/connectDB");
connectDB;
// Rutas para los endpoints CRUD
router.get("/obtenerUsuarios/", usersController.getAllUsers);// URL
router.get("/login/", usersController.login);
router.post("/addUser/", usersController.addUser);
router.put("/:id", usersController.updateUser);
router.delete("/:id", usersController.deleteUser);

router.get("/login/", usersController.login);


module.exports = router;
