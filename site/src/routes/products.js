//! Archivos
const controller = require("../controllers/productsController");
//! Extensiones
const express = require("express");
const router = express.Router();

//! Rutas
/* Una ruta que se va a utilizar para mostrar el listado de los productos. */
router.get("/", controller.list);
/* Una ruta que se va a utilizar para mostrar el detalle de un producto. */
router.get("/detail/:id", controller.detail);
/* Una ruta que se va a utilizar para mostrar el carrito de la compra. */
router.get("/cart", controller.cart);

module.exports = router;
