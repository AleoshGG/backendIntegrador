const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");

// Rutas para los endpoints CRUD
router.post("/addUser/", usersController.addUser);
router.post("/login/", usersController.login);
router.get("/profile/:id", usersController.getUser); // URL
router.get("/search/:nombre", usersController.searchUser);
router.get("/getRecep/:id", usersController.getRecep);
router.put("/update/:id", usersController.updateUser);
router.put("/updatePass/:id", usersController.updatePassword);
router.delete("/deleteUser/:id", usersController.deleteUser);


module.exports = router;
