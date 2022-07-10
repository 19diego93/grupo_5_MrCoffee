//! Archivos
const controller = require("../controllers/productsController");

//! Extensiones
const express = require("express");
const router = express.Router();

//! Rutas
router.get("/products/", controller.productShop);

router.get("/products/cart/:id?", controller.productCart);

router.get("/products/detail/:id", controller.productDetail);

module.exports = router;
