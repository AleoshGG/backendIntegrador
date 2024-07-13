const express = require("express");
const router = express.Router();
const historyController = require("../controllers/history");

// Rutas para los endpoints CRUD
router.post("/add/", historyController.addHistory);
router.get("/getAll/:nombre/:id/:fecha", historyController.getHistory);
router.delete("/delete/:id", historyController.deleteHistory);


module.exports = router;