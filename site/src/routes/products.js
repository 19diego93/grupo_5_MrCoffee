//! Archivos
const controller = require("../controllers/productsController");

//! Extensiones
const express = require("express");
const router = express.Router();

//! Rutas
router.get("/", controller.productShop);

router.get("/cart/:id?", controller.productCart);

router.get("/detail/:id", controller.productDetail);

module.exports = router;
