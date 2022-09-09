//! Archivos
const controller = require("../controllers/Api/ApiController");

//! Extensiones
const express = require("express");
const router = express.Router();

//! Rutas
router.get("/product/:id", controller.product);
router.post("/checkout", controller.checkout);
router.get('/ventas', controller.Ventas)

module.exports = router;
