//! Archivos
const controller = require("../controllers/mainController");

//! Extensiones
const express = require("express");
const router = express.Router();

//! Rutas
router.get("/", controller.index);

router.get("/search", controller.search);

module.exports = router;
