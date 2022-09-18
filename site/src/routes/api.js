//! Archivos
const controller = require("../controllers/Api/ApiController");

//! Extensiones
const express = require("express");
const router = express.Router();

//! Rutas
// Obtienes el detalle de un producto.
router.get("/product/:id", controller.product);
// Se realiza la compra
router.post("/checkout", controller.checkout);
/* Es una ruta que se utilizará para obtener las órdenes de un usuario. */
router.get("/orders", controller.orders)
module.exports = router;
