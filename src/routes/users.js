const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");

// Rutas para los endpoints CRUD
router.get("/addUser/", usersController.addUser);
router.get("/login/", usersController.login);
router.get("/profile/:id", usersController.getUser); // URL
router.get("/search/", usersController.searchUser);
router.get("/getRecep/:id", usersController.getRecep);
router.put("/updateUser/:id", usersController.updateUser);
router.delete("/deleteUser/:id", usersController.deleteUser);


module.exports = router;
