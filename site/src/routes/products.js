//! Archivos
const controller = require("../controllers/productsController");
const authMiddleware = require("../middlewares/authMiddleware");
//! Extensiones
const express = require("express");
const router = express.Router();

//! Rutas
router.get("/", controller.list);

router.get("/detail/:id", controller.detail);

router.get("/cart", authMiddleware, controller.cart);

module.exports = router;
