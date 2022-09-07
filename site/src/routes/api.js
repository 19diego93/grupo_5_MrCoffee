//! Archivos
const controller = require("../controllers/apiController/ApiProductController");

//! Extensiones
const express = require("express");
const router = express.Router();

//! Rutas
router.get("/api/product/:id", controller.product);

module.exports = router;
