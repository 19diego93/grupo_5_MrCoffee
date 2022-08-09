//! Archivos
const controller = require("../controllers/productsController");

//! Extensiones
const express = require("express");
const router = express.Router();

//! Rutas
router.get("/", controller.list);

router.get("/detail/:id", controller.detail);

router.get("/cart/:id?", controller.cart);

module.exports = router;
